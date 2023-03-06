import {
  ConfigurationItemFragment,
  ConfigurationTypeFieldEnum,
} from "@portal/graphql";

export function isSecretField(
  config: ConfigurationItemFragment[],
  field: string
) {
  return [
    ConfigurationTypeFieldEnum.PASSWORD,
    ConfigurationTypeFieldEnum.SECRET,
    ConfigurationTypeFieldEnum.SECRETMULTILINE,
  ].includes(config.find((configField) => configField.name === field).type);
}
