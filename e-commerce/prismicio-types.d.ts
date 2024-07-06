// Code generated by Slice Machine. DO NOT EDIT.

import type * as prismic from "@prismicio/client";

type Simplify<T> = { [KeyType in keyof T]: T[KeyType] };

type PaginaInicialDocumentDataSlicesSlice =
  | CompreJuntoSlice
  | MarcasSlice
  | OfertasSlice
  | SessoesSlice
  | CarrosselSlice;

/**
 * Content for pagina_inicial documents
 */
interface PaginaInicialDocumentData {
  /**
   * Title field in *pagina_inicial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: pagina_inicial.title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  title: prismic.KeyTextField;

  /**
   * Slice Zone field in *pagina_inicial*
   *
   * - **Field Type**: Slice Zone
   * - **Placeholder**: *None*
   * - **API ID Path**: pagina_inicial.slices[]
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#slices
   */
  slices: prismic.SliceZone<PaginaInicialDocumentDataSlicesSlice> /**
   * Meta Title field in *pagina_inicial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A title of the page used for social media and search engines
   * - **API ID Path**: pagina_inicial.meta_title
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */;
  meta_title: prismic.KeyTextField;

  /**
   * Meta Description field in *pagina_inicial*
   *
   * - **Field Type**: Text
   * - **Placeholder**: A brief summary of the page
   * - **API ID Path**: pagina_inicial.meta_description
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * Meta Image field in *pagina_inicial*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: pagina_inicial.meta_image
   * - **Tab**: SEO & Metadata
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  meta_image: prismic.ImageField<never>;
}

/**
 * pagina_inicial document from Prismic
 *
 * - **API ID**: `pagina_inicial`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type PaginaInicialDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<PaginaInicialDocumentData>,
    "pagina_inicial",
    Lang
  >;

/**
 * Content for Settings documents
 */
interface SettingsDocumentData {
  /**
   * Site Title field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.site_title
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  site_title: prismic.KeyTextField;

  /**
   * Meta Description field in *Settings*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.meta_description
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  meta_description: prismic.KeyTextField;

  /**
   * OG Image field in *Settings*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: settings.og_image
   * - **Tab**: Main
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  og_image: prismic.ImageField<never>;
}

/**
 * Settings document from Prismic
 *
 * - **API ID**: `settings`
 * - **Repeatable**: `false`
 * - **Documentation**: https://prismic.io/docs/custom-types
 *
 * @typeParam Lang - Language API ID of the document.
 */
export type SettingsDocument<Lang extends string = string> =
  prismic.PrismicDocumentWithoutUID<
    Simplify<SettingsDocumentData>,
    "settings",
    Lang
  >;

export type AllDocumentTypes = PaginaInicialDocument | SettingsDocument;

/**
 * Primary content in *Carrossel → Default → Primary*
 */
export interface CarrosselSliceDefaultPrimary {
  /**
   * Imagem 1 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_1
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_1: prismic.ImageField<never>;

  /**
   * Imagem 2 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_2
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_2: prismic.ImageField<never>;

  /**
   * Imagem 3 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_3
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_3: prismic.ImageField<never>;

  /**
   * Imagem 4 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_4
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_4: prismic.ImageField<never>;

  /**
   * Imagem 5 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_5
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_5: prismic.ImageField<never>;

  /**
   * Imagem 6 field in *Carrossel → Default → Primary*
   *
   * - **Field Type**: Image
   * - **Placeholder**: *None*
   * - **API ID Path**: carrossel.default.primary.imagem_6
   * - **Documentation**: https://prismic.io/docs/field#image
   */
  imagem_6: prismic.ImageField<never>;
}

/**
 * Default variation for Carrossel Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CarrosselSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<CarrosselSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Carrossel*
 */
type CarrosselSliceVariation = CarrosselSliceDefault;

/**
 * Carrossel Shared Slice
 *
 * - **API ID**: `carrossel`
 * - **Description**: Carrossel
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CarrosselSlice = prismic.SharedSlice<
  "carrossel",
  CarrosselSliceVariation
>;

/**
 * Primary content in *CompreJunto → Default → Primary*
 */
export interface CompreJuntoSliceDefaultPrimary {
  /**
   * Título Compre Junto field in *CompreJunto → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: compre_junto.default.primary.titulo_compre_junto
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  titulo_compre_junto: prismic.KeyTextField;
}

/**
 * Default variation for CompreJunto Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CompreJuntoSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<CompreJuntoSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *CompreJunto*
 */
type CompreJuntoSliceVariation = CompreJuntoSliceDefault;

/**
 * CompreJunto Shared Slice
 *
 * - **API ID**: `compre_junto`
 * - **Description**: CompreJunto
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type CompreJuntoSlice = prismic.SharedSlice<
  "compre_junto",
  CompreJuntoSliceVariation
>;

/**
 * Default variation for MaisVendidos Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MaisVendidosSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  never
>;

/**
 * Slice variation for *MaisVendidos*
 */
type MaisVendidosSliceVariation = MaisVendidosSliceDefault;

/**
 * MaisVendidos Shared Slice
 *
 * - **API ID**: `mais_vendidos`
 * - **Description**: MaisVendidos
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MaisVendidosSlice = prismic.SharedSlice<
  "mais_vendidos",
  MaisVendidosSliceVariation
>;

/**
 * Primary content in *Marcas → Default → Primary*
 */
export interface MarcasSliceDefaultPrimary {
  /**
   * Título Marcas field in *Marcas → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: marcas.default.primary.titulo_marcas
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  titulo_marcas: prismic.KeyTextField;
}

/**
 * Default variation for Marcas Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MarcasSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<MarcasSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Marcas*
 */
type MarcasSliceVariation = MarcasSliceDefault;

/**
 * Marcas Shared Slice
 *
 * - **API ID**: `marcas`
 * - **Description**: Marcas
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type MarcasSlice = prismic.SharedSlice<"marcas", MarcasSliceVariation>;

/**
 * Primary content in *Ofertas → Default → Primary*
 */
export interface OfertasSliceDefaultPrimary {
  /**
   * Titulo field in *Ofertas → Default → Primary*
   *
   * - **Field Type**: Text
   * - **Placeholder**: *None*
   * - **API ID Path**: ofertas.default.primary.titulo
   * - **Documentation**: https://prismic.io/docs/field#key-text
   */
  titulo: prismic.KeyTextField;
}

/**
 * Default variation for Ofertas Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type OfertasSliceDefault = prismic.SharedSliceVariation<
  "default",
  Simplify<OfertasSliceDefaultPrimary>,
  never
>;

/**
 * Slice variation for *Ofertas*
 */
type OfertasSliceVariation = OfertasSliceDefault;

/**
 * Ofertas Shared Slice
 *
 * - **API ID**: `ofertas`
 * - **Description**: Ofertas
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type OfertasSlice = prismic.SharedSlice<
  "ofertas",
  OfertasSliceVariation
>;

/**
 * Default variation for Sessoes Slice
 *
 * - **API ID**: `default`
 * - **Description**: Default
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SessoesSliceDefault = prismic.SharedSliceVariation<
  "default",
  Record<string, never>,
  never
>;

/**
 * Slice variation for *Sessoes*
 */
type SessoesSliceVariation = SessoesSliceDefault;

/**
 * Sessoes Shared Slice
 *
 * - **API ID**: `sessoes`
 * - **Description**: Sessoes
 * - **Documentation**: https://prismic.io/docs/slice
 */
export type SessoesSlice = prismic.SharedSlice<
  "sessoes",
  SessoesSliceVariation
>;

declare module "@prismicio/client" {
  interface CreateClient {
    (
      repositoryNameOrEndpoint: string,
      options?: prismic.ClientConfig,
    ): prismic.Client<AllDocumentTypes>;
  }

  namespace Content {
    export type {
      PaginaInicialDocument,
      PaginaInicialDocumentData,
      PaginaInicialDocumentDataSlicesSlice,
      SettingsDocument,
      SettingsDocumentData,
      AllDocumentTypes,
      CarrosselSlice,
      CarrosselSliceDefaultPrimary,
      CarrosselSliceVariation,
      CarrosselSliceDefault,
      CompreJuntoSlice,
      CompreJuntoSliceDefaultPrimary,
      CompreJuntoSliceVariation,
      CompreJuntoSliceDefault,
      MaisVendidosSlice,
      MaisVendidosSliceVariation,
      MaisVendidosSliceDefault,
      MarcasSlice,
      MarcasSliceDefaultPrimary,
      MarcasSliceVariation,
      MarcasSliceDefault,
      OfertasSlice,
      OfertasSliceDefaultPrimary,
      OfertasSliceVariation,
      OfertasSliceDefault,
      SessoesSlice,
      SessoesSliceVariation,
      SessoesSliceDefault,
    };
  }
}
