document.addEventListener('DOMContentLoaded', () => {
  function runStartupAnimation() {
    const splashScreen = document.getElementById('splash-screen');
    
    const tl = anime.timeline({
      easing: 'easeOutExpo',
    });
    
    tl.add({
      targets: '#splash-logo, #tituloSplash',
      scale: [0.5, 1],
      opacity: [0, 1],
      duration: 1000,
    })
    .add({
      targets: '#splash-logo, #tituloSplash',
      opacity: 0,
      duration: 800,
      complete: () => { 
        if(splashScreen) splashScreen.style.display = 'none';
      }
    }, '+=500')
    .add({
      targets: 'nav, header',
      translateY: [-100, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(100)
    }, '-=800')
    .add({
      targets: '#descripcionPerfil > *, #fotoPerfil',
      translateX: [-50, 0],
      opacity: [0, 1],
      delay: anime.stagger(150, {from: 'first'})
    }, '-=500');
  }
  
  runStartupAnimation();
});