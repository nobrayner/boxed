export default {
  test: {
    include: ["**/*.{test,spec}.ts"],
    typecheck: {
      enabled: true,
      tsconfig: "./tsconfig.test.json",
    },
  },
};
