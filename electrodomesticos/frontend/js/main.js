// Configuración de Supabase
const SUPABASE_URL = "https://pclbesssdxkdzxdzmpuz.supabase.co";
const SUPABASE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InBjbGJlc3NzZHhrZHp4ZHptcHV6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM3NDYzNDgsImV4cCI6MjA3OTMyMjM0OH0.JmQ5PTmj-HApHClDIqbdnrQoDjq9hy1KvG7E-TlQc5s";
const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

// Número de teléfono ficticio
const phoneNumber = "+34 123 456 789";

// Insertar teléfono dinámicamente
function insertPhoneNumber() {
  const phoneElements = [
    document.getElementById("phone-number-header"),
    document.getElementById("phone-number-footer"),
    document.getElementById("phone-number-fixed")
  ];

  phoneElements.forEach(el => {
    if (el) el.textContent = phoneNumber;
  });

  const callBtns = [
    document.getElementById("call-btn-header"),
    document.getElementById("call-btn-hero"),
    document.getElementById("call-btn-fixed"),
  ];

  callBtns.forEach(btn => {
    if (btn) btn.href = `tel:${phoneNumber.replace(/\s+/g, '')}`;
  });
}

// Dropdown móvil
function setupDropdownMobile() {
  const dropdowns = document.querySelectorAll('.dropdown');
  const mq = window.matchMedia('(max-width: 767px)');

  dropdowns.forEach(dropdown => {
    dropdown.querySelector('.dropbtn').addEventListener('click', e => {
      if (mq.matches) {
        e.preventDefault();
        dropdown.classList.toggle('dropdown-mobile-open');
      }
    });
  });
}

// Dropdown hover escritorio
function setupDropdownHover() {
  const dropdowns = document.querySelectorAll('.dropdown');
  const mq = window.matchMedia('(min-width: 768px)');

  function activateHover() {
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropbtn');
      const menu = dropdown.querySelector('.dropdown-content');

      function onMouseEnter() { dropdown.classList.add('dropdown-hover-open'); }
      function onMouseLeave() {
        setTimeout(() => {
          if (!dropdown.matches(':hover')) dropdown.classList.remove('dropdown-hover-open');
        }, 100);
      }

      dropdown._onMouseEnter = onMouseEnter;
      dropdown._onMouseLeave = onMouseLeave;

      button.addEventListener('mouseenter', onMouseEnter);
      menu.addEventListener('mouseenter', onMouseEnter);
      button.addEventListener('mouseleave', onMouseLeave);
      menu.addEventListener('mouseleave', onMouseLeave);
    });
  }

  function deactivateHover() {
    dropdowns.forEach(dropdown => {
      const button = dropdown.querySelector('.dropbtn');
      const menu = dropdown.querySelector('.dropdown-content');

      dropdown.classList.remove('dropdown-hover-open');

      if (dropdown._onMouseEnter) {
        button.removeEventListener('mouseenter', dropdown._onMouseEnter);
        menu.removeEventListener('mouseenter', dropdown._onMouseEnter);
      }
      if (dropdown._onMouseLeave) {
        button.removeEventListener('mouseleave', dropdown._onMouseLeave);
        menu.removeEventListener('mouseleave', dropdown._onMouseLeave);
      }
    });
  }

  function handleMqChange(e) {
    if (e.matches) activateHover();
    else deactivateHover();
  }

  mq.addListener(handleMqChange);
  handleMqChange(mq);
}

// Cerrar todos los dropdowns móviles
function closeAllDropdownsMobile() {
  const dropdowns = document.querySelectorAll('.dropdown.dropdown-mobile-open');
  dropdowns.forEach(dropdown => dropdown.classList.remove('dropdown-mobile-open'));
}

// Menu hamburger
function setupHamburgerMenu() {
  const hamburger = document.getElementById('hamburger-btn');
  const nav = document.querySelector('.nav');

  hamburger.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('menu-open');
    if (!isOpen) closeAllDropdownsMobile();
  });
}

