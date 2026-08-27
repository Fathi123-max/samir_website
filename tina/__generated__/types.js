export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const HomepagePartsFragmentDoc = gql`
    fragment HomepageParts on Homepage {
  __typename
  identity {
    __typename
    name
    title
    subtitle
    tagline
    portrait
    showreelUrl
    experienceYears
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
  hero {
    __typename
    eyebrow
    headline
    headlineAccent
    ctaPrimaryLabel
    ctaPrimaryHref
    ctaSecondaryLabel
    ctaSecondaryHref
    stats {
      __typename
      value
      label
    }
  }
  navigation {
    __typename
    items {
      __typename
      label
      href
      id
      index
    }
  }
  servicesSection {
    __typename
    eyebrow
    heading
    headingAccent
    body
    items {
      __typename
      title
      description
    }
  }
  eventsSection {
    __typename
    eyebrow
    heading
    headingAccent
    body
    categories
    featuredEvents
  }
  showreelSection {
    __typename
    eyebrow
    heading
    headingAccent
    openLabel
    videos {
      __typename
      title
      caption
      thumb
      videoUrl
    }
  }
  testimonialSection {
    __typename
    testimonials {
      __typename
      quote
      author
      role
      organization
      event
      avatarText
    }
    ctaHeading
    ctaBody
    ctaLabel
    ctaHref
  }
  faqSection {
    __typename
    eyebrow
    heading
    headingAccent
    body
    items {
      __typename
      question
      answer
    }
  }
  footerSection {
    __typename
    eyebrow
    heading
    headingAccent
    ctaLabel
  }
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
export const HomepageDocument = gql`
    query homepage($relativePath: String!) {
  homepage(relativePath: $relativePath) {
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
    ...HomepageParts
  }
}
    ${HomepagePartsFragmentDoc}`;
export const HomepageConnectionDocument = gql`
    query homepageConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomepageFilter) {
  homepageConnection(
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
        ...HomepageParts
      }
    }
  }
}
    ${HomepagePartsFragmentDoc}`;
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
export function getSdk(requester) {
  return {
    homepage(variables, options) {
      return requester(HomepageDocument, variables, options);
    },
    homepageConnection(variables, options) {
      return requester(HomepageConnectionDocument, variables, options);
    },
    event(variables, options) {
      return requester(EventDocument, variables, options);
    },
    eventConnection(variables, options) {
      return requester(EventConnectionDocument, variables, options);
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
