(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/market-data/market-data"],{"07c0":function(t,e,a){"use strict";var i,o=function(){var t=this,e=t.$createElement;t._self._c},n=[];a.d(e,"b",function(){return o}),a.d(e,"c",function(){return n}),a.d(e,"a",function(){return i})},"312d":function(t,e,a){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var i=n(a("a34a")),o=n(a("2f71"));function n(t){return t&&t.__esModule?t:{default:t}}function s(t,e,a,i,o,n,s){try{var r=t[n](s),_=r.value}catch(c){return void a(c)}r.done?e(_):Promise.resolve(_).then(i,o)}function r(t){return function(){var e=this,a=arguments;return new Promise(function(i,o){var n=t.apply(e,a);function r(t){s(n,i,o,r,_,"next",t)}function _(t){s(n,i,o,r,_,"throw",t)}r(void 0)})}}var _={onShareAppMessage:function(){},filters:{disposeTiem:function(t){var e=new Date,a=e.getHours(),i=e.getMinutes();return i<10&&(i="0"+i),a+":"+i}},data:function(){return{set_time_data:"",time_data:"",dq_num:0,table_title:["排名","票房(万元)","平均票价","场均人次"],show_dq:!0,show_year:!0,tabThreeTbody:[],this_dq:"元旦",data_title:[],festival_title:[],windowHeight:"",time:0,tbody:[],time_title:["单日票房","单周票房","单月票房"],change_title:"单日票房",head_title:["序号 　　日期","单日票房(万)","总场次(万)","总人次(万)"],gs_data:new Date,city_name:"全国",office_num:"",is_index:!0,All_sum_data:[],this_time:"",this_year:"",yaer_data:"2019",is_show:!0,inputVal:"",zm_right:["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"],alpha:"",qy:["全国","一线城市","二线城市","三线城市","四线城市","五线城市"],rm_city:["北京","上海","广州","深圳 ","成都","武汉","重庆","杭州","南京","苏州"],zm_list:[],scroll_view_index:1,year:["全部","2019","2018","2017","2016","2015","2014","2013","2012"],itemlist:[],hader_data:["总票房榜","大盘票房","档期票房"],hader_data_index:0,service:!0,zb_title:[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"占比",is_check:"",no_check:"分账",front_row:!0},{zb_name:"排场占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"上座率",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"票价",two_title:"",is_check:"平均",no_check:"平均",front_row:!0},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1}]}},created:function(){var t=this;this.set_time_data=setInterval(function(){var e=new Date,a=e.getHours(),i=e.getMinutes();i<10&&(i="0"+i),t.time_data=a+":"+i},1e3)},onUnload:function(){console.log("实例销毁"),clearInterval(this.set_time_data)},onLoad:function(){var e=r(i.default.mark(function e(){var a,n,s,r,_,c,d,l,h,u,f,p,w,m;return i.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$http.get({url:"/topprogram/get-schedule"});case 2:for(a=e.sent,n=a.data,this.festival_title=n,s=new Date,s.setTime(s.getTime()-864e5),r=s.getFullYear(),_=s.getMonth()+1,c=s.getDate(),d=(0,o.default)(new Date).add(0,"year").format("YYYY")-0,l=r+"年"+_+"月"+c,h=[],h.push("全部"),u=r;u>=2012;u--)h.push(u);this.this_time=l,this.year=h,this.this_year=d,this.data_title=h,this.yaer_data=d,f="/topprogram/get-total",p={year:d},w=(0,o.default)(new Date).format("YYYY-MM-DD"),this.all_bo(f,this,w,p);try{m=t.getSystemInfoSync(),this.pixelRatio=m.pixelRatio,this.apHeight=16,this.offsetTop=80,this.windowHeight=m.windowHeight-0-165+"px"}catch(i){}case 25:case"end":return e.stop()}},e,this)}));function a(){return e.apply(this,arguments)}return a}(),methods:{tz_click:function(e,a){t.navigateTo({url:"../../pagesA/dy_particulars/dy_particulars?id="+a+"&mid="+e})},tabthree_dq_tap:function(t,e){var a=this,i=this.this_year,o=e,n="/topprogram/get-totalschedule",s={schedule:o,year:i,with_fwf:-1};a.dq_bo(n,this,s),this.dq_num=e,this.this_dq=t,this.show_dq=!0},tabthree_year:function(t){var e=this.dq_num,a=t,i="/topprogram/get-totalschedule",o={schedule:e,year:a,with_fwf:-1};this.dq_bo(i,this,o),this.this_year=a,this.show_year=!0},check_year:function(){this.show_year=!1},check_dq:function(){this.show_dq=!1},tab_data_tap:function(t){var e=this,a=this.change_title,i=this.head_title,o="",n={};0==t?(a="单日票房",i[1]="单日票房(万)",i[0]="序号 　　日期",o="/topprogram/get-totallist2",n={dtype:"date"},e.dp_bo(o,e,n)):1==t?(a="单周票房",i[1]="单周票房(万)",i[0]="序号 　　周次",o="/topprogram/get-totallist2",n={dtype:"week"},e.dp_bo(o,e,n)):(a="单月票房",i[1]="单月票房(万)",i[0]="序号 　　月份",o="/topprogram/get-totallist2",n={dtype:"month"},e.dp_bo(o,e,n)),this.time=t,this.change_title=a,this.head_title=i},dell_data:function(e){var a=this.service,i=this.yaer_data,n=this.this_year,s=this.gs_data;if("全部"==i)return t.showToast({title:"现在选中全部",duration:2e3,icon:"none"}),!1;var r="";r=a?1:0;var _={},c="";if(1==e){if(i<=2012)return t.showToast({title:"最小选择2012年",duration:2e3,icon:"none"}),!1;i-=1,i<=2016&&(this.service=!1),c="/topprogram/get-total",_={year:i,with_fwf:r}}else{if(i>=n)return t.showToast({title:"最大选择"+n+"年",duration:2e3,icon:"none"}),!1;i+=1,i<=2016&&(this.service=!1),c="/topprogram/get-total",_={year:i,with_fwf:r}}this.yaer_data=i,s=(0,o.default)(s).format("YYYY-MM-DD"),this.all_bo(c,this,s,_)},checkboxChange:function(){var t=this.service,e=this.yaer_data,a=this.gs_data,i=(e=this.yaer_data,"");if(e<=2016)return!1;i=t?0:1;var n="/topprogram/get-total",s={year:e,with_fwf:i};a=(0,o.default)(a).format("YYYY-MM-DD"),this.all_bo(n,this,a,s),this.service=!t},more_index_data_tap:function(e){var a=this.zb_title;if(a[e].front_row)a[e].front_row=!1;else{for(var i=0,o=0;o<a.length-1;o++)if(a[o].front_row&&(0==i?i=1:1==i?i=2:2==i?i=3:3==i&&(i=4)),4==i)return t.showToast({title:"最多选择四项",duration:2e3,icon:"none"}),!1;i<=4&&(a[e].front_row=!0)}this.zb_title=a},more_index_header_click:function(){this.is_index=!0},show_index:function(){this.is_index=!1},all_bo:function(){var t=r(i.default.mark(function t(e,a,n,s){var r,_,c,d,l,h,u,f,p,w,m,v,g,b,y,x,k,Y,F,D,M,z,T,q,H,B;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return r=t.sent,s["userType"]=r,t.next=6,this.$http.get({url:e,data:s});case 6:for(m in _=t.sent,c=_.data,d=c.sum,l=c.data,h="",u="",f="",p="",w=(d.total_bo_s/1e4).toFixed(2),w>=1e5?w=(w/1e4).toFixed(2)+"亿":w+="万",a.office_num=w,l)v=l[m].publish_date,g=(0,o.default)(n).valueOf(),b=(0,o.default)(v).valueOf(),y=(0,o.default)(g-b),u=y/1e3/60/60/24,0==u?u="首映":-1==u?u="零点场":u<-1?u="点映":(u=u-0+1,u="上映"+u+"天"),"上映NaN天"==u&&(u="上映-天"),null!==l[m].total_bo_s&&(x=l[m].total_bo_s-0,k=d.total_bo_s-0,f=(x/k*100).toFixed(2),l[m].total_zb=f),Y=l[m].session_s,F=d.session_s,h=Y/F*100<.01?"<0.01%":(Y/F*100).toFixed(2)+"%",D=l[m].total_people_s,M=l[m].session_s,D=(D/M).toFixed(0),D<1&&(D=1),z=l[m].seat_s,T=d.seat_s,p=z/T*100<.01?"<0.01%":(z/T*100).toFixed(2)+"%",l[m].seat_s=p,q=l[m].totalBo,null==q?l[m].totalBo="-":(q=(q/1e8).toFixed(2),q=q<.1?(l[m].totalBo/1e4).toFixed(2)+"万":(l[m].totalBo/1e8).toFixed(2)+"亿",l[m].totalBo=q),l[m].occupancy=(100*l[m].occupancy).toFixed(2)+"%",l[m].cj_people_s=D,l[m].session_zb=h,l[m].sy_data=u,l[m].total_bo_s=(l[m].total_bo_s/1e4).toFixed(2),l[m].avg_price=Number(l[m].avg_price).toFixed(2);H=Number(d.avg_price),d.avg_price=H.toFixed(2)+"元",B=d.occupancy,d.occupancy=Number(100*B).toFixed(2)+"%",D=d.total_people_s/1e4,d.total_people_s=D.toFixed(2)+"万",M=d.session_s/1e4,d.session_s=M.toFixed(2)+"万",this.All_sum_data=c;case 27:case"end":return t.stop()}},t,this)}));function e(e,a,i,o){return t.apply(this,arguments)}return e}(),dq_bo:function(){var t=r(i.default.mark(function t(e,a,o){var n,s,r,_;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return n=t.sent,o["userType"]=n,t.next=6,this.$http.get({url:e,data:o});case 6:for(_ in s=t.sent,r=s.data,r.data)r.data[_].total_bo_s=(r.data[_].total_bo_s/1e4).toFixed(2),r.data[_].avg_price=(r.data[_].avg_price-0).toFixed(0),r.data[_].session_people=(r.data[_].total_people_s/r.data[_].session_s).toFixed(0);this.tabThreeTbody=r.data;case 10:case"end":return t.stop()}},t,this)}));function e(e,a,i){return t.apply(this,arguments)}return e}(),dp_bo:function(){var t=r(i.default.mark(function t(e,a,n){var s,r,_,c,d;return i.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return s=t.sent,n["userType"]=s,t.next=6,this.$http.get({url:e,data:n});case 6:for(c in r=t.sent,_=r.data,console.log(_),_.data)_.data[c].total_bo_s=(_.data[c].total_bo_s/1e4).toFixed(2),_.data[c].session_s=(_.data[c].session_s/1e4).toFixed(2),_.data[c].total_people_s=(_.data[c].total_people_s/1e4).toFixed(2),d="",d=(0,o.default)(_.data[c].bdate).format("d"),0==d?d="周日":1==d?d="周一":2==d?d="周二":3==d?d="周三":4==d?d="周四":5==d?d="周五":6==d&&(d="周六"),_.data[c].days=d;this.tbody=_.data;case 11:case"end":return t.stop()}},t,this)}));function e(e,a,i){return t.apply(this,arguments)}return e}(),page__bd_cc_click:function(){this.is_show=!0},dddd:function(t){this.alpha=t},Header_top_click:function(t){var e=this;if(0==t){var a=this.yaer_data,i="/topprogram/get-total",n={year:a},s=(0,o.default)(new Date).format("YYYY-MM-DD");this.all_bo(i,this,s,n)}else if(1==t){i="/topprogram/get-totallist2";var r={dtype:"date"};e.dp_bo(i,e,r),this.time=0}else{var _=e.this_year,c=(i="/topprogram/get-totalschedule",{schedule:0,year:_,with_fwf:-1});e.dq_bo(i,e,c)}this.hader_data_index=t},scroll_view_tap:function(t,e){this.scroll_view_index=t;this.yaer_data;var a=this.service,i=this.gs_data,n="";this.yaer_data=e,e="全部"==e?"all":e,n=a?1:0,console.log(e),e<=2016&&(this.service=!1);var s="/topprogram/get-total",r={year:e,with_fwf:n};i=(0,o.default)(i).format("YYYY-MM-DD"),this.all_bo(s,this,i,r)}}};e.default=_}).call(this,a("543d")["default"])},"3abb":function(t,e,a){"use strict";a.r(e);var i=a("07c0"),o=a("4e93");for(var n in o)"default"!==n&&function(t){a.d(e,t,function(){return o[t]})}(n);a("6653");var s,r=a("f0c5"),_=Object(r["a"])(o["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);e["default"]=_.exports},"4e93":function(t,e,a){"use strict";a.r(e);var i=a("312d"),o=a.n(i);for(var n in i)"default"!==n&&function(t){a.d(e,t,function(){return i[t]})}(n);e["default"]=o.a},"5f97":function(t,e,a){},6653:function(t,e,a){"use strict";var i=a("5f97"),o=a.n(i);o.a},7789:function(t,e,a){"use strict";(function(t){a("b64a"),a("921b");i(a("66fd"));var e=i(a("3abb"));function i(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,a("543d")["createPage"])}},[["7789","common/runtime","common/vendor"]]]);