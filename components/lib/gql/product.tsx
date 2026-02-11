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