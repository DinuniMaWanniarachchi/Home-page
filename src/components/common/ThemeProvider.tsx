import React from 'react'
import { ThemeContext } from '../../hooks/useTheme'
import { ThemeContextType } from '../../types'

interface ThemeProviderProps {
  children: React.ReactNode
  value: ThemeContextType
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, value }) => {
  return (
    <ThemeContext.Provider value={value}>
      {children}
      <style jsx global>{`
        .dark-theme .ant-layout {
          background: #000 !important;
        }
        .dark-theme .ant-layout-sider {
          background: #141414 !important;
        }
        .dark-theme .ant-menu {
          background: transparent !important;
        }
        .dark-theme .ant-menu-item {
          color: rgba(255, 255, 255, 0.85) !important;
        }
        .dark-theme .ant-menu-item:hover {
          background-color: rgba(255, 255, 255, 0.1) !important;
        }
        .dark-theme .ant-menu-item-selected {
          background-color: #1890ff !important;
        }
        .dark-theme .ant-drawer-content {
          background: #141414 !important;
        }
        .dark-theme .ant-drawer-header {
          background: #141414 !important;
          border-bottom: 1px solid #303030 !important;
        }
        .dark-theme .ant-input {
          background: #262626 !important;
          border-color: #434343 !important;
          color: #fff !important;
        }
        .dark-theme .ant-input:focus {
          border-color: #1890ff !important;
        }
      `}</style>
    </ThemeContext.Provider>
  )
}