/** @type {import('next').NextConfig} */
const nextConfig = {
    env: {
        PUBLIC_NEXT_API: process.env.PUBLIC_NEXT_API,
        PUBLIC_NEXT_TETRIS: process.env.PUBLIC_NEXT_TETRIS
    }
};

export default nextConfig;
