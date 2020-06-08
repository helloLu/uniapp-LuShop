<template class="lunbo">
		<view class="uni-padding-wrap">
		            <view class="page-section swiper">
		                <view class="page-section-spacing">
		                    <swiper class="swiper" autoplay circular indicator-dots>
		                        <swiper-item v-for="(item,index) in swiperItems" :key="index">
		                            <image :src="item.url" mode="widthFix" class="swiper-item" @click="toNext"></image>
		                        </swiper-item>
		                    </swiper>
		                </view>
		            </view>
		 </view>
</template>

<script>
	export default {
		name:"lunbo",
		data() {
			return {
				swiperItems:[{name:"hot",url:"http://lc-MD9wcc6i.cn-n1.lcfile.com/634fd53f40757e37a997/shuma.png",},
				{name:"new",url:"http://lc-MD9wcc6i.cn-n1.lcfile.com/77c6f8bea72a1badf5c6/xinpin.png",},
				{name:"good",url:"http://lc-MD9wcc6i.cn-n1.lcfile.com/3798193c5a69050cbc1f/jiaju.png",},
				{name:"good",url:"http://lc-MD9wcc6i.cn-n1.lcfile.com/80d9174c9cb178ecac57/hufu.png",}]
			};
		},
		methods:{
			toNext(path){
				uni.switchTab({
					url:"../pages/search/search"
				})
			}
		}
	}
</script>

<style>
	.swiper-item{
		width: 100%;
		box-shadow: 0rpx 2rpx 4rpx 2rpx rgba(1,1,1,0.2);
	}
	.swiper{
		width: 100%;
		height: 426rpx;
		border-radius: 0 0 30rpx 30rpx;
		overflow: hidden;
		transform: translateY(0);
	}
	.uni-padding-wrap{
		width: 100%;
		background: rgb(247,249,249);
	}
</style>
