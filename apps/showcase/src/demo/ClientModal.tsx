import { App, Form, Input, Select, Divider, InputNumber, Alert } from "antd";
import { FormModal } from "fintrix-ui-preview";
import { useEffect } from "react";
import type { Client } from "./data";
export function ClientModal({
  client,
  open,
  onClose,
  onSave,
}: {
  client?: Client;
  open: boolean;
  onClose: () => void;
  onSave: (values: Partial<Client>) => void;
}) {
  const [form] = Form.useForm();
  const { message } = App.useApp();
  useEffect(() => {
    if (open) {
      form.resetFields();
      form.setFieldsValue(
        client ?? {
          status: "Pending",
          kyc: "Required",
          tier: "Standard",
          manager: "Emma Wilson",
          balance: 0,
        },
      );
    }
  }, [open, client, form]);
  return (
    <FormModal
      title={
        <>
          <span className="eyebrow">CLIENT WORKSPACE</span>
          <h2>{client ? "Client details" : "Add a new client"}</h2>
        </>
      }
      open={open}
      onCancel={onClose}
      okText={client ? "Save changes" : "Create client"}
      onOk={() => form.submit()}
    >
      <Alert
        type="info"
        showIcon
        title="Demonstration workspace"
        description="Changes are stored in this session only. No accounts or transactions are created."
      />
      <Form
        form={form}
        layout="vertical"
        requiredMark="optional"
        scrollToFirstError={{ focus: true }}
        onFinish={(values) => {
          onSave(values);
          message.success(client ? "Client updated" : "Client created");
          onClose();
        }}
      >
        <Divider titlePlacement="left">Personal information</Divider>
        <div className="form-grid">
          <Form.Item
            name="name"
            label="Full name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: "Enter a full name",
              },
              { min: 3, message: "Use at least 3 characters" },
            ]}
          >
            <Input placeholder="e.g. Alex Morgan" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, message: "Enter an email address" },
              { type: "email", message: "Enter a valid email address" },
            ]}
          >
            <Input placeholder="alex@example.com" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Country"
            rules={[{ required: true, message: "Choose a country" }]}
          >
            <Select
              showSearch
              options={[
                "United Kingdom",
                "Germany",
                "Switzerland",
                "Australia",
                "United States",
                "Singapore",
                "Netherlands",
                "France",
                "Türkiye",
                "Canada",
                "Spain",
              ].map((value) => ({ value, label: value }))}
            />
          </Form.Item>
          <Form.Item name="manager" label="Account manager">
            <Select
              options={["Emma Wilson", "James Lee"].map((value) => ({
                value,
                label: value,
              }))}
            />
          </Form.Item>
        </div>
        <Divider titlePlacement="left">Account & compliance</Divider>
        <div className="form-grid">
          {(["status", "kyc", "tier"] as const).map((field) => (
            <Form.Item
              key={field}
              name={field}
              label={
                {
                  status: "Client status",
                  kyc: "KYC status",
                  tier: "Account tier",
                }[field]
              }
              rules={[{ required: true }]}
            >
              <Select
                options={{
                  status: ["Active", "Inactive", "Pending"],
                  kyc: ["Verified", "In review", "Required"],
                  tier: ["Standard", "Professional"],
                }[field].map((value) => ({ value, label: value }))}
              />
            </Form.Item>
          ))}
          <Form.Item
            name="balance"
            label="Demo wallet balance (USD)"
            rules={[{ required: true }]}
          >
            <InputNumber
              min={0}
              max={100000}
              precision={2}
              style={{ width: "100%" }}
            />
          </Form.Item>
        </div>
      </Form>
    </FormModal>
  );
}
