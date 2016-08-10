//初始化单页view
var viewApi = mui('#app').view({
	defaultPage: '#setting'
});
//初始化单页的区域滚动
mui('.mui-scroll-wrapper').scroll();

var view = viewApi.view;
(function($) {
	//处理view的后退与webview后退
	var oldBack = $.back;
	$.back = function() {
		if(viewApi.canBack()) { //如果view可以后退，则执行view的后退
			viewApi.back();
		} else { //执行webview后退
			oldBack();
		}
	};
	//监听页面切换事件方案1,通过view元素监听所有页面切换事件，目前提供pageBeforeShow|pageShow|pageBeforeBack|pageBack四种事件(before事件为动画开始前触发)
	//第一个参数为事件名称，第二个参数为事件回调，其中e.detail.page为当前页面的html对象
	view.addEventListener('pageBeforeShow', function(e) {
		//				console.log(e.detail.page.id + ' beforeShow');
	});
	view.addEventListener('pageShow', function(e) {
		//进入手执设定界面时
		if(e.detail.page.id == 'lock') {
			var settings = app.getSettings();
			/*if (!settings.autoLogin) {
				plus.nativeUI.toast('当前没有启用 “自动登录”，需要在登录时启用 "自动登录"，设定的手势锁屏才会升效。');
			}*/
			var lockStateButton = document.getElementById("lockState");
			var locker = document.querySelector('.mui-locker');
			lockStateButton.classList[settings.gestures ? 'add' : 'remove']('mui-active')
			locker.style.display = settings.gestures ? 'block' : 'none';
		}
		//				console.log(e.detail.page.id + ' show');
	});
	view.addEventListener('pageBeforeBack', function(e) {
		//				console.log(e.detail.page.id + ' beforeBack');
	});
	view.addEventListener('pageBack', function(e) {
		//				console.log(e.detail.page.id + ' back');
	});
})(mui);

//修改用户名并显示
var usernameSub = document.getElementById("usernamesub");
var usernameInner; //标题内容
var showUsername = document.getElementById("showusername");
usernameSub.addEventListener("tap", function() {
	usernameInner = document.getElementById("username-inner").value;
	if(usernameInner === "" || usernameInner === null) {
		mui.toast("请输入用户名...");
		return false;
	} else {
		showUsername.innerText = usernameInner;
		mui.back();
	}
});

//选择性别并显示
var sexSub = document.getElementById("sexsub");
var selectedSex = "";
var showsex = document.getElementById("showsex");
var sexUl = document.getElementById("sex");
var sexGroup = sexUl.getElementsByTagName('li');
for(i = 0; i < sexGroup.length; i++) {
	sexGroup[i].addEventListener('tap', function() {
		var thisSex = this;
		selectedSex = thisSex.innerText;
		for(j = 0; j < sexGroup.length; j++) {
			if(thisSex == sexGroup[j]) {
				thisSex.setAttribute('class', 'kindselected');
			} else {
				sexGroup[j].setAttribute('class', 'kindnotselected');
			}
		}
	})
}
sexSub.addEventListener("tap", function() {
	if(selectedSex === "" || selectedSex === null) {
		mui.toast("请选择分类");
		return false;
	} else {
		showsex.innerText = selectedSex;
		mui.back();
	}
});

mui(".mui-table-view-cell").on("tap", "#upload-usericon", function(e) {
	if(mui.os.plus) {
		var a = [{
			title: "拍照"
		}, {
			title: "从手机相册选择"
		}];
		plus.nativeUI.actionSheet({
			title: "上传头像",
			cancel: "取消",
			buttons: a
		}, function(b) {
			switch(b.index) {
				case 0:
					break;
				case 1:
					getImage();
					break;
				case 2:
					galleryImg();
					break;
				default:
					break
			}
		})
	}

});

function getImage() {
	var c = plus.camera.getCamera();
	c.captureImage(function(e) {
		plus.io.resolveLocalFileSystemURL(e, function(entry) {
			var s = entry.toLocalURL() + "?version=" + new Date().getTime();
			console.log(s);
			document.getElementById("usericon").src = s;
			alert(s);
			document.getElementById("usericon").style.borderRadius = "100%";
			//变更大图预览的src
			//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
			//					document.querySelector("#__mui-imageview__group .mui-slider-item img").src = s + "?version=" + new Date().getTime();;;
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(s) {
		console.log("error" + s);
	}, {
		filename: "_doc/head.jpg"
	})
}

function galleryImg() {
	plus.gallery.pick(function(a) {
		plus.io.resolveLocalFileSystemURL(a, function(entry) {
			plus.io.resolveLocalFileSystemURL("_doc/", function(root) {
				root.getFile("head.jpg", {}, function(file) {
					//文件已存在
					file.remove(function() {
						console.log("file remove success");
						entry.copyTo(root, 'head.jpg', function(e) {
								var e = e.fullPath + "?version=" + new Date().getTime();
								document.getElementById("usericon").src = e;
								document.getElementById("usericon").style.borderRadius = "100%";

								//变更大图预览的src
								//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
								//										document.querySelector("#__mui-imageview__group .mui-slider-item img").src = e + "?version=" + new Date().getTime();;
							},
							function(e) {
								console.log('copy image fail:' + e.message);
							});
					}, function() {
						console.log("delete image fail:" + e.message);
					});
				}, function() {
					//文件不存在
					entry.copyTo(root, 'head.jpg', function(e) {
							var path = e.fullPath + "?version=" + new Date().getTime();
							document.getElementById("usericon").src = path;
							document.getElementById("usericon").style.borderRadius = "100%";

							//变更大图预览的src
							//目前仅有一张图片，暂时如此处理，后续需要通过标准组件实现
							//									document.querySelector("#__mui-imageview__group .mui-slider-item img").src = path;
						},
						function(e) {
							console.log('copy image fail:' + e.message);
						});
				});
			}, function(e) {
				console.log("get _www folder fail");
			})
		}, function(e) {
			console.log("读取拍照文件错误：" + e.message);
		});
	}, function(a) {}, {
		filter: "image"
	})
};

document.getElementById("head-img1").addEventListener('tap', function(e) {
	e.stopPropagation();
});

var saveBtn = document.getElementById("savebtn");
saveBtn.onclick = function () {
	
}
function fUpdateDocInfo () {
	
}