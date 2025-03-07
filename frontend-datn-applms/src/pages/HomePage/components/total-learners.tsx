import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";
import * as React from "react";
// import { ArrowDown as ArrowDownIcon } from "@phosphor-icons/react/dist/ssr/ArrowDown";
// import { ArrowUp as ArrowUpIcon } from "@phosphor-icons/react/dist/ssr/ArrowUp";
import Groups2TwoToneIcon from '@mui/icons-material/Groups2TwoTone';
export interface TotalLearnersProps {
  // diff?: number;
  // trend: "up" | "down";
  sx?: SxProps;
  value: number;
}

export const TotalLearners: React.FC<TotalLearnersProps> = ({
  // diff,

  sx,
  value,
}) => {
  // const TrendIcon = trend === "up" ? ArrowUpIcon : ArrowDownIcon;
  // const trendColor =
  //   trend === "up"
  //     ? "var(--mui-palette-success-main)"
  //     : "var(--mui-palette-error-main)";
  return (
    <Card sx={sx}>
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "center", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Tổng số sinh viên
              </Typography>
              <Typography variant="h5">{value} Sinh viên</Typography>
            </Stack>
            <Groups2TwoToneIcon
           className="text-orange-400"
           style={{ width: '40px', height: '40px' }}
           />
          </Stack>
          {/* {diff ? (
            <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
              <Stack
                sx={{ alignItems: "center" }}
                direction="row"
                spacing={0.5}
              >
                <TrendIcon
                  color={trendColor}
                  fontSize="var(--icon-fontSize-md)"
                />
                <Typography color={trendColor} variant="body2">
                  {diff}%
                </Typography>
              </Stack>
              <Typography color="text.secondary" variant="caption">
                Trong tháng
              </Typography>
            </Stack>
          ) : null} */}
        </Stack>
      </CardContent>
    </Card>
  );
};
