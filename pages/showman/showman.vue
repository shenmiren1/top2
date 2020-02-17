<template>
	<view>
		<!-- 顶部桩体兰 -->
		<view class="nav_header" ref="nav_header" id="the_id" :style="{ paddingTop: statusBarHeight + 'px' }">
			<view class="icon"><image src="../../static/home/ic.png" mode=""></image></view>
			<view class="nav_input"><input @input="nav_header_input" v-model="input_data_ra"  type="text" value="" placeholder="搜索地址" /></view>
			<view class="xian">|</view>
			<view class="amplification"><image src="../../static/home/amplification.png" mode="" /></view>
		</view>

		<!-- <view>影视人</view> -->
		<map
			:style="{ marginTop: topHeigth + 'px', height: bottomHeigth + 'px' }"
			:scale="14"
			:latitude="latitude"
			@markertap="markertap"
			:longitude="longitude"
			@callouttap="callouttap"
			:markers="covers"
			@regionchange="regionchange"
		></map>
		<cover-view class="relaxation">
			<cover-view class="father_view" @click="cover_click(index)" v-for="(item, index) in cover_data" :key="index">
				<cover-image :src="item.image"></cover-image>
				<cover-view>{{ item.name }}</cover-view>
			</cover-view>
		</cover-view>
		<!-- 一件分析提示 -->
		<cover-view class="analyze_loading" :hidden="show_loa">
			<cover-view>一键分析您当前定位点3公里内的影院详情</cover-view>
			<cover-view @click="hien_loading">×</cover-view>
		</cover-view>
		<!-- 一件分析 -->
		<cover-view class="analyze" @tap="navi_tap">
			<cover-image src="../../static/map/index.png"></cover-image>
			<cover-view>一键分析</cover-view>
		</cover-view>
	</view>
</template>

