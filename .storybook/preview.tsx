import type { Preview } from "@storybook/react-vite";
import "@fontsource-variable/inter/wght.css";
import "antd/dist/reset.css";
import "../src/styles.css";
import { FintrixProvider } from "../src/system";
const preview: Preview = {
  globalTypes: {
    mode: {
      description: "Color mode",
      toolbar: { icon: "circlehollow", items: ["light", "dark"] },
    },
    density: {
      description: "Density",
      toolbar: { icon: "component", items: ["comfortable", "compact"] },
    },
  },
  initialGlobals: { mode: "light", density: "comfortable" },
  decorators: [
    (Story, context) => (
      <FintrixProvider
        initialMode={context.globals.mode}
        initialDensity={context.globals.density}
        key={`${context.globals.mode}-${context.globals.density}`}
      >
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </FintrixProvider>
    ),
  ],
};
export default preview;
