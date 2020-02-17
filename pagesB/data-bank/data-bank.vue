<template>
	<view>
		<!-- <h1>资料库</h1> -->
		<view class="header">
			<block v-for="(item,i) in header_data" :key="i">
				<view  @tap="header_click(i)">
					<text :class="[header_index  == i ? 'active' : '']">{{item}}</text>
				</view>
			</block>
		</view>

		<!-- tabone -->
		<view :hidden="!(header_index == 0)" class="tabone">
			<view class="tabone_data" v-for="(item,i) in tabone_title_data" :key="i">
				<view class="tabone_title">
					<view>{{item.name}}:</view>
				</view>
				<view class="tabone_conter">
					<scroll-view scroll-x>
						<view :style="{color: init_index == id ? '#F08E2D' : ''}" v-if="i == 0" @tap="tabone_title_oneTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
						<!-- // 年代 -->

						<view v-if="i == 1 && id != 1 && id == 0" :style="{color: year_index == id ? '#F08E2D' : ''}" @tap="tabone_title_towTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						<picker @change="picker_change" @cancel="picker_cancel" class="pickeraa" v-if="i == 1" mode="multiSelector"
						 :range="range">
							<view v-if="i == 1 && id == 1" :style="{color: year_index == id ? '#F08E2D' : ''}" @tap="tabone_title_towTap(it,id)"
							 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						</picker>
						<view v-if="i == 1 && id != 1 && id != 0" :style="{color: year_index == id ? '#F08E2D' : ''}" @tap="tabone_title_towTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						<!-- 地区 -->
						<view v-if="i == 2 " :style="{color: map_index == id ? '#F08E2D' : ''}" @tap="tabone_title_threeTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
						<!-- 排序 -->
						<view v-if="i == 3 " :style="{color: px_index == id ? '#F08E2D' : ''}" @tap="tabone_title_fourTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
					</scroll-view>
				</view>
			</view>
		</view>


		<!-- tabtow -->
		<view :hidden="!(header_index == 1)" class="tabtow">
			<view class="tabone_data" v-for="(item,i) in tabtow_title_data" :key="i">
				<view class="tabone_title">
					<view>{{item.name}}:</view>
				</view>
				<view class="tabone_conter">
					<scroll-view scroll-x>
						<!-- 参与身份-->
						<view :style="{color: sf_index_tow == id ? '#F08E2D' : ''}" v-if="i == 0" @tap="tabtow_title_oneTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
						<!-- // 作品类型 -->
						<view class="" v-if="i == 1 " :style="{color: init_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_towTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">
							{{it}}
						</view>
						<!-- 作品年代 -->
						<view v-if="i == 2 && id != 1 && id == 0" :style="{color: year_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_threeTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>

						<picker @change="picker_change_tow" @cancel="picker_cancel_tow" class="pickeraa" v-if="i == 2" mode="multiSelector"
						 :range="range">
							<view v-if="i == 2 && id == 1" :style="{color: year_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_threeTap(it,id)"
							 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						</picker>

						<view v-if="i == 2 && id != 1 && id != 0" :style="{color: year_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_threeTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						<!-- 作品地区 -->
						<view v-if="i == 3 " :style="{color: map_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_fourTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
						<!-- 排序 -->
						<view v-if="i == 4 " :style="{color: px_index_tow == id ? '#F08E2D' : ''}" @tap="tabtow_title_fiveTap(it,id)"
						 v-for="(it,id) in item.child" :key="id">{{it}}</view>
					</scroll-view>
				</view>
			</view>
		</view>

		
		<!-- tabthree -->
		<view :hidden="!(header_index == 2)" class="tabtow">
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
						<!-- 排序 -->
						<view v-if="i == 3 " :style="{color: px_index_three == id ? '#F08E2D' : ''}" @tap="tabthree_title_threeTap(it,id)" v-for="(it,id) in item.child"
						 :key="id">{{it}}</view>
					</scroll-view>
				</view>
			</view>
		</view>
		
		
		<!-- 内容部分 -->
		<view class="bottom">
			<view class="bottom_header" @tap="yp_cick(item.id,item.zz_id,item.movie_id)" v-for="(item,i) in yp_alldata" :key="i">
				<image v-if="header_index ==0" class="image_data" :src="item.img == undefined ? '' :  'https://db.topcdb.com' + item.img" mode=""></image>
				<!-- <image v-if="" class="image_data" :src="'https://db.topcdb.com' + item.img" mode=""></image> -->
				
				<image v-if="header_index ==1" class="image_data" :src="item.mtimeimg == undefined ? '../../static/big-plate/available_poster.png' : item.mtimeimg" mode=""></image>
				<!-- <image v-if="header_index ==2" class="image_data" src="../../static/big-plate/available_poster.png" mode=""></image> -->
				<view class="bottom_data"  v-if="header_index != 2">
					<!-- 名字 -->
					<view class="bottom_name">
						<view class="bottom_name_one">
							<image v-if="i ==0" src="../../static/list/one.png" mode=""></image>
							<image v-if="i ==1" src="../../static/list/tow.png" mode=""></image>
							<image v-if="i == 2" src="../../static/list/three.png" mode=""></image>
							<text v-if="header_index ==0">{{item.zz_name}}</text>
							<text v-if="header_index ==1">{{item.nameCn}}</text>
							<text v-if="header_index ==2">{{item.name}}</text>
							
						</view>
						<view class="bottom_name_tow_data">
							<!-- 主演导演 -->
							<view class="bottom_zy">
								<!-- 主演: 唐纳德·格洛弗 等 -->
								<view v-if="header_index ==1" :style="{paddingTop:'10px'}"></view>
								<text v-if="header_index ==0">导演： {{item.director_name}}</text>
								<text v-if="header_index ==1">{{item.profession}}</text>
							</view>
							<!-- 0 的模式 -->
							<view class="bottom_init" v-if="header_index ==0">
								{{item.material}}
							</view>
							<!-- 日期那一部分 -->
							<view class="bottom_time">
								<text v-if="header_index ==0">{{item.publish_date}} 上映</text>
								<text v-if="header_index ==1">代表作 : {{item.lastmname}}</text>
								<text v-if="header_index ==2">代表作 : {{item.zz_name}}</text>
								
							</view>
						</view>
						
					</view>

					<view v-if="header_index ==1" class="bottom_zy_paddingTop"></view>
					<view v-if="header_index ==2" class="bottom_gs_paddingTop"></view>
					<view class="bottom_name_tow">
						<view class="one">
							<text v-if="header_index ==0">{{item.total_bo_s}}</text>
							<text v-if="header_index ==1 || header_index == 2">{{item.sbo}}</text>
						</view>
						
						
						     
						     
						     
						     
						
						<view class="three" v-if="header_index ==0 &&  px_data == 'tpp_want' ">淘票票:{{item.tpp_score}}评分  </view>
						<view class="three" v-if="header_index ==0 &&   px_data == 'maoyan_want'">  猫眼:{{item.maoyan_score}}评分</view>
						<view class="three" v-if="header_index ==0 &&   px_data == 'douban_want'">豆瓣：{{item.douban_score}}评分</view>
						<view class="tow">
							
							<text v-if="header_index ==0">{{item.want}}人想看</text>
							<text v-if="header_index ==1 || header_index == 2">{{item.movie_num}}部</text>
						</view>
					</view>
					
				</view>
				
				
				
				<view class="bottom_data_dd"  v-if="header_index == 2">
					<!-- 名字 -->
					<view class="bottom_name">
						<view class="bottom_name_one">
							<image v-if="i ==0" src="../../static/list/one.png" mode=""></image>
							<image v-if="i ==1" src="../../static/list/tow.png" mode=""></image>
							<image v-if="i == 2" src="../../static/list/three.png" mode=""></image>
							<text v-if="header_index ==0">{{item.zz_name}}</text>
							<text v-if="header_index ==1">{{item.nameCn}}</text>
							<text v-if="header_index ==2">{{item.name}}</text>
							
						</view>
						<view class="bottom_name_tow_data">
							<!-- 主演导演 -->
							<view class="bottom_zy">
								<!-- 主演: 唐纳德·格洛弗 等 -->
								<view v-if="header_index ==1" :style="{paddingTop:'10px'}"></view>
								<text v-if="header_index ==0">导演： {{item.director_name}}</text>
								<text v-if="header_index ==1">{{item.profession}}</text>
							</view>
							<!-- 0 的模式 -->
							<view class="bottom_init" v-if="header_index ==0">
								{{item.material}}
							</view>
							<!-- 日期那一部分 -->
							<view class="bottom_time">
								<text v-if="header_index ==0">{{item.publish_date}} 上映</text>
								<text v-if="header_index ==1">代表作 : {{item.lastmname}}</text>
								<text v-if="header_index ==2">代表作 : {{item.zz_name}}</text>
								
							</view>
						</view>
						
					</view>
				
					<view v-if="header_index ==1" class="bottom_zy_paddingTop"></view>
					<view v-if="header_index ==2" class="bottom_gs_paddingTop"></view>
					<view class="bottom_name_tow">
						<view class="one">
							<text v-if="header_index ==0">{{item.total_bo_s}}</text>
							<text v-if="header_index ==1 || header_index == 2">{{item.sbo}}</text>
						</view>
						<view class="three" v-if="header_index ==0">{{item.maoyan_score}}评分</view>
						<view class="tow">
							
							<text v-if="header_index ==0">{{item.want}}人想看</text>
							<text v-if="header_index ==1 || header_index == 2">{{item.movie_num}}部</text>
						</view>
					</view>
					
				</view>
			</view>


		</view>
	</view>
