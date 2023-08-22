import { Measure, TrendTypeLabels } from "@/types/Measure";
import { Table } from "antd";
import { ColumnProps } from "antd/es/table/Column";
import { format } from "date-fns";
import { useState, useEffect } from "react";

interface MeasureTableProps {
  measures: Measure[];
}
const MeasureTable = ({ measures }: MeasureTableProps) => {
  const [screenWidth, setScreenWidth] = useState<number | undefined>(undefined);

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    if (typeof window !== "undefined") {
      setScreenWidth(window.innerWidth);
      window.addEventListener("resize", handleResize);
    }

    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", handleResize);
      }
    };
  }, []);

  const sortedMeasures = [...measures].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
  const columns: ColumnProps<Measure>[] = [
    {
      title: "Data",
      align: "center",
      key: "date",
      render: (measure: Measure) => (
        <span>{format(new Date(measure.date), "dd/MM/yy | HH:mm")}</span>
      ),
    },
    {
      title: "Valor (mg/dL)",
      align: "center",
      key: "value",
      render: (measure: Measure) => <span>{measure.value}</span>,
    },
    {
      title: "Jejum",
      align: "center",
      key: "fasting",
      render: (measure: Measure) => (
        <span>{getBooleanLabel(measure.fasting)}</span>
      ),
    },
    {
      title: "Exercício físico",
      align: "center",
      key: "exercise",
      render: (measure: Measure) => (
        <span>{getBooleanLabel(measure.exercise)}</span>
      ),
    },
    {
      title: "Estresse",
      align: "center",
      key: "stress",
      render: (measure: Measure) => (
        <span>{getBooleanLabel(measure.stress)}</span>
      ),
    },
    {
      title: "Medicação",
      align: "center",
      key: "medication",
      render: (measure: Measure) => (
        <span>{getBooleanLabel(measure.medication)}</span>
      ),
    },
    {
      title: "Tendência",
      align: "center",
      key: "trend",
      render: (measure: Measure) => (
        <span>{TrendTypeLabels[measure.trend!]}</span>
      ),
    },
  ];

  const columnsMobile: ColumnProps<Measure>[] = [
    {
      title: "Data",
      align: "center",
      key: "date",
      render: (measure: Measure) => (
        <span>{format(new Date(measure.date), "dd/MM/yy | HH:mm")}</span>
      ),
    },
    {
      title: "Valor (mg/L)",
      align: "center",
      key: "value",
      render: (measure: Measure) => <span>{measure.value}</span>,
    },
  ];

  return (
    <Table
      columns={screenWidth && screenWidth < 640 ? columnsMobile : columns}
      dataSource={sortedMeasures}
      className="w-[90vw]"
      key="table"
    />
  );

  function getBooleanLabel(value: boolean) {
    return value ? "Sim" : "Não";
  }
};

export default MeasureTable;
