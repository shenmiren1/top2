<template>
	<view>
		<view class="hader_titile">{{ Alldata.title }}</view>
		<!-- <cover-view c;a>ni</cover-view> -->
		<!-- 这里要放别的 -->
		<view class="hader_center">
			<view class="hader_center_top" :style="{ position: 'relative' }">
				<view class="name_border">
					<text @tap="xs_tap">{{ Alldata.bd_name }}</text>

					<image @tap="xs_tap" src="../../../static/report/next.png" />
				</view>
				<cover-view class="hader_center_pos" :hidden="xs_Br">
					<cover-view class="nn_cover-view" @click="tz_yp_index(0)">相关线索</cover-view>
					<cover-view class="nn_cover-view" @click="showloading(0)">详细数据</cover-view>
					<!-- <cover-view class="nn_cover-view" @click="ys_fb(0)">预算分拨</cover-view> -->
				</cover-view>
			</view>
			<view class="hader_center_top" :style="{ position: 'relative' }">
				<view class="name_border">
					<text @tap="header_center_name">{{ Alldata.movie_name }}</text>
					<image @tap="header_center_name" src="../../../static/report/next.png" />
				</view>
				<cover-view class="hader_center_pos" :hidden="xs_Br_tow">
					<cover-view class="nn_cover-view" @click="tz_yp_index(1)">相关线索</cover-view>
					<cover-view class="nn_cover-view" @click="showloading(1)">详细数据</cover-view>
					<!-- <cover-view class="nn_cover-view" @click="ys_fb(1)">预算分拨</cover-view> -->
				</cover-view>
			</view>
			<view class="hader_center_top" :style="{ position: 'relative' }">
				<view class="name_border"  @click="ys_fb(1)">
					<text>预算分拨</text>
					<image src="../../../static/report/next.png" />
				</view>
			</view>
		</view>

		<!-- 图表 -->

		<view class="conter">{{Alldata.content}}</view>
		<view class="canvas_view" :hidden="cavas_Br"><canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts" @touchstart="touchColumn"></canvas></view>
		<view class="image">
			<image v-if="undefined != Alldata.image" :src="'https://db.topcdb.com/' + Alldata.image" mode=""></image>
		</view>
		<view class="header_time">
			<view>来源：拓普数据实验室</view>

			<view>{{ Alldata.updated }}</view>
			<view class="read_data">{{ Alldata.read_data }} 阅读</view>
		</view>

		<!-- 最后评论 -->
		<view class="fiexd">
			<input type="text" placeholder="缺少你的神评" value="" />
			<image src="../../../static/report/wx.png" mode=""></image>
			<image src="../../../static/report/dz.png" mode=""></image>
			<image src="../../../static/report/fx.png" mode=""></image>
			<image src="../../../static/report/xg.png" mode=""></image>
		</view>

		<!-- 跳转注册页 -->
		<view class="register"><view @tap="web_register_data">点击，了解跟多电影行业资讯</view></view>
	</view>
</template>

