import { PropsWithChildren, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Card, Form, Input, Button, DatePicker, DatePickerProps, Space } from "antd";

import styles from "./styles.module.scss";
import { addTaskToList } from "entities/task/model";
import { Task } from "shared/api";
import { useNavigate } from "react-router";

export type TaskCreateCardProps = PropsWithChildren<{
  data?: import("shared/api").Task;
  titleHref?: string;
}> &
  import("antd").CardProps;

export const TaskCreateCard = ({
  data,
  titleHref,
  children,
  ...cardProps
}: TaskCreateCardProps) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState<DatePickerProps['value']>(null);
  const state = useSelector(store => store);
  const navigate = useNavigate();

  const onFinish = (field: Task) => {
    dispatch(addTaskToList({ ...field, deadline: date?.toISOString(), completed: false }));
    navigate('/');
  };
  const onFinishFailed = () => {};

  const onChange: DatePickerProps["onChange"] = (date) => {
    setDate(date);
  };

  return (
    <Card className={styles.root} title={"Create task"} {...cardProps}>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: "Please input title of task" }]}
        >
          <Input maxLength={2048} />
        </Form.Item>

        <Form.Item label="Task tag" name="task_tag">
          <Input maxLength={2048} />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea maxLength={2048} />
        </Form.Item>

        <Form.Item label="Deadline" name="deadline">
          <DatePicker
            onChange={onChange}
            value={date}
          />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Save
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};
