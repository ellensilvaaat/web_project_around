export function openModal(modal) {
  modal.style.display = "flex";
  document.addEventListener("keydown", closeOnEsc);
}

export function closeModal(modal) {
  modal.style.display = "none";
  document.removeEventListener("keydown", closeOnEsc);
}

function closeOnEsc(event) {
  if (event.key === "Escape") {
    const openModal = document.querySelector(".form[style='display: flex;']");
    if (openModal) closeModal(openModal);
  }
}

export function setCloseOnOverlay(modal) {
  modal.addEventListener("click", (event) => {
    if (event.target === modal) closeModal(modal);
  });
}