<script>
import QQMapWX from '@/components/gd_map/qqmap-wx-jssdk.js';
import {mapState} from 'vuex'
var qqmapsdk;
var that;
export default {
	onShareAppMessage(){},
	data() {
		return {
			all_res:{
				latitude:'',
				longitude:'',
				city:'',
				district:'',
			},
			input_data_ra:'数据测试',
			navigate_city:{}, // 跳转 用得到
			topHeigth: '', // 顶部输入框的高度
			bottomHeigth: '', // 剩下的噶度
			statusBarHeight: '', // 状态栏的高度
			show_loa: false,
			cover_data: [
				{ name: '娱乐', image: '../../static/map/recreation.png' },
				{ name: '影院', image: '../../static/map/cinema.png' },
				{ name: '酒店', image: '../../static/map/hotel.png' },
				{ name: '社区', image: '../../static/map/community.png' },
				{ name: '公交', image: '../../static/map/transportation.png' },
				{ name: '地铁', image: '../../static/map/metro.png' },
				{ name: '学校', image: '../../static/map/school.png' }
			],
			present_city: '', // 用户所在当前地区
			// bannerShow: true
			authorization_show:false, // 是否授权
			map_All_data: [], // 影院所有数据
			latitude: 39.909,
			longitude: 116.39742,
			sq_BR: false,
			covers: [
				{
					latitude: 39.909,
					longitude: 116.39742,
					iconPath: '/static/showman/present_location.png'
				}
			]
		};
	},
	computed:{
		...mapState({state_res:'map_particulars_res'})
	},
	onShow(){
		this.$store.commit('map_particulars_header_tap',2)
	},
	watch:{
		all_res(){
			let res =this.all_res;
			let {latitude,longitude,city,district}  = res;
			
			if(latitude != '' && longitude != '' && city != '' &&  district != ''){
				this.$store.commit('map_particulars_res_state',res)
			}
		}
	},
	onLoad() {
		that = this;
		this.load_lat_long();
		// 		uni.openSetting({
		// 			success(res) {
		// 				console.log(res.authSetting);
		// 			}
		// 		});
		//
		var latitude = that.latitude;
		var longitude = that.longitude;
		// 初始化 地图
		qqmapsdk = new QQMapWX({
			key: 'V2WBZ-XRPKP-R6NDO-LHDKE-WONJJ-7OBIA'
		});
		var data = '';
		var screenHeight = '';
		uni.getSystemInfo().then(dd => {
			// console.log(dd[1]);
			screenHeight = dd[1].screenHeight;
			data = dd[1].statusBarHeight;
			that.statusBarHeight = data;
		});
		var query = uni.createSelectorQuery();
		query.select('#the_id').boundingClientRect();
		query.exec(res => {
			that.bottomHeigth = screenHeight - res[0].height - data;
			that.topHeigth = res[0].height + data;
			console.log( res[0].height + data);
		});
	},
	methods: {
		// 跳转
		navi_tap(){
			let res = this.all_res;
			let {latitude,longitude,city,district}  = res;
			if (this.sq_BR) {
				uni.showToast({
					title: '请授权',
					icon:'none',
					duration:2000
				});
				uni.openSetting({
					success(res) {
						that.sq_BR = !res.authSetting['scope.userLocation'];
						uni.showToast({
							title: '授权成功,请重新点击',
							duration: 2000,
							icon: 'none'
						});
						that.load_lat_long();
					}
				});
				return false;
			}
			const {latitude:latitude_satte,longitude:longitude_satte,city:city_satte,district:district_satte}  = this.state_res;
			console.log(latitude_satte,longitude_satte,city_satte,district_satte)
			
			this.input_data_ra = `经:${latitude_satte}纬:${longitude_satte}市:${city_satte}县:${district_satte}`
			if (latitude_satte !== null  && longitude_satte !== null  && city_satte !== null  && district_satte !== null ) {
				uni.showToast({
					title: '正在跳转，请稍等',
					icon:'none',
					duration:2000
				});
				uni.navigateTo({
					url: './map_particulars/map_particulars'
				});
			}else {
				uni.showToast({
					title: '请过几秒再试',
					icon:'none',
					duration:2000
				});
			}
			
			// ?latitude=' + latitude + '&longitude=' + longitude + '&city='+ navigate_city.city + '&district=' + navigate_city.district
		},
		hien_loading() {
			var is_show = that.show_loa;
			that.show_loa = !is_show;
		},
		async markertap(e) {
			var id = e.markerId;
			if (id - 1 < 0) {
				return false;
			}
			return false; // 暂时先 废弃 后
			var map_All_data = [...that.map_All_data];
			var covers = [...that.covers];
			var data = map_All_data[id - 1];
			var latitude = data.lat;
			var longitude = data.lng;
			// var driving = '';
			// var walking = '';
			// var bicycling = '';
			// return false;
			// 驾车
			let driving = await this.promise_fun('driving', latitude, longitude);
			// // 步行
			let walking = await this.promise_fun('walking', latitude, longitude);
			// // 骑行
			let bicycling = await this.promise_fun('bicycling', latitude, longitude);
			// console.log(driving,walking,bicycling);
			// return false;
			var arr = {
				latitude: latitude,
				longitude: longitude,
				iconPath: '../../static/map/cinema.png',
				id,
				callout: {
					content:
						data.cinemaName +
						'\n' +
						'2018年票房：' +
						data.lastyear_bo +
						'\n' +
						' 2018年观影人次：' +
						data.lastyear_people +
						'\n' +
						'开业时间：' +
						data.lastyear_people +
						'\n' +
						'影厅数' +
						data.screen +
						'\n' +
						'座位数: ' +
						data.seat +
						'\n' +
						' 所属院线：' +
						data.cinema_chain +
						'\n' +
						' 步行：' +
						walking +
						'分钟 ' +
						'\n' +
						' 骑行：' +
						bicycling +
						'分钟' +
						'\n' +
						' 驾车：' +
						driving +
						'分钟',
					display: 'BYCLICK'
				},
				markers: {}
			};
			covers[id] = arr;
			that.covers = covers;
			// console.log(arr);
		},
		callouttap(e) {
			// console.log('callouttap');
			// console.log(e);
		},
		// 点击旁边娱乐设施
		cover_click(index) {
			if (that.sq_BR) {
				uni.showToast({
					title: '请授权',
					duration: 2000,
					icon: 'none'
				});
				uni.openSetting({
					success(res) {
						that.sq_BR = !res.authSetting['scope.userLocation'];
						uni.showToast({
							title: '授权成功，请重新点击',
							duration: 2000,
							icon: 'none'
						});
						that.load_lat_long();
					}
				});
				return false;
			}
			if (index == 1) {
				that.yy_date(); // 调取附近影院
			} else if (index == 0) {
				that.else_select('娱乐', '../../static/map/recreation.png');
			}else if (index == 2) {
				that.else_select('酒店', '../../static/map/hotel.png');
			}else if (index == 3) {
				that.else_select('社区', '../../static/map/community.png');
			}else if (index == 4) {
				that.else_select('公交', '../../static/map/transportation.png');
			}else if (index == 5) {
				that.else_select('地铁', '../../static/map/metro.png');
			}else if (index == 6) {
				that.else_select('学校', '../../static/map/school.png');
			}
		},
		// 除了影院查询 其他的公用方法发
		else_select(keyword, iconPath) {
			var region = that.present_city;
			var latitude = that.latitude;
			var longitude = that.longitude;
			uni.showLoading({
				title: '数据加载中',
				mask: false
			});
			var obj = {
				sig: '1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu',
				keyword,
				region,
				location: `${latitude},${longitude}`,
				success: async res => {
					let arr   = await that.dg_else_select(res.data, iconPath,res.data.length);
					// console.log(a);

					// console.log(arr);
					that.covers = arr;
					uni.hideLoading();
				}
			};
			qqmapsdk.getSuggestion(obj);
		},
		// 递归函数
		async 	dg_else_select(item, iconPath) {

			var arr_item = [];
			let arr = {};
				let driving = await this.promise_fun('driving', item[item.length - 1].location.lat, item[item.length - 1].location.lng);
				// // 步行
				let { duration, distance } = await this.promise_fun('walking', item[item.length - 1].location.lat, item[item.length - 1].location.lng);
				// // 骑行
				let bicycling = await this.promise_fun('bicycling', item[item.length - 1].location.lat, item[item.length - 1].location.lng);
				arr = {
					latitude: item[item.length - 1].location.lat,
					longitude: item[item.length - 1].location.lng,
					iconPath,
					id: item.length - 1,
					callout: {
						content:
							item[item.length - 1].title +
							'\n' +
							'地址:' +
							item[item.length - 1].address +
							'\n' +
							' 步行：' +
							duration +
							'分钟 ' +
							'\n' +
							' 骑行：' +
							bicycling +
							'分钟' +
							'\n' +
							' 驾车：' +
							driving +
							'分钟' +
							'\n' +
							'直行距离为:' +
							distance +
							'米',
						display: 'BYCLICK'
					}
				};
			if (item.length == 1) {

				var covers =[];

				var latitude = that.latitude ;
				var longitude = that.longitude;
				covers[0] = {
					latitude: latitude,
					longitude: longitude,
					id: 0,
					iconPath: '/static/showman/present_location.png',
					callout: {
						content: '当前位置',
						color: '#F08E2D',
						fontSize: 14,
						display: 'ALWAYS',
						borderRadius: 2
					},
					markers: {}
				};
				arr = [arr].concat(covers)
				return arr
			}
			item.pop();
			var tiem = await that.dg_else_select(item, iconPath)
			if ([].apply == undefined) {
				for(var i = 0; i<tiem.length; i++ ){
					arr_item.push(tiem[i])
				}
			}else {
				[arr].apply([arr],[...tiem])
			}

			arr_item = arr_item.concat(arr)

			return arr_item
		},
		regionchange() {
			return false;
			uni.openSetting({
				success(res) {
					console.log(res.authSetting);
				},
				complete(res) {
					console.log(res);
				}
			});
		},
		promise_fun: function(mode, latitude, longitude) {
			var latitude_s = that.latitude;
			var longitude_s = that.longitude;
			return new Promise((resolve, reject) => {
				qqmapsdk.direction({
					mode,
					from: { latitude: latitude_s, longitude: longitude_s },
					to: { latitude, longitude },
					sig: '1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu',
					success: function(res) {
						if (mode == 'walking') {
							// console.log('walking');
							resolve(res.result.routes[0]);
						} else {
							resolve(res.result.routes[0].duration);
						}
					}
				});
			});
		},
		// 附近影院信息
		yy_date() {
			if (that.sq_BR) {
				uni.showToast({
					title: '请授权',
					duration: 2000,
					icon: 'none'
				});
				uni.openSetting({
					success(res) {
						that.sq_BR = !res.authSetting['scope.userLocation'];
						uni.showToast({
							title: '授权成功，请重新点击搜索附近影院',
							duration: 2000,
							icon: 'none'
						});
						that.load_lat_long();
					}
				});
				return false;
			}
			var latitude = that.latitude;
			var longitude = that.longitude;
			var city = that.present_city;
			uni.showLoading({
				title:'数据加载中',
				mask: false
			})
			var url = 'https://db.topcdb.com/topprogram/search-cinema?lat=' + latitude + '&lng=' + longitude;
			// console.log(url);
			uni.request({
				url,
				success: async res => {
					var { data } = res;
					// console.log(url,res);
					// 获取前一年时间
					var time = new Date().getFullYear() - 1;
					var arr = await  that.dg_yy_date(data,time,city)
					// console.log(arr);
					that.covers = arr;
					uni.hideLoading()
				}
			});
		},
		// 递归
		async dg_yy_date(item,time,city){
			var arr_item  = [] ;
			let arr = {};
			let driving = await this.promise_fun('driving', item[item.length - 1].lat, item[item.length - 1].lng);
			// // 步行
			let { duration, distance } = await this.promise_fun('walking', item[item.length - 1].lat, item[item.length - 1].lng);
			// // 骑行
			let bicycling = await this.promise_fun('bicycling', item[item.length - 1].lat, item[item.length - 1].lng);

			if (Number(item[item.length - 1].lastyear_bo) / 100000000 > 1) {
				item[item.length - 1].lastyear_bo = Number(item[item.length - 1].lastyear_bo) / 100000000 + '亿';
			} else {
				item[item.length - 1].lastyear_bo = Number(item[item.length - 1].lastyear_bo) / 10000 + '万';
			}

			if (Number(item[item.length - 1].lastyear_people) / 100000000 > 1) {
				item[item.length - 1].lastyear_people = Number(item[item.length - 1].lastyear_people) / 100000000 + '亿';
			} else {
				item[item.length - 1].lastyear_people = Number(item[item.length - 1].lastyear_people) / 10000 + '万';
			}
			arr = {
				latitude: item[item.length - 1].lat,
				longitude: item[item.length - 1].lng,
				iconPath: '../../static/map/cinema.png',
				id: item.length - 1,
				callout: {
					content:
						item[item.length - 1].cinemaName +
						'\n' +
						time +
						'年票房：' +
						item[item.length - 1].lastyear_bo +
						'\n' +
						time +
						'年观影人次：' +
						item[item.length - 1].lastyear_people +
						'\n' +
						'开业时间：' +
						item[item.length - 1].startBusinessDate +
						'\n' +
						'影厅数' +
						item[item.length - 1].screen +
						'\n' +
						'座位数: ' +
						item[item.length - 1].seat +
						'\n' +
						' 所属院线：' +
						item[item.length - 1].cinema_chain +
						'\n' +
						' 步行：' +
						duration +
						'分钟 ' +
						'\n' +
						' 骑行：' +
						bicycling +
						'分钟' +
						'\n' +
						' 驾车：' +
						driving +
						'分钟' +
						'\n' +
						'直行距离为:' +
						distance +
						'米',
					display: 'BYCLICK'
				},
				markers: {}
			}
			if (item.length == 1) {
				var covers =[];
				var latitude = that.latitude ;
				var longitude = that.longitude;
				covers[0] = {
					latitude: latitude,
					longitude: longitude,
					id: 0,
					iconPath: '/static/showman/present_location.png',
					callout: {
						content: '当前位置',
						color: '#F08E2D',
						fontSize: 14,
						display: 'ALWAYS',
						borderRadius: 2
					},
					markers: {}
				};
				arr = [arr].concat(covers)
				return arr
			}
				item.pop()
				var tiem = await that.dg_yy_date(item,time,city);
				for(var i = 0; i<tiem.length; i++){
					arr_item.push(tiem[i])
				}
				var tt = [arr].concat([...arr_item])
				return tt
				// that.covers = arr_item;
		},
		// 解析地址
		city_analysis(data, index) {
			// console.log(data);
			uni.showLoading({
				title: '数据加载中',
				mask: false
			});
			return new Promise((resolve, reject) => {
				setTimeout(function() {
					qqmapsdk.geocoder({
						address: data,
						sig: '1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu',
						success: res => {
							uni.hideLoading();
							resolve(res);
							// console.log(data);
						},
						fail: res => {
							uni.hideLoading();
							// reject(res)
						}
					});
				}, 250 * index);
			});
		},
		// 用户授权 拿到用户当前位置
		load_lat_long(index) {
			const that = this;
			uni.getLocation({
				type: 'gcj02',
				success: res => {
					// console.log(res);
					var all_res = Object.assign({},that.all_res)
					console.log(all_res)
					all_res['latitude'] = res.latitude
					all_res['longitude'] = res.longitude
					that.all_res = all_res;
					that.latitude = res.latitude;
					that.longitude = res.longitude;
					that.covers[0] = {
						latitude: res.latitude,
						longitude: res.longitude,
						id: 0,
						iconPath: '/static/showman/present_location.png',
						callout: {
							content: '当前位置',
							color: '#F08E2D',
							fontSize: 14,
							display: 'ALWAYS',
							borderRadius: 2
						},
						markers: {}
					};
					that.loadCity(res.latitude, res.longitude);
				},
				fail: () => {
					uni.showToast({
						title: '请授权，否则无法使用影院地图',
						icon: 'none',
						duration: 2000
					});
					that.sq_BR = true;
				}
			});
		},
		// 获取用户当前所在城市
		loadCity(latitude, longitude) {
			qqmapsdk.reverseGeocoder({
				location: `${latitude},${longitude}`,
				sig: '1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu',
				success: res => {
					var all_res = Object.assign({},that.all_res)
					console.log(all_res)
					all_res.city = res.result.address_component.city;
					all_res.district = res.result.address_component.district
					that.all_res = all_res;
					that.navigate_city = {city:res.result.address_component.city,district:res.result.address_component.district};
					// console.log( {city:res.result.address_component.city,district:res.result.address_component.district})
					that.present_city = res.result.address_component.city;
					// that.yy_date();
				}
			});
		}
	}
};
</script>

