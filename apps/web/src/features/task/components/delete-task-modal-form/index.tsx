// src/app/tasks/components/delete-task-modal.tsx
import { AlertTriangle, Trash2 } from 'lucide-react'

import { ButtonWithLoading } from '@/shared/components/customs/button-with-loading'
import { DialogModal } from '@/shared/components/customs/dialog-modal'
import { Separator } from '@/shared/components/primitives/separator'

type DeleteTaskModalProps = {
  open: boolean
  onOpenChange: (o: boolean) => void
  onConfirm: () => void | Promise<void>
  isDeleting?: boolean
  taskTitle?: string
  taskId?: string
}

const DeleteTaskModal = ({
  open,
  onOpenChange,
  onConfirm,
  isDeleting = false,
  taskTitle,
  taskId,
}: DeleteTaskModalProps) => {
  const handleClose = () => {
    onOpenChange(false)
  }

  return (
    <DialogModal
      open={open}
      onOpenChange={(o) => {
        if (!o) handleClose()
        else onOpenChange(o)
      }}
      size="sm"
      title="Delete task"
      description="This action cannot be undone. Please review the details before proceeding."
    >
      {/* accent blobs (tema) */}
      <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <div className="bg-destructive/15 absolute -top-10 -left-10 h-28 w-28 rounded-full blur-2xl" />
        <div className="bg-primary/10 absolute -right-10 -bottom-10 h-24 w-24 rounded-full blur-2xl" />
      </div>

      {/* header info */}
      <div className="flex items-start gap-3">
        <div className="bg-destructive/10 text-destructive flex h-10! w-14! items-center justify-center rounded-full">
          <Trash2 className="h-4 w-4" />
        </div>
        <div className="min-w-0">
          <p className="text-sm">You are about to permanently delete:</p>
          <p className="text-foreground truncate text-sm font-medium">
            {taskTitle ?? 'Untitled task'}{' '}
            {taskId ? (
              <span className="text-muted-foreground font-normal">
                — <span className="font-mono">{taskId}</span>
              </span>
            ) : null}
          </p>
        </div>
      </div>

      <Separator className="my-4" />

      {/* consequences */}
      <div className="border-destructive/30 bg-destructive/5 rounded-md border p-3">
        <div className="text-destructive mb-1.5 flex items-center gap-2">
          <AlertTriangle className="h-4 w-4" />
          <span className="text-sm font-semibold">What will happen</span>
        </div>
        <ul className="text-muted-foreground list-disc space-y-1 pl-5 text-xs">
          <li>The task will be removed from all lists and views.</li>
          <li>Comments and assignees will be detached from this task.</li>
          <li>This operation is irreversible.</li>
        </ul>
      </div>

      {/* actions */}
      <div className="mt-5 flex justify-end gap-2">
        <ButtonWithLoading
          variant="outline"
          type="button"
          onClick={handleClose}
          disabled={isDeleting}
        >
          Cancel
        </ButtonWithLoading>

        <ButtonWithLoading
          type="button"
          variant="destructive"
          iconLeft={Trash2}
          onClick={async () => {
            await onConfirm()
            handleClose()
          }}
          isLoading={isDeleting}
          disabled={isDeleting}
        >
          Delete task
        </ButtonWithLoading>
      </div>
    </DialogModal>
  )
}

export { DeleteTaskModal }
