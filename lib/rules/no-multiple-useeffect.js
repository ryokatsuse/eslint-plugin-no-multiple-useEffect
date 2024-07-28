module.exports = {
  meta: {
      type: "problem",
      docs: {
          description: "disallow more than 2 useEffect hooks in a file",
          category: "Best Practices",
          recommended: false,
      },
      schema: [],
      messages: {
          tooManyUseEffect: "File has more than 2 useEffect hooks",
      },
  },
  create(context) {
      let useEffectCount = 0;

      return {
          CallExpression(node) {
              if (node.callee.name === "useEffect") {
                  useEffectCount++;
                  if (useEffectCount > 2) {
                      context.report({
                          node,
                          messageId: "tooManyUseEffect",
                      });
                  }
              }
          },
      };
  },
};
