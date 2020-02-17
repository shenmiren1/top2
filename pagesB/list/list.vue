<template>
	<view>
		<!-- <h1>行业榜单</h1> -->
		<!-- tabone -->
		<scroll-view scroll-x class="header_tab">
			<view @tap="header_tab_click(index)"  v-for="(item, index) in header_tab"
			 :key="index"><text :class="[header_tab_index == index ? 'active' : '']">{{ item }}</text></view>
		</scroll-view>

		<view class="tabbone">
			<view class="center_tab">
				<!-- 影片累计票房 -->
				<view :hidden="!(header_tab_index == 0)" @tap="center_tab_click(index, 0)" class="center_tab_one"
				 v-for="(item, index) in center_tab" :key="index">
					<text  :class="[center_tab_index == index ? 'active' : '', '']">{{ item }}</text>
				</view>
				<!-- 影片票房榜 -->
				<view :hidden="!(header_tab_index == 1)" @tap="center_tab_click(index, 1)"  class="center_tab_tow"
				 v-for="(item, index) in center_tab_tow" :key="index">
					<text :class="[center_tab_index_tow == index ? 'active' : '', '']">{{ item }}</text>
				</view>
				<!-- 大盘票房榜 -->
				<view :hidden="!(header_tab_index == 2)" @tap="center_tab_click(index, 2)"  class="center_tab_three"
				 v-for="(item, index) in center_tab_three" :key="index">
					<text :class="[center_tab_index_three == index ? 'active' : '', '']"> {{ item }}</text>
				</view>
				<!-- 公司榜 -->
				<scroll-view v-if="header_tab_index == 3" class="center_tab_four" scroll-x>
					<view @tap="center_tab_click(index, 3)" v-for="(item, index) in center_tab_four" 
					 :key="index">
						<text :class="[center_tab_index_four == index ? 'active' : '']">{{ item }}</text>
					</view>
				</scroll-view>
				<!-- 人物榜 -->
				<view :hidden="!(header_tab_index == 4)" @tap="center_tab_click(index, 4)" 
				 v-for="(item, index) in center_tab_five" :key="index" class="center_tab_three">
					<text :class="[center_tab_index_five == index ? 'active' : '', '']">{{ item }}</text>
				</view>
			</view>
			<view class="bottom">
				<view class="bottom_header">
					<!-- 影片累计票房 -->
					<view class="bottom_header_one" v-if="header_tab_index == 0" v-for="(item, index) in bottom_header_data" :key="index">{{ item }}</view>
					<!-- 影片票房榜☞零点场 -->
					<view class="bottom_header_tow" v-if="header_tab_index == 1 && center_tab_index_tow == 0" v-for="(item, index) in bottom_header_data_tow"
					 :key="index">
						{{ item }}
					</view>
					<!-- 影片票房榜☞首映日预售 -->
					<view class="bottom_header_tow_er" v-if="header_tab_index == 1 && center_tab_index_tow == 1" v-for="(item, index) in bottom_header_data_tow_er"
					 :key="index">
						{{ item }}
					</view>
					<!-- 影片票房榜☞首映日 -->
					<view class="bottom_header_tow_three" v-if="header_tab_index == 1 && center_tab_index_tow == 2" v-for="(item, index) in bottom_header_data_tow_three"
					 :key="index">
						{{ item }}
					</view>
					<!-- 影片票房榜☞s首周 -->
					<view class="bottom_header_tow_four" v-if="header_tab_index == 1 && center_tab_index_tow == 3" v-for="(item, index) in bottom_header_data_tow_four"
					 :key="index">
						{{ item }}
					</view>
					<!-- 大盘票房榜 ☞单日  && center_tab_index_tow == 0 忘了是什么先方这-->
					<view class="bottom_header_three" v-if="header_tab_index == 2 " v-for="(item, index) in bottom_header_data_three"
					 :key="index">
						{{ item }}
					</view>
					<!-- 公司榜 ☞除了 院线公司 影投公司-->
					<view class="bottom_header_three" v-if="header_tab_index == 3 && center_tab_index_four != 4 && center_tab_index_four != 5"
					 v-for="(item, index) in bottom_header_data_four" :key="index">
						{{ item }}
					</view>

					<!-- 大盘票房榜 ☞院线公司 影投公司-->
					<view class="bottom_header_three_tow" v-if="header_tab_index == 3 && center_tab_index_four != 0 && center_tab_index_four != 1 && center_tab_index_four != 2 && center_tab_index_four != 3"
					 v-for="(item, index) in bottom_header_data_four_tow" :key="index">
						{{ item }}
					</view>

					<!-- 人物榜 ☞编剧-->
					<view class="bottom_header_five" v-if="header_tab_index == 4" v-for="(item, index) in bottom_header_data_five"
					 :key="index">{{ item }}</view>
				</view>
				<view class="bottom_data">
					<view class="bottom_data_data" @tap="tz_click(item.id,item.zz_id)" v-for="(item, index) in list" :key="index">
						<view class="bottom_data_header" v-if="index + 1 != 1 && index + 1 != 2 && index + 1 != 3">{{ index + 1 }}</view>
						<view class="bottom_data_header" v-if="!(index + 1 != 1)">
							<image src="../../static/list/one.png" mode=""></image>
						</view>
						<view class="bottom_data_header" v-if="!(index + 1 != 2)">
							<image src="../../static/list/tow.png" mode=""></image>
						</view>
						<view class="bottom_data_header" v-if="!(index + 1 != 3)">
							<image src="../../static/list/three.png" mode=""></image>
						</view>

						<!-- m名字 -->
						<view :class="['bottom_data_name', header_tab_index == 3 ? 'bottom_data_name_tow' : '']">
							<!-- 除了大盘票房不用 -->
							<view v-if="!(header_tab_index == 2) && header_tab_index != 3 && header_tab_index != 4">{{ item.movie_name }}</view>
							<!-- 只是大盘票房用 -->
							<!-- <view v-if="header_tab_index == 2">{{ item.championMovieName }}</view> -->
							<!-- 公司榜 ☞除了 院线公司 影投公司-->
							<view v-if="header_tab_index == 3 && center_tab_index_four != 4 && center_tab_index_four != 5">{{ item.name }}</view>
							<!-- 公司榜 ☞只是 院线公司 影投公司-->
							<view v-if="
									header_tab_index == 3 &&
										center_tab_index_four != 0 &&
										center_tab_index_four != 1 &&
										center_tab_index_four != 2 &&
										center_tab_index_four != 3 &&
										center_tab_index_four != 5
								">
								{{ item.cinema_chain }}
							</view>

							<view v-if="
									header_tab_index == 3 &&
										center_tab_index_four != 0 &&
										center_tab_index_four != 1 &&
										center_tab_index_four != 2 &&
										center_tab_index_four != 3 &&
										center_tab_index_four != 4
								">
								{{ item.brd }}
							</view>
							<!-- 人物榜影片名 -->
							<!-- <view v-if="header_tab_index == 4">{{ item.maxMovieName }}</view> -->

							<!-- name 下显示的名字或者是其他 -->
							<!-- 除了大盘票房不用 -->
							<view v-if="!(header_tab_index == 2) && header_tab_index != 3 && header_tab_index != 4">{{ item.publish_date }}
								{{ item.publish_w }}</view>
							<!-- 只是大盘票房用 -->
							<view v-if="header_tab_index == 2 && center_tab_index_three== 0">{{ item.allbdate }} </view>

							<view v-if="header_tab_index == 2&& center_tab_index_three== 1">{{ item.allweek }}</view>
							<view v-if="header_tab_index == 2&& center_tab_index_three== 2">{{ item.allmonth }}</view>

							<view v-if="header_tab_index == 3 && center_tab_index_four != 4 && center_tab_index_four != 5" class="bottom_data_name_three">
								{{ item.movie_num }} 部
							</view>
							<!-- 公司榜 ☞只是 院线公司 影投公司-->
							<view v-if="header_tab_index == 3 && center_tab_index_four != 0 && center_tab_index_four != 1 && center_tab_index_four != 2 && center_tab_index_four != 3">
								{{ item.cinema_nums }} 家院线
							</view>
							<view v-if="header_tab_index == 4">
								<!-- <text :hidden="!(center_tab_index_five == 0)">导演</text>
								<text :hidden="!(center_tab_index_five == 1)">演员</text>
								<text :hidden="!(center_tab_index_five == 2)">编剧</text> : -->
								{{ item.nameCn }}
							</view>
						</view>

						<!-- 需要替换的地方 -->
						<!-- 影片累计票房 -->

						<!--  !第三栏部分 -->
						<view v-if="header_tab_index == 0" class="bottom_data_init">{{ item.type }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 0" class="bottom_data_init">{{ item.zero_bo }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 1" class="bottom_data_init">{{ item.yushou_bo }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 2" class="bottom_data_init">{{ item.firstday_bo }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 3" class="bottom_data_init">{{ item.firstweek_bo }}</view>
						<!-- 大盘票房 -->
						<view v-if="header_tab_index == 2" class="bottom_data_init">{{ item.total_bo_s2 }}</view>

						<!-- 公司榜单- 出品公司-->
						<!--  && center_tab_index_four ==0 -->
						<view v-if="header_tab_index == 3 && center_tab_index_four != 4 && center_tab_index_four != 5" :class="['bottom_data_init', header_tab_index == 3 ? 'bottom_data_init_tow' : '']">
							{{ item.sbo }}
						</view>
						<view v-if="header_tab_index == 3 && center_tab_index_four != 0 && center_tab_index_four != 1 && center_tab_index_four != 2 && center_tab_index_four != 3"
						 :class="['bottom_data_init', header_tab_index == 3 ? 'bottom_data_init_tow' : '']">
							{{ item.total_bo_s }}
						</view>
						<view v-if="header_tab_index == 4" :class="['bottom_data_init', header_tab_index == 3 ? 'bottom_data_init_tow' : '']">{{ item.sbo_round }}</view>

						<!-- 影片累计票房 -->
						<!-- 第四部分 -->
						<view v-if="header_tab_index == 0" class="bottom_data_mani">{{ item.bo }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 0" class="bottom_data_mani">{{ item.zero_bo_fene }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 1" class="bottom_data_mani">{{ item.yushou_bo_fene }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 2" class="bottom_data_mani">{{ item.firstday_bo_fene }}</view>
						<view v-if="header_tab_index == 1 && center_tab_index_tow == 3" class="bottom_data_mani">{{ item.firstweek_bo_fene }}</view>
						<!-- 大盘票房 -->
						<view v-if="header_tab_index == 2" class="bottom_data_mani,bottom_data_mani_cid_tow">
							<view class="" :style="{color:'#F08E2D'}">
								{{ item.championMovieName }}
							</view>
							<view>{{ item.championMovieTotalW }}</view>
						</view>
						<!-- && center_tab_index_four ==0 -->
						<view v-if="header_tab_index == 3 && center_tab_index_four != 4 && center_tab_index_four != 5" :class="['bottom_data_mani', header_tab_index == 3 ? 'bottom_data_mani_tow' : '']">
							{{ item.maxMovieName }}
						</view>
						<view v-if="header_tab_index == 3 && center_tab_index_four != 0 && center_tab_index_four != 1 && center_tab_index_four != 2 && center_tab_index_four != 3"
						 :class="['bottom_data_mani', header_tab_index == 3 ? 'bottom_data_mani_tow' : '']">
							{{ item.cinema_num }}
						</view>




						<!-- 新加影片名 -->

						<view v-if="header_tab_index == 4" :class="['bottom_data_mani','bottom_data_mani_abs_tow' ,header_tab_index == 3 ? 'bottom_data_mani_tow' : '']">
							<view :style="{color:'#F08E2D'}">{{ item.maxMovieName }}</view>
							<view>{{ item.maxMovieBo }}</view>
						</view>
						<!-- 需要替换的地方 -->
					</view>
				</view>
			</view>
		</view>
		<!-- tabtow -->
	</view>
</template>

<script>
	export default {
		onShareAppMessage(){},
		data() {
			return {
				bottom_header_data_five: ['排名', '导演', ' 累计票房（万）', '最高影片 票房（万）'],
				center_tab_index_five: 0,
				center_tab_five: ['导演', '演员', '编剧'],
				// four排名 公司名称
				bottom_header_data_four_tow: ['排名', '公司名称', '2019年票房（万）', '2019年 新增影院'],
				center_tab_four: ['出品公司', '联合出品', '发行公司', '联合发行公司', '院线公司', '影投公司'],
				bottom_header_data_four: ['排名', '公司名称', '累计票房（万）', '冠军影片'],
				center_tab_index_four: 0,
				// four
				// three
				center_tab_index_three: 0,
				center_tab_three: ['单日 ', '单周 ', '单月'],
				bottom_header_data_three: ['排名', '日期', ' 综合票房(万)', '冠军影片 票房 (万)'],
				// three
				// tow
				center_tab_tow: ['零点场', '首映日预售', '首映日', '首周'],
				center_tab_index_tow: 0,
				bottom_header_data_tow: ['排名', '影片名称', '  零点场  票房(万)', '零点场占 累计票房'],
				bottom_header_data_tow_er: ['排名', '影片名称', ' 首映日预售 票房（万）', '首映日预售 占累计票房'],
				bottom_header_data_tow_three: ['排名', '影片名称', ' 首映日 票房(万)', '首映日预售 占累计票房'],
				bottom_header_data_tow_four: ['排名', '影片名称', ' 首周票房(万)', '首周占 累计票房'],
				// tow
				list: [{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					},
					{
						bo: '568,451.68',
						country: '中国大陆',
						director_name: '吴京',
						filmLength: '123',
						id: '4178',
						import_mode: '国产片',
						movie_name: '战狼2',
						publish_date: '2017-07-27',
						publish_w: ' 周四',
						type: '动作',
						zz_id: '19117'
					}
				],

				bottom_header_data: ['排名', '影片名称', '主类型', '累计票房（万）'],
				center_tab_index: 0,
				center_tab: ['全部', '国产片', '分账片', '买断片'],
				header_tab: ['影片累积票房榜', '影片票房榜', '大盘票房榜', '公司榜单', '人物榜'],
				header_tab_index: 0 // 选中header——tab 的 控制
			};
		},
		onLoad() {
			var url = '/topprogram/get-top10list'
			let All_data = {
				dtype:'all',
				son_dtype:'all'
			}
			this.lj__index(url,this,All_data);
		},
		methods: {
			tz_click(id,mid){
				console.log(id);
				console.log(mid);
				if (this.header_tab_index  == 0 || this.header_tab_index == 1	) {
					uni.navigateTo({
						url: '../../pagesA/dy_particulars/dy_particulars?id=' + mid + '&mid=' + id
					});
				}
			},
			//累计票房接口
			lj__index: async function(url, that,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				if (this.header_tab_index == 2 && this.center_tab_index_three== 0   ) {
					res.forEach((item,index) =>{
						var str= '周'+'日一二三四五六'.charAt(new Date(item.allbdate).getDay());
						item.allbdate = item.allbdate + ' ' +str
					})
				}
				
				this.list = res;
			},
			// center_tab 点击
			center_tab_click(index, data) {
				// data 是 对应的  当前tab的 点击是哪一个
				// index 是对应的 当前 大tab 中 点击的哪一个小tab
				let url = '';
				let All_data = {};
				
				if (data == 0) {
					if (index == 0) {
						url = '/topprogram/get-top10list';
						All_data = {
							dtype:'all',
							son_dtype:'all'
						}
					} else if (index == 1) {
						url = '/topprogram/get-top10list';
						All_data = {
							dtype:'all',
							son_dtype:'guochan'
						}
					} else if (index == 2) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'all',
							son_dtype:'fenzhang'
						}
					} else if (index == 3) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'all',
							son_dtype:'maiduan'
						}
					}
					this.center_tab_index = index;
				} else if (data == 1) {
					var bottom_header_data_tow = this.bottom_header_data_tow; // 表头
					if (index == 0) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'movie',son_dtype:'zero'
						}
						bottom_header_data_tow[2] = '  零点场  票房(万)';
						bottom_header_data_tow[3] = '零点场占 累计票房';
					} else if (index == 1) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'movie',son_dtype:'yushou'
						}

						// bottom_header_data_tow[2] = '首映日预售 票房（万）';
						// bottom_header_data_tow[3] = '首映日预售 占累计票房';
					} else if (index == 2) {

						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'movie',son_dtype:'firstday'
						}
					} else if (index == 3) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'movie',
							son_dtype:'firstweek'
						}
					}
					this.center_tab_index_tow = index;
					// this.bottom_header_data_tow = bottom_header_data_tow;
				} else if (data == 2) {
					var bottom_header_data_three = this.bottom_header_data_three;
					var data = '';
					if (index == 0) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'dapan',son_dtype:'allday'
						}
						data = '日期'
					} else if (index == 1) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'dapan',son_dtype:'allweek'
						}
						data = '周次'
					} else if (index == 2) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'dapan',
							son_dtype:'allmonth'
						}
						data = '月份'
					}
					bottom_header_data_three[1] = data;
					this.bottom_header_data_three = bottom_header_data_three;
					this.center_tab_index_three = index;
				} else if (data == 3) {
					if (index == 0) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'chuping'
						}
					} else if (index == 1) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'union_chuping'
						}
					} else if (index == 2) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'publish'
						}
					} else if (index == 3) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'union_publish'
						}
					} else if (index == 4) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'chain'
						}
					} else if (index == 5) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'company',son_dtype:'brd'
						}
					}
					this.center_tab_index_four = index;
				} else if (data == 4) {
					var bottom_header_data_five = this.bottom_header_data_five;
					var data = '';
					if (index == 0) {
						url = '/topprogram/get-top10list?dtype=character' + '&son_dtype=' + 'director';
						All_data = {
							
						}
						data = '导演'
					} else if (index == 1) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'character',son_dtype:'actor'
						}
						data = '演员'
					} else if (index == 2) {
						url = '/topprogram/get-top10list'
						All_data = {
							dtype:'character',son_dtype:'writer'
						}
						data = '编剧'
					}
					bottom_header_data_five[1] = data;
					this.bottom_header_data_five = bottom_header_data_five;
					this.center_tab_index_five = index;
				}

				this.lj__index(url,this,All_data);
			},
			// header_tab点击
			header_tab_click(index) {
				let All_data = [];
				let url = '';
				if (index == 0) {
					url = '/topprogram/get-top10list'
					All_data = { 
						dtype:'all',
						son_dtype:'all'
					}
					this.center_tab_index = 0;
				} else if (index == 1) {
					url = '/topprogram/get-top10list';
					All_data = { 
						dtype:'movie',
						son_dtype:'zero'
					}
					this.center_tab_index_tow = 0;
				} else if (index == 2) {
					url = '/topprogram/get-top10list';
					All_data = { 
						dtype:'dapan',
						son_dtype:'allday'
					}
					this.center_tab_index_three = 0;
				} else if (index == 3) {
					url = '/topprogram/get-top10list';
					All_data = { 
						dtype:'company',
						son_dtype:'chuping'
					}
					this.center_tab_index_four = 0;
				} else if (index == 4) {
					url = '/topprogram/get-top10list';
					All_data = { 
						dtype:'character',
						son_dtype:'director'
					}
					this.center_tab_index_fiv = 0;
				}
				this.lj__index(url,this,All_data);
				this.header_tab_index = index;
			}
		}
	};
</script>

<style lang="less">
	@import url('./list.less');
</style>
