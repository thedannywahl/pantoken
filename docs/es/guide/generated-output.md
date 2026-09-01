# Salida generada

Varios paquetes de pantoken emiten archivos en tiempo de compilación: una hoja de estilos, un `theme.json`, un módulo de tokens incrustado. Para mantener el repositorio limpio y las salidas honestas, cada paquete sigue una convención y una tarea del workspace valida todo.

## La convención `generated/`

Cada paquete que produce un artefacto de compilación lo escribe en un directorio `generated/` por paquete, y
nada más vive allí. Una regla en `.gitignore` los cubre a todos:

```txt
**/generated/
```

Así que ningún archivo generado se comete — una compilación lo reproduce. Dos tipos de salida aterrizan allí:

- **Estáticos publicables** — archivos que un consumidor importa, como el `@pantoken/css` de `style.css` o
  el `@pantoken/scss` de `tokens.scss`. El mapa `exports` del paquete mantiene la clave pública
  (`"./style.css"`) pero la apunta a `generated/`, así la API del consumidor nunca cambia.
- **Intermedios de compilación** — archivos que el propio código fuente del paquete importa y empaqueta en `dist`, como
  el JSON aprovisionado de `@pantoken/tokens`. Estos no se publican por sí solos; se compilan en el paquete.

## Validación de la salida

`@pantoken/validate-generated` (una herramienta privada) se ejecuta después de una compilación y comprueba tres cosas:

1. que cada paquete generador haya escrito realmente un directorio `generated/` no vacío,
2. que la CLI `pantoken` emita al menos un archivo para cada objetivo soportado, y
3. que ninguna hoja de estilos generada se desvíe del IR de tokens — `danglingReferences` para hojas autocontenidas,
   y `unknownReferences` para los bridges que solo referencian tokens definidos en otro lugar.

## Comandos

```sh
# Rebuild every package, regenerating all generated/ output.
pnpm run generate

# Rebuild, then run the validator.
pnpm run validate:generated
```

El validador también está conectado a `pnpm run ready`, así que la deriva se detecta en la puerta estándar.
