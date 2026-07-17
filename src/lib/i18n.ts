export type Locale = "en" | "es";

export const locales: Locale[] = ["en", "es"];

export function isLocale(value: string): value is Locale {
  return value === "en" || value === "es";
}

export function switchLocalePath(pathname: string, next: Locale) {
  const clean = pathname.replace(/^\/es(?=\/|$)/, "") || "/";
  if (next === "es") {
    return clean === "/" ? "/es" : `/es${clean}`;
  }
  return clean;
}

export type Dictionary = {
  nav: {
    inventory: string;
    specials: string;
    financing: string;
    tradeIn: string;
    about: string;
    contact: string;
    preApprove: string;
    callNow: string;
  };
  hero: {
    eyebrow: string;
    title: string;
    subtitle: string;
    viewInventory: string;
    getApproved: string;
  };
  trust: {
    family: string;
    familyText: string;
    finance: string;
    financeText: string;
    bhph: string;
    bhphText: string;
    spanish: string;
    spanishText: string;
  };
  services: {
    eyebrow: string;
    title: string;
    items: Array<{ title: string; text: string; href: string; cta: string }>;
  };
  bodyStyles: { eyebrow: string; title: string };
  featured: { eyebrow: string; title: string; viewAll: string };
  financingCta: {
    eyebrow: string;
    title: string;
    text: string;
    apply: string;
    trade: string;
  };
  visit: {
    eyebrow: string;
    title: string;
    hours: string;
    directions: string;
    spanishLine: string;
  };
  reviews: { eyebrow: string; title: string };
  why: { eyebrow: string; title: string };
  quickLead: {
    eyebrow: string;
    title: string;
    name: string;
    phone: string;
    interest: string;
    submit: string;
    options: string[];
    success: string;
  };
  footer: { explore: string; visit: string; tagline: string };
};

const en: Dictionary = {
  nav: {
    inventory: "Inventory",
    specials: "Specials",
    financing: "Financing",
    tradeIn: "Trade-In",
    about: "About",
    contact: "Contact",
    preApprove: "Get Pre-Approved",
    callNow: "Call Now",
  },
  hero: {
    eyebrow: "The Royal Treatment · Denver, CO",
    title: "Get Treated Like a Queen.",
    subtitle:
      "Royal treatment on every deal — quality used cars, easy financing, and bad credit welcome at Queen Auto Sales.",
    viewInventory: "View Inventory",
    getApproved: "Get Pre-Approved",
  },
  trust: {
    family: "Family Owned",
    familyText: "Royally serving Denver since 1999",
    finance: "Royal Financing",
    financeText: "Guaranteed credit approval available",
    bhph: "Buy Here Pay Here",
    bhphText: "When others say no, we crown you yes",
    spanish: "Se Habla Español",
    spanishText: "Bilingual team ready to help",
  },
  services: {
    eyebrow: "The Royal Treatment",
    title: "Everything you need to drive off like royalty",
    items: [
      {
        title: "Quality Used Cars",
        text: "Inspected vehicles, fit for a queen, with transparent pricing.",
        href: "/inventory",
        cta: "Browse inventory",
      },
      {
        title: "Guaranteed Approval",
        text: "Financing options for every credit situation — no exceptions.",
        href: "/financing",
        cta: "Apply now",
      },
      {
        title: "Buy Here Pay Here",
        text: "In-house payments that fit your budget.",
        href: "/financing",
        cta: "Learn more",
      },
      {
        title: "Trade-In Value",
        text: "We want your vehicle — get a royal appraisal.",
        href: "/trade-in",
        cta: "Value my trade",
      },
    ],
  },
  bodyStyles: {
    eyebrow: "Shop by Style",
    title: "Find your throne on wheels",
  },
  featured: {
    eyebrow: "Featured Inventory",
    title: "Cars fit for royalty",
    viewAll: "View all",
  },
  financingCta: {
    eyebrow: "Royal Financing",
    title: "When others say no, we treat you like royalty.",
    text: "Get pre-approved in minutes. Bad credit, no credit, Buy Here Pay Here — everyone gets the royal treatment.",
    apply: "Apply Now",
    trade: "Value Your Trade-In",
  },
  visit: {
    eyebrow: "Visit Us",
    title: "Visit the kingdom on Colfax",
    hours: "Business Hours",
    directions: "Get Directions",
    spanishLine: "Se habla Español",
  },
  reviews: {
    eyebrow: "Reviews",
    title: "Trusted by families in Denver",
  },
  why: {
    eyebrow: "Why Choose Us",
    title: "Royal trust. Real approvals.",
  },
  quickLead: {
    eyebrow: "Start today",
    title: "Claim your royal treatment",
    name: "Full name",
    phone: "Phone",
    interest: "I’m interested in",
    submit: "Request Call Back",
    options: ["Buying a car", "Financing / Pre-approval", "Trade-in", "Test drive"],
    success: "Thanks — we’ll call you shortly.",
  },
  footer: {
    explore: "Explore",
    visit: "Visit Us",
    tagline:
      "Family owned dealership giving Denver drivers the royal treatment — quality cars and easy financing since 1999.",
  },
};

