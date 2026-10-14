/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.SITE_URL || 'https://www.altafdevelopments.com',
  generateRobotsTxt: true,
  // Old Articles URLs are permanent redirects and must not be indexed as pages.
  exclude: ['/media/articles', '/media/articles/*'],
  sitemapSize: 5000,
  changefreq: 'daily',
  priority: 0.7,
};
