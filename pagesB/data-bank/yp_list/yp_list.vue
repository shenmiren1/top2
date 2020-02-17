<template>
	<view>
		
		<!-- 人物介绍 -->
		<view class="character">
			<image class="images" src="../../../static/big-plate/available_poster.png" mode="" v-if="allDate.detail.mtimeimg == undefined"></image>
			<image  class="images"  :src=" 'https://db.topcdb.com/' + allDate.detail.mtimeimg" v-if="!(allDate.detail.mtimeimg == undefined)" mode=""></image>
			<view class="detail">
				<view class="name">{{ allDate.detail.nameCn }}</view>
				<view class="elg_naem">{{ allDate.detail.nameEn }}</view>
				<view class="time_dq">{{ allDate.detail.birthYear }}-{{ allDate.detail.birthMonth }}-{{ allDate.detail.birthDay }}| {{ allDate.detail.address }}</view>
				<view class="role">{{ allDate.detail.profession_n }}</view>
			</view>
		</view>

		<!-- 票房 -->
		<view class="booking">
			<view class="booking_left">
				<view>主要作品票房</view>
				<view>导演或主演作品票房</view>
			</view>
			<view class="booking_rigth">{{ allDate.detail.total_bo }}</view>
		</view>

		<!-- 简介 -->
		<view class="brief">
			<view class="brief_name">简介</view>
			<view class="brief_nr">
				<text v-if="brief_zk_Br == true">{{ allDate.detail.content_s }}</text>
				<text v-if="brief_zk_Br == false">{{ allDate.detail.content }}</text>
			</view>
			<view @tap="brief_zk_click" class="brief_zk">
				<text v-if="brief_zk_Br == true">展开</text>
				<text v-if="brief_zk_Br == false">收起</text>
			</view>
		</view>

		<!-- 个人作品 -->
		<view class="Individual">
			<view class="Individual_title">个人作品</view>

			<view class="Individual_xq" v-for="(item, i) in allDate.arr" :key="i">
				<!-- <image class="images" v-if="" src="../../../static/big-plate/available_poster.png" mode=""></image> -->
				<image class="images" :src="'https://db.topcdb.com' + item.img" mode=""></image>
				<view class="Individual_xq_data">
					<view class="Individual_xq_data_name">
						<view>{{ item.zz_name }}</view>
						<view>{{ item.bo }}票房</view>
					</view>
					<view class="Individual_data_data">
						<view>{{ item.type }}</view>
						<view>{{ item.typeName }}</view>
						<view>{{ item.publish_date }} {{ item.country }}映</view>
					</view>
				</view>
			</view>

			<view @tap="personage_click" class="Individual_bottom">查看全部个人作品</view>
		</view>

		<!--荣誉成就 -->
		<view class="honor">
			<view class="honor_title">荣誉成就</view>
			<view class="honor_listData" v-for="(item, i) in allDate.awards" :key="i">
				<view class="honor_listData_year">{{ item.year }}年</view>
				<view class="honor_listData_data" v-for="(it, ind) in item.child" :key="ind">
					<view class="yuan"></view>
					<view class="honor_listData_data_data">
						<view class="honor_listData_data_name">
							<view>{{ it.name }} {{ it.awardName }}</view>
							<view>获奖影片  {{ it.movieTitle }}</view>
							
						</view>
						<view class="honor_listData_data_zy">{{it.iswin_w}}</view>
					</view>
				</view>
			</view>
			
			<view class="honor_boton" @tap="awards_s_click">
				查看全部奖项
			</view>
		</view>
	</view>
</template>

