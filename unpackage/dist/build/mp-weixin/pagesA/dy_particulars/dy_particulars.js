(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/dy_particulars/dy_particulars","components/ucharts_dome/publicity_cavas"],{"1f8c":function(e,t,a){"use strict";(function(e){a("b64a"),a("921b");i(a("66fd"));var t=i(a("b18a"));function i(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,a("543d")["createPage"])},2590:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,n=r(a("a34a")),o=r(a("2f71")),s=r(a("86fc"));a("b824"),r(a("ddb5"));function r(e){return e&&e.__esModule?e:{default:e}}function c(e,t,a,i,n,o,s){try{var r=e[o](s),c=r.value}catch(l){return void a(l)}r.done?t(c):Promise.resolve(c).then(i,n)}function l(e){return function(){var t=this,a=arguments;return new Promise(function(i,n){var o=e.apply(t,a);function s(e){c(o,i,n,s,r,"next",e)}function r(e){c(o,i,n,s,r,"throw",e)}s(void 0)})}}var u=null,d={onShareAppMessage:function(){},data:function(){return{front_row_index:0,cWidth:"",cHeight:"",pixelRatio:1,is_index:!0,yp_ys_zxt_data:{sum:{avg_price:"35.76",bdate:"2019-09-01",bo_rate:"0.570768",mid:"7295",movie_name:"速度与激情：特别行动",occupancy:"13.42",people_per_session:"19",publish_date:"2019-08-23",real_bo_s:"91465.05",realbo_rate:"57.01",seat_rate:"44.23",session_rate:"36.18",session_s:"1428093",total_bo_s:"991373422.14",total_people_s:"27719116",total_seats:"206285199",zz_id:"21493"},movieList:[]},zb_title:[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"占比",is_check:"",no_check:"分账",front_row:!0},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"平均票价",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排场占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"上座率",two_title:"",is_check:"",no_check:"",front_row:!1}],three_title_data:["城市票房","影投票房","影院票房"],canvas_data_header_index:0,canvas_data_header_data:["日票房","日排场"],time_data:"2019-08-08",message_data:{age:"--",baidukw:[{date:"--",mid:"--",value:"--"}],baidukw_Br:!0,baidukw_value:"--",country:"--",country1:"",country2:"",douban_score:"--",en_name:"--",filmLength:"--",firstday_bo:"--",firstday_people:"--",firstday_session:"--",firstday_session_s:"--",firstweek_bo:"--",firstweek_session:"--",firstweekend_people:"--",id:"7295",import_mode:"--",maoyan_score:"--",material:"--",movie_img:"",people:"--",publish_date:"--",real_bo:"--",session:"--",sessionSum:"--",session_s:"--",session_s_s:"--",total_bo:"----",total_bo_s:"--",tpp_score:"--",type:"--",version:[{date:"--",mid:"--",value:"--"}],wantwatch:[{date:"--",mid:"--",value:"--"}],weibokw:[{date:"--",mid:"--",value:"--"}],weibokw_Br:!1,weibokw_value:"--",weixin:[{date:"--",mid:"--",value:"--"}],weixin_Br:!0,weixin_value:"--",xk_wantwatch_up:"--",xk_wantwatch_up_Br:!1,zz_id:"--",zz_name:"--"},windowHeight:"",headr_fixd_Br:!0,headr_fixd_index:0,headr_fixd_data:["票房数据","营销数据","目标受众","营销事件"]}},created:function(){var e=new Date,t=e.getFullYear(),a=e.getMonth()+1,i=e.getDate()-1;console.log(t,a,i),this.time_data="".concat(t,"-").concat(a,"-").concat(i)},onLoad:function(t){var a=t.id,n=t.mid;this.res_id=t;var o="/topprogram/movie-main",s={id:a,mid:n};this.yp_index(o,s),i=this,this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(500);o="/topprogram/movie-mainjs";var r={id:a,mid:n};this.ypys_index(o,this,r)},onPageScroll:function(e){e.scrollTop;e.scrollTop>50?this.headr_fixd_Br=!1:this.headr_fixd_Br=!0},methods:{three_title_click:function(t){var a=this.res_id,i=a.id,n=a.mid;e.navigateTo({url:"./all_bo/all_bo?id="+i+"&mid="+n+"&index="+t})},canvas_data_header_click:function(e){var t=this.yp_ys_zxt_data,a={categories:[],series:[{name:"",data:[],color:"#F68C3E"}]},n=[{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!0},{zb_name:"票房",two_title:"占比",is_check:"",no_check:"分账",front_row:!0},{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"平均票价",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排场占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"上座率",two_title:"",is_check:"",no_check:"",front_row:!1}],o=[{zb_name:"场次",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"排场占比",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"人次",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"场均人次",two_title:"",is_check:"",no_check:"",front_row:!0},{zb_name:"票房",two_title:"(万元)",is_check:"",no_check:"分账",front_row:!1},{zb_name:"票房",two_title:"占比",is_check:"",no_check:"分账",front_row:!1},{zb_name:"上座率",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"排座占比",two_title:"",is_check:"",no_check:"",front_row:!1},{zb_name:"平均票价",two_title:"",is_check:"",no_check:"",front_row:!1}],s=t.movieJs;a.categories=s.xA,0==e?(s.total_data.forEach(function(e){e=Number(e),e=(e/1e4).toFixed(2),a.series[0].data.push(e)}),a.series[0].name="日票房",this.front_row_index=0,this.zb_title=n):1==e&&(s.session_data.forEach(function(e){e=Number(e),a.series[0].data.push(e)}),a.series[0].name="日排场",this.front_row_index=1,this.zb_title=o),i.showLineA("canvasLineA",a),this.canvas_data_header_index=e},ypys_index:function(){var e=l(n.default.mark(function e(t,a,s){var r,c,l,u,d,_;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.detection_validity();case 2:return r=e.sent,s["userType"]=r,e.next=6,this.$http.get({url:t,data:s});case 6:c=e.sent,l=c.data,u={categories:[],series:[{name:"",data:[],color:"#F68C3E"}]},d=l.movieJs,u.categories=d.xA,[],d.total_data.forEach(function(e){e=Number(e),e=(e/1e4).toFixed(0),u.series[0].data.push(e)}),u.series[0].name="日票房",_=l.movieList,_.forEach(function(e,t){_[t].avg_price=Number(_[t].avg_price).toFixed(2),_[t].occupancy=(100*_[t].occupancy).toFixed(2),_[t].seat_rate=(100*_[t].seat_rate).toFixed(2),_[t].people_per_session=Number(_[t].people_per_session).toFixed(0),_[t].session_rate=(100*_[t].session_rate).toFixed(2),_[t].realbo_rate=(100*_[t].realbo_rate).toFixed(2),_[t].real_bo_s=(_[t].real_bo_s/1e4).toFixed(2);var a=(0,o.default)(_[t].bdate).valueOf(),i=(0,o.default)(_[t].publish_date).valueOf(),n=(0,o.default)(new Date).format("YYYY-MM-DD");n=(0,o.default)(n).valueOf();var s=(a-i)/1e3/60/60/24,r="";if(0==s)s="首映日",r="";else if(s<0)r="",s="映前"+Math.abs(s)+"天";else{s="映后"+(s+1)+"天";var c=n-a;0==c?r="实时":c<0&&(r="预售")}_[t].time_condition=r,_[t].time_skx=s}),l.sum.avg_price=Number(l.sum.avg_price).toFixed(2),l.sum.occupancy=(100*l.sum.occupancy).toFixed(2),l.sum.seat_rate=(100*l.sum.seat_rate).toFixed(2),l.sum.people_per_session=Number(l.sum.people_per_session).toFixed(0),l.sum.session_rate=(100*l.sum.session_rate).toFixed(2),l.sum.realbo_rate=(100*l.sum.realbo_rate).toFixed(2),l.sum.real_bo_s=(l.sum.real_bo_s/1e4).toFixed(2),new Date(l.sum.bdate).valueOf(),new Date(l.sum.publish_date).valueOf(),console.log(l),this.yp_ys_zxt_data=l,i.showLineA("canvasLineA",u);case 28:case"end":return e.stop()}},e,this)}));function t(t,a,i){return e.apply(this,arguments)}return t}(),showLineA:function(e,t){u=new s.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disabled:!1,disableGrid:!0,type:"grid",gridType:"solid",itemCount:4,scrollShow:!0,scrollAlign:"left"},yAxis:{data:[{position:"left"}],gridType:"solid",splitNumber:5,min:10,max:5e3,format:function(e){return e}},width:i.cWidth*i.pixelRatio,height:i.cHeight*i.pixelRatio,extra:{line:{type:"straight"}}})},more_index_data_tap:function(t,a){var i="";if(i=this.zb_title,i[t].front_row)i[t].front_row=!1;else{for(var n=0,o=0;o<i.length-1;o++)if(i[o].front_row&&(0==n?n=1:1==n?n=2:2==n?n=3:3==n&&(n=4)),4==n)return e.showToast({title:"最多选择四项",duration:2e3,icon:"none"}),!1;n<=4&&(i[t].front_row=!0)}this.zb_title=i},more_index_header_click:function(){this.is_index=!0},show_index:function(){this.is_index=!1},touchLineA:function(e){u.scrollStart(e)},moveLineA:function(e){u.scroll(e)},touchEndLineA:function(e){var t=this;u.scrollEnd(e),u.showToolTip(e,{format:function(e,a){var i=new Date(a).getDay();console.log(i);var n="";7==i?n="周日":1==i?n="周一":2==i?n="周二":3==i?n="周三":4==i?n="周四":5==i?n="周五":6==i&&(n="周六");var o="";return o=0==t.canvas_data_header_index?"万票房":"场",a+" "+n+":"+e.data+o}})},tz_list:function(t){e.showLoading({title:"正在跳转",mask:!1});var a=this.res_id,i=a.id,n=a.mid,o="./dy_particulars_list/dy_particulars_list?id="+i+"&mid="+n;if("票房数据"==t)o+="&index=0&tab=null";else if("预排预售"==t)o+="&index=1&tab=null";else if("营销数据"==t)o+="&index=2&tab=null";else if("营销事件"==t)o+="&index=4&tab=null";else if("目标受众"==t)o+="&index=3&tab=20";else if("营销事件"==t)o+="&index=5&tab=null";else try{throw new Error("点击错误")}catch(s){console.log(s)}e.navigateTo({url:o}),e.hideLoading()},yp_index:function(){var t=l(n.default.mark(function t(a,i){var o,s,r,c,l,u,d,_,h,f,p,w,m,b,x;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return o=t.sent,i["userType"]=o,t.next=6,this.$http.get({url:a,data:i});case 6:for(r in s=t.sent,s.data.movie_img)s.data.movie_img=s.data.movie_img[r];Number(s.data.total_bo)/1e8>1?s.data.total_bo=(Number(s.data.total_bo)/1e8).toFixed(2)+"亿":s.data.total_bo=(Number(s.data.total_bo)/1e4).toFixed(2)+"万",Number(s.data.total_bo_s)/1e8>1?s.data.total_bo_s=(Number(s.data.total_bo_s)/1e8).toFixed(2)+"亿":s.data.total_bo_s=(Number(s.data.total_bo_s)/1e4).toFixed(2)+"万",Number(s.data.firstday_bo)/1e8>1?s.data.firstday_bo=(Number(s.data.firstday_bo)/1e8).toFixed(2)+"亿":s.data.firstday_bo=(Number(s.data.firstday_bo)/1e4).toFixed(2)+"万",Number(s.data.firstweek_bo)/1e7<1?s.data.firstweek_bo=(Number(s.data.firstweek_bo)/1e4).toFixed(2)+"万":s.data.firstweek_bo=(Number(s.data.firstweek_bo)/1e8).toFixed(2)+"亿",s.data["session_s_s"]=(Number(s.data.session_s)/Number(s.data.sessionSum)*100).toFixed(2)+"%",s.data.session_s=(Number(s.data.session_s)/1e4).toFixed(2)+"万",console.log(s.data),s.data["firstday_session_s"]=(Number(s.data.firstday_session)/Number(s.data.sessionFir)*100).toFixed(2),s.data["firstday_session_s"]>100?s.data["firstday_session_s"]="100%":s.data["firstday_session_s"]=s.data["firstday_session_s"]+"%",s.data.firstday_session=(Number(s.data.firstday_session)/1e4).toFixed(2)+"万",c=(Number(s.data.wantwatch[0].douban_wantwatch_up)+Number(s.data.wantwatch[0].tpp_wantwatch_up)+Number(s.data.wantwatch[0].wantwatch_up))/2,l=Number(s.data.wantwatch[1].douban_wantwatch_up)+Number(s.data.wantwatch[1].tpp_wantwatch_up)+Number(s.data.wantwatch[1].wantwatch_up),u=c-l/2,d=!1,u<1e-4&&(d=!0,u=Math.abs(u)),u=(u/l).toFixed(1),s.data["xk_wantwatch_up_all"]=c.toFixed(0),s.data["xk_wantwatch_up"]=u,s.data["xk_wantwatch_up_Br"]=d,void 0==s.data.weibokw[0]?(s.data["weibokw_value"]=0,s.data.weibokw=[{value:0}]):(_=Number(s.data.weibokw[0].value)-Number(s.data.weibokw[1].value),h=!1,_<1e-13&&(h=!0,_=Math.abs(_)),_=(Number(s.data.weibokw[1].value)/_).toFixed(1),s.data["weibokw_value"]=_,s.data["weibokw_Br"]=h),void 0==s.data.weixin[0]?(s.data["weixin_value"]="0",s.data.weixin=[{value:0}]):(f=Number(s.data.weixin[0].value)-Number(s.data.weixin[1].value),p=!1,f<1e-13&&(p=!0,f=Math.abs(f)),f=(Number(s.data.weixin[1].value)/f).toFixed(1),s.data["weixin_value"]=f,s.data["weixin_Br"]=p),w=0,void 0==s.data.baidukw[0]||(w=void 0==s.data.baidukw[0].value?Number(s.data.baidukw[1].value):void 0==s.data.baidukw[1].value?Number(s.data.baidukw[0].value):Number(s.data.baidukw[0].value)-Number(s.data.baidukw[1].value)),m=!1,w<1e-13&&(m=!0,w=Math.abs(w)),w=void 0==s.data.baidukw[1]?0:(Number(s.data.baidukw[1].value)/w).toFixed(1),s.data["baidukw_value"]=w,s.data["baidukw_Br"]=m,b=s.data.version,x=b.split(","),s.data.version=x,this.message_data=s.data,e.setNavigationBarTitle({title:s.data.zz_name});case 41:case"end":return t.stop()}},t,this)}));function a(e,a){return t.apply(this,arguments)}return a}()}};t.default=d}).call(this,a("543d")["default"])},"3ed0":function(e,t,a){"use strict";var i,n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"b",function(){return n}),a.d(t,"c",function(){return o}),a.d(t,"a",function(){return i})},"46c5":function(e,t,a){"use strict";var i=a("b928"),n=a.n(i);n.a},"4b06":function(e,t,a){"use strict";var i,n=function(){var e=this,t=e.$createElement;e._self._c},o=[];a.d(t,"b",function(){return n}),a.d(t,"c",function(){return o}),a.d(t,"a",function(){return i})},5415:function(e,t,a){"use strict";var i=a("e33a"),n=a.n(i);n.a},"9c6f":function(e,t,a){"use strict";a.r(t);var i=a("b1f7"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,function(){return i[e]})}(o);t["default"]=n.a},b18a:function(e,t,a){"use strict";a.r(t);var i=a("3ed0"),n=a("d150");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("46c5");var s,r=a("f0c5"),c=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=c.exports},b1f7:function(e,t,a){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var i,n=r(a("a34a")),o=r(a("86fc")),s=a("b824");function r(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{},i=Object.keys(a);"function"===typeof Object.getOwnPropertySymbols&&(i=i.concat(Object.getOwnPropertySymbols(a).filter(function(e){return Object.getOwnPropertyDescriptor(a,e).enumerable}))),i.forEach(function(t){l(e,t,a[t])})}return e}function l(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function u(e,t,a,i,n,o,s){try{var r=e[o](s),c=r.value}catch(l){return void a(l)}r.done?t(c):Promise.resolve(c).then(i,n)}function d(e){return function(){var t=this,a=arguments;return new Promise(function(i,n){var o=e.apply(t,a);function s(e){u(o,i,n,s,r,"next",e)}function r(e){u(o,i,n,s,r,"throw",e)}s(void 0)})}}var _=null,h=null,f=null,p=null,w=null,m=null,b=null,x={props:{name:{type:Object},canvas_url:{type:Object}},data:function(){return{sp_tab_index:0,sp_Data:["腾讯","优酷","爱奇艺"],yq_data:"2019-10-10",xk_data:[],xk_Data:["日增","累计"],xk_tab_index:0,cWidth_xk:"",cHeight_xk:"",textarea_xk:"",cWidth_zh:"",cHeight_zh:"",textarea_zh:"",cWidth:"",cHeight:"",pixelRatio:1,textarea:"",imageurl:"https://p0.meituan.net/moviemachine/7b9b0725ab5feae642e1fbba9fbb90fe3702078.jpg@160w_220h_1e_1c"}},created:function(){i=this,this.cWidth_xk=e.upx2px(750),this.cHeight_xk=e.upx2px(500),this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(600),this.cWidth_zh=e.upx2px(750),this.cHeight_zh=e.upx2px(500),this.cWidth_sp=e.upx2px(750),this.cHeight_sp=e.upx2px(500),this.cWidth_bd=e.upx2px(750),this.cHeight_bd=e.upx2px(500),this.cWidth_wb=e.upx2px(750),this.cHeight_wb=e.upx2px(500),this.cWidth_wx=e.upx2px(750),this.cHeight_wx=e.upx2px(500)},watch:{yq_data:function(){this.$emit("rlData",this.yq_data)},canvas_url:function(){var e=this.canvas_url;console.log(e),this.getServerData(e,!1)},name:function(){var e=this.name,t=e.id,a=e.mid;console.log(this.name);var i={url:"/topprogram/get-con-situation",data:{id:t,mid:a}};this.getServerData(i,!0);var n="/topprogram/get-consensus",o={id:t,mid:a};return this.xk_index(n,o),"name_dy"}},methods:{time_data_click:function(){this.$emit("rl_click",!0)},showLineA_pf:function(e,t){b=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!0},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:10,format:function(e){return e}},width:i.cWidth_wx*i.pixelRatio,height:i.cHeight_wx*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_pf:function(e){b.scrollStart(e)},moveLineA_pf:function(e){b.scroll(e)},touchEndLineA_pf:function(e){b.scrollEnd(e),b.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_pf:function(){if((0,s.isJSON)(i.textarea)){var t=JSON.parse(i.textarea);b.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_wx:function(e,t){m=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:3e3,format:function(e){return e}},width:i.cWidth_wx*i.pixelRatio,height:i.cHeight_wx*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_wx:function(e){m.scrollStart(e)},moveLineA_wx:function(e){m.scroll(e)},touchEndLineA_wx:function(e){m.scrollEnd(e),m.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_wx:function(){if((0,s.isJSON)(i.textarea)){var t=JSON.parse(i.textarea);m.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_wb:function(e,t){w=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:10,max:25e3,format:function(e){return e}},width:i.cWidth_wb*i.pixelRatio,height:i.cHeight_wb*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_wb:function(e){w.scrollStart(e)},moveLineA_wb:function(e){w.scroll(e)},touchEndLineA_wb:function(e){w.scrollEnd(e),w.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_wb:function(){if((0,s.isJSON)(i.textarea)){var t=JSON.parse(i.textarea);w.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_bd:function(e,t){p=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:10,max:25e3,format:function(e){return e}},width:i.cWidth_bd*i.pixelRatio,height:i.cHeight_bd*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_bd:function(e){p.scrollStart(e)},moveLineA_bd:function(e){p.scroll(e)},touchEndLineA_bd:function(e){p.scrollEnd(e),p.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},showLineA_sp:function(e,t){f=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:15e3,format:function(e){return e}},width:i.cWidth_sp*i.pixelRatio,height:i.cHeight_sp*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_sp:function(e){f.scrollStart(e)},moveLineA_sp:function(e){f.scroll(e)},touchEndLineA_sp:function(e){f.scrollEnd(e),f.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_sp:function(){if((0,s.isJSON)(i.textarea_sp)){var t=JSON.parse(i.textarea_sp);_.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},sp_tab_tap:function(e){var t=this.sp_Alldata,a="",n="";0==e?(a="腾讯",n="qq_playCount"):1==e?(a="优酷",n="youku_playCount"):(a="爱奇艺",n="iqiyi_playCount");var o={categories:[],series:[{data:[]}]};t.x.forEach(function(e){e=e.slice(5),o.categories.push(e)}),t[n].forEach(function(e){"null"==e||null==e?o.series[0].data.push(0):o.series[0].data.push(e)}),o.series[0].color="#F08E2D",o.series[0].name=a,i.showLineA_sp("canvasLineA_sp",o),this.sp_tab_index=e},showLineA_xk:function(e,t){h=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!0},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:100,format:function(e){return e}},width:i.cWidth_xk*i.pixelRatio,height:i.cHeight_xk*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_xk:function(e){h.scrollStart(e)},moveLineA_xk:function(e){h.scroll(e)},touchEndLineA_xk:function(e){h.scrollEnd(e),h.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_xk:function(){if((0,s.isJSON)(i.textarea_xk)){var t=JSON.parse(i.textarea_xk);h.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},xk_tab_tap:function(e){this.xk_tab_index=e;var t=this.xk_data,a="";a=0==e?"wantwatch":"wantleiji";var n={categories:[],series:[{data:[]},{data:[]},{data:[]}]},o=[],s=[],r=[];t[a].x.forEach(function(e){e=e.slice(5),n.categories.push(e)}),console.log(e),console.log(t[a]),0==e?(t[a].douban_wantwatch_up.forEach(function(e){"null"==e||null==e?o.push(0):o.push(e)}),t[a].maoyan_wantwatch_up.forEach(function(e){"null"==e||null==e?s.push(0):s.push(e)}),t[a].tpp_wantwatch_up.forEach(function(e){"null"==e||null==e?r.push(0):r.push(e)})):(t[a].douban_wantwatch_leiji.forEach(function(e){"null"==e||null==e?o.push(0):o.push(e)}),t[a].maoyan_wantwatch_leiji.forEach(function(e){"null"==e||null==e?s.push(0):s.push(e)}),t[a].tpp_wantwatch_leiji.forEach(function(e){"null"==e||null==e?r.push(0):r.push(e)})),n.series[0]["data"]=o,n.series[1]["data"]=s,n.series[2]["data"]=r,n.series[0].color="#F08E2D",n.series[0].name="豆瓣想看",n.series[1].color="#3E8EF2",n.series[1].name="猫眼想看",n.series[2].color="#2CC6FF",n.series[2].name="淘票票想看",console.log(n),i.showLineA_xk("canvasLineA_xk",n)},xk_index:function(){var e=d(n.default.mark(function e(t,a){var o,s,r,c,l,u,d,_,h,f,p,w,m,b;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.detection_validity();case 2:return o=e.sent,a["userType"]=o,e.next=6,this.$http.get({url:t,data:a});case 6:s=e.sent,r=s.data,c=r.data,l={wantwatch:{},wantleiji:{}},l["wantwatch"]=c.wantwatch,l["wantleiji"]=c.wantleiji,u={categories:[],series:[{data:[]},{data:[]},{data:[]}]},l.wantwatch.x.forEach(function(e){e=e.slice(5),u.categories.push(e)}),d=[],_=[],h=[],l.wantwatch.douban_wantwatch_up.forEach(function(e){"null"==e||null==e?d.push(0):d.push(e)}),l.wantwatch.maoyan_wantwatch_up.forEach(function(e){"null"==e||null==e?_.push(0):_.push(e)}),l.wantwatch.tpp_wantwatch_up.forEach(function(e){"null"==e||null==e?h.push(0):h.push(e)}),u.series[0]["data"]=d,u.series[1]["data"]=_,u.series[2]["data"]=h,u.series[0].color="#F08E2D",u.series[0].name="豆瓣想看",u.series[1].color="#3E8EF2",u.series[1].name="猫眼想看",u.series[2].color="#2CC6FF",u.series[2].name="淘票票想看",console.log(c.videoinfos),f={categories:[],series:[{data:[]}]},c.videoinfos.x.forEach(function(e){e=e.slice(5),f.categories.push(e)}),c.videoinfos.qq_playCount.forEach(function(e){"null"==e||null==e?f.series[0].data.push(0):f.series[0].data.push(e)}),f.series[0].color="#F08E2D",f.series[0].name="腾讯",p={categories:[],series:[{data:[]}]},c.baidukw.x.forEach(function(e){e=e.slice(5),p.categories.push(e)}),c.baidukw.value.forEach(function(e){"null"==e||null==e?p.series[0].data.push(0):p.series[0].data.push(e)}),p.series[0].color="#F08E2D",p.series[0].name="百度指数",w={categories:[],series:[{data:[]}]},c.weibokw.x.forEach(function(e){e=e.slice(5),w.categories.push(e)}),c.weibokw.value.forEach(function(e){"null"==e||null==e?w.series[0].data.push(0):w.series[0].data.push(e)}),w.series[0].color="#F08E2D",w.series[0].name="微博指数",console.log(c),m={categories:[],series:[{data:[]}]},c.weixindata.x.forEach(function(e){e=e.slice(5),m.categories.push(e)}),c.weixindata.weixin_index.forEach(function(e){"null"==e||null==e?m.series[0].data.push(0):m.series[0].data.push(e)}),m.series[0].color="#F08E2D",m.series[0].name="微博指数",b={categories:[],series:[{data:[]},{data:[]},{data:[]}]},c.maoyanScores.x.forEach(function(e){e=e.slice(5),b.categories.push(e)}),c.maoyanScores.douban_score.forEach(function(e){"null"==e||null==e?b.series[0].data.push(0):b.series[0].data.push(e)}),b.series[0].color="#F08E2D",b.series[0].name="豆瓣评分",c.maoyanScores.maoyan_score.forEach(function(e){"null"==e||null==e?b.series[1].data.push(0):b.series[1].data.push(e)}),b.series[1].color="#3E8EF2",b.series[1].name="猫眼评分",c.maoyanScores.tpp_score.forEach(function(e){"null"==e||null==e?b.series[2].data.push(0):b.series[2].data.push(e)}),b.series[2].color="#2CC6FF",b.series[2].name="淘票票评分",i.showLineA_pf("canvasLineA_pf",b),i.showLineA_wx("canvasLineA_wx",m),i.showLineA_wb("canvasLineA_wb",w),i.showLineA_bd("canvasLineA_bd",p),i.showLineA_sp("canvasLineA_sp",f),i.showLineA_xk("canvasLineA_xk",u),this.xk_data=l,this.sp_Alldata=c.videoinfos;case 70:case"end":return e.stop()}},e,this)}));function t(t,a){return e.apply(this,arguments)}return t}(),showLineA:function(e,t){_=new o.default({$this:i,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:i.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:10,format:function(e){return e}},width:i.cWidth_zh*i.pixelRatio,height:i.cHeight_zh*i.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA:function(e){_.scrollStart(e)},moveLineA:function(e){_.scroll(e)},touchEndLineA:function(e){_.scrollEnd(e),_.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_zh:function(){if((0,s.isJSON)(i.textarea_zh)){var t=JSON.parse(i.textarea_zh);_.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},getServerData:function(){var t=d(n.default.mark(function t(a,o){var s,r,l,u,d,_,h,f;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return s=t.sent,console.log(a),a.data["userType"]=s,t.next=7,this.$http.get(c({},a));case 7:if(r=t.sent,l=r.data,"没找到影片数据"!=l.msg){t.next=12;break}return e.showToast({title:"超出选择",duration:2e3,icon:"none"}),t.abrupt("return",!1);case 12:for(h in u={categories:[],series:[],numNbr:[]},d={},_=[],u.categories=["百度数据","微信数据","微博数据","想看指数","视频物料","评分"],l.data)"mid"!=h&&"date"!=h&&"zz_name"!=h&&"zonghe_kw"!=h&&(null==l.data[h]?(_.push(0),console.log(h)):_.push(Number(l.data[h])));u.numNbr=_,d["data"]=_,d["color"]="#F08E2D",d["name"]="",u.series[0]=d,f={categories:[],series:[{data:[]}]},l.data.zonghe_kw.x.forEach(function(e){e=e.slice(5),f.categories.push(e)}),l.data.zonghe_kw.value.forEach(function(e,t){f.series[0].data.push(e)}),f.series[0].color="#F08E2D",f.series[0].name="数营指数",this.yq_data=l.data.date,o&&i.showLineA("canvasLineA",f),i.showRadar("canvasRadar",u);case 30:case"end":return t.stop()}},t,this)}));function a(e,a){return t.apply(this,arguments)}return a}(),showRadar:function(e,t){new o.default({$this:i,canvasId:e,type:"radar",fontSize:11,legend:{show:!1},background:"#FFFFFF",pixelRatio:i.pixelRatio,animation:!0,dataLabel:!0,categories:t.categories,series:t.series,numNbr:t.numNbr,width:i.cWidth*i.pixelRatio,height:i.cHeight*i.pixelRatio,extra:{radar:{max:10}}})},touchRadar:function(e){}}};t.default=x}).call(this,a("543d")["default"])},b928:function(e,t,a){},d150:function(e,t,a){"use strict";a.r(t);var i=a("2590"),n=a.n(i);for(var o in i)"default"!==o&&function(e){a.d(t,e,function(){return i[e]})}(o);t["default"]=n.a},ddb5:function(e,t,a){"use strict";a.r(t);var i=a("4b06"),n=a("9c6f");for(var o in n)"default"!==o&&function(e){a.d(t,e,function(){return n[e]})}(o);a("5415");var s,r=a("f0c5"),c=Object(r["a"])(n["default"],i["b"],i["c"],!1,null,null,null,!1,i["a"],s);t["default"]=c.exports},e33a:function(e,t,a){}},[["1f8c","common/runtime","common/vendor"]]]);