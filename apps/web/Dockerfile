# BASE
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
RUN apk add --no-cache libc6-compat

# BUILDER
FROM base AS builder
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo@^2.0.0 prune --scope=@repo/web --docker

# INSTALLER
FROM base AS installer
WORKDIR /app
COPY --from=builder /repo/out/json/ ./
RUN pnpm install --frozen-lockfile
COPY --from=builder /repo/out/full/ ./


ARG VITE_API_URL
ARG VITE_APP_NAME
ARG VITE_APP_ENVIRONMENT
ARG VITE_WS_URL
ARG VITE_WS_PATH

ENV VITE_API_URL=$VITE_API_URL
ENV VITE_APP_NAME=$VITE_APP_NAME
ENV VITE_APP_ENVIRONMENT=$VITE_APP_ENVIRONMENT
ENV VITE_WS_URL=$VITE_WS_URL
ENV VITE_WS_PATH=$VITE_WS_PATH

RUN pnpm -w turbo run build --filter @repo/web

# SERVER
FROM node:22-alpine AS runner
WORKDIR /app
RUN npm i -g serve
RUN addgroup --system --gid 1001 nodejs && adduser --system --uid 1001 webuser
USER webuser
COPY --from=installer --chown=webuser:nodejs /app/apps/web/dist ./dist
EXPOSE 3000
CMD ["serve", "-s", "dist", "-l", "3000"]
