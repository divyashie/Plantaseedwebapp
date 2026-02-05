/**
 * OAuth callback for Sveltia CMS with GitHub
 * Matches the official sveltia-cms-auth postMessage protocol exactly
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

  // This script matches the official sveltia-cms-auth postMessage protocol:
  // 1. Listen for 'authorizing:github' from the CMS opener
  // 2. Send 'authorizing:github' to opener to signal readiness
  // 3. When CMS responds with 'authorizing:github', send the token using the CMS origin
  const html = `<!doctype html><html><body><script>
(() => {
  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:${provider}') {
      window.opener?.postMessage(
        'authorization:${provider}:${state}:${content}',
        origin
      );
    }
  });
  window.opener?.postMessage('authorizing:${provider}', '*');
})();
</script></body></html>`;

  res.setHeader('Content-Type', 'text/html;charset=UTF-8');
  return res.send(html);
}
