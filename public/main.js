document.addEventListener("DOMContentLoaded", function(){

  window.addEventListener("click", function(evt) {
    if(!evt.target.classList.contains("fa-angle-down") && menu.style.display === "block") {
      menu.style.display = "none";
    }
  });

  var menu = document.querySelector(".menu");
  menu.addEventListener("click", function(evt) {
    if(evt.target.tagName !== "I") return;

    function deletePost(res) {
      if(res.target.status !== 200) return;
      var json = JSON.parse(res.target.response);
      if(!json.result) {
        return console.log("false");
      }

      menu.style.display = "none";
      var parent = curNode.parentElement;
      curNode.remove();

      if(parent.childElementCount === 0) {
        parent.innerHTML = "<h2>포스트가 없습니다</h2>";
      }
    }
    var data = {"postNum" : curId};
    util.sendAjax("POST", "/delete", data, deletePost, "application/json");
  });

  var curId;
  var curNode;
  var postClick = document.querySelector(".post-wrap");
  postClick.addEventListener("click", function(evt) {
  if(evt.target.tagName !== "I") return evt.preventDefault();

  if(evt.target.classList.contains("fa-angle-down")) {
    curId = evt.target.closest(".posts").id;
    curNode = evt.target.closest(".posts");

    var rect = evt.target.getBoundingClientRect();
    var space = 10;
    menu.style.display = "block";
    menu.style.top = window.scrollY + rect.bottom + space + "px";
    menu.style.left = rect.left + "px";

    evt.preventDefault();

  } else if(evt.target.classList.contains("fa-thumbs-o-up")) {
    var postNum = evt.target.closest(".posts").id;
    var data = {"postNum" : postNum};

    function thumbsup(res) {
      var json = JSON.parse(res.target.response);

      if(!json.result) return;

      var likeCount = evt.target.parentElement.nextElementSibling;
      likeCount.innerHTML = likeCount.innerHTML*1 + 1;
    }

    util.sendAjax("POST", "/like", data, thumbsup, "application/json");
  }
});

  var count = 1;

  window.addEventListener('scroll', function(evt) {
    
    if(window.scrollY !== document.body.clientHeight - window.innerHeight) return; 
    
    var data = {"count" : count};

    function fullingData(res) {
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
    }

    util.sendAjax("POST", "/pull", data, fullingData, "application/json");
  });

});

