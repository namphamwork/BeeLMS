import PeopleAltOutlinedIcon from "@mui/icons-material/PeopleAltOutlined";
import { Button, Typography } from "@mui/material";
import { Stack } from "@mui/system";
import moment from "moment";
import MUIDataTable from "mui-datatables";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useSaveAttendanceMutation } from "../../service/api";
import { User } from "../../types/User";
import { columns, options } from "./components/configTable";
interface Props {
  _idClassroom: string | undefined;
  learners: User[];
  selectedDate: Date;
  selectedAttendance: { _id: string; learners: { _id: string }[]; date: Date };
}

export interface CheckedStatus {
  [key: string]: boolean;
}

const checkDate = (date:Date)=>{
  const today = new Date();
  today.setDate(today.getDate() - 3);
  const dateToCompare = new Date(date);
  today.setHours(0, 0, 0, 0);
  dateToCompare.setHours(0, 0, 0, 0);
  if (today.getTime() < dateToCompare.getTime()) {
    return false;
  }
  return true
}

const Widgets: React.FC<Props> = ({
  _idClassroom,
  learners,
  selectedDate,
  selectedAttendance,
}) => {
  const [checkedStatus, setCheckedStatus] = useState<CheckedStatus>({});

  useEffect(() => {
    const statusList = {} as CheckedStatus;
    if (learners?.length > 0) {
      // if())
      learners?.forEach((l: User) => {
        if (
          selectedAttendance?.learners?.findIndex(
            (selectedLeaner) => selectedLeaner?._id == l._id
          ) !== -1
        ) {
          statusList[l._id as string] = true;
        } else {
          statusList[l._id as string] = false;
        }
      });
    }
    setCheckedStatus(statusList);
  }, [selectedAttendance?.learners, learners]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name } = event.target;

    setCheckedStatus((prev: CheckedStatus) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };
  // console.log({ checkedStatus });
  const [saveAttendance] = useSaveAttendanceMutation();
  const onSubmit = async () => {
    const learnerIds = Object.keys(checkedStatus).filter(
      (id) => checkedStatus[id]
    );
    const data = {
      id: selectedAttendance._id,
      learners: [...learnerIds],
    };
    try {
      const result = await saveAttendance({
        _id: _idClassroom as string,
        body: { id: data.id, learners: data.learners },
      }).unwrap();
      // console.log({ saveMutationResult });
      // console.log(result);
      if (result.statusCode === 200) {
        toast.success("Lưu điểm danh thành công");
      } else {
        toast.error("Lưu điểm danh thất bại");
      }
    } catch (e) {
      toast.error("Lưu điểm danh thất bại");
      console.log(e);
    }
  };

  

  
  return (
    <>
      <MUIDataTable
        title={
          <div className="md:block sm:hidden">
            <Stack
              direction={"row"}
              sx={{
                textAlign: "center",

                gap: 1,
                alignItems: "center",
                justifyContent: "space-between",
              }}
              className="text-right col-span-2"
            >
              <Typography>
                Ngày thực hiện: {moment(selectedDate).format("DD - MM - yyyy")}
              </Typography>
              <Stack direction={"row"} sx={{ gap: 1 }}>
                <PeopleAltOutlinedIcon />
                <Typography sx={{ fontWeight: 700, fontSize: "13pt" }}>
                  DANH SÁCH HỌC VIÊN
                </Typography>
              </Stack>
            </Stack>
          </div>
        }
        data={learners}
        columns={columns(checkedStatus, handleChange, checkDate(selectedDate))}
        options={options}
      />
      <Stack
        direction={"row"}
        sx={{
          justifyContent: "flex-end",
          marginTop: "16px",
          marginBottom: "16px",
          paddingRight: "16px",
        }}
      >
        <Button variant="contained" className="" onClick={onSubmit} disabled={checkDate(selectedDate)}>
          Lưu điểm danh
        </Button>
      </Stack>
    </>
  );
};

export default Widgets;
