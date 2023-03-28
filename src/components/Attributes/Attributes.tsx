import React from "react";

import { Card, CardContent, CardHeader, Divider } from "@mui/material";
import {
  AttributeInputTypeEnum,
  AttributeValueDetailsFragment,
  AttributeValueFragment,
  EntryErrorWithAttributesFragment,
} from "@portal/graphql";
import { FormsetAtomicData, FormsetChange } from "@portal/hooks/useFormset";
import { FetchMoreProps } from "@portal/types";

import AttributeRow from "./AttributeRow";

export interface AttributeInputData {
  inputType: AttributeInputTypeEnum;
  isRequired: boolean;
  values: AttributeValueDetailsFragment[];
  selectedValues?: AttributeValueDetailsFragment[];
}

export interface AttributeRowHandlers {
  onChange: FormsetChange<string>;
  onMultiChange: FormsetChange<string>;
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues: FetchMoreProps;
}

export interface AttributesProps extends AttributeRowHandlers {
  attributes: AttributeInput[];
  attributeValues: AttributeValueFragment[];
  fetchAttributeValues: (query: string, attributeId: string) => void;
  fetchMoreAttributeValues: FetchMoreProps;
  onAttributeSelectBlur: () => void;
  loading: boolean;
  errors: EntryErrorWithAttributesFragment[];
  title?: React.ReactNode;
}

export type AttributeInput = FormsetAtomicData<AttributeInputData, string[]>;

const Attributes: React.FC<AttributesProps> = ({
  attributes,
  attributeValues,
  errors,
  onAttributeSelectBlur,
  ...props
}) => {
  return (
    <Card>
      <CardHeader title="Atributos" />
      <CardContent>
        <Divider />
        {attributes.map((attribute, attributeIndex) => {
          const error = errors.find((err) =>
            err.attributes?.includes(attribute.id)
          );

          return (
            <React.Fragment key={attribute.id}>
              {attributeIndex > 0 && <Divider />}
              <AttributeRow
                attribute={attribute}
                attributeValues={attributeValues}
                error={error}
                onAttributeSelectBlur={onAttributeSelectBlur}
                {...props}
              />
            </React.Fragment>
          );
        })}
      </CardContent>
    </Card>
  );
};

export default Attributes;
