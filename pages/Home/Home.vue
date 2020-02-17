<template>
	<view>
		
		<!--  自定义顶部导航 -->
		
		<view class="nav_header" id="the_id" :style="{ paddingTop: d + 'px' }">
			

			<view class="header_data" :style="{ heigth: header_hei - d + 'px'}">
				<view class="nav_input" @tap="search_navi">搜索影人/影片/公司
				
				
				</view>
				<view class="amplification"><image src="../../static/home/amplification.png" mode="" /></view>
				<view class="icon"><image src="../../static/home/ic.png" mode=""></image></view>
			</view>
		</view>
		<!--  t头部导航 -->
		<view class="header" :style="{ marginTop: topHeigth + 'px' }">
			<view class="haeder_data">
				<view v-for="item in titltData" :key="item.id" @tap="titleUrl(item.src,item.id)">
					<image :src="item.img" mode=""></image>
					<view class="headerSon">{{ item.name }}</view>
				</view>
			</view>
		</view>
		<!-- //今日票房	 -->
		
		<!-- <button open-type="getUserInfo" @getuserinfo="getUserInfo_data">登录</button> -->
		
		<view class="center">
			<!-- // 头部 -->
			<view class="center_data">
				<view class="centerH">
					<view @tap="fan">
						{{ city_name }}
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view class="centerH_jr" @tap="click_tab_show">
						{{ time_txt }} {{ ttiem }}
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
						
					</view>
					<view @tap="checkboxChange" class="centerService" :style="{ color: service == false ? 'black' : '' }">
						<!-- <label class="checkbox" @change="abc">
							<checkbox value="选中"  :checked='service' />
							<radio color="rgba(240, 142, 45, 1)" class="form_radio" value="" @tap="checkboxChange" :checked="service" />
						</label> -->
						<image :hidden="!(service == true)" class="form_radio" src="../../static/home/checked.png" mode=""></image>
						<image :hidden="!(service == false)" class="form_radio" src="../../static/home/checked1.png" mode=""></image>
						含服务费
					</view>
				</view>
				<!-- // 中间部分 -->
				<view class="centerM">
					<view class="centerM-symbol" @tap="dell_data()"><image src="../../static/home/syy.png" mode=""></image></view>
					<view class="centerM_money">
						<view class="money">{{ office_num }}</view>
						<view class="centerM_son">
							<view class="centerM_turnover">{{tetx_time}}</view>
							&nbsp;
							<view class="centerM_tiem">
								当前时间: {{ time | disposeTiem }}
								<!-- <image src="../../static/home/question-circle.png" mode=""/> -->
								<!-- <image src="../../static/home/question-circle.png" mode=""></image> -->
							</view>
						</view>
					</view>
					<view class="centerM-symbol" @tap="addd_data()"><image src="../../static/home/nextcopy2.png" mode=""></image></view>
				</view>
				<!--  底部 -->
				<view class="centerFoot">
					<view class="centerFoot_son">
						<view>{{ Rasum.total_people_s }}</view>
						<view>人次</view>
					</view>
					<view class="gang_data"></view>
					<view class="centerFoot_son">
						<view>{{ Rasum.occupancy }}</view>
						<view>上座率</view>
					</view>
					<view class="gang_data"></view>
					<view class="centerFoot_son">
						<view>{{ Rasum.session_s }}</view>
						<view>场次</view>
					</view>
					<view class="gang_data"></view>
					<view class="centerFoot_son">
						<view>{{ Rasum.avg_price }}</view>
						<view>平均票价</view>
					</view>
				</view>
			</view>
			
		</view>
		<view class="button">
			<view class="button_header">
				<view class="buttonH">
					<view class="buttonHone">票房排名</view>
					<view class="buttonHtow" @tap="show_index">
						<!-- <text></text> -->
						<image src="../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					<view>影片名称</view>
					<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
			</view>
			
			
			<view class="buttonB" @tap="nagitto(it.movie_id_r, it.zz_id)" v-for="it in itemlist" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name">{{ it.movie_name }}</view>

					<view class="buttonB_Headersn1">{{ it.sy_data }}{{ it.totalBo }}</view>
				</view>
				<view class="buttonB_Headerson_pf">
					<!--综合票房-->
					<view :hidden="!zb_title[0].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_bo_s }}</view>
					<!--综合票房占比  -->
					<view :hidden="!zb_title[1].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_zb }}%</view>
					<!--排场占比  -->
					<view :hidden="!zb_title[2].front_row">{{ it.session_zb }}</view>
					<!--上座率  -->
					<view :hidden="!zb_title[3].front_row">{{ it.occupancy }}</view>
					<!--排座占比  -->
					<view :hidden="!zb_title[4].front_row">{{ it.total_seats_zb }}</view>
					<!--平均票价  -->
					<view :hidden="!zb_title[5].front_row">{{ it.avg_price }}</view>
					<!--场均人次  -->
					<view :hidden="!zb_title[6].front_row">{{ it.cj_people_s }}</view>
					<!--场次  -->
					<view :hidden="!zb_title[7].front_row">{{ it.session_s }}</view>
					<!--人次  -->
					<view :hidden="!zb_title[8].front_row">{{ it.total_people_s }}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header"><view class="" @tap="more_index_header_click">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 	<view >
		
		</view> -->

		<!-- 地区 -->
		<view class="city_sel" :style="{ top: topHeigth + 'px' }" :hidden="is_show">
			<view class="page__bd">
				<view class="page__bd_cc" @tap="page__bd_cc_click">×</view>
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

		<view class="Data_select" :hidden="Data_select_header" :style="{ Top: topHeigth + 'px' }">
			<!--  tab 头 -->
			<view class="Data_select_header">
				<view @tap="click_tab(index)" v-for="(item, index) in tab_title" :class="[index == time_tab ? 'active' : '']" :key="index">{{ item }}</view>
			</view>
			<!-- :visible.sync="show" -->
			<!--  日 -->
			<ei-calendar
				@click="ei_calendar_tap"
				:visible="time_tab_Br"
				ref="calendar"
				:drawer="false"
				:disabledDate="disabledDate"
				v-model="date"
				:custom-date="customDate"
				format="YYYY-MM-DD"
			></ei-calendar>
			<!-- 周 -->
			<!-- data-name="{{item}}" -->
			<!-- data-index="{{bindex}}" -->
			<view v-if="time_tab == 1">
				<view class="week">
					<view class="year_sel">
						<!--  -->
						<view v-for="(item, index) in year" @tap="click_year(item, index)" :class="[index == curren ? 'active' : '']" :key="index">{{ item }}</view>
					</view>
					<!-- data-year="{{is_year}}"
								data-week="{{index+1}}"
								data-index="{{is_year}}-W{{index+1}}" -->
					<view class="week_sel">
						<scroll-view scroll-y :style="{ height: wHeight }">
							<view v-for="(item, index) in week" @tap="check_week(index)" :key="index">{{ item }}</view>
						</scroll-view>
					</view>
				</view>
			</view>
			<!-- 选择月 -->
			<view v-if="time_tab == 2">
				<view class="month">
					<view class="year_sel">
						<view v-for="(item, index) in year" @tap="tap_year(item, index)" :class="[index == curren ? 'active' : '']" :key="index">{{ item }}</view>
						<!-- data-name="{{item}}" data-index="{{bindex}}" -->
					</view>
					<view class="month_sel">
						<view v-for="(item, index) in month" @tap="check_month(item)" :key="index">{{ item }}</view>
						<!-- data-year="{{is_year}}" data-month="{{index+1}}" data-index="{{is_year}}-{{index+1}}" -->
					</view>
				</view>
			</view>
			<!--  选择月 -->
			<!-- 选择年 -->
			<view v-if="time_tab == 3">
				<view class="year">
					<view class="only_year" @tap="check_year(item)" v-for="(item, index) in year" :key="index">{{ item }}</view>
					<!-- data-year="{{item}}" -->
				</view>
			</view>
			<!-- 选择年 -->
		</view>

	</view>
