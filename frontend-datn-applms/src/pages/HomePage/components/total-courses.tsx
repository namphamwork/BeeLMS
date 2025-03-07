import AssessmentTwoToneIcon from '@mui/icons-material/AssessmentTwoTone';
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { SxProps } from "@mui/material/styles";
import * as React from "react";
export interface TotalCoursesProps {
  sx?: SxProps;
  value: number;
}

export const TotalCourses: React.FC<TotalCoursesProps> = ({
  value,
  sx,
})=> {
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
              Tổng số khóa học
            </Typography>
            <Typography variant="h5">{value} Khóa học</Typography>
          </Stack>
          
          <AssessmentTwoToneIcon
           className="text-orange-400"
           style={{ width: '40px', height: '40px' }}
           />
        </Stack>
        
          <Stack sx={{ alignItems: "center" }} direction="row" spacing={2}>
           
            {/* <Typography color="text.secondary" variant="caption">
              Trong tháng
            </Typography> */}
          </Stack>
      
      </CardContent>
    </Card>
  );
}
