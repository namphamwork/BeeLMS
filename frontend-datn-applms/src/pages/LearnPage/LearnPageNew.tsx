import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { VITE_ASSET_URL } from "../../layout/Header/Header";
import { useGetClassroomQuery, useGetCourseQuery, useGetVideoCheckQuery, usePostResultVideoMutation } from "../../service/api";
import { Lesson } from "../../types/Lesson";
import { CheckVideo, Video, resultVideo } from "../../types/Video";
import QuizComponent from "./QuizComponent";
import CircularProgressWithLabel from "./components/CircularProgressWithLabel";
const getYoutubeVideoId = (url: string): string => {
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let match;
  while ((match = regex.exec(url)) !== null) {
    if (match[1] === "v") {
      return match[2];
    }
  }
  return "";
};

const secondsToTime = (seconds: number) => {
  var hours = Math.floor(seconds / 3600);
  var minutes = Math.floor((seconds % 3600) / 60);
  var remainingSeconds = seconds % 60;

  return hours.toString().padStart(2, '0') + ':' +
    minutes.toString().padStart(2, '0') + ':' +
    remainingSeconds.toString().padStart(2, '0');
}

interface LearnProps {
  id: string; // id Course nè
  idClassroom: string; // id Class nè
}

const Learn: React.FC<LearnProps> = ({ id, idClassroom }) => {

  const { data: course } = useGetCourseQuery(id as string);
  const checkVideoParams: CheckVideo = { course: id };

  const { data: videoCheck } = useGetVideoCheckQuery(checkVideoParams);

  const [lessonSelected, setLessonSelected] = useState<Lesson>()
  const [videoSelected, setVideoSelected] = useState<Video>()
  const [videoNextLearn, setVideoNextLearn] = useState<string>('')
  const [progress, setProgress] = useState<number>(0);
  const [countVideos, setCountVideos] = useState<number>(0);
  const [indexQuiz, setIndexQuiz] = useState<number>(0);
  const [postResultVideo] = usePostResultVideoMutation();


  const [isOpenSidebar, setIsOpenSidebar] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      setIsOpenSidebar(screenWidth > 1140);
    };

    handleResize();

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (course && videoCheck) {
      let arrayVideo: string[] = [];
      course?.data.lessons.forEach(lesson => {
        lesson.videos.forEach(video => {
          arrayVideo.push(video._id);
        })
      })
      setCountVideos(arrayVideo.length);
      findFirstNonMatchingElement(arrayVideo, videoCheck?.data);
      setProgress(videoCheck?.data?.length / arrayVideo?.length);
    }
  }, [course, videoCheck])

  useEffect(() => {
    if (course) {
      setLessonSelected(course.data.lessons[0]);
      setVideoSelected(course.data.lessons[0].videos[0]);
    }
  }, [course])

  useEffect(() => {
    handleDurationResultVideo()
  }, [videoSelected])


  const handleDurationResultVideo = () => {
    if (videoSelected && videoSelected.duration && course && course.data._id) {
      const duration = 1; //*1000 mới đúng

      setTimeout(async () => {
        const req: resultVideo = {
          course: course.data._id,
          video: videoSelected._id
        }
        await postResultVideo(req)
      }, duration);
    }
  }


  const findFirstNonMatchingElement = (arr: string[], arr2: string[]) => {
    for (const element of arr) {
      if (!arr2.includes(element)) {
        setVideoNextLearn(element)
        return element;
      }
      setVideoNextLearn('');
    }
    return null;
  }

  const logicCheckVideo = (idVideo: string) => {
    if (idVideo == videoNextLearn) {
      return 1
    }
    if (videoCheck?.data.includes(idVideo)) {
      return 2
    } else {
      return 0
    }
  }


  return (
    <>
      {course && course.data && videoCheck && videoCheck.data && (
        <>
          {/* header */}
          <div className="flex min-h-[50px] w-full justify-between items-center self-stretch bg-[#29303B] text-white fixed top-0 z-10">
            <div className="flex min-h-[50px] justify-center items-center self-stretch">
              <div className="min-h-[50px] w-1/4 flex justify-center items-center">
                <Link to={"/"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="10"
                    height="16"
                    viewBox="0 0 10 16"
                    fill="none"
                    className="mx-auto  my-auto"
                  >
                    <path
                      d="M6.99803 14.9857C6.74241 14.9857 6.48667 14.8882 6.29186 14.6931L0.297864 8.70091C-0.0923706 8.3108 -0.0923706 7.67881 0.297864 7.28869L6.29186 1.29649C6.6821 0.906377 7.31428 0.906377 7.70451 1.29649C8.09475 1.68661 8.09475 2.3186 7.70451 2.70872L2.41668 7.9948L7.70514 13.2817C8.09537 13.6718 8.09537 14.3038 7.70514 14.6939C7.51002 14.8889 7.25403 14.9857 6.99803 14.9857Z"
                      fill="white"
                    />
                  </svg>
                </Link>
              </div>
              <div className="mx-auto">
                <Link to={"/"}>
                  <img
                    className="w-[50px] mx-auto "
                    src={`${VITE_ASSET_URL}/BeeLMS.png`}
                    alt="logo"
                  />
                </Link>
              </div>
              <div>
                <p className="text-[13px] font-bold pl-4">{course?.data?.title}</p>
              </div>
            </div>
            <div className="flex min-h-[50px] justify-center items-center self-stretch">
              <div className="pr-6 flex">
                <CircularProgressWithLabel color="warning" value={Math.round(progress * 100)}/>
                <div className="flex justify-center pl-[6px]">
                  <div className="flex justify-center items-center my-auto text-[13px]">
                    {videoCheck.data.length}/{countVideos}
                  </div>
                  <div className="flex items-center text-[13px] ml-1">
                    <p>bài học</p>
                  </div>
                </div>
              </div>
              <div>
                <button className="flex pr-6 items-center text-[13px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="15"
                    viewBox="0 0 12 15"
                    fill="none"
                  >
                    <path
                      d="M7.74356 0.0400391V3.53754H11.2402L7.74356 0.0400391ZM6.8694 3.53754V0.0400391H2.06149C1.3373 0.0400391 0.750244 0.627236 0.750244 1.3516V12.7185C0.750244 13.4426 1.3373 14.03 2.06149 14.03H9.92897C10.6532 14.03 11.2402 13.4428 11.2402 12.7185V4.41191H7.76815C7.26004 4.41191 6.8694 4.02118 6.8694 3.53754Z"
                      fill="white"
                    />
                  </svg>
                  <p className="ml-1">Ghi chú</p>
                </button>
              </div>
              <div>
                <button className="flex pr-6 items-center text-[13px]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="none"
                  >
                    <path
                      d="M7.27527 0.0400391C3.41163 0.0400391 0.280273 3.17139 0.280273 7.03504C0.280273 10.8987 3.41163 14.03 7.27527 14.03C11.1389 14.03 14.2703 10.8987 14.2703 7.03504C14.2703 3.17139 11.1389 0.0400391 7.27527 0.0400391ZM7.27527 10.9697C6.78344 10.9697 6.4009 10.5872 6.4009 10.0954C6.4009 9.60352 6.75885 9.22098 7.27527 9.22098C7.74252 9.22098 8.14965 9.60352 8.14965 10.0954C8.14965 10.5872 7.74252 10.9697 7.27527 10.9697ZM9.16338 7.08969L7.93105 7.85477V7.90941C7.93105 8.26463 7.63049 8.5652 7.27527 8.5652C6.92006 8.5652 6.61949 8.26463 6.61949 7.90941V7.47223C6.61949 7.25363 6.72879 7.03504 6.94738 6.89842L8.50486 5.96939C8.69613 5.8601 8.80543 5.66883 8.80543 5.45023C8.80543 5.12234 8.5076 4.8491 8.17971 4.8491H6.78344C6.43095 4.8491 6.1823 5.12234 6.1823 5.45023C6.1823 5.80545 5.88174 6.10602 5.52652 6.10602C5.17131 6.10602 4.87074 5.80545 4.87074 5.45023C4.87074 4.38459 5.71779 3.53754 6.75885 3.53754H8.15511C9.26994 3.53754 10.117 4.38459 10.117 5.45023C10.117 6.10602 9.76178 6.73447 9.16338 7.08969Z"
                      fill="white"
                    />
                  </svg>
                  <p className="ml-1">Hướng dẫn</p>
                </button>
              </div>
            </div>
          </div>
          <div className="flex h-screen">
            <div className={`w-full ${isOpenSidebar ? `xl:w-[77%]` : `xl:w-full`}`}>
              <div className="py-[50px] overflow-y-auto" style={{ height: 'calc(100vh - 50px)' }}>
                <div className="w-full px-0 md:px-[10%] min-h-fit bg-black">
                  <iframe
                    className="w-full min-h-[360px] lg:min-h-[512px]"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(videoSelected?.urlVideo as string)}`}
                    allowFullScreen
                  ></iframe>
                </div>
                <div className="px-8 py-5 xl:px-16">
                  <div className="text-2xl font-semibold mb-4">{videoSelected?.title}</div>
                  <div className="text-2xl font-semibold">{lessonSelected?.title}</div>
                  <div className="mb-4">{lessonSelected?.description}</div>

                  {lessonSelected && (<QuizComponent idClassroom={idClassroom} idCourse={id} lesson={lessonSelected} quizIndex={indexQuiz} />)}
                </div>
              </div>
            </div>
            <div className={`overflow-hidden min-h-screen py-[50px] ${isOpenSidebar ? `xl:w-[23%]` : `w-[0]`}`}>
              <div className={`bg-white border border-l-2 ${isOpenSidebar ? `fixed top-[50px] right-0 w-[400px] xl:relative xl:top-0 xl:w-full` : ``}`}>
                <h1 className="text-base font-semibold p-3 bg-white">Nội dung khóa học</h1>
                <div className="overflow-y-scroll" style={{ height: 'calc(100vh - 150px)' }}>
                  {course.data.lessons?.map((lesson, indexLesson) => (
                    <div key={lesson._id}>
                      <div
                        className="py-2 px-3 w-full border-b-2 border-gray cursor-pointer"
                      >
                        <div className="flex justify-between">
                          <p className="text-base font-semibold mb-1" onClick={() => { setLessonSelected(lesson), setIndexQuiz(0) }}>{indexLesson + 1}. {lesson.title}</p>
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="15"
                            height="17"
                            viewBox="0 0 15 17"
                            fill="none"
                          >
                            <path
                              d="M7.39523 13.4866C7.13954 13.4866 6.88372 13.3891 6.68886 13.1939L0.69315 7.19784C-0.0451904 7.30627 -0.0451904 6.75342 0.296216 6.41216L5.54022 1.17038C5.88162 0.829113 6.4347 0.829113 6.77611 1.17038C7.11751 1.51164 7.11751 2.06448 6.77611 2.40574L2.14992 7.02984L6.77665 11.6546C7.11806 11.9959 7.11806 12.5487 6.77665 12.89C6.60595 13.0606 6.38199 13.1453 6.15802 13.1453Z"
                              fill="#333333"
                            />
                          </svg>
                        </div>
                        <p className="text-xs">
                          Thời gian: {(() => {
                            let totalDuration = 0;

                            lesson.videos.forEach(video => {
                              totalDuration += parseInt(video.duration);
                            });

                            return secondsToTime(totalDuration);
                          })()}
                        </p>
                      </div>
                      <div className="py-1 px-4 bg-gray-100">
                        <ul>

                          {lesson.videos.map((video, indexVideo) => (
                            <li key={video._id} className="text-sm flex justify-between py-2">
                              {logicCheckVideo(video._id) == 1 ? (
                                <div>
                                  <div className="flex items-center cursor-pointer" onClick={() => { setVideoSelected(video); setLessonSelected(lesson); setIndexQuiz(indexVideo) }}>{indexLesson + 1}.{indexVideo + 1}. {video.title}</div>
                                </div>
                              ) : logicCheckVideo(video._id) == 2 ? (
                                <>
                                  <div className="flex items-center cursor-pointer" onClick={() => { setVideoSelected(video); setLessonSelected(lesson); setIndexQuiz(indexVideo) }}>{indexLesson + 1}.{indexVideo + 1}. {video.title}</div>
                                  <div className="flex items-center">
                                    <div className="p-2">
                                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                                      </svg>
                                    </div>
                                  </div>
                                </>
                              ) : (
                                <>
                                  <div className="flex items-center cursor-not-allowed">{indexLesson + 1}.{indexVideo + 1}. {video.title}</div>
                                  <div className="flex items-center">
                                    <div className="p-2">
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                      >
                                        <path
                                          fillRule="evenodd"
                                          d="M12 1.5a5.25 5.25 0 0 0-5.25 5.25v3a3 3 0 0 0-3 3v6.75a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3v-6.75a3 3 0 0 0-3-3v-3c0-2.9-2.35-5.25-5.25-5.25Zm3.75 8.25v-3a3.75 3.75 0 1 0-7.5 0v3h7.5Z"
                                          clipRule="evenodd"
                                        />
                                      </svg>
                                    </div>
                                  </div>
                                </>
                              )}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>

          {/* footer */}
          <div className="min-h-[50px] bg-[#F0F0F0] flex gap-3 justify-between items-center shadow-md fixed bottom-0 w-full">
            <div></div>
            <div className="flex space-x-4">
              <button className="flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                >
                  <path
                    d="M6.15802 13.1453C5.93439 13.1453 5.71065 13.0599 5.54022 12.8893L0.296216 7.64753C-0.0451904 7.30627 -0.0451904 6.75342 0.296216 6.41216L5.54022 1.17038C5.88162 0.829113 6.4347 0.829113 6.77611 1.17038C7.11751 1.51164 7.11751 2.06448 6.77611 2.40574L2.14992 7.02984H0.999236C0.447443 9.94927 0 9.50269 0 8.94993C0 8.39717 0.447443 7.95059 0.999236 7.95059H10.5799L7.28849 4.65903C6.89814 4.26866 6.89814 3.63627 7.28849 3.2459C7.67884 2.85553 8.3112 2.85553 8.70154 3.2459L13.698 8.24259C14.0868 8.63451 14.0868 9.26535 13.6964 9.65571Z"
                    fill="#404040"
                  />
                </svg>
                <p>Bài Trước</p>
              </button>
              <button className="flex items-center px-3 py-2 rounded-md border-2 border-red-500 border-solid gap-1">
                <p className="text-red-500 text-sm">BÀI TIẾP THEO</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="10"
                  height="15"
                  viewBox="0 0 10 15"
                  fill="none"
                >
                  <path
                    d="M2.93209 13.1505C2.70846 13.1505 2.48471 13.0652 2.31428 12.8945C1.97288 12.5533 1.97288 12.0004 2.31428 11.6592L6.94157 7.03508L2.31428 2.41111C1.97288 2.06985 1.97288 1.51701 2.31428 1.17575C2.65569 0.834484 3.20877 0.834484 3.55017 1.17575L8.79417 6.41753C9.13558 6.75879 9.13558 7.31164 8.79417 7.6529L3.55017 12.8947C3.38002 13.0659 3.15605 13.1505 2.93209 13.1505Z"
                    fill="#F05123"
                  />
                </svg>
              </button>
            </div>
            <div className="flex items-center space-x-3">
              {/* <p className="ml-auto">{lessonSelected?.title}</p> */}
              <div onClick={() => { setIsOpenSidebar(!isOpenSidebar) }} className="min-h-10 w-10 rounded-full bg-white flex items-center justify-center cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="17"
                  viewBox="0 0 14 17"
                  fill="none"
                >
                  <path
                    d="M13.6964 9.65571L8.69998 14.6524C8.50637 14.8491 8.2503 14.946 7.99424 14.946C7.73817 14.946 7.48273 14.8484 7.28787 14.6532C6.89752 14.2628 6.89752 13.6304 7.28787 13.2401L10.5799 9.94927H0.999236C0.447443 9.94927 0 9.50269 0 8.94993C0 8.39717 0.447443 7.95059 0.999236 7.95059H10.5799L7.28849 4.65903C6.89814 4.26866 6.89814 3.63627 7.28849 3.2459C7.67884 2.85553 8.3112 2.85553 8.70154 3.2459L13.698 8.24259C14.0868 8.63451 14.0868 9.26535 13.6964 9.65571Z"
                    fill="black"
                  />
                </svg>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  )
}

const LearnPageNew: React.FC = () => {
  const { id } = useParams();
  const { data: classroom } = useGetClassroomQuery({ _id: id as string });

  return (
    <>
      {classroom && (<Learn id={classroom.data.course._id} idClassroom={classroom.data._id} />)}
    </>
  );
};

export default LearnPageNew;