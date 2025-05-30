// Import particlesJS library
const particlesJS = window.particlesJS

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
  })
}

// Cursor personalizado
const cursor = document.querySelector(".cursor")
const cursorFollower = document.querySelector(".cursor-follower")

if (cursor && cursorFollower) {
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px"
    cursor.style.top = e.clientY + "px"

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px"
      cursorFollower.style.top = e.clientY + "px"
    }, 100)
  })

  // Efeito de hover nos links
  document.querySelectorAll("a, button").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.style.transform = "scale(1.5)"
      cursorFollower.style.transform = "scale(1.5)"
    })

    el.addEventListener("mouseleave", () => {
      cursor.style.transform = "scale(1)"
      cursorFollower.style.transform = "scale(1)"
    })
  })
}

// Navegação suave
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Animação de digitação
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.innerHTML = ""

  function type() {
    if (i < text.length) {
      element.innerHTML += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Iniciar animação de digitação quando a página carregar
window.addEventListener("load", () => {
  const typingElement = document.querySelector(".typing-text")
  if (typingElement) {
    typeWriter(typingElement, 'console.log("Hello World!");', 150)
  }
})

// Contador animado para estatísticas
function animateCounter(element, target, duration = 2000) {
  let start = 0
  const increment = target / (duration / 16)

  function updateCounter() {
    start += increment
    if (start < target) {
      element.textContent = Math.floor(start)
      requestAnimationFrame(updateCounter)
    } else {
      element.textContent = target
    }
  }

  updateCounter()
}

// Observer para animações on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate-on-scroll")

      // Animar contadores quando a seção about aparecer
      if (entry.target.classList.contains("about")) {
        const counters = entry.target.querySelectorAll(".stat-number")
        counters.forEach((counter) => {
          const target = Number.parseInt(counter.getAttribute("data-target"))
          animateCounter(counter, target)
        })
      }
    }
  })
}, observerOptions)

// Observar todas as seções
document.querySelectorAll("section").forEach((section) => {
  observer.observe(section)
})

// Skills Chart Data
const skillsData = {
  frontend: [
    { name: "React", level: 90, color: "#5B7FFF" },
    { name: "JavaScript", level: 85, color: "#8B5FFF" },
    { name: "TypeScript", level: 80, color: "#FF6B9D" },
    { name: "Vue.js", level: 75, color: "#5FBAFF" },
    { name: "CSS3", level: 88, color: "#FF8A5B" },
  ],
  backend: [
    { name: "Node.js", level: 75, color: "#5B7FFF" },
    { name: "Express", level: 70, color: "#8B5FFF" },
    { name: "MongoDB", level: 65, color: "#FF6B9D" },
    { name: "PostgreSQL", level: 68, color: "#5FBAFF" },
    { name: "Python", level: 60, color: "#FF8A5B" },
  ],
  tools: [
    { name: "Git", level: 85, color: "#5B7FFF" },
    { name: "Docker", level: 65, color: "#8B5FFF" },
    { name: "AWS", level: 70, color: "#FF6B9D" },
    { name: "Figma", level: 80, color: "#5FBAFF" },
    { name: "VS Code", level: 90, color: "#FF8A5B" },
  ],
  design: [
    { name: "UI Design", level: 85, color: "#5B7FFF" },
    { name: "UX Research", level: 75, color: "#8B5FFF" },
    { name: "Prototyping", level: 80, color: "#FF6B9D" },
    { name: "Design Systems", level: 70, color: "#5FBAFF" },
    { name: "User Testing", level: 65, color: "#FF8A5B" },
  ],
}

let currentChartType = "horizontal" // 'horizontal' ou 'donut'

