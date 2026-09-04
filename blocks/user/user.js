export default function decorate(block) {
  // Read default values from block content (if authored)
  const rows = [...block.children];
  const defaultFirst = rows[0]?.querySelector('div')?.textContent.trim() || '';
  const defaultLast = rows[1]?.querySelector('div')?.textContent.trim() || '';

  // Build display area
  const display = document.createElement('div');
  display.className = 'user-display';
  display.textContent = 'No user set.';

  // Build open-dialog button
  const editBtn = document.createElement('button');
  editBtn.className = 'user-edit-btn';
  editBtn.type = 'button';
  editBtn.textContent = 'Enter Name';

  // Build dialog
  const dialog = document.createElement('dialog');
  dialog.className = 'user-dialog';
  dialog.innerHTML = `
    <form method="dialog" class="user-form">
      <h2>Enter your name</h2>
      <label>
        First name
        <input type="text" name="firstName" autocomplete="given-name" required />
      </label>
      <label>
        Last name
        <input type="text" name="lastName" autocomplete="family-name" required />
      </label>
      <div class="user-form-actions">
        <button type="submit" class="user-btn-primary">Save</button>
        <button type="button" class="user-btn-cancel">Cancel</button>
      </div>
    </form>
  `;

  const form = dialog.querySelector('form');
  const firstInput = form.querySelector('[name="firstName"]');
  const lastInput = form.querySelector('[name="lastName"]');

  // Pre-fill from authored content
  firstInput.value = defaultFirst;
  lastInput.value = defaultLast;

  editBtn.addEventListener('click', () => {
    dialog.showModal();
    firstInput.focus();
  });

  dialog.querySelector('.user-btn-cancel').addEventListener('click', () => {
    dialog.close();
  });

  form.addEventListener('submit', () => {
    const first = firstInput.value.trim();
    const last = lastInput.value.trim();
    display.textContent = `Hello, ${first} ${last}!`;
    editBtn.textContent = 'Edit Name';
  });

  // Close on backdrop click
  dialog.addEventListener('click', (e) => {
    if (e.target === dialog) dialog.close();
  });

  block.replaceChildren(display, editBtn, dialog);
}
