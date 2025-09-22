document.addEventListener('DOMContentLoaded', () => {
    const carouselScrollContainer = document.querySelector('.carousel-container'); // Este es el elemento que se desplaza
    const track = document.querySelector('.carousel-track'); // Este es el contenido dentro del contenedor desplazable
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');

    if (!carouselScrollContainer || !track || !prevBtn || !nextBtn) {
        console.error("No se encontraron los elementos del carrusel.");
        return;
    }

    const cards = Array.from(track.children);
    if (cards.length === 0) {
        prevBtn.disabled = true;
        nextBtn.disabled = true;
        return;
    }

    const getScrollAmount = () => {
        // Desplazamos por el ancho visible del contenedor. Es más robusto para diferentes tamaños de pantalla.
        return carouselScrollContainer.clientWidth;
    }

    nextBtn.addEventListener('click', () => { // Mover al siguiente conjunto de proyectos
        carouselScrollContainer.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    });

    prevBtn.addEventListener('click', () => { // Mover al conjunto de proyectos anterior
        carouselScrollContainer.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    });
    
    const updateButtonState = () => { // Habilitar/deshabilitar botones según la posición de desplazamiento
        prevBtn.disabled = carouselScrollContainer.scrollLeft <= 0;
        nextBtn.disabled = carouselScrollContainer.scrollLeft >= (carouselScrollContainer.scrollWidth - carouselScrollContainer.clientWidth - 1);
    };

    carouselScrollContainer.addEventListener('scroll', updateButtonState);
    window.addEventListener('resize', updateButtonState); // Actualizar estado de botones al redimensionar la ventana
    updateButtonState(); // Llamada inicial para establecer el estado correcto de los botones
});