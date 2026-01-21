    # 1. Builder stage
    FROM node:20-bullseye AS builder
    WORKDIR /app
    COPY carebridge/package*.json ./
    RUN npm install
    COPY carebridge/ .
    RUN npx prisma generate
    RUN npm run build

    # 2. Production stage
    FROM node:20-bullseye-slim AS production
    WORKDIR /app
    ENV NODE_ENV=production

    # Create a non-root user
    RUN addgroup --system --gid 1001 nodejs
    RUN adduser --system --uid 1001 nextjs

    # Copy production dependencies and built app from builder stage
    COPY --from=builder /app/package*.json ./
    RUN npm ci --omit=dev
    COPY --from=builder /app/.next ./.next
    COPY --from=builder /app/public ./public
    COPY --from=builder /app/node_modules/.prisma ./.prisma

    # Change ownership and switch to non-root user
    RUN chown -R nextjs:nodejs /app
    USER nextjs

    EXPOSE 3000
    CMD ["npm", "run", "start"]
