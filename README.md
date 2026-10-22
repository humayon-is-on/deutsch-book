# Deutsch Book

A mobile app that teaches German to Bangla speakers, from A1 to B1. Explanations are in Bangla, examples are in German with Bangla translations, and English appears where it helps.

Built with Expo SDK 57 (React Native + TypeScript) for Android and iOS, with Supabase for accounts and progress sync.

## What's in Phase 1

- **Onboarding:** pick A1, A2 or B1 yourself, or take a 12-question placement test (MCQ + fill-in-the-blank) that recommends a level.
- **Topics unlock in order:** the five modules are always open, but inside each module a topic opens only after the topic before it is finished. A topic is finished by passing the short test at its end (60%, `TOPIC_PASS` in `src/content/topics.ts`); an exercise is its own test. The tests are stand-ins built from each topic's own material until each module gets its own kind of test.
- **One level at a time:** the whole app shows only the learner's current level. Finishing every topic with a 95% best quiz score unlocks the next level; a manual level change is in Profile. Either way the new level starts from zero, after a warning.
- **Learn:** five modules per level: Grammar, Vocabulary, Exercises, Emails & Letters, Dialogues. Letter, email and dialogue tests have 6 questions: 3 on key phrases, 3 on what sentences of the text mean.
- **Practice:** MCQ and fill-in-the-blank exercises with instant feedback and Bangla explanations, a revision mode that replays every question you got wrong, and the placement test.
- **Progress:** last grammar lesson, learned and bookmarked words, vocabulary position, quiz answers and scores, unfinished quizzes (resume where you left off), and a Continue Learning button on Home.
- **Guests and accounts:** without signing in, progress lasts until the app (or browser tab) is closed. Guests see a warning banner, a sign-up reminder every 10 minutes, and an exit warning (Android Back on Home, the browser's leave-page prompt). Signing up carries the guest's progress into the new account; signing in to an existing account uses that account's progress instead, after a warning. Signed-in progress is cached on the device and synced to Supabase. Sign-out and account deletion return to the welcome screen.
- **PDF Practice:** placeholder screen for the Phase 2 premium feature.

Sample content is included for every module at every level. It is a starting set, not the full course, and needs review by a qualified German teacher before release.

## Run it

The project targets Expo SDK 57, the version the store builds of Expo Go support. Don't upgrade the SDK until Expo Go on the stores supports the newer one.

```bash
npm install
npx expo start        # then press a (Android), i (iOS) or w (web), or scan the QR code with Expo Go
npx expo start --tunnel ngrok   # if your phone is not on the same Wi-Fi as your computer
```

Optional backend:

1. Create a Supabase project.
2. Run `supabase/migrations/20261021000000_init.sql` in the SQL editor (or `supabase db push`).
3. Copy `.env.example` to `.env.local` and fill in the project URL and anon key.
4. For the hosted builds, add the same two values as the `SUPABASE_URL` and `SUPABASE_ANON_KEY` repository secrets; both GitHub Actions pass them to the app.

## Open it on a phone without a computer

Every push to `main` runs the **Publish to Expo Go** GitHub Action (needs the `EXPO_TOKEN` repository secret). Open the latest run under the repository's Actions tab and scan the QR code on its summary page with Expo Go.

## Android app (APK / Play Store)

Run the **Build Android app** action by hand from the Actions tab. Pick `preview` for an APK you can install on any Android phone, or `production` for the `.aab` file Google Play needs. The download link and QR code appear on the run's summary page when the build finishes. Installed builds also receive every push to `main` as an over-the-air update, as long as no new native module was added (adding one needs a new build).

For Google sign-in in the installed app, Supabase → Authentication → URL Configuration → Redirect URLs must include `deutschbook://**`.

The privacy policy and account-deletion pages that Google Play asks for are in `public/` and are served at `https://humayon-is-on.github.io/deutsch-book/privacy.html` and `.../delete-account.html`.

## Checks

```bash
npm run typecheck
npm run lint
npm test              # content integrity + placement scoring
```

## Project layout

```
src/app/            screens (Expo Router; every file is a route)
  (tabs)/           Home, Learn, Practice, Profile
src/features/       parked screens not in the app yet (premium PDF practice)
  onboarding/       welcome, level picker, placement test
  lesson/ vocab/ quiz/ read/   module screens
src/content/        content types, topic helpers, placement test (no course text)
src/services/content/  downloads, saves and prefetches course content
src/state/          auth and progress (local-first, synced to Supabase)
content/levels/     the course itself (a1*.ts, a2.ts, b1.ts), never bundled in the app
content/build.ts    turns the course into the published files
scripts/build-content.ts  writes those files (run by the web publish workflow)
src/components/     shared UI
supabase/           database schema and policies
docs/               product decisions and roadmap
```

## How course content reaches the app

The course is not inside the app. On every push to `main` the "Publish web app" workflow builds it into small JSON files next to the web app, at `https://humayon-is-on.github.io/deutsch-book/content/`:

- `manifest.json`: points to each level's current table of contents. It is the only file fetched fresh each time.
- `<level>/index.<version>.json`: the level's topics per module (titles, question and word ids), enough to draw lists, locks and progress.
- `<level>/<topic-id>.<hash>.json`: one topic's full content and its end test. The hash changes when the topic changes, so phones download it again only then.

The app loads the learner's level index on start (a saved copy works offline) and downloads a topic when it is opened. In the background it keeps, per module, the current topic and the next two, plus the last few opened, and deletes the rest. Switching level swaps all of it. `EXPO_PUBLIC_CONTENT_URL` points the app at another location (for example a local server).

Screens get the table of contents with `useLevelIndex()` and pass it to the helpers in `src/content/topics.ts` and `src/state/progress-rules.ts`; the helpers never read it from a global, so the React Compiler recomputes them when it changes. The app may not import `content/levels` or `content/build` (enforced by lint).

## Adding content

Add items to `content/levels/a1*.ts`, `a2.ts` or `b1.ts` following `src/content/types.ts`, then push. Ids must be unique and never change, because progress is stored by id. `npm test` checks ids, answer keys, end tests and the published files. Content changes reach phones without an app update.
