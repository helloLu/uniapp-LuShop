<template>
	<view class="content">
		<lunbo class="lunbo"></lunbo>
		<!-- 新品到货栏目 -->
		<view class="classify">
			<!-- 这是标题和全部箭头 -->
			<view class="className">
				<text class="f-title f-36" >新品到货</text>
				<view class="all f-info f-24">
					<text @click="toSearch">全部</text>
					<image  src="../../static/icons/next.png" class="icon"></image>
				</view>
			</view>
			<!-- 这里是四个商品格子 -->
			<view class="shopItem">
				<view class="four"  v-for="(item,index) in newList"  :key="index" @click="toDetail(item.id)">
					<image class="shopImg" :src="item.attributes.img" ></image>
					<view class="shopName f-info">
						{{item.attributes.name}}
					</view>
				</view>
			</view>
		</view>				
		
		<!-- 热销商品栏目 -->
		<view class="classify">
			<!-- 这是标题和全部箭头 -->
			<view class="className">
				<text class="f-title f-36" >热销商品</text>
				<view class="all f-info f-24">
					<text @click="toSearch">全部</text>
					<image  src="../../static/icons/next.png" class="icon"></image>
				</view>
			</view>
			<!-- 这里是四个商品格子 -->
			<view class="shopItem">
				<view class="four"  v-for="(item,index) in hotList"  :key="index" @click="toDetail(item.id)">
					<image class="shopImg" :src="item.attributes.img"></image>
					<view class="shopName f-info">
						{{item.attributes.name}}
					</view>
				</view>
			</view>
		</view>		
				
		<!-- 优质好货栏目 -->
		<view class="classify">
			<!-- 这是标题和全部箭头 -->
			<view class="className">
				<text class="f-title f-36" >优质好货</text>
				<view class="all f-info f-24">
					<text @click="toSearch">全部</text>
					<image  src="../../static/icons/next.png" class="icon"></image>
				</view>
			</view>
			<!-- 这里是四个商品格子 -->
			<view class="shopItem">
				<view class="four"  v-for="(item,index) in goodList"  :key="index" @click="toDetail(item.id)">
					<image class="shopImg" :src="item.attributes.img" ></image>
					<view class="shopName f-info">
						{{item.attributes.name}}
					</view>
				</view>
			</view>
		</view>				
		
		<view class="footer f-info f-30">
			———到底啦———
		</view>
	</view>
	
</template>

<script >
	import lunbo from "components/lunbo.vue"
	export default {
		components:	{lunbo},
		data() {
			return {
				newList:[],
				hotList:[],
				goodList:[],
			}
		},
		computed:{
		},
		methods: {
			toDetail(shopid){
				let id = shopid
				console.log(id)
			uni.navigateTo({
			    url: '../detail/detail?id=' + id
			});
			},
			toSearch(){
				uni.switchTab({
					url:"../search/search"
				})
			},
			comTest(){
		var TestObject = this.$av.Object.extend('TestObject');
		var testObject = new TestObject();
		testObject.set('words', 'Hello MFucker!');
				testObject.save().then(function (testObject) {
				  console.log('保存成功。')
				})
			},
			upload(){
				var that = this
				uni.chooseImage({
					  success: function (res) {
					        console.log(res);
							let tempfile = res.tempFiles[0]
							let tempname = res.tempFiles[0].name
							let file = new that.$av.File(tempname,tempfile)
							file.save().then(function (file) {
							  console.log('文件保存完成。objectId：' + file.id);
							}, function (error) {
							  console.log("保存失败",error)
							});
						}
				})},
		},
		onLoad(){
			const querryNew= new this.$av.Query('goods')
			const querryHot= new this.$av.Query('goods')
			const querryGood= new this.$av.Query('goods')
			let that = this
			querryNew.limit(4);
			querryHot.limit(4);
			querryGood.limit(4);
			querryNew.ascending('createdAt');
			querryHot.equalTo("hotsell",true);
			querryGood.equalTo("quality",true);
			querryNew.find().then((item)=>{
				console.log(that.newList)
				that.newList = item
				})
			querryHot.find().then((item)=>{
				that.hotList = item
				})
			querryGood.find().then((item)=>{
				that.goodList = item
				})
		},
	}
</script>

<style scoped> 
.lunbo{
	width:100%;
}
	.test{
		border-style: solid;
		border-width: 10rpx;
		}
	.test0{
		border-style: solid;
		border-width: 10rpx;
		border-image: linear-gradient(135deg, #FFDEE9 12%, #B5FFFC 40%, #f6ccf7 80%, #b4dfff 100%)1;
		}
    .test1{
		border-style: solid;
		border-width: 10rpx;
		border-image: linear-gradient(62deg, #8EC5FC 0%, #E0C3FC 100%)1;
		}
		
	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		height:100%;
		padding-bottom: 100rpx;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
		flex-wrap:wrap;
	}

	.title {
		width:100%;
		font-size: 36rpx;
		color: #8f8f94;
		margin: 20rpx 0;
		color: white;
	}
	.icon{
		width:36rpx;
		height:36rpx;
	}
	.classify{
		width: 100%;
	}
	.className{
		display:flex;
		justify-content: space-between;
		align-items: flex-end;
		padding: 20rpx;
		padding-bottom:0;
		width: 100%;
		box-sizing: border-box;
	}
	.all{
		display:flex;
		justify-content: space-between;
		align-items: center;
		width: 100rpx;
		line-height: 36rpx;
	}
	.four{
		width: 330rpx;
		margin-bottom: 20rpx;
	}
	.shopImg{
		width:330rpx;
		height:350rpx;
		border-radius: 20rpx;
		box-shadow: 2rpx 4rpx 6rpx 4rpx rgba(1,1,1,0.2);
	}
	.shopItem{
		font-size: 30rpx;
		widht:100%;
		text-align: center;
		display:flex;
		justify-content:space-between;
		align-items: center;
		flex-wrap: wrap;
		padding:10rpx 26rpx;
	}
	.footer{
		margin-top: 70rpx;
		width: 100%;
		text-align: center;
	}
		
</style>
