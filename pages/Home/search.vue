<template>
	<view>
		<view class="nav_header" id="the_id">
			<!-- @input="nav_header_input" -->
			<view class="nav_input" >
				<input @change="change_input" @confirm="nav_header_input" v-model="input_value_data" type="text" value="" placeholder="搜索影人/影片/公司" />
				<view class="icon"><image src="../../static/home/ic.png" mode=""></image></view>
				<view class="xian">|</view>
				<view class="amplification"><image src="../../static/home/amplification.png" mode="" /></view>
				<view @tap="input_click_clear" :hidden="input_value_data.length == 0" class="cha">×</view>
			</view>
		</view>
		
		
		
		
		<!-- s搜索弹出   有了这一段之后 会在h5 端 整个页面不显示 -->
		<view class="search" :style="{ height: winhei + 'px',marginTop:top_hei +'px'}"  :hidden="input_Br" >
			<scroll-view  :style="{ height: winhei + 'px' }" scroll-y >
				<view class="search_imagined_title" v-if="!input_All_data.credit_Br">影人</view>
				<view class="search_imagined" :hidden="input_All_data.credit_Br">
					<!-- 只展示一条数据 -->
					<view class="search_imagined_figure" v-for="(item,index) in input_All_data.credit.data" @tap="dd_tz(0,item.id)" :key="index">
						<image :src="'https://db.topcdb.com' +item.mtimeimg" v-if="item.mtimeimg != ''" mode=""></image>
						<image src="../../static/big-plate/available_poster.png" v-if="!(item.mtimeimg != '')" mode=""></image>
						<view class="search_imagined_figure_zs">
							<view class="search_imagined_figure_zs_title">
								<view>{{item.nameCn}}</view>
								<view>{{item.sbo}}</view>
							</view>
							<view class="search_imagined_figure_zs_quantity">{{item.movie_num}}部</view>
							<view class="search_imagined_figure_zs_identity">{{item.profession}}</view>
							<view class="search_imagined_figure_zs_production">代表作：{{item.lastmname}}</view>
						</view>
					</view>
					<view class="search_imagined_figure_bottom" @tap="search_tap_tz(1)" :hidden="input_All_data.credit_Br">查看全部{{ input_All_data.credit.count}}位相关影人</view>
				</view>
				
				<view class="search_imagined_title" v-if="!input_All_data.movie_Br">影片</view>
				<view class="search_gs"  :hidden="input_All_data.movie_Br">
					<view class="search_gs_yp" v-for="(item,index) in input_All_data.movie.data"  @tap="dd_tz(1,item.zz_id,item.id)" :key="index">
						<image :src="'https://db.topcdb.com' +item.img" v-if="item.img != 'undefined/'" mode=""></image>
						<image src="../../static/big-plate/available_poster.png" v-if="!(item.img != 'undefined/')" mode=""></image>
						<view class="search_gs_yp_data">
							<view class="search_gs_yp_data_title">
								<view class="">{{item.zz_name}}</view>
								<view>{{item.total_bo}}</view>
							</view>
							<view class="search_gs_yp_data_bo">{{item.wat_ch}}人想看</view>
							<view class="search_gs_yp_data_xk">
								<view>主演:{{item.director_name}}</view>
								<view>{{item.material}}</view>
								<view>{{item.publish_date}} 上映</view>
							</view>
						</view>
					</view>
					<view class="search_gs_yp_bottom" @tap="search_tap_tz(2)" :hidden="input_All_data.movie_Br">查看全部{{input_All_data.movie.count}}部相关影片</view>
				</view>
				
				<view class="search_imagined_title"   v-if="!input_All_data.company_Br">公司</view>
				<view class="search_film"  :hidden="input_All_data.company_Br">
					<view class="search_film_gs" v-for="(item,index) in input_All_data.company.data"   @tap="dd_tz(2,item.id)" :key="index">
						<!-- <image src="../../static/big-plate/available_poster.png" mode=""></image> -->
						<!-- com/ -->
						<view class="search_film_gs_data">
							<view class="search_film_gs_data_title">
								<view class="">{{item.name}}</view>
								<view>{{item.sbo}}</view>
							</view>
							<view class="search_film_gs_data_bo">{{item.movie_num}}部</view>
							<view class="search_film_gs_data_xk">代表作：{{item.zz_name}}</view>
						</view>
					</view>
					<view class="search_gs_yp_bottom" @tap="search_tap_tz(3)" :hidden="input_All_data.company_Br">查看全部{{input_All_data.company.count}}个公司</view>
				</view>
			</scroll-view>
		</view>
		
	</view>
