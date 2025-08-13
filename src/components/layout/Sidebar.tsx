// components/layout/Sidebar.tsx
import React from 'react'
import { Layout, Menu, Card, Space, Avatar, Typography } from 'antd'
import { sidebarMenuItems, workspaceMenuItems } from '../../constants/menuItems'
import { useTheme } from '../../hooks/useTheme'

const { Sider } = Layout
const { Text } = Typography

export const Sidebar: React.FC = () => {
  const { darkMode } = useTheme()

  return (
    <Sider
      width={280}
      style={{
        background: darkMode ? '#141414' : '#fafafa',
        borderRight: `1px solid ${darkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      <div style={{ padding: '16px' }}>
        {/* Main Navigation */}
        <Menu
          mode="vertical"
          items={sidebarMenuItems}
          defaultSelectedKeys={['home']}
          style={{
            background: 'transparent',
            border: 'none',
            marginBottom: '24px'
          }}
          theme={darkMode ? 'dark' : 'light'}
        />

        {/* Workspaces Section */}
        <div style={{ marginBottom: '16px' }}>
          <Text strong style={{ color: darkMode ? '#fff' : '#000', fontSize: '12px' }}>
            Workspaces
          </Text>
        </div>

        <Card
          size="small"
          style={{
            marginBottom: '16px',
            background: darkMode ? '#262626' : '#fff'
          }}
        >
          <Space>
            <Avatar
              size="small"
              style={{ backgroundColor: '#52c41a' }}
            >
              K
            </Avatar>
            <Text strong style={{ color: darkMode ? '#fff' : '#000' }}>
              Kanban Workspace
            </Text>
          </Space>
        </Card>

        <Menu
          mode="vertical"
          items={workspaceMenuItems}
          style={{
            background: 'transparent',
            border: 'none',
            marginLeft: '16px'
          }}
          theme={darkMode ? 'dark' : 'light'}
        />

        {/* User Profile */}
        <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
          <Space>
            <Avatar size="small" style={{ backgroundColor: '#1890ff' }}>
              N
            </Avatar>
            <Text style={{ color: darkMode ? '#fff' : '#000' }}>Profile</Text>
          </Space>
        </div>
      </div>
    </Sider>
  )
}