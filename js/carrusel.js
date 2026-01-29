// Carrusel automático - VERSIÓN MEJORADA
document.addEventListener('DOMContentLoaded', function() {
    const carouselItems = document.querySelectorAll('.carousel-item');
    const carouselTrack = document.querySelector('.carousel-track');
    const prevBtn = document.querySelector('.prev-btn');
    const nextBtn = document.querySelector('.next-btn');
    let currentIndex = 0;
    let carouselInterval;

    // Función para mostrar el slide actual
    function showSlide(index) {
        // Ocultar todos los slides
        carouselItems.forEach(item => {
            item.classList.remove('active');
            item.style.position = 'absolute';
            item.style.left = '0';
            item.style.top = '0';
        });

        // Mostrar el slide actual
        carouselItems[index].classList.add('active');
        carouselItems[index].style.position = 'relative';

        // Actualizar índice
        currentIndex = index;
    }

    // Función para siguiente slide
    function nextSlide() {
        currentIndex = (currentIndex + 1) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Función para slide anterior
    function prevSlide() {
        currentIndex = (currentIndex - 1 + carouselItems.length) % carouselItems.length;
        showSlide(currentIndex);
    }

    // Botones de navegación
    if (prevBtn) {
        prevBtn.addEventListener('click', function() {
            clearInterval(carouselInterval); // Pausar auto-play al click manual
            prevSlide();
            startAutoCarousel(); // Reanudar después de 5 segundos
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', function() {
            clearInterval(carouselInterval); // Pausar auto-play al click manual
            nextSlide();
            startAutoCarousel(); // Reanudar después de 5 segundos
        });
    }

    // Función para iniciar el carrusel automático
    function startAutoCarousel() {
        clearInterval(carouselInterval); // Limpiar intervalo anterior
        carouselInterval = setInterval(nextSlide, 5000); // 5 segundos
    }

    // Iniciar el carrusel
    showSlide(currentIndex);
    startAutoCarousel();

    // Pausar el carrusel al pasar el mouse
    const carouselContainer = document.querySelector('.carousel-container');
    if (carouselContainer) {
        carouselContainer.addEventListener('mouseenter', function() {
            clearInterval(carouselInterval);
        });

        carouselContainer.addEventListener('mouseleave', function() {
            startAutoCarousel();
        });
    }

    // Formularios
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('¡Gracias por tu interés! Te contactaremos pronto.');
        });
    });
});
