# BASE
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
RUN apk add --no-cache libc6-compat

# BUILDER (turbo prune)
FROM base AS builder
WORKDIR /repo
COPY . .
RUN pnpm dlx turbo@^2.0.0 prune --scope=@repo/task-service --docker

# INSTALLER (build + deploy isolado do workspace)
FROM base AS installer
WORKDIR /app
COPY --from=builder /repo/out/json/ ./
RUN pnpm install --frozen-lockfile
COPY --from=builder /repo/out/full/ ./
RUN pnpm --filter @repo/task-service... run build
RUN pnpm --filter @repo/task-service deploy --prod /opt/deploy
RUN mkdir -p /opt/deploy/dist \
 && cp -r apps/task-service/dist/* /opt/deploy/dist/ \
 && cp apps/task-service/package.json /opt/deploy/package.json

# INSTALLER (build + deploy isolado do workspace)
FROM node:22-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3001
EXPOSE 3001
RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 appuser
USER appuser
COPY --from=installer --chown=appuser:nodejs /opt/deploy/ /app/
CMD ["node", "dist/main.js"]
