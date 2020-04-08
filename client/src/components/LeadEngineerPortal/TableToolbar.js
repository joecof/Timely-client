import React from "react";

import GlobalFilter from "./GlobalFilter";
import { lighten, makeStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

const useToolbarStyles = makeStyles(theme => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1)
  },
  highlight:
    theme.palette.type === "light"
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85)
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark
        },
  title: {
    fontSize: "16px",
    fontWeight: "bold"
  },
  tableToolbarToolbar: {
    padding: "16px !important",
    display: "flex",
    justifyContent: "space-between"
  }
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const { preGlobalFilteredRows, setGlobalFilter, globalFilter } = props;
  return (
    <Toolbar className={classes.tableToolbarToolbar}>
      <div className={classes.title} id="tableTitle">
        Work Package Reports
      </div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
    </Toolbar>
  );
};

TableToolbar.propTypes = {
  setGlobalFilter: PropTypes.func.isRequired,
  preGlobalFilteredRows: PropTypes.array.isRequired,
  globalFilter: PropTypes.string.isRequired
};

export default TableToolbar;
