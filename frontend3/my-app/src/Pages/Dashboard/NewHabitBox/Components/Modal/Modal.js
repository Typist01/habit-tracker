/** @format */

export default function Modal() {
  return (
    <div id="myModal" class="modal">
      <div class="modal-content">
        <span class="close">&times;</span>
        <p>Some text in the Modal..</p>
      </div>
    </div>
  );
}


function modalLogic() {
  // Get the modal
  var modal = document.getElementById("habits-modal");

  // Get the button that opens the modal
  var openBtn = document.getElementById("habits-modal-open-btn");

  // Get the <span> element that closes the modal
  //var closeBtn = document.getElementsByClassName("close")[0];

  // When the user clicks on the button, open the modal
  openBtn.onclick = function () {
    modal.style.display = "block";
  };

  // When the user clicks on <span> (x), close the modal
  // closeBtn.onclick = function () {
  //   modal.style.display = "none";
  // };

  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };
}