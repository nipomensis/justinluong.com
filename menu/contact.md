---
layout: page
title: "Join Our Team!"
slides: 
  - src: /assets/img/WiyotBurnBox2025.jpg
    alt: Burning at the Wiyot Tribe!
  - src: /assets/img/Justin-Willits-Cattle.jpg
    alt: Top dawg with da moow moows
  - src: /assets/img/ScannerFuneral.jpg
    alt: Lab Funeral for the lab leaf scanner!
  - src: /assets/img/YLR Field Work.jpg
    alt: ZAAP!
  - src: /assets/img/JustinUmbrella.jpg
    alt: Rain Rain Go Away
  - src: /assets/img/TribalYouthRestoration.jpg
    alt: The lab working with Tribal Youth Leadership to conduct grassland restoration    
  - src: /assets/img/ArcataMarshSunset.jpg
    alt: Sunset <3!!!  


---

<nav class="btn-grid" aria-label="Site sections">
  <a class="btn btn--primary" href="{{ '/menu/prospectivephdstudents.html' | relative_url }}">Prospective PhD Students</a>
  
  <a class="btn btn--primary" href="{{ '/menu/internationalscholars.html' | relative_url }}">International Scholars</a>

  <a class="btn btn--primary" href="{{ '/menu/seniorthesisinternationalstudents.html' | relative_url }}">Senior Thesis + Internship</a>
</nav>
ORC-ID = [0000-0003-2118-4788](https://orcid.org/0000-0003-2118-4788)

If you are interested in hearing more about any of my research, or think that you may want to collaborate on a future or current project do not hesitate to contact me ([justinluong@berkeley.edu](mailto:justinluong@berkeley.edu)). I am not accepting any new graduate students until Fall 2027.   
Dr. Luong invites potential postdoctoral scholars to develop and submit USDA or NSF fellowships to collaborate on current research interests.  

[Google Scholar](https://scholar.google.com/citations?user=YSOJb-wAAAAJ&hl=en)  

[ResearchGate Profile](https://www.researchgate.net/profile/Justin_Luong)

[California Native Grassland Association](https://cnga.org)

[Cheadle Center for Biodiversity and Ecological Restoration](https://www.ccber.ucsb.edu/)

[Blue Sky](https://bsky.app/profile/justincluong.bsky.social)  

This website has been built by Elias Sandoval, If this website stands out and you need web devolopment services please reach out to (eliengine.com) 
<br>


# GO BEARS!

{% include slideshow.html interval=6000 %}

<br>
<!-- Basic mixed track -->
<div class="track-mixed" aria-hidden="true"></div>
<br>

<script>
(function () {
  const ss = document.querySelector('.slideshow');
  if (!ss) return;

  const slides   = Array.from(ss.querySelectorAll('.slide'));
  const dotsWrap = ss.querySelector('.dots');
  const btnPrev  = ss.querySelector('.prev');
  const btnNext  = ss.querySelector('.next');
  const btnPause = ss.querySelector('.pause');
  const intervalMs = Number(ss.dataset.interval || 5000);

  if (!slides.length) return;           // nothing to do

  let index = slides.findIndex(s => s.classList.contains('is-active'));
  if (index < 0) index = 0, slides[0].classList.add('is-active');

  if (dotsWrap){
    slides.forEach((_, i) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.setAttribute('role', 'tab');
      b.setAttribute('aria-label', 'Slide ' + (i+1));
      b.addEventListener('click', () => go(i));
      dotsWrap.appendChild(b);
    });
  }

  function syncDots() {
    if (!dotsWrap) return;
    dotsWrap.querySelectorAll('button').forEach((b, i) => {
      b.setAttribute('aria-selected', i === index ? 'true' : 'false');
    });
  }

  function go(i) {
    slides[index].classList.remove('is-active');
    index = (i + slides.length) % slides.length;
    slides[index].classList.add('is-active');
    syncDots();
  }

  const next = () => go(index + 1);
  const prev = () => go(index - 1);

  btnNext && btnNext.addEventListener('click', next);
  btnPrev && btnPrev.addEventListener('click', prev);

  ss.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') next();
    else if (e.key === 'ArrowLeft') prev();
  });
  ss.tabIndex = 0;

  let timer = null, paused = false;
  function start() {
    if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (timer || paused) return;
    timer = setInterval(next, intervalMs);
  }
  function stop() { if (timer) clearInterval(timer); timer = null; }
  function setPaused(p) {
    paused = p;
    if (btnPause){
      btnPause.setAttribute('aria-pressed', String(p));
      btnPause.textContent = p ? 'Play' : 'Pause';
    }
    p ? stop() : start();
  }
  ss.addEventListener('mouseenter', stop);
  ss.addEventListener('mouseleave', () => { if (!paused) start(); });
  ss.addEventListener('focusin',  stop);
  ss.addEventListener('focusout', () => { if (!paused) start(); });
  btnPause && btnPause.addEventListener('click', () => setPaused(!paused));

  syncDots();
  start();
})();
</script>
