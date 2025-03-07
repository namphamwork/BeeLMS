import EscalatorWarningTwoToneIcon from '@mui/icons-material/EscalatorWarningTwoTone';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";
import * as React from "react";
export interface TotalInstructorsProps {
  sx?: SxProps;
  value: number;
}

export const TotalInstructors: React.FC<TotalInstructorsProps> = ({
  value,
  sx,
}) => {
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
          spacing={3}
        >
          <Stack spacing={1}>
            <Typography color="text.secondary" variant="overline">
              Tổng số giảng viên
            </Typography>
            <Typography variant="h5">{value} Giảng viên</Typography>
          </Stack>
          <EscalatorWarningTwoToneIcon
           className="text-orange-400"
           style={{ width: '40px', height: '40px' }}
           />
        </Stack>
      </CardContent>
    </Card>
  );
};
