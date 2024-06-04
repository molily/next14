import * as path from "node:path";

import { fileURLToPath } from "node:url";

const __dirname =
  import.meta.dirname || path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config, context) => {
    console.log("config.module.rules:", config.module.rules);

    const mappedRules = config.module.rules.map((rule) => {
      // Disable next-image-loader for SVG files
      if (rule.loader === "next-image-loader") {
        // console.log("MUTATE RULE", rule);
        return {
          ...rule,
          // Remove .svg from RegExp
          test: /\.(png|jpg|jpeg|gif|webp|avif|ico|bmp)$/i,
        };
      }
      return rule;
    });

    const svgPath = path.resolve(__dirname, "../components");
    console.log("svgPath", svgPath);

    return {
      ...config,

      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          "@components": path.resolve(__dirname, "../components"),
        },
      },

      module: {
        rules: [
          ...mappedRules,
          // Allow to import SVGs with ?url resource query
          // "asset/resource emits a separate file and exports the URL."
          // https://webpack.js.org/guides/asset-modules/
          {
            // include: svgPath,
            resourceQuery: /url/,
            test: /.svg$/,
            /**
             * @param {string} item
             */
            test: (item) => {
              const matched = /.svg$/.test(item);
              if (matched) console.log("MATCH", item);
              return matched;
            },
            type: "asset/resource",
          },

          {
            resourceQuery: /url/,
            test: /.txt$/,
            type: "asset/resource",
          },
        ],
      },
    };
  },
};

export default nextConfig;
