import MeasureForm from "@/components/MeasureForm";
import MeasureTable from "@/components/MeasureTable";

import api from "@/services/api";
import { Measure } from "@/types/Measure";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Modal,
  Select,
  TimePicker,
  message,
} from "antd";
import { Store } from "antd/es/form/interface";
import { Inter } from "next/font/google";
import { useEffect, useState } from "react";

export default function Home() {
  const [visible, setVisible] = useState<boolean>(false);
  const [measures, setMeasures] = useState<Measure[]>([]);
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    getMeasures();
  }, []);

  return (
    <main className="flex min-h-screen px-4 py-8 md:px-12 md:py-8">
      <Modal
        title="Inserir medida manual"
        open={visible}
        onCancel={() => setVisible(false)}
        footer={null}
      >
        <MeasureForm
          form={form}
          handleFinish={handleFinish}
          isLoading={isLoading}
        />
      </Modal>
      <div className="flex flex-col items-center w-full">
        <h1 className="text-xl mb-4">Medidas</h1>
        <MeasureTable measures={measures} />
      </div>

      <div className="fixed bottom-12 right-12">
        <button
          className="w-12 h-12 bg-blue-500 text-white rounded-full flex items-center justify-center shadow-md hover:bg-blue-600"
          onClick={() => setVisible(true)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M12 4v16m8-8H4"></path>
          </svg>
        </button>
      </div>
    </main>
  );

  async function handleFinish(values: Store) {
    setIsLoading(true);
    const date_time = formatMomentToDate(values);

    const measureData: Partial<Measure> = {
      value: values.value,
      exercise: values.exercising,
      fasting: values.fasting,
      medication: values.medication,
      stress: values.stress,
      date: date_time,
      user: 2,
    };

    const results = await api.createMeasure(measureData);
    if (results) {
      setVisible(false);
      message.success("Medida salva com sucesso.");
      getMeasures();
      setIsLoading(false);
    } else {
      message.error(
        "Houve um problema para salvar a medida, tente novamente mais tarde"
      );
    }
  }

  async function getMeasures() {
    try {
      const data = await api.getMeasuresById("2");
      if (data) setMeasures(data);
    } catch (error) {
      console.error(error);
    }
  }

  function formatMomentToDate(values: Store) {
    const date = values.date_picker.format().slice(0, 10);
    const time = values.time_picker.format().slice(10);
    return new Date(`${date}${time}`);
  }
}
