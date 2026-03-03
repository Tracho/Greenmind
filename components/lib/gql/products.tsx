export const query = `
query Products(
  $filters: ProductFiltersInput
  $pagination: PaginationArg
  $imagesPagination2: PaginationArg
  $sort: [String]
) {
  products_connection(filters: $filters, pagination: $pagination, sort: $sort) {
    nodes {
      documentId   
      title
      slug
      price
      likes
      sold
      inStock
      publishedAt
      discount
      discountboolean
      oldPrice
      images(pagination: $imagesPagination2) {
         width
      ext
      hash
      url
      alternativeText
      height
      }
    }
    pageInfo {
      pageSize
      pageCount
      total
      page
    }
  }

  maxPriceProduct: products_connection(
    pagination: { limit: 1 }
    sort: ["price:desc"]
  ) {
    nodes {
      price
    }
  }

  globals {
    currency
  }

  brands {
    name
  }

  colors {
    name
  }
  materials {
    name
  }
  styles {
    name
  }
  specialfeatures {
    name
  }

}
`
// export const query = `
// query Images($pagination: PaginationArg, $productsPagination2: PaginationArg, $sort: [String], $filters: ProductFiltersInput) {
//   products(pagination: $productsPagination2, sort: $sort, filters: $filters) {
//     images(pagination: $pagination) {
//       width
//       url
//       height
//       alternativeText
//     }
//     title
//     sold
//     slug
//     price
//     likes
//     inStock
//     publishedAt
//   }
//   globals {
//     currency
//   }
//   brands {
//     name
//   }
//   colors {
//     name
//   }
// }
// ` 