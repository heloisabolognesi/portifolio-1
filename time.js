let currentSlide = 0;
let track, cards, totalSlides;

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', function() {
    track = document.getElementById('carouselTrack');
    cards = document.querySelectorAll('.month-card');
    totalSlides = cards.length;
    
    if (totalSlides > 0) {
        createIndicators();
        updateCarousel();
    }
});

// Criar indicadores
function createIndicators() {
    const indicatorsContainer = document.getElementById('indicators');
    indicatorsContainer.innerHTML = ''; // Limpar indicadores existentes
    
    for (let i = 0; i < totalSlides; i++) {
        const indicator = document.createElement('div');
        indicator.className = `indicator ${i === 0 ? 'active' : ''}`;
        indicator.addEventListener('click', () => goToSlide(i));
        indicatorsContainer.appendChild(indicator);
    }
}

function updateCarousel() {
    if (!track || !cards.length) return;
    
    const translateX = -currentSlide * 100; // 100% por slide
    track.style.transform = `translateX(${translateX}%)`;
    
    // Atualizar indicadores
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
        indicator.classList.toggle('active', index === currentSlide);
    });
}

function nextSlide() {
    if (currentSlide < totalSlides - 1) {
        currentSlide++;
        updateCarousel();
    }
}

function prevSlide() {
    if (currentSlide > 0) {
        currentSlide--;
        updateCarousel();
    }
}

function goToSlide(index) {
    if (index >= 0 && index < totalSlides) {
        currentSlide = index;
        updateCarousel();
    }
}

// Auto-play (opcional)
function autoPlay() {
    setInterval(() => {
        if (currentSlide < totalSlides - 1) {
            nextSlide();
        } else {
            currentSlide = 0;
            updateCarousel();
        }
    }, 5000);
}

// Navegação por teclado
document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') prevSlide();
    if (e.key === 'ArrowRight') nextSlide();
});

// Touch/Swipe support
let startX = 0;
let endX = 0;

document.addEventListener('DOMContentLoaded', function() {
    const track = document.getElementById('carouselTrack');
    
    if (track) {
        track.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });

        track.addEventListener('touchend', (e) => {
            endX = e.changedTouches[0].clientX;
            const difference = startX - endX;
            
            if (Math.abs(difference) > 50) { // Minimum swipe distance
                if (difference > 0) {
                    nextSlide(); // Swipe left - next slide
                } else {
                    prevSlide(); // Swipe right - previous slide
                }
            }
        });
    }
});

// Responsive: recalcular ao redimensionar
window.addEventListener('resize', updateCarousel);

// Function to handle month navigation button clicks
function handleMonthNav() {
    document.querySelectorAll(".timeline-nav .nav-btn").forEach(btn => {
        btn.addEventListener("click", function() {
            const month = this.dataset.month;
            if (!month) return;

            // Update active button state
            document.querySelectorAll(".timeline-nav .nav-btn").forEach(b => b.classList.remove("active"));
            this.classList.add("active");

            // Show the selected month's carousel and hide others
            document.querySelectorAll(".month-carousel").forEach(c => c.classList.remove("active"));
            const targetCarousel = document.getElementById(month);
            if (targetCarousel) {
                targetCarousel.classList.add("active");
                // Ensure the newly activated carousel is correctly initialized and updated
                initializeOrUpdateCarousel(month);
            } else {
                console.error("Carousel element not found for month:", month);
            }
        });
    });
}

// Store state for each carousel (current index)
const carouselState = {};

// Initialize or update a specific carousel
function initializeOrUpdateCarousel(monthId) {
    const carouselElement = document.getElementById(monthId);
    if (!carouselElement) return;

    // Initialize state if it doesn't exist
    if (!carouselState[monthId]) {
        carouselState[monthId] = { currentIndex: 0 };
        // Attach event listeners only once during initialization
        const prevBtn = carouselElement.querySelector(".carousel-btn.prev");
        const nextBtn = carouselElement.querySelector(".carousel-btn.next");
        if (prevBtn) prevBtn.onclick = () => prevSlide(monthId);
        if (nextBtn) nextBtn.onclick = () => nextSlide(monthId);
    }
    
    // Always update the carousel view (position and button states)
    updateCarouselView(monthId);
}

