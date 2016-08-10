var phoneNumber = document.getElementById("phone");
var msgCode = document.getElementById("msgcode");
var sendCode = document.getElementById("sendcode");
var pwd = document.getElementById("password");
var registerBtn = document.getElementById("register");
var verifynum;

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
//注册函数
registerBtn.onclick = function() {
	fRegister();
}

function fRegister() {
	var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
	if(!phoneReg.test(phoneNumber.value)) {
		mui.toast("请正确输入手机号...");
		return false;
	}
	if(!msgCode.value) {
		mui.toast("请输入短信验证码...");
		return false;
	}
	if(!pwd.value) {
		mui.toast("请输入密码...");
		return false;
	}
	console.log(phoneNumber.value+","+pwd.value+','+msgcode.value+','+localStorage.myType)
	mui.ajax(baseUrl + "/users/signup", {
		data: {
			'SignupForm[mobile]': phoneNumber.value,
			'SignupForm[password]': pwd.value,
			'SignupForm[code]': msgcode.value,
			'SignupForm[type]': localStorage.myType
		},
		dataType: "json",
		type: "post",
		timeout: 6000,
		success: function(data) {
			if(data.success == true) {
				mui.toast("注册成功");
				localStorage.access_token = data.access_token;
				if(localStorage.myType === "doctor") {
					location.href = "personal-doctor-login.html";
				} else {
					location.href = "personal-user-login.html";
				}
			} else {
				mui.toast("注册失败，请重新注册");
			}
		},
		error: function(xhr, type, errorThrown, message) {
			mui.toast("网络连接失败，请稍候再试...");
		}
	})
}

//获取短信验证码函数
function fGetMsgCode() {
	var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
	if(!phoneReg.test(phoneNumber.value)) {
		mui.toast("请正确输入手机号");
	} else {
		mui.ajax(baseUrl + "/users/verify-code", {
			data: {
				mobile: phoneNumber.value
			},
			dataType: "json",
			type: "get",
			timeout: 6000,
			success: function(data) {
				if(data.success == true) {
					timer(sendCode, 60);
					mui.toast("验证码已发送，请注意查收...");
				} else {
					timer(sendCode, 60);
					mui.toast(data.message);
				}
			},
			error: function(xhr, type, errorThrown, message) {
				mui.toast(message);
//				mui.toast("网络连接失败，请稍候再试...");
			}
		})
	}
}

sendCode.onclick = function() {
	fGetMsgCode();
}

var changeVisible = document.getElementById("changevisible");
var visClass;
changeVisible.addEventListener("tap", function() {
	toggleClass(changeVisible, visClass, "visible", "invisible");
})

