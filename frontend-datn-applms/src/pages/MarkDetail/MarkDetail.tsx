import * as React from "react";

import { Box, Button, Stack, Typography } from "@mui/material";
import {
  CellChange,
  Column,
  DefaultCellTypes,
  Id,
  ReactGrid,
  Row,
} from "@silevis/reactgrid";
import "@silevis/reactgrid/styles.css";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetClassroomQuery,
  useGetMarkByIdClassQuery,
  useGetTableForMarkQuery,
  useUpdateMarksByIdClassroomMutation,
} from "../../service/api";
import { Assignment } from "../../types/Assignment";
import { Marks, Score } from "../../types/Classroom";
import { Lab } from "../../types/Lab";
import { Quiz } from "../../types/Lesson";
import { User } from "../../types/User";
import {
  defaultColumns,
  getColumnsDefault,
  getRowDefault,
  headerRowDefault,
} from "./helper";

export interface PutForm {
  learner: string;
  scores: scoreUpdate[];
}

interface scoreUpdate {
  modelType: string;
  score: string;
  value: number;
}

const MarkDetailPage: React.FC = () => {
  const { id } = useParams();
  const idClassroom = id as string;
  const { data: classRoom, isSuccess } = useGetTableForMarkQuery(idClassroom);
  const { data: getClassroom } = useGetClassroomQuery({ _id: idClassroom });
  const { data: getMarks, isSuccess: loadedMarks } = useGetMarkByIdClassQuery(
    id as string
  );

  const [updateMarks] = useUpdateMarksByIdClassroomMutation();
  const [marks, setMarks] = React.useState<Marks[]>();

  const [learners, setLearners] = React.useState<User[]>();
  const [labColumns, setLabColumns] = React.useState<Lab[]>();
  const [quizColumns, setQuizColumns] = React.useState<Quiz[]>();
  const [asmColumns, setAsmColumns] = React.useState<Assignment[]>();
  const [columns, setColumns] = React.useState<Column[]>(getColumnsDefault());
  const [rows, setRows] = React.useState<Row[]>(getRowDefault());

  // React.useEffect(() => {
  //   console.log({ getMarks });
  // }, [getMarks]);

  React.useEffect(() => {
    if (isSuccess && classRoom) {
      setLearners(classRoom.data.learners);
      setLabColumns(classRoom.data.labs);
      setQuizColumns(classRoom.data.quizs);
      setAsmColumns(classRoom.data.assignments);
    }
  }, [isSuccess, classRoom]);

  React.useEffect(() => {
    if (isSuccess && learners) {
      setColumns(getColumns());

      setRows(getRows(learners));
    }
  }, [learners, isSuccess, marks]);

  React.useEffect(() => {
    if (getMarks && loadedMarks) {
      setMarks(getMarks.data);
    }
  }, [getMarks, loadedMarks]);

  const getColumns = (): Column[] => {
    const asmCols =
      asmColumns && asmColumns.length > 0
        ? asmColumns.map((column) => ({
          columnId: column._id as string,
          width: 100,
          resizable: true,
        }))
        : [];
    const labCols =
      labColumns && labColumns.length > 0
        ? labColumns.map((column) => ({
          columnId: column._id as string,
          width: 100,
          resizable: true,
        }))
        : [];
    const quizCols =
      quizColumns && quizColumns.length > 0
        ? quizColumns.map((column) => ({
          columnId: column._id as string,
          width: 100,
          resizable: true,
        }))
        : [];
    return [...defaultColumns, ...quizCols, ...labCols, ...asmCols];
  };

  const getRows = (learners: User[]): Row[] => {
    const findX = (column: Lab | Quiz | Assignment) => {
      const x = learners
        ? learners.map((learner) => {
          const mark = marks && marks.find((m) => m.learner === learner._id);
          if (mark && mark.scores.length > 0) {
            const score = mark?.scores.find(
              (score) => score.score === column._id
            );
            if (score) {
              return score?.value;
            } else {
              return null;
            }
          } else {
            return null;
          }
        })
        : [];

      return {
        type: "number",
        value: [...x],
      };
    };

    const quizCols =
      quizColumns && quizColumns.length > 0
        ? quizColumns.map((quiz) => findX(quiz))
        : [];
    const labCols =
      labColumns && labColumns.length > 0
        ? labColumns.map((lab) => findX(lab))
        : [];
    const asmCols =
      asmColumns && asmColumns.length > 0
        ? asmColumns.map((asm) => findX(asm))
        : [];

    const asmHeaders =
      asmColumns && asmColumns.length > 0
        ? asmColumns.map((column) => ({
          type: "header",
          text: column.title,
          className: "font-bold justify-center ",
        }))
        : [];
    const labHeaders =
      labColumns && labColumns.length > 0
        ? labColumns.map((column) => ({
          type: "header",
          text: column.title,
          columnId: column._id,
          className: "font-bold justify-center ",
        }))
        : [];
    const quizHeaders =
      quizColumns && quizColumns.length > 0
        ? quizColumns.map((column) => ({
          type: "header",
          text: column.title,
          columnId: column._id,
          className: "font-bold justify-center ",
        }))
        : [];
    const headerRow: Row = {
      rowId: "header",
      cells: [
        ...headerRowDefault,
        ...quizHeaders,
        ...labHeaders,
        ...asmHeaders,
      ] as DefaultCellTypes[],
      height: 50,
    };
    const lns =
      learners && learners.length > 0
        ? learners.map<Row>((learner, idx) => ({
          rowId: learner._id as string,
          cells: [
            {
              type: "text",
              text: String(idx + 1),
              nonEditable: true,
              className: "justify-center ",
            },
            {
              type: "text",
              text: learner.code,
              nonEditable: true,
              className: "justify-center ",
            },
            {
              type: "text",
              text: learner.fullname as string,
              nonEditable: true,
            },
            ...quizCols.map((quizCol) => {
              return {
                modelType: "Quiz",
                type: "number",
                value: quizCol.value[idx],
                nonEditable: true,
                className: "justify-center",
              };
            }),
            ...labCols.map((labCol) => ({
              modelType: "Lab",
              type: "number",
              value: labCol.value[idx],
              className: "justify-center",
            })),
            ...asmCols.map((asmCol) => ({
              modelType: "Assignment",
              type: "number",
              value: asmCol.value[idx],
              className: "justify-center",
            })),
          ] as DefaultCellTypes[],
          height: 40,
        }))
        : [];
    return [headerRow, ...lns];
  };

  const handleColumnResize = (ci: Id, width: number) => {
    setColumns((prevColumns) => {
      const columnIndex = prevColumns.findIndex((el) => el.columnId === ci);
      const resizedColumn = prevColumns[columnIndex];
      const updatedColumn = { ...resizedColumn, width };
      prevColumns[columnIndex] = updatedColumn;
      return [...prevColumns];
    });
  };

  const applyChangesToMarks = (changes: any[], prevMarks: Marks[]): Marks[] => {
    const updatedMarks = [...prevMarks];

    changes.forEach((change) => {
      const learnerId = change.rowId as string;
      const scoreId = change.columnId as string;
      const modelType = change.newCell.modelType as string;
      const value = change.newCell.value as number;

      if (value >= 0 && value <= 10) {
        const foundMark = updatedMarks.find((mark) => mark.learner === learnerId);
        if (foundMark) {
          const foundScore = foundMark.scores.find(
            (score) => score.score === scoreId
          );
          if (!foundScore) {
            const newScore: Score = {
              modelType: modelType,
              score: scoreId,
              value: value,
            };

            const updatedScores = foundMark.scores
              ? [...foundMark.scores, newScore]
              : [newScore];

            const updatedMark: Marks = {
              ...foundMark,
              scores: updatedScores,
            };

            const updatedIndex = updatedMarks.findIndex(
              (mark) => mark.learner === learnerId
            );
            if (updatedIndex !== -1) {
              updatedMarks[updatedIndex] = updatedMark;
            }
          } else {
            const updatedScores = foundMark.scores.map((score) => {
              if (score.score === scoreId) {
                return {
                  ...score,
                  value: value,
                };
              }
              return score;
            });

            const updatedMark: Marks = {
              ...foundMark,
              scores: updatedScores,
            };

            const updatedIndex = updatedMarks.findIndex(
              (mark) => mark.learner === learnerId
            );
            if (updatedIndex !== -1) {
              updatedMarks[updatedIndex] = updatedMark;
            }
          }
        }
      } else {
        toast.warning('Vui lòng nhập điểm 0-10')
      }
    });

    return updatedMarks;
  };

  const handleChanges = (changes: CellChange[]) => {
    setMarks((pevMarks) =>
      pevMarks ? applyChangesToMarks(changes, pevMarks) : pevMarks
    );
  };

  const handleSaveChanges = async () => {
    try {
      if (marks) {
        const res = await updateMarks({
          body: marks,
          id: idClassroom,
        }).unwrap();
        if (res.statusCode == 201) {
          toast.success("Cập nhật điểm thành công");
        } else {
          toast.error("Cập nhật điểm thất bại");
        }
      }
    } catch (error) {
      toast.error("Cập nhật điểm thất bại");
    }
  };

  return (
    <Stack>
      <Box sx={{ textAlign: "center", marginBottom: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          BẢNG ĐIỂM SINH VIÊN
        </Typography>
      </Box>
      {getClassroom && (
        <Stack direction={"row"} sx={{ justifyContent: "space-between", alignItems: 'center', marginBottom: 2 }} className="mx-4">
          <Stack direction={'column'} gap={1}>
            <Typography variant="body1">
              <span className="font-semibold">Tên lớp học: </span>{getClassroom.data.title}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Mã lớp học: </span>{getClassroom.data.code}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Môn học: </span>{getClassroom.data.course.title}
            </Typography>
          </Stack>
          <Stack direction={'column'} gap={1}>
            <Typography variant="body1">
              <span className="font-semibold">Ca học: </span>{getClassroom.data.hours}
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold">Số lượng: </span>{getClassroom.data.learners.length} sinh viên
            </Typography>
            <Typography variant="body1">
              <span className="font-semibold"> Giảng viên phụ trách: </span>
              {getClassroom.data.instructor.fullname ||
                getClassroom.data.instructor.username}
            </Typography>
          </Stack>
          <Box>
            <Button variant="contained" onClick={handleSaveChanges}>
              Lưu thay đổi
            </Button>
          </Box>
        </Stack>
      )}

      <div className="mx-4 max-w-fit max-h-screen mb-10 overflow-auto border rounded-lg border-t-2 border-collapse border-dark-500 ">
        <ReactGrid
          rows={rows}
          stickyTopRows={1}
          stickyLeftColumns={3}
          columns={columns}
          onColumnResized={handleColumnResize}
          onCellsChanged={(changes) => handleChanges(changes)}
          enableRowSelection
          enableColumnSelection
          enableFillHandle
          enableRangeSelection
          disableVirtualScrolling={true}
        // onSelectionChanged={focusChanging}
        />
      </div>
    </Stack>
  );
};

export default MarkDetailPage;
