<template>
	<view>
		<!-- :hidden="!input_srBr" -->
		<view class="input_sr" >
			<view class="input_sr_header" id="input_sr_header_id">
				<view class="input_sr_city" v-if="tab_header_index == 0" @tap="city_input_data_click">{{city_input_data}} <image src="../../../static/home/next.png" mode=""></image></view>
				<view class="input_sr_city"  v-if="!(tab_header_index == 0)">
					
				</view>
				<view  :class="{tab_one_header:true}" >
					<input @input="input_change" v-if="tab_header_index == 0"  v-model="input_model" type="text" value="" @confirm="confirm_click" placeholder="搜索影院" />
					<input @input="input_change" v-if="tab_header_index == 1"  v-model="input_model" type="text" value="" @confirm="confirm_click" placeholder="搜索影投" />
					<input @input="input_change"  v-if="tab_header_index == 2" v-model="input_model" type="text" value="" @confirm="confirm_click" placeholder="搜索院线" />
					<!--  -->
					<image class="tab_one_image" src="../../../static/gg/tpicon.png" mode=""></image>
					<view class="gang"></view>
					<image class="tab_tow_image" src="../../../static/home/amplification.png" mode=""></image>
					<view @tap="cha_click_show" class="cha" :hidden="input_cha_Br">×</view>
				</view>
			</view>
			
			<!-- 搜索内容 -->
			<view  class="input_sr_data" :hidden="input_AllData_Br ">
				<scroll-view scroll-y show-scrollbar="true">
					<view @tap="nagete_click(item.id)" v-if="tab_header_index ==0" class="input_sr_data_list" v-for="(item,index) in input_AllData.data" :key="index">
						<view class="input_sr_data_list_one">
							<view>{{item.city}}</view>
							<view>{{item.cinema_name}}</view>
						</view>
						<view class="input_sr_data_list_tow">
							{{item.addr}}
						</view>
					</view>
					
					
					<view class="input_sr_data_list_tow"  v-if="tab_header_index ==1">
						<view @tap="nagete_click(item.name)" class="" v-for="(item,index) in input_AllData" :key="index">
							{{item.fullname}}
						</view>
					</view>
					<view class="input_sr_data_list_tow"  v-if="tab_header_index ==2">
						<view @tap="nagete_click(item.cinema_chain)" class="" v-for="(item,index) in input_AllData" :key="index">
							{{item.cinema_chain}}
						</view>
					</view>
					
				</scroll-view>
			</view>
		</view>

		<!-- 输入框地区 -->
		<!-- 地区 -->
		<view class="city_sel_input" :style="{ top: 0 + 'px' }" :hidden="is_show">
			<view class="page__bd">
				<view class="page__bd_cc" @tap="page__bd_cc_click">×</view>
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
					<scroll-view class="page__view_input" scroll-y :scroll-into-view="alpha">
						<!-- 区域 -->
						<view class="title">区域</view>
		
						<view class="page__bd">
							<view class="weui-grids">
								<block v-for="(it, index) in qy" :key="index">
									<view class="weui-grid" @tap="click_grid(it)" :data-name="item" hover-class="weui-grid_active">
										<view class="weui-grid__label">{{ it }}</view>
									</view>
								</block>
							</view>
						</view>
		
						<!-- 热门城市 -->
						<view class="title">热门城市</view>
						<view class="page__bd">
							<view class="weui-grids">
								<block v-for="(it, index) in rm_city" :key="index">
									<view class="weui-grid" @tap="click_grid(it)" :data-name="it" hover-class="weui-grid_active">
										<view class="weui-grid__label">{{ it }}</view>
									</view>
								</block>
							</view>
						</view>
		
						<!-- 城市选择 -->
						<view class="alphabet">
							<view class="alphabet-list">
								<view v-for="(it, index) in zm_list" :id="it.letter" :key="index" class="section-item">
									<view :class="['section-item-header', 'ection-item-header' + it.letter]">{{ it.letter }}</view>
									<!-- data-city="{{cell}}" wx:for-index="cellIndex" -->
									<view v-for="(vv, ii) in it.childer" :key="ii" @tap="click_grid(vv)" class="section-item-cells">
										<view :class="['section-item-cell', ii != it.length - 1 ? 'border-bottom' : '']">
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

	</view>
</template>

