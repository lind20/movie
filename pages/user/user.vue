<template>
	<view class="user">
		<scroll-view scroll-y class="DrawerPage" :class="modalName=='viewModal'?'show':''">
			<!-- 头部 -->
			<view class="bg-olive light padding radius text-center drc">
				<view class="text-lg text-bold">个人中心</view>
			</view>
			
			<!-- 登录 开始 -->
			<view class="cu-list menu-avatar" v-if="showLoginBtn">
				<view class="cu-item" @tap="showModal" data-target="viewModal">
					<view class="cu-avatar bg-white" data-target="DialogModal1" style="background-image:url('/static/img/userdefault.png');"></view>
					<view class="content">
						<view class="text-grey">登录 / 注册</view>
					</view>
				</view>
			</view>
			<!-- 登录 结束 -->
			
			<!-- 上传头像弹窗  开始-->
			<view class="cu-modal" :class="modalName=='DialogModal1'?'show':''">
				<view class="cu-dialog">
					<view class="cu-bar bg-white justify-end">
						<view class="content">修改头像</view>
						<view class="action" @tap="hideModal">
							<text class="cuIcon-close text-red"></text>
						</view>
					</view>
					<view>
						<view class="cu-bar bg-white">
							<view class="action">
								图片上传
							</view>
							<view class="action">
								{{imgList.length}}/4
							</view>
						</view>
						<view class="cu-form-group">
							<view class="grid col-4 grid-square flex-sub">
								<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								 <image :src="imgList[index]" mode="aspectFill"></image>
									<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
										<text class='cuIcon-close'></text>
									</view>
								</view>
								<view class="solids" @tap="ChooseImage" v-if="imgList.length<4">
									<text class='cuIcon-cameraadd'></text>
								</view>
							</view>
						</view>
					</view>
					<view class="cu-bar bg-white justify-end">
						<view class="action">
							<button class="cu-btn line-green text-green" @tap="hideModal">取消</button>
							<button class="cu-btn bg-green margin-left" @tap="handleImgUpLoad">确定</button>
			
						</view>
					</view>
				</view>
			</view>
			<!-- 上传头像弹窗  结束-->
			
			<view class="cu-list menu mtop" v-if="!showLoginBtn">
				<view class="cu-item">
					<view class="cu-avatar bg-white" @tap="showModal" data-target="DialogModal1" :style="[{backgroundImage:'url('+userInfo.avatar+')'}]"></view>
					<view class="content">
						<view class="text-grey">头像</view>
					</view>
				</view>
				<view class="cu-item menu-avatar">
					<view class="content">
						<text class="lg text-orange cuIcon-people"></text>
						<text class="text-red">昵称</text>
					</view>
					<view class="text-gray">
						<text>{{userInfo.nickname}}</text>
					</view>
				</view>
				<view class="cu-item menu-avatar">
					<view class="content">
						<text class="lg text-orange cuIcon-like"></text>
						<text class="text-red">性别</text>
					</view>
					<view class="text-gray">
						<text>{{userInfo.gender}}</text>
					</view>
				</view>
				<view class="cu-item menu-avatar">
					<view class="content">
						<text class="lg text-orange cuIcon-comment"></text>
						<text class="text-red">年龄</text>
					</view>
					<view class="text-gray">
						<text>{{userInfo.age}}</text>
					</view>
				</view>
				<view class="cu-item menu-avatar" @tap="handleExitLogin">
					<view class="content">
						<text class="lg text-orange cuIcon-delete"></text>
						<text class="text-red">退出账号</text>
					</view>
				</view>
			</view>
		</scroll-view>
		
		<view class="DrawerClose" :class="modalName=='viewModal'?'show':''" @tap="hideModal">
			<text class="cuIcon-pullright"></text>
		</view>
		<scroll-view scroll-y class="DrawerWindow" :class="modalName=='viewModal'?'show':''">
			<view class="cu-list menu">
				<view class="login_image">
					<image src="../../static/img/login1.jpg" mode=""></image>
				</view>
				<form @submit="handleFormSubmit">
					<view class="cu-form-group margin-top">
						<view class="title">账 号</view>
						<input name="username" type="text" placeholder="请输入账号"></input>
					</view>
					<view class="cu-form-group">
						<view class="title">密 码</view>
						<input name="password" type="text" placeholder="请输入密码"></input>
					</view>
					<view class="padding flex flex-direction">
						<button class="cu-btn bg-gradual-blue margin-tb-sm lg" type="primary" form-type="submit">登录</button>
					</view>
				</form>
				<view class="login_assist">
					<view class="text">
						第三方账号登录
					</view>
					<view class="image" @click="handleQQLogin">
						<image src="../../static/img/QQ.png" mode=""></image>
					</view>
				</view>
			</view>
		</scroll-view>
		
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				StatusBar:0,
				imgList: [],//选择头像
				modalName:null,
				showLoginBtn:true,//是否要显示登录按钮
				userInfo:{}//用户信息
			}
		},
		methods: {
			handleQQLogin(){
				uni.login({
					provider:'qq',
					success: (res) => {
						uni.getUserInfo({
							provider:'qq',
							success: (info) => {
								const {city,gender,gender_type,openId,nickname,avatarUrl} = info.userInfo;
								const userInfo = {
									avatar:avatarUrl,
									nickname:nickname,
									gender:gender_type,
									qq_openid:openId
								}
								//调用开发者后台，执行一键注册或登录
								uni.request({
									url:'https://h5sm.com/uni/users/QQloginAndRegister',
									data:userInfo,
									method:'POST',
									success: (res) => {
										if(res.statusCode == 200){
											if(res.data.status == 1){
												const renderUserInfo = res.data.msg
												uni.setStorageSync('isLogin',res.data.status)
												this.updateUserInfo(renderUserInfo)
											}
										}
									}
								})
							}
						})
					}
				})
			},
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			ChooseImage() {
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '召唤师',
					content: '确定要删除这张头像吗？',
					cancelText: '再看看',
					confirmText: '再见',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			//处理头像上传
			handleImgUpLoad(){
				const _this = this;
				this.hideModal()
				console.log(this.imgList)
				let picList = this.imgList;
				const pic = picList[picList.length-1]
				uni.uploadFile({
					url:'https://h5sm.com/uni/users/actionAvatar',
					filePath:pic,
					name:'pic',
					formData:{
						'uuid':_this.userInfo.uuid
					},
					success(res) {
						console.log(res)
						if(res.statusCode == 200){
							const info = JSON.parse(res.data)
							console.log(info)
							if(info.status == 1){
								const userInfo = _this.userInfo
								userInfo['avatar'] = info.msg.avatar
								_this.userInfo = userInfo
								_this.updateUserInfo(userInfo)
							}
							return
						}
						uni.showToast({
							title:'请检查数据接口',
							icon:'none'
						})
					},
					fail(err){
						uni.showToast({
							title:'请检查网络状态',
							icon:'none'
						})
					}
				})
			},
			//退出账号
			handleExitLogin(){
				try{
					//清除缓存
					uni.clearStorageSync()
					this.showLoginBtn = true
				}catch(e){
				}
			},
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
					//图片
					avatar:userInfo.avatar,
					//昵称
					nickname:userInfo.nickname,
					//年龄
					age:userInfo.age,
					//性别
					gender:userInfo.gender,
					uuid:userInfo.uuid
				}
				app.globalData.userInfo = renderUserInfo
				uni.setStorageSync('globalUser',renderUserInfo)
				this.hideModal()
				this.userInfo = renderUserInfo
				this.showLoginBtn = false
			},
			
			//登录/注册
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
		},
		onLoad() {
			this.StatusBar = app.globalData.StatusBar
			this.getStorageUserInfo()
		},
		onHide(){
			this.hideModal()
		},
		components:{
		}
	}
