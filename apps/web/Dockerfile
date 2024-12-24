FROM node:18-alpine AS base

FROM base AS builder
RUN apk update
RUN apk add --no-cache libc6-compat
RUN npm install pnpm --global
WORKDIR /app
RUN pnpm install turbo 
COPY . .
RUN npx turbo prune web --docker

FROM base AS installer
RUN apk update
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY --from=builder /app/out/json/ .

RUN npm install pnpm --global
RUN pnpm install turbo --workspace-root

RUN pnpm install

COPY --from=builder /app/out/full/ .
#
RUN npx turbo build

FROM base AS runner
WORKDIR /app

RUN npm install -g serve

COPY --from=installer /app .

CMD serve -p ${PORT} apps/web/dist
