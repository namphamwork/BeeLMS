import { useEffect, useState } from "react";
import {
  useGetMarkByIdClassQuery,
  useGetTableForMarkQuery,
} from "../../../service/api";
import { Assignment } from "../../../types/Assignment";
import { Classroom } from "../../../types/Classroom";
import { Lab } from "../../../types/Lab";
import { Quiz } from "../../../types/Lesson";
import { MarkTableItem } from "../MarkPage";
import moment from "moment";
import { Stack } from "@mui/material";
import MUIDataTable from "mui-datatables";
import { columns, options } from "./configTable";
import { FooterMarkCustom } from "./FooterMark";

interface MarkItemProps {
  item: Classroom;
  userId: string;
}

export const MarkItem: React.FC<MarkItemProps> = ({ item }) => {
  const { data: getMarks } = useGetMarkByIdClassQuery(item._id);
  const { data: getTableMark } = useGetTableForMarkQuery(item._id);
  const [table, setTable] = useState<MarkTableItem>();
  const [averageScore, setAverageScore] = useState<number>(0);
  const [result, setResult] = useState<string>("Chưa xác định");
  useEffect(() => {
    if (getMarks && getTableMark) {
      setTable({
        ...getTableMark.data,
        mark: getMarks.data[0],
        course: item.course.title,
        classroom: item.title,
      });
    }
  }, [getMarks, getTableMark, item]);

  useEffect(() => {
    if (table) {
      const average = calculateAverage(table);
      console.log({ average });

      setAverageScore(average);
    }
  }, [table]);

  useEffect(() => {
    console.log(averageScore);

  }, [averageScore])


  const scoresValue =
    table && table.mark && table.mark?.scores ? table.mark?.scores : [];

  const quizsValue = table && table.quizs ? table.quizs : [];
  const labsValue = table && table.labs ? table.labs : [];
  const asmsValue = table && table.assignments ? table.assignments : [];

  const data = [...quizsValue, ...labsValue, ...asmsValue];

  const calculateAverage = (table: MarkTableItem) => {
    let totalWeight = 0;
    let totalScore = 0;

    table &&
      table.quizs &&
      table.quizs.forEach((quiz: Quiz) => {
        const score = scoresValue.find((score) => score.score === quiz._id);
        if (score) {
          totalWeight += quiz.weight;
          totalScore += (score.value || 0) * quiz.weight;
        }
      });

    table &&
      table.labs &&
      table.labs.forEach((lab: Lab) => {
        const score = scoresValue.find((score) => score.score === lab._id);
        if (score) {
          totalWeight += lab.weight;
          totalScore += (score.value || 0) * lab.weight;
        }
      });

    table &&
      table.assignments &&
      table.assignments.forEach((assignment: Assignment) => {
        const score = scoresValue.find(
          (score) => score.score === assignment._id
        );
        if (score) {
          totalWeight += assignment.weight;
          totalScore += (score.value || 0) * assignment.weight;
        }
      });

    if (totalWeight === 0) return 0;
    return parseFloat((totalScore / totalWeight).toFixed(2));
  };
  const headerCard = () => {
    return (
      table && (
        <h1 className="mx-4 my-2 text-brown-900 font-bold">
          {table.course} - {table.classroom}
        </h1>
      )
    );
  };
  useEffect(() => {
    const currentDate = moment(new Date());
    const endDate = moment(item.dateEnd);

    if (currentDate.isBefore(endDate)) {
      setResult("Chưa xác định");
    } else {
      if (averageScore >= 9) {
        setResult("Xuất sắc");

      } else if (averageScore >= 8) {
        setResult("Giỏi");

      } else if (averageScore >= 6.5) {
        setResult("Khá");
      } else if (averageScore >= 5) {
        setResult("Trung bình");
      } else {
        setResult("Yếu");
      }
    }
  }, [table,averageScore]);

  return (
    table && (
      // <Card>
      <Stack direction={"column"} sx={{ marginBottom: 5 }}>
        <MUIDataTable
          title={table && headerCard()}
          data={data}
          columns={columns(scoresValue)}
          options={{
            ...options,
            customFooter: () => (
              <FooterMarkCustom averageScore={averageScore} result={result} />
            ),
          }}
        />
      </Stack>
    )
  );
};
