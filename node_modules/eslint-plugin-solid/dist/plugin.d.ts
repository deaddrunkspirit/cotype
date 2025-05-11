import type { TSESLint } from "@typescript-eslint/utils";
export declare const plugin: {
    rules: {
        "components-return-once": TSESLint.RuleModule<"noEarlyReturn" | "noConditionalReturn", [], TSESLint.RuleListener>;
        "event-handlers": TSESLint.RuleModule<"naming" | "capitalization" | "nonstandard" | "make-handler" | "make-attr" | "detected-attr" | "spread-handler", [({
            ignoreCase?: boolean | undefined;
            warnOnSpread?: boolean | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        imports: TSESLint.RuleModule<"prefer-source", [], TSESLint.RuleListener>;
        "jsx-no-duplicate-props": TSESLint.RuleModule<"noDuplicateProps" | "noDuplicateClass" | "noDuplicateChildren", [({
            ignoreCase?: boolean | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "jsx-no-undef": TSESLint.RuleModule<"undefined" | "customDirectiveUndefined" | "autoImport", [({
            allowGlobals?: boolean | undefined;
            autoImport?: boolean | undefined;
            typescriptEnabled?: boolean | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "jsx-no-script-url": TSESLint.RuleModule<"noJSURL", [], TSESLint.RuleListener>;
        "jsx-uses-vars": TSESLint.RuleModule<never, [], TSESLint.RuleListener>;
        "no-destructure": TSESLint.RuleModule<"noDestructure", [], TSESLint.RuleListener>;
        "no-innerhtml": TSESLint.RuleModule<"dangerous" | "conflict" | "notHtml" | "useInnerText" | "dangerouslySetInnerHTML", [({
            allowStatic?: boolean | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "no-proxy-apis": TSESLint.RuleModule<"mergeProps" | "noStore" | "spreadCall" | "spreadMember" | "proxyLiteral", [], TSESLint.RuleListener>;
        "no-react-deps": TSESLint.RuleModule<"noUselessDep", [], TSESLint.RuleListener>;
        "no-react-specific-props": TSESLint.RuleModule<"prefer" | "noUselessKey", [], TSESLint.RuleListener>;
        "no-unknown-namespaces": TSESLint.RuleModule<"style" | "unknown" | "component" | "component-suggest", [({
            allowedNamespaces: string[];
        } | undefined)?], TSESLint.RuleListener>;
        "prefer-classlist": TSESLint.RuleModule<"preferClasslist", [({
            classnames?: string[] | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "prefer-for": TSESLint.RuleModule<"preferFor" | "preferForOrIndex", [], TSESLint.RuleListener>;
        "prefer-show": TSESLint.RuleModule<"preferShowAnd" | "preferShowTernary", [], TSESLint.RuleListener>;
        reactivity: TSESLint.RuleModule<"noWrite" | "untrackedReactive" | "expectedFunctionGotExpression" | "badSignal" | "badUnnamedDerivedSignal" | "shouldDestructure" | "shouldAssign" | "noAsyncTrackedScope", [{
            customReactiveFunctions: string[];
        }], TSESLint.RuleListener>;
        "self-closing-comp": TSESLint.RuleModule<"selfClose" | "dontSelfClose", [({
            component?: "all" | "none" | undefined;
            html?: "void" | "all" | "none" | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "style-prop": TSESLint.RuleModule<"kebabStyleProp" | "invalidStyleProp" | "numericStyleValue" | "stringStyle", [({
            styleProps?: string[] | undefined;
            allowString?: boolean | undefined;
        } | undefined)?], TSESLint.RuleListener>;
        "no-array-handlers": TSESLint.RuleModule<"noArrayHandlers", [], TSESLint.RuleListener>;
    };
};
