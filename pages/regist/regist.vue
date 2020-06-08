<template>
	<view>
		<view class="header">
			<text class="title f-title">欢迎注册</text>
			<text class="title f-title">啊卢士多店</text>
		</view>
		<view class="main">
			<input type="text" class="info f-title" placeholder="请输入昵称" placeholder-class="info-ph" autocomplete="off" maxlength="8" v-model="name">
			<input type="number" class="info f-title" placeholder="请输入手机号" 
			placeholder-class="info-ph" autocomplete="off" maxlength="11" v-model="phone">
			<view class="phone">
			<input type="number" class="info f-title" placeholder="请输入验证码" 
			placeholder-class="info-ph" autocomplete="off" maxlength="6" v-model="code">
			<button type="default" :disabled="btnDisabled" class="msg-btn" @click="sendMessage">{{btnText}}</button>
			</view>
			<input type="password" class="info f-title" placeholder="请输入密码" placeholder-class="info-ph" autocomplete="off" v-model="pwd">
			<input type="password" class="info f-title" placeholder="请确认密码" placeholder-class="info-ph" autocomplete="off" v-model="cpwd">
			<view class="to-login f-sp" @click="toLogin">已有帐号？点此登录</view>
		</view>
		<view class="regist-btn" @click="submit">
			注册
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				btnText:'验证码',
				btnDisabled:false,//按钮能用
				phone:'',
				code:'',
				name:'',
				pwd:'',
				cpwd:'',
			}
		},
		methods: {
			//发送验证码
			 sendMessage(){
				 if(this.phone.length==11){
			                if(this.btnDisabled==false){
			                   this.getSecond(60);
							   let phone = '+86' + this.phone
							   console.log(phone)
							   this.$av.Cloud.requestSmsCode({
							      mobilePhoneNumber: phone,
							      name: '验证码',
							      op: '手机认证',
							      ttl: 5 // 验证码有效时间为 10 分钟
							   }).then(function(){
							      // 调用成功
							   }, function(err){
							      console.log("发送失败",err)
							   });
			                }
			            }else{
					uni.showToast({
						icon:"none",
					    title: '请输入正确的手机号',
					    duration: 2000
					});
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
				submit(){
					let code = this.code
					let pwd = this.pwd
					let cpwd = this.cpwd
					let name = this.name
					let phone = this.phone
					let phoneReady = false
					const user = new this.$av.User();
					//正则 名字不能含有特殊符号
					var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>《》/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
					//判断表单不为空
					if(phone&&name&&code&&pwd&&cpwd){
						this.$av.Cloud.verifySmsCode(code, phone).then(function(){
						    phoneReady = true 
							console.log("验证",phoneReady)
							if(nameTest==false&&pwdTest&&phoneReady){
								user.setUsername(name);
								user.setPassword(pwd);
								user.setMobilePhoneNumber(phone);
								user.signUp().then((user) => {
								  // 注册成功
								  console.log(`注册成功。objectId：${user.id}`);
								  uni.showToast({
								  	icon:"success",
								  	title:"注册成功",
								  	duration:3000
								  })
								}, (error) => {
								  // 注册失败（通常是因为用户名已被使用）
								  uni.showToast({
								  	icon:"none",
								  	title:"用户已存在",
								  	duration:3000
								  })
								});
							}
						}, function(err){
						   // 验证失败
						   console.log("验证失败",err)
						   uni.showToast({
						   icon:"none",
						   title:"验证码不正确",
						   duration:3000
						   })
						});
						let nameTest = pattern.test(name)
						let pwdTest = pwd==cpwd
						
						if(nameTest){
							uni.showToast({
							icon:"none",
							title:"名字不可用",
							duration:3000
							})
						}
						if(!pwdTest){
							uni.showToast({
							icon:"none",
							title:"两次密码不一致",
							duration:3000
							})			
									}
						console.log(phoneReady)
						
					}else{
						uni.showToast({
							icon:"none",
							title:"请填写完整",
							duration:3000
						})
					}
				},
				toLogin(){
					uni.navigateTo({
						url:'../login/login'
					})
				}
		},
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
	align-items: flex-start;
}
.msg-btn[disabled] {
  background: #cbd8c1;
  border: 0px;
}
.regist-btn{
	height:80rpx;
	width: 350rpx;
	background: #d9c8ad;
	color: #fff;
	margin: 0 auto;
	line-height: 80rpx;
	text-align: center;
	border-radius: 10rpx;
	margin-top: 100rpx;
}
.to-login{
	text-align: center;
	font-size: 28rpx;
}
</style>
