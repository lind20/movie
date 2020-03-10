<template>
	<view class="search_book">
		<!-- 搜索 开始 -->
		<view class="bg-olive light padding-top radius text-center p-fixed">
			<view class="text-lg text-bold">搜索</view>
			<view class="margin-top-sm text-Abc">
				<view class="cu-bar search">
					<text class="text-black cuIcon-back back" @tap="handleback()">返回</text>
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input 
							@focus="InputFocus" 
							@blur="InputBlur" 
							:adjust-position="false" 
							type="text" 
							placeholder="搜索电影" 
							confirm-type="search"
						></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-olive shadow-blur round" @tap="handleSearch">搜索</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索 结束 -->
		
		<view class="searchmovie">
			<view class="listitem" v-for="item in BookSearch" :key="item.id" @tap="handleClick(item.id)">
				<view class="pic">
					<image :src="'https://images.weserv.nl/?url='+item.images.small" mode=""></image>
				</view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				searchmovie:[
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
					{img:'https://img3.doubanio.com/view/subject/s/public/s3917200.jpg',title:'香蜜'},
				],
				searchValue:'言情',
				BookSearch:[]
			}
		},
		onLoad() {
			this.getBookDate(this.searchValue)
		},
		methods: {
			InputFocus(e){
			},
			InputBlur(e){
				this.searchValue = e.target.value
			},
			getBookDate(tag){
				const _this = this;
				uni.request({
					url:'http://h5sm.com/uni/api/search_book?start=1&count=10&tag='+tag,
					method:'POST',
					success({data}) {
						_this.BookSearch = data.books
					}
				})
			},
			handleSearch(){
				this.getBookDate(this.searchValue)
			},
			handleClick(id){
				uni.navigateTo({
					url:'../book_details/book_details?id='+id
				})
			},
			handleback(){
				uni.navigateBack()
			}
		}
	}
</script>

<style lang="less">
	.search_book{
		.p-fixed{
			position: fixed;
			width: 100%;
			z-index: 55;
		}
		.searchmovie{
			padding-top: 20rpx;
			transform: translateY(200rpx);
			background-color: #fff;
			&:after{
				content: '';
				display: block;
				clear: both;
			}
			.listitem{
				position: relative;
				float: left;
				width: 200rpx;
				height: 270rpx;
				margin: 25rpx;
				border: 1px solid #ddd;
				
				.pic{
					height: 100%;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.title{
					position: absolute;
					bottom: 0;
					left: 0;
					width: inherit;
					line-height: 40rpx;
					text-align: center;
					background-color: rgba(0,0,0,.3);
					font-size: 20rpx;
					color: #fff;
					white-space: nowrap;
					overflow: hidden;
				}
			}
		}
	}
</style>
