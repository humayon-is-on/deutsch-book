// Diagnostics: signs up a throwaway account, saves and reads progress the
// way the app does, then deletes the account again. Proves the tables,
// row-level security and delete function work with the public key.
const [url, key] = [process.env.SUPABASE_URL, process.env.SUPABASE_ANON_KEY];
if (!url || !key) {
  console.log('SUPABASE_URL / SUPABASE_ANON_KEY not set, skipping');
  process.exit(0);
}

const call = async (path, { token, ...init } = {}) => {
  const res = await fetch(`${url}${path}`, {
    ...init,
    headers: { apikey: key, 'content-type': 'application/json', authorization: `Bearer ${token ?? key}`, ...init.headers },
  });
  const text = await res.text();
  return { status: res.status, body: text ? JSON.parse(text) : null };
};

(async () => {
  const email = `check-${Date.now()}@example.com`;
  const signUp = await call('/auth/v1/signup', { method: 'POST', body: JSON.stringify({ email, password: 'check-password-123' }) });
  const token = signUp.body?.access_token;
  const userId = signUp.body?.user?.id;
  console.log('sign up', signUp.status, token ? 'got session' : JSON.stringify(signUp.body).slice(0, 300));
  if (!token) process.exit(1);

  const data = { version: 1, level: 'A1', updatedAt: Date.now() };
  const save = await call('/rest/v1/user_progress', {
    method: 'POST',
    token,
    headers: { prefer: 'resolution=merge-duplicates' },
    body: JSON.stringify({ user_id: userId, data }),
  });
  console.log('save progress', save.status, save.status < 300 ? '' : JSON.stringify(save.body));

  const read = await call(`/rest/v1/user_progress?select=data&user_id=eq.${userId}`, { token });
  console.log('read progress', read.status, JSON.stringify(read.body));

  const anon = await call(`/rest/v1/user_progress?select=data&user_id=eq.${userId}`);
  console.log('read without signing in (should be empty)', anon.status, JSON.stringify(anon.body));

  const del = await call('/rest/v1/rpc/delete_my_account', { method: 'POST', token, body: '{}' });
  console.log('delete account', del.status, del.status < 300 ? '' : JSON.stringify(del.body));

  const ok = save.status < 300 && read.body?.[0]?.data?.level === 'A1' && anon.body?.length === 0 && del.status < 300;
  console.log(ok ? 'ACCOUNTS OK' : 'ACCOUNTS BROKEN');
  process.exit(ok ? 0 : 1);
})();
