// Calculadora de métricas de saúde
export interface UserData {
  nome: string;
  idade: number;
  genero: 'masculino' | 'feminino';
  peso: number;
  altura: number;
  nivelAtividade: 'sedentario' | 'leve' | 'moderado' | 'intenso' | 'muitoIntenso';
  objetivo: 'perderPeso' | 'ganharMassa' | 'manter' | 'definir';
  restricoes: string;
  horasDisponiveisExercicio: number;
  experienciaExercicio: 'iniciante' | 'intermediario' | 'avancado';
}

export interface HealthMetrics {
  imc: number;
  classificacaoIMC: string;
  pesoIdeal: { min: number; max: number };
  tmb: number;
  calorias: {
    manutencao: number;
    perderPeso: number;
    ganharMassa: number;
  };
  agua: number;
  proteina: number;
  passosDiarios: number;
  batimentosRepouso: { min: number; max: number };
}

export interface ExercisePlan {
  diasSemana: number;
  duracaoSessao: number;
  tipoTreino: string[];
  intensidade: string;
  exercicios: Exercise[];
}

export interface Exercise {
  nome: string;
  tipo: 'cardio' | 'forca' | 'flexibilidade';
  duracao: number;
  series?: number;
  repeticoes?: string;
  calorias: number;
  descricao: string;
}

// Cálculo do IMC
export function calcularIMC(peso: number, altura: number): number {
  return peso / (altura * altura);
}

// Classificação do IMC
export function classificarIMC(imc: number): string {
  if (imc < 18.5) return 'Abaixo do peso';
  if (imc < 25) return 'Peso normal';
  if (imc < 30) return 'Sobrepeso';
  if (imc < 35) return 'Obesidade grau I';
  if (imc < 40) return 'Obesidade grau II';
  return 'Obesidade grau III';
}

// Cálculo do peso ideal
export function calcularPesoIdeal(altura: number): { min: number; max: number } {
  const min = 18.5 * altura * altura;
  const max = 24.9 * altura * altura;
  return { min: Math.round(min * 10) / 10, max: Math.round(max * 10) / 10 };
}

// Cálculo da Taxa Metabólica Basal (TMB)
export function calcularTMB(peso: number, altura: number, idade: number, genero: 'masculino' | 'feminino'): number {
  const alturaCm = altura * 100;
  if (genero === 'masculino') {
    return 88.362 + (13.397 * peso) + (4.799 * alturaCm) - (5.677 * idade);
  } else {
    return 447.593 + (9.247 * peso) + (3.098 * alturaCm) - (4.330 * idade);
  }
}

// Cálculo de calorias diárias
export function calcularCalorias(tmb: number, nivelAtividade: string) {
  const multiplicadores = {
    sedentario: 1.2,
    leve: 1.375,
    moderado: 1.55,
    intenso: 1.725,
    muitoIntenso: 1.9
  };
  
  const manutencao = Math.round(tmb * (multiplicadores[nivelAtividade as keyof typeof multiplicadores] || 1.2));
  
  return {
    manutencao,
    perderPeso: Math.round(manutencao - 500),
    ganharMassa: Math.round(manutencao + 300)
  };
}

// Cálculo de água diária (ml)
export function calcularAgua(peso: number): number {
  return Math.round(peso * 35);
}

// Cálculo de proteína diária (g)
export function calcularProteina(peso: number, objetivo: string): number {
  const multiplicadores = {
    perderPeso: 2.0,
    ganharMassa: 2.2,
    manter: 1.6,
    definir: 2.0
  };
  
  return Math.round(peso * (multiplicadores[objetivo as keyof typeof multiplicadores] || 1.6));
}

// Cálculo de passos diários
export function calcularPassos(objetivo: string, nivelAtividade: string): number {
  const base = {
    perderPeso: 12000,
    ganharMassa: 8000,
    manter: 10000,
    definir: 10000
  };
  
  return base[objetivo as keyof typeof base] || 10000;
}

