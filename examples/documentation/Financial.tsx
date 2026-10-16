import { Wallet } from "lucide-react";
import {
  AccountSummary,
  BidAskDisplay,
  ClientStatus,
  CurrencyAmount,
  FinancialKPICard,
  KYCStatus,
  PnLIndicator,
  RiskLevelIndicator,
  SymbolPriceDisplay,
  TransactionStatus,
  WalletBalanceCard,
} from "fintrix-ui-preview";

export default function FinancialExamples() {
  return (
    <section aria-label="Synthetic financial examples">
      <CurrencyAmount value="12500.25" currency="EUR" locale="en-US" />
      <PnLIndicator label="Illustrative P&L" value="-24.50" currency="EUR" />
      <WalletBalanceCard
        title="Operating wallet"
        value="12500.25"
        currency="EUR"
        icon={<Wallet size={24} />}
        iconTone="primary"
        detail="Synthetic balance"
      />
      <AccountSummary
        name="Demo account"
        reference="DEMO-1042"
        balance={{ value: "8200.50", currency: "USD" }}
        status={<ClientStatus status="active" />}
      />
      <FinancialKPICard
        label="Accounts awaiting review"
        value="12"
        detail="Illustrative snapshot"
      />
      <KYCStatus status="pending" />
      <ClientStatus status="restricted" />
      <TransactionStatus status="processing" />
      <RiskLevelIndicator level="medium" />
      <SymbolPriceDisplay
        symbol="EUR/USD"
        price="1.08342"
        direction="positive"
      />
      <BidAskDisplay
        symbol="EUR/USD"
        bid="1.08340"
        ask="1.08345"
        spread="0.00005"
      />
    </section>
  );
}
