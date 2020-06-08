<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>关于</text>
			<view class="back-ico">
				
			</view>
		</view>
		<view class="main f-title">
			<image src="http://lc-MD9wcc6i.cn-n1.lcfile.com/2e5e6c6a566073e6e4de/none.png" mode="widthFix" class="none">
			</image>
			<text>版本：v1.0</text>
			<text>开发者：卢灿辉</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		methods: {
			back(){
				uni.navigateBack({})
			},
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
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 500rpx;
	flex-direction: column;
}
.none{
	width: 300rpx;
	height: 300rpx;
}
</style>
