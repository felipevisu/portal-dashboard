import { toast } from "react-toastify";

import { ApolloQueryResult } from "@apollo/client";
import {
  CheckDocumentLoadStatusQuery,
  DocumentLoadStatusEnum,
} from "@portal/graphql";

import { QueuedTask, TaskStatus } from "./types";

function getTaskStatus(status: DocumentLoadStatusEnum): TaskStatus {
  switch (status) {
    case DocumentLoadStatusEnum.SUCCESS:
      return TaskStatus.SUCCESS;
    case DocumentLoadStatusEnum.PENDING:
      return TaskStatus.PENDING;
    default:
      return TaskStatus.FAILURE;
  }
}

export async function handleTask(task: QueuedTask): Promise<TaskStatus> {
  let status = TaskStatus.PENDING;
  try {
    status = await task.handle();
    if (status !== TaskStatus.PENDING) {
      task.onCompleted({
        status,
      });
    }
  } catch (error) {
    if (error instanceof Error) {
      task.onError(error);
    } else {
      console.error("Unknown error", error);
    }
  }

  return status;
}

export function handleError(error: Error) {
  throw error;
}

export function queueDocumentLoad(
  id: number,
  tasks: React.MutableRefObject<QueuedTask[]>,
  fetch: () => Promise<ApolloQueryResult<CheckDocumentLoadStatusQuery>>
) {
  tasks.current = [
    ...tasks.current,
    {
      handle: async () => {
        const result = await fetch();
        const status = result.data.documentLoad.status;
        return getTaskStatus(status);
      },
      id,
      onCompleted: (data) => {
        data.status === TaskStatus.SUCCESS
          ? toast("success", { type: toast.TYPE.SUCCESS })
          : toast("error", { type: toast.TYPE.ERROR });
      },
      onError: handleError,
      status: TaskStatus.PENDING,
    },
  ];
}