const es: Dictionary = {
  nav: {
    inventory: "Inventario",
    specials: "Ofertas",
    financing: "Financiamiento",
    tradeIn: "Cambio",
    about: "Nosotros",
    contact: "Contacto",
    preApprove: "Pre-Aprobación",
    callNow: "Llamar Ahora",
  },
  hero: {
    eyebrow: "Trato Real · Denver, CO",
    title: "Trato de Reina en Queen.",
    subtitle:
      "Trato real en cada compra — autos usados de calidad, financiamiento fácil y mal crédito bienvenido en Queen Auto Sales.",
    viewInventory: "Ver Inventario",
    getApproved: "Pre-Aprobarme",
  },
  trust: {
    family: "Negocio Familiar",
    familyText: "Sirviendo a Denver como realeza desde 1999",
    finance: "Financiamiento Real",
    financeText: "Aprobación de crédito garantizada",
    bhph: "Compra Aquí Paga Aquí",
    bhphText: "Cuando otros dicen no, aquí eres realeza",
    spanish: "Se Habla Español",
    spanishText: "Equipo bilingüe listo para ayudarte",
  },
  services: {
    eyebrow: "El Trato Real",
    title: "Todo lo que necesitas para salir manejando como realeza",
    items: [
      {
        title: "Autos Usados de Calidad",
        text: "Vehículos inspeccionados, dignos de una reina, con precios claros.",
        href: "/es/inventory",
        cta: "Ver inventario",
      },
      {
        title: "Aprobación Garantizada",
        text: "Opciones de financiamiento para todo crédito — sin excepciones.",
        href: "/es/financing",
        cta: "Aplicar ahora",
      },
      {
        title: "Compra Aquí Paga Aquí",
        text: "Pagos internos que se ajustan a tu presupuesto.",
        href: "/es/financing",
        cta: "Saber más",
      },
      {
        title: "Valor de tu Auto",
        text: "Queremos tu vehículo — cotización digna de la realeza.",
        href: "/es/trade-in",
        cta: "Valorar mi auto",
      },
    ],
  },
  bodyStyles: {
    eyebrow: "Compra por Estilo",
    title: "Encuentra tu trono sobre ruedas",
  },
  featured: {
    eyebrow: "Inventario Destacado",
    title: "Autos dignos de la realeza",
    viewAll: "Ver todos",
  },
  financingCta: {
    eyebrow: "Financiamiento Real",
    title: "Cuando otros dicen no, te tratamos como realeza.",
    text: "Pre-aprobación en minutos. Mal crédito, sin crédito, Compra Aquí Paga Aquí — todos reciben el trato real.",
    apply: "Aplicar Ahora",
    trade: "Valorar mi Cambio",
  },
  visit: {
    eyebrow: "Visítanos",
    title: "Visita el reino en Colfax",
    hours: "Horario",
    directions: "Cómo Llegar",
    spanishLine: "Se habla Español",
  },
  reviews: {
    eyebrow: "Reseñas",
    title: "La confianza de familias en Denver",
  },
  why: {
    eyebrow: "Por Qué Elegirnos",
    title: "Confianza real. Aprobaciones reales.",
  },
  quickLead: {
    eyebrow: "Empieza hoy",
    title: "Reclama tu trato real",
    name: "Nombre completo",
    phone: "Teléfono",
    interest: "Me interesa",
    submit: "Pedir Llamada",
    options: ["Comprar un auto", "Financiamiento", "Cambio / Trade-in", "Prueba de manejo"],
    success: "Gracias — te llamamos pronto.",
  },
  footer: {
    explore: "Explorar",
    visit: "Visítanos",
    tagline:
      "Concesionario familiar dando a los conductores de Denver el trato real — autos de calidad y financiamiento fácil desde 1999.",
  },
};

export function getDictionary(locale: Locale): Dictionary {
  return locale === "es" ? es : en;
}

export function localizedHref(locale: Locale, path: string) {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (locale === "es") {
    if (clean === "/") return "/es";
    if (clean.startsWith("/es")) return clean;
    return `/es${clean}`;
  }
  return clean.replace(/^\/es(?=\/|$)/, "") || "/";
}
