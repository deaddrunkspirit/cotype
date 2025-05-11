import type { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "kebabStyleProp" | "invalidStyleProp" | "numericStyleValue" | "stringStyle";
type Options = [{
    styleProps?: Array<string>;
    allowString?: boolean;
}?];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
