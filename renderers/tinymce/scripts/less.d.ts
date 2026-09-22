declare module "less" {
  interface RenderOptions {
    filename?: string;
    paths?: string[];
  }

  interface RenderResult {
    css: string;
  }

  const less: {
    render(source: string, options?: RenderOptions): Promise<RenderResult>;
  };

  export default less;
}
