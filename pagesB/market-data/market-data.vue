<template>
	<view>
		<view class="Header_top">
			<view @tap="Header_top_click(index)"  v-for="(item, index) in hader_data" :key="index"><text :class="[hader_data_index == index ? 'active' : '']">{{ item }}</text></view>
		</view>

		<!-- tabone -->
		<view class="tabone" :hidden="!(hader_data_index == 0)">
			<!-- //今日票房	 -->
			<scroll-view class="scroll-view" scroll-x :scroll-left="0">
				<view @tap="scroll_view_tap(index, item)" :class="['scroll_view_header']" v-for="(item, index) in year" :key="index">
					<view :class="[yaer_data == item ? 'active' : '']">{{ item }}</view>
				</view>
			</scroll-view>

			<view class="babone_center">
				电影票房总榜
				<view :hidden="!(yaer_data == '全部')">(截止{{ this_year }}年)</view>
			</view>

			<view class="center">
				<!-- // 头部 -->
				<view class="centerH">
					<!-- @tap="fan" -->
					<view>
						{{ city_name }}
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
					</view>
					<!-- @tap="click_tab_show" -->
					<view class="centerH_jr">
						<!-- {{ time_txt }} {{ ttiem }} -->

						<text :hidden="yaer_data == '全部'">年票房 {{ yaer_data }}年</text>
						<text :hidden="!(yaer_data == '全部')">{{ yaer_data }}</text>
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
					</view>
					<view @tap="checkboxChange" :class="['centerService',yaer_data <= 2016 ? 'active' :'']" :style="{ color: service == false ? 'black' : '' }">
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
					<view class="centerM-symbol" @tap="dell_data(1)"><image src="../../static/home/syy.png" mode=""></image></view>
					<view class="centerM_money">
						<view class="money">{{ office_num }}</view>
						<view class="centerM_son">
							<view class="centerM_turnover">每小时更新一次</view>
							&nbsp;
							<view class="centerM_tiem">
								当前时间: {{ time_data }}
								<!-- <image src="../../static/home/question-circle.png" mode=""/> -->
								<!-- <image src="../../static/home/question-circle.png" mode=""></image> -->
							</view>
						</view>
					</view>
					<view class="centerM-symbol" @tap="dell_data(2)"><image src="../../static/home/nextcopy2.png" mode=""></image></view>
				</view>
				<!--  底部 -->
				<view class="centerFoot">
					<view class="centerFoot_son">
						<!-- v-for="item in centerB" :key="item.id" -->
						<view>人次</view>
						<!-- {{ Rasum.total_people_s }} -->
						<view>{{ All_sum_data.sum.total_people_s }}</view>
					</view>
					<view class="centerFoot_son">
						<!-- v-for="item in centerB" :key="item.id" -->
						<view>上座率</view>
						<!-- <view>{{ Rasum.occupancy }}</view> -->
						<view>{{ All_sum_data.sum.occupancy }}</view>
					</view>
					<view class="centerFoot_son">
						<!-- v-for="item in centerB" :key="item.id" -->
						<view>场次</view>
						<!-- <view>{{ Rasum.session_s }}</view> -->
						<view>{{ All_sum_data.sum.session_s }}</view>
					</view>
					<view class="centerFoot_son">
						<!-- v-for="item in centerB" :key="item.id" -->
						<view>平均票价</view>
						<!-- <view>{{ Rasum.avg_price }}</view> -->
						<view>{{ All_sum_data.sum.avg_price }}</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<view class="button">
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
				<view class="buttonB" @tap="tz_click(it.gp_id,it.zz_id)" v-for="it in All_sum_data.data" :key="it.gp_id">
					<view class="buttonB_Headerson">
						<view class="buttonB_Headerson_name">{{ it.zz_name }}</view>

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
						<view :hidden="!zb_title[4].front_row">{{ it.seat_s }}</view>
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

			<scroll-view class="more" :hidden="is_index">
				<scroll-view class="more_header"></scroll-view>
				<view class="more_index">
					<view class="more_index_header"><view class="" @tap="more_index_header_click">确定</view></view>
					<view class="more_index_data">
						<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
							{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
						</view>
					</view>
				</view>
			</scroll-view>

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
		</view>

		<!-- tabtow -->
		<!-- tab2 -->
		<view :hidden="!(hader_data_index == 1)">
			<view class="tab_data">
				<view @tap="tab_data_tap(index)" v-for="(item, index) in time_title" :class="['tab_data_hader']" :key="index">
					<view :class="[index == time ? 'active' : '']">{{ item }}</view>
				</view>
			</view>

			<view class="all_num">
				大盘{{ change_title }}榜
				<text>(截止{{ this_time }})</text>
			</view>

			<!-- 表头 -->
			<view class="table_head">
				<view :class="[ins == 0 ? 'add_width' : '']" v-for="(item, ins) in head_title" :key="ins">{{ item }}</view>
			</view>
			<!-- 主体 -->
			<view class="tbody">
				<scroll-view scroll-y :style="{ height: windowHeight }">
					<!-- bindtap='go_film' -->
					<view :class="['tr', index % 2 == 0 ? '' : 'add_background']" :key="index" v-for="(item, index) in tbody">
						<view class="add_width">
							<!-- 排行 -->
							<view :class="[index + 1 == 1 ? 'number_one' : '', index + 1 == 3 ? 'number_three' : '', index + 1 == 2 ? 'number_two' : '']">{{ index + 1 }}</view>
							<view class="tr_sun">
								<!-- 影片名称 -->
								<view v-if="time == 0" style="width:180rpx"><view style="width:180rpx">{{ item.bdate }} </view> <view style="width:180rpx">{{ item.days }}</view></view>
								<view v-if="time == 1" style="width:180rpx">{{ item.cus_weeks }}周</view>
								<view v-if="time == 2" style="width:180rpx">{{ item.yearmonth }}月</view>
								<!-- 上映日 -->
							</view>
						</view>
						<view>{{ item.total_bo_s }}</view>
						<view>{{ item.session_s }}</view>
						<view>{{ item.total_people_s }}</view>
					</view>
				</scroll-view>
			</view>
		</view>

		<!-- tab3 -->
		<view :hidden="!(hader_data_index == 2)">
			<!-- 切换年份 和档期-->
			<view class="tab_year">
				<view @tap="check_year">
					{{ this_year }}
					<image src="../../static/home/next.png" mode=""></image>
				</view>
				<view @tap="check_dq">
					{{ this_dq }}
					<image src="../../static/home/next.png" mode=""></image>
				</view>
			</view>

			<view class="year_main" :hidden="show_year">
				<view style="text-align:center;">选择年份</view>
				<view @tap="tabthree_year(item)" v-for="(item, index) in data_title" v-if="item !== '全部'" :key="index">
					<text>{{ item }}</text>
				</view>
			</view>

			<view class="dq_main" :hidden="show_dq">
				<view style="text-align:center;">选择档期</view>
				<view @tap="tabthree_dq_tap(item,index)" v-for="(item, index) in festival_title" :key="index">
					<text>{{ item }}</text>
				</view>
			</view>

			<view class="all_num">档期票房榜</view>
			<!-- 表头 -->
			<view class="table_head">
				<view :key="index" :class="[index == 0 ? 'add_width' : '']" v-for="(item, index) in table_title">{{ item }}</view>
			</view>
			<!-- 主体 -->
			<view class="tbody">
				<scroll-view scroll-y :style="{ height: windowHeight }">
					<view :class="['tr', index % 2 == 0 ? '' : 'add_background']" v-if="item.total_bo_s > 1" :key="index" v-for="(item, index) in tabThreeTbody">
						<view class="add_width">
							<!-- 排行 -->
							<view :class="[index + 1 == 1 ? 'number_one' : '', index + 1 == 2 ? 'number_two' : '', index + 1 == 3 ? 'number_three' : '']">{{ index + 1 }}</view>
							<view class="tr_sun">
								<!-- 影片名称 -->
								<view style="width:180rpx">{{ item.zz_name }}</view>
								<!-- 上映日 -->
								<view style="width:180rpx">{{ item.publish_date }}</view>
							</view>
						</view>
						<view>{{ item.total_bo_s }}</view>
						<view>{{ item.avg_price }}</view>
						<view>{{ item.session_people }}</view>
					</view>
				</scroll-view>
			</view>
		</view>
	</view>
</template>

<script>
import moment from '@/components/moment';
export default {
	onShareAppMessage(){},
	filters: {
		disposeTiem: function(tiem) {
			// console.log(tiem);
			let t = new Date();
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
			// 实时时间
			set_time_data:'', // 实时时间定时器
			time_data:'',
			// tabthree
			dq_num:0, //当前选择的节日下下标
			table_title: ['排名', '票房(万元)', '平均票价', '场均人次'],
			show_dq: true,
			show_year: true,
			tabThreeTbody: [], // s所有数据
			this_dq: '元旦',
			data_title: [], // 所有年
			festival_title: [], // 所有节日
			// tanthree
			// tantow
			windowHeight: '',
			time: 0,
			tbody: [], // 所有数据
			time_title: ['单日票房', '单周票房', '单月票房'],
			change_title: '单日票房',
			head_title: ['序号 　　日期', '单日票房(万)', '总场次(万)', '总人次(万)'],
			// tabtow
			gs_data: new Date(), // 当前时间 使用都是最新的日期  用这个来计算 上映多少天
			city_name: '全国',
			office_num: '', //当前实时价格
			is_index: true, // 更多选择
			All_sum_data: [], // 请求回来的所有数据
			//xz_year:[], // 请求回来的当前年
			this_time: '', // 截止日期   2019年8月19
			this_year: '', // 当前年 目前也是截止日期
			// 地区选择
			yaer_data: '2019', // 用来捷库发送请求
			is_show: true, // 控制地区
			inputVal: '',
			// 字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			alpha: '',
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
			// 热门城市
			rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
			// 处理过的数据 包含了字母和城市
			zm_list: [],
			// 地区
			scroll_view_index: 1, // tanone 默认选中那个
			year: ['全部', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012'], // 年票房
			itemlist: [
				
			], // 总数据
			hader_data: ['总票房榜', '大盘票房', '档期票房'],
			hader_data_index: 0,
			// time: new Date(), // 当前时间
			service: true, // 当前是否是 选中服务
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
					front_row: false
				},
				{
					zb_name: '票价',
					two_title: '',
					is_check: '平均',
					no_check: '平均',
					front_row: true
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
			]
		};
	},
	created() {
		// 实时时间
		this.set_time_data= setInterval(()=>{
				let t = new Date();
			let s = t.getHours();
			let f = t.getMinutes();
			if (f < 10) {
				f = '0' + f;
			}
				this.time_data = s + ':' + f;
		},1000)
	
		
		
	},
	onUnload() {
		console.log('实例销毁');
		clearInterval(this.set_time_data)
	},
	async onLoad() {
		//调取档期接口
		let {data:ra} = await  this.$http.get({
			url:'/topprogram/get-schedule'
		})
		this.festival_title = ra;
		var day1 = new Date();
		day1.setTime(day1.getTime() - 60 * 60 * 24 * 1000);
		var data_year = day1.getFullYear();
		var data_month = day1.getMonth() + 1;
		var data_day = day1.getDate();
		var this_year =
			moment(new Date())
				.add(0, 'year')
				.format('YYYY') - 0; //当前年;
		var time = data_year + '年' + data_month + '月' + data_day;
		var all_year = [];
		all_year.push('全部');
		for (var i = data_year; i >= 2012; i--) {
			all_year.push(i);
		}
		this.this_time = time; // 截止日期
		this.year = all_year; // 2012到现在
		this.this_year = this_year; // 当前年 目前也是截止日期
		this.data_title = all_year; // tab three 所有年
		this.yaer_data = this_year; // 当前年
		var url = '/topprogram/get-total';
		let All_data = {
			year:this_year
		}
		var d = moment(new Date()).format('YYYY-MM-DD');
		// console.log(url)
		this.all_bo(url, this, d,All_data);
		try {
			var res = uni.getSystemInfoSync();
			this.pixelRatio = res.pixelRatio;
			this.apHeight = 16;
			this.offsetTop = 80;
			this.windowHeight = res.windowHeight - 0 - 165 + 'px';
		} catch (e) {}
	},
	methods: {
		tz_click(id,mid){
			uni.navigateTo({
				url:'../../pagesA/dy_particulars/dy_particulars?id=' + mid + '&mid=' + id
			});
		},
		// tabthree
		//选择年份
		tabthree_dq_tap(item,index){
			 var that = this;
			var year = this.this_year;
			var dq_num = index;
			var url = '/topprogram/get-totalschedule';
			let All_data = {
				schedule:dq_num,
				year:year,
				with_fwf:-1
			}
			that.dq_bo(url, this,All_data)
			this.dq_num = index;
			this.this_dq = item;
			this.show_dq = true;
		},
		// 选择年
		tabthree_year(item){
			var dq_num  = this.dq_num;
			var year = item;
			var url = '/topprogram/get-totalschedule';
			let All_data ={
				schedule:dq_num,
				year:year,
				with_fwf:-1
			}
			this.dq_bo(url, this,All_data);
			this.this_year = year;
			this.show_year = true;
		},
		//  展开年份选择
		check_year() {
			this.show_year = false;
		},
		//  展开档期选择
		check_dq() {
			this.show_dq = false;
		},
		// tabthree
		// tabtow
		tab_data_tap(index) {
			var that = this;
			var t = this.change_title;
			var txt = this.head_title;
			let url = '';
			let All_data = {};
			if (index == 0) {
				t = '单日票房';
				txt[1] = '单日票房(万)';
				txt[0] = '序号 　　日期';

				url = '/topprogram/get-totallist2';
				All_data = {
					dtype:'date'
				}
				that.dp_bo(url, that,All_data);
			} else if (index == 1) {
				t = '单周票房';
				txt[1] = '单周票房(万)';
				txt[0] = '序号 　　周次';
				url = '/topprogram/get-totallist2';
				All_data = {
					dtype:'week'
				}
				that.dp_bo(url, that,All_data);
			} else {
				t = '单月票房';
				txt[1] = '单月票房(万)';
				txt[0] = '序号 　　月份';
				url = '/topprogram/get-totallist2'
				All_data = {
					dtype:'month'
				}
				that.dp_bo(url, that,All_data);
			}
			this.time = index;
			this.change_title = t;
			this.head_title = txt;
		},
		// tabtow
		// 点击前后天
		dell_data(index) {
			var is_show = this.service;
			var yaer_data = this.yaer_data; // 当前年
			var this_year = this.this_year; // 最大年
			var gs_data = this.gs_data;
			
			if (yaer_data == '全部') {
				uni.showToast({
					title: '现在选中全部',
					duration: 2000,
					icon: 'none'
				});
				return false;
			}
			var fwf = '';
			if (is_show) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			let All_data = {};
			let url = '';
			if (index == 1) {
				if (yaer_data <= 2012) {
					uni.showToast({
						title: `最小选择2012年`,
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				yaer_data = yaer_data - 1;
				if (yaer_data <= 2016) {
					this.service = false;
				}
				url = '/topprogram/get-total';
				All_data = {
					year:yaer_data,
					with_fwf:fwf
				}
			} else {
				if (yaer_data >= this_year) {
					uni.showToast({
						title: '最大选择' + this_year + '年',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}
				yaer_data = yaer_data + 1;
					if (yaer_data <= 2016) {
					this.service = false;
				}
				url = '/topprogram/get-total';
				All_data = {
					year:yaer_data,
					with_fwf:fwf
				}
			}
			this.yaer_data = yaer_data;
			gs_data = moment(gs_data).format('YYYY-MM-DD');
			this.all_bo(url, this, gs_data,All_data);
		},
		// 是否含服务费
		checkboxChange() {
			var is_show = this.service; // 是否含服务费
			var yaer_data = this.yaer_data; // 当前时间
			var gs_data = this.gs_data;
			var yaer_data = this.yaer_data;  // 当前年
			var fwf = '';
			if (yaer_data <= 2016) return false;
				if (is_show) {
				fwf = 0;
			} else {
				fwf = 1;
			}
			// 当前地区没有加 后边在加
			var url = '/topprogram/get-total';
			let All_data = {
				year:yaer_data,
				with_fwf:fwf
			}
			gs_data = moment(gs_data).format('YYYY-MM-DD');
			this.all_bo(url, this, gs_data,All_data);
			this.service = !is_show;
		},
		// 点击跟多的 小单元格
		more_index_data_tap(index) {
			// // 复制过来一份进行操作
			let zb_title = this.zb_title;
			// 如果点击当前的 按钮是 true  则 变为false
			if (zb_title[index].front_row) {
				zb_title[index].front_row = false;
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

				if (boer <= 4) {
					zb_title[index].front_row = true;
				}
			}
			// 定义变量 来计算 是否超过 规定数量

			this.zb_title = zb_title;
		},
		// // g跟多指标点击确定
		more_index_header_click() {
			this.is_index = true;
		},
		// g跟多指标点击
		show_index() {
			this.is_index = false;
		},
		// 总票房接口
		all_bo: async function(url, that, gs_data,All_data) {
			//  第三个形参 必须穿 YYYY-MM-DD  日期
			let userType  = await this.detection_validity()
			All_data['userType'] = userType;
			let {data:res}  = await this.$http.get({
				url,
				data:All_data
			})
			var sum = res.sum;
			var data = res.data;
			// console.log(ra)
			var session_zb = ''; // 场次占比
			var sy_data = ''; //是首映还是什么
			var total_zb = ''; //综合票房占比
			var total_seats_zb = ''; //排座占比
			
			let z_total_bo_s = (sum.total_bo_s / 10000).toFixed(2); //今日实时价格
			if (z_total_bo_s >= 100000) {
				z_total_bo_s = (z_total_bo_s / 10000).toFixed(2) + '亿';
			} else {
				z_total_bo_s = z_total_bo_s + '万';
			}
			that.office_num = z_total_bo_s;
			for (var i in data) {
				// 上映天数
				var start = data[i].publish_date;
				//    // 当前日期
				var gs_datas = moment(gs_data).valueOf();
				// //  获取当前时间戳
				var t = moment(start).valueOf();
				var time = moment(gs_datas - t);
				// // console.log(time +"____________");
				sy_data = time / 1000 / 60 / 60 / 24;
				// console.log(sy_data);
				//  计算上映天数
				if (sy_data == 0) {
					sy_data = '首映';
				}
				//  else if (sy_data >= 100) {
				//   sy_data = "重映";
				// }
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
				if (data[i].total_bo_s !== null) {
					var a = data[i].total_bo_s - 0;
					var b = sum.total_bo_s - 0;
					total_zb = ((a / b) * 100).toFixed(2);
					data[i].total_zb = total_zb; //综合票房占比
				}
				// 	//排场占比
				var session = data[i].session_s;
				var sessions = sum.session_s;
				if ((session / sessions) * 100 < 0.01) {
					session_zb = '<0.01%';
				} else {
					session_zb = ((session / sessions) * 100).toFixed(2) + '%';
				}
			
				//  场均人次
				var total_people_s = data[i].total_people_s;
				var session_s = data[i].session_s;
			
				total_people_s = (total_people_s / session_s).toFixed(0);
				if (total_people_s < 1) {
					total_people_s = 1;
				}
			
				// 	//  排座占比   后台暂时没有往回传值
				// console.log( data[i].seat_s);
				// console.log( sum.seat_s);
				var total_seat = data[i].seat_s;
				var total_seats = sum.seat_s;
				if ((total_seat / total_seats) * 100 < 0.01) {
					total_seats_zb = '<0.01%';
				} else {
					total_seats_zb = ((total_seat / total_seats) * 100).toFixed(2) + '%';
				}
			
				// console.log(total_seats_zb)
				data[i].seat_s = total_seats_zb; //排座占比
			
				var ljpf = data[i].totalBo;
				if (ljpf == null) {
					data[i].totalBo = '-';
				} else {
					ljpf = (ljpf / 100000000).toFixed(2); //累计票房;
					if (ljpf < 0.1) {
						ljpf = (data[i].totalBo / 10000).toFixed(2) + '万';
					} else {
						ljpf = (data[i].totalBo / 100000000).toFixed(2) + '亿';
					}
					data[i].totalBo = ljpf;
				}
			
				data[i].occupancy = (data[i].occupancy * 100).toFixed(2) + '%'; //上座率
				data[i].cj_people_s = total_people_s; //场均人次
				data[i].session_zb = session_zb; //排场占比
				data[i].sy_data = sy_data; //上映天数
			
				data[i].total_bo_s = (data[i].total_bo_s / 10000).toFixed(2);
				data[i].avg_price = Number(data[i].avg_price).toFixed(2)
			}
			// 平均票价/
			var avg_price = Number(sum.avg_price);
			sum.avg_price = avg_price.toFixed(2) + '元';
			//  上座率
			var occupancy = sum.occupancy;
			sum.occupancy = Number(occupancy * 100).toFixed(2) + '%';
			// 人次
			var total_people_s = sum.total_people_s / 10000;
			sum.total_people_s = total_people_s.toFixed(2) + '万';
			var session_s = sum.session_s / 10000;
			sum.session_s = session_s.toFixed(2) + '万';
			// console.log(ra.data);
			
			this.All_sum_data = res;
		},

		//档期票房接口
		dq_bo: async function(url, that,All_data) {
			let userType  = await this.detection_validity()
			All_data['userType'] = userType;
			let {data:res}  = await this.$http.get({
				url,
				data:All_data
			})
			for (var i in res.data) {
				res.data[i].total_bo_s = (res.data[i].total_bo_s / 10000).toFixed(2);
				res.data[i].avg_price = (res.data[i].avg_price - 0).toFixed(0);
				res.data[i].session_people = (res.data[i].total_people_s / res.data[i].session_s).toFixed(0);
			}
			this.tabThreeTbody = res.data;
		},

		// 大盘票房榜
		dp_bo: async  function(url, that,All_data) {
			let userType  = await this.detection_validity()
			All_data['userType'] = userType;
			let {data:res}  = await this.$http.get({
				url,
				data:All_data
			})
			console.log(res);
			for (var i in res.data) {
				res.data[i].total_bo_s = (res.data[i].total_bo_s / 10000).toFixed(2);
				res.data[i].session_s = (res.data[i].session_s / 10000).toFixed(2);
				res.data[i].total_people_s = (res.data[i].total_people_s / 10000).toFixed(2);
				var days = '';
				days = moment(res.data[i].bdate).format('d');
				if (days == 0) {
					days = '周日';
				} else if (days == 1) {
					days = '周一';
				} else if (days == 2) {
					days = '周二';
				} else if (days == 3) {
					days = '周三';
				} else if (days == 4) {
					days = '周四';
				} else if (days == 5) {
					days = '周五';
				} else if (days == 6) {
					days = '周六';
				}
			
				res.data[i].days = days;
			}
			this.tbody = res.data;
		},
		// 点击差 关闭地区

		page__bd_cc_click() {
			this.is_show = true;
		},
		dddd(e) {
			this.alpha = e;
		},
		// 头部tab点击
		Header_top_click(index) {
			var that = this;
			if (index == 0) {
				var this_year = this.yaer_data;
				var url = '/topprogram/get-total';
				let All_data = {
					year:this_year
				}
				var d = moment(new Date()).format('YYYY-MM-DD');
				this.all_bo(url, this, d,All_data);
			} else if (index == 1) {
				var url = '/topprogram/get-totallist2';
				let All_data = {
					dtype:'date'
				}
				that.dp_bo(url, that,All_data);
				this.time = 0;
			} else {
				var year = that.this_year;
				var url = '/topprogram/get-totalschedule';
				let All_data = {
					schedule:0,
					year:year,
					with_fwf:-1
				}
				that.dq_bo(url, that,All_data);
			}
			this.hader_data_index = index;
		},
		// tabone 年点击
		scroll_view_tap(index, item) {
			this.scroll_view_index = index;
			var yaer_data = this.yaer_data;
			var is_show = this.service;
			var gs_data = this.gs_data;
			var fwf = '';
			yaer_data = item;
			this.yaer_data = item;
			if (item == '全部') {
				item = 'all';
			} else {
				item = item;
			}
			if (is_show) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			console.log(item);	
			if (item<=2016) {
				this.service = false;
			}
			var url = '/topprogram/get-total';
			let All_data = {
				year:item,
				with_fwf:fwf
			}
			gs_data = moment(gs_data).format('YYYY-MM-DD');

			this.all_bo(url, this, gs_data,All_data);
		}
	}
};
</script>

<style lang="less">
@import url('./index.less');
// @import url('../Home/index.less');   ///  已经放到 index 文件中
@import url('./tabtow.less');
// tabthree
.dq_main {
	width: 750upx;
	height: 100%;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
	overflow: auto;
	view {
		padding: 0 20upx;
		font-size: 32upx;
		border-bottom: 1px solid #ccc;
		height: 80upx;
		line-height: 80upx;
	}
}

.year_main {
	width: 750upx;
	height: 100%;
	background: #fff;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 20;
}
.year_main view {
	padding: 0 20upx;
	font-size: 32upx;
	border-bottom: 1px solid #ccc;
	height: 80upx;
	line-height: 80upx;
}
.tab_year {
	display: flex;
	display: -webkit-flex;
	width: 750upx;
	height: 50upx;
}

.tab_year view {
	flex: 1;
	text-align: center;
	font-size: 28upx;
	font-weight: normal;
}
.tab_year view image {
	width: 22upx;
	height: 15upx;
	padding-left: 8upx;
	padding-bottom: 2upx;

}
// tabthree
.tabone {
	.babone_center {
		height: 60upx;
		background: rgba(255, 255, 255, 1);
		padding-left: 30upx;
		font-size: 24upx;
		font-family: PingFangSC;
		font-weight: 400;
		color: rgba(0, 0, 0, 1);
		display: flex;
		margin-top: 10upx;
		background-color: #fff;
		line-height: 60upx;
		view {
			color: #8e8e8e;
			padding-left: 20upx;
		}
	}
	.scroll-view {
		width: 100%;
		background-color: #fff;
		display: flex;
		display: -webkit-flex;
		white-space: nowrap;
		.scroll_view_header {
			width: 125upx;
			height: 80upx;
			display: inline-block;
			font-size: 26upx;
			font-family: PingFangSC;
			font-weight: 400;
			color: rgba(0, 0, 0, 1);
			box-sizing: border-box;
			padding-top: 30upx;
			padding-left: 30upx;
			view {
				width: 70upx;
				padding-bottom: 10upx;
			}
		}
		.active {
			border-bottom: 1px solid #f08e2d;
			color: #f08e2d;
		}
	}
}
.Header_top {
	display: flex;
	height: 60upx;
	width: 750upx;
	margin-bottom: 10upx;
	background-color: #fff;
	view {
		font-size: 28upx;
		width: 33.33%;
		display: flex;
		justify-content: center;
		align-items: center;
		text{
			display: inline-block;
			height: 60upx;
			line-height: 60upx;
		}
	}
	.active {
		color: rgba(240, 142, 45, 1);
		border-bottom: 2upx solid rgba(240, 142, 45, 1);
	}
}
</style>
