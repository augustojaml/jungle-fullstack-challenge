import { zodResolver } from '@hookform/resolvers/zod'
import { Link } from '@tanstack/react-router'
import { LockIcon, MailIcon } from 'lucide-react'
import { useForm } from 'react-hook-form'

import { ButtonToggleTheme } from '@/shared/components/customs/button-toggle-theme'
import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
import { InputWithIcon } from '@/shared/components/customs/input-with-icon'
import { ProcessMessage } from '@/shared/components/customs/process-message'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/shared/components/primitives/card'
import { Separator } from '@/shared/components/primitives/separator'
import { envConfig } from '@/shared/config/env'

import { useLoginMutation } from '../../react-query/use-login-mutation'
import { LoginParamsDto, loginSchema } from '../../schema/login-schema'

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginParamsDto>({
    resolver: zodResolver(loginSchema),
    mode: 'all',
  })

  const loginMT = useLoginMutation()

  const onSubmit = async (data: LoginParamsDto) => {
    await loginMT.mutateAsync(data)
  }

  return (
    <ProcessMessage
      titleSuccess="Sign in success"
      titleError="Sign in error"
      successMessage={`Welcome to ${envConfig.VITE_APP_NAME}`}
      isLoading={loginMT.isPending}
      isSuccess={loginMT.isSuccess}
      error={loginMT.error}
    >
      <Card className="border-muted bg-card/90 w-full max-w-md backdrop-blur">
        <CardHeader className="flex justify-between">
          <div className="space-y-2">
            <CardTitle className="text-primary">Sign in to continue</CardTitle>
            <CardDescription>
              Stay productive with smart and connected task management
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
            {/* email */}
            <InputWithIcon
              label="Email"
              id="email"
              placeholder="you@example.com"
              icon={MailIcon}
              {...register('email')}
              error={errors.email?.message}
              disabled={loginMT.isPending}
            />

            <InputWithIcon
              label="Password"
              id="password"
              type="password"
              placeholder="******"
              icon={LockIcon}
              {...register('password')}
              error={errors.password?.message}
              disabled={loginMT.isPending}
            />

            <ButtonWithLoading
              className="w-full"
              type="submit"
              isLoading={loginMT.isPending}
              disabled={loginMT.isPending}
            >
              Sign in
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
                to="/auth/register"
              >
                Register
              </Link>
            </p>
            <div className="flex items-center justify-center">
              <ButtonToggleTheme />
            </div>
          </div>
        </CardContent>
      </Card>
    </ProcessMessage>
  )
}

export { LoginForm }
