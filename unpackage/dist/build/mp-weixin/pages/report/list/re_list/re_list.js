(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/list/re_list/re_list"],{"2a67":function(t,e,i){"use strict";i.r(e);var n=i("cf22"),a=i.n(n);for(var r in n)"default"!==r&&function(t){i.d(e,t,function(){return n[t]})}(r);e["default"]=a.a},"4e40":function(t,e,i){"use strict";(function(t){i("b64a"),i("921b");n(i("66fd"));var e=n(i("d0b9"));function n(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,i("543d")["createPage"])},7230:function(t,e,i){"use strict";var n,a=function(){var t=this,e=t.$createElement;t._self._c},r=[];i.d(e,"b",function(){return a}),i.d(e,"c",function(){return r}),i.d(e,"a",function(){return n})},"9fc7":function(t,e,i){},cf22:function(t,e,i){"use strict";(function(t){function i(t){return r(t)||a(t)||n()}function n(){throw new TypeError("Invalid attempt to spread non-iterable instance")}function a(t){if(Symbol.iterator in Object(t)||"[object Arguments]"===Object.prototype.toString.call(t))return Array.from(t)}function r(t){if(Array.isArray(t)){for(var e=0,i=new Array(t.length);e<t.length;e++)i[e]=t[e];return i}}function o(t,e){return l(t)||d(t,e)||c()}function c(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function d(t,e){var i=[],n=!0,a=!1,r=void 0;try{for(var o,c=t[Symbol.iterator]();!(n=(o=c.next()).done);n=!0)if(i.push(o.value),e&&i.length===e)break}catch(d){a=!0,r=d}finally{try{n||null==c["return"]||c["return"]()}finally{if(a)throw r}}return i}function l(t){if(Array.isArray(t))return t}Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var u={data:function(){return{res:{},tc_index:-1,bottom_Alldata:[{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""},{name:"趣味电影数据之上半年每分钟最赚钱影片",lay:"来源：拓普数据实验室",time:"2019-09-03",image1:"",image2:"",image3:""}],header_tab_data:["关注","推荐","线索","信息","爆料","排行榜","资讯"],header_tab_index:2,page_index:0}},onReachBottom:function(){if(this.res.Br){var t=this.page_index,e=this.res,i=e.movie_id,n="https://db.topcdb.com/topprogram/get-report?page="+t+"&movie_id="+i;t++,this.page_index=t,this.db_index(n,1)}else{t=this.page_index,e=this.res;var a=e.brd,r=e.district,o=e.city;n="https://db.topcdb.com/topprogram/get-report?page="+t+"&city="+o+"&district="+r+"&brd="+a;t++,this.page_index=t,this.db_index(n,1)}},onLoad:function(t){if(t.Br){var e=this.page_index;this.res=t,console.log(t);var i=t.movie_id,n="https://db.topcdb.com/topprogram/get-report?page="+e+"&movie_id="+i;e++,this.page_index=e,this.db_index(n)}else{e=this.page_index;this.res=t;var a=t.brd,r=t.district,o=t.city;n="https://db.topcdb.com/topprogram/get-report?page="+e+"&city="+o+"&district="+r+"&brd="+a;e++,this.page_index=e,this.db_index(n)}},methods:{tz_click:function(e,i,n,a){null==i&&(i=""),null==n&&(n=""),null==a&&(a="");var r="./list/list?id="+e+"&brd="+i+"&district="+n+"&city="+a;console.log(r),t.navigateTo({url:"../list?id="+e+"&brd="+i+"&district="+n+"&city="+a})},db_index:function(e,n){var a=this;console.log(e),t.showLoading({title:"数据加载中"}),t.request({url:e}).then(function(e){console.log(e);var r=o(e,2),c=(r[0],r[1]),d=i(c.data);if(console.log(d),d.forEach(function(t){for(var e in t.updated=t.updated.slice(0,10),t.img)t.image=t.img[e]}),1==n){var l=i(a.bottom_Alldata);return d.forEach(function(t){l.push(t)}),a.bottom_Alldata=l,t.hideLoading(),!1}a.bottom_Alldata=d,t.hideLoading()})},tc_click_tap:function(t){this.tc_index=-1},tc_click:function(t){this.tc_index=t},header_tab_click:function(t){this.header_tab_index=t}}};e.default=u}).call(this,i("543d")["default"])},d0b9:function(t,e,i){"use strict";i.r(e);var n=i("7230"),a=i("2a67");for(var r in a)"default"!==r&&function(t){i.d(e,t,function(){return a[t]})}(r);i("da8c");var o,c=i("f0c5"),d=Object(c["a"])(a["default"],n["b"],n["c"],!1,null,null,null,!1,n["a"],o);e["default"]=d.exports},da8c:function(t,e,i){"use strict";var n=i("9fc7"),a=i.n(n);a.a}},[["4e40","common/runtime","common/vendor"]]]);