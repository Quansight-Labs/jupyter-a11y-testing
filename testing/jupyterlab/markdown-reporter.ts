// my-awesome-reporter.ts
import fs from "fs";
import path from "path";
import type {
  FullConfig,
  Suite,
  TestCase,
  TestError,
  Reporter,
} from "@playwright/test/types/testReporter";

class MyReporter implements Reporter {
  config!: FullConfig;
  rootSuite!: Suite;
  private _errors: TestError[] = [];
  private _outputFile: string | undefined;

  constructor(options: { outputFile?: string } = {}) {
    this._outputFile = options.outputFile;
  }

  printsToStdio() {
    return !this._outputFile;
  }

  onBegin(config, suite) {
    this.config = config;
    this.rootSuite = suite;
  }

  // TODO: do something with the errors, format and output them to Markdown.
  onError(error: TestError): void {
    this._errors.push(error);
  }

  onEnd() {
    outputReport(this._serializeReport(), this._outputFile);
  }

  private _serializeReport(): string {
    const lines: string[] = [];
    lines.push("# Test Results");
    lines.push("");
    const projectSuites = this.rootSuite.suites;

    for (const projectSuite of projectSuites) {
      const fileSuites = projectSuite.suites;
      for (const fileSuite of fileSuites) {
        lines.push(`## ${fileSuite.title}`);
        lines.push("");
        for (const test of fileSuite.allTests()) {
          const testResultString = this._serializeTest(test);
          lines.push(testResultString);
        }
        lines.push("");
      }
    }

    return lines.join("\n");
  }

  private _serializeTest(test: TestCase): string {
    const lines: string[] = [];
    const outcome = {
      expected: "✅",
      unexpected: "❌",
      skipped: "[skipped]",
      flaky: "[flaky]",
    }[test.outcome()];
    const [_root, _project, _file, ...titlePaths] = test.titlePath();
    const title = titlePaths.join(" > ");
    lines.push(`- ${outcome} ${title}`);
    const firstError = test.results
      .map(({ error }) => error)
      .find((error) => error);
    if (firstError && firstError.message) {
      const errorLines = firstError.message.split("\n");
      const firstLine = errorLines[0];
      const indent = "   ";
      // If the error message spans multiple lines, wrap it in a details-summary
      // HTML element so that when the Markdown is rendered as HTML on GitHub no
      // error takes up more space than any other error.
      if (errorLines.length > 0) {
        lines.push(`${indent}<details><summary>`);
      }
      lines.push(`${indent}Error: ${stripAnsiEscapes(firstLine)}`);
      if (errorLines.length > 0) {
        lines.push(`${indent}</summary>`);
      }
      for (let i = 1; i < errorLines.length; i++) {
        lines.push(`${indent}${stripAnsiEscapes(errorLines[i])}<br/>`);
      }
      if (errorLines.length > 0) {
        lines.push(`${indent}</details>`)
      }
    }
    return lines.join("\n");
  }
}

const ansiRegex = new RegExp(
  "([\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~])))",
  "g"
);
export function stripAnsiEscapes(str: string): string {
  return str.replace(ansiRegex, "");
}

function outputReport(reportString: string, outputFile: string | undefined) {
  if (outputFile) {
    fs.mkdirSync(path.dirname(outputFile), { recursive: true });
    fs.writeFileSync(outputFile, reportString);
  } else {
    console.log(reportString);
  }
}

export default MyReporter;
