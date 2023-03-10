import {
  useApproveDocumentFileMutation,
  useDocumentFileDeleteMutation,
  useRefuseDocumentFileMutation,
  useRestoreDocumentFileMutation,
} from "@portal/graphql";

interface useDocumentActionsProps {
  callback?: () => void;
}

export const useDocumentActions = ({ callback }: useDocumentActionsProps) => {
  const [deleteDocumentFile] = useDocumentFileDeleteMutation();
  const [restoreDocumentFile] = useRestoreDocumentFileMutation();
  const [approveDocumentFile] = useApproveDocumentFileMutation();
  const [refuseDocumentFile] = useRefuseDocumentFileMutation();

  const actionMap = {
    APPROVE: approveDocumentFile,
    REFUSE: refuseDocumentFile,
    DELETE: deleteDocumentFile,
    RESTORE: restoreDocumentFile,
  };

  const handleAction = async (id: string, actionName: string) => {
    const action = actionMap[actionName];
    await action({ variables: { id } });
    if (callback) callback();
  };

  return { handleAction };
};
