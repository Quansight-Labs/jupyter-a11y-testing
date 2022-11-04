# No Tab Trap on Initial Page

- id: 1wlgh6

## Description

When a user loads the app for the first time, they should be able to use the tab
key to navigate the page they land on without getting trapped.

## Applicability

Which apps does this test apply to.

- JupyterLab

## Accessibility Criteria

This test is related to:

- [WCAG Success Criterion 2.1.2 No Keyboard
  Trap](https://www.w3.org/TR/WCAG22/#no-keyboard-trap)

If this test passes, it means there are no tab traps on the default initial page
that loads when you start JupyterLab, assuming there are no bugs in the test. If
you're not sure what a tab key trap is, see WCAG 2.1.2.

If this test passes, however, it does **not** mean that the app as a whole conforms
to WCAG 2.1.2, only that the initial app page does. This test can be combined
with keyboard trap tests for other pages or page states to increase confidence
that the app as a whole conforms to 2.1.2. However, if this test fails, then the
app as a whole fails to conform to 2.1.2.

## How to Perform the Test Manually

1. Open JupyterLab in a fresh environment. Another way to say this is that you
  should have the following parts visible: top menu bar, left side panel with
  file browser open, the launcher in the main area, right side panel closed, and
  status bar. Here's a screen shot: ![screenshot of JupyterLab initial
  page](assets/no-tab-trap-initial-page/jupyterlab-initial-page.png)
2. From the top of the page, press the tab key repeatedly.
3. You should be able to cycle back to where you began using only the tab key.
