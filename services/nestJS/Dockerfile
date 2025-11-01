FROM node:22-alpine3.21 AS base

WORKDIR /usr/src/app
COPY package.json package-lock.json ./
RUN npm ci --legacy-peer-deps


FROM base AS development
ARG APP_NAME
ENV APP_NAME=${APP_NAME}
WORKDIR /usr/src/app

COPY . .
EXPOSE 3000

CMD ["sh", "-c", "npm run start:dev ${APP_NAME}"]

# FROM node:22-alpine3.21 AS runner
# ARG APP_NAME
# ARG NODE_ENV=production
# ENV NODE_ENV=${NODE_ENV}
# WORKDIR /usr/src/app

# COPY package.json package-lock.json ./
# RUN npm i --production

# COPY --from=development /usr/src/app/dist ./dist
# ENV NODE_ENV=production
# EXPOSE 3000
# RUN --mount=type=cache,target=/root/.npm \
#     if [ -z "$APP_NAME" ]; then echo "APP_NAME not provided"; exit 1; fi && \
#     npm run start:prod:$APP_NAME