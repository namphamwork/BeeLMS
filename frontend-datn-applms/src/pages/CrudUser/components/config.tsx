// import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import ModeEditOutlineOutlinedIcon from "@mui/icons-material/ModeEditOutlineOutlined";
import { Avatar, Button, Stack, Tooltip } from "@mui/material";
import {
  FilterType,
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";
import { Link } from "react-router-dom";
import { urlImage, urlUpload } from "../../../constant/config";
export const options = (handleOpen: () => void): MUIDataTableOptions => {
  return {
    search: true,
    download: true,
    print: true,
    viewColumns: true,
    filter: true,
    filterType: "dropdown" as FilterType | undefined,
    responsive: "vertical",
    tableBodyHeight: "100%",
    tableBodyMaxHeight: "",
    selectableRows: "none",
    elevation: 0,
    customToolbar: () => {
      return (
        <Tooltip title={"Thêm"}>
          <Link to="#">
            <Button variant="contained" onClick={handleOpen}>
              Thêm người dùng
            </Button>
          </Link>
        </Tooltip>
      );
    },
    textLabels: {
      toolbar: {
        search: "Tìm kiếm",
        downloadCsv: "Tải định dạng CSV",
        print: "In",
        viewColumns: "Chế độ cột",
        filterTable: "Lọc",
      },
      body: {
        noMatch: "Hiện tại chưa có dữ liệu!",
      },
      pagination: {
        next: "Sau >",
        previous: "< Trước",
        displayRows: "của",
        rowsPerPage: "Hiển thị",
      },
    },
  };
};
export const columns = (): // handleOpenModal: (id: string) => void
MUIDataTableColumnDef[] => [
  {
    name: "#",
    label: "STT",
    options: {
      filter: true,
      customBodyRender: (_, tableMeta: { rowIndex: number }) => {
        return (
          <div className="w-full">
            <p className="text-center">{tableMeta.rowIndex + 1}</p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[5%]">
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
    name: "code",
    label: "Mã người dùng",

    options: {
      customBodyRender: (value: string) => {
        if (value == "") {
          return <div>###</div>;
        }
        return <div>{value}</div>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Mã người dùng
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
    name: "fullname",
    label: "Họ và tên",
    options: {
      customBodyRender: (value: string) => {
        return (
          <div className="">
            <p className="text-left">{value}</p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Họ và tên
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
    name: "username",
    label: "Tên đăng nhập",
    options: {
      customBodyRender: (value: string) => {
        return (
          <div className="">
            <p className="text-center">{value}</p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Tên đăng nhập
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
    name: "email",
    label: "Email",
    options: {
      customBodyRender: (value: string) => {
        return (
          <div className="">
            <p className="text-left">{value}</p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Email
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
    name: "role",
    label: "Vai trò",
    options: {
      customBodyRender: (value: string) => {
        return (
          <div className="">
            <p className="text-center">
              {value == "learner"
                ? "Sinh viên"
                : value == "instructor"
                ? "Giảng viên"
                : "Nhân viên quản trị"}
            </p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Vai trò
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
    name: "avatar",
    label: "Ảnh đại diện",
    options: {
      filter: true,
      customBodyRender: (value: string) => {
        return (
          <div className="flex items-center justify-center">
            <Avatar
              alt="NotFound"
              src={
                value == "avatar.png"
                  ? `${urlImage}/${value}`
                  : `${urlUpload}/images/${value}`
              }
            />
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Ảnh đại diện
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
    name: "_id",
    label: "Thực hiện",
    options: {
      customBodyRender: (value: string) => {
        return (
          <Stack direction={"row"} sx={{ gap: 1, justifyContent: "center" }}>
            <Link to={`${value}`}>
              <button>
                <ModeEditOutlineOutlinedIcon
                  sx={{
                    color: "#FDA403",
                    fontSize: "24px",
                  }}
                />
              </button>
            </Link>
            {/* <button onClick={() => handleOpenModal(value)}>
              <DeleteOutlinedIcon
                sx={{
                  color: "red",
                  fontSize: "24px",
                }}
              />
            </button> */}
          </Stack>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
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
