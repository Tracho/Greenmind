export const queryBrandProducts = `
query Brand($filters: ProductFiltersInput, $pagination: PaginationArg, $productsPagination2: PaginationArg) {
  products(filters: $filters, pagination: $productsPagination2) {
    title
    sold
    slug
    price
    likes
    inStock
    publishedAt
    images(pagination: $pagination) {
      width
      url
      height
      alternativeText
    }
  }
}
`;