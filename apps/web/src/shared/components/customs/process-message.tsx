import { AxiosError } from 'axios'
import { type ReactNode, useEffect } from 'react'

import { useToast } from '@/app/providers/toast-provider'

interface IProcessErrorProps {
  position?: 'bottom-right' | 'top-right'
  error?: unknown
  successMessage?: string
  titleSuccess?: string
  titleError?: string
  isSuccess?: boolean
  isError?: boolean
  isLoading?: boolean
  onReset?: () => void
  children?: ReactNode
}

export const ProcessMessage = ({
  successMessage,
  position = 'top-right',
  error,
  isSuccess,
  titleSuccess = 'Signing in successfully',
  titleError = 'Signing in error',
  onReset,
  children,
}: IProcessErrorProps) => {
  const { showToast } = useToast()

  const processError = (errorHandler: unknown) => {
    if (errorHandler instanceof AxiosError) {
      return errorHandler.response?.data.message || errorHandler.message
    }

    if (error instanceof Error) {
      return error.message
    }

    return 'Unexpected error'
  }

  useEffect(() => {
    if (isSuccess && successMessage) {
      showToast({
        type: 'success',
        message: successMessage,
        title: titleSuccess,
        position,
        duration: 5000,
      })
      onReset?.()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess])

  useEffect(() => {
    if (error) {
      showToast({
        type: 'error',
        message: processError(error),
        title: titleError,
        position,
        duration: 5000,
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error])

  return children
}
