/* =========================================
   个人介绍网站 - JavaScript 交互脚本
   ========================================= */

'use strict';

// ---------- DOM 元素引用 ----------
const navbar = document.querySelector('.navbar');
const navMenu = document.getElementById('navMenu');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelectorAll('.nav-link');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const sections = document.querySelectorAll('.section');
const skillBars = document.querySelectorAll('.skill-progress');
const fadeEls = document.querySelectorAll('.skill-card, .project-card, .about-grid, .contact-grid');

// ---------- 导航栏：滚动背景变化 ----------
const handleNavScroll = () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
};

// ---------- 导航栏：移动端汉堡菜单 ----------
const toggleMobileMenu = () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
    document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
};

const closeMobileMenu = () => {
    navToggle.classList.remove('active');
    navMenu.classList.remove('active');
    document.body.style.overflow = '';
};

navToggle.addEventListener('click', toggleMobileMenu);

// 点击链接后关闭移动端菜单
navLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
});

// ---------- 导航栏：滚动时高亮当前章节 ----------
const highlightNavOnScroll = () => {
    let current = '';
    const scrollPos = window.scrollY + 120;

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
};

// ---------- 回到顶部按钮 ----------
const handleBackToTop = () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
};

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ---------- 技能条：滚动进入视口时动画 ----------
const animateSkillBars = () => {
    skillBars.forEach(bar => {
        const rect = bar.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight - 60;

        if (isVisible) {
            const targetWidth = bar.style.width;
            bar.style.width = '0%';
            setTimeout(() => {
                bar.style.width = targetWidth;
            }, 200);
        }
    });
};

// ---------- 通用滚动渐入动画 (IntersectionObserver) ----------
const setupScrollAnimations = () => {
    // 给需要滚动动画的元素添加初始类
    document.querySelectorAll('.skill-card, .project-card, .about-grid > *, .contact-grid > *').forEach(el => {
        el.classList.add('fade-in');
    });

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    document.querySelectorAll('.fade-in').forEach(el => {
        observer.observe(el);
    });
};

// ---------- 联系表单提交 (模拟) ----------
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('.btn-submit');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> 发送中...';
    submitBtn.disabled = true;

    // 模拟发送延迟
    setTimeout(() => {
        submitBtn.innerHTML = '<i class="fas fa-check-circle"></i> 发送成功！';
        submitBtn.style.background = 'linear-gradient(135deg, #00b894, #00cec9)';

        setTimeout(() => {
            submitBtn.innerHTML = originalText;
            submitBtn.style.background = '';
            submitBtn.disabled = false;
            contactForm.reset();
        }, 2500);
    }, 1500);
});

// ---------- 平滑滚动 (增强) ----------
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const targetEl = document.querySelector(targetId);
        if (targetEl) {
            e.preventDefault();
            targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---------- 打字效果 ----------
const typeWriter = (element, text, speed = 50) => {
    let i = 0;
    element.textContent = '';

    const timer = setInterval(() => {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
        } else {
            clearInterval(timer);
        }
    }, speed);
};

// ---------- 页面加载完成 ----------
document.addEventListener('DOMContentLoaded', () => {
    // 设置滚动渐入动画
    setupScrollAnimations();

    // 初始检查
    handleNavScroll();
    handleBackToTop();
    highlightNavOnScroll();
    animateSkillBars();
});

// ---------- 滚动事件监听 ----------
let scrollTimeout;
window.addEventListener('scroll', () => {
    handleNavScroll();
    handleBackToTop();
    highlightNavOnScroll();

    // 节流：滚动时只触发一次技能条动画检测
    if (!scrollTimeout) {
        scrollTimeout = setTimeout(() => {
            animateSkillBars();
            scrollTimeout = null;
        }, 100);
    }
});

// ---------- 窗口大小变化时关闭移动端菜单 ----------
window.addEventListener('resize', () => {
    if (window.innerWidth > 576) {
        closeMobileMenu();
    }
});

// ---------- 控制台彩蛋 ----------
console.log('%c🚀 感谢访问！', 'font-size: 24px; font-weight: bold; color: #6c5ce7;');
console.log('%c用代码创造价值，用设计传递温度 ❤️', 'font-size: 14px; color: #a29bfe;');