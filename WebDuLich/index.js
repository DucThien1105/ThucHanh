// Xử lý lightbox
document.addEventListener("DOMContentLoaded", function () {
  const destinationImages = document.querySelectorAll(".destination img");
  const largeImage = document.getElementById("largeImage");

  destinationImages.forEach((image) => {
    image.addEventListener("click", function () {
      const imageUrl = this.src;
      largeImage.src = imageUrl;
      openLightbox();
    });
  });

  // Xử lý Form và in ra
  const tourForm = document.getElementById("tourForm");
  const tourNameInput = document.getElementById("tourName");
  const tourEmailInput = document.getElementById("tourEmail");
  const tourDestinationInput = document.getElementById("tourDestination");
  const tourDateInput = document.getElementById("tourDate");
  const tourCommentsList = document.getElementById("tourComments");

  const storedComments = JSON.parse(localStorage.getItem("tourComments")) || [];
  renderComments(storedComments, tourCommentsList);

  window.submitTourForm = function () {
    const tourName = tourNameInput.value.trim();
    const tourEmail = tourEmailInput.value.trim();
    const tourDestination = tourDestinationInput.value.trim();
    const tourDate = tourDateInput.value.trim();

    if (
      tourName === "" ||
      tourEmail === "" ||
      tourDestination === "" ||
      tourDate === ""
    ) {
      alert("Vui lòng nhập đầy đủ thông tin.");
      return;
    }

    const newTour = {
      name: tourName,
      email: tourEmail,
      destination: tourDestination,
      date: tourDate,
    };

    storedComments.push(newTour);

    localStorage.setItem("tourComments", JSON.stringify(storedComments));

    renderComments(storedComments, tourCommentsList);

    tourNameInput.value = "";
    tourEmailInput.value = "";
    tourDestinationInput.value = "";
    tourDateInput.value = "";
  };

  function renderComments(comments, commentsList) {
    commentsList.innerHTML = "";

    comments.forEach((comment) => {
      const li = document.createElement("li");
      li.textContent = `
                Tên: ${comment.name} - Email: ${comment.email} - Điểm Đến: ${comment.destination} - Ngày Khởi Hành: ${comment.date}
            `;
      commentsList.appendChild(li);
    });
  }
});

// Hàm mở và đóng
function openLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  lightbox.style.display = "flex";
}

function closeLightbox() {
  const lightbox = document.getElementById("imageLightbox");
  lightbox.style.display = "none";
}

