<template>
	<!-- tabthree -->
	<view class="" :hidden="!(header_index == 2)">
		<view class="header_data_zi">
			<view @tap="header_click(index)" v-for="(item, index) in header_data_data" :key="index">
				{{ item }}
				<image src="../../../../static/big-plate/xia.png" mode=""></image>
			</view>
		</view>

		<!-- 最多展示6个  影院选择-->
		<view class="Cinema_to" v-if="!CinemaClick_isShow">
			<view
				class="cha"
				@tap="
					() => {
						this.CinemaClick_isShow = true;
					}
				"
			>
				×
			</view>
			<scroll-view scroll-y>
				<view @tap="Cinema_to_click(item)" :style="{ color: item.pitch ? '#F08E2D' : '' }" v-for="(item, index) in All_data.cinemaAr" :key="index">
					{{ item.cinema_name }}
				</view>
			</scroll-view>
		</view>

		<!-- 票房人次选择 -->
		<cover-view class="Cinema_select" v-if="select_isShow">
			<cover-view :style="{ color: item == header_data_data[0] ? '#F08E2D' : '' }" @tap="Cinema_select_click(item)" v-for="(item, index) in Cinema_person" :key="index">
				{{ item }}
			</cover-view>
		</cover-view>

		<!-- 选择年 月  档期 -->
		<cover-view class="Cinema_select" v-if="select_isShow_time">
			<cover-view
				:style="{ color: item == header_data_data[1] ? '#F08E2D' : '' }"
				@tap="Cinema_select_time_click(item, index)"
				v-for="(item, index) in Cinema_person_time"
				:key="index"
			>
				{{ item }}
			</cover-view>
		</cover-view>

		<view class="" :hidden="!CinemaClick_isShow || time_isshow">
			<canvas
				canvas-id="canvasLineA"
				id="canvasLineA"
				class="charts"
				disable-scroll="true"
				@touchstart="touchLineA"
				@touchmove="moveLineA"
				@touchend="touchEndLineA"
			></canvas>
		</view>

		<view class="city_xuan">
			<view @tap="city_click(index, item)" :class="[index == city_index ? ' active' : '']" v-for="(item, index) in city_data" :key="index">{{ item }}</view>
		</view>

		<view class="time_click" :hidden="!time_isshow">
			<!-- 关闭按钮 -->
			<view
				class="cha"
				@tap="
					() => {
						this.time_isshow = false;
					}
				"
			>
				×
			</view>
			<!-- 选择月 -->
			<view v-if="time_tab == 0 && time_isshow">
				<view class="month">
					<view class="year_sel">
						<view v-for="(item, index) in year" @tap="tap_year(item, index)" :class="[index == curren ? 'active' : '']" :key="index">{{ item }}</view>
					</view>
					<view class="month_sel">
						<view v-for="(item, index) in month" :style="{ backgroundColor: ALL_month_index == index ? '#F08E2D' : '' }" @tap="check_month(item, index)" :key="index">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			<!-- 选择月 -->

			<!-- 年 -->
			<view class="year" v-if="time_tab == 1 && time_isshow">
				<view
					class="only_year"
					:style="{ backgroundColor: year_index == index ? '#F08E2D' : '' }"
					@tap="check_year(item, index)"
					v-for="(item, index) in year"
					:key="index"
				>
					{{ item }}
				</view>
				<!-- data-year="{{item}}" -->
			</view>
			<!-- 年 -->

			<!-- 档期 -->
			<view class="dq_main" :hidden="!(time_tab == 2 && time_isshow)">
				<view style="text-align:center;">选择档期</view>
				<view @tap="tabthree_dq_tap(item, index)" v-for="(item, index) in festival_title" :key="index">
					<text>{{ item }}</text>
				</view>
			</view>
			<!-- 档期 -->
		</view>

		<!-- 底部数据展示Cinema_to  -->
		<view class="bottom">
			<view class="title">影院明细</view>
			<view class="bottom_data">
				<!-- 名字 -->
				<view class="bottom_data_title">
					<view>影院名称</view>
					<!-- 影院名称 -->
					<view class="bottom_data_title_name" v-for="(item, index) in All_name" :key="index">{{ item }}</view>
				</view>
				<scroll-view scroll-x class="scroll-x">
					<!-- 日期时间 -->
					<view class="scroll_title">
						<text class="scroll_title_tetx" v-for="(item, index) in All_data.echarts_data.xAxis_data" :key="index">{{ item }}</text>
					</view>
					<!-- 数据展示 -->
					<view class="scroll_data" v-for="(item, index) in bottom_data" :key="index">
						<text class="scroll_data_text" v-for="(it, ind) in item" :key="ind">{{ it }} 万</text>
					</view>
				</scroll-view>
			</view>
		</view>
		
		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import moment from '@/components/moment';
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';

