import {
  AssignEntryAttributeMutation,
  EntryTypeDeleteMutation,
  UnassignEntryAttributeMutation,
  useAssignEntryAttributeMutation,
  useEntryTypeDeleteMutation,
  useUnassignEntryAttributeMutation,
} from "@portal/graphql";
import { useLinks } from "@portal/hooks";
import { getMutationProviderData } from "@portal/misc";
import { useNavigate } from "react-router-dom";

interface EntryTypeOperationsProps {
  onAssignAttribute: (data: AssignEntryAttributeMutation) => void;
  onUnassignAttribute: (data: UnassignEntryAttributeMutation) => void;
}

const useEntryTypeOperations = ({
  onAssignAttribute,
  onUnassignAttribute,
}: EntryTypeOperationsProps) => {
  const navigate = useNavigate();
  const { entryTypeList } = useLinks();

  const deleteEntryType = useEntryTypeDeleteMutation({
    onCompleted: () => navigate(entryTypeList()),
  });

  const assignAttribute = useAssignEntryAttributeMutation({
    onCompleted: onAssignAttribute,
  });
  const unassignAttribute = useUnassignEntryAttributeMutation({
    onCompleted: onUnassignAttribute,
  });

  return {
    deleteEntryType: getMutationProviderData(...deleteEntryType),
    assignAttribute: getMutationProviderData(...assignAttribute),
    unassignAttribute: getMutationProviderData(...unassignAttribute),
  };
};

export default useEntryTypeOperations;
