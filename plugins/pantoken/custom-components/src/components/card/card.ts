import { cardCss } from "@pantoken/components";

/**
 * @deprecated Import `cardCss` from `@pantoken/components` instead.
 */
export function cardRules(prefix = "instui-"): string {
  return cardCss({ prefix: prefix.endsWith("-") ? prefix.slice(0, -1) : prefix });
}
