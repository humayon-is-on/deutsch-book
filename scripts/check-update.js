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
  // Split the multipart response into its named parts (manifest, extensions).
  const boundary = res.headers.get('content-type').match(/boundary=([^;]+)/)?.[1];
  const parts = {};
  for (const chunk of boundary ? text.split(`--${boundary}`) : []) {
    const name = chunk.match(/name="([^"]+)"/)?.[1];
    const body = chunk.slice(chunk.indexOf('\r\n\r\n') + 4).trim();
    try {
      if (name) parts[name] = JSON.parse(body);
    } catch {
      parts[name] = body.slice(0, 80);
    }
  }
  const manifest = parts.manifest ?? JSON.parse(text);
  // Newer EAS servers hand out per-asset auth headers in the manifest's
  // extensions; clients must send them or the CDN answers 403.
  const assetHeaders = parts.extensions?.assetRequestHeaders ?? {};
  console.log('parts:', Object.keys(parts), 'extensions:', JSON.stringify(parts.extensions ?? null).slice(0, 300));
  const all = [{ ...manifest.launchAsset, launch: true }, ...manifest.assets];
  let bad = 0;
  for (const a of all) {
    const r = await fetch(a.url, { headers: assetHeaders[a.key] ?? {} });
    const buf = Buffer.from(await r.arrayBuffer());
    const hash = crypto.createHash('sha256').update(buf).digest('base64url');
    const ok = r.ok && hash === a.hash;
    if (!ok || a.launch) {
      console.log(ok ? 'OK ' : 'BAD', r.status, a.contentType, buf.length, 'bytes', a.launch ? '(bundle)' : '', ok ? '' : `expected ${a.hash} got ${hash}`, a.url);
    }
    if (!ok) bad++;
  }
  if (manifest.launchAsset) {
    const r = await fetch(manifest.launchAsset.url, { headers: assetHeaders[manifest.launchAsset.key] ?? {} });
    const head = (await r.text()).slice(0, 200);
    console.log('bundle starts with:', JSON.stringify(head));
  }
  console.log(`${all.length} files checked, ${bad} bad`);
  process.exit(bad ? 1 : 0);
})();
