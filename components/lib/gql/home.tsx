export const query1 = ` 
  query HomePage {
  homePage {
    HomePage {
      ... on ComponentHomepageHeaderHeader {
      __typename
        id
        header
        subtitle_l_number
        subtitle_l_text
        subtitle_r_number
        subtitle_r_text
        input_placeholder
        image {
          width
          url
          height
          alternativeText
        }
      }
      ... on ComponentAboutUsAboutUs {
      __typename
        id
        header
        subtitle
        cycle {
          header
          subtitle
        }
      }
      ... on ComponentBspBestSellingPlants {
      __typename
        id
        header
        subtitle
        text_btn
        cycle {
          header
          price
          img {
            alternativeText
            height
            width
            url
          }
          number_price
          currency
        }
      }
      ... on ComponentMainCategoriesMainCategories {
      __typename
        id
        Header
        subtitle
        cycle {
          header
          subtitle
          text_btn
          img {
            width
            url
            height
            alternativeText
          }
        }
      }
      ... on ComponentMainCommentsMainComments {
      __typename
        id
        header
        cycle {
          img {
            width
            url
            alternativeText
            height
          }
          social
          rating
          name
          message
        }
      }
    }
  }
} 
  `;


export const query = `
query HomePage($pagination: PaginationArg, $productsPagination2: PaginationArg, $sort: [String]) {
  homePage {
    HomePage {
      ... on ComponentHomepageHeaderHeader {
      __typename
        id
        header
        subtitle_l_number
        subtitle_l_text
        subtitle_r_number
        subtitle_r_text
        input_placeholder
        image {
          width
          url
          height
          alternativeText
        }
      }
      ... on ComponentAboutUsAboutUs {
      __typename
        id
        header
        subtitle
        cycle {
          header
          subtitle
        }
      }
      ... on ComponentBspBestSellingPlants {
      __typename
        id
        header
        subtitle
        text_btn
        cycle {
          header
          price
          img {
            alternativeText
            height
            width
            url
          }
          number_price
          currency
        }
        UseCycle
      }
      ... on ComponentMainCategoriesMainCategories {
      __typename
        id
        header
        subtitle
        cycle {
          header
          subtitle
          text_btn
          img {
            width
            url
            height
            alternativeText
          }
        }
      }
      ... on ComponentMainCommentsMainComments {
      __typename
        id
        header
        cycle {
          img {
            width
            url
            alternativeText
            height
          }
          social
          rating
          name
          message
        }
      }
    }
  }
  products(pagination: $productsPagination2, sort: $sort) {
    slug
    title
    price
    images(pagination: $pagination) {
      width
      url
      height
      createdAt
    }
    likes
    sold
  }
  globals {
    currency
  }
} 
  `; 