</template>
<script>
export default {
	data() {
		return {
			winhei:'',
				input_Br:true,
				input_value_data:'',
				input_value:'',
				input_All_data:[],// 输入框搜索出来的数据
				top_hei:0,
		};
	},
	created(){
		let that = this;
		
		uni.getSystemInfo().then(item => {
			let top_hei = uni.upx2px(90)
			that.top_hei = top_hei;
			var d = item[1].windowHeight - 0;
			that.winhei  =  d - top_hei
		});
	},
	onLoad() {
		
	},
	methods: {
		// input_xq_data
		search_tap_tz(index){
			// console.log(this.baseURL);
			// 1 是影人 2 是影片 3 是公司
			var data = this.input_All_data;
			var value = this.input_value;
			if (index == 1) {
				
				var da = data.movie.data;
				var ind = data.movie.count;
				if(da.length != ind){
					uni.navigateTo({
						url:'../../pagesA/search_xq/search_xq?type=credit&index=1&name=' + value
					})
				}else{
					uni.showToast({
						title:'无更多数据',
						icon:'none',
						duration:2000,
					})
				}
			}else if (index == 2) {
				var da = data.credit.data;
				var ind = data.credit.count;
				if(da.length != ind){
					uni.navigateTo({
						url:'../../pagesA/search_xq/search_xq?type=movie&index=2&name=' + value
					})
				}else{
					uni.showToast({
						title:'无更多数据',
						icon:'none',
						duration:2000
					})
				}
			}else if (index == 3) {
				var da = data.company.data;
				var ind = data.company.count;
				if(da.length != ind){
					uni.navigateTo({
						url:'../../pagesA/search_xq/search_xq?type=company&index=3&name=' + value
					})
				}else{
					uni.showToast({
						title:'无更多数据',
						icon:'none',
						duration:2000
					})
				}
			}
		},
		dd_tz(inde,id,z_id){
			// 0 影人 1 影片 2 公司
			var url  = '';
			if (inde == 0) {
				url = '../../pagesB/data-bank/yp_list/yp_list?id=' + id
			}else if (inde == 1) {
				
				url = '../../pagesA/dy_particulars/dy_particulars?id='+ id + '&mid=' + z_id
			}else if (inde == 2) {
				url = '../../pagesB/data-bank/company_xp/company_xp?id=' +id
			}
			uni.navigateTo({
				url,
			})
		},
		input_click_clear(){
			this.input_value_data = '';
			this.input_All_data = [];
			this.input_Br = true;
		},
		//  顶部输入框输入东西之后执行input事件
		async nav_header_input(e) {
			var value = this.input_value_data;
			if (value.length  == 0) {
		
				return '';
		
			}
			let	userType = await  this.detection_validity()
			//事件防抖
				this.input_value = value;
				// console.log(e.detail.value);
				var url ='/topprogram/get-search';
				let data = {
					name:value,
					userType
				}
				let {data:res} = await this.$http.get({
					url,
					data,
				})
				console.log(res)
				var Br = [];
				for (let i in res) {
					if (res[i].count == '0') {
						Br.push(true);
					} else {
						Br.push(false);
					}
				}
				if (Br[0] && Br[1] && Br[2]) {
					uni.showToast({
						title: '请输入正确的关键字',
						duration: 2000,
						icon: 'none'
					});
					this.input_Br = true;
					return false;
				} else {
					var index_Br = 0;
					for (var i = 0; i < Br.length; i++) {
						if (Br[i] == false) {
							index_Br++
						}
					}
					var arr = {};
					var company = {count:res.company.count,data:[]};
					var credit = {count:res.credit.count,data:[]};
					var movie= {count:res.movie.count,data:[]}
					if (res.company.count != 0) {
						res.company.data.forEach((item,index) =>{
							// 总票房
							if (item.zz_name == null) {
								item.zz_name == '暂无'
							}
							// arr['company'] = {count:}
								if (Number(item.sbo) / 100000000 >1) {
									item.sbo = (Number(item.sbo) / 100000000).toFixed(2) + '亿票房'
								}else {
									item.sbo = (Number(item.sbo) / 10000).toFixed(2) +'万票房'
								}
							// movie_num 影片数量  代表作暂无
							if (index_Br == 1) {
								if (index < 3) {
									company.data.push(item)
								}
								
							}else if (index_Br == 2) {
								if (index <2) {
									company.data.push(item)
								}
							}else if (index_Br == 3) {
								if (index <1) {
									company.data.push(item)
								}
							}
						})
						arr.company_Br = false;
					}else {
						arr.company_Br = true;
					}
					
					
					// 影人/
					if (res.credit.count != 0) {
						res.credit.data.forEach((item,index) =>{
							// 票房
							if (Number(item.sbo) / 100000000 >1) {
								item.sbo = (Number(item.sbo) / 100000000).toFixed(2)+'亿票房' 
							}else {
								item.sbo = (Number(item.sbo) / 10000).toFixed(2)+'万票房' 
							}
							
							if (index_Br == 1) {
								if (index < 3) {
									credit.data.push(item)
								}
								
							}else if (index_Br == 2) {
								if (index <2) {
									credit.data.push(item)
								}
							}else if (index_Br == 3) {
								if (index <1) {
									credit.data.push(item)
								}
							}
						})
						// profession 角色 nameCn name
						arr.credit_Br = false;
					}else {
						arr.credit_Br = true;
					}
					
					// 影片
					if (res.movie.count != 0) {
						res.movie.data.forEach((item,index) =>{
							// total_bo 累计票房
							
							if (item.director_name == null) {
								item.director_name = '暂无';
							}
							if (item.publish_date == null) {
								item.publish_date = '---'
							}
							if (Number(item.total_bo) / 100000000 > 1) {
								item.total_bo = (Number(item.total_bo) / 100000000).toFixed(2)+ '亿票房'
							}else {
								item.total_bo = (Number(item.total_bo) / 10000).toFixed(2)+ '万票房'
							}
							// if (index == 0) {
							// 	movie.data.push(item)
							// }
							var  wat_ch = (Number(item.douban_wantwatch) + Number(item.maoyan_wantwatch) +Number(item.tpp_wantwatch)) / 2;
							
							item.wat_ch = wat_ch.toFixed(0);
							if (index_Br == 1) {
								if (index < 3) {
									movie.data.push(item)
								}
								
							}else if (index_Br == 2) {
								if (index <2) {
									movie.data.push(item)
								}
							}else if (index_Br == 3) {
								if (index <1) {
									movie.data.push(item)
								}
							}
						})
						arr.movie_Br = false;
					}else {
						arr.movie_Br = true;
					}
					arr.company = company;
					arr.credit = credit;
					arr.movie = movie;
					// this.input_xq_data = res;
					this.input_All_data = arr;
					this.input_Br = false;
				}
		},
		change_input(e){
			var value = e.detail.value;
			if (value.length == 0) {
				this.input_value_data = '';
				this.input_All_data = [];
				this.input_Br = true;
				this.input_value = '';
			}
		},
	}
};
</script>
<style lang="less">
	@import url('./search.less');
