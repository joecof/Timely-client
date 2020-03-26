import React from "react";

import CssBaseline from "@material-ui/core/CssBaseline";
import EnhancedTable from "./EnhancedTable";
import makeData from "./MakeData";
import { render } from "react-dom";

const LeadEngineer = () => {
  const columns = React.useMemo(
    () => [
      {
        Header: "WorkPackge ID",
        accessor: "WpId"
      },
      {
        Header: "WorkPackage Name",
        accessor: "WpName"
      },
      {
        Header: "Project Manager",
        accessor: "PM"
      },
      {
        Header: "Team",
        accessor: "Team"
      },
    ],
    []
  );

  const [data, setData] = React.useState(React.useMemo(() => makeData(20), []));
  const [skipPageReset, setSkipPageReset] = React.useState(false);

  // We need to keep the table from resetting the pageIndex when we
  // Update data. So we can keep track of that flag with a ref.

  // When our cell renderer calls updateMyData, we'll use
  // the rowIndex, columnId and new value to update the
  // original data
  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setSkipPageReset(true);
    setData(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value
          };
        }
        return row;
      })
    );
  };

  // render() {
    return (
        <div>
          <CssBaseline />
          <EnhancedTable
            columns={columns}
            data={data}
            setData={setData}
            updateMyData={updateMyData}
            skipPageReset={skipPageReset}
          />
        </div>
      );
  }

// };

export default LeadEngineer;
