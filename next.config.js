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
                    value: '',
                  },
                ],
                permanent: false,
                destination: '/user',
            },
        ]
    }

}

module.exports = nextConfig
