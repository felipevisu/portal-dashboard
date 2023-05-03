import { gql } from "@apollo/client";

export const channelsListBase = gql`
  query BaseChannels {
    channels {
      ...Channel
    }
  }
`;

export const channelsQuery = gql`
  query Channels {
    channels {
      ...Channel
    }
  }
`;

export const channelDetailsQuery = gql`
  query ChannelDetails($id: ID!) {
    channel(id: $id) {
      ...Channel
    }
  }
`;
