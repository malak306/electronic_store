document.addEventListener("DOMContentLoaded", function () {
  const categoryOptions = document.querySelectorAll(".category-option");
  const hiddenCategory = document.getElementById("selected-category");
  const status = document.getElementById("category-status");

  categoryOptions.forEach(option => {
    option.addEventListener("click", () => {
      // remove active class from all
      categoryOptions.forEach(o => o.classList.remove("active"));

      // add active to clicked one
      option.classList.add("active");

      // store chosen value in hidden input
      const value = option.getAttribute("data-category");
      hiddenCategory.value = value;

      // update status text
      status.textContent = "Category: " + value;
    });
  });
});
