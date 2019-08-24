window.addEventListener("scroll", () => {
  const main = document.querySelector("main").getBoundingClientRect().top
  // Editions section
  if (main > 0) {
    document
      .querySelector("nav span")
      .setAttribute("style", "visibility: hidden")
  }
  if (main <= 0) {
    document
      .querySelector("nav span")
      .setAttribute("style", "visibility: visible")
  }
})
