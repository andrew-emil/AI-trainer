# apps/<app>/Dockerfile
######### Stage 1 — build #########
FROM node:18-alpine AS builder
WORKDIR /usr/src/app


# Copy everything (use .dockerignore to keep context small)
COPY . .

# Use npm ci for reproducible installs if package-lock.json exists
# Otherwise you can use `npm install`
RUN if [ -f package-lock.json ]; then npm ci --silent; else npm install --silent; fi

# Build only the requested app
ARG APP_NAME
# Fallback if build arg missing (optional)
RUN if [ -z "$APP_NAME" ]; then echo "APP_NAME not provided"; exit 1; fi
# You must have root scripts like "build:chatbot": "nest build chatbot"
RUN npm run build:${APP_NAME}

######### Stage 2 — runtime #########
FROM node:18-alpine AS runner
WORKDIR /usr/src/app

# create non-root user (optional)
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

ARG APP_NAME
# Copy compiled dist of the app from builder
COPY --from=builder /usr/src/app/apps/${APP_NAME}/dist ./dist
# Copy runtime package.json (if your app needs it)
COPY --from=builder /usr/src/app/package.json ./package.json

ENV NODE_ENV=production
EXPOSE 3000

CMD ["node", "dist/main.js"]
