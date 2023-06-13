import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { Card, DatePicker, DatePickerProps } from "antd";

import styles from "./styles.module.scss";
import dayjs from "dayjs";
import { useDispatch } from "react-redux";
import { changeDate } from "entities/task/model";

export type TaskCardProps = PropsWithChildren<{
  data: import("shared/api").Task;
  titleHref?: string;
}> &
  import("antd").CardProps;

export const TaskCard = ({
  data,
  titleHref,
  children,
  ...cardProps
}: TaskCardProps) => {
  const dispatch = useDispatch();

  if (!data && !cardProps.loading) return null;

  const onChange: DatePickerProps["onChange"] = (date) => {
    dispatch(changeDate({ id: data?.id, deadline: date }));
  };

  return (
    <Card
      title={`Task#${cardProps.loading ? "" : data?.id}`}
      className={styles.root}
      {...cardProps}
    >
      <div>Title: {titleHref ? <Link to={titleHref}>{data?.title}</Link> : data?.title}</div>
      <div>Task tags: {data?.task_tag}</div>
      <div>Description: {data?.description}</div>
      <div>Deadline: <DatePicker
          onChange={onChange}
          value={dayjs(data?.deadline)}
        />
      </div>

      {children}
    </Card>
  );
};
