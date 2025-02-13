import { defineStackbitConfig } from "@stackbit/types";
import { GitContentSource } from "@stackbit/cms-git";
import { allModels } from "./.stackbit/models";

const config = defineStackbitConfig({
    stackbitVersion: "~0.7.0",
    ssgName: "nextjs",
    nodeVersion: "18",

    contentSources: [
        new GitContentSource({
            rootPath: __dirname,
            contentDirs: ["content"], // Where the content is stored
            models: [
                {
                    name: "page",
                    type: "page", // Explicitly defining as a page model
                    label: "Page",
                    urlPath: "/{slug}", // Page URLs follow this format
                    filePath: "content/pages/{slug}.json", // Where content files are stored
                    fields: [
                        { name: "title", type: "string", label: "Title", required: true },
                        { name: "body", type: "markdown", label: "Body", required: true },
                        { name: "image", type: "image", label: "Feature Image" }
                    ],
                    page: true // <-- This explicitly marks it as an editable page model
                }
            ],
            assetsConfig: {
                referenceType: "static",
                staticDir: "public",
                uploadDir: "images",
                publicPath: "/"
            }
        })
    ],

    presetSource: {
        type: "files",
        presetDirs: ["./.stackbit/presets"]
    },

    styleObjectModelName: "ThemeStyle"
});

export default config;
