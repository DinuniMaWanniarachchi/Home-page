import {
  HomeOutlined,
  ProjectOutlined,
  FileTextOutlined,
  TeamOutlined,
  SettingOutlined,
  CreditCardOutlined
} from '@ant-design/icons'

export const sidebarMenuItems = [
  {
    key: 'home',
    icon: <HomeOutlined />,
    label: 'Home',
  },
  {
    key: 'boards',
    icon: <ProjectOutlined />,
    label: 'Boards',
  },
  {
    key: 'templates',
    icon: <FileTextOutlined />,
    label: 'Templates',
  },
]

export const workspaceMenuItems = [
  {
    key: 'workspace-boards',
    icon: <ProjectOutlined />,
    label: 'Boards',
  },
  {
    key: 'workspace-members',
    icon: <TeamOutlined />,
    label: 'Members',
  },
  {
    key: 'workspace-settings',
    icon: <SettingOutlined />,
    label: 'Settings',
  },
  {
    key: 'workspace-billing',
    icon: <CreditCardOutlined />,
    label: 'Billing',
  },
]

export const languageMenu = {
  items: [
    { key: 'en', label: '🇺🇸 English' },
    { key: 'es', label: '🇪🇸 Spanish' },
    { key: 'fr', label: '🇫🇷 French' },
  ],
}