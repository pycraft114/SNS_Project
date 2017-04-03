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


var add = document.querySelector(".add");
add.addEventListener("click", function(evt) {
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("add", function(res) {
    console.log("ok");
    console.log(res.target.response);
  });
  xhr.open("POST", "http://localhost:3000/pull");
  xhr.send();
});
