/**
 * Created by chanwoopark on 2017. 3. 30..
 */


function Bulletin() {
    this.body = $("body");
    this.modal = $(".modal");
    this.bulletinWrap = $(".bulletin-wrap");
    this.modalBulletinWrap = $(".modal-bulletin-wrap");
    this.modalContent = $(".modal-bulletin-content");
    this.modalUploadButton = $(".modal-uploadButton");
}

Bulletin.prototype = {
    slideDownButton() {
        this.modalUploadButton.slideDown();
    },
    giveOpacity(){

    },
    sendContent(){

    }
};

//------------------------------------------
/*bulletin.prototype = {
    showNode : function(){
        console.log(this.inputSpace);
    }
};

bulletin.showNode(); */
//-------------------------------------------

var bulletin = new Bulletin();

//---------------------------------------------------------
//bulletin.bulletinWrap.click(bulletin.slideDownButton);
//---------------------------------------------------------

bulletin.bulletinWrap.on("click", function() {
    bulletin.modal.css("display","block");
    bulletin.slideDownButton();
});

bulletin.modal.on("click",function(evt){
    console.log(evt.target.parentNode.className);
    if(evt.target.parentNode.className !== "modal-bulletin"){
        bulletin.modal.css("display","none");
        bulletin.modalUploadButton.css("display","none");
    }
});
