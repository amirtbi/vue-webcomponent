import { defineCustomElement, h, createApp, getCurrentInstance } from "vue";
import VueCoinTracker from "./components/coin-tracker.ce.vue";

// Vuetify
import type { VuetifyOptions } from "vuetify";

const theme: VuetifyOptions["theme"] = {
  themes: {
    light: {
      dark: false,
      colors: {
        primary: "#C3973C",
        "on-primary": "#fff",
        secondary: "#7367F0",
        "on-secondary": "#fff",
        success: "#28C76F",
        "on-success": "#fff",
        info: "#00CFE8",
        "on-info": "#fff",
        warning: "#FF9F43",
        caution: " #FF9F43 ",
        "on-warning": "#fff",
        error: "#EA5455",
        background: "#F8F7FA",
        "on-background": "#4B465C",
        "on-surface": "#4B465C",
        "grey-50": "#FAFAFA",
        "grey-100": "#F5F5F5",
        "grey-200": "#EEEEEE",
        "grey-300": "#E0E0E0",
        "grey-400": "#BDBDBD",
        "grey-500": "#9E9E9E",
        "grey-600": "#757575",
        "grey-700": "#616161",
        "grey-800": "#424242",
        "grey-900": "#212121",
        silver: "#8E99A1",
        bronze: "#B9722D",
        "critical-color": "#FF0000",
        "high-color": "#FF4D00",
        "medium-color": "#FF6700",
        "low-color": "#FFA700",
        "perfect-scrollbar-thumb": "#DBDADE",
      },

      variables: {
        "border-color": "#4B465C",
        "medium-emphasis-opacity": 0.68,

        // Shadows
        "shadow-key-umbra-opacity": "rgba(var(--v-theme-on-surface), 0.08)",
        "shadow-key-penumbra-opacity": "rgba(var(--v-theme-on-surface), 0.12)",
        "shadow-key-ambient-opacity": "rgba(var(--v-theme-on-surface), 0.04)",
      },
    },
    dark: {
      dark: true,
      colors: {
        primary: "#C3973C",
        "on-primary": "#fff",
        secondary: "#292B7E",
        "on-secondary": "#fff",
        success: "#28C76F",
        "on-success": "#fff",
        info: "#00CFE8",
        "on-info": "#fff",
        warning: "#FF9F43",
        "on-warning": "#fff",
        error: "#EA5455",
        background: "#25293C",
        "on-background": "#CFD3EC",
        surface: "#2F3349",
        "on-surface": "#CFD3EC",
        "grey-50": "#26293A",
        "grey-100": "#2F3349",
        "grey-200": "#26293A",
        "grey-300": "#4A5072",
        "grey-400": "#5E6692",
        "grey-500": "#7983BB",
        "grey-600": "#AAB3DE",
        "grey-700": "#B6BEE3",
        "grey-800": "#CFD3EC",
        "grey-900": "#E7E9F6",
        silver: "#8E99A1",
        bronze: "#B9722D",
        "critical-color": "#FF0000",
        "high-color": "#FF4D00",
        "medium-color": "#FF6700",
        "low-color": "#FFA700",
        "perfect-scrollbar-thumb": "#4A5072",
      },
      variables: {
        "border-color": "#CFD3EC",
        "medium-emphasis-opacity": 0.68,

        // Shadows
        "shadow-key-umbra-opacity": "rgba(15, 20, 34, 0.08)",
        "shadow-key-penumbra-opacity": "rgba(15, 20, 34, 0.12)",
        "shadow-key-ambient-opacity": "rgba(15, 20, 34, 0.04)",
      },
    },
  },
};

import { Icon } from "@iconify/vue";
import type { IconAliases, IconProps, IconSet } from "vuetify";
import { createVuetify } from "vuetify";
const aliases: IconAliases = {
  collapse: "tabler-chevron-up",
  complete: "tabler-check",
  cancel: "tabler-x",
  close: "tabler-x",
  delete: "tabler-x",
  clear: "tabler-x",
  success: "tabler-circle-check",
  info: "tabler-info-circle",
  warning: "tabler-alert-circle",
  error: "tabler-x",
  prev: "tabler-chevron-left",
  next: "tabler-chevron-right",
  checkboxOn: "custom-checked-checkbox",
  checkboxOff: "custom-unchecked-checkbox",
  checkboxIndeterminate: "custom-indeterminate-checkbox",
  delimiter: "tabler-circle",
  sort: "tabler-arrow-up",
  expand: "tabler-chevron-down",
  menu: "tabler-menu-2",
  subgroup: "tabler-caret-down",
  dropdown: "tabler-chevron-down",
  radioOn: "custom-checked-radio",
  radioOff: "custom-unchecked-radio",
  edit: "tabler-pencil",
  ratingEmpty: "custom-star-empty",
  ratingFull: "custom-star-fill",
  ratingHalf: "custom-star-half",
  loading: "tabler-refresh",
  first: "tabler-player-skip-back",
  last: "tabler-player-skip-forward",
  unfold: "tabler-arrows-move-vertical",
  file: "tabler-paperclip",
  plus: "tabler-plus",
  minus: "tabler-minus",
  wallet: "teenyicons:wallet-outline",
};
// Styles
// import "@core/scss/template/libs/vuetify/index.scss";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const iconify: IconSet = {
  component: (props: IconProps) => h(Icon, props),
};

const icons = {
  defaultSet: "iconify",
  aliases,
  sets: {
    iconify,
  },
};

const vuetify = createVuetify({
  icons,
  theme,
  components,
  directives,
});

const customCoinTracker = (component, { plugins = [] } = {}) =>
  defineCustomElement({
    styles: component.styles, // <- this
    render: () => h(component),
    setup() {
      const app = createApp();

      // install plugins
      plugins.forEach(app.use);

      const inst = getCurrentInstance();
      Object.assign(inst.appContext, app._context);
      Object.assign(inst.provides, app._context.provides);
    },
  });

export function register(tagName = "coin-tracker") {
  customElements.define(
    tagName,
    customCoinTracker(VueCoinTracker, { plugins: [vuetify] })
  );
}
