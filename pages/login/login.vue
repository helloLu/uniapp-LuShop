<template>
	<view>
		<view class="header">
			<text class="title f-title">欢迎登录</text>
			<text class="title f-title">啊卢士多店</text>
		</view>
		<view class="main">
			<input type="number" class="info f-title" placeholder="请输入手机号" 
			placeholder-class="info-ph" autocomplete="off" maxlength="11" v-model="phone">
			<input type="password" class="info f-title" placeholder="请输入密码" placeholder-class="info-ph" autocomplete="off" v-model="pwd">
			<view class="to-login f-sp" @click="toReg">未有帐号？前往注册</view>
		</view>
		<view class="regist-btn" @click="submit">
			登录
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				phone:'',
				pwd:''
			}
		},
		methods: {
			toReg(){
				uni.navigateTo({
					url:'../regist/regist'
				})
			},
			submit(){
				let phone = this.phone
				let pwd = this.pwd
				this.$av.User.logInWithMobilePhone(phone, pwd).then((user) => {
				  // 登录成功
				  console.log("登陆成功")
				  uni.switchTab({
				  	url:"../index/index"
				  })
				}, (error) => {
				  uni.showToast({
				  	title:'账号或密码错误',
					icon:"none",
					duration:2000
				  })
				});
			}
		}
	}
</script>

<style>
.header{
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 100%;
	flex-direction: column;
	font-size: 80rpx;
	padding-top: 100rpx;
	padding-bottom: 50rpx;
}
.main{
	padding:80rpx;
}
.info{
	border-bottom: rgba(1,1,1,0.2) solid 2rpx;
	margin-bottom: 20rpx;
	height: 30rpx;
	padding: 10rpx;
}
.info-ph{
	left: -5rpx;
	color:#aab5a1;
}

.regist-btn{
	height:80rpx;
	width: 350rpx;
	background: #7E8B76;
	color: #fff;
	margin: 0 auto;
	line-height: 80rpx;
	text-align: center;
	border-radius: 10rpx;
	margin-top: 400rpx;
}
.to-login{
	text-align: center;
	font-size: 28rpx;
}
</style>
