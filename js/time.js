function fGetTime () {
	var time = new Date();
	var year = time.getFullYear();
	var month = time.getMonth()+1;
	var tdate = time.getDate();
	var hour = time.getHours();
	var minute = time.getMinutes();
	var second = time.getSeconds();
	if (minute<10) minute = "0" + minute;
	if (second<10) second = "0" + second;
	var nowTime = year+"/"+month+"/"+tdate+" "+hour+":"+minute+":"+second;
	return nowTime;
}