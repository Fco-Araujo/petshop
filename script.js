
// JavaScript para Pet Feliz Landing Page

// Variáveis globais
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const dots = document.querySelectorAll('.dot');

// Navegação móvel
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

// Controle do carrossel
function showSlide(n) {
    slides[currentSlide].classList.remove('active');
    dots[currentSlide].classList.remove('active');
    
    currentSlide = (n + slides.length) % slides.length;
    
    slides[currentSlide].classList.add('active');
    dots[currentSlide].classList.add('active');
}

function changeSlide(direction) {
    showSlide(currentSlide + direction);
}

function currentSlide(n) {
    showSlide(n - 1);
}

// Carrossel automático
function autoSlide() {
    changeSlide(1);
}

// Inicializar carrossel automático
setInterval(autoSlide, 5000);

// Menu hambúrguer
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar com efeito de scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animações ao rolar a página
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adicionar classes de animação aos elementos
document.addEventListener('DOMContentLoaded', () => {
    // Adicionar animações aos cards de serviços
    document.querySelectorAll('.service-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Adicionar animações aos cards de produtos
    document.querySelectorAll('.product-card').forEach((card, index) => {
        card.classList.add('fade-in');
        card.style.transitionDelay = `${index * 0.1}s`;
        observer.observe(card);
    });

    // Adicionar animações ao conteúdo sobre
    const aboutText = document.querySelector('.about-text');
    const aboutImage = document.querySelector('.about-image');
    
    if (aboutText) {
        aboutText.classList.add('slide-in-left');
        observer.observe(aboutText);
    }
    
    if (aboutImage) {
        aboutImage.classList.add('slide-in-right');
        observer.observe(aboutImage);
    }

    // Adicionar animações ao formulário de contato
    const contactInfo = document.querySelector('.contact-info');
    const contactForm = document.querySelector('.contact-form');
    
    if (contactInfo) {
        contactInfo.classList.add('slide-in-left');
        observer.observe(contactInfo);
    }
    
    if (contactForm) {
        contactForm.classList.add('slide-in-right');
        observer.observe(contactForm);
    }
});

// Formulário de contato
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const nome = document.getElementById('nome').value;
    const email = document.getElementById('email').value;
    const telefone = document.getElementById('telefone').value;
    const mensagem = document.getElementById('mensagem').value;
    
    // Validação básica
    if (!nome || !email || !mensagem) {
        alert('Por favor, preencha todos os campos obrigatórios.');
        return;
    }
    
    // Validação de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Por favor, insira um email válido.');
        return;
    }
    
    // Simular envio do formulário
    const submitBtn = document.querySelector('.submit-btn');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = 'Enviando...';
    submitBtn.disabled = true;
    
    // Simular tempo de envio
    setTimeout(() => {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        contactForm.reset();
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Criar link do WhatsApp com a mensagem
        const whatsappMessage = `Olá! Meu nome é ${nome}. ${mensagem}`;
        const whatsappUrl = `https://wa.me/5586998887777?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Opcional: abrir WhatsApp automaticamente
        if (confirm('Gostaria de continuar a conversa pelo WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
        
    }, 2000);
});

// Efeitos nos botões CTA do carrossel
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function() {
        // Scroll para seção de serviços
        const servicesSection = document.getElementById('servicos');
        if (servicesSection) {
            servicesSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Efeito de hover nos cards de serviços
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Efeito de hover nos cards de produtos
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('img');
        if (img) {
            img.style.transform = 'scale(1)';
        }
    });
});

// Contador animado (opcional para seção sobre)
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Lazy loading para imagens
const images = document.querySelectorAll('img[src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            img.style.opacity = '0';
            img.style.transition = 'opacity 0.3s ease';
            
            img.onload = () => {
                img.style.opacity = '1';
            };
            
            imageObserver.unobserve(img);
        }
    });
});

images.forEach(img => {
    imageObserver.observe(img);
});

// Preloader simples
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// Scroll to top no logo
document.querySelector('.nav-logo').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Adicionar efeito parallax sutil ao hero
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Melhorar acessibilidade - navegação por teclado
document.addEventListener('keydown', (e) => {
    // ESC fecha o menu mobile
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
    
    // Setas para controlar carrossel
    if (e.key === 'ArrowLeft') {
        changeSlide(-1);
    } else if (e.key === 'ArrowRight') {
        changeSlide(1);
    }
});

console.log('🐾 Pet Feliz - Landing Page carregada com sucesso!');