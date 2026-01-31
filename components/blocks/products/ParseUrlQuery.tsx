import { TypeVariablesOBJ } from "@/components/types/Variables"

function ParseUrlQuery(queryParams: Record<string, string | undefined>) {
  const Result: TypeVariablesOBJ = {
    pagination: {
      page: 1,
      pageSize: 4, // количесто элементов на странице 
      // total: null,
      // pageCount: null,
    },
    // productsPagination2: { page: 1, pageSize: 3 }
    imagesPagination2: { limit: 1 }, // for product images

  };
 

  if (!queryParams || Object.keys(queryParams).length === 0) return Result;
  for (const queryKey in queryParams) {
    const value = queryParams[queryKey];
    if (!value) continue;

    if (queryKey === "sort") {
      const arrVal = value.split(",");

      Result.sort ??= [];
      Result.sort = arrVal;
      continue;
    }

    if(queryKey === "page"){
      Result.pagination ??= {page:Number(value)}
      Result.pagination.page = Number(value);
    }

    const parts = queryKey.split("_");
    if (parts.length === 3 && parts[0] === "filters") {
      const [key, category, method] = parts;
      if (category === "price" && (method === "gte" || method === "lte")) {
        //create 
        Result[key] ??= {};
        Result[key][category] ??= {};
        Result[key][category][method] = Number(value);
      }
    }

    if (parts.length === 4 && parts[0] === "filters") {
      const [key, category, name, method] = parts;
      if (
        (category === "brand" || category === "colors") &&
        (name === "name") &&
        (method === "in")
      ) {
        //create 
        Result[key] ??= {};
        Result[key][category] ??= { name: { in: [] } };
        Result[key][category][name][method] = value.split(",");
      }
    }
  }

  return Result;
}

export default ParseUrlQuery;