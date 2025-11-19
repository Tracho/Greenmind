import React from "react";

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
  url?:string;
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
	img?: string,
	imgAlt?: string,
	userName: string,
	social?: string,
	rating?: number | null | undefined,
	message: string,
}[]