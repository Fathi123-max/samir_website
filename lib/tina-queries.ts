// GraphQL queries for useTina visual editing.
// Extracted from tina/__generated__/queries.gql with fragments from frags.gql.

export const PERSONAL_INFO_QUERY = `#graphql
query PersonalInfo {
  personalInfo {
    data {
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
        label
        url
      }
      degree
      degreeHonors
      statusText
      statusTextShort
      statusActive
    }
  }
}`;

export const SERVICES_QUERY = `#graphql
query Services {
  serviceConnection {
    edges {
      node {
        id
        data {
          title
          description
        }
      }
    }
  }
}`;

export const EVENTS_QUERY = `#graphql
query Events {
  eventConnection {
    edges {
      node {
        id
        data {
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
            format
            visionMixer
            replay
            cameras
            syncRouter
            audioIntercom
          }
          keyStats {
            label
            value
          }
          technicalApproach
          signalFlow {
            step
            description
          }
          challengesAndSolutions {
            challenge
            solution
            impact
          }
          outcomes
          improvementReflection
          tags
        }
      }
    }
  }
}`;

export const TESTIMONIALS_QUERY = `#graphql
query Testimonials {
  testimonialConnection {
    edges {
      node {
        id
        data {
          quote
          author
          role
          organization
          event
          avatarText
        }
      }
    }
  }
}`;

export const SHOWREEL_VIDEOS_QUERY = `#graphql
query ShowreelVideos {
  showreelVideoConnection {
    edges {
      node {
        id
        data {
          title
          caption
          thumb
          videoUrl
        }
      }
    }
  }
}`;

export const FAQ_QUERY = `#graphql
query Faq {
  faqConnection {
    edges {
      node {
        id
        data {
          question
          answer
        }
      }
    }
  }
}`;

export const EQUIPMENT_QUERY = `#graphql
query Equipment {
  equipmentConnection {
    edges {
      node {
        id
        data {
          name
          iconName
          description
          items {
            name
            model
            manufacturer
            role
            protocols
            experienceYears
            featured
          }
        }
      }
    }
  }
}`;

export const TIMELINE_QUERY = `#graphql
query Timeline {
  timelineConnection {
    edges {
      node {
        id
        data {
          period
          role
          company
          location
          type
          description
          achievements
          technologies
        }
      }
    }
  }
}`;
