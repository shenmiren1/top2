(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ucharts_dome/publicity_cavas"],{"4b06":function(e,t,i){"use strict";var a,n=function(){var e=this,t=e.$createElement;e._self._c},s=[];i.d(t,"b",function(){return n}),i.d(t,"c",function(){return s}),i.d(t,"a",function(){return a})},5415:function(e,t,i){"use strict";var a=i("e33a"),n=i.n(a);n.a},"9c6f":function(e,t,i){"use strict";i.r(t);var a=i("b1f7"),n=i.n(a);for(var s in a)"default"!==s&&function(e){i.d(t,e,function(){return a[e]})}(s);t["default"]=n.a},b1f7:function(e,t,i){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var a,n=r(i("a34a")),s=r(i("86fc")),o=i("b824");function r(e){return e&&e.__esModule?e:{default:e}}function c(e){for(var t=1;t<arguments.length;t++){var i=null!=arguments[t]?arguments[t]:{},a=Object.keys(i);"function"===typeof Object.getOwnPropertySymbols&&(a=a.concat(Object.getOwnPropertySymbols(i).filter(function(e){return Object.getOwnPropertyDescriptor(i,e).enumerable}))),a.forEach(function(t){l(e,t,i[t])})}return e}function l(e,t,i){return t in e?Object.defineProperty(e,t,{value:i,enumerable:!0,configurable:!0,writable:!0}):e[t]=i,e}function u(e,t,i,a,n,s,o){try{var r=e[s](o),c=r.value}catch(l){return void i(l)}r.done?t(c):Promise.resolve(c).then(a,n)}function h(e){return function(){var t=this,i=arguments;return new Promise(function(a,n){var s=e.apply(t,i);function o(e){u(s,a,n,o,r,"next",e)}function r(e){u(s,a,n,o,r,"throw",e)}o(void 0)})}}var d=null,p=null,f=null,g=null,x=null,w=null,_=null,m={props:{name:{type:Object},canvas_url:{type:Object}},data:function(){return{sp_tab_index:0,sp_Data:["腾讯","优酷","爱奇艺"],yq_data:"2019-10-10",xk_data:[],xk_Data:["日增","累计"],xk_tab_index:0,cWidth_xk:"",cHeight_xk:"",textarea_xk:"",cWidth_zh:"",cHeight_zh:"",textarea_zh:"",cWidth:"",cHeight:"",pixelRatio:1,textarea:"",imageurl:"https://p0.meituan.net/moviemachine/7b9b0725ab5feae642e1fbba9fbb90fe3702078.jpg@160w_220h_1e_1c"}},created:function(){a=this,this.cWidth_xk=e.upx2px(750),this.cHeight_xk=e.upx2px(500),this.cWidth=e.upx2px(750),this.cHeight=e.upx2px(600),this.cWidth_zh=e.upx2px(750),this.cHeight_zh=e.upx2px(500),this.cWidth_sp=e.upx2px(750),this.cHeight_sp=e.upx2px(500),this.cWidth_bd=e.upx2px(750),this.cHeight_bd=e.upx2px(500),this.cWidth_wb=e.upx2px(750),this.cHeight_wb=e.upx2px(500),this.cWidth_wx=e.upx2px(750),this.cHeight_wx=e.upx2px(500)},watch:{yq_data:function(){this.$emit("rlData",this.yq_data)},canvas_url:function(){var e=this.canvas_url;console.log(e),this.getServerData(e,!1)},name:function(){var e=this.name,t=e.id,i=e.mid;console.log(this.name);var a={url:"/topprogram/get-con-situation",data:{id:t,mid:i}};this.getServerData(a,!0);var n="/topprogram/get-consensus",s={id:t,mid:i};return this.xk_index(n,s),"name_dy"}},methods:{time_data_click:function(){this.$emit("rl_click",!0)},showLineA_pf:function(e,t){_=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!0},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:10,format:function(e){return e}},width:a.cWidth_wx*a.pixelRatio,height:a.cHeight_wx*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_pf:function(e){_.scrollStart(e)},moveLineA_pf:function(e){_.scroll(e)},touchEndLineA_pf:function(e){_.scrollEnd(e),_.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_pf:function(){if((0,o.isJSON)(a.textarea)){var t=JSON.parse(a.textarea);_.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_wx:function(e,t){w=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:3e3,format:function(e){return e}},width:a.cWidth_wx*a.pixelRatio,height:a.cHeight_wx*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_wx:function(e){w.scrollStart(e)},moveLineA_wx:function(e){w.scroll(e)},touchEndLineA_wx:function(e){w.scrollEnd(e),w.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_wx:function(){if((0,o.isJSON)(a.textarea)){var t=JSON.parse(a.textarea);w.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_wb:function(e,t){x=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:10,max:25e3,format:function(e){return e}},width:a.cWidth_wb*a.pixelRatio,height:a.cHeight_wb*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_wb:function(e){x.scrollStart(e)},moveLineA_wb:function(e){x.scroll(e)},touchEndLineA_wb:function(e){x.scrollEnd(e),x.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_wb:function(){if((0,o.isJSON)(a.textarea)){var t=JSON.parse(a.textarea);x.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},showLineA_bd:function(e,t){g=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:10,max:25e3,format:function(e){return e}},width:a.cWidth_bd*a.pixelRatio,height:a.cHeight_bd*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_bd:function(e){g.scrollStart(e)},moveLineA_bd:function(e){g.scroll(e)},touchEndLineA_bd:function(e){g.scrollEnd(e),g.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},showLineA_sp:function(e,t){f=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:15e3,format:function(e){return e}},width:a.cWidth_sp*a.pixelRatio,height:a.cHeight_sp*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_sp:function(e){f.scrollStart(e)},moveLineA_sp:function(e){f.scroll(e)},touchEndLineA_sp:function(e){f.scrollEnd(e),f.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_sp:function(){if((0,o.isJSON)(a.textarea_sp)){var t=JSON.parse(a.textarea_sp);d.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},sp_tab_tap:function(e){var t=this.sp_Alldata,i="",n="";0==e?(i="腾讯",n="qq_playCount"):1==e?(i="优酷",n="youku_playCount"):(i="爱奇艺",n="iqiyi_playCount");var s={categories:[],series:[{data:[]}]};t.x.forEach(function(e){e=e.slice(5),s.categories.push(e)}),t[n].forEach(function(e){"null"==e||null==e?s.series[0].data.push(0):s.series[0].data.push(e)}),s.series[0].color="#F08E2D",s.series[0].name=i,a.showLineA_sp("canvasLineA_sp",s),this.sp_tab_index=e},showLineA_xk:function(e,t){p=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!0},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:100,format:function(e){return e}},width:a.cWidth_xk*a.pixelRatio,height:a.cHeight_xk*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA_xk:function(e){p.scrollStart(e)},moveLineA_xk:function(e){p.scroll(e)},touchEndLineA_xk:function(e){p.scrollEnd(e),p.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_xk:function(){if((0,o.isJSON)(a.textarea_xk)){var t=JSON.parse(a.textarea_xk);p.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},xk_tab_tap:function(e){this.xk_tab_index=e;var t=this.xk_data,i="";i=0==e?"wantwatch":"wantleiji";var n={categories:[],series:[{data:[]},{data:[]},{data:[]}]},s=[],o=[],r=[];t[i].x.forEach(function(e){e=e.slice(5),n.categories.push(e)}),console.log(e),console.log(t[i]),0==e?(t[i].douban_wantwatch_up.forEach(function(e){"null"==e||null==e?s.push(0):s.push(e)}),t[i].maoyan_wantwatch_up.forEach(function(e){"null"==e||null==e?o.push(0):o.push(e)}),t[i].tpp_wantwatch_up.forEach(function(e){"null"==e||null==e?r.push(0):r.push(e)})):(t[i].douban_wantwatch_leiji.forEach(function(e){"null"==e||null==e?s.push(0):s.push(e)}),t[i].maoyan_wantwatch_leiji.forEach(function(e){"null"==e||null==e?o.push(0):o.push(e)}),t[i].tpp_wantwatch_leiji.forEach(function(e){"null"==e||null==e?r.push(0):r.push(e)})),n.series[0]["data"]=s,n.series[1]["data"]=o,n.series[2]["data"]=r,n.series[0].color="#F08E2D",n.series[0].name="豆瓣想看",n.series[1].color="#3E8EF2",n.series[1].name="猫眼想看",n.series[2].color="#2CC6FF",n.series[2].name="淘票票想看",console.log(n),a.showLineA_xk("canvasLineA_xk",n)},xk_index:function(){var e=h(n.default.mark(function e(t,i){var s,o,r,c,l,u,h,d,p,f,g,x,w,_;return n.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.detection_validity();case 2:return s=e.sent,i["userType"]=s,e.next=6,this.$http.get({url:t,data:i});case 6:o=e.sent,r=o.data,c=r.data,l={wantwatch:{},wantleiji:{}},l["wantwatch"]=c.wantwatch,l["wantleiji"]=c.wantleiji,u={categories:[],series:[{data:[]},{data:[]},{data:[]}]},l.wantwatch.x.forEach(function(e){e=e.slice(5),u.categories.push(e)}),h=[],d=[],p=[],l.wantwatch.douban_wantwatch_up.forEach(function(e){"null"==e||null==e?h.push(0):h.push(e)}),l.wantwatch.maoyan_wantwatch_up.forEach(function(e){"null"==e||null==e?d.push(0):d.push(e)}),l.wantwatch.tpp_wantwatch_up.forEach(function(e){"null"==e||null==e?p.push(0):p.push(e)}),u.series[0]["data"]=h,u.series[1]["data"]=d,u.series[2]["data"]=p,u.series[0].color="#F08E2D",u.series[0].name="豆瓣想看",u.series[1].color="#3E8EF2",u.series[1].name="猫眼想看",u.series[2].color="#2CC6FF",u.series[2].name="淘票票想看",console.log(c.videoinfos),f={categories:[],series:[{data:[]}]},c.videoinfos.x.forEach(function(e){e=e.slice(5),f.categories.push(e)}),c.videoinfos.qq_playCount.forEach(function(e){"null"==e||null==e?f.series[0].data.push(0):f.series[0].data.push(e)}),f.series[0].color="#F08E2D",f.series[0].name="腾讯",g={categories:[],series:[{data:[]}]},c.baidukw.x.forEach(function(e){e=e.slice(5),g.categories.push(e)}),c.baidukw.value.forEach(function(e){"null"==e||null==e?g.series[0].data.push(0):g.series[0].data.push(e)}),g.series[0].color="#F08E2D",g.series[0].name="百度指数",x={categories:[],series:[{data:[]}]},c.weibokw.x.forEach(function(e){e=e.slice(5),x.categories.push(e)}),c.weibokw.value.forEach(function(e){"null"==e||null==e?x.series[0].data.push(0):x.series[0].data.push(e)}),x.series[0].color="#F08E2D",x.series[0].name="微博指数",console.log(c),w={categories:[],series:[{data:[]}]},c.weixindata.x.forEach(function(e){e=e.slice(5),w.categories.push(e)}),c.weixindata.weixin_index.forEach(function(e){"null"==e||null==e?w.series[0].data.push(0):w.series[0].data.push(e)}),w.series[0].color="#F08E2D",w.series[0].name="微博指数",_={categories:[],series:[{data:[]},{data:[]},{data:[]}]},c.maoyanScores.x.forEach(function(e){e=e.slice(5),_.categories.push(e)}),c.maoyanScores.douban_score.forEach(function(e){"null"==e||null==e?_.series[0].data.push(0):_.series[0].data.push(e)}),_.series[0].color="#F08E2D",_.series[0].name="豆瓣评分",c.maoyanScores.maoyan_score.forEach(function(e){"null"==e||null==e?_.series[1].data.push(0):_.series[1].data.push(e)}),_.series[1].color="#3E8EF2",_.series[1].name="猫眼评分",c.maoyanScores.tpp_score.forEach(function(e){"null"==e||null==e?_.series[2].data.push(0):_.series[2].data.push(e)}),_.series[2].color="#2CC6FF",_.series[2].name="淘票票评分",a.showLineA_pf("canvasLineA_pf",_),a.showLineA_wx("canvasLineA_wx",w),a.showLineA_wb("canvasLineA_wb",x),a.showLineA_bd("canvasLineA_bd",g),a.showLineA_sp("canvasLineA_sp",f),a.showLineA_xk("canvasLineA_xk",u),this.xk_data=l,this.sp_Alldata=c.videoinfos;case 70:case"end":return e.stop()}},e,this)}));function t(t,i){return e.apply(this,arguments)}return t}(),showLineA:function(e,t){d=new s.default({$this:a,canvasId:e,type:"line",fontSize:11,legend:{show:!1},dataLabel:!1,dataPointShape:!0,background:"#FFFFFF",pixelRatio:a.pixelRatio,categories:t.categories,series:t.series,animation:!0,enableScroll:!0,xAxis:{disableGrid:!0,type:"grid",gridType:"dash",itemCount:6,scrollShow:!0,scrollAlign:"right"},yAxis:{gridType:"solid",splitNumber:5,min:0,max:10,format:function(e){return e}},width:a.cWidth_zh*a.pixelRatio,height:a.cHeight_zh*a.pixelRatio,extra:{line:{type:"straight"}}})},touchLineA:function(e){d.scrollStart(e)},moveLineA:function(e){d.scroll(e)},touchEndLineA:function(e){d.scrollEnd(e),d.showToolTip(e,{format:function(e,t){return t+" "+e.name+":"+e.data}})},changeData_zh:function(){if((0,o.isJSON)(a.textarea_zh)){var t=JSON.parse(a.textarea_zh);d.updateData({series:t.series,categories:t.categories,scrollPosition:"right",animation:!1})}else e.showToast({title:"数据格式错误",image:"../../../static/images/alert-warning.png"})},getServerData:function(){var t=h(n.default.mark(function t(i,s){var o,r,l,u,h,d,p,f;return n.default.wrap(function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,this.detection_validity();case 2:return o=t.sent,console.log(i),i.data["userType"]=o,t.next=7,this.$http.get(c({},i));case 7:if(r=t.sent,l=r.data,"没找到影片数据"!=l.msg){t.next=12;break}return e.showToast({title:"超出选择",duration:2e3,icon:"none"}),t.abrupt("return",!1);case 12:for(p in u={categories:[],series:[],numNbr:[]},h={},d=[],u.categories=["百度数据","微信数据","微博数据","想看指数","视频物料","评分"],l.data)"mid"!=p&&"date"!=p&&"zz_name"!=p&&"zonghe_kw"!=p&&(null==l.data[p]?(d.push(0),console.log(p)):d.push(Number(l.data[p])));u.numNbr=d,h["data"]=d,h["color"]="#F08E2D",h["name"]="",u.series[0]=h,f={categories:[],series:[{data:[]}]},l.data.zonghe_kw.x.forEach(function(e){e=e.slice(5),f.categories.push(e)}),l.data.zonghe_kw.value.forEach(function(e,t){f.series[0].data.push(e)}),f.series[0].color="#F08E2D",f.series[0].name="数营指数",this.yq_data=l.data.date,s&&a.showLineA("canvasLineA",f),a.showRadar("canvasRadar",u);case 30:case"end":return t.stop()}},t,this)}));function i(e,i){return t.apply(this,arguments)}return i}(),showRadar:function(e,t){new s.default({$this:a,canvasId:e,type:"radar",fontSize:11,legend:{show:!1},background:"#FFFFFF",pixelRatio:a.pixelRatio,animation:!0,dataLabel:!0,categories:t.categories,series:t.series,numNbr:t.numNbr,width:a.cWidth*a.pixelRatio,height:a.cHeight*a.pixelRatio,extra:{radar:{max:10}}})},touchRadar:function(e){}}};t.default=m}).call(this,i("543d")["default"])},ddb5:function(e,t,i){"use strict";i.r(t);var a=i("4b06"),n=i("9c6f");for(var s in n)"default"!==s&&function(e){i.d(t,e,function(){return n[e]})}(s);i("5415");var o,r=i("f0c5"),c=Object(r["a"])(n["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);t["default"]=c.exports},e33a:function(e,t,i){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ucharts_dome/publicity_cavas-create-component',
    {
        'components/ucharts_dome/publicity_cavas-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("ddb5"))
        })
    },
    [['components/ucharts_dome/publicity_cavas-create-component']]
]);
