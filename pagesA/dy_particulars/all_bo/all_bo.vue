<template>
	<view>
		<!-- 前后天 -->
		<view class="bdata_time">
			<view class="left_time" @tap="time_click(0)">
				<image src="../../../static/big-plate/previous.png" mode=""></image>
				前一天
				
			</view>
			<view class="time" @tap="()=>{
				this.time_tab_Br = true;
			}">
				{{time | time_com}}
				<image src="../../../static/big-plate/xia.png" mode=""></image>
			</view>
			<view class="rigth_time" @tap="time_click(1)">
				后一天
				<image src="../../../static/big-plate/next.png" mode=""></image>
			</view>
		</view>
		
		<!-- 总场次 和时间 -->
		<view class="All_session_time">
			<view >
				<!-- 总场次：{{sum_data.session_s}}场 -->
				总票房： {{sum_data.total_bo_s}}
			</view>
			<view>
				{{time | time_com}} {{time |time_zhou }}
			</view>
		</view>
		
		<view class="button">
			<view class="buttonH">
				<view class="buttonHone" v-if="index == 0">城市明细</view>
				<view class="buttonHone" v-if="index == 1">影投明细</view>
				<view class="buttonHone" v-if="index == 2">影院明细</view>
				<view class="buttonHtow" @tap="show_index">
					<image src="../../../static/home/more.png" mode=""></image>
					更多指标
				</view>
			</view>
			<view class="buttonM">
				<view v-if="index == 0">城市</view>
				<view  v-if="index == 1">影投</view>
				<view  v-if="index == 2">影院名称</view>
				<view v-for="(item, index) in zb_title" :key="index" :hidden="!item.front_row" >{{ item.is_check }}{{ item.zb_name }}{{ item.two_title }}</view>
			</view>
			<view class="buttonB" @tap="naviga(it)" v-for="(it,ine) in itemlist" :key="ine">
				<view class="buttonB_Headerson">
					<view class="buttonB_Headerson_name" v-if="index == 0">{{ it.city }}</view>
					<view class="buttonB_Headerson_name"  v-if="index == 1">{{ it.brd }}</view>
					<view class="buttonB_Headerson_name"  v-if="index ==2">{{ it.cinema_name }}</view>
					
					<!-- <view class="buttonB_Headersn1"></view> -->
				</view>
				<!-- <view class="buttonB_Headerson_pf"  v-if="!res.index == 2"> -->
					<!--综合票房-->
					<!-- <view v-if="zb_title[0].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_bo_s }}</view> -->
					<!--综合票房占比  -->
					<!-- <view v-if="zb_title[1].front_row" :style="{ Color: '#f08e2d' }">{{ it.bo_rate }}%</view> -->
					<!--排场占比  -->
					<!-- <view v-if="zb_title[2].front_row">{{ it.session_rate }}%</view> -->
					<!--排座占比  -->
					<!-- <view v-if="zb_title[3].front_row" >{{ it.seat_s_zb }}</view> -->
					<!--平均票价  -->
					<!-- <view v-if="zb_title[4].front_row">{{ it.avg_price }}</view> -->
					<!--场均人次  -->
					<!-- <view v-if="zb_title[5].front_row">{{ it.people_per_session }}</view> -->
					<!--场次  -->
					<!-- <view v-if="zb_title[6].front_row">{{ it.session_s }}</view> -->
					<!--人次  -->
					<!-- <view v-if="zb_title[7].front_row">{{ it.total_people_s }}</view> -->
				<!-- </view> -->
				
				
				<view class="buttonB_Headerson_pf" >
					<!--综合票房-->
					<view v-if="zb_title[0].front_row" :style="{ Color: '#f08e2d' }">{{ it.total_bo_s }}</view>
					<!--综合票房占比  -->
					<view v-if="zb_title[1].front_row" :style="{ Color: '#f08e2d' }">{{ it.bo_rate }}%</view>
					<!--排场占比  -->
					<view v-if="zb_title[2].front_row">{{ it.session_rate }}%</view>
					<!--上座率  -->
					<!-- <view v-if="zb_title[3].front_row">{{ it.occupancy }}</view> -->
					<!--排座占比  -->
					<!--平均票价  -->
					<view v-if="zb_title[3].front_row">{{ it.avg_price }}</view>
					<!--场均人次  -->
					<view v-if="zb_title[4].front_row">{{ it.people_per_session }}</view>
					<!--场次  -->
					<view v-if="zb_title[5].front_row">{{ it.session_s }}</view>
					<!--人次  -->
					<view v-if="zb_title[6].front_row">{{ it.total_people_s }}</view>
				</view>
			</view>
		</view>
		
		<!-- 跟多指标 -->
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
		<view class="calendar" :hidden="!time_tab_Br">
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
	</view>
