export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const PersonalInfoPartsFragmentDoc = gql`
    fragment PersonalInfoParts on PersonalInfo {
  __typename
  name
  title
  subtitle
  heroHeadline
  tagline
  portrait
  showreelUrl
  experienceYears
  eventsCount
  broadcastersCount
  uptimePercentage
  location
  phone
  email
  whatsappUrl
  workingHours
  socials {
    __typename
    label
    url
  }
  degree
  degreeHonors
  statusText
  statusTextShort
  statusActive
}
    `;
export const EventPartsFragmentDoc = gql`
    fragment EventParts on Event {
  __typename
  slug
  title
  subtitle
  category
  venue
  broadcaster
  dates
  role
  heroImage
  gallery
  videoUrl
  summary
  cameraCount
  specs {
    __typename
    format
    visionMixer
    replay
    cameras
    syncRouter
    audioIntercom
  }
  keyStats {
    __typename
    label
    value
  }
  technicalApproach
  signalFlow {
    __typename
    step
    description
  }
  challengesAndSolutions {
    __typename
    challenge
    solution
    impact
  }
  outcomes
  improvementReflection
  tags
}
    `;
export const ServicePartsFragmentDoc = gql`
    fragment ServiceParts on Service {
  __typename
  title
  description
}
    `;
export const EquipmentPartsFragmentDoc = gql`
    fragment EquipmentParts on Equipment {
  __typename
  name
  iconName
  description
  items {
    __typename
    name
    model
    manufacturer
    role
    protocols
    experienceYears
    featured
  }
}
    `;
export const TimelinePartsFragmentDoc = gql`
    fragment TimelineParts on Timeline {
  __typename
  period
  role
  company
  location
  type
  description
  achievements
  technologies
}
    `;
export const TestimonialPartsFragmentDoc = gql`
    fragment TestimonialParts on Testimonial {
  __typename
  quote
  author
  role
  organization
  event
  avatarText
}
    `;
export const ShowreelVideoPartsFragmentDoc = gql`
    fragment ShowreelVideoParts on ShowreelVideo {
  __typename
  title
  caption
  thumb
  videoUrl
}
    `;
export const FaqPartsFragmentDoc = gql`
    fragment FaqParts on Faq {
  __typename
  question
  answer
}
    `;
export const PersonalInfoDocument = gql`
    query personalInfo($relativePath: String!) {
  personalInfo(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PersonalInfoParts
  }
}
    ${PersonalInfoPartsFragmentDoc}`;
export const PersonalInfoConnectionDocument = gql`
    query personalInfoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PersonalInfoFilter) {
  personalInfoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PersonalInfoParts
      }
    }
  }
}
    ${PersonalInfoPartsFragmentDoc}`;
export const EventDocument = gql`
    query event($relativePath: String!) {
  event(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EventParts
  }
}
    ${EventPartsFragmentDoc}`;
export const EventConnectionDocument = gql`
    query eventConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EventFilter) {
  eventConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EventParts
      }
    }
  }
}
    ${EventPartsFragmentDoc}`;
export const ServiceDocument = gql`
    query service($relativePath: String!) {
  service(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ServiceParts
  }
}
    ${ServicePartsFragmentDoc}`;
export const ServiceConnectionDocument = gql`
    query serviceConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ServiceFilter) {
  serviceConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ServiceParts
      }
    }
  }
}
    ${ServicePartsFragmentDoc}`;
export const EquipmentDocument = gql`
    query equipment($relativePath: String!) {
  equipment(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...EquipmentParts
  }
}
    ${EquipmentPartsFragmentDoc}`;
export const EquipmentConnectionDocument = gql`
    query equipmentConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: EquipmentFilter) {
  equipmentConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...EquipmentParts
      }
    }
  }
}
    ${EquipmentPartsFragmentDoc}`;
export const TimelineDocument = gql`
    query timeline($relativePath: String!) {
  timeline(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TimelineParts
  }
}
    ${TimelinePartsFragmentDoc}`;
export const TimelineConnectionDocument = gql`
    query timelineConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TimelineFilter) {
  timelineConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TimelineParts
      }
    }
  }
}
    ${TimelinePartsFragmentDoc}`;
export const TestimonialDocument = gql`
    query testimonial($relativePath: String!) {
  testimonial(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...TestimonialParts
  }
}
    ${TestimonialPartsFragmentDoc}`;
export const TestimonialConnectionDocument = gql`
    query testimonialConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: TestimonialFilter) {
  testimonialConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...TestimonialParts
      }
    }
  }
}
    ${TestimonialPartsFragmentDoc}`;
export const ShowreelVideoDocument = gql`
    query showreelVideo($relativePath: String!) {
  showreelVideo(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ShowreelVideoParts
  }
}
    ${ShowreelVideoPartsFragmentDoc}`;
export const ShowreelVideoConnectionDocument = gql`
    query showreelVideoConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ShowreelVideoFilter) {
  showreelVideoConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ShowreelVideoParts
      }
    }
  }
}
    ${ShowreelVideoPartsFragmentDoc}`;
export const FaqDocument = gql`
    query faq($relativePath: String!) {
  faq(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FaqParts
  }
}
    ${FaqPartsFragmentDoc}`;
export const FaqConnectionDocument = gql`
    query faqConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FaqFilter) {
  faqConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FaqParts
      }
    }
  }
}
    ${FaqPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    personalInfo(variables, options) {
      return requester(PersonalInfoDocument, variables, options);
    },
    personalInfoConnection(variables, options) {
      return requester(PersonalInfoConnectionDocument, variables, options);
    },
    event(variables, options) {
      return requester(EventDocument, variables, options);
    },
    eventConnection(variables, options) {
      return requester(EventConnectionDocument, variables, options);
    },
    service(variables, options) {
      return requester(ServiceDocument, variables, options);
    },
    serviceConnection(variables, options) {
      return requester(ServiceConnectionDocument, variables, options);
    },
    equipment(variables, options) {
      return requester(EquipmentDocument, variables, options);
    },
    equipmentConnection(variables, options) {
      return requester(EquipmentConnectionDocument, variables, options);
    },
    timeline(variables, options) {
      return requester(TimelineDocument, variables, options);
    },
    timelineConnection(variables, options) {
      return requester(TimelineConnectionDocument, variables, options);
    },
    testimonial(variables, options) {
      return requester(TestimonialDocument, variables, options);
    },
    testimonialConnection(variables, options) {
      return requester(TestimonialConnectionDocument, variables, options);
    },
    showreelVideo(variables, options) {
      return requester(ShowreelVideoDocument, variables, options);
    },
    showreelVideoConnection(variables, options) {
      return requester(ShowreelVideoConnectionDocument, variables, options);
    },
    faq(variables, options) {
      return requester(FaqDocument, variables, options);
    },
    faqConnection(variables, options) {
      return requester(FaqConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/b4832c73-1d3e-4aad-9f22-17177ecc3782/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
