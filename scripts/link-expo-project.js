// Used by the publish workflow after `eas init`: points updates at the
// project's EAS Update URL so Expo Go can load them.
const fs = require('fs');

const path = 'app.json';
const config = JSON.parse(fs.readFileSync(path, 'utf8'));
const projectId = config.expo.extra?.eas?.projectId;
if (!projectId) {
  console.error('No extra.eas.projectId in app.json. Run `eas init` first.');
  process.exit(1);
}
config.expo.updates = { ...config.expo.updates, url: `https://u.expo.dev/${projectId}` };
config.expo.runtimeVersion = { policy: 'sdkVersion' };
fs.writeFileSync(path, JSON.stringify(config, null, 2) + '\n');
console.log(`Linked to EAS project ${projectId}`);
