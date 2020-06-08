<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" mode="" class="back-icon" @click="back"></image>
			<text>确认订单</text>
			<view class=""></view>
		</view>
		<view class="main">
			<view class="address" @click="toAddress">
				<image src="../../static/icons/dizhi.png" mode="" class="back-icon"></image>
				<view class="select-address">
					<view class="user">
						<text class="name f-title f-30">{{address.name}}</text>
						<text class="phone f-28 f-info">{{address.phone}}</text>
					</view>
					<view class="area">
						<text class="location f-title f-28">{{address.area+address.detail}}</text>
					</view>
				</view>
				<image src="../../static/icons/next.png" mode="" class="back-icon"></image>
			</view>
			<view class="order">
				<view class="goods" v-for="(item,index) in list" :key="index">
					<image :src="item.img" mode="aspectFill" class="shop-img"></image>
					<view class="info">
						<text class="f-30 f-title">{{item.name}}</text>
						<text class="f-28 f-info">{{item.info}}</text>
						<text class="f-28 f-info">已选：默认</text>
					</view>
					<view class="price f-title f-32b">
						<text>￥{{item.price}}</text>
					</view>
				</view>
				<view class="total f-title">
					<text>共计</text>
					<text>￥{{total}}</text>
				</view>
			</view>
			<view class="pay-btn" @click="pay">
				下单
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[],
				total:0,
				address:{},
			}
		},
		methods: {
			back(){
				uni.navigateBack({})
			},
			pay(){
				let id = this.$user.current().id
				let shopList =this.list
				let total = this.total
				const Todo = this.$av.Object.extend('order');
				const order = new Todo()
				order.set("user",id)
				order.set("shopList",shopList)
				order.set("total",total)
				uni.showModal({
					title:"请支付"+this.total+"元",
					success: (pay) => {
						if(pay.confirm){
							let state = true
							order.set("state",state)
						}else{
							let state = false
							order.set("state",state)
						}
						order.save().then((todo) => {
							uni.navigateTo({
								url:"../myOrder/myOrder"
							})
						  console.log(`保存成功。objectId：${todo.id}`);
						});
					}
				})
			},
			toAddress(){
				uni.navigateTo({
					url:"../address/address"
				})
			}
		},
		onLoad: function (options) {
		    let list = JSON.parse(options.list)
			this.total = options.total
		    console.log(list)
			this.list = list
		 },
		onShow:function(){
			let that = this
			uni.getStorage({
				key:"chooseAdd",
				 success: function (res) {
					console.log(res.data);
					that.address = JSON.parse(res.data)
				 }
			})
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
	}
.main{
	display: flex;
	flex-direction: column;
	align-items: center;
}
.back-icon{
	width: 50rpx;
	height: 50rpx;
}
.address{
	width: 600rpx;
	margin: 40rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	border-radius: 20rpx;
	box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
	padding: 40rpx;
}
.select-address{
	width: 400rpx;
	height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
}
.user{
	width: 100%;
	height: 70rpx;
	display: flex;
	justify-content: flex-start;
	align-items: center;
}
.area{
	width: 400rpx;
}
.order{
	width: 600rpx;
	margin:40rpx;
	border-radius: 20rpx;
	box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
	padding: 40rpx;
}
.name{
	margin-right: 20rpx;
}
.pay-btn{
	width: 300rpx;
	height: 70rpx;
	background:#7E8B76;
	color: #fff;
	text-align: center;
	line-height: 70rpx;
	margin-top: 80rpx;
	border-radius: 10rpx;
}
.goods{
	 display: flex;
	 justify-content: space-around;
	 align-items: flex-end;
	 width: 100%;
	 height: 180rpx;
	 padding: 40rpx 0;
	 border-bottom: 2rpx solid rgba(0,0,0,0.1);
		}
	.info{
	width: 280rpx;
	font-size: 24rpx;
	display: flex;
	justify-content: space-around;
	flex-direction: column;
	height: 100%;
	padding-left: 20rpx;
	}
	.shop-img{
		width:180rpx;
		height:180rpx;
		border-radius: 10rpx;
		box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
	}
.total{
	width: 600rpx;
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 40rpx;
}
</style>
