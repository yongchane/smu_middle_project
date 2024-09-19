module.exports = {
  async rewrites() {
    return [
      {
        source: "/api/proxy/:id",
        destination: "http://121.185.8.167:9090/boards/:id",
      },
      // {
      //   source: "/api/proxy/:id/comments",
      //   destination: "http://121.185.8.167:9090/boards/:id/comments",
      // },
    ];
  },

  reactStrictMode: true,

  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
