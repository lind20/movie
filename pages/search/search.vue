<template>
	<view class="search">
		
		<!-- 搜索 开始 -->
		<view class="bg-olive light padding-top radius text-center p-fixed" @tap="handleSearchBook()">
			<view class="text-lg text-bold">搜索</view>
			<view class="margin-top-sm text-Abc">
				<view class="cu-bar search">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input @focus="InputFocus" disabled @blur="InputBlur" :adjust-position="false" type="text" placeholder="搜索电影" confirm-type="search"></input>
					</view>
					<view class="action">
						<button class="cu-btn bg-olive shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
		</view>
		<!-- 搜索 结束 -->
		
		
		<scroll-view 
			scroll-x class="bg-white nav" 
			scroll-with-animation 
			:scroll-left="scrollLeft">
			<view 
				class="cu-item" 
				:class="index==TabCur?'text-green cur':''" 
				v-for="(item,index) in booktag" 
				:key="index" 
				@tap="tabSelect" 
				:data-id="index"
				:data-tag="item"
			>
				{{item}}
			</view>
		</scroll-view>
		<view class="line">
		</view>
		<likemovie :nowplaying="bookDate" type='book'/>
	</view>
</template>

<script>
	const app = getApp()
	//猜你喜欢
	import likemovie from '../components/likemovie.vue'
	
	export default {
		data() {
			return {
				tag:'仙侠',
				q:'',
				booktag:[
					'仙侠',
					'言情',
					'玄幻',
					'武侠',
					'奇幻',
					'科幻',
					'都市',
					'历史',
					'军事',
					'游戏',
					'体育',
					'灵异',
					'同人',
					'耽美',
					'二次元'
				],
				TabCur: 0,
				scrollLeft: 0,
				bookDate: [],
			}
		},
		onLoad(){
			this.getBookDate(this.q,this.tag)
		},
		methods: {
			tabSelect(e) {
				const {id,tag} = e.currentTarget.dataset
				this.tag = tag;
				this.TabCur = id;
				this.scrollLeft = (e.currentTarget.dataset.id - 1) * 60
				this.$nextTick(()=>{
					this.getBookDate(this.q,tag)
				})
			},
			getBookDate(q,tag){
				uni.request({
					url:'http://h5sm.com/uni/api/search_book?start=1&count=10&q='+q+'&tag='+tag,
					method: 'POST',
					success: ({data})=>{
						this.bookDate = data.books
					}
				})
			},
			handleSearchBook(){
				uni.navigateTo({
					url:'../search_book/search_book'
				})
			}
		},
		components:{
			likemovie
		}
	}
</script>

<style lang="less">
	.search{
		overflow: hidden;
		.p-fixed{
			position: fixed;
			width: 100%;
			z-index: 55;
		}
		.searchmovie{
			display: flex;
			padding-top: 20rpx;
			flex-wrap: wrap;
			justify-content: space-around;
			
			background-color: #fff;
			.listitem{
				position: relative;
				width: 200rpx;
				height: 270rpx;
				margin-bottom: 20rpx;
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
				}
			}
		}
		.line{
			position: relative;
			height: 5px;
			background-color: #fff;
			margin-top: 290rpx;
		}
		.nav{
			position: fixed;
			top: 190rpx;
			background-color: #fff;
			z-index: 55;
		}
	}
</style>
