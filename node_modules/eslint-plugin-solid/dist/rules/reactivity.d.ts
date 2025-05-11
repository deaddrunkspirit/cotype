import { TSESLint } from "@typescript-eslint/utils";
type MessageIds = "noWrite" | "untrackedReactive" | "expectedFunctionGotExpression" | "badSignal" | "badUnnamedDerivedSignal" | "shouldDestructure" | "shouldAssign" | "noAsyncTrackedScope";
type Options = [{
    customReactiveFunctions: string[];
}];
declare const _default: TSESLint.RuleModule<MessageIds, Options, TSESLint.RuleListener>;
export default _default;
