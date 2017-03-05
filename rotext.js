/* -----------------------------------------------
/* Author : Ryota Otsuka  - elites.jp
/* MIT license: http://opensource.org/licenses/MIT
/* GitHub : github.com/mukkun/rotext.js
/* How to use? : Check the GitHub README
/* v0.0.1
/* ----------------------------------------------- */

class Rotext {
  constructor(elem, params) {
    this.id = elem;
    this.elem = document.getElementById(elem);
    this.html = this.elem.innerHTML;
    this.text = this.elem.innerText;
    this.conf = {
      exclusion: params.exclusion || null, // Unimplemented
      speed: params.speed || 100,
      color: params.color || this.elem.style.color,
      rotate: params.rotate || 360,
      delay: params.delay || 0,
      interval: params.interval || 0,
      range: params.range || 100,
      anime: params.anime || 'cubic-bezier(0.55, 0.06, 0.68, 0.19)',
    };
    this.timeout = [];
  }
  start() {
    // Ready
    const self = this;
    const charArr = [...self.text];
    self.elem.innerHTML = '';

    // Start
    for (const v of charArr) {
      // AddProperties
      let node;
      if (v.match(/\n/)) {
        node = '<br />';
      } else {
        node = `
          <span style="
            position: relative;
            display: inline-block;
            opacity: 0;
            color: ${self.conf.color};
            transition: all ${self.conf.speed}ms ${self.conf.anime};
            transform-style: preserve-3d;
            transition-duration: ${self.conf.speed}ms;
            transform: translate(
              ${(Math.random() - Math.random()) * self.conf.range}px,
              ${(Math.random() - Math.random()) * self.conf.range}px
            )
            rotateX(${Math.random() * self.conf.rotate}deg)
            rotateY(${Math.random() * self.conf.rotate}deg);
          ">${v}</span>
        `
      }

      self.elem.insertAdjacentHTML('beforeend', node);
    }

    // StartAnimation
    const targets = self.elem.children;
    let interval = self.conf.interval;

    const enumerate = function* (iter) {
      let i = 0;

      for (const x of iter) {
        yield [i, x];
        i++;
      }
    }

    for (const [i, v] of enumerate(targets)) {
      self.timeout[i] = setTimeout(function () {
        v.style.opacity = 1;
        v.style.transform = 'translate(0, 0)';
      }, self.conf.delay + interval);

      interval += self.conf.interval;
    }

  }
  stop(delay) {
    const self = this;

    setTimeout(function () {
      for (let i = 0; i < self.timeout.length; i++) {
        clearTimeout(self.timeout[i]);
      }
    }, delay);
  }
  restart() {
    this.start();
  }
  destroy() {
    const self = this;

    self.elem.innerHTML = '';
  }
}
