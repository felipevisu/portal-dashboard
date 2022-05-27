import { ErrorFragment, SearchCategoriesQuery } from "@portal/graphql";
import { RelayToFlat } from "@portal/types";
import { TextField } from "@material-ui/core";
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
        <TextField
          type="text"
          name="name"
          label="Nome"
          value={data.name}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="slug"
          label="Atalho"
          value={data.slug}
          onChange={handleChange}
        />
        <TextField
          type="text"
          name="documentNumber"
          label="CNPJ"
          value={data.documentNumber}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Enviar</button>
    </div>
  );
};

export default VehicleForm;
