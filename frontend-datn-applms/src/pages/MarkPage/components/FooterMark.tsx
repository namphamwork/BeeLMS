import { TableCell, TableFooter, TableRow } from "@mui/material";

interface Props {
  averageScore: number;
  result: string;
}

export const FooterMarkCustom: React.FC<Props> = ({ averageScore, result }) => {
  return (
    <TableFooter>
      <TableRow>
        <TableCell
          colSpan={4}
          sx={{ textAlign: "center", fontSize: "13px", fontWeight: 700 }}
        >
          <span className="">Trung bình:</span>
        </TableCell>
        <TableCell sx={{ width: "33.5%" }}>
          <span>{averageScore}</span>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell
          colSpan={4}
          sx={{ textAlign: "center", fontSize: "13px", fontWeight: 700 }}
        >
          <span className="">Xếp loại</span>
        </TableCell>
        <TableCell sx={{ width: "33.5%" }}>
          <span>{result}</span>
        </TableCell>
      </TableRow>
    </TableFooter>
  );
};
