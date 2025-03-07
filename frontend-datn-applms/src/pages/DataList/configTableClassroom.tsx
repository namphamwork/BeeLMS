import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { FormControlLabel, Switch } from "@mui/material";
import {
  FilterType,
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";
import { Classroom } from "../../types/Classroom";
import { Course } from "../../types/Course";
import { User } from "../../types/User";
import { addBtn } from "./addButton";

export const options: MUIDataTableOptions = {
  search: true,
  download: true,
  print: true,
  customToolbar: () => addBtn("Thêm lớp học", "Thêm"),
  viewColumns: true,
  filter: true,
  filterType: "dropdown" as FilterType | undefined,
  responsive: "vertical",
  tableBodyHeight: "100%",
  selectableRows: "none",
  elevation: 0,
  textLabels: {
    pagination: {
      next: "Sau >",
      previous: "< Trước",
      displayRows: "của",
      rowsPerPage: "Hiển thị",
    },
  },
  rowsPerPageOptions: [5, 10, 15],
};

export const columns = (
  classroomStates: Classroom[],
  handleSwitchChange: (classId: string) => void,
  handleEditClick: (classId: string) => void
): MUIDataTableColumnDef[] => [
    {
      name: "#",
      label: "STT",
      options: {
        filter: true,
        customBodyRender: (_, tableMeta: { rowIndex: number }) => {
          return (
            <div key={tableMeta.rowIndex} className="w-full">
              <p className="text-center">{tableMeta.rowIndex + 1}</p>
            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[7%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                STT
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
    {
      name: "title",
      label: "Tên lớp học",
      options: {
        customBodyRender: (value: string) => {
          return (
            <div key={value} className="">
              <p className="text-left">{value}</p>
            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[20%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Tên lớp học
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
    {
      name: "code",
      label: "Mã Lớp học",
      options: {
        customBodyRender: (value: string) => {
          return (
            <div key={value} className="">
              <p className="text-center">{value}</p>
            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[15%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Mã lớp học
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
    {
      name: "course",
      label: "Khoá học",
      options: {
        customBodyRender: (value: Course) => {
          return (
            <div key={value._id} className="">
              <p className="text-center">{value ? value.title : ""}</p>
            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[15%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Khóa học
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
    {
      name: "instructor",
      label: "Người giảng dạy",
      options: {
        customBodyRender: (value: User) => {
          return (
            <div key={value._id} className="">
              <p className="text-center">
                {value
                  ? `[ ${value.code} ] ${value.fullname}`
                  : "Chưa có giáo viên"}
              </p>
            </div>
          );
        },

        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[15%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Người giảng dạy
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
    {
      name: "edit",
      label: "Thực hiện",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const value = classroomStates[dataIndex];
          const isActive = value.isActive;
          const isDelete = value.isDelete;
          console.log(isDelete);

          return (
            <div
              key={dataIndex}
            >
              <FormControlLabel
                control={
                  <Switch
                    name={value._id}
                    checked={isActive}
                    onChange={() =>
                      isActive ? null : handleSwitchChange(value._id)
                    }
                    inputProps={{ "aria-label": "controlled" }}
                    disabled={isActive}
                  />
                }
                label={""}
              />
              {isDelete ? (
                <span className={`bg-red-100 text-red-800 text-xs font-medium me-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300`}>Đã xóa</span>
              ) : (
                <button onClick={() => handleEditClick(value._id)}>
                  <DeleteOutlinedIcon
                    sx={{
                      color: "red",
                      fontSize: "24px",
                    }}
                  />
                </button>
              )}


            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[15%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Thực hiện
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
      },
    },
  ];
