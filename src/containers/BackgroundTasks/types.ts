export enum Task {
  DOCUMENT_LOAD,
}

export enum TaskStatus {
  FAILURE,
  PENDING,
  SUCCESS,
}

export interface DocumentLoadParams {
  id: string;
}

export interface OnCompletedTaskData {
  status: TaskStatus;
  name?: string;
}

export interface TaskHandle {
  status: TaskStatus;
  name?: string;
}

export type OnCompletedTaskFn = (data: OnCompletedTaskData) => void;

export interface QueuedTask {
  id: number;
  handle: () => Promise<TaskHandle>;
  status: TaskStatus;
  onCompleted: OnCompletedTaskFn;
  onError: (error: Error) => void;
}

export interface TaskData {
  loadDocument?: DocumentLoadParams;
  id?: string;
  handle?: () => Promise<TaskHandle>;
  onCompleted?: OnCompletedTaskFn;
  onError?: () => void;
}

export interface BackgroundTasksContextType {
  cancel: (id: number) => void;
  queue: (type: Task, data?: TaskData) => void;
}