var _self;
var canvaLineA = null;
/* All_data:[], // 里边保存了所有数据  cinemaAr 是列表数据 但是存着 code 可以去data中查找 */
export default {
	data() {
		return {
			data_year: '' /* 开始年,结束年*/,
			dq_data: '' /* 档期储存*/,
			start_day: '', // 月开始
			end_day: '' /* 月结束*/,
			festival_title: [], // 档期数据
			year_data: [], // 保存点击的年
			year_index: -1, // 年样式
			ALL_month_index: -1, // 第一次选择的月样式
			is_year: 2019, //选择的年，每一次都会储存起来不会。有不一样的年
			ALL_month: [], //存点击的月
			curren: 0,
			month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			year: [], //所有的年
			time_tab: 0, //  日期选择 档期 年 月
			time_isshow: false, //  日期选择 档期 年 月
			All_name: [],
			bottom_data: [], // 底部展示数据 是一个多维数组
			dtype: 'month', // c传值
			select_isShow_time: false,
			Cinema_person_time: ['按月', '按年', '档期'],
			city_index: 2, // 地区样式
			city_data: ['--', '--', '三公里', '一公里'],
			header_data_data: ['票房', '按月', '--', '影院选择'],
			All_data: [], // 里边保存了所有数据  cinemaAr 是列表数据 但是存着 code 可以去data中查找Cinema_to_click
			CinemaClick_isShow: true, // 影院选择
			select_isShow: false,
			Cinema_person: ['票房', '人次'],
			code_data: [], // 选中的影院
			// canvas
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: '',
			index_search: 0 // 当前处于 票房还是人次还是节气
			// canvas
		};
	},
	computed: {
		...mapState({
			header_index: 'map_particulars_tabtow_header_index',
			res: 'map_particulars_res'
		})
	},
	watch: {
		//    初始 函数 监听 index
		header_index() {
			if (this.header_index == 2) {
				var res = this.res;
				let { city, district, latitude, longitude } = res;
				var url = '/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude;
				//
				let city_data = [...this.city_data];
				city_data[0] = city;
				city_data[1] = district;
				this.city_data = city_data;
				/*canvas  初始化*/
				_self = this;
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
				this.cHeight = uni.upx2px(700);
				this.city_index = 2;

				// n年初始化
				var time_end = moment().format('YYYY');
				let year = [];
				for (var i = Number(time_end); i >= 2012; i--) {
					year.push(i);
				}
				this.year = year;

				// 档期 数据初始化
				this.dq_timeData();
				/* canvas初始化 */
				this.bd_index(url);
			}
		},

		//监听 图表code  是否变化 监听票房
		code_data() {
			var index_search = this.index_search;
			this.ucharts_sear_data(index_search);
		}
	},
	methods: {
		/* 档期选择 */
		tabthree_dq_tap(item, index) {
			var header_data_data = [...this.header_data_data];
			header_data_data[2] = item;
			var dtype = this.dtype;

			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var url = '/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude + '&schedule=' + index + '&dtype=' + dtype;

			this.dq_data = index;
			this.bd_index(url);
			this.header_data_data = header_data_data;
			this.time_isshow = false;
		},
		// 年点击
		check_year(item, index) {
			if (this.year_data instanceof Array) {
				var year = this.year_data;
			} else {
				var year = [];
			}
			year.push(Number(item));
			// 提示选择 结束年
			if (year.length == 1) {
				uni.showToast({
					title: '请选择结束年',
					icon: 'none',
					mask: true,
					duration: 2000
				});
			}

			this.year_data = year;
			this.year_index = index;
			//   有了两个数之后
			if (year.length == 2) {
				if (year[0] == year[1]) {
					uni.showToast({
						title: '请勿选择同一年',
						icon: 'none',
						mask: true,
						duration: 2000
					});
					this.year_data = year[0];
					return false;
				}

				var code = this.code;
				if (year[0] > year[1]) {
					var end_data = year[0];
					var strat_data = year[1];

					var header_data_data = [...this.header_data_data];
					header_data_data[2] = strat_data + '年' + '-' + end_data + '年';
					var dtype = this.dtype;

					var res = this.res;
					let { city, district, latitude, longitude } = res;
					var url = '/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude + '&year_ar=' + strat_data + ',' + end_data + '&dtype=' + dtype;
					this.data_year = strat_data + ',' + end_data; // 储存选择的年
					this.bd_index(url);
					year.length = 0; /* 清空数组*/
					this.year_data = year; /* 清空数组*/
					this.time_isshow = false;
					this.year_index = -1;
				} else if (year[1] > year[0]) {
					var end_data = year[1];
					var strat_data = year[0];

					var header_data_data = [...this.header_data_data];
					header_data_data[2] = strat_data + '年' + '-' + end_data + '年';
					var dtype = this.dtype;

					var res = this.res;
					let { city, district, latitude, longitude } = res;
					var url = '/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude + '&year_ar=' + strat_data + ',' + end_data + '&dtype=' + dtype;

					this.bd_index(url);

					this.data_year = strat_data + ',' + end_data; // 储存选择的年
					year.length = 0;
					this.year_data = year;
					this.time_isshow = false;
					this.year_index = -1;
				}
			}
		},

		// 月里边的年点击
		tap_year(item, index) {
			var year = item;
			var week = [];
			var is_weekend = 0;
			var d = new Date(year, 0, 1);

			while (d.getDay() != 1) {
				d.setDate(d.getDate() + 1);
			}
			var to = new Date(year + 1, 0, 1);
			while (to.getDay() != 1) {
				to.setDate(to.getDate() + 1);
			}
			var i = 1;
			this.is_year = year;
			console.log(index);

			this.curren = index;
		},
		/*  月点击 */
		check_month(item, index) {
			if (item.length == 3) {
				var it = Number(item.slice(0, 2));
			} else {
				var it = Number(item.slice(0, 1));
			}
			if (this.ALL_month instanceof Array) {
				var ALL_month = [...this.ALL_month];
			} else {
				var ALL_month = [];
			}
			var that = this;
			var max_day = moment();
			var month = it; //选择的月
			var year = this.is_year - 0; //选择的年

			// 判断两次点击的是否一样
			if (ALL_month.length == 0) {
				var time = new Date(year + '-' + month + '-' + '01').getTime();
				if (ALL_month[0] == time) {
					uni.showToast({
						title: '请勿点击同一月',
						duration: 2000,
						icon: 'none'
					});
					this.ALL_month = ALL_month[0];
					return false;
				} else {
					uni.showToast({
						title: '请选择结束月',
						duration: 2000,
						icon: 'none'
					});
				}
			}
			ALL_month.push(new Date(year + '-' + month + '-' + '01').getTime());
			this.ALL_month_index = index;
			this.ALL_month = ALL_month;
			// 点击不时
			console.log(ALL_month);
			if (ALL_month.length == 2) {
				var code = this.code;
				if (ALL_month[0] > ALL_month[1]) {
					var end_month = new Date(ALL_month[0]);
					var start_month = new Date(ALL_month[1]);
					var i = 0;
					var arr = [];
					console.log(start_month);
					for (var from = start_month; from < end_month; i++) {
						arr.push(moment(from).format('YYYY-MM'));
						from.setMonth(from.getMonth() + 1);
					}
					// console.log(arr);
					if (arr.length > 12) {
						uni.showToast({
							title: '最多选择12个月'
						});
						this.ALL_month = ALL_month[0];
						return false;
					} else {
						// 这里写逻辑
						var start_day = moment(new Date(ALL_month[1])).format('YYYY-MM');
						var end_day = moment(new Date(ALL_month[0])).format('YYYY-MM');

						var end_day_show = moment(new Date(ALL_month[1])).format('YYYY年-MM月'); /* 页面用年月日*/
						var start_day_show = moment(new Date(ALL_month[0])).format('YYYY年-MM月'); /* 页面用年月日*/

						var header_data_data = [...this.header_data_data];
						header_data_data[2] = start_day_show + '-' + end_day_show;
						var dtype = this.dtype;

						var res = this.res;
						let { city, district, latitude, longitude } = res;
						var url =
							'/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude + '&month=' + start_day + '&month_end=' + end_day + '&dtype=' + dtype;

						this.bd_index(url);
						this.header_data_data = header_data_data; /* title*/

						this.start_day = start_day; /* 点击需要*/
						this.end_day = end_day; /* 点击需要*/
						this.ALL_month_index = -1; /* 修改月选种样式*/
						ALL_month.length = 0; /* 清空数组*/
						this.ALL_month = ALL_month; /* 清空数组*/
						this.is_year = 2019; /* 修改默认年*/
						this.curren = 0; /* 徐修改默认样式*/
						this.time_isshow = false; /* 关闭*/
					}
					// 先点小 后点大
				} else if (ALL_month[1] > ALL_month[0]) {
					var end_month = new Date(ALL_month[1]);
					var start_month = new Date(ALL_month[0]);
					var i = 0;
					var arr = [];
					console.log(start_month);
					for (var from = start_month; from < end_month; i++) {
						arr.push(moment(from).format('YYYY-MM'));
						from.setMonth(from.getMonth() + 1);
					}
					// console.log(arr);
					if (arr.length > 12) {
						uni.showToast({
							title: '最多选择12个月'
						});
						this.ALL_month = ALL_month[0];
						return false;
					} else {
						// 这里写逻辑
						var start_day = moment(new Date(ALL_month[0])).format('YYYY-MM');
						var end_day = moment(new Date(ALL_month[1])).format('YYYY-MM');
						var start_day_show = moment(new Date(ALL_month[0])).format('YYYY年-MM月');
						var end_day_show = moment(new Date(ALL_month[1])).format('YYYY年-MM月');

						var header_data_data = [...this.header_data_data];
						header_data_data[2] = start_day_show + '-' + end_day_show;
						var dtype = this.dtype;

						var res = this.res;
						let { city, district, latitude, longitude } = res;
						var url =
							'/topprogram/compete-operate?dtype=month&lat=' + latitude + '&lng=' + longitude + '&month=' + start_day + '&month_end=' + end_day + '&dtype=' + dtype;

						this.bd_index(url);
						this.start_day = start_day; /* 点击需要*/
						this.end_day = end_day; /* 点击需要*/
						this.header_data_data = header_data_data; /* title*/
						this.ALL_month_index = -1; /* 修改月选种样式*/
						ALL_month.length = 0; /* 清空数组*/
						this.ALL_month = ALL_month; /* 清空数组*/
						this.is_year = 2019; /* 修改默认年*/
						this.curren = 0; /* 徐修改默认样式*/
						this.time_isshow = false; /* 关闭*/
					}
				}
			}
		},
		// 位置选择
		city_click(index, item) {
			var res = this.res;
			var dtype = this.dtype;
			let { city, district, latitude, longitude } = res;

			/* 时间这里空缺 还诶有写时间还是档期 */
			var url = '/topprogram/compete-operate?lan=' + latitude + '&lng=' + longitude + '&dtype=' + dtype;

			if (index == 2) {
				item = 3000;
			} else if (index == 3) {
				item = 1000;
			}

			if (index == 0) {
				if (item.indexOf('市') != -1 || item.indexOf('省') != -1) {
					var a = item.indexOf('市');
					// console.log(a)
					item = item.slice(0, a);
				}
				url += '&distance_meters=city,' + item;
			} else if (index == 1) {
				url += '&distance_meters=county,' + item;
			} else {
				url += '&distance_meters=' + item;
			}

			/* 这里判断是 什么档期 */
			if (dtype == 'month') {
				/* 月 */
				var start_day = this.start_day; /* 月开始*/
				var end_day = this.end_day; /* 月结束*/
				url += '&month=' + start_day + '&monthend=' + end_day;
			} else if (dtype == 'year') {
				/* 年 */
				var data_year = this.data_year; /* 开始年,结束年*/
				url += '&year_ar=' + data_year;
			} else if (dtype == 'schedule') {
				/* 档期 */
				var dq_data = this.dq_data; /* 档期储存*/
				url += '&schedule=' + dq_data;
			}
			this.bd_index(url);
			this.city_index = index;
		},
		// 年 月  档期  选择
		Cinema_select_time_click(it, index) {
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var url = '/topprogram/compete-operate?lat=' + latitude + '&lng=' + longitude;
			var dtype = ''; // 存传什么值
			if (index == 0) {
				url += '&dtype=month';
				dtype = 'month';
			} else if (index == 1) {
				url += '&dtype=year';
				dtype = 'year';
			} else {
				url += '&dtype=schedule';
				dtype = 'schedule';

				var header_data_data = [...this.header_data_data];
				header_data_data[2] = '元旦节'; // 初始化时间
				this.header_data_data = header_data_data;
			}
			this.time_tab = index;
			this.dtype = dtype;
			var header_data_data = [...this.header_data_data];
			header_data_data[1] = it;
			this.header_data_data = header_data_data;
			this.select_isShow_time = false;
			this.bd_index(url);
		},
		showLineA(canvasId, chartData) {
			canvaLineA = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'line',
				fontSize: 11,
				padding: [15, 15, 0, 15],
				legend: {
					fontSize: 12,
					show: true,
					padding: 10,
					itemGap: 10,
					lineHeight: 24,
					margin: 5
				},
				dataLabel: false,
				dataPointShape: false,
				dataPointShapeType: 'hollow',
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true, //开启图表拖拽功能
				xAxis: {
					disableGrid: true,
					type: 'grid',
					gridType: 'dash',
					itemCount: 4,
					scrollShow: true,
					scrollAlign: 'left'
				},
				yAxis: {
					//disabled:true
					gridType: 'solid ',
					splitNumber: 8,
					min: 0,
					max: 10,
					format: val => {
						var index_search = this.index_search;
						let item = '';
						if (index_search == 0) {
							item = '万';
						} else if (index_search == 1) {
							item = '万';
						}
						return val.toFixed(0) + item;
					} //如不写此方法，Y轴刻度默认保留两位小数
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				extra: {
					line: {
						type: 'straight'
					}
				}
			});
		},
		touchLineA(e) {
			canvaLineA.scrollStart(e);
		},
		moveLineA(e) {
			canvaLineA.scroll(e);
		},
		touchEndLineA(e) {
			canvaLineA.scrollEnd(e);
			//下面是toolTip事件，如果滚动后不需要显示，可不填写
			canvaLineA.touchLegend(e);
			canvaLineA.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		},

		/* 模式选择 */
		Cinema_select_click(item) {
			let header_data_data = [...this.header_data_data];
			header_data_data[0] = item;
			this.header_data_data = header_data_data;
			this.select_isShow = false;
			var index = 0;
			if (item == '票房') {
				index = 0;
				this.ucharts_sear_data(index);
			} else if (item == '人次') {
				index = 1;
				this.ucharts_sear_data(index);
			} else {
				index = 2;
			}
		},
		// 头部日期 影院选择点击
		header_click(index) {
			if (index == 3) {
				var CinemaClick_isShow = this.CinemaClick_isShow;
				CinemaClick_isShow = !CinemaClick_isShow;
				this.CinemaClick_isShow = CinemaClick_isShow;
				this.select_isShow = false;
				this.CinemaClick_isShow = CinemaClick_isShow;
			} else if (index == 0) {
				this.CinemaClick_isShow = true;
				var select_isShow = this.select_isShow;
				select_isShow = !select_isShow;
				this.select_isShow = select_isShow;
			} else if (index == 1) {
				var select_isShow_time = this.select_isShow_time;
				this.select_isShow_time = !select_isShow_time;
			} else if (index == 2) {
				this.time_isshow = true;
				console.log(index);
			}
		},
		// 影院选择
		Cinema_to_click(item) {
			var { cinemaAr, data } = Object.assign({}, this.All_data);
			var All_data = Object.assign({}, this.All_data);
			var code_data = [...this.code_data];
			// let  = Object.assign({},All_data.cinemaAr)
			var code = [];
			// 取消选中
			if (item.pitch) {
				var cinema_code = cinemaAr[item.cinema_code].cinema_code;
				for (let i = 0; i < code_data.length; i++) {
					if (!(code_data[i].cinema_code == cinema_code)) {
						code.push(code_data[i]);
					}
				}
				cinemaAr[item.cinema_code].pitch = false;
			} else {
				let br = 0;
				for (let i in cinemaAr) {
					if (cinemaAr[i].pitch) {
						br++;
					}
				}
				//  选中6条提示  否则就选中
				if (br >= 6) {
					uni.showToast({
						title: '最多选择6条',
						icon: 'none',
						duration: 2000
					});
					return false;
				} else {
					code = code_data;
					cinemaAr[item.cinema_code].pitch = true;
					code.push(cinemaAr[item.cinema_code]);
				}
			}
			this.code_data = code;
			All_data.cinemaAr = cinemaAr;
			this.All_data = All_data;
		},
		// 档期初始化
		async dq_timeData() {
			var { data } = await this.$http.get({ url: '/topprogram/get-schedule' });
			this.festival_title = data;
		},
		// 图表 单独接口  票房
		ucharts_sear_data(index_search = 0) {
			/*   0 是票房1 是人次 2 是节气*/
			var { data: AllBottom_data, echarts_data } = this.All_data;
			var code_data = [...this.code_data];

			let LineA = { categories: [], series: [] };
			// x 轴显示
			var color = ['#88DC2D', '#F68C3C', '#3E8EF2', '#FF574D', '#1FD7DC', '#E1270B'];
			var color_index = 0;
			LineA.categories = echarts_data.xAxis_data;
			var bottom_data = []; // 保存， 所有的值
			var All_name = []; // s所有的名称
			code_data.forEach((item, index) => {
				for (let ind in AllBottom_data) {
					// 目前选中的 影院
					if (ind == item.cinema_code) {
						var series_data = [];

						if (index_search == 0) {
							//  这里 循环 是保存data 图表中的数据
							for (let index_z in AllBottom_data[ind]) {
								series_data.push(Number(AllBottom_data[ind][index_z].total_bo_s2));
							}
							All_name.push(item.cinema_name);
							LineA.series.push({ name: item.cinema_name, data: series_data, color: color[color_index] });
							bottom_data.push(series_data);
						} else if (index_search == 1) {
							for (let index_z in AllBottom_data[ind]) {
								series_data.push(Number(AllBottom_data[ind][index_z].total_people_s2));
							}
							All_name.push(item.cinema_name);
							LineA.series.push({ name: item.cinema_name, data: series_data, color: color[color_index] });
							bottom_data.push(series_data);
						}
					}
					color_index++;
				}
			});
			// console.log(bottom_data);
			// 图表初始化
			this.All_name = All_name;
			this.bottom_data = bottom_data;
			_self.showLineA('canvasLineA', LineA);
			this.index_search = index_search;
		},
		// 接口发送
		async bd_index(url) {
			// console.log(url);
			var { data } = await this.$http.get({ url });
			var dtype = this.dtype; //  选择的档期还是什么
			let code_data = [];
			let cinemaAr = [];
			var index = 0;
			for (let i in data.cinemaAr) {
				if (index <= 5) {
					code_data.push(data.cinemaAr[i]);
					data.cinemaAr[i].pitch = true;
				} else {
					data.cinemaAr[i].pitch = false;
				}

				index++;
			}

			if (dtype == 'schedule') {
			} else {
				var header_data_data = [...this.header_data_data];
				header_data_data[2] = data.echarts_data.xAxis_data[0] + '-' + data.echarts_data.xAxis_data[data.echarts_data.xAxis_data.length - 1]; // 初始化时间
				this.header_data_data = header_data_data;
			}

			this.code_data = code_data; // 当前要显示的 的数据的code
			this.All_data = data;
		}
	}
};
</script>

