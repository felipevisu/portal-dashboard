import i18next from "i18next";
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
    const data = await task.handle();
    status = data.status;
    if (status !== TaskStatus.PENDING) {
      task.onCompleted({
        status,
        name: data.name,
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
  const { t } = i18next;
  tasks.current = [
    ...tasks.current,
    {
      handle: async () => {
        const result = await fetch();
        const status = result.data.documentLoad.status;
        return {
          status: getTaskStatus(status),
          name: result.data.documentLoad.document.name,
        };
      },
      id,
      onCompleted: (data) => {
        data.status === TaskStatus.SUCCESS
          ? toast(t("tasks.documentLoad.success", { name: data.name }), {
              type: toast.TYPE.SUCCESS,
            })
          : toast(t("tasks.documentLoad.error", { name: data.name }), {
              type: toast.TYPE.ERROR,
            });
      },
      onError: handleError,
      status: TaskStatus.PENDING,
    },
  ];
}
