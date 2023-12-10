/** @type {import('next').NextConfig} */

const nextConfig = {

    async redirects() {
        return [
            {
                source: '/user',
                destination: '/profile',
                permanent: true,
            },
            {
                source: '/',
                has: [
                  {
                    type: 'cookie',
                    key: 'ITSOUTJWT',
                  },
                ],
                permanent: true,
                destination: '/profile',
            },
        ]
    },

    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'utfs.io',
            port: '',
            pathname: '**',
          },
        ],
    },
   
}

module.exports = nextConfig
