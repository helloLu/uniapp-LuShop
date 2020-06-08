<script>
	export default {
		data(){
			return {
			}
		},
		onLaunch: function() {
			console.log('App Launch')
			let user = this.$user.current()
			if (user) {
			  // 跳到首页
			  console.log(user)
			} else {
			  // 显示注册或登录页面
			   uni.navigateTo({
			       url: './pages/login/login'
			   });
			}
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	html,body,#app{
		background: rgb(247,249,249);
	}
	.f-mid{
	text-align: center;
	}
	.f-title{
	color: #7E8B76;
	}
	.f-info{
	color:#aab5a1;
	}
	.f-sp{
	color:#d9c8ad;
	}
	.f-f{
	 color: #ffffff;
	}
	.f-28{
	font-size: 28rpx;
	}
	.f-28b{
	font-size: 28rpx;
	font-weight: bold;
	}
	.f-24{
		font-size: 24rpx;
	}
	.f-30{
		font-size: 30rpx;
	}
	.f-32b{
		font-size: 32rpx;
	     font-weight: bold;
		 }
	.f-36{
		font-size: 36rpx;
	}
	/*每个页面公共css */
</style>
