export type Task = {
  id: string;
  title: string;
  task_tag: string;
  description: string;
  deadline?: string;
  userId: number;
  completed: boolean;
};
