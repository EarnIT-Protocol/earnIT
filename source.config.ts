import { defineConfig, defineDocs, frontmatterSchema, metaSchema } from "fumadocs-mdx/config";

// Points the loader at content/docs. meta.json sidecars declare folder
// titles + ordering via metaSchema.
export const docs = defineDocs({
  dir: "content/docs",
  docs: { schema: frontmatterSchema },
  meta: { schema: metaSchema },
});

export default defineConfig();
