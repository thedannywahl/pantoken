export interface ComponentEntry {
  name: string;
  type: "css-only" | "js-only" | "both";
  needsIcons?: boolean;
  requires?: string[];
  css?: string;
  js?: string;
}

declare const capabilities: {
  $schema: string;
  description: string;
  components: ComponentEntry[];
};

export default capabilities;
