if [ ! -f "../CLAUDE.md" ]; then
    echo "Symlinking AGENTS.md to CLAUDE.md"
    ln -s ${PWD}/../AGENTS.md ../CLAUDE.md
fi

if [ ! -d "../.claude" ]; then
    echo "Creating .claude directory"
    mkdir -p ../.claude
fi

if [ ! -d "../.claude/skills" ]; then
    echo "Symlinking .agents/skills to .claude/skills"
    ln -s ${PWD}/../.agents/skills ${PWD}/../.claude/skills
fi