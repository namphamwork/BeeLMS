import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import React from "react";
import { User } from "../../../types/User";

interface DataTableProps {
  onSelectedStudentsChange: (selectedLearners: string[]) => void;
  learners: User[];
}

const DataTable: React.FC<DataTableProps> = ({
  onSelectedStudentsChange,
  learners,
}) => {
  const handleRowSelect = (_: any, allRowsSelected: any) => {
    const selectedData = allRowsSelected.map((row: any) => {
      return learners[row.dataIndex]._id;
    });

    onSelectedStudentsChange(selectedData);
  };

  const columns = [
    { name: "fullname", label: "Họ và tên" },
    { name: "code", label: "Mã sinh viên" },
    { name: "email", label: "Email" },
  ];

  const options: MUIDataTableOptions = {
    filter: true,
    filterType: "dropdown",
    rowsPerPageOptions: [5, 10, 15],
    disableToolbarSelect: true,
    textLabels: {
      pagination: {
        next: "Sau >",
        previous: "< Trước",
        rowsPerPage: "Hiển thị",
        displayRows: "của",
      },
    },
    onRowSelectionChange: handleRowSelect,
  };

  return (
    <div className="App wrapper">
      <MUIDataTable
        title={"Danh sách học sinh"}
        data={learners}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTable;
