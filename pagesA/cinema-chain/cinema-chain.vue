<template>
	<view>
		<view class="tab_haderr">
			<view @tap="tab_haderr_click(index)"  v-for="(item, index) in tab_haderr_data" :key="index"><text :class="[tab_header_index == index ? 'active' : '']">{{ item }}</text></view>
		</view>
		<!-- 影院  tab 0-->
		<view class="tab_one">
			<!-- 顶部输入框部分 -->
			<view   :class="{tab_one_header:true}" :hidden="!(isShow_one == 0 && !input_srBr)">
				<!-- <input  type="text" value="" @focus="blur_input(0)" placeholder="搜索影院" /> -->
				<view @tap="blur_input(0)" class="input_search" >搜索影院</view>
				<image class="tab_one_image" src="../../static/gg/tpicon.png" mode=""></image>
				<view class="tab_three_shu"></view>
				<image class="tab_tow_image" src="../../static/home/amplification.png" mode=""></image>
			</view>
			<view  :class="{tab_one_header:true}"  :hidden="!(isShow_one == 1 &&  !input_srBr)">
				<!-- <input type="text" value="" @focus="blur_input(1)"	 placeholder="搜索影投" /> -->
				<view @tap="blur_input(1)" class="input_search"	 >搜索影投</view>
				<image class="tab_one_image" src="../../static/gg/tpicon.png" mode=""></image>
				<view   class="tab_three_shu"></view>
				<image class="tab_tow_image" src="../../static/home/amplification.png" mode=""></image>
			</view>
			<view  :class="{tab_one_header:true}"  :hidden="!(isShow_one == 2 && !input_srBr)">
				<!-- <input type="text" value=""  @focus="blur_input(2)"	 placeholder="搜索院线" /> -->
				<view  @tap="blur_input(2)"	 class="input_search" >搜索院线</view>
				<image class="tab_one_image" src="../../static/gg/tpicon.png" mode=""></image>
				<view  class="tab_three_shu"></view>
				<image class="tab_tow_image" src="../../static/home/amplification.png" mode=""></image>
			</view>
			<!-- 中间显示部分 -->
			<view class="tab_one_center">
				<!-- // 头部 -->
				<view class="centerH">
					<view @tap="city_click">
						{{ tab_one_city_name }}
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view class="centerH_jr" @tap="click_time">
						{{ tab_one_time_txt }} {{ tab_one_ttiem }}
						<!-- <image src="../../static/home/next.png" mode=""></image> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
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
						<view class="money">{{ resSum_data.total_bo_ss }}</view>
						<!-- tab_one_office_num -->
						<view class="centerM_son">
							<!-- <view class="centerM_turnover">每小时更新一次</view> -->

							<view class="centerM_tiem">
								北京时间: {{ tab_one_time | disposeTiem }}
								<!-- <image src="../../static/home/question-circle.png" mode=""/> -->
								<!-- <image src="../../static/home/question-circle.png" mode=""></image> -->
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
						<view>{{ resSum_data.total_people_s }}</view>
					</view>
					<view class="centerFoot_son">
						<view>上座率</view>
						<view>{{ resSum_data.occupancy }}</view>
					</view>
					<view class="centerFoot_son">
						<view>场次</view>
						<view>{{ resSum_data.session_s }}</view>
					</view>
					<view class="centerFoot_son">
						<view>平均票价</view>
						<view>{{ resSum_data.avg_price }}</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<!-- 头部 -->
			<view class="bottom">
				<view class="bottom_header">
					<view>票房排名</view>
					<view @tap="tabone_bottom_header" class="buttonHtow">
						<image src="../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					
					<view >排名</view>
					<view v-if="tab_header_index == 0">影院名称</view>
					<view v-if="tab_header_index == 1">影投名称</view>
					<view v-if="tab_header_index == 2">院线名称</view>
					
					<!-- <view></view> -->
					<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
				<view class="bottomData">
					<view class="buttonB" @tap="navgitto(it.cinema_code,it.brd,it.cinema_chain)" v-for="(it, index) in top_ten" :key="index">
						<view class="buttonB_ranking">
							{{index + 1}}
						</view>
						<view class="buttonB_Headerson">
							<view class="buttonB_Headerson_name" v-if="tab_header_index == 0">{{ it.cinema_name }}</view>
							<view class="buttonB_Headerson_name" v-if="tab_header_index == 1">{{ it.brd }}</view>
							<view class="buttonB_Headerson_name" v-if="tab_header_index == 2 && tab_one_city_name == '全国'">{{ it.cinema_chain }}</view>
							<view class="buttonB_Headerson_name" v-if="tab_header_index == 2 && tab_one_city_name != '全国'">{{ it.cinema_name }}</view>
							<!-- <view class="buttonB_Headersn1">{{ it.sy_data }}{{ it.totalBo }}</view> -->
						</view>
						<view class="buttonB_Headerson_pf">
							<!--综合票房-->
							
							<view v-if="zb_title[0].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_bo_s }}</view>
							<!--综合票房占比  -->
							<view v-if="zb_title[1].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_zb }}%</view>
							<!--排场占比  -->
							<view v-if="zb_title[2].front_row">{{ it.session_zb }}</view>
							<!--上座率  -->
							<view v-if="zb_title[3].front_row">{{ it.occupancy }}</view>
							<!--排座占比  -->
							<view v-if="zb_title[4].front_row">{{ it.total_seats_zb }}</view>
							<!--平均票价  -->
							<view v-if="zb_title[5].front_row">{{ it.avg_price }}</view>
							<!--场均人次  -->
							<view v-if="zb_title[6].front_row">{{ it.people_per_session }}</view>
							<!--场次  -->
							<view v-if="zb_title[7].front_row">{{ it.session_s }}</view>
							<!--人次  -->
							<view v-if="zb_title[8].front_row">{{ it.total_people_s }}</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 底部 -->
			<!-- 跟多选择 -->
			<scroll-view scroll-y class="more" :hidden="is_index">
				<scroll-view @tap="more_index_header_click" scroll-y class="more_header"></scroll-view>
				<view class="more_index">
					<view class="more_index_header"><view class="" @tap="more_index_header_click">确定</view></view>
					<view class="more_index_data">
						<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
							{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
						</view>
					</view>
				</view>
			</scroll-view>
			<!-- 跟多选择 -->
			<!-- 城市地区选择 -->
			<view class="city_sel_jg_one" :style="{ top: 0 + 'px' }" :hidden="city_one_is_show">
				<view class="page__view_cha" @tap="page_cha_one">×</view>
				<!-- <view class="city_sel_jg_one_header" v-if="tab_header_index != 1 && tab_header_index != 2">
					<view @tap="cityisShow_one_click(index)" :class="[cityisShow_one == index ? 'active' : '']" class="" v-for="(item, index) in city_sel_jg_data" :key="index">
						{{ item }}
					</view>
				</view> -->

				<view class="page__bd_one" :hidden="!(isShow_one == 0)">
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
							<!-- cha 点击关闭 -->

							<view class="page__view_input">
								<input type="text" value="" @input="page__view_input_city" v-model="page__view_input_Data_city" placeholder="搜索城市" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="data1_city_index == 0">
								<view @tap="tabThrewclick_city(item, 0)" class="" v-for="(item, index) in data1_city" :key="index">{{ item }}</view>
								<!-- -->
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(data1_city_index == 0)">区域</view>
							<view @tap="tabThreeclick_grid('全国', 0)" :class="[tab_one_city_name == '全国' ? 'active' : '', 'page__view_city']" :hidden="!(data1_city_index == 0)">
								<!---->
								全国
							</view>
							<!-- active_one -->
							<!-- 热门城市 -->
							<view class="title" :hidden="!(data1_city_index == 0)">热门城市</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in rm_city_one" :key="index">
										<view @tap="tabThreeclick_grid(it, 0)" class="weui-grid" :hidden="!(data1_city_index == 0)" :data-name="it" hover-class="weui-grid_active">
											<!-- -->
											<view :class="['weui-grid__label', tab_one_city_name == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(data1_city_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in zm_list_city" :id="it.varter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.varter]">{{ it.varter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" class="section-item-cells_one">
											<view
												@tap="tabThreeclick_grid(vv, 0)"
												:class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tab_one_city_name == vv ? 'activeaaaa' : '']"
											>
												<text>{{ vv }}</text>
												<!--   -->
											</view>
										</view>
									</view>
								</view>
							</view>
							<!-- 城市选择 -->
						</scroll-view>
					</view>
				</view>

				<view class="page__bd_one" :hidden="!(isShow_one == 2)">
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
							<!-- cha 点击关闭 -->
							<!-- <view class="page__view_cha" @tap="page__view_cha_one">×</view> -->
							<view class="page__view_input">
								<input type="text" value="" @input="page__view_input_yx" v-model="page__view_input_data_yx" placeholder="搜索院线" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="city_data1_yx_index == 0">
								<view @tap="tabThrewclick_city(item, 1)" class="" v-for="(item, index) in city_data1_yx" :key="index">{{ item }}</view>
								<!--  -->
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(city_data1_yx_index == 0)">区域</view>
							<view
								@tap="tabThreeclick_grid('全国', 0)"
								:class="[tab_one_city_name == '全国' ? 'active' : '', 'page__view_city']"
								:hidden="!(city_data1_yx_index == 0)"
							>
								<!-- @tap="tabThreeclick_grid_Rx()" -->
								全国
							</view>
							<!-- 热门城市 -->
							<view class="title" :hidden="!(city_data1_yx_index == 0)">热门城市</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in mapdata_yx_Redata" :key="index">
										<view @tap="tabThreeclick_grid(it)" class="weui-grid" :hidden="!(city_data1_yx_index == 0)" :data-name="it" hover-class="weui-grid_active">
											<!-- -->
											<view :class="['weui-grid__label', tab_one_city_name == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(city_data1_yx_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in mapdata_yx_Sumdata" :id="it.varter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.varter]">{{ it.varter }}</view>
										<!-- -->
										<view @tap="tabThreeclick_grid(vv)" v-for="(vv, ii) in it.childer" :key="ii" class="section-item-cells_one">
											<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tab_one_city_name == vv ? 'activeaaaa' : '']">
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

				<view class="page__bd_one" :hidden="!(isShow_one == 1)">
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
							<!-- cha 点击关闭 -->
							<!-- <view class="page__view_cha" @tap="page__view_cha_one">×</view> -->

							<view class="page__view_input">
								<input type="text" value="" @input="page__view_input_yt" v-model="page__view_input_Data_yt" placeholder="搜索影投" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="city_data1_yt_index == 0">
								<view class="" @tap="tabThrewclick_city(item, 2)" v-for="(item, index) in city_data1_yt" :key="index">{{ item }}</view>
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(city_data1_yt_index == 0)">区域</view>
							<view
								:class="[tab_one_city_name == '全国' ? 'active' : '', 'page__view_city']"
								:hidden="!(city_data1_yt_index == 0)"
								@tap="tabThreeclick_grid('全国', 0)"
							>
								全国
							</view>
							<!-- 热门城市 -->
							<view class="title" :hidden="!(city_data1_yt_index == 0)">热门城市</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in city_mapdata_yt_Redata" :key="index">
										<view
											class="weui-grid"
											@tap="tabThreeclick_grid(it, 0)"
											:hidden="!(city_data1_yt_index == 0)"
											:data-name="it"
											hover-class="weui-grid_active"
										>
											<!-- -->
											<view :class="['weui-grid__label', tab_one_city_name == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(city_data1_yt_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in city_mapdata_yt_Sumdata" :id="it.varter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.varter]">{{ it.varter }}</view>
										<!-- -->
										<view @tap="tabThreeclick_grid(vv, 0)" v-for="(vv, ii) in it.childer" :key="ii" class="section-item-cells_one">
											<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tab_one_city_name == vv ? 'activeaaaa' : '']">
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
			<!-- 时间选 择 topHeigth  -->
			<view class="Data_select" :hidden="Data_select_header" :style="{ top: 0 + 'px' }">
				<!--  tab 头 -->
				<view class="Data_select_header">
					<view @tap="click_tab(index)" v-for="(item, index) in tab_title" :class="[index == time_tab ? 'active' : '']" :key="index">{{ item }}</view>
				</view>
				<!--  日 -->
				<ei-calendar
					@click="ei_calendar_tap"
					type="single"
					:visible="time_tab_Br"
					ref="calendar"
					:drawer="false"
					:disabledDate="disabledDate"
					v-model="tab_one_date_tiem"
					:custom-date="customDate"
					format="YYYY-MM-DD"
				></ei-calendar>
				<!-- 周 -->
				<view :hidden="!(time_tab == 1)">
					<view class="week">
						<view class="year_sel">
							<!--  -->
							<view v-for="(item, index) in year" @tap="click_year(item, index)" :class="[index == curren ? 'active' : '']" :key="index">{{ item }}</view>
							<scroll-view scroll-y></scroll-view>
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
				<view :hidden="!(time_tab == 2)">
					<view class="month">
						<view class="year_sel">
							<view v-for="(item, index) in year" @tap="tap_year(item, index)" :class="[index == curren_yue ? 'active' : '']" :key="index">{{ item }}</view>
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
				<view :hidden="!(time_tab == 3)">
					<view class="year">
						<view class="only_year" @tap="check_year(item)" v-for="(item, index) in year" :key="index">{{ item }}</view>
						<!-- data-year="{{item}}" -->
					</view>
				</view>
				<!-- 选择年 -->
				<scroll-view scroll-y></scroll-view>
			</view>
			<!-- 时间选择 -->
		</view>
		<!-- 影院 -->
		
		
		
		
		
		
	</view>