// Função para desenhar gráfico de barras horizontais
function drawHorizontalBarChart(category) {
  const canvas = document.getElementById("skillsChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const skills = skillsData[category] || []

  // Configurações do canvas
  canvas.width = 500
  canvas.height = 300

  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Configurações do gráfico
  const padding = 40
  const chartWidth = canvas.width - padding * 2 - 80
  const chartHeight = canvas.height - padding * 2
  const barHeight = 25
  const barSpacing = (chartHeight - skills.length * barHeight) / (skills.length + 1)

  // Desenhar as barras
  skills.forEach((skill, index) => {
    const y = padding + barSpacing + index * (barHeight + barSpacing)
    const barWidth = (skill.level / 100) * chartWidth
    const x = padding + 80

    // Fundo da barra
    ctx.fillStyle = "#f0f0f0"
    ctx.fillRect(x, y, chartWidth, barHeight)

    // Barra principal com gradiente
    const gradient = ctx.createLinearGradient(x, y, x + barWidth, y)
    gradient.addColorStop(0, skill.color)
    gradient.addColorStop(1, skill.color + "CC")

    ctx.fillStyle = gradient
    ctx.fillRect(x, y, barWidth, barHeight)

    // Nome da skill
    ctx.fillStyle = "#333333"
    ctx.font = "14px Inter"
    ctx.textAlign = "right"
    ctx.fillText(skill.name, x - 10, y + barHeight / 2 + 5)

    // Porcentagem
    ctx.fillStyle = "#666666"
    ctx.font = "bold 14px Inter"
    ctx.textAlign = "left"
    ctx.fillText(`${skill.level}%`, x + chartWidth + 10, y + barHeight / 2 + 5)

    // Borda na barra
    ctx.strokeStyle = skill.color
    ctx.lineWidth = 1
    ctx.strokeRect(x, y, barWidth, barHeight)
  })
}

// Função para desenhar gráfico donut
function drawDonutChart(category) {
  const canvas = document.getElementById("skillsChart")
  if (!canvas) return

  const ctx = canvas.getContext("2d")
  const skills = skillsData[category] || []

  // Configurações do canvas
  canvas.width = 400
  canvas.height = 350

  // Limpar canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2 - 30
  const outerRadius = 80
  const innerRadius = 45

  // Calcular total para porcentagens
  const total = skills.reduce((sum, skill) => sum + skill.level, 0)

  let currentAngle = -Math.PI / 2

  // Desenhar as fatias do donut
  skills.forEach((skill, index) => {
    const sliceAngle = (skill.level / total) * 2 * Math.PI
    const endAngle = currentAngle + sliceAngle

    // Desenhar fatia
    ctx.beginPath()
    ctx.arc(centerX, centerY, outerRadius, currentAngle, endAngle)
    ctx.arc(centerX, centerY, innerRadius, endAngle, currentAngle, true)
    ctx.closePath()

    ctx.fillStyle = skill.color
    ctx.fill()

    // Borda branca entre fatias
    ctx.strokeStyle = "#ffffff"
    ctx.lineWidth = 2
    ctx.stroke()

    currentAngle = endAngle
  })

  // Texto central
  ctx.fillStyle = "#666666"
  ctx.font = "12px Inter"
  ctx.textAlign = "center"
  ctx.fillText("Áreas de", centerX, centerY - 5)
  ctx.fillText("Conhecimento", centerX, centerY + 10)

  // Legenda embaixo
  const legendY = centerY + outerRadius + 40
  const legendItemWidth = canvas.width / skills.length

  skills.forEach((skill, index) => {
    const legendX = (index + 0.5) * legendItemWidth

    // Quadradinho colorido
    ctx.fillStyle = skill.color
    ctx.fillRect(legendX - 25, legendY - 8, 12, 12)

    // Texto da legenda
    ctx.fillStyle = "#333333"
    ctx.font = "11px Inter"
    ctx.textAlign = "center"

    // Nome da skill
    ctx.fillText(skill.name, legendX, legendY + 15)

    // Porcentagem
    const percentage = Math.round((skill.level / total) * 100)
    ctx.fillStyle = "#666666"
    ctx.fillText(`(${percentage}%)`, legendX, legendY + 30)
  })
}

// Função principal para desenhar o gráfico
function drawSkillsChart(category) {
  if (currentChartType === "horizontal") {
    drawHorizontalBarChart(category)
  } else {
    drawDonutChart(category)
  }
}

// Sistema de filtro de skills
document.addEventListener("DOMContentLoaded", () => {
  const skillCategories = document.querySelectorAll(".skill-category")

  skillCategories.forEach((category) => {
    category.addEventListener("click", () => {
      // Remover classe active de todas as categorias
      skillCategories.forEach((cat) => cat.classList.remove("active"))
      // Adicionar classe active na categoria clicada
      category.classList.add("active")

      const targetCategory = category.getAttribute("data-category")

      // Atualizar título do gráfico
      const chartTitle = document.querySelector(".chart-title")
      if (chartTitle) {
        const titles = {
          horizontal: "Progresso de Aprendizado",
          donut: "Distribuição de Habilidades por Área",
        }
        chartTitle.textContent =
          titles[currentChartType] || `${targetCategory.charAt(0).toUpperCase() + targetCategory.slice(1)} Skills`
      }

      // Desenhar novo gráfico
      drawSkillsChart(targetCategory)
    })
  })

  // Botão para alternar tipo de gráfico
  const toggleButton = document.querySelector(".chart-toggle")
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      currentChartType = currentChartType === "horizontal" ? "donut" : "horizontal"

      // Encontrar categoria ativa
      const activeCategory = document.querySelector(".skill-category.active")
      const category = activeCategory ? activeCategory.getAttribute("data-category") : "frontend"

      // Atualizar título
      const chartTitle = document.querySelector(".chart-title")
      if (chartTitle) {
        const titles = {
          horizontal: "Progresso de Aprendizado",
          donut: "Distribuição de Habilidades por Área",
        }
        chartTitle.textContent = titles[currentChartType]
      }

      // Redesenhar gráfico
      drawSkillsChart(category)
    })
  }

  // Desenhar gráfico inicial
  drawSkillsChart("frontend")
})

