import { gql } from "@apollo/client";

export const channelCreateMutation = gql`
  mutation ChannelCreate($input: ChannelInput!) {
    channelCreate(input: $input) {
      channel {
        ...Channel
      }
      errors {
        ...Error
      }
    }
  }
`;

export const channelUpdateMutation = gql`
  mutation ChannelUpdate($id: ID!, $input: ChannelInput!) {
    channelUpdate(id: $id, input: $input) {
      channel {
        ...Channel
      }
      errors {
        ...Error
      }
    }
  }
`;

export const channelDeleteMutation = gql`
  mutation ChannelDelete($id: ID!) {
    channelDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;
