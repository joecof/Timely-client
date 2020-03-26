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
    flex: "1 1 100%"
  }
}));

const TableToolbar = props => {
  const classes = useToolbarStyles();
  const {
    preGlobalFilteredRows,
    setGlobalFilter,
    globalFilter
  } = props;
  return (
    <Toolbar>
      <Typography className={classes.title} variant="h6" id="tableTitle">
        Work Package Reports
      </Typography>
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
