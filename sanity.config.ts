import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { media } from "sanity-plugin-media";
import { singletonTools } from "sanity-plugin-singleton-tools";
import { noteField } from "sanity-plugin-note-field";
import { tags } from "sanity-plugin-tags";
import { schemaTypes } from "./schemas";

export default defineConfig({
  name: "default",
  title: "WSCAH",

  projectId: "n427st2j",
  dataset: "production",

  plugins: [singletonTools(), structureTool(), visionTool(), media(), noteField(), tags({})],

  schema: {
    types: schemaTypes,
  },
});
