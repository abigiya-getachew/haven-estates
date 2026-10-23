/**
 * Project path safety.
 *
 * Tailwind CSS v4, Next.js, and Vite all resolve modules and stylesheets
 * through URL-like paths, where `#` starts a fragment. A project directory
 * that contains such a character cannot be built or tested, because the
 * resolved path is truncated at that character.
 *
 * The check runs before any expensive work so the failure explains itself
 * instead of surfacing as an unrelated loader stack trace.
 */

/** Characters that are unsafe in a URL path segment. */
const UNSAFE_PATH_CHARACTERS = /[#?%\s]/;

/** Returns the first unsafe character in the path, or `null` when the path is safe. */
export function findUnsafePathCharacter(projectPath) {
  for (const character of projectPath) {
    if (UNSAFE_PATH_CHARACTERS.test(character)) {
      return character;
    }
  }
  return null;
}

/** Builds a path that is safe to use, replacing unsafe characters with a dash. */
export function toSafePath(projectPath) {
  return projectPath
    .split("")
    .map((character) => (UNSAFE_PATH_CHARACTERS.test(character) ? "-" : character))
    .join("");
}

/**
 * Exits with an actionable message when the project path cannot be resolved
 * by the toolchain.
 */
export function assertSafeProjectPath(projectPath = process.cwd()) {
  const character = findUnsafePathCharacter(projectPath);

  if (!character) {
    return;
  }

  const suggestion = toSafePath(projectPath);

  console.error(
    [
      "",
      `This project cannot be built from its current location because the path contains "${character}".`,
      "",
      `  Current path: ${projectPath}`,
      `  Suggested:    ${suggestion}`,
      "",
      "Tailwind CSS v4, Next.js, and Vite resolve modules and stylesheets through",
      "URL-like paths, where this character starts a fragment, so the resolved path",
      "is truncated and the build fails before it starts.",
      "",
      "Move the repository and continue:",
      "",
      `  mv ${JSON.stringify(projectPath)} ${JSON.stringify(suggestion)}`,
      "",
      "Git history moves with the directory. Reopen the project at its new location",
      "after moving it.",
      "",
    ].join("\n"),
  );

  process.exit(1);
}
