const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nodeExternals = require("webpack-node-externals");

module.exports = withPWA({
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals = [
        nodeExternals({
          allowlist: [
            "d3-interpolate",
            /@ant-design\/*/,
            /@antv\/*/,
            /d3-color/,
            /lodash-es/,
          ],
        }),
      ];
    }

    // ... Other webpack rules and configuration
    return config;
  },
});
