import * as vue from 'vue';
import { Component, Ref, App } from 'vue';
import { MarkdownItHeader } from '@mdit-vue/types';

// types shared between server and client


interface PageData {
  relativePath: string
  title: string
  titleTemplate?: string | boolean
  description: string
  headers: Header[]
  frontmatter: Record<string, any>
  lastUpdated?: number
}

type Header = MarkdownItHeader
type CleanUrlsMode =
  | 'disabled'
  | 'without-subfolders'
  | 'with-subfolders'

interface SiteData<ThemeConfig = any> {
  base: string
  cleanUrls?: CleanUrlsMode

  /**
   * Language of the site as it should be set on the `html` element.
   *
   * @example `en-US`, `zh-CN`
   */
  lang: string

  title: string
  titleTemplate?: string | boolean
  description: string
  head: HeadConfig[]
  appearance: boolean
  themeConfig: ThemeConfig
  scrollOffset: number | string
  locales: Record<string, LocaleConfig>

  /**
   * Available locales for the site when it has defined `locales` in its
   * `themeConfig`. This object is otherwise empty. Keys are paths like `/` or
   * `/zh/`.
   */
  langs: Record<
    string,
    {
      /**
       * Lang attribute as set on the `<html>` element.
       * @example `en-US`, `zh-CN`
       */
      lang: string
      /**
       * Label to display in the language menu.
       * @example `English`, `简体中文`
       */
      label: string
    }
  >
}

type HeadConfig =
  | [string, Record<string, string>]
  | [string, Record<string, string>, string]

interface LocaleConfig {
  lang: string
  title?: string
  titleTemplate?: string | boolean
  description?: string
  head?: HeadConfig[]
  label?: string
  selectText?: string
}

declare const inBrowser: boolean;

interface Route {
    path: string;
    data: PageData;
    component: Component | null;
}
interface Router {
    route: Route;
    go: (href?: string) => Promise<void>;
}
declare function useRouter(): Router;
declare function useRoute(): Route;

interface VitePressData<T = any> {
    site: Ref<SiteData<T>>;
    page: Ref<PageData>;
    theme: Ref<T>;
    frontmatter: Ref<PageData['frontmatter']>;
    title: Ref<string>;
    description: Ref<string>;
    lang: Ref<string>;
    localePath: Ref<string>;
}
declare function useData<T = any>(): VitePressData<T>;

interface EnhanceAppContext {
    app: App;
    router: Router;
    siteData: Ref<SiteData>;
}
interface Theme {
    Layout: Component;
    NotFound?: Component;
    enhanceApp?: (ctx: EnhanceAppContext) => void;
    setup?: () => void;
}

declare function withBase(path: string): string;

declare const Content: vue.DefineComponent<{}, () => vue.VNode<vue.RendererNode, vue.RendererElement, {
    [key: string]: any;
}>, {}, {}, {}, vue.ComponentOptionsMixin, vue.ComponentOptionsMixin, vue.EmitsOptions, string, vue.VNodeProps & vue.AllowedComponentProps & vue.ComponentCustomProps, Readonly<vue.ExtractPropTypes<{}>>, {}>;

export { Content, EnhanceAppContext, HeadConfig, Header, LocaleConfig, PageData, Route, Router, SiteData, Theme, VitePressData, inBrowser, useData, useRoute, useRouter, withBase };
