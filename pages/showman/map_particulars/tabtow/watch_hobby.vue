<template>
	<view :hidden="!(header_index == 3)">
		<!-- tabthree -->
		<view class="header">
			<view @tap="header_click(index)" v-for="(item, index) in header_data_data" :key="index">
				{{ item }}
				<image src="../../../../static/big-plate/xia.png" mode=""></image>
			</view>
		</view>
		<view
			class="selet_pf"
			@tap="
				() => {
					this.selet_isShow = !this.selet_isShow;
				}
			"
		>
			{{ selet_name }}
			<image src="../../../../static/big-plate/xia.png" mode=""></image>
		</view>
		<!-- 模式选择 -->
		<cover-view class="cover_selet_pattern" :hidden="selet_isShow_pattern">
			<cover-view @tap="cover_selet_pattern_click('影片类型')" :style="{ color: cinemaAr == 'type' ? '#F08E2D' : '' }">影片类型</cover-view>
			<cover-view @tap="cover_selet_pattern_click('影片引进模式')" :style="{ color: cinemaAr == 'import_mode' ? '#F08E2D' : '' }">影片引进模式</cover-view>
		</cover-view>
		<!-- c场次，人次，票房等选择 -->
		<cover-view class="cover_selet" :hidden="selet_isShow">
			<cover-view @tap="cover_selet_click(item, index)" :style="{ color: selet_name == item ? '#F08E2D' : '' }" v-for="(item, index) in selst_Allname" :key="index">
				{{ item }}
			</cover-view>
		</cover-view>
		<view class="" :hidden="!cinema_selet_show  || time_isshow"><canvas canvas-id="canvasColumnStack" id="canvasColumnStack" class="charts" @touchstart="touchColumn"></canvas></view>

		<view class="city_selet">
			<view @tap="city_selet_click(item, index)" :style="{ color: city_selrt_index == index ? '#F08E2D' : '' }" v-for="(item, index) in city_selrt_data" :key="index">
				{{ item }}
			</view>
		</view>

		<!-- 底部数据展示 -->
		<!-- 底部数据展示Cinema_to  -->
		<view class="bottom">
			<view class="title">影院明细</view>
			<view class="bottom_data">
				<!-- 名字 -->
				<view class="bottom_data_title">
					<view>影院名称</view>
					<!-- 影院名称 -->

					<view class="bottom_data_title_name" v-for="(item, index) in cinema_data" :key="index">{{ item.cinema_name }}</view>
				</view>
				<scroll-view scroll-x class="scroll-x">
					<!-- title 标题 -->
					<view class="scroll_title">
						<text class="scroll_title_tetx" v-if="selet_index == 0">票房</text>
						<text class="scroll_title_tetx" v-if="selet_index == 1">场次</text>
						<text class="scroll_title_tetx" v-if="selet_index == 2">人次</text>
						<text class="scroll_title_tetx" v-if="selet_index == 3">平均票价</text>
						<text class="scroll_title_tetx" v-if="selet_index == 4">上座率</text>
						<text class="scroll_title_tetx" v-for="(item, index_d) in ColumnStack.series" :key="index_d">{{ item.name }}</text>
					</view>
					<!-- 数据展示 -->
					<view class="scroll_bottom">
						<!-- 票房，人次，场次，普及票价，上座率 -->

						<view class="scroll_bottom_one">
							<view class="scroll_data_text" v-for="(item, index_a) in cinema_data" :key="index_a">
								<text v-if="selet_index == 0">{{ item.total_bo_s }}</text>
								<text v-if="selet_index == 1">{{ item.session_s }}</text>
								<text v-if="selet_index == 2">{{ item.total_people_s }}</text>
								<text v-if="selet_index == 3">{{ item.avg_price }}元</text>
								<text v-if="selet_index == 4">{{ item.occupancy }}%</text>
							</view>
						</view>
						<!-- 详细数据部分 -->
						<view class="scroll_data" v-for="(item, index_b) in ColumnStack.series" :key="index_b">
							<view class="scroll_data_text" v-for="(it, index_c) in item.data" :key="index_c">
								<text v-if="selet_index == 0">{{ it }}</text>
								<text v-if="selet_index == 1">{{ it }}</text>
								<text v-if="selet_index == 2">{{ it }}</text>
								<text v-if="selet_index == 3">{{ it }}元</text>
								<text v-if="selet_index == 4">{{ it }}%</text>
							</view>
						</view>
					</view>
				</scroll-view>
			</view>
		</view>
		<!-- 底部数据展示 -->

		<!-- 影院选择 -->
		<!-- cinemaAr
