
/**
 * 判断两个4变形是否相交
 * @param {object} rect1 
 * @param {object} rect2 
 */
function rectIntersect(rect1, rect2) {
  return !(rect1.right < rect2.left ||
    rect1.left > rect2.right ||
    rect1.top > rect2.bottom ||
    rect1.bottom < rect2.top)
}