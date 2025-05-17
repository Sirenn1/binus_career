import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import {
  Box,
  MenuItem,
  Select,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { styled } from "@mui/system";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
import { ColumnDef, HeaderGroup, Row, Cell, Header, SortingState } from '../../../types/table';
import { ITableConfiguration } from '../table/ITable';
import NumberPagination from '../table_pagination/NumberPagination';

const StyledTableRow = styled(TableRow)(() => ({
  "&:nth-of-type(odd)": {
    backgroundColor: "white",
  },
  "&:nth-of-type(even)": {
    backgroundColor: "#fafafa",
  },
}));

function TableNoDataRow({
  colLength,
}: {
  colLength: number;
}): React.ReactElement {
  return (
    <TableRow>
      <TableCell
        colSpan={colLength}
        sx={{ textAlign: "center", border: 1, borderColor: "lightgray" }}
      >
        No Data Shown
      </TableCell>
    </TableRow>
  );
}

interface TableAjaxProps<TData> {
  configuration: ITableConfiguration<TData>;
}

export function TableAjax<TData>({ configuration }: TableAjaxProps<TData>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const { getRowModel, getHeaderGroups } = useReactTable({
    data: configuration.data,
    columns: configuration.columns,
    getCoreRowModel: getCoreRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
    isMultiSortEvent: () => configuration.isMultiSort || false,
  });

  const sortingParams = sorting.length > 0 ? 
    sorting
      .map(
        (sort, index) =>
          `sort[${index}].id=${
            sort.id.charAt(0).toUpperCase() + sort.id.slice(1)
          }&sort[${index}].desc=${sort.desc}`
      )
      .join('&') 
    : '';

  useEffect(() => {
    if (configuration.onSortChange) {
      configuration.onSortChange(sortingParams);
    }
  }, [sortingParams, configuration.onSortChange]);

  useEffect(() => {
    if (configuration.onPageChange && configuration.page !== undefined) {
      configuration.onPageChange(configuration.page);
    }
  }, [configuration.page, configuration.onPageChange]);

  useEffect(() => {
    if (configuration.onPageChange) {
      configuration.onPageChange(0);
    }
    if (configuration.onPageSizeChange && configuration.pageSize !== undefined) {
      configuration.onPageSizeChange(configuration.pageSize);
    }
  }, [configuration.pageSize, configuration.onPageSizeChange, configuration.onPageChange]);

  return (
    <>
      <TableContainer
        sx={{
          overflow: "auto",
          color: "white",
          maxHeight: configuration.maxTableHeight,
        }}
      >
        <Table stickyHeader>
          <TableHead sx={{ width: "100%" }}>
            {getHeaderGroups().map((headerGroup: HeaderGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableCell
                    key={header.id}
                    onClick={header.column.getToggleSortingHandler()}
                    sx={{
                      cursor: "pointer",
                      whiteSpace: "nowrap",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      fontWeight: "bold",
                      border: 1,
                      borderColor: "lightgray",
                      minWidth: header.column.columnDef.size,
                      position: "sticky",
                      top: 0,
                      zIndex: 1,
                      backgroundColor: "white",
                    }}
                  >
                    <Box
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                    >
                      <Typography fontWeight="bold" fontSize='12px'>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                      </Typography>

                      {header.column.getCanSort() && (
                        <Box
                          sx={{
                            position: "relative",
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                            justifyContent: "center",
                            marginLeft: "8px",
                            height: "38px",
                            width: "14px",
                          }}
                        >
                          <ArrowDropUpIcon
                            sx={{
                              fontSize: 28,
                              position: "absolute",
                              top: 0,
                              color:
                                header.column.getIsSorted() === "asc"
                                  ? "black"
                                  : "#ccc",
                              zIndex:
                                header.column.getIsSorted() === "asc" ? 1 : 0,
                            }}
                          />
                          <ArrowDropDownIcon
                            sx={{
                              fontSize: 28,
                              position: "absolute",
                              bottom: 0,
                              color:
                                header.column.getIsSorted() === "desc"
                                  ? "black"
                                  : "#ccc",
                              zIndex:
                                header.column.getIsSorted() === "desc" ? 1 : 0,
                            }}
                          />
                        </Box>
                      )}
                    </Box>
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody>
            {getRowModel().rows.length > 0 ? (
              getRowModel().rows.map((row: Row) => (
                <StyledTableRow key={row.id}>
                  {row.getVisibleCells().map((cell: Cell) => (
                    <TableCell
                      key={cell.id}
                      sx={{
                        border: 1,
                        borderColor: "lightgray",
                      }}
                    >
                      <Typography fontSize='12px'>
                        {flexRender(cell.column.columnDef.cell, {
                          ...cell.getContext(),
                          row,
                        })}
                      </Typography>
                    </TableCell>
                  ))}
                </StyledTableRow>
              ))
            ) : (
              <TableNoDataRow colLength={configuration.columns.length} />
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <Stack
        direction="row"
        justifyContent="flex-end"
        sx={{
          marginTop: "20px",
          marginRight: "20px",
          marginBottom: "20px",
          alignItems: "center",
        }}
        gap={1}
      >
        <Typography sx={{ marginRight: "10px" }}>{configuration.rowCount ?? 0} Results</Typography>

        <Typography>Show: </Typography>
        <Select
          value={configuration.pageSize ?? 10}
          onChange={(e) => configuration.onPageSizeChange?.(Number(e.target.value))}
          sx={{ width: 70 }}
        >
          {(configuration.pageSizeOptions ?? [10, 20, 50]).map((size) => (
            <MenuItem key={size} value={size}>
              {size}
            </MenuItem>
          ))}
        </Select>

        <NumberPagination
          pageIndex={configuration.page ?? 0}
          pageCount={Math.ceil((configuration.rowCount ?? 0) / (configuration.pageSize ?? 10))}
          setPageIndex={configuration.onPageChange ?? (() => {})}
        />
      </Stack>
    </>
  );
}
