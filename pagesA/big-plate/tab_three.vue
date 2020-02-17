<template>
	<view>
		<!-- 机构排场  -->

		<view class="tabthree" :hidden="!(tabindex == 2)">
			<!-- :hidden="tabthreeheader" -->
			<view class="tabthreeHeader">
				<view class="tabthreeHeader_one">
					<view :class="[tabthree_isShow == index ? 'active' : '']" @tap="tabthree_xuan(item, index)" v-for="(item, index) in tabthreeHeader_i" :key="index">
						{{ item }}
					</view>
				</view>
				<!-- <scroll-view scroll-y class="tabthreeHeader_all"></scroll-view> -->
			</view>
			<!-- 顶部 前后天数 -->
			<view class="tab_data">
				<view @tap="ThreeLeft_date">
					<image src="../../static/big-plate/previous.png" mode=""></image>
					前一天
				</view>
				<view @tap="tab_three_click">
					{{ tabThreeitem_data | item_filter }}
					<image src="../../static/big-plate/xia.png" mode=""></image>
				</view>
				<view @tap="ThreeRight_date">
					后一天
					<image src="../../static/big-plate/next.png" mode=""></image>
				</view>
			</view>
			<!-- 顶部 前后天数 -->
			<!--  总场次  -->
			<view class="tabthree_number">
				<view class="total_number">总场次{{ tabthree_listdata }}场</view>
				<view class="tabthree_item">
					<!-- 大盘排片的数据 -->
					{{ tabThreeitem_data | item_filter }} {{ tabThreeitem_data | item_data_filter }}
					<!-- 大盘排片的数据 -->
				</view>
			</view>
			<!--  总场次  -->
			<!-- 选择时段 等 -->
			<view class="tabthree_data">
				<view class="region">
					<!-- v-if="tabtow_isShow == 0" -->
					<view @tap="Threeistap(index, '影院')" v-if="tabthree_isShow == 0" v-for="(item, index) in tabthreeheader_title" :key="index">
						{{ item }}
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="Threeistap(index, '院线')" v-if="tabthree_isShow == 1" v-for="(item, index) in tabthreeheader_title" :key="index">
						{{ item }}
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
					<view @tap="Threeistap(index, '影投')" v-if="tabthree_isShow == 2" v-for="(item, index) in tabthreeheader_title" :key="index">
						{{ item }}
						<!-- <image src="../../static/big-plate/select.png" /> -->
						<image src="../../static/big-plate/xia.png" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 日历插件	 -->
			<view class="ei_calendar_wai" :hidden="!tab_three_show">
				<view @tap="ei_calendar_wai_click()" class="ei_calendar_wai_cha">×</view>
				<ei-calendar
					type="single"
					:drawer="false"
					:visible.sync="tab_three_show"
					:disabledDate="tab_three_disabledDate"
					v-model="tab_three_date"
					:custom-date="tab_three_customDate"
					format="YYYY-MM-DD"
					@click="tab_three_ei_calendar"
				></ei-calendar>
				<scroll-view class="ei_calendar_view" scroll-y></scroll-view>
			</view>

			<!-- 日历插件 -->

			<!-- 城市地区选择 -->
			<view class="city_sel_jg_one" :style="{ top: 0 + 'px' }" :hidden="Three_one_is_show">
				<view class="page__view_cha" @tap="page_three_cha_one">×</view>
				<view class="city_sel_jg_one_header" v-if="tabthree_isShow != 1 && tabthree_isShow != 2">
					<view
						@tap="tabthree_isShow_one_click(index)"
						:class="[tabthree_isShow_one == index ? 'active' : '']"
						class=""
						v-for="(item, index) in city_sel_jg_data"
						:key="index"
					>
						{{ item }}
					</view>
				</view>

				<view class="page__bd_one" :hidden="!(tabthree_isShow_one == 0)">
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
								<input type="text" value="" @input="page__view_input_three_city" v-model="page__view_input_threeData_city" placeholder="搜索城市" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="towThree_data1_city_index == 0">
								<view class="" @tap="tabThrewclick_city(item, 0)" v-for="(item, index) in towThree_data1_city" :key="index">{{ item }}</view>
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(towThree_data1_city_index == 0)">区域</view>
							<view
								:class="[tabthreeheader_title[0] == '全国' ? 'active' : '', 'page__view_city']"
								:hidden="!(towThree_data1_city_index == 0)"
								@tap="tabThreeclick_grid('全国', 0)"
							>
								全国
							</view>
							<!-- active_one -->
							<!-- 热门城市 -->
							<view class="title" :hidden="!(towThree_data1_city_index == 0)">热门城市</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in tow_rm_city_one" :key="index">
										<view
											class="weui-grid"
											:hidden="!(towThree_data1_city_index == 0)"
											@tap="tabThreeclick_grid(it, 0)"
											:data-name="it"
											hover-class="weui-grid_active"
										>
											<view :class="['weui-grid__label', tabthreeheader_title[0] == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(towThree_data1_city_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in zm_list_city" :id="it.letter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tabThreeclick_grid(vv, 0)" class="section-item-cells_one">
											<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tabthreeheader_title[0] == vv ? 'activeaaaa' : '']">
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

				<view class="page__bd_one" :hidden="!(tabthree_isShow_one == 1)">
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
								<input type="text" value="" @input="page__view_input_three_yx" v-model="page__view_input_threeData_yx" placeholder="搜索院线" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="towThree_data1_yx_index == 0">
								<view class="" @tap="tabThrewclick_city(item, 1)" v-for="(item, index) in towThree_data1_yx" :key="index">{{ item }}</view>
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(towThree_data1_yx_index == 0)">区域</view>
							<view
								:class="[tabthreeheader_title[0] == '全国' ? 'active' : '', 'page__view_city']"
								:hidden="!(towThree_data1_yx_index == 0)"
								@tap="tabThreeclick_grid_Rx('全国')"
							>
								全国
							</view>

							<!-- 热门城市 -->
							<view class="title" :hidden="!(towThree_data1_yx_index == 0)">热门院线</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in tabthree_mapdata_yx_Redata" :key="index">
										<view
											class="weui-grid"
											:hidden="!(towThree_data1_yx_index == 0)"
											@tap="tabThreeclick_grid_Rx(it)"
											:data-name="it"
											hover-class="weui-grid_active"
										>
											<!-- class="weui-grid__label" -->
											<view :class="['weui-grid__label', tabthreeheader_title[0] == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(towThree_data1_yx_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in tabthree_mapdata_yx_Sumdata" :id="it.letter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tabThreeclick_grid_Rx(vv)" class="section-item-cells_one">
											<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tabthreeheader_title[0] == vv ? 'activeaaaa' : '']">
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

				<view class="page__bd_one" :hidden="!(tabthree_isShow_one == 2)">
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
								<input type="text" value="" @input="page__view_input_three_yt" v-model="page__view_input_threeData_yt" placeholder="搜索影投" />
								<image src="../../static/home/amplification.png" mode=""></image>
							</view>

							<view class="page_view_one_soso" :hidden="towThree_data1_yt_index == 0">
								<view class="" @tap="tabThrewclick_city(item, 2)" v-for="(item, index) in towThree_data1_yt" :key="index">{{ item }}</view>
							</view>
							<!-- 区域 -->
							<view class="title" :hidden="!(towThree_data1_yt_index == 0)">区域</view>
							<view
								:class="[tabthreeheader_title[0] == '全国' ? 'active' : '', 'page__view_city']"
								:hidden="!(towThree_data1_yt_index == 0)"
								@tap="tabThreeclick_grid_Yt('全国', 0)"
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
							<view class="title" :hidden="!(towThree_data1_yt_index == 0)">热门影投</view>
							<view class="page__bd_r">
								<view class="weui-grids">
									<block v-for="(it, index) in tabthree_mapdata_yt_Redata" :key="index">
										<view
											class="weui-grid"
											:hidden="!(towThree_data1_yt_index == 0)"
											@tap="tabThreeclick_grid_Yt(it, 0)"
											:data-name="it"
											hover-class="weui-grid_active"
										>
											<view :class="['weui-grid__label', tabthreeheader_title[0] == it ? 'active' : '']">{{ it }}</view>
										</view>
									</block>
								</view>
							</view>

							<!-- 城市选择 -->
							<view class="alphabet_data" :hidden="!(towThree_data1_yt_index == 0)">
								<view class="alphabet-list">
									<!-- :id="it.alphabet" -->
									<view v-for="(it, index) in tabthree_mapdata_yt_Sumdata" :id="it.letter" :key="index" class="section-item">
										<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
										<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
										<view v-for="(vv, ii) in it.childer" :key="ii" @tap="tabThreeclick_grid_Yt(vv, 0)" class="section-item-cells_one">
											<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '', tabthreeheader_title[0] == vv ? 'activeaaaa' : '']">
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

			<view class="swiper-container">
				<!--   -->
				<view class="post-bg" v-if="tab_three_movie.url != undefined" :style="{ backgroundImage: 'url' + '(' + tab_three_movie.url + ')' }"></view>
				<view class="post-bg-mask"></view>
				<!-- scroll-with-animation      -->
				<scroll-view class="swiper-wrapper scroll-view_H" :scroll-left="tab_three_scrollLeft" scroll-x>
					<view :id="'item' + index" class="movie-item" v-for="(item, index) in threetestimgs" :key="index" @tap="threeOnclickimg(index, item)">
						<!-- :class='['post',movie.id===item.id?"":""]' -->
						<view :class="['post', index == tab_three_movie.id ? 'select' : '']">
							<image v-if="!(item.url == 'https://db.topcdb.com')" :src="item.url"></image>
							<image v-if="item.url == 'https://db.topcdb.com'" src="../../static/big-plate/available_poster.png"></image>
						</view>
					</view>
				</scroll-view>
			</view>

			<!-- 影片画廊 -->
			<!-- 当前饮片的名字 和 评分  -->
			<view class="tabthree_name">
				<view class="tabthree_name_name">
					<view>{{ tabThree_name }}</view>
					<view class="tabtow_name_name_tow">
						<text class="">{{ tabthreeheader_title[0] }}总排场: {{ tabthree_session_s_data_compu }}</text>
						{{ kg }}
						<text v-if="tabThreecinema_num_data == 0">全国占比:{{ tabthree_sumData_ss_com.session_ss }}%</text>
						<text v-if="tabThreecinema_num_data == 1">;全国占比:{{ tabthree_sumData_ss_com.seats_ss }}%</text>
					</view>
				</view>
				<view class="tabthree_name_jiao"></view>
				<view class="tabthree_name_but" @tap="tabtow_name_navigeto()"><image src="../../static/big-plate/next.png" mode=""></image></view>

				<!-- <view>{{ movie_name }}</view> -->
			</view>
			<!-- 当前饮片的名字 和 评分 -->
			<!-- 数据展示 -->
			<view class="tabthree_button">
				<!-- 场次座位 -->
				<view class="tabthree_button_header" v-if="tabThreecinema_num_data == 0">
					<view class="" :hidden="!(tabthree_button_header_br == 0)">
						<text @tap="tabthree_button_header_br_click('0')" :hidden="!(tabthree_isShow == 0)">
							返回全国
							<!-- 返回全部城市 -->
						</text>
						<text @tap="tabthree_button_header_br_click('1')" :hidden="!(tabthree_isShow == 1)">
							返回全国
							<!-- 返回全部院线 -->
						</text>
						<text @tap="tabthree_button_header_br_click('2')" :hidden="!(tabthree_isShow == 2)">
							返回全国
							<!-- 返回全部影投 -->
						</text>
					</view>

					<view :hidden="tabthree_button_header_br == index" v-for="(item, index) in tabthree_button_headerTow" :key="index">{{ item }}</view>
				</view>
				<view class="tabthree_button_header" v-if="tabThreecinema_num_data == 1">
					<view class="" :hidden="!(tabthree_button_header_br == 0)">
						<text @tap="tabthree_button_header_br_click('0')" :hidden="!(tabthree_isShow == 0)">
							返回全国
							<!-- 返回全部城市 -->
						</text>
						<text @tap="tabthree_button_header_br_click('1')" :hidden="!(tabthree_isShow == 1)">
							返回全国
							<!-- 返回全部院线 -->
						</text>
						<text @tap="tabthree_button_header_br_click('2')" :hidden="!(tabthree_isShow == 2)">
							返回全国
							<!-- 返回全部影投 -->
						</text>
					</view>
					<view :hidden="tabthree_button_header_br == index" v-for="(item, index) in tabthree_button_headerTow_tow" :key="index">{{ item }}</view>
				</view>
				<!-- 场次座位 -->
				<view class="tabthree_button_data" :hidden="!(tabThreecinema_num_data == 0)">
					<view class="tabtow_button_data_iew">
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthreeheader_title[0] }}</view>
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthree_sumData_ss_com.session_s }}</view>
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthree_sumData_ss_com.session_ss }}%</view>
						<view :style="{ color: '#F08E2D' }" class=""><view class="tabthree_button_data_">---</view></view>
						<!-- ,textDecoration:'line-through' -->
					</view>
					<view class="tabtow_button_data_iew" v-for="(item, index) in tabthree_data_city" :key="index">
						<!-- <view v-if="tabthree_isShow == 0">{{ item.cinema_name }}</view> -->
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 0 && tabthreeheader_title[0] == '全国'">{{ item.cinema_name }}</view>
						<view v-if="tabthree_isShow == 0 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 1 && tabthreeheader_title[0] == '全国'">{{ item.cinema_chain }}</view>
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 2 && tabthreeheader_title[0] == '全国'">{{ item.brd }}</view>
						<!-- <view v-if="tabthree_isShow == 1">{{ item.cinema_chain }}</view> -->
						<view v-if="tabthree_isShow == 1 && tabthreeheader_title[0] == '全国'">{{ item.cinema_chain }}</view>
						<view v-if="tabthree_isShow == 1 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>
						<view v-if="tabthree_isShow == 2 && tabthreeheader_title[0] == '全国'">{{ item.brd }}</view>
						<view v-if="tabthree_isShow == 2 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>

						<view>{{ item.session_s }}</view>
						<view>{{ item.session_ss }} %</view>
						<view>{{ item.session_ss_zb }} %</view>
					</view>
				</view>
				<view class="tabthree_button_data" :hidden="!(tabThreecinema_num_data == 1)">
					<!-- -->
					<view class="tabtow_button_data_iew">
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthreeheader_title[0] }}</view>
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthree_sumData_ss_com.seats_s }}</view>
						<view :style="{ color: '#F08E2D' }" class="">{{ tabthree_sumData_ss_com.seats_ss }}%</view>
						<view :style="{ color: '#F08E2D' }" class=""><view class="tabthree_button_data_">---</view></view>
						<!-- ,textDecoration:'line-through' -->
					</view>
					<view class="tabtow_button_data_iew" v-for="(item, index) in tabthree_data_city" :key="index">
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 0 && tabthreeheader_title[0] == '全国'">{{ item.cinema_name }}</view>
						<view v-if="tabthree_isShow == 0 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 1 && tabthreeheader_title[0] == '全国'">{{ item.cinema_chain }}</view>
						<view v-if="tabthree_isShow == 0 && tabthree_isShow_one == 2 && tabthreeheader_title[0] == '全国'">{{ item.brd }}</view>

						<view v-if="tabthree_isShow == 1 && tabthreeheader_title[0] == '全国'">{{ item.cinema_chain }}</view>
						<view v-if="tabthree_isShow == 1 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>
						<!-- <view v-if="tabthree_isShow == 2">{{ item.brd }}</view> -->
						<view v-if="tabthree_isShow == 2 && tabthreeheader_title[0] == '全国'">{{ item.brd }}</view>
						<view v-if="tabthree_isShow == 2 && tabthreeheader_title[0] != '全国'">{{ item.cinema_name }}</view>
						<view>{{ item.seats_s }}</view>
						<view>{{ item.seats_ss }} %</view>
						<view>{{ item.seats_ss_zb }} %</view>
					</view>
				</view>
			</view>
			<!-- 数据展示 -->
			<!-- 场次选择 -->
			<view class="center_sessionss" :hidden="tabThreeis_lx">
				<view @tap="tabThreeclick_lx('场次')" :class="['center_frame_quan', tabThreecinema_num_data == 0 ? 'active' : '']">
					场次
					<view v-if="tabThreecinema_num_data == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
				<view @tap="tabThreeclick_lx('座位')" :class="['center_frame_hj', tabThreecinema_num_data == 1 ? 'active' : '']">
					座位
					<view v-if="tabThreecinema_num_data == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
			</view>
			<!-- 场次选择 -->
			<!-- 时段选择 -->
			<view class="tabThreecenter_frame" :hidden="tabThreeis_sd">
				<view @tap="tabthreeclick_sd('全时段')" :class="['center_frame_quan', tabThreecinema_num_data == 0 ? 'active' : '']">
					全时段（6:00-次日6:00）
					<view v-if="tabThreecinema_num_data == 0"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
				<view @tap="tabthreeclick_sd('黄金场')" :class="['center_frame_hj', tabThreecinema_num_data == 1 ? 'active' : '']">
					黄金时段（18:00-21:00）
					<view v-if="tabThreecinema_num_data == 1"><image src="../../static/big-plate/checked.png" mode=""></image></view>
				</view>
			</view>
			<!-- 时段选择 -->
		</view>
		<!-- 机构排场 -->
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
	props:{
		pages:{
			type:Number
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
	data() {
		return {
			pages_Br:true,
			size: undefined,
			kg: '   ', //空格
			tabThree_allData: {
				sum: {
					千与千寻: {
						session_s: 1
					}
				},
				dapan_sum: {
					session_s: '--',
					seats_s: '--'
				}
			}, // 所有数据
			tabthree_sumData_ss: {
				千与千寻: {}
			}, /// 影片的场次和座位占比
			setinput_three_city: '', //城市搜索定时器
			setinput_three_yx: '', // 院线定时器
			towThree_data1_yx: [], // 搜索出来的所有城市

			setinput_three_yt: '', // 影投定时器
			towThree_data1_yt: [], // 搜索出来的所有影投
			tabThreesumData: ['---'],
			tabThreesumindex: ['千与千寻'],
			tabThreesumSeats_s: [],
			tabthreename: '千与千寻', // 当前影片的名字
			threeTowsum: '11111', // 场次选择
			// 画廊
			threeMsg: 0,
			tabThreeisgoldentime: 0, // 时段
			tabThreedistrict: '', //几线
			tabthreetitle: '全国', // 当前城市
			tabThreeis_sd: true, // 时段锁
			tabThreeis_lx: true, // 场次选择
			threetestimgs: [
				{
					zz_name: '千与千寻',
					maoyan_score: 0,
					dec: 1
				}
			],
			tab_three_size: 0,
			tab_three_scrollLeft: 0,
			tab_three_movie: {
				url: 'https://db.topcdb.com/uploads/movie_thumb/3/3_300X500_7123_bd7b1818.jpg'
			},
			towThree_data1_yx_index: 0, // 搜索出来的长度
			page__view_input_threeData_yx: '', //院线搜索 储存文字
			page__view_input_threeData_yt: '', //影投搜索 储存文字
			tabthree_button_header_br: 4, // 控制是否返回全国
			tabthree_mapdata_yt_Sumdata: [], // 影投全部数据
			tabthree_mapdata_yt_Redata: [], // 影投热门城市
			tabthree_mapdata_yx_Redata: [], // 院线的热门城市
			tabthree_mapdata_yx_Sumdata: [], // 院线插件数据
			tabThreecinema_num_data: 0, // 控制时段

			// tabThreecinema_num: 0, // 控制场次选择则样式
			tabthree_data_city: [], // 储存列表使用的数据

			tabthreeheader: true, // 第三部分头部
			towThree_data1_yt_index: 0, // 搜索出来影投的长度

			tabthree_button_headerTow: ['影院', '场次', '场次占比', '场次占影院'],
			tabthree_button_headerTow_tow: ['影院', '座位', '座位占比', '座位占影院'],
			city_sel_jg_data: ['城市', '院线', '影投'], // 地区插件显示头部
			tow_rm_city_one: [],
			zm_list_city: [], // tabtow 城市的所有 字母和数据
			towThree_data1_city: [], // 搜索出来的所有城市
			towThree_data1_city_index: 0, // 搜索出来的长度
			page__view_input_threeData_city: '', // 城市搜索 储存文字
			alpha: '',
			zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
			inputVal: '', // 城市如果有字拒接显示
			tabthree_isShow_one: 0, // 控制地区选择影院排片
			Three_one_is_show: true, // d地区控制
			// tab_hree 日历
			tab_three_show: false,
			tab_three_date: '',
			tab_three_customDate: [
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
			tab_three_disabledDate: ['2019-7-19'], // 当前日期
			tabthree_isShow: 0, // k控制显示 数据
			tabThreeitem_data: '2019-07-11', // 时间
			tabThreeitem_data_xq: '2019-07-11',
			tabthreeHeader_i: ['影院排片', '院线排片', '影投排片'],
			tabthreeheader_title: ['全国', '全时段', '场次']
		};
	},
	computed: {
		// 格式化总场次
		tabthree_session_s_data_compu() {
			var session_s = this.movie_city_data_three;
			if (session_s.length >= 7) {
				session_s = session_s.slice(0, 3) + ',' + session_s.slice(3, 6) + ',' + session_s.slice(6, 9);
			} else if (session_s.length >= 4) {
				if (session_s.length == 4) {
					session_s = session_s.slice(0, 1) + ',' + session_s.slice(1);
				} else if (session_s.length == 5) {
					session_s = session_s.slice(0, 2) + ',' + session_s.slice(2);
				} else if (session_s.length == 6) {
					session_s = session_s.slice(0, 3) + ',' + session_s.slice(3);
				}
			}
			if (session_s == 'und,efi,ned') {
				return '349,980';
			} else {
				return session_s;
			}
		},
		//  获取当前影片的总场数
		tabthree_listdata() {
			var a = this.tabThreesumindex;
			var b = this.tabthreename;
			var index = a.indexOf(b);
			return this.tabThreesumData[index];
		},
		// 当前影片的名字
		tabThree_name() {
			// console.log(this.threetestimgs);
			var tabthreename = this.threetestimgs[this.threeMsg].zz_name;
			this.tabthreename = tabthreename;
			return tabthreename;
		},
		// 当前饮片的猫眼数据
		tabthree_mayan() {
			return Number(this.threetestimgs[this.threeMsg].maoyan_score).toFixed(1);
		},

		// 当前数据的总场次和总座位
		tabthree_sumData_ss_com() {
			// console.log('tabthree_sumData_ss_com');
			let b = this.tabthreename;
			// console.log(this.tabthree_sumData_ss);
			console.log(this.tabthree_sumData_ss,b);
			if (this.tabthree_sumData_ss[b].session_ss == undefined) {
				return {
					seats_s: '200004',
					seats_ss: '51.00',
					session_s: '1000023',
					session_ss: '40.00'
				};
			} else {
				return this.tabthree_sumData_ss[b];
			}
		},
		movie_city_data_three() {
			var a = this.tabThreesumindex;
			var b = this.tabthreename;
			var index = a.indexOf(b);
			// console.log(this.tabThreesumindex);
			// console.log(this.tabthreename);
			// console.log(this.tabThreesumSeats_s[index]);
			return this.tabThreesumSeats_s[index] + '';
		},
		...mapState({ tabindex: 'bigPlate_tabIndex',big_plateThreePagesIndex:'big_plateThreePagesIndex' })
	},
	watch: {
		tabindex() {
			let index = this.tabthree_isShow;
			console.log(index,'index')
			if (this.tabindex != 2) return false;
			this.tabthree_xuan('影院排片', 0);
			_self = this;
			this.tabthree_mapdata_yx();
			// // // 影投影片组合插件  影投线数据
			this.tabthree_mapdata_yt();
			this.tabtow_city(); /* 城市*/
		},
		big_plateThreePagesIndex(){
			let page = this.big_plateThreePagesIndex
			let url = '/topprogram/get-rowpiece';
			var isgoldentime = this.tabThreeisgoldentime; //时段
			var date = this.tabThreeitem_data; // 当前时间
			let All_data = {
				type: 'cinema_name',
				isgoldentime: isgoldentime,
				bdate: date,
				page
			};
			this.pages_Br = true;
			this.tabthree_index(url, All_data);
		}
	},
	methods: {
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
			this.tow_rm_city_one = tow_rm_city_one;
			this.zm_list_city = zm_list_city;
		},
		tabThreeclick_lx(na) {
			var name = na;
			// console.log(name);
			var tabthreeheader_title = this.tabthreeheader_title;

			if (na == '座位') {
				this.tabThreecinema_num_data = 1;
				this.tabThreeis_lx = true;
				tabthreeheader_title[2] = '座位';
			} else {
				this.tabThreecinema_num_data = 0;
				this.tabThreeis_lx = true;
				tabthreeheader_title[2] = '场次';
			}
			this.tabthreeheader_title = tabthreeheader_title;
		},
		tab_three_click() {
			this.tab_three_show = true;
		},
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
		// 影头影片组合插件  之影投数据
		async tabthree_mapdata_yt() {
			var url = '/advancedbo/get-provincelist';
			let All_data = {
				type: 'brd'
			};
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let { data } = await this.$http.get({
				url,
				data: All_data
			});
			let tabthree_mapdata_yt_Redata = data.hotList; //热门城市
			let tabthree_mapdata_yt_Sumdata = []; //全部城市
			for (let a in data.list) {
				tabthree_mapdata_yt_Sumdata.push({
					letter: a,
					childer: data.list[a]
				});
			}
			this.tabthree_mapdata_yt_Sumdata = tabthree_mapdata_yt_Sumdata;
			this.tabthree_mapdata_yt_Redata = tabthree_mapdata_yt_Redata;
		},
		// 影院影片组合插件  之院线数据
		async tabthree_mapdata_yx() {
			var url = '/advancedbo/get-provincelist';
			let All_data = {
				type: 'chain'
			};
			let userType = await this.detection_validity();
			All_data.userType = userType;
			let { data } = await this.$http.get({
				url,
				data: All_data
			});
			let tabthree_mapdata_yx_Redata = data.hotList; //热门城市
			let tabthree_mapdata_yx_Sumdata = []; //全部城市
			for (let a in data.list) {
				tabthree_mapdata_yx_Sumdata.push({
					letter: a,
					childer: data.list[a]
				});
			}
			this.tabthree_mapdata_yx_Sumdata = tabthree_mapdata_yx_Sumdata;
			this.tabthree_mapdata_yx_Redata = tabthree_mapdata_yx_Redata;
		},
		tabthree_isShow_one_click(index) {
			this.tabthree_isShow_one = index;
		},
		// 地区× 关闭
		page_three_cha_one() {
			this.Three_one_is_show = true;
			// 城市
			this.page__view_input_threeData_city = ''; // 城市的输入框中内容
			this.towThree_data1_city_index = 0;
			this.towThree_data1_city = [];
			// 城市
			// rx
			this.page__view_input_threeData_yx = '';
			this.towThree_data1_yx_index = 0;
			this.towThree_data1_yx = [];
			// rx
			// yt
			this.page__view_input_threeData_yt = '';
			this.towThree_data1_yt_index = 0;
			this.towThree_data1_yt = [];
			// yt
		},
		// tabthree 接口调用
		async tabthree_index(url, data_all) {
			let userType = await this.detection_validity();
			data_all.userType = userType;
			let { data: res } = await this.$http.get({
				url,
				data: data_all
			});
			var sumData = []; // 只存总场次
			var sumindex = []; // 名字
			var sumSeats_s = []; // 存总排场

			for (let a in res.sum) {
				sumindex.push(a);
				sumData.push(res.sum[a].session_s);
				sumSeats_s.push(res.sum[a].session_s);
			}
			this.tabThreesumindex = sumindex;
			this.tabThreesumSeats_s = sumSeats_s;
			this.tabThreesumData = sumData;
			this.tabThree_allData = res;
			//  当前日期
			this.tabThreeitem_data = res.parameter.bdate;
			this.threeSetimgs();
		},
		// 机构排场
		// 画廊下默认展示的城市省份等等数据默认第一个
		threeSetDataName(id = 0) {
			//  下边是城市默认 显示的 数据
			let xsData = this.tabThree_allData.data[this.threetestimgs[id].zz_name]; // 默认显示第一个
			let xsSum = this.tabThree_allData.sum[this.threetestimgs[id].zz_name]; // 默认显示第一个
			let { dapan_sum, movie_sum } = this.tabThree_allData; // 数据综合 场次 座位
			let tabthree_isShow = this.tabthree_isShow;
			let tabthreeheader_title = this.tabthreeheader_title; // 当前选择地区
			let Br = this.tabthree_button_header_br; // 是否选中了全国
			let xsDataSum = [];
			var num = 0;
			var data = '';
			if (tabthree_isShow == 0) {
				data = 'cinema_name';
			} else if (tabthree_isShow == 1) {
				data = 'cinema_chain';
				if (tabthreeheader_title[0].indexOf('全国') == -1) {
					data = 'cinema_name';
				}
			} else {
				data = 'brd';
				if (Br == 0 && tabthreeheader_title[0].indexOf('全国') == -1) {
					data = 'cinema_name';
				}
			}

			for (let a in xsData) {
				// 场次占比
				xsData[a].session_ss = ((xsData[a].session_s / xsSum.session_s) * 100).toFixed(2);
				// 座位占比
				xsData[a].seats_ss = ((xsData[a].seats_s / xsSum.seats_s) * 100).toFixed(2);
				if (movie_sum[a][data] == xsData[a][data]) {
					xsData[a].seats_ss_zb = ((Number(xsData[a].seats_s) / Number(movie_sum[a].seats_s)) * 100).toFixed(2);
					xsData[a].session_ss_zb = ((Number(xsData[a].session_s) / Number(movie_sum[a].session_s)) * 100).toFixed(2);
				}
				xsDataSum.push(xsData[a]);
			}

			let sumData_ss = {};
			let tabThree_allData = this.tabThree_allData.sum;
			for (let b in tabThree_allData) {
				let seats_s_s = ((tabThree_allData[b].seats_s / dapan_sum.seats_s) * 100).toFixed(2); // 总座位占比
				let session_s_s = ((tabThree_allData[b].session_s / dapan_sum.session_s) * 100).toFixed(2); //  总场次占比
				sumData_ss[tabThree_allData[b].movie_name] = {
					seats_ss: seats_s_s,
					session_ss: session_s_s,
					seats_s: tabThree_allData[b].seats_s,
					session_s: tabThree_allData[b].session_s
				};
			}
			this.tabthree_sumData_ss = sumData_ss;
			let pages_Br = this.pages_Br;
			if(pages_Br && this.tabthree_isShow == 0){
				var tabthree_data_city = this.tabthree_data_city;
				 this.tabthree_data_city = [...xsDataSum,...tabthree_data_city]
			}else {
				this.tabthree_data_city  = xsDataSum;
			}
			
		},
		// 画廊插件
		threeOnclickimg(imgviewobj, data) {
			var size = this.size;
			uni.showToast({
				title: '正在跳转',
				duration: 2000,
				icon: 'none'
			});
			const tab_three_movie = data;
			const index = imgviewobj; //下标
			tab_three_movie.id = imgviewobj;
			// console.log(this.size,'size',this.size != undefined)
			if (size != undefined && size != 0) {
				this.tab_three_movie = tab_three_movie;
				// this.scrollLeft = this.tab_three_size * index;
				this.tab_three_scrollLeft = size * index;
			} else {
				// if (this.tab_tow_size == 0) {
				this.calcSize().then(size => {
					this.size = size;
					this.tab_three_movie = tab_three_movie;
					this.tab_three_size = size;
					this.tab_three_scrollLeft = size * index;
				});
			}

			this.threeMsg = imgviewobj;
			if (this.tabthree_isShow == 0) {
				/* 触底设置 */
				this.pages_Br = false;
				this.$store.commit('big_plateThreepages',0)
				/* 触底设置 */
			}
			this.threeSetDataName(imgviewobj);
		},
		threeSetimgs() {
			// console.log(this.tabThree_allData);
			var data = this.tabThree_allData.movie_data;
			var imgs = [];
			let index = 0; // 角标
			for (let i in data) {
				index++;
				let imgobj = {
					dec: '', //图像描述信息
					badeg: '', //角标文字
					badegcolor: '#000000', //角标颜色
					url: '', //图源
					dominant: '', //主色
					zz_name: '', ///名字
					maoyan_score: '', // 猫眼数据
					id: 0,
					zz_id: '',
					mid: ''
				};
				for (let a in data[i].movie_img) {
					imgobj.url = 'https://db.topcdb.com' + data[i].movie_img[a];
				}
				imgobj.zz_id = data[i].zz_id;
				imgobj.mid = data[i].mid;
				imgobj.dominant = this.threeRetcolor(); //随机主色
				imgobj.dec = index; //描述
				imgobj.id = index - 1; //描述
				imgobj.badeg = index; //角标文字
				imgobj.badegcolor = i % 2 == 0 ? 'red' : 'LimeGreen'; //角标颜色
				imgobj.maoyan_score = data[i].maoyan_score;
				imgobj.zz_name = data[i].zz_name;
				imgs.push(imgobj);
			}
			if (this.tab_three_movie.id == undefined) {
				this.tab_three_movie = imgs[0];
			}
			this.threetestimgs = imgs;
			this.threeSetDataName();
		},
		threeRetcolor() {
			let color = '#' + ('00000' + ((Math.random() * 0x1000000) << 0).toString(16)).substr(-6);
			return color;
		},
		// 时段
		tabthreeclick_sd(na) {
			let name = na;
			var that = this;
			var tabthreeheader_title = that.tabthreeheader_title; // 显示的数组
			var sd = '';
			var txt = name;
			var tabthree_isShow = this.tabthree_isShow;
			var city_name = this.tabhreetitle;
			var date = this.tabThreeitem_data; // 时间
			var isgoldentime = that.tabThreeisgoldentime; //时段
			var data_city = '';
			if (tabthreeheader_title[0] == '全国') {
				data_city = '';
			} else {
				data_city = tabthreeheader_title[0];
			}
			if (txt == '黄金场') {
				isgoldentime = '1';
				sd = 1;
			} else {
				sd = 0;
				isgoldentime = '0';
			}
			let All_data = {};
			let url = '';
			if (tabthree_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_chain',
					isgoldentime: isgoldentime,
					bdate: date,
					chain: data_city
				};
			} else if (tabthree_isShow == 0) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_name',
					isgoldentime: isgoldentime,
					bdate: date,
					city: data_city
				};
			} else if (tabthree_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'brd',
					isgoldentime: isgoldentime,
					bdate: date,
					brd: data_city
				};
			}

			this.tabthree_index(url, All_data);
			tabthreeheader_title[1] = txt;
			this.tabTowis_sd = true;
			this.tabthreeheader_title = tabthreeheader_title;
			//  图片显示
			this.tabThreeisgoldentime = sd;
			this.tabThreecinema_num_data = sd;
			this.tabThreeis_sd = true;
		},
		tabtow_name_navigeto() {
			var mid = '';
			var id = '';
			var data = this.threetestimgs[this.threeMsg];
			id = data.zz_id;
			mid = data.mid;
			uni.navigateTo({
				url: '../dy_particulars/dy_particulars?id=' + id + '&mid=' + mid
			});
		},
		// 影投插件 点击 影院 和影投同时在用
		tabThreeclick_grid_Yt(name, index) {
			let title = `已选中${name}`;
			var threetestimgs = this.threetestimgs;
			var tabthree_button_headerTow = this.tabthree_button_headerTow;
			var tabthree_button_headerTow_tow = this.tabthree_button_headerTow_tow;
			tabthree_button_headerTow[3] = '场次占影院';
			tabthree_button_headerTow_tow[3] = '座位占影院';

			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var isgoldentime = this.tabThreeisgoldentime; //时段
				var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
				var bdate = this.tabThreeitem_data; // 时间
				var tabthreetitle = this.tabthreetitle; // 地区
				var tabthreeheader_title = this.tabthreeheader_title; // 0 是 当前显示的地区
				this.tabthree_button_headerTow = tabthree_button_headerTow;
				this.tabthree_button_headerTow_tow = tabthree_button_headerTow_tow;

				if (name == '全国') {
					tabthreetitle = '';
				} else {
					tabthreetitle = name;
				}
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'brd',
					brd: tabthreetitle,
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				/* 触底设置 */
				this.pages_Br = false;
				this.$store.commit('big_plateThreepages',0)
				/* 触底设置 */
				this.tabthree_index(url, All_data);
				tabthreeheader_title[0] = name;
				this.tabthreeheader_title = tabthreeheader_title;
				this.Three_one_is_show = true;
				this.tab_three_movie = threetestimgs[0];
				this.tab_three_scrollLeft = 0;
				if (name == '全国') {
					if (tabthree_isShow == 2 || tabthree_isShow == 1) {
						this.tabthree_button_header_br = 4;
					}
					this.tabthree_button_header_br = 0;
				} else {
					this.tabthree_button_header_br = 0;
				}
			}, 500);
		},

		// tabthree 影投查询
		page__view_input_three_yt() {
			clearTimeout(this.setinput_three_yt);
			let brd = this.page__view_input_threeData_yt;
			let that = this;
			if (brd == '') {
				that.page__view_input_threeData_yt = '';
				that.towThree_data1_yt_index = 0;
				this.towThree_data1_yt = [];
				return false;
			}
			this.setinput_three_yt = setTimeout(async function() {
				let url = '/advancedbo/get-provincelist';
				let All_data = {
					type: 'brd',
					brd: brd
				};
				let userType = await that.detection_validity();
				All_data.userType = userType;
				let { data: res } = await that.$http.get({
					url,
					data: All_data
				});
				let des = res.list;
				let data1 = [];
				let data2 = [];
				if (brd == '') {
					that.towThree_data1_yt = [];
					that.towThree_data1_yt_index = 0;
				} else {
					for (let a in des) {
						for (let b in des[a]) {
							data1.push(b);
						}
					}
					that.towThree_data1_yt = data1;
					that.towThree_data1_yt_index = data1.length;
				}
			}, 200);
		},

		// tabthree 城市查询
		page__view_input_three_city() {
			clearTimeout(this.setinput_three_city);
			let city = this.page__view_input_threeData_city;
			let that = this;
			if (city == '') {
				that.page__view_input_threeData_city = '';
				that.towThree_data1_city_index = 0;
				this.towThree_data1_city = [];
				this.towThree_data1_city_index = 0;
				return false;
			}
			this.setinput_three_city = setTimeout(async function() {
				let url = '/advancedbo/get-provincelist';
				let All_data = {
					type: 'city',
					city: city
				};
				let userType = await that.detection_validity();
				All_data.userType = userType;
				let { data: res } = await that.$http.get({
					url,
					data: All_data
				});
				let des = res.list;
				let data1 = [];
				let data2 = [];
				if (city == '') {
					that.towThree_data1_city = [];
					that.towThree_data1_city_index = 0;
				} else {
					for (let a in des) {
						console.log();
						des[a].forEach((item, index) => {
							data1.push(item);
						});
					}
					if (data1.length == 0) {
					} else {
						console.log(data1);
						that.towThree_data1_city = data1;
						that.towThree_data1_city_index = data1.length;
					}
				}
			}, 200);
		},
		// tanthree 城市 插件点击
		tabthree_button_header_br_click(id) {
			var index = id;
			if (index == '0') {
				this.tabthree_button_header_br = 4;
				this.tabthree_xuan('影院排片', 0);
			} else if (index == '1') {
				this.tabthree_button_header_br = 4; //是否显示 返回全国
				this.tabthree_xuan('院线排片', 1);
			} else {
				this.tabthree_button_header_br = 4;

				this.tabthree_xuan('影院排片', 2);
			}
		},
		tabThreeclick_grid(name, index) {
			let title = `已选中${name}`;
			var threetestimgs = this.threetestimgs;
			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var isgoldentime = this.tabThreeisgoldentime; //时段
				var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
				var bdate = this.tabThreeitem_data; // 时间
				var tabthreetitle = this.tabthreetitle; // 地区
				if (name == '全国') {
					tabthreetitle = '';
				} else {
					tabthreetitle = name;
				}
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'cinema_name',
					city: tabthreetitle,
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				var tabthreeheader_title = this.tabthreeheader_title;
				tabthreeheader_title[0] = name;
				this.tabthreeheader_title = tabthreeheader_title;
				this.Three_one_is_show = true;
				this.tab_three_movie = threetestimgs[0];
				this.tab_three_scrollLeft = 0;
				/* 触底设置 */
				this.pages_Br = false;
				this.$store.commit('big_plateThreepages',0)
				/* 触底设置 */
				if (name == '全国') {
					this.tabthree_button_header_br = 4;
				} else {
					this.tabthree_button_header_br = 0;
				}

				this.tabthree_index(url, All_data);
			}, 500);
		},
		// 院线插件 点击 影院 和院线同时在用
		tabThreeclick_grid_Rx(name, index) {
			let title = `已选中${name}`;
			var threetestimgs = this.threetestimgs;
			var tabthree_button_headerTow = this.tabthree_button_headerTow;
			var tabthree_button_headerTow_tow = this.tabthree_button_headerTow_tow;
			tabthree_button_headerTow[3] = '场次占影院';
			tabthree_button_headerTow_tow[3] = '座位占影院';
			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var isgoldentime = this.tabThreeisgoldentime; //时段
				var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
				var bdate = this.tabThreeitem_data; // 时间
				var tabthreetitle = this.tabthreetitle; // 地区
				var tabthreeheader_title = this.tabthreeheader_title; // 0 是 当前显示的地区
				if (name == '全国') {
					tabthreetitle = '';
				} else {
					tabthreetitle = name;
				}

				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'cinema_chain',
					chain: tabthreetitle,
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				/* 触底设置 */
				this.pages_Br = false;
				this.$store.commit('big_plateThreepages',0)
				/* 触底设置 */
				this.tabthree_index(url, All_data);
				tabthreeheader_title[0] = name;
				this.tabthreeheader_title = tabthreeheader_title;
				this.Three_one_is_show = true;
				this.tabthree_button_headerTow = tabthree_button_headerTow;
				this.tabthree_button_headerTow_tow = tabthree_button_headerTow_tow;
				this.tab_three_movie = threetestimgs[0];
				this.tab_three_scrollLeft = 0;
				if (name == '全国') {
					if (tabthree_isShow == 2 || tabthree_isShow == 1) {
						this.tabthree_button_header_br = 4;
					}
					this.tabthree_button_header_br = 0;
				} else {
					this.tabthree_button_header_br = 0;
				}
			}, 500);
		},
		// 搜索出来的东西，点击
		tabThrewclick_city(name, ind) {
			let index = ind;
			var threetestimgs = this.threetestimgs;
			/* 触底设置 */
			this.pages_Br = false;
			this.$store.commit('big_plateThreepages',0)
			/* 触底设置 */
			if (index == 0) {
			
				this.tabThreeclick_grid(name, index);
			} else if (index == 1) {
				this.tabThreeclick_grid_Rx(name, index);
			} else if (index == 2) {
				this.tabThreeclick_grid_Yt(name, index);
			}
			this.tab_three_movie = threetestimgs[0];
			this.tab_three_scrollLeft = 0;
			this.page__view_input_threeData_city = ''; // 城市的输入框中内容
			this.towThree_data1_city_index = 0;
			this.towThree_data1_city = [];
			this.page__view_input_threeData_yx = '';
			this.towThree_data1_yx_index = 0;
			this.towThree_data1_yx = [];
			this.page__view_input_threeData_yt = '';
			this.towThree_data1_yt_index = 0;
			this.towThree_data1_yt = [];
		},
		// tabthree 院线查询
		page__view_input_three_yx() {
			clearTimeout(this.setinput_three_yx);
			let chain = this.page__view_input_threeData_yx;
			let that = this;
			if (chain == '') {
				this.page__view_input_threeData_yx = '';
				this.towThree_data1_yx = [];
				this.towThree_data1_yx_index = 0;
				return false;
			}
			this.setinput_three_yx = setTimeout(async function() {
				let url = '/advancedbo/get-provincelist';
				let All_data = {
					type: 'chain',
					chain: chain
				};
				let userType = await that.detection_validity();
				All_data.userType = userType;
				let { data: res } = await that.$http.get({
					url,
					data: All_data
				});
				let des = res.list;
				let data1 = [];
				let data2 = [];
				if (chain == '') {
					that.towThree_data1_yx = [];
					that.towThree_data1_yx_index = 0;
				} else {
					for (let a in des) {
						for (let b in des[a]) {
							data1.push(b);
						}
					}
					that.towThree_data1_yx = data1;
					that.towThree_data1_yx_index = data1.length;
				}
			}, 200);
		},
		tabthree_isShow_one_click(index) {
			this.tabthree_isShow_one = index;
		},
		tabThreeclick_grid(name, index) {
			let title = `已选中${name}`;
			var threetestimgs = this.threetestimgs;
			uni.showToast({
				title,
				duration: 500,
				icon: 'none'
			});
			setTimeout(() => {
				var isgoldentime = this.tabThreeisgoldentime; //时段
				var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
				var bdate = this.tabThreeitem_data; // 时间
				var tabthreetitle = this.tabthreetitle; // 地区
				if (name == '全国') {
					tabthreetitle = '';
				} else {
					tabthreetitle = name;
				}
				var url = '/topprogram/get-rowpiece';
				let All_data = {
					type: 'cinema_name',
					city: tabthreetitle,
					bdate: bdate,
					isgoldentime: isgoldentime
				};
				var tabthreeheader_title = this.tabthreeheader_title;
				tabthreeheader_title[0] = name;
				this.tabthreeheader_title = tabthreeheader_title;
				this.Three_one_is_show = true;
				this.tab_three_movie = threetestimgs[0];
				this.tab_three_scrollLeft = 0;
				if (name == '全国') {
					this.tabthree_button_header_br = 4;
				} else {
					this.tabthree_button_header_br = 0;
				}

				this.tabthree_index(url, All_data);
			}, 500);
		},
		// tabthree 城市查询
		page__view_input_three_city() {
			clearTimeout(this.setinput_three_city);
			let city = this.page__view_input_threeData_city;
			let that = this;
			if (city == '') {
				that.page__view_input_threeData_city = '';
				that.towThree_data1_city_index = 0;
				this.towThree_data1_city = [];
				this.towThree_data1_city_index = 0;
				return false;
			}
			this.setinput_three_city = setTimeout(async function() {
				let url = '/advancedbo/get-provincelist';
				let All_data = {
					type: 'city',
					city: city
				};
				let userType = await that.detection_validity();
				All_data.userType = userType;
				let { data: res } = await that.$http.get({
					url,
					data: All_data
				});
				let des = res.list;
				let data1 = [];
				let data2 = [];
				if (city == '') {
					that.towThree_data1_city = [];
					that.towThree_data1_city_index = 0;
				} else {
					for (let a in des) {
						console.log();
						des[a].forEach((item, index) => {
							data1.push(item);
						});
					}
					if (data1.length == 0) {
					} else {
						console.log(data1);
						that.towThree_data1_city = data1;
						that.towThree_data1_city_index = data1.length;
					}
				}
			}, 200);
		},
		dddd(e) {
			this.alpha = e;
		},
		// 地区× 关闭
		page_three_cha_one() {
			this.Three_one_is_show = true;
			// 城市
			this.page__view_input_threeData_city = ''; // 城市的输入框中内容
			this.towThree_data1_city_index = 0;
			this.towThree_data1_city = [];
			// 城市
			// rx
			this.page__view_input_threeData_yx = '';
			this.towThree_data1_yx_index = 0;
			this.towThree_data1_yx = [];
			// rx
			// yt
			this.page__view_input_threeData_yt = '';
			this.towThree_data1_yt_index = 0;
			this.towThree_data1_yt = [];
			// yt
		},
		tab_three_ei_calendar(e) {
			// console.log(this.tabTowitem_data);
			var isgoldentime = this.tabThreeisgoldentime; //时段
			var date = this.tabThreeitem_data_xq; // 当前时间
			var tabthree_isShow = this.tabthree_isShow; //  控制显示哪一个
			console.log(date);
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

			let data = {};
			let url = '';
			if (!(Br_one < Br_tow)) {
				// 判断当前点击是哪一个 制定url 数据
				if (tabthree_isShow == 1) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'cinema_chain',
						isgoldentime: isgoldentime,
						bdate: item_date
					};
				} else if (tabthree_isShow == 0) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'cinema_name',
						isgoldentime: isgoldentime,
						bdate: item_date
					};
				} else if (tabthree_isShow == 2) {
					url = '/topprogram/get-rowpiece';
					data = {
						type: 'brd',
						isgoldentime: isgoldentime,
						bdate: item_date
					};
				}
				
				
				/* 触底设置 */
				this.pages_Br = false;
				this.$store.commit('big_plateThreepages',0)
				/* 触底设置 */
				
				this.tabthree_index(url, data);
				this.tab_three_date = item_date;
				this.tabThreeitem_data = item_date;
				this.tab_three_show = false;
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
			this.tab_three_show = false;
		},
		// tabhree上选择
		Threeistap(index, name) {
			var ii = index;
			if (ii == 1) {
				var tabThreeis_sd = this.tabThreeis_sd;
				if (tabThreeis_sd) {
					tabThreeis_sd = false;
				} else {
					tabThreeis_sd = true;
				}
				this.tabThreeis_sd = tabThreeis_sd;
				this.tabThreeis_lx = true;
			} else if (ii == 2) {
				var tabThreeis_lx = this.tabThreeis_lx;
				if (tabThreeis_lx) {
					tabThreeis_lx = false;
				} else {
					tabThreeis_lx = true;
				}
				this.tabThreeis_lx = tabThreeis_lx;
				this.tabThreeis_sd = true;
			} else {
				if (name == '影院') {
					console.log('影院');
				} else if (name == '院线') {
					console.log('院线');
				} else {
					console.log('影投');
				}
				this.Three_one_is_show = false;
				this.tabThreeis_sd = true;
				this.tabThreeis_lx = true;
			}
		},
		// 后一天
		ThreeRight_date() {
			var isgoldentime = this.tabThreeisgoldentime; //时段
			var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
			var bdate = this.tabThreeitem_data; // 时间
			var tabthreetitle = this.tabthreetitle; // 地区
			var tabthreeheader_title = this.tabthreeheader_title[0]; // 0 是显示的地区
			var tabthree_isShow_one = this.tabthree_isShow_one;
			var threetestimgs = this.threetestimgs;
			var date = moment(bdate)
				.subtract(-1, 'days')
				.format('YYYY-MM-DD');
			if (tabthreeheader_title == '全国') {
				tabthreeheader_title = '';
			}
			let url = '';
			let All_data = {};
			if (tabthree_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_chain',
					isgoldentime: isgoldentime,
					bdate: date,
					chain: tabthreeheader_title
				};
			} else if (tabthree_isShow == 0) {
				if (tabthree_isShow_one == 0) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'cinema_name',
						isgoldentime: isgoldentime,
						bdate: date,
						city: tabthreeheader_title
					};
				} else if (tabthree_isShow_one == 1) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'cinema_chain',
						isgoldentime: isgoldentime,
						bdate: date,
						chain: tabthreeheader_title
					};
				} else {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'brd',
						isgoldentime: isgoldentime,
						bdate: date,
						brd: tabthreeheader_title
					};
				}
			} else if (tabthree_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'brd',
					isgoldentime: isgoldentime,
					bdate: date,
					brd: tabthreeheader_title
				};
			}
			this.tabthreetitle = '';
			this.tab_three_movie = threetestimgs[0];
			this.tab_three_scrollLeft = 0;
			this.tab_three_date = date;
			this.tabthree_index(url, All_data);
		},
		// 前一天
		ThreeLeft_date() {
			var isgoldentime = this.tabThreeisgoldentime; //时段
			var tabthree_isShow = this.tabthree_isShow; // 控制发送那个
			var bdate = this.tabThreeitem_data; // 时间
			var tabthreeheader_title = this.tabthreeheader_title[0]; // 地区
			var tabthree_isShow_one = this.tabthree_isShow_one; // 当前选取的哪一个东西
			var threetestimgs = this.threetestimgs;

			if (tabthreeheader_title == '全国') {
				tabthreeheader_title = '';
			}

			let url = '';
			let All_data = {};
			var date = moment(bdate)
				.subtract(+1, 'days')
				.format('YYYY-MM-DD');
			if (tabthree_isShow == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_chain',
					isgoldentime: isgoldentime,
					bdate: date,
					chain: tabthreeheader_title
				};
			} else if (tabthree_isShow == 0) {
				if (tabthree_isShow_one == 0) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'cinema_name',
						isgoldentime: isgoldentime,
						bdate: date,
						city: tabthreeheader_title
					};
				} else if (tabthree_isShow_one == 1) {
					url = '/topprogram/get-rowpiece?type=&isgoldentime=' + isgoldentime + '&bdate=' + date + '&=' + tabthreeheader_title;
					All_data = {
						type: 'cinema_chain',
						isgoldentime: isgoldentime,
						bdate: date,
						chain: tabthreeheader_title
					};
				} else {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'brd',
						isgoldentime: isgoldentime,
						bdate: date,
						brd: tabthreeheader_title
					};
				}
				if (tabthree_isShow_one == 0) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'cinema_name',
						isgoldentime: isgoldentime,
						bdate: date,
						city: tabthreeheader_title
					};
				} else if (tabthree_isShow_one == 1) {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'cinema_chain',
						isgoldentime: isgoldentime,
						bdate: date,
						chain: tabthreeheader_title
					};
				} else {
					url = '/topprogram/get-rowpiece';
					All_data = {
						type: 'brd',
						isgoldentime: isgoldentime,
						bdate: date,
						brd: tabthreeheader_title
					};
				}
			} else if (tabthree_isShow == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'brd',
					isgoldentime: isgoldentime,
					bdate: date,
					brd: tabthreeheader_title
				};
			}
			this.tab_three_movie = threetestimgs[0];
			this.tab_three_scrollLeft = 0;
			this.tab_three_date = date;
			this.tabthree_index(url, All_data);
		},
		// header头部切换
		tabthree_xuan(name, index) {
			// console.log(name,index);
			var isgoldentime = this.tabThreeisgoldentime; //时段
			var date = this.tabThreeitem_data; // 当前时间
			var tabthreetitle = this.tabthreetitle; // 地区
			var titile = [...this.tabthree_button_headerTow]; //表头
			var threetestimgs = this.threetestimgs;

			var titile1 = [...this.tabthree_button_headerTow_tow]; // 下边的数据头部显示

			var a = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			// 惊天当前日期永远只是当前日期
			var dq_data = moment()
				.subtract(0, 'days')
				.format('YYYY-MM-DD');
			date = a;
			let url = '';
			let All_data = {};
			if (index == 1) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_chain',
					isgoldentime: isgoldentime,
					bdate: date
				};
				titile[3] = '场次占院线';
				titile1[3] = '座位占院线';
			} else if (index == 0) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'cinema_name',
					isgoldentime: isgoldentime,
					bdate: date
				};
				titile[3] = '场次占影院';
				titile1[3] = '座位占影院';
				console.log(All_data);
			} else if (index == 2) {
				url = '/topprogram/get-rowpiece';
				All_data = {
					type: 'brd',
					isgoldentime: isgoldentime,
					bdate: date
				};

				titile[3] = '场次占影投';
				titile1[3] = '座位占影投';
			}
			this.$store.commit('big_plate_threeIndex_mutaions',index)
			this.tab_three_movie = threetestimgs[0];
			this.tab_three_scrollLeft = 0;
			
			this.tabthree_index(url, All_data);
			var tabthreeheader_title = this.tabthreeheader_title;
			tabthreeheader_title[0] = '全国';
			this.tabthreeheader_title = tabthreeheader_title;
			this.tabThreeitem_data = a;
			this.tabThreeitem_data_xq = dq_data; // 永远稚嫩是当前时间
			this.tabthree_isShow_one = index; // 插件显示
			var name = name.slice(0, 2);
			titile[0] = name;
			titile1[0] = name;
			this.tabthree_button_headerTow = titile;
			this.tabthree_button_headerTow_tow = titile1;
			this.tabthree_isShow = index;
			this.tabthree_button_header_br = 4; // 是否显示 返回全国
		}
	}
};
</script>

<style></style>
