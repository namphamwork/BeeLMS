import moment from "moment";
import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { AttendanceTableItem } from "../AttendancePage";

import { ToolbarCustom } from "../../../components/MUIDataTableCustom/ToolbarCustom";
import { FooterAttendanceCustom } from "./FooterAttendance";

export const options: MUIDataTableOptions = {
  filter: false,
  search: false,
  pagination: false,
  selectableRows: "none",
  responsive: "vertical",
  customFooter: FooterAttendanceCustom,
  customToolbar: ToolbarCustom,
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
  },
};

export const columns = (
  attendanceTable: AttendanceTableItem,
  learnerId: string
): MUIDataTableColumnDef[] => [
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
          <th className="w-[7%]">
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
    name: "date",
    label: "Ngày điểm danh",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value: Date) => {
        return <span>{moment(value).format("DD - MM - YYYY")}</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Ngày điểm danh
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
    name: "hours",
    label: "Ca",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span>{attendanceTable?.hours}</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Ca học
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
    name: "updatedBy",
    label: "Người điểm danh",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span>{attendanceTable?.instructor.code}</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Người điểm danh
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
    name: "description",
    label: "Mô tả",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span>Remote</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[10%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Mô tả
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
    name: "learners",
    label: "Trạng thái học",
    options: {
      filter: true,

      customBodyRender: (value: string[], tableMeta: { rowData: any[] }) => {
        const currentDate = moment(new Date());
        const date = moment(tableMeta.rowData[1]);
        if (currentDate.isBefore(date)) {
          return <span className="text-blue-500 font-medium">Tương lai</span>;
        } else if (
          (currentDate.isSame(date) && value.includes(learnerId)) ||
          (currentDate.isAfter(date) && value.includes(learnerId))
        ) {
          return <span className="text-green-500 font-medium">Có mặt</span>;
        } else {
          return <span className="text-red-500 font-medium">Vắng mặt</span>;
        }
      },
      customHeadRender: () => {
        return <th className="w-[15%]">Trạng thái học</th>;
      },
      setCellProps: () => ({
        style: { alignItems: "center", textAlign: "center" },
      }),
    },
  },
  {
    name: "note_session",
    label: "Ghi chú buổi học",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span></span>;
      },
      customHeadRender: () => {
        return <th className="w-[15%]">Ghi chú buổi học</th>;
      },
      setCellProps: () => ({
        style: { alignItems: "center", textAlign: "center" },
      }),
    },
  },
  {
    name: "note",
    label: "Ghi chú",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span></span>;
      },
      customHeadRender: () => {
        return <th className="w-[10%]">Ghi chú</th>;
      },
      setCellProps: () => ({
        style: { alignItems: "center", textAlign: "center" },
      }),
    },
  },
];
