# FLOW-1: Task management and dashboard — file change summary

## Block A

### 1. Files

Total files created/modified: **31** 
Without harness: **44**

### 2. Project convention audit

Checked against `CLAUDE.md` after implementation.

**Followed:**
- Backend subpath imports (`#models/*`, `#validators/*`, `#transformers/*`, etc.) used throughout the new controller/model/transformer/validator/test files.
- `database/schema.ts` never hand-edited — only ever regenerated via `node ace migration:run`.
- Controller pattern matches existing style: thin controller → `request.validateUsing(validator)` → model work → `serialize(Transformer.transform(...))`.
- Validator JSDoc comments mirror the existing convention in `app/validators/user.ts`.
- Routes grouped under `/api/v1`, new `tasks` group added as a sibling to `auth`/`account`.
- Neither project's ESLint/oxlint/Prettier config was overridden.
- Git workflow: three separate semantic commits (not amended), nothing pushed without asking.

**Gap found and fixed:** `frontend/src/components/TasksView.tsx` failed `prettier --check` — the `.claude/settings.json` PostToolUse hook that auto-formats frontend 
files after Write/Edit didn't catch it. Fixed with `prettier --write`; `npm run lint` and `npm run build` re-confirmed clean. This file was already committed, so the 
fix needs a follow-up commit.

**Documented deviation:** CLAUDE.md describes the backend's generated Tuyau registry (`backend/.adonisjs/client/registry/`) as what a frontend Tuyau client would 
consume directly. Importing it as-is broke the frontend's `tsc -b` build: the generated registry's response types resolve via `ReturnType<Controller[...]>`, which 
transitively pulls in the backend's decorator-annotated Lucid model files — and those don't parse under the frontend's separate, non-decorator tsconfig (the two 
projects share no workspace/tsconfig). Worked around this with a hand-authored local registry (`frontend/src/lib/registry.ts`) mirroring the same route shapes, 
documented inline with the reason. This also required adding `@adonisjs/http-server` as an extra frontend dependency, since Tuyau's client package imports a 
URL-builder helper from it without declaring it as a dependency.

### 3. Interruptions

None - plan mode + auto mode on

### 4. Manual changes

- UIX conventions auditory
- Security conventions auditory

---

## Block B

- None manual action
- I am not sure if I gave the exact same instructions during the planning mode when the model asks for clarification
- I needed two 45-minute rounds to complete both runs

### Comparison with the no-harness implementation

Reviewed `diffs.txt` (recursive diff between this checkout and the `-sin-harness` sibling checkout implementing the same FLOW-1 ticket). Same ticket, genuinely 
different design choices:

**Tags: relational vs. embedded** - Here: `tags` stored as a JSON string column directly on `tasks` — no separate table, parsed/stringified in the 
transformer/controller. - Other: full relational model — `tags` table, `task_tags` pivot table, `Tag` model, `TagTransformer`, a `TagsController` with `GET 
/api/v1/tags`, and a `resolveTagNames` service that upserts tags by name and syncs the pivot. More normalized, but three migrations and several more files instead of 
one migration + one column.

**Dashboard stats: client-derived vs. server-computed**
- Here: no stats endpoint — the frontend fetches the full task list and derives total/completed counts in the browser.
- Other: dedicated `GET /api/v1/tasks/stats` doing SQL `count()` aggregates server-side, returning `{ total, completed, pending }` directly.

**API surface details** - Update verb: here `PUT` (whole-resource replace semantics); other uses `PATCH` (more correct for partial updates). - Delete response: here a 
JSON `{ message }` body; other returns `204 No Content` (more RESTful). - Extra field: other has a `dueDate` on tasks; here does not. - Filtering: other supports 
server-side `?completed=` and `?tag=` query filters on the list endpoint; here only filters client-side (the All/Active/Completed tabs operate on the already-fetched 
list).

**Frontend architecture: tabs vs. routing** - Here: single-page app, a local-state tab switcher between Tasks/Dashboard, no router dependency — per an explicit scope 
decision agreed with the user. - Other: full `react-router-dom`, with real routes (`/`, `/tasks/new`, `/tasks/:id`, `/tasks/:id/edit`, `/dashboard`) and per-route 
page components (`TaskListPage`, `TaskDetailPage`, `TaskFormPage`, `DashboardPage`) plus a `NavBar`.

**API client: typed Tuyau vs. hand-written fetch** - Here: `@tuyau/core` typed client — but consuming the backend's auto-generated registry directly broke the 
frontend's `tsc` build (see §2's documented deviation), so a hand-authored local registry was needed, plus an extra `@adonisjs/http-server` dependency. - Other: a 
plain hand-written `src/api/*.ts` fetch module (`listTasks`, `listTags`, etc.) with hand-typed request/response shapes — no extra runtime dependency, no cross-package 
coupling at all. Simpler, and sidesteps the whole problem hit here.

**Tooling**
- Here: Prettier stayed active on the frontend (`.prettierrc.json`, `format` script) — consistent with the CLAUDE.md-documented convention and the repo's auto-format hook.
- Other: Prettier dropped from the frontend entirely (no `format` script, no dependency) — consistent with "sin-harness" not having that hook active.

**Net read:** the other implementation chose the more "complete" data model (relational tags, dedicated stats endpoint, tag autocomplete, routing) at the cost of more 
surface area; this implementation stayed closer to the minimal scope explicitly agreed on (no auth, free-text tags, tab nav, client-derived stats) and hit — then 
worked around — a real tooling snag from choosing the typed API-client route instead of a plain fetch wrapper.
