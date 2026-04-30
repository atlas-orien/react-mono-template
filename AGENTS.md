# Repository Agent Instructions

@/Users/ancient/.codex/RTK.md

This repository is protocol-driven. The root `AGENTS.md` is the Codex entry point. Before answering architecture questions or editing code, read the protocol index below and then read the matching protocol files for the task.

## Required First Reads

1. `agent_protocol/PROTOCOL.md`
2. `agent_protocol/BUILD_RULES.md`

## Protocol Directory

All AI-facing repository protocols live under `agent_protocol/`.

Use these files by task scope:

- App work: `agent_protocol/protocols/apps/index.md`, then `agent_protocol/protocols/apps/<app>.md`
- Page work: also read matching files in `agent_protocol/protocols/page-types/`
- DataTable usage or implementation: `agent_protocol/protocols/components/data-table.md`
- Package work: matching file in `agent_protocol/protocols/packages/`
- Showcase work: matching file in `agent_protocol/protocols/showcases/`

## Hard Rule

Do not treat app work as blank-page frontend implementation. Apps consume framework capabilities first; they only add local code after the shared inventory has been checked.
