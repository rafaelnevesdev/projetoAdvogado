document.addEventListener('DOMContentLoaded', function() {
    // Menu Mobile
    const menuMobile = document.querySelector('.menu-mobile');
    const menu = document.querySelector('.menu');
    
    menuMobile.addEventListener('click', function() {
        menu.classList.toggle('active');
    });

    // Fechar menu ao clicar em um item
    const menuItems = document.querySelectorAll('.menu li a');
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            menu.classList.remove('active');
        });
    });

    // Header scroll effect
    const header = document.getElementById('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Back to top button
    const backToTop = document.querySelector('.back-to-top');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTop.classList.add('active');
        } else {
            backToTop.classList.remove('active');
        }
    });
    
    // Funcionalidade de Dúvidas Frequentes nas Áreas de Atuação
    const areaCards = document.querySelectorAll('.area-card');
    const faqContainer = document.querySelector('.faq-container');
    const faqAreas = document.querySelectorAll('.faq-area');
    const areasSection = document.querySelector('.areas-grid');
    
    // Função para selecionar um card de área específico
    function selectAreaCard(areaType) {
        // Encontra o card com o data-area correspondente
        const targetCard = document.querySelector(`.area-card[data-area="${areaType}"]`);
        
        if (targetCard) {
            // Remove a classe active de todos os cards
            areaCards.forEach(c => c.classList.remove('active'));
            
            // Esconde todas as áreas de FAQ
            faqAreas.forEach(area => area.classList.remove('active'));
            
            // Ativa o card selecionado
            targetCard.classList.add('active');
            
            // Mostra o container de FAQ
            faqContainer.classList.add('visible');
            
            // Encontra e mostra a área de FAQ correspondente
            const targetFaq = document.getElementById(`faq-${areaType}`);
            if (targetFaq) {
                targetFaq.classList.add('active');
            }
        }
    }
    
    // Seleciona automaticamente o card de Direito do Consumidor - Viagens ao carregar a página
    selectAreaCard('consumidor-viagens');
    
    // Adiciona evento de clique para cada card de área
    areaCards.forEach(card => {
        card.addEventListener('click', function() {
            // Obtém a área de atuação do atributo data-area
            const areaType = this.getAttribute('data-area');
            
            // Verifica se o card já está ativo
            const isActive = this.classList.contains('active');
            
            // Se o card não estava ativo, ativa-o e mostra o FAQ correspondente
            if (!isActive) {
                // Usa a função selectAreaCard para ativar o card e mostrar o FAQ
                selectAreaCard(areaType);
                
                // Scroll suave até o FAQ
                setTimeout(() => {
                    const headerHeight = document.getElementById('header').offsetHeight;
                    const targetPosition = faqContainer.getBoundingClientRect().top + window.pageYOffset - headerHeight - 20;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }, 300);
            } else {
                // Remove a classe active de todos os cards
                areaCards.forEach(c => c.classList.remove('active'));
                
                // Esconde todas as áreas de FAQ
                faqAreas.forEach(area => area.classList.remove('active'));
                
                // Se o card já estava ativo, esconde o container de FAQ
                faqContainer.classList.remove('visible');
            }
        });
    });
    
    // Funcionalidade de expandir/recolher perguntas do FAQ
    const faqQuestions = document.querySelectorAll('.faq-question');
    
    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const faqItem = this.parentElement;
            
            // Verifica se o item já está ativo
            const isActive = faqItem.classList.contains('active');
            
            // Fecha todos os itens abertos
            document.querySelectorAll('.faq-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Se o item clicado não estava ativo, abre-o
            if (!isActive) {
                faqItem.classList.add('active');
            }
        });
    });


    // Inicialização do Swiper para depoimentos
    const depoimentosSwiper = new Swiper('.depoimentos-swiper', {
        slidesPerView: 1,
        spaceBetween: 30,
        loop: true,
        centeredSlides: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            dynamicBullets: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
        effect: 'fade',
        fadeEffect: {
            crossFade: true
        },
        speed: 800,
        grabCursor: true,
        keyboard: {
            enabled: true,
        },
        a11y: {
            prevSlideMessage: 'Depoimento anterior',
            nextSlideMessage: 'Próximo depoimento',
            firstSlideMessage: 'Primeiro depoimento',
            lastSlideMessage: 'Último depoimento',
            paginationBulletMessage: 'Ir para o depoimento {{index}}',
        },
    });

    // Formulário de contato
    const formContato = document.getElementById('form-contato');
    if (formContato) {
        formContato.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Aqui você pode adicionar a lógica para enviar o formulário via AJAX
            // ou integrar com algum serviço de email
            
            alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
            formContato.reset();
        });
    }

    // Animação de scroll suave para as âncoras
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.getElementById('header').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animação de entrada dos elementos ao scroll
    const animateElements = document.querySelectorAll('.area-card, .diferencial-item, .qualificacao, .depoimento-content');
    
    function checkScroll() {
        animateElements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Inicializar estilos para animação
    animateElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Verificar posição inicial
    checkScroll();
    
    // Verificar ao scroll
    window.addEventListener('scroll', checkScroll);
});