import { Task } from '@repo/types'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeft,
  ChevronsRight,
} from 'lucide-react'

import { Button } from '@/shared/components/primitives/button'

interface TablePaginationProps {
  tasks?: Task[]
  total?: number
  page?: number
  size?: number
  onPageChange?: (page: number) => void
  onSizeChange?: (size: number) => void
}

const TablePagination = ({
  total = 0,
  page = 1,
  size = 5,
  onPageChange,
  onSizeChange,
}: TablePaginationProps) => {
  const pageCount = Math.max(1, Math.ceil(total / Math.max(1, size)))
  const firstIndex = total === 0 ? 0 : (page - 1) * size + 1
  const lastIndex = Math.min(page * size, total)

  const canPrev = page > 1
  const canNext = page < pageCount

  const handleFirstPage = () => onPageChange?.(1)
  const handlePrevPage = () => onPageChange?.(page - 1)
  const handleNextPage = () => onPageChange?.(page + 1)
  const handleLastPage = () => onPageChange?.(pageCount)

  return (
    <div className="mt-3 flex w-full items-center justify-between gap-3 px-2">
      {/* esquerda: "Showing X of Y items" */}
      <span className="text-muted-foreground text-xs">
        Showing{' '}
        <span className="text-foreground font-medium">
          {firstIndex}-{lastIndex}
        </span>{' '}
        of <span className="text-foreground font-medium">{total}</span> items
      </span>

      <div className="flex items-center gap-3">
        {/* centro: "Rows per page" */}
        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">Rows per page</span>
          <select
            className="bg-card text-foreground h-8 rounded-md border px-2 text-xs outline-none"
            value={size}
            onChange={(e) => onSizeChange?.(Number(e.target.value))}
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
            <option value={50}>50</option>
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-muted-foreground text-xs">
            Page <span className="text-foreground font-medium">{page}</span> of{' '}
            <span className="text-foreground font-medium">{pageCount}</span>
          </span>

          <div className="flex items-center gap-1">
            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canPrev}
              onClick={handleFirstPage}
              aria-label="First page"
              title="First page"
            >
              <ChevronsLeft className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canPrev}
              onClick={handlePrevPage}
              aria-label="Previous page"
              title="Previous page"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canNext}
              onClick={handleNextPage}
              aria-label="Next page"
              title="Next page"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>

            <Button
              type="button"
              variant="outline"
              size="icon"
              className="h-8 w-8"
              disabled={!canNext}
              onClick={handleLastPage}
              aria-label="Last page"
              title="Last page"
            >
              <ChevronsRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export { TablePagination }
