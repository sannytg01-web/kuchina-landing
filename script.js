document.addEventListener('DOMContentLoaded', () => {
    
    // 1. Мобильное меню
    const menuBtn = document.getElementById('menu-btn');
    const nav = document.getElementById('main-nav');
    const navLinks = document.querySelectorAll('.nav-link');

    if (menuBtn && nav) {
        menuBtn.addEventListener('click', () => {
            menuBtn.classList.toggle('active');
            nav.classList.toggle('active');
        });

        // Закрываем меню при клике на ссылку (для мобильных)
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuBtn.classList.remove('active');
                nav.classList.remove('active');
            });
        });
    }

    // 2. Плавный скролл по якорям (header-offset)
    const headerHeight = document.querySelector('header').offsetHeight;
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if(targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const targetPosition = targetElement.getBoundingClientRect().top + window.scrollY - headerHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Анимация появления блоков при скролле (Intersection Observer)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const fadeObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // После появления можно перестать следить
                observer.unobserve(entry.target);
            }
        });
    }, {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    });

    fadeElements.forEach(el => fadeObserver.observe(el));

    // 4. Отправка формы (обработка)
    const form = document.getElementById('lead-form');
    const successMsg = document.getElementById('form-success');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault(); // Останавливаем стандартную отправку

            // Здесь была бы реальная отправка данных в AntiGraviti API (как указано в ТЗ)
            // Имитируем успешную отправку
            
            // Получаем данные
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());
            console.log('Отправка заявки:', data);
            
            // Показываем сообщение об успехе
            form.classList.add('hidden');
            successMsg.classList.remove('hidden');

            form.reset();
        });
    }
});
