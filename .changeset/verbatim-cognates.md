---
"@pantoken/docs": patch
---

Stop re-translating cognates. A translation that is byte-identical to its English source is now
cached (and flagged `pantoken-verbatim` in the PO catalog) when other units in the same batch were
translated, so genuine cognates like "Interfaces" in French no longer warn and retranslate on every
run. The passthrough guard still rejects a wholly-echoed batch and every glossary-adapter
passthrough.
