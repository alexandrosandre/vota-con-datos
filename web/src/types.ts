import type { Valor } from './engine/match';

export interface Fuente {
  url: string;
  titulo?: string;
  medio?: string;
  fecha?: string;
}

export interface Partido {
  id: string;
  nombre: string;
  siglas: string;
  ambito: 'estatal' | 'autonómico';
  comunidades?: string[];
  candidato?: string | null;
  web?: string | null;
  en_congreso_xv?: boolean;
  programa: {
    estado: 'publicado' | 'no_publicado';
    url?: string | null;
    fecha?: string | null;
    paginas?: number | null;
    sha256?: string | null;
    comprobado?: string | null;
  };
  /** Compromisos concretos del candidato en precampaña/campaña, con fuentes (no evaluados). */
  promesas?: { texto: string; tipo: 'cita_literal' | 'parafrasis'; area: string; fecha?: string; quien?: string; fuentes: { url: string; medio?: string; fecha?: string }[] }[];
}

/* ---------- Fase 1 ---------- */
export interface Pregunta {
  id: string;
  tema: string;
  texto: string;
  /** Contexto neutral de 1–2 frases para entender la afirmación. */
  contexto?: string;
  /** De qué propuestas reales nace (se muestra al final, no durante, para no sesgar). */
  origen: { partido: string; tipo?: 'programa' | 'campaña'; cita: string; pagina?: string | number | null; url?: string }[];
  contexto_fuente?: string | null;
}

export interface PosicionPartido {
  valor: Valor | null;
  /** De dónde sale la posición: programa oficial 29-N o compromiso público de campaña. */
  fuente?: 'programa' | 'campaña' | null;
  cita?: string | null;
  pagina?: string | number | null;
  url?: string | null;
  medio?: string | null;
  fecha?: string | null;
  /** Líder que lo dijo en primera persona (o el partido, si es un documento oficial). */
  quien?: string | null;
  formato?: string | null;
  /** Para declaraciones de precampaña: por qué se refieren a estas elecciones. */
  marco?: string | null;
  nota?: string | null;
}

export interface DatosFase1 {
  meta: { actualizado: string; nota?: string; provisional?: boolean };
  preguntas: Pregunta[];
  /** partido -> pregunta -> posición */
  posiciones: Record<string, Record<string, PosicionPartido>>;
}

/* ---------- Fase 2 ---------- */
export interface CandidaturaCirc {
  /** Id de contendiente dentro de la circunscripción (siglas normalizadas). */
  id: string;
  siglas: string;
  denominacion: string;
  partido: string | null; // id de partido de la fase 1, si aplica
  /** Otros partidos de la fase 1 integrados en esta candidatura (coaliciones, federaciones). */
  afines?: string[];
  cabeza_lista?: string | null;
  /** Titulares de la lista en los puestos relevantes (BOE), con afiliación y enlace si constan en fuente fiable. */
  titulares?: { orden: number; nombre: string; afiliacion?: string | null; enlace?: string | null; fuente_afiliacion?: string | null }[];
  /** Composición de la papeleta si es coalición, federación o marca (fuente oficial). */
  coalicion?: { tipo: string; miembros: { nombre: string; siglas?: string | null }[]; fuente?: { url?: string; documento?: string } | null; nota?: string | null } | null;
}

export interface Circunscripcion {
  ine: string;
  nombre: string;
  comunidad: string;
  escanos: number;
  validos_ref: number;
  boe_id: string;
  boe_url: string;
  candidaturas: CandidaturaCirc[];
}

export interface Escenario {
  id: string;
  nombre: string;
  descripcion: string;
  fecha?: string;
  fuentes: Fuente[];
  k: number;
  /** ine -> candidatura id -> cuota sobre válidos. "_blanco" y "_otros" reservados. */
  cuotas: Record<string, Record<string, number>>;
  /** Candidaturas sin base en este escenario (por ine). */
  sin_base?: Record<string, string[]>;
}

export interface DatosFase2 {
  meta: { actualizado: string; boe: Fuente[]; resultados: Fuente[]; nota?: string; veda_encuestas?: { activa: boolean; inicio: string; fin: string } };
  circunscripciones: Circunscripcion[];
  escenarios: Escenario[];
  /** Votos por diputado a nivel nacional en 2023 por partido (id fase 1). */
  coste_nacional_2023?: Record<string, { votos: number; escanos: number }>;
}

/* ---------- Fase 3 ---------- */
export type Valoracion = 'favorable' | 'mixta' | 'desfavorable' | 'no_verificable';

export interface Criterio {
  id: string;
  nombre: string;
  pregunta: string;
}

export interface EvalCriterio {
  valoracion: Valoracion;
  texto: string;
  fuentes: Fuente[];
}

export interface Propuesta {
  id: string;
  titulo: string;
  area: string;
  resumen: string;
  cita: string;
  /** Traducción al castellano si la cita está en otra lengua cooficial. */
  cita_traduccion?: string | null;
  pagina?: string | number | null;
  beneficiarios?: string;
  evaluacion: Record<string, EvalCriterio>;
}

export interface DatosFase3 {
  meta: { actualizado: string; modelo: string; nota?: string };
  criterios: Criterio[];
  partidos: Record<string, { estado: 'evaluado' | 'pendiente'; motivo?: string; revision?: number; propuestas: Propuesta[] }>;
}
