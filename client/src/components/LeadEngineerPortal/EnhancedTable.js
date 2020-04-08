import React from "react";

import MaUTable from "@material-ui/core/Table";
import PropTypes from "prop-types";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableFooter from "@material-ui/core/TableFooter";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TablePaginationActions from "./TablePaginationAction";
import TableRow from "@material-ui/core/TableRow";
import TableSortLabel from "@material-ui/core/TableSortLabel";
import TableToolbar from "./TableToolbar";
import Button from "@material-ui/core/Button";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import "./EnhancedTable.css";

import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable
} from "react-table";

const inputStyle = {
  fontSize: "14px",
  padding: 0,
  margin: 0,
  border: 0,
  background: "transparent"
};

// Create an editable cell renderer
const EditableCell = ({
  cell: { value: initialValue },
  row: { index },
  column: { id },
  updateMyData // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue);

  const onChange = e => {
    setValue(e.target.value);
  };

  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    updateMyData(index, id, value);
  };

  // If the initialValue is changed externall, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  return (
    <input
      style={inputStyle}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

EditableCell.propTypes = {
  cell: PropTypes.shape({
    value: PropTypes.any.isRequired
  }),
  row: PropTypes.shape({
    index: PropTypes.number.isRequired
  }),
  column: PropTypes.shape({
    id: PropTypes.number.isRequired
  }),
  updateMyData: PropTypes.func.isRequired
};

// Set our editable cell renderer as the default Cell renderer
const defaultColumn = {
  Cell: EditableCell
};

const EnhancedTable = ({
  columns,
  data,
  setData,
  updateMyData,
  skipPageReset
}) => {
  const {
    getTableProps,
    headerGroups,
    prepareRow,
    page,
    gotoPage,
    setPageSize,
    preGlobalFilteredRows,
    setGlobalFilter,
    state: { pageIndex, pageSize, globalFilter }
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
      autoResetPage: !skipPageReset,
      /* updateMyData isn't part of the API, but
      anything we put into these options will
      automatically be available on the instance.
      That way we can call this function from our
      cell renderer! */
      updateMyData
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
    hooks => {
      hooks.allColumns.push(columns => [
        ...columns,
        {
          id: "view",
          Header: <div>Information Page</div>,
          Cell: ({ row }) => (
            <Button variant="contained" color="primary">
              View
            </Button>
          )
        },

        {
          id: "option",
          Header: <div></div>,
          Cell: ({ row }) => (
            <Button>
              <MoreVertIcon></MoreVertIcon>
            </Button>
          )
        }
      ]);
    }
  );

  const handleChangePage = (event, newPage) => {
    gotoPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setPageSize(Number(event.target.value));
  };

  // Render the UI for your table
  return (
    <TableContainer className="enhancedTable-tableContainer">
      <TableToolbar
        preGlobalFilteredRows={preGlobalFilteredRows}
        setGlobalFilter={setGlobalFilter}
        globalFilter={globalFilter}
      />
      <MaUTable {...getTableProps()}>
        <TableHead className="enhancedTable-tableHead">
          {headerGroups.map(headerGroup => (
            <TableRow
              className="enhancedTable-tableRow"
              {...headerGroup.getHeaderGroupProps()}
            >
              {headerGroup.headers.map(column => (
                <TableCell
                  className="enhancedTable-tableCell"
                  {...(column.id === ("view" || "option")
                    ? column.getHeaderProps()
                    : column.getHeaderProps(column.getSortByToggleProps()))}
                >
                  <div className="enhancedTable-headerRow">
                    {column.render("Header")}
                  </div>
                  {column.id !== "view" && column.id !== "option" ? (
                    <TableSortLabel
                      active={column.isSorted}
                      // react-table has a unsorted state which is not treated here
                      direction={column.isSortedDesc ? "desc" : "asc"}
                      className="enhancedTable-tableSortLabel"
                    />
                  ) : (
                    <div className="enhancedTable-headerPlaceholder"></div>
                  )}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableHead>
        <TableBody>
          {page.map((row, i) => {
            prepareRow(row);
            return (
              <TableRow {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <TableCell {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </MaUTable>
      <TableFooter className="enhancedTable-tableFooter">
        <TableRow className="enhancedTable-footer-tableRow">
          <TablePagination
            rowsPerPageOptions={[
              5,
              10,
              25,
              { label: "All", value: data.length }
            ]}
            colSpan={3}
            count={data.length}
            rowsPerPage={pageSize}
            page={pageIndex}
            SelectProps={{
              inputProps: { "aria-label": "rows per page" },
              native: true
            }}
            onChangePage={handleChangePage}
            onChangeRowsPerPage={handleChangeRowsPerPage}
            ActionsComponent={TablePaginationActions}
          />
        </TableRow>
      </TableFooter>
    </TableContainer>
  );
};

EnhancedTable.propTypes = {
  columns: PropTypes.array.isRequired,
  data: PropTypes.array.isRequired,
  updateMyData: PropTypes.func.isRequired,
  setData: PropTypes.func.isRequired,
  skipPageReset: PropTypes.bool.isRequired
};

export default EnhancedTable;
