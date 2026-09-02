// The mixed state is a DOM property, not an attribute, so set it in script.
document.querySelectorAll("[data-indeterminate]").forEach((el) => (el.indeterminate = true));
