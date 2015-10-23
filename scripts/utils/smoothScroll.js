let raf = require('raf');

module.exports = {
  /**
   * Smooth scrolls the given element vertically to the given y coordinate.
   * @param {Number} y  The y coordinate to scroll the window to.
   * @param {HTMLElement} el  The element to scroll.
   */
  smoothScrollTo(y, el) {
    var startTime;
    var startY = el.scrollTop;
    var endY = y;
    var duration = 1000;
    var delta = Math.abs(Math.round(endY - startY));
    var scrollDown = (endY - startY) > 0;

    raf(tick);

    // Closure allows raf callback to close over animation variables.
    function tick(currentTime) {
      startTime = startTime || currentTime; // init startTime on initial call

      // Real[0,1] indicating how far into the animation we are
      var progress = (currentTime - startTime) / duration;

      // Using the easing function, how to scale our
      var scalingFactor = (progress < 1) ? easing(progress)
                                         : 1;

      // Calculate y position to scroll to in current tick
      var y = scrollDown ? startY + Math.ceil(scalingFactor * delta)
                         : startY - Math.ceil(scalingFactor * delta);
      el.scrollTop = y;

      if (scalingFactor < 1) raf(tick);
    }
  }
};

/**
 * Easing function for the scroll animation. Given x (a value in range [0,1])
 * produces how far the animation should have progressed.
 * @param {Number[0,1]} x The elapsed duration.
 * @return {Number[0,1]} The required progress of the animation.
 */
function easing(x) {
  if (x < 0.5)
    return (Math.pow(x*2, 2) / 2);
  return 1 - (Math.pow((1-x)*2, 2) / 2);
}
