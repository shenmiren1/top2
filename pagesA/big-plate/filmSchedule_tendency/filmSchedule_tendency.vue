<template>
	<!-- :style="{marginLeft:bangdata + 'px'}" -->
	<view class="ppge">
		<view class="header">
			<view class="header_tiem" @tap="header_tap(0)">
				{{condition_title[0]}}
				<image src="../../../static/big-plate/select.png" mode="" v-if="!(index == 0)"></image>
			</view>
			<view class="header_center">
				<view @tap="header_tap(index)" v-for="(item, index) in condition_title" :key="index" v-if="!(index == 0)">
					{{ item }}
					<image src="../../../static/big-plate/select.png" mode="" v-if="!(index == 0)"></image>
				</view>
			</view>

		</view>
		<view class="view_canvas">
			<canvas :style="{position:position_canvas,top:top_canvas + 'px'}" canvas-id="canvasLineA" id="canvasLineA" class="charts"
			 @touchstart="touchLineA"></canvas>
		</view>
		<view class="canvas_name">
			<view @tap="canvas_repeat(index, item.name)" v-for="(item, index) in LineA_all.series" :key="index" :style="{ Color: item.color }">
				<text class="canvas_name_xian" :style="{ backgroundColor: item.color }"></text>
				{{ item.name }}
			</view>
		</view>
		<!--  地区选择 -->
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
			<view @tap="click_sd('全时段', 0)" :class="['center_frame_quan', center_frame == 0 ? 'active' : '']">
				全时段（6:00-次日6:00）
				<view v-if="center_frame == 0">
					<image src="../../../static/big-plate/checked.png" mode=""></image>
				</view>
			</view>
			<view @tap="click_sd('黄金场', 1)" :class="['center_frame_hj', center_frame == 1 ? 'active' : '']">
				黄金时段（18:00-21:00）
				<view v-if="center_frame == 1">
					<image src="../../../static/big-plate/checked.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 时段选择 -->
		<!-- 场次选择 -->
		<view class="center_session" :hidden="is_lx">
			<view @tap="click_lx('场次', 0)" :class="['center_frame_quan', center_frametow == 0 ? 'active' : '']">
				场次
				<view v-if="center_frametow == 0">
					<image src="../../../static/big-plate/checked.png" mode=""></image>
				</view>
			</view>
			<view @tap="click_lx('座位', 1)" :class="['center_frame_hj', center_frametow == 1 ? 'active' : '']">
				座位
				<view v-if="center_frametow == 1">
					<image src="../../../static/big-plate/checked.png" mode=""></image>
				</view>
			</view>
		</view>
		<!-- 场次选择 -->
		<view class="ei_calendar_mb" :hidden="!ei_calendar_Br">

		</view>
		<!-- 日历选择  -->
		<ei-calendar @click="ei_calendar_tap" type="range" :visible="ei_calendar_Br" ref="calendar" :drawer="false" v-model="date"
		 :custom-date="customDate" format="YYYY-MM-DD" class="ei_calendar_cla"></ei-calendar>
		<!-- 日历选择 -->
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.min.js';
	import {
		isJSON
	} from '@/common/checker.js';
	import moment from '@/components/moment';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	var _self;
	var canvaLineA = null;
	export default {
		onShareAppMessage(){},
		components: {
			EiCalendar
			
		},
		data() {
			return {
				// 当前地区
				city: '全国',
				district: '', // 几线城市
				// 场次
				target: 'session ', // 默认场次   seats  座位
				// 时段选择
				is_sd: true,
				center_frame: 0,
				is_lx: true,
				center_frametow: 0,
				disabledDate: [], // r日历默认显示时间
				// 时段选择
				// 地区选择
				is_show: true,
				inputVal: '', // 城市如果有字拒接显示
				zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U',
					'V', 'W', 'X', 'Y', 'Z'
				],
				qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
				// 热门城市
				rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
				zm_list: [], // 地区
				alpha: '', // 点击字母跳转的唯一凭证
				// 地区选择
				bangdata: 0,
				isgoldentime: 0, // 什么时段
				// date: ['2019-05-12'],
				date: [],
				ei_calendar_Br: false, // 控制日历显示
				eventTow_item: [], // 存储开始和结束日期;
				eventTow_day: [], // 开始和结束日期的日
				customDate: [{
					cellClass: 'custom-cell',
					date: '2019-05-23',
					top: [{
							class: 'custom-cell-top-1'
							// text: '①'
						},
						{
							class: 'custom-cell-top-2'
							// text: '×'
						}
					]
				}],
				startDate: '2019-07-12', //开始时间 也是当前时间
				endDate: '', // 结束时间
				check_day: [], // 存于显示时间
				// 地区名字保存
				condition_title: ['6月-28日-7月05日', '全国', '全时段', '场次'], // 循环中间部分
				// uCharts
				position_canvas: '', // 移ucharts 
				top_canvas: '', // 移ucharts 
				LineA_all: [], // 所有数据
				LineA: [], // 当前数据
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: ''
				// a: [0, 10, 20, 30, 40, 50, 60]
				// ucharts
			};
		},
		created() {
			//  动态获取高度
			uni.getSystemInfo().then(item => {
				this.bangdata = item[1].statusBarHeight;
			});
			//  动态获取高度
			//  修改标题
			// this.title();
			//  初始化地区表
			this.dataMap();
			// var a = moment().format('l')
			var startDate = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			var endDate = moment(startDate)
				.subtract(-8, 'days')
				.format('YYYY-MM-DD');
			console.log(startDate);
			console.log(endDate);
			this.startDate = startDate; // 当前时间

			this.endDate = endDate; // 结束时
			//  日历默认时间
			var disabledDate = [];
			disabledDate[0] = startDate;
			disabledDate[1] = endDate;
			this.date = disabledDate;
			// 默认显示日期 
			var condition_title = this.condition_title;
			condition_title[0] = startDate + '至' + endDate
			// console.log();
		},
		methods: {
			//  点cavas 小按钮 进行重拍 LineA_all
			canvas_repeat(on, name) {
				// 当前d的 this
				let that = this;
				var name_aaa = name;
				let LineA_all = this.LineA_all.series;
				// 获取单条数据
				let LineA = this.LineA;
				if (!(LineA.series.length >= 6)) {
					// 点击添加
					LineA_all.forEach((item, index) => {
						// 可以添加获取这一个数组
						var it = item;
						if (index == on) {
							// 查找当前数组中是否有这个数据
							var LineA = that.LineA;
							var item_data = LineA.series.findIndex((item_tow, index_tow) => {
								return item_tow.name == item.name;
							});

							if (item_data == -1 && !(LineA.series.length >= 6)) {
								LineA.series.push(item);
								// push进数组中,重新diaoyongecharts
							} else {

								let cancel_data = [];
								let cancel_tow = [];
								//  找到的话取消当前数组中的这条数据
								cancel_data = LineA.series.map((item_three, index_three) => {
									if (!(item_three.name == item.name)) {
										return item_three;
									}
								});
								for (let i = 0; i < cancel_data.length; i++) {
									if (cancel_data[i] != undefined) {
										cancel_tow.push(cancel_data[i]);
									}
								}
								LineA.series = cancel_tow;
							}
							// 跟新数据
							_self.showLineA('canvasLineA', LineA);
						}
					});
					// 跟新数据
					// _self.showLineA('canvasLineA', LineA);
				} else {
					// 如果数据显示的数据中有这一条数据 就取消掉没有就提示最多点击6 条
					var Br = LineA.series.some(item => {
						// console.log(item);
						return item.name == name
					})
					console.log(Br);
					if (Br) {
						Br = false;
						let LineA_dd = []
						LineA.series.forEach(item => {
							if (!(item.name == name)) {
								console.log(item);
								LineA_dd.push(item)
							}
						})
						LineA.series = LineA_dd;
						_self.showLineA('canvasLineA', LineA);
					} else {
						uni.showToast({
							title: '最多添加6条',
							duration: 2000,
							icon: 'none'
						});
					}

				}
			},
			// 点击日历单个按钮
			ei_calendar_tap(event) {
				// console.log(event);

				var condition_title = this.condition_title;
				// condition_title[3] = name; // 切换文字
				var target = this.target; // 场次还是座位
				var isgoldentime = this.isgoldentime; // 时段
				var check_day = this.check_day;
				var city = this.city; // 当前城市

				var startDate = this.startDate;
				var endDate = this.endDate;
				var eventTow_item = this.eventTow_item; // 保存当前 even 的 值  保存两
				var eventTow_day = this.eventTow_day; // 两个日 
				if (event.month < 10) {
					event.month = '0' + event.month;
				}
				if (event.day < 10) {
					event.day = '0' + event.day;
				}
				// check_day.push(event.year + '年' + event.month + '月' + event.day + '日')
				var gs_data = event.year + '-' + event.month + '-' + event.day;
				eventTow_item.push(gs_data)
				eventTow_day.push(Number(event.day))
				// console.log(eventTow_item);
				// console.log(eventTow_day);
				// console.log(check_day);
				this.check_day = check_day;
				this.eventTow_item = eventTow_item;
				this.eventTow_day = eventTow_day;
				if (eventTow_item.length == 2) {
					//  如果 0 大于 1 的话  0则是 结束日期 否则相反
					if (eventTow_item[0] > eventTow_item[1]) {
						endDate = eventTow_item[0];
						startDate = eventTow_item[1];
						var num = eventTow_day[0] - eventTow_day[1]

						if (!(num >= 9)) {
							var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
								'&city=' + city + '&isgoldentime=' + isgoldentime + '&target=' + target
							// console.log(url);
							this.uCharts_index(url);
							condition_title[0] = eventTow_item[0] + '-' + eventTow_item[1]
							//  日历默认时间
							var disabledDate = [];
							disabledDate[0] = eventTow_item[0];
							disabledDate[1] = eventTow_item[1];

							eventTow_item = [];
							eventTow_day = [];

							check_day = [];
							this.endDate = endDate;
							this.startDate = startDate;
							this.date = disabledDate;

							this.condition_title = condition_title;
							this.check_day = check_day;
							this.eventTow_item = eventTow_item;
							this.eventTow_day = eventTow_day;
							this.ei_calendar_Br = false;
							this.position_canvas = '';
							this.top_canvas = '';
						} else {
							uni.showToast({
								title: '最多选择8天',
								duration: 2000,
								icon: 'none'
							});
							eventTow_item = [];
							eventTow_day = [];

							check_day = [];

							this.check_day = check_day;
							this.eventTow_item = eventTow_item;
							this.eventTow_day = eventTow_day;
							this.ei_calendar_Br = false;
						}
					} else {
						startDate = eventTow_item[0];
						endDate = eventTow_item[1];
						var num = eventTow_day[1] - eventTow_day[0]
						console.log(eventTow_day);
						console.log(eventTow_day);
						if (!(num >= 9)) {
							var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
								'&city=' + city + '&isgoldentime=' + isgoldentime + '&target=' + target
							// console.log(url);
							this.uCharts_index(url);
							condition_title[0] = eventTow_item[0] + '-' + eventTow_item[1]

							//  日历默认时间
							var disabledDate = [];
							disabledDate[0] = eventTow_item[0];
							disabledDate[1] = eventTow_item[1];

							eventTow_item = [];
							eventTow_day = [];
							check_day = [];

							this.endDate = endDate;
							this.startDate = startDate;
							this.date = disabledDate;

							this.condition_title = condition_title;
							this.check_day = check_day;
							this.eventTow_item = eventTow_item;
							this.eventTow_day = eventTow_day;
							this.ei_calendar_Br = false;
							this.position_canvas = '';
							this.top_canvas = '';
						} else {
							uni.showToast({
								title: '最多选择8天',
								duration: 2000,
								icon: 'none'
							});
							eventTow_item = [];
							eventTow_day = [];
							check_day = [];
							this.check_day = check_day;
							this.eventTow_item = eventTow_item;
							this.eventTow_day = eventTow_day;
						}
					}

				}
			},
			// 场次座位选择
			click_lx(name, index) {
				// this.is_lx = true;
				var condition_title = this.condition_title;
				condition_title[3] = name; // 切换文字
				var target = this.target; // 场次还是座位
				var isgoldentime = this.isgoldentime;

				var startDate = this.startDate; //开始时间
				var endDate = this.endDate; //结束时间
				var city = this.city; // 当前城市
				//  index  场次是1 座位上0
				if (index == 0) {
					target = 'session'
					// session
				} else {
					target = 'seats'
				}
				var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
					'&isgoldentime=' + isgoldentime + '&target=' + target + '&city=' + city;
				this.uCharts_index(url)


				this.target = target;
				this.center_frametow = index; // 索引限制 外加样式显示
				this.is_lx = true; // 关闭
				this.condition_title = condition_title; // 切换文字
				this.position_canvas = '';
				this.top_canvas = '';
			},
			// da大盘排片点击时段
			click_sd(name, index) {
				var condition_title = this.condition_title;
				condition_title[2] = name; // 改显示
				var target = this.target; // 场次还是座位
				var isgoldentime = this.isgoldentime;

				var startDate = this.startDate; //开始时间
				var endDate = this.endDate; //结束时间
				var city = this.city; // 当前城市
				//  index  场次是1 座位上0
				if (index == 0) {
					// session
					isgoldentime = 0;
				} else {
					isgoldentime = 1;
				}
				var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
					'&isgoldentime=' + isgoldentime + '&target=' + target + '&city=' + city;
				this.uCharts_index(url)
				this.isgoldentime = isgoldentime;
				this.is_sd = true; // 关闭
				this.center_frame = index; // 样式控制
				this.condition_title = condition_title; // 赋值样式显示
				this.position_canvas = '';
				this.top_canvas = '';
			},
			// 点击 城市
			click_city(name) {
				// 	var that = this;
				//
				var city_name = name;



				var district = this.district; //几线

				var condition_title = this.condition_title;
				condition_title[1] = name; // 改显示
				var target = this.target; // 场次还是座位
				var isgoldentime = this.isgoldentime; // 什么时段

				var startDate = this.startDate; //开始时间
				var endDate = this.endDate; //结束时间
				var city = this.city; // 当前城市

				if (city_name.indexOf('线城市') != -1 || city_name == '全国') {
					district = city_name;
					city = '';
				} else {
					district = '';
					city = city_name;
				}
				var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
					'&isgoldentime=' + isgoldentime + '&target=' + target + '&city=' + city + '&district=' + district;
				this.uCharts_index(url)
				this.is_show = true; // 关闭
				this.city = city;
				this.condition_title = condition_title; // 赋值样式显示
				this.position_canvas = '';
				this.top_canvas = '';
			},
			// 点击区域 热门城市
			click_grid(aa) {
				var that = this;
				var city_name = aa;
				var district = this.district; //几线

				var condition_title = this.condition_title;
				condition_title[1] = aa; // 改显示
				var target = this.target; // 场次还是座位
				var isgoldentime = this.isgoldentime; // 什么时段

				var startDate = this.startDate; //开始时间
				var endDate = this.endDate; //结束时间
				var city = this.city; // 当前城市

				if (city_name.indexOf('线城市') != -1 ) {
					district = city_name;
					city = '';
				}else if (city_name == '全国') {
					city = city_name;
					district = '';
				} else {
					district = '';
					city = city_name;
				}
				var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend?startDate=' + startDate + '&endDate=' + endDate +
					'&isgoldentime=' + isgoldentime + '&target=' + target + '&city=' + city + '&district=' + district;
				this.uCharts_index(url)
				this.is_show = true; // 关闭
				this.city = city;
				this.condition_title = condition_title; // 赋值样式显示
				this.position_canvas = '';
				this.top_canvas = '';
			},
			// 初始化 地区表
			dataMap() {
				let that = this;
				let zm_list = [];
				uni.showLoading({
					title: '正在加载中'
				});
				uni.request({
					url: 'https://db.topcdb.com/advancedbo/get-citylist',
					success: res => {
						// 下边一系列过程都是在 处理数据
						let z_list = [];
						for (var i in res) {
							zm_list.push({
								// alphabet: i,
								datas: res[i]
							});
						}

						for (let i in zm_list) {
							if (!(i == 0)) {
								delete zm_list[i];
								zm_list.length = 1;
							}
						}
						for (let a in zm_list[0].datas) {
							let region = [];

							if (a !== '#') {
								for (let n in zm_list[0].datas[a]) {
									region.push(n);
								}
								//  最终赋值
								z_list.push({
									letter: a,
									childer: region
								});
							}
						}
						this.zm_list = z_list;
						uni.hideLoading();
					},

					fail: () => {},
					complete: () => {}
				});
			},
			//  d点击旁边字母进行跳转
			dddd(e) {
				this.alpha = e;
			},
			// 点击头部出现 各种样式
			header_tap(inde) {
				var index = inde;
				if (index == 0) {
					// console.log(1);
					var position_canvas = this.position_canvas;
					var top_canvas = this.top_canvas;
					var ei_calendar_Br = this.ei_calendar_Br;

					position_canvas = 'absolute';
					top_canvas = -1000;
					ei_calendar_Br = true;


					this.ei_calendar_Br = ei_calendar_Br;
					this.position_canvas = position_canvas;
					this.top_canvas = top_canvas;

				} else if (index == 1) {
					var position_canvas = this.position_canvas;
					var top_canvas = this.top_canvas;
					position_canvas = 'absolute';
					top_canvas = -1000;
					this.position_canvas = position_canvas;
					this.top_canvas = top_canvas;
					this.is_show = false;
					this.is_sd = true;
					this.is_lx = true;
				} else if (index == 2) {
					var in_sd = this.is_sd;
					if (in_sd == true) {
						this.is_sd = false;
						this.is_lx = true;
						this.is_show = true;
						var position_canvas = this.position_canvas;
						var top_canvas = this.top_canvas;
						position_canvas = 'absolute';
						top_canvas = -1000;
						this.position_canvas = position_canvas;
						this.top_canvas = top_canvas;
					} else if (in_sd == false) {
						this.is_sd = true;
						this.position_canvas = '';
						this.top_canvas = '';
					}
				} else if (index == 3) {
					var ls_lx = this.is_lx;
					if (ls_lx) {
						this.is_lx = false;
						this.is_sd = true;
						this.is_show = true;
						var position_canvas = this.position_canvas;
						var top_canvas = this.top_canvas;
						position_canvas = 'absolute';
						top_canvas = -1000;
						this.position_canvas = position_canvas;
						this.top_canvas = top_canvas;

					} else {
						this.is_lx = true;
						this.position_canvas = '';
						this.top_canvas = '';
					}
				}
			},
			// uCharts
			// ucharts 接口调用
			uCharts_index(url) {
				console.log(url);
				uni.showToast({
					title: '数据加载中',
					icon: 'loading'
				});
				// console.log(url);
				uni.request({
					url
				}).then(dd => {
					var [errer, ra] = dd;
					// 颜色
					// console.log(dd);
					var {
						cookies,
						data,
						errMsg,
						header,
						statusCode
					} = ra;
					var res = data;
					// console.log(res);
					var movie_list = res.movie_list; // 保存了下边点击数的数据格式
					var uCharts_alldata = ra.data.data; // 所有的数据
					// ucharts 用到的数据只显示前三个
					let LineA = {
						categories: [],
						series: []
					};
					let LineA_all = {
						categories: [],
						series: []
					};
					// //这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
					for (let b in res.data_list) {
						// res.data_list[b] = res.data_list[b].slice(6);
						var mone = moment(res.data_list[b]).format('MM')
						console.log(mone);
						LineA_all.categories.push(res.data_list[b])
						
						if (Number(mone) >=10) {
							
							res.data_list[b] = res.data_list[b].slice(5);
						}else {
							res.data_list[b] = res.data_list[b].slice(6);
						}
					}
					//  x 轴显示的时间
					LineA.categories = res.data_list;
					let Allcolor = ['F68C3C', '88DC2D', 'FF574D', 'FFEF02', '3E8EF2', 'FDD002', '2CC6FF', 'F97902', '1FD7DC',
						'E1270B', '34CC6B'
					];
					let i = 0;
					let data_all = res.data;
					for (let a in data_all) {
						i++;
						if (data_all[a].movie_name.length >= 6) {
							// console.log(data_all[a].movie_name);
							data_all[a].movie_name = data_all[a].movie_name.slice(0, 5) + '..'
						}
						data_all[a].name = data_all[a].movie_name;
						data_all[a].color = '#' + Allcolor[i];
						data_all[a].data = data_all[a].value;
						//  删除没哟用的
						// delete data_all[a].value;
						delete data_all[a].movie_name;
						if (a >= 3) {} else {
							LineA.series.push(data_all[a]);
						}
						LineA_all.series.push(data_all[a]);
					}

					this.LineA = LineA; // 当前显示的数据
					this.LineA_all = LineA_all;
					console.log(LineA_all);
					_self.textarea = JSON.stringify(LineA);
					console.log(LineA);
					_self.showLineA('canvasLineA', LineA);
					uni.hideToast();
				});
			},
			// ucharts 初始化
			getServerData() {
				// var that = this;
				var isgoldentime = this.isgoldentime; // 时段
				var startDate = this.startDate; // 当前时间
				var endDate = this.endDate; // 结束时
				var target = this.target;
				var city = this.city;
				var url = 'https://db.topcdb.com/topprogram/get-rowpiece-trend';
				this.uCharts_index(url);
			},
			showLineA(canvasId, chartData) {
				var that = this;
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: false,
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8
					},
					yAxis: {
						gridType: 'dash',
						gridColor: '#CCCCCC',
						dashLength: 8,
						splitNumber: 10,
						min: 0,
						max: 100,
						format: val => {
							return val + '%';
						}
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'curve'
						}
					}
				});
			},
			touchLineA(e) {
				var arr = [...this.LineA_all.categories]
				var index = canvaLineA.getCurrentDataIndex(e)
				var data = arr[index];
				canvaLineA.showToolTip(e, {
					// 设置传入的值
					format: function(item, category) {
						// console.log(category);
						return data + item.name.slice(0, 4) + ".." + item.data + '%';
					}
				});
			},
			// uCharts
			// 修改标题
			title() {
				uni.setNavigationBarTitle({
					title: '排片上座'
				});
			}
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 2) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(800);
			this.getServerData();
		}
	};
