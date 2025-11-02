import { Button } from '@/shared/components/primitives/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/primitives/table'

type TableErrorProps = {
  message?: string
  onRetry?: () => void
}

export const TableError = ({
  message = 'Something went wrong while loading tasks.',
  onRetry,
}: TableErrorProps) => {
  return (
    <Table className="w-full">
      <TableHeader className="bg-muted/60">
        <TableRow className="[&_th]:py-3">
          <TableHead className="min-w-[260px]">Task Name</TableHead>
          <TableHead className="min-w-[220px]">Created By</TableHead>
          <TableHead className="min-w-[140px]">Date</TableHead>
          <TableHead className="min-w-[140px]">Status</TableHead>
          <TableHead className="min-w-[120px] text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        <TableRow>
          <TableCell colSpan={7} className="py-8 text-center">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-3">
              <p className="text-muted-foreground text-sm">{message}</p>
              {onRetry && (
                <Button onClick={onRetry} variant="outline" className="h-8">
                  Try again
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