// Batimentos cardíacos em repouso ideais
export function calcularBatimentosRepouso(idade: number): { min: number; max: number } {
  return { min: 60, max: 100 };
}

// Gerar métricas completas
export function gerarMetricas(userData: UserData): HealthMetrics {
  const imc = calcularIMC(userData.peso, userData.altura);
  const classificacaoIMC = classificarIMC(imc);
  const pesoIdeal = calcularPesoIdeal(userData.altura);
  const tmb = calcularTMB(userData.peso, userData.altura, userData.idade, userData.genero);
  const calorias = calcularCalorias(tmb, userData.nivelAtividade);
  const agua = calcularAgua(userData.peso);
  const proteina = calcularProteina(userData.peso, userData.objetivo);
  const passosDiarios = calcularPassos(userData.objetivo, userData.nivelAtividade);
  const batimentosRepouso = calcularBatimentosRepouso(userData.idade);
  
  return {
    imc,
    classificacaoIMC,
    pesoIdeal,
    tmb,
    calorias,
    agua,
    proteina,
    passosDiarios,
    batimentosRepouso
  };
}

// Gerar plano de exercícios personalizado
export function gerarPlanoExercicios(userData: UserData): ExercisePlan {
  const exerciciosPorNivel = {
    iniciante: [
      { nome: 'Caminhada Rápida', tipo: 'cardio' as const, duracao: 30, calorias: 150, descricao: 'Caminhe em ritmo acelerado, mantendo postura ereta' },
      { nome: 'Agachamento Livre', tipo: 'forca' as const, duracao: 10, series: 3, repeticoes: '12-15', calorias: 50, descricao: 'Pés na largura dos ombros, desça até 90 graus' },
      { nome: 'Flexão de Joelhos', tipo: 'forca' as const, duracao: 10, series: 3, repeticoes: '8-12', calorias: 40, descricao: 'Flexão com joelhos apoiados no chão' },
      { nome: 'Prancha', tipo: 'forca' as const, duracao: 5, series: 3, repeticoes: '20-30s', calorias: 30, descricao: 'Mantenha corpo reto, abdômen contraído' },
      { nome: 'Alongamento Completo', tipo: 'flexibilidade' as const, duracao: 10, calorias: 20, descricao: 'Alongue todos os grupos musculares principais' }
    ],
    intermediario: [
      { nome: 'Corrida Intervalada', tipo: 'cardio' as const, duracao: 30, calorias: 300, descricao: '2 min corrida + 1 min caminhada, repetir' },
      { nome: 'Agachamento com Salto', tipo: 'forca' as const, duracao: 15, series: 4, repeticoes: '10-12', calorias: 80, descricao: 'Agachamento explosivo com salto' },
      { nome: 'Flexão Tradicional', tipo: 'forca' as const, duracao: 10, series: 4, repeticoes: '12-15', calorias: 60, descricao: 'Flexão completa, corpo alinhado' },
      { nome: 'Burpee', tipo: 'cardio' as const, duracao: 10, series: 3, repeticoes: '8-10', calorias: 100, descricao: 'Exercício completo de corpo inteiro' },
      { nome: 'Prancha Lateral', tipo: 'forca' as const, duracao: 8, series: 3, repeticoes: '30-45s', calorias: 40, descricao: 'Prancha de lado, alternando lados' },
      { nome: 'Yoga Flow', tipo: 'flexibilidade' as const, duracao: 15, calorias: 50, descricao: 'Sequência de posturas de yoga' }
    ],
    avancado: [
      { nome: 'HIIT Completo', tipo: 'cardio' as const, duracao: 25, calorias: 400, descricao: '40s intenso + 20s descanso, 8 exercícios' },
      { nome: 'Agachamento Pistol', tipo: 'forca' as const, duracao: 15, series: 4, repeticoes: '6-8', calorias: 100, descricao: 'Agachamento em uma perna só' },
      { nome: 'Flexão Diamante', tipo: 'forca' as const, duracao: 10, series: 4, repeticoes: '10-15', calorias: 80, descricao: 'Mãos juntas formando diamante' },
      { nome: 'Burpee com Flexão', tipo: 'cardio' as const, duracao: 12, series: 4, repeticoes: '10-12', calorias: 150, descricao: 'Burpee completo com flexão' },
      { nome: 'Prancha com Movimento', tipo: 'forca' as const, duracao: 10, series: 4, repeticoes: '45-60s', calorias: 60, descricao: 'Prancha alternando braços e pernas' },
      { nome: 'Mountain Climbers', tipo: 'cardio' as const, duracao: 10, series: 4, repeticoes: '30-40', calorias: 120, descricao: 'Escalador em alta velocidade' },
      { nome: 'Mobilidade Avançada', tipo: 'flexibilidade' as const, duracao: 15, calorias: 60, descricao: 'Exercícios de mobilidade articular' }
    ]
  };
  
  const exercicios = exerciciosPorNivel[userData.experienciaExercicio];
  
  const diasPorObjetivo = {
    perderPeso: 5,
    ganharMassa: 4,
    manter: 3,
    definir: 5
  };
  
  const duracaoPorNivel = {
    iniciante: 45,
    intermediario: 60,
    avancado: 75
  };
  
  const tiposTreino = {
    perderPeso: ['Cardio intenso', 'HIIT', 'Circuito funcional'],
    ganharMassa: ['Treino de força', 'Hipertrofia', 'Resistência'],
    manter: ['Treino misto', 'Funcional', 'Cardio moderado'],
    definir: ['HIIT', 'Treino metabólico', 'Circuito']
  };
  
  return {
    diasSemana: diasPorObjetivo[userData.objetivo],
    duracaoSessao: Math.min(duracaoPorNivel[userData.experienciaExercicio], userData.horasDisponiveisExercicio * 60),
    tipoTreino: tiposTreino[userData.objetivo],
    intensidade: userData.experienciaExercicio === 'iniciante' ? 'Moderada' : userData.experienciaExercicio === 'intermediario' ? 'Alta' : 'Muito Alta',
    exercicios
  };
}

