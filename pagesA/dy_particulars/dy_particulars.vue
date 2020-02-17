<template>
	<view class="pa">
		<!-- 影片详情 -->
		<!-- -->
		<cover-view class="headr_fixd" :hidden="headr_fixd_Br">
			<!--  :class="[headr_fixd_index == index ? 'active' : '']" -->
			<cover-view @tap="tz_list(item)" v-for="(item, index) in headr_fixd_data"
			 :key="index">
				{{ item }}
			</cover-view>
		</cover-view>
		<!-- <canvas id="canvas_ren" canvas-id="canvas_ren"></canvas> -->
		<!-- <scroll-view @scroll="scroll" :style="{height:windowHeight + 'px'}" class="scroll_view" scroll-y> -->
		<!-- 介绍部分 数据 -->
		<view :hidden="show" class="header_top" id="pf_data">
			<view class="header_top_header">
				<view class="header_top_image">
					<image :src="'https://db.topcdb.com' + message_data.movie_img" mode=""></image>
				</view>
				<!-- 名字 -->
				<view class="header_top_data">
					<view class="header_top_data_name">
						<view class="header_top_data_name_t">
							<view class="header_top_data_name_one">{{ message_data.zz_name }}</view>
							<view class="header_top_data_name_tow">
								<view :key="index" v-for="(item, index) in message_data.version">{{ item }}</view>
							</view>
						</view>
						<!-- <text></text> -->
						<view class="header_top_data_egls">{{ message_data.en_name }}</view>
					</view>

					<view class="header_top_data_bottom">
						<view class="">{{ message_data.material }}</view>
						<view class="">{{ message_data.country }} | {{ message_data.filmLength }}分钟</view>
						<view class="">{{ message_data.publish_date }}<!-- ({{ message_data.country }}) --></view>
					</view>
				</view>
			</view>

			<!-- 数据展示 -->
			<view class="header_top_center">
				<view class="center_one">
					<view class="header_top_center_one" @tap="tz_list('票房数据')">
						<view>票房数据</view>
						<image src="../../static/dy_particulars/next.png" mode=""></image>
					</view>
					<view class="header_top_center_tow">
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.total_bo }}</view>
							<view>累计票房</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.total_bo_s }}</view>
							<view>今日票房</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.firstday_bo }}</view>
							<view>首日票房</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.firstweek_bo }}</view>
							<view>首周票房</view>
						</view>
					</view>
				</view>

				<!-- 预排预售 -->
				<view class="center_tow">
					<view class="header_top_center_one" @tap="tz_list('预排预售')">
						<view>预排预售</view>
						<image src="../../static/dy_particulars/next.png" mode=""></image>
					</view>
					<view class="header_top_center_tow">
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.session_s }}</view>
							<view>今日预排场</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.session_s_s }}</view>
							<view>今日排场占比</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.firstday_session }}</view>
							<view>首日场次</view>
						</view>
						<view class="header_top_center_tow_bottom">
							<view>{{ message_data.firstday_session_s }}</view>
							<view>首日场次占比</view>
						</view>
					</view>
				</view>

				<!-- {{message_data.xk_wantwatch_up_Br}} -->
				<!-- 营销数据 -->
				<view class="center_three">
					<view class="header_top_center_one" @tap="tz_list('营销数据')">
						<view>
							<view>营销数据</view>
							<view>{{time_data}}</view>
						</view>
						<image src="../../static/dy_particulars/next.png" mode=""></image>
					</view>
					<view class="header_top_center_tow">
						<view class="header_top_center_tow_bottom">
							<view>想看指数</view>
							<view>
								<!-- //  保留 true 为 负值 false 为正值 -->
								<view v-if="!message_data.xk_wantwatch_up_Br">↑</view>
								<view v-if="message_data.xk_wantwatch_up_Br">↓</view>
								<view>{{ message_data.xk_wantwatch_up }}%</view>
							</view>
							<view>（{{ message_data.xk_wantwatch_up_all }}）</view>
						</view>

						<view class="header_top_center_tow_bottom">
							<view>微博指数</view>
							<view>
								<!-- //  保留 true 为 负值 false 为正值 -->
								<view v-if="!message_data.weibokw_Br">↑</view>
								<view v-if="message_data.weibokw_Br">↓</view>
								<view>{{ message_data.weibokw_value }}%</view>
							</view>
							<view>（{{ message_data.weibokw[0].value }}）</view>
						</view>

						<view class="header_top_center_tow_bottom">
							<view>微信指数</view>
							<view>
								<!-- //  保留 true 为 负值 false 为正值 -->
								<view v-if="!message_data.weixin_Br">↑</view>
								<view v-if="message_data.weixin_Br">↓</view>
								<view>{{ message_data.weixin_value }}%</view>
							</view>
							<view>（{{ message_data.weixin[0].value }}）</view>
						</view>

						<view class="header_top_center_tow_bottom">
							<view>百度指数</view>
							<view>
								<!-- //  保留 true 为 负值 false 为正值 -->
								<view v-if="!message_data.baidukw_Br">↑</view>
								<view v-if="message_data.baidukw_Br">↓</view>
								<view>{{ message_data.baidukw_value }}%</view>
							</view>
							<view>（{{ message_data.baidukw[0].value }}）</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 票房数据  -->
		<view class="pf_data" >
			<!-- 日排场 日票房  -->
			<view class="canvas_data">
				<view class="canvas_data_header">
					<view @tap="canvas_data_header_click(index)" :class="[index == canvas_data_header_index ? 'active' : '']" v-for="(item, index) in canvas_data_header_data"
					 :key="index">
						{{ item }}
					</view>
				</view>
		
			</view>
			<!-- disable-scroll="true" -->
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts"  @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
		
		
			<view class="three_title">
				<block v-for="(itme,i) in three_title_data" :key="i">
					<view @tap="three_title_click(i)">
		
						{{itme}}
						<image src="../../static/big-plate/next.png" mode=""></image>
					</view>
		
				</block>
		
			</view>
			<view class="button">
				<view class="buttonH">
					<view class="buttonHone">票房明细</view>
					<view class="buttonHtow" @tap="show_index">
						<!-- <text></text> -->
						<image src="../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					<view>影片</view>
					<!-- <view></view> -->
					<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
				<view class="buttom_header">
					<view class="buttom_header_one">总计</view>
					<view class="buttonB_Headerson_pf">
						<!-- 票房   -->
						<view :hidden="!zb_title[0].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.real_bo_s }}</view>
						<!-- 票房占比    -->
						<view :hidden="!zb_title[1].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.realbo_rate }}%</view>
						<!-- 场次    -->
						<view :hidden="!zb_title[2].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.session_s }}</view>
						<!-- 平均票价    -->
						<view :hidden="!zb_title[3].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.avg_price }}</view>
						<!-- 排场占比    -->
						<view :hidden="!zb_title[4].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.session_rate }}%</view>
						<!-- 排座占比    -->
						<view :hidden="!zb_title[5].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.seat_rate }}%</view>
						<!-- 人次    -->
						<view :hidden="!zb_title[6].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.total_people_s }}</view>
						<!-- 场均人次    -->
						<view :hidden="!zb_title[7].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.people_per_session }}</view>
						<!-- 上座率    -->
						<view :hidden="!zb_title[8].front_row  || !front_row_index == 0">{{ yp_ys_zxt_data.sum.occupancy }}%</view>
						
						
						<!-- 场次 -->
						<view :hidden="!zb_title[0].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.session_s }}</view>
						<!--排场占比  -->
						<view :hidden="!zb_title[1].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.session_rate }}%</view>
						<!--人次  -->
						<view :hidden="!zb_title[2].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.total_people_s }}</view>
						<!--场均人次  -->
						<view :hidden="!zb_title[3].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.people_per_session }}</view>
						<!--票房  -->
						<view :hidden="!zb_title[4].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.real_bo_s }}</view>
						<!--票房占比 -->
						<view :hidden="!zb_title[5].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.realbo_rate }}%</view>
						<!--上座率  -->
						<view :hidden="!zb_title[6].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.occupancy }}%</view>
						<!--排座占比  -->
						<view :hidden="!zb_title[7].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.seat_rate }}%</view>
						<!--平均票价  -->
						<view :hidden="!zb_title[8].front_row  ||  !front_row_index == 1 ">{{ yp_ys_zxt_data.sum.avg_price }}</view>
					</view>
				</view>
				<!-- @tap="nagitto(it.movie_id_r, it.zz_id)" -->
				<view class="buttonB" v-for="it in yp_ys_zxt_data.movieList" :key="it.gp_id">
					<view class="buttonB_Headerson">
						<view class="buttonB_Headerson_name">{{ it.bdate }}</view>
		
						<view class="buttonB_Headersn1">
							<view :style="{ color: '#F08E2D' }">{{ it.weekend }}</view>
							{{ it.time_skx }}
							<view :style="{ color: '#44D7B6' }">{{ it.time_condition }}</view>
						</view>
					</view>
					<view class="buttonB_Headerson_pf">
						<!-- 票房   -->
						<view :hidden="!zb_title[0].front_row  || !front_row_index == 0">{{ it.real_bo_s }}</view>
						<!-- 票房占比    -->
						<view :hidden="!zb_title[1].front_row  || !front_row_index == 0">{{ it.realbo_rate }}%</view>
						<!-- 场次    -->
						<view :hidden="!zb_title[2].front_row  || !front_row_index == 0">{{ it.session_s }}</view>
						<!-- 平均票价    -->
						<view :hidden="!zb_title[3].front_row  || !front_row_index == 0">{{ it.avg_price }}</view>
						<!-- 排场占比    -->
						<view :hidden="!zb_title[4].front_row  || !front_row_index == 0">{{ it.session_rate }}%</view>
						<!-- 排座占比    -->
						<view :hidden="!zb_title[5].front_row  || !front_row_index == 0">{{ it.seat_rate }}%</view>
						<!-- 人次    -->
						<view :hidden="!zb_title[6].front_row  || !front_row_index == 0">{{ it.total_people_s }}</view>
						<!-- 场均人次    -->
						<view :hidden="!zb_title[7].front_row  || !front_row_index == 0">{{ it.people_per_session }}</view>
						<!-- 上座率    -->
						<view :hidden="!zb_title[8].front_row  || !front_row_index == 0">{{ it.occupancy }}%</view>
						
						
						<!-- 场次 -->
						<view :hidden="!zb_title[0].front_row  ||  !front_row_index == 1 ">{{ it.session_s }}</view>
						<!--排场占比  -->
						<view :hidden="!zb_title[1].front_row  ||  !front_row_index == 1 ">{{ it.session_rate }}%</view>
						<!--人次  -->
						<view :hidden="!zb_title[2].front_row  ||  !front_row_index == 1 ">{{ it.total_people_s }}</view>
						<!--场均人次  -->
						<view :hidden="!zb_title[3].front_row  ||  !front_row_index == 1 ">{{ it.people_per_session }}</view>
						<!--票房  -->
						<view :hidden="!zb_title[4].front_row  ||  !front_row_index == 1 ">{{ it.real_bo_s }}</view>
						<!--票房占比 -->
						<view :hidden="!zb_title[5].front_row  ||  !front_row_index == 1 ">{{ it.realbo_rate }}%</view>
						<!--上座率  -->
						<view :hidden="!zb_title[6].front_row  ||  !front_row_index == 1 ">{{ it.occupancy }}%</view>
						<!--排座占比  -->
						<view :hidden="!zb_title[7].front_row  ||  !front_row_index == 1 ">{{ it.seat_rate }}%</view>
						<!--平均票价  -->
						<view :hidden="!zb_title[8].front_row  ||  !front_row_index == 1 ">{{ it.avg_price }}</view>
					</view>
				</view>
			</view>
			<!-- </view> -->
		
		</view>
		
		<!-- 票房明细 -->
		
		<!-- 跟多指标 -->
		<scroll-view scroll-y class="more" :hidden="is_index">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header">
					<view class="" @tap="more_index_header_click">确定</view>
				</view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index, 0)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
					</view>
				</view>
			</view>
		</scroll-view>
		
		
		
	</view>
