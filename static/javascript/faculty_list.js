// “Flux” (filter) function: search + department
const searchInput = document.getElementById('searchInput');
const deptSelect  = document.getElementById('deptSelect');
const cards = [...document.querySelectorAll('#grid > .col-12')];

function filterFaculty() {
  const q = (searchInput.value || '').trim().toLowerCase();
  const dept = (deptSelect.value || '').toLowerCase();

  cards.forEach(col => {
    const name = (col.dataset.name || '').toLowerCase();
    const cDept = (col.dataset.dept || '').toLowerCase();

    const hitName = !q || name.includes(q);
    const hitDept = !dept || dept === cDept;

    col.classList.toggle('d-none', !(hitName && hitDept));
  });
}

searchInput.addEventListener('input', filterFaculty);
deptSelect.addEventListener('change', filterFaculty);

// “Add Faculty” button – wire up to your route
document.getElementById('addBtn').addEventListener('click', () => {
  // change this to whatever page you use for adding
  window.location.href = 'faculty-upload.html';
});
