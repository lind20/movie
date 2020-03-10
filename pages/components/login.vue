<template>
	<view class="login">
		<view class="cu-list menu">
			<view class="login_image">
				<image src="../../static/img/login1.jpg" mode=""></image>
			</view>
			<form @submit="handleFormSubmit">
				<view class="cu-form-group margin-top">
					<view class="title">账 号</view>
					<input placeholder="请输入账号" name="input"></input>
				</view>
				<view class="cu-form-group">
					<view class="title">密 码</view>
					<input placeholder="请输入密码" name="input"></input>
				</view>
				<view class="padding flex flex-direction">
					<button class="cu-btn bg-gradual-blue margin-tb-sm lg" type="primary" form-type="submit">登录</button>
				</view>
			</form>
			<view class="login_assist">
				<view class="text">
					第三方账号登录
				</view>
				<view class="image">
					<image src="../../static/img/QQ.png" mode=""></image>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default{
		methods:{
			getStorageUserInfo(){
				const _this = this;
				const isLogin = uni.getStorageSync('isLogin')
				if(isLogin==1){
					_this.showLoginBtn = false
					const userInfo = uni.getStorageSync('globalUser')
					_this.userInfo = userInfo
				}
			},
			updateUserInfo(obj){
				const userInfo = obj
				const renderUserInfo = {
					avatar:userInfo.avatar,
					nickname:userInfo.nickname,
					age:userInfo.age,
					gender:userInfo.gender,
					uuid:userInfo.uuid
				}
				app.globalData.userInfo = renderUserInfo
				uni.setStorageSync('globalUser',renderUserInfo)
				this.hideModel()
				this.userInfo = renderUserInfo
				this.showLoginBtn = false
			},
			handleFormSubmit(e){
				const _this = this;
				const username = e.detail.value.username;
				const password = e.detail.value.password;
				
				if(username.length < 3 || username.length > 10){
					uni.showToast({
						icon:'none',
						title:'账号 3~10个字符'
					})
					return;
				}
				if(password.length < 3 || password.length > 15){
					uni.showToast({
						icon:'none',
						title:'密码最短为 3~15 个字符'
					});
					return;
				}
				
				//发送注册/登录的请求
				uni.request({
					url:'https://h5sm.com/uni/users/loginAndRegister',
					data:{
						'username':username,
						'password':password
					},
					method:'POST',
					success: (res) => {
						if(res.statusCode == 200){
							if(res.data.status == 1){
								//保存用户信息到全局的缓存中
								uni.setStorageSync('isLogin',res.data.status)
								_this.updateUserInfo(res.data.msg)
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
							}
						}else{
							uni.showToast({
								title:'服务器错误',
								duration:2000,
								image:'../../static/img/error.png'
							})
						}
					}
				})
			}
		}
	}
</script>

<style lang="less">
	.login{
		.cu-form-group .title {
			min-width: calc(4em + 15px);
		}
		.login_image{
			display: flex;
			width: 100%;
			height: 100%;
			margin: 80rpx 0;
			justify-content: center;
			align-items: center;
			image{
				width: 150rpx;
				height: 150rpx;
				border-radius: 50%;
			}
		}
		.login_assist{
			width: 100%;
			font-size: 25rpx;
			color: #B1ADAD;
			text-align: center;
			.image{
				width: 50rpx;
				height: 50rpx;
				border: 1px solid skyblue;
				margin: 20rpx auto;
				border-radius: 50%;
				image{
					width: 100%;
					height: 100%;
				}
			}
		}
		
		.DrawerClose {
			position: absolute;
			width: 40vw;
			height: 100vh;
			right: 0;
			top: 0;
			color: transparent;
			padding-bottom: 30upx;
			display: flex;
			align-items: flex-end;
			justify-content: center;
			background-image: linear-gradient(90deg, rgba(0, 0, 0, 0.01), rgba(0, 0, 0, 0.6));
			letter-spacing: 5px;
			font-size: 50upx;
			opacity: 0;
			pointer-events: none;
			transition: all 0.4s;
		}
		
		.DrawerClose.show {
			opacity: 1;
			pointer-events: all;
			width: 15vw;
			color: #fff;
		}
		
		.DrawerPage .cu-bar.tabbar .action button.cuIcon {
			width: 64upx;
			height: 64upx;
			line-height: 64upx;
			margin: 0;
			display: inline-block;
		}
		
		.DrawerPage .cu-bar.tabbar .action .cu-avatar {
			margin: 0;
		}
		
		.DrawerPage .nav {
			flex: 1;
		}
		
		.DrawerPage .nav .cu-item.cur {
			border-bottom: 0;
			position: relative;
		}
		
		.DrawerPage .nav .cu-item.cur::after {
			content: "";
			width: 10upx;
			height: 10upx;
			background-color: currentColor;
			position: absolute;
			bottom: 10upx;
			border-radius: 10upx;
			left: 0;
			right: 0;
			margin: auto;
		}
		
		.DrawerPage .cu-bar.tabbar .action {
			flex: initial;
		}
	}
</style>
