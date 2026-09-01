---
layout: home
hero:
  name: pantoken
  text: InstUI, παντού
  tagline: Ένα επιλυμένο μοντέλο token, διαμορφωμένο σε stylesheets, συνδέσεις framework, native κώδικα και δεδομένα για εργαλεία σχεδίασης.
  actions:
    - theme: brand
      text: Ξεκινώντας
      link: /el/guide/getting-started
    - theme: alt
      text: Ο χάρτης πακέτων
      link: /el/guide/packages
    - theme: alt
      text: Αναφορά API
      link: /el/api
    - theme: alt
      text: Αναφορά CSS
      link: /el/api/css
features:
  - icon:
      light: /book-check-light.svg
      dark: /book-check-dark.svg
    title: Μία πηγή αλήθειας
    details: Κάθε πακέτο χρησιμοποιεί την ίδια επιλυμένη αναπαράσταση token (IR). Αλλάξτε ένα token στην upstream πηγή και αυτό μεταδίδεται στην CSS, SCSS, native κώδικα και Figma με τον ίδιο τρόπο.
  - icon:
      light: /package-light.svg
      dark: /package-dark.svg
    title: Χρησιμοποιήστε το μικρότερο πακέτο
    details: Εγκαταστήστε μόνο @pantoken/css για ένα stylesheet, @pantoken/react για hooks και εικονίδια, ή ένα preset bundler για Tailwind, Panda ή MUI.
  - icon:
      light: /workflow-light.svg
      dark: /workflow-dark.svg
    title: Δημιουργία για οποιαδήποτε πλατφόρμα
    details: Εκτελέστε &grave;pantoken generate&grave; για να παράγετε Swift, Kotlin, Compose, Flutter, Rust, WordPress και άλλα. Τα ίδια tokens, στην ιδιωματική μορφή κάθε οικοσυστήματος.
  - icon:
      light: /unlink-light.svg
      dark: /unlink-dark.svg
    title: Χωρίς σύνδεση με upstream
    details: Τα tokens διανέμονται ως vendored στατικά JSON, οπότε το &grave;npm i&grave; δεν αναζητά ποτέ πηγή αποκλειστικά στο GitHub. Μπορούν να δημοσιευτούν, έχουν semver και είναι φιλικά για offline χρήση.
---
