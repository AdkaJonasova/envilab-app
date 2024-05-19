import {
  betweenElementsMargin,
  mainMenuHeight,
  pageBottomMargin,
  pageTopMargin,
  selectViewHeaderHeight,
  selectViewHeaderPadding,
} from "./data";

export function getRowHeight(windowHeight, rowCount) {
  const windowLayoutPart =
    windowHeight - mainMenuHeight - pageBottomMargin - pageTopMargin;
  return windowLayoutPart / rowCount;
}

export function getRowCount(layoutConfig) {
  let requiredRowCount = 0;
  for (let i = 0; i < layoutConfig.length; i++) {
    const layoutElement = layoutConfig[i];
    const rowEnd = layoutElement.y + layoutElement.h;
    if (requiredRowCount < rowEnd) {
      requiredRowCount = rowEnd;
    }
  }
  return requiredRowCount;
}

export function getElementHeight(layoutElement, rowCount, rowHeight) {
  const isLast = isLastVerticalElement(layoutElement, rowCount);
  return isLast
    ? layoutElement.h * rowHeight
    : layoutElement.h * rowHeight - betweenElementsMargin;
}

export function getElementBottomMargin(layoutElement, rowCount) {
  const isLast = isLastVerticalElement(layoutElement, rowCount);
  return isLast ? 0 : betweenElementsMargin;
}

function isLastVerticalElement(layoutElement, rowCount) {
  return layoutElement.y + layoutElement.h === rowCount;
}

export function getSelectViewMapHeight(windowHeight) {
  let windowWithoutMenuAndMargins =
    windowHeight - mainMenuHeight - pageBottomMargin - pageTopMargin;
  let windowWithoutBox =
    windowWithoutMenuAndMargins -
    selectViewHeaderHeight -
    2 * selectViewHeaderPadding;
  return windowWithoutBox;
}
