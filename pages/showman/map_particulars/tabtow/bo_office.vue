<template>
	<view >
		

		<!-- tabone -->
		<view class="tabone" :hidden="!(header_index == 0)">
			<view class="titte">
				<view class="titte_header" @tap="()=>{this.time_tab_Br = true}">
					{{data_time}}
					<image src="../../../../static/big-plate/xia.png" mode=""></image>
					<!-- {{}} -->
				</view>
				<view class="centent">
					<view class="centent_data">
						<view>总票房</view>
						<view>{{ All_data.sum.total_bo_s }}</view>
					</view>
					<view class="centent_data">
						<view>总人次</view>
						<view>{{ All_data.sum.total_people_s }}</view>
					</view>
					<view class="centent_data">
						<view>总场次</view>
						<view>{{ All_data.sum.session_s }}</view>
					</view>
				</view>
			</view>

			<!-- 中间tab -->
			<view class="Choice_data">
				<view @tap="Choice_data_click(item, index)" :class="[index == Choice_data_index ? 'active' : '']" v-for="(item, index) in Choice_data" :key="index">
					{{ item }}
				</view>
			</view>

			<view class="button">
				<view class="buttonH">
					<view class="buttonHone">影院明细</view>
					<view class="buttonHtow" @tap="show_index">
						<!-- <text></text> -->
						<image src="../../../../static/home/more.png" mode=""></image>
						更多指标
					</view>
				</view>
				<view class="buttonM">
					<view>影院名称</view>
					<!-- <view></view> -->
					<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row">{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
				</view>
				<!-- @tap="nagitto(it.movie_id_r, it.zz_id)" -->
				<view class="buttonB"  v-for="(it,index) in All_data.data" :key="index">
					<view class="buttonB_Headerson">
						<view class="buttonB_Headerson_name">{{ it.cinema_name }}</view>

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
			
		</view>
		<!-- tabbone -->
		
		
		<!-- 日历 -->
		<view class="ei_calendar_cla" :hidden="!time_tab_Br">
			<view class="cha" @tap="()=>{this.time_tab_Br = false}">
				×
			</view>
			<ei-calendar
				@click="ei_calendar_tap"
				:visible="time_tab_Br"
				ref="calendar"
				:drawer="false"
				:disabledDate="disabledDate"
				v-model="date"
				:custom-date="customDate"
				format="YYYY-MM-DD"
			></ei-calendar>
		</view>
		<!-- 日历 -->
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

