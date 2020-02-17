<template>
	<view >
		<!-- 头部 顶级tab -->
		<view class="headder">
			<view @tap="heder_click(index)" :class="[index == haeder_index ? 'active' : ''] " v-for="(item,index) in header_data" :key="index">
				{{item}}
			</view>
		</view>
		<!-- tabone 值小tab -->
		<tab-one  ></tab-one>
		<tab-tow  ></tab-tow>
	</view>
</template>

<script >
	import tabOne from './tabone.vue'
	import tabTow from './tabtow.vue'
	import {mapMutations,mapState} from 'vuex'
export default {
	components:{
		tabOne,
		tabTow
	},
	data() {
		return {
			header_data:['区域概况','竞争影院'],
			// haeder_index:0, // 顶部 tab 切换
		};
	},
	onLoad() {
		// this.$store.commit('map_particulars_res',res)
		this.$store.commit('map_particulars_header_tap',0)
		
	},
	computed:{
		...mapState({haeder_index:'map_particulars_index'})
	},
	methods: {
		heder_click(index){
			this.$store.commit('map_particulars_header_tap',index)
		}
	}
};
</script>

<style lang="less">
	@import url('./index.less');
	
</style>