<script>
	export default {
		data() {
			return {
				// 处理过的数据 包含了字母和城市
				zm_list: [
					
				],
				// 热门城市
				rm_city: ['北京', '上海', '广州', '深圳 ', '成都', '武汉', '重庆', '杭州', '南京', '苏州'],
				// 区域选择
				qy: ['全国', '一线城市', '二线城市', '三线城市', '四线城市', '五线城市'],
				// 字母
				zm_right: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'],
				inputVal:'',
				placeholder_value:'',
				city_input_data:'全国',
				tab_header_index:0,
					input_model:'',
					input_AllData_Br:true,
					input_cha_Br:true,
				input_AllData:{},
				is_show:true,
				alpha:''
			}
		},
		onLoad(res) {
			let {id} = res;
			this.tab_header_index = id;
			let input_data = '';
			if (id == 0) {
				input_data  = '搜索影院';
			}else if(id == 1){
				 input_data ='搜索影投';
			}else if (id == 2) {
				 input_data ='搜索院线';
			
			}
			this.placeholder_value = input_data;
			this.cityAll_yyData()
		},
			
		methods: {
			async cityAll_yyData() {
				let userType = await this.detection_validity()
				let {data:re} = await this.$http.get({
					url:'/advancedbo/get-provincelist',
					data:{
						type:'city',
						userType
					}
				})
				let rm_city_one = re.hotList; // 热门城市
				let zm_list_city = []; //所有城市和字母
				for (let i in re.list) {
					zm_list_city.push({ letter: i, childer: re.list[i] });
				}
				this.rm_city = rm_city_one;
				this.zm_list = zm_list_city;
			},
			// 输入框地区点击
			click_grid(item){
				// console.log(item);
				this.city_input_data =  item;
				this.is_show = true;
				let data = this.input_model;
				if (data.length != 0) {
					this.confirm_click()
				}
			},
			// 输入框跳转
			dddd(name){
				this.alpha  = name;
			},
			page__bd_cc_click(){
				this.is_show = true;
			},
			city_input_data_click(){
				this.is_show = false;
			},
			// 搜索跳转
			nagete_click(id){
				var index = this.tab_header_index;
				var url = '../../';
				
				if (index == 0) {
					url+='cinema/cinema?code=' +id
				}else if (index == 1) {
					url +='shadow/shadow?code=' + id
				}else {
					url += 'cinema_chain_list/cinema_chain_list?code=' + id
				}
				uni.navigateTo({
					url,
				});
			},
			// 清除内容
			cha_click_show(){
				this.input_model = '';
				this.input_cha_Br = true;
				this.input_AllData_Br = true;
			},
			input_change(e){
				// console.log();
				if (e.detail.cursor  == 0) {
					this.input_cha_Br = true;
					this.input_AllData_Br = true;
				}else {
					this.input_cha_Br = false;
				}
				
			},
			// / 输入框确定事件
			async confirm_click(){
				var city = this.city_input_data;
				var value = this.input_model;
				
				var stype = ''
				var district = '';
				var index = this.tab_header_index;
				if (index == 0) {
					stype = 'cinema'; 
					var i = city.indexOf('全国')
					var ind = city.indexOf('线城市')
					if (i == 0) {
						city = '';
						district = '';
					}else {
						console.log(ind);
						if (ind != -1) {
							district = city;
							city = '';
						}else {
							district = '';
							city = city;
						}
					}
				}else if (index == 1) {
					district="";
					stype = 'brd'; 
					city = '';
				}else {
					stype = 'chain';  
					city = '';
					district="";
				}
				let userType = await this.detection_validity()
				
				let {data:res} = await this.$http.get({
					url:'/topprogram/get-search',
					data:{
						name:value ,
						city:city,
						stype:stype,
						district:district,
						userType
					}
				})
				if (index == 0) {
					res.data.forEach(item=>{
						if (item.addr == null) {
							item.addr = '暂无'
						}
					})
					if (res.data.length == 0) {
						uni.showToast({
							title: '请输入正确的关键字',
							duration:2000,
							icon:'none'
						});
					}
				}else {
					if (res.length == 0) {
						uni.showToast({
							title: '请输入正确的关键字',
							duration:2000,
							icon:'none'
						});
					}
				}
				console.log(res);
				this.input_AllData =res;
				this.input_AllData_Br = false;
			},
		}
	}
</script>

