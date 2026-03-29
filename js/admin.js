/* =============================================================================
   STOW SOLUTION — ADMIN DASHBOARD SCRIPT
   File: js/admin.js
   Purpose: All logic for the Admin Dashboard page (pages/admin.html).
   
   Features:
     - Render product inventory table
     - Add new product (form in "create" mode)
     - Edit existing product (form in "edit" mode, pre-filled)
     - Delete product (with browser confirmation dialog)
     - Toggle between List View and Form View
     - Logout with confirmation → redirect to home
   
   NOTE: Data is stored in a JS array and persists only during the session.
         Refreshing the page resets all changes to the defaults below.
   ============================================================================= */


/* ─────────────────────────────────────────────────────────────────────────────
   ADMIN PRODUCT DATA
   Separate from the public-facing PRODUCTS in main.js.
   These are the items displayed in the admin inventory table.
───────────────────────────────────────────────────────────────────────────── */
let adminProducts = [
  {
    id:    101,
    name:  'Selective Frame',
    type:  'Selective',
    price: '$120.00',
    cap:   '1200 kg',
    dim:   '240x100x360',
    desc:  'Standard selective pallet rack frame for heavy duty storage.',
  },
  {
    id:    102,
    name:  'Cross Beam 96"',
    type:  'Selective',
    price: '$45.00',
    cap:   '2500 kg',
    dim:   '240x10x5',
    desc:  'High strength cross beam with safety pins included.',
  },
  {
    id:    103,
    name:  'Wire Decking',
    type:  'Custom',
    price: '$35.00',
    cap:   '1500 kg',
    dim:   '100x115',
    desc:  'Galvanized wire mesh decking for added safety.',
  },
  {
    id:    104,
    name:  'Drive-In Rail',
    type:  'Drive-In',
    price: '$85.00',
    cap:   '1000 kg',
    dim:   '300x8x8',
    desc:  'Heavy duty rail for high-density drive-in systems.',
  },
];

// Auto-increment ID counter for newly created products
let nextProductId = 105;

// Tracks which product is being edited. null = creating a new product.
let currentEditId = null;


/* ─────────────────────────────────────────────────────────────────────────────
   RENDER TABLE
   Rebuilds the <tbody> from the current adminProducts array.
   Called after every add / edit / delete action.
───────────────────────────────────────────────────────────────────────────── */
function renderAdminTable() {
  const tbody = document.getElementById('admin-tbody');
  if (!tbody) return;

  // Show empty state message if no products exist
  if (adminProducts.length === 0) {
    tbody.innerHTML = `
      <tr>
        <td colspan="5" class="table-empty">
          No products found in inventory.
        </td>
      </tr>
    `;
    return;
  }

  // Build a row for each product
  tbody.innerHTML = adminProducts.map(product => `
    <tr>
      <td class="td-id">${product.id}</td>
      <td class="td-name">${product.name}</td>
      <td class="u-upper">${product.type}</td>
      <td class="td-price">${product.price}</td>
      <td class="td-actions">
        <div class="td-actions-inner">
          <!-- Opens form pre-filled with this product's data -->
          <button class="table-edit-btn" onclick="openEditForm(${product.id})">Edit</button>
          <!-- Prompts confirmation before deleting -->
          <button class="table-del-btn"  onclick="deleteProduct(${product.id})">Del</button>
        </div>
      </td>
    </tr>
  `).join('');
}


/* ─────────────────────────────────────────────────────────────────────────────
   DELETE PRODUCT
   Shows a browser confirmation dialog. If confirmed, removes the product
   from the array and re-renders the table.
───────────────────────────────────────────────────────────────────────────── */
function deleteProduct(id) {
  const confirmed = window.confirm('Are you sure you want to delete this product?');
  if (!confirmed) return;

  adminProducts = adminProducts.filter(p => p.id !== id);
  renderAdminTable();
}


/* ─────────────────────────────────────────────────────────────────────────────
   OPEN FORM — CREATE MODE
   Called by the "+ Add New Product" button.
   Clears all form fields and sets the title to "Create New Product".
───────────────────────────────────────────────────────────────────────────── */
function openCreateForm() {
  currentEditId = null; // signal: no product being edited

  // Update form title and submit button text for create mode
  document.getElementById('form-card-title').textContent = 'Create New Product';
  document.getElementById('form-save-btn').textContent   = 'Publish Product';

  // Clear all input fields
  clearFormFields();

  // Switch to form view
  showFormView();
}


