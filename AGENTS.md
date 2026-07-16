# Task Execution Best Practices

1. Task Execution rules override all others.
2. Templates are non-negotiable formats.
3. Plan your approach and identify which modules, components, and libraries will be involved,
4. Find and load any relevant skills that can help with the task
5. Provide a 3-5 bullet-point outline of your approach, naming specific files/components to be created or modified, before starting substantial or ambiguous tasks. Pause for feedback only when the user is explicitly asking for planning or approval.
6. Implement the task following the coding best practices outlined below. When rules overlap, prioritize this workflow section first, then Coding Best Practices, then Component and Lib guidance, then the templates.
7. Run relevant automated tests when the touched area has them, then run formatting, and type-checking
8. Always provide a brief in-chat summary of changes made when marking a task as complete.
9. Always provide a commit message (using the template) in your summary.
10. When work is split into multiple distinct tasks, confirm before starting the next one.

# Coding Convensions

- Maintain existing code structure and organization.
- Keep modules cohesive and separate unrelated responsibilities when a file or component starts mixing concerns.
- Make sure everything is properly documented.

# Behavior Best Practices

## Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

# Commit Messages

we use `standard-version` for versioning and changelog generation, which relies on Conventional Commits. All commit messages must follow the Conventional Commit format:

```md
<type>(<scope>): <short description>

- <change 1>
- <change 2> ...
- <change N>
```

The types can be one of the following:

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `build`: Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm)
- `ci`: Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs)
- `chore`: Other changes that don't modify src or test files (e.g., build process, package manager configs, etc)

Important: `feat` and `fix` commits will trigger a new version bump (feat: MINOR, fix: PATCH), while the other types will not. Use `chore` for changes that do not modify src or test files (e.g., build process, package manager configs, etc).

```md
build(init): Initialize Next.js project with formatting and linting

- Set up Next.js with TypeScript
- Added initial folder structure
- Configured ESLint and Prettier
```
