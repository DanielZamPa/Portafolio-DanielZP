document.addEventListener('DOMContentLoaded', () => {
    const botonModo = document.getElementById('botonModo');
    const body = document.body;
    // Es una buena práctica verificar si el elemento existe antes de usarlo
    if (!botonModo) return;

    const modoIcono = botonModo.querySelector('img');

    // NOTA: Asegúrate de tener un icono de "sol" para el modo claro en esta ruta.
    // Puedes descargarlo de Google Fonts Icons o similar.
    const iconoSol = './assets/icons/brightness_7_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';
    const iconoLuna = './assets/icons/bedtime_30dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.svg';

    // Función para aplicar el modo (oscuro o claro) y guardar la preferencia
    const aplicarModo = (modo) => {
        if (modo === 'dark') {
            body.classList.add('dark-mode');
            if (modoIcono) modoIcono.src = iconoSol;
            localStorage.setItem('theme', 'dark');
        } else {
            body.classList.remove('dark-mode');
            if (modoIcono) modoIcono.src = iconoLuna;
            localStorage.setItem('theme', 'light');
        }
    };

    // Event listener para el botón de cambio de modo
    botonModo.addEventListener('click', () => {
        const modoActualEsOscuro = body.classList.contains('dark-mode');
        aplicarModo(modoActualEsOscuro ? 'light' : 'dark');
    });

    // Al cargar la página, comprueba la preferencia del usuario
    const modoGuardado = localStorage.getItem('theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    aplicarModo(modoGuardado);
});