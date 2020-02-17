<template>
	<view>
		<view class="header">
			<image class="image_header" src="../../static/cinema/bgc.png" mode=""></image>
			<view class="header_bottom">
				<view class="header_bottom_center">
					<view class="">{{ cinema_data_data.name }} &nbsp; &nbsp;(影投)</view>
					<view class=""><!-- <image src="../../static/cinema/loastion.png" mode=""></image> --></view>
				</view>
				<view class="header_bottom_b">
					<view class="">影院数 : {{ cinema_data_data.cinema_nums }}个</view>
					<view class="">影厅数 :{{ cinema_data_data.halls }}个</view>
					<view class="">座位数 : {{ cinema_data_data.seats }}</view>
				</view>
			</view>
		</view>
		<view class="center">
			<view class="center_header">
				<view @tap="center_header_click(index)" :class="[index == center_header_index ? 'active' : '']" v-for="(item, index) in center_header_data" :key="index">
					{{ item }}
				</view>
			</view>

			<!-- tabone -->
			<view class="center_tabone" :hidden="center_header_index != 0">
				<view class="center_tabone_header">
					<view class="header">
						<view class="">今日实时</view>
						<view class="">北京时间 {{ time_dat }}</view>
					</view>
					<view class="bottom">
						<view class="bottom_data">
							<view class="">{{ realtime_data.total_bo_s }}</view>
							<view class=""><!-- 实时票房 -->分账票房</view>
						</view>

						<view class="bottom_data">
							<view class="">{{ realtime_data.total_people_s }}</view>
							<view class="">观影人数</view>
						</view>

						<view class="bottom_data">
							<view class="">{{ realtime_data.chain_rank }}</view>
							<view class="">全国排名</view>
						</view>
					</view>
				</view>
				<!-- 票房趋势 -->
				<view class="pf_tendency">
					<view class="pf_tendency_header">
						<view class="">票房趋势</view>
						<view class="" @tap="child_tap" v-if="click_num == 1">
							{{ start_day | time_com }}-{{ end_day | time_com }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>

						<view class="" @tap="child_tap" v-if="click_num == 2">
							{{ start_days }}-{{ end_days }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>
						<view class="" @tap="child_tap" v-if="click_num == 3">
							{{ start_day_thre }}-{{ end_day_three }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>
						<view class="" @tap="child_tap" v-if="click_num == 4">
							{{ start_day_year }}-{{ end_day_year }}
							<image src="../../static/big-plate/select.png" mode=""></image>
						</view>
					</view>

					<view class="" :hidden="!Data_select_header || !is_index">
						<canvas canvas-id="canvasArea" id="canvasArea" class="charts" @touchstart="touchArea" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
					</view>
				</view>
			</view>

			<!-- tabone -->

			<!-- tabtow -->
			<view class="center_tabtow" :hidden="center_header_index != 1">
				<!-- 顶部输入框部分 -->
				<view class="tab_one_header" @tap="input_chage">
					<!-- <input type="text" value="" placeholder="搜索影院" /> -->
					<view class="input_view">
						搜索影院
					</view>
					<image class="tab_one_image" src="../../static/gg/tpicon.png" mode=""></image>
					<view class="tab_one_header_gang"></view>
					<image class="tab_tow_image" src="../../static/home/amplification.png" mode=""></image>
				</view>
				<!-- 中间显示部分 -->
				<view class="tab_one_center">
					<!-- // 头部 -->
					<view class="centerH">
						<view @tap="city_click">
							{{ tab_tow_city_name }}
							<image src="../../static/home/next.png" mode=""></image>
						</view>
						<view class="centerH_jr" @tap="click_time">
							{{ tab_one_time_txt }} {{ pf_date_data }}

							<image src="../../static/home/next.png" mode=""></image>
						</view>
						<view @tap="tab_one_checkboxChange" class="centerService" :style="{ color: tab_one_service == false ? 'black' : '' }">
							<image :hidden="!(tab_one_service == true)" class="form_radio" src="../../static/home/checked.png" mode=""></image>
							<image :hidden="!(tab_one_service == false)" class="form_radio" src="../../static/home/checked1.png" mode=""></image>
							含服务费
						</view>
					</view>
					<!-- // 中间部分 -->
					<view class="centerM">
						<!-- 减天数 -->
						<view class="centerM-symbol" @tap="left_date"><image src="../../static/home/syy.png" mode=""></image></view>
						<view>
							<view class="money">{{ pf_list_sum.total_bo_ss }}</view>
							<!-- tab_one_office_num -->
							<view class="centerM_son">
								<view class="centerM_turnover">跟新时间</view>

								<view class="centerM_tiem">
									<!-- 北京时间: {{ tab_one_time | disposeTiem }} -->
									北京时间：{{ tab_tow_dataTime_ss }}
								</view>
							</view>
						</view>
						<!-- 加天数 -->
						<view class="centerM-symbol" @tap="right_date"><image src="../../static/home/nextcopy2.png" mode=""></image></view>
					</view>
					<view class="centerFoot">
						<view class="centerFoot_son">
							<!-- {{ Rasum.total_people_s }}
									{{ Rasum.occupancy }}
									{{ Rasum.session_s }}
									{{ Rasum.avg_price }} -->
							<view>人次</view>
							<view>{{ pf_list_sum.total_people_s }}</view>
						</view>
						<view class="centerFoot_son">
							<view>上座率</view>
							<view>{{ pf_list_sum.occupancy }}</view>
						</view>
						<view class="centerFoot_son">
							<view>场次</view>
							<view>{{ pf_list_sum.session_s }}</view>
						</view>
						<view class="centerFoot_son">
							<view>平均票价</view>
							<view>{{ pf_list_sum.avg_price }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- tabtow -->

			<!-- tabtow时间选择 -->
			<view class="Data_select" :hidden="Data_select_header_tow" :style="{ top: 0 + 'px' }">
				<!--  tab 头 -->
				<view class="Data_select_header">
					<view @tap="click_tab_tow(index)" v-for="(item, index) in tab_title" :class="[index == time_tab_tow ? 'active' : '']" :key="index">{{ item }}</view>
				</view>
				<!--  日 -->
				<ei-calendar
					@click="ei_calendar_tap_tow_click"
					type="single"
					:visible="time_tab_tow_Br"
					ref="calendar"
					:drawer="false"
					:disabledDate="disabledDate"
					v-model="tab_one_date_tiem"
					:custom-date="customDate"
					format="YYYY-MM-DD"
				></ei-calendar>
				<!-- 周 -->
				<view :hidden="!(time_tab_tow == 1)">
					<view class="week">
						<view class="year_sel">
							<!--  -->
							<view v-for="(item, index) in year" @tap="click_year_tow(item, index)" :class="[index == curren_tab_tow ? 'active' : '']" :key="index">{{ item }}</view>
							<scroll-view scroll-y></scroll-view>
						</view>
						<!-- data-year="{{is_year}}"
								data-week="{{index+1}}"
								data-index="{{is_year}}-W{{index+1}}" -->
						<view class="week_sel">
							<scroll-view scroll-y :style="{ height: wHeight }">
								<view v-for="(item, index) in tab_tow_week" @tap="check_week_tow(index)" :key="index">{{ item }}</view>
							</scroll-view>
						</view>
					</view>
				</view>
				<!-- 选择月 -->
				<view :hidden="!(time_tab_tow == 2)">
					<view class="month">
						<view class="year_sel">
							<view v-for="(item, index) in year" @tap="tap_year_tow(item, index)" :class="[index == curren_yue ? 'active' : '']" :key="index">{{ item }}</view>
							<!-- data-name="{{item}}" data-index="{{bindex}}" -->
						</view>
						<view class="month_sel">
							<view v-for="(item, index) in month" @tap="check_month_tow(item)" :key="index">{{ item }}</view>
						</view>
					</view>
				</view>
				<!--  选择月 -->
				<!-- 选择年 -->
				<view :hidden="!(time_tab_tow == 3)">
					<view class="year">
						<view class="only_year" @tap="check_year_tow(item)" v-for="(item, index) in year" :key="index">{{ item }}</view>
						<!-- data-year="{{item}}" -->
					</view>
				</view>
				<!-- 选择年 -->
				<scroll-view scroll-y></scroll-view>
			</view>
			<!-- tabtow时间选择 -->

			<!-- tabthree -->
			<view class="center_tabtow" :hidden="center_header_index != 2">
				<view class="center_tabtow_header">
					<view @tap="center_tabthree_chehcked(0)">
						<image src="../../static/big-plate/previous.png" mode=""></image>
						前一天
					</view>
					<view @tap="show_tabthree_show_chhhecked(0)">
						{{ pp_date_data }}
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
					<view class="">总票房：{{ pp_sum_list.total_bos_s }}</view>
					<view class="">更新时间：{{ time_dat }}</view>
				</view>
			</view>
			<!-- tabthree -->
			
			<!-- tabfour -->
			<view class="center_tabtow" :hidden="center_header_index != 3">
				<view class="center_tabtow_header">
					<view @tap="center_tabthree_chehcked_four(0)">
						<image src="../../static/big-plate/previous.png" mode=""></image>
						前一天
					</view>
					<view @tap="show_tabthree_show_chhhecked(1)">
						{{ pz_date_data }}
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="center_tabthree_chehcked_four(1)">
						后一天
						<image src="../../static/big-plate/next.png" mode=""></image>
					</view>
				</view>
				<view class="charts_ring_data" :hidden="time_tab_Br_three">
					<canvas canvas-id="canvasRing_three" id="canvasRing_three" class="charts_ring_tow" @touchstart="touchRing_three"></canvas>
				</view>
			
				<view class="center_tabtow_time">
					<view class="">总排场：{{ pz_sum_list.session_s }}</view>
					<view class="">更新时间：{{ time_dat }}</view>
				</view>
			</view>
			<!-- tabfour -->
		</view>
	
		<!-- tabone 时间选择 -->
		<view class="Data_select" :hidden="Data_select_header" :style="{ height: windowHeight, Top: 0 + 'px' }">
			<!--  tab 头 -->
			<view class="Data_select_header">
				<view @tap="click_tab(index)" v-for="(item, index) in tab_title" :class="[index == time_tab ? 'active' : '']" :key="index">{{ item }}</view>
			</view>
			<!-- :visible.sync="show" -->
			<!--  日  -->
			<ei-calendar
				@click="ei_calendar_tap"
				:visible="time_tab_Br"
				ref="calendar"
				type="range"
				:drawer="false"
				v-model="date"
				:custom-date="customDate"
				format="YYYY-MM-DD"
			></ei-calendar>

			<!-- 周 -->
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
						<scroll-view scroll-y :style="{ height: windowHeight }">
							<view v-for="(item, index) in week" :style="{ background: index == active_z ? '#F08E2D' : '' }" @tap="check_week(item, index)" :key="index">
								{{ item }}
							</view>
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
						<view v-for="(item, index) in month" :style="{ backgroundColor: ALL_month_index == index ? '#F08E2D' : '' }" @tap="check_month(item, index)" :key="index">
							{{ item }}
						</view>
					</view>
				</view>
			</view>
			<!--  选择月 -->
			<!-- 选择年 -->
			<view v-if="time_tab == 3">
				<view class="year">
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
			</view>
			<!-- 选择年 -->
		</view>
		
		
		<!-- tabthree时间选择 -->
		<view class="Data_select" :hidden="!time_tab_Br_three" :style="{ height: windowHeight + 'px', Top: 0 + 'px' }">
			<view
				class="cha"
				@tap="
					() => {
						time_tab_Br_three = !time_tab_Br_three;
					}
				"
			>
				×
			</view>
			<ei-calendar
				@click="ei_calendar_tap_three"
				:visible="time_tab_Br_three"
				ref="calendar"
				:drawer="false"
				v-model="date_three"
				:custom-date="customDate_tow"
				format="YYYY-MM-DD"
			></ei-calendar>
		</view>
		<!-- tabthree时间选择 -->
		
		
		<!-- tabfour时间选择 -->
		<view class="Data_select" :hidden="!time_tab_Br_four" :style="{ height: windowHeight + 'px', Top: 0 + 'px' }">
			<view
				class="cha"
				@tap="
					() => {
						time_tab_Br_four = !time_tab_Br_four;
					}
				"
			>
				×
			</view>
			<ei-calendar
				@click="ei_calendar_tap_four"
				:visible="time_tab_Br_four"
				ref="calendar"
				:drawer="false"
				v-model="date_four"
				:custom-date="customDate_tow"
				format="YYYY-MM-DD"
			></ei-calendar>
		</view>
		<!-- tabfour时间选择 -->
		
		<!-- 地区 -->
		<view class="city_sel" :style="{ top: 0 + 'px' }" :hidden="is_show">
			<view class="page__bd">
				<view
					class="page__bd_cc"
					@tap="
						() => {
							this.is_show = true;
						}
					"
				>
					×
				</view>
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
									<view v-for="(vv, ii) in it.childer" :key="ii" @tap="click_grid(vv)" class="section-item-cells">
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
		<!-- 地区 -->
		
		
		<!-- tabone -->
		<view class="button" :hidden="center_header_index != 0">
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
					<view class="buttonB_Headerson_name" v-if="click_num == 1">{{ it.bdate }}</view>
					<view class="buttonB_Headerson_name" v-if="click_num == 2">{{ it.cus_weeks }} 周</view>
					<view class="buttonB_Headerson_name" v-if="click_num == 3">{{ it.bdate }}月</view>
		
					<view class="buttonB_Headerson_name" v-if="click_num == 4">{{ it.year }}年</view>
					<view class="buttonB_Headersn1" :hidden="center_header_index == 0">{{ it.bdate }}</view>
				</view>
				<view class="buttonB_Headerson_pf">
					<!--分账票房-->
					<view :hidden="!zb_title[0].front_row">{{ it.real_bo_s }}</view>
					<!--人次  -->
					<view :hidden="!zb_title[1].front_row">{{ it.total_people_s }}</view>
					<!--场次  -->
					<view :hidden="!zb_title[2].front_row">{{ it.session_s }}</view>
					<!--场均人次  -->
					<view :hidden="!zb_title[3].front_row">{{ it.people_per_session }}</view>
					<!--平均票价  -->
					<view :hidden="!zb_title[4].front_row">{{ it.avg_price }}</view>
					<!--全国排名  -->
					<view :hidden="!zb_title[5].front_row">{{ it.rank }}</view>
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
				<view class="more_index_header"><view class="" @tap="more_index_header_click(0)">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">{{ item.zb_name }}</view>
				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>
		

		<!-- tabtow -->

		<view class="button" :hidden="center_header_index != 1">
			<view class="buttonH">
				<view class="buttonHone">票房排名</view>
				<view class="buttonHtow" @tap="show_index_tow">
					<!-- <text></text> -->
					<image src="../../static/home/more.png" mode=""></image>
					更多指标
				</view>
			</view>
			<view class="buttonM">
				<view>影院</view>
				<!-- <view></view> -->
				<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.zb_name }}{{ item.two_title }}</view>
			</view>
			<view class="buttonB" v-for="item in pf_list" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name">{{ item.cinema_name }}</view>

					<!-- <view class="buttonB_Headersn1">{{item.publish_date}} {{item.bos}}</view> -->
				</view>
				<view class="buttonB_Headerson_pf">
					<!-- 票房 -->
					<view v-if="zb_title[0].front_row">{{ item.total_bo_s }}</view>
					<!-- 票房占比 -->
					<view v-if="zb_title[1].front_row">{{ item.total_bo_ss }}%</view>
					<!-- 排场占比 -->
					<view v-if="zb_title[2].front_row">{{ item.session_ss }}%</view>
					<!-- 上座率 -->
					<view v-if="zb_title[3].front_row">{{ item.occupancy }}%</view>
					<!-- 排座占比 -->
					<view v-if="zb_title[4].front_row">{{ item.seats_s }}%</view>
					<!-- 票价 -->
					<view v-if="zb_title[5].front_row">{{ item.avg_price }}</view>
					<!-- 场均人次 -->
					<view v-if="zb_title[6].front_row">{{ item.people_per_session }}</view>
					<!-- 场次 -->
					<view v-if="zb_title[7].front_row">{{ item.session_s }}</view>
					<!-- 人次 -->
					<view v-if="zb_title[8].front_row">{{ item.total_people_s }}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index_tow">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header"><view class="" @tap="more_index_header_click(1)">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">{{ item.zb_name }}</view>
				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>

		<view class="button" :hidden="center_header_index != 2">
			<view class="buttonH">
				<view class="buttonHone">票房排片</view>
				<view class="buttonHtow" @tap="show_index_three">
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
					<view class="buttonB_Headerson_name">{{ item.movie_name }}</view>

					<!-- <view class="buttonB_Headersn1">{{item.publish_date}}</view> -->
					<view class="buttonB_Headersn1">{{ item.publish_date }} {{ item.bos }}</view>
				</view>
				<view class="buttonB_Headerson_pf">
					<!-- 实时票房 -->
					<view v-if="zb_title[0].front_row">{{ item.total_bo_s }}</view>
					<!-- 人次 -->
					<view v-if="zb_title[1].front_row">{{ item.total_people_s }}</view>
					<!-- 场次 -->
					<view v-if="zb_title[2].front_row">{{ item.session_s }}</view>
					<!-- 场均人次 -->
					<view v-if="zb_title[3].front_row">{{ item.people_per_session }}</view>
					<!-- 平均票价 -->
					<view v-if="zb_title[4].front_row">{{ item.avg_price }}</view>
					<!-- 上座率 -->
					<view v-if="zb_title[5].front_row">{{ item.occupancy }}%</view>
					<!-- 票房占比 -->
					<view v-if="zb_title[6].front_row">{{ item.total_bo_ss }}%</view>
					<!-- 排场占比 -->
					<view v-if="zb_title[7].front_row">{{ item.session_ss }}%</view>
					<!-- 排座占比 -->
					<view v-if="zb_title[8].front_row">{{ item.seats_s }}%</view>
					<!-- 网售票房 -->
					<view v-if="zb_title[9].front_row">{{ item.ol_total_bo_s }}</view>
					<!-- 网售票房占比 -->
					<view v-if="zb_title[10].front_row">{{ item.ol_total_rate }}</view>
					<!-- 网售人次 -->
					<view v-if="zb_title[11].front_row">{{ item.ol_people_s }}</view>
					<!-- 网售人次占比 -->
					<view v-if="zb_title[12].front_row">{{ item.ol_people_rate }}</view>
					<!-- 累计票房暂时 没有值在家 -->
					<view v-if="zb_title[13].front_row">{{ item.bos }}</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index_three">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header"><view class="" @tap="more_index_header_click(2)">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">{{ item.zb_name }}</view>
				</view>
				<view class="">
					<!--  -->
					*最多选择四个
				</view>
			</view>
		</scroll-view>
	
	
		<view class="button" :hidden="center_header_index != 3">
			<view class="buttonH">
				<view class="buttonHone">票房排片</view>

				<view class="buttonHtow" @tap="show_index_four">
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
			<view class="buttonB" v-for="item in pz_list" :key="it.gp_id">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name">{{ item.movie_name }}</view>
		
					<!-- <view class="buttonB_Headersn1">{{item.publish_date}}</view> -->
					<view class="buttonB_Headersn1">{{ item.publish_date }} {{ item.bos }}</view>
				</view>
				<view class="buttonB_Headerson_pf">
					<!-- 场次 -->
					<view v-if="zb_title[0].front_row">{{ item.session_s }}</view>
					<!-- 排场占比 -->
					<view v-if="zb_title[1].front_row">{{ item.pc_zb }}%</view>
					<!-- 排座 -->
					<view v-if="zb_title[2].front_row">{{ item.seats_s }}</view>
					<!-- 排座占比 -->
					<view v-if="zb_title[3].front_row">{{ item.pz_zb }}%</view>
					<!-- 平均票价 -->
					<view v-if="zb_title[4].front_row">{{ item.gd_session }}</view>
					<!-- 上座率 -->
					<view v-if="zb_title[5].front_row">{{ item.gd_session_rate }}%</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="more" :hidden="is_index_four ">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header"><view class="" @tap="more_index_header_click(3)">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">{{ item.zb_name }}</view>
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
import { isJSON } from '@/common/checker.js';
// 时间格式化
import moment from '@/components/moment';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
var _self;
var canvaArea = null;
var canvaRing = null;
var canvaRing_tow = null;
var canvasRing_three = null;
export default {
	onShareAppMessage(){},
	filters: {
		time_com(item) {
			// console.log(time);
			let time = item;
			var mom = time.slice(5);
			// console.log(mom);
			var year = mom.slice(0, 2);
			var days = mom.slice(3);
			year = Number(year);
			return year + '-' + days;
		}
	},
	components: {
		EiCalendar
	},
	data() {
		return {
			time_tab_Br_four:false,
			is_index_tow:true,
			is_index_three:true,
			is_index_four:true,
			tafourcan_num:'',
			pz_sum_list:'',
			pz_list:'',
			zz_title:'',
			pz_date:'',
			date_four:'',
			pz_date_data:'',
			// tabgoour
			
			time_tab_tow_Br: false,
			Data_select_header_tow: true,
			time_tab_tow: 0, // tabtow  时间控制
			tathreecan_num: 0, // three 总数
			pp_sum_list: { total_bo_s: 1 }, // three sum
			// tabthree日历
			time_tab_Br_three: false,
			date_three: [],
			// tabthree r日历
			// tabtow
			tab_one_date_tiem: [], // 日历选中的时间
			format_year: '', // 请求的年
			tab_tow_yue_year: moment().format('YYYY'), // 月里边选择的年
			curren_yue: '', // 月里边样式
			format_week: '', // 周请求时间
			curren_tab_tow: '',
			tab_tow_is_year: '',
			tab_tow_week: [],
			pages: 0, // 当前请求的页码
			tab_one_service: true, // f服务费控制
			tab_tow_dataTime_ss_inter: '', /// 实时定时器
			tab_tow_dataTime_ss: '--', //实时时间
			resSum_data: [],
			tab_one_time_txt: '日票房',
			tab_tow_city_name: '全国', // 默认地址
			// 地区选择
			zm_list: [
			],
			rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'], // 热门城市
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'], // 区域选择
			is_show: true,
			inputVal: '',
			alpha: '',
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'], // 字母
			// 地区选择
			// 日历
			time_tab_Br_tow: false,
			date_tow: '',
			customDate_tow: [
				{
					cellClass: 'custom-cell',
					date: '2019-05-23',
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
			// 日历
			pf_list_sum: {
				total_bo_ss: '--'
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
			customDate: [
				{
					cellClass: 'custom-cell',
					date: '2019-05-23',
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
			is_index: true, // 跟多指标 显示按钮
			// 底部 显示
			// 点击前一日
			zb_title: [
				{
					zb_name: '分账票房(万元)',
					id: 0,
					front_row: true
				},
				{
					zb_name: '人次(万)',
					id: 1,
					front_row: true
				},
				{
					zb_name: '场次',
					id: 2,
					front_row: true
				},
				{
					zb_name: '场均人次',
					id: 3,
					front_row: true
				},
				{
					zb_name: '平均票价',
					id: 4,
					front_row: false
				},
				{
					zb_name: '全国排名',
					id: 5,
					front_row: false
				},
				{
					zb_name: '网售票房',
					front_row: false
				},
				{
					zb_name: '网售票房占比',
					front_row: false
				},
				{
					zb_name: '网售人次',
					front_row: false
				},
				{
					zb_name: '网售人次占比',
					front_row: false
				},
				{
					zb_name: '单座票房',
					front_row: false
				},
				{
					zb_name: '场均票房',
					front_row: false
				},
				{
					zb_name: '单银幕票房(万元)',
					front_row: false
				}
			],
			categories_s: [], // 图表的完整的日期
			time_tab: '0',
			end_dayend_day: '',
			pixelRatio: '',
			apHeight: '',
			offsetTop: '',
			windowHeight: '',
			code: '', //影院ID
			cinema_data_data: {
				name: '--',
				halls: '--',
				seats: '--',
				cinema_nums: '--'
			}, // 影城数据
			realtime_data: {
				total_bo_s: '--',
				total_people_s: '--',
				chain_rank: '--',
				cinema_nums: '--'
			}, // 影城数据
			cinemalist_data: [], // tabone 底部数据
			start_day: '', // tabone选择开始日期
			end_day: '', // tabone选择结束日期
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
			center_header_data: ['经营数据', '影院数据', '影片票房', '影片排片']
		};
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
			var time = getHours + ':' + getMinutes + ':' + getSeconds;
			if (getHours < 10) {
				getHours = '0' + getHours;
			}
			if (getMinutes < 10) {
				getMinutes = '0' + getMinutes;
			}
			if (getSeconds < 10) {
				getSeconds = '0' + getSeconds;
			}
			this.time_dat = time;
		}, 1000);
	},
	onUnload() {
		clearInterval(this.time_set);
	},
	onReady() {},
	// 小程序触底函数
	onReachBottom(e) {
		var that = this;
		var index = this.center_header_index;
		var code = this.code;
		// 触底做判断
		if (index == 1) {
			var pages = this.pages;
			pages++;

			let { dtype, start_date } = this.tab_tow_way();
			var city_name = that.tab_tow_city_name;
			var district = that.tab_tow_city_name;
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
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}

			var url ='/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:dtype,
				start_date:start_date,
				type:'chain',
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			this.pf_index(url, that, 1,All_data);
			this.pages = pages;
		}
	},
	// 只需传一个影院 id 就可以le
	async onLoad(e) {
		// e = {
		// 	code: 11064201
		// }
		// var this = this;
		// 获取最大 最小日期
		var url = '/topprogram/get-date';
		let {data} = await this.$http.get({
			url,
		})
		var max_day = data.bo_date.endDate;
		var min_day = data.bo_date.startDate;
		this.max_day = max_day; /// 最大和最小日期
		this.min_day = min_day; /// 最大和最小日期

		var code = e.code; //影院ID

		var end_day = moment(new Date()).format('YYYY-MM-DD');
		var start_day = moment(start_day)
			.subtract(15, 'days')
			.format('YYYY-MM-DD');
		var url = '/topprogram/main'
		let All_data = {
			chain:code,
			dtype:'range',
			start_date:start_day ,
			end_date:end_day ,
			type:'chain'
		}
		this.cinema_data(url, this,All_data);

		setTimeout(this.getData, 500);

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
		var res = uni.getSystemInfoSync();
		this.pixelRatio_data = res.pixelRatio;
		this.apHeight = 16;
		this.offsetTop = 80;
		this.windowHeight = res.windowHeight + 'px';
		this.code = code;
		this.wHeight = res.windowHeight - 0 + 100 + 'px';
		this.z_data();

		this.start_day = start_day;
		this.end_day = end_day;
		// 日历时间
		var disabledDate = [];
		disabledDate[0] = end_day;
		disabledDate[1] = start_day;
		this.date = disabledDate;
		// 日历时间

		this.tab_tow_dataTime_ss_inter = setInterval(() => {
			var data = moment(new Date()).format('HH:mm');
			// console.log(data);
			this.tab_tow_dataTime_ss = data;
		}, 1000);
		
	},
	beforeDestroy() {
		clearInterval(this.tab_tow_dataTime_ss_inter);
		console.log('销毁实例');
	},
	methods: {
		// 跳转
		input_chage(){
			// pagesA/cinema-chain/search/search?id=0
			uni.showToast({
				title: '正在跳转',
				duration:2000,
				icon:'none'
			});
			uni.navigateTo({
				url: '../cinema-chain/search/search?id=0',
			});
		},
		show_index_tow(){
			this.is_index_tow  = false;
		},
		show_index_three(){
			this.is_index_three  = false;
		},
		show_index_four(){
			this.is_index_four  = false;
		},
		// r日历点击
		ei_calendar_tap_four(e){
			console.log(e);
			var that = this;
			var data = e.format.split('/');
			
			var time = data[0] + '-' + data[1] + '-' + data[2];
			var code = this.code;
			
			let url = '/topprogram/main-movie';
			let All_data = {
				bdate:time,
				type:'chain',
				dtype:'range',
				chain:code
			}
			this.pz_index(url, that,All_data);
			this.pz_date = time;
			this.date_four = [new Date(time)];
			this.pz_date_data = moment(time).format('YYYY年MM月DD日');
			this.time_tab_Br_four = false;
			setTimeout(this.getData_four, 500);
		},
		// tabfour 前后点击
		center_tabthree_chehcked_four(index){
			// index == 0 是前一天  == 1 是后一天
			// index == 0是前一天  == 1 是后一天
			var code = this.code;
			var time = this.pz_date; // 保存的请求时间
			
			if (index == 0) {
				time = moment(time)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
			} else {
				time = moment(time)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
			}
			let url = '/topprogram/main-movie';
			let All_data = {
				bdate:time,
				type:'chain',
				dtype:'range',
				chain:code
			}
			this.pz_index(url, this,All_data);
			this.pz_date = time;
			this.pz_date_data = moment(time).format('YYYY年MM月DD日');
			
			this.date_four = [new Date(time)]; //、 日历显示时间
			// this.time_tab_Br_three = false;  // 关闭弹出日历
			setTimeout(this.getData_four, 500);
		},
		tab_tow_way() {
			var time_tab_tow = this.time_tab_tow;
			var dtype = '';
			var start_date = '';
			if (time_tab_tow == 0) {
				dtype = 'range';
				start_date = this.pf_date;
			} else if (time_tab_tow == 1) {
				dtype = 'week';
				start_date = this.format_week;
			} else if (time_tab_tow == 2) {
				dtype = 'month';
				start_date = this.format_month;
			} else if (time_tab_tow == 3) {
				dtype = 'year';
				start_date = this.format_year;
			}
			return { dtype, start_date };
		},
		// 地区选择
		click_grid(e) {
			// 获取当前选择的城市
			var time_tab_tow = this.time_tab_tow;

			let { dtype, start_date } = this.tab_tow_way();
			var code = this.code;
			var pages = this.pages;

			// var city_name = e;
			var that = this;
			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			//  都是地址
			var city_name = e;
			var district = e;
			//
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			this.tab_tow_city_name = city_name;
			// this.is_show = true;
			var url ='/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:dtype ,
				start_date,
				 type:'chain',
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			this.pf_index(url, this,0,All_data);
			this.is_show = true;
		},
		// 点击后一天
		right_date: function() {
			var code = this.code;
			var pages = this.pages;
			var that = this;
			var time_txt = that.tab_one_time_txt;
			if (time_txt == '日票房') {
				var format_data = that.pf_date;
				// if(!(moment(format_data).isBefore(max_day) == true)) return false
				var fwf = '';
				var is_check = that.tab_one_service;
				if (is_check == true) {
					fwf = 1;
				} else {
					fwf = 0;
				}
				var city_name = that.tab_tow_city_name;
				var district = that.tab_tow_city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}
				var gs_data = moment(format_data)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
				var this_data = moment(gs_data).format('YYYY年MM月DD日');
				let url ='/topprogram/main-cinema';
				let All_data = {
					chain:code,
					dtype:'range',
					start_date:gs_data,
					type:'chain',
					city:city_name,
					page:pages,
					with_fwf:fwf,
					district:district
				}
				this.tab_one_date_tiem = [new Date(gs_data)];
				this.pf_index(url, that,0,All_data);
				this.pf_date = gs_data;
				this.pf_date_data = this_data;
			} else if (time_txt == '周票房') {
				console.log(2);
				var this_index = that.format_week;
				var arr = this_index.split('-W');
				var year = arr[0];

				return false;
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
					console.log(1);
				} else if (max_year == year) {
					if (week <= max_week) {
						that.index_week(year, week);
						console.log(2);
					} else {
						u.showToast({
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
						wx.showToast({
							title: '超出本月',
							duration: 2000
						});
					}
				}
			} else if (time_txt == '年票房') {
				let time = new Date().getFullYear();
				console.log(time);
				var this_index = that.format_year;
				var now_year = that.now_year;
				let year = this_index + 1;
				console.log(year);
				if (time < year) {
					return false;
				}
				that.index_year(year);
			}
		},
		// 点击前一天
		left_date: function() {
			var code = this.code;
			var pages = this.pages;
			var that = this;
			var time_txt = that.tab_one_time_txt;
			if (time_txt == '日票房') {
				var format_data = that.pf_date;
				var min_day = that.min_day;
				if (moment(min_day).isBefore(format_data) == true) {
				} else {
					uni.showToast({
						title: '日期超出最大期限',
						duration: 2000,
						icon: 'none'
					});
					return false;
				}

				var fwf = '';
				var is_check = that.tab_one_service;
				if (is_check == true) {
					fwf = 1;
				} else {
					fwf = 0;
				}
				var city_name = that.tab_tow_city_name;
				var district = that.tab_tow_city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}

				var gs_data = moment(format_data)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
				var this_data = moment(gs_data).format('YYYY年MM月DD日');

				var url ='/topprogram/main-cinema';
				let All_data = {
					chain:code,
					dtype:'range',
					start_date:gs_data,
					type:'chain',
					city:city_name,
					page:pages,
					with_fwf:fwf ,
					district:district
				}
				this.tab_one_date_tiem = [new Date(gs_data)];
				this.pf_index(url, that,0,All_data);
				this.pf_date = gs_data;
				this.pf_date_data = this_data;
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
		//  调用月接口
		check_year_tow(e) {
			var year = e; //选择的年
			if (e <= 2016) {
				this.tab_one_service = false;
			}
			this.index_year(year);
		},
		//  调用年接口
		index_year: function(year) {
			var code = this.code;
			var pages = this.pages;
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
			var city_name = that.tab_tow_city_name;
			var district = that.tab_tow_city_name;
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
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			var url = '/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:'year',
				start_date:format_year,
				type:'chain',
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			this.pf_index(url, that,0,All_data);
			this.Data_select_header_tow = true; //总开关
			this.time_tab_tow_Br = true; //控制日历   不知道问什么不能关闭日历 关闭的话日期不刷新
			this.pf_date_data = this_year; //页面 显示时间
			this.tab_one_time_txt = time_txt; //显示日票房
			this.format_year = format_year; // 请求时间
		},
		index_month(year, month) {
			var code = this.code;
			var pages = this.pages;
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
			var city_name = this.tab_tow_city_name;

			var district = that.tab_tow_city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}

			//  请的月
			var url ='/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:'range',
				start_date:format_month,
				type:'chain',
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			this.pf_index(url, that,0,All_data);
			this.Data_select_header_tow = true; //总开关
			this.time_tab_tow_Br = false; //控制日历   不知道问什么不能关闭日历 关闭的话日期不刷新
			this.pf_date_data = this_month; //页面 显示时间
			this.tab_one_time_txt = time_txt; //显示日票房
			this.pf_date = format_month; // 请求时间
			this.format_month = format_month;
		},

		//选择月
		check_month_tow(item, e) {
			if (item.length == 3) {
				var it = Number(item.slice(0, 2));
			} else {
				var it = Number(item.slice(0, 1));
			}
			var that = this;
			var max_day = moment();
			var month = it; //选择的月
			var year = this.tab_tow_yue_year - 0; //选择的年
			if (year <= 2016) {
				this.tab_one_service = false;
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
		// 月里边的年点击
		tap_year_tow(item, index) {
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
			this.tab_tow_yue_year = year;
			this.curren_yue = index;
		},
		// 周点击
		check_week_tow(index, e) {
			console.log(index);
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
		},
		// 周接口调用
		index_week: function(year, week) {
			var code = this.code;
			var pages = this.pages;
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
			var city_name = that.tab_tow_city_name;
			var district = that.tab_tow_city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}

			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}

			var url ='/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:'week',
				start_date:format_week,
				type:'chain',
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			// var a = [new Date(gs_data)];
			this.pf_index(url, that,0,All_data);
			this.Data_select_header_tow = true; //总开关
			this.time_tab_tow_Br = false; //控制日历   不知道问什么不能关闭日历 关闭的话日期不刷新
			this.pf_date_data = this_week; //页面 显示时间
			this.tab_one_time_txt = time_txt; //显示周票房
			this.format_week = format_week;
		},
		// 点击年修改里边周
		click_year_tow: function(name, index) {
			// var year = e.currentTarget.dataset.name - 0;
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
			// console.log(to)
			// console.log(d)
			var i = 1;
			// console.log(is_weekend);
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
					console.log(from.getDate() + 1);
				} else {
					to.setDate(to.getDate() + 1);
					txt2 = to.getMonth() + 1 + '.' + to.getDate();
				}
				// console.log(txt2)
				week.push(txt + txt2);
			}
			this.curren_tab_tow = index;
			this.tab_tow_is_year = name;
			this.tab_tow_week = week; //当前年的所有数据
		},
		// 日历点击
		ei_calendar_tap_tow_click(event) {
			var code = this.code;
			var pages = this.pages;
			console.log(event);
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
			var that = this;
			var fwf = '';
			var time_txt = '日票房';
			var is_check = this.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			var max_day = that.max_day;
			if (event.month < 10) {
				event.month = '0' + event.month;
			}
			if (event.day < 10) {
				event.day = '0' + event.day;
			}

			var check_day = event.year + '年' + event.month + '月' + event.day + '日';
			var gs_data = event.year + '-' + event.month + '-' + event.day;
			var dd_data = moment(gs_data).format('YYYY-MM-DD');
			// console.log();

			if (Number(dd_data) <= 20161231) {
				this.service = false;
				this.dd_data = dd_data;
			}

			// 选择周几
			// var what_day = '周' + '日一二三四五六'.charAt(moment(gs_data).day());
			var what_day = moment(gs_data).format('YYYY年MM月DD日');

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
				// console.log(add_data);
				var city_name = that.tab_tow_city_name;
				var district = that.tab_tow_city_name;
				if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
					city_name = '';
				}
				if (district.indexOf('线城市') != -1) {
					district = district;
				} else {
					district = '';
				}
				var url ='/topprogram/main-cinema';
				let All_data = {
					chain:code,
					dtype:'range',
					start_date:gs_data,
					type:'chain',
					city:city_name,
					page:pages ,
					with_fwf:fwf,
					district:district
				}
				var a = [new Date(gs_data)];
				this.pf_index(url, that,0,All_data);
				this.Data_select_header_tow = true; //总开关
				this.time_tab_tow_Br = false; //控制日历   不知道问什么不能关闭日历 关闭的话日期不刷新
				this.pf_date_data = check_day; //页面 显示时间
				this.tab_one_time_txt = time_txt; //显示日票房
				this.pf_date = gs_data; // 请求时间
			} else {
				uni.showToast({
					title: '超出最大范围',
					duration: 2000
				});
			}
		},
		// 服务费选择
		tab_one_checkboxChange() {
			var is_show = this.tab_one_service;

			var code = this.code;
			var pages = this.pages;

			var year = [];
			let { dtype, start_date } = this.tab_tow_way();

			var fwf = 0;

			if (!is_show) {
				fwf = 1;
			} else {
				fwf = 0;
			}

			var city_name = this.tab_tow_city_name;
			var district = this.tab_tow_city_name;
			if (city_name == '全国' || city_name.indexOf('线城市') != -1) {
				city_name = '';
			}
			if (district.indexOf('线城市') != -1) {
				district = district;
			} else {
				district = '';
			}
			var url = '/topprogram/main-cinema';
			let All_data = {
				chain:code,
				dtype:dtype,
				start_date:start_date,
				type:chain,
				city:city_name,
				page:pages,
				with_fwf:fwf,
				district:district
			}
			this.pf_index(url, this,0,All_data);
			this.tab_one_service = !is_show;
		},

		// 地区跳转
		dddd(name) {
			this.alpha = name;
		},
		// 开启地区选择
		city_click() {
			this.is_show = false;
		},
		// 选择年 周日
		click_tab_tow(index) {
			console.log(index);
			if (index == 0) {
				this.time_tab_tow_Br = true;
				this.time_tab_tow = index;
			} else {
				this.time_tab_tow_Br = false;
				this.time_tab_tow = index;
			}
		},
		// 开启时间选择
		click_time() {
			// console.log(11);
			var index = this.time_tab_tow;
			console.log(index);
			if (index == 0) {
				this.time_tab_tow_Br = true;
			} else {
				this.time_tab_tow_Br = false;
			}

			this.Data_select_header_tow = false;
			// console.log(111);
		},

		center_tabthree_chehcked(index) {
			// index == 0 是前一天  == 1 是后一天
			// index == 0是前一天  == 1 是后一天
			var code = this.code;
			var time = this.pp_date; // 保存的请求时间

			if (index == 0) {
				time = moment(time)
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
			} else {
				time = moment(time)
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
			}
			var url = '/topprogram/main-movie';
			let All_data = {
				bdate:time,
				type:'chain',
				dtype:'range',
				chain:code
			}
			this.pp_index(url, this,All_data);
			this.pp_date = time;
			this.pp_date_data = moment(time).format('YYYY年MM月DD日');

			this.date_three = [new Date(time)]; //、 日历显示时间
			// this.time_tab_Br_three = false;  // 关闭弹出日历
			setTimeout(this.getData_three, 500);
		},
		// tabthree日历
		show_tabthree_show_chhhecked(index) {
			if (index == 0) {
				this.time_tab_Br_three = true;
			}else {
				this.time_tab_Br_four = true;
			}
		},
		ei_calendar_tap_three(e) {
			var that = this;
			var data = e.format.split('/');

			var time = data[0] + '-' + data[1] + '-' + data[2];
			var code = this.code;

			var url = '/topprogram/main-movie';
			let All_data = {
				bdate:time,
				type:'chain',
				dtype:'range',
				chain:code
			}
			this.pp_index(url, that,All_data);
			this.pp_date = time;
			this.date_three = [new Date(time)];
			this.pp_date_data = moment(time).format('YYYY年MM月DD日');
			this.time_tab_Br_three = false;
			setTimeout(this.getData_three, 500);
		},
		// tabthree日历
		// 点击日历
		ei_calendar_tap_tow(e) {
			var that = this;
			var data = e.format.split('/');

			var time = data[0] + '-' + data[1] + '-' + data[2];
			console.log(time);
			var code = this.code;
			// zb_title_two
			// var date = moment().format('YYYY-MM-DD')
			//影片票房接口
			var url = '/topprogram/cinema-movie';;
			let All_data = {
				cinema_code:code,
				dtype:'range',
				start_date:time,
				end_date:time
			}

			this.pf_index(url, that,0,All_data);
			this.pf_date = time;
			this.pf_date_data = moment(time).format('YYYY年MM月DD日');

			this.date_tow = [new Date(time)];
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
			year.push(Number(item));
			// 提示选择 结束年
			if (year.length == 1) {
				uni.showToast({
					title: '请选择结束年',
					icon: 'none',
					// mask: true,
					duration: 2000
				});
			}
			console.log(_self.year_data);
			_self.year_data = year;
			this.year_index = index;
			//   有了两个数之后
			if (year.length == 2) {
				if (year[0] == year[1]) {
					uni.showToast({
						title: '请勿选择同一年',
						icon: 'none',
						// mask: true,
						duration: 1000
					});
					this.year_data = year[0];
					return false;
				}

				var code = this.code;
				if (year[0] > year[1]) {
					var end_data = year[0];
					var strat_data = year[1];
					var url = '/topprogram/main';
					
					let All_data = {
						chain:code,
						dtype:'year',
						start_date:strat_data,
						end_date:end_data,
						type:'chain'
					}

					this.start_day_year = strat_data;
					this.end_day_year = end_data;
					this.start_day = strat_data + '';
					this.end_day = end_data + '';
					this.click_num = 4;
					this.Data_select_header = true;
					this.year_data = [];
					this.year_index = -1;
					this.cinema_data(url, this,All_data);
					setTimeout(this.getData, 500);
				} else if (year[1] > year[0]) {
					var end_data = year[1];
					var strat_data = year[0];
					var url = '/topprogram/main';
					let All_data = {
						chain:code,
						dtype:'year',
						start_date:strat_data,
						end_date:end_data,
						type:'chain'
					}
					this.start_day_year = strat_data;
					this.end_day_year = end_data;
					this.start_day = strat_data + '';
					this.end_day = end_data + '';
					this.click_num = 4;
					this.Data_select_header = true;
					this.year_data = [];
					this.year_index = -1;
					this.cinema_data(url, this,All_data);
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
					this.ALL_month = ALL_month[0];
					return false;
				}
			} else {
				uni.showToast({
					title: '请选择结束月',
					duration: 2000,
					icon: 'none'
				});
			}
			ALL_month.push(new Date(year + '-' + month + '-' + '01').getTime());
			this.ALL_month_index = index;
			this.ALL_month = ALL_month;
			// 点击不时
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
							title: '最多选择12个月',
							icon: 'none',
							duration: 2000
						});
						this.ALL_month = ALL_month[0];
						return false;
					} else {
						// 这里写逻辑
						var start_day = moment(new Date(ALL_month[1])).format('YYYYMM');
						var end_day = moment(new Date(ALL_month[0])).format('YYYYMM');
						this.start_day_thre = moment(new Date(ALL_month[0])).format('YYYY-MM');
						this.end_day_three = moment(new Date(ALL_month[0])).format('YYYYMM');
						this.start_day = start_day;
						this.end_day = end_day;
						this.click_num = 3;
						this.time_tab = 2;
						this.Data_select_header = true;
						this.ALL_month = [];
						this.ALL_month_index = -1;
						var url = '/topprogram/main';
						let All_data = {
							chain:code,
							dtype:'month',
							start_date:start_day,
							end_date:end_day,
							type:'chain'
						}
						this.cinema_data(url, that,All_data);
						setTimeout(that.getData, 500);
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
							title: '最多选择12个月',
							icon: 'none',
							duration: 2000
						});
						this.ALL_month = ALL_month[0];
						return false;
					} else {
						// 这里写逻辑
						var start_day = moment(new Date(ALL_month[0])).format('YYYYMM');
						var end_day = moment(new Date(ALL_month[1])).format('YYYYMM');
						this.start_day_thre = moment(new Date(ALL_month[0])).format('YYYY-MM');
						this.end_day_three = moment(new Date(ALL_month[1])).format('YYYY-MM');
						this.start_day = start_day;
						this.end_day = end_day;
						this.click_num = 3;
						this.time_tab = 2;
						this.Data_select_header = true;
						this.ALL_month = [];
						this.ALL_month_index = -1;
						var url = '/topprogram/main'
						let All_data = {
							chain:code,
							dtype:'month',
							start_date:start_day,
							end_date:end_day,
							type:'chain'
						}
						this.cinema_data(url, that,All_data);
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
			var len = item.length;
			var time = '';
			time = item.split('~')[1];
			time = time.split('.');
			if (Number(time[0]) < 10) {
				time[0] = '0' + time[0];
			}
			if (Number(time[1]) < 10) {
				time[1] = '0' + time[1];
			}
			time = is_year + '-' + time[0] + '-' + time[1];
			this.active_z = index;
			var wek = index;
			// 选择的周
			if (wek < 10) {
				wek = '0' + (wek + 1);
			}

			data_alltime_week.push(new Date(time));
			if (data_alltime_week.length == 1) {
				var start_day = is_year + '-W' + wek;
				var max_day = moment();
				var max_week = moment(max_day).format('w');
				var max_year = moment(max_day).format('YYYY');

				if (max_year > is_year) {
					var start_days = is_year + week + '周';
					(this.start_day = start_day), (this.sel_year = is_year), (this.sel_week = week), (this.start_days = start_days);
				} else if (max_year == is_year) {
					if (wek <= max_week) {
						var start_days = is_year + wek + '周';
						(this.start_day = start_day), (this.sel_year = is_year), (this.sel_week = wek), (this.start_days = start_days);
					}

					uni.showToast({
						title: '请选择结束日期',
						mask: false,
						icon: 'none',
						duration: 2000
					});
				}
			}

			// 有结束周时
			if (data_alltime_week.length == 2) {
				var start_day = this.start_day;
				var start_days = this.start_days;
				// console.log(start_day, '--------ka开始');
				var max_day = moment();
				var max_week = moment(max_day).format('w');
				var max_year = moment(max_day).format('YYYY');
				// 两个时间相同 则 阻止
				if (data_alltime_week[0] == data_alltime_week[1]) {
					uni.showToast({
						title: '请选择不同的周',
						mask: false,
						duration: 2000,
						icon: 'none'
					});
					this.data_alltime_week = data_alltime_week[0];
					return false;
				}

				var max_year = moment(new Date()).format('YYYY');
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
						var a = from.getTime();
						// console.log(a);
						var b = new Date().getTime();
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
						uni.showToast({
							title: '最多选择12周',
							mask: false,
							duration: 2000,
							icon: 'none'
						});
						this.data_alltime_week = [];
						return false;
					} else {
						if (is_year < max_year) {
							var end_day = is_year + '-W' + wek;
							var end_days = is_year + wek + '周';
							var start_day_all = start_day.split('-W');
							var start_year = start_day_all[0];
							var start_week = start_day_all[1];
							if (start_year <= is_year) {
								if (start_week <= wek) {
								} else {
									end_day = start_day;
									start_day = is_year + '-W' + wek;
									end_days = start_days;
									start_days = is_year + week + '周';
								}
							} else {
								end_day = start_day;
								start_day = is_year + '-W' + wek;
								end_days = start_days;
								start_days = is_year + week + '周';
							}

							start_days = start_day.replace('-W', '-') + '周';
							end_days = end_day.replace('-W', '-') + '周';
							this.start_day = start_day;
							this.end_day = end_day;
							this.start_days = start_days;
							this.end_days = end_days;
							this.Data_select_header = true;
							this.click_num = 2;
							this.active_z = -1;
							var url = '/topprogram/main';
							let All_data = {
								chain:code,
								dtype:'week',
								start_date:start_day,
								end_date:end_day,
								type:'chain'
							}
							
							
							
							this.cinema_data(url, this,All_data);
							setTimeout(this.getData, 500);
						} else if (is_year == max_year) {
							var end_day = is_year + '-W' + wek;
							var end_days = is_year + wek + '周';
							var start_day_all = start_day.split('-W');
							var start_year = start_day_all[0];
							var start_week = start_day_all[1];
							if (start_year <= is_year) {
								if (start_week <= wek) {
								} else {
									end_day = start_day;
									start_day = is_year + '-W' + wek;
									end_days = start_days;
									start_days = is_year + wek + '周';
								}
							} else {
								end_day = start_day;
								start_day = is_year + '-W' + wek;
								end_days = start_days;
								start_days = is_year + wek + '周';
							}

							start_days = start_day.replace('-W', '-') + '周';
							end_days = end_day.replace('-W', '-') + '周';

							this.start_day = start_day;
							this.end_day = end_day;
							this.start_days = start_days;
							this.end_days = end_days;
							this.Data_select_header = true;
							this.active_z = -1;
							this.click_num = 2;
							var url = '/topprogram/main'
							let All_data = {
								chain:code,
								dtype:'week',
								start_date:start_day,
								end_date:end_day,
								type:'chain'
							}
							that.cinema_data(url, that,All_data);
							setTimeout(that.getData, 500);
						}
					}
				} else if (data_alltime_week[1] > data_alltime_week[0] > 0) {
					var to = data_alltime_week[1];
					for (var from = data_alltime_week[0]; from < to; i++) {
						if (is_weekend == 1) {
							var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
						} else {
							var zfrom = from;
						}
						var a = from.getTime();
						var b = new Date().getTime();
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
						uni.showToast({
							title: '最多选择12周',
							mask: false,
							duration: 2000,
							icon: 'none'
						});
						this.data_alltime_week = [];
						return false;
					} else {
						if (is_year < max_year) {
							var end_day = is_year + '-W' + wek;
							var end_days = is_year + wek + '周';
							var start_day_all = start_day.split('-W');
							var start_year = start_day_all[0];
							var start_week = start_day_all[1];
							if (start_year <= is_year) {
								if (start_week <= wek) {
								} else {
									end_day = is_year + '-W' + wek;
									start_day = start_day;
									end_days = start_days;
									start_days = is_year + week + '周';
								}
							} else {
								end_day = is_year + '-W' + wek;
								start_day = start_day;
								end_days = start_days;
								start_days = is_year + week + '周';
							}

							start_days = start_day.replace('-W', '-') + '周';
							end_days = end_day.replace('-W', '-') + '周';
							this.end_day = end_day;
							this.start_days = start_days;
							this.end_days = end_days;
							this.Data_select_header = true;
							this.click_num = 2;
							this.active_z = -1;
							var url = '/topprogram/main';
							let All_data = {
								chain:code,
								dtype:'week',
								start_date:start_day,
								end_date:end_day,
								type:'chain'
							}
							this.cinema_data(url, this,All_data);
							setTimeout(this.getData, 500);
						} else if (is_year == max_year) {
							var end_day = is_year + '-W' + wek;
							var end_days = is_year + wek + '周';
							var start_day_all = start_day.split('-W');
							var start_year = start_day_all[0];
							var start_week = start_day_all[1];
							if (start_year <= is_year) {
								if (start_week <= wek) {
								} else {
									end_day = start_day;
									start_day = start_days;
									end_days = is_year + '-W' + wek;
									start_days = is_year + wek + '周';
								}
							} else {
								end_day = is_year + '-W' + wek;
								start_day = start_day;
								end_days = start_days;
								start_days = is_year + wek + '周';
							}

							start_days = start_day.replace('-W', '-') + '周';
							end_days = end_day.replace('-W', '-') + '周';

							this.start_day = start_day;
							this.end_day = end_day;
							this.start_days = start_days;
							this.end_days = end_days;
							this.Data_select_header = true;
							this.click_num = 2;
							this.active_z = -1;
							var url = '/topprogram/main';
							let All_data = {
								chain:code,
								dtype:'week',
								start_date:start_day,
								end_date:end_day,
								type:'chain'
							}
							that.cinema_data(url, that,All_data);
							setTimeout(that.getData, 500);
						}
					}
				}
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
				var a = from.getTime();
				var b = new Date().getTime();
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
			var code = this.code; // 影投名字
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
				month = '0' + month;
			}
			if (day < 10) {
				day = '0' + day;
			}
			data = year + '-' + month + '-' + day;
			data_alltime.push(new Date(data).getTime());

			// 当天的 时间戳
			var j_time = new Date().getTime();

			if (data_alltime[data_alltime.length - 1] > j_time) {
				uni.showToast({
					title: '最大日期为今天',
					duration: 2000,
					icon: 'none'
				});
				this.data_alltime = [];
				return false;
			}

			if (data_alltime.length == 2) {
				// 点击同一天
				if (data_alltime[0] == data_alltime[1]) {
					var time = (data_alltime[0] - data_alltime[1]) / 1000 / 60 / 60 / 24;
					var end_day = moment(data_alltime[0]).format('YYYY-MM-DD');
					var start_day = moment(data_alltime[1]).format('YYYY-MM-DD');
					var url = '/topprogram/main';
					let All_data = {
						chain:code,
						dtype:'range',
						start_date:start_day,
						end_date:end_day,
						type:'chain'
					}
					this.cinema_data(url, this,All_data);
					this.start_day = start_day;
					this.end_day = end_day;
					this.Data_select_header = true;
					this.click_num = 1;
					this.time_tab_Br = false;
					setTimeout(this.getData, 500);
				}

				if (data_alltime[0] - data_alltime[1] > 0) {
					var time = (data_alltime[0] - data_alltime[1]) / 1000 / 60 / 60 / 24;
					var end_day = moment(data_alltime[0]).format('YYYY-MM-DD');
					var start_day = moment(data_alltime[1]).format('YYYY-MM-DD');
					// 最多选择 92天
					if (time < 92) {
						var url = '/topprogram/main'
						let All_data = {
							chain:code,
							dtype:'range',
							start_date:start_day,
							end_date:end_day,
							type:'chain'
						}
						this.cinema_data(url, this);
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
						});
						return false;
					}
				} else if (data_alltime[1] - data_alltime[0] > 0) {
					var time = (data_alltime[1] - data_alltime[0]) / 1000 / 60 / 60 / 24;
					var end_day = moment(data_alltime[1]).format('YYYY-MM-DD');
					var start_day = moment(data_alltime[0]).format('YYYY-MM-DD');
					// 最多选择 92天
					if (time < 92) {
						var url = '/topprogram/main'
						let All_data = {
							chain:code,
							dtype:'range',
							start_date:start_day,
							end_date:end_day,
							type:'chain'
						}
						this.cinema_data(url, this,All_data);
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
						});
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
			this.time_tab = index;
		},
		disabledDate(date) {
			const start = new Date('2019/5/10').getTime();
			const end = new Date('2019/7/21').getTime();
			return date.getTime() <= start || date.getTime() >= end;
		},
		// 月方法
		//  c初始化 周 所有的数据
		z_data(index = 0) {
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
			// console.log(d);
			// console.log(to);
			for (var from = d; from < to; i++) {
				if (is_weekend == 1) {
					var zfrom = new Date(from.getFullYear(), from.getMonth(), from.getDate() + 4);
				} else {
					var zfrom = from;
				}
				var a = from.getTime();
				// console.log(a);
				var b = new Date().getTime();
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
			this.is_year = all_year[0];
			if (index == 1) {
				this.tab_tow_week = week;
			} else {
				this.week = week;
			}

			this.year = all_year;
		},
		// tabgour 事件
		showRing_three(canvasId, chartData, title = '', name = '', color = '') {
			canvasRing_three = new uCharts({
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
				dataLabel: false
			});
		},
		touchRing_three(e) {
			var index = canvasRing_three.getCurrentDataIndex(e);
			if (index >= 0) {
				var num = this.tafourcan_num;
				var title = canvasRing_three.opts.series[index].name;
				var subtitle = canvasRing_three.opts.series[index].data - 0;
				subtitle = ((subtitle / num) * 100).toFixed(2) + '%';
				var color = canvasRing_three.opts.series[index].color;
				canvasRing_three.updateData({
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
		// tabfour 事件
		// tab one 时间事件
		// tabthree      
		showRing_tow(canvasId, chartData, title = '', name = '', color = '') {
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
					// offsetY: -30 * _self.pixelRatio
				},
				subtitle: {
					name: title,
					color: '#666666',
					fontSize: 18 * _self.pixelRatio,
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

				width: uni.upx2px(750) * _self.pixelRatio,
				height: uni.upx2px(500) * _self.pixelRatio,
				disablePieStroke: true,
				dataLabel: false
			});
		},
		touchRing_tow(e) {
			var index = canvaRing_tow.getCurrentDataIndex(e);
			if (index >= 0) {
				var num = this.tathreecan_num;
				var title = canvaRing_tow.opts.series[index].name;
				var subtitle = canvaRing_tow.opts.series[index].data - 0;
				subtitle = ((subtitle / num) * 100).toFixed(2) + '%';
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
		showRing(canvasId, chartData, title = '', name = '', color = '') {
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
					// offsetY: -30 * _self.pixelRatio
				},
				subtitle: {
					name: title,
					color: '#666666',
					fontSize: 18 * _self.pixelRatio,
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

				width: uni.upx2px(750) * _self.pixelRatio,
				height: uni.upx2px(500) * _self.pixelRatio,
				disablePieStroke: true,
				dataLabel: false
			});
		},
		touchRing(e) {
			var index = canvaRing.getCurrentDataIndex(e);
			if (index >= 0) {
				var num = this.tatowcan_num;
				var title = canvaRing.opts.series[index].name;
				var subtitle = canvaRing.opts.series[index].data - 0;
				console.log(num, subtitle);
				subtitle = ((subtitle / num) * 100).toFixed(1) + '%';
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
		more_index_header_click(index) {
			if (index == 0) {
				this.is_index = true;
			}else if (index ==1) {
				this.is_index_tow = true;
			}else if (index == 2) {
				this.is_index_three = true;
			}else if (index == 3) {
				console.log(111);
				this.is_index_four = true;
			}
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
					disableGrid: true
				},
				yAxis: {
					gridType: 'solid',
					gridColor: '#CCCCCC',
					dashLength: 5,
					splitNumber: 5,
					min: 0,
					max: 5
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
			console.log(data_item);
			canvaArea.showToolTip(e, {
				format: function(item, category) {
					return data_item + '：' + ' ' + item.data + '万';
				}
			});
		},
		//调用影院详情接口
		async cinema_data(url, that,All_data) {
			// console.log(url);
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			
			res.realtime_data.total_bo_s  = (Number(res.realtime_data.total_bo_s) / 10000).toFixed(2) + '万'
			res.realtime_data.total_people_s = (Number(res.realtime_data.total_people_s) / 10000).toFixed(2) + '万'
			res.data.forEach((item, index) => {
				//单座票房  票房 / 座位总数
				item.avg_seats_income = (Number(item.total_bo_s) / Number(item.seats_s)).toFixed(2);
				// 单银幕票房   票房 / 厅数
				item.avg_hall_income = (Number(item.real_bo_s) / Number(res.msg.halls) / 10000).toFixed(2);
				// 分账票房
				if (Number(item.real_bo_s / 100000000) > 1) {
					item.real_bo_s = (Number(item.real_bo_s) / 100000000).toFixed(2) + '亿';
				} else {
					item.real_bo_s = (Number(item.real_bo_s) / 10000).toFixed(2);
				}

				//人次
				item.total_people_s = (Number(item.total_people_s) / 10000).toFixed(0);
				// 场次
				item.session_s = Number(item.session_s).toFixed(0);
				// 场均人次
				item.people_per_session = (Number(item.people_per_session) - 0).toFixed(0);
				// 平均票价
				item.avg_price = (Number(item.avg_price) - 0).toFixed(1);
				// 网售票房
				// console.log(Number(item.ol_total_bo_s) / 10000  > 0);
				if (Number(item.ol_total_bo_s) / 10000  > 0) {
					item.ol_total_bo_s = (Number(item.ol_total_bo_s) / 10000 - 0).toFixed(2);
				}else{
					item.ol_total_bo_s  = '--'
				}
				// 网售票房占比
				if (Number(item.ol_total_rate) * 100 > 0) {
					item.ol_total_rate = (Number(item.ol_total_rate) * 100).toFixed(2);
				}else {
					item.ol_total_rate = '--'
				}
				
				// 网售人次
				if (Number(item.ol_people_s) / 10000 > 0) {
					item.ol_people_s = (Number(item.ol_people_s) / 10000 - 0).toFixed(2);
				}else {
					item.ol_people_s = '--'
				}
				
				
				
				// 网售人次占比
				if (Number(item.ol_people_rate)  * 100 > 0) {
					item.ol_people_rate = (Number(item.ol_people_rate) * 100).toFixed(2);
				}else {
					item.ol_people_rate = '--'
				}
				// 场均票房
				item.cj_total = (Number(item.total_bo_s) / Number(item.session_s)).toFixed(2);
				
				// 全国片名  rank
				if (this.click_num == 4) {
					item.year = item.bdate.slice(0, 4);
				} else if (this.click_num == 2) {
					var a = item.yearweek.slice(0, 4);
					var b = item.yearweek.slice(4);

					item.cus_weeks = a + '-' + b;
				}
			});

			var arr = [];
			if (this.click_num == 3) {
				res.data.forEach((item, i) => {
					item.bdate = item.bdate.slice(0, 7);
					arr.push(item);
				});
				this.data = arr;
			} else {
				this.data = res.data;
			}
			// console.log(res.msg);
			
			// 座位数
			res.msg.seats = (Number(res.msg.seats) / 10000 ).toFixed(2) +'万'
			_self.cinema_data_data = res.msg; // 影院信息
			_self.realtime_data = res.realtime_data;
			_self.cinemalist_data = res.data;
		},
		//getData方法里发送ajax
		async getData() {
			var that = this;
			var start_day = that.start_day;
			var end_day = that.end_day;
			var code = that.code;
			var time_tab = that.time_tab;
			var dtype = '';
			if (time_tab == 0) {
				dtype = 'range';
			} else if (time_tab == 1) {
				dtype = 'week';
			} else if (time_tab == 2) {
				dtype = 'month';
			} else {
				dtype = 'year';
			}
			var url = '/topprogram/main';
			let All_data = {
				chain:code,
				dtype:dtype,
				start_date:start_day,
				end_date:end_day,
				type:'chain'
			}
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			for (var i in res.js.total) {
				res.js.total[i] = (Number(res.js.total[i]) / 10000).toFixed(1);
			}
			
			let Area = {
				categories: [],
			
				series: [
					{
						color: '#F08E2D',
						name: '票房趋势',
						data: []
					}
				]
			};
			// 完整的 日期
			var categories_s = [];
			res.js.xA.forEach((item, i) => {
				if (this.click_num == 1) {
					categories_s.push(item + '日');
					item = item.slice(8);
					Area.categories.push(item);
				} else if (this.click_num == 2) {
					categories_s.push(item + '周');
					Area.categories.push(item);
				} else if (this.click_num == 3) {
					// console.log(res.cinema_js);
					categories_s.push(item + '月');
					Area.categories.push(item);
				} else if (this.click_num == 4) {
					categories_s.push(item + '年');
					Area.categories.push(item);
				}
			}); // x 轴
			res.js.total.forEach((item, i) => {
				Area.series[0]['data'].push(Number(item));
			}); // y轴
			
			_self.categories_s = categories_s;
			_self.showArea('canvasArea', Area);
			
		},
		// 中间部分tab
		center_header_click(index) {
			var code = this.code;
			var that = this;
			var zb_title = [
				{
					zb_name: '分账票房(万元)',
					id: 0,
					front_row: true
				},
				{
					zb_name: '人次(万)',
					id: 1,
					front_row: true
				},
				{
					zb_name: '场次',
					id: 2,
					front_row: true
				},
				{
					zb_name: '场均人次',
					id: 3,
					front_row: true
				},
				{
					zb_name: '平均票价',
					id: 4,
					front_row: false
				},
				{
					zb_name: '全国排名',
					id: 5,
					front_row: false
				},
				{
					zb_name: '网售票房',
					front_row: false
				},
				{
					zb_name: '网售票房占比',
					front_row: false
				},
				{
					zb_name: '网售人次',
					front_row: false
				},
				{
					zb_name: '网售人次占比',
					front_row: false
				},
				{
					zb_name: '单座票房',
					front_row: false
				},
				{
					zb_name: '场均票房',
					front_row: false
				},
				{
					zb_name: '单银幕票房(万元)',
					front_row: false
				}
			];
			var zb_title_two = [
				{
					zb_name: '票房',
					two_title: '(万元)',
					is_check: '',
					no_check: '分账',
					front_row: true
				},
				{
					zb_name: '票房占比',
					two_title: '',
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
					zb_name: '平均票价',
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
			];
			var zb_title_three = [
				{
					zb_name: '实时票房(万元)',
					id: 0,
					front_row: true
				},
				{
					zb_name: '人次',
					id: 1,
					front_row: true
				},
				{
					zb_name: '场次',
					id: 2,
					front_row: true
				},
				{
					zb_name: '场均人次',
					id: 3,
					front_row: true
				},
				{
					zb_name: '平均票价',
					id: 4,
					front_row: false
				},
				{
					zb_name: '上座率',
					id: 5,
					front_row: false
				},
				{
					zb_name: '票房占比',
					front_row: false
				},
				{
					zb_name: '排场占比',
					front_row: false
				},
				{
					zb_name: '排座占比',
					front_row: false
				},
				{
					zb_name: '网售票房',
					front_row: false
				},
				{
					zb_name: '网售票房占比',
					front_row: false
				},
				{
					zb_name: '网售人次',
					front_row: false
				},
				{
					zb_name: '网售人次占比',
					front_row: false
				},
				{
					zb_name: '累计票房',
					front_row: false
				}
			];
			
			var zb_title_four = [
				{
					zb_name: '场次',
					id: 0,
					front_row: true
				},
				{
					zb_name: '排场占比',
					id: 1,
					front_row: true
				},
				{
					zb_name: '排座数',
					id: 2,
					front_row: true
				},
				{
					zb_name: '排座占比',
					id: 3,
					front_row: true
				},
				{
					zb_name: '黄金场 （场次）',
					id: 4,
					front_row: false
				},
				{
					zb_name: '黄金场 （占比)',
					id: 5,
					front_row: false
				}
			];
			if (index == 0) {
				this.zb_title = zb_title;

				var end_day = moment(new Date()).format('YYYY-MM-DD');
				var start_day = moment(start_day)
					.subtract(15, 'days')
					.format('YYYY-MM-DD');
				var url = '/topprogram/main'
				let All_data = {
					chain:code,
					dtype:'range',
					start_date:start_day,
					end_date:end_day,
					type:'chain'
				}
				
				
				this.cinema_data(url, this,All_data);
				this.start_day = start_day;
				this.end_day = end_day;
				this.click_num = 1;
				this.time_tab = 0;
				setTimeout(this.getData, 500);
			} else if (index == 1) {
				this.dataMap();
				this.center_header_index = 1;
				var date = moment().format('YYYY-MM-DD');
				var pf_date = that.pf_date;
				//影片票房接口
				var url = '/topprogram/main-cinema'
				let All_data = {
					chain:code,
					dtype:'range',
					start_date:date,
					type:'chain',
					city:'',
					page:1
				}
				that.pf_index(url, that,0,All_data);
				this.zb_title = zb_title_two;
				this.pf_date = date;
				this.tab_one_date_tiem = [new Date(date)];
				this.pf_date_data = moment(date).format('YYYY年MM月DD日');
				this.time_tab = '0';
				this.time_dd = 0;
				this.z_data(1);
			} else if (index == 2) {
				//影片排片接口
				var date = moment().format('YYYY-MM-DD');
				var url = '/topprogram/main-movie';
				let All_data = {
					bdate:date,
					type:'chain',
					dtype:'range',
					chain:code
				}
				this.pp_index(url, that,All_data);
				this.zb_title = zb_title_three;
				this.pp_date = date;
				this.date_three = [new Date(date)];
				this.pp_date_data = moment(date).format('YYYY年MM月DD日');
				setTimeout(this.getData_three, 500);
			} else if (index == 3) {
				//影片排片接口
				var date = moment().format('YYYY-MM-DD');
				var url = '/topprogram/main-movie';
				let All_data = {
					bdate:date,
					type:'chain',
					dtype:'range',
					chain:code
				}
				this.pz_index(url, that,All_data);
				this.zb_title = zb_title_four;
				this.pz_date = date;
				this.date_four = [new Date(date)];
				this.pz_date_data = moment(date).format('YYYY年MM月DD日');
				setTimeout(this.getData_four, 500);
			}
			this.center_header_index = index;
		},
		async pz_index(url,that,All_data){
			
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			
			if (Number(res.sum.total_bo_s) / 100000000 > 1) {
				res.sum.total_bos_s = (Number(res.sum.total_bo_s) / 100000000).toFixed(2) + '亿';
			} else {
				res.sum.total_bos_s = (Number(res.sum.total_bo_s) / 10000).toFixed(2) + '万';
			}
			var pp_date = this.pz_date;
			var tt = moment(pp_date).format('YYYY-MM-DD');
			var time_get = new Date(tt).getTime();
			
			for (var i in res.data) {
				//累计票房
				if (res.data[i].bos / 100000000 > 1) {
					res.data[i].bos = (res.data[i].bos / 100000000 - 0).toFixed(2) + "亿"
				} else if (res.data[i].bos / 10000 > 1) {
					res.data[i].bos = (res.data[i].bos / 10000).toFixed(2) + "万"
				} else {
					res.data[i].bos = (res.data[i].bos - 0).toFixed(0)
				}
				// 黄金场次占比
				res.data[i].gd_session_rate = (Number(res.data[i].gd_session) / Number( res.sum.gd_session) *100).toFixed(2)
				// 上座率
				res.data[i].occupancy = (res.data[i].occupancy * 100).toFixed(2)
				// 排场占比
				res.data[i].pc_zb = (res.data[i].session_s / res.sum.session_s * 100).toFixed(2)
				// 排座占比
				res.data[i].pz_zb = (Number(res.data[i].seats_s) / Number(res.sum.seats_s) * 100).toFixed(2)
			
				// 排座	// total_seats_s
				
				// 上映时间
				var time_all = new Date(res.data[i].publish_date).getTime()
				var time = (time_get - time_all) / 1000 / 60 / 60 / 24
				if (time == 0) {
					res.data[i].publish_date = `首映`
				} else {
					res.data[i].publish_date = `上映${time}天`
				}
			}
			this.pz_sum_list = res.sum;
			this.pz_list = res.data;
		},
		// 图表
		async getData_four(){
			var that = this;
			var code = this.code;
			var date = this.pz_date;
			let userType = await this.detection_validity();
			var url = '/topprogram/main-movie'
			let All_data = {
				bdate:date,
				type:'chain',
				dtype:'range',
				chain:code,
				userType
			}
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00', '#f87a01', '#d22f0e', '#CDAD00'];
			let Ring = {
				series: []
			};
			res.movie_data_js.xA.forEach((item, i) => {
				if (item.length > 5) {
					item = item.slice(0, 5) + '...';
				}
						
				Ring.series.push({
					name: item,
					color: color[i],
					data: res.movie_data_js.total[i] - 0
				});
			});
			var num = 0;
			for (let aa in Ring.series) {
				num += Ring.series[aa].data - 0;
			}
			var a = (Ring.series[0].data / num) * 100;
			_self.showRing_three('canvasRing_three', Ring, Ring.series[0].name, a.toFixed(2) + '%', Ring.series[0].color);
			this.tafourcan_num = num;
		},
		//getData_two方法里发送ajax
		async getData_three() {
			var that = this;
			var code = this.code;
			var date = this.pp_date;
			
			
			let userType = await this.detection_validity();
			var url = '/topprogram/main-movie'
			let All_data = {
				bdate:date ,
				type:'chain',
				dtype:'range',
				chain:code,
				userType
			}
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			
			var color = ['#FF5850', '#3D8FF5', '#2CC7FF', '#1DD6D9', '#34CC68', '#88DC2B', '#FDF000', '#fdad00', '#f87a01', '#d22f0e', '#CDAD00'];
			let Ring = {
				series: []
			};
			res.movie_data_js.xA.forEach((item, i) => {
				if (item.length > 5) {
					item = item.slice(0, 5) + '...';
				}
			
				Ring.series.push({
					name: item,
					color: color[i],
					data: res.movie_data_js.total[i] - 0
				});
			});
			var num = 0;
			for (let aa in Ring.series) {
				num += Ring.series[aa].data - 0;
			}
			var a = (Ring.series[0].data / num) * 100;
			_self.showRing_tow('canvasRing_tow', Ring, Ring.series[0].name, a.toFixed(2)+'%', Ring.series[0].color);
			this.tathreecan_num = num
		},
		//影片排片接口
		pp_index: async  function(url, that,All_data) {
			let userType = await this.detection_validity();
			All_data['userType'] = userType;
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			var pp_date = this.pp_date;
			var tt = moment(pp_date).format('YYYY-MM-DD');
			var time_get = new Date(tt).getTime();
			for (var i in res.data) {
				// 平均票价
				
				res.data[i].avg_price = Number(res.data[i].avg_price).toFixed(2);
				// 上座率
				res.data[i].occupancy = (Number(res.data[i].occupancy) * 100).toFixed(2);
				// 场均人次
				res.data[i].people_per_session = Number(res.data[i].people_per_session).toFixed(0);
				// 票房占比
				res.data[i].total_bo_ss = ((Number(res.data[i].total_bo_s) / Number(res.sum.total_bo_s)) * 100).toFixed(2);
				// 实时票房
				res.data[i].total_bo_s = (Number(res.data[i].total_bo_s) / 10000).toFixed(2);
				
				// 排场占比
				res.data[i].session_ss = ((Number(res.data[i].session_s) / Number(res.sum.session_s)) * 100).toFixed(2);
				// 排座占比
				res.data[i].seats_s = ((Number(res.data[i].seats_s) / Number(res.sum.seats_s)) * 100).toFixed(2);
				// 场次  默认 session_s   人次 默认 total_people_s
				
				if (Number(res.data[i].bos) / 100000000 > 1) {
					res.data[i].bos = (Number(res.data[i].bos) / 100000000).toFixed(1) + '亿'
				}else {
					res.data[i].bos = (Number(res.data[i].bos) / 10000).toFixed(1) + '万'
				}
				
				if(Number(res.data[i].ol_total_bo_s) == 0 ){
					res.data[i].ol_total_bo_s = '---'
				}
				if(Number(res.data[i].ol_total_rate) == 0 ){
					res.data[i].ol_total_rate = '---'
				}else {
					res.data[i].ol_total_rate = res.data[i].ol_total_rate + '%'
				}
				
				if(Number(res.data[i].ol_people_s) == 0 ){
					res.data[i].ol_people_s = '---'
				}
				if(Number(res.data[i].ol_people_rate) == 0 ){
					res.data[i].ol_people_rate = '---'
					
				}else {
					res.data[i].ol_people_rate = res.data[i].ol_people_rate + '%'
				}
			}
			
			for (let index = 0; index <= res.data.length  - 1; index++) {
				for (let inde = index + 1; inde <= res.data.length - 1 ; inde++) {
					if (Number(res.data[inde].session_s) > Number(res.data[index].session_s)) {
						var data_zs = res.data[inde];
						res.data[inde] = res.data[index];
						res.data[index] = data_zs;
					}
				}
			}
			if (Number(res.sum.total_bo_s) / 100000000 > 1) {
				res.sum.total_bos_s = (Number(res.sum.total_bo_s) / 100000000).toFixed(2) + '亿';
			} else {
				res.sum.total_bos_s = (Number(res.sum.total_bo_s) / 10000).toFixed(2) + '万';
			}
			// console.log( res.data);
			this.pp_sum_list = res.sum;
			this.pp_list = res.data;
		},
		// 影院数据接口
		async pf_index(url, that, index = 0,All_data) {
			let userType = await this.detection_validity();
			All_data['userType'] = userType;
			let {data:res} = await this.$http.get({
				url,
				data:All_data
			})
			for (var i in res.data) {
				// 票房占比
				res.data[i].total_bo_ss = ((Number(res.data[i].total_bo_s) / Number(res.sum.total_bo_s)) * 100).toFixed(2);
				// 平均票价
				res.data[i].avg_price = Number(res.data[i].avg_price).toFixed(2);
				// 上座率
				res.data[i].occupancy = (Number(res.data[i].occupancy) * 100).toFixed(2);
				// 场均人次
				res.data[i].people_per_session = Number(res.data[i].people_per_session).toFixed(0);
				// 票房
				res.data[i].total_bo_s = (Number(res.data[i].total_bo_s) / 10000).toFixed(2);
				
				// 排场占比
				res.data[i].session_ss = ((Number(res.data[i].session_s) / Number(res.sum.session_s)) * 100).toFixed(2);
				// 排座占比
				res.data[i].seats_s = ((Number(res.data[i].seats_s) / Number(res.sum.seats_s)) * 100).toFixed(2);
				// 场次  默认 session_s   人次 默认 total_people_s
			}
			
			if (index == 1) {
				var pf_list = this.pf_list;
				pf_list.push(...res.data);
				this.pf_list = pf_list;
			} else {
				this.pf_list_sum = res.sum;
				this.pf_list = res.data;
			}
			
			if (index == 1) {
				res.sum = this.pf_list_sum;
				// this.scroll_bottom_Br = true;
			} else {
				if (Number(res.sum.total_bo_s) / 100000000 > 1) {
					res.sum.total_bo_ss = (Number(res.sum.total_bo_s) / 100000000).toFixed(2) + '亿';
				} else {
					res.sum.total_bo_ss = (Number(res.sum.total_bo_s) / 10000).toFixed(2) + '万';
				}
				res.sum.occupancy = (Number(res.sum.occupancy) * 100).toFixed(2) + '%';
				res.sum.avg_price = Number(res.sum.avg_price).toFixed(2);
			}
		},
		// 初始化 地区表
		async dataMap() {
			let that = this;
			let {data} = await this.$http.get({
				url:'/advancedbo/get-citylist',
			})
			let mzmlist= []
			for (let a in data) {
				let region = [];
			
				if (a !== '#') {
					for (let n in data[a]) {
						region.push(n);
					}
					//  最终赋值
					mzmlist.push({ letter: a, childer: region });
				}
			}
			this.zm_list = mzmlist;
		},
		// 票房显示 的字
		more_index_data_tap(index) {
			// console.log(data);
			// // 复制过来一份进行操作
			let zb_title = [...this.zb_title];
			// 如果点击当前的 按钮是 true  则 变为false
			if (zb_title[index].front_row) {
				zb_title[index].front_row = false;
				// console.log(zb_title[index]);
				this.zb_title = zb_title;
				return false;
				// console.log(zb_title[index].front_rowz);
			} else {
				let boer = 0;
				// console.log(zb_title[index]);
				// console.log(zb_title);
				for (let i = 0; i < zb_title.length - 1; i++) {
					// console.log(zb_title[i].front_row);
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
						console.log(boer);
						// boer++;
						// console.log(boer);
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
				// console.log(boer);

				if (boer < 4) {
					zb_title[index].front_row = true;
				}
				this.zb_title = zb_title;
			}
			// 定义变量 来计算 是否超过 规定数量

			this.zb_title = zb_title;
		}
	}
};
</script>

<style lang="less">
@import url('./cinema.less');
@import url('./index.less');
@import url('./map.less');
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts_ring_data {
	margin-top: 10upx;
}

.charts_ring {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}

.charts_ring_tow {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
