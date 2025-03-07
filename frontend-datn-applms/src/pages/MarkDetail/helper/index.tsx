import { Column, DefaultCellTypes, Row } from "@silevis/reactgrid";

export const defaultColumns: Column[] = [
  { columnId: "idx", width: 75, resizable: true, },
  { columnId: "code", width: 150, resizable: true },
  { columnId: "fullname", width: 200, resizable: true },
];

export const getColumnsDefault = (): Column[] => [...defaultColumns];

export const headerRowDefault = [
  { type: "header", text: "#", className: "font-bold justify-center ", },
  { type: "header", text: "Mã số sinh viên", className: "font-bold justify-center ", },
  {
    type: "header",
    text: "Họ và tên",
    nonEditable: true,
    className: "font-bold justify-center ",
  },
] as DefaultCellTypes[];

export const getRowDefault = (): Row[] => [
  { rowId: "header", cells: [...headerRowDefault] },
];
