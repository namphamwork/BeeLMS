import * as React from "react";

import Grid from "@mui/material/Unstable_Grid2";

import { useGetClassroomsQuery, useGetCoursesQuery } from "../../service/api";
import { useGetUsersQuery } from "../../service/userAPI";
import { User } from "../../types/User";
import { LastestClasses } from "./components/lastest-classrooms";
import { LastestCourses } from "./components/lastest-courses";
import { TotalClasses } from "./components/total-classes";
import { TotalCourses } from "./components/total-courses";
import { TotalInstructors } from "./components/total-instructors";
import { TotalLearners } from "./components/total-learners";

export default function AdminPage(): React.JSX.Element {
  const { data: getCourses, isSuccess } = useGetCoursesQuery();
  const { data: getClassrooms } = useGetClassroomsQuery();
  const { data: getUsers } = useGetUsersQuery();
  const [learners, setLearners] = React.useState<User[]>();
  const [instructors, setInstructors] = React.useState<User[]>();

  React.useEffect(() => {
    if (getUsers) {
      const learners = getUsers.data.filter((u) => u.role == "learner");
      setLearners(learners);
      const instructors = getUsers.data.filter((u) => u.role == "instructor");
      setInstructors(instructors);
    }
  }, [getUsers]);
  return (
    <Grid container spacing={3} sx={{marginBottom: '10px'}}>
      <Grid lg={3} sm={6} xs={12}>
        <TotalCourses
          sx={{ height: "100%" }}
          value={getCourses && isSuccess ? getCourses.data.length : 0}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalClasses
          sx={{ height: "100%" }}
          value={getClassrooms ? getClassrooms.data.length : 0}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalInstructors
          sx={{ height: "100%" }}
          value={getUsers && instructors ? instructors.length : 0}
        />
      </Grid>
      <Grid lg={3} sm={6} xs={12}>
        <TotalLearners
          sx={{ height: "100%" }}
          value={getUsers && learners ? learners.length : 0}
        />
      </Grid>
      {/* <Grid lg={8} xs={12}>
        <Sales
          chartSeries={[
            {
              name: "This year",
              data: [18, 16, 5, 8, 3, 14, 14, 16, 17, 19, 18, 20],
            },
            {
              name: "Last year",
              data: [12, 11, 4, 6, 2, 9, 9, 10, 11, 12, 13, 13],
            },
          ]}
          sx={{ height: "100%" }}
        />
      </Grid> */}
      {/* <Grid lg={4} md={6} xs={12}>
        <Traffic
          chartSeries={[63, 15, 22]}
          labels={["Desktop", "Tablet", "Phone"]}
          sx={{ height: "100%" }}
        />
      </Grid> */}
      <Grid lg={4} md={12} xs={12}>
        <LastestCourses
          courses={isSuccess ? getCourses.data : []}
          sx={{ height: "100%" }}
        />
      </Grid>
      <Grid lg={8} md={12} xs={12}>
        <LastestClasses
          classrooms={getClassrooms ? getClassrooms.data : []}
          sx={{ height: "100%" }}
        />
      </Grid>
    </Grid>
  );
}
