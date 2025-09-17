<script>
(function () {
  var mq = window.matchMedia('(max-width: 760px)');
  var details = document.querySelector('.menu-collapsible');
  if (!details) return;

  function applyByViewport(e) {
    if (mq.matches) {            // small screen: start collapsed
      details.open = false;
    } else {                     // desktop: always open (banner)
      details.open = true;
    }
  }

  // On first load
  applyByViewport();
  // Keep behavior consistent if the viewport crosses the breakpoint
  mq.addEventListener ? mq.addEventListener('change', applyByViewport)
                      : mq.addListener(applyByViewport);
})();
</script>
