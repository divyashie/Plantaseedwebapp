/**
 * OAuth callback for Sveltia CMS with GitHub
 * Matches the official sveltia-cms-auth postMessage protocol
 */

export default async function handler(req, res) {
  const { code } = req.query;
  const provider = 'github';

  if (!code) {
    return sendResponse(res, provider, { error: 'Failed to receive an authorization code.' });
  }

  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;

  if (!clientId || !clientSecret) {
    return sendResponse(res, provider, { error: 'OAuth app credentials are not configured.' });
  }

  let tokenResponse;

  try {
    tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code,
        client_id: clientId,
        client_secret: clientSecret,
      }),
    });
  } catch {
    return sendResponse(res, provider, { error: 'Failed to request an access token.' });
  }

  try {
    const { access_token: token, error } = await tokenResponse.json();

    if (error || !token) {
      return sendResponse(res, provider, { error: error || 'No access token received.' });
    }

    return sendResponse(res, provider, { token });
  } catch {
    return sendResponse(res, provider, { error: 'Received malformed response from GitHub.' });
  }
}

function sendResponse(res, provider, { token, error }) {
  const state = error ? 'error' : 'success';
  const content = error
    ? JSON.stringify({ provider, error })
    : JSON.stringify({ provider, token });

  const html = `<!doctype html><html><body>
<p id="msg" style="font-family:sans-serif;padding:20px;">Completing authentication...</p>
<script>
(() => {
  var msg = document.getElementById('msg');

  if (!window.opener) {
    msg.textContent = 'Error: Could not connect to CMS window. Please make sure popups are allowed, then close this window and try again.';
    return;
  }

  msg.textContent = 'Sending credentials to CMS...';

  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:${provider}') {
      window.opener.postMessage(
        'authorization:${provider}:${state}:${content}',
        origin
      );
      msg.textContent = 'Authentication complete! This window should close automatically.';
      setTimeout(() => window.close(), 1000);
    }
  });

  window.opener.postMessage('authorizing:${provider}', '*');

  // If no response after 5 seconds, show status
  setTimeout(() => {
    if (msg.textContent === 'Sending credentials to CMS...') {
      msg.textContent = 'Waiting for CMS to respond... If this takes too long, close this window and try again.';
    }
  }, 5000);
})();
</script>
</body></html>`;

  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  return res.send(html);
}
