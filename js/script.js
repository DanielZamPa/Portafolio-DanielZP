// --- Lógica del Modal ---
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar elementos del DOM de forma más segura
  const openModalButtons = document.querySelectorAll('.modalContacto');
  const closeModalButton = document.getElementById('closeModal');
  const modal = document.getElementById('modal');
  const contactForm = document.getElementById('contactForm'); // Asumiendo que tu form tiene este ID

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

  // --- Lógica del Dropdown ---
  const dropdownBtn = document.querySelector('.dropdown-btn');
  if (dropdownBtn) {
    dropdownBtn.addEventListener('click', function () {
      const dropdownContent = document.querySelector('.dropdown-content');
      if (dropdownContent) {
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
      }
    });
  }

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

  // --- Animación de Inicio con Anime.js Timeline ---
  function runStartupAnimation() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Usamos una línea de tiempo para orquestar todas las animaciones
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // 1. Animación del logo en la pantalla de carga
    tl.add({
      targets: '#splash-logo',
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 1000,
    })
    // 2. Desaparición de la pantalla de carga
    .add({
      targets: '#splash-screen',
      opacity: 0,
      duration: 800,
      complete: () => {
        // Oculta la pantalla de carga completamente para poder interactuar con la página
        if(splashScreen) splashScreen.style.display = 'none';
      }
    }, '+=500') // Espera 500ms después de la animación del logo
    // 3. Animación de entrada de la barra de navegación y el header
    .add({
      targets: 'nav, header',
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(100)
    }, '-=800') // Empieza al mismo tiempo que la pantalla de carga desaparece
    // 4. Animación del contenido del header (nombre, foto, etc.)
    .add({
      targets: '#descripcionPerfil > *, #fotoPerfil',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, {from: 'first'})
    }, '-=500'); // Empieza un poco después de que el header aparece
  }
  
  // Ejecutar la animación cuando el DOM esté listo
  runStartupAnimation();
});