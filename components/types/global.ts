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
  alternativeText?: string | null | undefined;
  // caption?: string | null;
  // createdAt?: string;
  // updatedAt?: string;
  // publishedAt?: string;
  // ext?: string;
  // hash?: string;
  height?: number;
  width?: number;
  // mime?: string;
  // name?: string;
  // previewUrl?: string | null;
  // provider?: string;
  // provider_metadata?: any | null;
  // size?: number;
  url?: string;

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
  number_price?:number;
  image?: TypeImageData; // картинка может быть, поэтому "?"
  img?: TypeImageData; // картинка может быть, поэтому "?"
};

export type TypeBestSellingPlants = {
  __typename: "ComponentBspBestSellingPlants";
  id: number;
  header: string;
  subtitle: string;
  text_btn: string;
  cycle: TypeBestSellingPlantsItem[]; // массив товаров
};


export type TypeAboutUs = {
  __typename: "ComponentAboutUsAboutUs";
  id: number;
  Header: string;
  subtitle: string;
  cycle: any[]; // если оставишь пустым — уточним позже
};
export type TypeMainCategories = {
  __typename: "ComponentMainCategoriesMainCategories";
  id: number;
  Header: string;
  subtitle: string;
  cycle: any[];
};
export type TypeMainComments = {
  __typename: "ComponentMainCommentsMainComments";
  id: number;
  header: string;
  cycle: any[];
};
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
    HomePage:TypeBlocks[];
  }
};



export type TypeCard = {
  imgUrl: string;
  imgAlt?: string;
  price: number;
  currency: string;
  header: string;
};
export type TypeCardCate = {
  imgUrl: string;
  imgAlt?: string;
  url?: string;
  title?: string;
  header: string;
  titleLink?: string;
};

export type TypeInfoCard = {
  svg: React.ReactNode;
  header: string;
  title: string;
};

export type TypeH2Header = {
  header: string;
  title: string;
};

export type TypeSlidsInfo = {
  img: string,
  imgAlt: string,
  userName: string,
  social?: string,
  rating?: number | null | undefined,
  message: string,
}[]