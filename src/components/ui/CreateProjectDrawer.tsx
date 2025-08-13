// components/ui/CreateProjectDrawer.tsx
import React from 'react'
import { Drawer, Form, Input, Button, Space } from 'antd'
import { createStyles, useTheme } from 'antd-style'
import { ProjectFormData } from '../../types'
import { useTheme as useAppTheme } from '../../hooks/useTheme'
import type { DrawerClassNames, DrawerStyles } from 'antd/es/drawer/DrawerPanel'

const { TextArea } = Input

interface CreateProjectDrawerProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: ProjectFormData) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any // Form instance from antd
}

const useStyle = createStyles(({
  token,
  isDarkMode,
// eslint-disable-next-line @typescript-eslint/no-explicit-any
}: { token: any; isDarkMode: boolean }) => ({
  'project-drawer-body': {
    background: isDarkMode ? '#1f1f1f' : token.colorBgElevated,
    color: isDarkMode ? '#fff' : token.colorText,
  },
  'project-drawer-mask': {
    backdropFilter: 'blur(8px)',
    backgroundColor: isDarkMode 
      ? 'rgba(0, 0, 0, 0.6)' 
      : 'rgba(0, 0, 0, 0.45)',
  },
  'project-drawer-header': {
    background: isDarkMode 
      ? '#262626' 
      : token.colorBgElevated,
    borderBottom: `1px solid ${isDarkMode ? '#424242' : token.colorBorder}`,
    color: isDarkMode ? '#fff' : token.colorText,
  },
  'project-drawer-content': {
    background: isDarkMode ? '#141414' : '#fff',
    boxShadow: isDarkMode 
      ? '-10px 0 30px rgba(0, 0, 0, 0.8)' 
      : '-10px 0 30px rgba(0, 0, 0, 0.2)',
  },
  'project-drawer-footer': {
    borderTop: `1px solid ${isDarkMode ? '#424242' : token.colorBorder}`,
    background: isDarkMode ? '#262626' : token.colorBgElevated,
  },
}))

export const CreateProjectDrawer: React.FC<CreateProjectDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  form
}) => {
  const { darkMode } = useAppTheme()
  const { styles } = useStyle()
  const token = useTheme()

  const handleClose = () => {
    onClose()
    form.resetFields()
  }

  const classNames: DrawerClassNames = {
    body: styles['project-drawer-body'],
    mask: styles['project-drawer-mask'],
    header: styles['project-drawer-header'],
    content: styles['project-drawer-content'],
  }

  const drawerStyles: DrawerStyles = {
    mask: {
      backdropFilter: 'blur(10px)',
    },
    content: {
      boxShadow: darkMode 
        ? '-15px 0 25px rgba(0, 0, 0, 0.9)' 
        : '-15px 0 25px rgba(0, 0, 0, 0.15)',
    },
    header: {
      borderBottom: `1px solid ${darkMode ? '#424242' : token.colorBorder}`,
      background: darkMode ? '#262626' : token.colorBgElevated,
    },
    body: {
      fontSize: token.fontSizeLG,
      background: darkMode ? '#1f1f1f' : token.colorBgElevated,
      padding: '24px',
    },
    footer: {
      borderTop: `1px solid ${darkMode ? '#424242' : token.colorBorder}`,
      background: darkMode ? '#262626' : token.colorBgElevated,
      padding: '16px 24px',
    },
  }

  return (
    <Drawer
      title={
        <span style={{ 
          color: darkMode ? '#fff' : token.colorText,
          fontSize: token.fontSizeLG,
          fontWeight: 600
        }}>
          Create New Project
        </span>
      }
      placement="right"
      width={420}
      onClose={handleClose}
      open={open}
      classNames={classNames}
      styles={drawerStyles}
      footer={
        <Space style={{ width: '100%', justifyContent: 'flex-end' }}>
          <Button onClick={handleClose} size="middle">
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
            size="middle"
          >
            Create Project
          </Button>
        </Space>
      }
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={onSubmit}
        requiredMark={false}
        size="middle"
      >
        <Form.Item
          name="name"
          label={
            <span style={{ 
              color: darkMode ? '#fff' : token.colorText,
              fontSize: token.fontSize,
              fontWeight: 500
            }}>
              Project Name
            </span>
          }
          rules={[
            { required: true, message: 'Please enter project name' },
            { min: 1, message: 'Project name cannot be empty' }
          ]}
          style={{ marginBottom: 24 }}
        >
          <Input
            placeholder="Enter project name"
            size="large"
            style={{
              backgroundColor: darkMode ? '#2f2f2f' : token.colorBgContainer,
              borderColor: darkMode ? '#424242' : token.colorBorder,
              color: darkMode ? '#fff' : token.colorText,
            }}
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={
            <span style={{ 
              color: darkMode ? '#fff' : token.colorText,
              fontSize: token.fontSize,
              fontWeight: 500
            }}>
              Project Description
            </span>
          }
          rules={[
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <TextArea
            placeholder="Enter project description (optional)"
            rows={4}
            showCount
            maxLength={500}
            style={{
              backgroundColor: darkMode ? '#2f2f2f' : token.colorBgContainer,
              borderColor: darkMode ? '#424242' : token.colorBorder,
              color: darkMode ? '#fff' : token.colorText,
            }}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}