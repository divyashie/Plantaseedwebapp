/**
 * OAuth callback endpoint for Sveltia/Decap CMS with GitHub
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
    const provider = 'github';

    const html = `<!DOCTYPE html>
<html>
<head><title>CMS Authentication</title></head>
<body>
<p id="status">Completing authentication...</p>
<script>
(function() {
  var token = ${JSON.stringify(token)};
  var provider = ${JSON.stringify(provider)};
  var payload = JSON.stringify({ token: token, provider: provider });
  var message = "authorization:" + provider + ":success:" + payload;
  var statusEl = document.getElementById("status");

  function sendMessage() {
    if (window.opener) {
      window.opener.postMessage(message, "*");
      statusEl.textContent = "Authentication successful! This window should close automatically.";
    } else {
      statusEl.textContent = "Authentication successful! Please close this window and return to the CMS.";
    }
  }

  // Send immediately and retry a few times
  sendMessage();
  setTimeout(sendMessage, 300);
  setTimeout(sendMessage, 1000);
  setTimeout(sendMessage, 2000);

  // Try to close after a delay
  setTimeout(function() { window.close(); }, 3000);
})();
</script>
</body>
</html>`;

    res.setHeader('Content-Type', 'text/html');
    return res.send(html);
  } catch (error) {
    console.error('OAuth error:', error);
    return res.status(500).send('Authentication failed: ' + error.message);
  }
}
