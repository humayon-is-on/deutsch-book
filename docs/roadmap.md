# Roadmap and open decisions

Source: `german_learning_app_ai_friendly_spec.pdf`.

## Phase 1: core app (this codebase)

Done: onboarding and placement test, A1/A2/B1 content structure with sample content in all six modules, exercises with feedback, revision, bookmarks, progress tracking, Continue Learning, email accounts with sync, privacy controls (reset progress, delete account).

Still needed before release:

- Full course content for each level, written and reviewed by a qualified German teacher with a Bangla reviewer.
- Load published rows from `content_items` in the app so content can be updated without a release.
- Retry sync automatically after a failed first fetch (today it retries on next sign-in or app start).
- Bundle a Bangla web font (e.g. Noto Sans Bengali) if testing shows inconsistent rendering on some Android devices.
- App icons, splash screen and store listings.

## Phase 2: AI PDF practice (premium)

Planned design, matching the spec's rules:

1. The app picks a PDF (`expo-document-picker`) and uploads it to a private Supabase Storage bucket.
2. A Supabase Edge Function checks the user's `entitlements` row, validates the file (type, size limit), and extracts text. Scanned PDFs need OCR.
3. The function asks the AI provider (Claude via the Anthropic API is the main candidate) for MCQs grounded only in the extracted text, each with question, options, correct answer, explanation and page reference.
4. The app shows the quiz, scores it against the returned answer key, and saves results under the retention policy.

The provider key lives only in the Edge Function's secrets. No AI key is ever shipped in the app.

## Phase 3: advanced learning

Audio pronunciation, listening, speaking exercises, mock Goethe exams, personalised revision.

## Decisions still open (spec section 14)

| Topic | Current assumption in the code |
| --- | --- |
| English translations | Shown where useful; learner can hide them in Profile → Settings |
| Bangla/English interface switch | Interface is Bangla only for now |
| Sign-in methods | Email and password; Google/Apple can be added in Supabase |
| Content review workflow | `content_items.reviewed_by` column reserved; process not defined |
| AI provider, limits and cost | Not decided |
| PDF formats, max size, OCR, retention | Not decided |
| Premium pricing and trial | Not decided |
| Audio/listening/speaking in first release | Excluded |
