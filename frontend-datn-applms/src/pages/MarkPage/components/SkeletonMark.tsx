import {
  Skeleton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";

const SkeletonMarkTable = () => {
  const headerRow = () => {
    return (
      <TableRow>
        <TableCell width={"10%"}>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell width={"25%"}>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell width={"20%"}>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell width={"30%"}>
          <Skeleton variant="text" />
        </TableCell>
        <TableCell width={"15%"}>
          <Skeleton variant="text" />
        </TableCell>
      </TableRow>
    );
  };
  const bodyRow = (numRow: number) => {
    return (
      <TableRow key={numRow}>
        <TableCell align="center">
          <Skeleton
            variant="text"
            width={"50%"}
            style={{ textAlign: "center", margin: "auto" }}
          />
        </TableCell>
        <TableCell align="center">
          <Skeleton
            variant="text"
            width={"50%"}
            style={{ textAlign: "center", margin: "auto" }}
          />
        </TableCell>
        <TableCell align="center">
          <Skeleton
            variant="text"
            width={"50%"}
            style={{ textAlign: "center", margin: "auto" }}
          />
        </TableCell>
        <TableCell align="center">
          <Skeleton
            variant="text"
            width={"50%"}
            style={{ textAlign: "center", margin: "auto" }}
          />
        </TableCell>
        <TableCell align="center">
          <Skeleton
            variant="text"
            width={"50%"}
            style={{ textAlign: "center", margin: "auto" }}
          />
        </TableCell>
      </TableRow>
    );
  };
  return (
    <Table>
      <TableHead>{headerRow()}</TableHead>
      <TableBody>
        {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((row) => bodyRow(row))}
      </TableBody>
    </Table>
  );
};

export default SkeletonMarkTable;
