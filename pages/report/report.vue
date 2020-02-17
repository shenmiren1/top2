<template>
	<view>
		<!-- 顶部输入框 -->
		<view class="header_ipt">
			<input type="text" value="" placeholder="请输入影片/影管/城市查找信息" />
			<image src="../../static/gg/tpicon.png" mode=""></image>
			<image src="../../static/home/amplification.png" mode=""></image>
		</view>

		<!-- tab -->
		<view class="header_tab">
			<view @tap="header_tab_click(i)" :class="[header_tab_index == i ? 'active' : '']" v-for="(item, i) in header_tab_data" :key="i">{{ item }}</view>
		</view>

		<!-- 底部数据显示 -->
		<view class="bottom_data">
			<view class="data" v-for="(item, i) in bottom_Alldata" :key="i">
				<view class="name" @tap="tz_click(item.nid, item.brd, item.district, item.city)">{{ item.title }}</view>
				<view class="img">
					<image v-if="undefined != item.image" :src="'https://db.topcdb.com/' + item.image" mode=""></image>
					<image v-if="undefined != item.image" :src="'https://db.topcdb.com/' + item.image" mode=""></image>
					<image v-if="undefined != item.image" :src="'https://db.topcdb.com/' + item.image" mode=""></image>
					<!-- <image v-if="undefined == item.image" src="../../static/report/image2.png" mode=""></image> -->
					<!-- <image v-if="undefined == item.image" src="../../static/report/image2.png" mode=""></image> -->
					<!-- <image v-if="undefined == item.image" src="../../static/report/image2.png" mode=""></image> -->
				</view>
				<!--  -->
				<view class="time_click">
					<view class="lay">
						<view class="">
							<!-- {{item.lay}}  -->
							来源：拓普数据实验室
						</view>
						<view>{{ item.updated }}</view>
					</view>
					<view class="lay_click" @tap="tc_click(item.nid)">
						<view></view>
						<view></view>
						<view></view>
					</view>
				</view>
				<view class="tc_click" :hidden="!(item.nid == tc_index)">
					<view @tap="tc_click_tap(1)">分享</view>
					<view @tap="tc_click_tap(2)">关注</view>
					<view @tap="tc_click_tap(3)">不感兴趣</view>
					<view @tap="tc_click_tap(4)">投诉</view>
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
			tc_index: -1,
			bottom_Alldata: [
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				},
				{
					name: '趣味电影数据之上半年每分钟最赚钱影片',
					lay: '来源：拓普数据实验室',
					time: '2019-09-03',
					image1:'',
					image2:'',
					image3:''
				}
			],
			header_tab_data: ['关注', '推荐', '线索', '信息', '爆料', '排行榜', '资讯'],
			header_tab_index: 2,
			page_index: 0 // 当前页码
		};
	},
	onReachBottom() {
		// console.log('触发底部');
		var page = this.page_index;
		var url = 'https://db.topcdb.com/topprogram/get-report?page=' + page;
		page++;
		this.page_index = page;
		this.db_index(url, 1);
	},
	onLoad(data) {
		var page = this.page_index;

		var Br = data.Br;
		if (Br) {
			var res = data.res;
			let id = res.id;
			let brd = res.brd;
			let district = res.district;
			let city = res.city;
			console.log(1);

			var url = 'https://db.topcdb.com/topprogram/get-report?page=' + page + '&city=' + city + '&district=' + district + '&brd=' + brd;
			page++;
			this.page_index = page;
			this.db_index(url);
		} else {
			var url = 'https://db.topcdb.com/topprogram/get-report?page=' + page;
			page++;
			this.page_index = page;
			this.db_index(url);
		}
	},
	methods: {
		// 跳转详情页
		tz_click(id, brd, district, city) {
			if (brd == null) {
				brd = '';
			}
			if (district == null) {
				district = '';
			}
			if (city == null) {
				city = '';
			}
			// console.log(brd);
			// console.log(district);
			// console.log(city);
			// console.log(id);
			uni.navigateTo({
				url: './list/list?id=' + id + '&brd=' + brd + '&district=' + district + '&city=' + city
			});
		},
		// 发送请求
		db_index(url, index) {
			uni.showLoading({
				title: '数据加载中'
			});
			uni.request({
				url
			}).then(dd => {
				let [errer, ra] = dd;
				// console.log(ra)
				var res = [...ra.data];
				console.log(res);
				res.forEach(item => {
					item.updated = item.updated.slice(0, 10);
					for (let i in item.img) {
						item.image = item.img[i];
					}
				});
				if (index == 1) {
					const data = [...this.bottom_Alldata];
					res.forEach(item => {
						data.push(item);
					});
					this.bottom_Alldata = data;
					uni.hideLoading();
					return false;
				}

				this.bottom_Alldata = res;
				uni.hideLoading();
			});
		},
		tc_click_tap(i) {
			// if (i == 1) {
			//
			// }else if(i == 2) {
			//
			// }else if(i == 3) {
			//
			// } else if(i == 4){
			//
			// }
			this.tc_index = -1;
		},
		tc_click(id) {
			this.tc_index = id;
		},
		header_tab_click(i) {
			this.header_tab_index = i;
		}
	}
};
</script>

