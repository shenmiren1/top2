<template>
	<view>
		<view class="header">
			<image :src="'https://db.topcdb.com' + message_data.movie_img" mode=""></image>
			<view class="header_tow">
				<view class="headere_name">
					<view>{{ message_data.zz_name }}</view>
					<view class="headere_name_gs">
						<view :key="index" v-for="(item, index) in message_data.version">{{ item }}</view>
					</view>
				</view>
				<view class="header_time">{{ message_data.publish_date }}<!-- ({{ message_data.country }}) --></view>
				<view class="header_pf">猫眼评分 {{ message_data.maoyan_score }}</view>
			</view>
		</view>

		<!-- tab_eahder-->

		<scroll-view class="center_tab" scroll-x :scroll-left="scrollleft">
			<view @tap="center_tab_click(index)" :class="['center_tab_view']" v-for="(item, index) in center_tab_data" :key="index">
				<view :class="['', index == cater_tab_index ? 'acive' : '']">{{ item }}</view>
			</view>
		</scroll-view>

		<!-- 票房数据  -->
		<view class="pf_data" :hidden="!(cater_tab_index == 0)">
			<view class="pf_data_header">
				<view class="pf_data_header_data">
					<view>{{ message_data.total_bo }}</view>
					<view>累计票房</view>
				</view>
				<view class="pf_data_header_data">
					<view>{{ message_data.total_bo_s }}</view>
					<view>今日票房</view>
				</view>
				<view class="pf_data_header_data">
					<view>{{ message_data.firstday_bo }}</view>
					<view>首日票房</view>
				</view>
				<view class="pf_data_header_data">
					<view>{{ message_data.firstweek_bo }}</view>
					<view>首周票房</view>
				</view>
			</view>

			<!-- 日排场 日票房  -->
			<view class="canvas_data">
				<view class="canvas_data_header">
					<view @tap="canvas_data_header_click(index)" :class="[index == canvas_data_header_index ? 'active' : '']" v-for="(item, index) in canvas_data_header_data"
					 :key="index">
						{{ item }}
					</view>
				</view>

			</view>
			<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll="true" @touchstart="touchLineA"
			 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>


			<view class="three_title">
				<block v-for="(itme,i) in three_title_data" :key="i">
					<view @tap="three_title_click(i)">

						{{itme}}
						<image src="../../../static/big-plate/next.png" mode=""></image>
					</view>

				</block>

			</view>
			<view class="button">
				<view class="buttonH">
					<view class="buttonHone">票房明细</view>
					<view class="buttonHtow" @tap="show_index">
						<!-- <text></text> -->
						<image src="../../../static/home/more.png" mode=""></image>
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

		<!-- tabtow -->
		<view class="yp_ys_data_tow" :hidden="!(cater_tab_index == 1)">
			<view class="pf_data_header_tow ">
				<view class="pf_data_header_data_tow">
					<view>{{ message_data.session_s }}</view>
					<view>今日预排场</view>
				</view>
				<view class="pf_data_header_data_tow">
					<view>{{ message_data.session_s_s }}</view>
					<view>今日排场占比</view>
				</view>
				<view class="pf_data_header_data_tow">
					<view>{{ message_data.firstday_session }}</view>
					<view>首日场次</view>
				</view>
				<view class="pf_data_header_data_tow">
					<view>{{ message_data.firstday_session_s }}</view>
					<view>首日场次占比</view>
				</view>
			</view>

			<!-- 票房明细 -->

			<view class="button">
				<view class="buttonH">
					<view class="buttonHone">排场明细</view>
					<view class="buttonHtow" @tap="show_index_yoys">
						<!-- <text></text> -->
						<image src="../../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					<view>影片</view>
					<!-- <view></view> -->
					<view v-for="(item, index) in zb_title_yu_ys" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
				<view class="buttom_header">
					<view class="buttom_header_one">总计</view>
					<view class="buttonB_Headerson_pf">
						
						
						
						
						
						
						
						
						
						<!-- 场次 -->
						<view :hidden="!zb_title_yu_ys[0].front_row">{{ yp_ys_zxt_data.sum.session_s }}</view>
						<!--排场占比  -->
						<view :hidden="!zb_title_yu_ys[1].front_row">{{ yp_ys_zxt_data.sum.session_rate }}%</view>
						<!--场均人次-->   
						<view :hidden="!zb_title_yu_ys[2].front_row">{{ yp_ys_zxt_data.sum.people_per_session }}</view>
						
						
						<!--上座率  -->   
						<view :hidden="!zb_title_yu_ys[3].front_row">{{ yp_ys_zxt_data.sum.occupancy }}%</view>
						<!--排座占比  -->   
						<view :hidden="!zb_title_yu_ys[4].front_row">{{ yp_ys_zxt_data.sum.seat_rate }}%</view>
						<!-- 票房 -->   
						<view :hidden="!zb_title_yu_ys[5].front_row">{{ yp_ys_zxt_data.sum.real_bo_s }}</view>
						<!--票房占比  -->   
						<view :hidden="!zb_title_yu_ys[6].front_row">{{ yp_ys_zxt_data.sum.realbo_rate }}%</view>
						<!--平均票价  -->   
						<view :hidden="!zb_title_yu_ys[7].front_row">{{ yp_ys_zxt_data.sum.avg_price }}</view>
						<!--人次  -->   
						<view :hidden="!zb_title_yu_ys[8].front_row">{{ yp_ys_zxt_data.sum.people_per_session }}</view>
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
						<!-- 场次(万)  -->
						<view :hidden="!zb_title_yu_ys[0].front_row">{{ it.session_s }}</view>
						<!--排场占比  -->
						<view :hidden="!zb_title_yu_ys[1].front_row">{{ it.session_rate }}%</view>
						<!--场均人次-->   
						<view :hidden="!zb_title_yu_ys[2].front_row">{{ it.people_per_session }}</view>
						
						
						<!--上座率  -->   
						<view :hidden="!zb_title_yu_ys[3].front_row">{{ it.occupancy }}%</view>
						<!--排座占比  -->   
						<view :hidden="!zb_title_yu_ys[4].front_row">{{ it.seat_rate }}%</view>
						<!-- 票房 -->   
						<view :hidden="!zb_title_yu_ys[5].front_row">{{ it.real_bo_s }}</view>
						<!--票房占比  -->   
						<view :hidden="!zb_title_yu_ys[6].front_row">{{ it.realbo_rate }}%</view>
						<!--平均票价  -->   
						<view :hidden="!zb_title_yu_ys[7].front_row">{{ it.avg_price }}</view>
						<!--人次  -->   
						<view :hidden="!zb_title_yu_ys[8].front_row">{{ it.people_per_session }}</view>
					</view>
				</view>
			</view>
		</view>

		<!-- 跟多指标 -->
		<scroll-view scroll-y class="more" :hidden="is_index_yp_ys">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header">
					<view class="" @tap="more_index_header_click">确定</view>
				</view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index, 1)" v-for="(item, index) in zb_title_yu_ys" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- tabthree -->

		<view class="yp_ys_data_three" :hidden="!(cater_tab_index == 2)">
			<view class="header_top_center_three">
				<view class="header_top_center_tow_bottom__three">
					<view>想看指数</view>
					<view>
						<!-- //  保留 true 为 负值 false 为正值 -->
						<view :style="{ color: '#E02020' }" v-if="!message_data.xk_wantwatch_up_Br">↑</view>
						<view :style="{ color: '#E02020' }" v-if="message_data.xk_wantwatch_up_Br">↓</view>
						<view>{{ message_data.xk_wantwatch_up }}%</view>
					</view>
					<view>（{{ message_data.xk_wantwatch_up_all }}）</view>
				</view>

				<view class="header_top_center_tow_bottom__three">
					<view>微博指数</view>
					<view>
						<!-- //  保留 true 为 负值 false 为正值 -->
						<view :style="{ color: '#E02020' }" v-if="!message_data.weibokw_Br">↑</view>
						<view :style="{ color: '#E02020' }" v-if="message_data.weibokw_Br">↓</view>
						<view>{{ message_data.weibokw_value }}%</view>
					</view>
					<view>（{{ message_data.weibokw[0].value }}）</view>
				</view>

				<view class="header_top_center_tow_bottom__three">
					<view>微信指数</view>
					<view>
						<!-- //  保留 true 为 负值 false 为正值 -->
						<view :style="{ color: '#E02020' }" v-if="!message_data.weixin_Br">↑</view>
						<view :style="{ color: '#E02020' }" v-if="message_data.weixin_Br">↓</view>
						<view>{{ message_data.weixin_value }}%</view>
					</view>
					<view>（{{ message_data.weixin[0].value }}）</view>
				</view>

				<view class="header_top_center_tow_bottom__three">
					<view>百度指数</view>
					<view>
						<!-- //  保留 true 为 负值 false 为正值 -->
						<view :style="{ color: '#E02020' }" v-if="!message_data.baidukw_Br">↑</view>
						<view :style="{ color: '#E02020' }" v-if="message_data.baidukw_Br">↓</view>
						<view>{{ message_data.baidukw_value }}%</view>
					</view>
					<view>（{{ message_data.baidukw[0].value }}）</view>
				</view>
			</view>
			<view class="" :hidden="is_show">
				<uc-harts @rlData="rlData" :canvas_url="canvas_url" @rl_click="rl_click" :name="name" class="uc-harts"></uc-harts>

			</view>
		</view>

		<view class="yp_ys_data_foutr" :hidden="!(cater_tab_index == 3)">
			<view class="yp_ys_data_foutr_header">
				<view class="yp_ys_data_foutr_header_title">性别占比</view>
				<view class="yp_ys_data_foutr_header_data_title">
					<view class="yp_ys_data_foutr_header_data_title_one">
						<view class="">{{ sz_All_data.sex.man }}%</view>
						<view class="">男</view>
					</view>
					<view class="yp_ys_data_foutr_header_data_title_tow">
						<view class="">女</view>
						<view class="">{{ sz_All_data.sex.woman }}%</view>
					</view>
				</view>
				<view class="yp_ys_data_foutr_header_data">
					<view :style="{ background: '#44D7B6', width: sz_All_data.sex.man_w + 'px' }"></view>
					<view :style="{ background: '#FF8D8D', width: sz_All_data.sex.woman_w + 'px' }"></view>
				</view>
			</view>
			<view class="yp_ys_data_foutr_age">
				<view class="yp_ys_data_foutr_age_title">年龄占比</view>
				<canvas canvas-id="canvasColumn" id="canvasColumn" class="chartsColumn" @touchstart="touchColumn"></canvas>
			</view>
			<!-- 教育程度 -->
			<view class="yp_ys_data_foutr_header">
				<view class="yp_ys_data_foutr_header_title">教育程度</view>
				<view class="yp_ys_data_foutr_header_data_title">
					<view class="yp_ys_data_foutr_header_data_title_one" :style="{ color: '#F08E2D' }">
						<view class="">{{ sz_All_data.education.undergraduate }}%</view>
						<view class="">本科及以上</view>
					</view>
					<view class="yp_ys_data_foutr_header_data_title_tow" :style="{ color: '#32C5FF'}">
						<view class="">本科以下</view>
						<view class="">{{ sz_All_data.education.belowUndergraduate }}%</view>
					</view>
				</view>
				<view class="yp_ys_data_foutr_header_data">

					<view :style="{ background: '#F08E2D', width: sz_All_data.education.undergraduate_w + 'px' }"></view>
					<view :style="{ background: '#32C5FF', width: sz_All_data.education.belowUndergraduate_w+ 'px' }"></view>
				</view>
			</view>

			<!-- 地区分布 -->
			<view class="yp_ys_data_foutr_map">
				<view class="yp_ys_data_foutr_map_title">
					地区分布
				</view>
				<canvas canvas-id="canvasColumn_map" id="canvasColumn_map" class="chartsColumn_map" @touchstart="touchColumn_map"></canvas>
			</view>
			<!-- 观影偏好分布 -->
			<view class="yp_ys_data_foutr_yh">
				<view class="yp_ys_data_foutr_yh_title">
					观影偏好分布
				</view>
				<canvas canvas-id="canvasRing" id="canvasRing" class="chartsRing" @touchstart="touchRing"></canvas>
			</view>



			<!-- 职业分布 -->
			<view class="yp_ys_data_foutr_zy">
				<view class="yp_ys_data_foutr_yh_title">
					职业分布
				</view>
				<canvas canvas-id="canvasRing_zy" id="canvasRing_zy" class="chartsRing_zy" @touchstart="touchRing_zy"></canvas>
			</view>
		</view>

		<!-- 营销事件 -->
		<view class="yp_ys_data_foutr_yx" :hidden="!(cater_tab_index == 4)">
			<view class="mbsz_yx_bottom" v-for="(item,index) in All_yx_data" :key="index">
				<view class="mbsz_yx_bottom_data">
					<view class="mbsz_yx_bottom_data_name">
						<view></view>
						<view>上映后{{item.sy_time}}天 </view>
						<view> {{item.date}}</view>
					</view>
					<view class="mbsz_yx_bottom_data_data">
						{{item.title}}
					</view>
					<view class="mbsz_yx_bottom_data_content">
						{{item.content}}
					</view>
				</view>
			</view>
		</view>

		<!-- 日历 -->
		<view class="car" :style="{position:'fixed',top:0,height:windowHeight + 'px'}" :hidden="!is_show">
			<view class="car_cah" @tap="car_cah">
				<view>×</view>
			</view>
			<ei-calendar ref="calendar" :drawer="false" :visible.sync="is_show" @click="ei_calendar_tap" :disabledDate="disabledDate"
			 v-model="date" :custom-date="customDate" format="YYYY-MM-DD"></ei-calendar>
			<cover-view :style="{height:car_scrollr_hei + 'px',width:'750px',background:'#fff'}">

			</cover-view>
		</view>
	</view>
