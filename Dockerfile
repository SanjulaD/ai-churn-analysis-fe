# Stage 1: Builder
FROM node:18 AS builder

WORKDIR /app

COPY package*.json ./
RUN npm ci --legacy-peer-deps
COPY . .
RUN npm run build

# Stage 2: Runtime
FROM node:18 AS runtime

WORKDIR /app

COPY --from=builder /app/dist ./dist
COPY --from=builder /app/package*.json ./

RUN npm ci --omit=dev --legacy-peer-deps

EXPOSE 3000

CMD ["node", "dist/index.js"]