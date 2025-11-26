import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/uploads/**",
      },
    ],
    // Разрешить приватные IP-адреса (для разработки)
    dangerouslyAllowSVG: true,
    unoptimized: true, // Отключить оптимизацию для локальных изображений
  },
};


export default nextConfig;

