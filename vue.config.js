module.exports = {
  publicPath:
    process.env.NODE_ENV === 'production'
      ? '/sw-planets/' // prod
      : '/', // dev
  outputDir: 'docs',
};