</template>

<script>
// 时间格式化
import moment from '@/components/moment';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
import {mapState} from 'vuex'
export default {
	onShareAppMessage(){},
	components: { EiCalendar },
	filters: {
		disposeTiem: function(tiem) {
			// console.log(tiem);
			let t = new Date(tiem);
			// console.log(t);
			let s = t.getHours();
			let f = t.getMinutes();
			// let m = t.getSeconds();
			// console.log(f > 10);
			if (f < 10) {
				f = '0' + f;
				// console.log(f);
			}
			// console.log(s)
			// console.log(f)
			return s + ':' + f;
		}
	},

	data() {
		return {
			tetx_time:'每小时更新一次', // 显示什么时候更新
			header_hei:'', /* 头部的 高度*/
			winhei:'',
			dd_data: '', // 日历当前点击的年月日 是 20191201 格式
			time_tab_Br: false, ///// 控制日历
			// disabledDate: [], //  日历插件控制显示那一一个
			// 头部数据
			titltData: [
				{ id: 0, img: '../../static/home/schedule.png', name: '排片上座', src: '../../pagesA/big-plate/big-plate' },
				{ id: 2, img: '../../static/home/cinema.png', name: '影院院线', src: '../../pagesA/cinema-chain/cinema-chain' },
				{ id: 3, img: '../../static/home/marketing.png', name: '营销宣传', src: '../../pagesA/publicity/publicity' },
				{ id: 4, img: '../../static/home/rl.png', name: '上映日历', src: '../../pagesA/calendar/calendar' },
				{ id: 5, img: '../../static/home/data.png', name: '大盘数据', src: '../../pagesB/market-data/market-data' },
				{ id: 6, img: '../../static/home/industry.png', name: '行业榜单', src: '../../pagesB/list/list' },
				{ id: 7, img: '../../static/home/datum.png', name: '资料库', src: '../../pagesB/data-bank/data-bank' },
				{ id: 8, img: '../../static/home/standard.png'/*'../../static/home/standard.png'*/, name: '票房预测', src: '../../pagesB/forecast/forecast' }	
			],
			//  中间部分 底部数据
			centerB: [
				{ id: 0, Numdata: '46.69万', charData: '人次' },
				{ id: 1, Numdata: '12%', charData: '上座率' },
				{ id: 2, Numdata: '31.98万', charData: '场次' },
				{ id: 3, Numdata: '35.1元', charData: '平均票价' }
			],
			listData: [
				{ id: 0, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' },
				{ id: 1, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' },
				{ id: 2, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' },
				{ id: 3, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' },
				{ id: 4, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' },
				{ id: 5, name: '大侦探皮卡丘', showMoney: '上映19天 5.78亿', money: '161.41', officeOf: '11.45%', session: '16.78%', honour: '0.89%' }
			],
			d: 'a',
			//  当前年
			show_date: '',
			//  中间部分的 场次人次
			Rasum: [],
			// 存储目前访问的机型的宽高
			windowHeight: 0,
			windowWidth: 0,
			//  存储 目前访问的设备是否是刘海屏幕手机
			// true 为刘海屏幕  fasle 为不是
			windowIsBang: false,
			// 储存顶部搜索框的高度 小程序高度保存
			topHeigth: '',
			topHeigthH5: '',
			a: '',
			// 是否含服务费
			service: true,
			//  当前时间
			time: new Date(),
			format_week: '',
			// 实时更新时间定时器
			timer: '',
			this_zm: '',
			// 更多指标 控制选择
			is_index: true,
			//  地区选择控制
			is_show: true,
			offsetTop: '',
			// 点击前一日
			zb_title: [
				{
					zb_name: '票房',
					two_title: '(万元)',
					is_check: '',
					no_check: '分账',
					front_row: true
				},
				{
					zb_name: '票房',
					two_title: '占比',
					is_check: '',
					no_check: '分账',
					front_row: true
				},
				{
					zb_name: '排场占比',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: false
				},
				{
					zb_name: '上座率',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: true
				},
				{
					zb_name: '排座占比',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: true
				},
				{
					zb_name: '票价',
					two_title: '',
					is_check: '平均',
					no_check: '平均',
					front_row: false
				},
				{
					zb_name: '场均人次',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: false
				},
				{
					zb_name: '场次',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: false
				},
				{
					zb_name: '人次',
					two_title: '',
					is_check: '',
					no_check: '',
					front_row: false
				}
			],
			// 区域选择
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
			// 热门城市
			rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
			// 年份
			year: ['2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'],
			// 字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			// 月份
			month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],

			inputVal: '',
			winHeight: '',
			alpha: '',
			// 处理过的数据 包含了字母和城市
			zm_list: [
				{ letter: 'A', childer: ['安阳', '鞍山', '安庆', '安顺', '阿拉善', '安康', '阿坝', '阿里', '阿克苏', '阿勒泰', '阿拉尔'] },
				{
					letter: 'B',
					childer: [
						'北京',
						'蚌埠',
						'保定',
						'包头',
						'宝鸡',
						'北海',
						'百色',
						'白山',
						'本溪',
						'亳州',
						'白银',
						'毕节',
						'保亭',
						'白城',
						'巴彦淖尔',
						'滨州',
						'巴中',
						'巴州',
						'博州',
						'保山',
						'白沙'
					]
				},
				{
					letter: 'C',
					childer: [
						'长沙',
						'长春',
						'常州',
						'成都',
						'重庆',
						'常德',
						'郴州',
						'赤峰',
						'滁州',
						'池州',
						'潮州',
						'承德',
						'沧州',
						'朝阳',
						'崇左',
						'澄迈',
						'长治',
						'昌都',
						'昌吉',
						'楚雄',
						'昌江'
					]
				}
			],
			// 当前地址
			city_name: '全国',
			is_check: true,
			format_data: '',
			office_num: '', // 今日实时价格
			itemlist: '', // 总数据
			//  区域选择
			// 一上来显示的时间
			ttiem: '',
			// 更多指标的高度
			ypHeight: '',
			// tab 数据
			// 所有数据
			item: [],
			// 月
			// 年份
			// 月份
			curren: 1,
			// 月
			//  控制显示那一个 栏目
			// 控制显示日周年 哪一个
			time_tab: 0,
			max_day: '', // 今年的最大日期
			min_day: '', // 今年的起始 日期
			this_data: '', // 选择的某年月日
			del_data: '', // 前一天日期
			add_data: '', // 后一天日期
			time_txt: '日票房', // 什么票房
			what_day: ' ', // 周几预售
			format_month: '', // 日期2019-1
			// 周
			// 年
			is_year: 2019, // 保存名字
			all_site_num: '', //总场次
			all_people_num: '', //总人次
			// 选择日期之后筛选出来的 所有电影

			// 年
			wHeight: '',
			week: '',
			now_year: '',
			format_year: '', // 年
			// 周
			Data_select_header: true,
			tab_title: ['日票房', '周票房', '月票房', '年票房'],
			// 日历数据
			date: [],
			customDate: [
				{
					cellClass: 'custom-cell',
					date: '',
					// date: '2019-6-13',
					top: [
						{
							class: 'custom-cell-top-1'
							// text: '上新'
						},
						{
							class: 'custom-cell-top-2',
							text: ''
						}
					]
				},
				{
					cellClass: 'custom-cell',
					date: '2019-6-7',
					top: [
						{
							class: 'custom-cell-top-1'
							// text: '上新'
						},
						{
							class: 'custom-cell-top-2',
							text: ''
						}
					]
				}
			],
			checkboxItems: [
				{
					name: '',
					value: '1',
					checked: true
				}
			]
			// {letter:'D',childer:["东莞","大连","大庆","德阳","丹东","东营","大同","达州","大理","定西","儋州","定安","东方","大兴安岭""德宏","迪庆"]},
			// {letter: "E",childer:["鄂尔多斯","恩施","鄂州"]},
			// {letter: "F",childer:["福州","佛山","抚顺","阜阳","抚州","防城港","阜新"]}
			// {}
		};
		// tab数据
	},
	onReady() {
		
		// 初始化时间
		var format_data = this.format_data;
		var gs_data = moment()
			.subtract(0, 'days')
			.format('YYYY-MM-DD');
		this.format_data = gs_data;
		// console.log(gs_data);
		// 初始化 地区表
		this.dataMap();

		// 实时更新时间
		var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
		this.timer = setInterval(function() {
			_this.time = new Date(); //修改数据date
			// console.log('更新时间了');
		}, 1000);
	},
	computed:{
		...mapState(['userinfo'])
	},
	//实例销毁之前调用。主要解绑一些使用addEventListener监听的事件等
	beforeDestroy: function() {
		if (this.timer) {
			clearInterval(this.timer); //在Vue实例销毁前，清除我们的定时器
		}
	},
	created() {
		var a = new Date();
		a = moment(a).format('YYYY-MM-DD');
		var date = [];
		date[0] = new Date(a);
		this.date = date;

		var format_data = this.format_data;
		var gs_data = moment()
			.subtract(0, 'days')
			.format('YYYY-MM-DD');
		this.format_data = gs_data;
	},
	watch:{
		user_pone_Br(){
			
			
		}
	},
	async onLoad() {
		let	Br_validity = await  this.detection_validity()
		
		// if(!this.user_pone_Br) return false;
		//  根据不同的手机 获取不同的顶部高度
		uni.getSystemInfo().then(item => {
			// console.log(item);
			var d = item[1].statusBarHeight;
			this.d  = d;
			this.header_hei = uni.upx2px(90)
			this.topHeigth = uni.upx2px(90) + d
			// 存储目前访问 设备的宽高
			
			
			this.windowWidth = item[1].windowWidth;
			//  验证目前访问的设备是否是刘海屏手机/
			this.windowIsBang = this.windowWidth / this.windowHeight < 0.6;
			// console.log(this.windowIsBang);//  当前时间
			//  初始化时间
			function tt() {
				let tiem = new Date();
				let m = tiem.getFullYear();
				let y = tiem.getMonth() + 1;
				let r = tiem.getDate();
				// console.log(m,y,r);
				return `${m}年${y}月${r}日`;
			}
			let ttiem = tt();
			//  赋值
			this.ttiem = ttiem;
			//  初始化时间
		});

		// tab 切换
		this.z_data();

		//获取日期可选的最小日期 和最大日期
		uni.request({
			url: 'https://db.topcdb.com/topprogram/get-date'
		}).then(d => {
			let [errer, da] = d;
			let res = da.data;
			var max_day = res.bo_date.endDate;
			var min_day = res.bo_date.startDate;
			this.max_day = max_day;
			this.min_day = min_day;
		});
		// tab切换
		//  ch初始 数据
		this.script();
		let that = this;

		var url = '/topprogram/get-top123';
		
		let mr_on_data = {
			with_fwf:1,
			userType:Br_validity
		}
		that.mr_on(url, that,mr_on_data);
		//  页面初始化
		this.click_grid('全国');
		
	},
	methods: {
		/* 跳转搜索页面 */
		search_navi(){
			uni.navigateTo({
				url: './search',
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
			
		},
		
		
		login(){
			return new Promise((rejk,res) =>{
				uni.login({
					success:function(e){
						rejk(e)
					}
				})
			})
		},
		
		
		// 点击电影跳转链接
		nagitto(mid, id) {
			uni.navigateTo({
				url: '../../pagesA/dy_particulars/dy_particulars?mid=' + mid + '&id=' + id
			});
		},

		disabledDate(date) {
			const start = new Date('2019/5/10').getTime();
			const end = new Date('2019/7/21').getTime();
			return date.getTime() <= start || date.getTime() >= end;
		},
		// 点击差 关闭地区

		page__bd_cc_click() {
			this.is_show = true;
		},
		mr_on: async function  (url, that,mr_on_data) {
			
			let {data:res} = await this.$http.get({
				url,
				data:mr_on_data
			})
			var gc_zb = (((res.importMode_data.国产片 - 0) / res.yar_data.total_bo_s) * 100).toFixed(2) + '%';
			var hp_zb = (((res.importMode_data.合拍片 - 0) / res.yar_data.total_bo_s) * 100).toFixed(2) + '%';
			var fz_zb = (((res.importMode_data.分账片 - 0) / res.yar_data.total_bo_s) * 100).toFixed(2) + '%';
			var md_zb = (((res.importMode_data.买断片 - 0) / res.yar_data.total_bo_s) * 100).toFixed(2) + '%';
			
			var all_num = '';
			if (res.yar_data.total_bo_s / 100000000 > 1) {
				all_num = (res.yar_data.total_bo_s / 100000000).toFixed(2) + '亿';
			} else if (res.yar_data.total_bo_s / 10000 > 1) {
				all_num = (res.yar_data.total_bo_s / 10000).toFixed(2) + '万';
			} else {
				all_num = res.yar_data.total_bo_s;
			}
			
			var cc = '';
			if (res.yar_data.session_s / 100000000 > 1) {
				cc = (res.yar_data.session_s / 100000000).toFixed(2) + '亿';
			} else if (res.yar_data.session_s / 10000 > 1) {
				cc = (res.yar_data.session_s / 10000).toFixed(2) + '万';
			} else {
				cc = res.yar_data.session_s;
			}
			
			var rc = '';
			if (res.yar_data.total_people_s / 100000000 > 1) {
				rc = (res.yar_data.total_people_s / 100000000).toFixed(2) + '亿';
			} else if (res.yar_data.total_people_s / 10000 > 1) {
				rc = (res.yar_data.total_people_s / 10000).toFixed(2) + '万';
			} else {
				rc = res.yar_data.total_people_s;
			}
			
			var gc_num = '';
			if ((res.importMode_data.国产片 - 0) / 100000000 > 1) {
				gc_num = ((res.importMode_data.国产片 - 0) / 100000000).toFixed(2) + '亿';
			} else if ((res.importMode_data.国产片 - 0) / 10000 > 1) {
				gc_num = ((res.importMode_data.国产片 - 0) / 10000).toFixed(2) + '万';
			} else {
				gc_num = res.importMode_data.国产片 - 0;
			}
			
			var hp_num = '';
			if ((res.importMode_data.合拍片 - 0) / 100000000 > 1) {
				hp_num = ((res.importMode_data.合拍片 - 0) / 100000000).toFixed(2) + '亿';
			} else if ((res.importMode_data.合拍片 - 0) / 10000 > 1) {
				hp_num = ((res.importMode_data.合拍片 - 0) / 10000).toFixed(2) + '万';
			} else {
				hp_num = res.importMode_data.合拍片 - 0;
			}
			
			var fz_num = '';
			if ((res.importMode_data.分账片 - 0) / 100000000 > 1) {
				fz_num = ((res.importMode_data.分账片 - 0) / 100000000).toFixed(2) + '亿';
			} else if ((res.importMode_data.分账片 - 0) / 10000 > 1) {
				fz_num = ((res.importMode_data.分账片 - 0) / 10000).toFixed(2) + '万';
			} else {
				fz_num = res.importMode_data.分账片 - 0;
			}
			var md_num = '';
			if ((res.importMode_data.买断片 - 0) / 100000000 > 1) {
				md_num = ((res.importMode_data.买断片 - 0) / 100000000).toFixed(2) + '亿';
			} else if ((res.importMode_data.买断片 - 0) / 10000 > 1) {
				md_num = ((res.importMode_data.买断片 - 0) / 10000).toFixed(2) + '万';
			} else {
				md_num = res.importMode_data.买断片 - 0;
			}
			
			res.importMode_data.all_num = all_num;
			res.importMode_data.gc_zb = gc_zb;
			res.importMode_data.hp_zb = hp_zb;
			res.importMode_data.fz_zb = fz_zb;
			res.importMode_data.md_zb = md_zb;
			res.importMode_data.gc_num = gc_num;
			res.importMode_data.hp_num = hp_num;
			res.importMode_data.fz_num = fz_num;
			res.importMode_data.md_num = md_num;
			res.importMode_data.cc = cc;
			res.importMode_data.rc = rc;
			
			var yy_all = (res.cinema_data.cinema_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //总影院数
			var sx_num = (res.cinema_data.shixia_count - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //市辖区影院数
			var xx_num = (res.cinema_data.xian_count - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //县辖区影院数
			
			var db_num = res.cinema_data.东部 - 0;
			var zb_num = res.cinema_data.中部 - 0;
			var xb_num = res.cinema_data.西部 - 0;
			
			var db_num_zb = (((res.cinema_data.东部 - 0) / (res.cinema_data.cinema_sum - 0)) * 100).toFixed(2);
			var zb_num_zb = (((res.cinema_data.中部 - 0) / (res.cinema_data.cinema_sum - 0)) * 100).toFixed(2);
			var xb_num_zb = (((res.cinema_data.西部 - 0) / (res.cinema_data.cinema_sum - 0)) * 100).toFixed(2);
			
			res.cinema_data.yy_all = yy_all;
			res.cinema_data.sx_num = sx_num;
			res.cinema_data.xx_num = xx_num;
			res.cinema_data.db_num = db_num;
			res.cinema_data.zb_num = zb_num;
			res.cinema_data.xb_num = xb_num;
			res.cinema_data.db_num_zb = db_num_zb;
			res.cinema_data.zb_num_zb = zb_num_zb;
			res.cinema_data.xb_num_zb = xb_num_zb;
			
			var yt_all = (res.cinema_data.halls_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //总影厅数
			var pt_num = (res.cinema_data.normal_halls_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //普通影厅数
			var ts_num = (res.cinema_data.halls_sum - 0 - (res.cinema_data.normal_halls_sum - 0)).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //特殊影厅数
			
			var d_num = res.cinema_data.h4d_halls_sum.toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //4d影厅数
			var big_num = (res.cinema_data.big_halls_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //巨幕影厅数
			var yx_num = (res.cinema_data.yinxiao_halls_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //音效影厅数
			var ys_num = (res.cinema_data.ys_halls_sum - 0).toString().replace(/(\d)(?=(?:\d{3})+$)/g, '$1,'); //艺术影厅数
			
			var big_num_zb = (((res.cinema_data.big_halls_sum - 0) / (res.cinema_data.halls_sum - 0)) * 100).toFixed(2) + '%';
			var d_num_zb = (((res.cinema_data.h4d_halls_sum - 0) / (res.cinema_data.halls_sum - 0)) * 100).toFixed(2) + '%';
			var yx_num_zb = (((res.cinema_data.yinxiao_halls_sum - 0) / (res.cinema_data.halls_sum - 0)) * 100).toFixed(2) + '%';
			var ys_num_zb = (((res.cinema_data.ys_halls_sum - 0) / (res.cinema_data.halls_sum - 0)) * 100).toFixed(2) + '%';
			res.cinema_data.yt_all = yt_all;
			res.cinema_data.pt_num = pt_num;
			res.cinema_data.ts_num = ts_num;
			res.cinema_data.d_num = d_num;
			res.cinema_data.big_num = big_num;
			res.cinema_data.yx_num = yx_num;
			res.cinema_data.ys_num = ys_num;
			res.cinema_data.big_num_zb = big_num_zb;
			res.cinema_data.d_num_zb = d_num_zb;
			res.cinema_data.yx_num_zb = yx_num_zb;
			res.cinema_data.ys_num_zb = ys_num_zb;
			this.importMode_data = res.importMode_data;
			this.cinema_data = res.cinema_data;
		},
		//  点击是否含服务费
		checkboxChange: async function(e) {
			var that = this;
			var time_txt = that.time_txt;
			var city_name = that.city_name;
			var district = that.city_name;
			var dd_data = that.add_data;
			var is_year = that.is_year;
			if (time_txt == '周票房') {
				var time_data = dd_data.split('-W')
				dd_data = time_data[0] + time_data[1] + '01' 
			}else if (time_txt == '月票房') {
				var data_time = dd_data.split('-')
				if (Number(data_time[1]) < 10) {
					data_time[1] = '0' + data_time[1];
				}
				dd_data = data_time[0] + data_time[1] + '01'
			}else if (time_txt == '年票房') {
				dd_data = dd_data +  '0101'
			}else if (time_txt == '日票房') {
				console.log(dd_data);
				var time_data = dd_data.split('-');
				
				dd_data = time_data[0] + time_data[1] +time_data[2]
			}
			if (Number(dd_data) < 20170101) return false;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			
			var fwf = '';
			var format_data = that.format_data;

			var gs_data = moment(format_data).format('YYYY-MM-DD');

			var checkboxItems = this.checkboxItems;
			var values = [];
			if (this.service == false) {
				values = ['1'];
			} else {
				values = [];
			}
			for (var i = 0, lenI = checkboxItems.length; i < lenI; ++i) {
				checkboxItems[i].checked = false;
				var is_check = false;
				fwf = 0;
				for (var j = 0, lenJ = values.length; j < lenJ; ++j) {
					if (checkboxItems[i].value == values[j]) {
						checkboxItems[i].checked = true;
						var is_check = true;
						fwf = 1;
						break;
					}
				}
			}
			/* 获取用的权限 */
			let	userType = await  this.detection_validity()
			var url = '/topprogram/get-top123';
			let mr_on_data = {
				with_fwf:fwf,
				userType
			}
			that.mr_on(url, that,mr_on_data);
			if (time_txt == '日票房') {
				var url = '/topprogram/get-advancedbo2'
				let data_data = {
					with_fwf: fwf ,
					district,
					city: city_name ,
					bdate: gs_data,
					userType
				}
				this.index_data(url, that, gs_data,data_data);
			} else if (time_txt == '周票房') {
				var format_week = that.format_week;
				var url = '/topprogram/get-advancedbo2'
				let week_data = {
					with_fwf: fwf ,
					district,
					city:city_name,
					dtype:'week',
					userType,
					week:format_week
				}
				this.index_data(url, that, format_week,week_data);
			} else if (time_txt == '月票房') {
				var format_month = that.format_month;
				var url = '/topprogram/get-advancedbo2'
				let month_data = {
					with_fwf: fwf ,
					district,
					city:city_name,
					dtype:'month',
					month:format_month,
					userType
				}
				this.index_data(url, that, format_month,month_data);
			} else if (time_txt == '年票房') {
				var format_year = that.format_year;
				var url = '/topprogram/get-advancedbo2'
				let year_data = {
					with_fwf: fwf ,
					district,
					city:city_name,
					dtype:'year',
					year:format_year,
					userType
				}
				this.index_data(url, that, format_year,year_data);
			}
			this.service = is_check;
			this.checkboxItems = checkboxItems;
		},
		// 点击前一天
		dell_data: async function() {
			var that = this;
			var time_txt = that.time_txt;
			if (time_txt == '日票房') {
				var format_data = that.format_data;

				that.fornt_data(format_data);

				var fwf = '';
				var is_check = that.is_check;
				if (is_check == true) {
					fwf = 1;
				} else {
					fwf = 0;
				}
				var city_name = that.city_name;
				var district = that.city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}
				/* 获取用的权限 */
				let	userType = await  this.detection_validity()
				var gs_data = moment(format_data)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
				var date = [new Date(gs_data)];
				this.date[0] = date;
				var url = '/topprogram/get-advancedbo2';
				let data_gs_data = {
					with_fwf:fwf,
					district,
					city:city_name,
					bdate:gs_data,
					userType
				}
				this.index_data(url, that, gs_data,data_gs_data);
			} else if (time_txt == '周票房') {
				var this_index = that.format_week;
				var arr = this_index.split('-W');
				var year = arr[0];
				var week = arr[1];
				if (week - 0 - 1 == 0) {
					year = year - 0 - 1;
					week = 52;
				} else {
					week = week - 0 - 1;
				}

				that.index_week(year, week);
			} else if (time_txt == '月票房') {
				var this_index = that.format_month;
				var arr = this_index.split('-');
				var year = arr[0];
				var month = arr[1];
				if (month - 0 - 1 == 0) {
					year = year - 0 - 1;
					month = 12;
				} else {
					month = month - 0 - 1;
				}
				that.index_month(year, month);
			} else if (time_txt == '年票房') {
				var this_index = that.format_year;
				this_index = this_index - 1;
				that.index_year(this_index);
			}
		},
		// 点击后一天
		addd_data:async function() {
			var that = this;
			var time_txt = that.time_txt;
			if (time_txt == '日票房') {
				var format_data = that.format_data;
				that.after_data(format_data);

				var fwf = '';
				var is_check = that.is_check;
				if (is_check == true) {
					fwf = 1;
				} else {
					fwf = 0;
				}
				var city_name = that.city_name;
				var district = that.city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}
				/* 获取用的权限 */
				let	userType = await  this.detection_validity()
				var gs_data = moment(format_data)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
				var url = '/topprogram/get-advancedbo2';
				let data_gs_data = {
					with_fwf:fwf,
					district,
					city:city_name,
					bdate:gs_data,
					userType
				}
				this.index_data(url, that, gs_data,data_gs_data);
			} else if (time_txt == '周票房') {
				var this_index = that.format_week;
				var arr = this_index.split('-W');
				var year = arr[0];

				var week = arr[1];
				if (week - 0 + 1 > 52) {
					year = year - 0 + 1;
					week = 1;
				} else {
					week = week - 0 + 1;
				}

				var max_day = moment();
				var max_week = moment(max_day).format('w');
				var max_year = moment(max_day).format('YYYY');
				if (max_year > year) {
					that.index_week(year, week);
				} else if (max_year == year) {
					if (week <= max_week) {
						that.index_week(year, week);
					} else {
						uni.showToast({
							title: '超出本周',
							duration: 2000
						});
					}
				}
			} else if (time_txt == '月票房') {
				var this_index = that.format_month;
				var arr = this_index.split('-');
				var year = arr[0];
				var month = arr[1];
				if (month - 0 + 1 > 12) {
					year = year - 0 + 1;
					month = 1;
				} else {
					month = month - 0 + 1;
				}

				var max_day = moment();
				var max_month = moment(max_day).format('MM');
				var max_year = moment(max_day).format('YYYY');
				if (max_year > year) {
					that.index_month(year, month);
				} else if (max_year == year) {
					if (month <= max_month) {
						that.index_month(year, month);
					} else {
						uni.showToast({
							title: '超出本月',
							duration: 2000
						});
					}
				}
			} else if (time_txt == '年票房') {
				let time = new Date().getFullYear();
				var this_index = that.format_year;
				var now_year = that.now_year;
				let year = this_index + 1;
				if (time < year) {
					return false;
				}
				that.index_year(year);
			}
		},
		// 格式化后一天时间
		after_data: function(format_data) {
			var dd = moment(format_data)
				.subtract(-1, 'days')
				.format('YYYY-MM-DD');
			var that = this;
			var max_day = that.max_day;
			var format_data = format_data; 
			var time_txt = that.time_txt; // 当前什么票房
			format_data = moment(format_data).subtract(-1, 'days');
			if (moment(format_data).isBefore(max_day) == true) {
				var what_day = '周' + '日一二三四五六'.charAt(moment(format_data).day());
				var this_data = moment(format_data).format('YYYY年MM月DD日');
				var del_data = moment(format_data).subtract(1, 'days').format('YYYY-MM-DD');
				var add_data = moment(format_data).subtract(0, 'days').format('YYYY-MM-DD');
				if (moment().format('YYYY年MM月DD日') == moment(format_data).format('YYYY年MM月DD日')) {
					what_day = '今日实时';
				}
				if (moment().format('YYYY年MM月DD日') < moment(format_data).format('YYYY年MM月DD日')) {
					what_day = what_day + '预售';
				}
				
				var dq_time = moment().format('YYYY-MM-DD');
				// 如果小于今天 则判断当前时间 来确定显示 是什么
				if (time_txt == '日票房') {
					if (moment(dq_time) > moment(format_data)) {
						// console.log();
						 var sf_tiem = moment().format('HHmm');
						 var tetx_time = '';
						  if (sf_tiem - 0 < 950) {
						  	tetx_time = '09:50更新'
						  }else if (sf_tiem - 0 < 1430) {
						  	tetx_time = '14:30更新'
						  }else {
							  tetx_time = '次日09:50更新'
						  }
						  this.tetx_time = tetx_time
					}else {
						this.tetx_time = '每小时更新一次'	
					}
				}else {
					this.tetx_time = ''	
				}
				
				
				
				var a = [new Date(dd)];
				this.date = a; // 日历时间
				this.ttiem = this_data;
				this.format_data = format_data;
				
				this.del_data = del_data;
				this.add_data = add_data;
				this.this_data = this_data;
			} else {
				uni.showToast({
					title: '超出最大范围',
					duration: 2000
				});
			}
		},
		// 格式化前一天时间
		fornt_data: function(format_data) {
			var that = this;
			var min_day = that.min_day;
			var time_txt = that.time_txt; // 当前什么票房
			format_data = moment(format_data).subtract(1, 'days');
			if (moment(min_day).isBefore(format_data) == true) {
				var what_day = '周' + '日一二三四五六'.charAt(moment(format_data).day());
				var this_data = moment(format_data).format('YYYY年MM月DD日');
				var del_data = moment(format_data).subtract(1, 'days').format('YYYY-MM-DD');
				var add_data = moment(format_data).subtract(0, 'days').format('YYYY-MM-DD');
				if (moment().format('YYYY年MM月DD日') == moment(format_data).format('YYYY年MM月DD日')) {
					what_day = '今日实时';
				}
				if (moment().format('YYYY年MM月DD日') < moment(format_data).format('YYYY年MM月DD日')) {
					what_day = what_day + '预售';
				}
				
				var dq_time = moment().format('YYYY-MM-DD');
				// 如果小于今天 则判断当前时间 来确定显示 是什么
				if (time_txt == '日票房') {
					if (moment(dq_time) > moment(format_data)) {
						// console.log();
						 var sf_tiem = moment().format('HHmm');
						 var tetx_time = '';
						  if (sf_tiem - 0 < 950) {
						  	tetx_time = '09:50更新'
						  }else if (sf_tiem - 0 < 1430) {
						  	tetx_time = '14:30更新'
						  }else {
							  tetx_time = '次日09:50更新'
						  }
						  this.tetx_time = tetx_time
					}else {
						this.tetx_time = '每小时更新一次'	
					}
				}else {
					this.tetx_time = ''	
				}	
				
				this.ttiem = this_data;
				this.format_data = format_data;
				this.del_data = del_data;
				this.add_data = add_data;
				this.this_data = this_data;
			} else {
				uni.showToast({
					title: '超出最大范围',
					duration: 2000
				});
				return;
			}
		},
		//  tab 切换
		click_tab_show() {
			// console.log(1);
			var time_tab = this.time_tab;
			if (time_tab == 0) {
				this.time_tab_Br = true;
			}

			this.Data_select_header = false;
		},
		//  tab 切换
		click_tab(index) {
			if (index == 0) {
				this.time_tab_Br = true;
				this.time_tab = 0;
			} else {
				this.time_tab = index;
				this.time_tab_Br = false;
			}
		},
		// 选择年
		check_year(e) {
			var year = e; //选择的年
			if (e <= 2016) {
				this.service = false;
			}
			this.tetx_time = '';  // 显示多长时间更心一次
			this.index_year(year);
		},
		//  调用年接口
		index_year: async function(year) {
			var dq_year = moment(new Date())
				.add('year', 0)
				.format('YYYY'); //当前年
			var time_txt = '年票房';
			var del_data_year = year;
			var add_data_year = year;
			var this_year = year + '年';

			var format_year = year;

			var del_data = '';
			var add_data = '';
			if (del_data_year - 0 - 1 == 2011) {
				del_data = 2012;
			} else {
				del_data = del_data_year - 0 - 1;
			}

			if (add_data_year - 0 + 1 > dq_year - 0) {
				add_data = dq_year;
			} else {
				add_data = add_data_year - 0 + 1;
			}

			var that = this;
			var city_name = that.city_name;
			var district = that.city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			var fwf = '';
			var is_check = that.is_check;
			if (is_check) {
				fwf = 0;
			} else {
				fwf = 1;
			}
			/* 获取用的权限 */
			let	userType = await  this.detection_validity()
			var format_data = that.format_data;
			var gs_data = moment(format_data).format('YYYY-MM-DD');
			var url = '/topprogram/get-advancedbo2';
			let data_gs_data = {
				with_fwf:fwf,
				district,
				city:city_name,
				dtype:'year',
				year:format_year,
				userType
			}
			this.index_data(url, that, gs_data,data_gs_data);
			this.time_txt = time_txt;
			this.Data_select_header = true;
			this.ttiem = this_year;
			this.format_year = format_year;
			this.add_data = year;
			this.del_data = del_data;
			this.what_day = '';
		},
		// 选择年
		//  月 方法
		//  调用月接口

		async index_month(year, month) {
			// console.log(year, month);
			// return false;
			var time_txt = '月票房';
			var del_data_year = year;
			var del_data_month = month;
			var add_data_year = year;
			var add_data_month = month;
			var this_month = year + '年' + month + '月';

			var format_month = year + '-' + month;

			var del_data = '';
			var add_data = '';
			if (del_data_month - 0 - 1 == 0) {
				del_data_year = del_data_year - 0 - 1;
				del_data_month = 12;
				del_data = del_data_year + '-' + del_data_month;
			} else {
				del_data = del_data_year + '-' + (del_data_month - 0 - 1);
			}

			if (add_data_month - 0 + 1 > 12) {
				add_data_year = add_data_year - 0 + 1;
				add_data_month = 1;
				add_data = del_data_year + '-' + add_data_month;
			} else {
				add_data = add_data_year + '-' + (add_data_month - 0 + 1);
			}

			var that = this;
			var city_name = this.city_name;

			var district = that.city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			var fwf = '';
			var is_check = that.is_check;
			if (is_check) {
				fwf = 0;
			} else {
				fwf = 1;
			}
			/* 获取用的权限 */
			let	userType = await  this.detection_validity()
			var format_data = that.format_data;
			var gs_data = moment(format_data).format('YYYY-MM-DD');
			var url = '/topprogram/get-advancedbo2';
			let data_mont = {
				with_fwf:fwf,
				district,
				city:city_name,
				dtype:'month',
				month:format_month,
				userType
			}
			console.log(data_mont,url);
			
			this.index_data(url, that, gs_data,data_mont);
				this.tetx_time = '';  // 显示多长时间更心一次
			this.Data_select_header = true;
			this.time_txt = time_txt;
			this.ttiem = this_month;
			this.format_month = format_month;
			this.add_data = add_data;
			this.del_data = del_data;
		},

		//选择月
		check_month(item, e) {
			// console.log(item);
			if (item.length == 3) {
				var it = Number(item.slice(0, 2));
			} else {
				var it = Number(item.slice(0, 1));
			}
			var that = this;
			var max_day = moment();
			var month = it; //选择的月
			var year = this.is_year - 0; //选择的年
			if (year <= 2016) {
				this.service = false;
			}
			var max_month = moment(max_day).format('MM') - 0;
			var max_year = moment(max_day).format('YYYY') - 0;
			if (max_year > year) {
				this.index_month(year, month);
			} else if (max_year == year) {
				if (month <= max_month) {
					this.index_month(year, month);
				} else {
					uni.showToast({
						title: '超出本月',
						duration: 2000
					});
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
			this.is_year = year;
			this.curren = index;
		},
		// 月方法
		//  c初始化 周 所有的数据
		z_data() {
			//周
			try {
				var res = uni.getSystemInfoSync();

				this.pixelRatio = res.pixelRatio;
				this.apHeight = 16;
				this.offsetTop = 80;
				var mar_top = '';
				if (res.windowHeight - 0 - 100 > 600) {
					mar_top = '50px';
				}
				this.wHeight = res.windowHeight - 0 - 100 + 'px';
			} catch (e) {}
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
			this.week = week;
			this.year = all_year;
		},
		//  日期自带的插件
		// 点击日历单个按钮
		async ei_calendar_tap(event) {
			event.day = event.day + '';
			if (event.day.length >= 2) {
				if (Number(event.day) < 10) {
					event.day = event.day.slice(1);
				}

			}
			event.month = event.month + '';
			if (event.month.length >= 2) {
				if (event.month.length == 2) {
					event.month = event.month.slice(1);
				}
			}
			var data = event.format.split('/')
			var that = this;
			var fwf = '';
			var time_txt = '日票房';
			var is_check = that.is_check;
			if (is_check) {
				fwf = 0;
			} else {
				fwf = 1;
			}
			var max_day = that.max_day;
			if (event.month < 10) {
				event.month = '0' + event.month;
			}
			if (event.day < 10) {
				event.day = '0' + event.day;
			}
			var dq_time = moment().format('YYYY-MM-DD');
			// var check_day = event.year + '年' + event.month + '月' + event.day + '日';   //  事件 对象返回单个有问题 去这种方式
			// var gs_data = event.year + '-' + event.month + '-' + event.day;    //  事件 对象返回单个有问题 去这种方式
			var check_day = data[0] + '年' + data[1] + '月' + data[2] + '日';
			var gs_data = data[0] + '-' + data[1] + '-' + data[2];
			var dd_data = moment(gs_data).format('YYYYMMDD');
			
			
			
			// 如果小于今天 则判断当前时间 来确定显示 是什么
			if (moment(dq_time) > moment(dd_data)) {
				// console.log();
				 var sf_tiem = moment().format('HHmm');
				 var tetx_time = '';
				  if (sf_tiem - 0 < 950) {
				  	tetx_time = '09:50更新'
				  }else if (sf_tiem - 0 < 1430) {
				  	tetx_time = '14:30更新'
				  }else {
					  tetx_time = '次日09:50更新'
				  }
				  this.tetx_time = tetx_time
			}else {
				this.tetx_time = '每小时更新一次'	
			}
			
			
			
			if (Number(dd_data) <= 20161231) {
				this.service = false;
				this.dd_data = dd_data;
			}

			// 选择周几
			var what_day = '周' + '日一二三四五六'.charAt(moment(gs_data).day());

			if (moment().format('YYYY年MM月DD日') == moment(gs_data).format('YYYY年MM月DD日')) {
				what_day = '今日实时';
			}
			if (moment().format('YYYY年MM月DD日') < moment(gs_data).format('YYYY年MM月DD日')) {
				what_day = what_day + '预售';
			}
			if (moment(gs_data).isBefore(max_day) == true) {
				var time_gs = moment(gs_data).valueOf();
				var del_data = moment(time_gs)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
				var add_data = moment(time_gs)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
				var city_name = that.city_name;
				var district = that.city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}
				/* 获取用的权限 */
				let	userType = await  this.detection_validity()
				var url = '/topprogram/get-advancedbo2';
				let gs_data_data = {
					with_fwf:fwf,
					district,
					city:city_name,
					bdate:gs_data,
					userType
				}
				var a = [new Date(gs_data)];
				this.index_data(url, that, gs_data,gs_data_data);
				this.Data_select_header = true;
				this.date = a;
				this.time_tab_Br = false; //控制日历   不知道问什么不能关闭日历 关闭的话日期不刷新
				this.ttiem = check_day;
				this.del_data = del_data;
				// console.log(gs_data);
				this.add_data = gs_data;
				this.format_data = time_gs;
				this.time_txt = time_txt;
				this.what_day = what_day;
				this.format_data = gs_data;
			} else {
				uni.showToast({
					title: '超出最大范围',
					duration: 2000
				});
			}
		},
		//  点击修改 周里边的年
		click_year: function(name, index) {
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
		//选择周
		check_week(index, e) {
			var that = this;
			var max_day = moment();
			var max_week = moment(max_day).format('w');
			var max_year = moment(max_day).format('YYYY');
			var week = index + 1; //选择的周
			var year = this.is_year; //选择的年

			if (Number(year) <= 2016) {
				this.service = false;
			}
			if (max_year > year) {
				this.index_week(year, week);
			} else if (max_year == year) {
				if (week <= max_week) {
					this.index_week(year, week);
				} else {
					uni.showToast({
						title: '超出本周',
						duration: 2000
					});
				}
			}
		}, //  调用周接口
		index_week: async function(year, week) {
			var time_txt = '周票房';
			var del_data_year = year;
			var del_data_week = week;
			var add_data_year = year;
			var add_data_week = week;
			if (week < 10) {
				week = '0' + week;
			}
			var this_week = year + '年第' + week + '周';
			var format_week = year + '-W' + week;
			var del_data = '';
			var add_data = '';
			if (del_data_week - 0 - 1 == 0) {
				del_data_year = del_data_year - 0 - 1;
				del_data_week = 52;
				del_data = del_data_year + '-W' + del_data_week;
			} else {
				if (del_data_week - 0 - 1 < 10) {
					del_data_week = '0' + (del_data_week - 0 - 1);
					del_data = del_data_year + '-W' + del_data_week;
				}
			}

			if (add_data_week - 0 + 1 > 52) {
				add_data_year = add_data_year - 0 + 1;
				add_data_week = '01';
				add_data = del_data_year + '-W' + add_data_week;
			} else {
				add_data = '0' + (add_data_week - 0 + 1);
				add_data = add_data_year + '-W' + add_data;
			}

			var that = this;
			var city_name = that.city_name;
			var district = that.city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			var fwf = '';
			var is_check = that.is_check;
			if (is_check) {
				fwf = 0;
			} else {
				fwf = 1;
			}
			var format_data = that.format_data;
			/* 获取用的权限 */
			let	userType = await  this.detection_validity()
			var gs_data = moment(format_data).format('YYYY-MM-DD');
			var url = '/topprogram/get-advancedbo2';
			let data_gs_data = {
				with_fwf:fwf,
				district,
				city:city_name,
				dtype:'week',
				week:format_week,
				userType
			}
			console.log(data_gs_data,'index_week')
			this.index_data(url, that, gs_data,data_gs_data);
			this.time_txt = time_txt;
			this.ttiem = this_week;
			this.tetx_time = '';  // 显示多长时间更心一次
			this.add_data = add_data;
			this.del_data = del_data;
			this.what_day = '本周';
			this.Data_select_header = true;
			this.format_week = format_week
		},

		// tab 切换
		// 票房显示 的字
		more_index_data_tap(index) {
			// console.log(data);
			// // 复制过来一份进行操作
			let zb_title = [...this.zb_title];
			// 如果点击当前的 按钮是 true  则 变为false
			if (zb_title[index].front_row) {
				zb_title[index].front_row = false;
				// console.log(zb_title[index].front_rowz);
			} else {
				let boer = 0;
				for (let i = 0; i < zb_title.length - 1; i++) {
					if (zb_title[i].front_row) {
						if (boer == 0) {
							boer = 1;
						} else if (boer == 1) {
							boer = 2;
						} else if (boer == 2) {
							boer = 3;
						} else if (boer == 3) {
							boer = 4;
						}
						// boer++;
						// console.log(boer);
					}
					if (boer == 4) {
						uni.showToast({
							title: '最多选择四项',
							duration: 2000,
							icon: 'none'
						});
						return false;
					}
				}
				// console.log(boer);

				if (boer <= 4) {
					zb_title[index].front_row = true;
				}
			}
			// 定义变量 来计算 是否超过 规定数量

			this.zb_title = zb_title;
		},
		//  点击侧边栏 进行切换 	··
		dddd(e) {
			this.alpha = e;
		},
		// 初始化 地区表
		async dataMap() {
			let that = this;
			let {data:zm_list} = await this.$http.get({
				url:'/advancedbo/get-citylist'
			})
			// 下边一系列过程都是在 处理数据
			
			let mzmlist = [];
			for (let a in zm_list) {
				let region = [];
			
				if (a !== '#') {
					for (let n in zm_list[a]) {
						region.push(n);
					}
					//  最终赋值
					mzmlist.push({ letter: a, childer: region });
				}
			}
			this.zm_list = mzmlist;
		},
		 // 动态获取 边元素高度来设置 scr 高度
		script() {
			const query = uni.createSelectorQuery();
			query.select('#border_he').boundingClientRect();
			query.exec(res => {
				let winHeight = res[0].height + 22;
				if (winHeight == 22) {
					winHeight = 432;
				}
				this.winHeight = winHeight;
			});
		},
		// 点击区域 热门城市
		click_grid: async function(e) {
			// 获取当前选择的城市
			var city_name = e;
			this.is_show = true;
			this.city_name = city_name;
			var that = this;
			var fwf = '';
			var is_check = that.is_check;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			//  当前这天的日期
			// var gs_data = moment().format('YYYY-MM-DD');
			var gs_data = this.format_data;
			//  都是地址
			var city_name = that.city_name;
			var district = that.city_name;
			//
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			let	userType = await  this.detection_validity()
			var url = '/topprogram/get-advancedbo2'
			var gs_data_data = {
				with_fwf:fwf,
				district,
			 	city:city_name,
				bdate:gs_data,
				userType
			}
			this.index_data(url, that, gs_data,gs_data_data);
		},
		// 点击 城市
		click_city: async function(event) {
			console.log(event)
			//  修改数据
			this.is_show = true;
			this.city_name = event;

			var that = this;
			var fwf = '';
			var is_check = that.is_check;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			var gs_data = this.format_data;
			var city_name = that.city_name;
			var district = that.city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			/* 获取用的权限 */
						let	userType = await  this.detection_validity()
			var url = '/topprogram/get-advancedbo2'
			let data = {
				with_fwf:fwf,
				district,
				city:city_name,
				bdate:gs_data,
				userType
			}
			this.index_data(url, that, gs_data,data);
		},
		index_data: async  function(url, that, gs_data,data) {
			//调取影片票房
			let {data:ra} = await this.$http.get({
				url,
				data,
			})
			let z_total_bo_s = (ra.sum.total_bo_s / 10000).toFixed(2); //今日实时价格
			if (z_total_bo_s >= 100000) {
				z_total_bo_s = (z_total_bo_s / 10000).toFixed(2) + '亿';
			} else {
				z_total_bo_s = z_total_bo_s + '万';
			}
			var sy_data = '';
			for (var i in ra.data) {
				var start = ra.data[i].publish_date;
				var total_zb = '';
				var session_zb = '';
				var total_seats_zb = '';
				//    // 当前日期
				var gs_datas = moment(gs_data).valueOf();
				// //  获取当前时间戳
				var t = moment(start).valueOf();
				var time = moment(gs_datas - t);
				sy_data = time / 1000 / 60 / 60 / 24;
				//  计算上映天数
				if (sy_data == 0) {
					sy_data = '首映';
				}
				else if (sy_data == -1) {
					sy_data = '零点场';
				} else if (sy_data < -1) {
					sy_data = '点映';
				} else {
					sy_data = sy_data - 0 + 1;
					sy_data = '上映' + sy_data + '天';
				}
				if (sy_data == '上映NaN天') {
					sy_data = '上映-天';
				}
			
				// /综合票房占比
				if (ra.data[i].total_bo_s !== null) {
					var a = ra.data[i].total_bo_s - 0;
					var b = ra.sum.total_bo_s - 0;
					total_zb = ((a / b) * 100).toFixed(2);
					ra.data[i].total_zb = total_zb; //综合票房占比
				}
			
				//  排场占比
				var session = ra.data[i].session_s;
				var sessions = ra.sum.session_s;
				if ((session / sessions) * 100 < 0.01) {
					session_zb = '<0.01%';
				} else {
					session_zb = ((session / sessions) * 100).toFixed(2) + '%';
				}
				ra.data[i].session_zb = session_zb; //排场占比
			
				//  场均人次
				var total_people_s = ra.data[i].total_people_s;
				var session_s = ra.data[i].session_s;
			
				total_people_s = (total_people_s / session_s).toFixed(0);
				if (total_people_s < 1) {
					total_people_s = 1;
				}
				ra.data[i].cj_people_s = total_people_s; //场均人次
				//
				// 	//  排座占比
				var total_seat = ra.data[i].total_seats;
				var total_seats = ra.sum.total_seats;
				if ((total_seat / total_seats) * 100 < 0.01) {
					total_seats_zb = '<0.01%';
				} else {
					total_seats_zb = ((total_seat / total_seats) * 100).toFixed(2) + '%';
				}
			
				ra.data[i].total_seats_zb = total_seats_zb; //排座占比
				ra.data[i].occupancy = (ra.data[i].occupancy * 100).toFixed(2) + '%'; //上座率
				ra.data[i].sy_data = sy_data; //上映天数
				ra.data[i].avg_price = (ra.data[i].avg_price - 0).toFixed(2); //平均票价
				var ljpf = ra.data[i].totalBo;
				if (ljpf == null) {
					ra.data[i].totalBo = '-';
				} else {
					ljpf = (ljpf / 100000000).toFixed(2); //累计票房;
					if (ljpf < 0.1) {
						ljpf = (ra.data[i].totalBo / 10000).toFixed(2) + '万';
					} else {
						ljpf = (ra.data[i].totalBo / 100000000).toFixed(2) + '亿';
						// ljpf = (ra.data[i].totalBo / 10000).toFixed(2) + '万';
					}
					// console.log(ljpf);
					ra.data[i].totalBo = ljpf;
				}
			
				ra.data[i].total_bo_s = (ra.data[i].total_bo_s / 10000).toFixed(2);
			}
			
			// 判断字段  字段如果超过 9 个字符  那么变成点点
			for (var a = 0; a < ra.data.length; a++) {
				if (ra.data[a].movie_name.length > 8) {
					ra.data[a].movie_name = ra.data[a].movie_name.slice(0, 7) + '...';
				}
			}
			
			that.itemlist = ra.data;
			that.office_num = z_total_bo_s;
			// 平均票价/
			var avg_price = Number(ra.sum.avg_price);
			ra.sum.avg_price = avg_price.toFixed(2) + '元';
			//  上座率
			var occupancy = ra.sum.occupancy;
			ra.sum.occupancy = Number(occupancy * 100).toFixed(2) + '%';
			// 人次
			var total_people_s = ra.sum.total_people_s / 10000;
			ra.sum.total_people_s = total_people_s.toFixed(2) + '万';
			var session_s = ra.sum.session_s / 10000;
			ra.sum.session_s = session_s.toFixed(2) + '万';
			that.Rasum = ra.sum;
			//  d当前年
			that.show_date = ra.show_datel;
		},
		// 点击更多弹出框
		// 点击确定 关闭弹出框
		more_index_header_click() {
			this.is_index = true;

			//  点击更多指标弹出选择框
		},
		show_index() {
			this.is_index = false;
		},
		// 点击更多弹出框结束 电机全国地区 进行更换地区
		fan() {
			this.is_show = !this.is_show;
		},
		// 顶部每一个小导航链接
		titleUrl(data,index) {
			if (index == 8) {
				uni.showToast({
					title: '即将上线,敬请期待',
					duration:2000,
					icon:'none'
				});
				return false;
			}
			// 跳转非tab 页面
			uni.navigateTo({
				url: data,
				success: res => {},
				fail: () => {},
				complete: () => {}
			});
		},

		// 点击按钮切换每天的数据
		tabData(id) {
			// 往右切换
			if (id == 2) {
				console.log('点击右边按钮了');
			} else if (id == 1) {
				//  往左切换
				console.log('点击左边按钮了');
			}
		}
	}
};
</script>

<style lang="less">
.dq {
	width: 100%;
	height: 100px;
}
@import url('./home.less');
@import url('./index.less');
@import url('./tab.less');

.Data_select_header {
	background-color: red;
}
.more {
	position: fixed;
	top: 0;
	height: 100%;
	.more_header {
		height: 2000upx;
		background-color: rgba(0, 0, 0, 0.2);
		position: fixed;
	}
	.more_index {
		height: 450upx;
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #fff;

		.more_index_header {
			display: flex;
			justify-content: flex-end;
			padding: 20upx;
			font-size: 28upx;
			box-sizing: border-box;
			border-bottom: 1px solid #ccc;
		}
		.more_index_data {
			// color: red;
			display: flex;
			justify-content: space-between;
			flex-wrap: wrap;
			padding: 20upx 20upx;
			padding-bottom: 100upx;
			view {
				width: 28%;
				border: 1px solid #f28f2d;
				margin: 20upx 20upx 20upx 0;
				background-color: #fff;
				padding: 10upx 0;
				margin-top: 5px;
				text-align: center;
				color: #000;
				font-size: 28upx;
				white-space: nowrap;
				text-overflow: ellipsis;
				overflow: hidden;
			}
			// x选中 样式
			.active {
				background-color: #f28f2d;
				color: #fff;
			}
			// 选中样式结束
		}
	}
}
</style>

