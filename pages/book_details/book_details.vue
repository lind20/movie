<template>
	<view class="book_details">
		<!-- 头部 -->
		<view class="light padding radius text-center drc">
			<view class="text-lg text-bold smadetails">
				<text class="text-gray cuIcon-back" @tap="handleback()">返回</text>图书详情
				<text class="lg text-gray cuIcon-share" @tap="handleShare"></text>
			</view>
		</view>
		
		<view class="book_shows" v-if="bookInfo.title">
			<view class="book_bg" :style="'background-image: url('+'https://images.weserv.nl/?url='+bookInfo.images.small+')'"></view>
			<view class="book_img">
				<image :src="'https://images.weserv.nl/?url='+bookInfo.images.small" mode=""></image>
			</view>
			<view class="book_title">{{bookInfo.title}}</view>
		</view>
		
		<view class="book_introduce">
			<view class="book_rate">
				<uni-rate class="rating" disabled="true" max="5" :value="bookInfo.rating.average/2" size="10" margin="4" color="#B7B6B6"></uni-rate>
				<text>{{bookInfo.rating.average}}</text>
				<text>{{bookInfo.rating.numRaters}}人点评</text>
			</view>
			<view class="book_press">
				{{bookInfo.author.join('')}}/{{bookInfo.publisher}}/{{bookInfo.pubdate}}
			</view>
			<view class="book_intro">
				<view class="book_i_title">
					简介
				</view>
				<view class="book_i_dec">
					{{bookInfo.summary}}
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				bookInfo:{}
			}
		},
		onLoad(option){
			console.log(option)
			const {id} = option
			this.getBookDate(id)
		},
		methods: {
			handleback(){
				uni.navigateBack()
			},
			getBookDate(id){
				uni.request({
					url:'http://h5sm.com/uni/api/book_subject',
					method:'POST',
					data:{
						id
					},
					success:({data})=>{
						console.log(data)
						this.bookInfo = data
					}
				})
			},
			handleShare(){
				console.log(11111)
				const imageUrl = this.bookInfo.imageimage;
				const title = this.bookInfo.title;
				const href = this.bookInfo.alt;
				const summary = this.bookInfo.summary;
				this.$nextTick(()=>{
					uni.share({
					    provider: "weixin",
					    scene: "WXSenceTimeline",
					    type: 0,
					    href,
						title,
						summary,
						imageUrl,
					    success: function (res) {
					        uni.showToast({
					        	title:'分享成功',
								duration:2000
					        })
					    },
					    fail: function (err) {
					        uni.showToast({
					        	title:'分享失败',
					        	duration:2000
					        })
					    }
					});
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.book_details{
		background-color: rgb(48,48,48);
		min-height: 100vh;
		overflow: hidden;
		.drc{
			position: fixed;
			width: 100%;
			background-color: #fff;
			z-index: 55;
			.smadetails{
				.cuIcon-back{
					float: left;
					font-weight: normal;
				}
				.cuIcon-share{
					float: right;
				}
			}
		}
		.book_shows{
			position: relative;
			width: 100%;
			height: 580rpx;
			margin-top: 100rpx;
			overflow: hidden;
			.book_bg{
				position: absolute;
				width: 100%;
				height: 100%;
				background: no-repeat center/cover;
				filter: blur(80px);
			}
			.book_img{
				position: absolute;
				display: flex;
				width: 100%;
				height: 100%;
				justify-content: center;
				align-items: center;
				image{
					width: 300rpx;
					height: 430rpx;
				}
			}
			.book_title{
				position: absolute;
				bottom: 0;
				left: 0;
				width: 100%;
				height: 90rpx;
				background-color: rgba(0,0,0,.5);
				color: #ccc;
				text-indent: 50rpx;
				font-size: 32rpx;
				line-height: 90rpx;
			}
		}
		.book_introduce{
			width: 100%;
			padding: 45rpx;
			
			color: #ccc;
			.book_rate{
				display: flex;
				align-items: center;
				text{
					margin-left: 20rpx;
					font-size: 20rpx;
				}
			}
			.book_press{
				margin: 15rpx 0;
				font-size: 25rpx;
			}
			.book_intro{
				margin: 55rpx 0;
				.book_i_dec{
					margin-top: 10rpx;
					line-height: 40rpx;
					color: rgb(300,300,300);
					font-size: 25rpx;
					letter-spacing: 2rpx;
				}
			}
		}
	}
</style>
