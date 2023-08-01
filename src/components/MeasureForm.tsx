import {
  Button,
  DatePicker,
  Form,
  InputNumber,
  Select,
  TimePicker,
} from "antd";
import { RangePickerProps } from "antd/es/date-picker";
import dayjs from "dayjs";
import { useState } from "react";

interface MeasureFormProps {
  handleFinish: any;
  form: any;
  isLoading: boolean;
}

const MeasureForm = ({ form, handleFinish, isLoading }: MeasureFormProps) => {
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
      <div className="flex space-x-3">
        <Button
          htmlType="submit"
          type="primary"
          className="bg-blue-500"
          loading={isLoading}
        >
          <span>Salvar</span>
        </Button>
        {isLoading && (
          <span className="text-xs text-gray-800">
            Estamos calculando a tendência da sua glicemia, isso pode demorar
            até 1 minuto!
          </span>
        )}
      </div>
    </Form>
  );

  function onTimePickerSelect(value: any) {
    form.setFieldsValue({
      time_picker: value,
    });
  }
};

export default MeasureForm;
