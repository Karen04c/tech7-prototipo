import { tituloParaNivel } from "./leveling";
import type { Badge, Opportunity, RecommendedTalent, TalentProfile, Threat } from "./types";

export const AMEACAS_INICIAIS: Threat[] = [
  {
    id: "whatsapp-leak",
    label: "Vazamento de dados via WhatsApp",
    descricao: "Compartilhamento de dados de clientes em grupos sem controle.",
    especialidade: "Proteção de Dados",
    gravidade: 4,
    urgencia: 3,
    tendencia: 3,
    selecionada: false,
  },
  {
    id: "senhas-fracas",
    label: "Senhas fracas ou reutilizadas",
    descricao: "Colaboradores usam a mesma senha em múltiplos sistemas.",
    especialidade: "Senhas & Autenticação",
    gravidade: 4,
    urgencia: 4,
    tendencia: 4,
    selecionada: false,
  },
  {
    id: "wifi-desprotegido",
    label: "Wi-Fi desprotegido",
    descricao: "Rede da loja sem senha forte ou segmentação para clientes.",
    especialidade: "Redes & Wi-Fi",
    gravidade: 3,
    urgencia: 3,
    tendencia: 2,
    selecionada: false,
  },
  {
    id: "backup-ausente",
    label: "Ausência de backup",
    descricao: "Nenhuma rotina de backup dos dados financeiros e de clientes.",
    especialidade: "Backup & Recuperação",
    gravidade: 5,
    urgencia: 2,
    tendencia: 3,
    selecionada: false,
  },
  {
    id: "phishing",
    label: "Suscetibilidade a phishing",
    descricao: "Equipe nunca recebeu treinamento sobre e-mails maliciosos.",
    especialidade: "Treinamento & Phishing",
    gravidade: 3,
    urgencia: 3,
    tendencia: 4,
    selecionada: false,
  },
  {
    id: "software-desatualizado",
    label: "Softwares e antivírus desatualizados",
    descricao: "Sistemas operacionais e antivírus sem atualização há meses.",
    especialidade: "Atualizações & Antivírus",
    gravidade: 3,
    urgencia: 2,
    tendencia: 3,
    selecionada: false,
  },
];

export const TALENTO_INICIAL: TalentProfile = {
  nome: "Karen Silva",
  nivel: 3,
  tituloNivel: "Analista Júnior",
  xp: 1250,
  xpParaProximoNivel: 2000,
  badges: [
    {
      id: "higiene-cibernetica",
      nome: "Especialista em Higiene Cibernética",
      icone: "🛡️",
      descricao: "Concluiu 5 diagnósticos de boas práticas básicas.",
    },
    {
      id: "top-hackathon",
      nome: "Top Contribuidor Hackathon",
      icone: "🏆",
      descricao: "Top 3 no Hackathon Tech7 de Segurança 2025.",
    },
    {
      id: "cacador-vulnerabilidades",
      nome: "Caçador de Vulnerabilidades",
      icone: "🎯",
      descricao: "Reportou 10 vulnerabilidades válidas.",
    },
  ],
};

export const BADGE_POOL: Badge[] = [
  {
    id: "resposta-rapida",
    nome: "Resposta Rápida",
    icone: "⚡",
    descricao: "Resolveu um chamado crítico em menos de 24h.",
  },
  {
    id: "mentor-comunidade",
    nome: "Mentor da Comunidade",
    icone: "🌱",
    descricao: "Ajudou outro talento a concluir seu primeiro desafio.",
  },
];

function badge(id: string): Badge {
  const encontrada = [...BADGE_POOL, ...TALENTO_INICIAL.badges].find((b) => b.id === id);
  if (!encontrada) throw new Error(`Badge não encontrada: ${id}`);
  return encontrada;
}

