import dynamic from "next/dynamic";

const DynamicLineChart = dynamic(
  () => import("@ant-design/plots").then((item) => item.Line),
  {
    ssr: false,
  }
);

const ChartsPage: React.FC = () => {
  const data = [
    { x: 1, y: 10 },
    { x: 2, y: 15 },
    { x: 3, y: 7 },
    { x: 4, y: 20 },
    { x: 5, y: 12 },
  ];

  const config = {
    xAxis: { title: { text: "X Axis" } },
    yAxis: { title: { text: "Y Axis" } },
    height: 400,
    point: { size: 5, shape: "diamond" },
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Line Chart Example</h1>
      <DynamicLineChart
        {...config}
        data={data}
        xField="x"
        yField="y"
        animation={false}
      />
    </div>
  );
};

export default ChartsPage;
