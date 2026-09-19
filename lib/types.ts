export type ProfileMode = "empresa" | "talento";

export type Difficulty = "Fácil" | "Médio" | "Difícil";

export type OpportunityStatus = "aberta" | "em_andamento" | "concluida";

export interface Threat {
  id: string;
  label: string;
  descricao: string;
  especialidade: string;
  gravidade: number;
  urgencia: number;
  tendencia: number;
  selecionada: boolean;
}

export interface ReportSubmission {
  falhaEncontrada: string;
  correcaoSugerida: string;
  enviadoEm: string;
}

export interface Opportunity {
  id: string;
  titulo: string;
  empresaNome: string;
  descricao: string;
  dificuldade: Difficulty;
  xpRecompensa: number;
  recompensaReais: number;
  prioridade: number;
  status: OpportunityStatus;
  criadaEm: string;
  talentoConvidado?: string;
  relatorio?: ReportSubmission;
}

export interface Badge {
  id: string;
  nome: string;
  icone: string;
  descricao: string;
}

export interface RecommendedTalent {
  id: string;
  nome: string;
  avatarEmoji: string;
  nivel: number;
  tituloNivel: string;
  especialidades: string[];
  badges: Badge[];
  avaliacao: number;
  tempoRespostaHoras: number;
}

export interface TalentProfile {
  nome: string;
  nivel: number;
  tituloNivel: string;
  xp: number;
  xpParaProximoNivel: number;
  badges: Badge[];
}
