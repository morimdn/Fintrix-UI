import { addons } from "storybook/manager-api";
import { create } from "storybook/theming";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "Techosoul UI",
    brandUrl: "https://github.com/morimdn/Techosoul-UI",
    brandTarget: "_blank",
  }),
});
