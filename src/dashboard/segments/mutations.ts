import { gql } from "@apollo/client";

export const segmentCreateMutation = gql`
  mutation SegmentCreate($input: SegmentInput!) {
    segmentCreate(input: $input) {
      segment {
        ...Segment
      }
      errors {
        ...Error
      }
    }
  }
`;

export const segmentUpdateMutation = gql`
  mutation SegmentUpdate($id: ID, $input: SegmentInput!) {
    segmentUpdate(id: $id, input: $input) {
      segment {
        ...Segment
      }
      errors {
        ...Error
      }
    }
  }
`;

export const segmentDeleteMutation = gql`
  mutation SegmentDelete($id: ID!) {
    segmentDelete(id: $id) {
      errors {
        ...Error
      }
    }
  }
`;

export const segmentBulkDeleteMutation = gql`
  mutation SegmentBulkDelete($ids: [ID!]!) {
    segmentBulkDelete(ids: $ids) {
      errors {
        ...Error
      }
    }
  }
`;
