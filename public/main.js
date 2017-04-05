document.addEventListener("DOMContentLoaded", function(){

  var menu = document.querySelector(".menu");
  menu.addEventListener("click", function(evt) {
    if(evt.target.tagName !== "I") return;

    var data = {"postNum" : curId};
    data = JSON.stringify(data);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(res) {
      if(res.target.status !== 200) return;
      var json = JSON.parse(res.target.response);
      if(!json.result) {
        return console.log("false");
      }

      menu.style.display = "none";
      console.log(curNode);
      curNode.remove();
    });
    xhr.open("POST", "http://localhost:3000/delete");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  });

  var curId;
  var curNode;
  var postClick = document.querySelector(".post-wrap");
postClick.addEventListener("click", function(evt) {
  if(evt.target.tagName !== "I") return evt.preventDefault();

  if(evt.target.classList.contains("fa-angle-down")) {
    console.log(evt.target);
    curId = evt.target.closest(".posts").id;
    curNode = evt.target.closest(".posts");
    //var menu = document.querySelector(".menu");

    var rect = evt.target.getBoundingClientRect();
    var space = 10;
    menu.style.display = "block";
    menu.style.top = window.scrollY + rect.bottom + space + "px";
    menu.style.left = rect.left + "px";

    evt.preventDefault();

  } else if(evt.target.classList.contains("fa-thumbs-o-up")) {
    console.log(evt.target.parentElement.nextElementSibling);
    var postNum = evt.target.closest(".posts").id;
    var data = {"postNum" : postNum};
    data = JSON.stringify(data);
    console.log(data);
    var xhr = new XMLHttpRequest();
    xhr.addEventListener("load", function(res) {
      var json = JSON.parse(res.target.response);

      if(!json.result) return;

      var likeCount = evt.target.parentElement.nextElementSibling;
      likeCount.innerHTML = likeCount.innerHTML*1 + 1;
    });

    xhr.open("POST", "http://localhost:3000/like");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
  }
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

});

