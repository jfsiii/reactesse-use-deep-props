import 'windi.css'
import './styles/main.css'
import vitedge from 'vitedge'
import routes from 'virtual:generated-pages'
import App from './App'

import { installI18n, extractLocaleFromPath, DEFAULT_LOCALE } from './i18n'

// https://github.com/frandiox/reactesse-edge-template/issues/2#issuecomment-906019130
// this whole .forEach was removed and the logic put in vite.config.ts
// but will leave the `route.path = ` line so as only to alter .name-related code
routes.forEach((route) => {
  // Commenting out b/c we'll use the value in meta.propsGetter, not name
  // const { path } = route
  // route.name =
  //   path
  //     .replace(/^\//, '')
  //     .replace(/:/, '')
  //     .replace(/\//, '-')
  //     .replace('all(.*)', 'not-found') || 'home'

  route.path = route.path.includes('*') ? '*' : route.path
})

// https://github.com/frandiox/vitedge
export default vitedge(
  App,
  {
    routes,
    // Use Router's base for i18n routes
    base: ({ url }) => {
      const locale = extractLocaleFromPath(url.pathname)
      return locale === DEFAULT_LOCALE ? '/' : `/${locale}/`
    },
  },
  // @ts-ignore
  async ({ url }) => {
    // Load language asyncrhonously to avoid bundling all languages
    await installI18n(extractLocaleFromPath(url.pathname))
  }
)
