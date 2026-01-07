import fs from "fs";
import dotenv from "dotenv";

const envFile = `.env.${process.env.NODE_ENV}`;

if (fs.existsSync(envFile)) {
  dotenv.config({ path: envFile });
}

const nextConfig = {
  reactStrictMode: true,
};

export default nextConfig;
