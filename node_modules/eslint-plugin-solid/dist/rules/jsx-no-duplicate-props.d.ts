import type { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "noDuplicateProps" | "noDuplicateClass" | "noDuplicateChildren";
type Options = [{
    ignoreCase?: boolean;
}?];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
