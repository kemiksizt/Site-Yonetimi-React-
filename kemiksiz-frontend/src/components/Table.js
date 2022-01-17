import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";

const Table = ({ rows, columns }) => {
  const [pageSize, setPageSize] = useState(10);

  const handlePageSizeChange = (pageSize) => {
    setPageSize(pageSize);
  };

  return (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        pagination
        paginationMode="client"
        sortingMode="client"
        pageSize={pageSize}
        onPageSizeChange={handlePageSizeChange}
        rowsPerPageOptions={[2, 5, 10, 20, 50, 100]}
      />
    </div>
  );
};

export default Table;