<style lang="less" scoped>
/* 档期 */
.dq_main {
	width: 750upx;
	height: 100%;
	background: #fff;
	// position: fixed;
	// top: 0;
	// left: 0;
	z-index: 10;
	overflow: auto;
	view {
		padding: 0 20upx;
		font-size: 32upx;
		border-bottom: 1px solid #ccc;
		height: 80upx;
		line-height: 80upx;
	}
}
/* 档期 */
// 周
.month .year_sel {
	width: 180upx;
	text-align: center;
	.active {
		background-color: #f08e2d;
	}
}
.month {
	display: -webkit-flex;
	/* Safari */
	display: flex;
	flex-direction: row;
}
.month .year_sel {
	width: 180upx;
	text-align: center;
}

.month .year_sel view {
	height: 70upx;
	line-height: 70upx;
	border: 1px solid #e6e6e6;
	border-left: none;
	border-right: none;
}
.month .year_sel view {
	height: 70upx;
	line-height: 70upx;
	border: 1px solid #e6e6e6;
	border-left: none;
	border-right: none;
}
.month .month_sel {
	flex: 1;
	background: #fff;
}

.month_sel view {
	padding-left: 20upx;
	box-sizing: border-box;
	height: 74upx;
	line-height: 74upx;
	border: 1px solid #e6e6e6;
}
// 年
.time_click {
	width: 750upx;
	height: 100vh;
	position: fixed;
	top: 0;
	background-color: #ffffff;
	z-index: 1;
	.cha {
		width: 750upx;
		height: 40upx;
		background-color: #ffffff;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		padding-right: 40upx;
		box-sizing: border-box;
	}
	.only_year {
		background: #fff;
		height: 74upx;
		line-height: 74upx;
		border: 1px solid #e6e6e6;
		padding-left: 20upx;
		box-sizing: border-box;
		border-bottom: none;
	}
}