</template>

<script>
	import moment from '@/components/moment';
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';
	import UcHarts from '@/components/ucharts_dome/publicity_cavas';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	var _self;
	var canvaLineA = null;
	var canvaColumn = null;
	var canvaColumn_map = null;
	var canvaRing = null;
	var canvaRing_zy = null;
	export default {
		onShareAppMessage(){},
		components: {
			UcHarts,
			EiCalendar
		},
		created() {
			// 获取当前屏幕高度
			var res = wx.getSystemInfoSync();
			this.windowHeight = res.windowHeight; // 获取当前屏幕高度
			this.windowWidth = res.windowWidth; // 获取当前屏幕高度
			// 初始化日历时间
			var data = new Date();
			var year = data.getFullYear();
			var mom = data.getMonth() + 1;
			if (mom < 10) {
				mom = '0' + mom
			}
			var day = data.getDate() - 1;
			data = year + '-' + mom + '-' + day
			var date = [];
			date[0] = new Date(data);
			this.date = date;
		},
		data() {
			return {
				front_row_index:0,
				three_title_data: ['城市票房', '影投票房', '影院票房'],
				canvas_url: {}, // 往子组件中传递 的路径
				// r日历
				car_scrollr_hei: '',
				windowHeight: '', // 当前手机的高度
				customDate: [{
					cellClass: 'custom-cell',
					date: '2019-08-20',
					top: [{
						// class: 'custom-cell-top-1',
						// text: '情人节'
					}]
				}],
				date: [], // 日历时间
				is_show: false, // 控制日历
				// 日历
				All_yx_data: '', //营销事件全部数据
				scrollleft: '',
				windowWidth: '', // 当前屏幕的高度
				windowHeight: '', // 当前屏幕的宽度
				sz_All_data: {
					sex: {
						man: "49.00",
						man_w: 183.75,
						woman: "51.00",
						woman_w: 191.25
					}
				}, // 目标受众所有数据
				loading_name: '', // 不等于三的时候延迟加载
				name: '', // 组件传的id
				is_index_yp_ys: true,
				is_index: true,
				itemlist: [], // 总数据
				zb_title_yu_ys: [
					{
						zb_name: '场次',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},
					{
						zb_name: '排场占比',
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
					},

					{
						zb_name: '票价',
						two_title: '',
						is_check: '平均',
						no_check: '平均',
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
				yp_ys_zxt_data: {
					sum:{
						real_bo_s:'--',
						realbo_rate:'--',
						session_rate:'--',
						occupancy:'--',
						seat_rate:'--',
						avg_price:'--',
						people_per_session:'--',
						session_s:'--',
						total_people_s:'--'
					}
				}, // 预排预售  票房数数据折线图
				canvas_data_header_data: ['日票房', '日排场'],
				canvas_data_header_index: 0, // 折线图默认选中
				// 折线图图
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',

				// 柱状图
				cWidthColumn: '',
				cHeightColumn: '',
				// 地区分布
				cWidthColumn_map: '',
				cHeightColumn_map: '',
				// 观片引号股份不
				cWidthRing: '',
				cHeightRing: '',
				cWidthRing_zy: '',
				cHeightRing_zy: '',
				// 折线图
				message_data: {
					// 所有的详情数据
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
					id: '--',
					import_mode: '--',
					maoyan_score: '--',
					material: '--',
					movie_img: '',
					people: '22365346',
					publish_date: '--',
					real_bo: '--',
					session: '--',
					sessionSum: '--',
					session_s: '--',
					session_s_s: '--',
					total_bo: '--',
					total_bo_s: '--',
					tpp_score: '--',
					type: '动作',
					version: [{
						date: '--',
						mid: '--',
						value: '--'
					}],
					wantwatch: [{
						date: '--',
						mid: '--',
						value: '--',
						wantwatch_up: '--'
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
				},

				center_tab_data: ['票房数据', '预排预售', '营销数据', '目标受众', '营销事件'],
				cater_tab_index: 0 // 控制显示那一页  后期动态传值
			};
		},
		onLoad(res) {
			let {
				id: id,
				mid: mid,
				index: index,
				tab: tab
			} = res;
			this.res_id = res;
			// id 专资id
			// mid 我们的id
			if (tab == null) {
				this.scrollleft = 0
			} else {
				this.scrollleft = tab;
			}
			if (index == 2) {
				this.name = res;
				this.loading_name = res;
			} else {
				this.loading_name = res;
			}
			this.cater_tab_index = index;
			let url = '';
			let All_data = {
				
			}
				// 必须请求 应为里边有所有的 详情数据
				url = '/topprogram/movie-main'
				All_data = {
					id:id,
					mid:mid
				}
				this.yp_index(url,All_data);
			// 目标受众
			if (index == 3) {
				url = '/topprogram/get-audience'
				// url = '/topprogram/movie-main'
				All_data = {
					id:id,
					mid:mid
				}
				this.sz_index(url, this,All_data);
			} else if (index == 0 || index == 1 || index == 2) {
				
				if (index == 0 || index == 1) {
					// 预排预售 详情
					url = '/topprogram/movie-mainjs'
					All_data = {
						id:id,
						mid:mid
					}
					this.ypys_index(url, this,All_data);
				}

			} else if (index == 4) {
				url = '/topprogram/get-trace'
				All_data = {
					id:id,
					mid:mid
				}
				this.yx_index(url, this,All_data)
			}

			// 折线图
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
			// 观片影号分布
			this.cWidthRing = uni.upx2px(750);
			this.cHeightRing = uni.upx2px(550);
			// 柱状图
			this.cWidthColumn = uni.upx2px(750);
			this.cHeightColumn = uni.upx2px(500);
			// 地区分布
			this.cWidthColumn_map = uni.upx2px(750);
			this.cHeightColumn_map = uni.upx2px(500);
			// 柱状图
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(500);
			// 职业分布
			this.cWidthRing_zy = uni.upx2px(750);
			this.cHeightRing_zy = uni.upx2px(500);


		},
		methods: {
			three_title_click(index){
				var res = this.loading_name;
				let {
					id: id,
					mid: mid
				} = res;
				// id 专资id
				// mid 我们的id
				
					uni.navigateTo({
						url:'../all_bo/all_bo?id=' +id +'&mid=' + mid + '&index=' + index
					})
			},
			// 初始化日历时间
			rlData(da) {
				console.log(da);
				var date = [];
				date[0] = new Date(da);
				this.date = date;
			},
			// 日历函数
			disabledDate(date) {
				const start = new Date('2019/5/10').getTime();
				const end = new Date('2019/7/21').getTime();
				return date.getTime() <= start || date.getTime() >= end;
			},
			// 确定按钮
			car_cah() {
				this.is_show = false;
				// this.cater_tab_index = 2;
			},
			ei_calendar_tap(e) {
				// console.log(e);
				var {
					id: id,
					mid: mid
				} = this.name;
				var year = e.year;
				var month = e.month;
				var day = e.day;
				if (month < 10) {
					month = '0' + month
				}
				if (day < 10) {
					day = '0' + day;
				}
				if (day.length > 3) {
					day = day.slice(1, 3)
				}
				if (month.length > 3) {
					month = day.slice(1, 3)
				}
				var data = `${year}-${month}-${day}`
				// console.log(data);
				var url = '/topprogram/get-con-situation'
				let All_data = {
					id:id,mid:mid,date: data
				}
				var date = [];
				date[0] = new Date(data);
				this.date = date;
				// this.cater_tab_index = 2;
				this.canvas_url = {
					url,
					data:All_data
				};
				this.is_show = false;
			},
			// 接受穿回来的br
			rl_click(e) {
				this.is_show = e;
				// this.cater_tab_index = 5;//
			},
			// 营销事件
			// 营销事件
			async yx_index(url, that,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				var data = moment(new Date).format('YYYY-MM-DD')
				data = new Date(data).getTime()
				var ra = res.data;
				for (let i in ra) {
					var dd = new Date(ra[i].date).getTime()
					ra[i].sy_time = moment(data - dd) / 1000 / 60 / 60 / 24
					// console.log(ra[i]);
					if (ra[i].content == null) {
						ra[i].content = '暂无'
					} else if (ra[i].content.length > 58) {
						ra[i].content = ra[i].content.slice(0, 58) + '....'
					}


				}
				this.All_yx_data = ra;
			},
			// 职业分布
			showRing_zy(canvasId, chartData, title = '', subtitle_name = '') {
				canvaRing_zy = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {show:true},
					title: {
						name: title,
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						// offsetY: -20 * _self.pixelRatio,
					},
					subtitle: {
						name: subtitle_name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						// offsetY: 30 * _self.pixelRatio,
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
					width: _self.cWidthRing_zy * _self.pixelRatio,
					height: _self.cHeightRing_zy * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
			},
			touchRing_zy(e) {
				var xx = canvaRing_zy.getCurrentDataIndex(e);
				if (xx >= 0) {
					var title = canvaRing_zy.opts.series[xx].name;
					var subtitle = canvaRing_zy.opts.series[xx].data + '%';
					canvaRing_zy.updateData({
						title: {
							name: title
						},
						subtitle: {
							name: subtitle
						}
					});
				}

			},
			// 观片影号分布
			showRing(canvasId, chartData, title = '', subtitle_name = '') {
				canvaRing = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'ring',
					fontSize: 11,
					legend: {show:true},
					title: {
						name: title,
						color: '#7cb5ec',
						fontSize: 25 * _self.pixelRatio,
						// offsetY: -20 * _self.pixelRatio,
					},
					subtitle: {
						name: subtitle_name,
						color: '#666666',
						fontSize: 15 * _self.pixelRatio,
						// offsetY: 30 * _self.pixelRatio,
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
					width: _self.cWidthRing * _self.pixelRatio,
					height: _self.cHeightRing * _self.pixelRatio,
					disablePieStroke: true,
					dataLabel: false,
				});
			},
			touchRing(e) {
				var xx = canvaRing.getCurrentDataIndex(e);
				if (xx >= 0) {
					var title = canvaRing.opts.series[xx].name;
					var subtitle = canvaRing.opts.series[xx].data + '%';
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
			// 柱状图
			showColumn(canvasId, chartData) {
				canvaColumn = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {show:false},
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
						//disabled:true
					},
					dataLabel: true,

					width: _self.cWidthColumn * _self.pixelRatio,
					height: _self.cHeightColumn * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: (_self.cWidthColumn * _self.pixelRatio * 0.45) / chartData.categories.length
						}
					}
				});
			},
			touchColumn(e) {
				canvaColumn.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value;
						} else {
							return category + ' ' + item.name + ':' + item.data;
						}
					}
				});
			},

			// 地区分布
			// 柱状图
			showColumn_map(canvasId, chartData) {
				canvaColumn_map = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'column',
					legend: {show:false},
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
						//disabled:true
					},
					dataLabel: true,

					width: _self.cWidthColumn_map * _self.pixelRatio,
					height: _self.cHeightColumn_map * _self.pixelRatio,
					extra: {
						column: {
							type: 'group',
							width: (_self.cWidthColumn_map * _self.pixelRatio * 0.45) / chartData.categories.length
						}
					}
				});
			},
			touchColumn_map(e) {
				canvaColumn_map.showToolTip(e, {
					format: function(item, category) {
						if (typeof item.data === 'object') {
							return category + ' ' + item.name + ':' + item.data.value;
						} else {
							return category + ' ' + item.name + ':' + item.data;
						}
					}
				});
			},
			// 柱状图
			// 目标受众
			// 年龄占比
			async sz_index(url, that,All_data) {
				let userType  = await this.detection_validity()	
				All_data['userType'] = userType;
				let res  = await this.$http.get({
					url,
					data:All_data,
				})
				// 当前屏幕的宽度
				var windowWidth = this.windowWidth;
				let ra = res.data.data;
				// 计算 性别占比
				windowWidth = windowWidth / 100;
				res.data.data.sex.man_w = windowWidth * res.data.data.sex.man;
				res.data.data.sex.woman_w = windowWidth * res.data.data.sex.woman;
				
				//年龄占比
				let Column = {
					categories: [],
					series: [{
						data: [],
						color: ''
					}]
				};
				var arr_age = [];
				for (let i in ra.ageRates) {
					Column.categories.push(i);
					arr_age.push(ra.ageRates[i].percent);
				}
				Column.series[0].data = arr_age;
				Column.series[0].color = '#F08E2D';
				Column.series[0].name = '年龄占比';
				_self.showColumn('canvasColumn', Column);

				// 教育程度
				ra.education['belowUndergraduate_w'] = windowWidth * ra.education.belowUndergraduate;
				ra.education['undergraduate_w'] = windowWidth * ra.education.undergraduate;

				//地区分布 
				let Column_map = {
					categories: [],
					series: [{
						data: [],
						color: '#F08E2D',
						name: '地区分布 '
					}]
				};
				for (let ii in ra.areas) {
					Column_map.categories.push(ii)
					var data = ra.areas[ii].split('%')
					Column_map.series[0].data.push(Number(data[0]))
				}
				// 观片影号分布
				let Column_yh = {
					series: []
				};
				var color = ['#F58C3E', '#F35E62', '#7E71C3', '#A76FBA', '#0E94DF', '#4EC6EB', '#4A83F1', '#41B296', '#54CF7C',
					'#A1D74E', '#FDD847'
				];
				var ind = 0;
				for (let iii in ra.interests) {
					Column_yh.series.push({
						name: iii,
						color: color[ind],
						type: 'ring',
						data: ra.interests[iii].percent,
						format: function() {
							return ''
						}
					})
					ind++
				}
				let Column_zy = {
					series: []
				};
				// 职业分布

				var color_zy = ['#F68C3C', '#FF574D', '#a76fba']
				var index = 0;
				for (let da in ra.occups) {
					Column_zy.series.push({
						name: da,
						color: color_zy[index],
						data: ra.occups[da].percent,
						format: function() {
							return ''
						}
					})
					index++
				}
				_self.showRing_zy('canvasRing_zy', Column_zy, Column_zy.series[0].name, Column_zy.series[0].data + '%')
				_self.showRing('canvasRing', Column_yh, Column_yh.series[0].name, Column_yh.series[0].data + '%')
				_self.showColumn_map('canvasColumn_map', Column_map);
				this.sz_All_data = res.data.data;
			},

			// tabtow
			// 点击跟多指标
			// 预排预售 更多指标
			show_index_yoys() {
				this.is_index_yp_ys = false;
			},

			// 票房显示 的字
			more_index_data_tap(index, num) {
				// console.log(data);
				// // 复制过来一份进行操作
				var zb_title = '';
				if (num == 0) {
					zb_title = [...this.zb_title];
				} else {
					zb_title = [...this.zb_title_yu_ys];
				}

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

				if (num == 0) {
					this.zb_title = zb_title;
				} else {
					this.zb_title_yu_ys = zb_title;
				}
			},

			// 点击去诶东莞比跟多指标
			more_index_header_click() {
				this.is_index = true;
				this.is_index_yp_ys = true;
			},
			// 点击弹出 跟多指标
			show_index() {
				this.is_index = false;
				// console.log(this.is_show);
			},
			// 点击 切换折线图
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
				var movieJs = ra.movieJs;
				LineA.categories = movieJs.xA;
				
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
				
				
				if (index == 0) {
					movieJs.total_data.forEach(item => {
						item = Number(item);
						item = (item / 10000).toFixed(2)
						LineA.series[0].data.push(item);
					});
					LineA.series[0].name = '日票房';
						this.front_row_index = 0;
					this.zb_title = zb_title;
				} else if (index == 1) {
					movieJs.session_data.forEach(item => {
						item = Number(item);
						LineA.series[0].data.push(item);
					});
					LineA.series[0].name = '日排场';
						this.front_row_index = 1;
					this.zb_title = zb_title_tow;
				}
				_self.showLineA('canvasLineA', LineA);
				this.canvas_data_header_index = index;
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
						var dat = moment(category, 'YYYY-MM-DD').format('E');
						// console.log(dat);
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

			// 折线图 预排预售数据
			async ypys_index(url, that,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:ra}  = await this.$http.get({
				url,
				data:All_data,
				})
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
					console.log();
					item = (item / 10000).toFixed(0)
					LineA.series[0].data.push(item);
				});
				LineA.series[0].name = '日票房';
				var movieList = ra.movieList;
				movieList.forEach((item, i) => {
					// 平均票价
					movieList[i].avg_price = Number(movieList[i].avg_price).toFixed(2);

					// 上座率
					movieList[i].occupancy = (movieList[i].occupancy * 100).toFixed(2);

					// 排座占比
					movieList[i].seat_rate = (movieList[i].seat_rate * 100).toFixed(2);

					// 场次  有  session_s
					// movieList[i].session_s = Number(movieList[i].session_s /10000).toFixed(2);
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
						var time_s = time - big_tiem;

						if (time_s == 0) {
							time_condition = '实时';
						} else if (time_s < 0) {
							time_condition = '预售';
						} else if (time_s > 0) {
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
				// ra.sum.session_s = (Number(ra.sum.session_s) / 10000 ).toFixed(2)
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
				var big_tiem = moment(ra.sum.bdate).valueOf();
				var bittle_time = moment(ra.sum.publish_date).valueOf();

				this.yp_ys_zxt_data = ra;
				_self.showLineA('canvasLineA', LineA);
			},
			async yp_index(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let res  = await this.$http.get({
					url,
					data:All_data,
				})
				for (var i in res.data.movie_img) {
					// console.log();
					res.data.movie_img = res.data.movie_img[i];
				}

				// 累计票房
				//  累计票房
				if (Number(res.data.total_bo) / 100000000 < 1) {
					res.data.total_bo = (Number(res.data.total_bo) / 10000).toFixed(2) + '万';
				} else {
					res.data.total_bo = (Number(res.data.total_bo) / 100000000).toFixed(2) + '亿';
				}

				// 今日票房
				console.log(Number(res.data.total_bo_s) / 10000)
				console.log(Number(res.data.total_bo_s) / 100000000)
				if (Number(res.data.total_bo_s) / 100000000 < 1) {
					res.data.total_bo_s = (Number(res.data.total_bo_s) / 10000).toFixed(2) + '万';
				} else {
					res.data.total_bo_s = (Number(res.data.total_bo_s) / 100000000).toFixed(2) + '亿';
				}
				// 首日票房
				if (Number(res.data.firstday_bo) / 100000000 < 1) {
					res.data.firstday_bo = (Number(res.data.firstday_bo) / 10000).toFixed(2) + '万';
				} else {
					res.data.firstday_bo = (Number(res.data.firstday_bo) / 100000000).toFixed(2) + '亿';
				}
				// 首周票房
				if (Number(res.data.firstweek_bo) / 100000000 < 1) {
					res.data.firstweek_bo = (Number(res.data.firstweek_bo) / 10000).toFixed(2) + '万';
				} else {
					res.data.firstweek_bo = (Number(res.data.firstweek_bo) / 100000000).toFixed(2) + '亿';
				}
				
				// console.log(res);
				// 今日排场占比
				res.data['session_s_s'] = (Number(res.data.session_s) / Number(res.data.sessionSum) *100).toFixed(2) + '%';
				// 今日预排场
				res.data.session_s = (Number(res.data.session_s) / 10000).toFixed(2) + '万';
				// 首日场次占比
			res.data['firstday_session_s'] = (Number(res.data.firstday_session) / Number(res.data.sessionFir) *100).toFixed(2);
			  if(res.data['firstday_session_s']>100){
				  res.data['firstday_session_s']=100+"%"
			  }else{
				   res.data['firstday_session_s']= res.data['firstday_session_s']+"%"
			  }
			 
				// 首日场次
				res.data.firstday_session = (Number(res.data.firstday_session) / 10000).toFixed(2) + '万';
				// 想看指数
				// var a = Number(res.data.wantwatch[0].wantwatch_up) - Number(res.data.wantwatch[1].wantwatch_up);
				// if (false) {
				var a = (Number(res.data.wantwatch[0].douban_wantwatch_up) + Number(res.data.wantwatch[0].tpp_wantwatch_up) +
					Number(res.data.wantwatch[0].wantwatch_up)) / 2;
				var b = (Number(res.data.wantwatch[1].douban_wantwatch_up) + Number(res.data.wantwatch[1].tpp_wantwatch_up) +
					Number(res.data.wantwatch[1].wantwatch_up))
				console.log(a);
				console.log(b / 2);
				var ab = a - b / 2;
				console.log(ab);
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
					res.data.weibokw = [{value:0}];
				}else {
					var weibokw_value = Number(res.data.weibokw[0].value) - Number(res.data.weibokw[1].value);
					
					//  保留 true 为 负值 false 为正值
					var weibokw_Br = false;
					if (weibokw_value < 0.0000000000001) {
						weibokw_Br = true;
						weibokw_value = Math.abs(weibokw_value);
					}
					console.log(res.data.weibokw[1].value);
					console.log(weibokw_value);
					
					weibokw_value = (Number(res.data.weibokw[1].value) / weibokw_value).toFixed(1);
					res.data['weibokw_value'] = weibokw_value;
					res.data['weibokw_Br'] = weibokw_Br;
				}
				

				// 微信指数
				if (res.data.weixin[0] ==undefined) {
					res.data['weixin_value'] = 0;
					res.data.weixin = [{value:0}]
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
				
				//  百度指数
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
					baidukw_value =0
				}else {
					baidukw_value = (Number(res.data.baidukw[1].value) / baidukw_value).toFixed(1);
				}
				res.data['baidukw_value'] = baidukw_value;
				res.data['baidukw_Br'] = baidukw_Br;
				// 处理制试
				var version = res.data.version;
				var arr = version.split(',');
				if (arr.length > 2) {
					arr = [arr[0], arr[1]];
				}
				res.data.version = arr;
				this.message_data = res.data;
				uni.setNavigationBarTitle({
					title: res.data.zz_name
				});
			},
			// 点击切换tab
			center_tab_click(index) {
				this.cater_tab_index = index;
				let url = ''
				let All_data = {};
				if (index == 2) {
					this.name = this.loading_name;
				} else if (index == 0 || index == 1) {
					var {
						id: id,
						mid: mid,
						index: index
					} = this.loading_name;

					// 必须请求 应为里边有所有的 详情数据
					url = '/topprogram/movie-main'
					All_data = {
						id:id,
						mid:mid
					}
					this.yp_index(url,All_data);

					// 预排预售 详情
					url = '/topprogram/movie-mainjs'
					All_data = {
						id:id,
						mid:mid
					}
					this.ypys_index(url, this,All_data);
				} else if (index == 3) {
					var {
						id: id,
						mid: mid,
						index: index
					} = this.loading_name;
					url = '//topprogram/get-audience'
					All_data = {
						id:id,
						mid:mid
					}
					this.sz_index(url, this,All_data);
				} else if (index == 4) {
					var {
						id: id,
						mid: mid,
						index: index
					} = this.loading_name;
					url = '/topprogram/get-trace'
					All_data = {
						id:id,
						mid:mid
					}
					this.yx_index(url, this,All_data)
				}
			}
		}
	};
</script>

<style lang="less">
	@import url('dy_particulars_list.less');

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	// .uc-harts{
	// 	margin-top: 10upx;
	// }
	.chartsRing_zy {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.chartsRing {
		width: 750upx;
		height: 550upx;
		background-color: #ffffff;
	}

	.chartsColumn_map {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.chartsColumn {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
</style>
