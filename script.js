// =========================
// UTILIDADES
// =========================
function setWrapperHeight(wrapper, activeSelector) {
  const activeBox = document.querySelector(activeSelector);
  if (!wrapper || !activeBox) return;
  wrapper.style.height = activeBox.scrollHeight + "px";
}

// =========================
// ELEMENTOS GLOBALES
// =========================
const translateBtn = document.getElementById("translateBtn");
const translateFlag = document.getElementById("translateFlag");
const translateText = null;
const cvBtn = document.getElementById("cvBtn");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

let currentLang = "es";

// =========================
// TABS - RESUME
// =========================
const resumeLists = document.querySelectorAll(".resume-list");
const resumeBoxes = document.querySelectorAll(".resume-box");
const resumeWrapper = document.querySelector(".resume .tab-wrapper");

resumeLists.forEach((list, index) => {
  list.addEventListener("click", () => {
    document.querySelector(".resume-list.active")?.classList.remove("active");
    list.classList.add("active");

    document.querySelector(".resume-box.active")?.classList.remove("active");
    resumeBoxes[index].classList.add("active");

    setWrapperHeight(resumeWrapper, ".resume-box.active");
  });
});

// =========================
// TABS - PORTFOLIO
// =========================
const portfolioLists = document.querySelectorAll(".portfolio-list");
const portfolioBoxes = document.querySelectorAll(".portfolio-box");
const portfolioWrapper = document.querySelector(".portfolio .tab-wrapper");

portfolioLists.forEach((list, index) => {
  list.addEventListener("click", () => {
    document.querySelector(".portfolio-list.active")?.classList.remove("active");
    list.classList.add("active");

    document.querySelector(".portfolio-box.active")?.classList.remove("active");
    portfolioBoxes[index].classList.add("active");

    setWrapperHeight(portfolioWrapper, ".portfolio-box.active");
  });
});

// =========================
// NAVBAR FUNCIONAL
// =========================
const navItems = document.querySelectorAll(".nav-list li");
const sections = document.querySelectorAll(".section");

navItems.forEach((item) => {
  item.addEventListener("click", () => {
    const sectionId = item.getAttribute("data-section");
    const targetSection = document.getElementById(sectionId);

    if (targetSection) {
      targetSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }

    document.querySelector(".nav-list li.active")?.classList.remove("active");
    item.classList.add("active");
  });
});

// =========================
// NAV ACTIVO SEGÚN SCROLL
// =========================
window.addEventListener("scroll", () => {
  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 180;
    const sectionHeight = section.offsetHeight;

    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
      currentSection = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    if (item.getAttribute("data-section") === currentSection) {
      item.classList.add("active");
    }
  });
});

// =========================
// FORMULARIO DE CONTACTO
// =========================
if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const formData = new FormData(contactForm);
    const name = formData.get("name");
    const email = formData.get("email");
    const phone = formData.get("phone");
    const subject = formData.get("subject");
    const message = formData.get("message");

    if (!name || !email || !phone || !subject || !message) {
      if (formMessage) {
        formMessage.textContent =
          currentLang === "es"
            ? "Por favor, completa todos los campos."
            : "Please complete all fields.";
      }
      return;
    }

    const emailTo = "polomanuel860@gmail.com"; // CAMBIA ESTO POR TU CORREO

    const mailSubject = encodeURIComponent(
      currentLang === "es"
        ? `Contacto desde portafolio - ${subject}`
        : `Portfolio contact - ${subject}`
    );

    const mailBody = encodeURIComponent(
      `${currentLang === "es" ? "Nombre" : "Name"}: ${name}\n` +
      `${currentLang === "es" ? "Correo" : "Email"}: ${email}\n` +
      `${currentLang === "es" ? "Teléfono" : "Phone"}: ${phone}\n\n` +
      `${currentLang === "es" ? "Mensaje" : "Message"}:\n${message}`
    );

    window.location.href = `mailto:${emailTo}?subject=${mailSubject}&body=${mailBody}`;

    if (formMessage) {
      formMessage.textContent =
        currentLang === "es"
          ? "Se abrió tu aplicación de correo para enviar el mensaje."
          : "Your email application was opened to send the message.";
    }

    contactForm.reset();
  });
}

