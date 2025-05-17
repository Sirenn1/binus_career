import { ReactNode } from 'react';
import {
  ColumnDef as ReactTableColumnDef,
  ColumnSort as ReactTableColumnSort,
  SortingState as ReactTableSortingState,
  VisibilityState as ReactTableVisibilityState,
  HeaderGroup as ReactTableHeaderGroup,
  Row as ReactTableRow,
  Cell as ReactTableCell,
  Header as ReactTableHeader
} from '@tanstack/react-table';

// Re-export types with proper names
export type ColumnDef<T> = ReactTableColumnDef<T>;
export type ColumnSort = ReactTableColumnSort;
export type SortingState = ReactTableSortingState;
export type VisibilityState = ReactTableVisibilityState;
export type HeaderGroup = ReactTableHeaderGroup<any>;
export type Row = ReactTableRow<any>;
export type Cell = ReactTableCell<any, any>;
export type Header = ReactTableHeader<any, any>; 