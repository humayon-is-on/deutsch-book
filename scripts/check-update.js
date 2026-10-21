// Diagnostics: fetches the live update for a platform and checks that the
// bundle and every asset download and match their hashes.
const { Buffer } = require('buffer');
const crypto = require('crypto');

const [projectId, platform = 'android'] = process.argv.slice(2);
const url = `https://u.expo.dev/${projectId}?channel-name=main&runtime-version=exposdk:57.0.0`;

(async () => {
  const res = await fetch(url, {
    headers: {
      'expo-platform': platform,
      'expo-runtime-version': 'exposdk:57.0.0',
      'expo-channel-name': 'main',
      'expo-protocol-version': '1',
      accept: 'multipart/mixed,application/expo+json,application/json',
    },
  });
  const text = await res.text();
  console.log('manifest', res.status, res.headers.get('content-type'));
  const manifest = JSON.parse(text.match(/\{"id".*\}/)[0]);
  const all = [{ ...manifest.launchAsset, launch: true }, ...manifest.assets];
  let bad = 0;
  for (const a of all) {
    const r = await fetch(a.url);
    const buf = Buffer.from(await r.arrayBuffer());
    const hash = crypto.createHash('sha256').update(buf).digest('base64url');
    const ok = r.ok && hash === a.hash;
    if (!ok || a.launch) {
      console.log(ok ? 'OK ' : 'BAD', r.status, a.contentType, buf.length, 'bytes', a.launch ? '(bundle)' : '', ok ? '' : `expected ${a.hash} got ${hash}`, a.url);
    }
    if (!ok) bad++;
  }
  if (manifest.launchAsset) {
    const r = await fetch(manifest.launchAsset.url);
    const head = (await r.text()).slice(0, 200);
    console.log('bundle starts with:', JSON.stringify(head));
  }
  console.log(`${all.length} files checked, ${bad} bad`);
  process.exit(bad ? 1 : 0);
})();
