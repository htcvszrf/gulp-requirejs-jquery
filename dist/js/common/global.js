try{Array.prototype.contains||(Array.prototype.contains=function(element){for(var i=0;i<this.length;i++)if(this[i]===element)return!0})}catch(e){console.error(e)}try{Array.prototype.forEach||(Array.prototype.forEach=function(callback,thisArg){var T,k;if(null===this)throw new TypeError(" this is null or not defined");var O=Object(this),len=O.length>>>0;if("function"!=typeof callback)throw new TypeError(callback+" is not a function");for(arguments.length>1&&(T=thisArg),k=0;k<len;){var kValue;k in O&&(kValue=O[k],callback.call(T,kValue,k,O)),k++}})}catch(e){console.error(e)}var GLOBAL={};GLOBAL.namespace=function(str){for(var arr=str.split("."),o=GLOBAL,i="GLOBAL"===arr[0]?1:0;i<arr.length;i++)o[arr[i]]=o[arr[i]]||{},o=o[arr[i]]},GLOBAL.namespace("Util"),GLOBAL.namespace("Cookie"),GLOBAL.namespace("Array"),GLOBAL.namespace("Os"),GLOBAL.namespace("Browser"),GLOBAL.namespace("Online"),GLOBAL.Util={toJSON:function(c){var JSON=window.JSON;if("object"==typeof JSON&&JSON.stringify)return JSON.stringify(c);var m=typeof c;if(null===c)return"null";if("undefined"!=m){if("number"==m||"boolean"==m)return c+"";if("string"==m)return $.quoteString(c);if("object"==m){if("function"==typeof c.toJSON)return $.toJSON(c.toJSON());if(c.constructor===Date){var l=c.getUTCMonth()+1;l<10&&(l="0"+l);var p=c.getUTCDate();p<10&&(p="0"+p);var n=c.getUTCFullYear(),q=c.getUTCHours();q<10&&(q="0"+q);var f=c.getUTCMinutes();f<10&&(f="0"+f);var r=c.getUTCSeconds();r<10&&(r="0"+r);var h=c.getUTCMilliseconds();return h<100&&(h="0"+h),h<10&&(h="0"+h),'"'+n+"-"+l+"-"+p+"T"+q+":"+f+":"+r+"."+h+'Z"'}if(c.constructor===Array){for(var j=[],g=0;g<c.length;g++)j.push($.toJSON(c[g])||"null");return"["+j.join(",")+"]"}var b=[];for(var e in c){var a,m=typeof e;if("number"==m)a='"'+e+'"';else{if("string"!=m)continue;a=$.quoteString(e)}if("function"!=typeof c[e]){var d=$.toJSON(c[e]);b.push(a+":"+d)}}return"{"+b.join(", ")+"}"}}},getRandom:function(min,max){return Math.floor(Math.random()*(max-min)+min)},getScript:function(url,callback,element){var head=document.getElementsByTagName("head")[0],js=document.createElement("script");js.setAttribute("type","text/javascript"),js.setAttribute("src",url),element?element.appendChild(js):head.appendChild(js);var callbackFn=function(){"function"==typeof callback&&callback()};document.all?js.onreadystatechange=function(){"loaded"!==js.readyState&&"complete"!==js.readyState||callbackFn()}:js.onload=function(){callbackFn()}},createScript:function(scriptCode,callback,element){if(scriptCode){var head=document.getElementsByTagName("head")[0],js=document.createElement("script");js.setAttribute("type","text/javascript"),js.innerHTML=scriptCode,element?element.appendChild(js):head.appendChild(js),callback()}},createCss:function(url,id){var head=document.getElementsByTagName("head")[0],css=document.createElement("link");css.setAttribute("type","text/css"),css.setAttribute("rel","stylesheet"),css.setAttribute("href",url),id&&css.setAttribute("id",id),head.appendChild(css)},filterHtmlTags:function(str){if(str&&"string"==typeof str)return str.replace(/<\/?[^>]*>/g,"")},getQueryString:function(name){var reg=new RegExp("(^|&)"+name+"=([^&]*)(&|$)","i"),r=window.location.search.substr(1).match(reg);return null!=r?decodeURI(r[2]):null},dislocateArr:function(arr){return arr.sort(function(){return.5-Math.random()})},getSpecialCountStr:function(num){return"string"!=typeof num&&"number"!=typeof num?num:(num=parseInt(num,10),num>9999?Math.ceil(num/1e4)+"万":""+num)},formatTimestamp:function(d){function add0(n){return n<10?"0"+n:n}var t=0;if(t="string"==typeof d?isNaN(d)?Date.parse(d):parseInt(d):d){var date=new Date(t),year=date.getFullYear(),month=date.getMonth()+1,day=date.getDate(),h=date.getHours(),m=date.getMinutes(),c=(date.getSeconds(),(new Date).getTime()),diff=Number(c-t);if(diff<31536e6){var days=diff/864e5-1;return days>2?add0(month)+"-"+add0(day)+" "+add0(h)+":"+add0(m):days>1?"前天 "+add0(h)+":"+add0(m):days>0?"昨天 "+add0(h)+":"+add0(m):diff>=36e5?Math.floor(diff/36e5)+"小时前":diff>=6e4?Math.floor(diff/6e4)+"分钟前":"最新"}return year+"-"+add0(month)+"-"+add0(day)+" "+add0(h)+":"+add0(m)}},getSpecialTimeStr:function(str){var targetTime="String"==typeof str?this.strToTime(str):str;if(!targetTime)return!1;var currentTime=(new Date).getTime(),tdoa=Number(currentTime-targetTime);if(tdoa>=864e5){var h=tdoa/864e5;return h>2?this.timeToString(targetTime):h>1?"前天":"昨天"}return tdoa>=36e5?Math.floor(tdoa/36e5)+"小时前":tdoa>=6e4?Math.floor(tdoa/6e4)+"分钟前":"最新"},strToTime:function(str){try{return Date.parse(str.replace(/-/g,"/"))}catch(e){return console.error(e),!1}},strToCTime:function(str){function add0(n){return n<10?"0"+n:n}var d=0;d=isNaN(str)?new Date(str):new Date(Number(str));var year=d.getFullYear().toString(),month=(d.getMonth()+1).toString(),date=d.getDate().toString(),h=d.getHours().toString(),m=d.getMinutes().toString(),s=d.getSeconds().toString();return(new Date).getTime()-d.getTime()<864e5?this.getSpecialTimeStr(str):year+"年"+add0(month)+"月"+add0(date)+"日 "+add0(h)+":"+add0(m)+":"+add0(s)},timeToString:function(t,splitStr){return this.dateToString(this.timeToDate(t),splitStr)},timeFormatDate:function(t){function add0(n){return n<10?"0"+n:n}var d=new Date(t),year=d.getFullYear().toString(),month=(d.getMonth()+1).toString(),date=d.getDate().toString(),h=d.getHours().toString(),m=d.getMinutes().toString(),s=d.getSeconds().toString();return year+"-"+add0(month)+"-"+add0(date)+" "+add0(h)+":"+add0(m)+":"+add0(s)},dateToString:function(d,splitStr){var month=(d.getFullYear().toString(),(d.getMonth()+1).toString()),day=d.getDate().toString(),h=d.getHours().toString(),m=d.getMinutes().toString();month=month.length>1?month:"0"+month,day=day.length>1?day:"0"+day,h=h.length>1?h:"0"+h,m=m.length>1?m:"0"+m;var str=month+"-"+day+" "+h+":"+m;return splitStr&&(str=str.replace(/-/g,splitStr)),str},msToTimestr:function(ts,hasHour){var seconds=ts?Number(ts)/1e3:0;return GLOBAL.Util.secondsToTimestr(seconds,hasHour)},secondsToTimestr:function(seconds,hasHour){var hh,mm,ss;if(!(null==seconds||seconds<0))return seconds=Math.ceil(seconds),hh=seconds/3600|0,seconds=parseInt(seconds)-3600*hh,parseInt(hh)<10&&(hh="0"+hh),mm=seconds/60|0,parseInt(mm)<10&&(mm="0"+mm),ss=parseInt(seconds)-60*mm,ss<10&&(ss="0"+ss),hasHour?hh+":"+mm+":"+ss:mm+":"+ss},getScrollTop:function(){var bodyScrollTop=0,documentScrollTop=0;try{document.body&&(bodyScrollTop=document.body.scrollTop),document.documentElement&&(documentScrollTop=document.documentElement.scrollTop)}catch(e){}return bodyScrollTop-documentScrollTop>0?bodyScrollTop:documentScrollTop},getScrollHeight:function(){var bodyScrollHeight=0,documentScrollHeight=0;try{document.body&&(bodyScrollHeight=document.body.scrollHeight),document.documentElement&&(documentScrollHeight=document.documentElement.scrollHeight)}catch(e){}return bodyScrollHeight-documentScrollHeight>0?bodyScrollHeight:documentScrollHeight},getClientHeight:function(){return document.body.clientHeight&&document.documentElement.clientHeight?document.body.clientHeight<document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight:document.body.clientHeight>document.documentElement.clientHeight?document.body.clientHeight:document.documentElement.clientHeight},getWindowHeight:function(){return"CSS1Compat"===document.compatMode?document.documentElement.clientHeight:document.body.clientHeight},getBrowserType:function(){var agent=navigator.userAgent.toLowerCase(),browser_type="";return agent.indexOf("msie")>0&&(browser_type="IE"),agent.indexOf("firefox")>0&&(browser_type="firefox"),agent.indexOf("chrome")>0&&agent.indexOf("mb2345browser")<0&&agent.indexOf("360 aphone browser")<0&&(browser_type="chrome"),(agent.indexOf("360 aphone browser")>0||agent.indexOf("qhbrowser")>0)&&(browser_type="360"),agent.indexOf("ucbrowser")>0&&(browser_type="UC"),agent.indexOf("micromessenger")>0&&(browser_type="WeChat"),(agent.indexOf("mqqbrowser")>0||agent.indexOf("qq")>0)&&agent.indexOf("micromessenger")<0&&(browser_type="QQ"),agent.indexOf("miuibrowser")>0&&(browser_type="MIUI"),agent.indexOf("mb2345browser")>0&&(browser_type="2345"),agent.indexOf("sogoumobilebrowser")>0&&(browser_type="sogou"),agent.indexOf("liebaofast")>0&&(browser_type="liebao"),agent.indexOf("weibo")>0&&(browser_type="weibo"),agent.indexOf("safari")>0&&agent.indexOf("chrome")<0&&agent.indexOf("ucbrowser")<0&&agent.indexOf("micromessenger")<0&&agent.indexOf("mqqbrowser")<0&&agent.indexOf("miuibrowser")<0&&agent.indexOf("mb2345browser")<0&&agent.indexOf("sogoumobilebrowser")<0&&agent.indexOf("liebaofast")<0&&agent.indexOf("qhbrowser")<0&&agent.indexOf("weibo")<0&&(browser_type="safari"),browser_type},getOsType:function(){var agent=navigator.userAgent.toLowerCase(),os_type="",index="",version="";return/android/i.test(navigator.userAgent)&&(index=agent.indexOf("android"),version=agent.substr(index+8,3),os_type="Android "+version),/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)&&(index=agent.indexOf("os"),version=agent.substr(index+3,3),os_type="iOS "+version),!/Linux/i.test(navigator.userAgent)||/android/i.test(navigator.userAgent)||/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)||(os_type="Linux"),/windows|win32/i.test(navigator.userAgent)&&(os_type="windows32"),/windows|win64/i.test(navigator.userAgent)&&(os_type="windows64"),os_type},isMobile:function(){for(var u=navigator.userAgent,Agents=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),mobile=!1,v=0;v<Agents.length;v++)u.indexOf(Agents[v])>-1&&(mobile=!0);return mobile},getPixel:function(){return{w:window.screen.width,h:window.screen.height}},getBytes:function(str){var byteLen=0,len=str.length;if(str){for(var i=0;i<len;i++)str.charCodeAt(i)>255?byteLen+=2:byteLen++;return byteLen}return 0},getReferrer:function(){var referrer="";try{referrer=window.top.document.referrer}catch(e){if(window.parent)try{referrer=window.parent.document.referrer}catch(e2){referrer=""}}return""===referrer&&(referrer=document.referrer),referrer},getUrlNoParams:function(){var locaUrl=window.location.href,endIndex=0;return locaUrl.indexOf("?")>=0?(endIndex=locaUrl.indexOf("?"),locaUrl.substring(0,endIndex)):locaUrl.indexOf("#")>=0?(endIndex=locaUrl.indexOf("#"),locaUrl.substring(0,endIndex)):locaUrl},getUrl:function(){var locaUrl=window.location.href,endIndex=0;return locaUrl.indexOf("?")>=0?(endIndex=locaUrl.indexOf("?"),locaUrl.substring(0,endIndex)):locaUrl.indexOf("#")>=0?(endIndex=locaUrl.indexOf("#"),locaUrl.substring(0,endIndex)):locaUrl},getIframeBody:function(){return self!=top?$(window.top.document.body):$("body")},setIframe:function(ifm){var ifm=ifm||window.frames.iframe||document.getElementById("iframe")||null;if(ifm){var subWeb=document.frames?document.frames.iframe.document:ifm.contentDocument;null!=ifm&&null!=subWeb&&(ifm.height=subWeb.body.scrollHeight,ifm.width=subWeb.body.scrollWidth)}},setIframeContent:function(ifm){var ifm=ifm||window.frames.iframe||document.getElementById("iframe")||null;if(ifm){var subWeb=document.frames?document.frames.iframe.document:ifm.contentDocument;null!=ifm&&null!=subWeb&&(subWeb.documentElement.width=ifm.parentNode.offsetWidth,subWeb.documentElement.height=ifm.parentNode.offsetHeight,subWeb.body.setAttribute("width",ifm.parentNode.offsetWidth),subWeb.body.setAttribute("height",ifm.parentNode.offsetHeight))}},createStyle:function(style,callback,element){if(style){var head=document.getElementsByTagName("head")[0],css=document.createElement("style");css.innerHTML=style,element?element.appendChild(css):head.appendChild(css),callback&&callback()}},substitute:function(template,map){return template.replace(/\$\{([^\s\:\}]+)(?:\:([^\s\:\}]+))?\}/g,function(match,key,format){return map[key]?map[key]:0===map[key]?"0":""})}},GLOBAL.Cookie={set:function(name,value,expires,domain){var expTimes=expires?60*Number(expires)*60*1e3:864e5,expDate=new Date;expDate.setTime(expDate.getTime()+expTimes);var expString=expires?"; expires="+expDate.toUTCString():"",domain="; domain="+domain;document.cookie=name+"="+encodeURI(value)+expString+"; path=/"+domain},get:function(name){var cookieStr="; "+document.cookie+"; ",index=cookieStr.indexOf("; "+name+"=");if(-1!==index){var s=cookieStr.substring(index+name.length+3,cookieStr.length);return decodeURI(s.substring(0,s.indexOf("; ")))}return null},del:function(name,domain){var exp=new Date((new Date).getTime()-1),s=this.get(name);null!==s&&(document.cookie=name+"="+s+"; expires="+exp.toUTCString()+"; path=/; domain="+domain)}},GLOBAL.Os=function(){for(var u=navigator.userAgent,Agents=new Array("Android","iPhone","SymbianOS","Windows Phone","iPad","iPod"),mobile=!1,v=0;v<Agents.length;v++)if(u.indexOf(Agents[v])>-1){mobile=!0;break}return{mobile:mobile,ios:!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),android:u.indexOf("Android")>-1||u.indexOf("Linux")>-1,iphone:u.indexOf("iPhone")>-1,ipad:u.indexOf("iPad")>-1,webapp:-1===u.indexOf("Safari")}}(),GLOBAL.Browser=function(){var ua=navigator.userAgent;return GLOBAL.Os.mobile?{wechat:ua.indexOf("MicroMessenger")>-1,weibo:ua.toLowerCase().indexOf("weibo")>-1,qq:ua.indexOf("QQ/")>-1,qqbrowser:ua.indexOf("MQQBrowser")>-1}:{}}(),GLOBAL.Online={preUrl:"//www.mop.com/",hostUrl:"//www.mop.com/",loginUrl:"//www.mop.com/login.html",registerUrl:"//www.mop.com/register.html",perfectUrl:"//www.mop.com/perfect.html",postUrl:"//dzh.mop.com/dzhpost.html",ttpostUrl:"//tt.mop.com/ttpost.html"};