.nav_header {
	// padding-top: 40upx;
	position: fixed;
	top: 0;
	background-color: rgba(255, 255, 255, 1);
	width: 100%;
	height: 90upx;
	display: flex;
	align-items: center;
	justify-content: center;
	z-index: 10;
	.xian {
		// color:rgba(245,246,248,1);
		color: rgba(195, 192, 196, 1);
		position: absolute;
		left: 110upx;
	}
	.nav_input {
		width: 518upx;
		height: 60upx;
		box-sizing: border-box;

		position: relative;
		
		input {
			width: 100%;
			height: 100%;
			background: rgba(245, 246, 248, 1);
			border-radius: 30upx;
			box-sizing: border-box;
			font-size: 24upx;
			padding-left: 175upx;
			position: absolute;
			padding-right: 70upx;
		}
		.icon {
			z-index: 10000;
			position: absolute;
			top: 10upx;
			left: 29upx;

			image {
				width: 73upx;
				height: 38upx;
				z-index: 10000;
			}

			// top: 66px;
		}
		.amplification {
			position: absolute;
			left: 130upx;
			top: 10upx;
			image {
				width: 30upx;
				height: 30upx;
			}
		}

		.cha {
			position: absolute;
			left: 470upx;
			font-size: 36upx;
		}
	}
}
</style>
