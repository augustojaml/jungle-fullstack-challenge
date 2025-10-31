# BASE
FROM node:22-alpine AS base
WORKDIR /app
RUN corepack enable && corepack prepare pnpm@10.10.0 --activate
RUN apk add --no-cache libc6-compat

# BUILDER (turbo prune)
FROM base AS builder
WORKDIR /repo
COPY . .
# Puxa o api-gateway + TODAS as deps dele para /out
RUN pnpm dlx turbo@^2.0.0 prune --scope=@repo/api-gateway --docker

# INSTALLER (build + deploy isolado do workspace)
FROM base AS installer
WORKDIR /app

# 1) Instala só o que o prune deixou
COPY --from=builder /repo/out/json/ ./
RUN pnpm install --frozen-lockfile

# 2) Copia o código prunado
COPY --from=builder /repo/out/full/ ./

# 3) **CONSTRÓI O GATEWAY E SUAS DEPENDÊNCIAS**
#    O seletor com "..." garante build de @repo/types e demais deps.
RUN pnpm -w --filter @repo/api-gateway... run build

# 4) Deploy (se existir script deploy no gateway; se não, cai no fallback)
RUN pnpm -w --filter @repo/api-gateway run deploy --prod /opt/deploy || true

# 5) Fallback de deploy: garante /opt/deploy com dist e package.json
RUN mkdir -p /opt/deploy/dist \
 && cp -r apps/api-gateway/dist/* /opt/deploy/dist/ \
 && cp apps/api-gateway/package.json /opt/deploy/package.json

# RUNNER
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
