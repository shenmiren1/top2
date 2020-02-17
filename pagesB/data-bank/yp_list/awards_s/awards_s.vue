<template>
	<view>
		<view class="honor">
			<!-- <view class="honor_title">荣誉成就</view> -->
			<view class="honor_listData" v-for="(item, i) in awards_s" :key="i">
				<view class="honor_listData_year">{{ item.year }}年</view>
				<view class="honor_listData_data" v-for="(it, ind) in item.child" :key="ind">
					<view class="yuan"></view>
					<view class="honor_listData_data_data">
						<view class="honor_listData_data_name">
							<view>{{ it.name }} {{ it.awardName }}</view>
							<view>获奖影片  {{ it.movieTitle }}</view>
							
						</view>
						<view class="honor_listData_data_zy">{{it.iswin_w}}</view>
					</view>
				</view>
			</view>
			
			<!-- <view class="honor_boton" @tap="awards_s_click">
				查看全部奖项
			</view> -->
		</view>
	</view>
</template>

<script>
	export default {
		onShareAppMessage(){},
		data() {
			return {
				awards_s:[],
			}
		},
		onLoad() {
			var that = this;
			uni.getStorage({
				key:'awards_s',
				success(res){
					// console.log(res.data);
					that.awards_s = res.data;
				}
			})
			// console.log(this.awards_s);
		},
		methods: {
			
		}
	}
</script>

<style lang="less">
.honor {
	width: 750upx;
	height: auto;
	padding: 0 30upx;
	box-sizing: border-box;
	background-color: #ffffff;
	.honor_boton{
		height: 70upx;
		width: 750upx;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size:28upx;
		font-family:PingFangSC;
		font-weight:400;
		color:rgba(240,142,45,1);
	}
	.honor_listData {
		display: flex;
		flex-wrap: wrap;

		font-size: 26upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		// padding-top:38upx;
		
		&:nth-child(2) {
			padding-top: 53 -38upx;
		}
		.honor_listData_year {
			padding-top: 38upx;
			padding-right: 18upx;
		}
		.honor_listData_data {
			display: flex;
			// align-items: center;
			width: 84%;
			margin-left: 104upx;

			&:nth-child(2) {
				margin-left: 0;
				padding-top: 0;
				
				// 
				// .honor_listData_data_name{
				// 	padding-top: 0 !important;
				// }
				// .honor_listData_data_zy{
				// 	padding-top: 0 !important;
				// 	
				// }
				.yuan {
					background-color: #f08e2d;
					// padding-top: 0 !important;
				}
			}

			.yuan {
				// padding-top:38upx;
				width: 10upx;
				height: 10upx;
				border-radius: 50%;
				border: 2upx solid #f08e2d;
				// margin-right:
				margin-top: 48upx;
			}
			.honor_listData_data_data {
				display: flex;
				justify-content: space-between;
				width: 100%;
				.honor_listData_data_name {
					// border-left:2upx solid #F08E2D;
					padding-left: 28upx;
					padding-top: 38upx;
						width:460upx;
					view:nth-child(2) {
						color: #f08e2d;
					}
				}
				.honor_listData_data_zy {
					// text-align: right;
					padding-top: 38upx;
				}
			}
		}
	}

	.honor_title {
		font-size: 30upx;
		font-family: PingFangSC;
		font-weight: 500;
		color: rgba(0, 0, 0, 1);
		padding-bottom: 6upx;
		border-bottom: 2upx solid #EEEEEE;
	}
	// .honor_listData{
	// 	display:flex;
	// 	font-size:26upx;
	// 	font-family:PingFangSC;
	// 	font-weight:400;
	// 	color:rgba(0,0,0,1);
	// 	position:relative;
	// 	.honor_listData_tiem{
	// 		padding-right: 18upx;
	//
	// 	}
	// 	.yuan{
	// 		width: 10upx;
	// 		height: 10upx;
	// 		border-radius: 50%;
	// 		background-color: red;
	// 		margin-right: 28upx;
	// 	}
	// 	.honor_listData_name{
	// 		// padding-right: 128upx;
	// 	}
	// 	.honor_bot{
	// 		position: absolute;
	// 		right: 0;
	//
	// 	}
	// }
	//
}
</style>
