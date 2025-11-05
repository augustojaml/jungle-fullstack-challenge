import { Comment } from '@repo/types'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'

import { Button } from '@/shared/components/primitives/button'

interface TablePaginationProps {
  comment?: Comment[]
  total?: number
  page?: number
  size?: number
  onPageChange?: (page: number) => void
}

const PageCommentPagination = ({
  total = 0,
  page = 1,
  size = 5,
  onPageChange,
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
    <div className="flex items-center justify-end gap-4">
      <span className="text-muted-foreground text-xs">
        {`Showing  `}
        <span className="text-foreground font-medium">
          {`${firstIndex} - ${lastIndex}`}
        </span>{' '}
        of <span className="text-foreground font-medium">{total}</span> items
      </span>
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-xs">
          {`Page `}
          <span className="text-foreground font-medium">{page}</span>
          {` of `}
          <span className="text-foreground font-medium">{pageCount}</span>
        </span>
        <div className="flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={!canPrev}
            onClick={handleFirstPage}
            aria-label="First page"
            title="First page"
          >
            <ChevronsLeftIcon className="h-4 w-4" />
          </Button>

          <Button
            type="button"
            variant="ghost"
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
            variant="ghost"
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
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            disabled={!canNext}
            onClick={handleLastPage}
            aria-label="Last page"
            title="Last page"
          >
            <ChevronsRightIcon className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  )
}

export { PageCommentPagination }
