import { defineComponent } from "../lib/define.ts";
import { SENTINEL } from "../lib/sentinel.ts";
import { avatar as avatarRaw } from "../generated/component-styles.ts";

/** The `avatar` component record: a user avatar showing initials or an image, circular by default. */
export const avatar = defineComponent({
  name: "avatar",
  css: (p) => avatarRaw.replaceAll(SENTINEL, p),
});
/** Standalone `avatar` stylesheet — the prefixed CSS for the avatar, ready to ship as a `.css` file. */
export const avatarCss = avatar.css;
