/* =============================================================================
   STOW SOLUTION — PRODUCT DETAIL PAGE SCRIPT
   File: js/detail.js
   Purpose: Reads the selected product ID from sessionStorage (set by
            search.js when the user clicks "View Details"), finds the matching
            product in the PRODUCTS array, and populates all the detail fields.
   Depends on: js/main.js  (for the PRODUCTS array)
   ============================================================================= */


/* ─────────────────────────────────────────────────────────────────────────────
   POPULATE DETAIL PAGE
   Called on DOMContentLoaded. Reads sessionStorage for the product ID,
   looks up the product, and fills in all text fields and the type badge.
   
   If no product ID is found (e.g. user landed here directly), falls back
   to showing the first product in the list.
───────────────────────────────────────────────────────────────────────────── */
function populateDetail() {
  // Get the product ID saved by search.js
  const savedId = sessionStorage.getItem('selectedProductId');

  // Find matching product, or fall back to first product
  const product = PRODUCTS.find(p => p.id === savedId) || PRODUCTS[0];

  if (!product) return; // safety check — shouldn't happen with fallback

  // ── Populate each field by element ID ──

  // Type badge overlaid on image
  setText('detail-type-badge', product.type.toUpperCase());

  // Header section
  setText('detail-product-id',  `Product ID: ${product.id}`);
  setText('detail-product-name', product.name.toUpperCase());
  setText('detail-product-price', product.price);

  // Specifications grid
  setText('detail-spec-type', product.type);
  setText('detail-spec-cap',  product.cap);
  setText('detail-spec-dim',  product.dim);

  // Description paragraph
  setText('detail-description', product.desc);
}


/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — setText
   Sets the textContent of an element by ID.
   Silently does nothing if the element doesn't exist.
───────────────────────────────────────────────────────────────────────────── */
function setText(id, value) {
  const el = document.getElementById(id);
  if (el) el.textContent = value;
}


/* ─────────────────────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  populateDetail();
});
