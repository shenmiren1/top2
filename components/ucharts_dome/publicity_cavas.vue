<template>
	<!-- 营销数据 -->
	<view>
		<view class="footer">
			<view class="footer_name">
				<view>营销指数</view>
				<view @tap="time_data_click">{{yq_data}}
					<image src="../../static/big-plate/select.png" mode=""></image>
				</view>
			</view>
			<view class="qiun-charts"><canvas canvas-id="canvasRadar" id="canvasRadar" class="charts_yx" @touchstart="touchRadar"></canvas></view>
			<view class="zh_data zh_mg">营销指数</view>
			<view class="qiun-charts">
				<!---->
				<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" disable-scroll="true" @touchstart="touchLineA"
				 @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
			</view>
			<!-- 		<view class="zh_data">想看指数</view>
			<view class="xk_tab">
				<view @tap="xk_tab_tap(index)" v-for="(item, index) in xk_Data" :key="index" :class="[index == xk_tab_index ? 'active' : '']">{{ item }}</view>
			</view>
			<view class="qiun-charts">
				<canvas
					canvas-id="canvasLineA_xk"
					id="canvasLineA_xk"
					class="charts"
					disable-scroll="true"
					@touchstart="touchLineA_xk"
					@touchmove="moveLineA_xk"
					@touchend="touchEndLineA_xk"
				></canvas>
			</view> -->
			<!-- <view class="zh_data">视频物料</view>
			<view class="sp_data">
				<view @tap="sp_tab_tap(index)" v-for="(item, index) in sp_Data" :key="index" :class="[index == sp_tab_index ? 'active' : '']">{{ item }}</view>
			</view>
			<view class="qiun-charts">								
				<canvas canvas-id="canvasLineA_sp" id="canvasLineA_sp" class="charts" disable-scroll=true @touchstart="touchLineA_sp" @touchmove="moveLineA_sp" @touchend="touchEndLineA_sp"></canvas>
			</view> -->
			<view class="zh_data">百度指数</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA_bd" id="canvasLineA_bd" class="charts" disable-scroll=true @touchstart="touchLineA_bd"
				 @touchmove="moveLineA_bd" @touchend="touchEndLineA_bd"></canvas>
			</view>
			<view class="zh_data">微博指数</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA_wb" id="canvasLineA_wb" class="charts" disable-scroll=true @touchstart="touchLineA_wb"
				 @touchmove="moveLineA_wb" @touchend="touchEndLineA_wb"></canvas>
			</view>
			<view class="zh_data">微信数据</view>
			<view class="qiun-charts">
				<canvas canvas-id="canvasLineA_wx" id="canvasLineA_wx" class="charts" disable-scroll=true @touchstart="touchLineA_wx"
				 @touchmove="moveLineA_wx" @touchend="touchEndLineA_wx"></canvas>
			</view>
			<!-- <view class="zh_data">评分</view>
			<view class="qiun-charts">                                  
				<canvas canvas-id="canvasLineA_pf" id="canvasLineA_pf" class="charts" disable-scroll=true @touchstart="touchLineA_pf" @touchmove="moveLineA_pf" @touchend="touchEndLineA_pf"></canvas>
			</view> -->
		</view>



	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	import {
		isJSON
	} from '@/common/checker.js';

	var _self;
	var canvaRadar = null;
	var canvaLineA = null;
	var canvaLineA_xk = null;
	var canvaLineA_sp = null;
	var canvaLineA_bd = null;
	var canvaLineA_wb = null;
	var canvaLineA_wx = null;
	var canvaLineA_pf = null;
	/*
	 * getServerData 这个方法中存放了 雷达 和综合指数 的数据
	 * xk_index 这个方法中除了 除le 雷达 综合指数  其余的图表数据都在里边
	 * */
	export default {

		props: {
			name: {
				type: Object,
			},
			canvas_url: {
				type: Object
			}
		},
		data() {
			return {
				sp_tab_index: 0,
				sp_Data: ['腾讯', '优酷', '爱奇艺'], // 视频物料点击数据
				yq_data: '2019-10-10',
				// 影片详细数据
				// 想看指数
				xk_data: [], // 想看的所有数据 包括 日增（wantwatch） 累计（wantleiji）
				xk_Data: ['日增', '累计'],
				xk_tab_index: 0,
				cWidth_xk: '',
				cHeight_xk: '',
				// pixelRatio_xl:1,
				textarea_xk: '',
				// 想看指数
				// 综合指数
				cWidth_zh: '',
				cHeight_zh: '',
				// pixelRatio_zh:1,
				textarea_zh: '',
				// 综合指数
				// 雷达图
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				// 雷达图
				imageurl: 'https://p0.meituan.net/moviemachine/7b9b0725ab5feae642e1fbba9fbb90fe3702078.jpg@160w_220h_1e_1c' //背景图片
			}
		},
		created() {
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


			this.cWidth_xk = uni.upx2px(750);
			this.cHeight_xk = uni.upx2px(500);
			this.cWidth = uni.upx2px(750);
			this.cHeight = uni.upx2px(600);
			// z综合指数
			this.cWidth_zh = uni.upx2px(750);
			this.cHeight_zh = uni.upx2px(500);
			// 综合指数
			// 视频物料
			this.cWidth_sp = uni.upx2px(750);
			this.cHeight_sp = uni.upx2px(500);
			// this.getServerData_sp()
			// 视频物料
			// 百度指数
			this.cWidth_bd = uni.upx2px(750);
			this.cHeight_bd = uni.upx2px(500);
			// 百度指数
			// 微博指数
			this.cWidth_wb = uni.upx2px(750);
			this.cHeight_wb = uni.upx2px(500);
			// 微博指数
			// 卫星数据
			this.cWidth_wx = uni.upx2px(750);
			this.cHeight_wx = uni.upx2px(500);
			// 微信数据
		},
		//  用来确定接受 id  
		watch: {
			yq_data() {
				this.$emit('rlData', this.yq_data)
			},
			canvas_url() {
				var canvas_url = this.canvas_url;
				console.log(canvas_url);
				this.getServerData(canvas_url, false)
			},
			name() {
				let {
					id,
					mid
				} = this.name;
				console.log(this.name);
				var all_data = {
					url:'/topprogram/get-con-situation',// 六边形 综合指数 数据
					data:{
						id:id,
						mid:mid
					}
				}
				this.getServerData(all_data, true);
				var url = '/topprogram/get-consensus';
				var All_data = {
					id:id,
					mid:mid
				}
				this.xk_index(url,All_data);
				// 触发时间修改外边日历内的日期

				return 'name_dy'
			}
		},
		methods: {

			// 点击开启日历
			time_data_click() {
				this.$emit('rl_click', true)
			},

			// 评分
			showLineA_pf(canvasId, chartData) {
				canvaLineA_pf = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {show:true},
					dataLabel: false,
					dataPointShape: true,
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
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 0,
						max: 10,
						format: (val) => {
							return val
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_wx * _self.pixelRatio,
					height: _self.cHeight_wx * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA_pf(e) {
				canvaLineA_pf.scrollStart(e);
			},
			moveLineA_pf(e) {
				canvaLineA_pf.scroll(e);
			},
			touchEndLineA_pf(e) {
				canvaLineA_pf.scrollEnd(e);
				canvaLineA_pf.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData_pf() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA_pf.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			},
			// 评分
			// 微信指数
			showLineA_wx(canvasId, chartData) {
				canvaLineA_wx = new uCharts({
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
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 0,
						max: 3000,
						format: (val) => {
							return val
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_wx * _self.pixelRatio,
					height: _self.cHeight_wx * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA_wx(e) {
				// console.log(1);
				canvaLineA_wx.scrollStart(e);
			},
			moveLineA_wx(e) {
				// console.log(2);
				canvaLineA_wx.scroll(e);
			},
			touchEndLineA_wx(e) {
				// console.log(3);
				canvaLineA_wx.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA_wx.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData_wx() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA_wx.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			},
			// 微信指数
			// 微博指数
			showLineA_wb(canvasId, chartData) {
				canvaLineA_wb = new uCharts({
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
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 10,
						max: 25000,
						format: (val) => {
							return val
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_wb * _self.pixelRatio,
					height: _self.cHeight_wb * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA_wb(e) {
				canvaLineA_wb.scrollStart(e);
			},
			moveLineA_wb(e) {
				canvaLineA_wb.scroll(e);
			},
			touchEndLineA_wb(e) {
				canvaLineA_wb.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA_wb.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData_wb() {
				if (isJSON(_self.textarea)) {
					let newdata = JSON.parse(_self.textarea);
					canvaLineA_wb.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			},
			// 微博指数
			// 百度指数
			showLineA_bd(canvasId, chartData) {
				canvaLineA_bd = new uCharts({
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
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 10,
						max: 25000,
						format: (val) => {
							return val
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_bd * _self.pixelRatio,
					height: _self.cHeight_bd * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA_bd(e) {
				canvaLineA_bd.scrollStart(e);
			},
			moveLineA_bd(e) {
				canvaLineA_bd.scroll(e);
			},
			touchEndLineA_bd(e) {
				canvaLineA_bd.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA_bd.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			// 百度指数
			// 视频物料
			showLineA_sp(canvasId, chartData) {
				canvaLineA_sp = new uCharts({
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
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right',
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 0,
						max: 15000,
						format: (val) => {
							// .toFixed(0)+'元'
							return val
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_sp * _self.pixelRatio,
					height: _self.cHeight_sp * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					},
				});

			},
			touchLineA_sp(e) {
				canvaLineA_sp.scrollStart(e);
			},
			moveLineA_sp(e) {
				canvaLineA_sp.scroll(e);
			},
			touchEndLineA_sp(e) {
				canvaLineA_sp.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA_sp.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData_sp() {
				if (isJSON(_self.textarea_sp)) {
					let newdata = JSON.parse(_self.textarea_sp);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					})
				}
			},
			// 点击切换数据
			sp_tab_tap(index) {
				var data = this.sp_Alldata;
				var name = ''; // 当前是什么数据
				var Dnaem = ''; // 取那一个字段
				if (index == 0) {
					name = '腾讯'
					Dnaem = 'qq_playCount'
				} else if (index == 1) {
					name = '优酷'
					Dnaem = 'youku_playCount'
				} else {
					name = '爱奇艺'
					Dnaem = 'iqiyi_playCount'
				}
				let LineA_sp = {
					categories: [],
					series: [{
						data: []
					}]
				};
				data.x.forEach(item => {
					item = item.slice(5)
					LineA_sp.categories.push(item)
				})
				data[Dnaem].forEach(item => {
					if (item == 'null' || item == null) {
						LineA_sp.series[0].data.push(0)
					} else {
						LineA_sp.series[0].data.push(item)
					}
				})
				// var data_xk1 = [];
				LineA_sp.series[0].color = '#F08E2D';
				LineA_sp.series[0].name = name;

				_self.showLineA_sp("canvasLineA_sp", LineA_sp); // 视频物料接口调用
				this.sp_tab_index = index; // 切换样式
			},
			// 视频物料
			// 想看指数
			// 图标函数/
			showLineA_xk(canvasId, chartData) {
				canvaLineA_xk = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					fontSize: 11,
					legend: {show:true},
					dataLabel: false,
					dataPointShape: true,
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
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right'
						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 0,
						max: 100,
						format: val => {
							// let a =val - (val / 10);
							// let b = a / 99
							// console.log(b);
							// console.log(a);
							// val = a +b
							return val;
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_xk * _self.pixelRatio,
					height: _self.cHeight_xk * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight'
						}
					}
				});
			},
			touchLineA_xk(e) {
				canvaLineA_xk.scrollStart(e);
			},
			moveLineA_xk(e) {
				canvaLineA_xk.scroll(e);
			},
			touchEndLineA_xk(e) {
				canvaLineA_xk.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA_xk.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data;
					}
				});
			},
			changeData_xk() {
				if (isJSON(_self.textarea_xk)) {
					let newdata = JSON.parse(_self.textarea_xk);
					canvaLineA_xk.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					});
				}
			},
			//图标函数
			// 点击切换 日增还是累计
			xk_tab_tap(index) {
				this.xk_tab_index = index;
				var xk_data = this.xk_data;
				var name = '';
				if (index == 0) {
					name = 'wantwatch';
				} else {
					name = 'wantleiji';
				}
				let LineA = {
					categories: [],
					series: [{
						data: []
					}, {
						data: []
					}, {
						data: []
					}]
				};
				var data1 = [];
				var data2 = [];
				var data3 = [];
				xk_data[name].x.forEach(item => {
					item = item.slice(5);
					LineA.categories.push(item);
				});
				console.log(index);
				console.log(xk_data[name]);
				if (index == 0) {
					xk_data[name].douban_wantwatch_up.forEach(item => {
						if (item == 'null' || item == null) {
							data1.push(0);
						} else {
							data1.push(item);
						}
					});
					xk_data[name].maoyan_wantwatch_up.forEach(item => {
						if (item == 'null' || item == null) {
							data2.push(0);
						} else {
							data2.push(item);
						}
					});
					xk_data[name].tpp_wantwatch_up.forEach(item => {
						if (item == 'null' || item == null) {
							data3.push(0);
						} else {
							data3.push(item);
						}
					});
				} else {
					xk_data[name].douban_wantwatch_leiji.forEach(item => {
						if (item == 'null' || item == null) {
							data1.push(0);
						} else {
							data1.push(item);
						}
					});

					xk_data[name].maoyan_wantwatch_leiji.forEach(item => {
						if (item == 'null' || item == null) {
							data2.push(0);
						} else {
							data2.push(item);
						}
					});

					xk_data[name].tpp_wantwatch_leiji.forEach(item => {
						if (item == 'null' || item == null) {
							data3.push(0);
						} else {
							data3.push(item);
						}
					});
				}

				LineA.series[0]['data'] = data1;
				LineA.series[1]['data'] = data2;
				LineA.series[2]['data'] = data3;
				LineA.series[0].color = '#F08E2D';
				LineA.series[0].name = '豆瓣想看';
				LineA.series[1].color = '#3E8EF2';
				LineA.series[1].name = '猫眼想看';
				LineA.series[2].color = '#2CC6FF';
				LineA.series[2].name = '淘票票想看';
				// LineA.series[0] =
				// _self.textarea = JSON.stringify(res.data.data.LineA);
				console.log(LineA);
				_self.showLineA_xk('canvasLineA_xk', LineA);
			},
			// 接口调用
			async xk_index(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:ra}  = await this.$http.get({
					url,
					data:All_data
				})
				let res = ra.data;
				let xk_data = {
					wantwatch: {},
					wantleiji: {}
				};
				xk_data['wantwatch'] = res.wantwatch; // 想看指数日增数据
				xk_data['wantleiji'] = res.wantleiji; // 想看指数累计数据
				// console.log(xk_data);
				// 想看数据处理
				let LineA = {
					categories: [],
					series: [{
						data: []
					}, {
						data: []
					}, {
						data: []
					}]
				};
				xk_data.wantwatch.x.forEach(item => {
					item = item.slice(5);
					LineA.categories.push(item);
				});
				var data1 = [];
				var data2 = [];
				var data3 = [];
				xk_data.wantwatch.douban_wantwatch_up.forEach(item => {
				
					if (item == 'null' || item == null) {
						data1.push(0);
					} else {
						data1.push(item);
					}
				});
				xk_data.wantwatch.maoyan_wantwatch_up.forEach(item => {
					if (item == 'null' || item == null) {
						data2.push(0);
					} else {
						data2.push(item);
					}
				});
				xk_data.wantwatch.tpp_wantwatch_up.forEach(item => {
					if (item == 'null' || item == null) {
						data3.push(0);
					} else {
						data3.push(item);
					}
				});
				LineA.series[0]['data'] = data1;
				LineA.series[1]['data'] = data2;
				LineA.series[2]['data'] = data3;
				LineA.series[0].color = '#F08E2D';
				LineA.series[0].name = '豆瓣想看';
				LineA.series[1].color = '#3E8EF2';
				LineA.series[1].name = '猫眼想看';
				LineA.series[2].color = '#2CC6FF';
				LineA.series[2].name = '淘票票想看';
				// 想看数据处理
				
				
				//  视频物料
				console.log(res.videoinfos);
				let LineA_sp = {
					categories: [],
					series: [{
						data: []
					}]
				};
				res.videoinfos.x.forEach(item => {
					item = item.slice(5)
					LineA_sp.categories.push(item)
				})
				res.videoinfos.qq_playCount.forEach(item => {
					// console.log(item == 'null' || item == null)
					if (item == 'null' || item == null) {
						LineA_sp.series[0].data.push(0)
					} else {
						LineA_sp.series[0].data.push(item)
					}
				})
				LineA_sp.series[0].color = '#F08E2D';
				LineA_sp.series[0].name = '腾讯'
				
				//  视频物料
				
				// 百度指数 
				let LineA_bd = {
					categories: [],
					series: [{
						data: []
					}]
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				res.baidukw.x.forEach(item => {
					item = item.slice(5)
					LineA_bd.categories.push(item)
				})
				res.baidukw.value.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_bd.series[0].data.push(0)
					} else {
						LineA_bd.series[0].data.push(item)
					}
				})
				// LineA.series=res.data.data.LineA.series;
				LineA_bd.series[0].color = '#F08E2D';
				LineA_bd.series[0].name = '百度指数';
				// LineA_bd.series[0].data = res.baidukw.value;
				// 百度指数
				
				// 微博指数
				// console.log(res.weibokw	)
				let LineA_wb = {
					categories: [],
					series: [{
						data: []
					}]
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				
				res.weibokw.x.forEach(item => {
					item = item.slice(5)
					LineA_wb.categories.push(item)
				})
				res.weibokw.value.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_wb.series[0].data.push(0)
					} else {
						LineA_wb.series[0].data.push(item)
					}
				})
				LineA_wb.series[0].color = '#F08E2D';
				LineA_wb.series[0].name = '微博指数';
				// LineA_wb.series[0].data = res.weibokw.value;
				// console.log(LineA_wb);
				// 微博指数
				
				
				// 微信指数
				console.log(res);
				let LineA_wx = {
					categories: [],
					series: [{
						data: []
					}]
				};
				res.weixindata.x.forEach(item => {
					item = item.slice(5)
					LineA_wx.categories.push(item)
				})
				res.weixindata.weixin_index.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_wx.series[0].data.push(0)
					} else {
						LineA_wx.series[0].data.push(item)
					}
				})
				LineA_wx.series[0].color = '#F08E2D';
				LineA_wx.series[0].name = '微博指数';
				// LineA_wx.series[0].data = res.weixindata.weixin_num;
				// 微信指数
				
				
				// 评分 
				// console.log(res.maoyanScores);
				let LineA_pf = {
					categories: [],
					series: [{
						data: []
					}, {
						data: []
					}, {
						data: []
					}]
				};
				res.maoyanScores.x.forEach(item => {
					item = item.slice(5)
					LineA_pf.categories.push(item)
				})
				
				res.maoyanScores.douban_score.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_pf.series[0].data.push(0)
					} else {
						LineA_pf.series[0].data.push(item)
					}
				})
				LineA_pf.series[0].color = '#F08E2D';
				LineA_pf.series[0].name = '豆瓣评分';
				// LineA_pf.series[0].data = res.maoyanScores.douban_score;
				
				res.maoyanScores.maoyan_score.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_pf.series[1].data.push(0)
					} else {
						LineA_pf.series[1].data.push(item)
					}
				})
				LineA_pf.series[1].color = '#3E8EF2';
				LineA_pf.series[1].name = '猫眼评分';
				// LineA_pf.series[1].data = res.maoyanScores.maoyan_score;
				
				res.maoyanScores.tpp_score.forEach(item => {
					if (item == 'null' || item == null) {
						LineA_pf.series[2].data.push(0)
					} else {
						LineA_pf.series[2].data.push(item)
					}
				})
				LineA_pf.series[2].color = '#2CC6FF';
				LineA_pf.series[2].name = '淘票票评分';
				// LineA_pf.series[2].data = res.maoyanScores.tpp_score;
				// console.log(LineA_pf);
				// 评分
				_self.showLineA_pf("canvasLineA_pf", LineA_pf); //评分接口调用
				_self.showLineA_wx("canvasLineA_wx", LineA_wx); //微信接口调用
				_self.showLineA_wb("canvasLineA_wb", LineA_wb); // 微博接口调用
				_self.showLineA_bd("canvasLineA_bd", LineA_bd); // 百度接口调用
				_self.showLineA_sp("canvasLineA_sp", LineA_sp); // 视频物料接口调用
				_self.showLineA_xk('canvasLineA_xk', LineA); // 想看接口调用
				this.xk_data = xk_data; //想看数据保存 
				this.sp_Alldata = res.videoinfos; // 视频物料数据保存
			},
			// 想看指数
			// 综合指数
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
						disableGrid: true,
						type: 'grid',
						gridType: 'dash',
						itemCount: 6, //可不填写，配合enableScroll图表拖拽功能使用，x轴单屏显示数据的数量，默认为5个
						scrollShow: true, //新增是否显示滚动条，默认false
						scrollAlign: 'right'

						//scrollBackgroundColor:'#F7F7FF',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条背景颜色,默认为 #EFEBEF
						//scrollColor:'#DEE7F7',//可不填写，配合enableScroll图表拖拽功能使用，X轴滚动条颜色,默认为 #A6A6A6
					},
					yAxis: {
						//disabled:true
						gridType: 'solid',
						splitNumber: 5,
						min: 0,
						max: 10,
						format: val => {
							return val;
						} //如不写此方法，Y轴刻度默认保留两位小数
					},
					width: _self.cWidth_zh * _self.pixelRatio,
					height: _self.cHeight_zh * _self.pixelRatio,
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
				canvaLineA.scrollEnd(e);
				//下面是toolTip事件，如果滚动后不需要显示，可不填写
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			changeData_zh() {
				if (isJSON(_self.textarea_zh)) {
					let newdata = JSON.parse(_self.textarea_zh);
					canvaLineA.updateData({
						series: newdata.series,
						categories: newdata.categories,
						scrollPosition: 'right',
						animation: false
					});
				} else {
					uni.showToast({
						title: '数据格式错误',
						image: '../../../static/images/alert-warning.png'
					});
				}
			},
			// 综合指数
			async getServerData(All_data_url, Br) {
				let userType  = await this.detection_validity()
				console.log(All_data_url);
				All_data_url.data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					...All_data_url
				})
				if (res.msg == '没找到影片数据') {
					uni.showToast({
						title: '超出选择',
						duration: 2000,
						icon: 'none'
					})
					return false
				}
				let Radar = {
					categories: [],
					series: [],
					numNbr: []
				};
				let obj = {};
				let data = [];
				
				Radar.categories = ['百度数据', '微信数据', '微博数据', '想看指数', '视频物料', '评分'];
				for (let i in res.data) {
					if (!(i == 'mid') && !(i == 'date') && !(i == 'zz_name') && !(i == 'zonghe_kw')) {
						// console.log(i);
						if (res.data[i] == null) {
							data.push(0);
							console.log(i)
						} else {
							data.push(Number(res.data[i]));
						}
					}
				}
				Radar.numNbr = data;
				obj['data'] = data;
				obj['color'] = '#F08E2D';
				obj['name'] = '';
				// obj['type'] = 'radar';
				Radar.series[0] = obj;
				// console.log(Radar);
				
				//综合指数
				let LineA = {
					categories: [],
					series: [{
						data: []
					}]
				};
				//这里我后台返回的是数组，所以用等于，如果您后台返回的是单条数据，需要push进去
				// console.log(res);
				res.data.zonghe_kw.x.forEach(item => {
					item = item.slice(5);
					LineA.categories.push(item);
				});
				res.data.zonghe_kw.value.forEach((item, index) => {
					LineA.series[0].data.push(item);
				});
				LineA.series[0].color = '#F08E2D';
				LineA.series[0].name = '数营指数';
				// console.log(LineA);
				this.yq_data = res.data.date;
				if (Br) {
					_self.showLineA('canvasLineA', LineA);
				}
				
				//综合指数
				
				_self.showRadar('canvasRadar', Radar);
			},
			showRadar(canvasId, chartData) {
				// console.log(chartData)
				canvaRadar = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'radar',
					fontSize: 11,
					legend: {show:false},
					background: '#FFFFFF',
					pixelRatio: _self.pixelRatio,
					animation: true,
					dataLabel: true,
					categories: chartData.categories,
					series: chartData.series,
					numNbr: chartData.numNbr, // 自己添加参数 加样式
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						radar: {
							max: 10 //雷达数值的最大值
						}
					}
				});
			},
			touchRadar(e) {
				// canvaRadar.showToolTip(e, {
				// 	format: function(item) {
				// 		// return 111
				// 		return item.name + ':' + item.data;
				// 	}
				// });
			},
		}
	}
