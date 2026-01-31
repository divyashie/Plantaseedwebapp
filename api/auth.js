/**
 * OAuth endpoint for Decap CMS with GitHub
 * This handles the initial OAuth redirect to GitHub
 */

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const redirectUri = `${process.env.SITE_URL || 'https://plantaseed.store'}/api/callback`;

  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  res.redirect(authUrl);
}
