# Visible Focus Indicator on Initial Page

## Description

When a user loads JupyterLab, if they use the tab key to navigate the page, each
tab-focussable element on the page should have a visible indicator when it
receives focus.

## Applicability

Which apps does this test currently apply to?

- JupyterLab

## Related GitHub PRs

These PRs were needed to make this test pass:

[Make focus visible (mostly CSS)
#13415](https://github.com/jupyterlab/jupyterlab/pull/13415)

## Related GitHub Issues

[JupyterLab #9399](https://github.com/jupyterlab/jupyterlab/pull/9399) - in the
PR description, look under "Focus", Issue Area #2.

## Related Accessibility Guidelines

[Understanding WCAG 2.4.7: Focus
Visible](https://www.w3.org/WAI/WCAG21/Understanding/focus-visible.html)

## How to Interpret Test Results

The test only checks for the existence of a focus indicator on each tab-focussed
element. It does not check whether or not the focus indicator is a **good**
focus indicator. For example, the test does not check the color contrast of the
focus indicator.

The test checks for a focus indicator by taking screenshots of each
tab-focussable element both before and after the element is focussed, then
comparing the screenshots. A single pixel difference will cause the test to
pass. This is why the test cannot tell you if the focus indicator is good; it
can only tell you if the visual area around the element changes when it has
focus versus when it does not.

So a test failure means that the app under test fails the WCAG 2.4.7 success
criteria (assuming no bugs in the test itself), but a test success does not mean
that the app fulfills the spirit of the guideline, which is to make it easy for
all sighted users to know which element on the page has browser focus.

## How to Perform the Test Manually

1. Open JupyterLab in a fresh environment. Another way to say this is that you
   should have the following parts visible: top menu bar, left side panel with
   file browser open, the launcher in the main area, right side panel closed,
   and status bar. Here's a screenshot: ![screenshot of JupyterLab initial
page](assets/no-tab-trap-initial-page/jupyterlab-initial-page.png)
2. Press the <kbd>TAB</kbd> key repeatedly.
3. Each time you press the <kbd>TAB</kbd> key, you should be able to clearly see
   which element (whether it is a link, a button, or some other element), has
   focus.
4. Continue pressing the <kbd>TAB</kbd> key and checking for focus indicator
   until you cycle back around.
5. If at any point, you lost track of which element had focus, then the test
   fails. Another way to say this is that if at any point you pressed the
   <kbd>TAB</kbd> key and you could not find the element which had focus, then
   it means that the focus indicator was not visuble (or maybe not visible
   enough).
