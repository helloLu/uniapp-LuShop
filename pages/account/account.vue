<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>账号管理</text>
			<view class=""></view>
		</view>
		<view class="main">
			<text class="f-title">修改密码</text>
			<input type="number" value="" placeholder="请输入手机号" v-model="phone" maxlength="11"/>
			<view class="phone">
			<input type="number" class="f-title code" placeholder="请输入验证码" 
			placeholder-class="info-ph" autocomplete="off" maxlength="6" v-model="code">
			<button type="default" :disabled="btnDisabled" class="msg-btn" @click="sendmsg">{{btnText}}</button>
			</view>
			<input type="password" value="" placeholder="请输入新密码" v-model="pwd"/>
			<input type="password" value="" placeholder="请确认新密码" class="pwd" v-model="rpwd"/>
		<view class="logout" @click="save">
			保存
		</view>
		<view class="logout logout-btn" @click="logout">
			登出
		</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnDisabled:false,
				btnText:"验证码",
				pwd:"",
				rpwd:"",
				phone:"",
				code:"",	
			}
		},
		methods: {
			logout(){
				this.$user.logOut()
				uni.reLaunch({
					url:"../login/login"
				})
		},
		back(){
				uni.navigateBack({})
		},
		sendmsg(){
			let phone = this.$user.current().attributes.mobilePhoneNumber
			console.log(phone)
			console.log(this.phone)
			if(this.btnDisabled==false){
				if(this.phone == phone){
					this.getSecond(60);
					this.$user.requestPasswordResetBySmsCode(phone)
				}
			}
			else{
				uni.showToast({
					title:"手机号不正确",
					icon:"none",
					duration:2000
				})
			}
		},
		save(){
			let id = this.$user.current().id
			console.log(name)
			let code = this.code
			let pwd = this.pwd
			let rpwd = this.rpwd
			let that = this
			if(pwd==rpwd){
					this.$user.resetPasswordBySmsCode(code,pwd).then(() => {
						uni.showToast({
							title:"密码修改成功",
							duration:2000,
							success:function(){
							setTimeout(function() {
							                 that.logout()
							                }, 2000)
							}
						})
					}, (error) => {
					  uni.showToast({
					  	title:"验证码不正确",
						icon:"none",
						duration:3000
					  })
					})
			}else{
					uni.showToast({
					title:"两次密码不一致",
					icon:"none",
					duration:2000
					})
			}
		},
		//倒计时
		getSecond(wait){
		    let _this=this;
		    let _wait = wait;
		    if(wait == 0) {
		        this.btnDisabled=false;
		        this.btnText="验证码"
		        wait = _wait;
		    } else {
		        this.btnDisabled=true;
		        this.btnText=wait + "s"
		        wait--;
		        setTimeout(function() {
		                _this.getSecond(wait);
		            },
		            1000);
		    }
		},
	},
	}
</script>

<style>
.header{
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding-top:var(--status-bar-height);
		width:100%;
		height:80rpx;
		font-size: 40rpx;
		line-height: 80rpx;
		color:#d9c8ad ;
		padding: 0 20rpx;
		box-sizing: border-box;
		margin-bottom: 100rpx;
	}
.back-icon{
	width: 50rpx;
	height: 50rpx;
}
input{
	display: inlin-block;
	width: 500rpx;
	padding-bottom: 10rpx;
	border-bottom: 2rpx solid rgba(1,1,1,0.2);
	margin-top: 40rpx;
	color: #7E8B76;
}
.uni-input-placeholder{
	color:#aab5a1;
}
.name{
	margin-bottom: 100rpx;
}
.main{
	display: flex;
	justify-content: center;
	align-items: center;
	flex-direction: column;
}
.logout{
	width: 300rpx;
	height: 80rpx;
	line-height: 80rpx;
	color: #fff;
	background: #7E8B76;
	border-radius: 10rpx;
	text-align: center;
	margin-top: 40rpx;
}
.logout-btn{
	background: #d9c8ad;
}
.pwd{
	margin-bottom: 100rpx;
}
.msg-btn{
	color: #fff;
	background: #7E8B76;
	border-radius: 10rpx;
	height: 60rpx;
	width: 150rpx;
	line-height: 60rpx;
	margin: 0;
	font-size: 30rpx;
}
.phone{
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	width: 500rpx;
}
.msg-btn[disabled] {
  background: #cbd8c1;
  border: 0px;
}
.code{
width: 300rpx;
}
</style>
