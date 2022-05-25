import { ErrorFragment, SearchCategoriesQuery } from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { Button, Checkbox, Input, Select, Space } from "@portal/UI";
import { getFormErrors } from "@portal/utils/errors";
import React, { useState } from "react";

export type FormProps = {
  name: string;
  slug: string;
  documentNumber: string;
  category: "";
  isPublished: boolean;
};

interface VehicleFormProps {
  initialData?: FormProps;
  onSubmit: (data: FormProps) => Promise<void>;
  categories: RelayToFlat<SearchCategoriesQuery["search"]>;
  errors: ErrorFragment[];
}

export const VehicleForm = ({
  onSubmit,
  categories,
  errors,
  initialData = {
    name: "",
    slug: "",
    documentNumber: "",
    category: "",
    isPublished: false,
  },
}: VehicleFormProps) => {
  const [data, setData] = useState<FormProps>(initialData);

  const formErrors = getFormErrors(
    ["name", "slug", "documentNumber", "category", "isPublished"],
    errors
  );

  console.log(data);

  const handleChange = (e: React.ChangeEvent<any>) => {
    setData({
      ...data,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(data);
  };

  return (
    <div>
      <div className="mb-4">
        <Input
          type="text"
          name="name"
          label="Nome"
          value={data.name}
          error={formErrors.name}
          onChange={handleChange}
        />
        <Space />
        <Input
          type="text"
          name="slug"
          label="Atalho"
          value={data.slug}
          error={formErrors.slug}
          onChange={handleChange}
        />
        <Space />
        <Input
          type="text"
          name="documentNumber"
          label="CNPJ"
          value={data.documentNumber}
          error={formErrors.documentNumber}
          onChange={handleChange}
        />
        <Space />
        <Select
          name="category"
          label="Categoria"
          value={data.category}
          error={formErrors.category}
          options={categories}
          onChange={handleChange}
        />
        <Space />
        <Checkbox
          name="isPublished"
          label="Publicado"
          value={data.isPublished}
          error={formErrors.isPublished}
          onChange={handleChange}
        />
      </div>

      <Button onClick={handleSubmit}>Enviar</Button>
    </div>
  );
};

export default VehicleForm;
