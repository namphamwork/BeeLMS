import { MUIDataTableColumnDef, MUIDataTableOptions } from "mui-datatables";
import { ToolbarCustom } from "../../../components/MUIDataTableCustom/ToolbarCustom";
import { Score } from "../../../types/Classroom";
// import { AttendanceTableItem } from "../AttendancePage";
// import { FooterCustom, ToolbarCustom } from "./customizeTable";

export const options: MUIDataTableOptions = {
  filter: false,
  search: false,
  pagination: false,
  selectableRows: "none",
  responsive: "vertical",
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
  scoresValue: Score[]

  //   attendanceTable: AttendanceTableItem,
  //   learnerId: string
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
    name: "title",
    label: "Tên đầu điểm",
    options: {
      filter: true,
      sort: true,
      customBodyRender: (value: string) => {
        return <span>{value}</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[20%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Tên đầu điểm
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
    name: "weight",
    label: "Trọng số",
    options: {
      filter: true,
      customBodyRender: (value: number) => {
        return <span>{(value * 100).toFixed(2)} %</span>;
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Trọng Số
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
    label: "Điểm",
    options: {
      filter: true,
      customBodyRender: (value: string) => {
        const scoreResult = scoresValue.find((score) => score.score === value);
        // console.log({scoreResult});
        if (scoreResult) {
          return <span>{scoreResult.value}</span>;
        } else {
          return <span>-</span>;
        }
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[15%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Điểm
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
    name: "note",
    label: "Ghi chú",
    options: {
      filter: true,
      customBodyRender: () => {
        return <span></span>;
      },
      customHeadRender: () => {
        return <th className="w-[20%]">Ghi chú</th>;
      },
      setCellProps: () => ({
        style: { alignItems: "center", textAlign: "center" },
      }),
    },
  },
];
