// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Header background change on scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(10, 10, 15, 0.98)';
    } else {
        header.style.background = 'rgba(10, 10, 15, 0.95)';
    }
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .service-card, .team-member, .contact-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.floating-card');
    const speed = 0.5;
    
    parallaxElements.forEach((element, index) => {
        const yPos = -(scrolled * speed * (index + 1) * 0.1);
        element.style.transform = `translateY(${yPos}px)`;
    });
});

// Typing animation for hero title
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Initialize typing animation when page loads
function typeWriterHTML(element, html, speed) {
  let i = 0;
  let isTag = false;
  let text = '';

  function type() {
    const char = html[i++];
    if (char === '<') {
      isTag = true;
    }
    if (isTag) {
      text += char;
      if (char === '>') {
        isTag = false;
      }
    } else {
      text += char;
    }

    element.innerHTML = text;

    if (i < html.length) {
      setTimeout(type, isTag ? 0 : speed); 
      // se for tag, não faz pausa; se for texto, pausa
    }
  }
  type();
}

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalHTML = heroTitle.innerHTML; // com tags
    heroTitle.innerHTML = ''; // limpa antes de digitar
    setTimeout(() => {
      typeWriterHTML(heroTitle, originalHTML, 50); // 50 ms por caractere
    }, 500);
  }
});

// Add glow effect to cards on hover
document.querySelectorAll('.service-card, .feature-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.boxShadow = '0 20px 40px rgba(255, 0, 128, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.boxShadow = '';
    });
});

// WhatsApp link tracking
document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
    link.addEventListener('click', () => {
        // You can add analytics tracking here
        console.log('WhatsApp link clicked');
    });
});

// Dynamic particle animation
function createParticle() {
    const particle = document.createElement('div');
    particle.classList.add('dynamic-particle');
    particle.style.cssText = `
        position: fixed;
        width: 2px;
        height: 2px;
        background: #ff0080;
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        box-shadow: 0 0 6px #ff0080;
    `;
    
    particle.style.left = Math.random() * 100 + 'vw';
    particle.style.top = '100vh';
    
    document.body.appendChild(particle);
    
    const duration = Math.random() * 3000 + 2000;
    particle.animate([
        { transform: 'translateY(0) translateX(0)', opacity: 0 },
        { transform: `translateY(-100vh) translateX(${(Math.random() - 0.5) * 100}px)`, opacity: 1 }
    ], {
        duration: duration,
        easing: 'linear'
    }).onfinish = () => {
        particle.remove();
    };
}

// Create particles periodically
setInterval(createParticle, 2000);

// Add active state to navigation based on scroll position
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let currentSection = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        if (pageYOffset >= sectionTop) {
            currentSection = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + currentSection) {
            link.classList.add('active');
        }
    });
});

// Add CSS for active nav link
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-neon) !important;
        text-shadow: 0 0 10px var(--accent-glow);
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
window.addEventListener('scroll', throttle(() => {
    // Scroll-based animations here
}, 16)); // ~60fps

// Preload critical resources
window.addEventListener('load', () => {
    // Preload WhatsApp link
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = 'https://wa.me';
    document.head.appendChild(link);
});

// noticiasß
const newsData = {
    1: {
      title: "Pré-inauguração Hub Comitiva Inovação",
      date: "17/06/2025",
      img: "imagem/preinauguracao.jpeg",
      text: "A VetAI participou da pré-inauguração do Hub Comitiva Inovação, um espaço dedicado à inovação e tecnologia em Barretos."
    },
    2: {
      title: "Inauguração com presença do Bruto Valley",
      date: "30/06/2025",
      img: "imagem/brutoval.jpeg",
      text: "Evento de inauguração oficial com a presença do Grupo Bruto Valley, marcando uma nova fase para startups de tecnologia."
    },
    3: {
      title: "Apresentação do Pitch",
      date: "25/07/2025",
      img: "imagem/pitch.jpeg",
      text: "Durante a seletiva, apresentamos nosso pitch e fomos selecionados como uma das startups residentes no Hub."
    },
    4: {
      title: "Visita do Senador Marcos Pontes",
      date: "25/08/2025",
      img: "imagem/senador.jpeg",
      text: "O senador Marcos Pontes visitou o Hub Comitiva Inovação, reconhecendo a importância da VetAI no avanço da veterinária com IA."
    }
  };
  
  // elementos do modal
  const modal = document.getElementById("newsModal");
  const closeBtn = document.querySelector(".close");
  const modalTitle = document.getElementById("modalTitle");
  const modalDate = document.getElementById("modalDate");
  const modalImage = document.getElementById("modalImage");
  const modalText = document.getElementById("modalText");
  
  // abri modal ao clicar no card
  document.querySelectorAll(".news-card").forEach(card => {
    card.addEventListener("click", () => {
      const id = card.dataset.id;
      const data = newsData[id];
  
      modalTitle.textContent = data.title;
      modalDate.textContent = data.date;
      modalImage.src = data.img;
      modalText.textContent = data.text;
  
      modal.style.display = "flex";
    });
  });
  
  // Fechar modal
  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });
  
  // Fechar ao clicar fora
  window.addEventListener("click", e => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
  
