import React from "react";
import MUIDataTable, { MUIDataTableOptions } from "mui-datatables";
import { useGetAllLearnsQuery } from "../../service/api";
import { User } from "../../types/User";

interface CustomMUIDataTableOptions extends MUIDataTableOptions {
  onRowsSelect?: (currentRowsSelected: any, allRowsSelected: any) => void;
  
}

interface DataTableProps {
  onSelectedStudentsChange: (selectedIds: string[]) => void;
  learnerOptions: User[];
}

const DataTableEdit: React.FC<DataTableProps> = ({ onSelectedStudentsChange,  learnerOptions}) => {
  const handleRowSelect = (currentRowsSelected: any) => {
    const selectedRowIds = currentRowsSelected.map(
      (selectedRow: any) => learns[selectedRow.dataIndex]._id
    );
    onSelectedStudentsChange(selectedRowIds);
  };
  const { data: alllearn, error, isLoading } = useGetAllLearnsQuery();

  const learns = alllearn?.data || [];

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    // Sử dụng kiểu dữ liệu Error hoặc unknown để tránh lỗi TypeScript
    const errorMessage = (error as Error)?.message || 'An error occurred';
    return <p>Error: {errorMessage}</p>;
  }
  // console.log("learns", learns);
  // console.log("learnerOptions", learnerOptions);
  // console.log("learnerColumn", learnerColumn);
  
  const columns = [
    { name: "fullname", label: "Họ và tên" },
    { name: "code", label: "Mã sinh viên" },
    { name: "email", label: "Email" },
  ];

  const options: CustomMUIDataTableOptions = {
    filter: true,
    filterType: 'dropdown',
    rowsPerPageOptions: [1, 3, 5, 6],
    jumpToPage: true,
    textLabels: {
      pagination: {
        next: "Next >",
        previous: "< Previous",
        rowsPerPage: "Total items Per Page",
        displayRows: "OF",
      },
      selectedRows: {
        text: "Sinh viên đã chọn",
        delete: "Xóa",
        deleteAria: "Xóa dòng đã chọn",
      },
    },
    onChangePage: (currentPage: number) => {
      console.log({ currentPage });
    },
    onChangeRowsPerPage: (numberOfRows: number) => {
      console.log({ numberOfRows });
    },
    onRowsSelect: handleRowSelect,
  };

  // Custom CSS for checkbox style
  const checkboxStyle = `
    .MuiCheckbox-root {
      color: rgb(25, 118, 210) !important;
    }
  `;

  return (
    <div className="App wrapper">
      <style>{checkboxStyle}</style>
      <MUIDataTable
        title={"Danh sách học sinh"}
        data= {learnerOptions !== undefined ? learnerOptions : learns}
        columns={columns}
        options={options}
      />
    </div>
  );
};

export default DataTableEdit;
