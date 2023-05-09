// Copyright (c) Jupyter Accessibility Development Team.
// Distributed under the terms of the Modified BSD License.

import { ElementHandle, expect } from "@playwright/test";
import { test } from "@jupyterlab/galata";

test("should have visible focus indicator", async (
  { page }, testInfo
) => {

  await page.keyboard.press("Tab");
  let start = await page.evaluateHandle(() =>  document.activeElement) as ElementHandle;
  let node = start;

  while (true) {
    const focus = await node.screenshot();
    await page.keyboard.press("Tab");
    const noFocus = await node.screenshot();

    await testInfo.attach("focussed", {
      body: focus,
      contentType: "image/png",
    });
    await testInfo.attach("unfocussed", {
      body: noFocus,
      contentType: "image/png",
    });

    expect(
      focus.equals(noFocus)
    ).toBe(false);

    node = await page.evaluateHandle(() => document.activeElement) as ElementHandle;
    if (await page.evaluate(([current, start]) => current === start, [node, start])) {
      break;
    }
  }
});