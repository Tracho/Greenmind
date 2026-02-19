export const query = `    
query ExampleQuery($filters: ProductFiltersInput) {
  products(filters: $filters) {
    documentId
    title
    slug
    description
    price
    sold
    likes
    inStock
    createdAt
    updatedAt
    publishedAt
    oldPrice
    discount
    discountboolean
     images {
      width
      ext
      hash
      url
      alternativeText
      height
      formats
    }
    colors {
      name
    }
    materials {
      name
    }
      brand {
      name
    }
    specialfeatures {
      name
    }
    styles {
      name
    }
  }
  globals {
    currency
  }
} 
`