/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    images: {
        unoptimized: true
    },
    webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
        config.module.rules.push({
          test: /\.webm$/,
          use: [
              {
                  loader: 'url-loader',
                  options: {
                      limit: 10000,
                      mimetype : 'video/webm'
                  }
              }
          ]
        });
        config.module.rules.push({
            test: /\.mp4$/,
            use: [
                {
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        mimetype : 'video/mp4'
                    }
                }
            ]
          });
    
        // Important: return the modified config
        return config;
      },
}

module.exports = nextConfig