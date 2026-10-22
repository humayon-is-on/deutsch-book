// https://docs.expo.dev/guides/using-eslint/
const { defineConfig } = require('eslint/config');
const expoConfig = require('eslint-config-expo/flat');

module.exports = defineConfig([
  expoConfig,
  {
    ignores: ['dist/*', 'supabase/functions/*'],
  },
  {
    // The course is published as files and downloaded; the app must never bundle it.
    files: ['src/**'],
    rules: {
      'no-restricted-imports': ['error', { patterns: [{ group: ['**/content/levels*', '**/content/build*'], message: 'Course content is downloaded, not bundled. Use src/services/content.' }] }],
    },
  },
]);