<script>
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';
var _self;
var canvaColumn = null;
export default {
	data() {
		return {
			// 图表
			touchColumn_data: [], // 只显示一个
			cavas_Br: false,
			ColumnStack_x: [], // 图标的日期
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			// 图表
			xs_Br_tow: true,
			e: {},
			xs_Br: true,
			Alldata: {
				bdate: '2019-09-06',
				brd: null,
				city: null,
				content:
					'《最长1枪》在2019-09-04上映前第2天，再次与北京唐阁沟通，排片增加13场，此次排场占该影投排场量的3.79%，到目前为止，北京唐阁旗下共有19家影院为《最长1枪》开设了预售场次，累计排场达14场，占比该影投当日排场4.08%',
				district: null,
				image: '/uploads/movie_thumb/0/0_300X500_6650_89d81629.jpg',
				img: Object,
				movie_id: '6650',
				new_type: '3',
				nid: '096a8543857f78228d514521c5639151',
				read_data: '4',
				sdate: '2019-09-04',
				title: '影片《最长1枪》在北京唐阁影投大规模排片',
				updated: '2019-09-04',
				zan_data: null
			},
			id: ''
		};
	},
	onLoad(res) {
		_self = this;
		this.e = res;
		let id = res.id;
		let brd = res.brd;
		let district = res.district;
		let city = res.city;
		var url = 'https://db.topcdb.com/topprogram/get-report-detail?id=' + id + '&city=' + city + '&district=' + district + '&brd=' + brd;
		// console.log(url);
		this.id = id;
		this.db_index(url);

		var url = 'https://db.topcdb.com/topprogram/add-read-data?id=' + id;
		uni.request({
			url
		});

		//#ifdef MP-ALIPAY
		uni.getSystemInfo({
			success: function(res) {
				if (res.pixelRatio > 1) {
					//正常这里给2就行，如果pixelRatio=3性能会降低一点
					//_self.pixelRatio =res.pixelRatio;
					_self.pixelRatio = 2;
				}
			}
		});
		//#endif
		this.cWidth = uni.upx2px(750);
		this.cHeight = uni.upx2px(500);
	},
	methods: {
		ys_fb(index) {
			var { movie_id: id, brd, district, city,id:mid } = this.Alldata;
			if (brd == null) {
				brd = '';
			}
			if (district == null) {
				district = '';
			}
			if (city == null) {
				city = '';
			}
			
			if (index == 0) {
				uni.navigateTo({
					url:'./budget_data/budget_data?brd=' + brd + '&district=' + district + '&city=' + city + '&num=' + 0
				})
			} else if (index == 1) {
				
				uni.navigateTo({
					url:'./budget_data/budget_data?movie_id=' + id + '&brd=' + brd + '&district=' + district + '&city=' + city + '&num=' + 1
				})
			}
		},
		// 跳转当前影片的 详细
		tz_yp_index(index) {
			if (index == 1) {
				var { movie_id: movie_id } = this.Alldata;
				uni.navigateTo({
					url: './re_list/re_list?movie_id=' + movie_id + '&Br=' + true
				});
			} else {
				var res = this.e;
				let brd = res.brd;
				let district = res.district;
				let city = res.city;

				uni.navigateTo({
					url: './re_list/re_list?brd=' + brd + '&district=' + district + '&city=' + city
				});
				this.xs_Br = true;
			}
		},
		// 图表

		showColumnStack(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				legend: true,
				fontSize: 11,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true
				},
				yAxis: {
					// disabled:true
				},
				dataLabel: false,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					column: {
						type: 'stack',
						width: (_self.cWidth * _self.pixelRatio * 0.5) / chartData.categories.length
					}
				}
			});
		},
		touchColumn(e) {
			var x = [...this.ColumnStack_x];
			var ins = canvaColumn.getCurrentDataIndex(e);
			// console.log(ins);
			var that = this;
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					// category
					return x[ins] + ' ' + item.name + ':' + item.data;
				}
			});
		},
		// 图表
		showloading(index) {
			if (index == 1) {
				var res = this.Alldata;
				var id = res.id;
				var zz_id = res.zz_id;
				uni.navigateTo({
					url: '../../../pagesA/dy_particulars/dy_particulars?mid=' + id + '&id=' + zz_id
				});
			} else {
				uni.showToast({
					title: '暂无内容，敬请期待',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		// 跳转 注册页
		web_register_data() {
			uni.redirectTo({
				url: './zc_tz/zc_tz'
			});
		},

		// name跳转
		header_center_name() {
			var Br = this.xs_Br_tow;
			if (Br) {
				Br = false;
			} else {
				Br = true;
			}
			this.xs_Br_tow = Br;
		},
		xs_tap() {
			var Br = this.xs_Br;
			if (Br) {
				Br = false;
			} else {
				Br = true;
			}
			this.xs_Br = Br;
		},
		db_index(url) {
			uni.request({
				url
			}).then(dd => {
				let [errer, ra] = dd;
				var res = ra.data;
				console.log(res);
				res.updated = res.updated.slice(0, 10);
				for (let i in res.img) {
					res.image = res.img[i];
				}
				var a = res.content.split('。');
				if (res.read_data == null) {
					res.read_data = 0;
				}
				// console.log(res.brd);
				if (res.brd != null) {
					res.bd_name = res.brd;
				} else if (res.city != null) {
					res.bd_name = res.city;
				} else if (res.district != null) {
					res.bd_name = res.district;
				}

				// 图表
				let ColumnStack = { categories: [], series: [] };
				var name = '';
				var index = 0;
				var Tb_Br = false;
				var color = ['#FF8800', '#4169E1'];
				for (let i in res.js) {
					if (res.js[i].length != 0 && i != 'x') {
						// console.log(i);
						if ('session' == i) {
							name = '昨日场次';
						} else if ('xz_session' == i) {
							name = '新增场次';
						} else if ('gd_session' == i) {
							name = '黄金场';
						} else if ('yl_session' == i) {
							name = '幽灵场';
						} else if ('total_bo' == i) {
							name = '累计票房';
						} else if ('xz_bo' == i) {
							name = '新增票房';
						}

						if (res.js.session === undefined) {
							Tb_Br = true;
							_self.cavas_Br = Tb_Br;
						} else {
							var arr = [];
							arr = res.js[i].map((item, i) => {
								return Number(item);
							});
							ColumnStack.series.push({ name: name, data: arr, color: color[index] });
							index++;
						}
					}
				}

				if (Tb_Br) {
				} else {
					var x = res.js.x;
					var ar_X = [];
					if (x.length > 3) {
						ar_X = x.map(item => {
							return item.slice(5);
						});
						ColumnStack.categories = ar_X;
					} else {
						ColumnStack.categories = res.js.x;
					}
					// console.log(ColumnStack);
					_self.showColumnStack('canvasColumnStack', ColumnStack);
					// 图表
					// console.log(res);
					this.cavas_Br = Tb_Br;
					this.ColumnStack_x = x;
				}

				this.Alldata = res;
			});
		}
	}
};
</script>

<style lang="less">
page {
	// padding: ;
	background-color: #fff;
	padding-bottom: 150upx;
}
.canvas_view {
	padding: 40upx 0;
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.register {
	display: flex;
	justify-content: center;
	view {
		display: flex;
		align-items: center;
		justify-content: center;
		width: 450upx;
		height: 100upx;
		// background-color: #F08E2D;
		border: 1px solid #007aff;
		font-size: 30upx;
		color: #007aff;
		margin-top: 50upx;
	}
}

.hader_center {
	display: flex;
	padding-left: 30upx;
	font-size: 24upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	padding-top: 19upx;
	
	.hader_center_top{
		margin-left: 30upx;
	}
	.name_border {
		border: 2upx solid #f08e2d;
		color: #000000;
		padding: 10upx;
		// border-radius: 60upx;
		background-color: #F08E2D;
	}
	.hader_center_pos {
		position: absolute;
		background-color: #fff;
		top:56upx;
		z-index:10;
		.nn_cover-view {
			width: 112upx;
			font-size: 28upx;
			font-family: PingFangSC;
			font-weight: 400;
			color: #000000;
			margin: 20upx 24upx;
			&:nth-child(2) {
				border-top: 1px solid #eeeeee;
			}
		}

		.active {
			color: #f08e2d;
		}
	}

	image {
		width: 16upx;
		height: 16upx;
		margin-left: 10upx;
	}

	view:nth-child(1) {
		margin: 0;
		color:#fff;
	}

	view:nth-child(2) {
		color:#fff;
		// padding-left: 50upx;
	}
	view:nth-child(3) {
		color:#fff;
		// padding-left: 50upx;
	}
}


.fiexd {
	position: fixed;
	bottom: 0;
	display: flex;
	align-items: center;
	justify-content: space-between;
	height: 98upx;
	width: 750upx;
	// background-color:#666;
	border: 1px solid #dbd9dc;
	background-color: #fff;
	// padding-right:30upx;
	input {
		width: 376upx;
		height: 60upx;
		background: rgba(245, 246, 248, 1);
		border-radius: 30px;
		font-size: 24upx;
		margin-left: 28upx;
		padding-left: 56upx;
	}

	image {
		width: 40upx;
		height: 40upx;
	}

	image:nth-child(4) {
		// padding-right: 30upx;
	}

	image:last-child {
		position: absolute;
		width: 20upx;
		height: 20upx;
		left: 53upx;
	}
}

.read_data {
	// padding-top: 46upx;
	padding-left: 52upx;
	font-size: 20upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(142, 142, 142, 1);
}

.image {
	// display: flex;
	// flex-wrap: wrap;
	padding-top: 40upx;
	padding: 40upx 52upx 41upx 52upx;

	image {
		// border: 1px solid red;
		// width: 24%;
		width: 750 - 40 - 41upx;
		// height: 250 * 2upx;
		height: 750 - 40 - 41upx;
	}
}

.conter {
	font-size: 24upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	padding-left: 52upx;
	padding-right: 52upx;
	padding-top: 42upx;
}

.header_time {
	width: 750upx;
	padding-left: 30upx;
	display: flex;
	// justify-content: space-between;
	font-size: 20upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(142, 142, 142, 1);

	view:nth-child(2) {
		padding-left: 100upx;
	}
}

.hader_titile {
	font-size: 30upx;
	font-family: PingFangSC;
	font-weight: 400;
	color: rgba(0, 0, 0, 1);
	padding: 32upx 0 14upx 30upx;
}
</style>
