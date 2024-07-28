const { RuleTester } = require('eslint');
const rule = require('../../../lib/rules/no-multiple-useEffect');

const ruleTester = new RuleTester({
    parser: require.resolve('@typescript-eslint/parser'),
    parserOptions: {
        ecmaVersion: 2018,
        sourceType: 'module',
        ecmaFeatures: {
            jsx: true,
        },
    },
});

ruleTester.run("no-multiple-useEffect", rule, {
    valid: [
        {
            code: `
                import React, { useEffect } from 'react';
                const Component = () => {
                    useEffect(() => {}, []);
                    useEffect(() => {}, []);
                    return <div></div>;
                };
            `,
        },
    ],
    invalid: [
        {
            code: `
                import React, { useEffect } from 'react';
                const Component = () => {
                    useEffect(() => {}, []);
                    useEffect(() => {}, []);
                    useEffect(() => {}, []);
                    return <div></div>;
                };
            `,
            errors: [{ messageId: "tooManyUseEffect" }],
        },
    ],
});
