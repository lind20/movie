<template>
	<!-- 猜你喜欢 开始 -->
	<view class="likemovie">
		<view class="hot-title" v-if="nowplaying[0].genres">
			<image src="/static/img/likemovie.png"></image>
			<text class="name">猜你喜欢</text>
		</view>
		<view class="like">
			<view class="likelist" v-for="item in nowplaying" :key="item.id">
				<!-- 电影图片 -->
				<view class="pic" @click="handleGoTo(item.id)">
					<image :src="'https://images.weserv.nl/?url='+item.images.small" mode=""></image>
				</view>
				<!-- 电影描述 -->
				<view class="dec" @click="handleGoTo(item.id)">
					<text class="title">{{item.title}}</text>
					<view class="rate">
						<uni-rate disabled="true" max="5" :value="item.rating.average/2" size="10"></uni-rate>
						<text>{{item.rating.average}}</text>
					</view>
					<text class="likedec lk1" v-if="item.genres">类型：{{item.genres.join(' / ')}}</text>
					<text class="likedec lk1" v-else-if="item.author">作者：{{item.author.join('')}}</text>
					<text class="likedec lk2" v-if="item.pubdates">上映日期：{{item.pubdates.join(' / ')}}</text>
					<text class="likedec lk2" v-else-if="item.price">价格：{{item.price}}</text>
				</view>
				<!-- 赞一下 -->
				<view class="appreciate">
					<view class="cu-item">
						<text class="cuIcon-appreciatefill icon"></text>
						<text>赞一下</text>
					</view>
				</view>
			</view>
		</view>
	</view>
	<!-- 猜你喜欢 结束 -->
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['nowplaying','type'],
		methods:{
			handleGoTo(id){
				switch(this.type){
					case 'book':
						uni.navigateTo({
							url:'../book_details/book_details?id='+id
						})
						break;
					case 'move':
						uni.navigateTo({
							url:'../movie_details/movie_details?id='+id
						})
						break;
				}
				
			}
		},
		onLoad() {
			
		}
	}
</script>

<style lang="less">
	/* 猜你喜欢 开始 */
	.likemovie{
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
		
		.hot-title{
			image{
				width: 65rpx;
				height: 65rpx;
				margin: 0 10rpx 0 10rpx;
			}
		}
		
		.like{
			margin-top: -40rpx;
			
			.likelist{
				display: flex;
				margin: 40rpx 0;
				justify-content: space-around;
				
				.pic{
					width: 180rpx;
					height: 240rpx;
					
					
					image{
						width: 100%;
						height: 100%;
						border-radius: 10rpx;
						border: 1px solid #ccc;
					}
				}
				.dec{
					width: 300rpx;
					
					.title{
						font-size: 34rpx;
						font-weight: bold;
					}
					.rate{
						display: flex;
						margin-top: 20rpx;
						justify-content: space-between;
						align-items: center;
						font-size: 26rpx;
						color: #ddd;
					}
					.likedec{
						display: block;
						font-size: 25rpx;
						color: #999;
						
					}
					.lk1{
						/* height: 35rpx; */
						text-overflow: ellipsis;
						white-space: nowrap;
						overflow: hidden;
					}
					.lk2{
						display: -webkit-box;
						-webkit-line-clamp: 2;
						-webkit-box-orient: vertical;
						overflow: hidden;
					}
				}
				.appreciate{
					display: flex;
					width: 170rpx;
					justify-content: center;
					align-items: center;
					border-left: 3px dashed #ddd;
					color: rgb(255, 202, 62);
					font-size: 35rpx;
					.icon{
						display: block;
						text-align: center;
					}
				}
			}
		}
	}
	/* 猜你喜欢 结束 */
</style>
