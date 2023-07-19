import api from "@/services/api";
import { Measure } from "@/types/Measure";
import {
  Form,
  InputNumber,
  Select,
  DatePicker,
  TimePicker,
  Button,
  message,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import form from "antd/es/form";
import { Store } from "antd/es/form/interface";
import moment from "moment";
import { useState } from "react";
import dayjs from "dayjs";

interface MeasureFormProps {
  handleFinish: any;
  form: any;
}

const MeasureForm = ({ form, handleFinish }: MeasureFormProps) => {
  const [timePickerStatus, setTimePickerStatus] = useState<boolean>(false);
  const disabledDate: RangePickerProps["disabledDate"] = (current) => {
    return current && current > dayjs().endOf("day");
  };
  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={handleFinish}
      scrollToFirstError={true}
    >
      <Form.Item
        label="Valor da glicemia (mg/dL)"
        required
        name="value"
        rules={[
          {
            required: true,
            message: "Por favor, insira o valor da glicemia.",
          },
        ]}
      >
        <InputNumber placeholder="Valor da glicemia" max={400} min={0} />
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
            <span className="text-red-500">Não</span>
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
            <span className="text-red-500">Não</span>
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
            <span className="text-red-500">Não</span>
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
            <span className="text-red-500">Não</span>
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
        <DatePicker
          format="DD/MM/YY"
          showToday={true}
          inputReadOnly={true}
          placeholder="Selecione uma data"
          disabledDate={disabledDate}
        />
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
          onClick={() => setTimePickerStatus(true)}
          onBlur={() => setTimePickerStatus(false)}
          open={timePickerStatus}
          onSelect={onTimePickerSelect}
          placeholder="Selecione um horário"
          showNow={false}
        />
      </Form.Item>
      <Button htmlType="submit" type="primary" className="bg-blue-500">
        <span>Salvar</span>
      </Button>
    </Form>
  );

  function onTimePickerSelect(value: any) {
    form.setFieldsValue({
      time_picker: value,
    });
  }
};

export default MeasureForm;
