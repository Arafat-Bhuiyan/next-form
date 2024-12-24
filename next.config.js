const path = require("path");

module.exports = {
  webpack(config) {
    config.resolve.alias["@"] = path.resolve(__dirname);
    return config;
  },
  async rewrites() {
    return [
      {
        source: "/data/:path*",
        destination: "/:path*",
      },
    ];
  },
};
