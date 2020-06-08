<template>
	<view class="detail">
	<back class="back"></back>
	<view class="tocar" @click="tocar">
		<image src="../../static/icons/cart.png" mode="" class="tocar-icon"></image>
	</view>
	<video 
	:src="detail.video" 
	controls class="video" autoplay loop></video>	
		<!-- 这是购买栏目 -->
	<view class="test">
		<view class="buy">
			<view class="shop-info f-title">
				<text class="name">{{detail.name}}</text>
				<text class="price">￥{{detail.price}}.00</text>
			</view>
			<view class="btns f-info f-24">
				<view class="addcar btn" @click="addCar(detail)">
					<image src="../../static/icons/cart.png" class="btn-icon" ></image>
					<view>购物车</view>
				</view>
				<view class="tobuy btn" @click="toOrder(detail)">
					<image src="../../static/icons/car.png" class="btn-icon"></image>
					<view>下单</view>
				</view>
			</view>
		</view>
		<!-- 这里是商品图片介绍 -->
		<view class="shop-detail">
			<view class="f-sp f-mid line">
				——— 商品详情 ———
			</view>
			<image class="shop-detail-img" :src="detail.detailImg" mode="widthFix"></image>
		</view>
	</view>
	</view>
</template>

<script>
	import back from "components/back.vue"
	export default {
		components:{back},
		data() {
			return {
				detail:{},
			}
		},
		methods: {
			tocar(){
				uni.switchTab({
					 url: '../car/car'
				})
			},
			addCar(shopItem){
				let userid = this.$user.current().id
				const addcar = this.$av.Object.createWithoutData('_User',userid);
				addcar.add('car',shopItem);
				addcar.save()
				uni.showToast({
					title:"添加购物车成功",
					icon:"success",
					duration:3000
				})
			},
			toOrder(shopItem){
				let list = [{
					name:shopItem.name,
					info:shopItem.info,
					price:shopItem.price,
					img:shopItem.img
				}]
				list = JSON.stringify(list)
				let total = shopItem.price
				uni.navigateTo({
					url:'../order/order?list='+list+'&total='+total
				})
			}
		},
		onLoad(options) {
			let id = options.id
			let query = new this.$av.Query('goods')
			let that = this
			query.get(id).then((item)=>{
			that.detail = item.attributes
			})
		}
	}
</script>

<style>
	.tocar{
		position: fixed;
		top: 0;
		right: 20rpx;
		z-index: 999;
		width: 60rpx;
		height: 60rpx;
		background: rgba(255,255,255,0.2);
		border-radius: 50%;
		display: flex;
		align-items: center;
		justify-content: center;
		margin-top:var(--status-bar-height);
	}
	.tocar-icon{
		width: 50rpx;
		height: 50rpx;
	}
	.test{
		z-index: 99;
	}
	.video{
		width: 100vw;
		height: 177vmin;
		background: #2C405A;
		z-index: -1;
		position: fixed;
		top: 0;
		left: 0;
	}
	.buy{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
		height: 100%;
		border-radius: 20rpx 20rpx 0 0;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.shop-info{
		display: flex;
		justify-content: center;
		flex-direction: column;
		height: 130rpx;
		width: 400rpx;
	}
	.btns{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 130rpx;
		width: 200rpx;
	}
	.btn{
		width: 80rpx;
		height: 100%;
		text-align: center;
	}
	.btn-icon{
		height: 80rpx;
		width: 80rpx;
	}
	.shop-detail-img{
		width: 100%;
		height: 1rpx;
	}
	.line{
		margin: 40rpx 0;
	}
	.test{
		margin-top: 178vmin;
		width: 100%;
		height: 100%;
	}
</style>
