import {
  TableCell,
  TableFooter,
  TableRow
} from "@mui/material";

export const FooterAttendanceCustom: React.FC = () => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell
          colSpan={4}
          sx={{ textAlign: "center", fontSize: "13px", fontWeight: 700 }}
        >
          <span className="">Trạng thái điểm danh:</span>
        </TableCell>
        <TableCell sx={{ width: "33.5%" }}>
          <span>Tốt</span>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
