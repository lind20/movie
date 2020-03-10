<template>
	<view class="main">
		<!-- 头部 -->
		<view class="light padding radius text-center drc">
			<view 
				@tap="showModal" 
				data-target="DrawerModalL" 
				class="cu-avatar round"
				:style="{backgroundImage:'url('+globalUser.avatar+')'}"
			></view>
			<view class="text-lg cuIcon-colorlens text-bold">电影</view>
			<view class="action">
				<text>定位</text>
				<text class="cuIcon-triangledownfill"></text>
			</view>
		</view>
		
		<view class="cu-modal drawer-modal justify-start" :class="modalName=='DrawerModalL'?'show':''" @tap="hideModal">
			<view class="cu-dialog basis-lg" @tap.stop="" :style="[{top:CustomBar+'px',height:'calc(100vh - ' + CustomBar + 'px)'}]">
				<view class="cu-list menu text-left">
					<view class="cu-item">
						<view class="content">
							<view>昵称</view>
						</view>
						<view>
							{{globalUser.nickname}}
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<view>性别</view>
						</view>
						<view>
							{{globalUser.gender}}
						</view>
					</view>
					<view class="cu-item">
						<view class="content">
							<view>年龄</view>
						</view>
						<view>
							{{globalUser.age}}
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		<!-- 轮播图 -->
		<banner/>
		
		<!-- 即将上映 -->
		<hotmovie :comingsoonList='comingsoonList' title="即将上映"/>
		
		<!-- 热门预告 -->
		<videomovie :indexvideo='indexvideo'/>
		
		<!-- 最新排行榜 -->
		<hotmovie :comingsoonList="top250" title="最新排行榜"/>
		
		<!-- 猜你喜欢 -->
		<likemovie :nowplaying="nowplaying" type='move'/>
	</view>
</template>

<script>
	//轮播图
	import banner from '../components/banner.vue'
	//热门电影
	import hotmovie from '../components/hotmovie.vue'
	//热门预告
	import videomovie from '../components/videomovie.vue'
	//猜你喜欢
	import likemovie from '../components/likemovie.vue'
	
	import comingsoon from '../../static/json/comingsoon.json'
	import top250 from '../../static/json/top250.json'
	import nowplaying from '../../static/json/nowplaying.json'
	import indexvideo from '../../static/json/index_video.json'
	
	export default {
		data() {
			return {
				comingsoonList: [],
				top250: [],
				nowplaying:[],
				indexvideo:[],
				globalUser:{},
				CustomBar:'',
				modalName:''
			}
		},
		onLoad() {
			this.getUserInfo()
			// const _this = this
			// uni.request({
			//     url: 'https://h5sm.com/uni/api/coming_soon?start=1&count=10', //仅为示例，并非真实接口地址。
			// 	method: "POST",
			//     success(res){
			// 		_this.comingsoonList = res.data.subjects
			//         console.log(res);
			//     }
			// });
			this.getLikemovieDate()
			this.comingsoonList = comingsoon.subjects
			this.top250 = top250.subjects
			this.indexvideo = indexvideo
			
			// uni.setStorage({
			//     key: 'storage_key',
			//     data: 'hello',
			//     success: function () {
			//         console.log('success');
			//     }
			// });
		},
		components:{
			banner,
			hotmovie,
			videomovie,
			likemovie
		},
		methods: {
			showModal(e) {
				this.modalName = e.currentTarget.dataset.target
			},
			hideModal(e) {
				this.modalName = null
			},
			getUserInfo(){
				const globalUser = uni.getStorageSync('globalUser')
				this.globalUser = globalUser
			},
			// scroll: function(e) {
			// 	console.log(e)
			// 	this.old.scrollTop = e.detail.scrollTop
			// },
			getLikemovieDate(){
				uni.request({
					url:'http://h5sm.com/uni/api/in_theaters?',
					method:'POST',
					success:({data})=>{
						this.nowplaying = data.subjects
					}
				})
			}
		}
	}
</script>

<style lang='less'>
	.drc{
		position: fixed;
		display: flex;
		width: 100%;
		background-color: #fff;
		justify-content: space-between;
		align-items: center;
		z-index: 55;
	}
	.main{
		overflow: hidden;
	}
</style>