</script>

<style lang="less">
	// 日历
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





	.footer {
		background-color: #fff;
		margin-top: 10upx;
		// 视频物料

		.sp_data {
			display: flex;
			font-size: 20upx;
			text-align: center;

			view {
				width: 100upx;
				height: 40upx;
				line-height: 40upx;
				border: 1px solid #B7B7B7;
				color: #B7B7B7;
				margin-left: 120upx;

				&:nth-child(2) {
					margin-left: 10upx;
				}

				&:nth-child(3) {
					margin-left: 10upx;
				}
			}

			.active {
				color: #F08E2D;
				border: 1px solid #F08E2D;
			}
		}

		// 视频物料

		.zh_data {
			font-size: 34Upx;
			font-family: PingFangSC-Semibold;
			font-weight: 600;
			color: rgba(0, 0, 0, 1);
			margin: 50upx 0 24upx 50upx;
		}

		.zh_mg {
			margin: 120upx 0 24upx 50upx;
		}

		.xk_tab {
			display: flex;
			font-size: 20upx;
			text-align: center;

			view {
				width: 100upx;
				height: 40upx;
				line-height: 40upx;
				border: 1px solid #B7B7B7;
				color: #B7B7B7;
				margin-left: 120upx;

				&:nth-child(2) {
					margin-left: 10upx;
				}
			}

			.active {
				color: #F08E2D;
				border: 1px solid #F08E2D;
			}

		}

		.footer_name {
			display: flex;
			justify-content: space-between;
			padding: 0 50upx;
			padding-top: 30upx;
			align-items: center;

			view:nth-child(1) {
				font-size: 34upx;
				font-family: PingFangSC-Semibold;
				font-weight: 600;
				color: rgba(240, 142, 45, 1);

			}

			view:nth-child(2) {
				width: 190upx;
				height: 40upx;
				background: rgba(216, 216, 216, 1);
				border: 1px solid rgba(151, 151, 151, 1);
				box-sizing: border-box;

				font-size: 24upx;
				font-family: PingFangSC-Regular;
				font-weight: 400;
				color: rgba(74, 74, 74, 1);
				padding-left: 16upx;
				display: flex;
				justify-content: center;
				align-items: center;

				image {
					width: 15upx;
					height: 8upx;
					// margin-left: 9upx;
					padding-left: 10upx;
					padding-right: 10upx;
				}
			}
		}

	}







	.button_fh {
		position: relative;
		top: 100px;
		right: 0;
	}

	.qiun-charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}

	.charts_yx {
		width: 750upx;
		height: 600upx;
		background-color: #ffffff;
	}

	.charts {
		width: 750upx;
		height: 500upx;
		background-color: #ffffff;
	}
</style>
