import { Button } from '@/shared/components/primitives/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/primitives/table'

type TableEmptyProps = {
  onCreate?: () => void
}

export const TableEmpty = ({ onCreate }: TableEmptyProps) => {
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
          <TableCell colSpan={7} className="py-12 text-center">
            <div className="mx-auto flex max-w-xl flex-col items-center gap-4">
              <h2 className="text-foreground text-lg font-semibold">
                Welcome to your Task Board! 👋
              </h2>

              <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
                No task has been created yet. Here you can organize the organize
                organize ideas, plan activities and track the progress of your
                day.
              </p>

              {onCreate && (
                <Button onClick={onCreate} className="h-9 px-4">
                  + Criar primeira tarefa
                </Button>
              )}
            </div>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  )
}
