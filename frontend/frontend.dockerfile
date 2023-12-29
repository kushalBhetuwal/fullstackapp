FROM node:18-alpine AS base

# Install dependencies
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

# Build the application
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm install -g npm@latest
RUN npm run build

# Set up the runtime environment
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

# Create a non-root user and set file permissions
RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

# Copy the build output from the builder stage
COPY --from=builder /app/public ./public
RUN mkdir .next
RUN chown nextjs:nodejs .next
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Switch to non-root user
USER nextjs

# Expose the port the app runs on
EXPOSE 3000

# Set the hostname (bind to all network interfaces)
ENV HOSTNAME "0.0.0.0"

# Start the application
CMD ["node", "server.js"]
