// Copyright (c) Jupyter Accessibility Development Team.
// Distributed under the terms of the Modified BSD License.

import { ElementHandle, expect } from "@playwright/test";
import { test } from "@jupyterlab/galata";

async function* getNodesInFocusOrder(page) {
  let start = (await page.evaluateHandle(
    () => document.activeElement,
  )) as ElementHandle;
  let node = start;
  while (true) {
    yield node;
    await page.keyboard.press("Tab");
    node = (await page.evaluateHandle(
      () => document.activeElement,
    )) as ElementHandle;
    if (
      await page.evaluate(
        ([current, start]) => current === start,
        [node, start],
      )
    ) {
      break;
    }
  }
}

test("should have visible focus indicator", async ({ page }, testInfo) => {
  for await (const node of getNodesInFocusOrder(page)) {
    const box = await node.boundingBox();
    if (box === null) {
      throw new Error("Could not get node bounding box");
    }
    const { x, y, width, height } = box;
    const pad = 3; // this value is just from trial-and-error
    const clip = {
      x: x - pad,
      y: y - pad,
      width: pad + width + pad,
      height: pad + height + pad,
    };

    const focus = await page.screenshot({ clip });
    await node.evaluate((node) => (node as HTMLElement).blur());

    const noFocus = await page.screenshot({ clip });
    await node.evaluate((node) => (node as HTMLElement).focus());

    await testInfo.attach("focussed", {
      body: focus,
      contentType: "image/png",
    });
    await testInfo.attach("unfocussed", {
      body: noFocus,
      contentType: "image/png",
    });

    expect(focus.equals(noFocus)).toBe(false);
  }
});
