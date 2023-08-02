import api from "@/services/api";
import { Measure } from "@/types/Measure";
import { format } from "date-fns";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const DynamicLineChart = dynamic(
  () => import("@ant-design/plots").then((item) => item.Line),
  {
    ssr: false,
  }
);

const ChartsPage: React.FC = () => {
  const [measures, setMeasures] = useState<Measure[]>([]);

  useEffect(() => {
    async function getMeasures() {
      try {
        const data = await api.getMeasuresById("2");
        if (data) setMeasures(data);
      } catch (error) {
        console.error(error);
      }
    }
    getMeasures();
  }, []);

  const sortedMeasures = [...measures].sort(
    (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime()
  );

  // Calculate the date two months ago from today
  const currentDate = new Date();
  const twoMonthsAgo = new Date();
  twoMonthsAgo.setMonth(currentDate.getMonth() - 2);

  // Filter measures to include only the past two months
  const pastTwoMonthsMeasures = sortedMeasures.filter(
    (measure) => new Date(measure.date) >= twoMonthsAgo
  );

  const chartData = pastTwoMonthsMeasures.map((measure) => ({
    x: new Date(measure.date).toISOString().slice(0, 10), // Extract and format date
    y: measure.value,
    Exercício: measure.exercise ? "Sim" : "Não",
    Jejum: measure.fasting ? "Sim" : "Não",
    Estresse: measure.stress ? "Sim" : "Não",
    Medicamentos: measure.medication ? "Sim" : "Não",
    Horário: measure?.date && format(new Date(measure?.date), "HH:mm"),
    Valor: `${measure.value} mg/dL`,
  }));

  const config = {
    data: chartData,
    xField: "date",
    yField: "value",
    xAxis: {
      type: "time", // Set X axis type to time
    },
    height: 400,
    point: { size: 5, shape: "diamond" },
    tooltip: {
      fields: [
        "Valor",
        "Horário",
        "Exercício",
        "Jejum",
        "Estresse",
        "Medicamentos",
      ],
      // customContent: (title: any, items: any[]) => {
      //   const dataItem = items[0]; // Assuming only one data item for simplicity
      //   const measure = dataItem?.data;

      //   return `
      //     <div style="background-color: rgba(0, 0, 0, 0.8); color: white; padding: 10px; border-radius: 5px;">
      //       <p style="font-size: 16px; font-weight: bold; margin-bottom: 5px;">
      //         Data: ${
      //           measure?.date &&
      //           format(new Date(measure?.date), "dd/MM/yy | HH:mm")
      //         }
      //       </p>
      //       <p style="margin: 3px 0;">Valor: ${measure?.y}</p>
      //       <p style="margin: 3px 0;">Jejum: ${
      //         measure?.fasting ? "Sim" : "Não"
      //       }</p>
      //       <p style="margin: 3px 0;">Exercício: ${
      //         measure?.exercise ? "Sim" : "Não"
      //       }</p>
      //       <p style="margin: 3px 0;">Estresse: ${
      //         measure?.stress ? "Sim" : "Não"
      //       }</p>
      //       <p style="margin: 3px 0;">Medicamento: ${
      //         measure?.medication ? "Sim" : "Não"
      //       }</p>
      //     </div>
      //   `;
      // },
    },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Line Chart Example</h1>
      <DynamicLineChart
        {...config}
        data={chartData}
        xField="x"
        yField="y"
        animation={false}
      />
    </div>
  );
};

export default ChartsPage;
