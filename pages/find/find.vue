<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<input type="text" value="" class="search" v-model="find" @confirm="search"/>
			<image src="../../static/icons/search.png" class="back-icon" @click="search"></image>
		</view>
		<view class="f-title resInfo f-30" v-if="list.length">
			一共找到{{list.length}}件商品:
		</view>
		<view class="main">
			<view class="items" v-for="(item,index) in list" :key="index">
			<image class="shop-img" :src="item.attributes.img" @click="toDetail(item.id)"></image>
			<text class="shop-title f-title f-28b" @click="toDetail(item.id)">{{item.attributes.name}}</text>
			<text class="shop-info f-info f-24" @click="toDetail(item.id)">{{item.attributes.info}}</text>
			<view class="price">
					<text class="shop-price f-title f-28b">￥{{item.attributes.price}}</text>
					<image src="../../static/icons/addcar.png" class="addcar" @click="addCar(item.attributes)"></image>
			</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				find:'',
				list:[],
			}
		},
		methods: {
			back(){
				uni.navigateBack({
				})
			},
			search(){
				let find = this.find
				let query = new this.$av.Query("goods")
				query.contains('name',find)
				query.find().then((res)=>{
					console.log(res)
					this.list = res
				})
			},
			toDetail(shopid){
				let id = shopid
				uni.navigateTo({
					 url: '../detail/detail?id='+id
				})
			},
		}
	}
</script>

<style>

.header{
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top:var(--status-bar-height);
		width:100%;
		height:80rpx;
		font-size: 40rpx;
		line-height: 80rpx;
		color:#d9c8ad ;
		padding: 0 20rpx;
		box-sizing: border-box;
		border-bottom: 2rpx solid rgba(1,1,1,0.1);
	}
.back-icon{
	width: 40rpx;
	height: 40rpx;
}
.resInfo{
	width: 100%;
	padding: 40rpx 40rpx 0 40rpx;
}
.search{
	background: #fff;
	border-radius: 25rpx;
	width: 500rpx;
	height: 50rpx;
	padding: 0rpx 20rpx;
	box-sizing: border-box;
	font-size: 24rpx;
	line-height: 50rpx;
	border: 1rpx solid rgba(1,1,1,0.1);
}
.main{
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-between;
		flex-wrap: wrap;
		padding: 30rpx;
		box-sizing: border-box;
	}
	.items{
		width:330rpx;
		display: flex;
		align-items: flex-start;
		flex-direction: column;
		height: 600rpx;
	}
	.shop-img{
		width:330rpx;
		height:350rpx;
		border-radius: 20rpx;
		box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
		margin-bottom:20rpx;
	}
	.shop-info{
		padding: 20rpx 0;
	}
	.price{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.addcar{
		width: 36rpx;
		height: 36rpx;
		padding-right: 20rpx;
	}
</style>
