export interface User {
  name: string;
  email: string;
  instagram: string;
  whatsapp: string;
  github: string;
  tagline: string;
  about: string;
  profileImage: string;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  date: string;
  description: string;
  type: string;
  image?: string;
}

export interface Skill {
  id: number;
  name: string;
  category: string;
}

export interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  link: string;
}

export interface PortfolioData {
  user: User;
  experiences: Experience[];
  skills: Skill[];
  projects: Project[];
}
