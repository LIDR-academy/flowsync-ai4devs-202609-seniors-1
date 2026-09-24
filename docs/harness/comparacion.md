# FLOW-1: Task management and dashboard — file change summary

---

## Block A

### 1. Files

Total files created/modified: **31**, without harness: **44**

### 2. Project convention audit

**Documented deviation:** CLAUDE.md suggests the frontend should just import the backend's auto-generated Tuyau registry directly. I tried that first, but it broke 
the frontend's build — the registry's types reach back into the backend's decorator-based model files, which the frontend's TypeScript setup isn't configured to 
understand (the two projects don't share a tsconfig, by design). Rather than fight that mismatch, I wrote a small local registry in the frontend 
(`frontend/src/lib/registry.ts`) with the same route shapes, and left a comment explaining why it exists instead of the generated one. I also had to add 
`@adonisjs/http-server` as a frontend dependency, since Tuyau's client code needs a helper from it that isn't declared as a dependency on their end.

### 3. Interruptions

None - plan mode (4 clarifications) + auto mode on

### 4. Manual changes

- UIX conventions auditory and fixes
- Security conventions auditory and fixes

---

## Block B

- None manual action
- I am not sure if I gave the exact same instructions during the planning mode when the model (case without harness) asks for clarification
- I needed two 45-minute rounds to complete the exercise

### Comparison with the no-harness implementation

This implementation stayed closer to the minimal scope explicitly agreed on (no auth, free-text tags, tab nav, client-derived stats) and hit — then 
worked around — a real tooling snag from choosing the typed API-client route instead of a plain fetch wrapper.
