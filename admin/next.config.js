/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      '',
      'images.pexels.com',
      'localhost',
      'res.cloudinary.com',
      'img.freepik.com',
      'lh3.googleusercontent.com',
      'avatars.githubusercontent.com',
    ],
  },
  ssg: false,
  exportPathMap: null,
}

module.exports = nextConfig
