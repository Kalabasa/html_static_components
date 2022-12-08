import { CustomConsole, LogType, LogMessage } from "@jest/console";

function simpleFormatter(type: LogType, message: LogMessage): string {
  return message
    .split(/\n/)
    .map((line) => "      " + line)
    .join("\n");
}

global.console = new CustomConsole(
  process.stdout,
  process.stderr,
  simpleFormatter
);

import { setLogGlobalContext } from "./log";

beforeEach(() => {
  setLogGlobalContext(
    `[${expect.getState().currentTestName}]`.padStart(30, " ")
  );
});

afterEach(() => {
  setLogGlobalContext(undefined);
});