// =========================
// TRADUCCIONES
// =========================
const translations = {
  es: {
    navHome: "Home",
    navAbout: "Sobre mí",
    navResume: "Experiencia",
    navPortfolio: "Portafolio",
    navContact: "Contacto",

    tooltipGithub: "Github",
    tooltipLinkedin: "Linkedin",
    tooltipProject: "Info",
    tooltipRepo: "Repositorio de Github",

    homeGreeting: "Hola, soy",
    homeRole: "Estudiante de Ingeniería de Software",
    homeDesc:
      "Soy un estudiante de Ingeniería de Software con conocimientos en desarrollo, gestión y diseño, comprometido con aprender constantemente y enfrentar nuevos desafíos. Busco activamente oportunidades para crecer profesionalmente, potenciar mis habilidades y adquirir nuevas competencias que me permitan diseñar software innovador y de alto rendimiento.",
    downloadCV: "Descargar CV",

    aboutTitle: "Sobre Mí",
    aboutRole: "Aprendo, creo, evoluciono",
    aboutDesc:
      "Soy un estudiante de Ingeniería de Software con conocimientos en desarrollo, gestión y diseño, comprometido con aprender constantemente y enfrentar nuevos desafíos. Busco activamente oportunidades para crecer profesionalmente, potenciar mis habilidades y adquirir nuevas competencias que me permitan diseñar software innovador y de alto rendimiento.",

    resumeTitle: "Curriculum Vitae",
    experienceTab: "Experiencia",
    skillsTab: "Habilidades",
    educationTab: "Educación",

    exp1Role: "Pasante",
    exp1Desc:
      "Actualmente me desarrollo en el entorno de la nube AWS, adquiriendo experiencia práctica en el uso de servicios cloud y buenas prácticas para el despliegue y gestión de aplicaciones.",

    exp2Role: "Programación Competitiva",
    exp2Institution: "Instituto Tecnológico de Santo Domingo",
    exp2Desc:
      "Actualmente estoy practicando programación competitiva, lo que me ha permitido fortalecer mis habilidades de resolución de problemas. Gracias a este proceso, logré clasificarme para las ICPC Caribbean Finals.",

    exp3Role: "Pasante",
    exp3Desc:
      "Me desarrollé en el área de documentación de procesos, elaborando y organizando documentación técnica y funcional, y simultáneamente como programador, participando en la creación, mantenimiento y mejora de software para sistemas IBM i, asegurando el correcto funcionamiento y soporte de las aplicaciones.",

    edu1Title: "Estudiante de Ingeniería de Software",
    edu1Institution: "Instituto Tecnológico de Santo Domingo",
    edu1Desc:
      "Cursando el décimo trimestre en la carrera de Ingeniería de Software con un promedio de 3.85. Actualmente ejerciendo el papel de monitor en la materia \"Modelos y Métodos de la Ingeniería de Software\".",

    edu2Title: "AWS Certified Cloud Practitioner",
    edu2Institution: "Amazon",
    edu2Desc:
      "Preparación y formación en fundamentos de computación en la nube, seguridad, arquitectura y servicios principales de AWS.",

    portfolioTitle: "Portafolio",
    projectsTab: "Proyectos",
    servicesTab: "Servicios",

    project1Title: "Proyecto Digemaps",
    project1Desc:
      "Desarrollé, junto a un equipo de trabajo, una aplicación web para la gestión y validación de muestras de laboratorio. El sistema permite asignar analistas, visualizar de forma detallada los resultados de análisis físico-químicos y microbiológicos, aprobar o devolver muestras según los resultados obtenidos y generar reportes estructurados en formato PDF. El proyecto fue enfocado en garantizar trazabilidad, claridad en la información y una experiencia de uso profesional para los distintos roles del laboratorio.",
    project1Tech: "Next.js, React, APIs REST, Tailwind CSS, JWT, jsPDF, html2canvas",

    service1Title: "Desarrollo de Aplicaciones Web",
    service1Desc:
      "Construcción de plataformas dinámicas, escalables y con un enfoque prioritario en la experiencia del usuario (UX). Utilizo tecnologías modernas para garantizar interfaces rápidas, seguras y adaptables a cualquier dispositivo.",

    service2Title: "Desarrollo de Aplicaciones Móviles",
    service2Desc:
      "Creación de soluciones móviles nativas o multiplataforma con alto rendimiento. Me enfoco en desarrollar aplicaciones intuitivas que aprovechan al máximo las capacidades de los dispositivos para ofrecer una navegación fluida.",

    service3Title: "Implementaciones de Servicios en la Nube (AWS)",
    service3Desc:
      "Despliegue y gestión de infraestructura robusta utilizando la potencia de AWS. Optimizo recursos para asegurar alta disponibilidad, seguridad de datos y escalabilidad automática según las necesidades de tu proyecto.",

    service4Title: "Diseño e Implementación de Bases de Datos Relacionales",
    service4Desc:
      "Arquitectura de datos eficiente y estructurada para garantizar la integridad de la información. Me especializo en el diseño lógico, optimización de consultas y administración de sistemas que soportan aplicaciones de alto tráfico.",

    service5Title: "Modelado y diseño de interfaces de usuario (UI)",
    service5Desc:
      "Transformación de ideas en prototipos interactivos de alta fidelidad. Me especializo en el diseño de layouts, tipografía y paletas de colores que refuerzan la identidad de marca, asegurando una transición fluida entre el diseño y el desarrollo.",

    contactTitle: "Contacto",
    contactSubtitle: "¡Trabajemos juntos!",
    sendMessage: "Enviar mensaje",

    contactName: "Nombre",
    contactEmail: "Correo electrónico",
    contactPhone: "Teléfono",
    contactSubject: "Asunto",
    contactMessage: "Deja tu mensaje"
  },

  en: {
    navHome: "Home",
    navAbout: "About me",
    navResume: "Experience",
    navPortfolio: "Portfolio",
    navContact: "Contact",

    tooltipGithub: "Github",
    tooltipLinkedin: "LinkedIn",
    tooltipProject: "Info",
    tooltipRepo: "Github Repository",

    homeGreeting: "Hi, I am",
    homeRole: "Software Engineering Student",
    homeDesc:
      "I am a Software Engineering student with knowledge in development, management, and design, committed to continuous learning and taking on new challenges. I actively seek opportunities to grow professionally, strengthen my skills, and acquire new competencies that allow me to design innovative and high-performance software.",
    downloadCV: "Download Resume",

    aboutTitle: "About Me",
    aboutRole: "Learn, create, evolve",
    aboutDesc:
      "I am a Software Engineering student with knowledge in development, management, and design, committed to continuous learning and taking on new challenges. I actively seek opportunities to grow professionally, strengthen my skills, and acquire new competencies that allow me to design innovative and high-performance software.",

    resumeTitle: "Resume",
    experienceTab: "Experience",
    skillsTab: "Skills",
    educationTab: "Education",

    exp1Role: "Intern",
    exp1Desc:
      "I am currently developing in the AWS cloud environment, gaining hands-on experience in the use of cloud services and best practices for application deployment and management.",

    exp2Role: "Competitive Programming",
    exp2Institution: "Instituto Tecnológico de Santo Domingo",
    exp2Desc:
      "I am currently practicing competitive programming, which has allowed me to strengthen my problem-solving skills. Thanks to this process, I qualified for the ICPC Caribbean Finals.",

    exp3Role: "Intern",
    exp3Desc:
      "I worked in process documentation, preparing and organizing technical and functional documentation, while also participating as a programmer in the creation, maintenance, and improvement of software for IBM i systems, ensuring the proper functioning and support of the applications.",

    edu1Title: "Software Engineering Student",
    edu1Institution: "Instituto Tecnológico de Santo Domingo",
    edu1Desc:
      "Currently in the tenth trimester of the Software Engineering degree with a GPA of 3.85. I am currently serving as a teaching assistant in the course \"Models and Methods of Software Engineering\".",

    edu2Title: "AWS Certified Cloud Practitioner",
    edu2Institution: "Amazon",
    edu2Desc:
      "Training in cloud computing fundamentals, security, architecture, and AWS core services.",

    portfolioTitle: "Portfolio",
    projectsTab: "Projects",
    servicesTab: "Services",

    project1Title: "Digemaps Project",
    project1Desc:
      "Together with a work team, I developed a web application for the management and validation of laboratory samples. The system allows assigning analysts, viewing detailed physical-chemical and microbiological analysis results, approving or returning samples according to the results obtained, and generating structured PDF reports. The project focused on ensuring traceability, clarity of information, and a professional user experience for the different laboratory roles.",
    project1Tech: "Next.js, React, REST APIs, Tailwind CSS, JWT, jsPDF, html2canvas",

    service1Title: "Web Application Development",
    service1Desc:
      "Development of dynamic, scalable platforms with a strong focus on user experience (UX). I use modern technologies to ensure fast, secure, and responsive interfaces on any device.",

    service2Title: "Mobile Application Development",
    service2Desc:
      "Creation of native or cross-platform mobile solutions with high performance. I focus on developing intuitive applications that make the most of device capabilities to deliver smooth navigation.",

    service3Title: "Cloud Services Implementation (AWS)",
    service3Desc:
      "Deployment and management of robust infrastructure using the power of AWS. I optimize resources to ensure high availability, data security, and automatic scalability according to your project needs.",

    service4Title: "Relational Database Design and Implementation",
    service4Desc:
      "Efficient and structured data architecture to guarantee information integrity. I specialize in logical design, query optimization, and administration of systems that support high-traffic applications.",

    service5Title: "User Interface Modeling and Design (UI)",
    service5Desc:
      "Turning ideas into high-fidelity interactive prototypes. I specialize in layout design, typography, and color palettes that strengthen brand identity, ensuring a smooth transition between design and development.",

    contactTitle: "Contact",
    contactSubtitle: "Let's work together!",
    sendMessage: "Send message",

    contactName: "Name",
    contactEmail: "Email",
    contactPhone: "Phone",
    contactSubject: "Subject",
    contactMessage: "Leave your message"
  }
};