All_data -->
		<view class="cinema_selet" :hidden="cinema_selet_show">
			<view
				class="cha"
				@tap="
					() => {
						this.cinema_selet_show = true;
					}
				"
			>
				×
			</view>
			<scroll-view scroll-y>
				<view @tap="cinema_selet_click(item)" :style="{ color: item.show ? '#F08E2D' : '' }" v-for="(item, index) in All_data.cinemaAr" :key="index">
					{{ item.cinema_name }}
				</view>
			</scroll-view>
		</view>
		<!-- 影院选择 -->
		
		
		<!-- 时间选择 -->
		<view class="time_click" :hidden="!time_isshow">
			<!-- tab -->
			<view class="tab">
				<view :class="[time_tab == 0 ? 'active' : '']" @tap="cinema_selet_tab_click(0)">
					年选择
				</view>
				<view :class="[time_tab == 1 ? 'active' : '']" @tap="cinema_selet_tab_click(1)">
					月选择
				</view>
			</view>
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
			<view v-if="time_tab == 1 && time_isshow">
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
			<view class="year" v-if="time_tab == 0 && time_isshow">
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
		</view>
		<!-- 时间选择 -->
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';
import moment from '@/components/moment';
var _self;
var canvaColumn = null;
export default {
	components: {},
	data() {
		return {
			ALL_month_index:-1, /* 月样式*/
			start_day:'', /* 开始年*/
			end_day:'',  /* 结束年*/
			is_year:2019, // 默认的年
			curren:0, // 
			month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],/* 月 */
			dtype:'year',   /* 请的是什么*/
			year_data:[], /* 储存选择的年*/
			data_year:'', /* 用来请求的年*/
			year_index:-1, /* 年的下标*/
			year: [] /* s所有的年*/,
			time_tab: 0 /* 控制时间选择 显示哪一个*/,
			time_isshow: false /* 时间选择 */,
			code_data: [],
			cinema_selet_show: true,
			city_data: 3000 /* 选择的地区默认3000*/,
			selet_isShow_pattern: true,
			cinema_data: [], // 选中的影院数据
			cinemaAr: 'type', // 引进模式
			city_selrt_index: 2,
			city_selrt_data: ['--', '--', '三公里', '一公里'],
			All_data: [], // 请求回来的所有数据
			selet_index: 0 /* 选择 的是票房 还是场次人次,平均票价,上座率*/,
			selet_isShow: true,
			selst_Allname: ['票房', '场次', '人次', '平均票价', '上座率'],
			selet_name: '票房',
			ColumnStack: [], // 图表数据
			header_data_data: ['影片类型', '2018年-2019年', '影院选择'],
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: ''
		};
	},
	computed: {
		...mapState({
			res: 'map_particulars_res',
			header_index: 'map_particulars_tabtow_header_index'
		})
	},
	watch: {
		// 初始化
		header_index() {
			if (this.header_index != 3) return false;
			var { city, district, latitude, longitude } = this.res;
			let header_data_data = [...this.header_data_data];   /*修改页面显示的年*/
			let dtype = this.dtype;
			let data_year =( moment(new Date()).format('YYYY') - 0 - 3) + ',' + (moment().format('YYYY') );
			var url = '/topprogram/compete-movielike?lat=' + latitude + '&lng=' + longitude +'&dtype='+dtype + '&year_ar=' + data_year;
			this.data_year = data_year;  // 初始化年
			header_data_data[1] = ( moment(new Date()).format('YYYY') - 0 - 3) + '年' + '-' + (moment().format('YYYY年') ); /*修改页面显示的年*/
			this.header_data_data = header_data_data;  /*修改页面显示的年*/
			var city_selrt_data = [...this.city_selrt_data];
			city_selrt_data[0] = city;
			city_selrt_data[1] = district;
			this.city_selrt_data = city_selrt_data;
			this.city_selrt_index = 2;
			/* 图表初始化 */
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
			this.cHeight = uni.upx2px(800);
			/* 图表初始化 */
			/* 年初始化 */
			var data = new Date();
			var time_end = data.getFullYear();
			let year = [];
			for (let i = Number(time_end); i >= 2012; i--) {
				year.push(i);
			}
			this.year = year;
			/* 年初始化 */

			this.db_index(url);
		},
		// 监听数据回来就做 数据处理
		All_data() {
			let index = this.selet_index;
			this.ucharts_bottom_data(index);
		}
	},
	onLoad() {},
	methods: {
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
						header_data_data[1] = start_day_show + '-' + end_day_show;
						var dtype = 'month';
		
						var res = this.res;
						let { city, district, latitude, longitude } = res;
						var url =
							'/topprogram/compete-movielike?lat=' + latitude + '&lng=' + longitude + '&month=' + start_day + '&month_end=' + end_day + '&dtype=' + dtype;
		
						this.db_index(url);
						this.header_data_data = header_data_data; /* title*/
						this.dtype = dtype;
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
						header_data_data[1] = start_day_show + '-' + end_day_show;
						var dtype = 'month';
		
						var res = this.res;
						let { city, district, latitude, longitude } = res;
						var url =
							'/topprogram/compete-movielike?lat=' + latitude + '&lng=' + longitude  + '&month=' + start_day + '&month_end=' + end_day + '&dtype=' + dtype;
						this.dtype = dtype;
						this.db_index(url);
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
		/* 月里边的年点击 */
		tap_year(year, index) {
			this.is_year = year;
			this.curren = index;
		},
		/* 时间tab切花 */
		cinema_selet_tab_click(index){
			this.time_tab = index;
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
		
				if (year[0] > year[1]) {
					var end_data = year[0];
					var strat_data = year[1];
		
					var header_data_data = [...this.header_data_data];
					header_data_data[1] = strat_data + '年' + '-' + end_data + '年';
					var dtype = 'year';
		
					var res = this.res;
					let { city, district, latitude, longitude } = res;
					
					var url = '/topprogram/compete-movielike?lat=' + latitude + '&lng=' + longitude + '&dtype=' +dtype + '&year_ar=' +strat_data + ',' +end_data;
					this.data_year = strat_data + ',' + end_data; // 储存选择的年
					
					this.db_index(url)
					this.dtype  =dtype ;
					this.header_data_data = header_data_data
					year.length = 0; /* 清空数组*/
					this.year_data = year; /* 清空数组*/
					this.time_isshow = false;
					this.year_index = -1;
				} else if (year[1] > year[0]) {
					var end_data = year[1];
					var strat_data = year[0];
		
					var header_data_data = [...this.header_data_data];
					header_data_data[1] = strat_data + '年' + '-' + end_data + '年';
					var dtype = 'year';
		
					var res = this.res;
					let { city, district, latitude, longitude } = res;
					var url = '/topprogram/compete-movielike?lat=' + latitude + '&lng=' + longitude + '&dtype=' +dtype + '&year_ar=' +strat_data + ',' +end_data;
					this.data_year = strat_data + ',' + end_data; // 储存选择的年
					this.db_index(url)
					this.dtype = dtype;
					this.header_data_data = header_data_data;
					year.length = 0;
					this.year_data = year;
					this.time_isshow = false;
					this.year_index = -1;
				}
			}
		},
		
		/* 影院选择 */
		cinema_selet_click(item) {
			let All_data = this.All_data;
			var code_data = [...this.code_data];
			let selet_index = this.selet_index;
			// 取消选中
			// console.log(item);
			if (item.show) {
				item.show = false;
				let data_selet = [];
				code_data.forEach((it, index) => {
					if (!(it.cinema_code == item.cinema_code)) {
						data_selet.push(it);
					}
				});
				this.code_data = data_selet;
				// 如果没有选中那就进行选中
			} else {
				//  最多选中6 个  阻止 提示
				if (code_data.length >= 6) {
					uni.showToast({
						title: '最多选择6个',
						icon: 'none',
						duration: 1000
					});
					return false;
					// 如果小于6 那就选中
				} else {
					item['show'] = true;
					code_data.push(item);
					All_data.cinemaAr[item.cinema_code]['show'] = true;
					this.All_data = All_data;
					this.code_data = code_data;
				}
			}
			this.ucharts_bottom_data(selet_index);
		},
		/* 模式选择 */
		cover_selet_pattern_click(item) {
			let distance_meters = this.city_data;
			let header_data_data = [...this.header_data_data];
			let res = this.res;
			let cinemaAr = '';
			if (item == '影片类型') {
				cinemaAr = 'type';
			} else {
				cinemaAr = 'import_mode';
			}
			header_data_data[0] = item; // 页面显示
			let { city, district, latitude, longitude } = res;
			/* 时间这里空缺 还诶有写时间还是档期 */
			var url = '/topprogram/compete-movielike?lan=' + latitude + '&lng=' + longitude + '&cinemaAr=' + cinemaAr + '&distance_meters=' + distance_meters;
			this.db_index(url);
			this.header_data_data = header_data_data;
			this.cinemaAr = cinemaAr;
			this.selet_isShow_pattern = true;
		},
		// t头部点击
		header_click(index) {
			if (index == 0) {
				var show = this.selet_isShow_pattern;
				this.selet_isShow_pattern = !show;
				this.cinema_selet_show = true;
			} else if (index == 2) {
				this.cinema_selet_show = false;
				this.selet_isShow_pattern = true;
			} else if (index == 1) {
				this.time_isshow = true;
			}
		},
		// 人次，场次，票房等点击
		city_selet_click(item, index) {
			var res = this.res;
			// var dtype = this.dtype;
			var cinemaAr = this.cinemaAr;
			let { city, district, latitude, longitude } = res;
			let data = '';
			var dtype = this.dtype;
			/* 时间这里空缺 还诶有写时间还是档期 */
			var url = '/topprogram/compete-movielike?lan=' + latitude + '&lng=' + longitude + '&cinemaAr=' + cinemaAr;

			if (index == 2) {
				item = 3000;
				data = item;
			} else if (index == 3) {
				item = 1000;
				data = item;
			}

			if (index == 0) {
				if (item.indexOf('市') != -1 || item.indexOf('省') != -1) {
					var a = item.indexOf('市');
					// console.log(a)
					item = item.slice(0, a);
				}
				data = 'city,' + item;
				url += '&distance_meters=city,' + item;
			} else if (index == 1) {
				data = 'county,' + item;
				url += '&distance_meters=county,' + item;
			} else {
				data = item;
				url += '&distance_meters=' + item;
			}
			console.log(dtype);
			if (dtype == 'year') {
				let data_year = this.data_year;
				url += '&dtype=' +dtype + '&year_ar=' + data_year
			}else {
				let start_day  = this.start_day
				let end_day  = this.end_day
				url += '&dtype=' +dtype + '&month=' +  start_day  + '&monthend=' + end_day
			}
			this.city_data = data;
			this.db_index(url);
			this.city_selrt_index = index;
		},
		// 票房场次等选择
		cover_selet_click(item, index) {
			this.selet_index = index;
			this.selet_name = item;
			this.selet_isShow = true;
			this.ucharts_bottom_data(index);
		},
		showColumnStack(canvasId, chartData) {
			canvaColumn = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'column',
				padding: [15, 15, 0, 15],
				legend: {
					show: true,
					padding: 5,
					lineHeight: 11,
					margin: 0
				},
				fontSize: 8,
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				animation: true,
				categories: chartData.categories,
				series: chartData.series,
				xAxis: {
					disableGrid: true,
					rotateLabel: true
				},
				yAxis: {
					//disabled:true
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
			canvaColumn.touchLegend(e);
			canvaColumn.showToolTip(e, {
				format: function(item, category) {
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		},
		// 图表和底部数据处理
		ucharts_bottom_data(index_glo) {
			console.log(index_glo);
			var res = this.All_data;
			var code_data = this.code_data;
			// console.log(code_data);
			let echarts_data = {
				剧情: [],
				动作: [],
				动画: [],
				喜剧: [],
				奇幻: [],
				影展: [],
				惊悚: [],
				戏曲: [],
				战争: [],
				歌舞: [],
				爱情: [],
				科幻: [],
				纪录: [],
				综艺: [],
				音乐: []
			};
			let ColumnStack = { categories: [], series: [] };
			var cinema_data = [];

			// 加工 图表数据
			for (let inde in res.data) {
				//  显示的 影院code

				code_data.forEach((item, index) => {
					// 影院 分支数据
					if (item.cinema_code == inde) {
						ColumnStack.categories.push(item.cinema_name);
						for (let index_z in res.data[inde]) {
							/* 票房 */
							if (index_glo == 0) {
								// 判断是否带， 号
								if ((res.data[inde][index_z].total_bo_s + '').indexOf(',') != -1) {
									var a = res.data[inde][index_z].total_bo_s.split(',');
									res.data[inde][index_z].total_bo_s = a[0] + a[1];
								}
								//  每一个 分类push进去

								echarts_data[index_z].push(Number(res.data[inde][index_z].total_bo_s));

								/* 场次 */
							} else if (index_glo == 1) {
								if ((res.data[inde][index_z].session_s + '').indexOf(',') != -1) {
									var a = res.data[inde][index_z].session_s.split(',');
									res.data[inde][index_z].session_s = a[0] + a[1];
								}
								//  每一个 分类push进去

								echarts_data[index_z].push(Number(res.data[inde][index_z].session_s));
								/* 人次 */
							} else if (index_glo == 2) {
								if ((res.data[inde][index_z].total_people_s + '').indexOf(',') != -1) {
									var a = res.data[inde][index_z].total_people_s.split(',');
									res.data[inde][index_z].total_people_s = a[0] + a[1];
								}
								//  每一个 分类push进去
								echarts_data[index_z].push(Number(res.data[inde][index_z].total_people_s).toFixed(0) - 0);
								/* 平均票价 */
							} else if (index_glo == 3) {
								if ((res.data[inde][index_z].avg_price + '').indexOf(',') != -1) {
									var a = res.data[inde][index_z].avg_price.split(',');
									res.data[inde][index_z].avg_price = a[0] + a[1];
								}
								echarts_data[index_z].push(Number(res.data[inde][index_z].avg_price).toFixed(2) - 0);
								/* 上座率 */
							} else if (index_glo == 4) {
								//  每一个 分类push进去
								let occupancy = res.data[inde][index_z].occupancy + '';
								if (occupancy.indexOf('%')) {
									let a = occupancy.split('%');
									occupancy = a[0];
								}
								echarts_data[index_z].push(Number(occupancy).toFixed(2) - 0);
							}
						}
					}
				});
			}
			let color = [
				'#ec6941',
				'#f09148',
				'#f8b551',
				'#fff35d',
				'#b3d465',
				'#80c269',
				'#32b16c',
				'#15b5b1',
				'#02b7ee',
				'#448aca',
				'#566fb5',
				'#8957a1',
				'#ae5da1',
				'#ea68a2',
				'#eb6877'
			];
			var color_index = 0; /* 用来取 color*/
			for (let var1 in echarts_data) {
				ColumnStack.series.push({ name: var1, data: echarts_data[var1], color: color[color_index] });
				color_index++;
			}
			// 所有影院的数据  底部数据  未完成
			code_data.forEach((item, index) => {
				res.sum.forEach((ite_sum, index_sum) => {
					if (ite_sum.cinema_name == item.cinema_name) {
						var ite_sumData = { cinema_name: ite_sum.cinema_name, total_bo_s: '', occupancy: '', total_people_s: '', session_s: '', avg_price: '' };
						/* 票房 */
						if (Number(ite_sum.total_bo_s / 100000000) > 1) {
							ite_sumData.total_bo_s = Number(ite_sum.total_bo_s / 100000000).toFixed(2) + '亿';
						} else {
							ite_sumData.total_bo_s = Number(ite_sum.total_bo_s / 10000).toFixed(2) + '万';
						}
						// 上座率
						ite_sumData.occupancy = (Number(ite_sum.occupancy) * 100).toFixed(2);

						// r人次
						ite_sumData.total_people_s = Number(ite_sum.total_people_s / 10000).toFixed(2);
						// 场次
						ite_sumData.session_s = Number(ite_sum.session_s / 10000).toFixed(2);
						// 平均票价
						ite_sumData.avg_price = Number(ite_sum.avg_price).toFixed(2);

						cinema_data.push(ite_sumData);
						// All_name.push()
					}
				});
			});

			// console.log(ColumnStack);
			// console.log(cinema_data);
			this.cinema_data = cinema_data;
			this.ColumnStack = ColumnStack;
			_self.showColumnStack('canvasColumnStack', ColumnStack);
		},
		/* 接口发送 */
		async db_index(url) {
			console.log(url);
			let { data: res } = await this.$http.get({ url });
			console.log(res);
			let code_data = [];
			for (let i in res.cinemaAr) {
				if (code_data.length == 6) {
					break;
				} else {
					code_data.push(res.cinemaAr[i]);
					res.cinemaAr[i].show = true;
				}
			}
			this.code_data = code_data;
			this.All_data = res;
		}
	}
};
</script>

<style lang="less">
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
	.tab{
		display: flex;
		.active{
			background-color:#F08E2D ;
			color: #FFFFFF;
		}
		view{
			height: 60upx;
			width: 750 / 2upx;
			background-color: #FFFFFF;
			font-size: 24upx;
			border: 1px solid #F08E2D;
			display: flex;
			justify-content: center;
			align-items: center;
		}
	}
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
.cinema_selet {
	width: 750upx;
	height: 100vh;
	position: fixed;
	top: 0;
	background-color: #ffffff;
	view {
		height: 60upx;
		font-size: 24upx;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: 1;
	}
	.cha {
		font-size: 30upx;
		padding-right: 10vh;
		box-sizing: border-box;
		justify-content: flex-end;
	}
	scroll-view {
		width: 750upx;
		height: 90vh;
	}
}
/* 底部 */
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
		.scroll_bottom {
			display: flex;
			height: auto;
			.scroll_bottom_one {
				.scroll_data_text {
					width: (550 - 20) / 3upx;
					height: 80upx;
					text-align: center;
					line-height: 80upx;
					font-size: 22upx;
					&:nth-child(odd) {
						background-color: #fff;
					}
				}
			}

			.scroll_data {
				font-size: 22upx;
				font-weight: 500;
				color: rgba(0, 0, 0, 1);
				.scroll_data_text {
					width: (550 - 20) / 3upx;
					height: 80upx;
					text-align: center;
					line-height: 80upx;
					&:nth-child(odd) {
						background-color: #fff;
					}
				}
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
/* 底部 */

// 中间部分地区选择
.city_selet {
	height: 80upx;
	background: rgba(255, 255, 255, 1);
	display: flex;
	justify-content: space-between;
	align-items: center;
	box-shadow: 0px 2px 4px 0px rgba(245, 245, 245, 1);
	margin: 10upx 0;
	padding: 0 30upx;
	box-sizing: border-box;
	view {
		font-size: 28upx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(74, 74, 74, 1);
	}
}
// 选择 样式
.cover_selet,
.cover_selet_pattern {
	width: 750upx;
	position: absolute;
	top: 285upx;
	z-index: 1;
	background-color: #ffffff;
	cover-view {
		height: 60upx;
		font-size: 24upx;
		line-height: 60upx;
		text-align: center;
	}
}
.cover_selet_pattern {
	top: 200upx;
}
// 票房选择
.selet_pf {
	width: 750upx;
	height: 60upx;
	line-height: 60upx;
	font-size: 24upx;
	padding-left: 40upx;
	margin-top: 10upx;
	box-sizing: border-box;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(74, 74, 74, 1);
	background-color: #fff;
	image {
		width: 18upx;
		height: 15upx;
		padding-left: 6upx;
	}
}
.charts {
	width: 750upx;
	height: 800upx;
	background-color: #ffffff;
}
.header {
	height: 80upx;
	background-color: #fff;
	padding: 0 30upx;
	box-sizing: border-box;
	display: flex;
	justify-content: space-between;
	align-items: center;
	font-size: 24upx;
	font-family: PingFangSC-Regular, PingFang SC;
	font-weight: 400;
	color: rgba(74, 74, 74, 1);

	image {
		width: 18upx;
		height: 15upx;
		padding-left: 6upx;
	}
}
</style>
