// Next.js only activates Edge Middleware from a root-level `middleware.ts`
// whose entry point is the default export or a named `middleware` export.
// The guard implementation lives in `./proxy`; re-export it under the names
// Next.js requires so the matcher and auth check are actually registered.
export { proxy as middleware, config } from "./proxy";
