<template>
	<view>
		<view v-for="(item,i) in Alldate" :key="i" class="header">
			<view class="title">
				{{item.year}} &nbsp;&nbsp;({{item.len}}部)
			</view>
			<view class="Individual_xq" v-for="(item,ind) in item.child" :key="ind">
				<image class="images"  :src="'https://db.topcdb.com' + item.img" mode=""></image>
				<view class="Individual_xq_data">
					<view class="Individual_xq_data_name">
						<view>{{item.zz_name}}</view>
						<view>{{item.bo}}票房</view>
					</view>
					<view class="Individual_data_data">
						<view>{{item.type}}</view>
						<view>{{item.typeName}}</view>
						<view> {{item.publish_date}} {{item.country}}映</view>
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
				Alldate:{},
			}
		},
		onLoad(res) {
		let {id:id} = res;
		var url = '/topprogram/credits-detail'
		let All_data = {
			id:id,
			type:1 
		}
		this.db_index(url,All_data)
		},
		methods: {
			async db_index(url,All_data){
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let ra  = await this.$http.get({
					url,
					data:All_data
				})
				
				
				var title = '个人作品-' + ra.data.detail.nameCn
				uni.setNavigationBarTitle({
				    title,
				});
				let arr = [];
				var index = 0;
				console.log(ra.data);
				for (let i in ra.data.movie) {
					// console.log(i);
					// console.log(ra.data.movie[i]);
					ra.data.movie[i].forEach((item,i) =>{
							var bo = Number(item.bo)
							if (bo /100000000 >1) {
								item.bo = (bo / 100000000).toFixed(2) + '亿'
							}else {
								item.bo = (bo / 10000).toFixed(2) + '万'
							}
					})
					arr.unshift({year:i,child:ra.data.movie[i],len:ra.data.movie[i].length}) 
					// i++
				}
				
				console.log(arr);
				this.Alldate = arr;
			}
		}
	}
</script>

<style lang="less">
	.header{
		padding:0 30upx;
		
		.title{
			font-size:26upx;
			font-family:PingFangSC;
			font-weight:400;
			color:rgba(0,0,0,1);
			padding-top: 28upx;
			padding-bottom: 10upx;
		}
		.Individual_xq{
			display:flex;
			border-top: 2upx solid #EEEEEE;
			padding-top:46upx;
			padding-bottom:35upx;
			.images{
				width: 134upx;
				height: 180upx;
				// padding-left: 30upx;
			}
			.Individual_xq_data{
				
				padding-left:26upx;
				
				.Individual_xq_data_name{
					display: flex;
					justify-content: space-between;
					width:750 - 60 - 134 - 26upx;
					view:nth-child(1){
						font-size:28upx;
						font-family:PingFangSC;
						font-weight:600;
						color:rgba(0,0,0,1);
					}
					view:nth-child(2){
						font-size:34upx;
						font-family:PingFangSC;
						font-weight:600;
						color:rgba(240,142,45,1);
					}
				}
				.Individual_data_data{
					font-size:24upx;
					font-family:PingFangSC;
					font-weight:400;
					color:rgba(142,142,142,1);
					padding-top:34upx;
				}
			}
		}
	}
</style>
