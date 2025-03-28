# Use Node.js image
FROM node:18-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps

# Copy project files
COPY . .


# Build the Next.js project
RUN npm run build

# Production Stage
FROM node:18-alpine AS runner
WORKDIR /app

# Copy the environment file (if exists in your project folder)
# Make sure .env.production exists in your project folder
COPY .env.production .
COPY --from=builder /app/package.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3000

CMD ["npm", "start"]
