import { useContext } from "react";

import BackgroundTasksContext from "@portal/containers/BackgroundTasks/context";

function useBackgroundTask() {
  return useContext(BackgroundTasksContext);
}

export default useBackgroundTask;
