function PageSpin(content) {
  'use strict';

  this.PREVIOUS = 'previous';
  this.NEXT = 'next';

  this.cube = null;
  this.currentContentContainer = null;
  this.nextContentContainer = null;

  this.previousOverflow = null;

  this.loading = false;

  /*
   Creating PageSpin environment and adding the content element to the
   currently displayed face of the cube.
   */

  var cubeContainer = document.createElement('div');
  cubeContainer.className = 'pagespin';

  this.cube = document.createElement('div');
  this.cube.className = 'show-current';

  this.currentContentContainer = document.createElement('div');
  this.currentContentContainer.className = 'current';

  cubeContainer.appendChild(this.cube);
  this.cube.appendChild(this.currentContentContainer);
  content.parentNode.appendChild(cubeContainer);
  this.currentContentContainer.appendChild(content);

  /*
   Bind a function to the animation end to make the new content the current and
   delete the previous one.
   */

  cubeContainer.addEventListener(
    (document.body.style.WebkitTransition === undefined) ?
        ((document.body.style.OTransition === undefined) ?
            'transitionend' : 'oTransitionEnd') : 'webkitTransitionEnd',
    function (event) {
      if (event.propertyName !== 'transform') {
        return;
      }

      this.nextContentContainer.className = 'current';
      this.cube.className = 'show-current';

      this.cube.removeChild(this.currentContentContainer);

      this.currentContentContainer = this.nextContentContainer;
      this.nextContentContainer = null;

      document.documentElement.style.overflow = this.previousOverflow;

      this.loading = false;
    }.bind(this)
  );
}

PageSpin.prototype.loadPage = function (type, content) {
  'use strict';

  if (this.loading === true) {
    return false;
  }

  this.loading = true;

  this.previousOverflow = document.documentElement.style.overflow;
  document.documentElement.style.overflow = 'hidden';

  /*
   Create the next content's container node, append it to the cube and change
   the cube's class to start the animation.
   */

  this.nextContentContainer = document.createElement('div');
  this.nextContentContainer.className = type;
  this.cube.appendChild(this.nextContentContainer);
  this.nextContentContainer.appendChild(content);

  /*
   The goal here is to make sure a repaint took place so that .next and
   .previous nodes get added to the DOM before cube's class get modified
   (we need it to ensure new nodes get faded in, otherwise they would be
   visible immediately).
   */

  window.requestAnimationFrame(
    function () {
      window.requestAnimationFrame(
        function () {
          this.cube.className = 'show-' + type;
        }.bind(this)
      );
    }.bind(this)
  );
};

module.exports = PageSpin;
