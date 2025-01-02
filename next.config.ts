/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "bpkxffywuvgukmowzdhy.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/**"
      }
    ]
  }
  // ...any other config
};

module.exports = nextConfig;
