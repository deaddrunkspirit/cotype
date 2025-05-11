import type { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "unknown" | "style" | "component" | "component-suggest";
type Options = [{
    allowedNamespaces: Array<string>;
}?];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
