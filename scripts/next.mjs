#!/usr/bin/env node
/**
 * Next.js CLI launcher.
 *
 * Runs the Next.js CLI with the project defaults, after checking that the
 * project path can be resolved by the toolchain. Next.js 16 uses Turbopack
 * by default, which is kept for every path that supports it.
 *
 * Usage: node scripts/next.mjs <next arguments...>
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";

import { assertSafeProjectPath } from "./lib/path-safety.mjs";

const require = createRequire(import.meta.url);

assertSafeProjectPath();

const nextBin = require.resolve("next/dist/bin/next");
const args = process.argv.slice(2);

const child = spawn(process.execPath, [nextBin, ...args], {
  stdio: "inherit",
  env: process.env,
});

child.on("exit", (code, signal) => {
  if (signal) {
    process.kill(process.pid, signal);
    return;
  }
  process.exit(code ?? 0);
});
