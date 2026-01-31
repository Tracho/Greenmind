import type { Schema, Struct } from '@strapi/strapi';

export interface AboutUsAboutUs extends Struct.ComponentSchema {
  collectionName: 'components_about_us_aboutuses';
  info: {
    displayName: 'AboutUs';
    icon: 'question';
  };
  attributes: {
    cycle: Schema.Attribute.Component<'about-us.cycle', true>;
    header: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface AboutUsCycle extends Struct.ComponentSchema {
  collectionName: 'components_about_us_cycles';
  info: {
    displayName: 'Cycle';
    icon: 'refresh';
  };
  attributes: {
    header: Schema.Attribute.String;
    subtitle: Schema.Attribute.Text;
  };
}

export interface BspBestSellingPlants extends Struct.ComponentSchema {
  collectionName: 'components_bsp_best_selling_plants';
  info: {
    displayName: 'Best Selling Plants';
    icon: 'shoppingCart';
  };
  attributes: {
    cycle: Schema.Attribute.Component<'bsp.cycle', true>;
    header: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
    text_btn: Schema.Attribute.String;
    UseCycle: Schema.Attribute.Boolean;
  };
}

export interface BspCycle extends Struct.ComponentSchema {
  collectionName: 'components_bsp_cycles';
  info: {
    displayName: 'cycle';
    icon: 'refresh';
  };
  attributes: {
    currency: Schema.Attribute.String;
    header: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    number_price: Schema.Attribute.Decimal;
    price: Schema.Attribute.String;
  };
}

export interface GlobalGlobal extends Struct.ComponentSchema {
  collectionName: 'components_global_globals';
  info: {
    displayName: 'Global';
    icon: 'cloud';
  };
  attributes: {
    currency: Schema.Attribute.String;
  };
}

export interface HomepageHeaderHeader extends Struct.ComponentSchema {
  collectionName: 'components_homepage_header_headers';
  info: {
    displayName: 'Header';
    icon: 'house';
  };
  attributes: {
    header: Schema.Attribute.String;
    image: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    input_placeholder: Schema.Attribute.String;
    subtitle_l_number: Schema.Attribute.String;
    subtitle_l_text: Schema.Attribute.String;
    subtitle_r_number: Schema.Attribute.String;
    subtitle_r_text: Schema.Attribute.String;
  };
}

export interface HomepageHeaderTestcycle extends Struct.ComponentSchema {
  collectionName: 'components_homepage_header_testcycles';
  info: {
    displayName: 'testcycle';
    icon: 'alien';
  };
  attributes: {
    dd: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    testimg: Schema.Attribute.Media<
      'images' | 'files' | 'videos' | 'audios',
      true
    >;
  };
}

export interface MainCategoriesCycle extends Struct.ComponentSchema {
  collectionName: 'components_main_categories_cycles';
  info: {
    displayName: 'cycle';
    icon: 'refresh';
  };
  attributes: {
    header: Schema.Attribute.String;
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    subtitle: Schema.Attribute.String;
    text_btn: Schema.Attribute.String;
  };
}

export interface MainCategoriesMainCategories extends Struct.ComponentSchema {
  collectionName: 'components_main_categories_main_categories';
  info: {
    displayName: 'Main Categories';
    icon: 'bulletList';
  };
  attributes: {
    cycle: Schema.Attribute.Component<'main-categories.cycle', true>;
    header: Schema.Attribute.String;
    subtitle: Schema.Attribute.String;
  };
}

export interface MainCommentsCycleCard extends Struct.ComponentSchema {
  collectionName: 'components_main_comments_cycle_cards';
  info: {
    displayName: 'cycle_card';
    icon: 'refresh';
  };
  attributes: {
    img: Schema.Attribute.Media<'images' | 'files' | 'videos' | 'audios'>;
    message: Schema.Attribute.String;
    name: Schema.Attribute.String;
    rating: Schema.Attribute.String;
    social: Schema.Attribute.String;
  };
}

export interface MainCommentsMainComments extends Struct.ComponentSchema {
  collectionName: 'components_main_comments_main_comments';
  info: {
    displayName: 'Main comments';
    icon: 'message';
  };
  attributes: {
    cycle: Schema.Attribute.Component<'main-comments.cycle-card', true>;
    header: Schema.Attribute.String;
  };
}

export interface TechnicalProductSpecs extends Struct.ComponentSchema {
  collectionName: 'components_technical_product_specs_s';
  info: {
    displayName: 'ProductSpecs ';
    icon: 'connector';
  };
  attributes: {
    Brand: Schema.Attribute.String;
    Color: Schema.Attribute.String;
    Material: Schema.Attribute.String;
    Size: Schema.Attribute.String;
    SpecialFeature: Schema.Attribute.String;
    Style: Schema.Attribute.String;
  };
}

declare module '@strapi/strapi' {
  export module Public {
    export interface ComponentSchemas {
      'about-us.about-us': AboutUsAboutUs;
      'about-us.cycle': AboutUsCycle;
      'bsp.best-selling-plants': BspBestSellingPlants;
      'bsp.cycle': BspCycle;
      'global.global': GlobalGlobal;
      'homepage-header.header': HomepageHeaderHeader;
      'homepage-header.testcycle': HomepageHeaderTestcycle;
      'main-categories.cycle': MainCategoriesCycle;
      'main-categories.main-categories': MainCategoriesMainCategories;
      'main-comments.cycle-card': MainCommentsCycleCard;
      'main-comments.main-comments': MainCommentsMainComments;
      'technical.product-specs': TechnicalProductSpecs;
    }
  }
}
