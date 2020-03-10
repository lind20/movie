<template>
	<view class="hotmovie">
	<!-- 热门电影 开始 -->
		<view class="hot-title">
			<image src="/static/img/hotmovie.png"></image>
			<text class="name">{{title}}</text>
		</view>
		
		<view class="list">
	        <scroll-view class="scroll-view" scroll-x>
	            <view class="scroll-item" v-for="item in comingsoonList" :key="item.id" @tap="handleGoTodetail(item.id)">
					<view class="info">
						<view class="pic">
							<image :src="'https://images.weserv.nl/?url='+item.images.small" mode=""></image>
						</view>
						<view class="title">{{item.title}}</view>
						<view class="rate">
							<uni-rate disabled="true" :max="item.rating.max/2" :value="item.rating.average/2" size="12"></uni-rate>
							<text>{{item.rating.average}}</text>
						</view>
					</view>
				</view>
	            <!-- <view class="scroll-item">
	            	<view class="info">
	            		<view class="pic">
	            			<image src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2518187010.jpg" mode=""></image>
	            		</view>
	            		<view class="title">丑女之战</view>
	            		<view class="rate">
	            			<uni-rate disabled="true" max="5" value="3.5" size="12"></uni-rate>
	            			<text>4.5</text>
	            		</view>
	            	</view>
	            </view>
				<view class="scroll-item">
					<view class="info">
						<view class="pic">
							<image src="https://img9.doubanio.com/view/photo/s_ratio_poster/public/p2576482356.jpg" mode=""></image>
						</view>
						<view class="title">半个喜剧</view>
						<view class="rate">
							<uni-rate disabled="true" max="5" value="3.5" size="12"></uni-rate>
							<text>4.5</text>
						</view>
					</view>
				</view>
				<view class="scroll-item">
					<view class="info">
						<view class="pic">
							<image src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2573288350.jpg" mode=""></image>
						</view>
						<view class="title">爱的迫降</view>
						<view class="rate">
							<uni-rate disabled="true" max="5" value="3.5" size="12"></uni-rate>
							<text>4.5</text>
						</view>
					</view>
				</view> -->
	        </scroll-view>
	    </view>
	<!-- 热门电影 开始 -->
	</view>
</template>

<script>
	export default{
		name:'hotmovie',
		data() {
			return {
				
			}
		},
		props:['comingsoonList','title'],
		onLoad(){
			
		},
		methods:{
			handleGoTodetail(id){
				//点击跳转
				uni.navigateTo({
				    url: '../movie_details/movie_details?id='+id,
					 animationType: 'slide-in-top',
					    animationDuration: 1000
				});
				//设置数据缓存
				// uni.setStorage({
				//     key: 'storage_key',
				//     data: 'sdsdsd',
				//     success: function () {
				//         console.log('success');
				//     }
				// });
			}
		}
	}
</script>

<style lang="less">
	/* 热门电影 开始 */
	.hotmovie{
		margin-top: 10px;
		background-color: #fff;
		
		/* 共用标题 */
		.hot-title{
			display: flex;
			height: 100rpx;
			align-items: center;
		
			image{
				width: 45rpx;
				height: 45rpx;
				margin: 0 15rpx 0 20rpx;
			}
			.name{
				font-weight: bold;
				font-size: 40rpx;
			}
		}
		
		.list{
			padding-bottom: 20rpx;
			white-space: nowrap;
			
			.scroll-view{
				
				.scroll-item{
					display: inline-block;
					width: 210rpx;
					height: 375rpx;
					margin: 0 20rpx;
					border: 1px solid #ccc;
					vertical-align: top;
					
					.info{
						.pic{
							image{
								width: 210rpx;
								height: 280rpx;
							}
							
						}
						.title{
							padding-left: 10rpx;
							margin-bottom: 5px;
							font-weight: bold;
							font-size: 30rpx;
							text-overflow: ellipsis;
							overflow: hidden;
							white-space: nowrap;
						}
						.rate{
							display: flex;
							justify-content: space-around;
							align-items: center;
							font-size: 26rpx;
							color: #ddd;
						}
					}
				}
			}
		}
	}
	/* 热门电影 结束 */
</style>
