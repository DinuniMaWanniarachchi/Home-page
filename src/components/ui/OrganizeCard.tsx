// components/ui/OrganizeCard.tsx
import React from 'react'
import { Card, Input, Button, Space, Typography } from 'antd'
import { useTheme } from '../../hooks/useTheme'

const { Title, Text } = Typography

interface OrganizeCardProps {
  boardTitle: string
  onBoardTitleChange: (value: string) => void
  onCreateBoard: () => void
  onDismiss: () => void
}

export const OrganizeCard: React.FC<OrganizeCardProps> = ({
  boardTitle,
  onBoardTitleChange,
  onCreateBoard,
  onDismiss
}) => {
  const { darkMode } = useTheme()

  const handleCreateBoard = () => {
    if (boardTitle.trim()) {
      onCreateBoard()
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCreateBoard()
    }
  }

  return (
    <Card
      style={{
        textAlign: 'center',
        padding: '48px 24px',
        marginBottom: '32px',
        background: darkMode ? '#1f1f1f' : '#fff',
        border: `1px solid ${darkMode ? '#303030' : '#f0f0f0'}`
      }}
    >
      {/* Enhanced Kanban Board Illustration */}
      <div style={{
        width: '180px',
        height: '80px',
        margin: '0 auto 24px',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: '12px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden'
      }}>
        <div style={{
          position: 'absolute',
          inset: '16px',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{
            background: 'rgba(255,255,255,0.9)',
            borderRadius: '8px',
            padding: '8px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', marginBottom: '4px' }}></div>
            <div style={{ height: '8px', background: '#f0f0f0', borderRadius: '4px', width: '66%' }}></div>
          </div>
          <div style={{
            background: 'rgba(219, 234, 254, 0.9)',
            borderRadius: '8px',
            padding: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%', marginRight: '4px' }}></div>
            <div style={{ width: '8px', height: '8px', background: '#3b82f6', borderRadius: '50%' }}></div>
          </div>
          <div style={{
            background: 'rgba(220, 252, 231, 0.9)',
            borderRadius: '8px',
            padding: '8px'
          }}>
            <div style={{ width: '24px', height: '24px', background: '#10b981', borderRadius: '4px' }}></div>
          </div>
        </div>
      </div>

      <Title level={2} style={{ color: darkMode ? '#fff' : '#000', marginBottom: '16px' }}>
        Organize anything
      </Title>

      <Text type="secondary" style={{ color: darkMode ? '#fff' : '#000', fontSize: '16px', marginBottom: '32px', display: 'block' }}>
        Put everything in one place and start moving things forward with your first Kanban board!
      </Text>

      <Space direction="vertical" size="large" style={{ width: '100%', maxWidth: '400px' }}>
        <Input
          value={boardTitle}
          onChange={(e) => onBoardTitleChange(e.target.value)}
          placeholder="What are you working on?"
          size="large"
          onKeyPress={handleKeyPress}
          style={{ marginBottom: '16px' }}
        />

        <Space>
          <Button
            type="primary"
            size="large"
            onClick={handleCreateBoard}
            disabled={!boardTitle.trim()}
          >
            Create your board
          </Button>
          <Button
            type="link"
            size="large"
            onClick={onDismiss}
          >
            <span style={{ textDecoration: 'underline' }}>Got it! Dismiss this.</span>
          </Button>
        </Space>
      </Space>
    </Card>
  )
}