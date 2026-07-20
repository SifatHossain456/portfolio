/** @type {import('next').NextConfig} */
const isGithubPages = process.env.DEPLOY_TARGET === "github-pages";
const repoName = "portfolio";

const nextConfig = {
  reactStrictMode: true,
  typescript: {
    // R3F/postprocessing have known React 18/19 type conflicts that don't affect runtime
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  ...(isGithubPages
    ? {
        output: "export",
        basePath: `/${repoName}`,
        assetPrefix: `/${repoName}/`,
        images: { unoptimized: true },
      }
    : {
        images: {
          remotePatterns: [
            {
              protocol: "https",
              hostname: "avatars.githubusercontent.com",
            },
            {
              protocol: "https",
              hostname: "opengraph.githubassets.com",
            },
          ],
        },
      }),
};

export default nextConfig;