// ===================== CONTROLE DO MENU MOBILE =====================
// note: the HTML uses id="menu-icon" so select by id here
const menuIcon = document.querySelector('#menu-icon');
const navList = document.querySelector('.navlist');

menuIcon.addEventListener('click', () => {
    menuIcon.classList.toggle('bx-x');
    navList.classList.toggle('open');

    // Bloquear scroll quando menu aberto
    document.body.style.overflow = navList.classList.contains('open') ? 'hidden' : 'auto';
});

// Fechar menu ao clicar em links
document.querySelectorAll('.navlist a').forEach(link => {
    link.addEventListener('click', () => {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    });
});

// Fechar menu ao rolar
window.addEventListener('scroll', () => {
    if (navList.classList.contains('open')) {
        menuIcon.classList.remove('bx-x');
        navList.classList.remove('open');
        document.body.style.overflow = 'auto';
    }
});

// ===================== NAVEGAÇÃO ATIVA =====================
const navLinks = document.querySelectorAll('.navlist a');

// Função para adicionar a classe "active" ao link clicado
function activeLink() {
    navLinks.forEach(item => item.classList.remove('active')); // Remove a classe "active"
    this.classList.add('active'); // Adiciona a classe "active" ao link clicado
}

// Adiciona um evento de clique a cada link de navegação
navLinks.forEach(item => item.addEventListener('click', activeLink));

// ===================== ALTERNAR MODO CLARO/ESCURO =====================
// Função para alternar entre os temas claro e escuro
function toggleMode() {
    const html = document.documentElement;

    html.classList.toggle('light'); // Alterna a classe "light" no elemento HTML

    // Salva o tema escolhido no localStorage
    const mode = html.classList.contains('light') ? 'light' : 'dark';
    localStorage.setItem('theme', mode);

    // Atualiza a cor do texto do título
    updateTextColor();
}

// Carrega o tema salvo no localStorage ao carregar a página
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
    document.documentElement.classList.toggle('light', savedTheme === 'light');
}

// ===================== ANIMAÇÃO DO TÍTULO =====================
// Seleciona o elemento do título e define variáveis para a animação
const titleElement = document.querySelector('#name');
const text = "Andrei Vicente";
let index = 0;
let isTyping = true;
let currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';

// Função para animar o texto do título (digitação e apagamento)
function animateText() {
    if (isTyping) {
        if (index < text.length) {
            titleElement.textContent = text.slice(0, index + 1); // Adiciona uma letra
            index++;
        } else {
            isTyping = false; // Alterna para modo apagamento
        }
    } else {
        if (index > 0) {
            titleElement.textContent = text.slice(0, index - 1); // Remove uma letra
            index--;
        } else {
            isTyping = true; // Alterna para modo digitação
        }
    }

    // Alterna a cor do texto em cada ciclo, independentemente de digitar/apagar
    const isLight = document.documentElement.classList.contains('light');
    if (isLight) {
        currentColor = currentColor === 'black' ? '#2b055b' : 'black';
    } else {
        currentColor = currentColor === '#fff' ? '#C94C16' : '#fff';
    }
    titleElement.style.color = currentColor;

    setTimeout(animateText, 300); // Intervalo da animação
}

// Função para atualizar a cor do texto do título
function updateTextColor() {
    currentColor = document.documentElement.classList.contains('light') ? 'black' : '#fff';
    titleElement.style.color = currentColor;
}

// Inicia animação do título
document.addEventListener('DOMContentLoaded', animateText);
updateTextColor();

// ===================== ANIMAÇÃO DA SEÇÃO HOME =====================
const homeSection = document.querySelector('#home');

homeSection.style.opacity = '0';
homeSection.style.transform = 'translateY(20px)';
homeSection.style.transition = 'opacity 1s ease, transform 1s ease';

setTimeout(() => {
    homeSection.style.opacity = '1';
    homeSection.style.transform = 'translateY(0)';
}, 100);

