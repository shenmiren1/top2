<template>
	<view>
		<view class="header_is_show" :hidden="is_show">预算分拨详情表将于影片上映前15天左右放出，当前影片暂无更新，敬请期待</view>
		<view class="table_name" v-if="is_show">《{{ All_data.sum.movie_name }}》预算分拨情况</view>
		<view class="cut_pattern" @tap="click_show" :hidden="!is_show">{{ click_name_time }}
		<image src="../../../../static/report/next.png" />
		</view>
		<view class="el_name" :hidden="is_show_el_name">
			<view @tap="el_name_click(index, item)" v-for="(item, index) in click_name" :key="index" :style="{ color: click_name_index == index ? '#F08E2D' : '' }">
				{{ item }}
			</view>
		</view>

		<view class="table" v-if="is_show && num == 1">
			<view class="title">影片《{{ All_data.sum.movie_name }}》的整体预算分拨大约为{{ All_data.sum.total_ys }}万元。下表为影片在各影投的预算分拨情况。</view>

			<view class="header">
				<view>影投</view>
				<view>预算（万）</view>
			</view>
			<view class="foot" v-for="(item, index) in All_data.data" :key="index">
				<view>{{ item.brd }}</view>
				<view>{{ item.movie_ys }}</view>
			</view>
			<view class="bottom_data">
				<view>来源：拓普数据实验室</view>
				<view>{{ All_data.sum.date }}</view>
			</view>
		</view>

		<view class="table" v-if="is_show && num == 0">
			<view class="title">影片《{{ All_data.sum.movie_name }}》的整体预算分拨大约为{{ All_data.sum.total_ys }}万元。下表为影片在各城市的预算分拨情况。</view>

			<view class="header">
				<view>影片</view>
				<view>预算（万）</view>
			</view>
			<view class="foot" v-for="(item, index) in All_data.data" :key="index">
				<view>{{ item.city }}</view>
				<view>{{ item.movie_ys }}</view>
			</view>
			<view class="bottom_data">
				<view>来源：拓普数据实验室</view>
				<view>{{ All_data.sum.date }}</view>
			</view>
		</view>

		<view class="table" v-if="is_show && num == 2">
			<view class="title">影片《{{ All_data.sum.movie_name }}》的整体预算分拨大约为{{ All_data.sum.total_ys }}万元。下表为影片在各票仓的预算分拨情况。</view>

			<view class="header">
				<view>影片</view>
				<view>预算（万）</view>
			</view>
			<view class="foot" v-for="(item, index) in All_data.data" :key="index">
				<view>{{ item.district }}</view>
				<view>{{ item.movie_ys }}</view>
			</view>
			<view class="bottom_data">
				<view>来源：拓普数据实验室</view>
				<view>{{ All_data.sum.date }}</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			is_show_el_name: true,
			click_name_time: '影投预算',
			click_name_index: 0,
			click_name: ['影投预算', '城市预算', '票仓预算'],
			is_show: true,
			All_data: [],
			num: 1,
			id: ''
		};
	},
	onLoad(res) {
		var { movie_id: id, brd, district, city, num } = res;
		var url = '';
		this.num = num;
		this.id = id;
		console.log(num != 0);
		if (num == 0) {
			// var url = 'https://db.topcdb.com/topprogram/get-report-yusuan?brd=' + 'brd' + '&district=' + district + '&city=' + city + '&movie_id=' + id ;
		} else {
			url = 'https://db.topcdb.com/topprogram/get-report-yusuan?movie_id=' + id + '&brd=' + 'brd';
		}
		console.log(url);
		this.db_index(url);
	},
	methods: {
		// k开关 时候 切换 影投等
		click_show() {
			var is_show = this.is_show_el_name;
			this.is_show_el_name = !is_show;
		},
		// 点击 切换 影投 等
		el_name_click(index, time) {
			var time_data = ''; // 当前选的什么 模式
			var id = this.id;
			var num = '';
			if (index == 0) {
				time_data = 'brd';
				num = 1;
			} else if (index == 1) {
				time_data = 'city';
				num = 0;
			} else {
				time_data = 'district';
				num = 2;
			}
			var url = 'https://db.topcdb.com/topprogram/get-report-yusuan?movie_id=' + id + '&' + time_data + '=' + time_data;
			this.db_index(url);
			this.num = num;
			this.click_name_index = index;
			this.click_name_time = time;
			this.is_show_el_name = true;
		},
		// 数据调用
		async db_index(url) {
			
			const [errer, ra] = await uni.request({
				url
			});
			console.log(ra.data);
			if (ra.data.data.length == 0) {
				this.is_show = false;
				return;
			}else {
				uni.showLoading({
					title: '正在加载中'
				});
			}
			ra.data.data.forEach(item => {
				item.movie_ys = (Number(item.movie_ys) / 10000).toFixed(2);
			});
			if (this.num == 0) {
				//
				if (ra.data.sum.brd != '') {
					ra.data.sum.wz_dd = ra.data.sum.brd;
				} else if (ra.data.sum.district) {
					ra.data.sum.wz_dd = ra.data.sum.district;
				} else if (ra.data.sum.city) {
					ra.data.sum.wz_dd = ra.data.sum.city;
				}
			}
			ra.data.sum.total_ys = (Number(ra.data.sum.total_ys) / 10000).toFixed(2) 
			
			this.All_data = ra.data;
			uni.hideLoading();
		}
	}
};
</script>

