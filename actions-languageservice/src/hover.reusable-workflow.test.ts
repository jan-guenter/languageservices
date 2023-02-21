import {hover} from "./hover";
import {testHoverConfig} from "./hover.test";
import {getPositionFromCursor} from "./test-utils/cursor-position";

describe("hover on reusable workflows", () => {
  it("hover on job input with description", async () => {
    const input = `
on: push

jobs:
  build:
    uses: ./reusable-workflow-with-inputs.yaml
    with:
      us|ername:
`;
    const result = await hover(...getPositionFromCursor(input), testHoverConfig("username", "scalar-needs-context"));
    expect(result).not.toBeUndefined();
    expect(result?.contents).toEqual(
      "A username passed from the caller workflow\n\n**Context:** github, inputs, vars, needs, strategy, matrix"
    );
  });

  it("hover on job input without description", async () => {
    const input = `
on: push

jobs:
  build:
    uses: ./reusable-workflow-with-inputs-no-description.yaml
    with:
      us|ername:
`;
    const result = await hover(...getPositionFromCursor(input));
    expect(result).not.toBeUndefined();
    expect(result?.contents).toEqual("**Context:** github, inputs, vars, needs, strategy, matrix");
  });
});