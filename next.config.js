const withPWA = require("next-pwa")({
  dest: "public",
  register: true,
  skipWaiting: true,
  disable: process.env.NODE_ENV === "development",
});

const nodeExternals = require("webpack-node-externals"); // Import webpack-node-externals

module.exports = withPWA({
  reactStrictMode: true,

  webpack: (config, { isServer }) => {
    // Exclude problematic module from server-side build
    if (isServer) {
      config.externals = [
        nodeExternals({
          allowlist: ["d3-interpolate"], // Update this line
        }),
      ];
    }

    // ... Other webpack rules and configuration
    return config;
  },
});
