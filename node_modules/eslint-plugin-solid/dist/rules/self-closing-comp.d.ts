import type { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "selfClose" | "dontSelfClose";
type Options = [{
    component?: "all" | "none";
    html?: "all" | "void" | "none";
}?];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
