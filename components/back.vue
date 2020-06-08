<template>
	<view class="back" @click="back">
		<image src="../static/icons/back.png" mode="" class="back-icon"></image>
	</view>
</template>

<script>
	export default {
		name:"back",
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				uni.navigateBack({
				})
			}
		}
	}
</script>

<style>
 .back{
	 width: 60rpx;
	 height: 60rpx;
	 background: rgba(255,255,255,0.2);
	 border-radius: 50%;
	 display: flex;
	 align-items: center;
	 justify-content: center;
	 margin-top:var(--status-bar-height);
	 position: fixed;
	 top: 0;
	 left: 20rpx;
	 z-index: 999;
 }
 .back-icon{
	 width: 40rpx;
	 height: 40rpx;
 }
</style>
