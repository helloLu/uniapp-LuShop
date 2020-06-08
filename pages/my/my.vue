<template>
	<view class="container">
		<image src="http://lc-MD9wcc6i.cn-n1.lcfile.com/1502eec8fae2ae378816/bg.png" 
		mode="widthFix" class="header"></image>
		<image :src="head" mode="aspectFill" class="head" @click="changeHead" v-if="head"></image>
		<view class="no-head"  @click="changeHead" v-if="!head">
			<image src="../../static/icons/touxiang.png" class="no-head-img"></image>
		</view>
		<text class="name f-title f-36">{{name}}</text>
		<view class="main">
			<view class="list f-title f-36" v-for="(item,index) in list" :key="index" @click="toNext(item.path)">
				<view class="title">
					<image :src="item.icon" class="icon title-icon"></image>
					<text>{{item.title}}</text>
				</view>
				<image src="../../static/icons/next.png" class="icon"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		data(){
			return {
				list:[{title:"订单管理",icon:"../../static/icons/dingdan.png",path:"../../pages/myOrder/myOrder"},
				{title:"地址管理",icon:"../../static/icons/dizhi.png",path:"../../pages/address/address"},
				{title:"账号管理",icon:"../../static/icons/geren.png",path:"../../pages/account/account"},
				{title:"意见反馈",icon:"../../static/icons/fankui.png",path:"../../pages/suggest/suggest"},
				{title:"关于",icon:"../../static/icons/guanyu.png",path:"../../pages/about/about"},],
				name:'',
				head:'',
				id:'',
			}
		},
		methods:{
			changeHead(){
				let that = this
				uni.chooseImage({
				    count: 1, //默认9
				    sizeType: ['compressed'], //压缩图
				    sourceType: ['album'], //从相册选择
				    success: function (res) {
				        console.log(res);
						let img = res.tempFiles[0]
						let imgName = res.tempFiles[0].name
						let file = new that.$av.File(imgName,img)
						file.save().then((file) => {
						 that.head = file.attributes.url
						 let name = that.name
						 let id = that.id
						 const todo = that.$av.Object.createWithoutData('_User',id);
						 todo.set('head',file.attributes.url);
						 todo.save();
						}, (error) => {
						  // 保存失败，可能是文件无法被读取，或者上传过程中出现问题
						});
				    }
				});
			},
			toNext(path){
				uni.navigateTo({
					url:path
				})
			}
		},
		onLoad() {
			let that = this
			let user = this.$user.current()
			let query = new this.$av.Query('_User');
			if(user){
				let id = user.id
				this.id = id
				query.get(id).then((todo) => {
				  that.name  = todo.get('username');
				  that.head  = todo.get('head');
				});
			}
		}
	}
</script>

<style>
	.container{
		width: 100%;
	}
	.header{
		width: 100%;
		height: 1rpx;
	}
	.head{
		width: 180rpx;
		height: 180rpx;
		position: absolute;
		transform: translate(-50%,0);
		left: 50%;
		top: 280rpx;
		border-radius: 50%;
		border: 26rpx solid rgba(170,181,161,0.5);
	}
	.no-head{
		width: 180rpx;
		height: 180rpx;
		position: absolute;
		transform: translate(-50%,0);
		left: 50%;
		top: 280rpx;
		border-radius: 50%;
		border: 26rpx solid rgba(170,181,161,0.5);
		background: #d9c8ad;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.no-head-img{
		width: 128rpx;
		height: 128rpx;
	}
	.name{
		display: block;
		margin-top: 90rpx;
		width: 100%;
		text-align: center;
	}
	.main{
		width: 100%;
		padding: 40rpx;
		box-sizing: border-box;
	}
	.list{
	width: 100%;
	display: flex;
	justify-content: space-between;
	align-items: center;
	height: 40rpx;
	padding: 40rpx 0;
	border-bottom: 1rpx solid rgba(0,0,0,0.1);
	}
	.title{
		display: flex;
		align-items: center;
	}
	.icon{
		width: 60rpx;
		height: 60rpx;
	}
	.title-icon{
		margin-right: 40rpx;
	}
</style>