</template>

<script>
	import moment from '@/components/moment';
	// var this = ''

	export default {
		onShareAppMessage(){},
		data() {
			return {
				// tabthree
				cy_sf_three: '', // 参与身份默认不限
				startDate_three: '', // 自定义日期 开始结
				endDate_three: '', // 自定义日期 开始结
				px_data_three: 'bo', //排序方式默认按票房排序
				init_data_three: '', //s什么类型 默认不限
				year_three: '', // 当前选择的年 默认为 不限
				
				sf_index_three:0,
				init_index_three:0,
				year_index_three:0,
				px_index_three:0,
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
					},{
						name: '排序',
						child: ['按票房排序','按作品数量']
					}
				],
				// tabthree
				cy_sf_tow: '', // 参与身份默认不限
				startDate_tow: '', // 自定义日期 开始结
				endDate_tow: '', // 自定义日期 开始结
				px_data_tow: 'bo', //排序方式默认按票房排序
				init_data_tow: '', //s什么类型 默认不限
				gj_map_data_tow: '', // 地区中的 国家 默认不限
				year_tow: '', // 当前选择的年 默认为 不限

				sf_index_tow: 0,
				init_index_tow: 0,
				year_index_tow: 0,
				map_index_tow: 0,
				px_index_tow: 0,
				tabtow_title_data: [{
						name: '参与身份',
						child: ['导演', '演员', '编剧', '制作人', '美术设计', '摄影', '原创音乐']
					},
					{
						name: '作品类型',
						child: ['不限', '剧情', '科幻', '奇幻', '喜剧', '爱情', '动画', '动作', '惊悚', '战争', '戏曲', '歌舞', '音乐', '文艺', '纪录']
					}, {
						name: '作品年代',
						child: ['不限', '自定义', '2019年以后', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011及以前']
					}, {
						name: '作品地区',
						child: ['不限', '中国大陆', '中国香港', '中国台湾', '美国', '日本', '韩国', '印度', '泰国', '英国', '俄罗斯']
					}, {
						name: '排序',
						child: ['按票房排序', '按作品数量']
					}
				],

				range: [

				],
				startDate: '', // 自定义日期 开始结
				endDate: '', // 自定义日期 开始结
				px_data: 'bo', //p排序方式默认按票房排序
				init_data: '', //s什么类型
				gj_map_data: '', // 地区中的 国家
				yj_map_data: '', // 地区中的 引进模式
				year: '', // 当前选择的年 默认为 不限
				yp_alldata: [
				], // 影片所有数据
				init_index: 0, // 类型选中
				year_index: 0, // 年代选中
				map_index: 0, // 地区选中
				px_index: 0, // 排序选中
				header_data: ['影片库', '影人库', '公司库'],
				header_index: 0,
				tabone_title_data: [{
					name: '类型',
					child: ['不限', '剧情', '科幻', '奇幻', '喜剧', '爱情', '动画', '动作', '惊悚', '战争', '戏曲', '歌舞', '音乐', '文艺', '纪录']
				}, {
					name: '年代',
					child: ['不限', '自定义', '2019年以后', '2019', '2018', '2017', '2016', '2015', '2014', '2013', '2012', '2011及以前']
				}, {
					name: '地区',
					child: ['不限', '国产', '进口', '合拍', '分账', '买断', '中国大陆', '中国香港', '中国台湾', '美国', '日本', '韩国', '印度', '泰国', '英国', '俄罗斯']
				}, {
					name: '排序',
					child: ['按票房排序' ,'按淘票票评分','按猫眼评分','按豆瓣评分', '按照想看排序']
				}],
			}
		},
		onLoad() {
			var url = '/topprogram/get-database'
			let All_data = {
				dtype:'movie',
				group:'bo'
			}
			this.index_yp(url,All_data)
			this.data_yaer()
		},
		methods: {
			// 跳转影片详情页
			yp_cick(id,zz_id,mid){
				var header_index = this.header_index;
				if (header_index == 0) {
					uni.navigateTo({
						url:'../../pagesA/dy_particulars/dy_particulars?id=' + zz_id+ '&mid=' +id
					})
				}else if (header_index == 1) {
					uni.navigateTo({
						url:'./yp_list/yp_list?id=' +id
					})
				}else if (header_index == 2) {
					uni.navigateTo({
						url:'./company_xp/company_xp?id=' + id
					})
				}
				
			},
			// tabthree
			picker_change_three(e){
				var value = e.detail.value;
				console.log(value);
				var range = this.range;
				var startDate = '';
				var endDate = '';
				if (value[0] < value[1]) {
					startDate = range[1][value[1]]
					endDate = range[0][value[0]]
				}else {
					startDate = range[0][value[0]]
					endDate = range[1][value[1]]
				}
				var cy_sf_three = this.cy_sf_three; // 参与身份默认不限
				var group = this.px_data_three; //排序方式默认按票房排序
				var material = this.init_data_three; //s什么类型 默认不限
				var year = this.year_three; // 当前选择的年 默认为 不限
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'company',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_three
				}
				this.index_gs(url,All_data);
				this.startDate_three = startDate;
				this.endDate_three = endDate;
			},
			picker_cancel_three(){
				uni.showToast({
					title: '请选择日期',
					icon: 'none',
					duration: 2000
				})
				// this.year_index_tow = 0;
			},
			// 参与身份
			tabthree_title_oneTap(it,index){
				// var cy_sf_three = this.cy_sf_three; // 参与身份默认不限
				var startDate = this.startDate_three; // 自定义日期 开始结
				var endDate = this.endDate_three; // 自定义日期 开始结
				var group = this.px_data_three; //排序方式默认按票房排序
				var material = this.init_data_three; //s什么类型 默认不限
				var year = this.year_three; // 当前选择的年 默认为 不限
				var type = '';
				if (index == 1) {
					type = 'produce'; 
				}else if (index == 2) {
					type = 'chuping'; 
				}else if (index == 3) {
					type = 'publish'; 
				}else if (index == 4) {
					type = 'union_chuping'; 
				}else if (index ==5) {
					type = 'union_publish'; 
				}else if (index == 6) {
					type = 'other';
				}else if (index == 0) {
					type = '';
				}
				
				var url = '/topprogram/get-database';
				let All_data = {
					dtype:'company',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:type
				}
				this.index_gs(url,All_data);
				this.cy_sf_three = type;
				this.sf_index_three = index;
			},
			// 作品类型
			tabthree_title_fourTap(it,index){
				var cy_sf_three = this.cy_sf_three; // 参与身份默认不限
				var startDate = this.startDate_three; // 自定义日期 开始结
				var endDate = this.endDate_three; // 自定义日期 开始结
				var group = this.px_data_three; //排序方式默认按票房排序
				// var material = this.init_data_three; //s什么类型 默认不限
				var year = this.year_three; // 当前选择的年 默认为 不限
				if (it == '不限') {
					it = '';
				}
				var material = it;
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'company',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_three
				}
				this.index_gs(url,All_data);
				this.material = material;
				this.init_index_three = index;
			},
			// 作品年代
			tabthree_title_towTap(it,index){
				var data = moment().format('YYYY')
				data = data + '年以后'
				var year = '';
				if (it==data) {
					year = 100;
				}else if (it == '自定义') {
					return false;
				}else if (it == '2011及以前') {
					year = 2011;
				}else if (it== '不限') {
					year = ''
				}else {
					year = it;
				}
				
				var cy_sf_three = this.cy_sf_three; // 参与身份默认不限
				var startDate = this.startDate_three; // 自定义日期 开始结
				var endDate = this.endDate_three; // 自定义日期 开始结
				var group = this.px_data_three; //排序方式默认按票房排序
				var material = this.init_data_three; //s什么类型 默认不限
				
				// var year = this.year_three; // 当前选择的年 默认为 不限
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'company',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_three
				}
				this.index_gs(url,All_data);
				this.year_three = year;
				this.year_index_three = index;
			},
			// 排序
			tabthree_title_threeTap(it,index){
				var group= '';
				if (index == 0) {
					group = 'bo';
				}else {
					group = 'num'; 
				}
				var cy_sf_three = this.cy_sf_three; // 参与身份默认不限
				var startDate = this.startDate_three; // 自定义日期 开始结
				var endDate = this.endDate_three; // 自定义日期 开始结
				// var group = this.px_data_three; //排序方式默认按票房排序
				var material = this.init_data_three; //s什么类型 默认不限
				var groupc = it;
				var year = this.year_three; // 当前选择的年 默认为 不限
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'company',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_three
				}
				this.index_gs(url,All_data);
				this.px_data_three = group;
				this.px_index_three = index;
			},
			// tabtow
			picker_change_tow(e) {
				// console.log(e);
				var value = e.detail.value;
				console.log(value);
				var range = this.range;
				var startDate = '';
				var endDate = '';
				if (value[0] < value[1]) {
					startDate = range[1][value[1]]
					endDate = range[0][value[0]]
				}else {
					startDate = range[0][value[0]]
					endDate = range[1][value[1]]
				}
				
				var type =   this.cy_sf_tow; // 参与身份默认不限
				// var startDate = this.startDate_tow; // 自定义日期 开始结
				// var endDate = this.endDate_tow; // 自定义日期 开始结
				var group = this.px_data_tow; //排序方式默认按票房排序
				var material = this.init_data_tow; //s什么类型 默认不限
				var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				var year = this.year_tow; // 当前选择的年 默认为 不限
				console.log(startDate,endDate);
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:type,
					country:gj_map_data_tow
				}
				this.startDate_tow = startDate;
				this.endDate_tow = endDate;
				this.index_yr(url,All_data)
				this.year_index_tow = 1;
			},
			// 取消
			picker_cancel_tow() {

				uni.showToast({
					title: '请选择日期',
					icon: 'none',
					duration: 2000
				})
				this.year_index_tow = 0;
			},
			// 参与身份
			tabtow_title_oneTap(it, index) {
				// var cy_sf_tow =   this.cy_sf_tow; // 参与身份默认不限
				var startDate = this.startDate_tow; // 自定义日期 开始结
				var endDate = this.endDate_tow; // 自定义日期 开始结
				var group = this.px_data_tow; //排序方式默认按票房排序
				var material = this.init_data_tow; //s什么类型 默认不限
				var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				var year = this.year_tow; // 当前选择的年 默认为 不限

				var type = '';
				if (it == '导演') {
					type = 'Director';
				} else if (it == '演员') {
					type = 'Actor';
				} else if (it == '编剧') {
					type = 'Writer';
				} else if (it == '制作人') {
					type = 'Producedby';
				} else if (it == '美术设计') {
					type = 'ArtDirectionby';
				} else if (it == '摄影') {
					type = 'Cinematography';
				} else if (it == '原创音乐') {
					type = 'OriginalMusic';
				}

				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:type,
					country:gj_map_data_tow
				}
				this.index_yr(url,All_data)
				this.sf_index_tow = index;
				this.cy_sf_tow = type;
			},
			// 作品类型
			tabtow_title_towTap(it, index) {
				var cy_sf_tow = this.cy_sf_tow; // 参与身份默认不限
				var startDate = this.startDate_tow; // 自定义日期 开始结
				var endDate = this.endDate_tow; // 自定义日期 开始结
				var group = this.px_data_tow; //排序方式默认按票房排序
				// var material =   this.init_data_tow; //s什么类型 默认不限
				var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				var year = this.year_tow; // 当前选择的年 默认为 不限
				if (it == '不限') {
					it = '';
				}
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:it,
					type:cy_sf_tow,
					country:gj_map_data_tow
				}
				this.index_yr(url,All_data)
				this.init_data_towc = it;
				this.init_index_tow = index;
			},
			// 作品年代
			tabtow_title_threeTap(it, index) {
				var data = moment().format('YYYY') + '年以后'
				console.log(data);
				console.log(it);
				if (it == data) {
					it = 100
				} else if (it == '2011年以前') {
					it = 2011;
				} else if (it == '自定义') {
					return false;
				} else if (it == '不限') {
					it = ''
				}
				var cy_sf_tow = this.cy_sf_tow; // 参与身份默认不限
				var startDate = ''; // 自定义日期 开始结
				var endDate = ''; // 自定义日期 开始结
				var group = this.px_data_tow; //排序方式默认按票房排序
				var material = this.init_data_tow; //s什么类型 默认不限
				var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				var year = it; // 当前选择的年 默认为 不限
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_tow,
					country:gj_map_data_tow
				}
				this.index_yr(url,All_data)
				this.startDate_tow = '';
				this.endDate_tow = '';
				this.year_tow = it;
				this.year_index_tow = index;
			},
			// 作品地区
			tabtow_title_fourTap(it, index) {

				var cy_sf_tow = this.cy_sf_tow; // 参与身份默认不限
				var startDate = this.startDate_tow; // 自定义日期 开始结
				var endDate = this.endDate_tow; // 自定义日期 开始结
				var group = this.px_data_tow; //排序方式默认按票房排序
				var material = this.init_data_tow; //s什么类型 默认不限
				// var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				if (it == '不限') {
					it = ''
				}
				var gj_map_data_tow = it;
				var year = this.year_tow; // 当前选择的年 默认为 不限
				
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_tow,
					country:gj_map_data_tow
				}
				this.index_yr(url,All_data)
				this.gj_map_data_tow = gj_map_data_tow;
				this.map_index_tow = index;
			},
			// 排序
			tabtow_title_fiveTap(it, index) {

				var cy_sf_tow = this.cy_sf_tow; // 参与身份默认不限
				var startDate = this.startDate_tow; // 自定义日期 开始结
				var endDate = this.endDate_tow; // 自定义日期 开始结
				// var group = this.px_data_tow; //排序方式默认按票房排序
				var group = ''
				var material = this.init_data_tow; //s什么类型 默认不限
				var gj_map_data_tow = this.gj_map_data_tow; // 地区中的 国家 默认不限
				var year = this.year_tow; // 当前选择的年 默认为 不限
				if (index == 0) {
					group = 'bo';
				} else {
					group = 'num'
				}
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'credits',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:group,
					material:material,
					type:cy_sf_tow,
					country:gj_map_data_tow
				}
				this.index_yr(url,All_data)

				this.px_index_tow = index;
			},
			// tabtow
			// 弹出年代确定
			picker_change(e) {
				// 这里返回的是下标
				var index = e.detail.value;
				var range = [...this.range];
				var a = range[0][index[0]];
				var b = range[1][index[1]];
				var startDate = '';
				var endDate = '';
				if (a > b) {
					startDate = b;
					endDate = a;
				} else {
					startDate = a;
					endDate = b;
				}
				var year = ''; // 当前选择的年
				var px_data = this.px_data // 排序方式
				var init_data = this.init_data; //  在这里不需要
				var gj_map_data = this.gj_map_data; // 什么国家   个引进模式 只能二选一
				var yj_map_data = this.yj_map_data; // 什么引进模式
				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'movie',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:px_data,
					type:init_data,
					country:gj_map_data,
					import_mode:yj_map_data
				}
				this.index_yp(url,All_data)
				this.startDate = startDate;
				this.endDate = endDate;
				this.year = year;
			},
			// 弹出年代取消
			picker_cancel() {
				// console.log('取消选择时触发');
				// this.year_index = 0;
				uni.showToast({
					title: '请选择日期',
					icon: 'none',
					duration: 2000
				})
			},
			// 排序
			tabone_title_fourTap(name, index) {
				this.px_index = index;
				var year = this.year; // 当前选择的年
				// var px_data =  this.px_data  // 排序方式
				var init_data = this.init_data; //  在这里不需要
				var gj_map_data = this.gj_map_data; // 什么国家   个引进模式 只能二选一
				var yj_map_data = this.yj_map_data; // 什么引进模式
				// 开始结束日期
				var startDate = this.endDate;
				var endDate = this.endDate;

				if (index == 0) {
					name = 'bo'
				} else if (index == 1) {
					name = 'tpp_want'
				} else if (index == 2) {
					name = 'maoyan_want'
				}else if (index == 3) {
					name = 'douban_want'
				}else {
					name = 'want'
				}
				
				     

				var url = '/topprogram/get-database'
				let All_data = {
					dtype:'movie',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:name,
					type:init_data,
					country:gj_map_data,
					import_mode:yj_map_data
				}
				this.index_yp(url,All_data)

				this.px_data = name;

			},
			// 地区
			tabone_title_threeTap(name, index) {
				// 不限 国产 进口 合拍 是引进模式 
				// 其他是国家
				this.map_index = index;
				var year = this.year; // 当前选择的年
				var px_data = this.px_data // 排序方式
				var init_data = this.init_data; //  在这里不需要
				// var gj_map_data =  this.gj_map_data; // 什么国家   个引进模式 只能二选一
				// var yj_map_data =  this.yj_map_data; // 什么引进模式
				// 开始结束日期
				var startDate = this.endDate;
				var endDate = this.endDate;


				if (name == '不限') {
					name = ''
				}
				let url = ''
				let All_data  = {};
				if (index > 5) {
					// 国家
					url = '/topprogram/get-database'
					All_data = {
						dtype:'movie',
						year:year,
						startDate:startDate,
						endDate:endDate,
						group:px_data,
						type:init_data,
						country:name,
						import_mode:''
					}
					this.gj_map_data = name;
					this.yj_map_data = '';
				} else {
					// 引进模式
					url = '/topprogram/get-database'
					All_data = {
						dtype:'movie',
						year:year,
						startDate:startDate,
						endDate:endDate,
						group:px_data,
						type:init_data,
						country:'',
						import_mode:name
					}
					this.gj_map_data = '';
					this.yj_map_data = name;
				}

				this.index_yp(url,All_data)
			},
			// 年代
			tabone_title_towTap(name, index) {
				// 自定一单独判断 
				// 年份 （今年以后传100）
				// 2011以前 就传2011
				this.year_index = index;
				// var year = this.year; // 当前选择的年
				var px_data = this.px_data // 排序方式
				var init_data = this.init_data; //  在这里不需要
				var gj_map_data = this.gj_map_data; // 什么国家   个引进模式 只能二选一
				var yj_map_data = this.yj_map_data; // 什么引进模式
				// 开始结束日期
				var startDate = '';
				var endDate = '';




				var data = moment().format('YYYY');
				data = data + '年以后'
				if (data == name) {
					name = 100;
				} else if (name == '2011及以前') {
					name = 2011;
				} else if (name == '不限') {
					name = ''
				} else if (name == '自定义') {
					// this.
					// 这里开启 选择 日期弹出
					return false;
				}
				var url = '/topprogram/get-database'
				let  All_data = {
					dtype:'movie',
					year:name,
					startDate:startDate,
					endDate:endDate,
					group:px_data,
					type:init_data,
					country:gj_map_data,
					import_mode:yj_map_data
				}
				this.index_yp(url,All_data)
				this.startDate = startDate;
				this.endDate = endDate;
				this.year = name;
			},
			// 类型点击
			tabone_title_oneTap(name, index) {
				this.init_index = index;
				if (name == '不限') {
					name = ''
				}
				var year = this.year; // 当前选择的年
				var px_data = this.px_data // 排序方式
				// var init_data =  this.init_data; //  在这里不需要
				var gj_map_data = this.gj_map_data; // 什么国家   个引进模式 只能二选一
				var yj_map_data = this.yj_map_data; // 什么引进模式
				// 开始结束日期
				var startDate = this.endDate;
				var endDate = this.endDate;

				var url = '/topprogram/get-database'
				let  All_data = {
					dtype:'movie',
					year:year,
					startDate:startDate,
					endDate:endDate,
					group:px_data,
					type:name,
					country:gj_map_data,
					import_mode:yj_map_data
				}
				this.index_yp(url,All_data)
				this.init_data = name;

			},
			// 影片接口调用
			async index_yp(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				res.forEach((item, i) => {
					// res.total_bo_s
					// 票房
					if (Number(item.total_bo_s) / 100000000 > 1) {
						item.total_bo_s = (Number(item.total_bo_s) / 100000000).toFixed(2) + '亿票房'
					} else {
						item.total_bo_s = (Number(item.total_bo_s) / 10000).toFixed(2) + '万票房'
					}
					// 导演 
					if (item.director_name == null) {
						item.director_name = '暂无'
					}
					// 类型 
					// console.log(item.material);
					var material = item.material.split(',')
					if (material.length >= 3) {
						item.material = `${material[0]} ${material[1]} ${material[2]} 等...`
					} else if (material.length == 2) {
						item.material = `${material[0]} ${material[1]}`
					} else if (material.length == 1) {
						item.material = `${material[0]} `
					} else {
						console.log(material.length,material);
						item.material = '暂无'
					}
					// 想看
					item.want = (Number(item.want) / 3).toFixed(0)
					if ( Number(item.tpp_score) == 0) {
						item.tpp_score = 0;
					}else {
						item.tpp_score = Number(item.tpp_score).toFixed(2);
					}
					
					if ( Number(item.maoyan_score) == 0) {
						item.maoyan_score  = 0
					}else {
						item.maoyan_score = Number(item.maoyan_score).toFixed(2);
					}
					
					if (Number(item.douban_score) == 0) {
						item.douban_score =0 
					}else{
						item.douban_score = Number(item.douban_score).toFixed(2);
					}
				})
				this.yp_alldata = res;
			},
			async index_yr(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				res.forEach((item, i) => {
					item.sbo = item.sbo - 0;
					if (item.sbo / 100000000) {
						item.sbo = (item.sbo / 100000000).toFixed(2) + '亿';
					} else {
						item.sbo = (item.sbo / 10000).toFixed(2) + '万';
					}
					if (item.mtimeimg == '') {
						item.mtimeimg = undefined
					}else {
						// 
						item.mtimeimg =  'https://db.topcdb.com'+ item.mtimeimg;
					}
					
				})
				this.yp_alldata = res;
				
			},
			async index_gs(url,All_data) {
				let userType  = await this.detection_validity()
				All_data['userType'] = userType;
				let {data:res}  = await this.$http.get({
					url,
					data:All_data
				})
				res.forEach(item=>{
					var sbo = Number(item.sbo);
					if (sbo /100000000 > 1) {
						item.sbo = (sbo /100000000).toFixed(2) + '亿'
					}else {
						item.sbo = (sbo /10000).toFixed(2) + '万'
					}
				})
				this.yp_alldata = res;
			},
			// 初始化年
			data_yaer() {
				var all_year = [];
				var arr = [];
				var year =
					moment(new Date())
					.add(0, 'year')
					.format('YYYY') - 0; //当前年;
				// 
				for (var i = year; i >= 2012; i--) {
					all_year.push(i);
					arr.push(i)
				}
				var data = moment(new Date()).format('YYYY');

				this.range = [all_year, all_year]
				// var dt = [...all_year]
				arr.unshift('不限', '自定义', data + '年以后')
				arr.push('2011及以前')
				// console.log(all_year);
				this.tabone_title_data[1].child = arr;
				// 
			},
			// 头部tab
			header_click(i) {
				if (i == 0) {
					this.startDate = ''; // 自定义日期 开始结
					this.endDate = ''; // 自定义日期 开始结
					this.px_data = 'bo'; //p排序方式默认按票房排序
					this.init_data = ''; //s什么类型
					this.gj_map_data = ''; // 地区中的 国家
					this.yj_map_data = ''; // 地区中的 引进模式
					this.year = ''; // 当前选择的年 默认为 不限
					this.init_index = 0; // 类型中
					this.year_index = 0; // 年代选中
					this.map_index = 0; // 地区选中
					this.px_index = 0; // 排序选中
					var url = '/topprogram/get-database';
					let All_data = {
						dtype:'movie',
						group: 'bo'
					}
					this.index_yp(url,All_data)
				} else if (i == 1) {
					this.cy_sf_tow =  ''; // 参与身份默认不限
					this.startDate_tow =  ''; // 自定义日期 开始结
					this.endDate_tow =  ''; // 自定义日期 开始结
					this.px_data_tow =  'bo'; //排序方式默认按票房排序
					this.init_data_tow =  ''; //s什么类型 默认不限
					this.gj_map_data_tow =  ''; // 地区中的 国家 默认不限
					this.year_tow =  ''; // 当前选择的年 默认为 不限
					
					this.sf_index_tow =  0;
					this.init_index_tow =  0;
					this.year_index_tow =  0;
					this.map_index_tow =  0;
					this.px_index_tow =  0;
					var url = '/topprogram/get-database'
					let All_data = {
						dtype:'credits',
						group:'bo',
						type:'Director'
					}
					this.index_yr(url,All_data)

				} else if (i == 2) {
					this.cy_sf_three =  'produce'; // 参与身份默认不限
					this.startDate_three =  ''; // 自定义日期 开始结
					this.endDate_three =  ''; // 自定义日期 开始结
					this.px_data_three =  'bo'; //排序方式默认按票房排序
					this.init_data_three =  ''; //s什么类型 默认不限
					this.year_three =  ''; // 当前选择的年 默认为 不限
					
					this.sf_index_three = 1;
					this.init_index_three = 0;
					this.year_index_three = 0;
					this.px_index_three = 0;
					var url = '/topprogram/get-database'
					let All_data = {
						dtype:'company',
						group: 'bo',
						type:'produce'
					}
					this.index_gs(url,All_data)
				}
				this.header_index = i;
			}
		}
	}
</script>

<style lang="less">
	@import url('./index.less');
</style>
