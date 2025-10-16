// JavaScript para Pet Feliz Landing Page

// Variáveis globais
let slideIndex = 0;

// Função para mostrar slides
function showSlides() {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex++;
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
    
    setTimeout(showSlides, 5000);
}

// Função para mudar slide manualmente
function changeSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex += n;
    
    if (slideIndex > slides.length) {
        slideIndex = 1;
    }
    if (slideIndex < 1) {
        slideIndex = slides.length;
    }
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Função para ir para slide específico
function currentSlide(n) {
    const slides = document.querySelectorAll('.carousel-slide');
    const dots = document.querySelectorAll('.dot');
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slideIndex = n;
    
    slides[slideIndex - 1].classList.add('active');
    dots[slideIndex - 1].classList.add('active');
}

// Menu hambúrguer
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function() {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Navbar com efeito de scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Smooth scroll para links do menu
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
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

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Adicionar classes de animação aos elementos
document.addEventListener('DOMContentLoaded', function() {
    // Iniciar carrossel
    slideIndex = 1;
    showSlides();
    
    // Adicionar event listeners aos botões do carrossel
    document.querySelector('.carousel-btn.prev').addEventListener('click', function() {
        changeSlide(-1);
    });
    
    document.querySelector('.carousel-btn.next').addEventListener('click', function() {
        changeSlide(1);
    });
    
    // Adicionar event listeners aos dots
    document.querySelectorAll('.dot').forEach((dot, index) => {
        dot.addEventListener('click', function() {
            currentSlide(index + 1);
        });
    });
    
    // Adicionar animações aos cards de serviços
    document.querySelectorAll('.service-card').forEach(function(card, index) {
        card.classList.add('fade-in');
        card.style.transitionDelay = (index * 0.1) + 's';
        observer.observe(card);
    });

    // Adicionar animações aos cards de produtos
    document.querySelectorAll('.product-card').forEach(function(card, index) {
        card.classList.add('fade-in');
        card.style.transitionDelay = (index * 0.1) + 's';
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
const contactFormElement = document.getElementById('contactForm');

contactFormElement.addEventListener('submit', function(e) {
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
    setTimeout(function() {
        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
        
        // Limpar formulário
        contactFormElement.reset();
        
        // Restaurar botão
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
        
        // Criar link do WhatsApp com a mensagem
        const whatsappMessage = 'Olá! Meu nome é ' + nome + '. ' + mensagem;
        const whatsappUrl = 'https://wa.me/5586998887777?text=' + encodeURIComponent(whatsappMessage);
        
        // Opcional: abrir WhatsApp automaticamente
        if (confirm('Gostaria de continuar a conversa pelo WhatsApp?')) {
            window.open(whatsappUrl, '_blank');
        }
    }, 2000);
});

// Efeitos nos botões CTA do carrossel
document.querySelectorAll('.cta-button').forEach(function(button) {
    button.addEventListener('click', function() {
        const text = button.textContent.toLowerCase();

        if (text.includes('serviços')) {
            // Rolar até a seção de serviços
            document.getElementById('servicos').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (text.includes('produtos')) {
            // Rolar até a seção de produtos
            document.getElementById('produtos').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        } else if (text.includes('consulta')) {
            // Rolar até o formulário de contato (JavaScript)
            document.getElementById('contato').scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


// Scroll to top no logo
document.querySelector('.nav-logo').addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

console.log('🐾 Pet Feliz - Landing Page carregada com sucesso!');