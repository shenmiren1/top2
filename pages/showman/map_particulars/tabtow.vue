<template>
	<view :hidden="!(header_index == 1)">
		<view class="header_data">
			<view @tap="header_click(index)" :class="index == tabtow_index ? 'active' : ''" v-for="(item, index) in header_data" :key="index">{{ item }}</view>
		</view>
		<!-- tabone -->
			<bo-office ></bo-office>
			
			<!-- tabtow -->
			<walkthrough-presell></walkthrough-presell>
			<!-- tabthree -->
			<Business-trend></Business-trend>
			<!-- tabfour -->
			<watch-hobby></watch-hobby>
	</view>
</template>

<script>
import { mapMutations, mapState } from 'vuex';
import boOffice from './tabtow/bo_office'
import walkthroughPresell from './tabtow/walkthrough_presell'
import BusinessTrend from './tabtow/Business_trend'
import watchHobby from './tabtow/watch_hobby'
import EiCalendar from '@/components/ei-calendar/ei-calendar';
export default {
	components:{
		boOffice, // tab one
		walkthroughPresell,  // tabtow
		BusinessTrend, // tabthree
		watchHobby, // tabfour
	},
	props: {
		// res: {
		// 	value: Object
		// }
	},
	computed: {
		...mapState({
			res:'map_particulars_res',
			header_index:'map_particulars_index',
			tabtow_index:'map_particulars_tabtow_header_index'
		})
	},
	watch: {
		header_index(){
			if (this.header_index == 0) return false;
			this.$store.commit('map_particulars_tabtow_header_index_mut',0)
		}
	},
	data() {
		return {
			header_data: ['竞争票房', '预排预售', '经营趋势', '观影偏好']
		};
	},
	methods: {
		header_click(index) {
			// this.header_index = index;
			this.$store.commit('map_particulars_tabtow_header_index_mut',index)
		}
	}
};
</script>

<style lang="less">
.header_data{
	height: 60upx;
	background-color: #fff;
	display: flex;
	
	view{
		width: 25%;
		font-size:28upx;
		display: flex;
		justify-content: center;
		align-items: center;
		font-family:PingFangSC-Regular,PingFang SC;
		font-weight:400;
		color: #4A4A4A;
	}
	.active{
		color:rgba(240,142,45,1);
	}
}
</style>
