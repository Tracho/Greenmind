export  const query = ` 
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
        Header
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