var phoneNumber = document.getElementById("phone");
var msgCode = document.getElementById("msgcode");
var sendCode = document.getElementById("sendcode");
var registerBtn = document.getElementById("register");
var loginBtn = document.getElementById("login");
var quickLogBtn = document.getElementById("quicklogin");
registerBtn.onclick = function() {
	if(localStorage.myType === "doctor") {
		location.href = "personal-doctor-register.html";
	} else {
		location.href = "personal-user-register.html";
	}
}
loginBtn.onclick = function() {
	if(localStorage.myType === "doctor") {
		location.href = "personal-doctor-login.html";
	} else {
		location.href = "personal-user-login.html";
	}
}
sendCode.addEventListener('tap', function() {
	timer(this, 60);
})

//快速登录函数
quickLogBtn.onclick = function () {
	fQuickLogin();
}
function fQuickLogin () {
	var phoneReg = /^1[3|4|5|7|8]\d{9}$/;
	if(!phoneReg.test(phoneNumber.value)) {
		mui.toast("请正确输入手机号...");
		return false;
	}
	if(!msgCode.value) {
		mui.toast("请输入短信验证码...");
		return false;
	}
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
				if(localStorage.myType === "doctor") {
					location.href = "personal-doctor-login.html";
				} else {
					location.href = "personal-user-login.html";
				}
			} else {
				mui.toast("网络异常，请稍后重试");
			}
		},
		error: function(xhr, type, errorThrown, message) {
			mui.toast("网络连接失败，请稍候再试...");
		}
	})
	
}
//获取短信验证码函数
function fGetMsgCode() {
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
					mui.toast("发送太频繁，请稍后重试...")
				}
			},
			error: function(xhr, type, errorThrown, message) {
				mui.toast("网络连接失败，请稍候再试...");
			}
		})
	}
}

sendCode.onclick = function() {
	fGetMsgCode();
}