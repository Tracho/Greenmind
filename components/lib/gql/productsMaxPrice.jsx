export const queryMaxPrice = `
query Products($sort: [String], $pagination: PaginationArg) {
  products(sort: $sort, pagination: $pagination) {
    price
  }
}
`