(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/showman/showman"],{"12d9":function(t,e,n){"use strict";n.r(e);var a=n("ca5e"),i=n("bdec");for(var o in i)"default"!==o&&function(t){n.d(e,t,function(){return i[t]})}(o);n("8ea4");var r,s=n("f0c5"),c=Object(s["a"])(i["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],r);e["default"]=c.exports},"47aa":function(t,e,n){},"8ea4":function(t,e,n){"use strict";var a=n("47aa"),i=n.n(a);i.a},bdec:function(t,e,n){"use strict";n.r(e);var a=n("f5ed"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);e["default"]=i.a},ca5e:function(t,e,n){"use strict";var a,i=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return i}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return a})},ea90:function(t,e,n){"use strict";(function(t){n("b64a"),n("921b");a(n("66fd"));var e=a(n("12d9"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},f5ed:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a,i,o=c(n("a34a")),r=c(n("5541")),s=n("2f62");function c(t){return t&&t.__esModule?t:{default:t}}function l(t){return g(t)||d(t)||u()}function u(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function d(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function g(t){if(Array.isArray(t)){for(var e=0,n=new Array(t.length);e<t.length;e++)n[e]=t[e];return n}}function p(t,e,n,a,i,o,r){try{var s=t[o](r),c=s.value}catch(l){return void n(l)}s.done?e(c):Promise.resolve(c).then(a,i)}function h(t){return function(){var e=this,n=arguments;return new Promise(function(a,i){var o=t.apply(e,n);function r(t){p(o,a,i,r,s,"next",t)}function s(t){p(o,a,i,r,s,"throw",t)}r(void 0)})}}function f(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},a=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),a.forEach(function(e){m(t,e,n[e])})}return t}function m(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var _={onShareAppMessage:function(){},data:function(){return{all_res:{latitude:"",longitude:"",city:"",district:""},input_data_ra:"数据测试",navigate_city:{},topHeigth:"",bottomHeigth:"",statusBarHeight:"",show_loa:!1,cover_data:[{name:"娱乐",image:"../../static/map/recreation.png"},{name:"影院",image:"../../static/map/cinema.png"},{name:"酒店",image:"../../static/map/hotel.png"},{name:"社区",image:"../../static/map/community.png"},{name:"公交",image:"../../static/map/transportation.png"},{name:"地铁",image:"../../static/map/metro.png"},{name:"学校",image:"../../static/map/school.png"}],present_city:"",authorization_show:!1,map_All_data:[],latitude:39.909,longitude:116.39742,sq_BR:!1,covers:[{latitude:39.909,longitude:116.39742,iconPath:"/static/showman/present_location.png"}]}},computed:f({},(0,s.mapState)({state_res:"map_particulars_res"})),onShow:function(){this.$store.commit("map_particulars_header_tap",2)},watch:{all_res:function(){var t=this.all_res,e=t.latitude,n=t.longitude,a=t.city,i=t.district;""!=e&&""!=n&&""!=a&&""!=i&&this.$store.commit("map_particulars_res_state",t)}},onLoad:function(){i=this,this.load_lat_long();i.latitude,i.longitude;a=new r.default({key:"V2WBZ-XRPKP-R6NDO-LHDKE-WONJJ-7OBIA"});var e="",n="";t.getSystemInfo().then(function(t){n=t[1].screenHeight,e=t[1].statusBarHeight,i.statusBarHeight=e});var o=t.createSelectorQuery();o.select("#the_id").boundingClientRect(),o.exec(function(t){i.bottomHeigth=n-t[0].height-e,i.topHeigth=t[0].height+e,console.log(t[0].height+e)})},methods:{navi_tap:function(){var e=this.all_res;e.latitude,e.longitude,e.city,e.district;if(this.sq_BR)return t.showToast({title:"请授权",icon:"none",duration:2e3}),t.openSetting({success:function(e){i.sq_BR=!e.authSetting["scope.userLocation"],t.showToast({title:"授权成功,请重新点击",duration:2e3,icon:"none"}),i.load_lat_long()}}),!1;var n=this.state_res,a=n.latitude,o=n.longitude,r=n.city,s=n.district;console.log(a,o,r,s),this.input_data_ra="经:".concat(a,"纬:").concat(o,"市:").concat(r,"县:").concat(s),null!==a&&null!==o&&null!==r&&null!==s?(t.showToast({title:"正在跳转，请稍等",icon:"none",duration:2e3}),t.navigateTo({url:"./map_particulars/map_particulars"})):t.showToast({title:"请过几秒再试",icon:"none",duration:2e3})},hien_loading:function(){var t=i.show_loa;i.show_loa=!t},markertap:function(){var t=h(o.default.mark(function t(e){var n,a,r,s,c,l,u,d,g;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:if(n=e.markerId,!(n-1<0)){t.next=3;break}return t.abrupt("return",!1);case 3:return t.abrupt("return",!1);case 11:return l=t.sent,t.next=14,this.promise_fun("walking",s,c);case 14:return u=t.sent,t.next=17,this.promise_fun("bicycling",s,c);case 17:d=t.sent,g={latitude:s,longitude:c,iconPath:"../../static/map/cinema.png",id:n,callout:{content:r.cinemaName+"\n2018年票房："+r.lastyear_bo+"\n 2018年观影人次："+r.lastyear_people+"\n开业时间："+r.lastyear_people+"\n影厅数"+r.screen+"\n座位数: "+r.seat+"\n 所属院线："+r.cinema_chain+"\n 步行："+u+"分钟 \n 骑行："+d+"分钟\n 驾车："+l+"分钟",display:"BYCLICK"},markers:{}},a[n]=g,i.covers=a;case 21:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),callouttap:function(t){},cover_click:function(e){if(i.sq_BR)return t.showToast({title:"请授权",duration:2e3,icon:"none"}),t.openSetting({success:function(e){i.sq_BR=!e.authSetting["scope.userLocation"],t.showToast({title:"授权成功，请重新点击",duration:2e3,icon:"none"}),i.load_lat_long()}}),!1;1==e?i.yy_date():0==e?i.else_select("娱乐","../../static/map/recreation.png"):2==e?i.else_select("酒店","../../static/map/hotel.png"):3==e?i.else_select("社区","../../static/map/community.png"):4==e?i.else_select("公交","../../static/map/transportation.png"):5==e?i.else_select("地铁","../../static/map/metro.png"):6==e&&i.else_select("学校","../../static/map/school.png")},else_select:function(e,n){var r=i.present_city,s=i.latitude,c=i.longitude;t.showLoading({title:"数据加载中",mask:!1});var l={sig:"1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu",keyword:e,region:r,location:"".concat(s,",").concat(c),success:function(){var e=h(o.default.mark(function e(a){var r;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,i.dg_else_select(a.data,n,a.data.length);case 2:r=e.sent,i.covers=r,t.hideLoading();case 5:case"end":return e.stop()}},e,this)}));function a(t){return e.apply(this,arguments)}return a}()};a.getSuggestion(l)},dg_else_select:function(){var t=h(o.default.mark(function t(e,n){var a,r,s,c,u,d,g,p,h,f,m,_;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return a=[],r={},t.next=4,this.promise_fun("driving",e[e.length-1].location.lat,e[e.length-1].location.lng);case 4:return s=t.sent,t.next=7,this.promise_fun("walking",e[e.length-1].location.lat,e[e.length-1].location.lng);case 7:return c=t.sent,u=c.duration,d=c.distance,t.next=12,this.promise_fun("bicycling",e[e.length-1].location.lat,e[e.length-1].location.lng);case 12:if(g=t.sent,r={latitude:e[e.length-1].location.lat,longitude:e[e.length-1].location.lng,iconPath:n,id:e.length-1,callout:{content:e[e.length-1].title+"\n地址:"+e[e.length-1].address+"\n 步行："+u+"分钟 \n 骑行："+g+"分钟\n 驾车："+s+"分钟\n直行距离为:"+d+"米",display:"BYCLICK"}},1!=e.length){t.next=21;break}return p=[],h=i.latitude,f=i.longitude,p[0]={latitude:h,longitude:f,id:0,iconPath:"/static/showman/present_location.png",callout:{content:"当前位置",color:"#F08E2D",fontSize:14,display:"ALWAYS",borderRadius:2},markers:{}},r=[r].concat(p),t.abrupt("return",r);case 21:return e.pop(),t.next=24,i.dg_else_select(e,n);case 24:if(m=t.sent,void 0==[].apply)for(_=0;_<m.length;_++)a.push(m[_]);else[r].apply([r],l(m));return a=a.concat(r),t.abrupt("return",a);case 28:case"end":return t.stop()}},t,this)}));function e(e,n){return t.apply(this,arguments)}return e}(),regionchange:function(){return!1},promise_fun:function(t,e,n){var o=i.latitude,r=i.longitude;return new Promise(function(i,s){a.direction({mode:t,from:{latitude:o,longitude:r},to:{latitude:e,longitude:n},sig:"1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu",success:function(e){i("walking"==t?e.result.routes[0]:e.result.routes[0].duration)}})})},yy_date:function(){if(i.sq_BR)return t.showToast({title:"请授权",duration:2e3,icon:"none"}),t.openSetting({success:function(e){i.sq_BR=!e.authSetting["scope.userLocation"],t.showToast({title:"授权成功，请重新点击搜索附近影院",duration:2e3,icon:"none"}),i.load_lat_long()}}),!1;var e=i.latitude,n=i.longitude,a=i.present_city;t.showLoading({title:"数据加载中",mask:!1});var r="https://db.topcdb.com/topprogram/search-cinema?lat="+e+"&lng="+n;t.request({url:r,success:function(){var e=h(o.default.mark(function e(n){var r,s,c;return o.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return r=n.data,s=(new Date).getFullYear()-1,e.next=4,i.dg_yy_date(r,s,a);case 4:c=e.sent,i.covers=c,t.hideLoading();case 7:case"end":return e.stop()}},e,this)}));function n(t){return e.apply(this,arguments)}return n}()})},dg_yy_date:function(){var t=h(o.default.mark(function t(e,n,a){var r,s,c,l,u,d,g,p,h,f,m,_,y;return o.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return r=[],s={},t.next=4,this.promise_fun("driving",e[e.length-1].lat,e[e.length-1].lng);case 4:return c=t.sent,t.next=7,this.promise_fun("walking",e[e.length-1].lat,e[e.length-1].lng);case 7:return l=t.sent,u=l.duration,d=l.distance,t.next=12,this.promise_fun("bicycling",e[e.length-1].lat,e[e.length-1].lng);case 12:if(g=t.sent,Number(e[e.length-1].lastyear_bo)/1e8>1?e[e.length-1].lastyear_bo=Number(e[e.length-1].lastyear_bo)/1e8+"亿":e[e.length-1].lastyear_bo=Number(e[e.length-1].lastyear_bo)/1e4+"万",Number(e[e.length-1].lastyear_people)/1e8>1?e[e.length-1].lastyear_people=Number(e[e.length-1].lastyear_people)/1e8+"亿":e[e.length-1].lastyear_people=Number(e[e.length-1].lastyear_people)/1e4+"万",s={latitude:e[e.length-1].lat,longitude:e[e.length-1].lng,iconPath:"../../static/map/cinema.png",id:e.length-1,callout:{content:e[e.length-1].cinemaName+"\n"+n+"年票房："+e[e.length-1].lastyear_bo+"\n"+n+"年观影人次："+e[e.length-1].lastyear_people+"\n开业时间："+e[e.length-1].startBusinessDate+"\n影厅数"+e[e.length-1].screen+"\n座位数: "+e[e.length-1].seat+"\n 所属院线："+e[e.length-1].cinema_chain+"\n 步行："+u+"分钟 \n 骑行："+g+"分钟\n 驾车："+c+"分钟\n直行距离为:"+d+"米",display:"BYCLICK"},markers:{}},1!=e.length){t.next=23;break}return p=[],h=i.latitude,f=i.longitude,p[0]={latitude:h,longitude:f,id:0,iconPath:"/static/showman/present_location.png",callout:{content:"当前位置",color:"#F08E2D",fontSize:14,display:"ALWAYS",borderRadius:2},markers:{}},s=[s].concat(p),t.abrupt("return",s);case 23:return e.pop(),t.next=26,i.dg_yy_date(e,n,a);case 26:for(m=t.sent,_=0;_<m.length;_++)r.push(m[_]);return y=[s].concat([].concat(r)),t.abrupt("return",y);case 30:case"end":return t.stop()}},t,this)}));function e(e,n,a){return t.apply(this,arguments)}return e}(),city_analysis:function(e,n){return t.showLoading({title:"数据加载中",mask:!1}),new Promise(function(i,o){setTimeout(function(){a.geocoder({address:e,sig:"1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu",success:function(e){t.hideLoading(),i(e)},fail:function(e){t.hideLoading()}})},250*n)})},load_lat_long:function(e){var n=this;t.getLocation({type:"gcj02",success:function(t){var e=Object.assign({},n.all_res);console.log(e),e["latitude"]=t.latitude,e["longitude"]=t.longitude,n.all_res=e,n.latitude=t.latitude,n.longitude=t.longitude,n.covers[0]={latitude:t.latitude,longitude:t.longitude,id:0,iconPath:"/static/showman/present_location.png",callout:{content:"当前位置",color:"#F08E2D",fontSize:14,display:"ALWAYS",borderRadius:2},markers:{}},n.loadCity(t.latitude,t.longitude)},fail:function(){t.showToast({title:"请授权，否则无法使用影院地图",icon:"none",duration:2e3}),n.sq_BR=!0}})},loadCity:function(t,e){a.reverseGeocoder({location:"".concat(t,",").concat(e),sig:"1ky4bV2KfdZKY2iAAm0GZBBmga2TETOu",success:function(t){var e=Object.assign({},i.all_res);console.log(e),e.city=t.result.address_component.city,e.district=t.result.address_component.district,i.all_res=e,i.navigate_city={city:t.result.address_component.city,district:t.result.address_component.district},i.present_city=t.result.address_component.city}})}}};e.default=_}).call(this,n("543d")["default"])}},[["ea90","common/runtime","common/vendor"]]]);