(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/report/list/budget_data/budget_data"],{"438a":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=r(e("a34a"));function r(t){return t&&t.__esModule?t:{default:t}}function i(t,n){return d(t)||o(t,n)||u()}function u(){throw new TypeError("Invalid attempt to destructure non-iterable instance")}function o(t,n){var e=[],a=!0,r=!1,i=void 0;try{for(var u,o=t[Symbol.iterator]();!(a=(u=o.next()).done);a=!0)if(e.push(u.value),n&&e.length===n)break}catch(d){r=!0,i=d}finally{try{a||null==o["return"]||o["return"]()}finally{if(r)throw i}}return e}function d(t){if(Array.isArray(t))return t}function c(t,n,e,a,r,i,u){try{var o=t[i](u),d=o.value}catch(c){return void e(c)}o.done?n(d):Promise.resolve(d).then(a,r)}function s(t){return function(){var n=this,e=arguments;return new Promise(function(a,r){var i=t.apply(n,e);function u(t){c(i,a,r,u,o,"next",t)}function o(t){c(i,a,r,u,o,"throw",t)}u(void 0)})}}var l={data:function(){return{is_show_el_name:!0,click_name_time:"影投预算",click_name_index:0,click_name:["影投预算","城市预算","票仓预算"],is_show:!0,All_data:[],num:1,id:""}},onLoad:function(t){var n=t.movie_id,e=(t.brd,t.district,t.city,t.num),a="";this.num=e,this.id=n,console.log(0!=e),0==e||(a="https://db.topcdb.com/topprogram/get-report-yusuan?movie_id="+n+"&brd=brd"),console.log(a),this.db_index(a)},methods:{click_show:function(){var t=this.is_show_el_name;this.is_show_el_name=!t},el_name_click:function(t,n){var e="",a=this.id,r="";0==t?(e="brd",r=1):1==t?(e="city",r=0):(e="district",r=2);var i="https://db.topcdb.com/topprogram/get-report-yusuan?movie_id="+a+"&"+e+"="+e;this.db_index(i),this.num=r,this.click_name_index=t,this.click_name_time=n,this.is_show_el_name=!0},db_index:function(){var n=s(a.default.mark(function n(e){var r,u,o;return a.default.wrap(function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.request({url:e});case 2:if(r=n.sent,u=i(r,2),u[0],o=u[1],console.log(o.data),0!=o.data.data.length){n.next=12;break}return this.is_show=!1,n.abrupt("return");case 12:t.showLoading({title:"正在加载中"});case 13:o.data.data.forEach(function(t){t.movie_ys=(Number(t.movie_ys)/1e4).toFixed(2)}),0==this.num&&(""!=o.data.sum.brd?o.data.sum.wz_dd=o.data.sum.brd:o.data.sum.district?o.data.sum.wz_dd=o.data.sum.district:o.data.sum.city&&(o.data.sum.wz_dd=o.data.sum.city)),o.data.sum.total_ys=(Number(o.data.sum.total_ys)/1e4).toFixed(2),this.All_data=o.data,t.hideLoading();case 18:case"end":return n.stop()}},n,this)}));function e(t){return n.apply(this,arguments)}return e}()}};n.default=l}).call(this,e("543d")["default"])},7845:function(t,n,e){"use strict";var a,r=function(){var t=this,n=t.$createElement;t._self._c},i=[];e.d(n,"b",function(){return r}),e.d(n,"c",function(){return i}),e.d(n,"a",function(){return a})},a7dd:function(t,n,e){"use strict";e.r(n);var a=e("7845"),r=e("d567");for(var i in r)"default"!==i&&function(t){e.d(n,t,function(){return r[t]})}(i);e("aa8d");var u,o=e("f0c5"),d=Object(o["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],u);n["default"]=d.exports},aa8d:function(t,n,e){"use strict";var a=e("c028"),r=e.n(a);r.a},c028:function(t,n,e){},d567:function(t,n,e){"use strict";e.r(n);var a=e("438a"),r=e.n(a);for(var i in a)"default"!==i&&function(t){e.d(n,t,function(){return a[t]})}(i);n["default"]=r.a},e315:function(t,n,e){"use strict";(function(t){e("b64a"),e("921b");a(e("66fd"));var n=a(e("a7dd"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])}},[["e315","common/runtime","common/vendor"]]]);