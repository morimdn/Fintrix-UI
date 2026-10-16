import type { IconTone } from "./FintrixIcon";
import type { ReactNode } from "react";
import { StatusIndicator, type StatusTone } from "./components";

export interface CurrencyAmountProps {
  /** Decimal text is preferred. This component formats display values only. */
  value: string | number | bigint;
  currency: string;
  locale?: string;
  maximumFractionDigits?: number;
}
export function formatCurrency({
  value,
  currency,
  locale = "en-US",
  maximumFractionDigits,
}: CurrencyAmountProps): string {
  if (
    typeof value === "number" &&
    (!Number.isFinite(value) || Math.abs(value) > Number.MAX_SAFE_INTEGER)
  )
    throw new RangeError("Use decimal text for large monetary display values");
  if (typeof value === "string" && !/^[+-]?\d+(\.\d+)?$/.test(value))
    throw new TypeError("Expected a finite decimal amount");
  if (!/^[A-Za-z]{3}$/.test(currency))
    throw new TypeError("Expected a three-letter currency code");
  const formatter = new Intl.NumberFormat(locale, {
    style: "currency",
    currency,
    maximumFractionDigits,
  });
  // Modern ECMA-402 preserves decimal string precision. Avoid Number conversion.
  return (formatter.format as (value: string | number | bigint) => string)(
    value,
  );
}
export function CurrencyAmount(props: CurrencyAmountProps) {
  return <span className="fx-currency">{formatCurrency(props)}</span>;
}
export interface PnLIndicatorProps extends CurrencyAmountProps {
  label?: string;
}
export function PnLIndicator({ label = "P&L", ...amount }: PnLIndicatorProps) {
  // Direction is read from the decimal text; no financial arithmetic is performed.
  const text = String(amount.value);
  const zero = /^[+-]?0+(\.0+)?$/.test(text);
  const tone = zero
    ? "neutral"
    : text.startsWith("-")
      ? "negative"
      : "positive";
  return (
    <span className={`financial-${tone}`}>
      {label}: {tone === "positive" ? "+" : ""}
      <CurrencyAmount {...amount} />
    </span>
  );
}
export interface WalletBalanceCardProps extends CurrencyAmountProps {
  title?: string;
  icon?: ReactNode;
  iconTone?: IconTone;
  detail?: ReactNode;
}
export function WalletBalanceCard({
  title = "Wallet balance",
  icon,
  iconTone = "neutral",
  detail,
  ...amount
}: WalletBalanceCardProps) {
  return (
    <section className="fx-financial-card" aria-label={title}>
      <h3>
        <span aria-hidden="true" style={{ color: `var(--fx-${iconTone})` }}>
          {icon}
        </span>{" "}
        {title}
      </h3>
      <strong>
        <CurrencyAmount {...amount} />
      </strong>
      {detail && <div>{detail}</div>}
    </section>
  );
}
export interface AccountSummaryProps {
  name: string;
  reference: string;
  balance: CurrencyAmountProps;
  status?: ReactNode;
}
export function AccountSummary({
  name,
  reference,
  balance,
  status,
}: AccountSummaryProps) {
  return (
    <WalletBalanceCard
      title={name}
      {...balance}
      detail={
        <>
          <p>{reference}</p>
          {status}
        </>
      }
    />
  );
}
export function FinancialKPICard({
  icon,
  iconTone = "neutral",
  label,
  value,
  detail,
}: {
  label: string;
  icon?: ReactNode;
  iconTone?: IconTone;
  value: ReactNode;
  detail?: ReactNode;
}) {
  return (
    <section className="fx-financial-card" aria-label={label}>
      <h3>
        <span aria-hidden="true" style={{ color: `var(--fx-${iconTone})` }}>
          {icon}
        </span>{" "}
        {label}
      </h3>
      <strong>{value}</strong>
      {detail && <div>{detail}</div>}
    </section>
  );
}
const kyc = {
  unverified: "neutral",
  pending: "warning",
  verified: "success",
  rejected: "danger",
} as const;
const client = {
  active: "success",
  inactive: "neutral",
  restricted: "danger",
} as const;
const transaction = {
  pending: "warning",
  processing: "info",
  completed: "success",
  failed: "danger",
} as const;
const risk = {
  low: "success",
  medium: "warning",
  high: "danger",
  unknown: "neutral",
} as const;
function State({
  prefix,
  state,
  tones,
}: {
  prefix: string;
  state: string;
  tones: Record<string, StatusTone>;
}) {
  return <StatusIndicator label={`${prefix}: ${state}`} tone={tones[state]} />;
}
export function KYCStatus({ status }: { status: keyof typeof kyc }) {
  return <State prefix="KYC" state={status} tones={kyc} />;
}
export function ClientStatus({ status }: { status: keyof typeof client }) {
  return <State prefix="Client" state={status} tones={client} />;
}
export function TransactionStatus({
  status,
}: {
  status: keyof typeof transaction;
}) {
  return <State prefix="Transaction" state={status} tones={transaction} />;
}
export function RiskLevelIndicator({ level }: { level: keyof typeof risk }) {
  return <State prefix="Risk" state={level} tones={risk} />;
}
export interface SymbolPriceDisplayProps {
  symbol: string;
  price: string;
  direction?: "positive" | "negative" | "neutral";
}
export function SymbolPriceDisplay({
  symbol,
  price,
  direction = "neutral",
}: SymbolPriceDisplayProps) {
  return (
    <span>
      {symbol}{" "}
      <span className={`financial-${direction}`}>
        {direction === "positive" ? "↑ " : direction === "negative" ? "↓ " : ""}
        {price}
      </span>
    </span>
  );
}
export function BidAskDisplay({
  symbol,
  bid,
  ask,
  spread,
}: {
  symbol: string;
  bid: string;
  ask: string;
  spread?: string;
}) {
  return (
    <dl aria-label={`${symbol} quote`}>
      <dt>Symbol</dt>
      <dd>{symbol}</dd>
      <dt>Bid</dt>
      <dd>{bid}</dd>
      <dt>Ask</dt>
      <dd>{ask}</dd>
      {spread !== undefined && (
        <>
          <dt>Spread (supplied)</dt>
          <dd>{spread}</dd>
        </>
      )}
    </dl>
  );
}
