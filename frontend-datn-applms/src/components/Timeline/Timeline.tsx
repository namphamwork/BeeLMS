import { Classroom } from "../../types/Classroom";
interface stepProps {
  classrooms: Classroom[];
}

const Step: React.FC<stepProps> = ({ classrooms }: stepProps) => {

    // console.log(classrooms);
    
    const steps = [
      { number: 1,  time: "7:00 - 9:00" },
      { number: 2,  time: "9:00 - 11:00" },
      { number: 3,  time: "13:00 - 15:00" },
      { number: 4,  time: "15:00 - 17:00" },
      { number: 5,  time: "17:00 - 19:00" },
      { number: 6,  time: "19:00 - 21:00" },
    ];
    const classSchedule = classrooms?.map(classroom => {
      const scheduleNumber = classroom.hours;
      // Tìm thời gian tương ứng với số ca học
      const scheduleTime = steps.find(step => step.number === scheduleNumber)?.time || "Unknown";
      return [classroom?.title, scheduleNumber, scheduleTime, classroom?.room?.title, classroom?.code];
  });
  
  // console.log(classrooms);
  

  // console.log(classSchedule);
    return (
      <div className=" py-4 mx-auto sm:max-w-xl md:max-w-full lg:max-w-screen-xl  lg:py-4">
        <div className="grid max-w-2xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="flex min-h-12 ">
              <div className="flex flex-col items-center mr-2 ">
                <div className="w-px h-10 bg-gray-300 sm:h-full" />
                <div>
                  <div className="flex items-center justify-center w-8 h-8 text-xs font-medium border rounded-full">
                    {step.number} {/* Số ca học */}
                  </div>
                </div>
                <div className="w-px h-full bg-gray-300" />
              </div>
              <div className="flex flex-col pb-6 sm:items-center sm:flex-row sm:pb-0">
                <div>
                  <p className="text-xl font-semibold sm:text-base"> 
                    {/* Kiểm tra xem step.time có trùng với scheduleNumber không */}
                    {classSchedule.some(schedule => schedule[2] === step.time) ?
                      `[${classSchedule.find(schedule => schedule[2] === step.time)?.[4]}] `  :
                      ""
                    } 
                    {/* Kiểm tra xem step.time có trùng với scheduleNumber không */}
                    {classSchedule.some(schedule => schedule[2] === step.time) ?
                      classSchedule.find(schedule => schedule[2] === step.time)?.[0] :
                      ""
                    } 
                  </p> {/* Tên lớp học */}
                  <p className="text-sm text-gray-700">
                    {classSchedule.some(schedule => schedule[2] === step.time) ?
                      classSchedule.find(schedule => schedule[2] === step.time)?.[2] :
                      ""
                    }
                    {classSchedule.some(schedule => schedule[2] === step.time) ?
                      ` Phòng: ${classSchedule.find(schedule => schedule[2] === step.time)?.[3]}` :
                      ""
                    }
                    </p> 
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
    
  };

  export default Step;
  