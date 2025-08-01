export enum LogType {
  APPOINTMENT = 'appointment',
  MILESTONE = 'milestone',
  BEHAVIOR = 'behavior',
  NOTE = 'note'
}

export interface LogEntry {
  id: string;
  date: string;
  time?: string;
  type: LogType;
  description: string;
  details?: string;
  source: 'app' | 'google';
  reminder?: '15m' | '1h' | '1d' | 'none';
}

export interface Appointment {
  id: string;
  title: string;
  date: string;
  time: string;
  description?: string;
  reminder?: string;
}

export interface Milestone {
  id: string;
  title: string;
  date: string;
  description: string;
  category: string;
}

export interface Behavior {
  id: string;
  title: string;
  date: string;
  description: string;
  intensity: 'low' | 'medium' | 'high';
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone?: string;
  specialty?: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  file?: string;
}

export interface ChatMessage {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
}

export interface AIChatMessage {
    id: string;
    role: 'user' | 'model';
    text: string;
}

export interface CommunityPost {
    id: string;
    author: string;
    avatar: string;
    timestamp: string;
    content: string;
    comments: number;
    likes: number;
}

export interface VisualStoryStep {
    step_number: number;
    description: string;
    pictogram_idea: string;
}

export interface VisualStory {
    title: string;
    steps: VisualStoryStep[];
}