</template>

<script>
import moment from '@/components/moment';
	import EiCalendar from '@/components/ei-calendar/ei-calendar';
	export default {
		onShareAppMessage(){},
		components:{
			EiCalendar
		},
		data() {
			return {
				sum_data:{session_s:'----',total_bo_s:'-------'},
				res:{},
				date:[],
				time_tab_Br:false,
				customDate:[],
				index:0,
				is_index:true,
				itemlist:[
				],
				time:'',
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
						two_title: '份额',
						is_check: '',
						no_check: '分账',
						front_row: true
					},
					{
						zb_name: '排场份额',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},
					// {
					// 	zb_name: '上座率',
					// 	two_title: '',
					// 	is_check: '',
					// 	no_check: '',
					// 	front_row: true
					// },
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
					},
					{
						zb_name: ' ',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					}
				],
			}
		},
		filters:{
			// 格式化周几
			time_zhou(data){
				// console.log(data)
				var time = '周' + '日一二三四五六'.charAt(new Date(data).getDay())
				if (data == undefined) {
					return '---'
				}else if (data == null) {
					return '---'
				}else {
					return time;
				}
			},
			// 格式化时间
			time_com(data){
				// console.log(data)
				var time = moment(data).format('YYYY年MM月DD日')
				if (data == undefined) {
					return '---'
				}else if (data == null) {
					return '---'
				}else {
					return time;
				}
			}
		},
		onReady(){
			var a = new Date();
			a = moment(a).format('YYYY-MM-DD');
			var date = [];
			date[0] = new Date(a);
			this.date = date;
		},
		onLoad(res) {
			// mid 我们的id 
			// id 专资id
			var {id,mid,index} = res;
				
			// 初始化页面时间
			var time = moment(new Date()).format('YYYY-MM-DD');
			this.time = time;
			var url =''
			let All_data = {};
			var zb_title =  [
					{
						zb_name: '票房',
						two_title: '(万元)',
						is_check: '',
						no_check: '分账',
						front_row: true
					},
					{
						zb_name: '票房',
						two_title: '份额',
						is_check: '',
						no_check: '分账',
						front_row: true
					},
					{
						zb_name: '排场份额',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: true
					},
					// {
					// 	zb_name: '上座率',
					// 	two_title: '',
					// 	is_check: '',
					// 	no_check: '',
					// 	front_row: true
					// },
					// {
					// 	zb_name: '排座占比',
					// 	two_title: '',
					// 	is_check: '',
					// 	no_check: '',
					// 	front_row: true
					// },
					{
						zb_name: '票价',
						two_title: '',
						is_check: '平均',
						no_check: '平均',
						front_row: true
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
					},
					{
						zb_name: ' ',
						two_title: '',
						is_check: '',
						no_check: '',
						front_row: false
					}
				]
			if(index == 0){
				 url = '/topprogram/movie-maincity'
				 All_data = {
					 id:id,
					 mid:mid
				 }
			}else if(index == 1){
				url= '/topprogram/movie-mainbrd'
				All_data = {
									 id:id,
									 mid:mid
				}
			}else if(index == 2){
				url= '/topprogram/movie-maincinema'
				All_data = {
									 id:id,
									 mid:mid
				}
				
			}
			this.res = res;
			this.zb_title = zb_title;
			this.index = index;
			this.bd_index(url,All_data)
		},
		methods: {
			naviga(data){
				let {id,mid,index} = this.res;
				let item = ''
				let url = ''
				if (index != 2) {
					if (index == 0) {
						url = './cityBrd_bo?index=' + 0 + '&city=' + data.city  + '&id='+id + '&mid=' + mid 
					}else {
						url = './cityBrd_bo?index=' + 1 + '&brd=' + data.brd  + '&id='+id + '&mid=' + mid 
					}
					console.log(url);
					uni.navigateTo({
						url,
					})
				}
			},
			time_click(i){
				// i 0 是前一天  1  是 后一天
				var th_time = this.time;
				var {id,mid,index} = this.res;
				var date = [];
				var url = this.baseURL;
				if(i == 1){
					th_time = moment(th_time).subtract(-1,'days').format('YYYY-MM-DD');
					
				}else {
					th_time = moment(th_time).subtract(1,'days').format('YYYY-MM-DD');
				}
				 
				let All_data = {};
				if(index == 0){
					url = '/topprogram/movie-maincity'
					All_data = {
						id: id,
						mid:mid,
						bdate:th_time
					}
				}else if(index == 1){
					url = '/topprogram/movie-mainbrd'
					All_data = {
						id: id,
						mid:mid,
						bdate:th_time
					}
				}else if(index ==2){
					url = '/topprogram/movie-maincinema'
					All_data = {
						id: id,
						mid:mid,
						bdate:th_time
					}
				}
				date[0] = new Date(th_time);
				this.date = date;
				this.time = th_time;
				this.bd_index(url,All_data);
				
			},
			ei_calendar_tap(e){
				var time = e.format.split('/');
				var th_time = `${time[0]}-${time[1]}-${time[2]}`;
				var url = this.baseURL;
				var {id,mid,index} = this.res;
				var date = [];
				let All_data = {}
				if(index == 0){
					url = '/topprogram/movie-maincity'
					All_data = {
						id:id,
						mid:mid ,
						bdate:th_time
					}
				}else if(index == 1){
					url = '/topprogram/movie-mainbrd'
					All_data = {
						id:id,
						mid:mid ,
						bdate:th_time
					}
				}else if(index ==2){
					url = '/topprogram/movie-maincinema'
					All_data = {
						id:id,
						mid:mid ,
						bdate:th_time
					}
				}
				date[0] = new Date(th_time);
				this.date = date;
				this.time = th_time;
				this.bd_index(url,All_data);
				this.time_tab_Br = false;
			},
			async bd_index(url,All_data){
				let userType = await this.detection_validity();
				All_data.userType = userType;
				let { data: res } = await this.$http.get({
					url,
					data: All_data
				});
					var index = this.index;
					// return ''
					var data = false;
					var title = '';
					var sum = '';
					let option = '';
					if(index == 0){
						data =  res.city_data;
						sum = res.sum
						title = '城市票房'
						option =  'city'
					}else if(index ==1 ){
						data = res.data
						sum = res.sum
						title = '影投票房'
						option  = 'brd'
					}else if(index == 2){
						
						data = res.data
						sum = res.sum
						title = '影院票房'
						option  = 'cinema_code'
					}
					uni.setNavigationBarTitle({
						title,
					})
					// gdbo_rate黄金场票房占比  影投票房 是brd
						data.forEach((item,index) =>{
							// console.log();
							let feneDate = res.fene[item[option]];
							// 票房占比
							item.bo_rate = (Number(item.total_bo_s)  /( feneDate.total_bo_s - 0) *100).toFixed(2)
							// 排场占比
							item.session_rate = ((item.session_s - 0)  / (feneDate.session_s - 0) *100).toFixed(2)
							// 平均票价
							item.avg_price = Number(item.avg_price).toFixed(2)
							// 票房占比
							// item.bo_rate = (Number(item.bo_rate) * 100 ).toFixed(2)
							// 上座率
							item.occupancy = (Number(item.occupancy) * 100 ).toFixed(2)
							// 场均人次 
							item.people_per_session = Number(item.people_per_session).toFixed(0)
							// 排场占比
							// item.session_rate = (Number(item.session_rate) *100).toFixed(2) 
							// 场次数 item.session_s 
							// 今日票房
							item.total_bo_s = (Number(item.total_bo_s) / 10000 ).toFixed(2) 
							// 人次total_people_s
							// 排座占比
							item.seat_s_zb = (Number(item.seat_s) / sum.seat_s).toFixed(2) + '%'
						})
					if (Number(sum.total_bo_s)  / 100000000 >1) {
						sum.total_bo_s = (Number(sum.total_bo_s) / 100000000).toFixed(2) + '亿'
					}else {
						sum.total_bo_s = (Number(sum.total_bo_s) / 10000).toFixed(2) + '万'
					}
					this.sum_data  = sum;
					this.itemlist = data;
			},
			show_index(){
				this.is_index = false;
			},
			more_index_data_tap(index) {
				if (index == 8) {
					return false;
				}
				// console.log(data);
				// // 复制过来一份进行操作
				let zb_title = this.zb_title;
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
			disabledDate(date) {
				const start = new Date('2019/5/10').getTime();
				const end = new Date('2019/7/21').getTime();
				return date.getTime() <= start || date.getTime() >= end;
			}
		}
	}
</script>

<style lang="less">
	@import url("city_bo.less");
</style>
