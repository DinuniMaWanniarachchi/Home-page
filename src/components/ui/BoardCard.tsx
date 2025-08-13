// components/ui/BoardCard.tsx
import React from 'react'
import { Card, Typography } from 'antd'
import { Board } from '../../types'
import { useTheme } from '../../hooks/useTheme'

const { Text } = Typography

interface BoardCardProps {
  board: Board
  onClick: (boardId: string) => void
}

export const BoardCard: React.FC<BoardCardProps> = ({ board, onClick }) => {
  const { darkMode } = useTheme()

  return (
    <Card
      hoverable
      style={{
        background: darkMode ? '#1f1f1f' : '#fff',
        border: `1px solid ${darkMode ? '#303030' : '#f0f0f0'}`,
        cursor: 'pointer'
      }}
      onClick={() => onClick(board.id)}
    >
      <Card.Meta
        title={
          <Text style={{ color: darkMode ? '#fff' : '#000' }}>
            {board.title}
          </Text>
        }
        description={
          <div>
            <Text type="secondary" style={{ display: 'block' }}>
              {board.workspace}
            </Text>
            {board.description && (
              <Text type="secondary" style={{ fontSize: '12px', marginTop: '8px', display: 'block' }}>
                {board.description}
              </Text>
            )}
          </div>
        }
      />
    </Card>
  )
}