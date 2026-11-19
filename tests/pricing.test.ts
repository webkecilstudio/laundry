import assert from "node:assert/strict";
import test from "node:test";
import { calculateEstimate } from "../src/lib/data.ts";

test("reguler clamps to minimum 3 kg", () => {
  const estimate = calculateEstimate("reguler", 1, false);
  assert.equal(estimate.qty, 3);
  assert.equal(estimate.subtotal, 21000);
  assert.equal(estimate.freeShip, false);
});

test("express applies first-order discount", () => {
  const estimate = calculateEstimate("express", 3, true);
  assert.equal(estimate.subtotal, 36000);
  assert.equal(estimate.discount, 7200);
  assert.equal(estimate.total, 28800);
  assert.equal(estimate.freeShip, true);
});

test("premium counts pieces", () => {
  const estimate = calculateEstimate("premium", 2, false);
  assert.equal(estimate.qty, 2);
  assert.equal(estimate.subtotal, 70000);
});
