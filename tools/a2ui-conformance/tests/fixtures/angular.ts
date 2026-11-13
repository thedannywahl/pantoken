import "@angular/compiler";
import { A2uiRendererService, provideA2UI, SurfaceComponent } from "@a2ui/angular";
import { isWebComponentImplementation } from "@a2ui/web_core/universal";
import { createComponent, type ComponentRef } from "@angular/core";
import { createApplication } from "@angular/platform-browser";
import type { RendererHost } from "./harness.ts";

/** Mount Angular's official version-agnostic surface using its public surface group API. */
export async function createHost(container: HTMLElement): Promise<RendererHost> {
  const app = await createApplication({ providers: [provideA2UI({ catalogs: [] })] });
  const service = app.injector.get(A2uiRendererService);
  let surface: Parameters<RendererHost["render"]>[0] | undefined;
  let component: ComponentRef<SurfaceComponent> | undefined;
  let element: HTMLElement | undefined;

  return {
    render(nextSurface) {
      if (nextSurface.protocolVersion !== "1.0") throw new Error("Expected an A2UI 1.0 surface.");
      for (const catalog of nextSurface.availableCatalogs.values()) {
        for (const implementation of catalog.components.values()) {
          if (!isWebComponentImplementation(implementation)) {
            throw new Error(`Expected a Universal implementation for ${implementation.name}.`);
          }
        }
      }
      if (surface !== nextSurface) {
        if (component) {
          app.detachView(component.hostView);
          component.destroy();
          element?.remove();
        }
        if (surface) service.surfaceGroup.deleteSurface(surface.id);
        surface = nextSurface;
        // Universal mode uses tagName/element, not the native Angular component field.
        service.surfaceGroup.addSurface(
          surface as Parameters<typeof service.surfaceGroup.addSurface>[0],
        );
        element = document.createElement("div");
        container.appendChild(element);
        component = createComponent(SurfaceComponent, {
          environmentInjector: app.injector,
          hostElement: element,
        });
        component.setInput("surfaceId", surface.id);
        app.attachView(component.hostView);
      }
      app.tick();
    },
    destroy() {
      if (component) {
        app.detachView(component.hostView);
        component.destroy();
      }
      element?.remove();
      app.destroy();
    },
  };
}
