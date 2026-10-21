# Deutsch Book

A mobile app that teaches German to Bangla speakers, from A1 to B1. Explanations are in Bangla, examples are in German with Bangla translations, and English appears where it helps.

Built with Expo SDK 57 (React Native + TypeScript) for Android and iOS, with Supabase for accounts and progress sync.

## What's in Phase 1

- **Onboarding:** pick A1, A2 or B1 yourself, or take a 12-question placement test (MCQ + fill-in-the-blank) that recommends a level.
- **One level at a time:** the whole app shows only the learner's current level. Finishing every lesson with a 95% best quiz score unlocks the next level; a manual level change is in Profile. Either way the new level starts from zero, after a warning.
- **Learn:** six modules per level: Grammar, Vocabulary, Exercises, Questions & Answers, Emails & Letters, Dialogues.
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

## Checks

```bash
npm run typecheck
npm run lint
npm test              # content integrity + placement scoring
```

## Project layout

```
src/app/            screens (Expo Router; every file is a route)
  (tabs)/           Home, Learn, Practice, PDF, Profile
  onboarding/       welcome, level picker, placement test
  lesson/ vocab/ quiz/ read/   module screens
src/content/        learning content and its types (a1.ts, a2.ts, b1.ts, placement.ts)
src/state/          auth and progress (local-first, synced to Supabase)
src/components/     shared UI
supabase/           database schema and policies
docs/               product decisions and roadmap
```

## Adding content

Add items to `src/content/a1.ts`, `a2.ts` or `b1.ts` following `src/content/types.ts`. Ids must be unique and never change, because progress is stored by id. `npm test` checks ids, answer keys and links between lessons and exercises.

The `content_items` table is set up for managing content from the Supabase dashboard later, so material can be corrected without an app release.
