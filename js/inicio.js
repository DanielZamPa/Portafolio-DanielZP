document.addEventListener('DOMContentLoaded', () => {
  // --- Animación de Inicio con Anime.js Timeline ---
  function runStartupAnimation() {
    const splashScreen = document.getElementById('splash-screen');
    
    // Usamos una línea de tiempo para orquestar todas las animaciones
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });

    // 1. Animación del logo en la pantalla de carga
    tl.add({
      targets: '#splash-logo, #tituloSplash',
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 1000,
    })
    // 2. Desaparición de la pantalla de carga
    .add({
      targets: '#splash-logo, #tituloSplash',
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