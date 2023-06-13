import { Routes, Route } from "react-router";
import { lazy } from "react";

import { CREATE_PAGE_PATH } from "shared/consts";

const TasksListPage = lazy(() => import("./tasks-list"));
const TasksDetailsPage = lazy(() => import("./task-details"));
const TaskCreate = lazy(() => import("./task-create"));

export const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<TasksListPage />} />
      <Route path="/:taskId" element={<TasksDetailsPage />} />
      <Route path={CREATE_PAGE_PATH} element={<TaskCreate />} />
    </Routes>
  );
};

export { AddTaskButton } from '../features/add-task-button';