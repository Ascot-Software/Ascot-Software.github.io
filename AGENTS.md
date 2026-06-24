# Task Execution Best Practices

1. Task Execution rules override all others.
2. Coding Best Practices override Component and Lib practices.
3. Templates are non-negotiable formats.
4. Plan your approach and identify which modules, components, and libraries will be involved,
5. Find and load any relevant skills that can help with the task
6. Provide a 3-5 bullet-point outline of your approach, naming specific files/components to be created or modified, before starting substantial or ambiguous tasks. Pause for feedback only when the user is explicitly asking for planning or approval.
7. Implement the task following the coding best practices outlined below. When rules overlap, prioritize this workflow section first, then Coding Best Practices, then Component and Lib guidance, then the templates.
8. Run relevant automated tests when the touched area has them, then run formatting, and type-checking
9. Always provide a brief in-chat summary of changes made when marking a task as complete.
10. Always provide a commit message (using the template) in your summary.
11. When work is split into multiple distinct tasks, confirm before starting the next one.

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

# Commit Message Template

Always use the following commit message template when marking a task as complete:

```md
# Short description of feature or task

- {Change 1}
- {Change 2} ...
- {Change N}
```

Example:

```md
# Initialize Next.js project with formatting and linting

- Set up Next.js with TypeScript
- Added initial folder structure
- Configured ESLint and Prettier
```