// Update the visual state of a carousel (scroll position, button disabled state)
function updateCarouselView(monthId) {
    const carouselElement = document.getElementById(monthId);
    if (!carouselElement || !carouselState[monthId]) return;

    const track = carouselElement.querySelector(".carousel-track");
    const cards = track ? track.querySelectorAll(".timeline-card") : [];
    const prevBtn = carouselElement.querySelector(".carousel-btn.prev");
    const nextBtn = carouselElement.querySelector(".carousel-btn.next");
    const wrapper = carouselElement.querySelector(".carousel-wrapper");

    // Handle cases where elements might be missing
    if (!track || !wrapper || cards.length === 0) {
        if (prevBtn) prevBtn.disabled = true;
        if (nextBtn) nextBtn.disabled = true;
        if (track) track.style.transform = "translateX(0px)"; // Reset position
        return;
    }

    const cardStyle = window.getComputedStyle(cards[0]);
    const cardWidth = cards[0].offsetWidth;
    const cardMargin = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(track).gap) || 20; // Get gap/margin
    const scrollWidth = cardWidth + cardMargin;
    const currentIdx = carouselState[monthId].currentIndex;
    const wrapperWidth = wrapper.offsetWidth;

    // Calculate the maximum scrollable index
    // This is tricky because we might only see partial cards.
    // Let's calculate how many cards *start* within the visible area.
    const totalContentWidth = cards.length * scrollWidth - cardMargin; // Total width of all cards + gaps
    const maxPossibleOffset = wrapperWidth - totalContentWidth;
    
    // Calculate the maximum index we can scroll to without showing empty space on the right
    // Find the index of the first card that starts beyond the visible area when scrolled fully left
    let maxIndex = 0;
    let cumulativeWidth = 0;
    for(let i = 0; i < cards.length; i++) {
        if (cumulativeWidth + cardWidth > wrapperWidth) {
             break; // This card starts outside the initial view
        }
        cumulativeWidth += scrollWidth;
        maxIndex = i;
    }
    // A simpler approach: max index is total cards minus number of fully visible cards
    const fullyVisibleCards = Math.floor(wrapperWidth / scrollWidth);
    const calculatedMaxIndex = Math.max(0, cards.length - fullyVisibleCards);
    // Let's refine maxIndex calculation based on offset
    const maxScrollOffset = Math.max(0, totalContentWidth - wrapperWidth);
    const effectiveMaxIndex = Math.ceil(maxScrollOffset / scrollWidth);


    // Clamp the current index just in case
    carouselState[monthId].currentIndex = Math.max(0, Math.min(currentIdx, effectiveMaxIndex));
    const clampedIdx = carouselState[monthId].currentIndex;

    // Calculate the translation offset
    let offset = -clampedIdx * scrollWidth;
    // Ensure we don't scroll past the end
    offset = Math.max(offset, -maxScrollOffset);

    // Apply the translation
    track.style.transform = `translateX(${offset}px)`;

    // Update button states
    if (prevBtn) {
        prevBtn.disabled = clampedIdx <= 0;
    }
    if (nextBtn) {
        // Disable if we are at or past the last possible starting position
        nextBtn.disabled = clampedIdx >= effectiveMaxIndex;
        // Also disable if the content fits entirely
        if (totalContentWidth <= wrapperWidth) {
             nextBtn.disabled = true;
        }
    }
}

// Go to the next slide
function nextSlide(monthId) {
    if (!carouselState[monthId]) return;
    // Calculate max index dynamically before incrementing
     const carouselElement = document.getElementById(monthId);
     if (!carouselElement) return;
     const track = carouselElement.querySelector(".carousel-track");
     const cards = track ? track.querySelectorAll(".timeline-card") : [];
     const wrapper = carouselElement.querySelector(".carousel-wrapper");
     if (!track || !wrapper || cards.length === 0) return;
     
     const cardStyle = window.getComputedStyle(cards[0]);
     const cardWidth = cards[0].offsetWidth;
     const cardMargin = parseFloat(cardStyle.marginRight) || parseFloat(window.getComputedStyle(track).gap) || 20;
     const scrollWidth = cardWidth + cardMargin;
     const totalContentWidth = cards.length * scrollWidth - cardMargin;
     const wrapperWidth = wrapper.offsetWidth;
     const maxScrollOffset = Math.max(0, totalContentWidth - wrapperWidth);
     const effectiveMaxIndex = Math.ceil(maxScrollOffset / scrollWidth);

    if (carouselState[monthId].currentIndex < effectiveMaxIndex) {
        carouselState[monthId].currentIndex++;
        updateCarouselView(monthId);
    }
}

// Go to the previous slide
function prevSlide(monthId) {
    if (!carouselState[monthId]) return;

    if (carouselState[monthId].currentIndex > 0) {
        carouselState[monthId].currentIndex--;
        updateCarouselView(monthId);
    }
}

// Initialize everything on DOMContentLoaded
document.addEventListener("DOMContentLoaded", function() {
    handleMonthNav();

    // Initialize the carousel that is initially active
    const activeMonthCarousel = document.querySelector(".month-carousel.active");
    if (activeMonthCarousel) {
        initializeOrUpdateCarousel(activeMonthCarousel.id);
    }

    // Add resize listener to update all potentially visible carousels
    let resizeTimeout;
    window.addEventListener("resize", () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            // Update only the currently active carousel on resize for efficiency
            const activeCarousel = document.querySelector(".month-carousel.active");
            if (activeCarousel) {
                updateCarouselView(activeCarousel.id);
            }
        }, 250); // Debounce resize events
    });
});

