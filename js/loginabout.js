function toggleClass (e,eclass,aclass,bclass) {
				eclass = e.getAttribute('class');
				if (eclass == aclass) {
					e.setAttribute('class',bclass);
					pwd.type = 'text';
				} else{
					e.setAttribute('class',aclass);
					pwd.type = 'password';
				}
			}

//短信验证码计时器
			function timer(o,t) {
				if(t == 0) {
					o.removeAttribute("disabled");
					o.value = "获取验证码";
					t = 60;
				} else {

					o.setAttribute("disabled", true);
					o.value = "重新发送(" + t + ")";
					t --;
					setTimeout(function() {
							timer(o,t)
						},
						1000)
				}
			}