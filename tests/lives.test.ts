/// <reference types="node" />
import assert from 'node:assert/strict';
import { test } from 'node:test';

import { changeLives, currentLives, LIVES_MAX, LIVES_REFILL_MS } from '../src/state/lives';

test('lives: full to start, a mistake costs one, an ad gives one back', () => {
  assert.equal(currentLives(undefined, 0).count, LIVES_MAX);
  let l = changeLives(undefined, -1, 1000);
  assert.deepEqual(l, { count: 4, at: 1000 });
  for (let i = 0; i < 10; i++) l = changeLives(l, -1, 2000);
  assert.equal(currentLives(l, 2000).count, 0);
  l = changeLives(l, 1, 3000);
  assert.equal(currentLives(l, 3000).count, 1);
});

test('lives: one star comes back per refill period, keeping time already waited', () => {
  const l = { count: 0, at: 0 };
  assert.equal(currentLives(l, LIVES_REFILL_MS - 1).count, 0);
  assert.equal(currentLives(l, LIVES_REFILL_MS).count, 1);
  assert.equal(currentLives(l, LIVES_REFILL_MS * 2.5).nextAt, LIVES_REFILL_MS * 3);
  assert.equal(currentLives(l, LIVES_REFILL_MS * 99).count, LIVES_MAX);
  // A mistake halfway to the next star doesn't restart the wait.
  const after = changeLives({ count: 2, at: 0 }, -1, LIVES_REFILL_MS / 2);
  assert.deepEqual(after, { count: 1, at: 0 });
});