</template>

<script>
import moment from '@/components/moment';
import EiCalendar from '@/components/ei-calendar/ei-calendar';

export default {
	onShareAppMessage(){},
	components: { EiCalendar },
	data() {
		return {
			alpha:'',
			// 字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			input_cha_Br:true,
			
			input_srBr:false,
			pages:1,
			top_ten:[],
			time_tab_Br: false, // 日历开启
			input_city_timeout: false, // 城市搜索的定时器
			// 时间
			wHeight: 0, // 高度
			month: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
			Data_select_header: true, //控制是否显示
			is_year_yue: 2019, // 月里边的当前年
			curren_yue: 0, // 月里边的年加样式
			curren: 0, /// 周里边的年加样式
			is_year: 2019, // 当前选择 周里边的年
			year: [],
			customDate: [
				{
					cellClass: 'custom-cell',
					date: '',
					// date: '2019-05-23',
					top: [
						{
							class: 'custom-cell-top-1'
							// text: ''
						},
						{
							class: 'custom-cell-top-2'
							// text: ''
						}
					]
				}
			],
			tab_one_date_tiem: '',
			disabledDate: ['2019-7-19'], // 当前日期
			tab_title: ['日票房', '周票房', '月票房', '年票房'],
			time_tab: 0, // 选择哪一栏时间的 凭证
			// 时间
			tab_index: 0, // 在哪一栏
			// 地区 选择
			alpha: '', // 字母跳转凭证
			// 地区选择开关
			cityisShow_one: 0, // city tab样式选中哪一个
			city_one_is_show: true,
			// tabthree
			city_mapdata_yt_Sumdata: [], // 影投全部数据
			city_mapdata_yt_Redata: [], // 影投热门城市
			city_data1_yt_index: 0, //搜索出来的长度
			city_data1_yt: [], // 搜索出来的数据
			page__view_input_Data_yt: [], // 输入框搜索出来的东西
			// tabtow
			mapdata_yx_Sumdata: [], // 院线插件数据
			mapdata_yx_Redata: [], // 院线的热门城市
			city_data1_yx_index: 0, // 搜索出来的长度
			city_data1_yx: [], // 搜索出来的东西
			page__view_input_data_yx: '', // 实时输入的东西
			// tabone
			inputVal: '', // 城市如果有字拒接显示
			zm_list_city: [], //  城市的所有 字母和数据
			rm_city_one: ['北京', '上海', '广州', '深圳 ', '成都', '武汉'], // 热门城市
			data1_city: [], // 搜索出来的所有城市
			data1_city_index: 0, // 搜索出来的长度
			page__view_input_Data_city: '', // 院线输入框实时搜索
			// 地区的英文字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			isShow_one: 0, // 地区插件显示控制
			city_sel_jg_data: ['城市', '院线', '影投'], // 地区插件显示头部
			// 地区 选择

			week: [], //周计算
			all_year: [], //从2012年到现在的所有你年
			year_data: 0, //当前年
			pixelRatio: 0, //当前设备像素比
			windowHeight: 0, //当前设备可用高度
			max_day: false, // 最大时间
			min_day: false, // 最小时间
			// 跟多选择 按钮
			is_index: true,
			resSum_data: {
				total_people_s: '1490.62万'
			}, // 总平均 等 人次
			// tabone 假数据tabone_all_data
			top_ten: [
			],
			zb_title: [
				// g跟多指标
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
			tab_haderr_data: ['影 院', '影 投', '院 线'], //  tab 头部点击
			// 点击前一日
			tab_header_index: 0,
			date: '', // 当前时间
			tab_one_city_name: '全国', // 当前地区
			format_week: '', /// 请求的那一年的第几周
			format_month: '', // 当前请求的哪一年 那一月
			format_year: '', // 当前请求的哪一年
			what_day: '', // s是预售还是实时
			format_data: 0, // 当前时间的时间戳
			del_data: 0, // 前一天时间
			add_data: 0, //  后一天时间
			tab_one_ttiem: '', //时间
			tab_one_time_txt: '日票房', // 票房显示什么
			// tab_one_office_num: '1490.62万', // 当前总票房
			tab_one_time: new Date(),
			tab_one_timer: false, // 实时更新时间的定时器
			tab_one_service: false
		};
	},
	watch: {},
	onLoad() {
		this.tab_one_ttiem_fun();
		//  初始化时间
		// 初始化标题
		// this.title();
		// 实时跟新时间
		var _this = this; //声明一个变量指向Vue实例this，保证作用域一致
		this.tab_one_timer = setInterval(function() {
			_this.tab_one_time = new Date(); //修改数据date
			// console.log('跟新时间了');
			// console.log(_this.tab_one_time);
		}, 1000);
		this.z_data();
	},
	async onReady() {
		// 初始化
		// 最大时间和最小时间
		var {data:Ra} = await this.$http.get({url:'/topprogram/get-date',data:{}})
		var max_day = Ra.bo_date.endDate; // 最大时间
		var min_day = Ra.bo_date.startDate; // 最小时间
		this.max_day = max_day;
		this.min_day = min_day;
		
		
		// 获取单签访问 该设备的高度
		var res = wx.getSystemInfoSync();
		var pixelRatio = res.pixelRatio; // 当前访问的设备的像素
		var cWidth=uni.upx2px(95);
		
		var windowHeight = res.windowHeight; // 当前访问设备窗口可用高度
		cWidth = Number(windowHeight) - Number(cWidth) + 1 ;
		this.pixelRatio = pixelRatio;
		this.windowHeight = windowHeight;

		//调取影院数据
		var date = moment().format('YYYY-MM-DD');
		var url = '/topprogram/get-cinema'
		var All_data = {
			dtype:'date',
			stype:'cinema',
			with_fwf:'0',
			ismore:'1',
			city:'',
			district:'',
			brd:'',
			cinema_chain:'',
			bdate:date,
		}
		this.cinema_index(url, this,All_data);
		this.date = date; // 当前时间
		this.disabledDate[0] = date;
		// console.log(date);
		// 地区初始化
		this.cityAll_yyData(); // 影院
		setTimeout(function(){console.log(1)},10)
		this.cityAll_ytData(); // 影投
		this.cityAll_yxData(); // 院线
	},
	// 在vue实例销毁之前 清除定时器
	beforeDestroy() {
		if (this.tab_one_timer) {
			clearInterval(this.tab_one_timer); //在Vue实例销毁前，清除我们的定时器
		}
	},
	async onReachBottom(){
		// console.log(1);
		let userType = await this.detection_validity()
		// if (userType > 0) {
		// 	uni.showToast({
		// 		title:'以加载最多',
		// 		icon:'none'
		// 	})
		// 	return false;
		// }
		
		
		let top_ten = [...this.top_ten]
		let page = this.pages;
		let index = this.tab_header_index; /* 当前 处于哪一个tab下*/
		var time_txt = this.tab_one_time_txt; // 当前是什么票房
		var date = this.date; /* 日票房*/
		let format_week = this.format_week;/* 周票房 */
		let format_month = this.format_month; /* 月数据*/
		let format_year = this.format_year; /* 年数据*/
		let city = this.tab_one_city_name; // 当前地区 
		if (city == '全国') {
			city = ''
		}
		let url =  '/topprogram/get-cinema';
		let All_data = {}
		if (index == 0) {
			All_data = {
				dtype:'',
				stype:'cinema',
				with_fwf:0,
				ismore:1,
				city:city,
				district:'',
				brd:'',
				cinema_chain:'',
				bdate:'',
				page,
			}
			if (time_txt == '日票房') {
				All_data.bdate = date
			}else if (time_txt == '周票房') {
				All_data.bdate = format_week
			}else if (time_txt == '月票房') {
				All_data.bdate = format_month
			}else{
				All_data.bdate = format_year
			}
		}else if (index == 1) {
			All_data = {
				dtype:'date',
				stype:'brd',
				with_fwf:0,
				ismore:1,
				city:'',
				district:'',
				brd:city,
				cinema_chain:'',
				bdate:date,
				page,
			}
			if (time_txt == '日票房') {
				All_data.bdate = date
			}else if (time_txt == '周票房') {
				All_data.bdate = format_week
			}else if (time_txt == '月票房') {
				All_data.bdate = format_month
			}else{
				All_data.bdate = format_year
			}
		}else {
			All_data = {
				dtype:'date',
				stype:'cinema_chain',
				with_fwf:0,
				ismore:1,
				city:'',
				district:'',
				brd:'',
				cinema_chain:city,
				bdate:date,
				page,
			}
			if (time_txt == '日票房') {
				All_data.bdate = date
			}else if (time_txt == '周票房') {
				All_data.bdate = format_week
			}else if (time_txt == '月票房') {
				All_data.bdate = format_month
			}else{
				All_data.bdate = format_year
			}
		}
		page++
		this.pages = page;
		this.cinema_index(url, this,All_data,1);
		
	},
	methods: {
	
	
		// 输入框地区
		
		//  箭头进入 输入框
		blur_input(id){
			// this.input_srBr = true;
			uni.navigateTo({
				url: './search/search?id=' +id,
				success: res => {},
				fail: () => {},
				compvare: () => {}
			});
		},
		navgitto(id,brd,chain) {
			var index = this.tab_header_index;
			if (index == 0) {
				uni.navigateTo({
					url: '../cinema/cinema?code=' + id
				});
			}else if (index == 1) {
				uni.navigateTo({
					url: '../shadow/shadow?code=' +brd,
				});
			}else if (index == 2) {
				uni.navigateTo({
					url: '../cinema_chain_list/cinema_chain_list?code=' +chain,
				});
			}
		},
		// 初始化 页面上显示的当前时间
		tab_one_ttiem_fun() {
			// 初始化时间
			function tt() {
				var tiem = new Date();
				var m = tiem.getFullYear();
				var y = tiem.getMonth() + 1;
				var r = tiem.getDate();
				if (y < 10) {
					y = '0' + y;
				}
				if (r < 10) {
					r = '0' + r;
				}
				// console.log(m,y,r);
				return `${m}年${y}月${r}日`;
			}
			var ttiem = tt();

			//  赋值
			this.tab_one_ttiem = ttiem;
		},
		// 点击开启时间选择
		click_time() {
			var index = this.time_tab;
			if (index == 0) {
				this.time_tab_Br = true;
			}
			this.Data_select_header = false;
		},
		// 直接点击年
		check_year(year) {
			this.index_year(year);
		},
		//  调用年接口
		index_year: function(year) {
			// console.log(year);
			var is_rl_Br = this.tab_header_index; // 判断现在在那个里边
			var dq_year = moment(new Date())
				.add(0, 'year')
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
			var city = that.tab_one_city_name;
			if (city == '全国') {
				city = '';
			} else {
				city = city;
			}
			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			// var url = 'https://db.topcdb.com/topprogram/get-advancedbo?with_fwf=' + fwf + '&district=' + district + '&city=' + city_name + '&dtype=year&year=' + format_year;
			var All_data = {};
			var url = '';
			if (is_rl_Br == 0) {
				url = '/topprogram/get-cinema'
				All_data = {
					dtype:'year',
					stype:'cinema',
					with_fwf:fwf,
					ismore:1,
					city:city,
					district:'',
					brd:'',
					cinema_chain:'',
					year:format_year
				}
				
			} else if (is_rl_Br == 1) {
				url =
					'/topprogram/get-cinema'
				All_data = {
					dtype:'year',
					stype:'brd',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:city,
					cinema_chain:'',
					year:format_year
				}
			} else if (is_rl_Br == 2) {
				url ='/topprogram/get-cinema'
				All_data = {
					dtype:'year',
					stype:'cinema_chain',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:city,
					year:format_year
				}
			}
			this.cinema_index(url, this,All_data);
			this.Data_select_header = true;
			this.tab_one_time_txt = time_txt;
			this.tab_one_ttiem = this_year;
			this.format_year = format_year;
			this.add_data = add_data;
			this.del_data = del_data;
			// this.what_day = '';
		},
		// 月里边的单个月
		check_month(item) {
			if (item.length == 3) {
				/// 截出来当前选择的月
				var it = Number(item.slice(0, 2));
			} else {
				var it = Number(item.slice(0, 1));
			}
			var that = this;
			var max_day = moment();
			var month = it; //选择的月
			var year = this.is_year_yue - 0; //选择的年
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
		//  调用月接口

		index_month(year, month) {
			var is_rl_Br = this.tab_header_index; // 判断现在在那个里边
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
			var city = this.tab_one_city_name;

			if (city == '全国') {
				city = '';
			} else {
				city = city;
			}
			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			
			var All_data = {};
			var url = '';
			if (is_rl_Br == 0) {
				url =
					'/topprogram/get-cinema'
				All_data = {
					dtype:'month',
					stype:'cinema',
					with_fwf:fwf,
					ismore:1,
					city:city,
					district:'',
					brd:'',
					cinema_chain:'',
					month:format_month
				}
			} else if (is_rl_Br == 1) {
				url ='/topprogram/get-cinema'
				All_data = {
					dtype:'month',
					stype:'brd',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:city,
					cinema_chain:'',
					month:format_month
				}
			} else if (is_rl_Br == 2) {
				url ='/topprogram/get-cinema'
				All_data = {
					dtype:'month',
					stype:'cinema_chain',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:city,
					month:format_month
				}
			}
			this.cinema_index(url, this,All_data);
			this.Data_select_header = true;
			this.tab_one_time_txt = time_txt;
			this.format_month = format_month;
			this.add_data = add_data;
			this.del_data = del_data;
			this.tab_one_ttiem = this_month;
			// uni.hideLoading();
		},

		// x选择月里边的年
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
			this.is_year_yue = year;
			this.curren_yue = index;
		},
		// 当前点击周里边的周
		check_week(index) {
			var that = this;
			var max_day = moment();
			var max_week = moment(max_day).format('w');
			var max_year = moment(max_day).format('YYYY');
			var week = index + 1; //选择的周
			var year = this.is_year; //选择的年
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
		// 调用周接口
		index_week(year, week) {
			var is_rl_Br = this.tab_header_index; // 判断现在在那个里边
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
			var city = that.tab_one_city_name;
			if (city == '全国') {
				city = '';
			} else {
				city = city;
			}
			var fwf = '';
			var is_check = that.tab_one_service;
			if (is_check == true) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			
			var All_data = {};
			var url = '';
			if (is_rl_Br == 0) {
				url ='/topprogram/get-cinema'
				All_data = {
					dtype:'week',
					stype:'cinema',
					with_fwf:fwf,
					ismore:1,
					city:city,
					district:'',
					brd:'',
					cinema_chain:'',
					week:format_week
				}
			} else if (is_rl_Br == 1) {
				url ='/topprogram/get-cinema'
				All_data = {
					dtype:'week',
					stype:'brd',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:city,
					cinema_chain:'',
					week:format_week
				}	
				
			} else if (is_rl_Br == 2) {
				url ='/topprogram/get-cinema'
					format_week;
				All_data = {
					dtype:'week',
					stype:'cinema_chain',
					with_fwf:fwf,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:city,
					week:format_week
				}	
			}
			this.cinema_index(url, this,All_data);
			this.Data_select_header = true;
			this.tab_one_ttiem = this_week;
			this.add_data = add_data;
			this.del_data = del_data;
			this.tab_one_time_txt = time_txt;
			this.format_week = format_week;
		},
		// 		// 点击周里边的年
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
		//时间
		// 日历单选点击
		ei_calendar_tap(event) {
			var max_day = this.max_day; // 最大日期
			var min_day = this.min_day; // 最小日期
			var is_rl_Br = this.tab_header_index; // 判断现在在 那个里边
			var that = this;
			// 判断 只能有两位数
			event.month = event.month + '';
			if (event.month.length >= 2) {
				if (event.month.length == 2) {
					event.month = event.month.slice(1);
					console.log(event.month);
				}
			}
			console.log(event);
			event.day = event.day + '';
			if (event.day.length > 2) {
				// if (event.day.length == 2) {
				event.day = event.day.slice(1);
				console.log(event.day);
				// }
			}
			var time_txt = '日票房';
			var is_check = that.tab_one_service; // 判断是否含服务费
			var fwf = ''; // 储存时段
			if (is_check) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			if (event.month < 10) {
				event.month = '0' + event.month;
			}
			console.log(Number(event.day));
			if (Number(event.day) < 10) {
				event.day = '0' + Number(event.day);
			}
			
			
			var data_time_ = event.format.split('/')
			// var check_day = event.year + '年' + event.month + '月' + event.day + '日'; // 当前年月日 2019年07月07日
			// var gs_data = event.year + '-' + event.month + '-' + event.day; // 当年年月日 2019-07-07
			var check_day = data_time_[0] + '年'+ data_time_[1] + '月' + data_time_[2] + '日'; // 当前年月日 2019年07月07日
			var gs_data = data_time_[0] + '-'+ data_time_[1] + '-' + data_time_[2];    // 当年年月日 2019-07-07
			
			
			var what_day = '周' + '日一二三四五六'.charAt(moment(new Date(gs_data)).day()); // z周几
			if (moment().format('YYYY年MM月DD日') == moment(new Date(gs_data)).format('YYYY年MM月DD日')) {
				what_day = '今日实时';
			}
			if (moment().format('YYYY年MM月DD日') < moment(new Date(gs_data)).format('YYYY年MM月DD日')) {
				what_day = what_day + '预售';
			}
			if (moment(gs_data).isBefore(max_day) == true) {
				// 判断是否超过日期
				var time_gs = moment(new Date(gs_data)).valueOf(); // 返回最原始得值
				var del_data = moment(time_gs) // 前一天
					.subtract(1, 'days')
					.format('YYYY-MM-DD');
				var add_data = moment(time_gs) // 后一天
					.subtract(-1, 'days')
					.format('YYYY-MM-DD');
				var city = this.tab_one_city_name; //+ '&district=' + district
				if (city == '全国') {
					city = '';
				} else {
					city = city;
				}
				var All_data = {};
				var url = '';
				if (is_rl_Br == 0) {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						bdate:gs_data
					}
				} else if (is_rl_Br == 1) {
					url = '/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						bdate:gs_data
					}
				} else if (is_rl_Br == 2) {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						bdate:gs_data
					}
				}
				this.tab_one_date_tiem = gs_data;
				this.cinema_index(url, this,All_data);
				// this.time_tab = 1;
				this.time_tab_Br = false;
				this.Data_select_header = true;
				this.date = gs_data;
				this.tab_one_ttiem = check_day;
				this.del_data = del_data;
				this.add_data = add_data;
				this.format_data = time_gs;
				this.tab_one_time_txt = time_txt;
				this.what_day = what_day;
			} else {
				uni.showToast({
					title: '超出最大范围',
					duration: 2000
				});
			}
		},
		// 选择年 周日
		click_tab(index) {
			if (index == 0) {
				this.time_tab_Br = true;
				this.time_tab = index;
			} else {
				this.time_tab_Br = false;
				this.time_tab = index;
			}
		},
		// 时间
		//点击城市
		tabThreeclick_grid(item, index) {
			var title = `已选中${item}`;
			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var time_txt = this.tab_one_time_txt; // 当前是什么票房
				var box_index = this.tab_header_index; // 目前是在哪一个 是在 票房还是 影投等
				var is_check = this.tab_one_service;
				var city = ''; // 储存当前城市
				var fwf = ''; ///含服务费 是1 不含是0
				if (is_check) {
					fwf = 1;
				} else {
					fwf = 0;
				}
				if (item == '全国') {
					city == '';
				} else {
					city = item;
				}
				var All_data = {};
				var url = '';
				if (box_index == 0) {
					if (time_txt == '日票房') {
						var date = this.date; // 时间
						// var date = this.format_week; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'date',
							stype:'cinema',
							with_fwf:fwf,
							ismore:1,
							city:city,
							district:'',
							brd:'',
							cinema_chain:'',
							bdate:date
						}
					} else if (time_txt == '周票房') {
						var date = this.format_week; // 时间
						// var date = this.date; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'week',
							stype:'cinema',
							with_fwf:fwf,
							ismore:1,
							city:city,
							district:'',
							brd:'',
							cinema_chain:'',
							week:date
						}
					} else if (time_txt == '月票房') {
						var date = this.format_month; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'month',
							stype:'cinema',
							with_fwf:fwf,
							ismore:1,
							city:city,
							district:'',
							brd:'',
							cinema_chain:'',
							month:date
						}
					} else if (time_txt == '年票房') {
						var date = this.format_year; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'year',
							stype:'cinema',
							with_fwf:fwf,
							ismore:1,
							city:city,
							district:'',
							brd:'',
							cinema_chain:'',
							year:date
						};
					}
				} else if (box_index == 1) {
					if (time_txt == '日票房') {
						var date = this.date; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'date',
							stype:'brd',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:city,
							cinema_chain:'',
							bdate:date
						};
					} else if (time_txt == '周票房') {
						var date = this.format_week; // 时间
						// var date = this.date; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'week',
							stype:'brd',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:city,
							cinema_chain:'',
							week:date
						};
					} else if (time_txt == '月票房') {
						var date = this.format_month; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'month',
							stype:'brd',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:city,
							cinema_chain:'',
							month:date
						};
					} else if (time_txt == '年票房') {
						var date = this.format_year; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'year',
							stype:'brd',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:city,
							cinema_chain:'',
							year:date
						};
					}
				} else if (box_index == 2) {
					if (time_txt == '日票房') {
						var date = this.date; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'date',
							stype:'cinema_chain',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:'',
							cinema_chain:city,
							bdate:date
						};
					} else if (time_txt == '周票房') {
						var date = this.format_week; // 时间
						// var date = this.date; // 时间
						url ='/topprogram/get-cinema'
						All_data = {
							dtype:'week',
							stype:'cinema_chain',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:'',
							cinema_chain:city,
							week:date
						};
					} else if (time_txt == '月票房') {
						var date = this.format_month; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'month',
							stype:'cinema_chain',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:'',
							cinema_chain:city,
							month:date
						};
					} else if (time_txt == '年票房') {
						var date = this.format_year; // 时间
						url = '/topprogram/get-cinema'
						All_data = {
							dtype:'year',
							stype:'cinema_chain',
							with_fwf:fwf,
							ismore:1,
							city:'',
							district:'',
							brd:'',
							cinema_chain:city,
							year:date
						};
					}
				}
				this.cinema_index(url, this,All_data);
				this.city_one_is_show = true;
				this.tab_one_city_name = item;
			}, 500);
		},
		//点击后一天
		right_date: function() {
			var that = this;
			var max_day = that.max_day;
			var min_day = that.min_day;
			var date = that.date;
			var time_txt = that.tab_one_time_txt; // 当前是什么票房
			var city = this.tab_one_city_name; // 当前地区
			var is_check = this.tab_one_service;
			var fwf = ''; ///含服务费 是1 不含是0
			if (is_check) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			if (city == '全国') {
				city = '';
			}
			var box_index = that.tab_header_index;

			date = moment(date)
				.subtract(-1, 'days')
				.format('YYYY-MM-DD');
			if (moment(date).isBefore(max_day) == true) {
			} else {
				uni.showToast({
					title: '超出最大日期',
					duration: 2000,
					icon: 'none'
				});
				return false;
				// date = moment(date).subtract(1, 'days').format('YYYY-MM-DD');
			}
			var All_data = {};
			var url = '';
			if (box_index == 0) {
				if (time_txt == '日票房') {
					
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						bdate:date
					}
					that.tab_one_date_tiem = date;
					that.cinema_index(url, that,All_data);
					that.date_watch(date);
				} else if (time_txt == '周票房') {
					console.log(time_txt);
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 + 1;
					if (week > 52) {
						week = '01';
						year = year - 0 + 1;
					}
					var max_day = moment();
					var max_week = moment(max_day).format('w');
					var max_year = moment(max_day).format('YYYY');
					// console.log(year);
					// console.log(week);
					if (max_year > year) {
						that.index_week(year, week);
					} else if (max_year == year) {
						if (week <= max_week) {
							that.index_week(year, week);
						} else {
							wx.showToast({
								title: '超出本周',
								duration: 2000
							});
						}
					}
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 + 1;
					if (month > 12) {
						month = '01';
						year = year - 0 + 1;
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
				} else {
					var year = that.format_year;
					var max_year = this.year[0];
					year = year - 0 + 1;
					console.log(year >= max_year + 1);
					if (year >= max_year + 1) {
						uni.showToast({
							title: '超出最高年',
							duration: 2000,
							icon: 'none'
						});
						year = max_year;
						return false;
					}
					that.index_year(year);
				}
			} else if (box_index == 1) {
				if (time_txt == '日票房') {
					url = '/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						bdate:date
					}
					that.tab_one_date_tiem = date;
					that.cinema_index(url, that,All_data);
					that.date_watch(date);
				} else if (time_txt == '周票房') {
					console.log(time_txt);
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 + 1;
					if (week > 52) {
						week = '01';
						year = year - 0 + 1;
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
							wx.showToast({
								title: '超出本周',
								duration: 2000
							});
						}
					}
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 + 1;
					if (month > 12) {
						month = '01';
						year = year - 0 + 1;
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
				} else {
					var year = that.format_year;
					var max_year = this.year[0];
					console.log(max_year);
					year = year - 0 + 1;
					console.log(year >= max_year + 1);
					if (year >= max_year + 1) {
						uni.showToast({
							title: '超出最高年',
							duration: 2000,
							icon: 'none'
						});
						year = max_year;
						return false;
					}
					that.index_year(year);
				}
			} else if (box_index == 2) {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						bdate:date
					}
					that.tab_one_date_tiem = date;
					that.cinema_index(url, that,All_data);
					that.date_watch(date);
				} else if (time_txt == '周票房') {
					// console.log(time_txt);
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 + 1;
					if (week > 52) {
						week = '01';
						year = year - 0 + 1;
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
							wx.showToast({
								title: '超出本周',
								duration: 2000
							});
						}
					}
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 + 1;
					if (month > 12) {
						month = '01';
						year = year - 0 + 1;
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
				} else {
					var year = that.format_year;
					var max_year = this.year[0];
					console.log(max_year);
					year = year - 0 + 1;
					console.log(year >= max_year + 1);
					if (year >= max_year + 1) {
						uni.showToast({
							title: '超出最高年',
							duration: 2000,
							icon: 'none'
						});
						year = max_year;
						return false;
					}
					that.index_year(year);
				}
			}
			this.date = date;
			// this.date_watch(date)
		},
		//点击前一天
		left_date: function() {
			var that = this;
			var date = that.date;
			var time_txt = that.tab_one_time_txt; // 当前是什么票房
			var city = this.tab_one_city_name; // 当前地区
			var is_check = this.tab_one_service;
			var fwf = ''; ///含服务费 是1 不含是0
			if (is_check) {
				fwf = 1;
			} else {
				fwf = 0;
			}
			if (city == '全国') {
				city = '';
			}
			var box_index = that.tab_header_index;
			date = moment(date)
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
				var All_data = {};
				var url = '';
			if (box_index == 0) {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						bdate:date
					}
					that.cinema_index(url, that,All_data);
					that.tab_one_date_tiem = date;
					that.date_watch(date);
				} else if (time_txt == '周票房') {
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 - 1;
					if (week < 1) {
						week = '52';
						year = year - 0 - 1;
					}
					that.index_week(year, week);
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 - 1;
					if (month < 1) {
						month = '12';
						year = year - 0 - 1;
					}
					that.index_month(year, month);
				} else {
					var year = that.format_year;
					if (year - 0 - 1 < 2012) {
						uni.showToast({
							title: '超出最小年',
							duration: 2000,
							icon: 'none'
						});
						return false;
					} else {
						year = year - 0 - 1;
					}
					that.index_year(year);
				}
			} else if (box_index == 1) {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						bdate:date
					}
					that.tab_one_date_tiem = date;
					that.cinema_index(url, this,All_data);
					this.date_watch(date);
				} else if (time_txt == '周票房') {
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 - 1;
					if (week < 1) {
						week = '52';
						year = year - 0 - 1;
					}
					that.index_week(year, week);
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 - 1;
					if (month < 1) {
						month = '12';
						year = year - 0 - 1;
					}
					that.index_month(year, month);
				} else {
					var year = that.format_year;
					if (year - 0 - 1 < 2012) {
						uni.showToast({
							title: '超出最小年',
							duration: 2000,
							icon: 'none'
						});
						return false;
					} else {
						year = year - 0 - 1;
					}
					that.index_year(year);
				}
			} else if (box_index == 2) {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						bdate:date
					}
					this.tab_one_date_tiem = date;
					that.cinema_index(url, this,All_data);
					this.date_watch(date);
				} else if (time_txt == '周票房') {
					var format_week = that.format_week;
					var format_weeks = format_week.split('-W');
					var year = format_weeks[0];
					var week = format_weeks[1] - 0 - 1;
					if (week < 1) {
						week = '52';
						year = year - 0 - 1;
					}
					that.index_week(year, week);
				} else if (time_txt == '月票房') {
					var format_month = that.format_month;
					var format_months = format_month.split('-');
					var year = format_months[0];
					var month = format_months[1] - 0 - 1;
					if (month < 1) {
						month = '12';
						year = year - 0 - 1;
					}
					that.index_month(year, month);
				} else {
					var year = that.format_year;
					if (year - 0 - 1 < 2012) {
						uni.showToast({
							title: '超出最小年',
							duration: 2000,
							icon: 'none'
						});
						return false;
					} else {
						year = year - 0 - 1;
					}
					that.index_year(year);
				}
			}
			this.date = date; // 赋值 时间
			// this.date_watch(date)
		},
		// 日期变化 切换页面上显示的日期
		date_watch(val) {
			var date = val;
			var year = date.slice(0, 4);
			var m = date.slice(5, 7);
			var r = date.slice(8, 10);
			this.tab_one_ttiem = year + '年' + m + '月' + r + '日';
		},
		//影院  影投 接口
		cinema_index: async function(url, that,All_data,index_xz = 0) {
			var userType = await this.detection_validity()
			All_data['userType'] = userType;
			var {data:res} =  await that.$http.get({url,data:All_data})
			console.log(res);
			
			var total_bo_s = '';
			var total_people_s = '';
			var session_zb = ''; // 储存 排场占比的地方
			var total_seats_zb = ''; // 排座占比
			if (res.sum.total_bo_s / 100000000 < 1) {
				total_bo_s = (res.sum.total_bo_s / 10000).toFixed(2) + '万';
			} else {
				total_bo_s = (res.sum.total_bo_s / 100000000).toFixed(2) + '亿';
			}
			// console.log();
			if (res.sum.total_people_s / 100000000 < 1) {
				total_people_s = (res.sum.total_people_s / 10000).toFixed(2) + '万';
			} else {
				total_people_s = (res.sum.total_people_s / 100000000).toFixed(2) + '亿';
			}
			// var city_all = that.city_all
			var top_ten = res.data;
			var top_tenAll = [];
			// console.log(top_ten);
			for (var i in top_ten) {
				// 票房占比
				top_ten[i].total_zb = (((top_ten[i].total_bo_s + 0) / (res.sum.total_bo_s + 0)) * 100).toFixed(2);
				// 排场占比
				var session = top_ten[i].session_s;
				var sessions = res.sum.session_s; /// 总
			
				if ((session / sessions) * 100 < 0.01) {
					session_zb = '<0.01%';
				} else {
					session_zb = ((session / sessions) * 100).toFixed(2) + '%';
				}
				top_ten[i].session_zb = session_zb;
				//上座率
				var occupancy = top_ten[i].occupancy;
				top_ten[i].occupancy = Number(occupancy * 100).toFixed(2) + '%';
			
				// 	//  排座占比
				var total_seat = top_ten[i].seat_s;
				var total_seats = res.sum.seat_s;
				if ((total_seat / total_seats) * 100 < 0.01) {
					total_seats_zb = '<0.01%';
				} else {
					total_seats_zb = ((total_seat / total_seats) * 100).toFixed(2) + '%';
				}
				top_ten[i].total_seats_zb = total_seats_zb;
				// 票房
				if (top_ten[i].total_bo_s / 100000000 >= 1) {
					top_ten[i].total_bo_s = (top_ten[i].total_bo_s / 100000000).toFixed(2) + '亿';
				} else if (top_ten[i].total_bo_s / 10000 >= 1) {
					top_ten[i].total_bo_s = (top_ten[i].total_bo_s / 10000).toFixed(2) + '万';
				} else {
					top_ten[i].total_bo_s = (top_ten[i].total_bo_s - 0).toFixed(2);
				}
				// 人次
				if (top_ten[i].total_people_s / 100000000 > 1) {
					top_ten[i].total_people_s = (top_ten[i].total_people_s / 100000000).toFixed(2) + '亿';
				} else if (top_ten[i].total_people_s / 10000 > 1) {
					top_ten[i].total_people_s = (top_ten[i].total_people_s / 10000).toFixed(2) + '万';
				} else {
					top_ten[i].total_people_s = top_ten[i].total_people_s - 0;
				}
				// 均场人次
				top_ten[i].people_per_session = (top_ten[i].people_per_session - 0).toFixed(0);
				// 平均票价
				top_ten[i].avg_price = (top_ten[i].avg_price - 0).toFixed(1);
				top_tenAll.push(top_ten[i])
				// top_tenAll.push(top_ten[i])
			}
			//处理平均值
			// 平均票价/
			
			var avg_price = Number(res.sum.avg_price);
			res.sum.avg_price = avg_price.toFixed(2) + '元';
			//  上座率
			var occupancy = res.sum.occupancy + 0; // 没有
			res.sum.occupancy = Number(occupancy * 100).toFixed(2) + '%';
			// 人次
			var total_people_s = res.sum.total_people_s / 10000;
			res.sum.total_people_s = total_people_s.toFixed(2) + '万';
			res.sum.session_sss = 	res.sum.session_s;
			var session_s = res.sum.session_s / 10000;
			res.sum.session_s = session_s.toFixed(2) + '万';
			
			if (index_xz == 1) {
				// res.sum.total_bo_ss = total_bo_s;
				let top_tenALL  = [...this.top_ten]
				top_tenALL.push(...top_ten)
				this.top_ten = top_tenALL;
			}else {
				res.sum.total_bo_ss = total_bo_s;
				this.top_ten = top_ten;
				this.resSum_data = res.sum;
			}
			
		},
		// 地区tab 切换
		cityisShow_one_click(index) {
			this.isShow_one = index; // 地区切换
			this.cityisShow_one = index; // 样式切换
		},
		// three 输入事件
		page__view_input_yt() {
			var city_data = this.page__view_input_Data_yt;
			var All_data = {
				type:'brd',
				brd:city_data
			};
			var url = '/advancedbo/get-provincelist'
			clearInterval(this.input_city_timeout);
			if (city_data.length == 0) {
				this.city_data1_yt_index = 0;
				this.city_data1_yt = [];
				// this.data1_city_yt = [];
				return false;
			}
			this.input_city_timeout = setTimeout( async () => {
				var userType = await this.detection_validity()
				All_data['userType'] = userType;
				var {data:res} =  await this.$http.get({url,data:All_data})
					var data  = res.list;
				var data1_city = [];
				for (var i in data) {
					console.log(data[i]);
					for (var var1 in data[i]) {
						data1_city.push(var1);
					}
				}
				this.city_data1_yt_index = data1_city.length;
				this.city_data1_yt = data1_city;
			}, 1000);
		},
		// tow 输入事件
		page__view_input_yx() {
			var chine_input = this.page__view_input_data_yx;
			// this.page__view_input_Data_yt  输入的文字
			// 	city_data1_yt_index: 0, //搜索出来的长度
			// city_data1_yt: [], // 搜索出来的数据
			var All_data = {
				type:'chain',
				chain:chine_input
			};
			var url = '/advancedbo/get-provincelist'
			clearInterval(this.input_city_timeout);
			if (chine_input.length == 0) {
				this.city_data1_yx_index = 0;
				this.city_data1_yx = [];
				return false;
			}
			this.input_city_timeout = setTimeout(async () => {
				var userType = await this.detection_validity()
				All_data['userType'] = userType;
				var {data:res} =  await this.$http.get({url,data:All_data})
				var data  = res.list;
				var data1_city = [];
				for (var i in data) {
					console.log(data[i]);
					//
					for (var var1 in data[i]) {
						data1_city.push(var1);
					}
				}
				this.city_data1_yx_index = data1_city.length;
				this.city_data1_yx = data1_city;
			}, 1000);
		},
		// one 搜索之后点击
		tabThrewclick_city(item) {
			this.city_one_is_show = true;
			this.tabThreeclick_grid(item);
			var is_show = this.tab_header_index;
			this.page__view_input_Data_city = '';
			this.data1_city = [];
			this.data1_city_index = 0;
			this.page__view_input_Data_yt = '';
			this.city_data1_yt = [];
			this.city_data1_yt_index = 0;
			this.page__view_input_data_yx = '';
			this.city_data1_yx = [];
			this.city_data1_yx_index = 0;
			// }
		},
		// one 输入事件
		page__view_input_city() {
			var city_data = this.page__view_input_Data_city;
			
			
			var All_data = {
				type:'city',
				city:city_data
			};
			var url = '/advancedbo/get-provincelist'
			
			clearInterval(this.input_city_timeout);
			if (city_data.length == 0) {
				this.page__view_input_Data_city = '';
				this.data1_city_index = 0;
				this.data1_city = [];
				return false;
			}
			this.input_city_timeout = setTimeout(async () => {
				var userType = await this.detection_validity()
				All_data['userType'] = userType;
				var {data:res} =  await this.$http.get({url,data:All_data})
				var data  = res.list;
				var data1_city = [];
				for (var i in data) {
					console.log(data[i]);
					data[i].forEach(item => {
						data1_city.push(item);
					});
				}
				this.data1_city_index = data1_city.length;
				this.data1_city = data1_city;
			}, 1000);
		},
		// 旁边字母点击跳转
		dddd(item) {
			this.alpha = item;
		},
		// 地区点击× 关闭
		page_cha_one() {
			this.city_one_is_show = true;
			var is_show = this.tab_header_index;
			// if (is_show == 0) {
			this.page__view_input_Data_city = '';
			this.data1_city = [];
			this.data1_city_index = 0;
			// }else if(is_show ==1) {
			this.page__view_input_Data_yt = '';
			this.city_data1_yt = [];
			this.city_data1_yt_index = 0;
			// }else if(is_show == 2){
			this.page__view_input_data_yx = '';
			this.city_data1_yx = [];
			this.city_data1_yx_index = 0;
			// }
		},
		// 地区点击头部切换
		isShow_one_click(index) {
			this.isShow_one = index;
		},
		// 开启地区选择
		city_click() {
			this.city_one_is_show = false;
		},
		// 跟多选择点击
		more_index_data_tap(index) {
			// console.log(data);
			// // 复制过来一份进行操作
			var zb_title = this.zb_title;
			// 如果点击当前的 按钮是 true  则 变为false
			if (zb_title[index].front_row) {
				zb_title[index].front_row = false;
				// console.log(zb_title[index].front_rowz);
			} else {
				var boer = 0;
				for (var i = 0; i < zb_title.length - 1; i++) {
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
						console.log(boer);
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
		// 更多选择确定
		more_index_header_click() {
			this.is_index = true;
		},
		// 开启跟多选择
		tabone_bottom_header() {
			this.is_index = false;
		},
		// 点击服务费按钮选择服务费
		tab_one_checkboxChange() {
			var time_txt = this.tab_one_time_txt; // 当前是什么票房
			var box_index = this.tab_header_index; // 目前是在哪一个 是在 票房还是 影投等
			var date = this.date; // 时间 日票房时间
			var item = this.tab_one_city_name;
			var is_check = this.tab_one_service;
			var city = ''; // 储存当前城市
			var fwf = ''; ///含服务费 是1 不含是0
			if (is_check) {
				fwf = 0;
				is_check = false;
			} else {
				fwf = 1;
				is_check = true;
			}
			if (item == '全国') {
				city == '';
			} else {
				city = item;
			}
			var All_data = {};
			var url = '';
			if (box_index == 0) {
				if (time_txt == '日票房') {
					url = '/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						bdate:date
					}
				} else if (time_txt == '周票房') {
					var date = this.format_week; // 时间
					url = '/topprogram/get-cinema'
					All_data = {
						dtype:'week',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						week:date
					}
				} else if (time_txt == '月票房') {
					var date = this.format_month; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'month',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						month:date
					}
				} else if (time_txt == '年票房') {
					var date = this.format_year; // 时间
					url = '/topprogram/get-cinema'
					All_data = {
						dtype:'year',
						stype:'cinema',
						with_fwf:fwf,
						ismore:1,
						city:city,
						district:'',
						brd:'',
						cinema_chain:'',
						year:date
					}
				}
			} else if (box_index == 1) {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						bdate:date
					}
				} else if (time_txt == '周票房') {
					var date = this.format_week; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'week',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						week:date
					}
				} else if (time_txt == '月票房') {
					var date = this.format_month; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'month',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						month:date
					}
				} else if (time_txt == '年票房') {
					var date = this.format_year; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'year',
						stype:'brd',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:city,
						cinema_chain:'',
						year:date
					}
				}
			} else {
				if (time_txt == '日票房') {
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'date',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						bdate:date
					}
				} else if (time_txt == '周票房') {
					var date = this.format_week; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'week',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						week:date
					}
				} else if (time_txt == '月票房') {
					var date = this.format_month; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'month',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						month:date
					}
				} else if (time_txt == '年票房') {
					var date = this.format_year; // 时间
					url ='/topprogram/get-cinema'
					All_data = {
						dtype:'year',
						stype:'cinema_chain',
						with_fwf:fwf,
						ismore:1,
						city:'',
						district:'',
						brd:'',
						cinema_chain:city,
						year:date
					}
				}
			}
			this.cinema_index(url, this,All_data);
			// console.log(is_check);
			this.tab_one_service = is_check;
		},
		// tab 切换点击
		tab_haderr_click(index) {
			this.tab_header_index = index; // 头部tab切换
			this.isShow_one = index; // 地区插件切换
			this.tab_one_ttiem_fun();
			 var url = '';
 			var All_data = {}
			 if (index == 0) {
				//调取影院数据
				var date = moment().format('YYYY-MM-DD');
				var fwf = '';
				url = '/topprogram/get-cinema'
				All_data = {
					dtype:'date',
					stype:'cinema',
					with_fwf:0,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:'',
					bdate:date
				}
				this.cinema_index(url, this,All_data);
				this.tab_one_service = false;
				this.date = date; // 当前时间
				this.tab_one_date_tiem = date;
				this.tab_one_city_name = '全国';
				this.tab_one_time_txt = '日票房';
				
			} else if (index == 1) {
				//调取影院数据
				var date = moment().format('YYYY-MM-DD');
				var fwf = '';
				url = '/topprogram/get-cinema'
				All_data = {
					dtype:'date',
					stype:'brd',
					with_fwf:0,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:'',
					bdate:date
				}
				this.cinema_index(url, this,All_data);
				this.tab_one_service = false;
				this.date = date; // 当前时间
				this.tab_one_date_tiem = date;
				this.tab_one_city_name = '全国';
				this.tab_one_time_txt = '日票房';
				
			} else if (index == 2) {
				//调取影院数据
				var date = moment().format('YYYY-MM-DD');
				var fwf = '';
				url = '/topprogram/get-cinema'
				
				All_data = {
					dtype:'date',
					stype:'cinema_chain',
					with_fwf:0,
					ismore:1,
					city:'',
					district:'',
					brd:'',
					cinema_chain:'',
					bdate:date
				}
				this.cinema_index(url, this,All_data);
				this.tab_one_service = false;
				this.date = date; // 当前时间
				this.tab_one_date_tiem = date;
				this.tab_one_city_name = '全国';
				this.tab_one_time_txt = '日票房';
				
			}
			
			this.pages = 1;
		},
		// 月方法 获取年 和 所有的周
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
			console.log(year);
			this.is_year_yue = year;
			this.is_year = year;
			this.week = week;
			this.year = all_year;
		},
		// 修改页面标题
		title() {
			uni.setNavigationBarTitle({
				title: '影院院线'
			});
		},
		async cityAll_yyData() {
			var userType = await this.detection_validity()
			var url = '/advancedbo/get-provincelist';
			var All_data = {
				type:'city',
				userType
			}
			var {data:re} = await this.$http.get({url,data:All_data})
			var rm_city_one = re.hotList; // 热门城市
			var zm_list_city = []; //所有城市和字母
			for (var i in re.list) {
				zm_list_city.push({ varter: i, childer: re.list[i] });
			}
			this.rm_city_one = rm_city_one;
			this.zm_list_city = zm_list_city;
		},
		async cityAll_ytData() {
			var userType = await this.detection_validity()
			var url = '/advancedbo/get-provincelist';
			var All_data = {
				type:'chain',
				userType
			}
			var {data} = await this.$http.get({url,data:All_data})
			var mapdata_yx_Redata = data.hotList; //热门城市
			var mapdata_yx_Sumdata = []; //全部城市
			for (var a in data.list) {
				mapdata_yx_Sumdata.push({ varter: a, childer: data.list[a] });
			}
			
			this.mapdata_yx_Sumdata = mapdata_yx_Sumdata;
			this.mapdata_yx_Redata = mapdata_yx_Redata;
		},
		// 影头数据
		async cityAll_yxData() {
			var userType = await this.detection_validity()
			var url = '/advancedbo/get-provincelist';
			var All_data = {
				type:'brd',
				userType
			}
			var {data} = await this.$http.get({url,data:All_data})
			var city_mapdata_yt_Redata = data.hotList; //热门城市
			var city_mapdata_yt_Sumdata = []; //全部城市
			for (var a in data.list) {
				city_mapdata_yt_Sumdata.push({ varter: a, childer: data.list[a] });
			}
			
			this.city_mapdata_yt_Sumdata = city_mapdata_yt_Sumdata;
			this.city_mapdata_yt_Redata = city_mapdata_yt_Redata;
		}
		
	},
	filters: {
		disposeTiem: function(tiem) {
			// console.log(tiem);
			var t = new Date(tiem);
			// console.log(t);
			var s = t.getHours();
			var f = t.getMinutes();
			// var m = t.getSeconds();
			// console.log(f > 10);
			if (f < 10) {
				f = '0' + f;
				// console.log(f);
			}
			// console.log(s)
			// console.log(f)
			return s + ':' + f;
		}
	}
};
</script>

<style lang="less">
@import url('./cinema_chain.less');
@import url('./city.less');
page {
	background: rgba(245, 245, 245, 1);
}

// 跟多选择
.more {
	// position: relative;
	position: fixed;
	top: 0;
	// width: 100%;
	height: 100%;
	// background-color: red;
	.more_header {
		height: 2000upx;
		background-color: rgba(0, 0, 0, 0.2);
		position: fixed;
		// opacity: 0.2;
	}
	// bottom: 0;
	.more_index {
		// height: 100%;
		height: 450upx;
		position: fixed;
		bottom: 0;
		// bottom: 0;
		// bottom: 0;
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
// 跟多选择
</style>
