import { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  schema: "http://localhost:5072/graphql",
  documents: ["src/**/*.graphql"],
  generates: {
    "./src/generted/": {
      preset: "client",
    },
  },
};

export default config;