.bottom {
	// 标题
	.title {
		font-size: 32upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		padding: 28upx 0 24upx 30upx;
		background-color: #ffffff;
	}
	.scroll-x {
		white-space: nowrap;
		width: 750 - 200 - 20upx;
		.scroll_title {
			font-size: 22upx;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
			.scroll_title_tetx {
				width: (550 - 20) / 3upx;
				height: 80upx;
				display: inline-block;
				text-align: center;
				line-height: 80upx;
			}
		}
		.scroll_data {
			font-size: 22upx;
			font-family: PingFangSC-Medium, PingFang SC;
			font-weight: 500;
			color: rgba(0, 0, 0, 1);
			&:nth-child(even) {
				.scroll_data_text {
					background-color: #fff;
				}
			}
			.scroll_data_text {
				width: (550 - 20) / 3upx;
				height: 80upx;
				text-align: center;
				line-height: 80upx;
				display: inline-block;
			}
		}
	}
	.bottom_data {
		display: flex;
		.bottom_data_title {
			view {
				font-size: 24upx;
				font-family: PingFangSC-Regular, PingFang SC;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
				width: 200upx;
				height: 80upx;
				display: flex;
				justify-content: flex-start;
				align-items: center;
				padding-left: 20upx;
			}
			.bottom_data_title_name {
				&:nth-child(even) {
					background-color: #fff;
				}
			}
			view:nth-child(1) {
				font-size: 22upx;
				// padding-left: ;
			}
		}
	}
}
.charts {
	width: 750upx;
	height: 700upx;
	background-color: #ffffff;
}
// <!-- 票房人次 节气选择 -->
.Cinema_select {
	font-size: 24upx;
	width: 750upx;
	background-color: #ffffff;
	position: absolute;
	top: 215upx;
	z-index: 1;
	cover-view {
		height: 64upx;
		width: 750upx;
		text-align: center;
		line-height: 64upx;
		// display: flex;
		// justify-content: center;
		// align-items: center;
	}
}

// 影院选择
.Cinema_to {
	width: 750upx;
	height: 100vh;
	position: fixed;
	top: 0;
	z-index: 1;
	background-color: #ffffff;
	.cha {
		width: 750upx;
		height: 60upx;
		display: flex;
		justify-content: flex-end;
		align-items: center;
		background-color: #fff;
		padding-right: 40upx;
		box-sizing: border-box;
	}
	scroll-view {
		width: 750upx;
		height: 100vh;

		view {
			width: 750upx;
			// display:inline-block;
			height: 64upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24upx;
			box-sizing: border-box;
		}
	}
}
// 头部
.header_data_zi {
	height: 80upx;

	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(74, 74, 74, 1);
	margin-top: 10upx;
	margin-bottom: 10upx;
	background-color: #ffffff;
	padding: 0 10upx;
	box-sizing: border-box;
	//
	image {
		width: 18upx;
		height: 15upx;
		padding-left: 6upx;
	}
}
</style>
