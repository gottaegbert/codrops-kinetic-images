import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const nextConfig = {
    output: 'export',
    reactStrictMode: true,
    swcMinify: true,
    trailingSlash: true,
    images: {
        unoptimized: true
    },
    sassOptions: {
        additionalData: `
        $env: ${process.env.NODE_ENV};
    `,
        includePaths: [path.join(__dirname, 'src', 'styles', 'global')],
        quietDeps: true,
        api: 'modern-compiler',
        silenceDeprecations: [
            'legacy-js-api',
            'color-functions',
            'global-builtin',
            'import',
        ],
    },
    experimental: {
        turbo: {
            rules: {
                '*.{glsl,vert,frag,vs,fs}': {
                    loaders: ['raw-loader', 'glslify-loader'],
                    as: '*.js',
                },
            },
        },
    },
    webpack(config) {
        // shader support
        config.module.rules.push({
            test: /\.(glsl|vs|fs|vert|frag)$/,
            exclude: /node_modules/,
            use: ['raw-loader', 'glslify-loader'],
        });

        return config;
    },
    eslint: {
        // TODO: Temporary fix, disable later
        ignoreDuringBuilds: true,
    },
    async redirects() {
        // Only redirect to local studio in development mode
        if (process.env.NODE_ENV === 'development') {
            return [
                {
                    source: '/studio',
                    destination: 'http://localhost:3333',
                    permanent: false,
                    basePath: false
                },
                {
                    source: '/studio/:path*',
                    destination: 'http://localhost:3333/:path*',
                    permanent: false,
                    basePath: false
                }
            ];
        }
        return [];
    },
};

export default nextConfig;
