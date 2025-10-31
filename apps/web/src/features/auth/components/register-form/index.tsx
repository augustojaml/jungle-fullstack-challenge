import { Link } from '@tanstack/react-router'
import { LockIcon, MailIcon } from 'lucide-react'

import { ButtonToggleTheme } from '@/shared/components/customs/button-toggle-theme'
import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
import { InputWithIcon } from '@/shared/components/customs/input-with-icon'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/primitives/card'
import { Separator } from '@/shared/components/primitives/separator'

const RegisterForm = () => {
  return (
    <Card className="border-muted bg-card/90 w-full max-w-md backdrop-blur">
      <CardHeader className="flex justify-between">
        <div className="space-y-2">
          <CardTitle className="text-primary">Register your account</CardTitle>
          <CardDescription>
            Start your journey toward intelligent and digital task management.
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent>
        <form className="space-y-6">
          {/* name */}
          <InputWithIcon
            label="Name"
            id="name"
            type="text"
            placeholder="John Doe"
          />

          {/* email */}
          <InputWithIcon
            label="Email"
            id="email"
            type="email"
            placeholder="you@example.com"
            icon={MailIcon}
          />

          <InputWithIcon
            label="Password"
            id="password"
            type="password"
            placeholder="******"
            icon={LockIcon}
          />

          <ButtonWithLoading className="w-full" type="submit">
            Register
          </ButtonWithLoading>
        </form>

        <div className="mt-8 space-y-4">
          <div className="relative my-8">
            <Separator className="w-full" />
            <span className="bg-card text-muted-foreground absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 px-4">
              Or continue with
            </span>
          </div>

          <p className="text-muted-foreground flex items-center justify-center space-x-2 text-center text-sm">
            <span>Don&apos;t have an account?</span>
            <Link
              className="text-primary font-medium hover:underline"
              to="/auth"
            >
              Login in
            </Link>
          </p>
          <div className="flex items-center justify-center">
            <ButtonToggleTheme />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export { RegisterForm }
