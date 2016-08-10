var phoneNumber = document.getElementById("phone");
var pwd = document.getElementById("password");
var changeVisible = document.getElementById("changevisible");
var loginBtn = document.getElementById("login");
var forgetPwd = document.getElementById("forgetpwd");
var visClass;
changeVisible.addEventListener("tap", function() {
	toggleClass(changeVisible, visClass, "visible", "invisible");
})

function toggleClass(e, eclass, aclass, bclass) {
	eclass = e.getAttribute('class');
	if(eclass == aclass) {
		e.setAttribute('class', bclass);
		pwd.type = 'text';
	} else {
		e.setAttribute('class', aclass);
		pwd.type = 'password';
	}
}

//短信验证码计时器
function timer(o, t) {
	if(t == 0) {
		o.removeAttribute("disabled");
		o.value = "获取验证码";
		t = 60;
	} else {

		o.setAttribute("disabled", true);
		o.value = "重新发送(" + t + ")";
		t--;
		setTimeout(function() {
				timer(o, t)
			},
			1000)
	}
}
//跳转至忘记密码页面
forgetPwd.onclick = function  () {
	if (localStorage.myType === "doctor") {
		location.href = 'personal-doctor-forgetpwd.html';
	} else{
		location.href = 'personal-user-forgetpwd.html';
	}
}

//登录函数
loginBtn.onclick = function  () {
	fLogin();
}
function fLogin () {
	var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
	if(!phoneReg.test(phoneNumber.value)) {
		mui.toast("请正确输入手机号...");
		return false;
	}
	if(!pwd.value) {
		mui.toast("请输入密码...");
		return false;
	}
	mui.ajax(baseUrl + "/users/login", {
		data: {
			'LoginForm[mobile]': phoneNumber.value,
			'LoginForm[password]': pwd.value
		},
		dataType: "json",
		type: "post",
		timeout: 6000,
		success: function(data) {
			if(data.success == true) {
				location.href = "tab-webview-main.html";
			} else {
				mui.toast("网络异常，请稍后重试...");
			}
		},
		error: function(xhr, type, errorThrown, message) {
			mui.toast("网络连接失败，请稍候再试...");
		}
	})
}