<template>
	<view>
		<!-- 上座率 -->
		<view class="tabfour" :hidden="!(tabindex == 3)">
			<view class="tab_data">
				<view @tap="tabfour_qhclick(0)">
					<image src="../../static/big-plate/previous.png" mode=""></image>
					前一天
				</view>
				<view @tap="tab_four_click">
					{{ tabfouritem_data | item_filter }}
					<image src="../../static/big-plate/xia.png" mode=""></image>
				</view>
				<view @tap="tabfour_qhclick(1)">
					后一天
					<image src="../../static/big-plate/next.png" mode=""></image>
				</view>
			</view>
			<!-- 地区选择开启按钮 -->
			<view class="tabfour_city" @tap="tab_fourIshow()">
				{{ tabfour_city_data }}
				<image src="../../static/big-plate/xia.png" mode=""></image>
			</view>
			<!-- 影片抬头 -->
			<view class="tabfour_data_header">
				<view v-for="(item, index) in tabfour_data_header" :key="index">{{ item }}</view>
			</view>
			<view class="tabfour_data">
				<view class="tabfour_data_data" v-for="(item, index) in tabfour_Alldata" :key="index">
					<view class="tabfour_data_name">{{ item.movie_name_process }}</view>
					<view class="tabfour_data_szl">
						{{ item.occupancy }} %
						<view class="" :style="{ width: item.occupancy_view + 'px' }"></view>
					</view>
					<view class="tabfour_data_rc">
						{{ item.avg_session }}
						<view class="" :style="{ width: item.avg_session_view + 'px' }"></view>
					</view>
				</view>
			</view>

			<!-- 日历插件	 -->
			<view class="ei_calendar_wai" :hidden="!tab_four_show">
				<view @tap="ei_calendar_wai_click(3)" class="ei_calendar_wai_cha">×</view>
				<ei-calendar
					type="single"
					:drawer="false"
					:visible.sync="tab_four_show"
					:disabledDate="tab_four_disabledDate"
					v-model="tab_four_date"
					:custom-date="tab_four_customDate"
					format="YYYY-MM-DD"
					@click="tab_four_ei_calendar"
				></ei-calendar>
				<scroll-view class="ei_calendar_view" scroll-y></scroll-view>
			</view>

			<!-- 日历插件 -->

			<!-- 地区选择 -->
			<view class="city_sel" :style="{ top: 0 + 'px' }" :hidden="tab_four_is_show">
				<view class="page__bd">
					<!-- 选择城市 -->
					<view class="" v-if="inputVal.length <= 0">
						<!-- catchtouchstart="handlerAlphaTap" -->
						<view id="border_he" class="alphanet-selector" catchtouchmove="handlerMove">
							<!-- data-ap="{{item}}" -->
							<view v-for="(it, index) in zm_right" :key="index" @tap="tab_fourdddd(it)" class="selector-one">{{ it }}</view>
						</view>
						<!-- 地区选择 
							* :style="{ height: winHeight + 'px' }"
							* -->
						<scroll-view class="page__view" scroll-y :scroll-into-view="tab_fouralpha">
							<view @tap="page__view_cha_tap(2)" class="page__view_cha">×</view>
							<!-- 区域 -->
							<view class="title">区域</view>

							<view class="page__bd">
								<view class="weui-grids">
									<block v-for="(it, index) in qy" :key="index">
										<view class="weui-grid" @tap="tab_fourclick_grid(it)" :data-name="item" hover-class="weui-grid_active">
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
										<view class="weui-grid" @tap="tab_fourclick_grid(it)" :data-name="it" hover-class="weui-grid_active">
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
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tab_fourclick_city(vv)" class="section-item-cells">
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
		</view>

		<!-- 上座率 -->
	</view>
</template>

