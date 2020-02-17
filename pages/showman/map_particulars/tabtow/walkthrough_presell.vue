<template>
	<view :hidden="!(header_index == 1)">
		<view class="title_data" >
			<view class="title_data_xuan" @tap="title_data_click">
				{{ title_data }}
				<image src="../../../../static/big-plate/xia.png" mode=""></image>
			</view>
			<view class="title_data_time" @tap="()=>{this.time_tab_Br = true}">
				{{time}} 
					<image src="../../../../static/big-plate/xia.png" mode=""></image>
			</view>
		</view>
		
		 <!---->
		<view class="title_data_xuan_data"  :hidden="title_data_xuan_isShow" >
			<view :style="{color: title_data == '整体' ? '#F08E2D' : ''}">
				整体
			</view>
			<view :style="{color: title_data == '分时' ? '#F08E2D' : ''}">
				分时
			</view>
		</view>
		<!-- t图片 -->
		
		
		
		<view class="swiper-container">
			<!--   -->
			<view class="post-bg" v-if="tab_tow_movie.url != undefined" :style="{ backgroundImage: 'url' + '(' + tab_tow_movie.url + ')' }"></view>
			<view class="post-bg-mask"></view>
			<!-- scroll-with-animation   -->
			<scroll-view class="swiper-wrapper scroll-view_H" scroll-x :scroll-left="tab_tow_scrollLeft" scroll-with-animation>
				<view :id="'item' + index" class="movie-item movie-item_three" v-for="(item, index) in testimgs" :key="index" @tap="onclickimg(index, item)">
					
					<!-- :class='['post',movie.id===item.id?"":""]' -->
					<view :class="['post', index == tab_tow_movie.id ? 'select' : '']">
						<image v-if="!(item.url == 'https://db.topcdb.com')" :src="item.url"></image>
						<image v-if="item.url == 'https://db.topcdb.com'" src="../../../../static/big-plate/available_poster.png"></image>
					</view>
				</view>
			</scroll-view>
		</view>
		<!-- 画廊展示 -->
		<view class="swiper_data">
			<view class="swiper_data_left">
				<view>
					{{All_movie[gallery_name].movie_name}}
				</view>
				<view >
					全国总排场: {{All_movie[gallery_name].session_s}}
					全国占比： {{All_movie[gallery_name].session_ss}}
				</view>
			</view>
			<view class="swiper_data_right" @tap="a" data-name="1">
				<image src="../../../../static/big-plate/next.png" mode=""></image>
			</view>
		</view>
		<!-- 图片 -->
		
		<view class="city_xuan">
			<view @tap="city_click(item,index)" :class="[index == city_xuan_index ? 'active' : '']" v-for="(item,index) in city_xuan_data" :key="index"> {{item}}</view>
		</view>
		
		<!-- 底部数据展示 -->
		<view class="button">
			<view class="buttonH">
				<view class="buttonHone">票房排名</view>
				<view class="buttonHtow" @tap="()=>{this.is_index = false;}">
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
			<view class="buttonB" @tap="nagitto(it.movie_id_r, it.zz_id)" v-for="it in itemlist" :key="it.gp_id">
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
		
		
		<scroll-view scroll-y class="more" :hidden="is_index">
			<scroll-view scroll-y class="more_header"></scroll-view>
			<view class="more_index">
				<view class="more_index_header"><view class="" @tap="() =>{this.is_index = true}">确定</view></view>
				<view class="more_index_data">
					<view @tap="more_index_data_tap(index)" v-for="(item, index) in zb_title" :key="index" :class="[item.front_row ? 'active' : '']">
						{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}
					</view>
				</view>
			</view>
		</scroll-view>
		<!-- 底部数据展示 -->
		
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
				v-model="data_time"
				:custom-date="customDate"
				format="YYYY-MM-DD"
			></ei-calendar>
		</view>
		
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import EiCalendar from '@/components/ei-calendar/ei-calendar';
export default {
	components:{
		EiCalendar,
	},
	data() {
		return {
			title_data_xuan_isShow:true, /* 选择br*/
			title_data:'整体', // 头部显示的数据
			data_time:[],
			customDate:[],
			time_tab_Br:false,
			All_movie:{
				'--':{
					movie_name:'--',
					session_s:'--',
					session_ss:'--'
				}
			}, // 所有 排场和占比集合
			distance_meters:3000, // 选择的距离获取是选择的城市
			is_index:true,
			itemlist:[],
			city_xuan_index:2,
			city_xuan_data:['--','--','三公里','一公里'],
			time:'----',
			testimgs:[],
			tab_tow_scrollLeft:0,
			tab_tow_movie:false, // 选中哪一个 就是保存那一个数据
			gallery_name:'--', /* 画廊当前点击的name*/
			gallery_index:0, // 画廊下标
			movieidAr:[], // 所有影院的 id jihe
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
		};
	},
	computed: {
		...mapState({
			res: 'map_particulars_res',
			header_index: 'map_particulars_tabtow_header_index'
		})
	},
	watch: {
		
		// 接口发送
		header_index() {
			if (this.header_index != 1) return false;
			// 重新进来就要重置
			this.tab_tow_scrollLeft = 0;
			var res = this.res;
			var city_xuan_data = [...this.city_xuan_data];
			
			let { city, district, latitude, longitude } = res;
			city_xuan_data[0] = city;
			city_xuan_data[1] = district;
			var data = new Date()
			var year = data.getFullYear()
			var mount = data.getMonth() +1
			var ri = data.getDate()
			if (ri < 10) {
				ri = '0' + ri
			}
			var time = year + '-' + mount + '-' + ri
			this.data_time = [new Date(time)]
			this.time = time;
			
			this.city_xuan_data = city_xuan_data;
			var url = '/topprogram/compete-session?lat=' + latitude + '&lng=' + longitude;
			this.db_index(url,1)
		}
	},
	methods: {
		// 头部点击显示 或者取消
		title_data_click(){
			 this.title_data_xuan_isShow  = !this.title_data_xuan_isShow;
		},
		// 日历点击
		ei_calendar_tap(e){
			var time = e.format.split('/')
			time = time[0] + '-' + time[1] +'-' + time[2] ;
			this.time = time;
			this.time_tab_Br = false;
			this.data_time = [new Date(time)]
			this.db_yp_data()
		},
		// 点击切换地区
		city_click(item,index){
			var res = this.res;
			let { city, district, latitude, longitude } = res;
			if (item == '三公里' || item == '一公里') {
				if (index == 3) {
					this.distance_meters = 1000
					
				} else if (index == 2) {
					this.distance_meters = 3000
				}
				
			} else {
					if (index == 0) {
						if (city.indexOf('市') != -1 || city.indexOf('省') != -1) {
							var a = city.indexOf('市');
							console.log(a)
							city = city.slice(0, a);
						}
						this.distance_meters = 'city,' + city;
					} else {
						this.distance_meters = 'county,' + district;
					}
			}
			this.city_xuan_index = index;
			this.db_yp_data()
		},
		// 票房显示 的字
		more_index_data_tap(index) {
			console.log(data);
			// // 复制过来一份进行操作
			let zb_title = [...this.zb_title];
			// 如果点击当前的 按钮是 true  则 变为false
			if (zb_title[index].front_row) {
				zb_title[index].front_row = false;
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
				if (boer <= 4) {
					zb_title[index].front_row = true;
				}
			}
			// 定义变量 来计算 是否超过 规定数量
		
			this.zb_title = zb_title;
		},
		//计算节点大小
		calcSize() {
			return new Promise((resolve, reject) => {
				const query = uni.createSelectorQuery().in(this);
				query
					.select(`#item1`)
					.fields({
							size: true,
							computedStyle: ['margin-left']
						},
						function(res) {
							let size = 0;
							if (res) {
								size = res.width + parseFloat(res['margin-left']);
							}
							// console.log(size,res);
							resolve(size);
						}
					)
					.exec();
			});
		},
		// 画廊点击
		async onclickimg(index,item){
			var testimgs = this.testimgs;
			this.gallery_name = item.movie_name;
			this.tab_tow_movie = item;
			this.gallery_index = index;
			var data = await this.calcSize()
			this.tab_tow_scrollLeft = data * index; 
			// testimgs[index]
			this.db_yp_data()
		},
		// 接口发送
		async db_index(url,index_glo = 0){
			// console.log(url);
			var {data} = await this.$http.get({url})
			console.log(data);
			var testimgs = [];
			var res = data.mMoviedata;
			var index = 0;
			for(let i in res){
				// 只有第一次请求取值
				if (i == 0 && index_glo == 1) {
					this.gallery_name  = res[i].movie_name;
				}
				testimgs.push({url: 'https://db.topcdb.com' +  res[i].img,movie_name:res[i].movie_name,session_s:res[i].session_s,mid:res[i].mid,zz_id:res[i].zz_id,id:index,movie_id:res[i].movie_id})
				index++
			}
			var tab_tow_movie = testimgs[0];
			var res_data = this.res;
			let { city, district, latitude, longitude } = res_data;
			
			var sumData = data.sumData;		
			var movie_qg_sum  = sumData.movie_qg_sum;  // 所有的场次和座位
			var qg_sum  = sumData.qg_sum.session_s;  // sum j集合
			for (let var1 in movie_qg_sum) {
				movie_qg_sum[var1].session_ss = (Number(movie_qg_sum[var1].session_s) / Number(qg_sum) *100).toFixed(2) + '%'
			}
			this.All_movie = movie_qg_sum;
			this.movieidAr = data.movieidAr;
			this.tab_tow_movie = tab_tow_movie;
			this.testimgs = testimgs;
			this.db_yp_data()
		},
		async db_yp_data(){
			var res_data = this.res;
			let { city, district, latitude, longitude } = res_data;
			var movieidAr = [...this.movieidAr];
			var index = this.gallery_index;
			var distance_meters = this.distance_meters;
			var time = this.time;
			var url = '/topprogram/get-compete-session?lat=' +latitude + '&lng=' + longitude+'&movie_id=' + movieidAr[index] + '&distance_meters=' + distance_meters + '&bdata=' + time
			
			// console.log(url);
			var {data:res} = await this.$http.get({url})
			// console.log(res);
			var total_zb = false;
			var session_zb = false;
			var total_seats_zb   = false;
			res.data.forEach((item,index) =>{
				// cinema_name 名称
				// 综合票房占比	
				if (item.total_bo_s !== null) {
					var a = item.total_bo_s * 10000 - 0 ;
					var b = res.sum.total_bo_s * 10000 - 0;
					var total_zb = ((a / b) * 100).toFixed(2);
					item.total_zb = total_zb; //综合票房占比
				}
				// 排场占比
				var session = item.session_s;
				var sessions = res.sum.session_s;
				if ((session / sessions) * 100 < 0.01) {
					session_zb = '<0.01%';
				} else {
					session_zb = ((session / sessions) * 100).toFixed(2) + '%';
				}
				item.session_zb = session_zb; //排场占比
				// 上座率
				item.occupancy = (item.occupancy * 100).toFixed(2) + '%'; //上座率
				// 	//  排座占比
				var  total_seats = res.sum.total_seats.split(',')
				var total_seats_data = '';
				total_seats.forEach((ite,index) =>{
					total_seats_data += ite
				})
				var total_seat = Number(item.total_seats);
				var total_seats =Number(total_seats_data);
				
				if ((total_seat / total_seats) * 100 < 0.01) {
					total_seats_zb = '<0.01%';
				} else {
					total_seats_zb = ((total_seat / total_seats) * 100).toFixed(2) + '%';
				}
				item.total_seats_zb = total_seats_zb; //排座占比
				item.avg_price = (item.avg_price - 0).toFixed(2); //平均票价
				// /  场均人次
				var total_people_s = item.total_people_s;
				var session_s = item.session_s;
				total_people_s = (total_people_s / session_s).toFixed(0);
				if (total_people_s < 1) {
					total_people_s = 1;
				}
				item.cj_people_s = total_people_s; //场均人次
				// 综合票房 total_bo_s
			})
			this.itemlist = res.data;
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
	.title_data_xuan_data{
		background-color:#FFFFFF;
		position:fixed;
		top:211upx;
		z-index:1;
		view{
			height: 60upx;
			width: 750upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 24upx;
		}
	}
	
	// r日历
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
	
	
	// 地区选择
	.city_xuan{
		height: 80upx;
		line-height: 80upx;
		display: flex;
		margin: 10upx 0 10upx 0;
		background-color:#fff;
		
		view{
			width: 25%;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size:28upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:#4A4A4A;
		}
		.active{
			color: #F08E2D;
		}
	}
	// 导航
	.swiper_data{
		display:flex;
		justify-content: space-between;
		padding: 12upx 30upx;
		background-color:#fff;
		.swiper_data_left{
			view:nth-child(1){
				font-size:32upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(0,0,0,1);
			}
			view:nth-child(2){
				font-size:24upx;
				font-family:PingFangSC-Regular,PingFang SC;
				font-weight:400;
				color:rgba(240,142,45,1);
			}
		}
		.swiper_data_right{
			
			width:100upx;
			display:flex;
			justify-content: flex-end;	
			align-items:center;
			image{
				height: 22upx;
				width: 22upx;
			}
		}
	}
	
	
	.title_data{
		width:750upx;
		height:80upx;
		display: flex;
		margin-top: 10upx;
		background:rgba(255,255,255,1);
		box-shadow:0upx 2upx 4upx 0upx rgba(245,245,245,1);
		
		.title_data_xuan,
		.title_data_time{
			font-size:24upx;
			font-family:PingFangSC-Regular,PingFang SC;
			font-weight:400;
			color:rgba(74,74,74,1);
			display: flex;
			align-items: center;
			image{
				width:18upx;
				height:15upx;
				padding-left: 6upx;
			}
		}
		.title_data_xuan{
			padding-left: 30upx;
		}
		.title_data_time{
			padding-left: 180upx;
		}
	}
	
	
	
/* 画廊 */
.swiper-container {
  position: relative;
  width: 100%;
  overflow: hidden;
}

.post-bg {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  -webkit-filter: blur(30px);
  filter: blur(30px);
  background-position-y: 40%;
}

.post-bg-mask {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #40454d;
  opacity: 0.55;
}

.scroll-view_H {
  white-space: nowrap;
  width: 100%;
}

.movie-item {
  display: inline-block;
  width: 156rpx;
  height: 228rpx;
  margin: 50rpx 0 40rpx 40rpx;
}
.movie-item:first-child{
  margin-left: calc(50vw - 78rpx);
}
.movie-item:last-child{
  margin-right: calc(50vw - 78rpx);
}

.movie-item .post {
  width: 156rpx;
  height: 228rpx;
  transition: transform .3s;
}

.movie-item .post.select {
  position: relative;
  transform: scale(1.15);
  border: 2px solid #fff;
}

.movie-item .post.select::after {
  content: "";
  position: absolute;
  bottom: -6px;
  left: 50%;
  transform: translateX(-50%);
  width: 20rpx;
  height: 10rpx;
  background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAKCAYAAAC0VX7mAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDE0IDc5LjE1MTQ4MSwgMjAxMy8wMy8xMy0xMjowOToxNSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjMwODIyNEEwNTkwRDExRTZBNkMwOTE1NDA0RjA5MDA3IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjMwODIyNEExNTkwRDExRTZBNkMwOTE1NDA0RjA5MDA3Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MzA4MjI0OUU1OTBEMTFFNkE2QzA5MTU0MDRGMDkwMDciIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MzA4MjI0OUY1OTBEMTFFNkE2QzA5MTU0MDRGMDkwMDciLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz7kjYk3AAAAVUlEQVR42qzMMQ7AIAwEwSvy8P25EwokZNkYCFcgCu/IzLB7Q9+jS2gz1MG/KN0ZwVOU0fDgLorvI3AVJWozsELJuhmYocyaCvQo1f2jeiT/cK8AAwBzvH2t7aaajQAAAABJRU5ErkJggg==');
  background-repeat: no-repeat;
  background-size: contain;
}

.movie-item image {
  width: 100%;
  height: 100%;
}
/* 画廊 */
</style>
