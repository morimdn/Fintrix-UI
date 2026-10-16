import { useState } from "react";
import { Settings, Wallet } from "lucide-react";
import { FintrixIcon, IconButton, WalletBalanceCard } from "fintrix-ui-preview";

export default function Icons() {
  const [status, setStatus] = useState("Ready");
  return (
    <>
      <FintrixIcon icon={Wallet} size={20} strokeWidth={2} />
      <FintrixIcon icon={Wallet} tone="primary" label="Wallet" />
      <IconButton
        label="Wallet settings"
        icon={<Settings size={20} />}
        iconTone="primary"
        onClick={() => setStatus("Settings selected")}
      />
      <WalletBalanceCard
        value="12500.25"
        currency="EUR"
        icon={<Wallet size={24} />}
        iconTone="success"
      />
      <p role="status">{status}</p>
    </>
  );
}
