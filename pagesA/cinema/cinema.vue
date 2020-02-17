<template>
	<view>
		<view class="header">
			<image class="image_header" src="../../static/cinema/bgc.png" mode=""></image>
			<view class="header_bottom">
				<view class="header_bottom_center">
					<view class="">
						{{cinema_data_data.cinema_name}}
					</view>
					<view class="" @tap="heade_map_click()">
						<image src="../../static/cinema/loastion.png" mode=""></image> <!-- 2.0 不需要-->
					</view>
				</view>
				<view class="header_bottom_b">

					<view class="">
						影厅数 : {{cinema_data_data.halls}}个
					</view>
					<view class="">
						座位数 : {{cinema_data_data.seats}}个
					</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="center_header">
				<view @tap="center_header_click(index)" :class="[index == center_header_index ? 'active' : '']" v-for="(item,index) in center_header_data"
				 :key="index">
					{{item}}
				</view>
			</view>

			<!-- tabone -->
			<view class="center_tabone" :hidden="center_header_index != 0 ">
				<view class="center_tabone_header">
					<view class="header">
						<view class="">
							今日实时
						</view>
						<view class="">
							北京时间 {{time_dat}}
						</view>
					</view>
					<view class="bottom">
						<view class="bottom_data">
							<view class="">
								{{realtime_data.total_bo_s}}
							</view>
							<view class="">
								实时票房
							</view>
						</view>

						<view class="bottom_data">
							<view class="">
								{{realtime_data.total_people_s}}
							</view>
							<view class="">
								观影人数
							</view>
						</view>


						<view class="bottom_data">
							<view class="">
								{{realtime_data.cinema_rank}}
							</view>
							<view class="">
								{{cinema_data_data.city}}排名
							</view>
						</view>
					</view>
				</view>
				<!-- 票房趋势 -->
				<view class="pf_tendency">
					<view class="pf_tendency_header">
						<view class="">
							票房趋势
						</view>
						<view class="" @tap="child_tap" v-if="click_num == 1">
							{{start_day | time_com}}-{{end_day | time_com}}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>


						<view class="" @tap="child_tap" v-if="click_num == 2">
							{{start_days }}-{{end_days }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>
						<view class="" @tap="child_tap" v-if="click_num == 3">
							{{start_day_thre }}-{{end_day_three }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>
						<view class="" @tap="child_tap" v-if="click_num == 4">
							{{start_day_year }}-{{end_day_year }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>



					</view>

					<view class="" :hidden="!Data_select_header || !is_index">
						<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea" @touchmove="moveLineA"
						 @touchend="touchEndLineA"></canvas>
					</view>
				</view>

			</view>

			<!-- tabone -->


			<!-- tabone 时间选择 -->


			<view class="Data_select" :hidden="Data_select_header" :style="{height:windowHeight, Top: 0 + 'px' }">
				<!--  tab 头 -->
				<view class="Data_select_header">
					<view @tap="click_tab(index)" v-for="(item, index) in tab_title" :class="[index == time_tab ? 'active' : '']" :key="index">{{ item }}</view>
				</view>
				<!-- :visible.sync="show" -->
				<!--  日  -->
				<ei-calendar @click="ei_calendar_tap" :visible="time_tab_Br" ref="calendar" type="range" :drawer="false" v-model="date"
				 :custom-date="customDate" format="YYYY-MM-DD"></ei-calendar>

				<!-- 周 -->
				<view v-if="time_tab == 1">
					<view class="week">
						<view class="year_sel">
							<!--  -->
							<view v-for="(item, index) in year" @tap="click_year(item, index)" :class="[index == curren ? 'active' : '']"
							 :key="index">{{ item }}</view>
						</view>
						<!-- data-year="{{is_year}}"
									data-week="{{index+1}}"
									data-index="{{is_year}}-W{{index+1}}" -->
						<view class="week_sel">
							<scroll-view scroll-y :style="{ height: windowHeight }">
								<view v-for="(item, index) in week" :style="{background: index == active_z ? '#F08E2D' : ''}" @tap="check_week(item,index)"
								 :key="index">{{ item }}</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 选择月 -->
				<view v-if="time_tab == 2">
					<view class="month">
						<view class="year_sel">
							<view v-for="(item, index) in year" @tap="tap_year(item, index)" :class="[index == curren ? 'active' : '']" :key="index">{{ item }}</view>
						</view>
						<view class="month_sel">
							<view v-for="(item, index) in month" :style="{backgroundColor:ALL_month_index == index ? '#F08E2D' : ''}" @tap="check_month(item,index)"
							 :key="index">{{ item }}</view>
						</view>
					</view>
				</view>
				<!--  选择月 -->
				<!-- 选择年 -->
				<view v-if="time_tab == 3">
					<view class="year">
						<view class="only_year" :style="{backgroundColor: year_index == index ? '#F08E2D' : ''}" @tap="check_year(item,index)"
						 v-for="(item, index) in year" :key="index">{{ item }}</view>
						<!-- data-year="{{item}}" -->
					</view>
				</view>
				<!-- 选择年 -->
			</view>



			<!-- tabtow -->
			<view class="center_tabtow" :hidden="center_header_index != 1">
				<view class="center_tabtow_header">
					<view @tap="time_tap(0)">
						<image src="../../static/big-plate/previous.png" mode=""></image>
						前一天
					</view>
					<view @tap="show_chehid">
						{{pf_date_data}}
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="time_tap(1)">
						后一天
						<image src="../../static/big-plate/next.png" mode=""></image>
					</view>
				</view>
				<view class="charts_ring_data" :hidden='time_tab_Br_tow'>
					<canvas canvas-id="canvasRing" id="canvasRing" class="charts_ring" @touchstart="touchRing"></canvas>
				</view>
				<view class="center_tabtow_time">
					<view class="">
						总票房：{{pf_list_sum.total_bo_s}}
					</view>
					<view class="">
						更新时间：{{time_dat}}
					</view>
				</view>
			</view>
			<!-- tabtow -->

			<!-- tabtow时间选择 -->
			<view class="Data_select" :hidden="!time_tab_Br_tow" :style="{ Top: 0 + 'px' }">
				<view class="cha" @tap="()=>{time_tab_Br_tow = !time_tab_Br_tow}">
					×
				</view>
				<ei-calendar @click="ei_calendar_tap_tow" :visible="time_tab_Br_tow" ref="calendar" :drawer="false" v-model="date_tow"
				 :custom-date="customDate_tow" format="YYYY-MM-DD"></ei-calendar>
			</view>
			<!-- tabtow时间选择 -->

			<!-- tabthree -->
			<view class="center_tabtow" :hidden="center_header_index != 2">
				<view class="center_tabtow_header">
					<view @tap="center_tabthree_chehcked(0)">
						<image src="../../static/big-plate/previous.png" mode=""></image>
						前一天
					</view>
					<view @tap="show_tabthree_show_chhhecked">
						{{pp_date_data}}
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="center_tabthree_chehcked(1)">
						后一天
						<image src="../../static/big-plate/next.png" mode=""></image>
					</view>
				</view>
				<view class="charts_ring_data" :hidden="time_tab_Br_three">
					<canvas canvas-id="canvasRing_tow" id="canvasRing_tow" class="charts_ring_tow" @touchstart="touchRing_tow"></canvas>
				</view>
				
				<view class="center_tabtow_time">
					<view class="">
						总排场：{{pp_sum_list.session_s}}
					</view>
					<view class="">
						更新时间：{{time_dat}}
					</view>
				</view>
			</view>
			<!-- tabthree -->


		</view>
		<!-- tabone -->
		<view class="button" :hidden="center_header_index != 0 ">
			<view class="buttonH">
				<view class="buttonHone">票房明细</view>
				<view class="buttonHtow" @tap="show_index">
					<!-- <text></text> -->
					<image src="../../static/home/more.png" mode=""></image>
					更多指标
				</view>
			</view>
			<view class="buttonM">
				<view>日期</view>
				<!-- <view></view> -->
				<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.zb_name }}</view>
			</view>
			<!-- @tap="nagitto(it.movie_id_r, it.zz_id)" -->
			<view class="buttonB" v-for="it in cinemalist_data" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name" v-if="click_num == 1">{{it.bdate}}</view>
					<view class="buttonB_Headerson_name" v-if="click_num == 2">{{it.cus_weeks}} 周</view>
					<view class="buttonB_Headerson_name" v-if="click_num == 3">{{it.bdate}}月</view>

					<view class="buttonB_Headerson_name" v-if="click_num == 3">{{it.year}}年</view>
					<view class="buttonB_Headersn1" :hidden="center_header_index == 0">{{it.bdate}}</view>
				</view>
				<view class="buttonB_Headerson_pf">

					<!--分账票房-->
					<view :hidden="!zb_title[0].front_row">{{ it.total_bo_s }}</view>
					<!--人次  -->
					<view :hidden="!zb_title[1].front_row">{{ it.total_people_s }}</view>
					<!--场次  -->
					<view :hidden="!zb_title[2].front_row">{{ it.session_s }}</view>
					<!--场均人次  -->
					<view :hidden="!zb_title[3].front_row">{{ it.people_per_session }}</view>
					<!--平均票价  -->
					<view :hidden="!zb_title[4].front_row">{{ it.avg_price }}</view>
					<!--本地排名  -->
					<view :hidden="!zb_title[5].front_row">{{ it.local_rank }}</view>
					<!--城市票房占比  -->
					<!-- <view :hidden="!zb_title[6].front_row">{{ it.city_zb }}%</view> -->
					<!--网售票房  -->
					<view :hidden="!zb_title[6].front_row">{{ it.ol_total_bo_s }}</view>
					<!--网售票房占比  -->
					<view :hidden="!zb_title[7].front_row">{{ it.ol_total_rate }}%</view>
					<!--网售人次  -->
					<view :hidden="!zb_title[8].front_row">{{ it.ol_people_s }}</view>
					<!--网售人次占比  -->
					<view :hidden="!zb_title[9].front_row">{{ it.ol_people_rate }}%</view>
					<!--单座票房  -->
					<view :hidden="!zb_title[10].front_row">{{ it.avg_seats_income }}</view>
					<!--场均票房  -->
					<view :hidden="!zb_title[11].front_row">{{ it.cj_total }}</view>
					<!--单银幕票房  -->
					<view :hidden="!zb_title[12].front_row">{{ it.avg_hall_income }}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header">
					<view class="" @tap="more_index_header_click">确定</view>
				</view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.zb_name }}
					</view>

				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>
		<!-- tabthree时间选择 -->
		<view class="Data_select" :hidden="!time_tab_Br_three" :style="{height:windowHeight + 'px', Top: 0 + 'px' }">
			<view class="cha" @tap="()=>{time_tab_Br_three = !time_tab_Br_three}">
				×
			</view>
			<ei-calendar @click="ei_calendar_tap_three" :visible="time_tab_Br_three" ref="calendar" :drawer="false" v-model="date_three"
			 :custom-date="customDate_tow" format="YYYY-MM-DD"></ei-calendar>
		</view>
		<!-- tabthree时间选择 -->



		<!-- tabtow -->

		<view class="button" :hidden="center_header_index != 1">
			<view class="buttonH">
				<view class="buttonHone">票房排名</view>
				<view class="buttonHtow" @tap="show_index">
					<!-- <text></text> -->
					<image src="../../static/home/more.png" mode=""></image>
					更多指标
				</view>
			</view>
			<view class="buttonM">
				<view>影片</view>
				<!-- <view></view> -->
				<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.zb_name }}</view>
			</view>
			<view class="buttonB" v-for="item in pf_list" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name">{{item.movie_name}}</view>

					<view class="buttonB_Headersn1">{{item.publish_date}} {{item.bos}}</view>
				</view>
				<view class="buttonB_Headerson_pf">

					<view v-if="zb_title[0].front_row">{{item.total_bo_s}}</view>
					<view v-if="zb_title[1].front_row">{{item.total_people_s}}</view>
					<view v-if="zb_title[2].front_row">{{item.session_s}}</view>
					<view v-if="zb_title[3].front_row">{{item.people_per_session}}</view>
					<view v-if="zb_title[4].front_row">{{item.avg_price}}</view>
					<view v-if="zb_title[5].front_row">{{item.occupancy}}%</view>
					<view v-if="zb_title[6].front_row">{{item.pf_zb}}%</view>
					<view v-if="zb_title[7].front_row">{{item.pc_zb}}%</view>
					<view v-if="zb_title[8].front_row">{{item.pz_zb}}%</view>
					<view v-if="zb_title[9].front_row">{{item.ol_total_bo_s}}</view>
					<view v-if="zb_title[10].front_row">{{item.ol_total_rate}}%</view>
					<view v-if="zb_title[11].front_row">{{item.ol_people_s}}</view>
					<view v-if="zb_title[12].front_row">{{item.ol_people_rate}}%</view>
					<view v-if="zb_title[13].front_row">{{item.bos}}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index || center_header_index == 1 ">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header">
					<view class="" @tap="more_index_header_click">确定</view>
				</view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.zb_name }}
					</view>

				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>



		<view class="button" :hidden="center_header_index != 2">
			<view class="buttonH">
				<view class="buttonHone">影片排片</view>
				<view class="buttonHtow" @tap="show_index">
					<!-- <text></text> -->
					<image src="../../static/home/more.png" mode=""></image>
					更多指标
				</view>
			</view>
			<view class="buttonM">
				<view>影片</view>
				<!-- <view></view> -->
				<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.zb_name }}</view>
			</view>
			<view class="buttonB" v-for="item in pp_list" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name">{{item.movie_name}}</view>

					<!-- <view class="buttonB_Headersn1">{{item.publish_date}}</view> -->
					<view class="buttonB_Headersn1">{{item.publish_date}} {{item.bos}}</view>
				</view>
				<view class="buttonB_Headerson_pf">
					<view v-if="zb_title[0].front_row"> {{item.session_s}}</view>
					<view v-if="zb_title[1].front_row"> {{item.pc_zb}}%</view>
					<view v-if="zb_title[2].front_row"> {{item.total_seats_s}}</view>
					<view v-if="zb_title[3].front_row"> {{item.pz_zb}}%</view>
					<view v-if="zb_title[4].front_row"> {{item.gd_session}}</view>
					<view v-if="zb_title[5].front_row"> {{item.gd_session_rate}}%</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index || center_header_index == 2 ">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header">
					<view class="" @tap="more_index_header_click">确定</view>
				</view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.zb_name }}
					</view>

				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>

	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	// 时间格式化
	import moment from '@/components/moment';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	var _self;
	var canvaArea = null;
	var canvaRing = null;
	var canvaRing_tow = null;
	export default {
		onShareAppMessage(){},
		filters: {
			time_com(item) {
				// console.log(time);
				var mont = moment(item).format('MM')
						var mom  = '';
						var time = item;
				if (Number(mont)  < 10 ) {
					
					mom = time.slice(6)
				}else {
						mom = time.slice(5)
				}
			
			
				return mom
			}
		},
		components: {
			EiCalendar
		},
		data() {
			return {
				tathreecan_num:0, // three 总数
				pp_sum_list:{total_bo_s:1}, // three sum 
				// tabthree日历
				time_tab_Br_three: false,
				date_three: [],
				// tabthree r日历
				// tabtow
				// 日历
				time_tab_Br_tow: false,
				date_tow: '',
				customDate_tow: [{
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
				// 日历
				pf_list_sum: {
					total_bo_s: "16613.00"
				},
				time_dd: '', /// tab tow日期控制
				// tabtow
				// 年
				start_day_year: '',
				end_day_year: '',
				year_data: [],
				year_index: -1,
				// tabone 月
				start_day_thre: '',
				end_day_three: '',
				ALL_month_index: -1,
				ALL_month: [],
				// start_days
				end_days: '',
				click_num: 1,
				// 周票房
				sel_year: '',
				sel_week: '',
				start_days: '',

				active_z: 1000,
				data_alltime_week: [], // 只保存存两个周
				curren: 0,
				is_year: '',
				// 周票房
				data_alltime: [], // 保存两个时间
				// tab 时间选择
				time_tab_Br: false,
				date: [],
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
				wHeight: '',
				time_tab: 0,
				month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
				week: '',
				year: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'],
				tab_title: ['日票房', '周票房', '月票房', '年票房'],
				Data_select_header: true,
				// tab 时间选择
				num_three: 0, // 数据总和
				pp_list: [], // tab three 底部数据

				pp_date_data: '', //格式化之后的时间
				pp_date: '', // tabthre 时间
				pf_list: [
				], //tab tow 底部总数据
				tatowcan_num: 0, // canvas 数据综合用来算占比
				pf_date_data: '', //格式化之后的时间
				pf_date: '',
				pf_dates: '',
				is_index: true, // 跟多指标 显示按钮
				// 底部 显示
				// 点击前一日
				zb_title: [{
						zb_name: "分账票房(万元)",
						id: 0,
						front_row: true
					},
					{
						zb_name: "人次",
						id: 1,
						front_row: true
					},
					{
						zb_name: "场次",
						id: 2,
						front_row: true
					},
					{
						zb_name: "场均人次",
						id: 3,
						front_row: true
					},
					{
						zb_name: "平均票价",
						id: 4,
						front_row: false
					},
					{
						zb_name: "本地排名",
						id: 5,
						front_row: false
					},
					{
						zb_name: "网售票房(万元)",
						front_row: false
					},
					{
						zb_name: "网售票房占比",
						front_row: false
					},
					{
						zb_name: "网售人次(万)",
						front_row: false
					},
					{
						zb_name: "网售人次占比",
						front_row: false
					},
					{
						zb_name: "单座票房",
						front_row: false
					},
					{
						zb_name: "场均票房",
						front_row: false
					},
					{
						zb_name: "单银幕票房(万元)",
						front_row: false
					},

				],
				categories_s: [], // 图表的完整的日期
				time_tab: '0',
				end_dayend_day: '',
				pixelRatio: "",
				apHeight: "",
				offsetTop: "",
				windowHeight: "",
				code: "", //影院ID
				cinema_data_data: {
					cinema_name:'--',
					halls:'--',
					seats:'--',
					city:'--'
				}, // 影城数据
				realtime_data: {
					
					total_bo_s: '--',
					total_people_s: '--',
					cinema_rank: '--',
				}, // 影城数据
				cinemalist_data: [], // tabone 底部数据
				start_day: "", // tabone选择开始日期 
				end_day: "", // tabone选择结束日期 
				time_dat: '15:15:15',
				time_set: '', // 时间定时器
				cWidth_ring: '',
				cHeight_ring: '',
				cWidth_ring_tow: '',
				cHeight_ring_tow: '',
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				center_header_index: 0,
				center_header_data: ['经营数据', '影片票房', '影片排片']
			}
		},
		created() {
			this.time_set = setInterval(() => {
				// var data = moment(new Date()).format('YYYY-MM-DD-SS')
				var date = new Date();
				var getHours = date.getHours(); // 获取小时数(0-23)
				var getMinutes = date.getMinutes(); // 获取分钟数(0-59)
				var getSeconds = date.getSeconds(); // 获取秒数(0-59)
				// console.log(data);
				// console.log(getHours,getMinutes,getSeconds);
				var time = getHours + ':' + getMinutes + ':' + getSeconds
				if (getHours < 10) {
					getHours = '0' + getHours;
				}
				if (getMinutes < 10) {
					getMinutes = '0' + getMinutes
				}
				if (getSeconds < 10) {
					getSeconds = '0' + getSeconds
				}
				this.time_dat = time;
			}, 1000)

		},
		onUnload() {
			clearInterval(this.time_set)
		},
		onReady() {

		},
		// 只需传一个影院 id 就可以le
		async onLoad(e) {


			// 获取最大 最小日期
			var url = 'https://db.topcdb.com/topprogram/get-date';
			const [errer, ra] = await uni.request({
				url,
			})
			if (errer != null) {
				uni.showLoading({
					title: '数据加载失败'
				})
				setTimeout(() => {
					uni.hideLoading()
				}, 2000);
				return false;
			}
			// console.log(ra);
			var max_day = ra.data.bo_date.endDate
			var min_day = ra.data.bo_date.startDate
			this.max_day = max_day; /// 最大和最小日期
			this.min_day = min_day; /// 最大和最小日期



			var code = e.code //影院ID

			var start_day = this.start_day
			var end_day = this.end_dayend_day
			
			var url = "/topprogram/cinema-main"
			let All_data = {
				cinema_code:code,
				dtype:'range',
				with_fwf:1,
				start_date:start_day,
				end_date:end_day
			}
			this.cinema_data(url, this,All_data)
			this.start_day = start_day;
			this.end_day = end_day;
			setTimeout(this.getData, 500)



			//
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
			// this.getServerData();
			this.cWidth_ring = uni.upx2px(750);
			this.cHeight_ring = uni.upx2px(500);

			this.cWidth_ring_tow = uni.upx2px(750);
			this.cHeight_ring_tow = uni.upx2px(500);
			// console.log(this.cHeight_ring_tow);

			// try {
			var res = uni.getSystemInfoSync()
			this.pixelRatio_data = res.pixelRatio;
			this.apHeight = 16;
			this.offsetTop = 80;
			this.windowHeight = res.windowHeight + 'px';
			this.code = code;
			console.log(res);
			this.wHeight = res.windowHeight - 0 + 100 + 'px';
			// } catch (e) {

			// }
			this.z_data()
		},
		methods: {
			// 跳转影院地图
			heade_map_click(){
				uni.showToast({
					title: '即将上线，敬请期待',
					duration:2000,
					icon:'none'
				});
			},
			center_tabthree_chehcked(index) {
				// index == 0 是前一天  == 1 是后一天
				// index == 0是前一天  == 1 是后一天
				var code = this.code;
				var time = this.pp_date; // 保存的请求时间


				if (index == 0) {
					time = moment(time).subtract(1, 'days').format('YYYY-MM-DD')
				} else {
					time = moment(time).subtract(-1, 'days').format('YYYY-MM-DD')
				}
				let url = '/topprogram/cinema-movie'
				let All_data = {
					cinema_code:code,
					dtype:'range',
					start_date:time,
					end_date:time
				}
				this.pp_index(url, this,All_data)
				this.pp_date = time;
				this.pp_date_data = moment(time).format('YYYY年MM月DD日')

				this.date_three = [new Date(time)] //、 日历显示时间
				// this.time_tab_Br_three = false;  // 关闭弹出日历
				setTimeout(this.getData_three, 500);
			},
			// tabthree日历
			show_tabthree_show_chhhecked() {

				this.time_tab_Br_three = true;
			},
			ei_calendar_tap_three(e) {
				console.log(e);
				var that = this;
				var data = e.format.split('/')

				var time = data[0] + '-' + data[1] + '-' + data[2]
				console.log(time);
				var code = this.code;

				let url = '/topprogram/cinema-movie'
				let All_data = {
					cinema_code:code,
					dtype:'range',
					start_date:time,
					end_date:time
				}
				this.pp_index(url, that,All_data)
				this.pp_date = time;
				this.date_three = [new Date(time)]
				this.pp_date_data = moment(time).format('YYYY年MM月DD日')
				this.time_tab_Br_three = false;
				setTimeout(this.getData_three, 500);
			},
			// tabthree日历
			// tab tow 
			// 前一天后一天
			time_tap(index) {
				// index == 0是前一天  == 1 是后一天
				var code = this.code;
				var time = this.pf_date; // 保存的请求时间
				console.log(index);
				var zb_title = [...this.zb_title]
				
				
				if (index == 0) {
					time = moment(time).subtract(1, 'days').format('YYYY-MM-DD')
				} else {
					time = moment(time).subtract(-1, 'days').format('YYYY-MM-DD')
				}
				let url = '/topprogram/cinema-movie'
				let All_data = {
					cinema_code:code,
					dtype:'range',
					start_date:time,
					end_date:time
				}
				var tt =  moment().format('YYYY-MM-DD');
				if (time ==tt) {
					zb_title.forEach((item,i) =>{
						if (item.id == 0) {
							item.zb_name = '实时票房'
						}
					})
				}else {
					zb_title.forEach((item,i) =>{
						if (item.id == 0) {
							item.zb_name = '票房'
						}
					})
				}
				
				this.pf_index(url, this,All_data)
				this.zb_title = zb_title;
				this.pf_date = time;
				this.pf_date_data = moment(time).format('YYYY年MM月DD日')
				this.pf_dates = time; // 结束日期

				this.date_tow = [new Date(time)] //、 日历显示时间
				this.time_tab_Br_tow = false; // 关闭弹出日历
				setTimeout(this.getData_two, 500);
			},
			// 点击日历
			ei_calendar_tap_tow(e) {
				var that = this;
				var data = e.format.split('/')

				var time = data[0] + '-' + data[1] + '-' + data[2]
				console.log(time);
				var code = this.code;
				// zb_title_two 
				// var date = moment().format('YYYY-MM-DD')
				//影片票房接口
				
				let url = '/topprogram/cinema-movie'
				let All_data = {
					cinema_code:code,
					dtype:'range',
					start_date:time,
					end_date:time
				}
				this.pf_index(url, that,All_data)
				// this.zb_title = zb_title_two;
				this.pf_date = time;
				this.pf_date_data = moment(time).format('YYYY年MM月DD日')
				this.pf_dates = time;

				this.date_tow = [new Date(time)]
				this.time_tab_Br_tow = false;
				setTimeout(that.getData_two, 500);
			},
			//开始 日历
			show_chehid() {
				this.time_tab_Br_tow = true;
			},
			// tabtow
			// 年点击
			check_year(item, index) {
				if (this.year_data instanceof Array) {
					var year = this.year_data;
				} else {
					var year = [];
				}
				year.push(Number(item))
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
						})
						this.year_data = year[0]
						return false;
					}

					let All_data = {
						
					}
					let url = ''
					var code = this.code;
					if (year[0] > year[1]) {
						var end_data = year[0];
						var strat_data = year[1];
						url = '/topprogram/cinema-main'
						All_data = {
							cinema_code:code,
							dtype:'year',
							with_fwf:1,
							start_date:strat_data,
							end_date:end_data
						}
						this.start_day_year = strat_data;
						this.end_day_year = end_data;
						this.start_day = strat_data + '';
						this.end_day = end_data + '';
						this.click_num = 4;
						this.Data_select_header = true;
						this.year_data = [];
						this.year_index = -1;
						this.cinema_data(url, this,All_data)
						setTimeout(this.getData, 500);
					} else if (year[1] > year[0]) {
						var end_data = year[1];
						var strat_data = year[0];
						url = '/topprogram/cinema-main'
						All_data = {
							cinema_code:code,
							dtype:'year',
							with_fwf:1,
							start_date:strat_data,
							end_date:end_data
						}
						this.start_day_year = strat_data;
						this.end_day_year = end_data;
						this.start_day = strat_data + '';
						this.end_day = end_data + '';
						this.click_num = 4;
						this.Data_select_header = true;
						this.year_data = [];
						this.year_index = -1;
						this.cinema_data(url, this,All_data)
						setTimeout(this.getData, 500);
					}
				}


			},
			// 月点击//
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
				if (ALL_month.length == 1) {
					// ALL_month[0]
					var time = new Date(year + '-' + month + '-' + '01').getTime();
					if (ALL_month[0] == time) {
						uni.showToast({
							title: '请勿点击同一月',
							duration: 2000,
							icon: 'none'
						});
						this.ALL_month = ALL_month[0]
						return false;
					} else {
						uni.showToast({
							title: '请选择结束月',
							duration: 2000,
							icon: 'none'
						});
					}
				}
				ALL_month.push(new Date(year + '-' + month + '-' + '01').getTime())
				this.ALL_month_index = index
				this.ALL_month = ALL_month;
				// 点击不时
				let url = '';
				let All_data = {
					
				}
				if (ALL_month.length == 2) {
					var code = this.code;
					if (ALL_month[0] > ALL_month[1]) {
						var end_month = new Date(ALL_month[0])
						var start_month = new Date(ALL_month[1])
						var i = 0;
						var arr = []
						console.log(start_month);
						for (var from = start_month; from < end_month; i++) {
							arr.push(moment(from).format('YYYY-MM'))
							from.setMonth(from.getMonth() + 1)
						}
						// console.log(arr);
						if (arr.length > 12) {
							uni.showToast({
								title: '最多选择12个月'
							});
							this.ALL_month = ALL_month[0]
							return false;
						} else {
							// 这里写逻辑
							var start_day = moment(new Date(ALL_month[1])).format('YYYY-MM')
							var end_day = moment(new Date(ALL_month[0])).format('YYYY-MM')
							this.start_day_thre = start_day;
							this.end_day_three = end_day;
							this.start_day = start_day;
							this.end_day = end_day;
							this.click_num = 3;
							this.time_tab = 2;
							this.Data_select_header = true;
							this.ALL_month = [];
							this.ALL_month_index = -1;
							url = '/topprogram/cinema-main'
							All_data=  {
								cinema_code:code,
								dtype:'month',
								with_fwf:1,
								start_date:start_day,
								end_date:end_day
							}
							this.cinema_data(url, that,All_data)
							setTimeout(that.getData, 500);
						}
						// 先点小 后点大
					} else if (ALL_month[1] > ALL_month[0]) {

						var end_month = new Date(ALL_month[1])
						var start_month = new Date(ALL_month[0])
						var i = 0;
						var arr = []
						console.log(start_month);
						for (var from = start_month; from < end_month; i++) {
							arr.push(moment(from).format('YYYY-MM'))
							from.setMonth(from.getMonth() + 1)
						}
						// console.log(arr);
						if (arr.length > 12) {
							uni.showToast({
								title: '最多选择12个月'
							});
							this.ALL_month = ALL_month[0]
							return false;
						} else {
							// 这里写逻辑
							var start_day = moment(new Date(ALL_month[0])).format('YYYY-MM')
							var end_day = moment(new Date(ALL_month[1])).format('YYYY-MM')
							this.start_day_thre = start_day;
							this.end_day_three = end_day;
							this.start_day = start_day;
							this.end_day = end_day;
							this.click_num = 3;
							this.time_tab = 2;
							this.Data_select_header = true;
							this.ALL_month = [];
							this.ALL_month_index = -1;
							url = "/topprogram/cinema-main"
							All_data = {
								cinema_code:code,
								dtype:'month',
								with_fwf:1,
								start_date:start_day,
								end_date:end_day
							}
							this.cinema_data(url, that,All_data)
							setTimeout(that.getData, 500);
						}


					}
				}
			},
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
				console.log(d < to);
				console.log(to);
				this.is_year = year;
				this.curren = index;
			},
			// 周点击
			check_week(item, index) {
				var is_year = this.is_year;
				var code = this.code; // 影院编码
				var that = this;
				if (this.data_alltime_week instanceof Array) {
					var data_alltime_week = this.data_alltime_week;
				} else {
					var data_alltime_week = [];
				}
				var len = item.length
				var time = '';
				time = item.split('~')[1]
				time = time.split('.')
				if (Number(time[0]) < 10) {
					time[0] = '0' + time[0]
				}
				if (Number(time[1]) < 10) {
					time[1] = '0' + time[1]
				}
				time = is_year + '-' + time[0] + '-' + time[1]
				// console.log(time);
				this.active_z = index;
				var wek = index;
				// 选择的周
				if (wek < 10) {
					wek = '0' + (wek + 1)
				}

				data_alltime_week.push(new Date(time))
				if (data_alltime_week.length == 1) {


					var start_day = is_year + "-W" + wek
					var max_day = moment()
					var max_week = moment(max_day).format("w");
					var max_year = moment(max_day).format("YYYY");

					if (max_year > is_year) {
						var start_days = is_year + week + "周"
						this.start_day = start_day,
							this.sel_year = is_year,
							this.sel_week = week,
							this.start_days = start_days
					} else if (max_year == is_year) {
						if (wek <= max_week) {
							var start_days = is_year + wek + "周"
							this.start_day = start_day,
								this.sel_year = is_year,
								this.sel_week = wek,
								this.start_days = start_days
						}



						uni.showLoading({
							title: '请选择结束日期',
							mask: false,
							icon: 'none',
							duration: 2000
						});
					}
				}

				// 有结束周时
				if (data_alltime_week.length == 2) {
					var start_day = this.start_day
					var start_days = this.start_days
					var max_day = moment()
					var max_week = moment(max_day).format("w");
					var max_year = moment(max_day).format("YYYY");
					// 两个时间相同 则 阻止 
					let url = '';
					let All_data = {}
					if (data_alltime_week[0] == data_alltime_week[1]) {
						uni.showLoading({
							title: '请选择不同的周',
							mask: false,
							duration: 2000,
							icon: 'none'
						});
						this.data_alltime_week = data_alltime_week[0]
						return false;
					}


					var max_year = moment(new Date()).format("YYYY");
					var week = [];
					var is_weekend = 0;
					var i = 0;


					if (data_alltime_week[0] - data_alltime_week[1] > 0) {
						var to = data_alltime_week[0];
						for (var from = data_alltime_week[1]; from < to; i++) {
							if (is_weekend == 1) {
								var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
							} else {
								var zfrom = from;
							}
							var a = from.getTime()
							// console.log(a);
							var b = new Date().getTime()
							// console.log(a);
							// console.log(b);
							if (a >= b) {
								from.setDate(from.getDate() + 6);
								continue;
							}
							var txt = '第' + i + '周 ' + (zfrom.getMonth() + 1) + '.' + zfrom.getDate() + '~';
							from.setDate(from.getDate() + 6);
							if (from < to) {
								var txt2 = from.getMonth() + 1 + '.' + from.getDate();
								from.setDate(from.getDate() + 1);
							} else {
								to.setDate(to.getDate() + 1);
								txt2 = to.getMonth() + 1 + '.' + to.getDate();
							}
							week.push(txt + txt2);
						}
						if (week.length > 12) {
							uni.showLoading({
								title: '最多选择12周',
								mask: false,
								duration: 2000,
								icon: 'none'
							});
							this.data_alltime_week = [];
							return false;
						} else {
							if (is_year < max_year) {
								var end_day = is_year + "-W" + wek
								var end_days = is_year + wek + "周"
								var start_day_all = start_day.split("-W")
								var start_year = start_day_all[0]
								var start_week = start_day_all[1]
								if (start_year <= is_year) {
									if (start_week <= wek) {} else {
										end_day = start_day
										start_day = is_year + "-W" + wek
										end_days = start_days
										start_days = is_year + week + "周"
									}
								} else {
									end_day = start_day
									start_day = is_year + "-W" + wek
									end_days = start_days
									start_days = is_year + week + "周"
								}

								start_days = start_day.replace("-W", "-") + "周"
								end_days = end_day.replace("-W", "-") + "周"
								this.start_day = start_day;
								this.end_day = end_day;
								this.start_days = start_days;
								this.end_days = end_days;
								this.Data_select_header = true;
								this.click_num = 2;
								this.active_z = -1;
								url = "/topprogram/cinema-main"
								All_data = {
									cinema_code:code,
									dtype:'week',
									with_fwf:1,
									start_date:start_day,
									end_date:end_day
								}
								this.cinema_data(url, this,All_data)
								setTimeout(this.getData, 500);
							} else if (is_year == max_year) {
								var end_day = is_year + "-W" + wek
								var end_days = is_year + wek + "周"
								var start_day_all = start_day.split("-W")
								var start_year = start_day_all[0]
								var start_week = start_day_all[1]
								if (start_year <= is_year) {
									if (start_week <= wek) {} else {
										end_day = start_day
										start_day = is_year + "-W" + wek
										end_days = start_days
										start_days = is_year + wek + "周"

									}
								} else {
									end_day = start_day
									start_day = is_year + "-W" + wek
									end_days = start_days
									start_days = is_year + wek + "周"
								}

								start_days = start_day.replace("-W", "-") + "周"
								end_days = end_day.replace("-W", "-") + "周"


								this.start_day = start_day;
								this.end_day = end_day;
								this.start_days = start_days;
								this.end_days = end_days;
								this.Data_select_header = true;
								this.active_z = -1;
								this.click_num = 2;
								url = "/topprogram/cinema-main"
								All_data = {
									cinema_code:code,
									dtype:'week',
									with_fwf:1,
									start_date:start_day,
									end_date:end_day
								}
								console.log(url)
								that.cinema_data(url, that,All_data)
								setTimeout(that.getData, 500);
							}
						}
					} else if (data_alltime_week[1] > data_alltime_week[0] > 0) {
						var to = data_alltime_week[1]
						for (var from = data_alltime_week[0]; from < to; i++) {
							if (is_weekend == 1) {
								var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
							} else {
								var zfrom = from;
							}
							var a = from.getTime()
							// console.log(a);
							var b = new Date().getTime()
							// console.log(a);
							// console.log(b);
							if (a >= b) {
								from.setDate(from.getDate() + 6);
								continue;
							}
							var txt = '第' + i + '周 ' + (zfrom.getMonth() + 1) + '.' + zfrom.getDate() + '~';
							from.setDate(from.getDate() + 6);
							if (from < to) {
								var txt2 = from.getMonth() + 1 + '.' + from.getDate();
								from.setDate(from.getDate() + 1);
							} else {
								to.setDate(to.getDate() + 1);
								txt2 = to.getMonth() + 1 + '.' + to.getDate();
							}
							week.push(txt + txt2);
						}

						if (week.length > 12) {
							uni.showLoading({
								title: '最多选择12周',
								mask: false,
								duration: 2000,
								icon: 'none'
							});
							this.data_alltime_week = [];
							return false;
						} else {
							if (is_year < max_year) {
								// console.log('is_year == max_year');
								var end_day = is_year + "-W" + wek
								var end_days = is_year + wek + "周"
								var start_day_all = start_day.split("-W")
								var start_year = start_day_all[0]
								var start_week = start_day_all[1]
								if (start_year <= is_year) {
									if (start_week <= wek) {} else {
										// console.log('start_week <= wek');

										end_day = is_year + "-W" + wek
										start_day = start_day
										end_days = start_days
										start_days = is_year + week + "周"

									}
								} else {
									console.log('! start_week <= wek');
									end_day = is_year + "-W" + wek
									start_day = start_day
									end_days = start_days
									start_days = is_year + week + "周"
								}

								start_days = start_day.replace("-W", "-") + "周"
								end_days = end_day.replace("-W", "-") + "周"
								this.start_day = start_day;
								this.end_day = end_day;
								this.start_days = start_days;
								this.end_days = end_days;
								this.Data_select_header = true;
								this.click_num = 2;
								this.active_z = -1;
								url = "/topprogram/cinema-main"
								All_data = {
									cinema_code:code,
									dtype:'week',
									with_fwf:1,
									start_date:start_day,
									end_date:end_day
								}
								this.cinema_data(url, this,All_data)
								setTimeout(this.getData, 500);
							} else if (is_year == max_year) {
								var end_day = is_year + "-W" + wek
								var end_days = is_year + wek + "周"
								var start_day_all = start_day.split("-W")
								var start_year = start_day_all[0]
								var start_week = start_day_all[1]
								if (start_year <= is_year) {
									if (start_week <= wek) {} else {
										// console.log('start_week <= wek');

										end_day = start_day
										start_day = start_days
										end_days = is_year + "-W" + wek
										start_days = is_year + wek + "周"

									}
								} else {
									end_day = is_year + "-W" + wek
									start_day = start_day
									end_days = start_days
									start_days = is_year + wek + "周"
								}

								start_days = start_day.replace("-W", "-") + "周"
								end_days = end_day.replace("-W", "-") + "周"


								this.start_day = start_day;
								this.end_day = end_day;
								this.start_days = start_days;
								this.end_days = end_days;
								this.Data_select_header = true;
								this.click_num = 2;
								this.active_z = -1;
								var url = "/topprogram/cinema-main"
								All_data = {
									cinema_code:code,
									dtype:'week',
									with_fwf:1,
									start_date:start_day,
									end_date:end_day
								}
								that.cinema_data(url, that,All_data)
								setTimeout(that.getData, 500);
							}
						}
					}
					// console.log(week);
					this.data_alltime_week = [];
					return false;
				}
				this.data_alltime_week = data_alltime_week;
			},
			click_year(name, index) {
				var week = [];

				var is_weekend = 0;
				var d = new Date(name, 0, 1);

				while (d.getDay() != 1) {
					d.setDate(d.getDate() + 1);
				}
				var to = new Date(name + 1, 0, 1);
				while (to.getDay() != 1) {
					to.setDate(to.getDate() + 1);
				}
				var i = 1;
				for (var from = d; from < to; i++) {
					if (is_weekend == 1) {
						var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
					} else {
						var zfrom = from;
					}
					var a = from.getTime()
					var b = new Date().getTime()
					if (a >= b) {
						from.setDate(from.getDate() + 6);
						continue;
					}
					var txt = '第' + i + '周 ' + (zfrom.getMonth() + 1) + '.' + zfrom.getDate() + '~';
					from.setDate(from.getDate() + 6);
					if (from < to) {
						var txt2 = from.getMonth() + 1 + '.' + from.getDate();
						from.setDate(from.getDate() + 1);
					} else {
						to.setDate(to.getDate() + 1);
						txt2 = to.getMonth() + 1 + '.' + to.getDate();
					}
					week.push(txt + txt2);
				}
				this.curren = index;
				this.is_year = name;
				this.week = week; //当前年的所有数据

			},
			// 日历点击事件
			ei_calendar_tap(e) {
				var code = this.code; // 影院编码
				if (this.data_alltime instanceof Array) {
					var data_alltime = this.data_alltime;
				} else {
					var data_alltime = [];
				}
				var data = '';
				var year = e.year + '';
				var month = e.month + '';
				var day = e.day + '';
				if (day.length >= 2) {
					if (Number(day) < 10) {
						day = day.slice(1);
					}
				}
				if (month.length == 2) {
					if (Number(month) < 10) {
						month = month.slice(1);
					}
				}

				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day
				}
				data = year + '-' + month + '-' + day;
				data_alltime.push(new Date(data).getTime())

				// 当天的 时间戳
				var j_time = new Date().getTime();

				if (data_alltime[data_alltime.length - 1] > j_time) {
					uni.showToast({
						title: '最大日期为今天',
						duration: 2000,
						icon: 'none'
					})
					this.data_alltime = []
					return false
				}


				if (data_alltime.length == 2) {
					let url = '';
					let All_data = {}
					// 点击同一天
					if (data_alltime[0] == data_alltime[1]) {
						var end_day = moment(data_alltime[0]).format('YYYY-MM-DD');
						var start_day = moment(data_alltime[1]).format('YYYY-MM-DD');
						url = "/topprogram/cinema-main"
						All_data = {
							cinema_code:code,
							dtype:'range',
							with_fwf:1,
							start_date:start_day,
							end_date:end_day
						}
						this.cinema_data(url, this,All_data)
						this.start_day = start_day;
						this.end_day = end_day;
						this.Data_select_header = true;
						this.click_num = 1;
						this.time_tab_Br = false;
						setTimeout(this.getData, 500);
					}


					if (data_alltime[0] - data_alltime[1] > 0) {
						var time = (data_alltime[0] - data_alltime[1]) / 1000 / 60 / 60 / 24
						var end_day = moment(data_alltime[0]).format('YYYY-MM-DD');
						var start_day = moment(data_alltime[1]).format('YYYY-MM-DD');
						console.log(start_day);
						console.log(end_day);
						// 最多选择 92天
						if (time < 92) {
							url = "/topprogram/cinema-main"
							All_data = {
								cinema_code:code,
								dtype:'range',
								with_fwf:1,
								start_date:start_day,
								end_date:end_day
							}
							this.cinema_data(url, this,All_data)
							this.start_day = start_day;
							this.end_day = end_day;
							this.Data_select_header = true;
							this.click_num = 1;
							this.time_tab_Br = false;
							setTimeout(this.getData, 500);
						} else {
							uni.showLoading({
								title: '最大日期为92天',
								duration: 2000,
								icon: 'none'
							})
							return false;
						}
					} else if (data_alltime[1] - data_alltime[0] > 0) {
						var time = (data_alltime[1] - data_alltime[0]) / 1000 / 60 / 60 / 24
						var end_day = moment(data_alltime[1]).format('YYYY-MM-DD');
						var start_day = moment(data_alltime[0]).format('YYYY-MM-DD');
						// 最多选择 92天
						if (time < 92) {
							url = "/topprogram/cinema-main"
							All_data = {
								cinema_code:code,
								dtype:'range',
								with_fwf:1,
								start_date:start_day,
								end_date:end_day
							}
							this.cinema_data(url, this,All_data)
							this.start_day = start_day;
							this.end_day = end_day;
							this.Data_select_header = true;
							this.click_num = 1;
							this.time_tab_Br = false;
							setTimeout(this.getData, 500);
						} else {
							uni.showLoading({
								title: '最大日期为92天',
								duration: 2000,
								icon: 'none'
							})
							return false;
						}
					}
					this.data_alltime = [];
					return false;
				}
				this.data_alltime = data_alltime;
			},
			// 开启日历
			child_tap() {
				this.Data_select_header = false;

				if (this.time_tab == 0) {
					this.time_tab_Br = true;
				} else {
					this.time_tab_Br = false;
				}
			},
			// tab one 时间事件
			click_tab(index) {

				if (index == 0) {
					this.time_tab_Br = true;
				} else {
					this.time_tab_Br = false;
				}
				this.time_tab = index
			},
			disabledDate(date) {
				const start = new Date('2019/5/10').getTime();
				const end = new Date('2019/7/21').getTime();
				return date.getTime() <= start || date.getTime() >= end;
			},
			// 月方法
			//  c初始化 周 所有的数据
			z_data() {
				//周
				var week = [];
				var all_year = [];
				var year =
					moment(new Date())
					.add(0, 'year')
					.format('YYYY') - 0; //当前年;

				var is_weekend = 0;
				var d = new Date(year, 0, 1);
				for (var i = year; i >= 2012; i--) {
					all_year.push(i);
				}

				while (d.getDay() != 1) {
					d.setDate(d.getDate() + 1);
				}
				var to = new Date(year + 1, 0, 1);
				while (to.getDay() != 1) {
					to.setDate(to.getDate() + 1);
				}
				var i = 1;
				for (var from = d; from < to; i++) {
					if (is_weekend == 1) {
						var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
					} else {
						var zfrom = from;
					}
					var a = from.getTime()
					var b = new Date().getTime()
					if (a >= b) {
						from.setDate(from.getDate() + 6);
						continue;
					}
					var txt = '第' + i + '周 ' + (zfrom.getMonth() + 1) + '.' + zfrom.getDate() + '~';
					from.setDate(from.getDate() + 6);
					if (from < to) {
						var txt2 = from.getMonth() + 1 + '.' + from.getDate();
						from.setDate(from.getDate() + 1);
					} else {
						to.setDate(to.getDate() + 1);
						txt2 = to.getMonth() + 1 + '.' + to.getDate();
					}
					week.push(txt + txt2);
				}
				this.is_year = all_year[0];
				this.week = week;
				this.year = all_year;
			},
			// tab one 时间事件
			// tabthree
			showRing_tow(canvasId, chartData, title = '', name = '', color = "") {
				canvaRing_tow = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {show:false},
					title: {
						name: name,
						color: color,
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: title,
						color: '#666666',
						fontSize: 18 * _self.pixelRatio,
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



					width: uni.upx2px(750) * _self.pixelRatio,
					height: uni.upx2px(500) * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
			},
			touchRing_tow(e) {
				var index = canvaRing_tow.getCurrentDataIndex(e);
				if (index >= 0) {
					var num = this.tathreecan_num;
					var title = canvaRing_tow.opts.series[index].name;
					var subtitle = canvaRing_tow.opts.series[index].data - 0;
					subtitle = (subtitle / num * 100).toFixed(1) + '%';
					var color = canvaRing_tow.opts.series[index].color;
					canvaRing_tow.updateData({
						title: {
							name: subtitle,
							color
						},
						subtitle: {
							name: title
						}
					});
				}
				
			},
			// tabthre
			showRing(canvasId, chartData, title = '', name = '', color = "") {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {show:false},
					title: {
						name: name,
						color: color,
						fontSize: 25 * _self.pixelRatio,
					},
					subtitle: {
						name: title,
						color: '#666666',
						fontSize: 18 * _self.pixelRatio,
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


					width: uni.upx2px(750) * _self.pixelRatio,
					height: uni.upx2px(500) * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
			},
			touchRing(e) {
				var index = canvaRing.getCurrentDataIndex(e);
				if (index >= 0) {
					var num = this.tatowcan_num;
					var title = canvaRing.opts.series[index].name;
					var subtitle = canvaRing.opts.series[index].data - 0;
					subtitle = (subtitle / num * 100).toFixed(1) + '%';
					var color = canvaRing.opts.series[index].color;
					canvaRing.updateData({
						title: {
							name: subtitle,
							color
						},
						subtitle: {
							name: title
						}
					});
				}
			},
			// 显示跟多指标
			show_index() {
				this.is_index = false;
			},
			// 跟多指标确定
			more_index_header_click() {
				_self.is_index = true;
			},
			showArea(canvasId, chartData) {
				canvaArea = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'area',
					fontSize: 11,
					legend: {show:false},
					dataLabel: false,
					dataPointShape: true,
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: true,
					enableScroll: true, //开启图表拖拽功能
					xAxis: {
						type: 'grid',
						gridColor: '#CCCCCC',
						gridType: 'dash',
						dashLength: 8,
						itemCount: 7, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						// disabled:true,
						disableGrid: true,
					},
					yAxis: {
						gridType: 'solid',
						gridColor: '#CCCCCC',
						dashLength: 5,
						splitNumber: 5,
						min: 0,
						max: 5,
					},
					width: uni.upx2px(750) * _self.pixelRatio,
					height: uni.upx2px(500) * _self.pixelRatio,
					extra: {
						area: {
							type: 'curve',
							opacity: 0.2,
							addLine: true,
							width: 2
						}
					}
				});

			},
			// 滑动图表
			moveLineA(e) {
				canvaArea.scroll(e);
			},
			touchEndLineA(e) {
				canvaArea.scrollEnd(e);
			},
			touchArea(e) {
				canvaArea.scrollStart(e);

				var index = canvaArea.getCurrentDataIndex(e);
				var categories_s = [..._self.categories_s];
				var data_item = categories_s[index];
				canvaArea.showToolTip(e, {

					format: function(item, category) {
						return data_item + '：' + ' ' + item.data + '万'
					}
				});
			},
			//调用影院详情接口
			async cinema_data(url, that,All_data) {
				let userType = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res} = await this.$http.get({url,data:All_data})
				
				res.realtime_data.total_bo_s = (res.realtime_data.total_bo_s - 0).toFixed(0)
				// start_day
				var start_day = this.start_day
				var end_day = this.end_day
				if (start_day !== "") {
				} else if (start_day == "NaN周") {
					console.log(res.params.start_date);
					start_day = res.params.start_date
				} else {
					start_day = res.params.start_date
				}
				if (end_day !== "") {
					end_day = end_day
				} else {
					end_day = res.params.end_date
				}
				for (var i in res.cinemalist_data) {

					//票房
					res.cinemalist_data[i].total_bo_s = (res.cinemalist_data[i].total_bo_s / 10000).toFixed(2)
					//人次
					// 场均人次
					res.cinemalist_data[i].people_per_session = (res.cinemalist_data[i].people_per_session - 0).toFixed(0)
					// 平均票价
					res.cinemalist_data[i].avg_price = (res.cinemalist_data[i].avg_price - 0).toFixed(1)
					// 网售票房
					
					if (Number(res.cinemalist_data[i].ol_total_bo_s) / 10000 - 0 > 0) {
							res.cinemalist_data[i].ol_total_bo_s = (Number(res.cinemalist_data[i].ol_total_bo_s) / 10000 - 0).toFixed(2)
					}else  {
						res.cinemalist_data[i].ol_total_bo_s  = '--'
					}
				
					// 网售票房占比
					if (Number(res.cinemalist_data[i].ol_total_rate) * 100 > 0) {
							res.cinemalist_data[i].ol_total_rate = (Number(res.cinemalist_data[i].ol_total_rate) * 100).toFixed(2)
					}else  {
						res.cinemalist_data[i].ol_total_rate  = '--'
					}
					
					// 网售人次
					if (Number(res.cinemalist_data[i].ol_people_s) / 10000 - 0) {
						res.cinemalist_data[i].ol_people_s = (Number(res.cinemalist_data[i].ol_people_s) / 10000 - 0).toFixed(2)
					}else  {
						res.cinemalist_data[i].ol_people_s  = '--'
					}
					// 网售人次占比
					if (Number(res.cinemalist_data[i].ol_people_rate) * 100) {
						res.cinemalist_data[i].ol_people_rate = (Number(res.cinemalist_data[i].ol_people_rate) * 100).toFixed(2)
					}else  {
						res.cinemalist_data[i].ol_people_rate  = '--'
					}
					//单座票房
					res.cinemalist_data[i].avg_seats_income = (res.cinemalist_data[i].avg_seats_income - 0).toFixed(0)
					// 城市票房
					res.cinemalist_data[i].city_total = (res.cinemalist_data[i].city_total / 10000).toFixed(2)
					//城市票房占比
					res.cinemalist_data[i].city_zb = (res.cinemalist_data[i].total_bo_s / res.cinemalist_data[i].city_total * 100).toFixed(
						2)

					//  场均票房
					res.cinemalist_data[i].cj_total = (res.cinemalist_data[i].total_bo_s * 10000 / res.cinemalist_data[i].session_s)
						.toFixed(
							2)
					// 单银幕票房
					res.cinemalist_data[i].avg_hall_income = (res.cinemalist_data[i].avg_hall_income / 10000).toFixed(2)
					var local_rank = ""
					if (res.cinemalist_data[i].local_rank == 0) {
						local_rank = "-"
					} else {
						local_rank = res.cinemalist_data[i].local_rank
					}

					res.cinemalist_data[i].local_rank = local_rank

				}
				var disabledDate = [];
				disabledDate[0] = end_day;
				disabledDate[1] = start_day;
				this.date = disabledDate;
				var arr = [];
				if (this.click_num == 3) {
					res.cinemalist_data.forEach((item, i) => {
						item.bdate = item.bdate.slice(0, 7)
						arr.push(item)
					})
					this.cinemalist_data = arr;
				} else {
					this.cinemalist_data = res.cinemalist_data;
				}

				console.log(arr);
				this.cinema_data_data = res.cinema_data;
				this.realtime_data = res.realtime_data;

				this.start_day = start_day;
				this.end_day = end_day;
				console.log(this.click_num);
			},
			//getData方法里发送ajax
			async getData() {
				var that = this;
				var start_day = that.start_day
				var end_day = that.end_day
				var code = that.code
				var time_tab = that.time_tab;
				var dtype = ""
				if (time_tab == 0) {
					dtype = "range"
				} else if (time_tab == 1) {
					dtype = "week"
				} else if (time_tab == 2) {
					dtype = "month"
				} else {
					dtype = "year"
				}
				let  url = "/topprogram/cinema-main"
				let userType = await this.detection_validity()
				let All_data = {
					cinema_code:code,
					dtype:dtype,
					with_fwf:1,
					start_date:start_day,
					end_date:end_day,
					userType
				}
				let {data:res} = await this.$http.get({
					url,
					data:All_data,
					contentType:'application/x-www-form-urlencoded',
				})
				// 数据一万为单位
				for (var i in res.cinema_js.total) {
					res.cinema_js.total[i] = (res.cinema_js.total[i] / 10000).toFixed(1)
				}
				
				let Area = {
					categories: [],
				
					series: [{
				
						color: "#F08E2D",
						name: '票房趋势',
						data: []
					}]
				};
				// 完整的 日期
				var categories_s = [];
				res.cinema_js.xA.forEach((item, i) => {
					categories_s.push(item + '周')
					if (this.click_num == 1) {
						item = item.slice(8)
						Area.categories.push(item)
					} else if (this.click_num == 2) {
						Area.categories.push(item)
					} else if (this.click_num == 3) {
						// console.log(res.cinema_js);
						Area.categories.push(item)
					} else if (this.click_num == 4) {
						Area.categories.push(item)
					}
				
				
				
				}) // x 轴
				res.cinema_js.total.forEach((item, i) => {
					Area.series[0]['data'].push(Number(item))
				
				}) // y轴
				_self.categories_s = categories_s;
				_self.showArea("canvasArea", Area);
			},
			// 中间部分tab
			center_header_click(index) {
				var code = this.code;
				var that = this;
				var zb_title = [{
						zb_name: "分账票房(万元)",
						id: 0,
						front_row: true
					},
					{
						zb_name: "人次",
						id: 1,
						front_row: true
					},
					{
						zb_name: "场次",
						id: 2,
						front_row: true
					},
					{
						zb_name: "场均人次",
						id: 3,
						front_row: true
					},
					{
						zb_name: "平均票价",
						id: 4,
						front_row: false
					},
					{
						zb_name: "本地排名",
						id: 5,
						front_row: false
					},
					{
						zb_name: "城市票房占比",
						front_row: false
					},
					{
						zb_name: "网售票房",
						front_row: false
					},
					{
						zb_name: "网售票房占比",
						front_row: false
					},
					{
						zb_name: "网售人次",
						front_row: false
					},
					{
						zb_name: "网售人次占比",
						front_row: false
					},
					{
						zb_name: "单座票房",
						front_row: false
					},
					{
						zb_name: "场均票房",
						front_row: false
					},
					{
						zb_name: "单银幕票房",
						front_row: false
					},

				]
				var zb_title_two = [{
						zb_name: "实时票房",
						id: 0,
						front_row: true
					},
					{
						zb_name: "人次",
						id: 1,
						front_row: true
					},
					{
						zb_name: "场次",
						id: 2,
						front_row: true
					},
					{
						zb_name: "场均人次",
						id: 3,
						front_row: true
					},
					{
						zb_name: "平均票价",
						id: 4,
						front_row: false
					},
					{
						zb_name: "上座率",
						id: 5,
						front_row: false
					},
					{
						zb_name: "票房占比",
						front_row: false
					},
					{
						zb_name: "排场占比",
						front_row: false
					},
					{
						zb_name: "排座占比",
						front_row: false
					},
					{
						zb_name: "网售票房",
						front_row: false
					},
					{
						zb_name: "网售票房占比",
						front_row: false
					},
					{
						zb_name: "网售人次",
						front_row: false
					},
					{
						zb_name: "网售人次占比",
						front_row: false
					},
					{
						zb_name: "累计票房",
						front_row: false
					},
				]
				var zb_title_three = [{
						zb_name: "场次",
						id: 0,
						front_row: true
					},
					{
						zb_name: "排场占比",
						id: 1,
						front_row: true
					},
					{
						zb_name: "排座数",
						id: 2,
						front_row: true
					},
					{
						zb_name: "排座占比",
						id: 3,
						front_row: true
					},
					{
						zb_name: "黄金场场次",
						id: 4,
						front_row: false
					},
					{
						zb_name: "黄金场占比",
						id: 5,
						front_row: false
					}
				]
				
				let url = '';
				let All_data = {}
				if (index == 0) {
					this.zb_title = zb_title;


					var start_day = '';
					var end_day = '';
					url = "/topprogram/cinema-main"
					All_data = {
						cinema_code:code,
						dtype:'range',
						with_fwf:1,
						start_date:start_day,
						end_date:end_day
					}
					this.cinema_data(url, this,All_data)
					this.start_day = '';
					this.end_day = '';
					this.click_num = 1;
					this.time_tab = 0;
					setTimeout(this.getData, 500);
				} else if (index == 1) {
					var date = moment().format('YYYY-MM-DD')
					var pf_date = that.pf_date
					//影片票房接口
					url = '/topprogram/cinema-movie'
					All_data = {
						cinema_code:code,
						 dtype:'range',
						 start_date:date,
						 end_date:''
					}
					that.pf_index(url, that , All_data)
					this.zb_title = zb_title_two;
					this.pf_date = date;
					this.pf_date_data = moment(date).format('YYYY年MM月DD日')
					this.pf_dates = "";
					// this.time_tab = "0";
					this.time_dd = 0;
					setTimeout(that.getData_two, 500);
				} else {
					//影片排片接口
					var date = moment().format('YYYY-MM-DD');
					url = '/topprogram/cinema-movie'
					All_data = {
						cinema_code:code,
						dtype:'range',
						start_date:date,
						end_date:''
					}
					this.pp_index(url, that,All_data)
					this.zb_title = zb_title_three;
					this.pp_date = date;
					this.date_three = [new Date(date)]
					this.pp_date_data = moment(date).format('YYYY年MM月DD日')
					setTimeout(this.getData_three, 500);
				}
				this.center_header_index = index;
			},
			//getData_two方法里发送ajax
			async getData_three() {
				var that = this;
				var code = this.code
				var date = this.pp_date
				let url = '/topprogram/cinema-movie'
				let userType = await this.detection_validity()
				let All_data = {
					cinema_code:code,
					dtype:'range',
					start_date:date,
					end_date:date,
					userType
				}
				let {data:res} = await this.$http.get({
					url,
					data:All_data,
					contentType:'application/x-www-form-urlencoded',
				})
				var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00',
					'#f87a01',
					'#d22f0e', '#CDAD00'
				];
				let Ring = {
					series: [{
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}]
				};
				res.movie_data_js.xA.forEach((item, i) => {
					if (item.length > 5) {
						item = item.slice(0, 5) + '...'
					}
					Ring.series[i]['name'] = item;
					Ring.series[i]['data'] = res.movie_data_js.total[i] - 0;
					Ring.series[i]['color'] = color[i];
				})
				var num = 0
				for (let aa in Ring.series) {
					num += Ring.series[aa].data - 0;
				}
				var a = Ring.series[0].data / num * 100
				// _self.showRing("canvasRing", Ring, Ring.series[0].name, a.toFixed(1) + '%', Ring.series[0].color);
				_self.showRing_tow("canvasRing_tow", Ring, Ring.series[0].name, a.toFixed(1), Ring.series[0].color)
				this.tathreecan_num = num
			},
			//影片排片接口
			pp_index: async function(url, that,All_data) {
				let userType = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res} = await this.$http.get({url,data:All_data})
				
				if (Number(res.sum_data.total_bo_s) / 100000000 > 1) {
					res.sum_data.total_bo_s = Number(res.sum_data.total_bo_s) / 100000000 + '亿'
				} else {
					res.sum_data.total_bo_s = Number(res.sum_data.total_bo_s) / 10000 + '万'
				}
					var pp_date = this.pp_date;
				var tt = moment(pp_date).format('YYYY-MM-DD')
				var time_get = new Date(tt).getTime();
				for (var i in res.movie_data) {
					//累计票房
					if (res.movie_data[i].bos / 100000000 > 1) {
						res.movie_data[i].bos = (res.movie_data[i].bos / 100000000 - 0).toFixed(2) + "亿"
					} else if (res.movie_data[i].bos / 10000 > 1) {
						res.movie_data[i].bos = (res.movie_data[i].bos / 10000).toFixed(2) + "万"
					} else {
						res.movie_data[i].bos = (res.movie_data[i].bos - 0).toFixed(0)
					}
					// 黄金场次占比
					res.movie_data[i].gd_session_rate = (Number(res.movie_data[i].gd_session) / Number( res.sum_data.gd_session_s) *100).toFixed(2)
					// 上座率
					res.movie_data[i].occupancy = (res.movie_data[i].occupancy * 100).toFixed(2)
					// 排场占比
					res.movie_data[i].pc_zb = (res.movie_data[i].session_s / res.sum_data.session_s * 100).toFixed(2)
					// 排座占比
					res.movie_data[i].pz_zb = (Number(res.movie_data[i].total_seats_s) / Number(res.sum_data.total_seats_s) * 100).toFixed(2)
				
					// 排座	// total_seats_s
					
					// 上映时间
					var time_all = new Date(res.movie_data[i].publish_date).getTime()
					var time = (time_get - time_all) / 1000 / 60 / 60 / 24
					if (time == 0) {
						res.movie_data[i].publish_date = `首映`
					} else {
						res.movie_data[i].publish_date = `上映${time}天`
					}
				}
				// console.log( res.movie_data);
				this.pp_sum_list = res.sum_data;
				this.pp_list = res.movie_data;

			},
			// 影片票房接口
			async pf_index(url, that,All_data) {
				let userType = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res} = await this.$http.get({url,data:All_data})
				uni.showLoading({
					title: '数据加载中'
				})

				var pf_date = this.pf_date;
				var tt = moment(pf_date).format('YYYY-MM-DD')
				var time_get = new Date(tt).getTime();
				for (var i in res.movie_data) {
					//累计票房
					if (res.movie_data[i].bos / 100000000 > 1) {
						res.movie_data[i].bos = (res.movie_data[i].bos / 100000000 - 0).toFixed(2) + "亿"
					} else if (res.movie_data[i].bos / 10000 > 1) {
						res.movie_data[i].bos = (res.movie_data[i].bos / 10000).toFixed(2) + "万"
					} else {
						res.movie_data[i].bos = (res.movie_data[i].bos - 0).toFixed(0)
					}

					// 场均人次
					res.movie_data[i].people_per_session = (res.movie_data[i].people_per_session - 0).toFixed(0)
					// 平均票价
					// console.log(res.movie_data[i].avg_price);
					res.movie_data[i].avg_price = (res.movie_data[i].avg_price  * 1).toFixed(1)
					
					// 网售票房
					res.movie_data[i].ol_total_bo_s = (res.movie_data[i].ol_total_bo_s / 10000 - 0).toFixed(2)
					// 网售票房占比
					res.movie_data[i].ol_total_rate = (res.movie_data[i].ol_total_rate * 100).toFixed(2)
					// 网售人次
					res.movie_data[i].ol_people_s = (res.movie_data[i].ol_people_s / 10000 - 0).toFixed(2)
					// 网售人次占比
					res.movie_data[i].ol_people_rate = (res.movie_data[i].ol_people_rate * 100).toFixed(2)
					// 上座率
					res.movie_data[i].occupancy = (res.movie_data[i].occupancy * 100).toFixed(2)
					// 排场占比
					res.movie_data[i].pc_zb = (res.movie_data[i].session_s / res.sum_data.session_s * 100).toFixed(2)
					// 排座占比
					res.movie_data[i].pz_zb = (res.movie_data[i].total_seats_s / res.sum_data.total_seats_s * 100).toFixed(2)

					// 票房占比
					res.movie_data[i].pf_zb = (Number(res.movie_data[i].total_bo_s) / Number( res.sum_data.total_bo_s) * 100).toFixed(2)
					
					//实时票房

					if (res.movie_data[i].total_bo_s / 100000000 > 1) {
						res.movie_data[i].total_bo_s = (res.movie_data[i].total_bo_s / 100000000).toFixed(2) + "亿"
					} else if (res.movie_data[i].total_bo_s / 10000 > 1) {
						res.movie_data[i].total_bo_s = (res.movie_data[i].total_bo_s / 10000).toFixed(2) + "万"

					} else {
						res.movie_data[i].total_bo_s = (res.movie_data[i].total_bo_s - 0).toFixed(0)
					}

					//人次
					if (res.movie_data[i].total_people_s / 100000000 > 1) {
						res.movie_data[i].total_people_s = (res.movie_data[i].total_people_s / 100000000).toFixed(2) + "亿"
					} else if (res.movie_data[i].total_people_s / 10000 > 1) {
						res.movie_data[i].total_people_s = (res.movie_data[i].total_people_s / 10000).toFixed(2) + "万"

					} else {
						res.movie_data[i].total_people_s = (res.movie_data[i].total_people_s - 0).toFixed(0)
					}
					// 上映时间
					var time_all = new Date(res.movie_data[i].publish_date).getTime()
					var time = (time_get - time_all) / 1000 / 60 / 60 / 24
					if (time == 0) {
						res.movie_data[i].publish_date = `首映`
					} else {
						res.movie_data[i].publish_date = `上映${time}天`
					}
				}
				// console.log(res);
				this.pf_list_sum = res.sum_data
				this.pf_list = res.movie_data
				uni.hideLoading()
			},
			//getData_two方法里发送ajax
			async getData_two() {
				var that = this;
				var code = that.code
				var pf_date = that.pf_date
				var pf_dates = that.pf_dates
				var time_tab = that.time_dd
				let url = '';
				let All_data = {}
				if (time_tab == 0) {
					url = "/topprogram/cinema-movie"
					All_data = {
						cinema_code:code,
						dtype:'range',
						start_date:pf_date,
						end_date:pf_dates
					}
				} else if (time_tab == 1) {
					url = "/topprogram/cinema-movie"
					All_data = {
						cinema_code:code,
						dtype:week,
						week:pf_date
					}
				} else if (time_tab == 2) {
					url = "/topprogram/cinema-movie"
					All_data = {
						cinema_code:code,
						dtype:'month',
						month:pf_date
					}
				} else {
					url = "/topprogram/cinema-movie"
					All_data = {
						cinema_code:code,
						 dtype:year,
						 year:pf_date
					}
				}
				let {data:res} = await this.$http.get({
					url,
					data:All_data,
					contentType: 'application/x-www-form-urlencoded',
				})
				var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00',
					'#f87a01',
					'#d22f0e', '#CDAD00'
				];
				let Ring = {
					series: [{
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}, {
						name: '',
						color: '',
						data: ''
					}]
				};
				res.movie_data_js.xA.forEach((item, i) => {
					if (item.length > 5) {
						item = item.slice(0, 5) + '...'
					}
					Ring.series[i]['name'] = item;
					Ring.series[i]['data'] = res.movie_data_js.total[i] - 0;
					Ring.series[i]['color'] = color[i];
				})
				var num = 0
				for (let aa in Ring.series) {
					num += Ring.series[aa].data - 0;
				}
				var a = Ring.series[0].data / num * 100
				_self.showRing("canvasRing", Ring, Ring.series[0].name, a.toFixed(1) + '%', Ring.series[0].color);
				this.tatowcan_num = num
			},
			// 票房显示 的字
			more_index_data_tap(index) {
				// // 复制过来一份进行操作
				let zb_title = [...this.zb_title];
				// 如果点击当前的 按钮是 true  则 变为false
				if (zb_title[index].front_row) {
					zb_title[index].front_row = false;
					this.zb_title = zb_title;
					return false;
				} else {
					let boer = 0;
					for (let i = 0; i < zb_title.length - 1; i++) {
						if (zb_title[i].front_row) {
							if (boer === 0) {
								boer = 1;
							} else if (boer === 1) {
								console.log('boer == 1');
								boer = 2;
							} else if (boer === 2) {
								console.log('boer == 2');
								boer = 3;
							} else if (boer === 3) {
								console.log('boer == 3');
								boer = 4;
							}
						}
						if (boer == 4) {
							console.log('boer == 4');
							uni.showToast({
								title: '最多选择四项',
								duration: 2000,
								icon: 'none'
							});
							return false;
						}
					}
					if (boer < 4) {
						zb_title[index].front_row = true;
					}
					this.zb_title = zb_title;
				}
				// 定义变量 来计算 是否超过 规定数量

				this.zb_title = zb_title;
			}
		}
	}
</script>

<style lang="less">
	@import url('./cinema.less');
	@import url('./index.less');

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts_ring_data {
		margin-top: 10upx;
	}

	.charts_ring {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}

	.charts_ring_tow {
		width: 750upx;
		height: 500upx;
		background-color: #FFFFFF;
	}
</style>
