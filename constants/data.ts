export const profile = {
  name: 'Gerson Ferraz',
  fullName: 'Gerson Gomes Ferraz Neto',
  initials: 'GF',
  title: 'Dev Full Stack & Data Enthusiast',
  subtitle: 'Software · Data Science · Marketing',
  location: 'Recife — PE, Brasil',
  email: 'ferrazgerson0@gmail.com',
  github: 'https://github.com/Gerso7',
  linkedin: 'https://linkedin.com/in/gersonferraz', // update if needed
  bio: 'Graduando em Ciência da Computação na UNICAP, apaixonado por desenvolvimento de software, data science e performance marketing. Construo soluções que unem código limpo, dados e resultados mensuráveis.',
};

export const skills = [
  { name: 'React', icon: '⚛️', color: '#61DAFB', category: 'Frontend' },
  { name: 'Next.js', icon: '▲', color: '#FFFFFF', category: 'Frontend' },
  { name: 'TypeScript', icon: 'TS', color: '#3178C6', category: 'Frontend' },
  { name: 'React Native', icon: '📱', color: '#61DAFB', category: 'Mobile' },
  { name: 'Expo', icon: '⚡', color: '#B4B4FF', category: 'Mobile' },
  { name: 'Python', icon: '🐍', color: '#3776AB', category: 'Backend' },
  { name: 'SQL', icon: '🗄️', color: '#F29111', category: 'Data' },
  { name: 'Power BI', icon: '📊', color: '#F2C811', category: 'Data' },
  { name: 'Looker Studio', icon: '📈', color: '#4285F4', category: 'Data' },
  { name: 'Git', icon: '🌿', color: '#F05032', category: 'Tools' },
];

export const interests = [
  { label: 'Desenvolvimento de Software', icon: '💻', color: '#7C3AED' },
  { label: 'Data Science', icon: '🧬', color: '#00D9FF' },
  { label: 'Performance Marketing', icon: '🚀', color: '#00C896' },
  { label: 'Machine Learning', icon: '🤖', color: '#FFB347' },
  { label: 'Open Source', icon: '🌐', color: '#F05032' },
];

export const academicExperience = [
  {
    id: '1',
    institution: 'UNICAP',
    fullName: 'Universidade Católica de Pernambuco',
    course: 'Ciência da Computação',
    type: 'Bacharelado',
    period: '2023 — 2026',
    status: 'Em andamento',
    description:
      'Graduação com foco em algoritmos, estruturas de dados, desenvolvimento de software, banco de dados e fundamentos de inteligência artificial.',
    highlights: ['Algoritmos & Estruturas de Dados', 'Engenharia de Software', 'Banco de Dados', 'Cálculo & Estatística'],
    icon: '🎓',
    color: '#7C3AED',
  },
  {
    id: '2',
    institution: 'Arkia',
    fullName: 'Arkia — Escola de Marketing',
    course: 'Marketing Science',
    type: 'Especialização',
    period: '2024 — Presente',
    status: 'Em andamento',
    description:
      'Especialização em marketing baseado em dados, analytics de performance, funis de conversão e estratégias de crescimento orientadas a métricas.',
    highlights: ['Meta Ads & Google Ads', 'Analytics de Performance', 'Funis de Conversão', 'Growth Hacking'],
    icon: '📊',
    color: '#00D9FF',
  },
  {
    id: '3',
    institution: 'Data Tech Florida',
    fullName: 'Data Tech Florida',
    course: 'Python & Data Science',
    type: 'Certificação',
    period: '2024 — Presente',
    status: 'Em andamento',
    description:
      'Formação em Python aplicado à ciência de dados, análise exploratória, machine learning e visualização com bibliotecas modernas.',
    highlights: ['Python Avançado', 'Pandas & NumPy', 'Machine Learning', 'Visualização de Dados'],
    icon: '🐍',
    color: '#00C896',
  },
];

export const professionalExperience = [
  {
    id: '1',
    role: 'Desenvolvedor & Analista de Dados',
    company: 'Freelance / Projetos Próprios',
    period: '2023 — Presente',
    type: 'Autônomo',
    description:
      'Desenvolvimento de soluções web e mobile com foco em performance e experiência do usuário, combinado à análise de dados para tomada de decisão.',
    achievements: [
      'Criação de portfólio web com Next.js + Vercel (SEO e performance otimizados)',
      'Desenvolvimento de dashboards interativos no Power BI e Looker Studio',
      'Automação de relatórios e ETL pipelines com Python',
      'Análise de campanhas e otimização de performance marketing',
    ],
    techs: ['React', 'Next.js', 'Python', 'Power BI', 'SQL'],
    color: '#7C3AED',
  },
  // ⬇ Adicione suas experiências profissionais reais aqui
];

export const projects = [
  {
    id: '1',
    name: 'Portfolio Web v1',
    description:
      'Portfólio pessoal desenvolvido com Next.js, com design moderno, responsivo e otimizado para SEO. Apresenta experiências, projetos e habilidades de forma elegante.',
    techs: ['Next.js', 'TypeScript', 'CSS Modules'],
    status: 'Concluído',
    github: 'https://github.com/Gerso7',
    demo: 'https://portfolio-seven-eosin-oplv6a6lgl.vercel.app',
    icon: '🌐',
    color: '#7C3AED',
  },
  {
    id: '2',
    name: 'Portfolio Mobile v2',
    description:
      'App React Native/Expo com design premium dark mode, navegação por tabs, timeline animada, cards de projetos e mini-jogo da memória integrado.',
    techs: ['React Native', 'Expo', 'TypeScript', 'Expo Router'],
    status: 'Este App ✨',
    github: 'https://github.com/Gerso7',
    demo: null,
    icon: '📱',
    color: '#00D9FF',
  },
  // ⬇ Adicione seus outros projetos aqui
];

export const appDependencies = [
  { name: 'expo', version: '~52.0.36', description: 'Framework e plataforma para apps universais' },
  { name: 'expo-router', version: '~4.0.17', description: 'Navegação file-based (como Next.js App Router)' },
  { name: 'react-native', version: '0.76.9', description: 'Framework mobile multiplataforma' },
  { name: 'react', version: '18.3.2', description: 'Biblioteca base para componentes de UI' },
  { name: 'react-native-reanimated', version: '~3.16.7', description: 'Animações fluidas com thread nativa' },
  { name: 'expo-linear-gradient', version: '~14.0.2', description: 'Gradientes nativos de alta performance' },
  { name: 'expo-haptics', version: '~14.0.0', description: 'Feedback tátil (vibração contextual)' },
  { name: 'expo-linking', version: '~7.0.4', description: 'Deep linking e abertura de URLs externas' },
  { name: 'expo-status-bar', version: '~2.0.1', description: 'Controle da barra de status do sistema' },
  { name: '@expo/vector-icons', version: '^14.0.4', description: 'Biblioteca de ícones (Ionicons, etc.)' },
  { name: 'react-native-safe-area-context', version: '4.12.0', description: 'Padding seguro para notch e home bar' },
  { name: 'react-native-screens', version: '~4.1.0', description: 'Otimização de screens com componentes nativos' },
  { name: 'typescript', version: '^5.3.3', description: 'Tipagem estática para JavaScript' },
];
