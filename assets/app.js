// Tukk Solutions portfolio — vanilla JS: nav, scroll reveals, count-ups,
// card spotlight tracking, work-page industry filters. No dependencies.
(function () {
  "use strict";
  var reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* header state + mobile menu */
  var header = document.querySelector("header.site");
  if (header) {
    var onScroll = function () { header.classList.toggle("scrolled", window.scrollY > 8); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
  }
  var menuBtn = document.querySelector(".menu-btn");
  var navList = document.querySelector(".nav nav");
  if (menuBtn && navList) {
    menuBtn.addEventListener("click", function () {
      var open = navList.classList.toggle("open");
      menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
    });
    navList.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        navList.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* scroll reveals */
  var revealEls = document.querySelectorAll(".reveal");
  if (reduced || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  }

  /* count-up stats */
  function countUp(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var suffix = el.getAttribute("data-suffix") || "";
    if (reduced || isNaN(target)) { el.textContent = target.toLocaleString("en-CA") + suffix; return; }
    var dur = 1300, start = null;
    function tick(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased).toLocaleString("en-CA") + suffix;
      if (p < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (!("IntersectionObserver" in window)) {
      counters.forEach(countUp);
    } else {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { countUp(en.target); cio.unobserve(en.target); }
        });
      }, { threshold: 0.4 });
      counters.forEach(function (el) { cio.observe(el); });
    }
  }

  /* cursor spotlight + subtle tilt on cards (reactive bento) */
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches && !reduced) {
    document.querySelectorAll(".work-card").forEach(function (card) {
      card.addEventListener("pointermove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
        var rx = (0.5 - py) * 4, ry = (px - 0.5) * 4;
        card.style.transform = "translateY(-4px) perspective(900px) rotateX(" + rx.toFixed(2) + "deg) rotateY(" + ry.toFixed(2) + "deg)";
      });
      card.addEventListener("pointerleave", function () { card.style.transform = ""; });
    });
  }

  /* work page: industry filter pills */
  var pills = document.querySelectorAll(".pill[data-filter]");
  if (pills.length) {
    var groups = document.querySelectorAll("[data-industry]");
    pills.forEach(function (pill) {
      pill.addEventListener("click", function () {
        pills.forEach(function (p) { p.classList.remove("on"); p.setAttribute("aria-pressed", "false"); });
        pill.classList.add("on");
        pill.setAttribute("aria-pressed", "true");
        var f = pill.getAttribute("data-filter");
        groups.forEach(function (g) {
          g.style.display = (f === "all" || g.getAttribute("data-industry") === f) ? "" : "none";
        });
      });
    });
  }

  /* footer year */
  var yr = document.querySelector("[data-year]");
  if (yr) yr.textContent = new Date().getFullYear();
})();
