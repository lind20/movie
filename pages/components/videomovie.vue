<template>
	<!-- 热门预告 开始 -->
	<view class="videomovie">
		<view class="hot-title">
			<image src="/static/img/videomovie.png"></image>
			<text class="name">热门预告</text>
		</view>
		<view class="play">
			<view class="video" v-for="item in indexvideo">
				<video 
					:src="'https://images.weserv.nl/?url='+item.video_url" 
					controls 
					:poster="'https://images.weserv.nl/?url='+item.pic_url"></video>
			</view>
		</view>
	</view>
	<!-- 热门预告 结束 -->
</template>

<script>
	export default{
		data(){
			return{
				
			}
		},
		props:['indexvideo']
	}
</script>

<style lang="less">
	/* 热门预告 开始 */
	.videomovie{
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
		
		.play{
			display: flex;
			padding: 0 10rpx 20rpx;
			white-space: nowrap;
			justify-content: space-around;
			
			.video{
				width: 46%;
				height: 180rpx;
				video{
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	/* 热门预告 结束 */
</style>
