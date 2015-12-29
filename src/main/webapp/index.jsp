<html>
<head>
<script src="js/jquery-1.11.3.js" type="text/javascript"></script>
<script type="text/javascript">
	var aj = $.ajax({
		url : '/json?name=123',// 跳转到 action  
		type : 'get',
		dataType : 'json',
		success : function(data) {
			alert(data);
		},
		error : function() {
			// view("异常！");  
			alert("异常！");
		}
	});
</script>
</head>
<body>
	<h2>Hello World!</h2>
</body>
</html>