</script>

<style lang="less">
	@import url('../index.less');

	// 蒙版样式 
	.ei_calendar_mb {
		position: absolute;
		top: 0;
		width: 100%;
		height: 115%;
		background-color: #fff;
	}

	//  日历样式 
	.ei_calendar_cla {
		position: absolute;
		width: 750upx;
		// height: 2000upx;
		top: 0upx;
		;
	}

	// 场次选择
	.center_session {
		position: absolute;
		top: 185upx;
		width: 750upx;
		z-index: 2000;

		.center_frame_hj,
		.center_frame_quan {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2upx 4upx 0upx rgba(219, 217, 220, 1);
			border: 1px solid #dddddd;
			padding: 0 50upx 0 30upx;
		}

		.active {
			color: rgba(240, 142, 45, 1);
		}

		view {
			font-size: 26upx;
			color: rgba(74, 74, 74, 1);

			image {
				width: 24upx;
				height: 24upx;
			}
		}
	}

	// 场次选择结束
	// 时段css
	.center_frame {
		position: absolute;
		top: 185upx;
		width: 750upx;
		z-index: 2000;

		.center_frame_hj,
		.center_frame_quan {
			display: flex;
			align-items: center;
			justify-content: space-between;
			height: 100upx;
			background: rgba(255, 255, 255, 1);
			box-shadow: 0px 2upx 4upx 0upx rgba(219, 217, 220, 1);
			border: 1px solid #dddddd;
			padding: 0 50upx 0 30upx;
		}

		.active {
			color: rgba(240, 142, 45, 1);
		}

		view {
			font-size: 26upx;
			color: rgba(74, 74, 74, 1);

			image {
				width: 24upx;
				height: 24upx;
			}
		}
	}

	// 时段css 结束
	.canvas_name {
		display: flex;
		background-color: #fff;
		flex-wrap: wrap;
		// padding-top: 
		padding: 50upx 20upx 0 20upx;

		view {
			width: 32%;
			font-size: 30upx;
			margin-top: 20upx;
			padding-left: 3upx;
		}

		view:nth-child(2n) {
			// color: #000000;
			// background-color: red;
			// text-align: right;
		}
	}

	.canvas_name_xian {
		display: inline-block;
		width: 30upx;
		height: 30upx;
		border-radius: 50px;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 750upx;
		height: 800upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 800upx;
		background-color: #ffffff;
		// margin-top: 50upx;
	}

	.view_canvas {
		background-color: #fff;
		width: 750upx;
		height: 800upx;
	}

	page {
		background-color: rgba(245, 245, 245, 1);
	}

	.ppge {

		// margin-right: 40upx;
		// padding: 0 10upx;
		// margin-top: 50upx;
		.header {
			.header_tiem {
				font-size: 28upx;
				font-weight: 400;
				color: rgba(0, 0, 0, 1);
				margin-top: 10upx;
				display: flex;
				justify-content: center;
				height: 60upx;
				line-height: 60upx;
				background-color: #fff;

				border: 1px solid #DDD;

				image {
					width: 26upx;
					height: 14upx;
					padding-top: 20upx;
				}
			}

			.header_center {
				display: flex;
				justify-content: space-between;
				border: 1px solid #DDD;
				background-color: #fff;
				margin-top: 10upx;
				padding: 0 50upx;

				view {
					height: 100upx;
					line-height: 100upx;
					font-size: 24upx;
					font-weight: 400;
					color: rgba(0, 0, 0, 1);
				}

				image {
					width: 26upx;
					height: 14upx;
					padding-top: 20upx;
					padding-left: 10upx;
				}
			}

			// 		display: flex;
			// 		justify-content: space-between;
			// 		view {
			// 			color: #000000;
			// 			display: flex;
			// 			justify-content: center;
			// 			font-size: 30upx;
			// 			height: 60upx;
			// 			line-height: 60upx;
			// 			// align-items: center;
			// 			width: 150upx;
			// 			border-radius: 25upx;
			// 			background-color: #bbb;
			// 			image {
			// 				width: 20upx;
			// 				height: 20upx;
			// 				padding-left: 10upx;
			// 				padding-top: 20upx;
			// 			}
			// 		}
			// 		view:nth-child(1) {
			// 			width: 300upx;
			// 			// border: 1px solid red;
			// 
			// 			border-radius: 25upx;
			// 			background-color: #bbb;
			// 		}
			// 		view:nth-child(2) {
			// 		}
		}
	}

	.page {
		background: #f8f8f8;
		height: 100vh;
		font-size: 28upx;
	}

	.custom-cell {
		color: #4cd964;
	}

	.custom-cell-top-1 {
		color: #007aff;
	}

	.custom-cell-top-2 {
		color: red;
	}
</style>
