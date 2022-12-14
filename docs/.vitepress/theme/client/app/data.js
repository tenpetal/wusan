import { shallowRef, readonly, computed, inject } from 'vue';
import siteData from '@siteData';
import { resolveSiteDataByRoute, createTitle } from '../shared.js';
import { withBase } from './utils.js';

export const dataSymbol = Symbol();

// site data is a singleton
export const siteDataRef = shallowRef((import.meta.env.PROD ? siteData : readonly(siteData)));
// hmr
if (import.meta.hot) {
    import.meta.hot.accept('/@siteData', (m) => {
        if (m) {
            siteDataRef.value = m.default;
        }
    });
}

// per-app data
export function initData(route) {
    const site = computed(() => resolveSiteDataByRoute(siteDataRef.value, route.path));
    return {
        site,
        theme: computed(() => site.value.themeConfig),
        page: computed(() => route.data),
        frontmatter: computed(() => route.data.frontmatter),
        lang: computed(() => site.value.lang),
        localePath: computed(() => {
            const { langs, lang } = site.value;
            const path = Object.keys(langs).find((langPath) => langs[langPath].lang === lang);
            return withBase(path || '/');
        }),
        title: computed(() => {
            return createTitle(site.value, route.data);
        }),
        description: computed(() => {
            return route.data.description || site.value.description;
        })
    };
}

export function useData() {
    const data = inject(dataSymbol);
    if (!data) {
        console.log(1);
        throw new Error('vitepress data not properly injected in app');
    }
    return data;
}



