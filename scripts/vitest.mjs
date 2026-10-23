#!/usr/bin/env node
/**
 * Vitest launcher.
 *
 * Checks that the project path can be resolved by the toolchain before
 * starting the test runner.
 *
 * Usage: node scripts/vitest.mjs [vitest arguments...]
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import path from "node:path";

import { assertSafeProjectPath } from "./lib/path-safety.mjs";

const require = createRequire(import.meta.url);

assertSafeProjectPath();

const vitestPackagePath = require.resolve("vitest/package.json");
const vitestPackage = require(vitestPackagePath);
const vitestBin = path.join(path.dirname(vitestPackagePath), vitestPackage.bin.vitest);
const args = process.argv.slice(2);

const child = spawn(process.execPath, [vitestBin, ...args], {
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