// =========================
// CAMBIAR TEXTO
// =========================
function translatePage(lang) {
  document.documentElement.lang = lang;

  document.querySelectorAll("[data-i18n]").forEach((element) => {
    const key = element.getAttribute("data-i18n");
    if (translations[lang][key]) {
      element.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll("[data-i18n-placeholder]").forEach((element) => {
    const key = element.getAttribute("data-i18n-placeholder");
    if (translations[lang][key]) {
      element.placeholder = translations[lang][key];
    }
  });

  if (cvBtn) {
    if (lang === "en") {
      cvBtn.href = "assets/CV-Manuel-Polo-EN.pdf";
      cvBtn.setAttribute("download", "Manuel-Polo-Resume.pdf");
    } else {
      cvBtn.href = "assets/CV-Manuel-Polo-ES.pdf";
      cvBtn.setAttribute("download", "Manuel-Polo-CV.pdf");
    }
  }

if (translateFlag) {
  if (lang === "en") {
    translateFlag.src = "images/flag-es.png";
  } else {
    translateFlag.src = "images/flag-us.png";
  }
}

  setWrapperHeight(resumeWrapper, ".resume-box.active");
  setWrapperHeight(portfolioWrapper, ".portfolio-box.active");
}

// =========================
// BOTÓN DE TRADUCCIÓN
// =========================
if (translateBtn) {
  translateBtn.addEventListener("click", () => {
    currentLang = currentLang === "es" ? "en" : "es";
    translatePage(currentLang);
  });
}

// =========================
// AJUSTAR ALTURA
// =========================
window.addEventListener("load", () => {
  translatePage(currentLang);
  setWrapperHeight(resumeWrapper, ".resume-box.active");
  setWrapperHeight(portfolioWrapper, ".portfolio-box.active");
});

window.addEventListener("resize", () => {
  setWrapperHeight(resumeWrapper, ".resume-box.active");
  setWrapperHeight(portfolioWrapper, ".portfolio-box.active");
});