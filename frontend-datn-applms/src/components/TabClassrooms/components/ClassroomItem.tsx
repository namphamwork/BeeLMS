import { useLocation } from "react-router-dom";
import { urlImage } from "../../../constant/config";
import { Classroom } from "../../../types/Classroom";
import { LinkTo } from "./LinkTo";

interface Props {
  item: Classroom;
  index: number;
}

export const ClassroomItem: React.FC<Props> = ({ item,index }) => {
  const location = useLocation();
  const steps = [
    { number: 1, time: "7:00 đến 9:00" },
    { number: 2, time: "9:00 đến 11:00" },
    { number: 3, time: "13:00 đến 15:00" },
    { number: 4, time: "15:00 đến 17:00" },
    { number: 5, time: "17:00 đến 19:00" },
    { number: 6, time: "19:00 đến 21:00" },
  ];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const year = date.getFullYear().toString();
    return `${day}-${month}-${year}`;
  };
  const indexImage = (index % 4) + 1;

  return (
    <div className="flex items-center">
      <div className="flex w-full flex-row rounded-xl bg-white bg-clip-border text-gray-700 shadow-md">
        <div className="">
          <img
            src={`${urlImage}/dashboardThumbnail${indexImage}.jpg`}
            alt="image"
            className="w-60 h-60 object-cover"
          />
        </div>
        <div className="p-3">
          <h6 className="block font-sans text-sm font-semibold uppercase leading-relaxed tracking-normal text-pink-500 antialiased">
            GVHD: {item?.instructor?.fullname}
          </h6>
          <h4 className="block font-sans text-base font-semibold leading-snug tracking-normal text-blue-gray-900 antialiased h-[40px] mb-2 overflow-hidden">
            [{item?.code}] {item?.title}
          </h4>
          <p className="block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            <span className="font-semibold">Học vào: </span>Thứ {item?.dayOfWeek.split("").join(" ")}
          </p>
          <p className="block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            <span className="font-semibold">Ca: </span>{item?.hours} từ{" "}
            {steps.find((step) => step.number === item.hours)?.time}
          </p>
          <p className="block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            <span className="font-semibold">Từ ngày: </span>{formatDate(item?.dateStart)} đến{" "}
            {formatDate(item?.dateEnd)}
          </p>
          <p className="block font-sans text-base font-normal leading-relaxed text-gray-700 antialiased">
            <span className="font-semibold">Phòng học: </span>{item?.room?.title}
          </p>
          {location.pathname !== "/mark" &&
            location.pathname !== "/attendance" && (
              <LinkTo
                targetUrl={`myclassroom/${item?._id}`}
                label="Chi tiết lớp học"
              />
            )}
          {location.pathname == "/mark" && (
            <LinkTo targetUrl={`/mark/${item?._id}`} label="Cập nhật điểm" />
          )}
          {location.pathname == "/attendance" && (
            <LinkTo
              targetUrl={`/attendance/${item?._id}`}
              label="Cập nhật điểm danh"
            />
          )}
        </div>
      </div>
    </div>
  );
};
