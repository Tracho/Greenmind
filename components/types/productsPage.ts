export type Rensponce = {
    products_connection: ProductsConnection;
    maxPriceProduct:     MaxPriceProduct;
    globals:             Global[];
    brands:              Brand[];
    colors:              Brand[];
    materials:           Brand[];
    styles:              Brand[];
    specialfeatures:     Brand[];
}

export type Brand = {
    name: string;
}

export type Global = {
    currency: string;
}

export type MaxPriceProduct = {
    nodes: MaxPriceProductNode[];
}

export type MaxPriceProductNode = {
    price: number;
}

export type ProductsConnection = {
    nodes:    ProductsConnectionNode[];
    pageInfo: PageInfo;
}

export type ProductsConnectionNode = {
    documentId:      string;
    title:           string;
    slug:            string;
    price:           number;
    likes:           number | null;
    sold:            number;
    inStock:         boolean;
    publishedAt:     Date;
    discount:        number | null;
    discountboolean: boolean | null;
    oldPrice:        number | null;
    images:          Image[];
}

export type Image = {
    width:           number;
    ext:             EXT;
    hash:            string;
    url:             string;
    alternativeText: null;
    height:          number;
}

export enum EXT {
    Jpg = ".jpg",
}

export type PageInfo = {
    pageSize:  number;
    pageCount: number;
    total:     number;
    page:      number;
}
