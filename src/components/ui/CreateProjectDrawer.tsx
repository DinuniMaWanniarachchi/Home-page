// components/ui/CreateProjectDrawer.tsx
import React from 'react'
import { Drawer, Form, Input, Button, Space } from 'antd'
import { ProjectFormData } from '../../types'
import { useTheme } from '../../hooks/useTheme'

const { TextArea } = Input

interface CreateProjectDrawerProps {
  open: boolean
  onClose: () => void
  onSubmit: (values: ProjectFormData) => Promise<void>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  form: any // Form instance from antd
}

export const CreateProjectDrawer: React.FC<CreateProjectDrawerProps> = ({
  open,
  onClose,
  onSubmit,
  form
}) => {
  const { darkMode } = useTheme()

  const handleClose = () => {
    onClose()
    form.resetFields()
  }

  return (
    <Drawer
      title={<span style={{ color: darkMode ? '#fff' : '#000' }}>Create New Project</span>}
      placement="right"
      width={400}
      onClose={handleClose}
      open={open}
      style={{
        backgroundColor: darkMode ? '#141414' : '#fff'
      }}
      extra={
        <Space>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="primary"
            onClick={() => form.submit()}
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
      >
        <Form.Item
          name="name"
          label={<span style={{ color: darkMode ? '#fff' : '#000' }}>Project Name</span>}
          rules={[
            { required: true, message: 'Please enter project name' },
            { min: 1, message: 'Project name cannot be empty' }
          ]}
        >
          <Input
            placeholder="Enter project name"
            size="large"
          />
        </Form.Item>

        <Form.Item
          name="description"
          label={<span style={{ color: darkMode ? '#fff' : '#000' }}>Project Description</span>}
          rules={[
            { max: 500, message: 'Description cannot exceed 500 characters' }
          ]}
        >
          <TextArea
            placeholder="Enter project description (optional)"
            rows={4}
            showCount
            maxLength={500}
          />
        </Form.Item>
      </Form>
    </Drawer>
  )
}