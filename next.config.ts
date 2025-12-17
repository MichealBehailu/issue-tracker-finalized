import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  async headers(){ //this will fix the issue if the avatar is not loading or puts ? on it
    return[
        {
          source : '/:path*',
          headers:[
            {key: 'referrer-policy', value:'no-referrer'}
          ]
        }
    ]
  }
  ,images: { //to get the avatar image with put getting bloked by the nextjs since it is latest version
    domains: ["lh3.googleusercontent.com"],
  },
};

export default nextConfig;