<script>
export default {
	onShareAppMessage(){},
	data() {
		return {
			awards_s:[],
			lisss: [
				{
					year: 2019,
					child: [
						{ title: '第33届大众电影百花奖最佳导演', name: '战狼', dd: '提名' },
						{ title: '第33届大众电影百花奖最佳导演', name: '战狼', dd: '提名' },
						{ title: '第33届大众电影百花奖最佳导演', name: '战狼', dd: '提名' }
					]
				}
			],
			brief_zk_Br: true,
			allDate: { detail:{
				nameCn: '---',
				nameEn: '---',
				birthYear: '---',
				birthMonth: '---',
				birthDay: '---',
				address: '---',
				profession_n: '---'
			}
			}
		};
	},
	onLoad(res) {
		var { id: id } = res;
		this.id = id;
		var url = '/topprogram/credits-detail';
		let All_data = {
			id:id
		}
		this.js_index(url,All_data);
	},
	methods: {
		awards_s_click(){
			var awards_s = this.awards_s;
			if (awards_s.length > 2) {
				uni.navigateTo({
					url:'./awards_s/awards_s'
				})
			}else{
				uni.showToast({
					title:'没有更多奖项',
					icon:'none',
					duration:2000
				})
			}
		},
		// 跳转搜有影片
		personage_click() {
			var id = this.id;
			// uni.navigateTo({
			// 	url:'./personage_zp/personage_zp?id=' + id;
			// })
			uni.navigateTo({
				url: './personage_zp/personage_zp?id=' + id
			});
		},
		brief_zk_click() {
			var Br = this.brief_zk_Br;

			this.brief_zk_Br = !Br;
		},
		async js_index(url,All_data) {
			let userType  = await this.detection_validity()
			All_data['userType'] = userType;
			let ra  = await this.$http.get({
				url,
				data:All_data
			})
			// console.log(ra.data);

			if (Number(ra.data.detail.birthDay) < 10) {
				ra.data.detail.birthDay = '0' + ra.data.detail.birthDay;
			}
			if (Number(ra.data.detail.birthMonth) < 10) {
				ra.data.detail.birthMonth = '0' + ra.data.detail.birthMonth;
			}

			// 简介
			var content = ra.data.detail.content.slice(0, 70) + '.....';
			ra.data.detail.content_s = content;

			console.log(ra.data);
			// 个人数据
			var arr = [];
			if (ra.data.movie.length > 3) {
				// ra.data.movie =
				ra.data.movie.forEach((item, i) => {
					if (i < 3) {
						var bo = Number(item.bo);
						if (bo / 100000000 > 1) {
							item.bo = (bo / 100000000).toFixed(2) + '亿';
						} else {
							item.bo = (bo / 10000).toFixed(2) + '万';
						}
						arr.push(item);
					}
				});
			}
			ra.data.arr = arr;

			//暂时票房
			if (Number(ra.data.detail.total_bo) / 100000000 > 1) {
				ra.data.detail.total_bo = (Number(ra.data.detail.total_bo) / 100000000).toFixed(2) + '亿';
			} else {
				ra.data.detail.total_bo = (Number(ra.data.detail.total_bo) / 10000).toFixed(2) + '万';
			}

			// 荣誉成就

			var title = ra.data.detail.nameCn;
			uni.setNavigationBarTitle({
				title
			});
			var awards = [];
			var awards_s = [];
			//处理荣誉成就
			var index = 0;
			for (let i in ra.data.awards) {
				console.log();
				ra.data.awards[i].forEach((item,ind)=>{
					if (Number(item.iswin) == 0 ) {
						item.iswin_w = '获奖'
					}else {
						item.iswin_w = '提名'
					}
				})
				
				index++
				if (index <= 2) {
					awards.unshift({ year: i, child: ra.data.awards[i] });
				}
				awards_s.unshift({ year: i, child: ra.data.awards[i] });
			}
			uni.setStorage({
				key:'awards_s',
				data:awards_s,
				success() {
					console.log('成功存入');
				}
			})
			this.awards_s = awards_s;
			ra.data.awards = awards;
			this.allDate = ra.data;
		}
	}
};
</script>

<style lang="less">
@import url('./index.less');
</style>
