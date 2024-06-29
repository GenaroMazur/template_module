import IndexApplication from "./../src/domain/index.application";

describe("indexApplication", () => {
  it("helloWorld should return 'Hello World'", () => {
    const expected: any = new IndexApplication();

    expect(expected.helloWorld()).toBe("Hello World");
  });
});
