export interface Client {
  id: string;
  name: string;
  email: string;
  country: string;
  initials: string;
  status: "Active" | "Inactive" | "Pending";
  kyc: "Verified" | "In review" | "Required";
  balance: number;
  tier: string;
  manager: string;
}
const people = [
  ["Olivia Rhye", "United Kingdom"],
  ["Phoenix Baker", "Germany"],
  ["Lana Steiner", "Switzerland"],
  ["Demi Wilkinson", "Australia"],
  ["Drew Cano", "United States"],
  ["Natali Craig", "Singapore"],
  ["Orlando Diggs", "Netherlands"],
  ["Andi Lane", "United Kingdom"],
  ["Kate Morrison", "France"],
  ["Koray Okumus", "Türkiye"],
  ["Alex Morgan", "Canada"],
  ["Sam Rivera", "Spain"],
];
export const clients: Client[] = Array.from({ length: 48 }, (_, i) => {
  const [base, country] = people[i % people.length];
  const name =
    i < 12
      ? base
      : `${base.split(" ")[0]} ${["Chen", "Reed", "Novak"][Math.floor(i / 12) - 1]}`;
  return {
    id: `FX-${10021 + i}`,
    name,
    email: `${name.toLowerCase().replace(" ", ".")}@example.com`,
    country,
    initials: name
      .split(" ")
      .map((s) => s[0])
      .join(""),
    status: i % 7 === 4 ? "Inactive" : i % 5 === 3 ? "Pending" : "Active",
    kyc: i % 5 === 3 ? "In review" : i % 7 === 4 ? "Required" : "Verified",
    balance: Math.round(((17321 + i * 2917.31) % 96000) * 100) / 100,
    tier: i % 3 === 0 ? "Professional" : "Standard",
    manager: ["Emma Wilson", "James Lee"][i % 2],
  };
});
export const money = (n: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(
    n,
  );
export function filterClients(
  rows: Client[],
  search: string,
  status: string,
  kyc: string,
  range: [number, number],
) {
  return rows.filter(
    (c) =>
      `${c.name} ${c.email} ${c.id}`
        .toLowerCase()
        .includes(search.toLowerCase()) &&
      (status === "All statuses" || c.status === status) &&
      (kyc === "All KYC" || c.kyc === kyc) &&
      c.balance >= range[0] &&
      c.balance <= range[1],
  );
}
