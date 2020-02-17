<template>
	<view class="page">
		<ei-calendar ref="calendar" :drawer="false" :visible.sync="show" @click="ei_calendar_tap" :disabledDate="disabledDate"
		 v-model="date" :custom-date="customDate" format="YYYY-MM-DD" @date-change="dateChange" :throttleBr="throttleBr" id="ei_calendar_id"></ei-calendar>

		<scroll-view :style="{ height: windowheight }" scroll-y :scroll-into-view="alpha">
			<view :id="item.id" class="Alldata" v-for="(item, index) in time_list" :key="index">
				<view class="dy_item">{{ item.alphabet }}</view>
				<view class="dy_xq" @tap="tz_click(it.mid,it.zz_id)" v-for="(it, inde) in item.datas" :key="inde">
					<image v-if="!(it.img == '../images/main/no_hb.png')" :src="it.img" mode=""></image>
					<image v-if="it.img == '../images/main/no_hb.png'" src="../../static/big-plate/available_poster.png" mode=""></image>
					<view class="All_n_yy">
						<view class="dy_name">
							<view class="">{{ it.zz_name }}</view>
							<view class="">{{ it.maoyan_wantwatch }} 人想看</view>
						</view>
						<view class="dy_dy">导演：{{ it.director_name }}</view>
						<view class="dy_zy">主演:{{ it.yy }}</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	import moment from '@/components/moment';
	export default {
		onShareAppMessage(){},
		components: {
			EiCalendar
		},
		created() {
			// c初始化 日历插件时间
			var data = new Date();
			data = moment().format('YYYY-MM-DD');
			var date = [];
			date[0] = new Date(data);
			this.date = date;
			// c初始化 日历插件时间
			var year = moment(new Date()).format('YYYY') - 0; //当前年;
			var month = moment(new Date()).format('MM') - 0; //当前月;
			var this_day = moment().format('YYYY-MM-DD');
			if (month < 10) {
				month = '0' + month;
			}

			var time = year + '-' + month;
			// console.log(time);
			var url = '/topprogram/get-movieinfo';
			let All_data = {
				yearmonth:time ,
				width:75,
				height:120
			}
			this.check_month(url, this,All_data);
		},
		onLoad() {
			// console.log(this.windowheight);
			// 节假日接口

			const query = uni.createSelectorQuery().in(this);
			query
				.select('#ei_calendar_id')
				.boundingClientRect(data => {
					var res = wx.getSystemInfoSync();
					this.pixelRatio = res.pixelRatio;
					//
					this.windowheight = res.windowHeight - 0 - data.height + 'px';
					// console.log("得到布局位置信息" + JSON.stringify(data));
					// console.log("节点离页面顶部的距离为" + data.height);
				})
				.exec();
		},
		data() {
			return {
				e: '',
				year: '',
				y: '',
				url: '',
				throttleBr: false,
				windowheight: '',
				time_list: [], // 列表数据
				alpha: '', // 跳转凭证
				one_in: '0',
				show: true,
				date: [],
				customDate: [{
					cellClass: 'custom-cell',
					date: '2019-08-20',
					top: [{
						class: 'custom-cell-top-1',
						text: '情人节'
					}],
					bottom: [{
						class: 'custom-cell-top',
						text: '12部'
					}]
				}]
			};
		},
		methods: {
			tz_click(id,mid){
				// id 专资id
				// mid 我们的id
				// console.log(mid);
				// console.log(id);
				console.log(this.time_list);
				uni.navigateTo({
					url: '../dy_particulars/dy_particulars?id=' + mid + '&mid=' + id
				});
				
			},
			dateChange(e) {
				var arr = e.split('/');
				console.log(arr);
				var year = arr[0];
				var month = arr[1];
				// var year = moment(new Date(e)).format('YYYY') ; //当前年;
				// var month = moment(new Date(e)).format('MM') ; //当前选择的月;
				var time = year + '-' + month;
				var url = '/topprogram/get-movieinfo';
				let All_data = {
					yearmonth:time,
					width:75,
					height:120
				}
				this.url = url;
				this.year = year;
				this.y = month;
				this.e = e;
				this.check_month(url, this,All_data);
			},
			// 点击事件
			ei_calendar_tap(e) {
				console.log(e.format);
				var year = e.year;
				var month = e.month + '';
				var day = e.day + '';
				if (month.length < 2) {
					month = '0' + month;
				}
				if (day.length < 2) {
					day = '0' + day;
				}
				this.alpha = `A${year}-${month}-${day}`;
				// console.log(year,month,day);
				console.log(this.alpha);
			},
			check_month: async function(url, that,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				// return ''
				var one_in = that.one_in;
				var time_list = [];
				var day_style = [];
				var mr_day = '';
				var now_day = moment().format('DD'); //今天
				var now_all = moment().format('YYYY-MM'); //当前年月
				var mr_show = ''; //默认展示的日期
				var day_arr = []; //比今天大的日期
				var day_all = []; //所有的日期
				for (var i in res.date_data) {
					var arr = i.split('-');
					var day = arr[2];
					day_style.push({
						cellClass: 'custom-cell',
						date: i,
				
						bottom: [{
							class: 'custom-cell-top',
							text: res.date_data[i].movieNums + '部'
						}]
					});
				
					day_all.push(day);
				
					if (one_in == 0) {
						if (now_day <= day) {
							day_arr.push(day);
						}
						//  如果没有比今天日期大的上映日期
						if (day_arr.length == 0) {
							var last = day_all.pop();
							mr_show = 'A' + now_all + '-' + last;
						} else if (day_arr.length >= 1) {
							mr_show = 'A' + now_all + '-' + day_arr[0];
						}
					} else {
						now_all = res.params.yearmonth;
						mr_show = 'A' + now_all + '-' + day_all[0];
					}
				}
				for (var i in res.schedule) {
					var data_item = res.schedule[i].sameday;
					day_style.forEach(item => {
						var date = item.date;
				
						if (data_item == date) {
							item['top'] = [{
								class: 'custom-cell-top-1',
								text: res.schedule[i].name
							}];
						} else {
							day_style.push({
								top: [{
									class: 'custom-cell-top-1',
									text: res.schedule[i].name
								}]
							});
						}
					});
				}
				var list = [];
				var list_two = [];
				var cinema_list = [];
				var cinema_two = [];
				for (var i in res.data) {
					var arr = i.split('-');
				
					var yy = '';
					var img = '';
				
					for (var j in res.data[i]) {
						if (res.data[i][j].img.length < 1) {
							img = '../images/main/no_hb.png';
						} else {
							if (res.data[i][j].img[res.data[i][j].mid] !== '') {
								img = 'https://db.topcdb.com' + res.data[i][j].img[res.data[i][j].mid];
							} else {
								img = '../images/main/no_hb.png';
							}
						}
						if (res.data[i][j].performer.length == 1) {
							yy = res.data[i][j].performer[0].name;
						} else if (res.data[i][j].performer.length == 2) {
							yy = res.data[i][j].performer[0].name + ',' + res.data[i][j].performer[1].name;
						} else if (res.data[i][j].performer.length == 3) {
							yy = res.data[i][j].performer[0].name + ',' + res.data[i][j].performer[1].name + ',' + res.data[i][j].performer[
								2].name;
						} else if (res.data[i][j].performer.length == 0) {
							yy = '';
						} else if (res.data[i][j].performer.length == 4) {
							yy =
								res.data[i][j].performer[0].name +
								',' +
								res.data[i][j].performer[1].name +
								',' +
								res.data[i][j].performer[2].name +
								',' +
								res.data[i][j].performer[3].name;
						} else if (res.data[i][j].performer.length == 5) {
							yy =
								res.data[i][j].performer[0].name +
								',' +
								res.data[i][j].performer[1].name +
								',' +
								res.data[i][j].performer[2].name +
								',' +
								res.data[i][j].performer[3].name +
								',' +
								res.data[i][j].performer[4].name;
						}
				
						var maoyan_score = '';
						if (res.data[i][j].maoyan_score == 0) {
							maoyan_score = '暂无';
						} else {
							maoyan_score = (res.data[i][j].maoyan_score - 0).toFixed(1);
						}
						res.data[i][j].maoyan_score = maoyan_score;
				
						res.data[i][j].img = img;
						if (yy == '') {
							res.data[i][j].yy = ' ';
						} else {
							// console.log(res.data[i][j].yy)
							res.data[i][j].yy = yy.slice(0, 19) + ' ' + '等';
						}
						// console.log(res.data[i][j].director_name == null)
						if (res.data[i][j].director_name == null) {
							res.data[i][j].director_name = ' ';
						} else {
							res.data[i][j].director_name = res.data[i][j].director_name;
						}
					}
					list.push({
						alphabet: arr[0] + '年' + arr[1] + '月' + arr[2] + '日',
						alphabet_data: arr[0] + '-' + arr[1] + '-' + arr[2],
						id: 'A' + i,
						datas: res.data[i]
					});
				}
				this.customDate = day_style;
				
				
				this.time_list = list; //
				this.alpha = mr_show;
				// this.throttleBr = false;
				this.$refs.calendar.refresh();
			},
			disabledDate(date) {
				const start = new Date('2019/5/10').getTime();
				const end = new Date('2019/7/21').getTime();
				return date.getTime() <= start || date.getTime() >= end;
			}
		}
	};
