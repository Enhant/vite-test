import { Button, Layout, Result } from "antd";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

import { ToggleTask } from "features/toggle-task";
import { TaskCreateCard } from "entities/task";

import styles from "./styles.module.scss";

const TaskCreate = () => {

  return (
    <Layout className={styles.root}>
      <Layout.Content className={styles.content}>
        <TaskCreateCard
          size="default"
          className={styles.card}
          bodyStyle={{ height: 400 }}
          extra={<Link to="/">Back to tasks list</Link>}
          data={{
            id: '-1',
            title: "",
            userId: -1,
            completed: false,
          }}
        />
      </Layout.Content>
    </Layout>
  );
};

export default TaskCreate;
