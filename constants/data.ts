export const profile = {
  name: 'Gerson Ferraz',
  fullName: 'Gerson Gomes Ferraz Neto',
  initials: 'GF',
  title: 'Cientista de Dados & Marketing Science',
  subtitle: 'Data Science · Analytics · Marketing',
  location: 'Recife — PE, Brasil',
  email: 'ferrazgerson0@gmail.com',
  github: 'https://github.com/Gerso7',
  linkedin: 'https://www.linkedin.com/in/gerson-ferraz-40a0a0290/',
  bio: 'Graduando em Ciência da Computação na UNICAP, com foco em Data Science, análise de dados e performance marketing. Transformo dados em decisões estratégicas e resultados mensuráveis.',
};

export const skills = [
  { name: 'Python', icon: '🐍', color: '#3776AB', category: 'Data Science' },
  { name: 'SQL', icon: '🗄️', color: '#F29111', category: 'Data Science' },
  { name: 'Pandas', icon: '🐼', color: '#150458', category: 'Data Science' },
  { name: 'Power BI', icon: '📊', color: '#F2C811', category: 'Analytics' },
  { name: 'Looker Studio', icon: '📈', color: '#4285F4', category: 'Analytics' },
  { name: 'Meta Ads', icon: '🎯', color: '#0082FB', category: 'Marketing' },
  { name: 'Google Ads', icon: '🔍', color: '#34A853', category: 'Marketing' },
  { name: 'Git', icon: '🌿', color: '#F05032', category: 'Tools' },
  { name: 'React Native', icon: '📱', color: '#61DAFB', category: 'Tools' },
];

export const interests = [
  { label: 'Data Science', icon: '🧬', color: '#00D9FF' },
  { label: 'Machine Learning', icon: '🤖', color: '#7C3AED' },
  { label: 'Business Intelligence', icon: '📊', color: '#F2C811' },
  { label: 'Performance Marketing', icon: '🚀', color: '#00C896' },
  { label: 'Análise de Dados', icon: '🔬', color: '#FFB347' },
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
    role: 'Analista de Dados & Marketing Science',
    company: 'Projetos Próprios / Freelance',
    period: '2023 — Presente',
    type: 'Autônomo',
    description:
      'Análise de dados aplicada a performance marketing, construção de dashboards estratégicos e automação de relatórios para apoio à tomada de decisão.',
    achievements: [
      'Construção de dashboards de performance no Power BI e Looker Studio',
      'Automação de relatórios e pipelines ETL com Python',
      'Análise e otimização de campanhas Meta Ads e Google Ads',
      'Modelagem e consultas avançadas em SQL para extração de insights',
    ],
    techs: ['Python', 'SQL', 'Power BI', 'Looker Studio', 'Meta Ads'],
    color: '#00D9FF',
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
  { name: 'expo', version: '^54.0.34', description: 'Framework e plataforma para apps universais' },
  { name: 'expo-router', version: '~6.0.23', description: 'Navegação file-based (como Next.js App Router)' },
  { name: 'react-native', version: '0.81.5', description: 'Framework mobile multiplataforma' },
  { name: 'react', version: '19.1.0', description: 'Biblioteca base para componentes de UI' },
  { name: 'react-native-reanimated', version: '~4.1.1', description: 'Animações fluidas com thread nativa' },
  { name: 'react-native-worklets', version: '0.5.1', description: 'Motor de worklets para animações nativas' },
  { name: 'expo-linear-gradient', version: '~15.0.8', description: 'Gradientes nativos de alta performance' },
  { name: 'expo-haptics', version: '~15.0.8', description: 'Feedback tátil (vibração contextual)' },
  { name: 'expo-linking', version: '~8.0.12', description: 'Deep linking e abertura de URLs externas' },
  { name: 'expo-status-bar', version: '~3.0.9', description: 'Controle da barra de status do sistema' },
  { name: '@expo/vector-icons', version: '^15.0.3', description: 'Biblioteca de ícones (Ionicons, etc.)' },
  { name: 'react-native-safe-area-context', version: '~5.6.0', description: 'Padding seguro para notch e home bar' },
  { name: 'react-native-screens', version: '~4.16.0', description: 'Otimização de screens com componentes nativos' },
  { name: 'typescript', version: '^5.3.3', description: 'Tipagem estática para JavaScript' },
];
