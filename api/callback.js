/**
 * OAuth callback for Sveltia/Decap CMS with GitHub
 * Uses the official Netlify CMS/Decap CMS OAuth handshake protocol
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
      const html = `<!DOCTYPE html><html><body>
<script>
  if (window.opener) {
    window.opener.postMessage("authorization:github:error:" + ${JSON.stringify(JSON.stringify({ message: data.error_description || data.error }))}, "*");
  }
  document.body.textContent = "Error: ${data.error_description || data.error}";
</script>
</body></html>`;
      res.setHeader('Content-Type', 'text/html');
      return res.send(html);
    }

    const token = data.access_token;

    // Use the official CMS OAuth handshake protocol:
    // 1. Send "authorizing:github" to opener
    // 2. Wait for opener to respond (confirming it's listening)
    // 3. Send "authorization:github:success:{token}" using the origin from opener's response
    const html = `<!DOCTYPE html>
<html>
<head><title>CMS Authentication</title></head>
<body>
<p id="status">Completing authentication...</p>
<script>
(function() {
  var statusEl = document.getElementById("status");
  var token = ${JSON.stringify(token)};
  var provider = "github";

  if (!window.opener) {
    statusEl.textContent = "Error: No popup opener found. Make sure popups are allowed for this site.";
    return;
  }

  // Step 1: Listen for the CMS to respond
  function receiveMessage(e) {
    console.log("receiveMessage", e);
    // Step 2: Send the token back to the CMS using the origin from the message
    window.opener.postMessage(
      "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
      e.origin
    );
    window.removeEventListener("message", receiveMessage, false);
    statusEl.textContent = "Authentication successful! This window will close.";
    setTimeout(function() { window.close(); }, 1000);
  }

  window.addEventListener("message", receiveMessage, false);

  // Step 0: Signal to the CMS that we're authorizing
  window.opener.postMessage("authorizing:" + provider, "*");

  // Fallback: if no response after 5 seconds, try sending directly
  setTimeout(function() {
    window.opener.postMessage(
      "authorization:" + provider + ":success:" + JSON.stringify({ token: token, provider: provider }),
      "*"
    );
    statusEl.textContent = "Authentication sent. You may close this window.";
    setTimeout(function() { window.close(); }, 1000);
  }, 5000);
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