// Carousel de Projetos
let currentSlide = 0
const slides = document.querySelectorAll(".project-slide")
const totalSlides = slides.length
const track = document.getElementById("carouselTrack")
const indicators = document.querySelectorAll(".indicator")
const prevBtn = document.getElementById("prevBtn")
const nextBtn = document.getElementById("nextBtn")

function updateCarousel() {
  if (!track) return

  const translateX = -currentSlide * 100
  track.style.transform = `translateX(${translateX}%)`

  // Atualizar indicadores
  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("active", index === currentSlide)
  })
}

function nextSlide() {
  currentSlide = (currentSlide + 1) % totalSlides
  updateCarousel()
}

function prevSlide() {
  currentSlide = (currentSlide - 1 + totalSlides) % totalSlides
  updateCarousel()
}

// Event listeners para os botões
if (nextBtn) nextBtn.addEventListener("click", nextSlide)
if (prevBtn) prevBtn.addEventListener("click", prevSlide)

// Event listeners para os indicadores
indicators.forEach((indicator, index) => {
  indicator.addEventListener("click", () => {
    currentSlide = index
    updateCarousel()
  })
})

// Auto-play do carousel
let autoPlayInterval = setInterval(nextSlide, 5000)

// Pausar auto-play quando hover
const carouselContainer = document.querySelector(".projects-carousel")
if (carouselContainer) {
  carouselContainer.addEventListener("mouseenter", () => {
    clearInterval(autoPlayInterval)
  })

  carouselContainer.addEventListener("mouseleave", () => {
    autoPlayInterval = setInterval(nextSlide, 5000)
  })

  // Suporte para swipe em dispositivos móveis
  let startX = 0
  let endX = 0

  carouselContainer.addEventListener("touchstart", (e) => {
    startX = e.touches[0].clientX
  })

  carouselContainer.addEventListener("touchend", (e) => {
    endX = e.changedTouches[0].clientX
    handleSwipe()
  })

  function handleSwipe() {
    const swipeThreshold = 50
    const diff = startX - endX

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        nextSlide()
      } else {
        prevSlide()
      }
    }
  }
}

// Navbar scroll effect
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (navbar) {
    if (window.scrollY > 100) {
      navbar.style.background = "rgba(10, 10, 10, 0.95)"
      navbar.style.backdropFilter = "blur(20px)"
    } else {
      navbar.style.background = "rgba(10, 10, 10, 0.9)"
      navbar.style.backdropFilter = "blur(20px)"
    }
  }
})

// Menu mobile
const hamburger = document.querySelector(".hamburger")
const navLinks = document.querySelector(".nav-links")

if (hamburger) {
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active")
    if (navLinks) navLinks.classList.toggle("active")
  })
}

// Fechar menu mobile ao clicar em um link
document.querySelectorAll(".nav-links a").forEach((link) => {
  link.addEventListener("click", () => {
    if (hamburger) hamburger.classList.remove("active")
    if (navLinks) navLinks.classList.remove("active")
  })
})

// Efeito parallax no hero
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero")
  const speed = scrolled * 0.5

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Lazy loading para imagens
const images = document.querySelectorAll("img[data-src]")
const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const img = entry.target
      img.src = img.dataset.src
      img.classList.remove("lazy")
      imageObserver.unobserve(img)
    }
  })
})

images.forEach((img) => imageObserver.observe(img))

// Adicionar classe de animação aos elementos quando aparecem na tela
const animateElements = document.querySelectorAll(".project-card, .contact-card, .certification-card")

const animateObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = "1"
          entry.target.style.transform = "translateY(0)"
        }, index * 100)
      }
    })
  },
  {
    threshold: 0.1,
  },
)

animateElements.forEach((el) => {
  el.style.opacity = "0"
  el.style.transform = "translateY(30px)"
  el.style.transition = "all 0.6s ease"
  animateObserver.observe(el)
})

// Inicialização
document.addEventListener("DOMContentLoaded", () => {
  // Inicializar carousel
  if (track) updateCarousel()

  console.log("🚀 Portfolio carregado com sucesso!")
})

// Performance optimization
if ("requestIdleCallback" in window) {
  requestIdleCallback(() => {
    console.log("🎯 Otimizações de performance aplicadas!")
  })
}
