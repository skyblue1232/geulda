import path from 'path';
import type { NextConfig } from 'next';

const ICON_DIR = path.resolve(__dirname, 'src/shared/icons/source');

const nextConfig: NextConfig = {
  reactStrictMode: true,

  async redirects() {
    return [
      {
        source: '/',
        destination: '/main',
        permanent: false,
      },
    ];
  },

  images: {
    domains: [
      'maps.googleapis.com',
      'geulda-ai-video-bucket.s3.ap-southeast-2.amazonaws.com',
      'example.com',
    ],
    remotePatterns: [
      { protocol: 'https', hostname: 'mblogthumb-phinf.pstatic.net' },
      { protocol: 'https', hostname: 'blogfiles.pstatic.net' },
      { protocol: 'https', hostname: 'postfiles.pstatic.net' },
    ],
  },

  webpack: (config) => {
    const svgRule = config.module.rules.find(
      // @ts-ignore
      (rule) => rule.test && rule.test.test && rule.test.test('.svg'),
    );
    if (svgRule) {
      // @ts-ignore
      svgRule.exclude = [...(svgRule.exclude || []), ICON_DIR];
    }

    config.module.rules.push({
      test: /\.svg$/,
      include: [ICON_DIR],
      use: [
        {
          loader: require.resolve('svg-sprite-loader'),
          options: {
            symbolId: 'icon-[name]',
            extract: false,
          },
        },
      ],
    });

    return config;
  },
};

export default nextConfig;
