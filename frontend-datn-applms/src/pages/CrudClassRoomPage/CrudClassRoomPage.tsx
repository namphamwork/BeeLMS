import { Input, Option, Select } from "@material-tailwind/react";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SelectSearch from "../../components/SelectSearch/SelectSearch";
import {
  useAddClassroomMutation,
  useCheckInstructorsMutation,
  useCheckLearnersMutation,
  useGetAllRoomsQuery,
  useGetCheckRoomMutation,
  useGetCoursesQuery,
} from "../../service/api";
import { CheckRoom, CheckRoomResponse } from "../../types/Classroom";
import { User, UsersResponse } from "../../types/User";
import DataTable from "./components/DataTable";
import InputDate from "./components/InputDate";

export interface OptionItem {
  value: string;
  label: string;
}

export interface ClassType {
  code: string;
  title: string;
  instructor: string;
  hours: number;
  dayOfWeek: string;
  dateStart: string;
  dateEnd: string;
  learners: string[];
  course: string;
  room: string;
}

export interface CheckRoomType {
  hours: number;
  dayOfWeek: string;
  dateStart: string;
  dateEnd: string;
}

const CrudClassRoomPage: React.FC = () => {
  const navigate = useNavigate();
  const { data: allCourse } = useGetCoursesQuery();
  const { data: allRooms } = useGetAllRoomsQuery();


  const hoursOptions: OptionItem[] = [
    { value: "1", label: "Ca 1 - 7:00 AM to 9:00 AM" },
    { value: "2", label: "Ca 2 - 9:00 AM to 11:00 PM" },
    { value: "3", label: "Ca 3 - 13:00 AM to 15:00 PM" },
    { value: "4", label: "Ca 4 - 15:00 AM to 17:00 PM" },
    { value: "5", label: "Ca 5 - 17:00 AM to 19:00 PM" },
    { value: "6", label: "Ca 6 - 19:00 AM to 21:00 PM" },
  ];
  const dayofWeekOptions: OptionItem[] = [
    { value: "246", label: "Thứ 2, 4, 6" },
    { value: "357", label: "Thứ 3, 5 , 7" },
  ];

  const [formData, setFormData] = useState<ClassType>({
    code: "",
    title: "",
    instructor: "",
    hours: 0,
    dayOfWeek: "",
    dateStart: "",
    dateEnd: "",
    learners: [],
    course: "",
    room: "",
  });

  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>, field: string) => {
    const { value } = e.target;
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: value
    }));

  }

  const handleChangeSelected = (value: string|null, field: string) => {
    if(!value){
      return
    }
    if (field == 'hours') {
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: Number(value)
      }));
    } else {
      setFormData(prevFormData => ({
        ...prevFormData,
        [field]: value
      }));
    }
  }

  const handleChangeDate = (date: Date, field: string) => {
    const formattedDate = format(date, "yyyy-MM-dd");
    setFormData(prevFormData => ({
      ...prevFormData,
      [field]: formattedDate
    }));
  }

  const [dataCheckRoom] = useGetCheckRoomMutation()
  const [dataCheckLearner] = useCheckLearnersMutation()
  const [dataCheckInstructor] = useCheckInstructorsMutation()
  const [addClassroom] = useAddClassroomMutation()
  const [isCheckRoom, setIsCheckRoom] = useState<boolean>(false);
  const [checkRooms, setCheckRooms] = useState<string[]>([]);
  const [listLearners, setListLearners] = useState<User[]>([]);
  const [listInstructors, setListInstructors] = useState<User[]>([]);

  const handleCheckRoom = async () => {
    if (formData.hours == 0) {
      toast.warning('Vui lòng chọn ca trước khi kiểm tra lịch')
      return
    }
    if (formData.dayOfWeek == '') {
      toast.warning('Vui lòng chọn ngày trước khi kiểm tra lịch')
      return
    }
    if (formData.dateEnd == '' || formData.dateStart == '') {
      toast.warning('Vui lòng chọn đủ ngày bắt đầu và ngày kết thúc trước khi kiểm tra lịch')
      return
    }

    const req: CheckRoom = {
      hours: formData.hours,
      dateEnd: formData.dateEnd,
      dateStart: formData.dateStart,
      dayOfWeek: formData.dayOfWeek
    }
    try {
      const resCheckRoom: CheckRoomResponse = await dataCheckRoom(req).unwrap();
      const resCheckLearner: UsersResponse = await dataCheckLearner(req).unwrap();
      const resCheckInstructor: UsersResponse = await dataCheckInstructor(req).unwrap();

      setCheckRooms(resCheckRoom.data)
      setListLearners(resCheckLearner.data)
      setListInstructors(resCheckInstructor.data)

      setFormData(prevFormData => ({
        ...prevFormData,
        room: '',
        instructor: '',
        learners: []
      }));
      setIsCheckRoom(true);
      toast.success('Kiểm tra lịch thành công')
    } catch (error) {
      toast.warning('Kiểm tra lịch thất bại')
    }

  }

  useEffect(() => {
    setFormData(prevFormData => ({
      ...prevFormData,
      room: '',
      instructor: '',
      learners: []
    }));
    setCheckRooms([]);
    setIsCheckRoom(false)
  }, [formData.hours, formData.dateEnd, formData.dateStart, formData.dayOfWeek])


  const handleSelectRoom = (idRoom: string, isSelected: boolean) => {
    if (isSelected) {
      toast.warning('Phòng này đã có lớp, Vui lòng chọn phòng khác')
      return
    }
    if (!isCheckRoom) {
      toast.warning('Vui lòng kiểm tra lịch trước khi chọn phòng học')
      return
    }
    setFormData(prevFormData => ({
      ...prevFormData,
      room: idRoom
    }));
  }

  
  const handleSelectedLearner = (selectedLearners: string[]) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      learners: selectedLearners
    }));
  }

  const handleSubmit = async() => {
    if (formData.title === '') {
      toast.error('Vui lòng nhập tên lớp');
      return
    }

    if (formData.code === '') {
      toast.error('Vui lòng nhập mã lớp');
      return
    }
    
    if (formData.course === '') {
      toast.error('Vui lòng chọn khóa học');
      return
    }
    
    if (formData.dateStart === ''||formData.dateStart === ''||formData.dateEnd === ''|| formData.hours === 0) {
      toast.error('Vui lòng chọn lịch học');
      return
    }
    if (formData.room === '') {
      toast.error('Vui lòng chọn phòng học');
      return
    }
    
    if (formData.instructor === '') {
      toast.error('Vui lòng chọn giảng viên');
      return
    }
    
    if (formData.learners.length === 0) {
      toast.error('Vui lòng chọn sinh viên');
      return
    }
    
    try {
      const reqAddClassroom = await addClassroom(formData).unwrap();
      
      if (reqAddClassroom.statusCode == 201) {
        toast.success('Tạo lớp học thành công');
        navigate('/list-classroom');
      }
      
    } catch (error) {
      toast.warning('Tạo lớp học thất bại')
    }
  }

  


  return (
    <>
      <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-semibold leading-7 text-gray-900 mb-2">
            Thông tin lớp học
          </h1>
          <div className="flex space-x-2">
            <Link to={"/list-classroom"}>
              <button
                type="button"
                className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 hover:bg-red-900 hover:text-white"
              >
                Huỷ
              </button>
            </Link>
            <button
              type="button"
              onClick={handleSubmit}
              className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Tạo mới
            </button>
          </div>
        </div>
        <form>
          <div className="space-y-12">
            <div className=" border-gray-900/10 pb-2">
              <div className="mt-3">
                <Input
                  color="purple"
                  label="Tên Lớp"
                  placeholder=""
                  name="title"
                  crossOrigin={undefined}
                  onChange={(e) => handleChangeInput(e, 'title')}
                />
              </div>
              <div className="mt-3">
                <Input
                  color="purple"
                  label="Mã Lớp"
                  placeholder=""
                  name="code"
                  crossOrigin={undefined}
                  onChange={(e) => handleChangeInput(e, 'code')}
                />
              </div>
              <div className="mt-3">
                {allCourse && allCourse.data && (<Select
                  color="purple"
                  label="Khoá học"
                  placeholder={"Chọn Khoá học"}
                >
                  {allCourse.data
                    .filter(option => option.isActive)
                    .map(option => (
                      <Option key={option._id} value={option._id} onClick={() => handleChangeSelected(option._id, 'course')}>
                        {option.title}
                      </Option>
                    ))
                  }
                </Select>)}
              </div>
            </div>
          </div>
        </form>
      </div>

      <div className="w-full p-6 border border-gray-200  bg-white rounded-lg shadow mb-3">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">
          Chọn phòng học
        </h1>

        <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
          <div className="col-span-6 lg:col-span-3">
            <div className="mt-3">
              <Select
                color="purple"
                label="Ca học"
                placeholder={"Ca Học"}
              >
                {hoursOptions.map((option) => (
                  <Option key={option.value} value={option.value} onClick={() => handleChangeSelected(option.value, 'hours')}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mt-3">
              <Select
                color="purple"
                label="Ngày học trong tuần"
                placeholder={"Ngày học trong tuần"}
              >
                {dayofWeekOptions.map((option) => (
                  <Option key={option.value} value={option.value} onClick={() => handleChangeSelected(option.value, 'dayOfWeek')}>
                    {option.label}
                  </Option>
                ))}
              </Select>
            </div>
          </div>{" "}
          <div className="col-span-6 lg:col-span-3">
            <div className="mt-3">
              <InputDate isStartDate={true} endDate={formData.dateEnd} onChange={(date) => handleChangeDate(date, 'dateStart')} />
            </div>
            <div className="mt-3">
              <InputDate isStartDate={false} startDate={formData.dateStart} onChange={(date) => handleChangeDate(date, 'dateEnd')} />
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center m-3">
          <div className="flex space-x-2">
            <button
              type="button"
              className={`rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 cursor-pointer`}
              onClick={handleCheckRoom}
            >
              Kiểm tra lịch
            </button>
          </div>
        </div>
        <div className="bg-white">
          <div className="flex justify-center">
            <ul className="seat__layout-rows">
              {allRooms?.data?.map((room, index) => {
                const floorNumber = parseInt(room.title.charAt(0));
                if (index === 0 || parseInt(allRooms.data[index - 1]?.title.charAt(0)) !== floorNumber) {
                  return (
                    <li key={room._id} className="mb-3 flex items-center space-x-2">
                      <div className="text-xl font-semibold">
                        L<span>{floorNumber}</span>
                      </div>
                      {allRooms.data
                        .filter((r) => parseInt(r.title.charAt(0)) === floorNumber)
                        .map((room) => (
                          <button
                            key={room._id}
                            className={`h-6 md:h-14 border rounded md:text-s text-[10px] transition duration-200 ease-in-out w-6 md:w-14 ${checkRooms.includes(room._id) ? "bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 font-medium rounded-lg" : "false"
                              } ${(formData.room == room._id && !checkRooms.includes(room._id)) ? "bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 rounded-lg text-white" : "bg-grey-20 text-black"
                              }`}
                            onClick={() => { handleSelectRoom(room._id, checkRooms.includes(room._id)) }}
                          >
                            <span>P.{room.title}</span>
                          </button>
                        ))}
                    </li>
                  )
                }
                return null;
              })}
            </ul>
          </div>
          <div className="seat__layout-screen">
            <div className="border-2 border-orange-10"></div>
            <div className="text-sm flex md:flex-row flex-col-reverse justify-between items-center py-2 gap-2">
              <div className="flex gap-5">
                <div>
                  <span className="w-5 h-5 rounded border border-yellow-10 inline-block align-middle"></span>
                  <span className="ml-2">Phòng đang trống</span>
                </div>
                <div>
                  <span className="w-5 h-5 rounded border border-yellow-10 inline-block align-middle bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 text-white"></span>
                  <span className="ml-2">Phòng đang chọn</span>
                </div>
                <div>
                  <span className="w-5 h-5 rounded border border-yellow-10 inline-block align-middle bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800 "></span>
                  <span className="ml-2">Đã có lớp </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full p-6 border border-gray-200  bg-white rounded-lg shadow mb-3">
        <h1 className="text-2xl font-semibold leading-7 text-gray-900">
          Chọn giảng viên và sinh viên
        </h1>

        <div className="mt-3">
          <SelectSearch
            onSelectChange={(value) => handleChangeSelected(value, "instructor")}
            instructors={listInstructors}
          ></SelectSearch>
        </div>
        <div className="mt3">
          <DataTable
            onSelectedStudentsChange={handleSelectedLearner}
            learners={listLearners}
          ></DataTable>
        </div>
        <div className="flex space-x-2 justify-end mt-6">
          <Link to={"/list-classroom"}>
            <button
              type="button"
              className="rounded-md text-sm font-semibold px-3 py-2 leading-6 text-gray-900 hover:bg-red-900 hover:text-white"
            >
              Huỷ
            </button>
          </Link>
          
          <button
            type="button"
            onClick={handleSubmit}
            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Tạo mới
          </button>
        </div>
      </div>
    </>
  );
};

export default CrudClassRoomPage;
