import type { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "dangerous" | "conflict" | "notHtml" | "useInnerText" | "dangerouslySetInnerHTML";
type Options = [{
    allowStatic?: boolean;
}?];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