import moment from '@/components/moment';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
export default {
	props: {
		// res: {
		// 	value: Object
		// }
	},
	components:{
		EiCalendar
	},
	computed: {
		...mapState({
			res:'map_particulars_res',
			
			header_index:'map_particulars_tabtow_header_index'
		})
	},
	watch: {
		header_index() {
			if (this.header_index == 0) {
				console.log('header_index');
				var res = this.res;
				
				let { city, district, latitude, longitude } = res;
				var Choice_data = [...this.Choice_data];
				Choice_data[0] = city;
				Choice_data[1] = district;
				this.Choice_data = Choice_data;
				var url = '/topprogram/compete-total?lan=' + latitude + '&lng=' + longitude;
				// 初始化日历
				var a = new Date();
				var time =  moment(a).format('YYYY-MM-DD')
				var date = [];
				date[0] = new Date(time);
				console.log(date);
				this.date = date;
				this.data_time = moment(new Date).format('YYYY-MM-DD')
				this.db_index_one(url);
			}
		}
	},
	data() {
		return {
			data_time:'', // 页面显示时间和请求时间
			customDate:[],
			date:[],
			time_tab_Br:false,
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
			All_data: {},
			Choice_data_index: 0,
			Choice_data: ['--', '--', '三公里', '一公里'],
			
		};
	},
	methods: {
		// 日历点击事件
		ei_calendar_tap(e){
			var time = e.format.split('/')
			time = time[0] + '-' + time[1] +'-' + time[2] 
			var index = this.Choice_data_index;
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var url = '/topprogram/compete-total?lan=' + latitude + '&lng=' + longitude;
			
			if (index == 0) {
				if (city.indexOf('市') != -1 || city.indexOf('省') != -1) {
					var a = city.indexOf('市');
					city = city.slice(0, a);
				}
				url += '&distance_meters=city,' + city;
			} else if (index == 1) {
				url += '&distance_meters=county,' + district;
			} else {
				if (index == 2) {
					url += '&distance_meters=3000' 
				} else if (index == 3) {
					url += '&distance_meters=1000' 
				}
			} 
			url += '&bdate=' + time;
			this.date = [new Date(time)]
			this.data_time  = time;
			this.db_index_one(url);
			this.time_tab_Br  = false;
			
		},
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
		// tanone 跟多指标
		show_index() {
			this.is_index = false;
		},
		// 中间部分选择
		Choice_data_click(item, index) {
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			var time = this.data_time
			var url = '/topprogram/compete-total?lan=' + latitude + '&lng=' + longitude + '&bdate=' + time;

			if (index == 2) {
				item = 3000;
			} else if (index == 3) {
				item = 1000;
			}

			if (index == 0) {
				if (item.indexOf('市') != -1 || item.indexOf('省') != -1) {
					var a = item.indexOf('市');
					// console.log(a)
					item = item.slice(0, a);
				}
				url += '&distance_meters=city,' + item;
			} else if (index == 1) {
				url += '&distance_meters=county,' + item;
			} else {
				url += '&distance_meters=' + item;
			}
			console.log(url);
			this.db_index_one(url);
			this.Choice_data_index = index;
		},
		async db_index_one(url) {
			var { data } = await this.$http.get({ url });
			let { sum, data: res } = data;
			
			res.forEach((item,index) =>{
				// 票房占比
				item.total_zb = (Number(item.total_bo_s) / Number(sum.total_bo_s) * 100).toFixed(2)
				// 票房 万元
				item.total_bo_s  = (Number(item.total_bo_s) / 10000).toFixed(2)
				// 排场占比
				item.session_zb = (Number(item.session_s) / Number(sum.session_s) *100).toFixed(2)
				// 排座占比
				item.occupancy  =  (Number(item.occupancy) * 100 ).toFixed(2)
				// 平均票价
				item.avg_price = Number(item.avg_price).toFixed(2)
				// 场均人次
				item.cj_people_s = (Number(item.total_people_s) / Number(item.session_s)).toFixed(0)
				// 场次  session_ss
				// 人次  total_people_s
				/* 排座占比 */
				item.total_seats_zb = (Number(item.total_seats) / Number(sum.total_seats) * 100).toFixed(2) + '%'
			})
			
			// 总票房
			if (Number(sum.total_bo_s) / 100000000 > 1) {
				sum.total_bo_s = (Number(sum.total_bo_s) / 100000000).toFixed(2) + '亿';
			} else {
				sum.total_bo_s = (Number(sum.total_bo_s) / 10000).toFixed(2) + '万';
			}
			// 总场次
			sum.session_s = (Number(sum.session_s) / 10000).toFixed(2) + '万';
			// 总人次
			if (Number(sum.total_people_s) / 100000000 > 1) {
				sum.total_people_s = (Number(sum.total_people_s) / 100000000).toFixed(2) + '亿';
			} else {
				sum.total_people_s = (Number(sum.total_people_s) / 10000).toFixed(2) + '万';
			}
			this.All_data = data;
			// console.log(data);
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
// @import url('../tabtow.less');
///* 日历 */
.ei_calendar_cla{
	width:750upx;
	height:100vh;
	background-color:#fff;
	position:fixed;
	top:0;
	.cha{
		width: 750upx;
		height: 20upx;
		display: flex;
		align-items: center;
		justify-content: flex-end;
		padding-right: 40upx;
		box-sizing: border-box;
	}
}


/* 日历 */


.tabone{
	
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
	
	
	.Choice_data{
		display: flex;
		view{
			width: 750 / 4upx;
			height: 80upx;
			display: flex;
			justify-content:  center;
			
			align-items: center;
			color: #4A4A4A;
			font-size: 28upx;
			background-color: #fff;
			margin-bottom: 10upx;
		}
		.active{
			color: #F08E2D !important;
		}
		.Choice_data_tow{
			width: 750 / 2upx;
			height: 80upx;
			display: flex;
			justify-content:  center;
			align-items: center;
			color: #4A4A4A;
			font-size: 28upx;
			background-color: #fff;
			margin-bottom: 10upx;
		}
	}
	.titte{
		margin-top:10upx;
		background-color:#FFFFFF;
		.titte_header{
			font-size:24upx;
			display: flex;
			justify-content: center;
			align-items: center;
			padding: 25upx 0 36upx 0;
			font-family:PingFangSC-Medium,PingFang SC;
			font-weight:500;
			color:rgba(74,74,74,1);
			image{
				width: 18upx;
				height: 15upx;
				padding-left: 6upx;
			}
		}
		.centent{
			display: flex;
			justify-content: space-between;
			// padding-bottom:
			padding:0 30upx 30upx 30upx;
			.centent_data{
				width: 212upx;
				height: 98upx;
				background-color: #F5F5F5;
				view{
					display: flex;
					justify-content: center;
					align-items: center;
					height: 98 / 2upx;
				}
				view:nth-child(1){
					font-size:22upx;
					font-family:PingFangSC-Regular,PingFang SC;
					font-weight:400;
					color:rgba(74,74,74,1);
				}
				view:nth-child(2){
					font-size:28upx;
					font-family:PingFangSC-Medium,PingFang SC;
					font-weight:500;
					color:rgba(240,142,45,1);
				}
			}
		}
	}
	
}
/* tabone */
</style>
