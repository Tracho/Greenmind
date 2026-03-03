import React from "react";
export type TypeImageFormat = {
  ext?: string;
  hash?: string;
  height?: number;
  mime?: string;
  name?: string;
  path?: string | null;
  size?: number;
  sizeInBytes?: number;
  url?: string;
  width?: number;
};

export type TypeImageData = {
  // id?: number;
  // documentId?: string;
  alternativeText: string | null | undefined;
  // caption?: string | null;
  // createdAt?: string;
  // updatedAt?: string;
  // publishedAt?: string;
  ext?: string;
  hash?: string;
  height: number;
  width: number;
  // mime?: string;
  // name?: string;
  // previewUrl?: string | null;
  // provider?: string;
  // provider_metadata?: any | null;
  // size?: number;
  url?: string;
  link?: string;

  // formats?: {
  //   thumbnail?: TypeImageFormat;
  //   small?: TypeImageFormat;
  //   medium?: TypeImageFormat;
  //   large?: TypeImageFormat;
  //   [key: string]: TypeImageFormat | undefined;
  // };
};

export type TypeHeaderBlock = {
  __typename: "ComponentHomepageHeaderHeader";
  id: number;
  header: string;
  subtitle_l_number: string;
  subtitle_l_text: string;
  subtitle_r_number: string;
  subtitle_r_text: string;
  input_placeholder: string;
  image?: TypeImageData;
};


export type TypeBestSellingPlantsItem = {
  id?: number;
  header?: string;
  price?: string;
  currency?: string;
  number_price?: number | null;
  likes?: number | null;
  sold?: number | null;
  inStock?: Boolean | null;
  image?: TypeImageData; // картинка может быть, поэтому "?"
  img?: TypeImageData; // картинка может быть, поэтому "?"
  discount?: null | number;
  discountboolean?: null | boolean;
  oldPrice?: null | number;
};

export type TypeBestSellingPlants = {
  __typename: "ComponentBspBestSellingPlants";
  id: number;
  header: string;
  subtitle: string;
  text_btn: string;
  cycle: TypeBestSellingPlantsItem[]; // массив товаров
  UseCycle: boolean | null;
};


export type TypeAboutUs = {
  __typename: "ComponentAboutUsAboutUs";
  id: number;
  header: string;
  subtitle: string;
  cycle: TypeAboutUsCycle[]; // если оставишь пустым — уточним позже
};
export type TypeAboutUsCycle = {
  header: string;
  subtitle: string;
}
export type TypeMainCategories = {
  __typename: "ComponentMainCategoriesMainCategories";
  id: number;
  header: string;
  subtitle: string;
  text_btn: string | null;
  cycle: TypeMainCategoriesCycle[];
};
export type TypeMainCategoriesCycle = {
  header: string | null;
  subtitle: string | null;
  text_btn: string | null;
  img: TypeImageData
}
export type TypeMainComments = {
  __typename: "ComponentMainCommentsMainComments";
  id: number;
  header: string;
  cycle: TypeMainCommentsCycle[];
};
export type TypeMainCommentsCycle = {
  message: string;
  name: string;
  rating?: number | null;
  social?: string | null;
  img: TypeImageData
}
export type TypeBlocks =
  | TypeHeaderBlock
  | TypeBestSellingPlants
  | TypeAboutUs
  | TypeMainCategories
  | TypeMainComments;

export type TypeHomePageResponse = {
  id?: number;
  documentId?: string;
  createdAt?: string;
  updatedAt?: string;
  publishedAt?: string;
  HomePage: TypeBlocks[];
  homePage: {
    HomePage: TypeBlocks[];
  }
  products?: TypeProducts[];
  globals?: Typeglobals[];
};

export type Typeglobals = {
  currency: string | null;
};



export type TypeProducts = {
  documentId: string;
  images: TypeImageData[];
  likes?: number | null;
  sold?: number | null;
  inStock?: boolean | null;
  slug: string;
  price: number | null;
  title: string;
  publishedAt: string;
  imgjson?: string;
  discount?: null | number;
  discountboolean?: null | boolean;
  oldPrice?: null | number;
};
export type TypeProduct = TypeProducts & {
  createdAt: string;
  description: string;
  updatedAt: string;
  colors:Cate[];
  materials:Cate[];
  brand:Brand;
  specialfeatures:Cate[]
  styles:Cate[]
};

export type TypeCardCate = {
  imgUrl: string;
  imgAlt?: string;
  img?: TypeImageData
  url?: string;
  subtitle?: string;
  header: string;
  titleLink?: string;
};

export type TypeInfoCard = {
  svg: React.ReactNode;
  header: string;
  subtitle: string;
};

export type TypeH2Header = {
  header: string | undefined;
  subtitle?: string | undefined;
};

export type TypeSlidsInfo = {
  img: string,
  imgAlt: string,
  userName: string,
  social?: string,
  rating?: number | null | undefined,
  message: string,
}[]

// export type TypeProdictsVariablesServer = {
//   pagination: TypeProductsImgCount,
//   productsPagination2?: TypePageProductsPagination2,
//   sort?: string[] | null;
//   filters?: TypeFiltresQueryParams;
//   brands?: TypeProductsCateName;
//   colors?: TypeProductsCateName;
// }
export type TypeProdictsVariables = {
  pagination?: TypeProductsImgCount,
  productsPagination2?: TypePageProductsPagination2,
  imagesPagination2?: TypePageProductsPagination2,
  sort: string[] | null;
  filters: TypeFiltresQueryParams;
  brands?: TypeProductsCateName;
  colors?: TypeProductsCateName;
  materials?: TypeProductsCateName;
  styles?: TypeProductsCateName;
  specialfeatures?: TypeProductsCateName;
}
export type TypeProductsCateName = {
  name?: string | null;
}
export type TypeProductsImgCount = {
  page?: number | null,
  pageSize?: number | null,
  total?: number | null,
  pageCount?: number | null,
}
export type TypePageProductsPagination2 = {
  limit?: number | null,

}

export type TypeFiltresQueryParams = {
  likes?: TypeFiltresOptions,
  price: TypeFiltresOptions,
  sold?: TypeFiltresOptions,
  brand: { name: { in: string[] } },
  colors: { name: { in: string[] } },
  materials: { name: { in: string[] } },
  styles: { name: { in: string[] } },
  specialfeatures: { name: { in: string[] } },
}
export type TypeFiltresCategory = {
  brand?: TypeFiltresQuerySubParams,
  colors?: TypeFiltresQuerySubParams
}

export type TypeFiltresOptions = {
  gte?: null | number | string,
  lte?: null | number | string,
}
export type TypeFiltresQuerySubParams = {
  gte?: null | number | string,
  lte?: null | number | string,
  desc?: string | undefined,
  asc?: string | undefined,
  in?: string[] | null | undefined
  name?: {
    in?: string[] | null | undefined
  }
}

export type TypeProductsResponse = {
  products_connection: {
    nodes: TypeProducts[],
    pageInfo: {
      page: number
      pageCount: number
      pageSize: number
      total: number
    }
  }
  maxPriceProduct: { nodes: [{ price: number }] }
  brands?: Brands;
  colors?: Brands;
  materials?: Brands;
  styles?: Brands;
  specialfeatures?: Brands;
  globals?: Typeglobals[];
  products?: TypeProducts[];
  discount?: null | number;
  discountboolean?: null | boolean;
  oldPrice?: null | number;
}

export type Brand = { name: string };
export type Brands = Brand[];
export type Cate = Brand[];
export type Color = { name: string };
export type Colors = Color[];
