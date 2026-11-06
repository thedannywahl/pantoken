---
"@pantoken/drupal": patch
"@pantoken/wordpress": patch
---

Repair the Drupal and WordPress compatibility checks so they select available Drupal container
images and wait for WordPress's test database to accept connections before running the host check.
