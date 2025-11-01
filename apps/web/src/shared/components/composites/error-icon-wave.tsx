import { useNavigate } from '@tanstack/react-router'
import {
  AlertTriangle,
  BellRing,
  ClipboardList,
  Home,
  RotateCcw,
  Users2,
  Workflow,
} from 'lucide-react'
import type { ComponentType } from 'react'
import { useMemo } from 'react'

import { APP_NAME } from '@/shared/constants/app-name'

import { Button } from '../primitives/button'

type ErrorIconWaveProps = {
  /** Ícones a exibir; por padrão usa os 4 do tema “tarefas inteligentes e digitais” */
  icons?: ComponentType<{ className?: string }>[]
  title?: string
  message?: string
  errorId?: string | number
  onRetry?: () => void
  onNavigate?: () => void
  isNavigateToHome?: boolean
  size?: 'sm' | 'md' | 'lg'
  /** controla intensidade/velocidade do “shake” */
  duration?: number
  delayStep?: number
}

const ErrorIconWave = ({
  icons = [ClipboardList, Workflow, Users2, BellRing],
  title = 'Something went wrong',
  message = 'We couldn’t load your pools. Please try again.',
  errorId,
  onRetry,
  onNavigate,
  isNavigateToHome = false,
  size = 'md',
  duration = 1.0,
  delayStep = 0.1,
}: ErrorIconWaveProps) => {
  const navigate = useNavigate()

  const dims = useMemo(() => {
    switch (size) {
      case 'sm':
        return { circle: 'h-10 w-10', icon: 'h-4 w-4', text: 'text-xs' }
      case 'lg':
        return { circle: 'h-16 w-16', icon: 'h-8 w-8', text: 'text-xl' }
      default:
        return { circle: 'h-12 w-12', icon: 'h-6 w-6', text: 'text-sm' }
    }
  }, [size])

  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center">
      {/* decorative background blobs (com toque “danger”) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="from-primary/15 to-destructive/15 absolute -top-24 -left-24 h-72 w-[140%] rounded-full bg-linear-to-br blur-3xl" />
        <div className="to-primary/10 absolute -right-32 -bottom-32 h-80 w-[120%] rounded-full bg-linear-to-tr from-emerald-400/10 blur-3xl" />
      </div>

      <div className="relative z-10 flex max-w-xl flex-col items-center gap-6 px-6 text-center">
        {/* brand pill */}
        <div className="bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur">
          <span className="bg-destructive inline-block h-2 w-2 animate-pulse rounded-full" />
          {APP_NAME}
        </div>

        <div className="flex items-center gap-2">
          <AlertTriangle className="text-destructive h-5 w-5" />
          <h1 className="text-3xl leading-tight font-semibold tracking-tight text-balance md:text-4xl">
            {title}
          </h1>
        </div>

        <p className="text-muted-foreground text-sm text-pretty md:text-base">
          {message}
          {errorId ? (
            <>
              {' '}
              <span className="text-foreground font-medium">
                Error ID:
              </span>{' '}
              <span className="text-muted-foreground font-mono">{errorId}</span>
            </>
          ) : null}
        </p>

        {/* ícones com animação “glitch” */}
        <div className="mt-2 flex items-end gap-3">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className={`border-destructive/30 bg-card/80 text-destructive grid place-items-center rounded-full border shadow-sm ${dims.circle} animate-icon-glitch will-change-transform`}
              style={{
                animationDuration: `${duration}s`,
                animationDelay: `${i * delayStep}s`,
              }}
              aria-hidden="true"
            >
              <Icon className={dims.icon} />
            </div>
          ))}
        </div>

        {/* ações */}
        <div className="mt-2 flex flex-wrap items-center justify-center gap-3">
          {onRetry && (
            <Button variant="default" onClick={onRetry} className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Try again
            </Button>
          )}
          <Button
            variant="outline"
            onClick={
              isNavigateToHome ? () => navigate({ to: '/' }) : onNavigate
            }
            className="gap-2"
          >
            <Home className="h-4 w-4" />
            Go to home
          </Button>
        </div>
      </div>

      {/* keyframes locais */}
      <style>{`
        /* “glitch”/shake sutil + leve scale para remeter ao erro */
        @keyframes icon-glitch {
          0%, 100% { transform: translate(0, 0) scale(1); opacity: 0.95; }
          15% { transform: translate(-2%, -6%) rotate(-1.2deg) scale(1.06); opacity: 1; }
          30% { transform: translate(2.5%, 5%) rotate(1.2deg) scale(0.98); opacity: 0.9; }
          45% { transform: translate(-3%, 2%) rotate(-0.8deg) scale(1.04); opacity: 0.95; }
          60% { transform: translate(3%, -3%) rotate(0.8deg) scale(0.97); opacity: 0.9; }
          75% { transform: translate(-1%, 3%) rotate(-0.4deg) scale(1.02); opacity: 0.95; }
        }
        .animate-icon-glitch {
          animation-name: icon-glitch;
          animation-timing-function: cubic-bezier(.22,.61,.36,1);
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}

export { ErrorIconWave }