<style lang="less">
page {
	background-color: #f5f5f5;
}
// 底部数据显示
.bottom_data {
	.data {
		position: relative;
		padding: 0 30upx;
		background-color: #fff;
		// 弹出框

		.tc_click {
			position: absolute;
			right: 30upx;
			bottom: -220upx;
			z-index: 1;
			width: 160upx;
			height: 230upx;
			background: rgba(255, 255, 255, 1);
			padding: 0 16upx;

			view {
				font-size: 28upx;
				height: 52upx;
				border-bottom: 2upx solid #eeeeee;
				font-family: PingFangSC;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
			}
		}

		.time_click {
			display: flex;
			justify-content: space-between;
			// align-items:center;
			padding-bottom: 15upx;
			border-bottom: 2upx solid #b7b7b7;
			.lay {
				display: flex;
				justify-content: space-between;
				align-items: center;
				width: 363upx;
				font-size: 20upx;
				font-family: PingFangSC;
				font-weight: 400;
				color: rgba(142, 142, 142, 1);
			}
			.lay_click {
				display: flex;
				align-items: center;
				view {
					width: 10upx;
					height: 10upx;
					border-radius: 50%;
					background-color: #000000;
					margin-left: 6upx;
				}
			}
		}
		.name {
			font-size: 28upx;
			font-family: PingFangSC;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
			padding: 27upx 0 20upx 0;
		}
		.img {
			display: flex;
			justify-content: space-between;
			padding-bottom: 20upx;
			image {
				width: 217upx;
				height: 116upx;
				// border: 1px solid red;
			}
		}
	}
	.data:last-child {
		.tc_click {
			bottom: 10upx;
		}
	}
}
// 顶部tab
.header_tab {
	display: flex;
	justify-content: space-between;
	padding: 24upx 27upx;
	font-size: 24upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(74, 74, 74, 1);
	background: rgba(255, 255, 255, 1);
	margin: 10upx 0;
	view {
		// flex: 1;
	}
	.active {
		color: #f08e2d;
	}
}

// 输入框
.header_ipt {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 750upx;
	height: 90upx;
	background: rgba(240, 142, 45, 1);
	box-shadow: 0px 2px 4px 0px rgba(245, 245, 245, 1);
	// border: 1px solid red;
	position: relative;
	image:nth-child(2) {
		position: absolute;
		left: 126upx;
		width: 73upx;
		height: 38upx;
	}
	image:nth-child(3) {
		position: absolute;
		left: 221upx;
		width: 30upx;
		height: 30upx;
		padding-left: 20upx;
		border-left: 1px solid #c3c0c4;
	}
	input {
		width: 558upx;
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		border-radius: 30upx;
		font-size: 24upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(195, 192, 196, 1);
		padding-left: 180upx;
		box-sizing: border-box;
	}
}
</style>
