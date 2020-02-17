<template>
	<view class="tabone" :hidden="!(tabIndex == 0)">
		<!-- 	大盘排片 -->
		<view class="tab_data">
			<view @tap="left_date">
				<image src="../../static/big-plate/previous.png" mode=""></image>
				前一天
			</view>
			<view @tap="ei_calendar_click" v-if="!ei_calendar_br">
				<!-- {{ item_data | item_filter }} -->
				{{ item_filter_compu }}
				<image src="../../static/big-plate/xia.png" mode=""></image>
			</view>
			<view @tap="ei_calendar_click" v-if="ei_calendar_br">
				<!-- {{ item_data | item_filter }} -->
				2019年08月01日
				<image src="../../static/big-plate/xia.png" mode=""></image>
			</view>
			<view @tap="right_date">
				后一天
				<image src="../../static/big-plate/next.png" mode=""></image>
			</view>
		</view>
		<view class="region">
			<view @tap="click_tj(index)" v-for="(item, index) in condition_title" :key="index">
				{{ item }}
				<!-- <image src="../../static/big-plate/select.png" /> -->
				<image src="../../static/big-plate/xia.png" mode=""></image>
			</view>
		</view>
		<view class="center_tendency" @tap="center_tendencyTap">
			<image src="../../static/big-plate/tendency.png" mode=""></image>
			排片趋势
		</view>
		<view class="canvas_one">
			<canvas canvas-id="canvasRing" id="canvasRing" class="charts" :style="{ position: positionStyle, top: positionTop }" @touchstart="touchRing"></canvas>
		</view>
		<!--  -->
		<view class="center">
			<!--{{ raSum.session_s | session_s_data }}-->
			<view class="center_one">
				总场次:
				<text v-if="center_one_brone">349,980</text>
				<text v-if="!center_one_brone">{{ session_s_data_compu }}</text>
				场
			</view>
			<!--       -->
			<view class="center_tow">
				<tetx v-if="ei_calendar_br">2019年08月01日</tetx>
				<tetx v-if="!ei_calendar_br">{{ item_filter_compu }}</tetx>
				<!-- {{ item_data | item_filter }}  {{ item_data_xq | item_data_filter }}-->
				<text v-if="center_tow_br">周一</text>
				<text v-if="!center_tow_br">{{ item_data_filter_compu }}</text>
			</view>
		</view>
		<view class="bottom">
			<view v-if="cinema_num == 0" class="bottom_header">
				<view>影片名称</view>
				<view>场次</view>
				<view>场次占比</view>
			</view>
			<view v-if="cinema_num == 1" class="bottom_header">
				<view>影片名称</view>
				<view>座位</view>
				<view>座位占比</view>
			</view>
			<!-- <block v-if="!(Ring.series == [])"> -->
			<view v-if="cinema_num == 0" class="bottom_fo" @tap="tz_click(item.movie_id)" v-for="(item, index) in Ring.series" :key="index">
				<view class="bottom_fo_color" :style="{ background: item.color }"></view>
				<view class="bottom_fo_name">{{ item.movie_name }}</view>
				<view class="bottom_fo_cc">{{ item.session_s | session_s_data }}</view>
				<view class="bottom_fo_zb">{{ item.data }}%</view>
			</view>
			<!-- </block> -->
			<!-- cinema -->
			<view v-if="cinema_num == 1" class="bottom_fo" @tap="tz_click(item.movie_id)" v-for="(item, index) in cinema" :key="index">
				<view class="bottom_fo_color" :style="{ background: item.color }"></view>
				<view class="bottom_fo_name">{{ item.movie_name }}</view>
				<view class="bottom_fo_cc">{{ item.seats_s | session_s_data }}</view>
				<view class="bottom_fo_zb">{{ item.seats_s_zb }}%</view>
			</view>
		</view>
		<!-- 日历插件	 -->

		<view class="ei_calendar_wai" :hidden="!tab_one_show">
			<view @tap="ei_calendar_wai_click(0)" class="ei_calendar_wai_cha">×</view>
			<ei-calendar
				@click="tab_one_ei_calendar"
				type="single"
				:visible.sync="tab_one_show"
				ref="calendar"
				:drawer="false"
				:disabledDate="tab_one_disabledDate"
				v-model="tab_one_date"
				:custom-date="tab_one_customDate"
				format="YYYY-MM-DD"
			></ei-calendar>

			<scroll-view class="ei_calendar_view" scroll-y></scroll-view>
		</view>

		<!-- 日历插件 -->
		<!-- 地区选择 -->
		<view class="city_sel" :style="{ top: 0 + 'px' }" :hidden="is_show">
			<view class="page__bd">
				<!-- 选择城市 -->
				<view class="" v-if="inputVal.length <= 0">
					<!-- catchtouchstart="handlerAlphaTap" -->
					<view id="border_he" class="alphanet-selector" catchtouchmove="handlerMove">
						<!-- data-ap="{{item}}" -->
						<view v-for="(it, index) in zm_right" :key="index" @tap="dddd(it)" class="selector-one">{{ it }}</view>
					</view>
					<!-- 地区选择 
							* :style="{ height: winHeight + 'px' }"
							* -->
					<scroll-view class="page__view" scroll-y :scroll-into-view="alpha">
						<view @tap="page__view_cha_tap()" class="page__view_cha">×</view>
						<!-- 区域 -->
						<view class="title">区域</view>

						<view class="page__bd">
							<view class="weui-grids">
								<block v-for="(it, index) in qy" :key="index">
									<view class="weui-grid" @tap="click_grid(it)" :data-name="item" hover-class="weui-grid_active">
										<view class="weui-grid__label">{{ it }}</view>
									</view>
								</block>
							</view>
						</view>

						<!-- 热门城市 -->
						<view class="title">热门城市</view>
						<view class="page__bd">
							<view class="weui-grids">
								<block v-for="(it, index) in rm_city" :key="index">
									<view class="weui-grid" @tap="click_grid(it)" :data-name="it" hover-class="weui-grid_active">
										<view class="weui-grid__label">{{ it }}</view>
									</view>
								</block>
							</view>
						</view>

						<!-- 城市选择 -->
						<view class="alphabet">
							<view class="alphabet-list">
								<!-- :id="it.alphabet" -->
								<view v-for="(it, index) in zm_list" :id="it.letter" :key="index" class="section-item">
									<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
									<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
									<view v-for="(vv, ii) in it.childer" :key="ii" @tap="click_city(vv)" class="section-item-cells">
										<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '']">
											<text>{{ vv }}</text>
										</view>
									</view>
								</view>
							</view>
						</view>
						<!-- 城市选择 -->
					</scroll-view>
				</view>
			</view>
		</view>
		<!--  地区选择 -->
		<!-- 时段选择 -->
		<view class="center_frame" :hidden="is_sd">
			<view @tap="click_sd('全时段')" :class="['center_frame_quan', center_frame == 0 ? 'active' : '']">
				全时段（6:00-次日6:00）
				<view v-if="center_frame == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
			</view>
			<view @tap="click_sd('黄金场')" :class="['center_frame_hj', center_frame == 1 ? 'active' : '']">
				黄金时段（18:00-21:00）
				<view v-if="center_frame == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
			</view>
		</view>
		<!-- 时段选择 -->
		<!-- 场次选择 -->
		<view class="center_session" :hidden="is_lx">
			<view @tap="click_lx('场次')" :class="['center_frame_quan', center_frame == 0 ? 'active' : '']">
				场次
				<view v-if="center_frame == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
			</view>
			<view @tap="click_lx('座位')" :class="['center_frame_hj', center_frame == 1 ? 'active' : '']">
				座位
				<view v-if="center_frame == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
			</view>
		</view>
		<!-- 场次选择 -->
		<!-- 	大盘排片 -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
