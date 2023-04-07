/* eslint-disable no-useless-catch */
import React from "react";

import { ApolloClient, useApolloClient } from "@apollo/client";

import BackgroundTasksContext from "./context";
import { checkDocumentLoadStatus } from "./queries";
import { handleTask, queueDocumentLoad } from "./tasks";
import { QueuedTask, Task, TaskData, TaskStatus } from "./types";

export const backgroundTasksRefreshTime = 15 * 1000;

export function useBackgroundTasks(
  apolloClient: Pick<ApolloClient<any>, "query">
) {
  const idCounter = React.useRef(0);
  const tasks = React.useRef<QueuedTask[]>([]);

  React.useEffect(() => {
    const intervalId = setInterval(() => {
      const queue = async () => {
        try {
          await Promise.all(
            tasks.current.map(async (task) => {
              if (task.status === TaskStatus.PENDING) {
                let status: TaskStatus;
                try {
                  status = await handleTask(task);
                } catch (error) {
                  throw error;
                }
                if (status !== TaskStatus.PENDING) {
                  const taskIndex = tasks.current.findIndex(
                    (t) => t.id === task.id
                  );
                  tasks.current[taskIndex].status = status;
                }
              }
            })
          );
        } catch (error) {
          throw error;
        }
      };
      queue();
    }, backgroundTasksRefreshTime);

    return () => clearInterval(intervalId);
  });

  function cancel(id: number) {
    tasks.current = tasks.current.filter((task) => task.id !== id);
  }

  const queue = (type: Task, data?: TaskData) => {
    idCounter.current += 1;
    switch (type) {
      case Task.DOCUMENT_LOAD:
        queueDocumentLoad(idCounter.current, tasks, () =>
          apolloClient.query({
            fetchPolicy: "network-only",
            query: checkDocumentLoadStatus,
            variables: {
              id: data.loadDocument.id,
            },
          })
        );
    }
  };

  return {
    cancel,
    queue,
  };
}

const BackgroundTasksProvider: React.FC = ({ children }) => {
  const apolloClient = useApolloClient();
  const { cancel, queue } = useBackgroundTasks(apolloClient);

  return (
    <BackgroundTasksContext.Provider
      value={{
        cancel,
        queue,
      }}
    >
      {children}
    </BackgroundTasksContext.Provider>
  );
};

BackgroundTasksProvider.displayName = "BackgroundTasksProvider";
export default BackgroundTasksProvider;
