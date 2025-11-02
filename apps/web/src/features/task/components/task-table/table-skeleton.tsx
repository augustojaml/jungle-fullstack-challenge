import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/shared/components/primitives/table'

type TableSkeletonProps = {
  rows?: number
}

const shimmer = 'animate-pulse bg-muted rounded'

export const TableSkeleton = ({ rows = 5 }: TableSkeletonProps) => {
  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-end gap-4">
        <div className="bg-muted h-9 w-[130px] animate-pulse rounded" />
      </div>
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
          {Array.from({ length: rows }).map((_, i) => (
            <TableRow key={i} className="hover:bg-muted/30">
              <TableCell className="font-medium">
                <div className={`${shimmer} h-4 w-3/4`} />
              </TableCell>

              <TableCell>
                <div className="flex items-center gap-2">
                  <div className={`${shimmer} h-9 w-9 rounded-full`} />
                  <div className={`${shimmer} h-4 w-32`} />
                </div>
              </TableCell>

              <TableCell className="text-muted-foreground">
                <div className={`${shimmer} h-4 w-24`} />
              </TableCell>

              <TableCell>
                <div className={`${shimmer} h-6 w-24`} />
              </TableCell>

              <TableCell className="text-right">
                <div className="inline-flex items-center gap-2">
                  <div className={`${shimmer} h-8 w-8`} />
                  <div className={`${shimmer} h-8 w-8`} />
                  <div className={`${shimmer} h-8 w-8`} />
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