// 时间格式化
import moment from '@/components/moment';
var _self;
var canvaRing = null;

export default {
	components: {
		EiCalendar
	},
	data() {
		return {
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			isgoldentime: '0', // 时段
			district: '', // 几线
			city: '', // 城市
			item_data: '2019-7-08', // 时间
			item_data_xq: '2019-7-08',
			// 时段选择
			center_frame: 0,
			is_lx: true,
			is_sd: true,
			zm_list: [], // 地区
			// 热门城市
			rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
			// 区域选择
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
			alpha: '', // 点击字母跳转的唯一凭证
			// 旁边的字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			//  开关
			inputVal: '', // 城市如果有字拒接显示
			is_show: true,
			raSum: {
				session_s: 1
			}, // 所有的综合数据总场次等
			tab_one_customDate: [
				{
					cellClass: 'custom-cell',
					date: '',
					// date: '2019-05-23',
					top: [
						{
							class: 'custom-cell-top-1'
							// text: '①'
						},
						{
							class: 'custom-cell-top-2'
							// text: '×'
						}
					]
				}
			],
			tab_one_date: '',
			// tab_one 日历
			tab_one_show: false,
			tab_one_disabledDate: ['2019-7-19'], // 当前日期
			ei_calendar_br: true,
			condition_title: ['全国', '全时段', '场次'], // 循环中间部分
			positionStyle: '',
			positionTop: '',
			center_one_brone: true,
			center_tow_br: true,
			item_filter_compu: '',
			cinema_num: 0, //  场次显示 和座位显示
			cinema: [],
			Ring: {
				series: [
					{
						bdate: '--',
						color: '--',
						data: '--',
						movie_id: '--',
						movie_name: '--',
						name: '--',
						seats_s: '--',
						session_s: '--',
						type: '--',
						_proportion_: '--',
						_radius_: '--',
						_start_: '---'
					},
					{
						bdate: '--',
						color: '--',
						data: '--',
						movie_id: '--',
						movie_name: '--',
						name: '--',
						seats_s: '--',
						session_s: '--',
						type: '--',
						_proportion_: '--',
						_radius_: '--',
						_start_: '---'
					}
				]
			} //渲染的数据
		};
	},
	filters: {
		session_s_data(ra) {
			// console.log(ra);
			var session_s = ra;
			// var a = session_s;
			if (session_s.length >= 7) {
				session_s = session_s.slice(0, 3) + ',' + session_s.slice(3, 6) + ',' + session_s.slice(6, 9);
			} else if (session_s.length >= 4) {
				// session_s = session_s.slice(3) + ',' + session_s.slice(3,6)
				if (session_s.length == 4) {
					session_s = session_s.slice(0, 1) + ',' + session_s.slice(1);
				} else if (session_s.length == 5) {
					session_s = session_s.slice(0, 2) + ',' + session_s.slice(2);
				} else if (session_s.length == 6) {
					session_s = session_s.slice(0, 3) + ',' + session_s.slice(3);
				}
			}
			if (session_s == undefined) {
				return '349,980';
			} else {
				return session_s;
			}
		}
	},
	computed: {
		//  格式化时间
		item_data_filter_compu() {
			var d = this.item_data_xq;
			d = new Date(d);
			var time = '';
			var tt = moment(d).format('E');
			if (tt == 1) {
				time = time + ' ' + ' ' + '周一';
			} else if (tt == 2) {
				time = time + '周二';
			} else if (tt == 3) {
				time = time + '周三';
			} else if (tt == 4) {
				time = time + '周四';
			} else if (tt == 5) {
				time = time + '周五';
			} else if (tt == 6) {
				time = time + '周六';
			} else if (tt == 7) {
				time = time + '周日';
			}
			if (time == undefined) {
				return '周一';
			} else {
				this.center_tow_br = false;
				return time;
			}
		},
		...mapState({ tabIndex: 'bigPlate_tabIndex' })
	},
	watch: {
		tabIndex() {
			if (this.tabIndex != 0) return false;
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
			this.cHeight = uni.upx2px(500);
			this.getServerData();

			// 初始化地区表
			this.dataMap();
			// tb_one 日历
			var tab_tow_disabledDate = this.tab_one_disabledDate;
			tab_tow_disabledDate[0] = this.item_data_xq;
			this.tab_one_disabledDate = tab_tow_disabledDate;
		}
	},
	methods: {
		// 初始化 地区表
		async dataMap() {
			let that = this;
			let { data: zm_list } = await this.$http.get({
				url: '/advancedbo/get-citylist'
			});
			// 下边一系列过程都是在 处理数据

			let mzmlist = [];
			for (let a in zm_list) {
				let region = [];

				if (a !== '#') {
					for (let n in zm_list[a]) {
						region.push(n);
					}
					//  最终赋值
					mzmlist.push({
						letter: a,
						childer: region
					});
				}
			}
			this.zm_list = mzmlist;
		},
		// 点击日历 单元格
		tab_one_ei_calendar(e) {
			var isgoldentime = this.isgoldentime; //时段
			var district = this.district; //几线
			var city = this.city; //城市
			var date = this.item_data_xq; // 当前时间
			// 后15天的数据
			var one_five_year = moment(date)
				.subtract(-14, 'days')
				.format('YYYY');
			var one_five_month = moment(date)
				.subtract(-14, 'days')
				.format('MM');
			var one_five_day = moment(date)
				.subtract(-14, 'days')
				.format('DD');
			// 后15天的数据

			// 当前日期
			var date_year = moment(date)
				.subtract(0, 'days')
				.format('YYYY');
			var date_month = moment(date)
				.subtract(0, 'days')
				.format('MM');
			var date_day = moment(date)
				.subtract(0, 'days')
				.format('DD');
			// 当前日期
			if (e.month < 10) {
				e.month = '0' + e.month;
			}
			e.month = e.month + '';
			if (e.month.length == 3) {
				e.month = e.month.slice(1, 2);
				console.log(e.month);
			}
			if (e.day < 10) {
				e.day = '0' + e.day;
			}
			var item_date = e.year + '-' + e.month + '-' + e.day;
			//  当前点击的年月日
			var month = e.month;
			var day = e.day;
			var year = e.year;
			var year_click = e.format.slice(0, 4);
			var month_click = e.format.slice(5, 7);
			var day_click = e.format.slice(8, 10);
			var e_item = Number(year_click + month_click + day_click); // 当前点击的
			var one_five_item = Number(one_five_year + '' + one_five_month + one_five_day); // 15天之后的
			var item = Number(date_year + '' + date_month + date_day); // 当前的

			var Br_one = item - e_item; // 当前点击的 日期数
			var Br_tow = item - one_five_item; // 15天之后 减下来的数据
			if (!(Br_one < Br_tow)) {
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'mid',
					city: city,
					isgoldentime: isgoldentime,
					bdate: item_date,
					district: district
				};
				this.dp_indexx(url, this, All_data);
				this.tab_one_date = item_date;

				var item_data_time = item_date.split('-'); // 页面 显示时间
				this.item_filter_compu = item_data_time[0] + '年' + item_data_time[1] + '月' + item_data_time[2] + '日';

				this.item_data = item_date;
				this.tab_one_show = false;
				this.positionStyle = '';
				this.positionTop = '';
			} else {
				uni.showToast({
					title: '最多往后选15天',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		// 开启日历
		ei_calendar_click() {
			this.tab_one_show = true;
			this.positionStyle = 'absolute';
			this.positionTop = '-1000px';
		},
		//调用大盘接口

		async dp_indexx(url, that, data_all) {
			let userType = await this.detection_validity();
			data_all.userType = userType;
			let { data: res } = await this.$http.get({
				url,
				data: data_all
			});
			console.log(res);
			var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00', '#f87a01', '#d22f0e', '#CDAD00'];
			var fontcolor = '';
			let Ring = {
				series: []
			};
			let formatName = [];
			for (var i in res.data) {
				// 颜色
				res.data[i].color = color[i];
				// 场次 占比
				res.data[i].data = Number(((res.data[i].session_s / res.sum.session_s) * 100).toFixed(2));
				//  不知道干什么的 先存着
				res.data[i].seats_s_zb = ((Number(res.data[i].seats_s) / Number(res.sum.seats_s)) * 100).toFixed(2);
				var len = res.data[i].movie_name.length;
				if (len >= 6) {
					res.data[i].movie_name = res.data[i].movie_name.slice(0, 5) + '..';
				}
				console.log();
				res.data[i].name = res.data[i].movie_name;
				formatName.push(res.data[i].name);
				res.data[i].seats_s = res.data[i].seats_s + '';
				res.data[i].session_s = res.data[i].session_s + '';
				Ring.series.push(res.data[i]);
			}
			for (let a in formatName) {
				Ring.series[a].format = () => {
					// console.log(a);
					return formatName[a];
				};
			}
			this.raSum = res.sum;
			this.Ring = Ring;
			this.cinema = res.data;
			this.showRing('canvasRing', Ring, Ring.series[0].name, Ring.series[0].data);
			//  场次中的座位列表数据
			
			
			// console.log('初始调用大盘');
		},

		// ucharts
		getServerData() {
			var that = this;
			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市
			var date = moment().format('YYYY-MM-DD');
			var url = '/topprogram/get-rowpiece';
			let data = {
				type: 'mid',
				district,
				city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_index(url, that, data);
			var item_data_time = date.split('-'); // 页面 显示时间
			item_data_time = item_data_time[0] + '年' + item_data_time[1] + '月' + item_data_time[2] + '日';
			this.item_filter_compu = item_data_time;
			this.ei_calendar_br = false;
			this.item_data = date; // 时间
			this.item_data_xq = date; // 时间 = date; // 时间
		},
		async dp_index(url, that, data_all) {
			let userType = await this.detection_validity();
			data_all.userType = userType;
			let { data } = await this.$http.get({
				url,
				data: data_all
			});
			console.log(data_all);
			console.log(data);
			let { data: ra } = data;
			var a = data.sum.session_s.slice(0, 3);
			var b = data.sum.session_s.slice(3, 6);
			var c = data.sum.session_s.slice(6, 9);
			this.raSum = data.sum;
			//  ucharst 需要的数据类型
			let Ring = {
				series: []
			};

			// this.uchartsData = data;
			Ring.series = ra;
			var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00', '#f87a01', '#d22f0e', '#CDAD00'];

			//  j加工数据
			for (var i in data.data) {
				// 颜色
				data.data[i].color = color[i];
				// 场次 占比
				data.data[i].data = Number(((data.data[i].session_s / data.sum.session_s) * 100).toFixed(2));
				//  不知道干什么的 先存着
				data.data[i].seats_s_zb = ((Number(data.data[i].seats_s) / Number(data.sum.seats_s)) * 100).toFixed(2);
				var len = data.data[i].movie_name.length;
				if (len >= 6) {
					data.data[i].movie_name = data.data[i].movie_name.slice(0, 5) + '..';
				}
				data.data[i].name = data.data[i].movie_name;
				// formatName.push(data.data[i].name);
				data.data[i].seats_s = data.data[i].seats_s + '';
				data.data[i].session_s = data.data[i].session_s + '';
				// Ring.series.push(data.data[i]);
			}
			
			
			for (let i in Ring.series) {
				//占比
				Ring.series[i].data = Number(((Ring.series[i].session_s / data.sum.session_s) * 100).toFixed(2));
				Ring.series[i].name = Ring.series[i].movie_name;
				Ring.series[i].color = color[i];
				if (Ring.series[i].name.length >= 6) {
					Ring.series[i].name = Ring.series[i].name.slice(0, 5) + '..';
				}
				Ring.series[i].name = Ring.series[i].name;
				Ring.series[i].session_s = Ring.series[i].session_s + '';
				Ring.series[i].format = () => {
					return Ring.series[i].name;
				};
			}
			/*
							少一个id 后续添加 id  之后再 做跳转
						*/
			console.log(Ring);
			this.cinema = data.data;
			this.Ring = Ring;
			this.showRing('canvasRing', Ring, Ring.series[0].name, Ring.series[0].data + '%');
		},
		showRing(canvasId, chartData, uchartsData_name = '', uchartsData_bfb = '') {
			canvaRing = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'ring',
				fontSize: 11,
				legend: { show: false },
				title: {
					name: uchartsData_name,
					color: '#7cb5ec',
					fontSize: 16 * _self.pixelRatio
					// offsetY: -20 * _self.pixelRatio
				},
				subtitle: {
					name: uchartsData_bfb,
					color: '#FF3333',
					fontSize: 15 * _self.pixelRatio
					// offsetY: 30 * _self.pixelRatio
				},
				extra: {
					pie: {
						offsetAngle: -45,
						ringWidth: 40 * _self.pixelRatio,
						lableWidth: 15
					}
				},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				series: chartData.series,
				animation: true,
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				disablePieStroke: true,
				dataLabel: true
			});
		},
		/* 场次选择 和座位选择 */
		click_lx(name) {
			var that = this;
			var condition_title = that.condition_title;
			var sd = '';
			var txt = name;
			if (txt == '座位') {
				sd = 1;
			} else {
				sd = 0;
			}
			condition_title[2] = txt;
			this.is_lx = true;
			this.cinema_num = sd;
			this.condition_title = condition_title;
			//  图片显示
			this.center_frame = sd;
			// 图片显示
			// 图标回来
			this.positionStyle = '';
			this.positionTop = '';
		},
		// da大盘排片点击时段
		click_sd(name) {
			var that = this;
			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市
			var date = that.item_data_xq;
			var date = moment(date)
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
			var condition_title = that.condition_title;
			var isgoldentime = '';
			if (name == '全时段') {
				isgoldentime = 0;
			} else {
				isgoldentime = 1;
			}

			var txt = name;
			// console.log(isgoldentime);
			// console.log(txt);
			// return false;

			condition_title[1] = txt;
			var url = '/topprogram/get-rowpiece';
			let All_data = {
				type: 'mid',
				district: district,
				city: city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_indexx(url, that, All_data);
			this.is_sd = true;
			this.condition_title = condition_title;
			this.isgoldentime = isgoldentime;
			this.no_check_time = false;
			this.center_frame = isgoldentime;
			// urcharts 定位
			this.positionStyle = '';
			this.positionTop = '';
			// urcharts 定位
		},
		// 点击 城市
		click_city(name) {
			var that = this;
			var city_name = name;
			var condition_title = that.condition_title;
			// var sear_title = that.sear_title;

			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市

			if (city_name.indexOf('线城市') != -1 || city_name == '全国') {
				district = city_name;
				city = '';
			} else {
				district = '';
				city = city_name;
			}
			var date = this.item_data_xq;
			var url = '/topprogram/get-rowpiece';
			let All_data = {
				type: 'mid',
				district: district,
				city: city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_indexx(url, that, All_data);

			condition_title[0] = city;
			// sear_title[0] = city;
			this.district = district;
			this.city = city;
			this.is_show = true;
			this.no_check_time = false;
			this.condition_title = condition_title;
			// this.sear_title = sear_title;
			this.positionStyle = '';
			this.positionTop = '';
		},

		// 点击区域 热门城市
		click_grid(aa) {
			var that = this;
			var city_name = aa;
			var condition_title = that.condition_title;
			// var sear_title = that.sear_title;
			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市

			if (city_name.indexOf('线城市') != -1 || city_name == '全国') {
				if (city_name == '全国') {
					city = '';
				} else {
					district = city_name;
					//
				}
			} else {
				district = '';
				city = city_name;
			}
			// 上座率 数据
			var date = that.item_data_xq;
			var url = '/topprogram/get-rowpiece';
			let data_all = {
				type: 'mid',
				district: district,
				city: city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_indexx(url, that, data_all);
			if (city == '') {
				condition_title[0] = '全国';
			} else {
				condition_title[0] = city_name;
			}

			// sear_title[0] = city_name;
			this.city = city;
			this.district = district;
			this.condition_title = condition_title;
			//
			// this.sear_title = sear_title;
			// 关闭 地区选择
			this.is_show = true;
			this.no_check_time = false;
			this.positionStyle = '';
			this.positionTop = '';
		},
		// 大盘上座率地区关闭
		page__view_cha_tap(index) {
			this.is_show = true;
			this.positionStyle = '';
			this.positionTop = '';
		},
		// 地区点击侧边栏 进行切换 	··
		dddd(e) {
			this.alpha = e;
		},
		// 日历插件关闭
		ei_calendar_wai_click() {
			this.tab_one_show = false;
			this.positionStyle = '';
			this.positionTop = '';
		},
		/* 跳转影片详情 */
		tz_click(id) {
			var mid = '';
			uni.navigateTo({
				url: '../dy_particulars/dy_particulars?id=' + id + '&mid=' + mid
			});
		},
		/* canvas 点击 */
		touchRing(e) {
			//  获取序列号
			var xx = canvaRing.getCurrentDataIndex(e);
			console.log(xx);
			if (xx >= 0) {
				// console.log(xx  );
				var title = canvaRing.opts.series[xx].name;
				var subtitle = canvaRing.opts.series[xx].data + '%';
				// console.log(title,subtitle);
				canvaRing.updateData({
					title: {
						name: title
					},
					subtitle: {
						name: subtitle
					}
				});
			}
		},
		// 排片趋势跳转
		center_tendencyTap() {
			uni.navigateTo({
				url: './filmSchedule_tendency/filmSchedule_tendency'
			});
		},
		//  点击展开对应的 栏目
		click_tj(index) {
			var that = this;
			var tj = '';

			var is_show = that.is_show;
			var is_sd = that.is_sd;
			var is_lx = that.is_lx;
			tj = index;
			// console.log(tj);
			if (tj == 0) {
				this.is_show = !is_show;
				this.is_sd = true;
				this.is_lx = true;
				this.positionStyle = 'absolute';
				this.positionTop = '-1000px';
				// this.no_check_time = !is_sd;
			} else if (tj == 1) {
				this.is_show = true;
				this.is_sd = !is_sd;
				this.is_lx = true;
				if (!is_sd) {
					this.positionStyle = '';
					this.positionTop = '';
				} else {
					this.positionStyle = 'absolute';
					this.positionTop = '-1000px';
				}
				// this.no_check_time = !is_sd;
			} else {
				this.is_show = true;
				this.is_sd = true;
				this.is_lx = !is_lx;
				if (!is_lx) {
					this.positionStyle = '';
					this.positionTop = '';
				} else {
					this.positionStyle = 'absolute';
					this.positionTop = '-1000px';
				}
			}
		},
		// 点击前一天
		left_date: function(e) {
			var that = this;
			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市
			var date = that.item_data;
			var date = moment(date)
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
			var url = '/topprogram/get-rowpiece';
			let All_data = {
				type: 'mid',
				district: district,
				city: city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_indexx(url, that, All_data);
			this.item_data = date;
			var item_data_time = date.split('-');
			this.item_filter_compu = item_data_time[0] + '年' + item_data_time[1] + '月' + item_data_time[2] + '日';
			this.tab_one_date = date;
		},
		// 点击后一天
		right_date: function(e) {
			var that = this;
			var isgoldentime = that.isgoldentime; //时段
			var district = that.district; //几线
			var city = that.city; //城市
			var date = that.item_data;
			var date = moment(date)
				.subtract(-1, 'days')
				.format('YYYY-MM-DD');
			console.log(city);
			var url = '/topprogram/get-rowpiece';
			let All_data = {
				type: 'mid',
				district: district,
				city: city,
				bdate: date,
				isgoldentime: isgoldentime
			};
			that.dp_indexx(url, that, All_data);
			var item_data_time = date.split('-');
			this.item_filter_compu = item_data_time[0] + '年' + item_data_time[1] + '月' + item_data_time[2] + '日';
			this.item_data = date;

			var item_data_time = date.split('-'); // 页面显示时间
			this.item_filter_compu = item_data_time[0] + '年' + item_data_time[1] + '月' + item_data_time[2] + '日';

			this.tab_one_date = date;
		}
	}
};
</script>

<style lang="less">
@import url('./big-plate.less');
</style>
