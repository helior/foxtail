NProgress.configure({
  minimum: 0.2,
  speed: 200,
  trickle: true,
  trickleRate: 0.2,
  trickleSpeed: 300,
  showSpinner: false
});

NProgress.start();

window.onload = function() {
  NProgress.done();
};
