(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/dy_particulars/all_bo/all_bo"],{3673:function(t,e,i){},"48ea":function(t,e,i){"use strict";i.r(e);var n=i("c289"),o=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(e,t,function(){return n[t]})}(a);e["default"]=o.a},"73e1":function(t,e,i){"use strict";i.r(e);var n=i("d9bb"),o=i("48ea");for(var a in o)"default"!==a&&function(t){i.d(e,t,function(){return o[t]})}(a);i("874e");var r,c=i("f0c5"),_=Object(c["a"])(o["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],r);e["default"]=_.exports},"874e":function(t,e,i){"use strict";var n=i("3673"),o=i.n(n);o.a},c289:function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=a(i("a34a")),o=a(i("2f71"));function a(t){return t&&t.__esModule?t:{default:t}}function r(t,e,i,n,o,a,r){try{var c=t[a](r),_=c.value}catch(s){return void i(s)}c.done?e(_):Promise.resolve(_).then(n,o)}function c(t){return function(){var e=this,i=arguments;return new Promise(function(n,o){var a=t.apply(e,i);function c(t){r(a,n,o,c,_,"next",t)}function _(t){r(a,n,o,c,_,"throw",t)}c(void 0)})}}var _=function(){return Promise.all([i.e("common/vendor"),i.e("components/ei-calendar/ei-calendar")]).then(i.bind(null,"ca07"))},s={onShareAppMessage:function(){},components:{EiCalendar:_},data:function(){return{sum_data:{session_s:"----",total_bo_s:"-------"},res:{},date:[],time_tab_Br:!1,customDate:[],index:0,is_index:!0,itemlist:[],time:"",zb_title:[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"份额",is_check:"",no_check:"分账",front_row:!0},{zb_name:"排场份额",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"票价",two_title:"",is_check:"平均",no_check:"平均",front_row:!1},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:" ",two_title:"",is_check:"",no_check:"",front_row:!1}]}},filters:{time_zhou:function(t){var e="周"+"日一二三四五六".charAt(new Date(t).getDay());return void 0==t?"---":null==t?"---":e},time_com:function(t){var e=(0,o.default)(t).format("YYYY年MM月DD日");return void 0==t?"---":null==t?"---":e}},onReady:function(){var t=new Date;t=(0,o.default)(t).format("YYYY-MM-DD");var e=[];e[0]=new Date(t),this.date=e},onLoad:function(t){var e=t.id,i=t.mid,n=t.index,a=(0,o.default)(new Date).format("YYYY-MM-DD");this.time=a;var r="",c={},_=[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"份额",is_check:"",no_check:"分账",front_row:!0},{zb_name:"排场份额",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"票价",two_title:"",is_check:"平均",no_check:"平均",front_row:!0},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:" ",two_title:"",is_check:"",no_check:"",front_row:!1}];0==n?(r="/topprogram/movie-maincity",c={id:e,mid:i}):1==n?(r="/topprogram/movie-mainbrd",c={id:e,mid:i}):2==n&&(r="/topprogram/movie-maincinema",c={id:e,mid:i}),this.res=t,this.zb_title=_,this.index=n,this.bd_index(r,c)},methods:{naviga:function(e){var i=this.res,n=i.id,o=i.mid,a=i.index,r="";2!=a&&(r=0==a?"./cityBrd_bo?index=0&city="+e.city+"&id="+n+"&mid="+o:"./cityBrd_bo?index=1&brd="+e.brd+"&id="+n+"&mid="+o,console.log(r),t.navigateTo({url:r}))},time_click:function(t){var e=this.time,i=this.res,n=i.id,a=i.mid,r=i.index,c=[],_=this.baseURL;e=1==t?(0,o.default)(e).subtract(-1,"days").format("YYYY-MM-DD"):(0,o.default)(e).subtract(1,"days").format("YYYY-MM-DD");var s={};0==r?(_="/topprogram/movie-maincity",s={id:n,mid:a,bdate:e}):1==r?(_="/topprogram/movie-mainbrd",s={id:n,mid:a,bdate:e}):2==r&&(_="/topprogram/movie-maincinema",s={id:n,mid:a,bdate:e}),c[0]=new Date(e),this.date=c,this.time=e,this.bd_index(_,s)},ei_calendar_tap:function(t){var e=t.format.split("/"),i="".concat(e[0],"-").concat(e[1],"-").concat(e[2]),n=this.baseURL,o=this.res,a=o.id,r=o.mid,c=o.index,_=[],s={};0==c?(n="/topprogram/movie-maincity",s={id:a,mid:r,bdate:i}):1==c?(n="/topprogram/movie-mainbrd",s={id:a,mid:r,bdate:i}):2==c&&(n="/topprogram/movie-maincinema",s={id:a,mid:r,bdate:i}),_[0]=new Date(i),this.date=_,this.time=i,this.bd_index(n,s),this.time_tab_Br=!1},bd_index:function(){var e=c(n.default.mark(function e(i,o){var a,r,c,_,s,d,u,m;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.detection_validity();case 2:return a=e.sent,o.userType=a,e.next=6,this.$http.get({url:i,data:o});case 6:r=e.sent,c=r.data,_=this.index,s=!1,d="",u="",m="",0==_?(s=c.city_data,u=c.sum,d="城市票房",m="city"):1==_?(s=c.data,u=c.sum,d="影投票房",m="brd"):2==_&&(s=c.data,u=c.sum,d="影院票房",m="cinema_code"),t.setNavigationBarTitle({title:d}),s.forEach(function(t,e){var i=c.fene[t[m]];t.bo_rate=(Number(t.total_bo_s)/(i.total_bo_s-0)*100).toFixed(2),t.session_rate=((t.session_s-0)/(i.session_s-0)*100).toFixed(2),t.avg_price=Number(t.avg_price).toFixed(2),t.occupancy=(100*Number(t.occupancy)).toFixed(2),t.people_per_session=Number(t.people_per_session).toFixed(0),t.total_bo_s=(Number(t.total_bo_s)/1e4).toFixed(2),t.seat_s_zb=(Number(t.seat_s)/u.seat_s).toFixed(2)+"%"}),Number(u.total_bo_s)/1e8>1?u.total_bo_s=(Number(u.total_bo_s)/1e8).toFixed(2)+"亿":u.total_bo_s=(Number(u.total_bo_s)/1e4).toFixed(2)+"万",this.sum_data=u,this.itemlist=s;case 19:case"end":return e.stop()}},e,this)}));function i(t,i){return e.apply(this,arguments)}return i}(),show_index:function(){this.is_index=!1},more_index_data_tap:function(e){if(8==e)return!1;var i=this.zb_title;if(i[e].front_row)i[e].front_row=!1;else{for(var n=0,o=0;o<i.length-1;o++)if(i[o].front_row&&(0==n?n=1:1==n?n=2:2==n?n=3:3==n&&(n=4)),4==n)return t.showToast({title:"最多选择四项",duration:2e3,icon:"none"}),!1;n<=4&&(i[e].front_row=!0)}this.zb_title=i},disabledDate:function(t){var e=new Date("2019/5/10").getTime(),i=new Date("2019/7/21").getTime();return t.getTime()<=e||t.getTime()>=i}}};e.default=s}).call(this,i("543d")["default"])},d9bb:function(t,e,i){"use strict";var n,o=function(){var t=this,e=this,i=e.$createElement,n=(e._self._c,e._f("time_com")(e.time)),o=e._f("time_com")(e.time),a=e._f("time_zhou")(e.time);e._isMounted||(e.e0=function(){t.time_tab_Br=!0},e.e1=function(){t.is_index=!0},e.e2=function(){t.time_tab_Br=!1}),e.$mp.data=Object.assign({},{$root:{f0:n,f1:o,f2:a}})},a=[];i.d(e,"b",function(){return o}),i.d(e,"c",function(){return a}),i.d(e,"a",function(){return n})},eeff:function(t,e,i){"use strict";(function(t){i("b64a"),i("921b");n(i("66fd"));var e=n(i("73e1"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])}},[["eeff","common/runtime","common/vendor"]]]);