// Hero carousel tipo fade
function setupHeroCarousel() {
  const heroImageDiv = document.querySelector('.hero-image');
  if (!heroImageDiv) return;

  const imgElements = Array.from(heroImageDiv.querySelectorAll('img'));
  imgElements.forEach((img, i) => {
    img.style.position = 'absolute';
    img.style.top = '0';
    img.style.left = '0';
    img.style.width = '100%';
    img.style.height = '100%';
    img.style.objectFit = 'cover';
    img.style.opacity = i === 0 ? '1' : '0';
    img.style.transition = 'opacity 1s ease-in-out';
    img.style.userSelect = 'none';
  });

  let currentIndex = 0;
  const total = imgElements.length;
  const displayTime = 5000;
  const transitionTime = 1000;

  function showNextImage() {
    const current = imgElements[currentIndex];
    const nextIndex = (currentIndex + 1) % total;
    const next = imgElements[nextIndex];

    next.style.opacity = '1';

    setTimeout(() => {
      current.style.opacity = '0';
      currentIndex = nextIndex;
    }, transitionTime);

    setTimeout(showNextImage, displayTime + transitionTime);
  }

  let loadedCount = 0;
  imgElements.forEach(img => {
    img.addEventListener('load', () => {
      loadedCount++;
      if (loadedCount === imgElements.length) setTimeout(showNextImage, displayTime + transitionTime);
    });
    if (img.complete) {
      loadedCount++;
      if (loadedCount === imgElements.length) setTimeout(showNextImage, displayTime + transitionTime);
    }
  });
}

// Modal Solicita Visita
function setupVisitModal() {
  const modal = document.getElementById('visit-modal');
  const openBtn = document.getElementById('request-visit-btn');
  const closeBtn = document.getElementById('close-modal');

  openBtn.addEventListener('click', e => {
    e.preventDefault();
    modal.style.display = 'block';
  });

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  window.addEventListener('click', e => { if (e.target == modal) modal.style.display = 'none'; });
}

// ------------------ CONEXIÓN CON SUPABASE (FORMULARIO) ------------------
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('modalContactForm');
  const messageBox = document.getElementById('modal-form-message');

  if (form && messageBox) {
    form.addEventListener('submit', async e => {
      e.preventDefault();

      const nombre = document.getElementById('modal-name').value.trim();
      const telefono = document.getElementById('modal-phone').value.trim();
      const tipo = document.getElementById('modal-appliance').value;
      const problema = document.getElementById('modal-message').value.trim();
      const acepto = document.getElementById('acepto-privacidad').checked;

      if (!acepto) {
        messageBox.textContent = 'Debes aceptar la Política de privacidad.';
        messageBox.style.color = 'red';
        return;
      }

      try {
        const { data, error } = await supabase
          .from('formularios')
          .insert([
            {
              name: nombre,
              phone: telefono,
              appliance: tipo,
              message: problema
            }
          ]);

        if (error) throw error;

        // Guardar cookies automáticamente al enviar formulario (consentimiento implícito o explícito según diseño)
        await saveCookiesBackend(true);

        alert(`Gracias ${nombre}. Hemos recibido tu solicitud para reparar tu ${tipo}. Te llamaremos al ${telefono} lo antes posible.`);
        modal.style.display = 'none';
        form.reset();
        const modal = document.getElementById('visit-modal');
        if (modal) modal.style.display = 'none';

      } catch (error) {
        console.error('Error:', error);
        messageBox.textContent = 'Hubo un error al enviar la solicitud. Por favor, inténtalo de nuevo.';
        messageBox.style.color = 'red';
      }
    });
  }
});

// ------------------ Modal de Cookies ------------------
const cookieBtn = document.getElementById("cookie-btn");
const cookieModal = document.getElementById("cookie-modal");
const cookieClose = document.getElementById("cookie-close");
const cookieSectionsContainer = document.querySelector(".cookie-sections");

// Función para guardar cookies en Supabase
async function saveCookiesBackend(consent) {
  try {
    await supabase
      .from('cookies_consent')
      .insert([
        {
          user_ip: 'anon', // Supabase JS client no captura IP por defecto
          user_agent: navigator.userAgent,
          consent: consent,
          device_type: /Mobi|Android/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop',
          operating_system: navigator.platform,
          os_version: 'unknown',
          browser_name: 'unknown',
          browser_version: 'unknown',
          screen_width: window.screen.width,
          screen_height: window.screen.height,
          language: navigator.language
        }
      ]);
    console.log('Consentimiento guardado en Supabase');
  } catch (error) {
    console.error('Error al guardar cookies:', error);
  }
}

