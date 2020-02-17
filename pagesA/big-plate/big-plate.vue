<template>
	<view>
		<view class="headers">
			<view  @tap="headerclick(item.id)" v-for="item in headerdata" :key="item.id"><text :class="[tabindex == item.id ? 'active' : '']">{{ item.name }}</text></view>
		</view>
		<tab-one></tab-one>
		<tab-tow></tab-tow>
		<tab-three ></tab-three>
		<tab-four></tab-four>
	</view>
</template>

<script>
import EiCalendar from '@/components/ei-calendar/ei-calendar';
import tabOne from './tab_one';
import tabTow from './tab_tow';
import tabThree from './tab_three';
import tabFour from './tab_four';
import { mapState } from 'vuex';
// ucharts
import uCharts from '@/components/u-charts/u-charts.js';
import { isJSON } from '@/common/checker.js';
export default {
	onShareAppMessage(){},
	// 注册组件
	components: {
		tabOne,
		tabTow,
		tabThree,
		tabFour
	},
	//  过滤器
	filters: {
	},
	onReachBottom(){
		if (this.tabindex == 2 && this.big_plate_threeIndex == 0 ) {
			let pages = this.pages;
			pages++
			this.$store.commit('big_plateThreepages',pages)
			this.pages = pages
		}
	},
	data() {
		return {
			pages:0,
			headerdata: [
				{
					name: '大盘排片',
					id: 0
				},
				{
					name: '地域排场',
					id: 1
				},
				{
					name: '机构排场',
					id: 2
				},
				{
					name: '上座率',
					id: 3
				}
			],
			//  控制tab 切换
			tabindex: 0,
		};
	},
	onLoad() {
		this.$store.commit('bigPlate_tab', 0);
	},
	created() {},
	onReady() {
		
	},
	onUnload() {
		this.$store.commit('bigPlate_tab', -1);	
	},
	computed: {
		...mapState(['big_plate_threeIndex'])
	},
	methods: {

		// 点击顶部tab 切换
		headerclick(id) {
			this.$store.commit('bigPlate_tab', id);
			this.pages = 0;
			this.$store.commit('big_plateThreepages',0)
			this.tabindex = id;

		}
	}
};
</script>

<style lang="less">
@import url('./index.less');
@import url('./big-plate.less');
@import url('./big-plate-tabTow.less');
@import url('./big-plate-tabThree.less');
@import url('./big-plate-tabFour.less');
@import url('./gallery.less');
@import url('./select-movie.less');

// 日历总样式
.ei_calendar_wai {
	position: fixed;
	top: 0px;
	width: 100%;
	z-index: 10;
	height: 100%;

	// overflow: hidden;
	.ei_calendar_wai_cha {
		background-color: #fff;
		padding: 0 20upx;
		display: flex;
		justify-content: flex-end;
	}

	.ei_calendar_view {
		width: 100%;
		height: 100%;
		background-color: #fff;
	}
}
</style>
