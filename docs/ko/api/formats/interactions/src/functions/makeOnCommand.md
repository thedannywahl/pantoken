[pantoken](../../../../index.md) / [formats/interactions/src](../index.md) / makeOnCommand

# 함수: makeOnCommand()

> **makeOnCommand**(`invokerSupported`): [`OnCommand`](../type-aliases/OnCommand.md)

Build the `command`-event router: forward a target's `command` events to a handler, and where the
Invoker Commands API is missing, delegate matching `commandfor` clicks across the target's tree.

## 매개변수

### invokerSupported

`boolean`

## 반환값

[`OnCommand`](../type-aliases/OnCommand.md)
