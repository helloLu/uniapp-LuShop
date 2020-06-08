<template>
<view class="search">
	<view class="header">
		<view class="useless"></view>
		<text class="header-name">LuStored</text>
		<image src="../../static/icons/search.png" mode="" class="search-icon" @click="toFind"></image>
	</view>
	<view class="classify">
		<text @click="changeTab(index1,item)" v-for="(item,index1) in classList" :key="index1"
		 class="f-30 f-info" :class="[tabIndex==index1?'active':'']">{{item}}</text>
	</view>
	<view class="main">
		<view class="items" v-for="(item,index) in shopList" :key="index">
		<image class="shop-img" :src="item.attributes.img" @click="toDetail(item.id)"></image>
		<text class="shop-title f-title f-28b" @click="toDetail(item.id)">{{item.attributes.name}}</text>
		<text class="shop-info f-info f-24" @click="toDetail(item.id)">{{item.attributes.info}}</text>
		<view class="price">
				<text class="shop-price f-title f-28b">￥{{item.attributes.price}}</text>
				<image src="../../static/icons/addcar.png" class="addcar" @click="addCar(item.attributes)"></image>
		</view>
		</view>
	</view>
	<view class="footer f-info f-30">
		———到底啦———
	</view>
</view>
</template>

<script>
	export default{
		data() {
			return {
				shopList:[],
				tabIndex:0,
				classList:["全部","护肤","数码","家具","优品","热卖"],
				shopItems:[{name:"ILLUME无线台灯",url:"../../static/11.png",price:99,info:"护眼的很，晚上睡觉也能开，绝对不会觉得刺眼难受"},
					{name:"美康粉黛雕花口红",url:"../../static/9.png",price:120,info:"使用起来非常显白，也非常的润唇"},
					{name:"索尼多彩蓝牙耳机",url:"../../static/3.png",price:300,info:"无线蓝牙耳机就是好使，无线出门更方便"},
					{name:"自由补水面膜",url:"../../static/4.png",price:20,info:"这玩意儿就是好用,我已经囤货了不说了敷面膜"},
					{name:"雷柏蓝牙键盘",url:"../../static/7.png",price:199,info:"敲起来非常带感，物超所值啊各位，还静音"},
					{name:"JM茶味香水",url:"../../static/5.png",price:86,info:"闻起来跟喝过茶一样,非常的好闻的说"},
					{name:"SK:LK滋润面霜",url:"../../static/1.png",price:200,info:"好用的不得了滋润不干燥啊，洗完脸就抹上"},
					{name:"宜家舒服简约椅子",url:"../../static/8.png",price:380,info:"有些椅子坐着坐着就睡着了，实在是太舒服了"}
					]
		}
	},
	methods:{
		changeTab(index1,item){
			this.tabIndex=index1
			console.log(item)
			let query = new this.$av.Query("goods")
			let that=this
			if(item=="全部"){
				query.find().then((item)=>{
				that.shopList = item
				console.log(item)
			})
			}
			if(item=="热卖"){
				query.equalTo("hotsell",true)
				query.find().then((item)=>{
					console.log(item)
					that.shopList = item
				})
			}
			if(item=="优品"){
				query.equalTo("quality",true)
				query.find().then((item)=>{
					that.shopList = item
				})
			}
			if(item=="护肤"||item=="数码"||item=="家具"){
					query.equalTo("classify",item)
					query.find().then((item)=>{
					that.shopList = item
				})	
			}
		},
		toFind(){
			uni.navigateTo({
				 url: '../find/find'
			})
		},
		toDetail(shopid){
			let id = shopid
			uni.navigateTo({
				 url: '../detail/detail?id='+id
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
			console.log("购物车")
		}
	},
	onLoad:function(options){
		let that = this
		const query= new this.$av.Query('goods')
		query.find().then((item)=>{
			that.shopList = item
			})	
	}
}
</script>

<style>
	.header-name{
		font-size: 40rpx;
		line-height: 80rpx;
		color:#d9c8ad ;
	}
	.useless{
		width: 40rpx;
	}
	.header{
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top:var(--status-bar-height);
		width:100%;
		height:80rpx;
	}
	.search-icon{
		width: 40rpx;
		height:40rpx;
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
	.classify{
	  padding:0 30rpx;
	  display: flex;
	  width: 100%;
	  height: 50rpx;
	  justify-content: space-between;
	  align-items: center;
	  box-sizing: border-box;
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
	.active{
		color: #7E8B76;
		font-weight: bold;
		font-size: 30rpx;
	}
	.footer{
		margin: 40rpx 0;
		width: 100%;
		text-align: center;
	}
		
</style>
