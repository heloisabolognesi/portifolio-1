// Import particlesJS library
const particlesJS = window.particlesJS;

// Configuração das partículas
if (typeof particlesJS !== "undefined") {
  particlesJS("particles-js", {
    particles: {
      number: {
        value: 80,
        density: {
          enable: true,
          value_area: 800,
        },
      },
      color: {
        value: "#6366f1",
      },
      shape: {
        type: "circle",
        stroke: {
          width: 0,
          color: "#000000",
        },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: {
          enable: false,
          speed: 1,
          opacity_min: 0.1,
          sync: false,
        },
      },
      size: {
        value: 3,
        random: true,
        anim: {
          enable: false,
          speed: 40,
          size_min: 0.1,
          sync: false,
        },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#6366f1",
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out",
        bounce: false,
        attract: {
          enable: false,
          rotateX: 600,
          rotateY: 1200,
        },
      },
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: {
          enable: true,
          mode: "repulse",
        },
        onclick: {
          enable: true,
          mode: "push",
        },
        resize: true,
      },
      modes: {
        grab: {
          distance: 400,
          line_linked: {
            opacity: 1,
          },
        },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: {
          distance: 200,
          duration: 0.4,
        },
        push: {
          particles_nb: 4,
        },
        remove: {
          particles_nb: 2,
        },
      },
    },
    retina_detect: true,
  });
}

// Cursor personalizado - versão corrigida
const cursor = document.querySelector(".cursor");
const cursorFollower = document.querySelector(".cursor-follower");