if (cookieSectionsContainer) {
  cookieSectionsContainer.innerHTML = `
    <div class="cookie-section">
      <h3>Resumen de Privacidad</h3>
      <p>Esta web utiliza cookies para que podamos ofrecerte la mejor experiencia de usuario posible. La información de las cookies se almacena en tu navegador y realiza funciones tales como reconocerte cuando vuelves a nuestra web o ayudar a nuestro equipo a comprender qué secciones de la web encuentras más interesantes y útiles. Más información en nuestra Política de cookies.</p>
    </div>
    <div class="cookie-section">
      <h3>Cookies estrictamente necesarias</h3>
      <p>Estas cookies son esenciales para el funcionamiento de la web.</p>
      <label><input type="checkbox" checked disabled> Activadas siempre</label>
    </div>
    <div class="cookie-section">
      <h3>Política de Cookies</h3>
      <p>Consulta nuestra <a href="politica.html" target="_blank">Política de cookies</a>.</p>

    </div>
    <div id="cookie-message" style="margin-top:10px;font-weight:600;"></div>
    <button id="save-cookies" class="btn-submit">Guardar Preferencias</button>
  `;
}

if (cookieBtn && cookieModal) {
  cookieBtn.addEventListener("click", () => { cookieModal.style.display = "block"; });
}

if (cookieClose && cookieModal) {
  cookieClose.addEventListener("click", () => { cookieModal.style.display = "none"; });
}

window.addEventListener("click", (e) => { if (e.target === cookieModal) cookieModal.style.display = "none"; });

// Guardar preferencias en localStorage y en backend
cookieSectionsContainer?.addEventListener("click", (e) => {
  if (e.target && e.target.id === "save-cookies") {
    localStorage.setItem("cookiesConsent", "yes"); // Flag global de consentimiento
    saveCookiesBackend(true); // Guardamos que aceptó (solo necesarias)

    // Mostrar mensaje dentro del modal en vez de alert
    const msgBox = document.getElementById("cookie-message");
    if (msgBox) {
      msgBox.textContent = "Tus preferencias han sido guardadas.";
      msgBox.style.color = "green";
    }

    setTimeout(() => { cookieModal.style.display = "none"; }, 1000);
  }
});

// Aplicar elección previa al cargar
window.addEventListener("DOMContentLoaded", () => {

  // Mostrar modal si nunca aceptó
  const consent = localStorage.getItem("cookiesConsent");
  if (!consent && cookieModal) {
    cookieModal.style.display = "block";
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn-call-fixed');
  const bottomOffset = 20;

  window.addEventListener('scroll', () => {
    const docHeight = document.body.offsetHeight;
    const scrollPosition = window.scrollY;
    const windowHeight = window.innerHeight;
    const remainingDistance = docHeight - (scrollPosition + windowHeight);

    if (remainingDistance <= bottomOffset) {
      btn.classList.add('at-bottom');
    } else {
      btn.classList.remove('at-bottom');
    }
  });
});

// ------------------ Inicialización general ------------------
document.addEventListener('DOMContentLoaded', () => {
  insertPhoneNumber();
  setupDropdownMobile();
  setupDropdownHover();
  setupHamburgerMenu();
  setupHeroCarousel();
  setupVisitModal();
  window.addEventListener('resize', () => {
    if (window.innerWidth > 900) {
      const nav = document.querySelector('.nav');
      if (nav && nav.classList.contains('menu-open')) nav.classList.remove('menu-open');
      closeAllDropdownsMobile();
    }
  });
});
document.addEventListener('DOMContentLoaded', () => {
  const btn = document.querySelector('.btn-call-fixed');
  if (!btn) return;

  function toggleBtn() {
    const scrollTop = window.scrollY;
    const atTop = scrollTop < 300;
    const atBottom = window.innerHeight + scrollTop >= document.body.offsetHeight - 100;

    if (atTop || atBottom) {
      btn.classList.add('hidden');   // Oculta arriba y abajo
    } else {
      btn.classList.remove('hidden'); // Muestra en el resto
    }
  }

  toggleBtn();
  window.addEventListener('scroll', toggleBtn);
});
