/** @type {import('next').NextConfig} */
const nextConfig = {
    async headers() {
        return [
            {
                // matching all API routes
                source: "/api/:path*",
                headers: [
                    { key: "Access-Control-Allow-Credentials", value: "true" },
                    { key: "Access-Control-Allow-Origin", value: "http://localhost:4041" }, // replace this your actual origin
                    { key: "Access-Control-Allow-Methods", value: "GET,DELETE,PATCH,POST,PUT" },
                    { key: "Access-Control-Allow-Headers", value: "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version" },
                ],
            }
        ]
    },
    webpack(config) {
        // Modify webpack configuration
        config.resolve = {
          ...config.resolve,
          fallback: {
            fs: false, // Configure webpack to ignore 'fs' module
            path: false, // Configure webpack to ignore 'path' module
            os: false, // Configure webpack to ignore 'os' module
          }
        };
        return config;
      }
};

export default nextConfig;
