// modal.js - Versión completa para manejar todas las secciones
document.addEventListener('DOMContentLoaded', function() {
    // Elementos del DOM
    const sobreMiBtn = document.getElementById('sobre-mi-btn');
    const proyectosBtn = document.getElementById('proyectos-btn');
    const curiosidadesBtn = document.getElementById('curiosidades-btn');
    const vidaUniversitariaBtn = document.getElementById('vida-universitaria-btn');
    const heroConocemeBtn = document.getElementById('hero-conoceme-btn');
    const proyectosColumnBtn = document.getElementById('proyectos-column-btn');
    const curiosidadesColumnBtn = document.getElementById('curiosidades-column-btn');

    const sobreMiLinks = document.querySelectorAll('.sobre-mi-link');
    const proyectosLinks = document.querySelectorAll('.proyectos-link');
    const curiosidadesLinks = document.querySelectorAll('.curiosidades-link');
    const vidaUniversitariaLinks = document.querySelectorAll('.vida-universitaria-link');

    const modal = document.getElementById('sobre-mi-modal');
    const modalContent = document.getElementById('sobre-mi-content');
    const modalClose = document.querySelector('.modal-close');
    const logoLink = document.querySelector('.logo-link');

    // Botón Mis Metas en el header (botón 5 en el array de botones)
    const metasBtn = document.querySelector('nav button:nth-child(5)');

    // Botón Mis Metas en el footer (último li de la lista)
    const metasFooterLinks = document.querySelectorAll('.links-list li:nth-child(6)');

    // Función para abrir el modal con contenido específico
    function openModal(contentType) {
        let contentFile = '';

        if (contentType === 'sobre-mi') {
            contentFile = 'pages/sobre-mi.html';
        } else if (contentType === 'proyectos') {
            contentFile = 'pages/proyectos.html';
        } else if (contentType === 'curiosidades') {
            contentFile = 'pages/curiosidades.html';
        } else if (contentType === 'vida-universitaria') {
            contentFile = 'pages/vida_universitaria.html';
        } else if (contentType === 'metas') {
            contentFile = 'pages/metas.html';
        }

        // Cargar contenido del archivo
        fetch(contentFile)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Archivo no encontrado');
                }
                return response.text();
            })
            .then(html => {
                modalContent.innerHTML = html;

                // Agregar evento a todos los botones volver
                const volverBtns = modalContent.querySelectorAll(
                    '.btn-volver, .btn-volver-proyectos, .btn-volver-curiosidades, .btn-volver-vida-universitaria, .btn-volver-metas'
                );
                volverBtns.forEach(btn => {
                    btn.addEventListener('click', closeModal);
                });

                // Mostrar modal
                modal.classList.add('active');
                document.body.classList.add('modal-open');

                // Desplazar al inicio del modal
                modal.scrollTop = 0;
            })
            .catch(error => {
                console.error(`Error cargando ${contentFile}:`, error);
                modalContent.innerHTML = `
                    <div class="error-message">
                        <h2>Error al cargar el contenido</h2>
                        <p>Lo sentimos, no se pudo cargar la información. Por favor, intenta nuevamente.</p>
                        <button class="btn-volver">Volver</button>
                    </div>
                `;

                // Agregar evento al botón volver del error
                const volverBtn = modalContent.querySelector('.btn-volver');
                if (volverBtn) {
                    volverBtn.addEventListener('click', closeModal);
                }

                modal.classList.add('active');
                document.body.classList.add('modal-open');
            });
    }

    // Función para cerrar el modal
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');

        // Limpiar contenido después de la animación
        setTimeout(() => {
            modalContent.innerHTML = '';
        }, 300);
    }

    // Función para ir al inicio (scroll al top)
    function goToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    // Event Listeners para abrir el modal
    if (sobreMiBtn) {
        sobreMiBtn.addEventListener('click', () => openModal('sobre-mi'));
    }

    if (proyectosBtn) {
        proyectosBtn.addEventListener('click', () => openModal('proyectos'));
    }

    if (curiosidadesBtn) {
        curiosidadesBtn.addEventListener('click', () => openModal('curiosidades'));
    }

    if (vidaUniversitariaBtn) {
        vidaUniversitariaBtn.addEventListener('click', () => openModal('vida-universitaria'));
    }

    // Botón Mis Metas en el header
    if (metasBtn) {
        metasBtn.addEventListener('click', () => openModal('metas'));
    }

    if (heroConocemeBtn) {
        heroConocemeBtn.addEventListener('click', () => openModal('sobre-mi'));
    }

    if (proyectosColumnBtn) {
        proyectosColumnBtn.addEventListener('click', () => openModal('proyectos'));
    }

    if (curiosidadesColumnBtn) {
        curiosidadesColumnBtn.addEventListener('click', () => openModal('curiosidades'));
    }

    // Event Listeners para enlaces del footer
    sobreMiLinks.forEach(link => {
        link.addEventListener('click', () => openModal('sobre-mi'));
    });

    proyectosLinks.forEach(link => {
        link.addEventListener('click', () => openModal('proyectos'));
    });

    curiosidadesLinks.forEach(link => {
        link.addEventListener('click', () => openModal('curiosidades'));
    });

    vidaUniversitariaLinks.forEach(link => {
        link.addEventListener('click', () => openModal('vida-universitaria'));
    });

    // Enlaces Mis Metas en el footer
    metasFooterLinks.forEach(link => {
        link.addEventListener('click', () => openModal('metas'));
    });

    // Event Listener para cerrar el modal
    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Cerrar modal al hacer clic fuera del contenido
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Cerrar modal con la tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    // Logo para ir al inicio
    if (logoLink) {
        logoLink.addEventListener('click', function(e) {
            e.preventDefault();

            // Si el modal está abierto, cerrarlo primero
            if (modal.classList.contains('active')) {
                closeModal();
            }

            // Ir al inicio de la página
            goToTop();
        });
    }

    // Agregar efecto hover a todos los botones "Conóceme más"
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 6px 12px rgba(0,0,0,0.3)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Agregar estilos dinámicos para errores
    const style = document.createElement('style');
    style.textContent = `
        .error-message {
            padding: 60px;
            text-align: center;
            color: #333;
        }

        .error-message h2 {
            color: #ff4757;
            margin-bottom: 20px;
        }

        .error-message p {
            font-size: 18px;
            color: #666;
            margin-bottom: 30px;
        }

        .error-message .btn-volver {
            background: linear-gradient(135deg, #1e90ff 0%, #4169e1 100%);
            color: white;
            border: none;
            padding: 12px 30px;
            border-radius: 30px;
            font-size: 16px;
            cursor: pointer;
            transition: all 0.3s ease;
        }

        .error-message .btn-volver:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 25px rgba(30, 144, 255, 0.3);
        }
    `;
    document.head.appendChild(style);
});