/* ─────────────────────────────────────────────────────────────────────────────
   OPEN FORM — EDIT MODE
   Called by the "Edit" button on each table row.
   Pre-fills all form fields with the selected product's data.
───────────────────────────────────────────────────────────────────────────── */
function openEditForm(id) {
  const product = adminProducts.find(p => p.id === id);
  if (!product) return;

  currentEditId = id; // remember which product we are editing

  // Update form title and submit button text for edit mode
  document.getElementById('form-card-title').textContent = 'Edit Existing Product';
  document.getElementById('form-save-btn').textContent   = 'Save Changes';

  // Pre-fill fields with existing product data
  document.getElementById('f-name').value  = product.name;
  document.getElementById('f-type').value  = product.type;
  document.getElementById('f-cap').value   = product.cap;
  document.getElementById('f-dim').value   = product.dim;
  document.getElementById('f-price').value = product.price;
  document.getElementById('f-desc').value  = product.desc;

  // Switch to form view
  showFormView();
}


/* ─────────────────────────────────────────────────────────────────────────────
   SAVE PRODUCT
   Called by the "Publish Product" / "Save Changes" button.
   
   - Validates required fields (name + price)
   - In create mode: pushes a new object to adminProducts
   - In edit mode: updates the existing object in-place
   - Returns to list view and re-renders the table
───────────────────────────────────────────────────────────────────────────── */
function saveProduct() {
  // Read form values
  const name  = document.getElementById('f-name').value.trim();
  const type  = document.getElementById('f-type').value;
  const cap   = document.getElementById('f-cap').value.trim();
  const dim   = document.getElementById('f-dim').value.trim();
  const price = document.getElementById('f-price').value.trim();
  const desc  = document.getElementById('f-desc').value.trim();

  // Validate required fields
  if (!name)  { alert('Product Full Name is required.'); return; }
  if (!price) { alert('Current Pricing is required.');   return; }

  if (currentEditId === null) {
    // ── CREATE: add a new product ──
    adminProducts.push({
      id: nextProductId++,
      name, type, cap, dim, price, desc,
    });
  } else {
    // ── EDIT: find and update existing product ──
    const product = adminProducts.find(p => p.id === currentEditId);
    if (product) {
      product.name  = name;
      product.type  = type;
      product.cap   = cap;
      product.dim   = dim;
      product.price = price;
      product.desc  = desc;
    }
  }

  // Re-render table and return to list view
  renderAdminTable();
  showListView();
}


/* ─────────────────────────────────────────────────────────────────────────────
   VIEW SWITCHERS
   Toggle between the two states of the admin page.
───────────────────────────────────────────────────────────────────────────── */

function showFormView() {
  document.getElementById('admin-list-view').style.display = 'none';
  document.getElementById('admin-form-view').classList.add('is-visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function showListView() {
  document.getElementById('admin-list-view').style.display = '';
  document.getElementById('admin-form-view').classList.remove('is-visible');
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


/* ─────────────────────────────────────────────────────────────────────────────
   DISCARD / BACK TO LIST
   Returns to list view without saving. No data is changed.
───────────────────────────────────────────────────────────────────────────── */
function discardForm() {
  showListView();
}


/* ─────────────────────────────────────────────────────────────────────────────
   LOGOUT
   Shows confirmation dialog, then redirects to the home page.
───────────────────────────────────────────────────────────────────────────── */
function handleLogout() {
  const confirmed = window.confirm('Are you sure you want to logout?');
  if (confirmed) {
    window.location.href = '../index.html';
  }
}


/* ─────────────────────────────────────────────────────────────────────────────
   HELPER — clearFormFields
   Resets all form inputs to empty/default values.
───────────────────────────────────────────────────────────────────────────── */
function clearFormFields() {
  document.getElementById('f-name').value  = '';
  document.getElementById('f-type').value  = 'Selective';
  document.getElementById('f-cap').value   = '';
  document.getElementById('f-dim').value   = '';
  document.getElementById('f-price').value = '';
  document.getElementById('f-desc').value  = '';
}


/* ─────────────────────────────────────────────────────────────────────────────
   INIT
───────────────────────────────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  renderAdminTable();
});
