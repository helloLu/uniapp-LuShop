<template>
	<view class="content">
		<view class="header">
			<text>购物车</text>
		</view>
		<view class="main">
			<view class="count f-title f-28b">
				<text class="f-info">共{{carList.length}}个</text>
				<text @click="clear">清空</text>
			</view>
			<view class="none" v-if="carList.length==0">
				<image src="http://lc-MD9wcc6i.cn-n1.lcfile.com/2e5e6c6a566073e6e4de/none.png" 
				mode="widthFix" class="none-img"></image>
				<text class="f-info">空空如也</text>
			</view>
			<view class="goods" v-for="(item,index) in carList" :key="index" v-if="carList.length">
				<view class="select-status"  @click="choose(index,item.price)">
					<image src="../../static/icons/selected.png" class="unselect-icon" v-if="chooseItems.includes(index)" ></image>
					<image src="../../static/icons/unselect.png" class="unselect-icon" v-if="!chooseItems.includes(index)"></image>
				</view>
				<image :src="item.img" mode="aspectFill" class="shop-img"  @click="choose(index,item.price)"></image>
				<view class="info"  @click="choose(index,item.price)">
					<text class="f-30 f-title">{{item.name}}</text>
					<text class="f-28 f-info">{{item.info}}</text>
					<text class="f-28 f-info">已选：默认</text>
				</view>
				<view class="price f-title f-32b">
					<image src="../../static/icons/del.png" class="del" @click="del(index)"></image>
					<text>￥{{item.price}}</text>
				</view>
			</view>
			
		</view>
		<view class="footer">
			<view class="total f-28 f-f">
				<text>总计:￥{{total}}.00</text>
				<text class="confirm" @click="toOrder">下单</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
		 return{
			 carList:[],
			 chooseItems:[],
			 total:0,
			 userid:'',
			}
		 },
		 methods:{
			choose(index,price){
				let tempIndex = this.chooseItems.indexOf(index)
				//大于-1表示已经选中了，要消除选中
				if (tempIndex > -1) {
					this.chooseItems.splice(tempIndex, 1)
					this.total = this.total-price
				}else{
					this.chooseItems.push(index)
					this.total = this.total+price
				}
			},
			clear(){
				let that = this
				uni.showModal({
					title:"要清空购物车吗？",
					success: (sure) => {
						console.log(sure)
						if(sure.confirm){
							const todo = this.$av.Object.createWithoutData('_User',this.userid);
							todo.set('car',[]);
							todo.save();
							that.carList = []
							that.total = 0
						}
					}
				})
			},
			del(index){
				let i = index
				let that = this
				uni.showModal({
					title:"要移除这一件商品吗？",
					success: (sure) => {
						if(sure.confirm){
							const todo = this.$av.Object.createWithoutData('_User',this.userid);
							that.carList.splice(i, 1)
							todo.set('car',that.carList);
							todo.save();
						}
					}
				})
			},
			toOrder(){
					let orderItems = []
					let tempList = this.carList
					let chooseList = this.chooseItems
					for(let i = 0;i<chooseList.length;i++){
						let index = chooseList[i]
						orderItems.push(tempList[index])
					}
					let parames = JSON.stringify(orderItems)
					let total = this.total
					console.log(total)
					uni.navigateTo({
						url:"../order/order?list="+parames+"&total="+total
					})
			}
		 },
		 onShow() {
		 	let userid = this.$user.current().id
			this.userid = userid
			let query = new this.$av.Query("_User")
			let that = this
			query.get(userid).then((todo) => {
				that.carList = todo.attributes.car
			})
		 }
	 }
</script>

<style>
	.none{
		width: 100%;
		margin-top: 20%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-items: center;
	}
	.none-img{
		width: 300rpx;
		height: 300rpx;
	}
	.header{
		display: flex;
		justify-content: center;
		align-items: center;
		padding-top:var(--status-bar-height);
		width:100%;
		height:80rpx;
		font-size: 40rpx;
		line-height: 80rpx;
		color:#d9c8ad ;
	}
	.main{
		padding: 40rpx 20rpx 150rpx 20rpx;
	}
	.count{
		display: flex;
		justify-content: space-between;
		align-items: center;
		width: 100%;
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
	.footer{
		position:fixed;
		right: 0;
		bottom: 0rpx;
		width: 100%;
		height:200rpx;
		border-radius: 10rpx 10rpx 0 0rpx;
		background: #7E8B76;
		text-align: center;
		display: flex;
		justify-content: center;
		padding-bottom: constant(safe-area-inset-bottom);  
		padding-bottom: env(safe-area-inset-bottom); 
	}
	.total{
		padding-top: 10rpx;
		width: 80%;
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 80rpx;
	}
	.select-status{
		height: 100%;
		width: 40rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.unselect-icon{
		width: 40px;
		height: 40rpx;
	}
	.confirm{
		padding: 10rpx 10rpx;
		background: #d9c8ad;
		border-radius: 10rpx;
		height: 40rpx;
		width: 120rpx;
	}
	.price{
		height: 100%;
		justify-content: space-between;
		display: flex;
		flex-direction: column;
		align-items: flex-end;
	}
	.del{
		height: 34rpx;
		width: 34rpx;
	}
</style>
