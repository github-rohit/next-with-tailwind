/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true, 
  images: {
    loader: 'custom'
 },
 env: {
   api_url: 'https://agreeable-bonnet-crow.cyclic.app/api/v1'
 }
}
