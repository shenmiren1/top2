(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/showman/map_particulars/tabtow/walkthrough_presell"],{"3e75":function(t,e,i){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var n=r(i("a34a")),a=i("2f62");function r(t){return t&&t.__esModule?t:{default:t}}function o(t,e,i,n,a,r,o){try{var s=t[r](o),c=s.value}catch(_){return void i(_)}s.done?e(c):Promise.resolve(c).then(n,a)}function s(t){return function(){var e=this,i=arguments;return new Promise(function(n,a){var r=t.apply(e,i);function s(t){o(r,n,a,s,c,"next",t)}function c(t){o(r,n,a,s,c,"throw",t)}s(void 0)})}}function c(t){return l(t)||u(t)||_()}function _(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function u(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function l(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function d(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{},n=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(n=n.concat(Object.getOwnPropertySymbols(i).filter(function(t){return Object.getOwnPropertyDescriptor(i,t).enumerable}))),n.forEach(function(e){f(t,e,i[e])})}return t}function f(t,e,i){return e in t?Object.defineProperty(t,e,{value:i,enumerable:!0,configurable:!0,writable:!0}):t[e]=i,t}var h=function(){return Promise.resolve().then(i.bind(null,"ca07"))},m={components:{EiCalendar:h},data:function(){return{title_data_xuan_isShow:!0,title_data:"整体",data_time:[],customDate:[],time_tab_Br:!1,All_movie:{"--":{movie_name:"--",session_s:"--",session_ss:"--"}},distance_meters:3e3,is_index:!0,itemlist:[],city_xuan_index:2,city_xuan_data:["--","--","三公里","一公里"],time:"----",testimgs:[],tab_tow_scrollLeft:0,tab_tow_movie:!1,gallery_name:"--",gallery_index:0,movieidAr:[],zb_title:[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"占比",is_check:"",no_check:"分账",front_row:!0},{zb_name:"排场占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"上座率",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"票价",two_title:"",is_check:"平均",no_check:"平均",front_row:!1},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1}]}},computed:d({},(0,a.mapState)({res:"map_particulars_res",header_index:"map_particulars_tabtow_header_index"})),watch:{header_index:function(){if(1!=this.header_index)return!1;this.tab_tow_scrollLeft=0;var t=this.res,e=c(this.city_xuan_data),i=t.city,n=t.district,a=t.latitude,r=t.longitude;e[0]=i,e[1]=n;var o=new Date,s=o.getFullYear(),_=o.getMonth()+1,u=o.getDate();u<10&&(u="0"+u);var l=s+"-"+_+"-"+u;this.data_time=[new Date(l)],this.time=l,this.city_xuan_data=e;var d="/topprogram/compete-session?lat="+a+"&lng="+r;this.db_index(d,1)}},methods:{title_data_click:function(){this.title_data_xuan_isShow=!this.title_data_xuan_isShow},ei_calendar_tap:function(t){var e=t.format.split("/");e=e[0]+"-"+e[1]+"-"+e[2],this.time=e,this.time_tab_Br=!1,this.data_time=[new Date(e)],this.db_yp_data()},city_click:function(t,e){var i=this.res,n=i.city,a=i.district;i.latitude,i.longitude;if("三公里"==t||"一公里"==t)3==e?this.distance_meters=1e3:2==e&&(this.distance_meters=3e3);else if(0==e){if(-1!=n.indexOf("市")||-1!=n.indexOf("省")){var r=n.indexOf("市");console.log(r),n=n.slice(0,r)}this.distance_meters="city,"+n}else this.distance_meters="county,"+a;this.city_xuan_index=e,this.db_yp_data()},more_index_data_tap:function(e){console.log(data);var i=c(this.zb_title);if(i[e].front_row)i[e].front_row=!1;else{for(var n=0,a=0;a<i.length-1;a++)if(i[a].front_row&&(0==n?n=1:1==n?n=2:2==n?n=3:3==n&&(n=4)),4==n)return t.showToast({title:"最多选择四项",duration:2e3,icon:"none"}),!1;n<=4&&(i[e].front_row=!0)}this.zb_title=i},calcSize:function(){var e=this;return new Promise(function(i,n){var a=t.createSelectorQuery().in(e);a.select("#item1").fields({size:!0,computedStyle:["margin-left"]},function(t){var e=0;t&&(e=t.width+parseFloat(t["margin-left"])),i(e)}).exec()})},onclickimg:function(){var t=s(n.default.mark(function t(e,i){var a;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return this.testimgs,this.gallery_name=i.movie_name,this.tab_tow_movie=i,this.gallery_index=e,t.next=6,this.calcSize();case 6:a=t.sent,this.tab_tow_scrollLeft=a*e,this.db_yp_data();case 9:case"end":return t.stop()}},t,this)}));function e(e,i){return t.apply(this,arguments)}return e}(),db_index:function(){var t=s(n.default.mark(function t(e){var i,a,r,o,s,c,_,u,l,d,f,h,m,b=arguments;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return i=b.length>1&&void 0!==b[1]?b[1]:0,t.next=3,this.$http.get({url:e});case 3:for(_ in a=t.sent,r=a.data,console.log(r),o=[],s=r.mMoviedata,c=0,s)0==_&&1==i&&(this.gallery_name=s[_].movie_name),o.push({url:"https://db.topcdb.com"+s[_].img,movie_name:s[_].movie_name,session_s:s[_].session_s,mid:s[_].mid,zz_id:s[_].zz_id,id:c,movie_id:s[_].movie_id}),c++;for(m in u=o[0],l=this.res,l.city,l.district,l.latitude,l.longitude,d=r.sumData,f=d.movie_qg_sum,h=d.qg_sum.session_s,f)f[m].session_ss=(Number(f[m].session_s)/Number(h)*100).toFixed(2)+"%";this.All_movie=f,this.movieidAr=r.movieidAr,this.tab_tow_movie=u,this.testimgs=o,this.db_yp_data();case 22:case"end":return t.stop()}},t,this)}));function e(e){return t.apply(this,arguments)}return e}(),db_yp_data:function(){var t=s(n.default.mark(function t(){var e,i,a,r,o,s,_,u,l,d,f,h;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return e=this.res,e.city,e.district,i=e.latitude,a=e.longitude,r=c(this.movieidAr),o=this.gallery_index,s=this.distance_meters,_=this.time,u="/topprogram/get-compete-session?lat="+i+"&lng="+a+"&movie_id="+r[o]+"&distance_meters="+s+"&bdata="+_,t.next=9,this.$http.get({url:u});case 9:l=t.sent,d=l.data,!1,f=!1,h=!1,d.data.forEach(function(t,e){if(null!==t.total_bo_s){var i=1e4*t.total_bo_s-0,n=1e4*d.sum.total_bo_s-0,a=(i/n*100).toFixed(2);t.total_zb=a}var r=t.session_s,o=d.sum.session_s;f=r/o*100<.01?"<0.01%":(r/o*100).toFixed(2)+"%",t.session_zb=f,t.occupancy=(100*t.occupancy).toFixed(2)+"%";var s=d.sum.total_seats.split(","),c="";s.forEach(function(t,e){c+=t});var _=Number(t.total_seats);s=Number(c);h=_/s*100<.01?"<0.01%":(_/s*100).toFixed(2)+"%",t.total_seats_zb=h,t.avg_price=(t.avg_price-0).toFixed(2);var u=t.total_people_s,l=t.session_s;u=(u/l).toFixed(0),u<1&&(u=1),t.cj_people_s=u}),this.itemlist=d.data;case 16:case"end":return t.stop()}},t,this)}));function e(){return t.apply(this,arguments)}return e}(),disabledDate:function(t){var e=new Date("2019/5/10").getTime(),i=new Date("2019/7/21").getTime();return t.getTime()<=e||t.getTime()>=i}}};e.default=m}).call(this,i("543d")["default"])},"4f52":function(t,e,i){"use strict";i.r(e);var n=i("3e75"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e["default"]=a.a},"7cb0":function(t,e,i){},"9b22":function(t,e,i){"use strict";var n,a=function(){var t=this,e=this,i=e.$createElement;e._self._c;e._isMounted||(e.e0=function(){t.time_tab_Br=!0},e.e1=function(){t.is_index=!1},e.e2=function(){t.is_index=!0},e.e3=function(){t.time_tab_Br=!1})},r=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return r}),i.d(e,"a",function(){return n})},ab5c:function(t,e,i){"use strict";i.r(e);var n=i("9b22"),a=i("4f52");for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);i("b6ae");var o,s=i("f0c5"),c=Object(s["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=c.exports},b6ae:function(t,e,i){"use strict";var n=i("7cb0"),a=i.n(n);a.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pages/showman/map_particulars/tabtow/walkthrough_presell-create-component',
    {
        'pages/showman/map_particulars/tabtow/walkthrough_presell-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ab5c"))
        })
    },
    [['pages/showman/map_particulars/tabtow/walkthrough_presell-create-component']]
]);