import { BellRing, ClipboardList, Users2, Workflow } from 'lucide-react'
import type { ComponentType } from 'react'
import { useMemo } from 'react'

import { APP_NAME as APP } from '@/shared/constants/app-name' // opcional

export type LoadingIconWaveProps = {
  /** Ícones a exibir; por padrão usa os 4 do tema “tarefas inteligentes e digitais” */
  icons?: ComponentType<{ className?: string }>[]

  /** Duração da animação em segundos (default 1.2) */
  duration?: number

  /** Atraso incremental entre ícones em segundos (default 0.12) */
  delayStep?: number

  /** Tamanho visual */
  size?: 'sm' | 'md' | 'lg'

  /** Texto abaixo (default "Loading") */
  label?: string

  /** Nome do app exibido no pill (fallback "app-pools") */
  appName?: string
}

const LoadingIconWave = ({
  icons = [ClipboardList, Workflow, Users2, BellRing],
  duration = 1.2,
  delayStep = 0.12,
  size = 'md',
  label = 'Loading',
  appName = APP || 'app-pools',
}: LoadingIconWaveProps) => {
  const dims = useMemo(() => {
    switch (size) {
      case 'sm':
        return { circle: 'h-8 w-8', icon: 'h-4 w-4', text: 'text-xs' }
      case 'lg':
        return { circle: 'h-14 w-14', icon: 'h-8 w-8', text: 'text-xl' }
      default:
        return { circle: 'h-11 w-11', icon: 'h-6 w-6', text: 'text-sm' }
    }
  }, [size])

  return (
    <div className="bg-background text-foreground relative flex min-h-screen w-full items-center justify-center">
      {/* decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="from-primary/15 to-secondary/15 absolute -top-24 -left-24 h-72 w-[140%] rounded-full bg-linear-to-br blur-3xl" />
        <div className="to-primary/15 absolute -right-32 -bottom-32 h-80 w-[120%] rounded-full bg-linear-to-tr from-emerald-400/15 blur-3xl" />
      </div>

      <div className="relative z-10 flex flex-col items-center gap-6">
        {/* brand pill */}
        <div className="bg-card/60 text-muted-foreground inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs backdrop-blur">
          <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-emerald-500" />
          {appName}
        </div>

        {/* icons wave */}
        <div className="flex items-end gap-3">
          {icons.map((Icon, i) => (
            <div
              key={i}
              className={`border-primary/30 bg-card/80 text-primary grid place-items-center rounded-full border shadow-sm ${dims.circle} ${dims.text} animate-icon-wave will-change-transform`}
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

        <p className="text-muted-foreground text-xl font-bold">{label}</p>
      </div>

      {/* local keyframes (sem tocar no tailwind.config) */}
      <style>{`
        @keyframes icon-wave {
          0%, 100% { transform: translateY(0) scale(1); opacity: 0.9; }
          25% { transform: translateY(-6%) scale(1.08); opacity: 1; }
          50% { transform: translateY(0) scale(0.96); opacity: 0.85; }
          75% { transform: translateY(6%) scale(1.04); opacity: 0.95; }
        }
        .animate-icon-wave {
          animation-name: icon-wave;
          animation-timing-function: cubic-bezier(.22,.61,.36,1);
          animation-iteration-count: infinite;
        }
      `}</style>
    </div>
  )
}

export { LoadingIconWave }
