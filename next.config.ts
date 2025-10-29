import path from 'path';
import type { NextConfig } from 'next';

const ICON_DIR = path.resolve(__dirname, 'src/shared/icons/source');

const nextConfig: NextConfig = {
  reactStrictMode: true,
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
