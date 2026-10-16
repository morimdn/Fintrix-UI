import { createRoot } from 'react-dom/client';
import { FintrixProvider, useFintrixTheme, Button, Form, Input, WalletBalanceCard, PnLIndicator, KYCStatus } from 'fintrix-ui-preview';
import 'fintrix-ui-preview/styles.css';
import 'fintrix-ui-preview/fonts.css';
function Consumer() {
  const { mode, setMode, density, setDensity } = useFintrixTheme();
  return <main style={{ padding: 24 }}><h1>Independent consumer</h1>
    <Button onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>Theme: {mode}</Button>
    <Button onClick={() => setDensity(density === 'comfortable' ? 'compact' : 'comfortable')}>Density: {density}</Button>
    <Form layout="vertical" onFinish={() => window.alert('Synthetic form submitted')}><Form.Item name="reference" label="Account reference" rules={[{ required: true }]}><Input /></Form.Item><Button htmlType="submit">Save reference</Button></Form>
    <WalletBalanceCard value="9007199254740993.25" currency="USD" detail={<PnLIndicator value="-24.50" currency="USD" />} />
    <KYCStatus status="verified" />
  </main>;
}
createRoot(document.getElementById('root')!).render(<FintrixProvider><Consumer /></FintrixProvider>);
