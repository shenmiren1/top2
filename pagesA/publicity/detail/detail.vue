<template>
	<view>
		
			<!-- 显示部分 -->
			<view class="header">
				<view class="header_bgc" :style="{ background: 'url(https://db.topcdb.com' + db_data.movie_img + ')' }"><!-- <image src="" mode=""></image> --></view>
				<view class="header_data">
					<view class="header_data_img">
						<image :src="'https://db.topcdb.com' + db_data.movie_img" mode=""></image>
					</view>
					<view class="header_data_All">
						<view class="header_data_name">{{ db_data.zz_name }}</view>
						<view class="header_data_data">导演:{{ db_data.director_name }}</view>
						<view class="header_data_data">主演:{{ db_data.actor }}</view>
						<view class="header_data_data">类型:{{ db_data.material }}</view>
						<view class="header_data_data">上映日期：{{ db_data.publish_date }}</view>
					</view>
				</view>
			</view>
		<view class="" :hidden="is_show">
			<uc-harts
			:name="name"
			:canvas_url="canvas_url"
			 @rl_click="rl_click"
			 ></uc-harts>
			 
		</view>
		 
		 <!-- 日历 -->
		<view class="car"  :style="{position:'fixed',top:0,height:windowHeight + 'px'}"  :hidden="!is_show">
		 		<view class="car_cah" @tap="car_cah">
		 			<view>×</view>
		 		</view>
		 		<ei-calendar
		 			ref="calendar"
		 			:drawer="false"
		 			:visible.sync="is_show"
		 			@click="ei_calendar_tap"
		 			:disabledDate="disabledDate"
		 			v-model="date"
		 			:custom-date="customDate"
		 			format="YYYY-MM-DD"
		 			
		 		></ei-calendar>
		 	<cover-view  :style="{height:car_scrollr_hei + 'px',width:'750px',background:'#fff'}" >
		 	
		 	</cover-view>
		 </view>
	</view>
</template>

<script>
	import UcHarts from '@/components/ucharts_dome/publicity_cavas';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
export default {
	onShareAppMessage(){},
	components:{
		UcHarts,
		EiCalendar
	},
	data() {
		return {
			canvas_url:{},
			customDate: [
				{
					cellClass: 'custom-cell',
					date: '2019-08-20',
					top: [
						{
							// class: 'custom-cell-top-1',
							// text: '情人节'
						}
					]
				}
			],
			date:[],
			is_show:false,
			name:'',
			db_data: {
				actor: '黄世超/于承惠/白举纲...',
				country: '美国',
				director_name: '托尼·班克罗夫特',
				en_name: 'Mulan',
				id: '2566',
				material: '家庭,动画,冒险,战争',
				movie_img: '/uploads/movie_thumb/6/6_300X500_2566_9fcf1365.jpg',
				publish_date: '2019-06-19',
				zz_id: '0',
				zz_name: '花木兰(1998动画版)'
			},
			
		};
	},
	onLoad(name) {
		// 获取当前屏幕高度
		var res = wx.getSystemInfoSync();
		this.windowHeight = res.windowHeight; // 获取当前屏幕高度
		this.windowWidth = res.windowWidth; // 获取当前屏幕高度
		// 初始化日历时间
		var data = new Date();
		var year = data.getFullYear();
		var mom = data.getMonth()  + 1 ;
		if (mom < 10) {
			mom = '0' + mom
		}
		var day = data.getDate() - 1;
			data = year+ '-' + mom + '-' + day
		var date = [];
		date[0] = new Date(data);
		this.date = date;
		
		
		
		
		let { id, mid } = name;
		console.log(name);
		this.name = name;
		
		// 影片详情
		var url = '/topprogram/movie-detail'
		let all_data = {
			id:id,
			mid:mid
		}
		this.index_data(url,all_data);
	
	},
	methods: {
		rl_click(e){
			this.is_show = e;
		},
		// 日历函数
		disabledDate(date) {
			const start = new Date('2019/5/10').getTime();
			const end = new Date('2019/7/21').getTime();
			return date.getTime() <= start || date.getTime() >= end;
		},
		// 日历点击事件
		ei_calendar_tap(e){
			var {id:id,mid:mid} = this.name ;
			var year = e.year;
			var month = e.month;
			var day = e.day;
			if (month < 10) {
				month = '0' + month
			}
			if(day < 10){
				day = '0' + day;
			}
			if (day.length > 3) {
				day = day.slice(1,3)
			}
			if(month.length > 3){
				month = day.slice(1,3)
			}
			var data = `${year}-${month}-${day}`
			// console.log(data);
			var url = '/topprogram/get-con-situation';
			let All_data = {
				id:id,
				mid:mid ,
				date:data
			}
			
			var date = [];
			date[0] = new Date(data);
			this.date = date;
			// this.cater_tab_index = 2;
			this.canvas_url = {
				url,
				data:All_data
			};
			console.log(this.canvas_url);
			this.is_show= false;
		},
		car_cah(){
			this.is_show = false;
			// this.cater_tab_index = 2;
		},
// 		// 雷da图
// 		// 想看指数
// 		// 想看指数
// 		// 当前的影片信息
		async index_data(url,All_data) {
			let userType  = await this.detection_validity()
			All_data['userType'] = userType;
			let {data:res}  = await this.$http.get({
				url,
				data:All_data
			})
			res.actor = res.actor.slice(0, 11) + '...';
			this.db_data = res;
		}
	}
};
</script>

<style lang="less">
@import url('./detail');
.car{
	width: 750upx;
	background-color: #FFFFFF;
	.car_cah{
		background-color: #fff;
		view{
			width: 750upx;
			height: 50upx;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			background-color: #FFFFFF;
		}
	}
}
.button_fh{
	position: relative;
	top: 100px;
	right: 0;
	
}
.qiun-charts {
	width: 750upx;
	height: 500upx;
	background-color: #ffffff;
}
.charts_yx{
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
