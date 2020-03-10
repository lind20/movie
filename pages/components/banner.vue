<template>
	<view class="banner">
		<!-- 轮播图 开始 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="true" :circular="true"
		 :autoplay="true" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in swiperList" :key="index" @tap="handlepreview(index)">
				<image :src="item.url" mode="aspectFill" v-if="item.type=='image'"></image>
			</swiper-item>
		</swiper>
		<!-- 轮播图 结束 -->
	</view>
</template>

<script>
	export default{
		data(){
			return{
				cardCur: 0,
				swiperList: [{
					id: 0,
					type: 'image',
					url: 'http://img0.imgtn.bdimg.com/it/u=1593685324,2253220400&fm=26&gp=0.jpg'
				}, {
					id: 1,
					type: 'image',
					url: 'http://img1.imgtn.bdimg.com/it/u=3894567068,1081472037&fm=26&gp=0.jpg',
				}, {
					id: 2,
					type: 'image',
					url: 'http://img2.imgtn.bdimg.com/it/u=341370594,2614309022&fm=26&gp=0.jpg'
				}, {
					id: 3,
					type: 'image',
					url: 'http://5b0988e595225.cdn.sohucs.com/images/20180126/b14b58b92deb4933a435e12d3dba980d.gif'
				}, {
					id: 4,
					type: 'image',
					url: 'http://img0.imgtn.bdimg.com/it/u=3140487005,1237326707&fm=11&gp=0.jpg'
				}, {
					id: 5,
					type: 'image',
					url: 'http://img3.imgtn.bdimg.com/it/u=244324654,2994224489&fm=26&gp=0.jpg'
				}, {
					id: 6,
					type: 'image',
					url: 'http://img4.imgtn.bdimg.com/it/u=3697629493,2862912547&fm=26&gp=0.jpg'
				}],
				dotStyle: false,
				swiperList1:[
					'http://img0.imgtn.bdimg.com/it/u=1593685324,2253220400&fm=26&gp=0.jpg',
					'http://img1.imgtn.bdimg.com/it/u=3894567068,1081472037&fm=26&gp=0.jpg',
					'http://img2.imgtn.bdimg.com/it/u=341370594,2614309022&fm=26&gp=0.jpg',
					'http://5b0988e595225.cdn.sohucs.com/images/20180126/b14b58b92deb4933a435e12d3dba980d.gif',
					'http://img0.imgtn.bdimg.com/it/u=3140487005,1237326707&fm=11&gp=0.jpg',
					'http://img3.imgtn.bdimg.com/it/u=244324654,2994224489&fm=26&gp=0.jpg',
					'http://img4.imgtn.bdimg.com/it/u=3697629493,2862912547&fm=26&gp=0.jpg'
				]
			}
		},
		methods:{
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			// cardSwiper
			cardSwiper(e) {
				this.cardCur = e.detail.current
			},
			handlepreview(index){
				const _this = this;
				uni.previewImage({
					current:index,
					 urls:_this.swiperList1
				})
			}
		}
	}
</script>

<style>
	/* 轮播图 开始 */
	uni-swiper{
		height: 330rpx;
		margin-top: 100rpx;
	
		uni-image{
			width:100%;
			height: inherit;
		}
		uni-view{
			height: inherit;
		}
	}
	/* 轮播图 结束 */
</style>
