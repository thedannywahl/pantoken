import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { tray as trayRaw } from "../generated/component-styles.ts";

export const tray = defineComponent({ name: "tray", css: (p) => trayRaw.replaceAll(SENTINEL, p) });
export const trayCss = tray.css;
