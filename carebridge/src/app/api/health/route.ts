import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import { redis } from '@/lib/redis'

export async function GET() {
  try {
    // Test database connection
    await prisma.$connect()
    
    // Test Redis connection (but don't fail if Redis is not available)
    let redisStatus = 'not configured'
    try {
      if (process.env.REDIS_URL && process.env.REDIS_URL !== 'your_redis_url_here') {
        await redis.ping()
        redisStatus = 'connected'
      }
    } catch (error) {
      redisStatus = 'failed (using mock)'
    }
    
    return NextResponse.json({
      status: 'healthy',
      database: 'connected',
      redis: redisStatus,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    console.error('Health check failed:', error)
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Service unavailable',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    )
  }
}