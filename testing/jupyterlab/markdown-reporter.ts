// my-awesome-reporter.ts
import fs from "fs";
import path from "path";
import type {
  FullConfig,
  Suite,
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
    let markdownString = "";
    markdownString += "# Test Results\n\n"
    const projectSuites = this.rootSuite.suites;

    for (const projectSuite of projectSuites) {
      const fileSuites = projectSuite.suites;
      for (const fileSuite of fileSuites) {
        markdownString += `## ${fileSuite.title}\n\n`;
        for (const test of fileSuite.allTests()) {
          const outcome = {
            expected: '✅',
            unexpected: '❌',
            skipped: '[skipped]',
            flaky: '[flaky]',
          }[test.outcome()];
          const [_root, _project, _file, ...titlePaths] = test.titlePath();
          const title = titlePaths.join(' > ');
          markdownString += `- ${outcome} ${title}\n`;
          const firstError = test.results.map(({error}) => error).find(error => error);
          if (firstError) {
            markdownString += `   Error: ${firstError.message}\n`;
          }
        }
        markdownString += '\n';
      }
    }

    return markdownString;
  }
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
