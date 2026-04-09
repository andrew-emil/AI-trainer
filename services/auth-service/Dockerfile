FROM node:22-alpine3.21

WORKDIR /app

# Install wget for healthcheck (curl not in alpine)
RUN apk add --no-cache wget

COPY package*.json ./
RUN npm install --legacy-peer-deps

COPY . .

# Build-time: generate Prisma client
RUN npx prisma generate

CMD ["npm", "run", "start:dev"]
