import { createVuetify } from "vuetify";

import { icons } from "./icons";
import theme from "./theme";

// Styles
// import "@core/scss/template/libs/vuetify/index.scss";
import "vuetify/styles";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
export default createVuetify({
  icons,
  theme,
  components,
  directives,
});
