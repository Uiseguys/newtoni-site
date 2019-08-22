window.addEventListener("scroll", () => {
  const main = document.querySelector("main")
  // News section
  const news = main
    .querySelector("section:nth-child(1)")
    .getBoundingClientRect().top
  // Editions section
  const editions = main
    .querySelector("section:nth-child(2)")
    .getBoundingClientRect().top
  // Publications section
  const publications = main
    .querySelector("section:nth-child(3)")
    .getBoundingClientRect().top
  // Contact section
  const contact = main
    .querySelector("section:nth-child(4)")
    .getBoundingClientRect().top

  if (news > 0) {
    document.getElementById("news").setAttribute("style", "visibility: hidden")
  }
  if (news <= 0 && editions > 0) {
    document.getElementById("news").setAttribute("style", "visibility: visible")
    document
      .getElementById("editions")
      .setAttribute("style", "visibility: hidden")
  }
  if (editions <= 0 && publications > 0) {
    document
      .getElementById("editions")
      .setAttribute("style", "visibility: visible")
    document.getElementById("news").setAttribute("style", "visibility: hidden")
    document
      .getElementById("publications")
      .setAttribute("style", "visibility: hidden")
  }
  if (publications <= 0 && contact > 0) {
    document
      .getElementById("publications")
      .setAttribute("style", "visibility: visible")
    document
      .getElementById("editions")
      .setAttribute("style", "visibility: hidden")
  }
  if (contact <= 0) {
    document
      .getElementById("publications")
      .setAttribute("style", "visibility: hidden")
  }
})
