// Copyright (c) Jupyter Accessibility Development Team.
// Distributed under the terms of the Modified BSD License.

import { ElementHandle, expect, Page } from "@playwright/test";
import { test } from "@jupyterlab/galata";

/**
 * Press the tab key, return the focussed node
 * @param page Playwright page instance
 * @returns ElementHandle, a reference to the focussed node
 */
async function nextFocusNode(page: Page) {
  await page.keyboard.press("Tab");
  const node = await page.evaluateHandle(() => document.activeElement);
  if ((await node.jsonValue()) === null) {
    throw new Error("Could not get next focus node from page");
  }
  // If node.jsonValue() is not null, then we should have an ElementHandle.
  return node as ElementHandle;
}

/**
 * Generator function to iterate through the tab-focussable nodes on the page in
 * tab-focus order.
 *
 * Note: when the function yields a node, that node currently has the browser
 * focus.
 *
 * @param page Playwright page instance
 * @returns an AsyncGenerator instance for iterating over the tab-focussable
 * nodes on the page
 */
async function* getFocusNodes(page: Page) {
  // Get the first node in the page's focus order.
  const start: ElementHandle = await nextFocusNode(page);
  let node: ElementHandle = start;

  // Start a loop in order to cycle through all of the tab-focussable nodes on
  // the page.
  while (true) {
    // Yield the current node to the code requesting it.
    yield node;

    // The caller may blur the node, so refocus it before getting the next node.
    // That way we focus the nodes in the right order.
    await node.evaluate((node: HTMLElement) => node.focus());

    // Get the next node in the page's focus order.
    const nextNode = await nextFocusNode(page);

    // Break out of the loop if we have cycled back to the start.
    if (
      await page.evaluate(
        ([nextNode, start]) => nextNode === start,
        [nextNode, start],
      )
    ) {
      break;
    } else {
      // Otherwise do another turn of the loop.
      node = nextNode;
    }
  }
}

test.describe("every tab-focusable element on initial app page", () => {
  test("should have visible focus indicator", async ({ page }, testInfo) => {
    test.info().annotations.push({
      type: "Manual testing script",
      description: "visible-focus-indicator-initial-page.md",
    });

    // For each tab-focussable node, take a screenshot of the node while
    // focussed then not focussed and then compare the screenshots.
    for await (const node of getFocusNodes(page)) {
      // Skip if node is body node. (This is a discrepancy between the real and
      // test environments. Under normal usage, the body element of the
      // JupyterLab UI is not tab-focussable.)
      if (await node.evaluate((node) => node === document.body)) {
        continue;
      }

      // Calculate where on the page to take the screenshot in order to capture
      // the node. Note: we cannot use node.screenshot() because it does not
      // reliably capture CSS-applied outlines across browsers.
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

      // Screenshot the node; this time it's focussed.
      const focus = await page.screenshot({ clip });

      // Blur the node to remove focus.
      await node.evaluate((node) => (node as HTMLElement).blur());

      // Screenshot the node again, this time it's not focussed.
      const noFocus = await page.screenshot({ clip });

      // Attach the screenshots to the test report (can help with debugging if
      // the test fails, among other things)
      await testInfo.attach("focussed", {
        body: focus,
        contentType: "image/png",
      });
      await testInfo.attach("unfocussed", {
        body: noFocus,
        contentType: "image/png",
      });

      // Compare the screenshots. If they are equal, the test fails. Use
      // expect.soft so that the test will iterate through all of the
      // tab-focussable nodes on the page instead of bailing on the first node
      // that fails the test.
      expect
        .soft(
          // Buffer.equals uses bit-for-bit equality, equivalent to comparing
          // both screenshots pixel for pixel. If the screenshots are exactly
          // the same, we know for sure that there was no visible focus
          // indicator, so the test fails.
          focus.equals(noFocus),
          `focus visible comparison failed on\n\t${node.toString()}`,
        )
        .toBe(false);
    }
  });
});
