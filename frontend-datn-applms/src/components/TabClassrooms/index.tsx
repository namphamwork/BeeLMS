import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { Box, Grid, Tab } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getItem } from "../../helper/storage";
import { AttendanceWidget } from "../../pages/AttendancePage/components/AttendanceWidget";
import { Classroom } from "../../types/Classroom";
import { User } from "../../types/User";
import MyClassList from "./components/MyClassList";
import MarkWidget from "../../pages/MarkPage/components/MarkWidget";
import ClassWidget from "../../pages/MarkPage/components/ClassWidget";
import { EmptyState } from "../EmptyState";

interface Props {
  classrooms: Classroom[];
  renderTable?: boolean;
  renderTableMark?: boolean;
  isLoading: boolean;
  isError: boolean;
  isSuccess: boolean;
}

export const TabClassrooms: React.FC<Props> = ({
  classrooms = [],
  renderTable = false,
  renderTableMark = false,
  isLoading,
  isError,
  isSuccess,
}) => {
  const userInfo = getItem("userInfo") as User;
  const [learningClass, setLearningClass] = useState<Classroom[]>([]);
  const [learnedClass, setLearnedClass] = useState<Classroom[]>([]);

  useEffect(() => {
    if (classrooms) {
      const currentDate = new Date();
      const activeClasses = classrooms.filter(
        (classroom) => classroom.isActive && !classroom.isDelete
      );

      const learningClasses = activeClasses.filter((classroom) => {
        // const startDate = new Date(classroom.dateStart);
        const endDate = new Date(classroom.dateEnd);
        return endDate >= currentDate;
      });

      const learnedClasses = activeClasses.filter((classroom) => {
        const endDate = new Date(classroom.dateEnd);
        return endDate < currentDate;
      });

      setLearningClass(learningClasses);
      setLearnedClass(learnedClasses);
    }
  }, [classrooms]);
  const [value, setValue] = useState("1");

  const handleChange = (_: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  const _renderData = (classrooms: Classroom[]) => {
    if (!renderTable && renderTableMark) {
      return (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={3} sm={6} md={9}>
            <MarkWidget
              isSuccess={isSuccess}
              data={classrooms}
              isLoading={isLoading}
              isError={isError}
              userId={userInfo._id as string}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <h1 className="mb-4 text-right ">Lớp học của tôi</h1>
            <ClassWidget
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isLoading}
              data={classrooms}
            />
          </Grid>
        </Grid>
      );
    }
    if (renderTable && !renderTableMark) {
      return (
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
        >
          <Grid item xs={3} sm={6} md={9}>
            <AttendanceWidget
              data={classrooms}
              isLoading={isLoading}
              isError={isError}
              isSuccess={isSuccess}
              userId={userInfo._id as string}
            />
          </Grid>
          <Grid item xs={1} sm={2} md={3}>
            <h1 className="mb-4 text-right">Lớp học của tôi</h1>

            <ClassWidget
              isSuccess={isSuccess}
              isError={isError}
              isLoading={isLoading}
              data={classrooms}
            />
          </Grid>
        </Grid>
      );
    }
    return (
      <MyClassList
        isLoading={isLoading}
        isSuccess={isSuccess}
        isError={isError}
        classrooms={classrooms}
      />
    );
  };
  return (
    <TabContext value={value}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <TabList onChange={handleChange} aria-label="lab API tabs example">
          <Tab
            label={userInfo.role === "learner" ? "Đang học" : "Đang dạy"}
            value="1"
          />
          <Tab
            label={userInfo.role === "learner" ? "Đã học" : "Đã dạy"}
            value="2"
          />
        </TabList>
      </Box>

      <TabPanel value="1" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        {learningClass.length > 0 ? _renderData(learningClass) : <EmptyState />}
      </TabPanel>
      <TabPanel value="2" sx={{ paddingLeft: 0, paddingRight: 0 }}>
        {learnedClass.length > 0 ? _renderData(learnedClass) : <EmptyState />}
      </TabPanel>
    </TabContext>
  );
};