</script>

<style lang="less">
	.drc{
		position: fixed;
		width: 100%;
		z-index: 55;
	}
	.mtop{
		transform: translateY(105rpx);
	}
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
	button .cu-tag {
		position: absolute;
		top: 8upx;
		right: 8upx;
	}
	.cu-list.menu-avatar{
		padding-top: 100rpx;
	}
	.cu-list.menu-avatar>.cu-item>.cu-avatar{
		left: 25px;
	}
	page {
		background-image: var(--gradualBlue);
		width: 100vw;
		overflow: hidden;
	}
	
	.DrawerPage {
		position: fixed;
		width: 100vw;
		height: 100vh;
		left: 0vw;
		background-color: #f1f1f1;
		transition: all 0.4s;
		padding-bottom: 50rpx;
	}
	
	.DrawerPage.show {
		transform: scale(0.9, 0.9);
		left: 85vw;
		box-shadow: 0 0 60upx rgba(0, 0, 0, 0.2);
		transform-origin: 0;
	}
	
	.DrawerWindow {
		position: absolute;
		width: 85vw;
		height: 100vh;
		left: 0;
		top: 0;
		transform: scale(0.9, 0.9) translateX(-100%);
		opacity: 0;
		pointer-events: none;
		transition: all 0.4s;
		padding: 100upx 0;
	}
	
	.DrawerWindow.show {
		transform: scale(1, 1) translateX(0%);
		opacity: 1;
		pointer-events: all;
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
</style>
