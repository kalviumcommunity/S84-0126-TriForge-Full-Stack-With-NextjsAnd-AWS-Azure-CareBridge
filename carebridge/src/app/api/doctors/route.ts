import { NextRequest, NextResponse } from 'next/server'
import { requireProfileLevel, handleMiddlewareError } from '@/lib/middleware'
import { prisma } from '@/lib/prisma'

/**
 * Extract degree information from qualifications array
 * Returns the highest/most relevant degree found
 */
function extractDegreeFromQualifications(qualifications?: string[]): string | null {
  if (!qualifications || qualifications.length === 0) {
    return null
  }

  // Priority order for medical degrees
  const degreePatterns = [
    /MD|M\.D\.|Doctor of Medicine/i,
    /MBBS|M\.B\.B\.S\./i,
    /DO|D\.O\.|Doctor of Osteopathic Medicine/i,
    /PhD|Ph\.D\.|Doctor of Philosophy/i,
    /MS|M\.S\.|Master of Science/i,
    /MA|M\.A\.|Master of Arts/i
  ]

  for (const pattern of degreePatterns) {
    for (const qualification of qualifications) {
      if (pattern.test(qualification)) {
        return qualification
      }
    }
  }

  // Return first qualification if no specific degree pattern found
  return qualifications[0]
}




// GET /api/doctors - Get all Level 3 doctors (not filtered by patient condition)
export async function GET(request: NextRequest) {
  try {
    // Require profile level 1 to access doctors
    const user = await requireProfileLevel(1)(request)

    if (user.role !== 'PATIENT') {
      return NextResponse.json(
        { error: 'Access denied. Patient role required.' },
        { status: 403 }
      )
    }

    // Get all doctors with profile level = 3 (100% completed profiles only)
    const doctors = await prisma.user.findMany({
      where: {
        role: 'DOCTOR',
        profileLevel: 3 // Only doctors with 100% completed profiles
      },
      select: {
        id: true,
        name: true,
        email: true,
        profileLevel: true,
        doctorProfile: {
          select: {
            specialization: true,
            experienceYears: true,
            conditionsTreated: true,
            consultationMode: true,
            availability: true,
            qualifications: true,
            clinicName: true,
            consultationFee: true,
            bio: true
          }
        }
      },
      orderBy: [
        { profileLevel: 'desc' }, // Higher profile level first
        { doctorProfile: { experienceYears: 'desc' } } // More experienced first
      ]
    })

    // Check existing assignments to mark assigned doctors
    const existingAssignments = await prisma.assignment.findMany({
      where: { patientId: user.userId },
      select: { doctorId: true }
    })

    const assignedDoctorIds = new Set(existingAssignments.map(a => a.doctorId))

    // Add assignment status to each doctor
    const doctorsWithStatus = doctors.map(doctor => ({
      doctorId: doctor.id,
      name: doctor.name,
      degree: extractDegreeFromQualifications(doctor.doctorProfile?.qualifications),
      specialization: doctor.doctorProfile?.specialization || 'General Practice',
      yearsOfExperience: doctor.doctorProfile?.experienceYears || 0,
      hospital: doctor.doctorProfile?.clinicName || null,
      consultationMode: doctor.doctorProfile?.consultationMode || null,
      availability: doctor.doctorProfile?.availability || null,
      isCurrentlyAssigned: assignedDoctorIds.has(doctor.id),
      matchReason: 'Available for consultation' // Generic reason since we're showing all doctors
    }))

    return NextResponse.json({
      doctors: doctorsWithStatus,
      totalFound: doctors.length
    })

  } catch (error) {
    console.error('Get doctors error:', error)
    return handleMiddlewareError(error)
  }
}