import api from "@/services/api";
import { Measure, TrendType, TrendTypeLabels } from "@/types/Measure";
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

  const chartData = sortedMeasures.map((measure) => ({
    x: new Date(measure.date).toISOString().slice(0, 10),
    y: measure.value,
    Exercício: measure.exercise ? "Sim" : "Não",
    Jejum: measure.fasting ? "Sim" : "Não",
    Estresse: measure.stress ? "Sim" : "Não",
    Medicamentos: measure.medication ? "Sim" : "Não",
    Horário: measure?.date && format(new Date(measure?.date), "HH:mm"),
    Valor: `${measure.value} mg/dL`,
    Tendência: measure?.trend && TrendTypeLabels[measure.trend],
  }));

  const config = {
    data: chartData,
    xField: "date",
    yField: "value",
    xAxis: {
      text: "Data",
      type: "time",
    },
    height: 400,
    point: { size: 5, shape: "diamond" },
    slider: {
      start: 0.5,
      end: 1,
    },
    tooltip: {
      fields: [
        "Valor",
        "Horário",
        "Exercício",
        "Jejum",
        "Estresse",
        "Medicamentos",
        "Tendência",
      ],
    },
  };

  return (
    <main className="flex flex-col items-center min-h-screen px-4 py-8 md:px-12 md:py-8">
      <h1 className="text-xl">Gráfico de medidas</h1>
      <div className="w-full mt-8 px-12">
        <DynamicLineChart {...config} data={chartData} xField="x" yField="y" />
      </div>
    </main>
  );
};

export default ChartsPage;
