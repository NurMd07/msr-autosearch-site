// microsoft icon animation

var loadingIcon = $("#loading-icon");
var puzzleContainer = $("#container");
var piece = $("#loading-icon rect");
var speed1 = 0.5;
var speed2 = 0.7;

var tl = new TimelineMax({
  onComplete: function () {
    this.invalidate();
    this.restart();
  },
});

tl.staggerTo(
  piece,
  speed1,
  {
    scale: 0.7,
    transformOrigin: "50% 50%",
    ease: Bounce.easeOut,
  },
  0.04
)

  .to(loadingIcon, speed2, {
    rotation: "+=90",
    ease: Circ.easeInOut,
  })

  .to(piece, speed1, {
    scale: 1.45,
    ease: Circ.easeInOut,
    rotation: "+=90",
  })

  .to(loadingIcon, speed2, {
    rotation: "+=90",
    ease: Circ.easeInOut,
  });
