<template>
	<view class="movie_details">
		<!-- 头部 -->
		<view class="light padding radius text-center drc">
			<view class="text-lg text-bold smadetails">
				<text class="text-gray cuIcon-back back" @tap="handleback(id)">返回</text>电影详情
			</view>
		</view>
		
		<!-- 预告轮播 开始 -->
		<swiper class="screen-swiper" :class="dotStyle?'square-dot':'round-dot'" :indicator-dots="false" :circular="true"
		 :autoplay="false" interval="5000" duration="500">
			<swiper-item v-for="(item,index) in info.trailers" :key="index">
				<video :poster="item.medium" :src="item.resource_url" autoplay muted :show-play-btn="false" :controls="true" objectFit="cover"></video>
			</swiper-item>
		</swiper>
		<!-- 预告轮播 结束 -->
		
		<!-- 详情 开始 -->
		<view class="describe_details">
			<view class="likelist">
				<!-- 电影图片 -->
				<view class="pic">
					<image :src="'https://images.weserv.nl/?url='+info.images.small" mode=""></image>
				</view>
				<!-- 电影描述 -->
				<view class="dec">
					<text class="title">{{info.title}}</text>
					<text class="likedec lk1">{{info.genres.join(' / ')}}</text>
					<text class="likedec lk1">导演：{{info.directors.name_en}}</text>
					<text class="likedec lk2">影片时长：{{...info.durations}}</text>
					<text class="likedec lk2">上映时间：{{info.pubdates.join(' / ')}}</text>
					<view class="rate">
						<view class="r-left">
							<text>综合评分：</text>
							<text class="lg">{{info.rating.average}}</text>
						</view>
						<view class="r-right">
							<uni-rate class="rating" disabled="true" max="5" :value="info.rating.average/2" size="10" color="#B7B6B6"></uni-rate>
							<text>9630人点赞</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 详情 结束 -->
		
		<!-- 剧情介绍 开始 -->
		<view class="info_introduce">
			<view class="line"></view>
			<view class="scenario">
				<view class="title">剧情介绍</view>
				<view class="introduce">{{info.summary}}</view>
			</view>
			<view class="castmember">
				<view class="title">演职人员</view>
				<view class="list">
				    <scroll-view class="scroll-view" scroll-x>
				        <view class="scroll-item" v-for="item in info.casts" :key="item.id">
							<view class="info">
								<view class="pic">
									<image :src="'https://images.weserv.nl/?url='+item.avatars.small" mode=""></image>
								</view>
								
								<view class="m-actor">{{item.name}}</view>
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			
		</view>
		<!-- 剧情介绍 结束 -->
	</view>
</template>

<script>
	// import movieSubject from '../../static/json/movie_subject.json'
	export default {
		data() {
			return {
				id:'',
				info:{},
				cardCur: 0,
				dotStyle: false,
			}
		},
		onLoad(id){
			this.id = id.id
			uni.request({
			    url: 'http://h5sm.com/uni/api/movie_subject',
				method: "POST",
				data:{
					...id
				},
			    success: (res) => {
					const {trailers,durations,genres,pubdates,title,summary,rating,images,casts,directors} = res.data
					this.info = {
						trailers,
						durations,
						genres,
						pubdates,
						title,
						summary,
						rating,
						images,
						casts,
						directors
					}
					console.log(this.info.casts)
			    }
			});
			
			//设置数据缓存
			uni.setStorage({
			    key: 'storage_key',
				data: '',
			    success: function () {
			        console.log('success');
			    }
			});
			// const {trailers,durations,genres,pubdates,title,summary,rating,images} = movieSubject
		},
		methods: {
			DotStyle(e) {
				this.dotStyle = e.detail.value
			},
			//点击返回
			handleback(id){
				// uni.navigateBack({
				// 	url: '../movie_details/movie_details?id='+id,
				// 	    animationType: 'zoom-in',
				// 	    animationDuration: 1000
				// });
				uni.navigateBack()
			}
			
		}
	}
</script>

<style lang="less">
	.movie_details{
		background-color: #fff;
		
		.drc{
			.smadetails{
				.back{
					float: left;
					font-weight: normal;
				}
			}
		}
		.describe_details{
			height: 480rpx;
			
			.likelist{
				display: flex;
				margin-top: 30rpx;
				justify-content: space-around;
				
				.pic{
					width: 270rpx;
					height: 350rpx;
					image{
						width: 100%;
						height: 100%;
						border: 1px solid #ccc;
					}
				}
				.dec{
					position: relative;
					width: 420rpx;
					
					.title{
						font-size: 55rpx;
						font-weight: 500;
					}
					.rate{
						position: absolute;
						left: 0;
						bottom: -90rpx;
						padding: 20rpx;
						font-size: 22rpx;
						box-shadow: 0px 0px 10px #9E9C9C;
						color: #8A8787;
						background-color: #fff;
						overflow: hidden;
						
						.r-left{
							float: left;
							margin-right: 50rpx;
							text{
								display: block;
								
							}
							.lg{
								margin-top: 10rpx;
								font-size: 55rpx;
								font-weight: bold;
								color: rgb(255, 202, 62);
							}
						}
						.r-right{
							float: left;
							width: 210rpx;
							padding-top: 40rpx;
							.rating{
								padding: 10rpx 0;
							}
						}
					}
					.likedec{
						display: block;
						padding: 4rpx 0;
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
			}
		}
		.info_introduce{
			margin: 0 20rpx;
			.line{
				width: 100%;
				height: 1px;
				background-color: #ccc;
			}
			
			.title{
				padding: 10rpx 20rpx;
				font-size: 26rpx;
				color: #8A8787;
			}
			.scenario{
				margin-bottom: 30rpx;
				.introduce{
					padding: 0 20rpx;
				}
			}
			
			.castmember{
				margin-bottom: 30rpx;
				.list{
					margin: 0 20rpx;
					padding-bottom: 20rpx;
					white-space: nowrap;
					
					.scroll-view{
						
						.scroll-item{
							display: inline-block;
							width: 170rpx;
							height: 375rpx;
							margin-right: 10rpx;
							vertical-align: top;
							
							.info{
								.pic{
									image{
										width: 170rpx;
										height: 220rpx;
										border: 1px solid #ccc;
									}
									
								}
								.m-title{
									padding-left: 10rpx;
									margin-bottom: 5px;
									font-weight: bold;
									font-size: 30rpx;
									text-overflow: ellipsis;
									overflow: hidden;
									white-space: nowrap;
								}
								.m-actor{
									color: #8A8787;
									font-size: 26rpx;
									text-align: center;
								}
							}
						}
					}
				}
			}
		}
	}
		
</style>