<script>
import EiCalendar from '@/components/ei-calendar/ei-calendar';
import {mapState} from 'vuex'
// 时间格式化
import moment from '@/components/moment';
export default {
	components:{
		EiCalendar
	},
	data() {
		return {
			zm_list: [], // 地区
			// 热门城市
			rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			inputVal:'',
			tab_four_show: false,
			tab_four_date: '',
			tab_four_disabledDate: ['2019-7-19'], // 当前日期
			tab_four_customDate: [
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
			tabfouritem_data: '2019-07-11', // 时间
			tabfouritem_data_xy: '2019-07-11', // 时间
			tabfourheader: true,
			tabfour_city_data: '全国', // 当前城市 显示用的
			tabfour_city: '全国', // 当前城市
			tabfour_district: '', // 几线城市
			tabfour_data_header: ['影片名称', '上座率', '场均人次'],
			tabfour_Alldata: [], // four列表所有数据
			tab_four_is_show: true, // 地区显示控制
			tab_fouralpha: '', //  地区旁边按钮控制
		}
	},
	filters:{
		//  格式化时间年月日
		item_filter(date) {
			//  格式化日期
			let item = date;
			let iitem = item.split('-');
			iitem = iitem[0] + '年' + iitem[1] + '月' + iitem[2] + '日';
			if (iitem == undefined && iitem == null) {
				return '---';
			} else {
				return iitem;
			}

			// 格式化日期结束
		}
	},
	computed:{
		...mapState({tabindex:'bigPlate_tabIndex'}),
	},
	watch:{
		tabindex(){
			if (this.tabindex != 3) return false
			//  初始化 ftabfor 时间
			var gs_data = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			this.tabfouritem_data = gs_data;
			this.tabfouritem_data_xy = gs_data;
			this.tabtowheader = true;
			this.tabthreeheader = true;
			//  初始化时间
			// 初始化数据
			this.tabfour_initialize();
			this.dataMap()
		}
	},
	methods: {
		// 初始化 地区表
		async dataMap() {
			let that = this;
			let {data:zm_list} = await this.$http.get({
				url: '/advancedbo/get-citylist'
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
					mzmlist.push({
						letter: a,
						childer: region
					});
				}
			}
			this.zm_list = mzmlist;
		},
		// 大盘上座率地区关闭
		page__view_cha_tap(index) {
			if (index == 1) {
				this.is_show = true;
				this.positionStyle = '';
				this.positionTop = '';
			} else {
				this.tab_four_is_show = true;
			}
		},
		// 日历插件关闭
		ei_calendar_wai_click(index) {
			if (index == 0) {
				this.tab_one_show = false;
				this.positionStyle = '';
				this.positionTop = '';
			} else if (index == 1) {
				this.tab_tow_show = false;
			} else if (index == 2) {
				this.tab_three_show = false;
			} else if (index == 3) {
				this.tab_four_show = false;
			}
		},
		// tab_four 日历选择
		tab_four_ei_calendar(e) {
			// console.log(this.tabTowitem_data);
			// 没有时段
			var city = this.tabfour_city; // 当前城市
			var district = this.tabfour_district; //  几线城市

			var date = this.tabfouritem_data_xy; // 当前时间
			// return false
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
			var date_year = moment()
				.subtract(0, 'days')
				.format('YYYY');
			var date_month = moment()
				.subtract(0, 'days')
				.format('MM');
			var date_day = moment()
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
			//  当前点击的年月日
			var month = e.month;
			var day = e.day;
			var year = e.year;
			var year_click = e.format.slice(0, 4);
			var month_click = e.format.slice(5, 7);
			var day_click = e.format.slice(8, 10);
			var item_date = year_click + '-' + month_click + '-' + day_click; // 当前点击的时间
			var e_item = Number(year_click + month_click + day_click); // 当前点击的
			var one_five_item = Number(one_five_year + '' + one_five_month + one_five_day); // 15天之后的
			var item = Number(date_year + '' + date_month + date_day); // 当前的
			var Br_one = item - e_item; // 当前点击的 日期数
			var Br_tow = item - one_five_item; // 15天之后 减下来的数据
			console.log(Br_one,Br_tow,one_five_item,item);

			if (Br_one > Br_tow) {
				if (city == '全国') {
					city = '';
				}
				var url = '/topprogram/get-occupancy';
				let All_data = {
					city: city,
					district: district,
					date: item_date
				};
				this.tabfour_index(url, All_data);
				this.tab_four_date = item_date;
				this.tabfouritem_data = item_date;
				this.tab_four_show = false;
			} else {
				uni.showToast({
					title: '最多往后选15天',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		// 开启 日历
		tab_four_click() {
			// console.log(1);
			this.tab_four_show = true;
		},
		// tab_tow 日历选择

		// 开启 日历


		// tab_ one  日历

		//  tabfour
		//  点击前后天 修改数据
		tabfour_qhclick(vv) {
			// 0 是前一天  1 是后一天
			var index = vv;
			var tabfouritem_data = this.tabfouritem_data; //  获取当前时间 进行加工
			var tabfour_city = this.tabfour_city; // 当前保存的城市 // 获取当前 地区 获取这是 城市和几线城市
			var tabfour_district = this.tabfour_district; // 当前保存的几线城市
			var city = '';
			var data = ''; // 保存时间
			//  如果是全国的话直接传 ’‘
			if (tabfour_city == '全国') {
				city = '';
			} else {
				city = tabfour_city;
			}
			let All_data = {};
			if (index == 0) {
				data = moment(tabfouritem_data)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
				var url = '/topprogram/get-occupancy';
				All_data = {
					city: city,
					district: tabfour_district,
					date: data
				};
				this.tab_four_date = data;
				this.tabfour_index(url, All_data);
			} else if (index == 1) {
				data = moment(tabfouritem_data)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
				var url = '/topprogram/get-occupancy';
				All_data = {
					city: city,
					district: tabfour_district,
					date: data
				};
				this.tab_four_date = data;
				this.tabfour_index(url, All_data);
			}
			this.tabfouritem_data = data;
		},
		// 点击热门城市 和 区域
		tab_fourclick_grid(name) {
			var tabfouritem_data = this.tabfouritem_data; // 获取时间
			var tabfour_city_data = this.tabfour_city_data; // 获取当前显示城市

			var tabfour_city = this.tabfour_city; // 获取当前保存的城市 不显示只进行请求

			var district = this.tabfour_district;
			var district_name = '';
			var city = '';
			var city_name = ''; // 如果等于全国的时候 保存得值
			if (name.indexOf('线城市') != -1) {
				district_name = name;
				city = '';
			} else if (name.indexOf('全国') != -1) {
				district_name = '';
				city = '';
				city_name = '全国';
			} else {
				district_name = '';
				city = name;
			}

			var url = '/topprogram/get-occupancy';
			let All_data = {
				city: city,
				district: district_name,
				date: tabfouritem_data
			};
			this.tabfour_index(url, All_data);
			this.tabfour_district = district_name;
			if (name.indexOf('全国') != -1) {
				this.tabfour_city_data = city_name;
				this.tabfour_city = city_name;
				this.tabfour_district = district_name;
			} else if (name.indexOf('线城市') != -1) {
				this.tabfour_city_data = district_name;
				this.tabfour_district = district_name;
				this.tabfour_city = '';
			} else {
				this.tabfour_city_data = city;
				this.tabfour_city = city;
				this.tabfour_district = district_name;
			}

			this.tab_four_is_show = true;
		},
		//  点击城市
		tab_fourclick_city(name) {
			var tabfouritem_data = this.tabfouritem_data; // 获取时间
			var tabfour_city_data = this.tabfour_city_data; // 获取当前显示城市

			var tabfour_city = this.tabfour_city; // 获取当前保存的城市 不显示只进行请求
			var city = name;

			var url = '/topprogram/get-occupancy';
			let All_data = {
				city: city,
				date: tabfouritem_data
			};
			this.tabfour_index(url, All_data);
			this.tabfour_city = name;
			this.tabfour_city_data = name;
			this.tab_four_is_show = true;
		},
		//  地区旁边字母点击跳转
		tab_fourdddd(it) {
			this.tab_fouralpha = it;
		},
		//  地区点击弹出
		tab_fourIshow() {
			this.tab_four_is_show = false;
		},
		// tabfour 初始化
		tabfour_initialize() {
			var city = this.tabfour_city; // 当前城市
			var district = this.tabfour_district; //  几线城市

			var date = this.tabfouritem_data_xy; // 当前时间
			if (city == '全国') {
				city = '';
			}
			var url = '/topprogram/get-occupancy';
			let All_data = {
				city: city,
				district: district,
				date: date
			};
			this.tabfour_index(url, All_data);
			this.tabfouritem_data = date;
		},
		// tabfou 接口调用
		async tabfour_index(url, All_data) {
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let { data: res } = await this.$http.get({
				url,
				data: All_data
			});
			res = res.map(item => {
				// 上座率占比
				if (item.occupancy < 5) {
					item.occupancy_view = (item.occupancy * 16.4) / 1.5;
				} else if (item.occupancy < 10) {
					item.occupancy_view = (70 + item.occupancy * 2.4) / 1.5;
				} else if (item.occupancy < 15) {
					item.occupancy_view = (84 + item.occupancy) / 1.5;
				} else if (item.occupancy >= 15) {
					item.occupancy_view = 100 / 1.5;
				}
				// 人次占比
				if (item.avg_session < 5) {
					item.avg_session_view = (item.avg_session * 16.4) / 1.5;
				} else if (item.avg_session < 10) {
					item.avg_session_view = (70 + item.avg_session * 2.4) / 1.5;
				} else if (item.avg_session < 15) {
					item.avg_session_view = (84 + item.avg_session) / 1.5;
				} else if (item.avg_session >= 15) {
					item.avg_session_view = 100 / 1.5;
				}
				if (item.movie_name.length > 9) {
					item.movie_name_process = item.movie_name.slice(0, 9) + '...';
				} else {
					item.movie_name_process = item.movie_name;
				}

				return item;
			});
			this.tabfour_Alldata = res;
		},
	}
}
</script>

<style></style>
