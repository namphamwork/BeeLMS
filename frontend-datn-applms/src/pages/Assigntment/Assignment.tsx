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
import { formatDateTime } from "../../helper/validators";
import {
  useAddResultAssignmentMutation,
  useGetAssignmentQuery,
  useGetClassroomQuery,
  useGetResultAssignmentQuery,
  useUploadFileAssignmentMutation,
} from "../../service/api";
import { User } from "../../types/User";

const AssignmentPage: React.FC = () => {
  const userInfo = getItem("userInfo") as User;
  const URL_File = import.meta.env.VITE_FILE_UPLOADS_URL;
  const { classroomId , assignmentId } = useParams();
  const { data: assignment, isLoading, isError } = useGetAssignmentQuery(assignmentId || "");
  const { data: classroom } = useGetClassroomQuery({ _id: classroomId as string });
  const [uploadFileAssignment] = useUploadFileAssignmentMutation();
  const [addResultAssignment] = useAddResultAssignmentMutation();
  const [fileAssignment, setFileAssignment] = useState<FileList>();

  const infoGetResult = {
    classroom: classroomId || "",
    course: "",
    assignment: assignmentId || "",
  }


  if (classroom && classroom.data) {
    infoGetResult.course = classroom.data.course?._id || "";
  }
  // console.log(infoGetResult);

  const { data: assignmentCheck } = useGetResultAssignmentQuery(infoGetResult);
  // console.log(assignmentCheck);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFileAssignment(e.target.files);
    }
  };

  const handleUploadAssignment = async () => {
    try {
      if (!fileAssignment || fileAssignment.length === 0) {
        toast.warn("Please select a file to upload.");
        return;
      }

      const formData = new FormData();
      formData.append("assignment", fileAssignment[0]);

      const response = await uploadFileAssignment(formData).unwrap();
      if (response.statusCode === 200) {
        const filename = response.data;
        const result = {
          classroom: classroomId || "",
          course: classroom?.data?.course?._id || "",
          assignment: assignmentId || "",
          originalname: filename.originalname,
          filename: filename.filename,
          size: filename.size,
          type: filename.mimetype,
        };

        const resultResponse = await addResultAssignment(result).unwrap();

        if (resultResponse.statusCode === 201) {
          toast.success("File uploaded successfully.");
        } else {
          toast.error(
            resultResponse.messages ||
            "Failed to add assignment result. Please try again later."
          );
        }
      } else {
        toast.error("Failed to upload file. Please try again later.");
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("An error occurred while uploading file.");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error fetching Assignment</div>;

  return (
    <>
      {userInfo?.role === "learner" && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <h2 className="text-lg font-semibold">
            {assignment && assignment.data && assignment.data.title}
          </h2>
          <p>{assignment && assignment.data && assignment.data.description}</p>
          {assignmentCheck && assignmentCheck.data && Array.isArray(assignmentCheck.data) && (
            <div className="py-2">
              <h2 className="text-lg font-semibold">File đã nộp</h2>
              {assignmentCheck.data.map((assignment, index) => (
                <div
                  key={index}
                  className="pl-2 pb-2 pt-1 border-b border-gray-300 last:border-b-0 flex justify-between"
                >
                  <div>
                    <p className="text-sm text-gray-600">
                      Tên file: {assignment.originalname}
                    </p>
                    <p className="text-sm text-gray-600">
                      {(assignment.size / 1024).toFixed(0)} KB
                    </p>
                  </div>
                  <p className="text-sm text-gray-600">
                    Nộp vào: {formatDateTime(assignment.updatedAt)}
                  </p>
                </div>
              ))}
            </div>
          )}
          <form className="grid grid-cols-1 gap-2 ">
            <div className="mb-3">
              <FileInput
                id="file-upload"
                name="assignment"
                title="assignment"
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
              onClick={handleUploadAssignment}
            >
              Nộp Assignment
            </button>
          </div>
        </div>
      )}
      {userInfo?.role === "instructor" && (
        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow mb-3">
          <h2 className="text-lg font-semibold">
            {assignment && assignment.data && assignment.data.title}
          </h2>
          <p>{assignment && assignment.data && assignment.data.description}</p>
          {assignmentCheck && assignmentCheck.data && Array.isArray(assignmentCheck.data) && (
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
                  {assignmentCheck.data.length == 0 ? (
                    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                      <TableCell colSpan={5} align="center">Không có file nào</TableCell>
                    </TableRow>
                  ) : (
                    <>
                      {assignmentCheck.data.map((assignment, index) => (
                        <TableRow key={index} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                          <TableCell component="th" scope="row">
                            {assignment.originalname}
                          </TableCell>
                          <TableCell align="right">{(assignment.size / 1024).toFixed(0)}</TableCell>
                          <TableCell align="right">{formatDateTime(assignment.updatedAt)}</TableCell>
                          <TableCell align="right">{assignment?.learner?.fullname}</TableCell>
                          <TableCell align="right">
                            <a
                              href={`${URL_File}/assignments/${assignment.filename}`}
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

export default AssignmentPage;
