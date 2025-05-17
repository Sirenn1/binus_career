import { ColumnDef, SortingState, VisibilityState } from '../../../types/table';

export interface ITableConfiguration<TData> {
  data: TData[];
  columns: ColumnDef<TData>[];
  enableSorting?: boolean;
  enableColumnFilters?: boolean;
  enableColumnResizing?: boolean;
  enableColumnDragging?: boolean;
  enableColumnHiding?: boolean;
  enableRowSelection?: boolean;
  enableMultiRowSelection?: boolean;
  enableRowActions?: boolean;
  enablePagination?: boolean;
  enableGlobalFilter?: boolean;
  pageSize?: number;
  pageSizeOptions?: number[];
  pageCount?: number;
  page?: number;
  rowCount?: number;
  isMultiSort?: boolean;
  maxTableHeight?: string;
  columnVisibility?: VisibilityState;
  initialPageSize?: number;
  loading?: boolean;
  pageReset?: boolean;
  onPageChange?: (page: number) => void;
  onPageSizeChange?: (pageSize: number) => void;
  onSortChange?: (sorting: string) => void;
  onSortingChange?: (sorting: SortingState[]) => void;
  onVisibilityChange?: (visibility: VisibilityState) => void;
  onRowSelectionChange?: (selectedRows: TData[]) => void;
  onGlobalFilterChange?: (value: string) => void;
  onColumnFiltersChange?: (filters: any) => void;
  onColumnResizingChange?: (sizing: any) => void;
  onColumnDraggingChange?: (dragging: any) => void;
  onColumnHidingChange?: (hiding: any) => void;
  onRowActionsChange?: (actions: any) => void;
}
