<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>我的订单</text>
			<view class=""></view>
		</view>
		<view class="orders" v-for="(item,index) in orderList" :key="index">
			<view class="order-state f-24 f-info">
				<text>编号{{item.id}}</text>
				<text :class="item.attributes.state?'':'f-sp'" class="f-28b">{{item.attributes.state?"支付成功":"支付失败"}}</text>
			</view>
			<view class="goods" v-for="(item2,index2) in item.attributes.shopList" :key="index2">
				<image :src="item2.img" mode="aspectFill" class="shop-img"></image>
				<view class="info">
					<text class="f-30 f-title">{{item2.name}}</text>
					<text class="f-28 f-info">{{item2.info}}</text>
					<text class="f-28 f-info">已选：默认</text>
				</view>
				<view class="price f-title f-32b">
					<text>￥{{item2.price}}</text>
				</view>
			</view>
			<view class="btns f-28">
				<view class="pay-btn" v-if="!item.attributes.state" @click="pay(item.id,item.attributes.total,index)">重新支付</view>
				<view class="del-btn" @click="delOrder(item.id,index)">删除订单</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				orderList:[],
			}
		},
		methods: {
			back(){
				uni.switchTab({
					url:"../my/my"
				})
			},
			delOrder(orderid,index){
				const todo = this.$av.Object.createWithoutData('order',orderid);
				todo.destroy();
				this.orderList.splice(index,1)
			},
			pay(orderid,total,index){
				const todo = this.$av.Object.createWithoutData('order',orderid);
				uni.showModal({
					title:"请支付￥"+total+"元",
					success: (res) => {
						if(res.confirm){
							this.orderList[index].attributes.state  = true
							todo.set("state",true)
							todo.save()
						}
					}
				})
			}
		},
		onShow:function(){
			let id = this.$user.current().id
			let query  = new this.$av.Query("order")
			let that = this
			query.equalTo("user",id)
			query.descending('createdAt')
			query.find().then((res)=>{
				console.log(res)
				that.orderList = res
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
			margin-bottom: 20rpx;
}
.back-icon{
	width: 50rpx;
	height: 50rpx;
}
.orders{
	width: 600rpx;
	margin:40rpx;
	border-radius: 20rpx;
	box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
	padding: 40rpx;
}
.order-state{
	display: flex;
	width: 100%;
	justify-content: space-between;
	align-items: center;
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
.btns{
	display: flex;
	justify-content: flex-end;
	align-items: center;
	margin-top: 20rpx;
}
.del-btn{
	background: #d9c8ad;
	color: #fff;
	width: 150rpx;
	margin-left:20rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 10rpx;
}
.pay-btn{
	background: #7E8B76;
	color: #fff;
	width: 150rpx;
	height: 60rpx;
	line-height: 60rpx;
	text-align: center;
	border-radius: 10rpx;
}
</style>