<style lang="less">
.input_sr{
	background-color: #FFFFFF;
	position: fixed;
	top: 0;
	width: 750upx;
	height: 100vh;
	z-index: 1;
	// 内容部分
	.input_sr_data{
		padding:0 30upx;
		scroll-view{
			height: 92vh;
		}
		// scroll-view::-webkit-scrollbar {
		//   display: none;
		// }
		.input_sr_data_list_tow{
			padding-top:25upx;
			view{
				font-size:24upx;
				font-family:PingFangSC-Semibold,PingFangSC;
				font-weight:600;
				color:#4A4A4A;
				border-bottom:1px solid #EEEEEE;
				padding-top:25upx;
				padding-bottom:24upx;
			}
		}
		.input_sr_data_list{
			border-bottom:2upx solid #EEEEEE;
			.input_sr_data_list_one{
				display: flex;
				align-items: center;
				padding-top:20upx;
				padding-bottom:10upx;
				
				view:nth-child(1){
					display: flex;
					justify-content: center;
					align-content: center;
					height:30upx;
					background:rgba(238,238,238,1);
					border-radius:4upx;
					font-size:18upx;
					font-weight:400;
					color:rgba(74,74,74,1);
					padding-right: 10upx;
				}
				view:nth-child(2){
					font-size:24upx;
					font-weight:600;
					color:rgba(74,74,74,1);
				}
			}
			.input_sr_data_list_tow{
				font-size:24upx;
				font-weight:400;
				color:rgba(74,74,74,1);
				padding-bottom: 14upx;
			}
		}
	}
	// 输入框部分
	.input_sr_header{
		display:flex;
		width:750upx;
		// height: 95upx;
		height: 8vh;
		border-bottom:1px solid #F5F6F8;
		.input_sr_city{
			display: flex;
			align-items: center;
			font-size:24upx;
			font-family:PingFangSC-Regular,PingFangSC;
			font-weight:400;
			color:rgba(74,74,74,1);
			height:86upx;
			// padding:0 30upx 0 30upx;
			justify-content: center;
			width:150upx;
			image{
				width: 16upx;
				height: 16upx;
				padding-left: 10upx;
			}
		}	
		//  搜索框
		.tab_one_header {
			padding-top: 10upx;
			background-color: #FFFFFF;
			height:86upx;
			.cha{
				position: absolute;
				left: 620upx;
				font-size: 26upx;
				top: 7upx;
				width:50upx;
				height: 60upx;
				text-align: center;
				line-height: 60upx;
			}
			input {
				width: 518upx;
				height: 60upx;
				box-sizing: border-box;
				border-radius: 30upx;
				background: rgba(245, 246, 248, 1);
				// margin-left: 124upx;
				
				padding: 0 50upx 0 180upx;
				font-size: 24upx;
				font-weight: 400;
				color: rgba(195, 192, 196, 1);
			}
			.gang {
				width: 1upx;
				height: 30upx;
				// border: 1px solid red;
				background-color: rgba(195, 192, 196, 1);
				position: absolute;
				top: 25upx;
				left: 241upx;
			}
			.tab_one_image {
				width: 73upx;
				height: 38upx;
				position: absolute;
				top: 25upx;
				left: 153upx;
			}
			.tab_tow_image {
				width: 30upx;
				height: 30upx;
				position: absolute;
				top: 25upx;
				left: 263upx;
			}
		}
	}
	
}


// city  
/* 城市搜索 */
.city_sel_input{
  width: 750upx;
	// height: 100%;
  position: fixed;
  // top: 0;
  left: 0;
  z-index: 20000;
	background-color: #fff;
}
.city_sel_input .placeholder{
  font-size: 28upx;
    margin: 10upx;
    text-align: center;
    background-color: #fff;
    height: 50upx;
    line-height: 50upx;
    color: #000;
    border: 1upx solid #ccc;
}
.searchbar-result{
    margin-top: 0;
    font-size: 28upx;
}
.searchbar-result:before{
    display: none;
}
.city_sel_input .weui-cell{
    padding: 24upx 30upx 24upx 70upx;
}
.city_sel_input .title{
  font-size: 24upx;
  color: #333;
  padding: 20upx 0;
  padding-left: 20upx;
}

.city_sel_input  .weui-grid__label{
  margin-top: 0;
  font-size: 24upx;
  padding: 5upx 0;
  
}
 .city_sel_input .weui-grid {
   padding: 0;
   width: 28%;
   margin-right: 6%;
   margin-bottom: 20upx;
   border: 1upx solid #ccc
 }
  .city_sel_input .weui-grid:nth-child(3) {
   padding: 0;
   width: 28%;
   margin-right: 0%
 }
   .city_sel_input .weui-grid:nth-child(6) {
   padding: 0;
   width: 28%;
   margin-right: 0%
 }
  .city_sel_input .weui-grid:nth-child(9) {
   padding: 0;
   width: 28%;
   margin-right: 0%
 }
 .city_sel_input .page__bd{
   padding: 0 20upx
 }

.city_sel_input .weui-grids {
	display: flex;
	flex-wrap: wrap;
  border: none;
	text-align: center;
}

.alphanet-selector {
  position: absolute;
  top: 16upx;
  right: 0;
  height: 1334upx;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  box-sizing: border-box;
}
.alphanet-selector .selector-one {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 24upx;
	color: #43c1f4;
  // padding: 0upx 10upx;
  // height: 24upx;
	height: 35upx;
	width: 100upx;
	padding-right: 10upx;
	box-sizing: border-box;
}

/* 城市搜索 结束*/

.page__view_input{
	height: 1334upx;
}

.zb_main .page__bd{
  margin-top: 40upx;
}


  .alphabet-list .section-item .section-item-header {
    display: flex;
    align-items: center;
    font-size: 22rpx;
    color: #a8a8a8;
    background-color: #f2f4f5;
    padding: 4rpx 20rpx;
  }

.alphabet-list .section-item .section-item-cells {
  padding-left: 20rpx; 
}
.alphabet-list .section-item .section-item-cells .section-item-cell{
  font-size: 30rpx;
	line-height: 1.0;
	color: #333333;
  padding: 29rpx 0;
}
.border-bottom {
  border-bottom: 1rpx solid #dbdbdb;
}
</style>
