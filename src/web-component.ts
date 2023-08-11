import { defineCustomElement } from "vue";
import VueCoinTracker from "./components/coin-tracker.ce.vue";

const customCoinTracker = defineCustomElement(VueCoinTracker);

export function register(tagName = "coin-tracker") {
  customElements.define(tagName, customCoinTracker);
}
