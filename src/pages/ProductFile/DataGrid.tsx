import { FC, useState } from "react";
import { DataGrid as DataGridComp, GridColDef } from "@mui/x-data-grid";
import { DataType } from "./ProductFile.slice";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100, hide: true },
  { field: "stockNumber", headerName: "Stock Number", width: 200 },
  {
    field: "supplierCode",
    headerName: "Supplier Code",
    width: 200,
    editable: true,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
    editable: true,
  },
  {
    field: "catCode",
    headerName: "Cat. Code",
    width: 200,
    editable: true,
  },
  {
    field: "deptCode",
    headerName: "Dept. Code",
    width: 200,
    editable: true,
  },
  {
    field: "markUp",
    headerName: "Markup (2.5)",
    width: 200,
  },
];

type PropTypes = {
  data: DataType[];
  setEdit: (e: any) => void;
  editSave: (e: any) => void;
};

export const DataGrid: FC<PropTypes> = ({ data, setEdit, editSave }) => {
  const [pageSize, setPageSize] = useState(10);
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <DataGridComp
        rows={data}
        columns={columns}
        autoPageSize
        density="compact"
        // pageSize={pageSize}
        // rowsPerPageOptions={[5, 10, 15]}
        checkboxSelection
        disableSelectionOnClick
        // onPageSizeChange={(n) => setPageSize(n)}
        onSelectionModelChange={(n) => setEdit(n)}
        onCellEditCommit={editSave}
      />
    </div>
  );
};
