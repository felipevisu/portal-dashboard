import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

import {
  AttributeCreateInput,
  AttributeCreateMutation,
  AttributeValueCreateInput,
  useAttributeCreateMutation,
} from "@portal/graphql";
import { useLinks, useModal } from "@portal/hooks";

import AttributeCreatePage from "../components/AttributeCreatePage";
import ValueCreateDialog from "../components/ValueCreateDialog";
import ValueDeleteDialog from "../components/ValueDeleteDialog";

export const AttributeCreate = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { attributeDetails } = useLinks();
  const [values, setValues] = useState<AttributeValueCreateInput[]>([]);

  const handleCreateAttribute = (data: AttributeCreateMutation) => {
    if (!data?.attributeCreate.errors.length) {
      toast(t("messages.create.success"), { type: toast.TYPE.SUCCESS });
      navigate(attributeDetails(data?.attributeCreate.attribute.id));
    }
  };

  const [createAttribute, createAttributeResult] = useAttributeCreateMutation({
    onCompleted: handleCreateAttribute,
  });

  const handleSubmit = async (data: AttributeCreateInput) => {
    await createAttribute({
      variables: { input: { ...data, values } },
    });
  };

  const createValueModal = useModal();
  const deleteValueModal = useModal();

  const handleValueCreate = (value: AttributeValueCreateInput) => {
    setValues([...values, value]);
    createValueModal.closeModal();
  };

  const handleValueDelete = () => {
    const index = searchParams.get("id");
    if (index) {
      setValues([
        ...values.slice(0, parseInt(index)),
        ...values.slice(parseInt(index) + 1),
      ]);
    }
    setSearchParams({});
    deleteValueModal.closeModal();
  };

  return (
    <>
      <AttributeCreatePage
        onSubmit={handleSubmit}
        errors={createAttributeResult.data?.attributeCreate.errors || []}
        loading={createAttributeResult.loading}
        values={values.map((value, index) => {
          return {
            ...value,
            id: index.toString(),
            __typename: "AttributeValue",
          };
        })}
        onCreateValue={createValueModal.openModal}
        onDeleteValue={deleteValueModal.openModal}
      />
      <ValueCreateDialog
        isOpen={createValueModal.isOpen}
        onClose={createValueModal.closeModal}
        onConfirm={handleValueCreate}
      />
      <ValueDeleteDialog
        isOpen={deleteValueModal.isOpen}
        onClose={deleteValueModal.closeModal}
        onConfirm={handleValueDelete}
      />
    </>
  );
};

export default AttributeCreate;
