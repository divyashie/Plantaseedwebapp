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

    // Send the token back to Decap CMS using their expected format
    const html = `
<!DOCTYPE html>
<html>
<head>
  <title>Authenticating...</title>
</head>
<body>
  <p id="status">Authenticating with GitHub...</p>
  <script>
    (function() {
      var token = "${token}";
      var provider = "github";
      var message = "authorization:" + provider + ":success:" + JSON.stringify({token: token, provider: provider});

      var statusEl = document.getElementById("status");

      if (window.opener) {
        statusEl.textContent = "Sending credentials to CMS...";
        // Try posting to opener
        window.opener.postMessage(message, "*");
        statusEl.textContent = "Success! This window will close.";
        setTimeout(function() {
          window.close();
        }, 500);
      } else {
        statusEl.textContent = "Error: No opener window found. Please try again from the CMS.";
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
