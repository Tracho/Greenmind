export type TypeVariablesOBJ = {
  sort?: string[];
  filters?:{
    price?:{gte?:number, lte?:number}
    brand?:{name:{in:string[]}}
    colors?:{name:{in:string[]}}
  }
  pagination?: { 
    page?: number | null,
    pageSize?: number | null,
    total?:number | null,
    pageCount?:number | null,
   }
  productsPagination2?: {
    page?: number | null,
    limit?: number | null,
    pageSize?: number | null
  }
  imagesPagination2?: {
    limit?: number | null,
  }
}