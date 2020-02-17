<template>
	<view>
		<!-- tabone 值小tab -->
		<view class="tab_one" :hidden="!(haeder_index == 0)">
			<!-- 头部 -->
			<view class="title">
				<view @tap="tab_one_tap(index)" :class="[index == tab_one_index ? 'actve' : '']" v-for="(item, index) in title_data" :key="index">{{ item }}</view>
			</view>

			<!-- certer -->
			<view class="center">
				<view class="center_time">2012年-2019年</view>

				<view class="center_data">
					<view class="center_data_data">
						<view>总票房</view>
						<view>{{ AllSum_data.sum.total_bo_s }}</view>
					</view>
					<view class="center_data_data">
						<view>总人次</view>
						<view>{{ AllSum_data.sum.total_people_s }}</view>
					</view>
					<view class="center_data_data">
						<view>总场次</view>
						<view>{{ AllSum_data.sum.session_s }}</view>
					</view>
				</view>
			</view>
			<view class="Choice_data">
				<view
					@tap="Choice_data_click(item, index)"
					v-if="tab_one_index == 0"
					:class="[index == Choice_data_index ? 'active' : '']"
					v-for="(item, index) in Choice_data"
					:key="index"
				>
					{{ item }}
				</view>

				<view
					@tap="Choice_data_click(item, index)"
					v-if="tab_one_index == 1"
					:class="[index == Choice_data_index ? 'active' : '', 'Choice_data_tow']"
					v-for="(item, index) in Choice_data_tow"
					:key="index"
				>
					{{ item }}
				</view>
			</view>

			<view class="canvas_one">
				<view class="canvas_one_Written">2012 至 {{ zx_time }}{{ canvas_one_Written_data[0] }}</view>
				<canvas canvas-id="canvasMix" id="canvasMix" class="charts" disable-scroll="true" @touchstart="touchMix" @touchmove="moveMix" @touchend="touchEndMix"></canvas>
			</view>

			<view class="canvas_one">
				<view class="canvas_one_Written">2012 至 {{ zx_time }}{{ canvas_one_Written_data[1] }}</view>
				<canvas
					canvas-id="canvasMix_pj"
					id="canvasMix_pj"
					class="charts"
					disable-scroll="true"
					@touchstart="touchMix_pj"
					@touchmove="moveMix_pj"
					@touchend="touchEndMix_pj"
				></canvas>
			</view>
			
			
			
			<!--底部数据 -->
			
			<view class="button">
				<view class="buttonH">
					<view class="buttonHone">影院明细</view>
					<view class="buttonHtow" @tap="()=>{this.is_index = false}">
						<!-- <text></text> -->
						<image src="../../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					<view>年份</view>
					<!-- <view></view> -->
					<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
				<!-- @tap="nagitto(it.movie_id_r, it.zz_id)" -->
				<view class="buttonB"  v-for="(it,index) in AllSum_data.data" :key="index">
					<view class="buttonB_Headerson">
						<view class="buttonB_Headerson_name">{{ it.year }}年</view>
			
						<!-- <view class="buttonB_Headersn1">{{ it.sy_data }}{{ it.totalBo }}</view> -->
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
			
			<!-- 弹出框 -->
			<scroll-view scroll-y class="more" :hidden="is_index">
				<scroll-view scroll-y class="more_header"></scroll-view>
				<view class="more_index">
					<view class="more_index_header"><view class="" @tap="()=>{this.is_index = true}">确定</view></view>
					<view class="more_index_data">
						<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
							{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
						</view>
					</view>
				</view>
			</scroll-view>
			
			<!-- 底部数据 -->
		</view>
	</view>
</template>
<script>
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';
import {mapState} from 'vuex'
var _self;

var canvaMix = null;
var canvaMix_pj = null;
export default {
	props:{
		// res:{
		// 	value:Object,
		// },
		
	},
	data() {
		return {
			is_index:true,
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
			canvas_one_Written_data: ['影院数和总票房', '观影人次和平均票价'],
			AllSum_data: {
				sum: {
					total_bo_s: '---',
					total_people_s: '---',
					session_s: '---'
				}
			}, // tabone 所有的数据
			Choice_data_index: 2, // 几公里 哪里样式选择
			Choice_data: ['--', '--', '三公里', '一公里'],
			Choice_data_tow: [],
			zx_time: '--', // 当前年
			header_data: ['区域概况', '竞争影院'],
			title_data: ['区域票房', '人效分析'],
			tab_one_index: 0, //* tabone  顶部tab */
			// ucharts
			cWidth: '',
			cHeight: '',
			pixelRatio: 1,
			textarea: ''
			// ucharts
		};
	},
	computed:{
		...mapState({
			haeder_index:'map_particulars_index',
			res:'map_particulars_res'
		})
	},
	watch: {
		haeder_index(){
			if (this.haeder_index == 1)  return false;
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			
			// 用户所在地区
			var Choice_data = [...this.Choice_data];
			var Choice_data_tow = [];
			Choice_data[0] = city;
			Choice_data[1] = district;
			Choice_data_tow[0] = city;
			Choice_data_tow[1] = district;
			this.Choice_data_tow = Choice_data_tow;
			this.Choice_data = Choice_data;
			
			// 用户所在地区
			// var url = this.baseURL + '/topprogram/region-total?lat=' + latitude + '&lng=' + longitude;
			// this.db_index_one(url);
			//* 获取最新的当前年 当前年 */
			var time = new Date().getFullYear();
			this.zx_time = time;
			/* ucharts */
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
			/* ucharts */
			
			this.tab_one_index = 0;
			this.Choice_data_index = 2;
			var url = '/topprogram/region-total?lat=' + latitude + '&lng=' + longitude;
			var canvas_one_Written_data  =  ['影院数和总票房', '观影人次和平均票价']
			this.canvas_one_Written_data = canvas_one_Written_data;
			this.db_index_one(url);
		},
		// 废弃
		res() {
			if (this.haeder_index == 1)  return false;
			var res = this.res;
			let { city, district, latitude, longitude } = res;
		}
	},
	methods: {
		// 操作跟多指标
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
		// tabone
		// tabone 人效接口
		async db_index_tow(url) {
			console.log(url);
			var { data } = await this.$http.get({ url });


			let echarts_data = data.echarts_data;
			let Mix = { categories: [], series: [] };
			let Mix_pj = { categories: [], series: [] };
			Mix_pj.categories = echarts_data.left_data.xAxis_data;
			Mix.categories = echarts_data.right_data.xAxis_data;
			for (let i in echarts_data) {
				// 观影频次
				if (i == 'left_data') {
					// Mix.series.push({data:echarts_data[i].cinemas_data,type:'column',name:'影院数',color:'#F08E2D'})
					Mix.series.push({ data: echarts_data[i].people_frequency, type: 'line', name: '观影频次', color: '#3E8EF2' });
					// 覆盖人口
				} else if (i == 'right_data') {
					Mix_pj.series.push({ data: echarts_data[i].halls_data, type: 'column', name: '荧幕数', color: '#F08E2D' });
					Mix_pj.series.push({ data: echarts_data[i].people_halls, type: 'line', name: '单荧幕覆盖人口', color: '#3E8EF2' });
				}
			}
			
			var sum =data.sum;
			// data 处理
			data.data.forEach((item,index) =>{
				
				/* 票房占比  */
				item.total_zb = (Number(item.total_bo_s) / sum.total_bo_s * 100).toFixed(2)
				/* 排场占比 */
				item.session_zb = (Number(item.session_s) / sum.session_s * 100).toFixed(2)
				// 上座率
				item.occupancy = (Number(item.occupancy) *100 ).toFixed(2)
				/* 排座占比 */
				item.total_seats_zb = (Number(item.total_seats) / Number(sum.total_seats) * 100).toFixed(2) + '%'
				// 平均票价
				item.avg_price = Number(item.avg_price).toFixed(2)
				// 场均人次
				item.cj_people_s = (Number(item.total_people_s) / Number(item.session_s)).toFixed(0)
				/* 票房 */
				if (Number(item.total_bo_s) / 100000000 > 1) {
					item.total_bo_s = (Number(item.total_bo_s) / 100000000).toFixed(2) + '亿'
				}else{
					item.total_bo_s = (Number(item.total_bo_s) / 10000).toFixed(2) + '万'
				}
				
				
				
			})
			
			// 总票房   100000000
			if (Number(data.sum.total_bo_s) / 100000000 > 1) {
				data.sum.total_bo_s = (Number(data.sum.total_bo_s) / 100000000).toFixed(2) + '亿';

			} else {
				data.sum.total_bo_s = (Number(data.sum.total_bo_s) / 10000).toFixed(2) + '万';
			}
			// 总人次
			if (Number(data.sum.total_people_s) / 100000000 > 1) {
				data.sum.total_people_s = (Number(data.sum.total_people_s) / 100000000).toFixed(2) + '亿';
			} else {
				data.sum.total_people_s = (Number(data.sum.total_people_s) / 10000).toFixed(2) + '万';
			}
			// 总场次
			if (Number(data.sum.session_s) / 100000000 > 1) {
				data.sum.session_s = (Number(data.sum.session_s) / 100000000).toFixed(2) + '亿';
			} else {
				data.sum.session_s = (Number(data.sum.session_s) / 10000).toFixed(2) + '万';
			}
			_self.AllSum_data = data;
			_self.showMix('canvasMix', Mix);
			_self.showMix_pj('canvasMix_pj', Mix_pj);
			// right_data 覆盖人口
			// left_data 观影频次
		},
		// 中间tab 点击
		Choice_data_click(item, index) {
			var tab_one_index = this.tab_one_index;
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var url = '/topprogram/region-total?lat=' + latitude + '&lng=' + longitude;
			this.Choice_data_index = index;
			if (item == '三公里' || item == '一公里') {
				if (index == 3) {
					url += '&distance_meters=1000';
				} else if (index == 2) {
					url += '&distance_meters=3000';
				}
				this.db_index_one(url);
			} else {
				// 这个else 里是 人效分析和 区域票房通用
				if (tab_one_index == 1) {
					if (index == 0) {
						if (city.indexOf('市') != -1 || city.indexOf('省') != -1) {
							var a = city.indexOf('市');
							city = city.slice(0, a);
						}
						url = '/topprogram/region-people?distance_meters=city,' + city + '&lat=' + latitude + '&lng=' + longitude;
					} else {
						url = '/topprogram/region-people?distance_meters=county,' + district + '&lat=' + latitude + '&lng=' + longitude;
					}
					this.db_index_tow(url);
				} else {
					if (index == 0) {
						if (city.indexOf('市') != -1 || city.indexOf('省') != -1) {
							var a = city.indexOf('市');
							city = city.slice(0, a);
						}
						url += '&distance_meters=city,' + city;
					} else {
						url += '&distance_meters=county,' + district;
					}
					this.db_index_one(url);
				}
			}
		},
		// tab_one 接口调用
		async db_index_one(url) {
			console.log(url);
			let {data:res} = await this.$http.get({url})
			let echarts_data = res.echarts_data;
			let Mix = { categories: [], series: [] };
			let Mix_pj = { categories: [], series: [] };
			Mix_pj.categories = echarts_data.left_data.xAxis_data;
			Mix.categories = echarts_data.right_data.xAxis_data;
			// Mix.series.push()
			
			for (let i in echarts_data) {
				if (i == 'left_data') {
					Mix.series.push({ data: echarts_data[i].cinemas_data, type: 'column', name: '影院数', color: '#F08E2D' });
					Mix.series.push({ data: echarts_data[i].total_data, type: 'line', name: '总票房/亿', color: '#3E8EF2' });
				} else if (i == 'right_data') {
					Mix_pj.series.push({ data: echarts_data[i].people_data, type: 'column', name: '观影人次/万', color: '#F08E2D' });
					Mix_pj.series.push({ data: echarts_data[i].price_data, type: 'line', name: '平均票价/元', color: '#3E8EF2' });
				}
			}
			var sum =res.sum;
			// data 处理
			res.data.forEach((item,index) =>{
				
				/* 票房占比  */
				item.total_zb = (Number(item.total_bo_s) / sum.total_bo_s * 100).toFixed(2)
				/* 排场占比 */
				item.session_zb = (Number(item.session_s) / sum.session_s * 100).toFixed(2)
				// 上座率
				item.occupancy = (Number(item.occupancy) *100 ).toFixed(2)
				/* 排座占比 */
				item.total_seats_zb = (Number(item.total_seats) / Number(sum.total_seats) * 100).toFixed(2) + '%'
				// 平均票价
				item.avg_price = Number(item.avg_price).toFixed(2)
				// 场均人次
				item.cj_people_s = (Number(item.total_people_s) / Number(item.session_s)).toFixed(0)
				/* 票房 */
				if (Number(item.total_bo_s) / 100000000 > 1) {
					item.total_bo_s = (Number(item.total_bo_s) / 100000000).toFixed(2) + '亿'
				}else{
					item.total_bo_s = (Number(item.total_bo_s) / 10000).toFixed(2) + '万'
				}
				
				
				
			})
			
			// sum 处理
			
			// 总票房   100000000
			if (Number(res.sum.total_bo_s) / 100000000 > 1) {
				res.sum.total_bo_s = (Number(res.sum.total_bo_s) / 100000000).toFixed(2) + '亿';
			
			} else {
				res.sum.total_bo_s = (Number(res.sum.total_bo_s) / 10000).toFixed(2) + '万';
			}
			// 总人次
			if (Number(res.sum.total_people_s) / 100000000 > 1) {
				res.sum.total_people_s = (Number(res.sum.total_people_s) / 100000000).toFixed(2) + '亿';
			} else {
				res.sum.total_people_s = (Number(res.sum.total_people_s) / 10000).toFixed(2) + '万';
			}
			// 总场次
			if (Number(res.sum.session_s) / 100000000 > 1) {
				res.sum.session_s = (Number(res.sum.session_s) / 100000000).toFixed(2) + '亿';
			} else {
				res.sum.session_s = (Number(res.sum.session_s) / 10000).toFixed(2) + '万';
			}
			_self.AllSum_data = res;
			_self.showMix('canvasMix', Mix);
			_self.showMix_pj('canvasMix_pj', Mix_pj);
		},
		showMix(canvasId, chartData) {
			canvaMix = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'mix',
				fontSize: 11,
				padding: [5, 5, 0, 5],
				legend: {show:true},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true, //开启图表拖拽功能
				xAxis: {
					disableGrid: true,
					type: 'grid',
					gridType: 'dash',
					itemCount: 5,
					scrollShow: true,
					scrollAlign: 'left'
				},
				yAxis: {
					data:[
						{
							
							min: 0,
							max: 10,
							format: val => {
								return val.toFixed(0);
							}
						}
					],
					gridType: 'solid',
					splitNumber: 5,
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: false,
				dataPointShape: true,
				extra: {
					column: {
						width: 20 * _self.pixelRatio
					},
					tooltip: {
						bgColor: '#000000',
						bgOpacity: 0.7,
						gridType: 'dash',
						dashLength: 8,
						gridColor: '#1890ff',
						fontColor: '#FFFFFF',
						horizentalLine: true,
						xAxisLabel: true,
						yAxisLabel: true,
						labelBgColor: '#DFE8FF',
						labelBgOpacity: 0.95,
						labelAlign: 'left',
						labelFontColor: '#666666'
					}
				}
			});
		},
		touchMix(e) {
			canvaMix.scrollStart(e);
		},
		moveMix(e) {
			canvaMix.scroll(e);
		},
		touchEndMix(e) {
			var index = this.tab_one_index;
			canvaMix.scrollEnd(e);
			//下面是toolTip事件，如果滚动后不需要显示，可不填写
			canvaMix.showToolTip(e, {
				format: function(item, category) {
					if (item.name == '总票房/亿') {
						item.name = '总票房';
						item.data = item.data + '亿';
					} else {
						if (index != 1) {
							item.data = item.data + '个';
						}
					}
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		},
		//观影人次/ 票价票价
		showMix_pj(canvasId, chartData) {
			canvaMix_pj = new uCharts({
				$this: _self,
				canvasId: canvasId,
				type: 'mix',
				fontSize: 11,
				padding: [5, 5, 0, 5],
				legend: {show:true},
				background: '#FFFFFF',
				pixelRatio: _self.pixelRatio,
				categories: chartData.categories,
				series: chartData.series,
				animation: true,
				enableScroll: true, //开启图表拖拽功能
				xAxis: {
					disableGrid: true,
					type: 'grid',
					gridType: 'dash',
					itemCount: 5,
					scrollShow: true,
					scrollAlign: 'left'
				},
				yAxis: {
					gridType: 'solid',
					splitNumber: 5,
					min: 0,
					max: 10,
					format: val => {
						return val.toFixed(0);
					}
				},
				width: _self.cWidth * _self.pixelRatio,
				height: _self.cHeight * _self.pixelRatio,
				dataLabel: false,
				dataPointShape: true,
				extra: {
					column: {
						width: 20 * _self.pixelRatio
					},
					tooltip: {
						bgColor: '#000000',
						bgOpacity: 0.7,
						gridType: 'dash',
						dashLength: 8,
						gridColor: '#1890ff',
						fontColor: '#FFFFFF',
						horizentalLine: true,
						xAxisLabel: true,
						yAxisLabel: true,
						labelBgColor: '#DFE8FF',
						labelBgOpacity: 0.95,
						labelAlign: 'left',
						labelFontColor: '#666666'
					}
				}
			});
		},
		touchMix_pj(e) {
			canvaMix_pj.scrollStart(e);
		},
		moveMix_pj(e) {
			canvaMix_pj.scroll(e);
		},
		touchEndMix_pj(e) {
			canvaMix_pj.scrollEnd(e);
			var index = this.tab_one_index;
			//下面是toolTip事件，如果滚动后不需要显示，可不填写
			canvaMix_pj.showToolTip(e, {
				format: function(item, category) {
					if (index != 1) {
						if (item.name == '观影人次/万') {
							item.name = '观影人次';
							item.data = item.data + '万';
						} else {
							item.name = '平均票价';
							item.data = item.data + '元';
						}
					}
					return category + ' ' + item.name + ':' + item.data;
				}
			});
		},
		/* 观影人次 / 普及票价 */
		tab_one_tap(index) {
			this.tab_one_index = index;
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var canvas_one_Written_data =  ['影院数和总票房', '观影人次和平均票价']
			var canvas_one_Written_data_tow =  ['观影频次', '荧幕数和单荧幕覆盖人口']
			var url = '';
			if (index == 1) {
				url = '/topprogram/region-people?lat=' + latitude + '&lng=' + longitude + '&distance_meters=county,' + district;
				this.Choice_data_index = 1; // 几公里 哪里样式选择
				this.canvas_one_Written_data = canvas_one_Written_data_tow;
				this.db_index_tow(url);
			} else {
				url += '/topprogram/region-total?lat=' + latitude + '&lng=' + longitude;
				this.Choice_data_index = 2; // 几公里 哪里样式选择
				this.canvas_one_Written_data = canvas_one_Written_data;
				this.db_index_one(url);
			}
		},
		// // 顶部tab
		// heder_click(index) {
		// 	this.haeder_index = index;
		// }
	}
};
</script>
<style lang="less">
@import url('./index.less');
	//  底部
	.button {
		margin-top: 12upx;
		background-color: #fff;
		font-size: 24upx;
		.buttonH {
			// padding: 0 ;
			display: flex;
			justify-content: space-between;
			padding: 28upx 30upx;
			.buttonHone {
				font-size: 32upx;
			}
			.buttonHtow{
				display: flex;
				align-items: center;
				image {
					width: 	24upx;
					height: 24upx;
					margin-right: 10upx;
				}
			}
		}
		.buttonM {
			height: 80upx;
			display: flex;
			// justify-content: ;
			align-items: center;
			background-color: rgba(245, 245, 245, 1);
			padding: 0 0upx 0 30upx;
			view {
				// width: 185upx;
				width: 120upx;
				// text-align: center;
				// flex: 1;
				text-align: center;
	
				&:nth-child(1){
					// width: 
					// flex: 2;
					width: 224upx;	
					text-align: left;
				}
				// width: 20%;
				// border: 1px solid red;
				// font-size: 22upx;/
				// text-align: center/;
				// line-height: 80upx;
				// display: flex;
				// align-items: flex-end;
			}
		}
		.buttonB {
			height: 100upx;
			box-sizing: border-box;
			// border: 1px solid red ;
			display: flex;
			// justify-content: space-around;
			// line-height: 70upx;\
			padding: 17upx 17upx 0 30upx;
			.buttonB_Headerson {
				// line-height: 70upx;
				width: 240upx;
				.buttonB_Headersn1 {
					// line-height: 0;
					font-size: 24upx;
					margin-top: 6upx;
					color: rgba(155, 155, 155, 1);
				}
				.buttonB_Headerson_name{
					color: rgba(0, 0, 0, 1);
					font-size:26upx;
					// width:80upx;
					//  white-space:nowrap; text-overflow:ellipsis; -o-text-overflow:ellipsis; overflow:hidden;
				}
			}
			
			.buttonB_Headerson_pf{
				display: flex;
				font-size: 24upx;
				view{
					width: 120upx;
					text-align: center;
					box-sizing: border-box;
					margin-top: 25upx;
					color: rgba(0, 0, 0, 1);
					font-weight: 500;
				}
				}
		}
		.buttonB:nth-child(even) {
			background-color: rgba(245, 245, 245, 1);
		}
	}
.canvas_one {
	.canvas_one_Written {
		width: 750upx;
		display: flex;
		justify-content: center;

		padding-top: 23upx;
		padding-bottom: 40upx;
		font-size: 24upx;
		font-weight: 600;
		background-color: #fff;
	}
}
.charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
</style>
