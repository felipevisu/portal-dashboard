import { gql } from "@apollo/client";

export const configurationItemFragment = gql`
  fragment ConfigurationItem on ConfigurationItem {
    name
    value
    type
    helpText
    label
  }
`;

export const pluginConfigurationBaseFragment = gql`
  fragment PluginConfigurationBase on PluginConfiguration {
    active
  }
`;

export const pluginConfigurationExtendedFragment = gql`
  fragment PluginConfigurationExtended on PluginConfiguration {
    ...PluginConfigurationBase
    configuration {
      ...ConfigurationItem
    }
  }
`;

export const pluginBaseFragment = gql`
  fragment PluginBase on Plugin {
    id
    name
    description
    globalConfiguration {
      ...PluginConfigurationBase
    }
  }
`;

export const pluginsDetailsFragment = gql`
  fragment PluginsDetails on Plugin {
    id
    name
    description
    globalConfiguration {
      ...PluginConfigurationExtended
    }
  }
`;
