import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { FormControlLabel, Switch } from "@mui/material";
import moment from "moment";
import {
  FilterType,
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";
import { Link } from "react-router-dom";
import { urlUpload } from "../../constant/config";
import { Course } from "../../types/Course";
import { User } from "../../types/User";
import { addBtn } from "./addButton";



export const options: MUIDataTableOptions = {
  search: true,
  download: true,
  print: true,
  customToolbar: () => addBtn("Thêm khóa học", "Thêm"),
  viewColumns: true,
  filter: true,
  filterType: "dropdown" as FilterType | undefined,
  responsive: "vertical",
  tableBodyHeight: "100%",
  tableBodyMaxHeight: "",
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
  courses: Course[],
  handleSwitchChange: (courseId: string) => void
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
      label: "Tên Khóa Học",
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
                Tên khóa học
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
      name: "thumbnail",
      label: "Hình Khóa Học",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const clickedCourse = courses[dataIndex];
          const thumbnailUrl = `${urlUpload}/images/${clickedCourse.thumbnail}`;

          return (
            <div key={dataIndex} className="flex items-center justify-center">
              <img
                className="object-cover"
                src={thumbnailUrl}
                alt={`Thumbnail for ${clickedCourse.title}`}
                style={{ width: "80px", height: "60px" }}
              />
            </div>
          );
        },

        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[10%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Ảnh bìa
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
      name: "lessons",
      label: "Lessons",
      options: {
        customBodyRender(value) {
          return <span key={value}>{value.length} bài</span>;
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[10%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Số bài học
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: {
            alignItems: "center",
            textAlign: "center",
            justifyContents: "center",
          },
        }),
      },
    },
    {
      name: "updatedAt",
      label: "updatedAt",
      options: {
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[20%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Thời gian cập nhật
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
        customBodyRender(value: Date, tableMeta: { rowIndex: number }) {
          return (
            <span key={`updatedAt-${tableMeta.rowIndex}`}>
              {moment(value).format("DD - MM - YYYY  hh:mm A")}
            </span>
          );
        },

      },
    },
    {
      name: "createBy",
      label: "Người tạo",
      options: {
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
            <th key={columnMeta.index} className="w-[15%]">
              <button onClick={() => handleToggleColumn(columnMeta.index)}>
                Người tạo
              </button>
            </th>
          );
        },
        setCellProps: () => ({
          style: { alignItems: "center", textAlign: "center" },
        }),
        customBodyRender: (value: User) => {
          return (
            <div key={value._id} className="text-center">
              {value.fullname ? value.fullname : value.username}
            </div>
          );
        },
      },
    },
    {
      name: "edit",
      label: "Thực hiện",
      options: {
        customBodyRenderLite: (dataIndex: number) => {
          const value = courses[dataIndex];
          const isChecked = value.isActive;
          return (
            <div key={value._id}>
              <FormControlLabel
                control={
                  <Switch
                    checked={isChecked}
                    onChange={() => handleSwitchChange(value._id)}
                    name={value._id}
                    inputProps={{ "aria-label": "controlled" }}
                    disabled={isChecked}
                  />
                }
                label={""}
              />
              {!isChecked && (
                <Link to={`/list-course/${value._id}`}>
                  <button>
                    <ModeEditOutlineOutlinedIcon
                      sx={{
                        color: "#FDA403",
                        fontSize: "24px",
                      }}
                    />
                  </button>
                </Link>
              )}
            </div>
          );
        },
        customHeadRender: (columnMeta, handleToggleColumn) => {
          return (
              <th key="columnMeta.index" className="w-[15%]">
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
