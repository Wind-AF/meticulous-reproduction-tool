export interface QuizOption {
  emoji: string;
  label: string;
}

export interface QuizQuestion {
  question: string;
  options: QuizOption[];
}

export const quizQuestions: QuizQuestion[] = [
  {
    question: "¿Cómo valoras tu experiencia general en TikTok?",
    options: [
      { emoji: "😍", label: "Excelente" },
      { emoji: "😊", label: "Buena" },
      { emoji: "😐", label: "Regular" },
      { emoji: "😒", label: "Mala" },
    ],
  },
  {
    question: "¿Cuál es tu formato de vídeo favorito en TikTok?",
    options: [
      { emoji: "🎬", label: "Vídeo corto" },
      { emoji: "📹", label: "Vídeo medio" },
      { emoji: "🎞️", label: "Vídeo largo" },
      { emoji: "📺", label: "Directo" },
    ],
  },
  {
    question: "¿Cómo descubres nuevos vídeos en TikTok?",
    options: [
      { emoji: "🎯", label: "Feed \"Para ti\"" },
      { emoji: "👤", label: "Siguiendo a creadores" },
      { emoji: "🔍", label: "A través de hashtags" },
      { emoji: "📋", label: "Feed \"Siguiendo\"" },
      { emoji: "💡", label: "Recomendaciones" },
    ],
  },
  {
    question: "¿Cuántas horas al día pasas en TikTok?",
    options: [
      { emoji: "⏳", label: "Menos de 1 hora" },
      { emoji: "⏳", label: "1 a 2 horas" },
      { emoji: "⏳", label: "2 a 4 horas" },
      { emoji: "⏳", label: "4 a 6 horas" },
      { emoji: "⏳", label: "Más de 6 horas" },
    ],
  },
  {
    question: "¿Qué te hace seguir a un creador en TikTok?",
    options: [
      { emoji: "🎉", label: "Contenido divertido" },
      { emoji: "📚", label: "Contenido educativo" },
      { emoji: "🤝", label: "Conexión personal" },
      { emoji: "🔥", label: "Participación en retos" },
      { emoji: "📅", label: "Frecuencia de publicaciones" },
    ],
  },
  {
    question: "¿Cuál de estos temas de contenido te gusta más ver en TikTok?",
    options: [
      { emoji: "😂", label: "Comedia" },
      { emoji: "💃", label: "Baile" },
      { emoji: "ℹ️", label: "Tutoriales y consejos" },
      { emoji: "🎥", label: "Vlogs diarios" },
      { emoji: "💄", label: "Moda y belleza" },
    ],
  },
  {
    question: "¿En qué momento del día usas más TikTok?",
    options: [
      { emoji: "🌅", label: "Mañana" },
      { emoji: "🌞", label: "Tarde" },
      { emoji: "🌙", label: "Noche" },
      { emoji: "🌜", label: "Madrugada" },
    ],
  },
  {
    question: "¿Qué sección de TikTok visitas más?",
    options: [
      { emoji: "🎯", label: "Para ti" },
      { emoji: "👥", label: "Siguiendo" },
      { emoji: "📺", label: "TikTok Live" },
      { emoji: "🔍", label: "Explorar" },
      { emoji: "➕", label: "Otro" },
    ],
  },
  {
    question: "¿Con qué frecuencia comentas en vídeos de TikTok?",
    options: [
      { emoji: "🔄", label: "Siempre" },
      { emoji: "📅", label: "Frecuentemente" },
      { emoji: "⏳", label: "A veces" },
      { emoji: "❄️", label: "Raramente" },
      { emoji: "🚫", label: "Nunca" },
    ],
  },
  {
    question: "¿Qué tipo de interacción haces más en los vídeos de TikTok?",
    options: [
      { emoji: "👍", label: "Dar me gusta" },
      { emoji: "💬", label: "Comentar" },
      { emoji: "🔄", label: "Compartir" },
      { emoji: "📌", label: "Guardar" },
      { emoji: "🚫", label: "Ninguna" },
    ],
  },
  {
    question: "¿Cuál es tu rango de edad?",
    options: [
      { emoji: "👧", label: "13-17 años" },
      { emoji: "🧑", label: "18-24 años" },
      { emoji: "👩", label: "25-34 años" },
      { emoji: "🧓", label: "35 años o más" },
    ],
  },
];

export const MAX_BALANCE = 850;

// Generate a reward ensuring the running balance never exceeds MAX_BALANCE (€850)
export function generateReward(currentBalance: number = 0, questionsRemaining: number = 1): number {
  const remaining = MAX_BALANCE - currentBalance;
  if (remaining <= 0) return 0;

  // Average needed per remaining question to reach close to the cap
  const avgNeeded = remaining / questionsRemaining;
  // Random reward around the average, but capped at the remaining amount
  const min = Math.max(10, avgNeeded * 0.6);
  const max = Math.min(remaining, avgNeeded * 1.4);
  const reward = Math.random() * (max - min) + min;
  return parseFloat(Math.min(reward, remaining).toFixed(2));
}
