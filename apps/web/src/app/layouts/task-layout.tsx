import { Outlet } from '@tanstack/react-router'

import { MainHeader } from './main-header'

const TaskLayout = () => {
  return (
    <div className="bg-background text-foreground relative h-screen">
      <MainHeader />
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="from-primary/25 to-destructive/25 absolute -top-12 -left-20 h-72 w-72 rounded-full bg-linear-to-br blur-3xl" />
        <div className="to-primary/20 from-secondary-400/20 absolute -right-24 -bottom-24 h-80 w-80 rounded-full bg-linear-to-tr blur-3xl" />
      </div>
      <div className="flex h-screen w-screen overflow-hidden">
        <Outlet />
      </div>
    </div>
  )
}

export { TaskLayout }
