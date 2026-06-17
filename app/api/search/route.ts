import { createFromSource } from "fumadocs-core/search/server";
import { source } from "@/lib/source";

// Search index built from the docs loader; serves /api/search for the
// docs sidebar search dialog.
export const { GET } = createFromSource(source);
