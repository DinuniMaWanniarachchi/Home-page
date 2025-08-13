// pages/HomePage.tsx
'use client'

import React, { useState } from 'react'
import { Inter } from 'next/font/google'
import { Layout, Typography, Space, Button, Row, Col, Form, message } from 'antd'
import { ClockCircleOutlined, StarOutlined, LinkOutlined, PlusOutlined } from '@ant-design/icons'

// Components
import { Header } from '../components/layout/Header'
import { Sidebar } from '../components/layout/Sidebar'
import { BoardCard } from '../components/ui/BoardCard'
import { OrganizeCard } from '../components/ui/OrganizeCard'
import { CreateProjectDrawer } from '../components/ui/CreateProjectDrawer'
import { ThemeProvider } from '../components/common/ThemeProvider'

// Hooks and Types
import { useThemeState } from '../hooks/useTheme'
import { Board, ProjectFormData } from '../types'

// Configure Inter font
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700']
})

const { Content } = Layout
const { Title } = Typography

export default function EnhancedKanbanHomePage() {
  // Theme state
  const themeState = useThemeState()
  const { darkMode } = themeState

  // Component state
  const [boardTitle, setBoardTitle] = useState('')
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [boards, setBoards] = useState<Board[]>([
    { id: '1', title: 'My Kanban board', workspace: 'Kanban Workspace' }
  ])
  const [form] = Form.useForm()

  // Event handlers
  const handleCreateBoard = () => {
    if (boardTitle.trim()) {
      const newBoard: Board = {
        id: Date.now().toString(),
        title: boardTitle.trim(),
        workspace: 'Kanban Workspace'
      }

      setBoards(prev => [...prev, newBoard])
      setBoardTitle('')
      message.success('Board created successfully!')

      // Simulate navigation
      console.log(`Navigate to: /boards/${newBoard.id}`)
    }
  }

  const handleCreateProject = async (values: ProjectFormData) => {
    try {
      const newBoard: Board = {
        id: Date.now().toString(),
        title: values.name,
        workspace: 'Kanban Workspace',
        description: values.description
      }

      setBoards(prev => [...prev, newBoard])
      setIsDrawerOpen(false)
      form.resetFields()
      message.success('Project created successfully!')

      console.log('Project created:', newBoard)
    } catch (error) {
      console.error('Error creating project:', error)
      message.error('Failed to create project')
    }
  }

  const navigateToBoard = (boardId: string) => {
    console.log(`Navigate to: /boards/${boardId}`)
    message.info(`Opening board: ${boardId}`)
  }

  const showDrawer = () => {
    setIsDrawerOpen(true)
  }

  const onCloseDrawer = () => {
    setIsDrawerOpen(false)
    form.resetFields()
  }

  const dismissOrganizeCard = () => {
    message.info('Card dismissed!')
  }

  return (
    <div className={inter.className}>
      <ThemeProvider value={themeState}>
        <Layout style={{ minHeight: '100vh' }} className={darkMode ? 'dark-theme' : ''}>
          {/* Header */}
          <Header onCreateClick={showDrawer} />

          <Layout>
            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <Content style={{ padding: '24px', background: darkMode ? '#000' : '#f5f5f5' }}>
              <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                {/* Your Items Section */}
                <div style={{ marginBottom: '32px' }}>
                  <Space align="center" style={{ marginBottom: '16px' }}>
                    <ClockCircleOutlined style={{ color: darkMode ? '#fff' : '#000' }} />
                    <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
                      Your Items
                    </Title>
                  </Space>
                </div>

                {/* Organize Card */}
                <OrganizeCard
                  boardTitle={boardTitle}
                  onBoardTitleChange={setBoardTitle}
                  onCreateBoard={handleCreateBoard}
                  onDismiss={dismissOrganizeCard}
                />

                {/* Recently Viewed & Create Board Section */}
                <Row gutter={[24, 24]}>
                  <Col xs={24} lg={18}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                      <Space align="center">
                        <StarOutlined style={{ color: darkMode ? '#fff' : '#000' }} />
                        <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
                          Recently viewed
                        </Title>
                      </Space>
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={showDrawer}
                        style={{ color: darkMode ? '#fff' : '#000' }}
                      >
                        Create a board
                      </Button>
                    </div>

                    <Row gutter={[16, 16]}>
                      {boards.map((board) => (
                        <Col xs={24} sm={12} lg={8} key={board.id}>
                          <BoardCard
                            board={board}
                            onClick={navigateToBoard}
                          />
                        </Col>
                      ))}
                    </Row>
                  </Col>
                </Row>

                {/* Links Section */}
                <div style={{ marginTop: '48px' }}>
                  <Space align="center" style={{ marginBottom: '16px' }}>
                    <LinkOutlined style={{ color: darkMode ? '#fff' : '#000' }} />
                    {/* <Title level={4} style={{ margin: 0, color: darkMode ? '#fff' : '#000' }}>
                      Links
                    </Title> */}
                  </Space>
                </div>
              </div>
            </Content>
          </Layout>

          {/* Create Project Drawer */}
          <CreateProjectDrawer
            open={isDrawerOpen}
            onClose={onCloseDrawer}
            onSubmit={handleCreateProject}
            form={form}
          />
        </Layout>
      </ThemeProvider>
    </div>
  )
}