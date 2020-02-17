<template>
	<view>
		<view class="data_Click">
			<view class="tabone_data" v-for="(item,i) in tabhree_title_data" :key="i">
				<view class="tabone_title">
					<view>{{item.name}}:</view>
				</view>
				<view class="tabone_conter">
					<scroll-view scroll-x>
						<!-- 参与身份 -->
						<!--  -->
						<view :style="{color: sf_index_three == id ? '#F08E2D' : ''}" v-if="i == 0" @tap="tabthree_title_oneTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
						 <!-- 作品类型 -->
						 <view :style="{color: init_index_three == id ? '#F08E2D' : ''}" v-if="i == 1" @tap="tabthree_title_fourTap(it,id)" v-for="(it,id) in item.child"
						  :key="id">{{it}}</view>
						<!-- // 作品年代 -->
					
						<view v-if="i == 2 && id != 1 && id == 0" :style="{color: year_index_three == id ? '#F08E2D' : ''}" @tap="tabthree_title_towTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						<picker @change="picker_change_three" @cancel="picker_cancel_three" class="pickeraa" v-if="i == 2" mode="multiSelector"
						 :range="range">
							<view v-if="i == 2 && id == 1" :style="{color: year_index_three == id ? '#F08E2D' : ''}" @tap="tabthree_title_towTap(it,id)"
							 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						</picker>
						<view v-if="i == 2 && id != 1 && id != 0" :style="{color: year_index_three == id ? '#F08E2D' : ''}" @tap="tabthree_title_towTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						
					</scroll-view>
				</view>
			</view>
		</view>
		
		
		
		<view class="Individual">
			<view class="Individual_xq" v-for="(item,ind) in Alldate.movie" :key="ind">
				<image class="images"  :src="'https://db.topcdb.com' + item.img" mode=""></image>
				<view class="Individual_xq_data">
					<view class="Individual_xq_data_name">
						<view>{{item.zz_name}}</view>
						<view>{{item.bo}}
							票房</view>
					</view>
					<view class="Individual_xq_data_xk">{{item.maoyan_wantwatch}}人想看</view>
					<view class="Individual_data_data">
						<view>主演:{{item.director_name}}</view>
						<view>{{item.material}}</view>
						<view> {{item.publish_date}} 上映</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	var that = null;
	export default {
		data() {
			return {
				startDate:'', //开始和结束时间
				endDate:'',  //开始和结束时间
				id:'', //  影人id
				range: [
				
				],
				sf_index_three_data:'',
				init_index_three_data:'',
				year_index_three_data:'',
				sf_index_three:0,
				init_index_three:0,
				year_index_three:0,
				Alldate:{},
				tabhree_title_data: [{
						name: '参与身份',
						child: ['不限','制作' ,'出品' ,'发行' ,'联合出品' ,'联合发行' ,'其他']
					},
					{
						name: '作品类型',
						child: ['不限', '剧情', '科幻', '奇幻', '喜剧', '爱情', '动画', '动作', '惊悚', '战争', '戏曲', '歌舞', '音乐', '文艺', '纪录']
					}, {
						name: '作品年代',
						child: ['不限', '自定义', '2019年以后', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011及以前']
					}
				],
			}
		},
		onLoad(res) {
			let {id:id} = res;
				var url = '/topprogram/company-detail'
				let All_data = {
					id:id
				}
			 this.id = id;
			that = this;
			this.db_index(url,All_data)
			this.data_yaer()
		},
		created() {
		
			// uni.getStorage({
			// 	key:'movieList',
			// 	success:function(res){
			// 		console.log(res);
			// 		that.Alldate = res;
			// 	}
			// })
		},
		methods: {
			// 弹出 选择时间  选择自定义时间时清除 默认选择选中的时间
			picker_change_three(e){
				var value = e.detail.value;
				console.log(value);
				var range = this.range;
				var startDate = '';
				var endDate = '';
				var year = '';
				if (value[0] < value[1]) {
					startDate = range[1][value[1]]
					endDate = range[0][value[0]]
				}else {
					startDate = range[0][value[0]]
					endDate = range[1][value[1]]
				}
				var  type = this.sf_index_three_data; // 参与身份
				var  material = this.init_index_three_data;   //作品类型
				
				var ide = this.id;
				var url = '/topprogram/company-detail'
				let All_data = {
					id:ide,
					year:year,
					startDate:startDate,
					endDate:endDate,
					type:type,
					material:material
				}
				this.db_index(url,All_data)
				
				this.startDate = startDate;
				this.endDate = endDate;
				this.year_index_three_data = ''; 
				this.year_index_three = 1;
			},
			// 取消提示
			picker_cancel_three(){
				uni.showToast({
					title: '请选择日期',
					icon: 'none',
					duration: 2000
				})
			},
			// 身份
			tabthree_title_oneTap(it,index){
				
				var  material = this.init_index_three_data;   //作品类型
				var year = this.year_index_three_data;   //作品年代
				var startDate = this.startDate;
				var  endDate = this.endDate;
				var type = '';
				if (it == '不限') {
					type = '';
				}
				if (index == 1) {
					type = 'produce';
				}else if (index == 2) {
					type = 'chuping';
				}else if (index == 3) {
					type = 'publish';
				}else if (index == 4) {
					type = 'union_chuping';
				}else if (index == 5) {
					type = 'union_publish';
				}else if (index == 6) {
					type = 'other';
				}
				var ide = this.id;
				var url = '/topprogram/company-detail'
				let All_data = {
					id:ide,
					year:year,
					startDate:startDate,
					endDate:endDate,
					type:type,
					material:material
				}
				this.db_index(url,All_data)
				that.sf_index_three = index;
				this.sf_index_three_data = it;
				
			},
			// 类型
			tabthree_title_fourTap(it,id){
				var  type = this.sf_index_three_data;  // 参与身份
				var year = this.year_index_three_data;  //作品年代
				var startDate = this.startDate;
				var  endDate = this.endDate;
				if (it == '不限') {
					it = '';
				}else if (it.indexOf('(' != -1 )) {
					it = it.split('(')[0];
				}
				
				var ide = this.id;
				var url ='/topprogram/company-detail'
				let All_data = {
					id:ide,
					year:year,
					startDate:startDate,
					endDate:endDate,
					type:type,
					material:it
				}
				
				this.db_index(url,All_data)
				
				this.init_index_three = id;
				this.init_index_three_data = it;
			},
			// 年代
			tabthree_title_towTap(it,id){ 
				var  type = this.sf_index_three_data; // 参与身份
				var  material = this.init_index_three_data;   //作品类型
				var startDate = '';
				var endDate = '';
				
				if (it.indexOf('年以后') != -1) {
					it = 100;
				}else if (it.indexOf('自定义') != -1) {
					
					return false;
				}else if (it.indexOf('年以前') != -1) {
					it = 2011;
				}else if (it == '不限') {
					it = '';
				}
				console.log(it);
				var ide = this.id;
				var url =  '/topprogram/company-detail'
				let All_data ={
					id:ide,
					year:it,
					startDate:startDate,
					endDate:endDate,
					type:type ,
					material:material
				}
				this.db_index(url,All_data)
				this.startDate = '';
				this.endDate = '';
				this.year_index_three = id;
				this.year_index_three_data = it;
			},
			async db_index(url,All_data){
				
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				var init = [...this.tabhree_title_data[1].child];
				var sf_init = [...this.tabhree_title_data[0].child]
				var sf_index = [0,0,0,0,0,0,0,]
				res.movie.forEach(item =>{
					if (Number(item.bo) / 100000000 > 1) {
						item.bo =( (Number(item.bo) / 100000000)).toFixed(2) + '亿'
					}else{
						item.bo =( Number(item.bo) / 10000).toFixed(2) + '万'
					}
					item.type_cn
				})
				init.forEach((item,index) =>{
					for(let i = 0; i < res.typeCount.length; i++){
						if (res.typeCount[i].type == item) {
							init[index] = item + `(${res.typeCount[i].num})`
						}
					}
				})
				 let ctypeCount = res.ctypeCount;
				 	for (let i in  ctypeCount) {
						 sf_init.forEach((even,index) =>{
							 if (even == i && ctypeCount[i] != '') {
							 	sf_init[index] = even +'(' + ctypeCount[i]  + ')'
							 }
						 })
				 	}
				
				
				this.tabhree_title_data[1].child = init;
				this.tabhree_title_data[0].child  = sf_init
				this.Alldate = res;
			},
			data_yaer() {
				var all_year = [];
				var arr = [];
				var year = new Date().getFullYear()
				for (var i = year; i >= 2012; i--) {
					all_year.push(i);
					arr.push(i)
				}
				console.log(year);
				var data = new Date().getFullYear()
				console.log(year,data);
			
				this.range = [all_year, all_year]
				arr.unshift('不限', '自定义', data + '年以后')
				arr.push('2011及以前')
				this.tabhree_title_data[1].child = arr;
				// 
			},
		}
	}
</script>

<style lang="less">
	.data_Click{
		font-size: 26upx;
		min-height: 230rpx;
		-webkit-box-sizing: border-box;
		box-sizing: border-box;
		padding: 0rpx 0 0rpx 18rpx;
		background: #fff;
		color: #8E8E8E;
		.tabone_data{
			display: flex;
			background: #fff;
			border-bottom:2upx solid  #EEEEEE;
			
			
			.tabone_title{
				width: 125upx ;
				view {
					height: 300 / 4upx;
					width: 125upx ;
					line-height: 300 / 4upx;
				}
			}
			
			.tabone_conter{
				scroll-view{
					display: flex;
					display: -webkit-flex;
					white-space: nowrap; // 滚动必须加的属性
					width:750 - 95 - 40upx;
					// width:100%;
					.pickeraa{
						display: inline-block;
					}
					view{
						display: inline-block;
						height: 300 / 4upx;
						line-height: 300 / 4upx;
						// min-width: 100upx;
						padding: 0upx 30upx;
					}
				}
			}
		}
	}
	
	.Individual{
		padding:0 30upx;
		box-sizing:border-box;
		.Individual_xq{
					display:flex;
					border-top: 2upx solid #EEEEEE;
					padding-top:30upx;
					padding-bottom:30upx;
					&:nth-child(1){
						border-top:0;
					}
					.images{
						width: 114upx;
						height: 162upx;
						// padding-left: 30upx;
					}
					.Individual_xq_data{
						
						padding-left:26upx;
						.Individual_xq_data_xk{
							width:750 - 60 - 134 - 26upx;
							display: flex;
							justify-content: flex-end;
							align-items: center;
							font-size: 24upx;
							color:#4A4A4A;
						}
						.Individual_xq_data_name{
							display: flex;
							justify-content: space-between;
							width:750 - 60 - 134 - 26upx;
							view:nth-child(1){
								font-size:28upx;
								font-family:PingFangSC;
								font-weight:600;
								color:rgba(0,0,0,1);
							}
							view:nth-child(2){
								display: flex;
								
								font-size:30upx;
								font-family:PingFangSC;
								font-weight:600;
								color:rgba(240,142,45,1);
								
							}
						}
						.Individual_data_data{
							font-size:24upx;
							font-family:PingFangSC;
							font-weight:400;
							color:rgba(142,142,142,1);
							// padding-top:34upx;
						}
					}
				}
	}

</style>
