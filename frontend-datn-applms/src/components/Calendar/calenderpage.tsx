import dayjs, { Dayjs } from "dayjs";
import { useEffect, useState } from "react";
import { generateDate, months, GeneratedDate } from "./calender";
import cn from "./cn";
import { GrFormNext, GrFormPrevious } from "react-icons/gr";
import { format } from 'date-fns';
import Step from "../Timeline/Timeline";
import { Classroom } from "../../types/Classroom";

interface CalendarProps {
  classroomprop: Classroom[];
}

const Calendar: React.FC<CalendarProps> = ({ classroomprop }: CalendarProps) => {
  const days: string[] = ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"];
  const currentDate: Dayjs = dayjs();
  const [today, setToday] = useState<Dayjs>(currentDate);
  const [selectDate, setSelectDate] = useState<Dayjs>(currentDate);
  const [ids, setIds] = useState<string[]>([]); // Sử dụng useState để lưu trữ IDs

  const classrooms = classroomprop;

  useEffect(() => {
    // Thực hiện công việc cần thiết khi ngày được chọn thay đổi
    const newIds: string[] = [];

    classrooms.forEach(item => {
      item.attendances.forEach(attendance => {
        const dateString = attendance.date.toString().slice(0, 10);
        const attendanceDate = dayjs(dateString);
        if (attendanceDate.isSame(selectDate, 'day')) {
          newIds.push(attendance._id);
        }
      });
    });

    // Cập nhật giá trị của ids
    setIds(newIds);
  }, [selectDate, classrooms]);

  // Lọc lớp học dựa trên danh sách ids đã chọn
  const filteredClassrooms: Classroom[] = classrooms.filter(classroom =>
    classroom?.attendances?.some(attendance => ids.includes(attendance._id))
  );
  
  // Hàm để lấy ra mảng các ngày học từ mảng attendances trong lớp học
  function extractAttendanceDates(classrooms: Classroom[]): Dayjs[] {
    const attendanceDates: Dayjs[] = [];

    // Lặp qua từng lớp học
    classrooms.forEach(classroom => {
      classroom.attendances.forEach(attendance => {
        const dateString = attendance.date.toString().slice(0, 10);
        const attendanceDate = dayjs(dateString);
        if (!attendanceDates.some(date => date.isSame(attendanceDate, 'day'))) {
          attendanceDates.push(attendanceDate);
        }
      });
    });

    return attendanceDates;
  }

  // Sử dụng hàm extractAttendanceDates để lấy ra mảng các ngày học
  const attendanceDates = extractAttendanceDates(classrooms);
  
  return (
    <div className=" gap-10 justify-center  items-center sm:flex-row flex-col">
      <div className="w-full mb-10 px-2 py-4">
        <div className="flex justify-between items-center">
          <h1 className="select-none font-semibold">
            {months[today.month()]}, {today.year()}
          </h1>
          <div className="flex gap-5 items-center ">
            <GrFormPrevious
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            />
            <h1
              className="cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(currentDate);
              }}
            >
              Today
            </h1>
            <GrFormNext
              className="w-5 h-5 cursor-pointer hover:scale-105 transition-all"
              onClick={() => {
                setToday(today.month(today.month() + 1));
              }}
            />
          </div>
        </div>
        <div className="grid grid-cols-7">
          {days?.map((day, index) => (
            <div
              key={index}
              className="p-2 text-center h-14 grid place-content-center text-sm border-t font-semibold"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }: GeneratedDate, index: number) => (
              <div
                key={index}
                className="p-2 text-center h-14 grid place-content-center text-sm border-t"
              >
                <h1
                  className={cn(
                    currentMonth ? "" : "text-gray-400",
                    today ? "bg-red-600 text-white" : "",
                    selectDate.isSame(date, 'day') ? "bg-black text-white" : "",
                    attendanceDates.some(attendanceDate => attendanceDate.isSame(date, 'day')) ? "text-red-500 font-medium" : "",
                    "h-10 w-10 rounded-full grid place-content-center transition-all cursor-pointer select-none"
                  )}
                  onClick={() => {
                    setSelectDate(date);
                  }}
                >
                  {date.date()}
                </h1>
              </div>
            )
          )}
        </div>
      </div>
      <div className="min-h-96 w-full sm:px-5">
        <h1 className="font-semibold">
          Lịch học ngày {format(selectDate.toDate(), 'dd/MM/yyyy')}
        </h1>
        <Step classrooms={filteredClassrooms}/>
      </div>
    </div>
  );
};

export default Calendar;
