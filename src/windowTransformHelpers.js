/*
 * Spruce
 *
 * Copyright 2019 Payson Wallach
 */

class Rect {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

function copyRect(rect) {
  return new Rect(rect.x, rect.y, rect.width, rect.height);
}

function getMidX(rect) {
  return Math.floor(rect.width / 2.0 + rect.x);
}

function getMidY(rect) {
  return Math.floor(rect.height / 2.0 + rect.y);
}

function rectContainsRect(rect1, rect2) {

  return (
    rect1.x <= rect2.x &&
    rect1.y <= rect2.y &&
    rect1.x + rect1.width >= rect2.x + rect2.width &&
    rect1.y + rect1.height >= rect2.y + rect2.height
  );
}

function rectCenteredWithinRect(rect1, rect2) {
  const centeredMidX = Math.abs(getMidX(rect2) - getMidX(rect1)) <= 1.0;
  const centeredMidY = Math.abs(getMidY(rect2) - getMidY(rect1)) <= 1.0;

  return rectContainsRect(rect1, rect2) && centeredMidX && centeredMidY;
}

function rectFitsWithinRect(rect1, rect2) {
  return rect1.width <= rect2.width && rect1.height <= rect2.height;
}
