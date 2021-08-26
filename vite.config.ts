import path from "path";
import { defineConfig } from "vite";
import Pages, { Route } from "vite-plugin-pages";
import WindiCSS from "vite-plugin-windicss";
import vitedge from "vitedge/plugin.js";
import mdx from "vite-plugin-mdx";
// @ts-ignore
import remarkPrism from "remark-prism";
import reactRefresh from "@vitejs/plugin-react-refresh";

function pathToName(filepath: string) {
  return (
    filepath
      // drop page root
      .replace("/src/pages/", "")
      // drop extension
      .replace(/\..{2,3}$/, "")
  );
}

export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  plugins: [
    reactRefresh(),
    vitedge(),
    // @ts-ignore
    mdx.default({
      remarkPlugins: [remarkPrism],
    }),

    // https://github.com/hannoeru/vite-plugin-pages
    // @ts-ignore
    Pages.default({
      react: true,
      extensions: ["jsx", "tsx", "mdx"],
      onRoutesGenerated(
        routes: Route[]
      ): Route[] | void | Promise<Route[] | void> {
        return routes.map((route: Route) => {
          if (!route.meta) route.meta = {};

          // save the original path to the file
          // it's a function in src/main
          // unused in this code
          route.meta.pageFilePath = route.component;

          // set props getter to 'index', 'hi/[name], '[...all]', etc
          route.meta.propsGetter = pathToName(route.component);

          // copied from src/main, but ideally it's not needed
          // route.path = route.path.includes("*") ? "*" : route.path;

          return route;
        });
      },
    }),

    // https://github.com/antfu/vite-plugin-windicss
    // @ts-ignore
    WindiCSS.default({
      safelist: "prose prose-sm m-auto",
    }),
  ],

  optimizeDeps: {
    include: ["@mdx-js/react", "@react-icons/all-files"],
    exclude: [],
  },
});
