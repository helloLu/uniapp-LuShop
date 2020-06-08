<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>我的地址</text>
			<view class=""></view>
		</view>
		<view class="main" v-for="(item,index) in addList" :key="index">
			<view class="select-status">
				<image src="../../static/icons/selected.png" class="unselect-icon" v-if="tabIndex==index" ></image>
				<image src="../../static/icons/unselect.png" class="unselect-icon" v-if="tabIndex!==index"></image>
			</view>
			<view class="select-address" @click="changeTab(index)">
				<view class="user">
					<text class="name f-title f-30">{{item.name}}</text>
					<text class="phone f-28 f-info">{{item.phone}}</text>
				</view>
				<view class="area">
					<text class="location f-title f-28">{{item.area+item.detail}}</text>
				</view>
			</view>
			<view class="f-28 f-title" @click="editAdd(item.name,item.phone,item.area,item.detail)">
				编辑
			</view>
			<view class="del f-28" @click="delAdd(index)">
				删除
			</view>
		</view>
		<view class="add-btn" @click="toAdd">
			新增地址
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				addList:[],
				tabIndex:0,
				id:'',
				ifOnShow:false,
			}
		},
		methods: {
			toAdd(){
				uni.navigateTo({
					url:"../newAddress/newAddress"
				})
			},
			editAdd(name,phone,area,detail){
				uni.navigateTo({
					url:'../newAddress/newAddress?edit=true&name='+name+"&phone="+phone+"&area="+area+"&detail="+detail
				})
			},
			back(){
				let i = this.tabIndex
				let chooseAdd = JSON.stringify(this.addList[i])
				uni.setStorage({
					key:"chooseAdd",
					data:chooseAdd,
					success: function () {
					 uni.navigateBack({})
					}
				})
			},
			changeTab(index){
				this.tabIndex = index
			},
			delAdd(index){
				let i = index
				this.addList.splice(i, 1)
				let list = this.addList
				console.log(list)
				const todo = this.$av.Object.createWithoutData('_User',this.id);
				todo.set('address',list);
				todo.save();
				this.tabIndex = 0
			},
			getAdd(){
				let id = this.$user.current().id
				this.id= id
				let query = new this.$av.Query("_User")
				let that = this
				query.get(id).then((item)=>{
					console.log(item)
					that.addList = item.attributes.address
				})
			}
		},
		onHide(){
		       console.log('this.ifOnShow=true')
		       this.ifOnShow=true
		    },
		onShow:function(){
			 if(this.ifOnShow){
					  this.getAdd()
			       }
			this.getAdd()
		},
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
			margin-bottom: 100rpx;
		}
	.main{
		display: flex;
		align-items: center;
		justify-content: flex-start;
		margin-top: 40rpx;
		padding: 0 20rpx;
	}
	.add-btn{
		text-align: center;
		width: 200rpx;
		height: 70rpx;
		background:#7E8B76;
		border-radius: 10rpx;
		color: #fff;
		line-height: 70rpx;
		margin: 0 auto;
		margin-top: 100rpx;
	}
	.back-icon{
		width: 50rpx;
		height: 50rpx;
	}
.select-address{
	width: 400rpx;
	height: 150rpx;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	align-items: flex-start;
	margin: 0 40rpx;
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
.del{
	color: #ce0000;
	margin-left: 40rpx;
}
.unselect-icon{
	width: 40rpx;
	height: 40rpx;
}
</style>
