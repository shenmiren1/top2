<template>
	<view>
		<!-- s搜索弹出  -->
		<view class="search"   >
				<view class="search_imagined" :hidden="input_All_data.credit_Br" >
					<!-- 只展示一条数据 -->
					<view class="search_imagined_figure" v-for="(item,index) in input_All_data.data" @tap="ta(0,item.id)" :key="index">
					<image :src="'https://db.topcdb.com' +item.mtimeimg" v-if="item.mtimeimg != null" mode=""></image>
					<image src="../../static/big-plate/available_poster.png" v-if="!(item.mtimeimg != null)" mode=""></image>
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
				</view>
				
				<view class="search_gs"  :hidden="input_All_data.movie_Br" >
					<view class="search_gs_yp" v-for="(item,index) in input_All_data.data"  @tap="ta(1,item.zz_id,item.id)" :key="index">
						<image :src="'https://db.topcdb.com' +item.img" v-if="item.img != null" mode=""></image>
						<image src="../../static/big-plate/available_poster.png" v-if="!(item.img != null)" mode=""></image>
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
				</view>
				
				<view class="search_film"  :hidden="input_All_data.company_Br" >
					<view class="search_film_gs" v-for="(item,index) in input_All_data.data"  @tap="ta(2,item.id)" :key="index">
						<!-- <image src="../../static/big-plate/available_poster.png" mode=""></image> -->
						<view class="search_film_gs_data">
							<view class="search_film_gs_data_title">
								<view class="">{{item.name}}</view>
								<view>{{item.sbo}}</view>
							</view>
							<view class="search_film_gs_data_bo">{{item.movie_num}}部</view>
							<view class="search_film_gs_data_xk">代表作：{{item.zz_name}}</view>
						</view>
					</view>
				</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				input_All_data:[],
			}
		},
		onLoad(res) {
			// 1 是影人 2 是影片 3 是公司
			let {type,index,name} = res;
			if (index == 1) {
				uni.setNavigationBarTitle({
					title:'相关影人'
				}) 
				
				
				
			}else if (index == 2) {
				uni.setNavigationBarTitle({
					title:'相关影片'
				})
			}else if (index == 3) {
				uni.setNavigationBarTitle({
					title:'相关公司'
				})
			}
			var url = this.baseURL + '/topprogram/get-search-detail?name=' +name + '&stype='+type
			this.db_index(url,index)
			console.log(url);
		},
		methods: {
			ta(inde,id,z_id){
				var url = ''
					// 1 是影人 2 是影片 3 是公司
				// pagesB/data-bank/yp_list/yp_list?id=76114
				// pagesA/dy_particulars/dy_particulars?id=19117&mid=4178]
				// [pagesB/data-bank/company_xp/company_xp?id=1]
				if (inde == 0) {
					url = '../../pagesB/data-bank/yp_list/yp_list?id=' + id
				}else if (inde == 1) {
					
					url = '../dy_particulars/dy_particulars?id='+ id + '&mid=' + z_id
				}else if (inde == 2) {
					url = '../../pagesB/data-bank/company_xp/company_xp?id=' +id
				}
				uni.navigateTo({
					url,
				})
			},
			db_index(url,index_fa){
				uni.showLoading({
					title:'数据加载中',
					mask:false
				})
				uni.request({
					url,
				}).then(dd =>{
					let [errer,ra] = dd;
					var res = ra.data;
					// 1 是影人 2 是影片 3 是公司
					if (index_fa == 1) {
						res.data.forEach((item,index) =>{
							// 票房
							
							if (Number(item.sbo) / 100000000 >1) {
								item.sbo = (Number(item.sbo) / 100000000).toFixed(2)+'亿票房' 
							}else {
								item.sbo = (Number(item.sbo) / 10000).toFixed(2)+'万票房' 
							}
							if (item.mtimeimg == '') {
								item.mtimeimg = null
							}
							// 代表作 lastmname  movie_num作品数  img mtimeimg
							// if (index == 0) {
							// 	credit.data.push(item)
							// }
							
						})
						res.credit_Br = false;
						res.company_Br = true;
						res.movie_Br = true;
					}else if (index_fa == 2) {
						res.data.forEach((item,index) =>{
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
							if (item.img == '') {
								item.img = null
							}
							var  wat_ch = (Number(item.douban_wantwatch) + Number(item.maoyan_wantwatch) +Number(item.tpp_wantwatch)) / 2;
							item.wat_ch = wat_ch.toFixed(0);
							})
						res.movie_Br = false;
						res.credit_Br = true;
						res.company_Br = true;
					}else if (index_fa == 3) {
						res.data.forEach((item,index) =>{
							// 总票房
							if (item.zz_name == null) {
								item.zz_name == '暂无'
							}
							// res['company'] = {count:}
								if (Number(item.sbo) / 100000000 >1) {
									item.sbo = (Number(item.sbo) / 100000000).toFixed(2) + '亿票房'
								}else {
									item.sbo = (Number(item.sbo) / 10000).toFixed(2) +'万票房'
								}
							// movie_num 影片数量  代表作暂无
							
						})
						res.company_Br = false;
						res.movie_Br = true;
						res.credit_Br = true;
					}
					
					this.input_All_data = res
					uni.hideLoading()
				})
			}
		}
	}
</script>

<style lang="less">
@import url('search.less');
</style>
