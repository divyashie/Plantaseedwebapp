/**
 * OAuth endpoint for Sveltia CMS with GitHub
 * Matches the official sveltia-cms-auth protocol
 */

export default function handler(req, res) {
  const clientId = process.env.GITHUB_CLIENT_ID;

  if (!clientId) {
    // Return error using the same postMessage protocol as the callback
    const content = JSON.stringify({ provider: 'github', error: 'OAuth app client ID is not configured.' });
    const html = `<!doctype html><html><body><script>
(() => {
  window.addEventListener('message', ({ data, origin }) => {
    if (data === 'authorizing:github') {
      window.opener?.postMessage('authorization:github:error:' + ${JSON.stringify(content)}, origin);
    }
  });
  window.opener?.postMessage('authorizing:github', '*');
})();
</script></body></html>`;
    res.setHeader('Content-Type', 'text/html;charset=UTF-8');
    return res.send(html);
  }

  const params = new URLSearchParams({
    client_id: clientId,
    scope: 'repo,user',
  });

  // Use 302 redirect (matching the official sveltia-cms-auth behavior)
  res.setHeader('Location', `https://github.com/login/oauth/authorize?${params.toString()}`);
  return res.status(302).end();
}
