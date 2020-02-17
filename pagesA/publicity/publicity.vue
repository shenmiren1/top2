<template>
	<view>
		<!--  // 公用一个-->
		<view class="allHeader">
			<view class="header">
				<view @tap="header_click(index)"  v-for="(item,index) in header_data "
				 :key="index"><text :class="[index == header_index ? 'activ' : '']">{{item}}</text></view>
			</view>
			<view class="center" v-if="header_index == 0">
				<image src="../../static/publicity/hint.png" mode=""></image>
				30天内已上映影片的营销指数
			</view>
			<view class="center" v-if="header_index == 1">
				<image src="../../static/publicity/hint.png" mode=""></image>
				未来30天内上映影片的营销指数
			</view>
			<view @tap="nagitto(item.id,item.zz_id)" class="footer" v-for="(item,index) in AllData" :key="index">
				<view class="footer_view">
					<view class="footer_img">
						<image v-if="!(item.img == '')" :src="'https://db.topcdb.com'+item.img"></image>
						<image v-if="item.img == ''" src="../../static/big-plate/available_poster.png"></image>
					</view>
					<view class="footer_tow">
						<view class="footer_name">{{item.zz_name}}</view>
						<view class="footer_type">
							<view>{{item.material}}</view>
							<view>{{item.score}}</view>
						</view>
						<view class="footer_item">
							<view>{{item.publish_date}}</view>
							<view>营销指数</view>
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(){},
		data() {
			return {
				header_index: 0, // 默认为显示第一个
				header_data: ['正在上映', '即将上映'],
				AllData: []
			}
		},
		onLoad() {
			this.dp_index()
		},
		methods: {
			// 大盘接口
			async dp_index() {
				let userType  = await this.detection_validity()
				var init = this.header_index;
				var ini = 0;
				if (init == 0) {
					ini = 1
				} else {
					ini = 2
				}
				let {data}  = await this.$http.get({
					url:'/topprogram/get-release-movie',
					data:{
						type:ini,
						userType
					}
				})
				this.AllData = data;
			},
			// 跳转
			nagitto(mid, id) {
				uni.navigateTo({
					url: './detail/detail?id=' + id + '&mid=' + mid
				});
			},
			// 切换顶部tab
			header_click(index) {
				this.header_index = index;
				this.dp_index()
			}
		}
	}
</script>

<style lang="less">
	@import url("./publicity.less");
</style>
