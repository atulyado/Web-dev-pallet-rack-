/* =============================================================================
   STOW SOLUTION — SEARCH PAGE SCRIPT
   File: js/search.js
   Purpose: Renders the product result cards and handles the
            "View Details" button click (passes product data to detail page
            via sessionStorage).
   Depends on: js/main.js  (for the PRODUCTS array)
   ============================================================================= */


/* ─────────────────────────────────────────────────────────────────────────────
   RENDER RESULT CARDS
   Loops over the global PRODUCTS array (defined in main.js) and builds
   a card for each product, injecting it into #results-list.
───────────────────────────────────────────────────────────────────────────── */
function renderResults() {
  const list = document.getElementById('results-list');
  if (!list) return;

  // Update the results count in the heading
  const heading = document.getElementById('results-heading');
  if (heading) heading.textContent = `Results (${PRODUCTS.length})`;

  // Build card HTML for each product
  list.innerHTML = PRODUCTS.map(product => `
    <div class="result-card">

      <!-- Left: product info -->
      <div class="result-card-left">
        <div class="result-tags">
          <span class="result-badge">${product.type}</span>
          <span class="result-id">ID: ${product.id}</span>
        </div>
        <div class="result-name">${product.name}</div>
        <div class="result-desc">${product.desc}</div>
      </div>

      <!-- Right: capacity + action button -->
      <div class="result-card-right">
        <div>
          <div class="result-capacity-label">Capacity</div>
          <div class="result-capacity-value">${product.cap}</div>
        </div>
        <button
          class="result-view-btn"
          onclick="goToDetail('${product.id}')"
        >
          View Details
        </button>
      </div>

    </div>
  `).join('');
}


/* ─────────────────────────────────────────────────────────────────────────────
   NAVIGATE TO DETAIL PAGE
   Saves the selected product's ID to sessionStorage so detail.js can
   retrieve it, then redirects to the detail page.
   
   NOTE: sessionStorage is cleared when the browser tab is closed.
         This is intentional — no server or database is used.
───────────────────────────────────────────────────────────────────────────── */
function goToDetail(productId) {
  sessionStorage.setItem('selectedProductId', productId);
  window.location.href = 'detail.html';
}


/* ─────────────────────────────────────────────────────────────────────────────
   INIT — runs after DOM is ready
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderResults();
});
