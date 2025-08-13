export interface Board {
  id: string;
  title: string;
  workspace: string;
  description?: string;
}

export interface ProjectFormData {
  name: string;
  description: string;
}

export interface ThemeContextType {
  darkMode: boolean;
  setDarkMode: (darkMode: boolean) => void;
}