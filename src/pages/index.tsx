import api from "@/services/api";
import { Measure } from "@/types/Measure";
import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  TimePicker,
  message,
} from "antd";
import { Store } from "antd/es/form/interface";
import { Inter } from "next/font/google";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [form] = Form.useForm();
  const [timePickerStatus, setTimePickerStatus] = useState<boolean>(false);
  function onTimePickerSelect(value: any) {
    form.setFieldsValue({
      time_picker: value,
    });
  }
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-between p-24 ${inter.className}`}
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        scrollToFirstError={true}
      >
        <Form.Item
          label="Valor da glicemia"
          required
          name="value"
          rules={[
            {
              required: true,
              message: "Por favor, insira o valor da glicemia.",
            },
          ]}
        >
          <InputNumber placeholder="Valor da glicemia" />
        </Form.Item>
        <Form.Item
          label="Está de jejum?"
          required
          name="fasting"
          rules={[
            {
              required: true,
              message: "Por favor, insira se está de jejum ou não",
            },
          ]}
        >
          <Select>
            <Select.Option value={true} key="true">
              <span>Sim</span>
            </Select.Option>
            <Select.Option value={false} key="false">
              <span>Não</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Está praticando exercícios físicos?"
          required
          name="exercising"
          rules={[
            {
              required: true,
              message:
                "Por favor, insira se está praticando exercícios físicos ou não",
            },
          ]}
        >
          <Select>
            <Select.Option value={true} key="true">
              <span>Sim</span>
            </Select.Option>
            <Select.Option value={false} key="false">
              <span>Não</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Passou por estresse mental ou físico?"
          required
          name="stress"
          rules={[
            {
              required: true,
              message:
                "Por favor, insira se passou por estresse mental ou físico ou não",
            },
          ]}
        >
          <Select>
            <Select.Option value={true} key="true">
              <span>Sim</span>
            </Select.Option>
            <Select.Option value={false} key="false">
              <span>Não</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Está utilizando medicação corretamente?"
          required
          name="medication"
          rules={[
            {
              required: true,
              message:
                "Por favor, insira se está utilizando medicação corretamente ou não",
            },
          ]}
        >
          <Select>
            <Select.Option value={true} key="true">
              <span>Sim</span>
            </Select.Option>
            <Select.Option value={false} key="false">
              <span>Não</span>
            </Select.Option>
          </Select>
        </Form.Item>
        <Form.Item
          label="Data da medida"
          name="date_picker"
          rules={[
            { required: true, message: "Por favor, insira a data da medida." },
          ]}
        >
          <DatePicker format="DD/MM/YY" showToday={true} inputReadOnly={true} />
        </Form.Item>
        <Form.Item
          label="Horário da medida"
          required
          name="time_picker"
          rules={[
            {
              required: true,
              message: "Por favor, insira o horário estimado da medida",
            },
          ]}
        >
          <TimePicker
            format="HH:mm"
            minuteStep={10}
            showMinute={true}
            inputReadOnly={true}
            open={timePickerStatus}
            onClick={() => setTimePickerStatus(true)}
            onBlur={() => setTimePickerStatus(false)}
            onSelect={onTimePickerSelect}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          <span>Salvar</span>
        </Button>
      </Form>
    </main>
  );

  async function handleFinish(values: Store) {
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
      message.success("Visita salva com sucesso.");
    } else {
      message.error(
        "Houve um problema para salvar a medida, tente novamente mais tarde"
      );
    }
  }

  function formatMomentToDate(values: Store) {
    const date = values.date_picker.format().slice(0, 10);
    const time = values.time_picker.format().slice(10);
    return new Date(`${date}${time}`);
  }
}
