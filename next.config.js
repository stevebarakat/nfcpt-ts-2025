/** @type {import('next').NextConfig} */
module.exports = {
  productionBrowserSourceMaps: true,
  images: {
    // Add better error handling for images
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: `*/**`,
      },
      {
        protocol: "https",
        hostname: "nfcpt.ts",
        port: "",
        pathname: `*/**`,
      },
      {
        protocol: "https",
        hostname: "old.northfloridachiropracticphysicaltherapy.com",
        port: "",
        pathname: `**/*`,
      },
      {
        protocol: "https",
        hostname: "www.northfloridachiropracticphysicaltherapy.com",
        port: "",
        pathname: `**/*`,
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
        port: "",
        pathname: `**/*`,
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: `**/*`,
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: `**/*`,
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8080",
        pathname: `/wp-content/uploads/**/*`,
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        port: "",
        pathname: `**/*`,
      },
    ],
  },
};
