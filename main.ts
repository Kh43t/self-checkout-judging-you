// The Self-Checkout Is Judging You — make.fun entry.
//
// One funny line in the voice of a smug self-checkout machine, judging a
// shopper who bought twelve yoghurts and nothing else. The line is fixed
// and deterministic: the same string is written on every run, with no
// randomness, no clock reads, no environment reads beyond the output
// directory, and no network access, so two runs produce byte-identical
// output.
//
// Why this line: it is petty about the basket itself (twelve yogurts,
// no spoon, no plan, no personality), it lands on one read with a sting
// at the end ("giving up in bulk"), and it stays tight — every word earns
// its place. The "unexpected item in the bagging area" gag was rejected:
// it is the one self-checkout joke everybody has already heard.

import { chmodSync, mkdirSync, writeFileSync } from "node:fs";

// One judgmental self-checkout line (1-200 characters, UTF-8).
const line =
  "Twelve yogurts. No spoon, no plan, no personality — just twelve little tubs of you giving up in bulk.";

// The gate only accepts 1-200 characters, so refuse to write an over-long line.
const length = [...line].length;
if (length < 1 || length > 200) {
  throw new Error(`Self-checkout line must be 1-200 characters, got ${length}`);
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", line, "utf8");
// The grader collects the output as a different user, so the file must be
// readable by everyone (a default umask can leave it 0660 or tighter).
chmodSync("/output/entry.txt", 0o644);
