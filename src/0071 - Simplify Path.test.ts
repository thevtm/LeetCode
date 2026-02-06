import _ from "lodash";

import { expect, test, describe } from "vitest";

function simplifyPath(path: string): string {
  // Parse
  const path_tokens: string[] = [];

  const SLASH = "/";
  const SINGLE_PERIOD = ".";
  const DOUBLE_PERIOD = "..";

  let i = 0;

  while (i < path.length) {
    // Slashes
    if (path[i] === "/") {
      let slashes_end = i + 1;
      while (path[slashes_end] === "/" && slashes_end < path.length) slashes_end++;

      path_tokens.push(SLASH);
      i = slashes_end;
      continue;
    }

    // Periods
    if (path[i] === ".") {
      if (i + 1 === path.length || path[i + 1] === "/") {
        path_tokens.push(SINGLE_PERIOD);
        i++;
        continue;
      } else if (path[i + 1] === "." && (i + 2 === path.length || path[i + 2] === "/")) {
        path_tokens.push(DOUBLE_PERIOD);
        i += 2;
        continue;
      } else {
        // it's a name
      }
    }

    // Names
    let name_end = i + 1;
    while (path[name_end] !== "/" && name_end < path.length) name_end++;
    path_tokens.push(path.slice(i, name_end));
    i = name_end;
  }

  // console.log("path_tokens", path_tokens);

  // Resolve
  const simplified_path: string[] = [];

  for (let i = 0; i < path_tokens.length; i++) {
    const token = path_tokens[i];

    if (token === SLASH) {
      simplified_path.push(SLASH);
    } else if (token === SINGLE_PERIOD) {
      simplified_path.pop();
    } else if (token === DOUBLE_PERIOD) {
      simplified_path.pop();
      simplified_path.pop();
      simplified_path.pop();
    } else {
      simplified_path.push(token);
    }
  }

  // console.log("simplified_path", simplified_path);

  // Remove dangling slashes at the end
  while (simplified_path[simplified_path.length - 1] === SLASH) simplified_path.pop();

  // Remove consecutive slashes at
  for (let i = 1; i < simplified_path.length; i++) {
    if (simplified_path[i] !== SLASH) continue;
    if (simplified_path[i - 1] !== SLASH) continue;

    simplified_path.splice(i, 1);
    i--;
  }

  if (simplified_path.length === 0) return "/";

  return simplified_path.join("");
}

type SolutionFunction = typeof simplifyPath;

type TestCase = {
  input: Parameters<SolutionFunction>;
  expected_result: ReturnType<SolutionFunction>;
};

const test_cases: TestCase[] = [
  { input: ["/home//foo/"], expected_result: "/home/foo" },
  { input: ["/home/user/Documents/../Pictures"], expected_result: "/home/user/Pictures" },
  { input: ["/.../a/../b/c/../d/./"], expected_result: "/.../b/d" },
  { input: ["/../..ga/b/.f..d/..../e.baaeeh./.a"], expected_result: "/..ga/b/.f..d/..../e.baaeeh./.a" },
  { input: ["/a//b////c/d//././/.."], expected_result: "/a/b/c" },
];

const solutions = [{ name: "best", fn: simplifyPath }];

describe.for(test_cases)("$input => $expected_result", ({ input, expected_result }) => {
  test.for(solutions)("$name", ({ fn }) => {
    expect(fn(...input)).toStrictEqual(expected_result);
  });
});