<style lang="less">
// z自定义导航
// 顶部导航栏
.nav_header {
	// padding-top: 40upx;
	background-color: rgba(255, 255, 255, 1);
	width: 100%;
	// height: 90upx;
	padding-bottom: 20upx;
	position: fixed;
	top: 0;
	z-index: 999;
	display: flex;
	align-items: center;
	.icon {
		z-index: 10000;
		image {
			width: 73upx;
			height: 38upx;
			z-index: 10000;
		}
		position: absolute;
		left: 29upx;
		// top: 66px;
	}
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
		}
	}
	.amplification {
		position: absolute;
		left: 130upx;
		image {
			width: 30upx;
			height: 30upx;
		}
	}
}

// 提示
.analyze_loading {
	width: 470upx;
	height: 60upx;
	background: rgba(255, 255, 255, 1);
	box-shadow: 0px 2px 10px 0px rgba(183, 183, 183, 1);
	border-radius: 8upx;
	// opacity:0.6;
	position: absolute;
	font-weight: 500;
	bottom: 165upx;
	left: 375 - 470 / 2upx;
	cover-view {
		display: inline-block;
		font-size: 22upx;
		color: rgba(142, 142, 142, 1);
		margin: 15upx 15upx 15upx 15upx;
	}
	cover-view:nth-child(2) {
		margin: 0upx 15upx 15upx 0upx;
	}
}
.analyze {
	width: 230upx;
	height: 74upx;
	background: rgba(240, 142, 45, 1);
	box-shadow: 0upx 2upx 12upx 0upx rgba(0, 0, 0, 0.5);
	border-radius: 37upx;
	color: #ffffff;
	font-size: 24upx;
	display: inline-block;
	position: absolute;
	bottom: 74upx;
	left: 375 - 230 /2upx;
	// padding:10upx;
	box-sizing: border-box;
	
	cover-view {
		display: inline-block;
		width: 50%;
		height: 74upx;
		position: absolute;
		right: 24upx;
		top: 22upx
	}
	cover-image {
		width: 40upx;
		height: 40upx;
		position: absolute;
		left: 40upx;
		top: 17upx
	}
}
.relaxation {
	position: fixed;
	// top: 321upx;
	top: 30vh;
	left: 30upx;
	background-color: #fff;
	height: 490upx;
	width: 124upx;
	box-shadow: 0px 2px 10px 0px rgba(183, 183, 183, 1);
	opacity: 0.8;
	.father_view {
		width: 94upx;
		height: 490 / 7upx;
		line-height: 490 / 7upx;
		font-size: 28upx;
		margin: 0 15upx 0 15upx;
		cover-view {
			display: inline-block;
			height: 490 / 7upx;
			line-height: 490 / 7upx;
		}
		cover-image {
			width: 30upx;
			height: 30upx;
			display: inline-block;
			margin-right: 6upx;
			margin-bottom: 20upx;
		}
	}
}
map {
	width: 750upx;
	height: 100vh;
}
</style>