</template>

<script>
	import moment from '@/components/moment';
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	import UcHarts from '@/components/ucharts_dome/publicity_cavas';
	var _self;
	var canvaLineA = null;
	export default {
		onShareAppMessage(){},
		data() {
			return {
				front_row_index:0,
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				is_index:true,
				yp_ys_zxt_data: {
					sum: {
						avg_price: "35.76",
						bdate: "2019-09-01",
						bo_rate: "0.570768",
						mid: "7295",
						movie_name: "速度与激情：特别行动",
						occupancy: "13.42",
						people_per_session: "19",
						publish_date: "2019-08-23",
						real_bo_s: "91465.05",
						realbo_rate: "57.01",
						seat_rate: "44.23",
						session_rate: "36.18",
						session_s: "1428093",
						total_bo_s: "991373422.14",
						total_people_s: "27719116",
						total_seats: "206285199",
						zz_id: "21493"
					},
					movieList: [
					]
				},
				zb_title:  [{
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
					},{
						zb_name: '场次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '平均票价',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '排场占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},  {
						zb_name: '排座占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},{
						zb_name: '人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},  {
						zb_name: '场均人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},{
						zb_name: '上座率',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					}
					
				],
				three_title_data: ['城市票房', '影投票房', '影院票房'],
				canvas_data_header_index: 0, // 折线图默认选中
				canvas_data_header_data: ['日票房', '日排场'],
				time_data: '2019-08-08', // 营销数据时间
				
				message_data: {
					age: '--',
					baidukw: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					baidukw_Br: true,
					baidukw_value: '--',
					country: '--',
					country1: '',
					country2: '',
					douban_score: '--',
					en_name: '--',
					filmLength: '--',
					firstday_bo: '--',
					firstday_people: '--',
					firstday_session: '--',
					firstday_session_s: '--',
					firstweek_bo: '--',
					firstweek_session: '--',
					firstweekend_people: '--',
					id: '7295',
					import_mode: '--',
					maoyan_score: '--',
					material: '--',
					movie_img: '',
					// /uploads/movie_thumb/5/5_300X500_7295_a9ba173e.jpg
					people: '--',
					publish_date: '--',
					real_bo: '--',
					session: '--',
					sessionSum: '--',
					session_s: '--',
					session_s_s: '--',
					total_bo: '----',
					total_bo_s: '--',
					tpp_score: '--',
					type: '--',
					version: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					wantwatch: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					weibokw: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					weibokw_Br: false,
					weibokw_value: '--',
					weixin: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					weixin_Br: true,
					weixin_value: '--',
					xk_wantwatch_up: '--',
					xk_wantwatch_up_Br: false,
					zz_id: '--',
					zz_name: '--'
				}, // 当前也免得页面信息
				windowHeight: '', // 当前手机屏幕的高度
				headr_fixd_Br: true, //顶部tab 控制
				headr_fixd_index: 0, //顶部tab 点击样式控制
				headr_fixd_data: ['票房数据', '营销数据', '目标受众', '营销事件'] // 顶部定位显示的数据
			};
		},
		created() {
			// 初始化营销数据 显示时间/
			var date = new Date();
			var year = date.getFullYear();
			var month = date.getMonth() + 1;
			var r = date.getDate() -1;
			console.log(year,month,r);
			this.time_data = `${year}-${month}-${r}`
		},
		onLoad(res) {
			let {
				id: id,
				mid: mid
			} = res;
			// id 专资id
			// mid 我们的id
			this.res_id = res;
			var url = '/topprogram/movie-main'
			let All_data = {
				id:id,mid:mid
			}
			this.yp_index(url,All_data);
			// 获取当前屏幕高度
			// var res = wx.getSystemInfoSync();
			// this.windowHeight = res.windowHeight; // 获取当前屏幕高度
			// this.windowWidth = res.windowWidth; // 获取当前屏幕高度
			// this.car_scrollr_hei = res.windowHeight - 356
			// 图表
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
			_self = this;
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			
			var url = '/topprogram/movie-mainjs'
			let All_data_tow = {
				id:id,
				mid:mid
			}
			this.ypys_index(url, this,All_data_tow);
			
		},
		onPageScroll(e) {
			// console.log(e);
			var heigth = e.scrollTop
			if (e.scrollTop > 50) {
				this.headr_fixd_Br = false;
			} else {
				this.headr_fixd_Br = true;
			}
		},
		methods: {
			three_title_click(index){
				var res = this.res_id;
				let {
					id: id,
					mid: mid
				} = res;
				// id 专资id
				// mid 我们的id
				
					uni.navigateTo({
						url:'./all_bo/all_bo?id=' +id +'&mid=' + mid + '&index=' + index
					})
			},
			canvas_data_header_click(index) {
				var ra = this.yp_ys_zxt_data;
				let LineA = {
					categories: [],
					series: [{
						name: '',
						data: [],
						color: '#F68C3E'
					}]
				};
				
				// 票房、票房占比、场次、场次占比、排座占比、人次、场均人次、平均票价、上座率
				var zb_title =  [{
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
					},{
						zb_name: '场次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '平均票价',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '排场占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},  {
						zb_name: '排座占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},{
						zb_name: '人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},  {
						zb_name: '场均人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},{
						zb_name: '上座率',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					}
					
				];
				
				var zb_title_tow =  [
					{
						zb_name: '场次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					}, {
						zb_name: '排场占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					}, {
						zb_name: '人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '场均人次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},{
						zb_name: '票房',
						two_title: '(万元)',
						is_check: '',
						no_check: '分账',
						front_row: false
					},
					{
						zb_name: '票房',
						two_title: '占比',
						is_check: '',
						no_check: '分账',
						front_row: false
					},{
						zb_name: '上座率',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					},{
						zb_name: '排座占比',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					}  ,{
						zb_name: '平均票价',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					} 
					
				];
				
				var movieJs = ra.movieJs;
				LineA.categories = movieJs.xA;
				if (index == 0) {
					movieJs.total_data.forEach(item => {
						item = Number(item);
						// console.log(item);
						item = (item / 10000).toFixed(2)
						LineA.series[0].data.push(item);
					});
					LineA.series[0].name = '日票房';
					this.front_row_index = 0;
					this.zb_title = zb_title
				} else if (index == 1) {
					movieJs.session_data.forEach(item => {
						item = Number(item);
						LineA.series[0].data.push(item);
					});
					// console.log(movieJs);
					LineA.series[0].name = '日排场';
					this.front_row_index = 1;
					this.zb_title = zb_title_tow;
				}
				_self.showLineA('canvasLineA', LineA);
				this.canvas_data_header_index = index;
			},
			// 折线图 预排预售数据
			async ypys_index(url, that,All_data) {
				let	userType = await  this.detection_validity()
				All_data['userType'] = userType;
				let res = await this.$http.get({
					url,
					data:All_data
				})
				var ra = res.data;
				// 图表数据
			
				let LineA = {
					categories: [],
					series: [{
						name: '',
						data: [],
						color: '#F68C3E'
					}]
				};
				var movieJs = ra.movieJs;
				LineA.categories = movieJs.xA;
				var arr = [];
				movieJs.total_data.forEach(item => {
					item = Number(item);
					item = (item / 10000).toFixed(0)
					LineA.series[0].data.push(item);
				});
				// console.log(movieJs);
				LineA.series[0].name = '日票房';
				var movieList = ra.movieList;
				// console.log(movieList);
				movieList.forEach((item, i) => {
					// 平均票价
					movieList[i].avg_price = Number(movieList[i].avg_price).toFixed(2);
			
					// 上座率
					movieList[i].occupancy = (movieList[i].occupancy * 100).toFixed(2);
			
					// 排座占比
					movieList[i].seat_rate = (movieList[i].seat_rate * 100).toFixed(2);
			
					// 场次  有  session_s
			
					// 场均人次
					movieList[i].people_per_session = Number(movieList[i].people_per_session).toFixed(0);
			
					// 排场占比
					movieList[i].session_rate = (movieList[i].session_rate * 100).toFixed(2);
			
					// 人次 total_people_s
			
					// 票房占比
					movieList[i].realbo_rate = (movieList[i].realbo_rate * 100).toFixed(2);
			
					// 票房
					// console.log(movieList[i] );
					movieList[i].real_bo_s = (movieList[i].real_bo_s / 10000).toFixed(2);
					// 上映多少天
					var big_tiem = moment(movieList[i].bdate).valueOf();
					var bittle_time = moment(movieList[i].publish_date).valueOf();
					var time = moment(new Date()).format('YYYY-MM-DD');
					time = moment(time).valueOf();
					
					
					var time_skx = (big_tiem - bittle_time) / 1000 / 60 / 60 / 24;
					var time_condition = '';
					if (time_skx == 0) {
						time_skx = '首映日';
						time_condition = '';
					} else if (time_skx < 0) {
						time_condition = '';
						time_skx = '映前' + Math.abs(time_skx) + '天';
					} else {
						time_skx = '映后' + (time_skx + 1) + '天';
						// console.log(big_tiem,'---------big_tiem');
						var time_s = time - big_tiem;
						// console.log(time - big_tiem);
						if (time_s == 0) {
							time_condition = '实时';
						} else if (time_s < 0) {
							time_condition = '预售';
						} else if (time_s > 0) {
							// time_condition = '预售'
						}
					}
			
					movieList[i].time_condition = time_condition;
					movieList[i].time_skx = time_skx;
				});
			
				// 平均票价
				ra.sum.avg_price = Number(ra.sum.avg_price).toFixed(2);
			
				// 上座率
				ra.sum.occupancy = (ra.sum.occupancy * 100).toFixed(2);
			
				// 排座占比
				ra.sum.seat_rate = (ra.sum.seat_rate * 100).toFixed(2);
			
				// 场次  有  session_s
			
				// 场均人次
				ra.sum.people_per_session = Number(ra.sum.people_per_session).toFixed(0);
			
				// 排场占比
				ra.sum.session_rate = (ra.sum.session_rate * 100).toFixed(2);
			
				// 人次 total_people_s
			
				// 票房占比
				ra.sum.realbo_rate = (ra.sum.realbo_rate * 100).toFixed(2);
			
				// 票房
				// console.log(ra.sum );
				ra.sum.real_bo_s = (ra.sum.real_bo_s / 10000).toFixed(2);
				// 上映多少天
				var big_tiem = new Date(ra.sum.bdate).valueOf();
				var bittle_time = new Date(ra.sum.publish_date).valueOf();
			
				console.log(ra);
				this.yp_ys_zxt_data = ra;
				_self.showLineA('canvasLineA', LineA);
			},
			// 折线图
			showLineA(canvasId, chartData) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
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
						disabled: false,
						disableGrid: true,
						type: 'grid',
						gridType: 'solid',
						itemCount: 4, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'left'
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						// disabled:true
						data: [{
							position: 'left'
						}],
						gridType: 'solid',
						splitNumber: 5,
						min: 10,
						max: 5000,
						format: val => {
							return val;
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
			// 票房显示 的字
			more_index_data_tap(index, num) {
				// console.log(data);
				// // 复制过来一份进行操作
				var zb_title = '';
				zb_title = this.zb_title;
			
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
			// 确定
			// 点击跟多指标
			more_index_header_click() {
				this.is_index = true;
			},
			// 跟多指标
			// 预排预售 更多指标
			show_index() {
				this.is_index = false;
			},
			touchLineA(e) {
				canvaLineA.scrollStart(e);
			},
			moveLineA(e) {
				canvaLineA.scroll(e);
			},
			touchEndLineA(e) {
				var that = this;
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						// var dat = moment(category, 'YYYY-MM-DD').format('E');
						 var dat = new Date(category).getDay();
						console.log(dat);
						if (dat == 0) {
							dat == 7
						}
						var time = '';
						if (dat == 7) {
							time = '周日';
						} else if (dat == 1) {
							time = '周一';
						} else if (dat == 2) {
							time = '周二';
						} else if (dat == 3) {
							time = '周三';
						} else if (dat == 4) {
							time = '周四';
						} else if (dat == 5) {
							time = '周五';
						} else if (dat == 6) {
							time = '周六';
						}
						
						var name = '';
						if (that.canvas_data_header_index == 0) {
							name = '万票房'
						}else {
							name = '场'
						}
						return category + ' ' + time + ':' + item.data + name;
					}
				});
			},
			// 点击跳转
			tz_list(data) {
				uni.showLoading({
					title:"正在跳转",
					mask:false
				})
				var res = this.res_id;
				let {
					id: id,
					mid: mid
				} = res;
				// id 专资id
				// mid 我们的id
				var url = './dy_particulars_list/dy_particulars_list?id=' + id + '&mid=' + mid;
				if (data == '票房数据') {
					url = url + '&index=' + '0' + '&tab=' + null;

				} else if (data == '预排预售') {
					url = url + '&index=' + '1' + '&tab=' + null;
				} else if (data == '营销数据') {
					url = url + '&index=' + '2' + '&tab=' + null;
				} else if (data == '营销事件') {
					url = url + '&index=' + '4' + '&tab=' + null;
				} else if (data == '目标受众') {
					url = url + '&index=' + '3' + '&tab=' + 20;
				}else if (data == '营销事件') {
					url = url + '&index=' + '5' + '&tab=' + null;
				}else {
					try{
						throw new Error('点击错误')
					}catch(e){
						//TODO handle the exception
						console.log(e);
					}
				}
				uni.navigateTo({
					url,
				})
				uni.hideLoading()
			},
			
			// 六边形
			// 影片信息接口
			async yp_index(url,All_data) {
				let	userType = await  this.detection_validity()
				All_data['userType'] = userType;
				let res = await this.$http.get({
					url,
					data:All_data
				})
				for (var i in res.data.movie_img) {
					res.data.movie_img = res.data.movie_img[i];
				}
				// 累计票房
				//  累计票房
				if (Number(res.data.total_bo) / 100000000 > 1) {
					res.data.total_bo = (Number(res.data.total_bo) / 100000000).toFixed(2) + '亿';
				} else {
					res.data.total_bo = (Number(res.data.total_bo) / 10000).toFixed(2) + '万';
				}

				// 今日票房
				if (Number(res.data.total_bo_s) / 100000000 > 1) {
					res.data.total_bo_s = (Number(res.data.total_bo_s) / 100000000).toFixed(2) + '亿';
				} else {
					res.data.total_bo_s = (Number(res.data.total_bo_s) / 10000).toFixed(2) + '万';
				}
				// 首日票房
				if (Number(res.data.firstday_bo) / 100000000 > 1) {
					res.data.firstday_bo = (Number(res.data.firstday_bo) / 100000000).toFixed(2) + '亿';
				} else {
					res.data.firstday_bo = (Number(res.data.firstday_bo) / 10000).toFixed(2) + '万';
				}
				// 首周票房
				if (Number(res.data.firstweek_bo) / 10000000 < 1) {
					res.data.firstweek_bo = (Number(res.data.firstweek_bo) / 10000).toFixed(2) + '万';
				} else {
					res.data.firstweek_bo = (Number(res.data.firstweek_bo) / 100000000).toFixed(2) + '亿';
				}
				// 今日排场占比
				res.data['session_s_s'] = (Number(res.data.session_s) / Number(res.data.sessionSum) *100).toFixed(2) + '%';
				// 今日预排场
				res.data.session_s = (Number(res.data.session_s) / 10000).toFixed(2) + '万';
				// 首日场次占比
				console.log(res.data);
				res.data['firstday_session_s'] = (Number(res.data.firstday_session) / Number(res.data.sessionFir) *100).toFixed(2);
				  if(res.data['firstday_session_s']>100){
					  res.data['firstday_session_s']=100+"%"
				  }else{
					   res.data['firstday_session_s']= res.data['firstday_session_s']+"%"
				  }
				
				// 首日场次
				
				res.data.firstday_session = (Number(res.data.firstday_session) / 10000).toFixed(2) + '万';



				// 想看指数
				var a = (Number(res.data.wantwatch[0].douban_wantwatch_up) + Number(res.data.wantwatch[0].tpp_wantwatch_up) +
					Number(res.data.wantwatch[0].wantwatch_up)) / 2;
				var b = (Number(res.data.wantwatch[1].douban_wantwatch_up) + Number(res.data.wantwatch[1].tpp_wantwatch_up) +
					Number(res.data.wantwatch[1].wantwatch_up))
				var ab = a - b / 2;
				var xk_Br = false;
				//  保留 true 为 负值 false 为正值
				if (ab < 0.0001) {
					xk_Br = true;
					ab = Math.abs(ab);
				}
				var ab = (ab / b).toFixed(1);
				// console.log(a);
				res.data['xk_wantwatch_up_all'] = a.toFixed(0);
				res.data['xk_wantwatch_up'] = ab;
				res.data['xk_wantwatch_up_Br'] = xk_Br;

				// 微博指数
				if (res.data.weibokw[0] == undefined) {
					res.data['weibokw_value'] = 0;
					res.data.weibokw = [{value:0}]
				}else {
					var weibokw_value = Number(res.data.weibokw[0].value) - Number(res.data.weibokw[1].value);
					
					//  保留 true 为 负值 false 为正值
					var weibokw_Br = false;
					if (weibokw_value < 0.0000000000001) {
						weibokw_Br = true;
						weibokw_value = Math.abs(weibokw_value);
					}
					weibokw_value = (Number(res.data.weibokw[1].value) / weibokw_value).toFixed(1);
					res.data['weibokw_value'] = weibokw_value;
					res.data['weibokw_Br'] = weibokw_Br;
				}
				
				// 微信指数
				if ( res.data.weixin[0] == undefined) {
					res.data['weixin_value'] = '0';
					res.data.weixin = [{value:0}];
				}else {
					var weixin_value = Number(res.data.weixin[0].value) - Number(res.data.weixin[1].value);
					
					//  保留 true 为 负值 false 为正值
					var weixin_Br = false;
					if (weixin_value < 0.0000000000001) {
						weixin_Br = true;
						weixin_value = Math.abs(weixin_value);
					}
					weixin_value = (Number(res.data.weixin[1].value) / weixin_value).toFixed(1);
					res.data['weixin_value'] = weixin_value;
					res.data['weixin_Br'] = weixin_Br;
				}
				var baidukw_value = 0;
				if (res.data.baidukw[0] == undefined) {
					
				}else {
					if (res.data.baidukw[0].value == undefined) {
						baidukw_value =  Number(res.data.baidukw[1].value);
					}else if (res.data.baidukw[1].value == undefined) {
						baidukw_value = Number(res.data.baidukw[0].value) 
					}else {
						baidukw_value = Number(res.data.baidukw[0].value) -  Number(res.data.baidukw[1].value);
					}
				}
				 

				//  保留 true 为 负值 false 为正值
				var baidukw_Br = false;
				if (baidukw_value < 0.0000000000001) {
					baidukw_Br = true;
					baidukw_value = Math.abs(baidukw_value);
				}
				if (res.data.baidukw[1] == undefined) {
					baidukw_value = 0
				}else {
					baidukw_value = (Number(res.data.baidukw[1].value) / baidukw_value).toFixed(1);
				}
				
				res.data['baidukw_value'] = baidukw_value;
				res.data['baidukw_Br'] = baidukw_Br;
				// 处理制试
				var version = res.data.version;
				var arr = version.split(',');
				res.data.version = arr;
				
				this.message_data = res.data;
				uni.setNavigationBarTitle({
					title: res.data.zz_name
				});
			}
		}
	};
</script>

<style lang="less">
	@import url('./dy_particulars.less');

	// 日历样式
	#ei_calendar_id {}

	.car {
		// height: 100%;
		position: fixed;
		top: 0;
		width: 750upx;
		background-color: #fff;
		overflow: hidden;

		// cover-view{
		// 	overflow: hidden;
		// }
		.car_cah {
			height: 40upx;
			width: 750upx;
			display: flex;
			justify-content: flex-end;

			// padding-right: 40upx;
			view {
				margin-right: 40upx;
			}
		}
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/

	.charts {
		width: 750upx;
		height: 600upx;
		background-color: #ffffff;
	}

	.charts_age {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
</style>

