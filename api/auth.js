/**
 * OAuth endpoint for Sveltia/Decap CMS with GitHub
 * Uses client-side redirect to preserve window.opener reference
 */

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const siteUrl = process.env.SITE_URL || 'https://plantaseed.store';
  const redirectUri = `${siteUrl}/api/callback`;
  const authUrl = `https://github.com/login/oauth/authorize?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&scope=repo,user`;

  // Use client-side redirect to preserve window.opener
  const html = `<!DOCTYPE html>
<html>
<head><title>Redirecting to GitHub...</title></head>
<body>
<p>Redirecting to GitHub for authentication...</p>
<script>window.location.href = ${JSON.stringify(authUrl)};</script>
</body>
</html>`;

  res.setHeader('Content-Type', 'text/html');
  res.send(html);
}
