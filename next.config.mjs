import path from "path";

const nextConfig = {
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

export default nextConfig;
