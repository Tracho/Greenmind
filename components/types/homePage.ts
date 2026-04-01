export type Res = {
    data: Data;
}

export type Data = {
    homePage: HomePage;
    products: Product[];
    globals:  Global[];
}

export type Global = {
    currency: string;
}

export type HomePage = {
    HomePage: HomePageElement[];
}

export type HomePageElement = {
    __typename:         string;
    id:                 string;
    header:             string;
    subtitle_l_number: string;
    subtitle_l_text:   string;
    subtitle_r_number: string;
    subtitle_r_text:   string;
    input_placeholder: string;
    image:             ImgClass;
    subtitle:          string;
    text_btn:          string;
    cycle:             Cycle[];
    UseCycle:          boolean;
}

export type Cycle = {
    header:       string;
    price:        string;
    img:          ImgClass;
    number_price: number;
    currency:     string;
    subtitle:     null | string;
    text_btn:     null | string;
    social:       string;
    rating:       string;
    name:         string;
    message:      string;
}

export type ImgClass = {
    alternativeText: null;
    height:          number;
    width:           number;
    url:             string;
}

export type Product = {
    documentId:      string;
    title:           string;
    slug:            string;
    price:           number;
    likes:           number;
    sold:            number;
    inStock:         boolean;
    publishedAt:     Date;
    discount:        number;
    discountboolean: boolean;
    oldPrice:        number;
    images:          ImageElement[];
}

export type ImageElement = {
    width:           number;
    ext:             EXT;
    hash:            string;
    url:             string;
    alternativeText: null;
    height:          number;
    formats:         Formats;
}

export enum EXT {
    Jpg = ".jpg",
}

export type Formats = {
    thumbnail: Large;
    small:     Large;
    medium:    Large;
    large:     Large;
}

export type Large = {
    name:        string;
    hash:        string;
    ext:         EXT;
    mime:        MIME;
    path:        null;
    width:       number;
    height:      number;
    size:        number;
    sizeInBytes: number;
    url:         string;
}

export enum MIME {
    ImageJPEG = "image/jpeg",
}
