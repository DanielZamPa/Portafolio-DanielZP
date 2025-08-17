document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar elementos del DOM de forma más segura
  const openModalButtons = document.querySelectorAll('.modalContacto');
  const closeModalButton = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const contactForm = document.getElementById('contactForm');  

  // Función para abrir el modal
  const openModal = () => {
    if (modal) modal.style.display = 'flex';    
  };

  // Función para cerrar el modal
  const closeModal = () => {
    if (modal) modal.style.display = 'none';    
  };

  // Asignar eventos para abrir el modal
  openModalButtons.forEach(button => {
    button.addEventListener('click', openModal);
  });

  // Asignar evento para cerrar el modal con el botón
  if (closeModalButton) {
    closeModalButton.addEventListener('click', closeModal);
  }

  // Cerrar el modal al hacer clic fuera del contenido
  window.addEventListener('click', (event) => {
    if (event.target === modal) {
      closeModal();
    }
  });
  // --- Lógica del Formulario de Contacto (usando Netlify FormsI) ---
  if (contactForm) {
    contactForm.addEventListener('submit', async function (event) {
      event.preventDefault(); // Evita que el formulario se envíe de la forma tradicional
      const status = document.getElementById('form-status'); // Un elemento para mostrar mensajes

      // Netlify requiere que los datos se envíen en formato URL-encoded para AJAX
      const formData = new FormData(this);
      const response = await fetch("/", { // Netlify procesa el envío en la misma URL
        method: this.method,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(formData).toString()
      });

      if (response.ok) {
        if (status) {
          status.innerHTML = "¡Gracias por tu mensaje! Ha sido enviado.";
          status.style.color = "green";
        }
        this.reset(); // Limpia el formulario
        setTimeout(closeModal, 2000); // Cierra el modal después de 2 segundos
      } else {
        if (status) {
          status.innerHTML = "Hubo un error al enviar el formulario. Inténtalo de nuevo.";
          status.style.color = "red";
        }
      }
    });
  }
});