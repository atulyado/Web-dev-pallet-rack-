/* =============================================================================
   STOW SOLUTION — SHARED JAVASCRIPT
   File: js/main.js
   Purpose: Shared utilities used by every page:
     - Injecting the navbar and footer HTML
     - Highlighting the active nav link for the current page
     - Shared product data used by search.js and detail.js
   
   HOW IT WORKS:
     Each HTML page includes this file via <script src="../js/main.js">.
     On DOMContentLoaded, it builds the navbar + footer and sets the
     correct active states based on a data-page attribute on <body>.
   ============================================================================= */


/* ─────────────────────────────────────────────────────────────────────────────
   SHARED PRODUCT DATA
   Single source of truth for the 5 public-facing products shown on the
   Search page and the Detail page.
   
   Each object contains:
     id       — display identifier (e.g. "R-001")
     name     — product name
     type     — rack category
     cap      — load capacity string
     price    — formatted price string
     dim      — dimensions string
     desc     — short description
───────────────────────────────────────────────────────────────────────────── */
const PRODUCTS = [
  {
    id:    'R-001',
    name:  'Heavy Duty Selective',
    type:  'Selective',
    cap:   '1500 kg',
    price: '$1,250.00',
    dim:   '240cm W x 100cm D x 360cm H',
    desc:  'Most common storage system for immediate access to every pallet location. Ideal for warehouses with a wide variety of SKUs and high turnover rates.',
  },
  {
    id:    'R-002',
    name:  'Standard Drive-In',
    type:  'Drive-In',
    cap:   '1200 kg',
    price: '$980.00',
    dim:   '300cm W x 200cm D x 400cm H',
    desc:  'Excellent for high-density storage needs. Best suited for large quantities of the same SKU with LIFO access.',
  },
  {
    id:    'R-003',
    name:  'Structural Cantilever',
    type:  'Cantilever',
    cap:   '2500 kg',
    price: '$2,100.00',
    dim:   '300cm W x 120cm D x 500cm H',
    desc:  'Designed for oversized, heavy items like lumber, pipe, or furniture. Arms extend outward for easy forklift access.',
  },
  {
    id:    'R-004',
    name:  'Teardrop Selective',
    type:  'Selective',
    cap:   '1000 kg',
    price: '$850.00',
    dim:   '240cm W x 100cm D x 300cm H',
    desc:  'Universal teardrop design compatible with many rack brands. Easy to assemble and reconfigure without tools.',
  },
  {
    id:    'R-005',
    name:  'Medium Duty Shelving',
    type:  'Custom',
    cap:   '400 kg',
    price: '$420.00',
    dim:   '180cm W x 60cm D x 200cm H',
    desc:  'Perfect for small parts and manual picking. Lightweight structure ideal for offices, stockrooms, and retail storage.',
  },
];


/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR HTML TEMPLATE
   Returns the complete navbar markup as a string.
   Navigation links use relative paths so they work from any subfolder.
   The active link is highlighted after injection using setActiveNav().
───────────────────────────────────────────────────────────────────────────── */
function getNavbarHTML() {
  return `
    <nav id="navbar">
      <a class="nav-logo" href="../index.html">
        <div class="nav-logo-icon">S</div>
        <span class="nav-logo-text">Stow Solution</span>
      </a>

      <div class="nav-right">
        <div class="nav-links">
          <a class="nav-link" id="nav-home"    href="../index.html">Home</a>
          <a class="nav-link" id="nav-products" href="search.html">Products</a>
          <a class="nav-link" id="nav-team"    href="team.html">Team</a>
        </div>
        <div class="nav-divider"></div>
        <a class="nav-admin-btn" id="nav-admin-btn" href="login.html">Admin Login</a>
      </div>
    </nav>
  `;
}


/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER HTML TEMPLATE
   Returns the complete footer markup as a string.
───────────────────────────────────────────────────────────────────────────── */
function getFooterHTML() {
  return `
    <footer id="footer">
      <div class="footer-inner">

        <!-- Three column info section -->
        <div class="footer-top">

          <!-- Column 1: Company description -->
          <div>
            <div class="footer-col-title">Stow Solution</div>
            <p class="footer-desc">
              Professional Warehouse Storage Solutions &amp; Pallet Rack Systems
              for Industrial Applications.
            </p>
          </div>

          <!-- Column 2: Contact details -->
          <div>
            <div class="footer-col-label">Contact Info</div>
            <div class="footer-contact-item">1234 Industrial Way, Suite 100</div>
            <div class="footer-contact-item">Logistics City, ST 54321</div>
            <div class="footer-contact-item">Phone: (555) 012-3456</div>
            <div class="footer-contact-item">Email: info@stow-solution.com</div>
          </div>

          <!-- Column 3: Social media (placeholder for real icons) -->
          <div>
            <div class="footer-social-placeholder">Social Media Icons Placeholder</div>
          </div>

        </div>

        <!-- Copyright bar -->
        <div class="footer-bottom">
          &copy; 2026 Stow Solution Wireframe Design
        </div>

      </div>
    </footer>
  `;
}


/* ─────────────────────────────────────────────────────────────────────────────
   SET ACTIVE NAVIGATION STATE
   
   Each HTML page sets a data attribute on <body>:
     <body data-page="home">
   
   This function reads that attribute and applies the .nav-active class
   to the correct link and .nav-admin-active to the admin button when on
   login or admin pages.
   
   Also highlights "Products" link when viewing a product detail page.
───────────────────────────────────────────────────────────────────────────── */
function setActiveNav() {
  // Read which page this is from the <body data-page="..."> attribute
  const currentPage = document.body.dataset.page;

  // Map page names to their corresponding nav link IDs
  const pageToNavId = {
    'home':    'nav-home',
    'search':  'nav-products',
    'detail':  'nav-products', // detail is a sub-page of Products
    'team':    'nav-team',
  };

  // Apply active class to the matching nav link
  const activeNavId = pageToNavId[currentPage];
  if (activeNavId) {
    const el = document.getElementById(activeNavId);
    if (el) el.classList.add('nav-active');
  }

  // Highlight admin button when on login or admin pages
  if (currentPage === 'login' || currentPage === 'admin') {
    const adminBtn = document.getElementById('nav-admin-btn');
    if (adminBtn) adminBtn.classList.add('nav-admin-active');
  }
}


/* ─────────────────────────────────────────────────────────────────────────────
   INJECT SHARED COMPONENTS & INITIALISE
   Runs when the DOM is fully loaded on every page.
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  // ── Inject Navbar ──
  // Every page has a <div id="navbar-placeholder"></div> at the top of <body>.
  const navPlaceholder = document.getElementById('navbar-placeholder');
  if (navPlaceholder) {
    navPlaceholder.outerHTML = getNavbarHTML();
    // Set active state after the navbar is in the DOM
    setActiveNav();
  }

  // ── Inject Footer ──
  // Every page has a <div id="footer-placeholder"></div> before </body>.
  const footerPlaceholder = document.getElementById('footer-placeholder');
  if (footerPlaceholder) {
    footerPlaceholder.outerHTML = getFooterHTML();
  }

});
