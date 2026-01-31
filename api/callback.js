/**
 * OAuth callback endpoint for Decap CMS with GitHub
 */

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('No code provided');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        client_id: process.env.GITHUB_CLIENT_ID,
        client_secret: process.env.GITHUB_CLIENT_SECRET,
        code,
      }),
    });

    const data = await tokenResponse.json();

    if (data.error) {
      return res.status(400).send(`GitHub Error: ${data.error_description || data.error}`);
    }

    const token = data.access_token;

    // Send the token back to Decap CMS
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
</head>
<body>
  <p>Authenticating with GitHub...</p>
  <script>
    (function() {
      const token = "${token}";
      const provider = "github";

      if (window.opener) {
        window.opener.postMessage(
          "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
          "*"
        );
        setTimeout(function() { window.close(); }, 1000);
      } else {
        document.body.innerHTML = "<p>Authentication successful! You can close this window.</p>";
      }
    })();
  </script>
</body>
</html>
    `;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).send(`Authentication failed: ${error.message}`);
  }
}
