import React from 'react'
import { Layout, Menu, Button, Space, Badge, Dropdown, Switch, Typography } from 'antd'
import {
  BellOutlined,
  GlobalOutlined,
  PlusOutlined,
  BulbOutlined
} from '@ant-design/icons'
import { sidebarMenuItems, languageMenu } from '../../constants/menuItems'
import { useTheme } from '../../hooks/useTheme'

const { Header: AntHeader } = Layout
const { Title } = Typography

interface HeaderProps {
  onCreateClick: () => void
}

export const Header: React.FC<HeaderProps> = ({ onCreateClick }) => {
  const { darkMode, setDarkMode } = useTheme()

  return (
    <AntHeader
      style={{
        background: darkMode ? '#1f1f1f' : '#fff',
        borderBottom: `1px solid ${darkMode ? '#303030' : '#f0f0f0'}`,
        padding: '0 16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
          Kanban
        </Title>
        <Menu
          mode="horizontal"
          items={sidebarMenuItems.slice(0, 3)}
          style={{
            background: 'transparent',
            border: 'none',
            marginLeft: '32px',
            color: darkMode ? '#fff' : '#000'
          }}
          theme={darkMode ? 'dark' : 'light'}
          defaultSelectedKeys={['home']}
        />
      </div>

      <Space>
        <Switch
          checked={darkMode}
          onChange={setDarkMode}
          checkedChildren={<BulbOutlined />}
          unCheckedChildren={<BulbOutlined />}
        />
        <Dropdown menu={languageMenu}>
          <Button type="text" icon={<GlobalOutlined />}>
            🇺🇸 English
          </Button>
        </Dropdown>
        <Badge dot>
          <Button type="text" icon={<BellOutlined />} />
        </Badge>
        <Button type="primary" icon={<PlusOutlined />} onClick={onCreateClick}>
          Create
        </Button>
      </Space>
    </AntHeader>
  )
}