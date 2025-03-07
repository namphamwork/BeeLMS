import { Avatar, FormControlLabel, Stack, Switch } from "@mui/material";
import { CheckedStatus } from "../Widgets";
import React from "react";
import {
  FilterType,
  MUIDataTableColumnDef,
  MUIDataTableOptions,
} from "mui-datatables";
import { urlImage, urlUpload } from "../../../constant/config";

export const options: MUIDataTableOptions = {
  search: true,
  download: true,
  print: true,
  viewColumns: true,
  filter: true,
  pagination: false,
  filterType: "dropdown" as FilterType | undefined, // Use 'dropdown' as FilterType
  responsive: "vertical",
  tableBodyHeight: "100%",
  tableBodyMaxHeight: "",
  selectableRows: "none",
  elevation: 0,
};

export const columns = (
  checkedStatus: CheckedStatus,
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
  disabledSwitch: boolean,
): MUIDataTableColumnDef[] => [
  {
    name: "code",
    label: "Mã số sinh viên",
    options: {
      filter: true,
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[7%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              MSSV
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
      filter: true,
      customBodyRender: (value: string) => {
        return (
          <div className="">
            <p className="text-center">{value}</p>
          </div>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[20%]">
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
    name: "avatar",
    label: "Tài khoản",
    options: {
      filter: true,
      customBodyRender: (value: string) => {
        return (
          <Stack sx={{ alignItems: "center" }}>
            <Avatar
              src={
                value == "avatar.png"
                  ? `${urlImage}/avatar.png`
                  : `${urlUpload}/images/${value}`
              }
            ></Avatar>
          </Stack>
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[20%]">
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
    label: "Trạng thái",
    options: {
      customBodyRender: (value: string) => {
        // console.log(checkedStatus[value]);
        return (
          <FormControlLabel
            control={
              <Switch
                checked={checkedStatus[value] ? checkedStatus[value] : false}
                onChange={handleChange}
                disabled={disabledSwitch}
                name={value}
                inputProps={{ "aria-label": "controlled" }}
              />
            }
            label={null}
          />
        );
      },
      customHeadRender: (columnMeta, handleToggleColumn) => {
        return (
          <th className="w-[20%]">
            <button onClick={() => handleToggleColumn(columnMeta.index)}>
              Trạng thái điểm danh
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
        return <div />;
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
