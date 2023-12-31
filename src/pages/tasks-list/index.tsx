import { Col, Empty, Layout, Row, Typography } from "antd";

import { TasksFilters } from "features/task-filters";
import { ToggleTask } from "features/toggle-task";

import { taskModel, TaskRow } from "entities/task";

import { Task } from "shared/api";

import styles from "./styles.module.scss";

const TasksList = () => {
  return (
    <Layout className={styles.root}>
      <Layout className={styles.toolbar}>
        <Row justify="center">
          <Typography.Title level={1}>Tasks list</Typography.Title>
        </Row>
        <Row justify="center">
          <TasksFilters />
        </Row>
      </Layout>
      <Layout.Content className={styles.content}>
        <Row gutter={[0, 20]} justify="center">
          {PageContent()}
        </Row>
      </Layout.Content>
    </Layout>
  );
};

function PageContent() {
  const isEmpty = taskModel.isTasksEmpty();
  const filteredTasks = taskModel.getFilteredTasks();

  if (isEmpty) return <Empty description="No tasks found" />;

  return (filteredTasks as Task[]).map((task) => (
    <Col key={task.id} span={24}>
      <TaskRow
        data={task}
        titleHref={`/${task.id}`}
        before={<ToggleTask taskId={task.id} withStatus={false} />}
      />
    </Col>
  ));
}

export default TasksList;
