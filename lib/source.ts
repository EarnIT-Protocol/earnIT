import { loader } from "fumadocs-core/source";
import { docs } from "../.source";

// Single entry point for the docs corpus: page tree (sidebar), search
// index, and slug → page lookup. fumadocs-mdx compiles the MDX (via
// withMDX in next.config.ts); we wire the generated .source into the loader.
export const source = loader({
  baseUrl: "/docs",
  source: docs.toFumadocsSource(),
});
