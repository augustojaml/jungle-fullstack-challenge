import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import {
  BellRingIcon,
  ClipboardListIcon,
  Users2Icon,
  WorkflowIcon,
} from 'lucide-react'

import { tokenService } from '@/features/auth/services/token-service'
import { APP_NAME } from '@/shared/constants/app-name'

const Route = createFileRoute('/auth')({
  beforeLoad: () => {
    const token = tokenService.getToken()
    if (token) {
      throw redirect({ to: '/task' })
    }
  },
  component: () => (
    <div className="bg-background text-foreground min-h-screen">
      {/* page container */}
      <div className="mx-auto grid min-h-screen w-full grid-cols-1 md:grid-cols-2">
        {/* LEFT: brand + messaging */}
        <div className="relative hidden items-center justify-center p-8 md:flex">
          {/* background glow */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="from-primary/25 to-secondary/25 absolute top-0 -left-20 h-72 w-72 rounded-full bg-linear-to-br blur-3xl" />
            <div className="to-primary/20 absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-linear-to-tr from-emerald-400/20 blur-3xl" />
          </div>

          <div className="relative z-10 max-w-md">
            <h1 className="text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
              Collaborative <br />
              <span className="text-primary">{APP_NAME}</span>
            </h1>

            {/* short description */}
            <p className="text-muted-foreground mt-4 text-base">
              Efficiency, transparency, and collaboration through a digital task
              management ecosystem. {` `}
              <span className="text-primary font-semibold">
                TaskIntelligence
              </span>
              .
            </p>

            {/* animated icons */}
            <div className="mt-8 flex items-center gap-4">
              <div className="bg-primary/15 text-primary animate-float-slow flex h-10 w-10 items-center justify-center rounded-full">
                <ClipboardListIcon className="h-4 w-4" />
              </div>
              <div className="bg-chart-2/15 text-chart-2 animate-float flex h-12 w-12 items-center justify-center rounded-full">
                <WorkflowIcon className="h-6 w-6" />
              </div>
              <div className="bg-chart-3/15 text-chart-3 animate-float-delay flex h-8 w-8 items-center justify-center rounded-full">
                <Users2Icon className="h-4 w-4" />
              </div>
              <div className="bg-chart-1/15 text-chart-1 animate-float flex h-9 w-9 items-center justify-center rounded-full">
                <BellRingIcon className="h-4 w-4" />
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT: auth content */}
        <div className="flex w-full flex-col items-center justify-center">
          <Outlet />
        </div>
      </div>
      <style>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }

        .animate-float {
          animation: float 3s ease-in-out infinite;
        }

        .animate-float-slow {
          animation: float 4.5s ease-in-out infinite;
        }

        .animate-float-delay {
          animation: float 3.5s ease-in-out infinite;
          animation-delay: 1s;
        }
      `}</style>
    </div>
  ),
})

export { Route }
