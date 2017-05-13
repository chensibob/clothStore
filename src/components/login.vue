<template>
	<fieldset>
 		<form>
 			<p>帐号： <input type = "text"></p>
 			<p>密码： <input type = "password"></p>
 			<p>
 				<input type = "button" value = "登录" style = "height=20px;width=100px">
 				<input type = "button" value = "注册" style = "height=20px;width=100px">
 			</p>
 		</form>
 	</fieldset>
</template>

<script>

</script>

<style type="text/css">
	/**{margin: 0; padding: 0}*/
	fieldset{
		width: 300px;
		padding: 30px;
		margin: 100px auto;
	}
	fieldset p{
		line-height: 50px;
		text-align: center;
	}
	fieldset input[type = "button"]{
		padding-left: 5px;
		padding-right: 5px;
	}
</style>
