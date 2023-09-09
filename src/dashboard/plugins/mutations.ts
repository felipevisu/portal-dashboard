import { gql } from "@apollo/client";

export const pluginUpdate = gql`
  mutation PluginUpdate($id: ID!, $input: PluginUpdateInput!) {
    pluginUpdate(id: $id, input: $input) {
      errors {
        ...Error
      }
      plugin {
        ...PluginsDetails
      }
    }
  }
`;