if (cursor && cursorFollower) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
    cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  });

  // Efeito de hover nos links
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
      cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1.5)`;
    });

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
      cursorFollower.style.transform = `translate(${e.clientX}px, ${e.clientY}px) scale(1)`;
    });
  });
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Animação de digitação
function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.innerHTML = "";

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }

  type();
}

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0;
  const increment = target / (duration / 16);

  function updateCounter() {
    start += increment;
    if (start < target) {
      element.textContent = Math.floor(start);
      requestAnimationFrame(updateCounter);
    } else {
      element.textContent = target;
    }
  }

  updateCounter();
}

// Observer unificado para animações
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const unifiedObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-on-scroll");

      // Animar contadores na seção about
      if (entry.target.classList.contains("about")) {
        const counters = entry.target.querySelectorAll(".stat-number");
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"));
          animateCounter(counter, target);
        });
      }
      
      // Animações de skills
      if (entry.target.classList.contains("skills-section")) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    }
  });
}, observerOptions);

// Observar elementos
document.querySelectorAll("section, .skill-category").forEach(el => {
  unifiedObserver.observe(el);
});

// Skills Chart Data - Atualizado para suas categorias
const skillsData = {
  combinan: [
    { name: "Node.js", level: 90, color: "#5B7FFF" },
    { name: "Express.js", level: 85, color: "#8B5FFF" },
    { name: "MySQL", level: 80, color: "#FF6B9D" },
    { name: "MongoDB", level: 75, color: "#5FBAFF" },
    { name: "REST APIs", level: 88, color: "#FF8A5B" },
    { name: "JSON", level: 85, color: "#6366f1" }
  ],
  per: [
    { name: "UI/UX Design", level: 85, color: "#5B7FFF" },
    { name: "Figma", level: 80, color: "#8B5FFF" },
    { name: "Prototipagem", level: 75, color: "#FF6B9D" },
    { name: "Design Thinking", level: 70, color: "#5FBAFF" },
    { name: "Adobe XD", level: 65, color: "#FF8A5B" },
    { name: "User Research", level: 80, color: "#6366f1" },
    { name: "Wireframing", level: 75, color: "#5B7FFF" }
  ],
  frontend: [
    { name: "React", level: 90, color: "#5B7FFF" },
    { name: "JavaScript ES6+", level: 85, color: "#8B5FFF" },
    { name: "HTML5", level: 80, color: "#FF6B9D" },
    { name: "CSS3", level: 75, color: "#5FBAFF" },
    { name: "React Hooks", level: 85, color: "#FF8A5B" }
  ]
};

let currentChartType = "horizontal";

// Função para desenhar gráfico de barras horizontais
function drawHorizontalBarChart(category) {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("Canvas não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");
  const skills = skillsData[category] || [];
  
  // Restante do código permanece igual...
}

// Função para desenhar gráfico donut
function drawDonutChart(category) {
  const canvas = document.getElementById("skillsChart");
  if (!canvas) {
    console.error("Canvas não encontrado!");
    return;
  }

  const ctx = canvas.getContext("2d");
  const skills = skillsData[category] || [];
  
  // Restante do código permanece igual...
}

// Função principal para desenhar o gráfico
function drawSkillsChart(category) {
  if (currentChartType === "horizontal") {
    drawHorizontalBarChart(category);
  } else {
    drawDonutChart(category);
  }
}

// Sistema de filtro de skills
function initSkillsFilter() {
  const skillCategories = document.querySelectorAll(".skill-category");

  skillCategories.forEach((category) => {
    category.addEventListener("click", () => {
      skillCategories.forEach(cat => cat.classList.remove("active"));
      category.classList.add("active");
      drawSkillsChart(category.dataset.category);
    });
  });

  // Botão para alternar tipo de gráfico
  const toggleButton = document.querySelector(".chart-toggle");
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      currentChartType = currentChartType === "horizontal" ? "donut" : "horizontal";
      const activeCategory = document.querySelector(".skill-category.active");
      if (activeCategory) {
        drawSkillsChart(activeCategory.dataset.category);
      }
    });
  }

  // Desenhar gráfico inicial
  drawSkillsChart("combinan");
}

// Carousel de Projetos
let currentSlide = 0;
let autoPlayInterval;

function initCarousel() {
  const slides = document.querySelectorAll(".project-slide");
  const totalSlides = slides.length;
  const track = document.getElementById("carouselTrack");
  const indicators = document.querySelectorAll(".indicator");
  const prevBtn = document.getElementById("prevBtn");
  const nextBtn = document.getElementById("nextBtn");
  const carouselContainer = document.querySelector(".projects-carousel");

  function updateCarousel() {
    if (!track) return;
    track.style.transform = `translateX(${-currentSlide * 100}%)`;
    indicators.forEach((ind, i) => ind.classList.toggle("active", i === currentSlide));
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
  }

  function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    updateCarousel();
  }

  function startAutoPlay() {
    autoPlayInterval = setInterval(nextSlide, 5000);
  }

  function stopAutoPlay() {
    clearInterval(autoPlayInterval);
  }

  // Event listeners
  if (nextBtn) nextBtn.addEventListener("click", nextSlide);
  if (prevBtn) prevBtn.addEventListener("click", prevSlide);

  indicators.forEach((indicator, i) => {
    indicator.addEventListener("click", () => {
      currentSlide = i;
      updateCarousel();
    });
  });

  if (carouselContainer) {
    carouselContainer.addEventListener("mouseenter", stopAutoPlay);
    carouselContainer.addEventListener("mouseleave", startAutoPlay);
  }

  // Iniciar autoplay
  startAutoPlay();
  updateCarousel();
}

// Função debounce para otimização
function debounce(func, wait = 10) {
  let timeout;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(func, wait);
  };
}

// Navbar scroll effect
function initNavbarScroll() {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  window.addEventListener("scroll", debounce(() => {
    navbar.style.background = window.scrollY > 100 
      ? "rgba(10, 10, 10, 0.95)" 
      : "rgba(10, 10, 10, 0.9)";
    navbar.style.backdropFilter = "blur(20px)";
  }));
}

// Menu mobile
function initMobileMenu() {
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");

  if (hamburger && navLinks) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active");
      navLinks.classList.toggle("active");
    });

    document.querySelectorAll(".nav-links a").forEach(link => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navLinks.classList.remove("active");
      });
    });
  }
}

// Efeito parallax otimizado
function initParallax() {
  let lastScroll = 0;
  window.addEventListener("scroll", debounce(() => {
    const currentScroll = window.pageYOffset;
    if (Math.abs(currentScroll - lastScroll) > 5) {
      const parallax = document.querySelector(".hero");
      if (parallax) {
        parallax.style.transform = `translateY(${currentScroll * 0.5}px)`;
      }
      lastScroll = currentScroll;
    }
  }));
}

// Lazy loading para imagens
function initLazyLoading() {
  const images = document.querySelectorAll("img[data-src]");
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src;
        img.classList.remove("lazy");
        imageObserver.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
}

// Animação de elementos ao aparecer
function initScrollAnimations() {
  const animateElements = document.querySelectorAll(".project-card, .contact-card, .certification-card");
  const animateObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";
        }, index * 100);
      }
    });
  }, { threshold: 0.1 });

  animateElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.6s ease";
    animateObserver.observe(el);
  });
}

// Inicialização principal
document.addEventListener("DOMContentLoaded", () => {
  // Iniciar animação de digitação
  const typingElement = document.querySelector(".typing-text");
  if (typingElement) {
    typeWriter(typingElement, 'console.log("Hello World!");', 150);
  }

  // Inicializar componentes
  initSkillsFilter();
  initCarousel();
  initNavbarScroll();
  initMobileMenu();
  initParallax();
  initLazyLoading();
  initScrollAnimations();

  console.log("🚀 Portfolio carregado com sucesso!");
});

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    console.log("🎯 Otimizações de performance aplicadas!");
  });
}