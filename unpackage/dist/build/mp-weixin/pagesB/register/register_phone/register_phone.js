(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/register/register_phone/register_phone"],{"103b":function(t,e,n){"use strict";n.r(e);var r=n("c986"),a=n.n(r);for(var o in r)"default"!==o&&function(t){n.d(e,t,function(){return r[t]})}(o);e["default"]=a.a},"4a7a":function(t,e,n){"use strict";n.r(e);var r=n("bd26"),a=n("103b");for(var o in a)"default"!==o&&function(t){n.d(e,t,function(){return a[t]})}(o);n("b001");var i,u=n("f0c5"),s=Object(u["a"])(a["default"],r["b"],r["c"],!1,null,null,null,!1,r["a"],i);e["default"]=s.exports},"9dc3":function(t,e,n){},ae0b:function(t,e,n){"use strict";(function(t){n("b64a"),n("921b");r(n("66fd"));var e=r(n("4a7a"));function r(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])},b001:function(t,e,n){"use strict";var r=n("9dc3"),a=n.n(r);a.a},bd26:function(t,e,n){"use strict";var r,a=function(){var t=this,e=t.$createElement;t._self._c},o=[];n.d(e,"b",function(){return a}),n.d(e,"c",function(){return o}),n.d(e,"a",function(){return r})},c986:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var r=o(n("a34a")),a=n("2f62");function o(t){return t&&t.__esModule?t:{default:t}}function i(t,e,n,r,a,o,i){try{var u=t[o](i),s=u.value}catch(c){return void n(c)}u.done?e(s):Promise.resolve(s).then(r,a)}function u(t){return function(){var e=this,n=arguments;return new Promise(function(r,a){var o=t.apply(e,n);function u(t){i(o,r,a,u,s,"next",t)}function s(t){i(o,r,a,u,s,"throw",t)}u(void 0)})}}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{},r=Object.keys(n);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(n).filter(function(t){return Object.getOwnPropertyDescriptor(n,t).enumerable}))),r.forEach(function(e){c(t,e,n[e])})}return t}function c(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var f={data:function(){return{phone_code:"",gain:"获取验证码",phone:"",setinter:"",setinter_Br:!1}},computed:s({},(0,a.mapState)(["userinfo"])),methods:{phobe_skip:function(){var e=u(r.default.mark(function e(){return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:t.switchTab({url:"../../../pages/My/My"}),t.showToast({title:"登录成功",icon:"none",duration:1e3});case 2:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),phobe_accomplish:function(){var e=u(r.default.mark(function e(){var n,a,o,i,u,s,c;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(n=/^\d{6}$/,a=this.phone,o=this.phone_code,i=this.userinfo,0!=a.length||0!=o.length){e.next=7;break}return t.showToast({title:"请输入手机号或者验证码",icon:"none"}),e.abrupt("return",!1);case 7:if(u={phone:a,code:o,unionId:i.unionId,openId:i.openId,sid:i.sid,status:1},!n.test(o)){e.next=22;break}return e.next=11,this.$http.get({url:"/topprogram/bind-phone",data:u});case 11:s=e.sent,c=s.data,console.log(c),t.showToast({title:c.msg,icon:"none",duration:2e3}),t.setStorage({key:"is_program_user",data:c.data.is_program_user,success:function(t){}}),t.setStorage({key:"sid",data:c.data.sid,success:function(t){}}),c.data["user_pone_Br"]=!0,this.$store.commit("userinfoMutations",c.data),t.switchTab({url:"/pages/My/My"}),e.next=23;break;case 22:t.showToast({title:"请输入正确的验证码",icon:"none",duration:1e3});case 23:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),hqgain:function(){var e=u(r.default.mark(function e(){var n,a,o,i,u,s,c,f=this;return r.default.wrap(function(e){while(1)switch(e.prev=e.next){case 0:if(!this.setinter_Br){e.next=3;break}return t.showToast({title:"请勿重复点击",icon:"none"}),e.abrupt("return",!1);case 3:if(n=/^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,a=this.phone,n.test(a)){e.next=9;break}t.showToast({title:"请输入正确的手机号码",icon:"none"}),e.next=21;break;case 9:return o={username:a},i="/topprogram/get-sendsms",e.next=13,this.$http.get({url:i,data:o});case 13:if(u=e.sent,s=u.data,t.showToast({title:s.msg,icon:"none"}),1==s.succ){e.next=18;break}return e.abrupt("return",!1);case 18:c=60,this.gain="剩余".concat(c),this.setinter=setInterval(function(){c--,f.setinter_Br=!0,f.gain="剩余".concat(c),0==c&&(clearInterval(f.setinter),f.gain="获取验证码",f.setinter_Br=!1)},1e3);case 21:case"end":return e.stop()}},e,this)}));function n(){return e.apply(this,arguments)}return n}(),probation_click:function(){t.navigateTo({url:"../../../pages/report/webregister/webregister"})}}};e.default=f}).call(this,n("543d")["default"])}},[["ae0b","common/runtime","common/vendor"]]]);