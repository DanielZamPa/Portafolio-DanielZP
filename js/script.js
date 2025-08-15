// Seleccionar elementos
const openModalButtons = document.querySelectorAll('.modalContacto');
const closeModal = document.getElementById('closeModal');
const modal = document.getElementById('modal');

// Abrir el modal
openModalButtons.forEach(button => {
  button.addEventListener('click', () => {
    modal.style.display = 'flex';
  });
});

// Cerrar el modal
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});

// Cerrar el modal al hacer clic fuera del contenido
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

document.querySelector('.dropdown-btn').addEventListener('click', function () {
  const dropdownContent = document.querySelector('.dropdown-content');
  dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
});