import Redis from 'ioredis'

const globalForRedis = globalThis as unknown as {
  redis: Redis | undefined
}

// Make Redis optional - if REDIS_URL is not properly configured, create a mock
let redisInstance: Redis | null = null

try {
  if (process.env.REDIS_URL && process.env.REDIS_URL !== 'your_redis_url_here') {
    redisInstance = new Redis(process.env.REDIS_URL)
  }
} catch (error) {
  console.warn('Redis connection failed, continuing without Redis:', error)
}

// Create a mock Redis client if real Redis is not available
const mockRedis = {
  ping: async () => 'PONG',
  get: async () => null,
  set: async () => 'OK',
  del: async () => 1,
  exists: async () => 0
}

export const redis = globalForRedis.redis ?? (redisInstance || mockRedis as any)

if (process.env.NODE_ENV !== 'production') globalForRedis.redis = redis