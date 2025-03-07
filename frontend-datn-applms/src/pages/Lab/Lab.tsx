import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { FileInput } from "flowbite-react";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getItem } from "../../helper/storage";
import {
  useAddResultLabMutation,
  useGetClassroomQuery,
  useGetLabQuery,
  useGetResultLabQuery,
  useUploadFileLabMutation,
} from "../../service/api";
import { User } from "../../types/User";

const LabPage: React.FC = () => {
  const userInfo = getItem("userInfo") as User;
  const URL_File = import.meta.env.VITE_FILE_UPLOADS_URL;
  const { classroomId, labId } = useParams();
  const { data: lab, isLoading, isError } = useGetLabQuery(labId || "");
  const { data: classroom } = useGetClassroomQuery({ _id: classroomId as string });
  const [uploadFileLab] = useUploadFileLabMutation();
  const [addResultLab] = useAddResultLabMutation();
  const [fileLab, setFileLab] = useState<FileList>();

  const infoGetResult = {
    classroom: classroomId || "",
    course: "",
    lab: labId || "",
  };

  if (classroom && classroom.data) {
    infoGetResult.course = classroom.data.course?._id || "";
  }

  // console.log(infoGetResult);

  const { data: labCheck } = useGetResultLabQuery(infoGetResult);

  // console.log(labCheck);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileLab(e.target.files);
    }
  };

  const handleUploadLab = async () => {
    try {
      if (!fileLab || fileLab.length === 0) {
        toast.warn("Please select a file to upload.");
        return;
      }

      if (!fileLab || fileLab.length === 0) {
        return;
      }

      const formData = new FormData();
      // console.log(fileLab[0]);

      formData.append("lab", fileLab[0]);
      // console.log(formData.values);
      const response = await uploadFileLab(formData).unwrap();
      if (response.statusCode === 200) {
        const filename = response.data;
        // console.log(response);


        // console.log(filename.originalname);
        const result = {
          classroom: classroomId || "",
          course: classroom?.data?.course?._id || "",
          lab: labId || "",
          originalname: filename.originalname,
          filename: filename.filename,
          size: filename.size,
          type: filename.mimetype,
        };

        // console.log(result);

        const resultResponse = await addResultLab(result).unwrap();
        // console.log(resultResponse);

        if (resultResponse.statusCode === 201) {
          toast.success("File uploaded successfully.");
        } else {
          toast.error(
            resultResponse.messages ||
            "Failed to add lab result. Please try again later."
          );
        }
      } else {
        toast.error("Failed to upload file. Please try again later.");
      }
    } catch (error) {
      // console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading file.");
    }
  };
  const formatDateTime = (dateTimeString: string) => {
    const dateTime = new Date(dateTimeString);
    return dateTime.toLocaleString();
  };
  if (isLoading) return <div>Đang tải...</div>;
  if (isError) return <div>Lỗi lab</div>;

  return (
    <>
      {userInfo?.role === "learner" && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <h2 className="text-lg font-semibold">
            {lab && lab.data && lab.data.title}
          </h2>
          <p>{lab && lab.data && lab.data.description}</p>
          {labCheck && labCheck.data && Array.isArray(labCheck.data) && (
            <div className="py-2">
              <h2 className="text-lg font-semibold">File đã nộp</h2>
              {labCheck.data.map((lab, index) => (
                <div
                  key={index}
                  className="pl-2 pb-2 pt-1 border-b border-gray-300 last:border-b-0 flex justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      Tên file: {lab.originalname}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(lab.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nộp vào: {formatDateTime(lab.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
          <form className="grid grid-cols-1 gap-2 ">
            <div className="mb-3">
              <FileInput
                id="file-upload"
                name="lab"
                title="lab"
                onChange={(e) => handleFile(e)}
              />
            </div>
          </form>

          <div className="flex justify-center">
            <button
              type="button"
              className="inline-block rounded-e mt-2 border-2 border-primary-100 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 "
              data-twe-ripple-init
              data-twe-ripple-color="light"
              onClick={handleUploadLab}
            >
              Nộp lab
            </button>
          </div>
        </div>
      )}
      {userInfo?.role === "instructor" && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <h2 className="text-lg font-semibold">
            {lab && lab.data && lab.data.title}
          </h2>
          <p>{lab && lab.data && lab.data.description}</p>
          {labCheck && labCheck.data && Array.isArray(labCheck.data) && (
            <TableContainer component={Paper}>
              <Table sx={{ minWidth: 650 }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Tên file</TableCell>
                    <TableCell align="right">Kích thước (Kb)</TableCell>
                    <TableCell align="right">Thời gian</TableCell>
                    <TableCell align="right">Người nộp</TableCell>
                    <TableCell align="right">Tải file</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {labCheck.data.length == 0 ? (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell colSpan={5} align="center">Không có file nào</TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {labCheck.data.map((lab, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {lab.originalname}
                          </TableCell>
                          <TableCell align="right">{(lab.size / 1024).toFixed(0)}</TableCell>
                          <TableCell align="right">{formatDateTime(lab.updatedAt)}</TableCell>
                          <TableCell align="right">{lab?.learner?.fullname}</TableCell>
                          <TableCell align="right">
                            <a
                              href={`${URL_File}/labs/${lab.filename}`}
                              className="inline-block rounded-e mt-2 border-2 border-primary-100 px-3 py-1 text-xs font-medium uppercase leading-normal text-primary-700 transition duration-150 ease-in-out hover:border-primary-accent-200 hover:bg-secondary-50/50 focus:border-primary-accent-200 focus:bg-secondary-50/50 focus:outline-none focus:ring-0 active:border-primary-accent-200 motion-reduce:transition-none dark:border-primary-400 dark:text-primary-300 dark:hover:bg-blue-950 dark:focus:bg-blue-950 "
                              data-twe-ripple-init
                              data-twe-ripple-color="light"
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
                                <path d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                              </svg>
                            </a>
                          </TableCell>
                        </TableRow>
                      ))}
                    </>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </div>
      )}
    </>
  );
};

export default LabPage;
