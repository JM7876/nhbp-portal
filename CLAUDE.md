# NHBP Portal — Claude Code Config

## Project Location
This repo lives at: /Users/johnathonmoulds/Projects/nhbp-portal
NEVER look in ~/Downloads/ or ~/Desktop/ for project files.

## Key Paths
- Forms: src/components/forms/
- Shared components: src/components/shared/
- Theme tokens: src/theme.jsx (always use FC object)
- Constants: src/constants/
- Utils: src/utils/

## Rules
- Always import { FC } from "../../theme" and use const C = FC
- Match existing form patterns (VisualDesignForm.jsx is the reference)
- Commit messages end with: "Created and Authored by Johnathon Moulds with Assistance by Claude Opus 4.6"
- Push directly to main, no branches, no PRs
- Run npm run build before pushing
