---
layout: default
title: California Grassland Policy Library
permalink: /menu/policy-library.html
---

<div class="container reslib">

  <p class="reslib-intro">
A library of California state Assembly Bills, Senate Bills and Propositions relevant to California Grasslands.
</p>


 <!-- Category filter (Soil / Planting / Seed) -->
  <nav class="btn-grid reslib-filters" aria-label="Filter resources by category">
    <a class="btn btn--primary" href="#" data-filter-cat="all">All</a>
    <a class="btn btn--soft" href="#" data-filter-cat="biodiversity">Biodiversity</a>
    <a class="btn btn--soft" href="#" data-filter-cat="planting">Planting</a>
    <a class="btn btn--soft" href="#" data-filter-cat="seed">Seed</a>
  </nav>


  <!-- Type + Search + Reset -->
  <div class="rp-table-head reslib-searchbar" style="margin-bottom: 1rem;">
    <h3 class="rp-table-title" style="margin:0;">Filter</h3>

    <div style="display:flex; gap:10px; align-items:center; flex-wrap:wrap; justify-content:flex-end;">
      <label class="sr-only" for="resType">Policy focus</label>
      <select id="resType" class="rp-filter" style="width:auto; min-width: 220px;">
        <option value="all">All resource types</option>
        <option value="news">News / Article</option>
        <option value="tool">Tool / Approach</option>
        <option value="report">Report / Summary</option>
        <option value="research">Research / Methods</option>
        <option value="place">Place / Preserve</option>
      </select>

      <label class="sr-only" for="resSearch">Search</label>
      <input class="rp-filter" id="resSearch" type="search" placeholder="Search title, org, tags…" />

      <a class="btn btn--outline" href="#" id="resReset" style="width:auto;">Reset</a>
    </div>
  </div>

  <!-- Cards -->
  <div class="reslib-grid" id="reslibGrid">
    {% assign items = site.data.policy_library %}
    {% for r in items %}
      <article
        class="rescard"
        data-cats="{{ r.categories | join: ' ' | downcase }}"
        data-type="{{ r.resource_type | downcase | replace: ' / ', ' ' | replace: '/', ' ' }}"
      >
        <header class="rescard-head">
          <h3 class="rescard-title">
            <a href="{{ r.url }}" target="_blank" rel="noopener">{{ r.title }}</a>
          </h3>

          <p class="rescard-meta">
            <strong>{{ r.org }}</strong>
            {% if r.resource_type %} · <span>{{ r.resource_type }}</span>{% endif %}
            {% if r.location %} · <span>{{ r.location }}</span>{% endif %}
            {% if r.year %} · <span>{{ r.year }}</span>{% endif %}
          </p>

          {% if r.categories and r.categories.size > 0 %}
            <ul class="rescard-chips" aria-label="Categories">
              {% for c in r.categories %}
                <li class="chip chip--{{ c | downcase }}">{{ c | capitalize }}</li>
              {% endfor %}
            </ul>
          {% endif %}
        </header>

        {% if r.summary %}
          <p class="rescard-summary">{{ r.summary }}</p>
        {% endif %}

        {% if r.highlights and r.highlights.size > 0 %}
          <ul class="rescard-bullets">
            {% for h in r.highlights %}
              <li>{{ h }}</li>
            {% endfor %}
          </ul>
        {% endif %}

        {% if r.tags and r.tags.size > 0 %}
          <ul class="practitioner-tags rescard-tags" aria-label="Tags">
            {% for t in r.tags %}
              <li class="tag">{{ t }}</li>
            {% endfor %}
          </ul>
        {% endif %}

        <div class="practitioner-actions rescard-actions">
          <a class="is-primary" href="{{ r.url }}" target="_blank" rel="noopener">Open resource</a>
          {% if r.pdf_url %}
            <a href="{{ r.pdf_url }}" target="_blank" rel="noopener">PDF</a>
          {% endif %}
        </div>
      </article>
    {% endfor %}
  </div>

  <p class="reslib-empty" id="reslibEmpty" style="display:none; color: var(--muted);">
    No matches. Try a different filter or search term.
  </p>

