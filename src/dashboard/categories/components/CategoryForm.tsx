import { ErrorFragment } from "@portal/graphql";
import { Button, Input, Space } from "@portal/UI";
import { getFormErrors } from "@portal/utils/errors";
import React, { useState } from "react";

export type FormProps = {
  name: string;
  slug: string;
};

interface CategoryFormProps {
  initialData?: FormProps;
  onSubmit: (data: FormProps) => Promise<void>;
  errors: ErrorFragment[];
}

export const CategoryForm = ({
  onSubmit,
  errors,
  initialData = { name: "", slug: "" },
}: CategoryFormProps) => {
  const [data, setData] = useState<{ name: string; slug: string }>(initialData);

  const formErrors = getFormErrors(["name", "slug"], errors);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
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
      </div>

      <Button onClick={handleSubmit}>Enviar</Button>
    </div>
  );
};

export default CategoryForm;
