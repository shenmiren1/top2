<template>
	<view>
		<view class="header">
			<view class="header_one">
				<!-- <image src="../../../static/big-plate/available_poster.png" mode=""></image> -->
				<view class="header_js">
					<view>{{Alldata.companyData.name}}</view>
					<view> Wanda Med</view>
					<view>{{Alldata.companyData.nature}}</view>
				</view>
			</view>

			<view class="father_view">
				<view class="title">
					<view>{{time}}年电影作品（{{Alldata.companyData.now_nums}}部）</view>
					<view>累计{{Alldata.companyData.nums}}部
					 <!-- <image src="../../../static/publicity/next.png" mode=""></image> -->
					</view>
				</view>
				<view class="one">
					<veiw class="one_title">
						<view>
							主出品
						</view>
						<view> {{Alldata.companyData.cp_num}}部</view>
					</veiw>
					<view class="one_title">
						<view>出品总票房</view>
						<veiw> {{Alldata.companyData.cp_total_bo}}</veiw>
					</view>
					<view class="one_title">
						<view>出品总票房排名 </view>
						<view>{{Alldata.companyData.cp_rank}}</view>
					</view>
				</view>
				
				
				<view class="one">
					<veiw class="one_title">
						<view>
							主发行
						</view>
						<view> {{Alldata.companyData.fx_num}}部</view>
					</veiw>
					<view class="one_title">
						<view>发行总票房</view>
						<veiw>  {{Alldata.companyData.fx_total_bo}}</veiw>
					</view>
					<view class="one_title">
						<view>发行总票房排名 </view>
						<view> {{Alldata.companyData.fx_rank}}</view>
					</view>
				</view>
			</view>
		</view>
		
		
		
		<!-- 电影代表作品-->
		<view class="father_production">
			<view class="title">
				<view>电影代表作品</view>
				<view @tap="father_production_click">全部作品 <image src="../../../static/big-plate/next.png" mode=""></image></view>
			</view>
			<view class="father_production_data">
				<view class="father_production_data_movie" v-for="(item,i) in Alldata.movieList" :key="i"> 
					<!-- <image src="../../../static/big-plate/available_poster.png" mode=""></image> -->
					<image :src="'https://db.topcdb.com' + item.img" mode=""></image>
					<view >
						{{item.zz_name}}
					</view>
					<view>{{item.bo}}票房</view>
				</view>
			</view>
		</view>
		
		<view class="company_message">
			<view class="company_message_title">
				公司信息
			</view>
			<view class="company_message_bottom">
					<view class="company_message_bottom_data">公司性质：<text class="data_xx"></text></view>
					<view class="company_message_bottom_data">公司类型：<text class="data_xx">{{Alldata.companyData.nature}}</text></view>
					<view class="company_message_bottom_data">公司地址：<text class="data_xx"></text></view>
					<view class="company_message_bottom_data" >
						公司电话：<text class="data_xx"></text>
					</view>
					<view class="company_message_bottom_data">公司网址：<text class="data_xx"></text></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				Br_movieList:false, // 作品数量是否大于四 大于四 支持跳转 等于或者小于四 不支持跳转
				Alldata:[],
				time:'',
				id:'',
			}
		},
		onLoad(res) {
			let {
				id: id
			} = res;
			var url = '/topprogram/company-detail-msg'
			let All_data = {
				id:id
			}
			this.db_index(url,All_data)
			var time = new Date()
			time = time.getFullYear()
			this.time = time;
			this.id = id;
		},
		methods: {
			// 全部作品
			father_production_click(){
				var Br = this.Br_movieList;
				let id = this.id;
				if (Br) {
					uni.navigateTo({
						url:'./list/list?id='+id
					})
				}else {
					uni.showToast({
						title:'没有更多作品',
						icon:'none',
						duration:2000
					})
					return false;
				}
			},
			// 接口
			async db_index(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let ra  = await this.$http.get({
					url,
					data:All_data
				})
				
				var a = ''
				var Br = false;
				if (ra.data.companyData.is_cp == 0) {
				}else {
					Br = true;
					a = '出品公司'
				}
				
				if (ra.data.companyData.is_faxing == 0) {
				}else {
					if (Br) {
						a= a + '| 发行公司'
					}else {
						a = '发行公司'
					}
					
				}
				
				// 出品票房
				var da = Number(ra.data.companyData.cp_total_bo)
				if (da / 100000000 > 1) {
					ra.data.companyData.cp_total_bo  = (da / 100000000).toFixed(2) + '亿'
				}else {
					ra.data.companyData.cp_total_bo  = (da / 10000).toFixed(2) + '万'
				}
				
				// 发行票房  
				var fx_total_bo = Number(ra.data.companyData.fx_total_bo)
				if (da / 100000000 > 1) {
					ra.data.companyData.fx_total_bo  = (fx_total_bo / 100000000).toFixed(2) + '亿'
				}else {
					ra.data.companyData.fx_total_bo  = (fx_total_bo / 10000).toFixed(2) + '万'
				}
				var arr =[];
				var Br_movieList = false;
				if (ra.data.movieList.length > 4) {
					Br_movieList = true;
					console.log( ra.data.movieList);
					uni.setStorage({
					    key: 'movieList',
					    data: ra.data.movieList,
					    success: function () {
					    }
					});
				}else {
					Br_movieList = false;
				}
				 ra.data.movieList.forEach((item,i) =>{
					if (i <=3) {
						if (Number(item.bo ) / 100000000 >1) {
							item.bo = Number(item.bo / 100000000).toFixed(2) + '亿'
						}else{
							item.bo = Number(item.bo / 10000).toFixed(2) + '万'
						}
						// return item	
						arr.push(item)
					}
					
				})
				this.Br_movieList = Br_movieList;
				ra.data.movieList  = arr;
				ra.data.companyData.nature = a;
				this.Alldata = ra.data;
			}
		}
	}
</script>

<style lang="less">
	@import url('./index.less');
</style>
