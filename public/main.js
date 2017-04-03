var a = document.querySelector(".post-wrap");
a.addEventListener("click", function(evt) {
  if(evt.target.tagName !== "I") return;

  if(evt.target.classList.contains("fa-angle-down")) {
    console.log("v표시" + evt.target);
  } else if(evt.target.classList.contains("fa-thumbs-o-up")) {
    console.log("좋아요" + evt.target);
  }

  //console.log(evt.target);
});

var count = 1;

window.addEventListener('scroll', function(evt) {
  
  if(window.scrollY !== document.body.clientHeight - window.innerHeight) return; 

  var data = {"count" : count};
  data = JSON.stringify(data);
  var xhr = new XMLHttpRequest();
  xhr.addEventListener("load", function(res) {
    var json = JSON.parse(res.target.response);

    var postWrap = document.querySelector(".post-wrap");
    var postWrapTemplate = postWrap.innerHTML;

    if(json.length === 0) {
       console.log("no data");
       //postWrapTemplate = postWrapTemplate + "<h2>포스트가 없습니다.</h2>";
    } else {
      count++;
      var template = document.querySelector("#postTemplate").innerHTML;
      json.forEach(function(val) {
        postWrapTemplate = postWrapTemplate + template.replace("{id}", val.postNum).replace("{imgURL}", val.img).replace("{name}", val.name).replace("{postTime}", val.postTime).replace("{content}", val.content).replace("{like-count}", val.likeNum);
      });
    }

    postWrap.innerHTML = postWrapTemplate;
    
  });
  xhr.open("POST", "http://localhost:3000/pull");
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(data);

});
