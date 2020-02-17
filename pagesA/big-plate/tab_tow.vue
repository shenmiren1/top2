<template>
	<view>
		<!-- 地域排场 -->

		<view class="tabtow" :hidden="!(tabindex == 1)">
			<!--  默认选择省份排片 -->
			<view class="tabtowHeader">
				<view class="tabtowHeader_one">
					<view @tap="tabtow_xuan(item, index)" :class="[tabtowheader_index == index ? 'active' : '']" v-for="(item, index) in tabtowHeader_i" :key="index">
						{{ item }}
					</view>
				</view>
				<!-- <scroll-view scroll-y class="tabtowHeader_all"></scroll-view> -->
			</view>
			<!-- 顶部 前后天数 -->
			<view class="tab_data">
				<view @tap="TowLeft_date">
					<image src="../../static/big-plate/previous.png" mode=""></image>
					前一天
				</view>
				<view @tap="tab_tow_click">
					{{ tabTowitem_data | item_filter }}
					<image src="../../static/big-plate/xia.png" mode=""></image>
				</view>
				<view @tap="TowRight_date">
					后一天
					<image src="../../static/big-plate/next.png" mode=""></image>
				</view>
			</view>
			<!-- 顶部 前后天数 -->
			<!--  总场次 movie_city_data   tabTowsum()       tabTowsum_data-->
			<view class="tabtow_number">
				<view class="total_number">总场次{{ movie_city_data }}场</view>
				<view class="tabtow_item">
					<!-- 大盘排片的数据 -->
					{{ tabTowitem_data | item_filter }} {{ tabTowitem_data | item_data_filter }}
					<!-- 大盘排片的数据 -->
				</view>
			</view>
			<!--  总场次  -->
			<!-- 选择时段 等 -->
			<view class="tabtow_data">
				<view class="region">
					<view @tap="Towistap(index, '省份')" v-for="(item, index) in tabtowheader_title" v-if="tabtow_isShow == 0" :key="index">
						{{ item }}
						<!-- v-if="!(index == 0)" -->
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="Towistap(index, '城市')" v-for="(item, index) in tabtowheader_title" v-if="tabtow_isShow == 1" :key="index">
						{{ item }}
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="Towistap(index, '票仓')" v-for="(item, index) in tabtowheader_title" v-if="tabtow_isShow == 2" :key="index">
						{{ item }}
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
				</view>
			</view>

			<view class="swiper-container">
				<!--   -->
				<view class="post-bg" v-if="tab_tow_movie.url != undefined" :style="{ backgroundImage: 'url' + '(' + tab_tow_movie.url + ')' }"></view>
				<view class="post-bg-mask"></view>
				<scroll-view class="swiper-wrapper scroll-view_H" scroll-x :scroll-left="tab_tow_scrollLeft">
					<view :id="'item' + index" class="movie-item movie-item_three" v-for="(item, index) in testimgs" :key="index" @tap="onclickimg(index, item)">
						<view :class="['post', index == tab_tow_movie.id ? 'select' : '']">
							<image v-if="!(item.url == 'https://db.topcdb.com')" :src="item.url"></image>
							<image v-if="item.url == 'https://db.topcdb.com'" src="../../static/big-plate/available_poster.png"></image>
						</view>
					</view>
				</scroll-view>
			</view>
			<!-- 影片画廊 -->
			<!-- 当前饮片的名字 和 评分  -->
			<view class="tabtow_name">
				<view class="tabtow_name_name">
					<!-- movieName -->
					<view>{{ movie_name }}</view>
					<view class="tabtow_name_name_tow">
						<!-- {{ movie_city_data | session_s_data }}  tab_towsession_s_data_compu_pc-->
						<tezt class="">{{ tabTowsumcity }}总排场:{{ movie_city_data }}</tezt>
						{{ kg }}
						<tezt v-if="tabTowcinema_num == 0">全国占比:{{ sumData_ss_ses.session_ss }}%</tezt>
						<tezt v-if="tabTowcinema_num == 1">;全国占比:{{ sumData_ss_ses.seats_ss }}%</tezt>
					</view>
				</view>

				<!-- <view class="tabtow_name_jiao"></view> -->
				<view class="tabtow_name_but" @tap="tabtow_name_navigeto(1)"><image src="../../static/big-plate/next.png" mode=""></image></view>
			</view>
			<!-- 当前饮片的名字 和 评分 -->
			<!-- 数据展示-->
			<view class="tabtow_button">
				<view class="tabtow_button_header" v-if="tabTowcinema_num == 0">
					<view class="" :hidden="!(tabtow_button_header_br == 0)">
						<text @tap="tabtow_button_header_br_click('0')" :hidden="!(tabtow_isShow == 0)">返回全国</text>
						<text @tap="tabtow_button_header_br_click('1')" :hidden="!(tabtow_isShow == 1)">返回全部城市</text>
						<text @tap="tabtow_button_header_br_click('2')" :hidden="!(tabtow_isShow == 2)">返回票仓</text>
					</view>
					<view :hidden="tabtow_button_header_br == index" v-for="(item, index) in tabtow_button_header" :key="index">{{ item }}</view>
				</view>

				<view class="tabtow_button_header" v-if="tabTowcinema_num == 1">
					<view class="" :hidden="!(tabtow_button_header_br == 0)">
						<text @tap="tabtow_button_header_br_click('0')" :hidden="!(tabtow_isShow == 0)">返回全国</text>
						<text @tap="tabtow_button_header_br_click('1')" :hidden="!(tabtow_isShow == 1)">返回全部城市</text>
						<text @tap="tabtow_button_header_br_click('2')" :hidden="!(tabtow_isShow == 2)">返回票仓</text>
					</view>
					<view :hidden="tabtow_button_header_br == index" v-for="(item, index) in tabtow_button_headerTow" :key="index">{{ item }}</view>
				</view>

				<!-- c场次 -->
				<view class="tabtow_button_data" :hidden="!(tabTowcinema_num == 0)">
					<view class="tabtow_button_data_iew">
						<!-- 没用 -->
						<view v-if="tabtow_isShow == 3">{{ item.province }}</view>
						<view v-if="tabtow_isShow == 3">{{ item.city }}</view>
						<view v-if="tabtow_isShow == 3 && tabtow_button_header_br != 0">{{ item.district }}</view>
						<view v-if="tabtow_isShow == 3 && tabtow_button_header_br == 0">{{ item.city }}</view>
						<!-- 没用 -->
						<!-- 当前选择的城市和占比 -->
						<view :style="{ color: '#EF8D2D' }">{{ tabtowheader_title[0] }}</view>
						<view :style="{ color: '#EF8D2D' }">{{ sumData_ss_ses.session_s }}</view>
						<view :style="{ color: '#EF8D2D' }">{{ sumData_ss_ses.session_ss }}%</view>

						<view :style="{ color: '#EF8D2D' }"><view class="tabtow_button_data_iew_">---</view></view>
						<!-- ,textDecoration:'line-through' -->
					</view>

					<view v-for="(item, index) in tabtow_data_city" :key="index" @tap="tz_click_tow(item)" class="tabtow_button_data_iew">
						<view v-if="tabtow_isShow == 0 && tabtowheader_title[0] == '全国'">{{ item.province }}</view>
						<view v-if="tabtow_isShow == 1 && tabtowheader_title[0] == '全国'">{{ item.city }}</view>
						<view v-if="tabtow_isShow == 2 && tabtow_button_header_br != 0 && tabtowheader_title[0] == '全国'">{{ item.district }}</view>
						<view v-if="tabtow_isShow == 2 && tabtow_button_header_br == 0 && tabtowheader_title[0] == '全国'">{{ item.city }}</view>
						<view v-if="tabtow_isShow == 0 && !(tabtowheader_title[0] == '全国')">{{ item.city }}</view>
						<view v-if="!(tabtowheader_title[0] == '全国') && tabtow_isShow == 1">{{ item.cinema_name }}</view>
						<view v-if="!(tabtowheader_title[0] == '全国') && tabtow_isShow == 2">{{ item.city }}</view>
						<view>{{ item.session_s }}</view>
						<view>{{ item.session_ss }} %</view>
						<view>{{ item.session_ss_zb }}</view>
					</view>
				</view>

				<!-- 座位 -->
				<view class="tabtow_button_data" :hidden="!(tabTowcinema_num == 1)">
					<view class="tabtow_button_data_iew">
						<!-- 没用 -->
						<view v-if="tabtow_isShow == 3">{{ item.province }}</view>
						<view v-if="tabtow_isShow == 3">{{ item.city }}</view>
						<view v-if="tabtow_isShow == 3 && tabtow_button_header_br != 0">{{ item.district }}</view>
						<view v-if="tabtow_isShow == 3 && tabtow_button_header_br == 0">{{ item.city }}</view>
						<!-- 没用 -->
						<!-- 当前选择的城市和占比 -->
						<view :style="{ color: '#EF8D2D' }">{{ tabtowheader_title[0] }}</view>
						<view :style="{ color: '#EF8D2D' }">{{ sumData_ss_ses.seats_s }}</view>
						<view :style="{ color: '#EF8D2D' }">{{ sumData_ss_ses.seats_ss }}%</view>
						<view :style="{ color: '#EF8D2D' }"><view class="tabtow_button_data_iew_">---</view></view>
						<!-- ,textDecoration:'line-through' -->
					</view>
					<view v-for="(item, index) in tabtow_data_city" :key="index" @tap="tz_click_tow(item)" class="tabtow_button_data_iew">
						<view v-if="!(tabtow_isShow == 2) && tabtowheader_title[0] == '全国'">{{ item.province }}</view>
						<view class="" v-if="tabtow_isShow == 2 && tabtowheader_title[0] == '全国'">{{ item.district }}</view>

						<view v-if="tabtow_isShow == 0 && !(tabtowheader_title[0] == '全国')">{{ item.city }}</view>
						<view v-if="!(tabtowheader_title[0] == '全国') && tabtow_isShow == 1">{{ item.cinema_name }}</view>
						<view v-if="!(tabtowheader_title[0] == '全国') && tabtow_isShow == 2">{{ item.city }}</view>

						<view>{{ item.seats_s }}</view>
						<view>{{ item.seats_ss }} %</view>
						<view class="tabtow_button_data_iew_jia">{{ item.seats_ss_zb }}</view>
					</view>
				</view>
				<!-- <view class="tabtow_button_data" :hidden="!(tabtow_isShow == 2)">
					<view v-for="(item,index) in tabtow_data_bunker" :key="index" >
						<view>{{item.name}}</view>
						<view>{{item.bfb}}</view>
						<view>{{item.session}}</view>
					</view>
				</view> -->
			</view>
			<!-- 数据展示 -->

			<view class="ei_calendar_wai" :hidden="!tab_tow_show">
				<view :hidden="!tab_tow_show" @tap="ei_calendar_wai_click()" class="ei_calendar_wai_cha">×</view>
				<ei-calendar
					@click="tab_tow_ei_calendar"
					type="single"
					:visible.sync="tab_tow_show"
					ref="calendar"
					:drawer="false"
					:disabledDate="tab_tow_disabledDate"
					v-model="tab_tow_date"
					:custom-date="tab_tow_customDate"
					format="YYYY-MM-DD"
				></ei-calendar>
				<!-- 	<ei-calendar
								type="single"
								:drawer="false"
								:visible.sync="tab_tow_show"
								:disabledDate="tab_tow_disabledDate"
								ref="calendar"
								v-model="tab_tow_date"
								:custom-date="tab_tow_customDate"
								format="YYYY-MM-DD"
								@click="tab_tow_ei_calendar"
							></ei-calendar> -->
				<scroll-view class="ei_calendar_view" scroll-y></scroll-view>
			</view>

			<!-- 日历插件 -->

			<!-- 城市地区选择 -->
			<view class="city_sel_one" :style="{ top: 0 + 'px' }" :hidden="Tow_one_is_show">
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
							<!-- cha 点击关闭 -->
							<view class="page__view_cha" @tap="page__view_cha_one">×</view>
							<view class="page__view_input">
								<input type="text" value="" @input="page__view_input_one" v-model="page__view_input_oneData" placeholder="搜索城市名称" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>
							<view class="page_view_one_soso" :hidden="towThree_data1_index == 0">
								<!--  -->
								<!--  {{page__view_input_oneData}}   {{towThree_data2[index]}} -->
								<view class="" @tap="tabTowclick_city(item)" v-for="(item, index) in towThree_data1" :key="index">{{ item }}</view>
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="towThree_data1_index != 0">区域</view>
							<view
								:class="[tabtowheader_title[0] == '全国' ? 'tabTow_xz_one' : '', 'page__view_city']"
								:hidden="towThree_data1_index != 0"
								@tap="tabTowclick_grid('全国')"
							>
								全国
							</view>
							<!-- <view class="page__bd">
								<view class="weui-grids">
									<block v-for="(it, index) in qy" :key="index">
										<view class="weui-grid" @tap="tabTowclick_grid('全国')" :data-name="item" hover-class="weui-grid_active">
											<view class="weui-grid__label">全国</view>
										</view>
									</block>
								</view>
							</view> -->

							<!-- 热门城市 -->
							<view class="title" :hidden="towThree_data1_index != 0">热门城市</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in tow_rm_city_one" :key="index">
										<view
											:class="[tabtowheader_title[0] == it ? 'tabTow_xz_one' : '', 'weui-grid']"
											:hidden="towThree_data1_index != 0"
											@tap="tabTowclick_city(it)"
											:data-name="it"
											hover-class="weui-grid_active"
										>
											<!--tabTowclick_grid    -->
											<view :class="[tabtowheader_title[0] == 'it' ? 'tabTow_xz_one' : '', 'weui-grid__label']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="towThree_data1_index != 0">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in zm_list_city" :id="it.letter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tabTowclick_city(vv)" class="section-item-cells_one">
											<view
												:class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tabtowheader_title[0] == vv ? 'tabTow_xz_one_city' : '']"
											>
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

			<!-- 省份选择地区选择    -->
			<view class="city_sel_one" :style="{ top: 0 + 'px' }" :hidden="Towis_show">
				<view class="page__bd">
					<!-- 选择城市 -->
					<view class="" v-if="inputVal.length <= 0">
						<view id="border_he" class="alphanet-selector" catchtouchmove="handlerMove">
							<view v-for="(it, index) in zm_right" :key="index" @tap="dddd(it)" class="selector-one">{{ it }}</view>
						</view>
						<scroll-view class="page__view" scroll-y :scroll-into-view="alpha">
							<view class="page__view_cha" @tap="page__view_cha_one">×</view>
							<!-- cha 点击关闭 -->

							<!-- <view class="page__view_input"> -->
							<!-- <input type="text" value="" v-model="page__view_input_oneData" placeholder="搜索省名称或拼音" @input="page__view_input_one" /> -->
							<!-- <image src="../../static/home/amplification.png" mode=""></image> -->
							<!-- </view> -->
							<!-- 区域 -->
							<view class="title">区域</view>
							<view :class="[tabtowheader_title[0] == '全国' ? 'tabTow_xz_one' : '', 'page__view_city']" @tap="tabTowclick_city_one('全国')">全国</view>
							<!-- 热门城市 -->
							<view class="title">热门省份</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<!-- v-for="(it, index) in rm_city" :key="index" -->
									<block v-for="(item, index) in hotMap" :key="index">
										<view class="weui-grid" @tap="tabTowclick_city_one(item)" :data-name="it" hover-class="weui-grid_active">
											<view :class="['weui-grid__label', tabtowheader_title[0] == item ? 'tabTow_xz_one' : '']">{{ item }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in mapData" :id="it.letter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tabTowclick_city_one(vv)" class="section-item-cells_one">
											<!-- ii != it.length - 1 ? 'border-bottom' : '' , -->
											<view :class="['section-item-cell', tabtowheader_title[0] == vv ? 'tabTow_xz_one_city' : '']">
												<!-- <text></text> -->
												{{ vv }}
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

			<!-- 票仓选择地区选择    -->
			<view class="city_sel_bunker" :style="{ top: 0 + 'px' }" :hidden="Towis_show_bunker">
				<view class="page__bd">
					<scroll-view class="page__view" scroll-y :scroll-into-view="alpha">
						<!-- cha 点击关闭 -->
						<view class="page__view_cha" @tap="page__view_cha_bunker">×</view>
						<!-- <view class="page__view_input">
							<input type="text" value="" placeholder="搜索省名称或拼音" />
							<image src="../../static/home/amplification.png" mode=""></image>
						</view> -->
						<!-- 区域 -->
						<view class="title">区域</view>
						<view class="page_view_city">
							<view
								:class="[tabtowheader_title[0] == item ? 'tabTow_xz_one' : '', 'page_view_city_data']"
								v-for="(item, index) in qy"
								:key="index"
								@tap="tabTowclick_city_three(item)"
							>
								{{ item }}
							</view>
						</view>
					</scroll-view>
				</view>
			</view>
			<!-- </view> -->
			<!--  地区选择 -->

			<!-- 场次选择 -->

			<view class="center_sessionss_one" :hidden="tabTowis_lx">
				<view @tap="tabTowclick_lx('场次')" :class="['center_frame_quan', tabTowcinema_num == 0 ? 'active' : '']">
					场次
					<view v-if="tabTowcinema_num == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
				<view @tap="tabTowclick_lx('座位')" :class="['center_frame_hj', tabTowcinema_num == 1 ? 'active' : '']">
					座位
					<view v-if="tabTowcinema_num == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
			</view>
			<!-- 场次选择 -->
			<!-- 时段选择 -->
			<view class="tabTowcenter_frame" :hidden="tabTowis_sd">
				<view @tap="tabTowclick_sd('全时段')" :class="['center_frame_quan', tabTow_center_frame == 0 ? 'active' : '']">
					全时段（6:00-次日6:00）
					<view v-if="tabTow_center_frame == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
				<view @tap="tabTowclick_sd('黄金场')" :class="['center_frame_hj', tabTow_center_frame == 1 ? 'active' : '']">
					黄金时段（18:00-21:00）
					<view v-if="tabTow_center_frame == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
			</view>
			<!-- 时段选择 -->
		</view>
		<!-- 地域排场 -->
	</view>
</template>

<script>
import { mapState } from 'vuex';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
// 时间格式化
import moment from '@/components/moment';
let _self = '';
export default {
	components: {
		EiCalendar
	},
	data() {
		return {
			tab_tow_size: 0, //电影item的大小（包括margin
			size: undefined,
			setinput_one: '', //保存 省份所有定时器
			tabtowtitle: '', // 城市
			tabTowisgoldentime: '0', //时段
			tabTowdistrict: '', //  几线
			tabTow_center_frame: 0, // 时段默认样式
			tabTowis_sd: true, // tabtow时段控制
			tabTowis_lx: true,
			// 区域选择
			qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
			tow_rm_city_one: ['北京', '上海', '广州', '深圳 ', '成都', '武汉'],
			towThree_data1: [], // 搜索出来的前边部分
			zm_list_city: [], // tabtow 城市的所有 字母和数据
			tow_rm_city_one: ['北京', '上海', '广州', '深圳 ', '成都', '武汉'],
			page_view_city_soso: [], // 保存城市搜索数据
			towThree_data1_index: 0,
			page__view_input_oneData: '', // 搜索省份的数据
			alpha: '',
			// 旁边的字母
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			inputVal: '', // 城市如果有字拒接显示
			Towis_show: true,
			Tow_one_is_show: true,
			Towis_show_bunker: true,
			tab_tow_customDate: [
				{
					cellClass: 'custom-cell',
					// date: '',
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
			tab_tow_date: '',
			tab_tow_disabledDate: ['2019-7-19'], // 当前日期
			// tab_tow 日历
			tab_tow_show: false,
			tabtow_data_city: [],
			tabtow_button_header: ['省份', '场次', '场次占比', '场次占省份'],
			tabtow_button_headerTow: ['省份', '座位', '座位占比', '座位占省份'],
			tabtow_button_header_br: 4, // 控制是否显示全国
			tabTowsumcity: '全国', // 目前所在的城市
			tabTowcinema_num: 0, // 显示座位 和 场次
			testimgs: [
				{
					badeg: 0,
					dec: '千与千寻'
					// 画廊示例数据
				}
			],
			Msg: 0,
			tab_tow_scrollLeft: 0, //设置滚动条位置
			tab_tow_movie: {
				url: 'https://db.topcdb.com/uploads/movie_thumb/3/3_300X500_7123_bd7b1818.jpg'
			}, //选中的电影
			tabTowitem_data: '2019-07-08', // 当前选择选择时间
			tabtowheader: true, //地域排场的的首先上药要选择的
			tabtowheader_index: 0, // 控制 哪一个 tabyow 上的哪一个加样式
			tabtowHeader_i: ['省份排片', '城市排片', '票仓排片'],
			tabtowheader_title: ['全国', '全时段', '场次'], // 循环中间部分
			tabtow_isShow: 0, // 控制显示哪一个
			tabTow_allData: {}, // 地域排场的所有数据
			movieName: '千与千寻', // 当前饮片的名字 用来查找
			tabTowsumData: ['1'], // sum 只存放sees_s
			tabTowsumindex: ['千与千寻'], //存放sess 对的名字
			sumData_ss: {
				千与千寻: {
					seats_s: '22103145',
					seats_ss: '51.03',
					session_s: '149860',
					session_ss: '42.81'
				}
			}, // 当前城市数据占比
			tabTowsumSeats_s: [], // 所有总排场集合
			movie_city_data_data: '',
			mapData: [], // tow 省份所有数据
			hotMap: [], // tow 省份热门城市
			kg: '   ' //空格
		};
	},
	computed: {
		...mapState({ tabindex: 'bigPlate_tabIndex' }),
		// 当前影片名称
		movie_name() {
			var movieName = this.testimgs[this.Msg].dec;
			this.movieName = movieName;
			// console.log(this.testimgs[this.Msg]);
			return movieName;
		},
		sumData_ss_ses() {
			var b = this.movieName;

			var data_one = this.sumData_ss[b];
			if (data_one == undefined) {
				return {
					seats_s: '---',
					seats_ss: '--',
					session_s: '--',
					session_ss: '--',
					session_ss_zb: '--',
					seats_ss_zb: '--'
				};
			} else {
				return data_one;
			}
		},
		// 单前影片 当前地区的总排场

		movie_city_data() {
			var a = this.tabTowsumindex;
			var b = this.movieName;
			var index = a.indexOf(b);
			// console.log(this.tabTowsumSeats_s[index]);
			if (this.tabTowsumSeats_s[index] == undefined) {
				return '----';
				this.movie_city_data_data = '1111111111';
			} else {
				this.movie_city_data_data = this.tabTowsumSeats_s[index] + '';
				console.log(this.tabTowsumSeats_s[index]);
				return this.tabTowsumSeats_s[index] + '';
			}
		}
	},
	filters: {
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
		},
		//  格式化时间
		item_data_filter(data) {
			var d = data;
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
			} else if (tt == undefined || tt == null) {
				return '--';
			}
			return time;
		}
	},
	watch: {
		tabindex() {
			if (this.tabindex != 1) return false;
			var testimgs = this.testimgs; // 所有画廊数据
			_self = this;
			if (testimgs[0] != undefined) {
				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;
			}
			this.tabtow_xuan('省份排片', 0);
			// // // tow省份地区列表
			this.tabtowsf();
			// // // tow 城市的地区列表
			this.tabtow_city();
		}
	},
	methods: {
		// 热门城市
		tabTowclick_grid(aa) {
			// console.log('热门城市');
			var testimgs = this.testimgs; // 所有画廊数据

			uni.showToast({
				title: '已选中全国',
				duration: 500,
				icon: 'none'
			});
			// return false;
			setTimeout(() => {
				//  当前选择的模式
				var tabtow_isShow = this.tabtow_isShow;
				var date = this.tabTowitem_data_xq; // 时间
				var that = this;
				var city_name = aa;
				var tabtowheader_title = that.tabtowheader_title;
				var isgoldentime = that.isgoldentime; //时段
				// var district = that.tabTowdistrict; //几线
				var city = that.tabtowtitle; //城市
				city = aa;
				var testimgs = this.testimgs; // 所有画廊数据

				if (city == '全国') {
					city = '';
				}
				// 判断当前点击是哪一个 制定url 数据
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'city',
					bdate: date,
					city: city,
					isgoldentime: isgoldentime
				};
				that.tabTow_index(url, All_data);

				tabtowheader_title[0] = city_name;
				this.tabtowheader_title = tabtowheader_title;
				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;

				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;
				this.tabtowtitle = aa;
				// 关闭 地区选择
				this.Towis_show = true; //  关闭第一个省份
				this.Tow_one_is_show = true; // 关闭第二个城市
				// this.no_check_time = false;
				this.tabtow_button_header_br = 0; //是否显示 返回全国
			}, 500);
		},
		// 点击后一天
		TowRight_date() {
			let tabtow_isShow = this.tabtow_isShow;
			let that = this;
			var city_name = this.tabtowtitle;
			var testimgs = this.testimgs; // 所有画廊数据

			var isgoldentime = that.isgoldentime; //时段
			var district = that.tabTowdistrict; //几线
			var city = that.tabtowtitle; //城市
			var date = this.tabTowitem_data;
			var date = moment(date)
				.subtract(-1, 'days')
				.format('YYYY-MM-DD');
			if (city_name.indexOf('线城市') != -1 || city_name == '全国') {
				district = city_name;
				city = '';
			} else {
				district = '';
				city = city_name;
			}
			let url = '';
			let All_data = {};
			// 制定 url
			if (tabtow_isShow == 0) {
				if (city == '') {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'province',
						district: district,
						bdate: date,
						city: city,
						isgoldentime: isgoldentime
					};
				} else {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'province',
						province: city,
						isgoldentime: isgoldentime,
						bdate: date
					};
				}
			} else if (tabtow_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'city',
					district: district,
					bdate: date,
					city: city,
					isgoldentime: isgoldentime
				};
			} else if (tabtow_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'district',
					district: district,
					bdate: date,
					city: city,
					isgoldentime: isgoldentime
				};
			}
			this.tab_tow_movie = testimgs[0];
			this.tab_tow_scrollLeft = 0;
			this.tabTowitem_data = date;
			this.tab_tow_date = date;
			this.tabTow_index(url, All_data);
		},
		// tow 插件城市的所有数据
		async tabtow_city() {
			let userType = await this.detection_validity();
			let data_all = {
				type: 'city'
			};
			data_all.userType = userType;
			let { data: re } = await this.$http.get({
				url: '/advancedbo/get-provincelist',
				data: data_all
			});
			let tow_rm_city_one = re.hotList; // 热门城市
			let zm_list_city = []; //所有城市和字母
			for (let i in re.list) {
				zm_list_city.push({
					letter: i,
					childer: re.list[i]
				});
			}
			console.log(zm_list_city);
			this.tow_rm_city_one = tow_rm_city_one;
			this.zm_list_city = zm_list_city;
		},
		async tabtowsf() {
			let userType = await this.detection_validity();
			let data_all = {
				type: 'province'
			};
			data_all.userType = userType;
			let { data: re } = await this.$http.get({
				url: '/advancedbo/get-provincelist',
				data: data_all
			});
			let hotMap = re.hotList; // 热门区域
			let mapData = []; // 所有城市
			for (let i in re.list) {
				mapData.push({
					letter: i,
					childer: re.list[i]
				});
			}
			this.mapData = mapData;
			this.hotMap = hotMap;
		},
		//计算节点大小
		calcSize() {
			return new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(_self);
				query
					.select(`#item1`)
					.fields(
						{
							size: true,
							computedStyle: ['margin-left']
						},
						function(res) {
							let size = 0;
							if (res) {
								size = res.width + parseFloat(res['margin-left']);
							}
							console.log(size, res);
							resolve(size);
						}
					)
					.exec();
			});
		},
		onclickimg(imgviewobj, data) {
			var size = this.size;
			uni.showToast({
				title: '正在跳转',
				duration: 2000,
				icon: 'none'
			});
			const tab_tow_movie = data;
			const index = imgviewobj; //下标
			if (size != undefined && size != 0) {
				this.tab_tow_movie = tab_tow_movie;
				this.scrollLeft = this.size * index;
				this.tab_tow_scrollLeft = this.size * index;
			} else {
				this.calcSize().then(size => {
					this.size = size;
					this.tab_tow_movie = tab_tow_movie;
					this.tab_tow_size = size;
					this.tab_tow_scrollLeft = size * index;
				});
			}

			this.Msg = imgviewobj;
			this.setDataName(imgviewobj, imgviewobj);
		},

		// 画廊下默认展示的城市省份等等数据默认第一个
		setDataName(id = 0, index = 0) {
			// // 全国数据
			//  下边是城市默认 显示的 数据
			let xsData = this.tabTow_allData.data[this.testimgs[id].dec]; // 默认显示第一个
			let xsSum = this.tabTow_allData.sum[this.testimgs[id].dec]; // 默认显示第一个
			let dapan_sum = this.tabTow_allData.dapan_sum; // 数据综合 场次 座位
			let movie_sum = this.tabTow_allData.movie_sum; //  当前地区的对应的 所有的信息
			var tabtowheader_index = this.tabtowheader_index; // 选择的是地域排场下的哪一个
			var tabtow_isShow = this.tabtow_button_header_br; // 点击了 地区选择插件之后的
			var city_name = [...this.tabtowheader_title];
			let xsDataSum = [];
			var data = '';
			if (tabtowheader_index == 0) {
				data = 'province';
				if (tabtow_isShow == 0 && city_name[0].indexOf('全国') == -1) {
					data = 'city';
				}
			} else if (tabtowheader_index == 1) {
				data = 'city';
				if (tabtow_isShow == 0 && city_name[0].indexOf('全国') == -1) {
					data = 'cinema_name';
				}
			} else {
				data = 'district';
				if (tabtow_isShow == 0 && city_name[0].indexOf('全国') == -1) {
					data = 'city';
				}
			}
			for (let a in xsData) {
				// 场次占比
				xsData[a].session_ss = ((xsData[a].session_s / xsSum.session_s) * 100).toFixed(2);
				// 座位占比
				xsData[a].seats_ss = ((xsData[a].seats_s / xsSum.seats_s) * 100).toFixed(2);
				if (movie_sum[a] == undefined) {
					console.log(movie_sum[a]);
				} else if (movie_sum[a][data] == xsData[a][data]) {
					//座位占比
					xsData[a].seats_ss_zb = ((Number(xsData[a].seats_s) / Number(movie_sum[a].seats_s)) * 100).toFixed(2) + '%';
					// 场次占比
					xsData[a].session_ss_zb = ((Number(xsData[a].session_s) / Number(movie_sum[a].session_s)) * 100).toFixed(2) + '%';
				}
				xsDataSum.push(xsData[a]);
			}

			let sumData_ss = {};
			let tabTow_allData_sum = this.tabTow_allData.sum;
			for (let b in tabTow_allData_sum) {
				// console.log(this.tabTow_allData.sum[b]);
				let seats_s_s = ((tabTow_allData_sum[b].seats_s / dapan_sum.seats_s) * 100).toFixed(2); // 总座位占比
				let session_s_s = ((tabTow_allData_sum[b].session_s / dapan_sum.session_s) * 100).toFixed(2); //  总场次占比
				sumData_ss[tabTow_allData_sum[b].movie_name] = {
					seats_ss: seats_s_s,
					session_ss: session_s_s,
					seats_s: tabTow_allData_sum[b].seats_s,
					session_s: tabTow_allData_sum[b].session_s
				};
			}
			this.sumData_ss = sumData_ss;
			this.tabtow_data_city = xsDataSum;
		},
		// 画廊数据
		setimgs() {
			// 画廊用到的数据
			let data = this.tabTow_allData.movie_data;
			var imgs = []; // 画廊暂时数据存放
			let num = 0; // 画廊角表
			let sum = this.tabTow_allData.sum; // 所有的场次 座位 总数
			//  画廊数据
			// console.log(data,'testimgs');
			for (let i in data) {
				num++;
				// console.log(num);
				let imgobj = {
					dec: '', //图像描述信息
					badeg: '', //角标文字
					badegcolor: '#000000', //角标颜色
					url: '', //图源
					dominant: '', //主色
					maoyan_score: '', // 猫眼评分
					sum: [], // 数据综合
					id: 0,
					zz_id: '', ///  新加数据  应为要做跳转
					mid: '' ///  新加数据  应为要做跳转
				};
				for (let a in data[i].movie_img) {
					imgobj.url = 'https://db.topcdb.com' + data[i].movie_img[a];
				}
				imgobj.zz_id = data[i].zz_id;
				imgobj.mid = data[i].mid;
				imgobj.dominant = this.retcolor(); //随机主色
				imgobj.dec = data[i].zz_name; //描述
				imgobj.badeg = num; //角标文字
				imgobj.id = num - 1; //id
				imgobj.badegcolor = i % 2 == 0 ? 'red' : 'LimeGreen'; //角标颜色
				imgobj.maoyan_score = data[i].maoyan_score;
				imgs.push(imgobj);
			}
			if (this.tab_tow_movie.id == undefined) {
				this.tab_tow_movie = imgs[0];
			}
			this.testimgs = imgs;
			this.setDataName();
		},
		//  画廊随机颜色
		retcolor() {
			let color = '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
			return color;
		},
		// 地域选择 调用接口
		async tabTow_index(url, data_all) {
			let userType = await this.detection_validity();
			data_all.userType = userType;
			let { data: res } = await this.$http.get({
				url,
				data: data_all
			});
			this.tabTow_allData = res;
			var sumData = []; // 只存总场次
			var sumSeats_s = []; // 存总排场
			var sumindex = [];
			for (let a in res.sum) {
				sumindex.push(a);
				sumData.push(res.sum[a].session_s);
				sumSeats_s.push(res.sum[a].session_s);
			}
			this.tabTowitem_data = res.parameter.bdate;
			this.tabTowsumData = sumData; //sumData
			this.tabTowsumSeats_s = sumSeats_s;
			this.tabTowsumindex = sumindex;
			// 画廊调用
			this.setimgs();
		},
		// 点击场次选择
		tabTowclick_sd(name) {
			var that = this;
			var tabtowheader_title = that.tabtowheader_title; // 显示的数组
			var sd = '';
			var txt = name;
			var tabtow_isShow = this.tabtow_isShow;
			var city_name = this.tabtowtitle;
			var date = this.tabTowitem_data_xq; // 时间
			var isgoldentime = that.tabTowisgoldentime; //时段
			var district = that.tabTowdistrict; //几线
			var city = that.tabtowtitle; //城市

			if (city_name.indexOf('线城市') != -1) {
				district = city_name;
				city = '';
			} else {
				district = '';
				city = city_name;
			}

			if (txt == '黄金场') {
				isgoldentime = '1';
				sd = 1;
			} else {
				sd = 0;
				isgoldentime = '0';
			}
			// 制定 url
			let url = '';
			let All_data = {};
			if (tabtow_isShow == 0) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'province',
					isgoldentime: isgoldentime,
					bdate: date,
					city: city,
					district: district
				};
			} else if (tabtow_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'city',
					isgoldentime: isgoldentime,
					bdate: date,
					city: city,
					district: district
				};
			} else if (tabtow_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'district',
					isgoldentime: isgoldentime,
					bdate: date,
					city: city,
					district: district
				};
			}
			this.tabTow_index(url, All_data);
			tabtowheader_title[1] = txt;
			this.tabTowis_sd = true;
			// this.tabTowcinema_num = sd;
			this.tabtowheader_title = tabtowheader_title;
			//  图片显示
			this.tabTowisgoldentime = sd;
			// console.log(sd);
			this.tabTow_center_frame = sd;
			uni.hideLoading();
		},
		// tabtow场次选择
		tabTowclick_lx(name) {
			var that = this;
			var tabtowheader_title = that.tabtowheader_title;
			var sd = '';
			var txt = name;
			if (txt == '座位') {
				sd = 1;
			} else {
				sd = 0;
			}

			tabtowheader_title[2] = txt;
			this.tabTowis_lx = true;
			this.tabTowcinema_num = sd;
			this.tabtowheader_title = tabtowheader_title;
		},
		// 票仓排片 地区点击
		tabTowclick_city_three(item) {
			let title = `已选中${item}`;
			var testimgs = this.testimgs; // 所有画廊数据
			var tabtow_button_header = this.tabtow_button_header; // 场次 header
			var tabtow_button_headerTow = this.tabtow_button_headerTow; // z座位header
			tabtow_button_header[3] = '场次占城市';
			tabtow_button_headerTow[3] = '座位占城市';

			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var tabtowheader_title = this.tabtowheader_title; // 中中显示部分
				tabtowheader_title[0] = item;
				var bdate = this.tabTowitem_data; //时间
				var isgoldentime = this.isgoldentime; //时段// 时段
				if (item == '全国') {
					this.tabtowtitle = ''; //城市
					this.tabtow_xuan('票仓排片', 2);
				} else {
					let url = '/topprogram/get-rowpiece';
					let All_data = {
						type: 'district',
						district: item,
						isgoldentime: isgoldentime,
						bdate: bdate
					};
					this.tabTow_index(url, All_data);
					this.tabtow_button_header_br = 0; //控制是够显示全国
					this.tabtowtitle = item; //城市
					this.tabtowheader_titlec = tabtowheader_title;
				}
				this.tabtow_button_header = tabtow_button_header;
				this.tabtow_button_headerTow = tabtow_button_headerTow;
				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;
				this.Towis_show_bunker = true; // 关闭地区
			}, 500);
		},

		//  票仓 地区选择 关闭
		page__view_cha_bunker() {
			this.Towis_show_bunker = true;
		},
		//省份排片 地区 点击
		tabTowclick_city_one(item) {
			let title = `已选中${item}`;
			var testimgs = this.testimgs; // 所有画廊数据
			var tabtow_button_header = this.tabtow_button_header; // 场次 header
			var tabtow_button_headerTow = this.tabtow_button_headerTow; // z座位header
			tabtow_button_header[3] = '场次占城市';
			tabtow_button_headerTow[3] = '座位占城市';
			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var tabtowheader_title = this.tabtowheader_title; // 中中显示部分
				tabtowheader_title[0] = item;

				// console.log(item);
				var bdate = this.tabTowitem_data; //时间
				var isgoldentime = this.isgoldentime; //时段// 时段
				if (item == '全国') {
					item = '';
				}
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'province',
					province: item,
					isgoldentime: isgoldentime,
					bdate: bdate
				};
				this.tabTow_index(url, All_data);
				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;
				this.tabtow_button_header = tabtow_button_header;
				this.tabtow_button_headerTow = tabtow_button_headerTow;
				this.tabtow_button_header_br = 0; // 是否显示返回全国
				this.tabtowtitle = item; //城市
				this.tabtowheader_titlec = tabtowheader_title;
				this.Towis_show = true; // 关闭地区
			}, 500);
		},
		// 城市选择
		tabTowclick_city(name) {
			var title = `已选中${name}`;
			var testimgs = this.testimgs; // 所有画廊数据
			var tabtow_button_header = this.tabtow_button_header; // 场次 header
			var tabtow_button_headerTow = this.tabtow_button_headerTow; // z座位header
			tabtow_button_header[3] = '场次占影院';
			tabtow_button_headerTow[3] = '座位占影院';

			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var that = this;
				var tabtow_isShow = this.tabtow_isShow;
				var city_name = name;
				var condition_title = that.tabtowheader_title;
				var date = this.tabTowitem_data_xq; // 时间
				var isgoldentime = that.isgoldentime; //时段
				var district = that.tabTowdistrict; //几线
				var city = that.tabtowtitle; //城市

				city = name;
				let url = '';
				let All_data = {};
				// 制定 url
				if (tabtow_isShow == 0) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'province',
						bdate: date,
						city: city,
						isgoldentime: isgoldentime
					};
				} else if (tabtow_isShow == 1) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'city',
						bdate: date,
						city: city,
						isgoldentime: isgoldentime
					};
					// console.log('点击');
				} else if (tabtow_isShow == 2) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'district',
						bdate: date,
						city: city,
						isgoldentime: isgoldentime
					};
				}
				// console.log(url);
				this.tab_tow_movie = testimgs[0];
				this.tab_tow_scrollLeft = 0;
				this.tabtow_button_header = tabtow_button_header;
				this.tabtow_button_headerTow = tabtow_button_headerTow;
				this.page__view_input_oneData = '';
				this.towThree_data1_index = [];
				this.tabTow_index(url, All_data);
				condition_title[0] = city;
				this.tabtowtitle = name;
				this.Towis_show = true; //  关闭第一个省份
				this.Tow_one_is_show = true; // 关闭第二个城市
				this.tabtowheader_title = condition_title;
				this.tabtow_button_header_br = 0; //是否显示 返回全国
			}, 500);
		},

		// 省份地区搜索
		page__view_input_one() {
			clearTimeout(this.setinput_one);
			let city = this.page__view_input_oneData;
			let that = this;
			if (city == '') {
				that.towThree_data1 = '';
				that.towThree_data1_index = 0;
			}
			this.setinput_one = setTimeout(async function() {
				let userType = await that.detection_validity();
				let data_all = {
					type: 'city',
					city: city
				};
				data_all.userType = userType;
				let { data: res } = await that.$http.get({
					url: '/advancedbo/get-provincelist',
					data: data_all
				});

				// console.log(res);
				let des = res.list;
				let data1 = [];
				let data2 = [];
				if (city == '') {
					that.towThree_data1 = [];
					that.towThree_data1_index = 0;
				} else {
					for (let a in des) {
						console.log();
						des[a].forEach((item, index) => {
							data1.push(item);
						});
					}
					that.towThree_data1 = data1;
					that.towThree_data1_index = data1.length;
				}
			}, 200);
		},
		// 第一个省份跳转地址选择
		page__view_cha_one() {
			this.Towis_show = true;
			this.Tow_one_is_show = true;
			this.towThree_data1 = '';
			this.towThree_data1_index = 0;
			this.page__view_input_oneData = '';
		},
		dddd(e) {
			this.alpha = e;
		},
		// tab_tow 日历选择
		tab_tow_ei_calendar(e) {
			var isgoldentime = this.tabTowisgoldentime; //时段
			var city = this.tabtowtitle; //城市
			var date = this.tabTowitem_data_xq; // 当前时间
			var tabtow_isShow = this.tabtow_isShow; //  控制显示哪一个

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
			//  当前点击的年月日
			var month = e.month;
			var day = e.day;
			var year = e.year;
			var year_click = e.format.slice(0, 4);
			var month_click = e.format.slice(5, 7);
			var day_click = e.format.slice(8, 10);
			var item_date = year_click + '-' + month_click + '-' + day_click;
			var e_item = Number(year_click + month_click + day_click); // 当前点击的
			var one_five_item = Number(one_five_year + '' + one_five_month + one_five_day); // 15天之后的
			var item = Number(date_year + '' + date_month + date_day); // 当前的
			var Br_one = item - e_item; // 当前点击的 日期数
			var Br_tow = item - one_five_item; // 15天之后 减下来的数据

			let url = '';
			let data = '';
			if (!(Br_one < Br_tow)) {
				// 判断当前点击是哪一个 制定url 数据
				if (tabtow_isShow == 0) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'province',
						bdate: item_date,
						isgoldentime: isgoldentime
					};
				} else if (tabtow_isShow == 1) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'city',
						bdate: item_date,
						city: city,
						isgoldentime: isgoldentime
					};
				} else if (tabtow_isShow == 2) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'district',
						bdate: item_date,
						isgoldentime: isgoldentime
					};
				}
				this.tabTow_index(url, data);
				this.tab_tow_disabledDate[0] = item_date;
				this.tab_tow_date = item_date;
				this.tabTowitem_data = item_date;
				this.tab_tow_show = false;
			} else {
				uni.showToast({
					title: '最多往后选15天',
					duration: 2000,
					icon: 'none'
				});
			}
		},
		// 日历插件关闭
		ei_calendar_wai_click() {
			this.tab_tow_show = false;
		},
		tz_click_tow(code) {
			if (this.tabtowheader_index == 1 && this.tabtow_button_header_br == 0) {
				return true;
				uni.navigateTo({
					url: '../../pagesA/cinema/cinema?code=' + code
				});
			}
		},
		//  返回全国  返回票仓 返回全部城市
		tabtow_button_header_br_click(id) {
			var index = id;
			if (index == '0') {
				// console.log(1111);
				this.tabtow_button_header_br = 4;
				this.tabtow_xuan('省份排片', 0);
			} else if (index == '1') {
				console.log(2222);
				this.tabtow_button_header_br = 4; //是否显示 返回全国
				this.tabtow_xuan('城市排片', 1);
			} else {
				// console.log(333);
				this.tabtow_button_header_br = 4;
				this.tabtow_xuan('票仓排片', 2);
			}
		},
		//  点击跳转当前 饮片详情
		tabtow_name_navigeto(index) {
			var mid = '';
			var id = '';
			if (index == 1) {
				var data = this.testimgs[this.Msg];
				id = data.zz_id;
				mid = data.mid;
			} else if (index == 2) {
				var data = this.threetestimgs[this.threeMsg];
				id = data.zz_id;
				mid = data.mid;
			}
			uni.navigateTo({
				url: '../dy_particulars/dy_particulars?id=' + id + '&mid=' + mid
			});
		},
		// tabtow 上选择
		Towistap(index, name) {
			var ii = index;
			// console.log(name);
			if (ii == 0) {
				if (name == '省份') {
					this.Towis_show = false;
				} else if (name == '票仓') {
					this.Towis_show_bunker = false;
				} else {
					this.Tow_one_is_show = false;
				}
			} else if (ii == 1) {
				// console.log(1);
				//  时段 黄金时段选择
				let tabTowis_sd = this.tabTowis_sd;
				if (tabTowis_sd) {
					tabTowis_sd = false;
					this.tabTowis_lx = true;
				} else {
					tabTowis_sd = true;
				}
				this.tabTowis_sd = tabTowis_sd;
			} else if (ii == 2) {
				var tabTowis_lx = this.tabTowis_lx;
				if (tabTowis_lx) {
					tabTowis_lx = false;
					this.tabTowis_sd = true;
				} else {
					tabTowis_lx = true;
				}
				this.tabTowis_lx = tabTowis_lx;
			}
		},
		// 开启 日历
		tab_tow_click() {
			this.tab_tow_show = true;
		},
		// 点击前一天
		TowLeft_date() {
			let tabtow_isShow = this.tabtow_isShow;
			let that = this;
			var city_name = this.tabtowtitle;
			var testimgs = this.testimgs; // 所有画廊数据

			var isgoldentime = that.isgoldentime; //时段
			var district = that.tabTowdistrict; //几线
			var city = that.tabtowtitle; //城市
			var date = this.tabTowitem_data;
			var date = moment(date)
				.subtract(1, 'days')
				.format('YYYY-MM-DD');
			if (city_name.indexOf('线城市') != -1 || city_name == '全国') {
				district = city_name;
				city = '';
			} else {
				district = '';
				city = city_name;
			}
			let url = '';
			let All_data = {};
			// 制定 url
			if (tabtow_isShow == 0) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'province',
					bdate: date,
					province: city,
					isgoldentime: isgoldentime
				};
			} else if (tabtow_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'city',
					district: district,
					bdate: date,
					city: city,
					isgoldentime: isgoldentime
				};
			} else if (tabtow_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'district',
					district: district,
					bdate: date,
					city: city,
					isgoldentime: isgoldentime
				};
			}
			// this.tabTowitem_data_xq = date;
			// console.log(date);
			this.tab_tow_movie = testimgs[0];
			this.tab_tow_scrollLeft = 0;
			this.tabTowitem_data = date;
			this.tab_tow_date = date;
			this.tabTow_index(url, All_data);
		},
		// 地域排场选择 项
		tabtow_xuan(dd, index) {
			var tabtowheader_title = this.tabtowheader_title;
			var bdate = this.tabTowitem_data; //时间
			var isgoldentime = this.isgoldentime; //时段// 时段
			var testimgs = this.testimgs; // 所有画廊数据
			var tabTowcinema_num = this.tabTowcinema_num; // 0 是场次
			var data = this.tabtow_button_header;
			var data1 = this.tabtow_button_headerTow;
			if (bdate == '2019-07-08') {
				bdate = moment()
					.subtract(0, 'days')
					.format('YYYY-MM-DD');
			}
			let url = '';
			let All_data = {};
			if (index == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'city',
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				data[3] = '场次占城市';
				data1[3] = '座位占城市';
			} else if (index == 0) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'province',
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				data[3] = '场次占省份';
				data1[3] = '座位占省份';
			} else if (index == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'district',
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				data[3] = '场次占票仓';
				data1[3] = '座位占票仓';
			}
			//  设置当前时间  用来做判断
			var date = this.tab_tow_date; // 当前时间
			date = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			var bd_data = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			// console.log(one_five_year);
			this.tabTowitem_data_xq = bd_data;
			this.tab_tow_date = date;
			this.tab_tow_movie = testimgs[0];
			this.tab_tow_scrollLeft = 0;
			// 请求数据
			this.tabTow_index(url, All_data);
			tabtowheader_title[0] = '全国';
			this.tabtowheader_title = tabtowheader_title;
			var name = dd;
			var a = name.slice(0, 2);
			dd = dd.slice(0, 2);

			// 截取 名字修改显示的数据
			data[0] = dd;
			data1[0] = dd;
			this.tabtow_button_header_br = 4; // 控制是否显示 返回全国 等字样
			this.tabtow_button_headerTow = data1;
			this.tabtow_button_header = data;
			this.tabtowheader = true;
			this.tabtowheader_index = index; // 控制头部选择的哪一个加样式
			this.tabtow_isShow = index; // 地域里边显示那个一个
		}
	}
};
</script>

<style lang="less"></style>
