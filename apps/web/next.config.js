const { loadEnvConfig } = require('@next/env');
const path = require('path');

const rootDir = path.resolve(__dirname, '../../');
loadEnvConfig(rootDir);

/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001',
    NEXT_PUBLIC_USE_MOCK: process.env.NEXT_PUBLIC_USE_MOCK || 'false',
  },
};

module.exports = nextConfig;
