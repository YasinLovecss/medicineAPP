var starNum;
var iconsfill = document.getElementById("icons-fill");
var iGroup = iconsfill.getElementsByTagName('i');
var iconsshow = document.getElementById("icons-show");
var showiGroup = iconsshow.getElementsByTagName('i');
var getComment = document.getElementById("getComment");
var submitbtn = document.getElementById("submit-comment");
var showComment = document.getElementById("showComment");
for(i = 0; i < iGroup.length; i++) {
	iGroup[i].addEventListener('tap', function() {
		starNum = this.getAttribute("data-index");
		for(j = 0; j < starNum; j++) {
			iGroup[j].setAttribute("class", "mui-icon mui-icon-star-filled");
		}
		for(j = 0; j < (5 - starNum); j++) {
			iGroup[4 - j].setAttribute('class', 'mui-icon mui-icon-star');
		}
	})
}

function fshowComment() {
	for(j = 0; j < starNum; j++) {
		showiGroup[j].setAttribute("class", "mui-icon mui-icon-star-filled");
	}
	for(j = 0; j < (5 - starNum); j++) {
		showiGroup[4 - j].setAttribute('class', 'mui-icon mui-icon-star');
	}

}

var fillpart = document.getElementById("comment-part");
var showpart = document.getElementById("comment-display");
submitbtn.addEventListener('tap', function() {
	if(getComment.value == null || getComment.value == "") {
		mui.toast("请输入评价...");
		return false;
	} else {
		fshowComment();
		showComment.innerText = getComment.value;
		fillpart.style.display = 'none';
		showpart.style.display = "block";
	}

})