// ===================== ANIMAÇÃO DAS SEÇÕES =====================
const sections = document.querySelectorAll('section');

sections.forEach((section, index) => {
    section.style.opacity = '0';
    section.style.transition = 'opacity 1s, transform 1s';

    if (index !== 0) {
        if (index === 1) section.style.transform = 'translateY(100px)';
        else if (index === 2) section.style.transform = 'scale(0.8)';
        else if (index === 3) section.style.transform = 'rotateY(90deg)';
    }
});

// Observer para animar as seções ao rolar
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'none';
        }
    });
});

sections.forEach(section => observer.observe(section));

// ===================== BOTÃO DE VOLTAR AO TOPO =====================
document.querySelector('.top a').addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ===================== CARROSSEL DE PROJETOS =====================
const carouselSlides = document.querySelector('.carousel-slides');
const slides = document.querySelectorAll('.carousel-slide');
const prevButton = document.querySelector('.carousel-button.prev');
const nextButton = document.querySelector('.carousel-button.next');

let currentSlide = 0;
let autoSlideInterval;

// Mostrar slide atual
function showSlide(slideIndex) {
    slides.forEach(slide => {
        slide.classList.remove('active');
        slide.style.display = 'none';
    });

    if (slideIndex < 0) currentSlide = slides.length - 1;
    else if (slideIndex >= slides.length) currentSlide = 0;
    else currentSlide = slideIndex;

    slides[currentSlide].classList.add('active');
    slides[currentSlide].style.display = 'flex';

    updateSlidePosition();
}

// Atualiza posição do carrossel
function updateSlidePosition() {
    const slideWidth = slides[0].offsetWidth;
    carouselSlides.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
}

// Próximo slide
function nextSlide() {
    showSlide(currentSlide + 1);
    resetAutoSlide();
}

// Slide anterior
function prevSlide() {
    showSlide(currentSlide - 1);
    resetAutoSlide();
}

// Auto slide
function startAutoSlide() {
    autoSlideInterval = setInterval(nextSlide, 5000);
}

// Reiniciar auto slide
function resetAutoSlide() {
    clearInterval(autoSlideInterval);
    startAutoSlide();
}

nextButton.addEventListener('click', nextSlide);
prevButton.addEventListener('click', prevSlide);

window.addEventListener('load', () => {
    showSlide(currentSlide);
    startAutoSlide();

    window.addEventListener('resize', () => {
        updateSlidePosition();
    });
});

// Pausar ao passar mouse
carouselSlides.parentElement.addEventListener('mouseenter', () => {
    clearInterval(autoSlideInterval);
});

carouselSlides.parentElement.addEventListener('mouseleave', () => {
    startAutoSlide();
});

// ===================== FORMULÁRIO DE CONTATO =====================
const contactForm = document.getElementById('contactForm');
const thankYouMessage = document.getElementById('thankYouMessage');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    thankYouMessage.style.display = 'block';

    const formData = new FormData(contactForm);

    fetch(contactForm.action, {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
    })
    .then(response => {
        if (response.ok) {
            setTimeout(() => window.location.reload(), 2000);
        } else {
            alert("Erro ao enviar formulário. Tente novamente.");
        }
    })
    .catch(() => alert("Erro na conexão. Tente novamente."));
});

// ===================== ANIMAÇÃO DA SEÇÃO SOBRE =====================
const aboutSection = document.querySelector('.about');

function checkAboutVisibility() {
    const rect = aboutSection.getBoundingClientRect();
    const windowHeight = window.innerHeight || document.documentElement.clientHeight;

    if (rect.top <= windowHeight * 0.75 && rect.bottom >= 0) {
        aboutSection.classList.add('visible');
        window.removeEventListener('scroll', checkAboutVisibility);
    }
}

window.addEventListener('scroll', checkAboutVisibility);
checkAboutVisibility();