</script>

<style lang="less">
	scroll-view {
		height: 509upx;
		width: 100%;
	}

	.Alldata {
		.dy_item {
			font-size: 24upx;
			font-family: PingFangSC-Regular;
			padding-left: 30upx;
			font-weight: 400;
			color: rgba(51, 51, 51, 1);
		}

		.dy_xq {
			background-color: #fff;
			display: flex;
			padding: 30upx 35upx 30upx 30upx;

			image {
				width: 114upx;
				height: 162upx;
			}

			.All_n_yy {
				margin-left: 30upx;
				width: 78%;

				.dy_dy {
					margin-top: 56upx;
				}

				.dy_zy,
				.dy_dy {
					font-size: 24upx;
					font-family: PingFangSC-Regular;
					font-weight: 400;
					color: rgba(74, 74, 74, 1);
				}

				.dy_name {
					display: flex;
					justify-content: space-between;

					view:nth-child(1) {
						font-size: 28upx;
						font-family: PingFangSC-Medium;
						font-weight: 500;
						color: rgba(0, 0, 0, 1);
					}

					view:nth-child(2) {
						font-size: 28upx;
						font-family: PingFangSC-Semibold;
						font-weight: 600;
						color: rgba(240, 142, 45, 1);
					}
				}
			}
		}
	}

	.page {
		background: #f8f8f8;
		height: 100vh;
		font-size: 28upx;
	}

	.custom-cell-top {
		width: 100%;
		color: #f08e2d;
	}

	.custom-cell {
		color: #4cd964;
	}

	.custom-cell-top-1 {
		padding-right: 10upx;
		color: #f08e2d;
	}

	.custom-cell-top-2 {
		color: red;
	}
</style>
