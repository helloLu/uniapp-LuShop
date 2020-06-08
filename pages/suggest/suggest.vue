<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>意见反馈</text>
			<view class=""></view>
		</view>
		
		<view class="main">
			<text class="count f-info">{{info.length}}/120</text>
			<textarea value="" placeholder="请输入您的反馈" class="info" maxlength="120" v-model="info"/>
		</view>
		
		<view class="save-btn" @click="save">
			提交
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count:0,
				info:"",
			}
		},
		methods: {
			back(){
				uni.navigateBack({})
			},
			save(){
				let obj = new this.$av.Object("suggestion")
				let that = this
				obj.set("info",this.info)
				obj.save().then(()=>{
					uni.showToast({
						title:"提交成功",
						duration:2000,
						success:function(){
							that.info = ''
						}
					})
				})
			}
		}
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
.main{
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	position: relative;
}
.info{
	margin-top: 100rpx;
	width: 600rpx;
	height: 400rpx;
	border-radius:20rpx;
	padding: 20rpx;
	box-sizing: border-box;
	background: #fff;
	color: #7E8B76;
}
.count{
	position: absolute;
	bottom: 20rpx;
	right: 100rpx;
	font-size: 24rpx;
	z-index: 9;
}
.save-btn{
	width: 300rpx;
	height: 80rpx;
	background: #7E8B76;
	color: #fff;
	line-height: 80rpx;
	text-align: center;
	border-radius:10rpx;
	margin: 100rpx auto;
}
</style>
