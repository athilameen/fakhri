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
    }

}

module.exports = nextConfig
