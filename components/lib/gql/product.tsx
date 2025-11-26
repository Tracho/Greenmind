export const query = `    
query ExampleQuery($filters: ProductFiltersInput) {
  products(filters: $filters) {
    documentId
    title
    slug
    description
    price
    images_connection {
      nodes {
        width
        url
        alternativeText
        height
      }
    }
    images {
      width
      url
      alternativeText
      height
    }
    inStock
    createdAt
    updatedAt
    publishedAt
  }
} 
`