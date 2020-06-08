<template>
	<view>
		<view class="header">
			<image src="../../static/icons/back.png" class="back-icon" @click="back" ></image>
			<text>新增地址</text>
			<view class=""></view>
		</view>
		<input type="text" value="" placeholder="收货人姓名" v-model="name"/>
		<input type="text" value="" placeholder="收货人手机号码" v-model="phone" maxlength="11"/>
		<input type="text" :value="pickerText" placeholder="请选择地区" @focus="openAddres"/>
		<input type="text" value="" placeholder="请输入详细地址" v-model="addressInfo"/>
		<view class="save" @click="save">
			保存
		</view>
		<simple-address ref="simpleAddress" :pickerValueDefault="cityPickerValueDefault" @onConfirm="onConfirm" themeColor="#007AFF"></simple-address>
	</view>
</template>

<script>
import simpleAddress from '@/components/simple-address/simple-address.vue';
	export default {
		components: {
		        simpleAddress
		    },
		data() {
			return {
				 cityPickerValueDefault: [0, 0, 1],
				 pickerText: '',
				 name:"",
				 phone:"",
				 addressInfo:"",
			}
		},
		methods: {
			back(){
				uni.navigateBack({})
			},
			openAddres() {
			            this.cityPickerValueDefault = [0,0,1]
			            this.$refs.simpleAddress.open();
			        },
			        onConfirm(e) {
			            this.pickerText = e.labelArr[0]+e.labelArr[1]+e.labelArr[2];
			},
			save(){
				let name = this.name
				let phone = this.phone 
				let pickerText = this.pickerText
				let addressInfo = this.addressInfo
				let address = {
					name:name,
					phone:phone,
					area:pickerText,
					detail:addressInfo,
				}
				if(name&&phone&&pickerText&&addressInfo){
					if(address.phone.length==11){
						let id = this.$user.current().id
						const obj = this.$av.Object.createWithoutData('_User',id);
						obj.add('address',address);
						obj.save()
						uni.showToast({
							title:"添加地址成功",
							icon:"success",
							duration:3000,
							success:function(){
								uni.navigateBack({
								})
							}
						})
						 console.log("添加成功")
					}else{
					uni.showToast({
						title:"手机号码不正确",
						icon:"none",
						duration:3000,
					})
					}
				}else{
					uni.showToast({
						title:"请填写完整",
						icon:"none",
						duration:3000,
					})
				}
			}
		},
		onLoad(options){
			if(options){
				console.log(options)
				this.name = options.name
				this.phone = options.phone
				this.pickerText = options.area
				this.addressInfo = options.detail
			}
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
		margin-bottom: 100rpx;
	}
.back-icon{
	width: 50rpx;
	height: 50rpx;
}
input{
	margin: 0 auto;
	display: inlin-block;
	width: 600rpx;
	padding-bottom: 10rpx;
	border-bottom: 2rpx solid rgba(1,1,1,0.2);
	margin-top: 40rpx;
	color: #7E8B76;
}
.save{
		text-align: center;
		width: 300rpx;
		height: 70rpx;
		background:#7E8B76;
		border-radius: 10rpx;
		color: #fff;
		line-height: 70rpx;
		margin: 0 auto;
		margin-top: 100rpx;
	}
.uni-input-placeholder{
	color:#aab5a1;
}
</style>
