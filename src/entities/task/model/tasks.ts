import {
  createSelector,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { useIsFetching } from "react-query";
import { schema, normalize } from "normalizr";
import uniqid from "uniqid";
import { Task } from "shared/api";

export type QueryConfig = {
  completed?: boolean;
  userId?: number;
};

type NormalizedTasks = Record<string, Task>;

export const taskSchema = new schema.Entity<Task>("tasks");
export const normalizeTask = (data: Task) =>
  normalize<Task, { tasks: NormalizedTasks }>(data, taskSchema);
export const normalizeTasks = (data: Task[]) =>
  normalize<Task, { tasks: NormalizedTasks }>(data, [taskSchema]);

export const initialState: {
  data: NormalizedTasks;
  queryConfig?: QueryConfig;
} = {
  data: {},
  queryConfig: {},
};

export const taskModel = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTaskToList: (state, { payload: task }: PayloadAction<Omit<Task, "id">>) => {
      const id = uniqid();
      state.data[id] = { ...task, id };
    },
    toggleTask: ({ data }, { payload: taskId }: PayloadAction<string>) => {
      data[taskId].completed = !data[taskId].completed;
    },
    setQueryConfig: (state, { payload }: PayloadAction<QueryConfig>) => {
      state.queryConfig = payload;
    },
    changeDate: (
      state,
      { payload: { id, deadline } }: PayloadAction<Pick<Task, "id" | "deadline">>
    ) => {
      state.data[id].deadline = deadline;
    },
  },
});

export const { setQueryConfig, toggleTask, addTaskToList, changeDate } = taskModel.actions;

const TASK_LIST_QUERY_KEY = "tasks";

export const getFilteredTasks = () =>
  useSelector(
    createSelector(
      (state: RootState) => state.tasks.queryConfig,
      (state: RootState) => state.tasks.data,
      (
        queryConfig: RootState["tasks"]["queryConfig"],
        tasks: RootState["tasks"]["data"]
      ) => {
        return Object.values<Task>(tasks).filter(
          (task) => queryConfig?.completed === undefined ||
            task?.completed === queryConfig.completed
        );
      }
    )
  );

export const useTask = (taskId: string) =>
  useSelector(
    createSelector(
      (state: RootState) => state.tasks.data,
      (tasks) => tasks[taskId]
    )
  );

export const isTaskListLoading = (): boolean =>
  useIsFetching([TASK_LIST_QUERY_KEY]) > 0;

export const isTasksEmpty = (): boolean =>
  useSelector(
    createSelector(
      (state: RootState) => state.tasks.data,
      (tasks) => Object.keys(tasks).length === 0
    )
  );

export const reducer = taskModel.reducer;