</div>

<script>
(() => {
  const grid = document.getElementById("reslibGrid");
  if (!grid) return;

  const cards = Array.from(grid.querySelectorAll(".rescard"));
  const catButtons = Array.from(document.querySelectorAll('.reslib-filters a[data-filter-cat]'));
  const typeSelect = document.getElementById("resType");
  const searchInput = document.getElementById("resSearch");
  const resetBtn = document.getElementById("resReset");
  const empty = document.getElementById("reslibEmpty");

  const state = { cat: "all", type: "all", q: "" };

  const normalize = (s) => (s || "").toString().toLowerCase().trim();

  function setActiveCatButton(cat) {
    catButtons.forEach((b) => {
      const on = b.dataset.filterCat === cat;
      b.classList.toggle("btn--primary", on);
      b.classList.toggle("btn--soft", !on);
      b.setAttribute("aria-pressed", on ? "true" : "false");
    });
  }

  function cardMatches(card) {
    // Category
    if (state.cat !== "all") {
      const cats = normalize(card.getAttribute("data-cats"))
        .split(/\s+/)
        .filter(Boolean);
      if (!cats.includes(state.cat)) return false;
    }

    // Resource type
    if (state.type !== "all") {
      const t = normalize(card.getAttribute("data-type"));
      if (!t.includes(state.type)) return false;
    }

    // Search
    if (state.q) {
      // textContent is safer + faster than innerText for this use
      const text = normalize(card.textContent);
      if (!text.includes(state.q)) return false;
    }

    return true;
  }

  function apply() {
    let shown = 0;

    cards.forEach((card) => {
      const ok = cardMatches(card);
      // hidden avoids layout weirdness vs display toggles
      card.hidden = !ok;
      if (ok) shown++;
    });

    if (empty) empty.style.display = shown ? "none" : "";
  }

  // Keep filters in URL hash (shareable filtered views)
  function writeHash() {
    const params = new URLSearchParams();
    if (state.cat !== "all") params.set("cat", state.cat);
    if (state.type !== "all") params.set("type", state.type);
    if (state.q) params.set("q", state.q);

    const s = params.toString();
    const newUrl = location.pathname + location.search + (s ? "#" + s : "");
    history.replaceState(null, "", newUrl);
  }

  function readHash() {
    const h = location.hash.replace(/^#/, "");
    if (!h) return;

    const params = new URLSearchParams(h);
    state.cat = normalize(params.get("cat")) || "all";
    state.type = normalize(params.get("type")) || "all";
    state.q = normalize(params.get("q")) || "";
  }

  function syncControlsFromState() {
    setActiveCatButton(state.cat);
    if (typeSelect) typeSelect.value = state.type;
    if (searchInput) searchInput.value = state.q;
  }

  // --- Event wiring ---

  catButtons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      state.cat = normalize(btn.dataset.filterCat) || "all";
      setActiveCatButton(state.cat);
      apply();
      writeHash();
    });
  });

  if (typeSelect) {
    typeSelect.addEventListener("change", () => {
      state.type = normalize(typeSelect.value) || "all";
      apply();
      writeHash();
    });
  }

  if (searchInput) {
    searchInput.addEventListener("input", () => {
      state.q = normalize(searchInput.value);
      apply();
      writeHash();
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", (e) => {
      e.preventDefault();
      state.cat = "all";
      state.type = "all";
      state.q = "";
      syncControlsFromState();
      apply();
      writeHash();
    });
  }

  // If user manually edits the hash / uses back-forward
  window.addEventListener("hashchange", () => {
    // reset first so removing a param restores defaults
    state.cat = "all";
    state.type = "all";
    state.q = "";
    readHash();
    syncControlsFromState();
    apply();
  });

  // --- I

 

 