export const TALENTOS_RECOMENDADOS: RecommendedTalent[] = [
  {
    id: "talento-01",
    nome: "Lucas Almeida",
    avatarEmoji: "🧑‍💻",
    nivel: 5,
    tituloNivel: tituloParaNivel(5),
    especialidades: ["Senhas & Autenticação", "Proteção de Dados"],
    badges: [badge("higiene-cibernetica"), badge("resposta-rapida")],
    avaliacao: 4.9,
    tempoRespostaHoras: 2,
  },
  {
    id: "talento-02",
    nome: "Marina Costa",
    avatarEmoji: "👩‍💻",
    nivel: 4,
    tituloNivel: tituloParaNivel(4),
    especialidades: ["Redes & Wi-Fi", "Atualizações & Antivírus"],
    badges: [badge("cacador-vulnerabilidades")],
    avaliacao: 4.7,
    tempoRespostaHoras: 3,
  },
  {
    id: "talento-03",
    nome: "Pedro Henrique",
    avatarEmoji: "🧑‍🔧",
    nivel: 6,
    tituloNivel: tituloParaNivel(6),
    especialidades: ["Backup & Recuperação", "Atualizações & Antivírus"],
    badges: [badge("top-hackathon"), badge("mentor-comunidade")],
    avaliacao: 5.0,
    tempoRespostaHoras: 1,
  },
  {
    id: "talento-04",
    nome: "Beatriz Souza",
    avatarEmoji: "👩‍🎓",
    nivel: 3,
    tituloNivel: tituloParaNivel(3),
    especialidades: ["Treinamento & Phishing", "Proteção de Dados"],
    badges: [badge("higiene-cibernetica")],
    avaliacao: 4.6,
    tempoRespostaHoras: 4,
  },
  {
    id: "talento-05",
    nome: "Gabriel Santos",
    avatarEmoji: "🧑‍🚀",
    nivel: 4,
    tituloNivel: tituloParaNivel(4),
    especialidades: ["Redes & Wi-Fi", "Senhas & Autenticação"],
    badges: [badge("resposta-rapida")],
    avaliacao: 4.8,
    tempoRespostaHoras: 2,
  },
  {
    id: "talento-06",
    nome: "Juliana Ferreira",
    avatarEmoji: "👩‍🔬",
    nivel: 5,
    tituloNivel: tituloParaNivel(5),
    especialidades: ["Proteção de Dados", "Treinamento & Phishing"],
    badges: [badge("cacador-vulnerabilidades"), badge("mentor-comunidade")],
    avaliacao: 4.9,
    tempoRespostaHoras: 3,
  },
];

export const OPORTUNIDADES_INICIAIS: Opportunity[] = [
  {
    id: "op-1",
    titulo: "Revisão de política de senhas",
    empresaNome: "Padaria Pão Dourado",
    descricao:
      "Precisamos de ajuda para definir regras de senha forte e configurar autenticação em dois fatores no e-mail da empresa.",
    dificuldade: "Fácil",
    xpRecompensa: 150,
    recompensaReais: 50,
    prioridade: 64,
    status: "aberta",
    criadaEm: "2026-09-10",
  },
  {
    id: "op-2",
    titulo: "Auditoria de rede Wi-Fi",
    empresaNome: "Salão Beleza Nova",
    descricao:
      "A rede Wi-Fi da loja é compartilhada com clientes e colaboradores. Precisamos separar as redes e aplicar criptografia adequada.",
    dificuldade: "Médio",
    xpRecompensa: 300,
    recompensaReais: 100,
    prioridade: 54,
    status: "aberta",
    criadaEm: "2026-09-12",
  },
  {
    id: "op-3",
    titulo: "Plano de backup e recuperação",
    empresaNome: "Mercadinho Boa Vista",
    descricao:
      "A empresa nunca fez backup dos dados financeiros. Queremos um plano simples de backup automático e teste de restauração.",
    dificuldade: "Difícil",
    xpRecompensa: 450,
    recompensaReais: 180,
    prioridade: 90,
    status: "aberta",
    criadaEm: "2026-09-14",
  },
  {
    id: "op-4",
    titulo: "Treinamento anti-phishing",
    empresaNome: "Clínica Vida Plena",
    descricao:
      "Equipe recebe muitos e-mails suspeitos. Precisamos de um material simples de treinamento e simulação de phishing.",
    dificuldade: "Médio",
    xpRecompensa: 280,
    recompensaReais: 100,
    prioridade: 36,
    status: "aberta",
    criadaEm: "2026-09-15",
  },
];
