// Banco de mensajes personalizados para cada carrito
const mensajes = {
    1: "Solo quería recordarte que eres una persona increíble y que me alegra muchísimo tenerte como amigo.",
    2: "Entre risas, locuras y momentos random, hemos creado recuerdos",
    3: "Eres como Guido: nadie entiende qué dices, pero igual caes bien. 🤌",
    4: "Te quiero como Bob Esponja quiere a Patricio.",
    5: "Eres como Mate: medio loco, medio despistado… pero sin ti la película no sería igual. "
};
// LÓGICA DEL CARRUSEL DE IMÁGENES
let currentSlide = 0;
let slideInterval;

function showSlide(index) {
    const slides = document.querySelectorAll('.carousel-slide');
    if (slides.length === 0) return;

    // Asegurar que el índice se mantenga en el rango de las 3 imágenes
    if (index >= slides.length) currentSlide = 0;
    else if (index < 0) currentSlide = slides.length - 1;
    else currentSlide = index;

    // Quitar la clase active a todas las fotos y ponérsela solo a la actual
    slides.forEach(slide => slide.classList.remove('active'));
    slides[currentSlide].classList.add('active');
}

function moveSlide(step) {
    // Al hacer clic manual, reiniciamos el temporizador para que no cambie de golpe
    clearInterval(slideInterval);
    showSlide(currentSlide + step);
    startAutoSlide();
}

function startAutoSlide() {
    // Cambia de imagen automáticamente cada 3 segundos
    slideInterval = setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000);
}

// Iniciar el carrusel automático cuando cargue la página
startAutoSlide();

// Función para abrir la carta inicial y revelar el ramo
function openBouquet() {
    const envelope = document.getElementById('envelopeWrapper');
    const bouquet = document.getElementById('bouquetContainer');

    envelope.style.opacity = '0';
    envelope.style.pointerEvents = 'none';

    setTimeout(() => {
        envelope.style.display = 'none';
        bouquet.style.display = 'flex';
        setTimeout(() => {
            bouquet.classList.add('open');
        }, 50);
    }, 500);
}

// Función para mostrar la ventana flotante con el mensaje del carrito seleccionado
function showMsg(id) {
    const modal = document.getElementById('modalOverlay');
    const modalImg = document.getElementById('modalImg');
    const modalText = document.getElementById('modalText');
    
    // Captura dinámicamente la imagen del carro seleccionado
    const clickedCarSrc = document.querySelector(`.car-${id}`).src;

    modalImg.src = clickedCarSrc;
    modalText.innerText = mensajes[id];
    
    modal.classList.add('active');
}

// 1. Esta función SOLO cierra la ventana flotante (para la 'X' y clics fuera)
function closeMsg() {
    const modal = document.getElementById('modalOverlay');
    modal.classList.remove('active');
}

// 2. NUEVA FUNCIÓN: Cierra todo y regresa hasta el sobre inicial (para el botón de abajo)
function resetEverything() {
    const modal = document.getElementById('modalOverlay');
    const bouquet = document.getElementById('bouquetContainer');
    const envelope = document.getElementById('envelopeWrapper');

    // Cierra la ventana flotante
    modal.classList.remove('active');

    // Espera un momento y reinicia las pantallas por completo
    setTimeout(() => {
        bouquet.classList.remove('open');
        bouquet.style.display = 'none';

        envelope.style.display = 'block';
        setTimeout(() => {
            envelope.style.opacity = '1';
            envelope.style.pointerEvents = 'auto';
        }, 50);
    }, 400);
}
