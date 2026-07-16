import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { avatar as avatarRaw } from "../generated/component-styles.ts";

export const avatar = defineComponent({
  name: "avatar",
  css: (p) => avatarRaw.replaceAll(SENTINEL, p),
});
export const avatarCss = avatar.css;
