import { formatGreeting } from "../lib/utils";

describe("formatGreeting", () => {
  it("should return a greeting with the provided name", () => {
    const name = "Can";

    const result = formatGreeting(name);

    expect(result).toBe("Merhaba, Can!");
  });

  it("should return a guest greeting if no name is provided", () => {
    const result = formatGreeting(null);
    expect(result).toBe("Merhaba, misafir!");
  });
});
