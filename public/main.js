var a = document.querySelector(".content-wrap");
a.addEventListener("click", function(evt) {
  if(evt.target.tagName !== "I") return;

  if(evt.target.classList.contains("fa-angle-down")) {
    console.log("v표시" + evt.target);
  } else if(evt.target.classList.contains("fa-thumbs-o-up")) {
    console.log("좋아요" + evt.target);
  }

  //console.log(evt.target);
});
