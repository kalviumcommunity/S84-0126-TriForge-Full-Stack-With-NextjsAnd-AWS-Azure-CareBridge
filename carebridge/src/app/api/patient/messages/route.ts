import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, handleMiddlewareError } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

// GET /api/patient/messages - Get messages for the assigned doctor
export async function GET(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    if (user.role !== 'PATIENT') {
      return NextResponse.json(
        { error: 'Access denied. Patient role required.' },
        { status: 403 }
      )
    }

    const { searchParams } = new URL(request.url)
    const doctorId = searchParams.get('doctorId')
    const limit = parseInt(searchParams.get('limit') || '50')
    const markRead = searchParams.get('markRead') === '1'

    if (!doctorId) {
      return NextResponse.json({ messages: [] })
    }

    const assignment = await prisma.assignment.findFirst({
      where: { patientId: user.userId, doctorId }
    })

    if (!assignment) {
      return NextResponse.json(
        { error: 'No assignment found with this doctor' },
        { status: 403 }
      )
    }

    if (markRead) {
      await prisma.message.updateMany({
        where: {
          senderId: doctorId,
          receiverId: user.userId,
          readAt: null
        },
        data: { readAt: new Date() }
      })
    }

    const messages = await prisma.message.findMany({
      where: {
        OR: [
          { senderId: user.userId, receiverId: doctorId },
          { senderId: doctorId, receiverId: user.userId }
        ]
      },
      orderBy: { createdAt: 'asc' },
      take: limit
    })

    const normalizedMessages = messages.map(message => ({
      ...message,
      sentBy: message.senderId === user.userId ? 'PATIENT' : 'DOCTOR'
    }))

    return NextResponse.json({ messages: normalizedMessages })
  } catch (error) {
    console.error('Get patient messages error:', error)
    return handleMiddlewareError(error)
  }
}

// POST /api/patient/messages - Send a message to assigned doctor
export async function POST(request: NextRequest) {
  try {
    const user = await requireAuth(request)

    if (user.role !== 'PATIENT') {
      return NextResponse.json(
        { error: 'Access denied. Patient role required.' },
        { status: 403 }
      )
    }

    const body = await request.json()
    const { doctorId, content } = body

    if (!doctorId || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: doctorId, content' },
        { status: 400 }
      )
    }

    const assignment = await prisma.assignment.findFirst({
      where: { patientId: user.userId, doctorId }
    })

    if (!assignment) {
      return NextResponse.json(
        { error: 'No assignment found with this doctor' },
        { status: 403 }
      )
    }

    const message = await prisma.message.create({
      data: {
        senderId: user.userId,
        receiverId: doctorId,
        content
      }
    })

    return NextResponse.json(
      {
        message: 'Message sent successfully',
        messageData: {
          ...message,
          sentBy: 'PATIENT'
        }
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('Send patient message error:', error)
    return handleMiddlewareError(error)
  }
}