// Gerar recomendações personalizadas
export function gerarRecomendacoes(userData: UserData, metrics: HealthMetrics): string[] {
  const recomendacoes: string[] = [];
  
  // Recomendações baseadas no IMC
  if (metrics.imc < 18.5) {
    recomendacoes.push('Aumente a ingestão calórica com alimentos nutritivos e densos em energia');
    recomendacoes.push('Foque em treinos de força para ganhar massa muscular');
  } else if (metrics.imc > 25) {
    recomendacoes.push('Crie um déficit calórico moderado de 300-500 calorias por dia');
    recomendacoes.push('Combine exercícios aeróbicos com treino de força');
  }
  
  // Recomendações baseadas no objetivo
  if (userData.objetivo === 'perderPeso') {
    recomendacoes.push('Priorize proteínas magras e vegetais em todas as refeições');
    recomendacoes.push('Faça pelo menos 150 minutos de cardio moderado por semana');
    recomendacoes.push('Durma 7-9 horas por noite para otimizar a perda de gordura');
  } else if (userData.objetivo === 'ganharMassa') {
    recomendacoes.push('Consuma proteína a cada 3-4 horas para síntese muscular');
    recomendacoes.push('Foque em exercícios compostos com cargas progressivas');
    recomendacoes.push('Mantenha superávit calórico controlado de 200-300 calorias');
  }
  
  // Recomendações gerais
  recomendacoes.push(`Beba pelo menos ${(metrics.agua / 1000).toFixed(1)}L de água por dia`);
  recomendacoes.push(`Atinja ${metrics.passosDiarios.toLocaleString()} passos diários`);
  recomendacoes.push('Faça refeições balanceadas a cada 3-4 horas');
  recomendacoes.push('Evite alimentos ultraprocessados e açúcares refinados');
  
  return recomendacoes;
}