<style lang="less">
.cut_pattern {
	width: 160upx;
	height: 50upx;
	color: #ffffff;
	background-color: #f08e2d;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 28upx;
	margin-left: 40upx;
	image{
		width: 16upx;
		height: 16upx;
		margin-left: 10upx;
	}
}
.el_name {
	position: absolute;
	top: 150upx;
	left: 40upx;
	width: 160upx;
	border: 1px solid #000000;
	background-color: #fff;
	font-size: 28upx;

	view {
		display: flex;
		align-items: center;
		justify-content: center;
		border-bottom: 2upx solid #000000;
		height: 45upx;
		&:nth-child(3) {
			border: 0;
		}
	}
}
.table_name {
	padding: 0 0upx 50upx 20upx;
}
.table {
	width: 750upx;
	padding: 40upx 20upx;
	box-sizing: border-box;
	// 底部时间

	.bottom_data {
		padding-top: 70upx;
		padding-left: 10upx;
		color: #666;
		font-size: 20upx;
		display: flex;
		view:nth-child(2) {
			padding-left: 50upx;
		}
	}
	// title
	.title {
		padding: 0 20upx 50upx 20upx;
		font-weight: 500;
	}
	// 底部
	.foot {
		display: flex;
		// background-color:pink;

		color: #000000;
		border-bottom: 2upx solid #fff;
		&:nth-child(odd) {
			background-color: #f8cbad;
		}
		&:nth-child(even) {
			background-color: #fce4d6;
		}
		view:nth-child(1) {
			width: 70%;
			text-align: left;
			padding-left: 10upx;
			box-sizing: border-box;
		}
		view:nth-child(2) {
			width: 30%;
			border-left: 2upx solid #fff;
			text-align: right;
			// padding-right: 20upx;
		}
	}
	// 头部
	.header {
		// width: ;
		display: flex;
		background-color: #ff8000;
		color: #fff;
		view:nth-child(1) {
			width: 70%;
			text-align: left;
			box-sizing: border-box;
			padding-left: 10upx;
		}
		view:nth-child(2) {
			width: 30%;
			border-left: 2upx solid #fff;
			text-align: right;
			padding-right: 20upx;
			box-sizing: border-box;
		}
	}
}
.header_is_show {
	width: 750upx;
	height: 100vh;
	background-color: #ffffff;
	font-size: 30upx;
	font-weight: 600;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 0 40upx;
	box-sizing: border-box;
}
</style>
