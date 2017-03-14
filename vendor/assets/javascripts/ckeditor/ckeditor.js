
(function(){if(window.CKEDITOR&&window.CKEDITOR.dom)return;if(!window.CKEDITOR){window.CKEDITOR=(function(){var basePathSrcPattern=/(^|.*[\\\/])ckeditor\.js(?:\?.*|;.*)?$/i;var CKEDITOR={timestamp:'H2E6',version:'4.5.3 DEV',revision:'7d3aaf8',rnd:Math.floor(Math.random()*(999-100+1))+100,_:{pending:[],basePathSrcPattern:basePathSrcPattern},status:'unloaded',basePath:(function(){var path=window.CKEDITOR_BASEPATH||'';if(!path){var scripts=document.getElementsByTagName('script');for(var i=0;i<scripts.length;i++){var match=scripts[i].src.match(basePathSrcPattern);if(match){path=match[1];break;}}}
if(path.indexOf(':/')==-1&&path.slice(0,2)!='//'){if(path.indexOf('/')===0)
path=location.href.match(/^.*?:\/\/[^\/]*/)[0]+path;else
path=location.href.match(/^[^\?]*\/(?:)/)[0]+path;}
if(!path)
throw'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';return path;})(),getUrl:function(resource){if(resource.indexOf(':/')==-1&&resource.indexOf('/')!==0)
resource=this.basePath+resource;if(this.timestamp&&resource.charAt(resource.length-1)!='/'&&!(/[&?]t=/).test(resource))
resource+=(resource.indexOf('?')>=0?'&':'?')+'t='+this.timestamp;return resource;},domReady:(function(){var callbacks=[];function onReady(){try{if(document.addEventListener){document.removeEventListener('DOMContentLoaded',onReady,false);executeCallbacks();}
else if(document.attachEvent&&document.readyState==='complete'){document.detachEvent('onreadystatechange',onReady);executeCallbacks();}}catch(er){}}
function executeCallbacks(){var i;while((i=callbacks.shift()))
i();}
return function(fn){callbacks.push(fn);if(document.readyState==='complete')
setTimeout(onReady,1);if(callbacks.length!=1)
return;if(document.addEventListener){document.addEventListener('DOMContentLoaded',onReady,false);window.addEventListener('load',onReady,false);}
else if(document.attachEvent){document.attachEvent('onreadystatechange',onReady);window.attachEvent('onload',onReady);var toplevel=false;try{toplevel=!window.frameElement;}catch(e){}
if(document.documentElement.doScroll&&toplevel){scrollCheck();}}
function scrollCheck(){try{document.documentElement.doScroll('left');}catch(e){setTimeout(scrollCheck,1);return;}
onReady();}};})()};var newGetUrl=window.CKEDITOR_GETURL;if(newGetUrl){var originalGetUrl=CKEDITOR.getUrl;CKEDITOR.getUrl=function(resource){return newGetUrl.call(CKEDITOR,resource)||originalGetUrl.call(CKEDITOR,resource);};}
return CKEDITOR;})();}
if(!CKEDITOR.event){CKEDITOR.event=function(){};CKEDITOR.event.implementOn=function(targetObject){var eventProto=CKEDITOR.event.prototype;for(var prop in eventProto){if(targetObject[prop]==null)
targetObject[prop]=eventProto[prop];}};CKEDITOR.event.prototype=(function(){var getPrivate=function(obj){var _=(obj.getPrivate&&obj.getPrivate())||obj._||(obj._={});return _.events||(_.events={});};var eventEntry=function(eventName){this.name=eventName;this.listeners=[];};eventEntry.prototype={getListenerIndex:function(listenerFunction){for(var i=0,listeners=this.listeners;i<listeners.length;i++){if(listeners[i].fn==listenerFunction)
return i;}
return-1;}};function getEntry(name){var events=getPrivate(this);return events[name]||(events[name]=new eventEntry(name));}
return{define:function(name,meta){var entry=getEntry.call(this,name);CKEDITOR.tools.extend(entry,meta,true);},on:function(eventName,listenerFunction,scopeObj,listenerData,priority){function listenerFirer(editor,publisherData,stopFn,cancelFn){var ev={name:eventName,sender:this,editor:editor,data:publisherData,listenerData:listenerData,stop:stopFn,cancel:cancelFn,removeListener:removeListener};var ret=listenerFunction.call(scopeObj,ev);return ret===false?false:ev.data;}
function removeListener(){me.removeListener(eventName,listenerFunction);}
var event=getEntry.call(this,eventName);if(event.getListenerIndex(listenerFunction)<0){var listeners=event.listeners;if(!scopeObj)
scopeObj=this;if(isNaN(priority))
priority=10;var me=this;listenerFirer.fn=listenerFunction;listenerFirer.priority=priority;for(var i=listeners.length-1;i>=0;i--){if(listeners[i].priority<=priority){listeners.splice(i+1,0,listenerFirer);return{removeListener:removeListener};}}
listeners.unshift(listenerFirer);}
return{removeListener:removeListener};},once:function(){var args=Array.prototype.slice.call(arguments),fn=args[1];args[1]=function(evt){evt.removeListener();return fn.apply(this,arguments);};return this.on.apply(this,args);},capture:function(){CKEDITOR.event.useCapture=1;var retval=this.on.apply(this,arguments);CKEDITOR.event.useCapture=0;return retval;},fire:(function(){var stopped=0;var stopEvent=function(){stopped=1;};var canceled=0;var cancelEvent=function(){canceled=1;};return function(eventName,data,editor){var event=getPrivate(this)[eventName];var previousStopped=stopped,previousCancelled=canceled;stopped=canceled=0;if(event){var listeners=event.listeners;if(listeners.length){listeners=listeners.slice(0);var retData;for(var i=0;i<listeners.length;i++){if(event.errorProof){try{retData=listeners[i].call(this,editor,data,stopEvent,cancelEvent);}catch(er){}}else{retData=listeners[i].call(this,editor,data,stopEvent,cancelEvent);}
if(retData===false)
canceled=1;else if(typeof retData!='undefined')
data=retData;if(stopped||canceled)
break;}}}
var ret=canceled?false:(typeof data=='undefined'?true:data);stopped=previousStopped;canceled=previousCancelled;return ret;};})(),fireOnce:function(eventName,data,editor){var ret=this.fire(eventName,data,editor);delete getPrivate(this)[eventName];return ret;},removeListener:function(eventName,listenerFunction){var event=getPrivate(this)[eventName];if(event){var index=event.getListenerIndex(listenerFunction);if(index>=0)
event.listeners.splice(index,1);}},removeAllListeners:function(){var events=getPrivate(this);for(var i in events)
delete events[i];},hasListeners:function(eventName){var event=getPrivate(this)[eventName];return(event&&event.listeners.length>0);}};})();}
if(!CKEDITOR.editor){CKEDITOR.editor=function(){CKEDITOR._.pending.push([this,arguments]);CKEDITOR.event.call(this);};CKEDITOR.editor.prototype.fire=function(eventName,data){if(eventName in{instanceReady:1,loaded:1})
this[eventName]=true;return CKEDITOR.event.prototype.fire.call(this,eventName,data,this);};CKEDITOR.editor.prototype.fireOnce=function(eventName,data){if(eventName in{instanceReady:1,loaded:1})
this[eventName]=true;return CKEDITOR.event.prototype.fireOnce.call(this,eventName,data,this);};CKEDITOR.event.implementOn(CKEDITOR.editor.prototype);}
if(!CKEDITOR.env){CKEDITOR.env=(function(){var agent=navigator.userAgent.toLowerCase(),edge=agent.match(/edge[ \/](\d+.?\d*)/),trident=agent.indexOf('trident/')>-1,ie=!!(edge||trident);var env={ie:ie,edge:!!edge,webkit:!ie&&(agent.indexOf(' applewebkit/')>-1),air:(agent.indexOf(' adobeair/')>-1),mac:(agent.indexOf('macintosh')>-1),quirks:(document.compatMode=='BackCompat'&&(!document.documentMode||document.documentMode<10)),mobile:(agent.indexOf('mobile')>-1),iOS:/(ipad|iphone|ipod)/.test(agent),isCustomDomain:function(){if(!this.ie)
return false;var domain=document.domain,hostname=window.location.hostname;return domain!=hostname&&domain!=('['+hostname+']');},secure:location.protocol=='https:'};env.gecko=(navigator.product=='Gecko'&&!env.webkit&&!env.ie);if(env.webkit){if(agent.indexOf('chrome')>-1)
env.chrome=true;else
env.safari=true;}
var version=0;if(env.ie){if(edge){version=parseFloat(edge[1]);}else if(env.quirks||!document.documentMode){version=parseFloat(agent.match(/msie (\d+)/)[1]);}else{version=document.documentMode;}
env.ie9Compat=version==9;env.ie8Compat=version==8;env.ie7Compat=version==7;env.ie6Compat=version<7||env.quirks;}
if(env.gecko){var geckoRelease=agent.match(/rv:([\d\.]+)/);if(geckoRelease){geckoRelease=geckoRelease[1].split('.');version=geckoRelease[0]*10000+(geckoRelease[1]||0)*100+(geckoRelease[2]||0)*1;}}
if(env.air)
version=parseFloat(agent.match(/ adobeair\/(\d+)/)[1]);if(env.webkit)
version=parseFloat(agent.match(/ applewebkit\/(\d+)/)[1]);env.version=version;env.isCompatible=!(env.ie&&version<7)&&!(env.gecko&&version<40000)&&!(env.webkit&&version<534);env.hidpi=window.devicePixelRatio>=2;env.needsBrFiller=env.gecko||env.webkit||(env.ie&&version>10);env.needsNbspFiller=env.ie&&version<11;env.cssClass='cke_browser_'+(env.ie?'ie':env.gecko?'gecko':env.webkit?'webkit':'unknown');if(env.quirks)
env.cssClass+=' cke_browser_quirks';if(env.ie)
env.cssClass+=' cke_browser_ie'+(env.quirks?'6 cke_browser_iequirks':env.version);if(env.air)
env.cssClass+=' cke_browser_air';if(env.iOS)
env.cssClass+=' cke_browser_ios';if(env.hidpi)
env.cssClass+=' cke_hidpi';return env;})();}
if(CKEDITOR.status=='unloaded'){(function(){CKEDITOR.event.implementOn(CKEDITOR);CKEDITOR.loadFullCore=function(){if(CKEDITOR.status!='basic_ready'){CKEDITOR.loadFullCore._load=1;return;}
delete CKEDITOR.loadFullCore;var script=document.createElement('script');script.type='text/javascript';script.src=CKEDITOR.basePath+'ckeditor.js';document.getElementsByTagName('head')[0].appendChild(script);};CKEDITOR.loadFullCoreTimeout=0;CKEDITOR.add=function(editor){var pending=this._.pending||(this._.pending=[]);pending.push(editor);};(function(){var onload=function(){var loadFullCore=CKEDITOR.loadFullCore,loadFullCoreTimeout=CKEDITOR.loadFullCoreTimeout;if(!loadFullCore)
return;CKEDITOR.status='basic_ready';if(loadFullCore&&loadFullCore._load)
loadFullCore();else if(loadFullCoreTimeout){setTimeout(function(){if(CKEDITOR.loadFullCore)
CKEDITOR.loadFullCore();},loadFullCoreTimeout*1000);}};CKEDITOR.domReady(onload);})();CKEDITOR.status='basic_loaded';})();}
CKEDITOR.dom={};(function(){var functions=[],cssVendorPrefix=CKEDITOR.env.gecko?'-moz-':CKEDITOR.env.webkit?'-webkit-':CKEDITOR.env.ie?'-ms-':'',ampRegex=/&/g,gtRegex=/>/g,ltRegex=/</g,quoteRegex=/"/g,allEscRegex=/&(lt|gt|amp|quot|nbsp|shy|#\d{1,5});/g,namedEntities={lt:'<',gt:'>',amp:'&',quot:'"',nbsp:'\u00a0',shy:'\u00ad'},allEscDecode=function(match,code){if(code[0]=='#'){return String.fromCharCode(parseInt(code.slice(1),10));}else{return namedEntities[code];}};CKEDITOR.on('reset',function(){functions=[];});CKEDITOR.tools={arrayCompare:function(arrayA,arrayB){if(!arrayA&&!arrayB)
return true;if(!arrayA||!arrayB||arrayA.length!=arrayB.length)
return false;for(var i=0;i<arrayA.length;i++){if(arrayA[i]!=arrayB[i])
return false;}
return true;},getIndex:function(arr,compareFunction){for(var i=0;i<arr.length;++i){if(compareFunction(arr[i]))
return i;}
return-1;},clone:function(obj){var clone;if(obj&&(obj instanceof Array)){clone=[];for(var i=0;i<obj.length;i++)
clone[i]=CKEDITOR.tools.clone(obj[i]);return clone;}
if(obj===null||(typeof obj!='object')||(obj instanceof String)||(obj instanceof Number)||(obj instanceof Boolean)||(obj instanceof Date)||(obj instanceof RegExp))
return obj;if(obj.nodeType||obj.window===obj)
return obj;clone=new obj.constructor();for(var propertyName in obj){var property=obj[propertyName];clone[propertyName]=CKEDITOR.tools.clone(property);}
return clone;},capitalize:function(str,keepCase){return str.charAt(0).toUpperCase()+(keepCase?str.slice(1):str.slice(1).toLowerCase());},extend:function(target){var argsLength=arguments.length,overwrite,propertiesList;if(typeof(overwrite=arguments[argsLength-1])=='boolean')
argsLength--;else if(typeof(overwrite=arguments[argsLength-2])=='boolean'){propertiesList=arguments[argsLength-1];argsLength-=2;}
for(var i=1;i<argsLength;i++){var source=arguments[i];for(var propertyName in source){if(overwrite===true||target[propertyName]==null){if(!propertiesList||(propertyName in propertiesList))
target[propertyName]=source[propertyName];}}}
return target;},prototypedCopy:function(source){var copy=function(){};copy.prototype=source;return new copy();},copy:function(source){var obj={},name;for(name in source)
obj[name]=source[name];return obj;},isArray:function(object){return Object.prototype.toString.call(object)=='[object Array]';},isEmpty:function(object){for(var i in object){if(object.hasOwnProperty(i))
return false;}
return true;},cssVendorPrefix:function(property,value,asString){if(asString)
return cssVendorPrefix+property+':'+value+';'+property+':'+value;var ret={};ret[property]=value;ret[cssVendorPrefix+property]=value;return ret;},cssStyleToDomStyle:(function(){var test=document.createElement('div').style;var cssFloat=(typeof test.cssFloat!='undefined')?'cssFloat':(typeof test.styleFloat!='undefined')?'styleFloat':'float';return function(cssName){if(cssName=='float')
return cssFloat;else{return cssName.replace(/-./g,function(match){return match.substr(1).toUpperCase();});}};})(),buildStyleHtml:function(css){css=[].concat(css);var item,retval=[];for(var i=0;i<css.length;i++){if((item=css[i])){if(/@import|[{}]/.test(item))
retval.push('<style>'+item+'</style>');else
retval.push('<link type="text/css" rel=stylesheet href="'+item+'">');}}
return retval.join('');},htmlEncode:function(text){if(text===undefined||text===null){return'';}
return String(text).replace(ampRegex,'&amp;').replace(gtRegex,'&gt;').replace(ltRegex,'&lt;');},htmlDecode:function(text){return text.replace(allEscRegex,allEscDecode);},htmlEncodeAttr:function(text){return CKEDITOR.tools.htmlEncode(text).replace(quoteRegex,'&quot;');},htmlDecodeAttr:function(text){return CKEDITOR.tools.htmlDecode(text);},transformPlainTextToHtml:function(text,enterMode){var isEnterBrMode=enterMode==CKEDITOR.ENTER_BR,html=this.htmlEncode(text.replace(/\r\n/g,'\n'));html=html.replace(/\t/g,'&nbsp;&nbsp; &nbsp;');var paragraphTag=enterMode==CKEDITOR.ENTER_P?'p':'div';if(!isEnterBrMode){var duoLF=/\n{2}/g;if(duoLF.test(html)){var openTag='<'+paragraphTag+'>',endTag='</'+paragraphTag+'>';html=openTag+html.replace(duoLF,function(){return endTag+openTag;})+endTag;}}
html=html.replace(/\n/g,'<br>');if(!isEnterBrMode){html=html.replace(new RegExp('<br>(?=</'+paragraphTag+'>)'),function(match){return CKEDITOR.tools.repeat(match,2);});}
html=html.replace(/^ | $/g,'&nbsp;');html=html.replace(/(>|\s) /g,function(match,before){return before+'&nbsp;';}).replace(/ (?=<)/g,'&nbsp;');return html;},getNextNumber:(function(){var last=0;return function(){return++last;};})(),getNextId:function(){return'cke_'+this.getNextNumber();},getUniqueId:function(){var uuid='e';for(var i=0;i<8;i++){uuid+=Math.floor((1+Math.random())*0x10000).toString(16).substring(1);}
return uuid;},override:function(originalFunction,functionBuilder){var newFn=functionBuilder(originalFunction);newFn.prototype=originalFunction.prototype;return newFn;},setTimeout:function(func,milliseconds,scope,args,ownerWindow){if(!ownerWindow)
ownerWindow=window;if(!scope)
scope=ownerWindow;return ownerWindow.setTimeout(function(){if(args)
func.apply(scope,[].concat(args));else
func.apply(scope);},milliseconds||0);},trim:(function(){var trimRegex=/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;return function(str){return str.replace(trimRegex,'');};})(),ltrim:(function(){var trimRegex=/^[ \t\n\r]+/g;return function(str){return str.replace(trimRegex,'');};})(),rtrim:(function(){var trimRegex=/[ \t\n\r]+$/g;return function(str){return str.replace(trimRegex,'');};})(),indexOf:function(array,value){if(typeof value=='function'){for(var i=0,len=array.length;i<len;i++){if(value(array[i]))
return i;}}else if(array.indexOf)
return array.indexOf(value);else{for(i=0,len=array.length;i<len;i++){if(array[i]===value)
return i;}}
return-1;},search:function(array,value){var index=CKEDITOR.tools.indexOf(array,value);return index>=0?array[index]:null;},bind:function(func,obj){return function(){return func.apply(obj,arguments);};},createClass:function(definition){var $=definition.$,baseClass=definition.base,privates=definition.privates||definition._,proto=definition.proto,statics=definition.statics;!$&&($=function(){baseClass&&this.base.apply(this,arguments);});if(privates){var originalConstructor=$;$=function(){var _=this._||(this._={});for(var privateName in privates){var priv=privates[privateName];_[privateName]=(typeof priv=='function')?CKEDITOR.tools.bind(priv,this):priv;}
originalConstructor.apply(this,arguments);};}
if(baseClass){$.prototype=this.prototypedCopy(baseClass.prototype);$.prototype.constructor=$;$.base=baseClass;$.baseProto=baseClass.prototype;$.prototype.base=function(){this.base=baseClass.prototype.base;baseClass.apply(this,arguments);this.base=arguments.callee;};}
if(proto)
this.extend($.prototype,proto,true);if(statics)
this.extend($,statics,true);return $;},addFunction:function(fn,scope){return functions.push(function(){return fn.apply(scope||this,arguments);})-1;},removeFunction:function(ref){functions[ref]=null;},callFunction:function(ref){var fn=functions[ref];return fn&&fn.apply(window,Array.prototype.slice.call(arguments,1));},cssLength:(function(){var pixelRegex=/^-?\d+\.?\d*px$/,lengthTrimmed;return function(length){lengthTrimmed=CKEDITOR.tools.trim(length+'')+'px';if(pixelRegex.test(lengthTrimmed))
return lengthTrimmed;else
return length||'';};})(),convertToPx:(function(){var calculator;return function(cssLength){if(!calculator){calculator=CKEDITOR.dom.element.createFromHtml('<div style="position:absolute;left:-9999px;'+'top:-9999px;margin:0px;padding:0px;border:0px;"'+'></div>',CKEDITOR.document);CKEDITOR.document.getBody().append(calculator);}
if(!(/%$/).test(cssLength)){calculator.setStyle('width',cssLength);return calculator.$.clientWidth;}
return cssLength;};})(),repeat:function(str,times){return new Array(times+1).join(str);},tryThese:function(){var returnValue;for(var i=0,length=arguments.length;i<length;i++){var lambda=arguments[i];try{returnValue=lambda();break;}catch(e){}}
return returnValue;},genKey:function(){return Array.prototype.slice.call(arguments).join('-');},defer:function(fn){return function(){var args=arguments,self=this;window.setTimeout(function(){fn.apply(self,args);},0);};},normalizeCssText:function(styleText,nativeNormalize){var props=[],name,parsedProps=CKEDITOR.tools.parseCssText(styleText,true,nativeNormalize);for(name in parsedProps)
props.push(name+':'+parsedProps[name]);props.sort();return props.length?(props.join(';')+';'):'';},convertRgbToHex:function(styleText){return styleText.replace(/(?:rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\))/gi,function(match,red,green,blue){var color=[red,green,blue];for(var i=0;i<3;i++)
color[i]=('0'+parseInt(color[i],10).toString(16)).slice(-2);return'#'+color.join('');});},parseCssText:function(styleText,normalize,nativeNormalize){var retval={};if(nativeNormalize){var temp=new CKEDITOR.dom.element('span');temp.setAttribute('style',styleText);styleText=CKEDITOR.tools.convertRgbToHex(temp.getAttribute('style')||'');}
if(!styleText||styleText==';')
return retval;styleText.replace(/&quot;/g,'"').replace(/\s*([^:;\s]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(match,name,value){if(normalize){name=name.toLowerCase();if(name=='font-family')
value=value.toLowerCase().replace(/["']/g,'').replace(/\s*,\s*/g,',');value=CKEDITOR.tools.trim(value);}
retval[name]=value;});return retval;},writeCssText:function(styles,sort){var name,stylesArr=[];for(name in styles)
stylesArr.push(name+':'+styles[name]);if(sort)
stylesArr.sort();return stylesArr.join('; ');},objectCompare:function(left,right,onlyLeft){var name;if(!left&&!right)
return true;if(!left||!right)
return false;for(name in left){if(left[name]!=right[name])
return false;}
if(!onlyLeft){for(name in right){if(left[name]!=right[name])
return false;}}
return true;},objectKeys:function(obj){var keys=[];for(var i in obj)
keys.push(i);return keys;},convertArrayToObject:function(arr,fillWith){var obj={};if(arguments.length==1)
fillWith=true;for(var i=0,l=arr.length;i<l;++i)
obj[arr[i]]=fillWith;return obj;},fixDomain:function(){var domain;while(1){try{domain=window.parent.document.domain;break;}catch(e){domain=domain?domain.replace(/.+?(?:\.|$)/,''):document.domain;if(!domain)
break;document.domain=domain;}}
return!!domain;},eventsBuffer:function(minInterval,output,scopeObj){var scheduled,lastOutput=0;function triggerOutput(){lastOutput=(new Date()).getTime();scheduled=false;if(scopeObj){output.call(scopeObj);}else{output();}}
return{input:function(){if(scheduled)
return;var diff=(new Date()).getTime()-lastOutput;if(diff<minInterval)
scheduled=setTimeout(triggerOutput,minInterval-diff);else
triggerOutput();},reset:function(){if(scheduled)
clearTimeout(scheduled);scheduled=lastOutput=0;}};},enableHtml5Elements:function(doc,withAppend){var els='abbr,article,aside,audio,bdi,canvas,data,datalist,details,figcaption,figure,footer,header,hgroup,main,mark,meter,nav,output,progress,section,summary,time,video'.split(','),i=els.length,el;while(i--){el=doc.createElement(els[i]);if(withAppend)
doc.appendChild(el);}},checkIfAnyArrayItemMatches:function(arr,regexp){for(var i=0,l=arr.length;i<l;++i){if(arr[i].match(regexp))
return true;}
return false;},checkIfAnyObjectPropertyMatches:function(obj,regexp){for(var i in obj){if(i.match(regexp))
return true;}
return false;},transparentImageData:'data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw=='};})();CKEDITOR.dtd=(function(){'use strict';var X=CKEDITOR.tools.extend,Y=function(source,removed){var substracted=CKEDITOR.tools.clone(source);for(var i=1;i<arguments.length;i++){removed=arguments[i];for(var name in removed)
delete substracted[name];}
return substracted;};var P={},F={},PF={a:1,abbr:1,area:1,audio:1,b:1,bdi:1,bdo:1,br:1,button:1,canvas:1,cite:1,code:1,command:1,datalist:1,del:1,dfn:1,em:1,embed:1,i:1,iframe:1,img:1,input:1,ins:1,kbd:1,keygen:1,label:1,map:1,mark:1,meter:1,noscript:1,object:1,output:1,progress:1,q:1,ruby:1,s:1,samp:1,script:1,select:1,small:1,span:1,strong:1,sub:1,sup:1,textarea:1,time:1,u:1,'var':1,video:1,wbr:1},FO={address:1,article:1,aside:1,blockquote:1,details:1,div:1,dl:1,fieldset:1,figure:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,hr:1,main:1,menu:1,nav:1,ol:1,p:1,pre:1,section:1,table:1,ul:1},M={command:1,link:1,meta:1,noscript:1,script:1,style:1},E={},T={'#':1},DP={acronym:1,applet:1,basefont:1,big:1,font:1,isindex:1,strike:1,style:1,tt:1},DFO={center:1,dir:1,noframes:1};X(P,PF,T,DP);X(F,FO,P,DFO);var dtd={a:Y(P,{a:1,button:1}),abbr:P,address:F,area:E,article:F,aside:F,audio:X({source:1,track:1},F),b:P,base:E,bdi:P,bdo:P,blockquote:F,body:F,br:E,button:Y(P,{a:1,button:1}),canvas:P,caption:F,cite:P,code:P,col:E,colgroup:{col:1},command:E,datalist:X({option:1},P),dd:F,del:P,details:X({summary:1},F),dfn:P,div:F,dl:{dt:1,dd:1},dt:F,em:P,embed:E,fieldset:X({legend:1},F),figcaption:F,figure:X({figcaption:1},F),footer:F,form:F,h1:P,h2:P,h3:P,h4:P,h5:P,h6:P,head:X({title:1,base:1},M),header:F,hgroup:{h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},hr:E,html:X({head:1,body:1},F,M),i:P,iframe:T,img:E,input:E,ins:P,kbd:P,keygen:E,label:P,legend:P,li:F,link:E,main:F,map:F,mark:P,menu:X({li:1},F),meta:E,meter:Y(P,{meter:1}),nav:F,noscript:X({link:1,meta:1,style:1},P),object:X({param:1},P),ol:{li:1},optgroup:{option:1},option:T,output:P,p:P,param:E,pre:P,progress:Y(P,{progress:1}),q:P,rp:P,rt:P,ruby:X({rp:1,rt:1},P),s:P,samp:P,script:T,section:F,select:{optgroup:1,option:1},small:P,source:E,span:P,strong:P,style:T,sub:P,summary:P,sup:P,table:{caption:1,colgroup:1,thead:1,tfoot:1,tbody:1,tr:1},tbody:{tr:1},td:F,textarea:T,tfoot:{tr:1},th:F,thead:{tr:1},time:Y(P,{time:1}),title:T,tr:{th:1,td:1},track:E,u:P,ul:{li:1},'var':P,video:X({source:1,track:1},F),wbr:E,acronym:P,applet:X({param:1},F),basefont:E,big:P,center:F,dialog:E,dir:{li:1},font:P,isindex:E,noframes:F,strike:P,tt:P};X(dtd,{$block:X({audio:1,dd:1,dt:1,figcaption:1,li:1,video:1},FO,DFO),$blockLimit:{article:1,aside:1,audio:1,body:1,caption:1,details:1,dir:1,div:1,dl:1,fieldset:1,figcaption:1,figure:1,footer:1,form:1,header:1,hgroup:1,main:1,menu:1,nav:1,ol:1,section:1,table:1,td:1,th:1,tr:1,ul:1,video:1},$cdata:{script:1,style:1},$editable:{address:1,article:1,aside:1,blockquote:1,body:1,details:1,div:1,fieldset:1,figcaption:1,footer:1,form:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,header:1,hgroup:1,main:1,nav:1,p:1,pre:1,section:1},$empty:{area:1,base:1,basefont:1,br:1,col:1,command:1,dialog:1,embed:1,hr:1,img:1,input:1,isindex:1,keygen:1,link:1,meta:1,param:1,source:1,track:1,wbr:1},$inline:P,$list:{dl:1,ol:1,ul:1},$listItem:{dd:1,dt:1,li:1},$nonBodyContent:X({body:1,head:1,html:1},dtd.head),$nonEditable:{applet:1,audio:1,button:1,embed:1,iframe:1,map:1,object:1,option:1,param:1,script:1,textarea:1,video:1},$object:{applet:1,audio:1,button:1,hr:1,iframe:1,img:1,input:1,object:1,select:1,table:1,textarea:1,video:1},$removeEmpty:{abbr:1,acronym:1,b:1,bdi:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,mark:1,meter:1,output:1,q:1,ruby:1,s:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,time:1,tt:1,u:1,'var':1},$tabIndex:{a:1,area:1,button:1,input:1,object:1,select:1,textarea:1},$tableContent:{caption:1,col:1,colgroup:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1},$transparent:{a:1,audio:1,canvas:1,del:1,ins:1,map:1,noscript:1,object:1,video:1},$intermediate:{caption:1,colgroup:1,dd:1,dt:1,figcaption:1,legend:1,li:1,optgroup:1,option:1,rp:1,rt:1,summary:1,tbody:1,td:1,tfoot:1,th:1,thead:1,tr:1}});return dtd;})();CKEDITOR.dom.event=function(domEvent){this.$=domEvent;};CKEDITOR.dom.event.prototype={getKey:function(){return this.$.keyCode||this.$.which;},getKeystroke:function(){var keystroke=this.getKey();if(this.$.ctrlKey||this.$.metaKey)
keystroke+=CKEDITOR.CTRL;if(this.$.shiftKey)
keystroke+=CKEDITOR.SHIFT;if(this.$.altKey)
keystroke+=CKEDITOR.ALT;return keystroke;},preventDefault:function(stopPropagation){var $=this.$;if($.preventDefault)
$.preventDefault();else
$.returnValue=false;if(stopPropagation)
this.stopPropagation();},stopPropagation:function(){var $=this.$;if($.stopPropagation)
$.stopPropagation();else
$.cancelBubble=true;},getTarget:function(){var rawNode=this.$.target||this.$.srcElement;return rawNode?new CKEDITOR.dom.node(rawNode):null;},getPhase:function(){return this.$.eventPhase||2;},getPageOffset:function(){var doc=this.getTarget().getDocument().$;var pageX=this.$.pageX||this.$.clientX+(doc.documentElement.scrollLeft||doc.body.scrollLeft);var pageY=this.$.pageY||this.$.clientY+(doc.documentElement.scrollTop||doc.body.scrollTop);return{x:pageX,y:pageY};}};CKEDITOR.CTRL=0x110000;CKEDITOR.SHIFT=0x220000;CKEDITOR.ALT=0x440000;CKEDITOR.EVENT_PHASE_CAPTURING=1;CKEDITOR.EVENT_PHASE_AT_TARGET=2;CKEDITOR.EVENT_PHASE_BUBBLING=3;CKEDITOR.dom.domObject=function(nativeDomObject){if(nativeDomObject){this.$=nativeDomObject;}};CKEDITOR.dom.domObject.prototype=(function(){var getNativeListener=function(domObject,eventName){return function(domEvent){if(typeof CKEDITOR!='undefined')
domObject.fire(eventName,new CKEDITOR.dom.event(domEvent));};};return{getPrivate:function(){var priv;if(!(priv=this.getCustomData('_')))
this.setCustomData('_',(priv={}));return priv;},on:function(eventName){var nativeListeners=this.getCustomData('_cke_nativeListeners');if(!nativeListeners){nativeListeners={};this.setCustomData('_cke_nativeListeners',nativeListeners);}
if(!nativeListeners[eventName]){var listener=nativeListeners[eventName]=getNativeListener(this,eventName);if(this.$.addEventListener)
this.$.addEventListener(eventName,listener,!!CKEDITOR.event.useCapture);else if(this.$.attachEvent)
this.$.attachEvent('on'+eventName,listener);}
return CKEDITOR.event.prototype.on.apply(this,arguments);},removeListener:function(eventName){CKEDITOR.event.prototype.removeListener.apply(this,arguments);if(!this.hasListeners(eventName)){var nativeListeners=this.getCustomData('_cke_nativeListeners');var listener=nativeListeners&&nativeListeners[eventName];if(listener){if(this.$.removeEventListener)
this.$.removeEventListener(eventName,listener,false);else if(this.$.detachEvent)
this.$.detachEvent('on'+eventName,listener);delete nativeListeners[eventName];}}},removeAllListeners:function(){var nativeListeners=this.getCustomData('_cke_nativeListeners');for(var eventName in nativeListeners){var listener=nativeListeners[eventName];if(this.$.detachEvent)
this.$.detachEvent('on'+eventName,listener);else if(this.$.removeEventListener)
this.$.removeEventListener(eventName,listener,false);delete nativeListeners[eventName];}
CKEDITOR.event.prototype.removeAllListeners.call(this);}};})();(function(domObjectProto){var customData={};CKEDITOR.on('reset',function(){customData={};});domObjectProto.equals=function(object){try{return(object&&object.$===this.$);}catch(er){return false;}};domObjectProto.setCustomData=function(key,value){var expandoNumber=this.getUniqueId(),dataSlot=customData[expandoNumber]||(customData[expandoNumber]={});dataSlot[key]=value;return this;};domObjectProto.getCustomData=function(key){var expandoNumber=this.$['data-cke-expando'],dataSlot=expandoNumber&&customData[expandoNumber];return(dataSlot&&key in dataSlot)?dataSlot[key]:null;};domObjectProto.removeCustomData=function(key){var expandoNumber=this.$['data-cke-expando'],dataSlot=expandoNumber&&customData[expandoNumber],retval,hadKey;if(dataSlot){retval=dataSlot[key];hadKey=key in dataSlot;delete dataSlot[key];}
return hadKey?retval:null;};domObjectProto.clearCustomData=function(){this.removeAllListeners();var expandoNumber=this.$['data-cke-expando'];expandoNumber&&delete customData[expandoNumber];};domObjectProto.getUniqueId=function(){return this.$['data-cke-expando']||(this.$['data-cke-expando']=CKEDITOR.tools.getNextNumber());};CKEDITOR.event.implementOn(domObjectProto);})(CKEDITOR.dom.domObject.prototype);CKEDITOR.dom.node=function(domNode){if(domNode){var type=domNode.nodeType==CKEDITOR.NODE_DOCUMENT?'document':domNode.nodeType==CKEDITOR.NODE_ELEMENT?'element':domNode.nodeType==CKEDITOR.NODE_TEXT?'text':domNode.nodeType==CKEDITOR.NODE_COMMENT?'comment':domNode.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT?'documentFragment':'domObject';return new CKEDITOR.dom[type](domNode);}
return this;};CKEDITOR.dom.node.prototype=new CKEDITOR.dom.domObject();CKEDITOR.NODE_ELEMENT=1;CKEDITOR.NODE_DOCUMENT=9;CKEDITOR.NODE_TEXT=3;CKEDITOR.NODE_COMMENT=8;CKEDITOR.NODE_DOCUMENT_FRAGMENT=11;CKEDITOR.POSITION_IDENTICAL=0;CKEDITOR.POSITION_DISCONNECTED=1;CKEDITOR.POSITION_FOLLOWING=2;CKEDITOR.POSITION_PRECEDING=4;CKEDITOR.POSITION_IS_CONTAINED=8;CKEDITOR.POSITION_CONTAINS=16;CKEDITOR.tools.extend(CKEDITOR.dom.node.prototype,{appendTo:function(element,toStart){element.append(this,toStart);return element;},clone:function(includeChildren,cloneId){var $clone=this.$.cloneNode(includeChildren);removeIds($clone);var node=new CKEDITOR.dom.node($clone);if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&(this.type==CKEDITOR.NODE_ELEMENT||this.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)){renameNodes(node);}
return node;function removeIds(node){if(node['data-cke-expando'])
node['data-cke-expando']=false;if(node.nodeType!=CKEDITOR.NODE_ELEMENT&&node.nodeType!=CKEDITOR.NODE_DOCUMENT_FRAGMENT)
return;if(!cloneId&&node.nodeType==CKEDITOR.NODE_ELEMENT)
node.removeAttribute('id',false);if(includeChildren){var childs=node.childNodes;for(var i=0;i<childs.length;i++)
removeIds(childs[i]);}}
function renameNodes(node){if(node.type!=CKEDITOR.NODE_ELEMENT&&node.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT)
return;if(node.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT){var name=node.getName();if(name[0]==':'){node.renameNode(name.substring(1));}}
if(includeChildren){for(var i=0;i<node.getChildCount();i++)
renameNodes(node.getChild(i));}}},hasPrevious:function(){return!!this.$.previousSibling;},hasNext:function(){return!!this.$.nextSibling;},insertAfter:function(node){node.$.parentNode.insertBefore(this.$,node.$.nextSibling);return node;},insertBefore:function(node){node.$.parentNode.insertBefore(this.$,node.$);return node;},insertBeforeMe:function(node){this.$.parentNode.insertBefore(node.$,this.$);return node;},getAddress:function(normalized){var address=[];var $documentElement=this.getDocument().$.documentElement;var node=this.$;while(node&&node!=$documentElement){var parentNode=node.parentNode;if(parentNode){address.unshift(this.getIndex.call({$:node},normalized));}
node=parentNode;}
return address;},getDocument:function(){return new CKEDITOR.dom.document(this.$.ownerDocument||this.$.parentNode.ownerDocument);},getIndex:function(normalized){var current=this.$,index=-1,isNormalizing;if(!this.$.parentNode)
return-1;if(normalized&&current.nodeType==CKEDITOR.NODE_TEXT&&!current.nodeValue){var adjacent=getAdjacentNonEmptyTextNode(current)||getAdjacentNonEmptyTextNode(current,true);if(!adjacent)
return-1;}
do{if(normalized&&current!=this.$&&current.nodeType==CKEDITOR.NODE_TEXT&&(isNormalizing||!current.nodeValue))
continue;index++;isNormalizing=current.nodeType==CKEDITOR.NODE_TEXT;}
while((current=current.previousSibling));return index;function getAdjacentNonEmptyTextNode(node,lookForward){var sibling=lookForward?node.nextSibling:node.previousSibling;if(!sibling||sibling.nodeType!=CKEDITOR.NODE_TEXT){return null;}
return sibling.nodeValue?sibling:getAdjacentNonEmptyTextNode(sibling,lookForward);}},getNextSourceNode:function(startFromSibling,nodeType,guard){if(guard&&!guard.call){var guardNode=guard;guard=function(node){return!node.equals(guardNode);};}
var node=(!startFromSibling&&this.getFirst&&this.getFirst()),parent;if(!node){if(this.type==CKEDITOR.NODE_ELEMENT&&guard&&guard(this,true)===false)
return null;node=this.getNext();}
while(!node&&(parent=(parent||this).getParent())){if(guard&&guard(parent,true)===false)
return null;node=parent.getNext();}
if(!node)
return null;if(guard&&guard(node)===false)
return null;if(nodeType&&nodeType!=node.type)
return node.getNextSourceNode(false,nodeType,guard);return node;},getPreviousSourceNode:function(startFromSibling,nodeType,guard){if(guard&&!guard.call){var guardNode=guard;guard=function(node){return!node.equals(guardNode);};}
var node=(!startFromSibling&&this.getLast&&this.getLast()),parent;if(!node){if(this.type==CKEDITOR.NODE_ELEMENT&&guard&&guard(this,true)===false)
return null;node=this.getPrevious();}
while(!node&&(parent=(parent||this).getParent())){if(guard&&guard(parent,true)===false)
return null;node=parent.getPrevious();}
if(!node)
return null;if(guard&&guard(node)===false)
return null;if(nodeType&&node.type!=nodeType)
return node.getPreviousSourceNode(false,nodeType,guard);return node;},getPrevious:function(evaluator){var previous=this.$,retval;do{previous=previous.previousSibling;retval=previous&&previous.nodeType!=10&&new CKEDITOR.dom.node(previous);}
while(retval&&evaluator&&!evaluator(retval));return retval;},getNext:function(evaluator){var next=this.$,retval;do{next=next.nextSibling;retval=next&&new CKEDITOR.dom.node(next);}
while(retval&&evaluator&&!evaluator(retval));return retval;},getParent:function(allowFragmentParent){var parent=this.$.parentNode;return(parent&&(parent.nodeType==CKEDITOR.NODE_ELEMENT||allowFragmentParent&&parent.nodeType==CKEDITOR.NODE_DOCUMENT_FRAGMENT))?new CKEDITOR.dom.node(parent):null;},getParents:function(closerFirst){var node=this;var parents=[];do{parents[closerFirst?'push':'unshift'](node);}
while((node=node.getParent()));return parents;},getCommonAncestor:function(node){if(node.equals(this))
return this;if(node.contains&&node.contains(this))
return node;var start=this.contains?this:this.getParent();do{if(start.contains(node))return start;}
while((start=start.getParent()));return null;},getPosition:function(otherNode){var $=this.$;var $other=otherNode.$;if($.compareDocumentPosition)
return $.compareDocumentPosition($other);if($==$other)
return CKEDITOR.POSITION_IDENTICAL;if(this.type==CKEDITOR.NODE_ELEMENT&&otherNode.type==CKEDITOR.NODE_ELEMENT){if($.contains){if($.contains($other))
return CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING;if($other.contains($))
return CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING;}
if('sourceIndex'in $)
return($.sourceIndex<0||$other.sourceIndex<0)?CKEDITOR.POSITION_DISCONNECTED:($.sourceIndex<$other.sourceIndex)?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;}
var addressOfThis=this.getAddress(),addressOfOther=otherNode.getAddress(),minLevel=Math.min(addressOfThis.length,addressOfOther.length);for(var i=0;i<minLevel;i++){if(addressOfThis[i]!=addressOfOther[i]){return addressOfThis[i]<addressOfOther[i]?CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_FOLLOWING;}}
return(addressOfThis.length<addressOfOther.length)?CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_PRECEDING:CKEDITOR.POSITION_IS_CONTAINED+CKEDITOR.POSITION_FOLLOWING;},getAscendant:function(query,includeSelf){var $=this.$,evaluator,isCustomEvaluator;if(!includeSelf){$=$.parentNode;}
if(typeof query=='function'){isCustomEvaluator=true;evaluator=query;}else{isCustomEvaluator=false;evaluator=function($){var name=(typeof $.nodeName=='string'?$.nodeName.toLowerCase():'');return(typeof query=='string'?name==query:name in query);};}
while($){if(evaluator(isCustomEvaluator?new CKEDITOR.dom.node($):$)){return new CKEDITOR.dom.node($);}
try{$=$.parentNode;}catch(e){$=null;}}
return null;},hasAscendant:function(name,includeSelf){var $=this.$;if(!includeSelf)
$=$.parentNode;while($){if($.nodeName&&$.nodeName.toLowerCase()==name)
return true;$=$.parentNode;}
return false;},move:function(target,toStart){target.append(this.remove(),toStart);},remove:function(preserveChildren){var $=this.$;var parent=$.parentNode;if(parent){if(preserveChildren){for(var child;(child=$.firstChild);){parent.insertBefore($.removeChild(child),$);}}
parent.removeChild($);}
return this;},replace:function(nodeToReplace){this.insertBefore(nodeToReplace);nodeToReplace.remove();},trim:function(){this.ltrim();this.rtrim();},ltrim:function(){var child;while(this.getFirst&&(child=this.getFirst())){if(child.type==CKEDITOR.NODE_TEXT){var trimmed=CKEDITOR.tools.ltrim(child.getText()),originalLength=child.getLength();if(!trimmed){child.remove();continue;}else if(trimmed.length<originalLength){child.split(originalLength-trimmed.length);this.$.removeChild(this.$.firstChild);}}
break;}},rtrim:function(){var child;while(this.getLast&&(child=this.getLast())){if(child.type==CKEDITOR.NODE_TEXT){var trimmed=CKEDITOR.tools.rtrim(child.getText()),originalLength=child.getLength();if(!trimmed){child.remove();continue;}else if(trimmed.length<originalLength){child.split(trimmed.length);this.$.lastChild.parentNode.removeChild(this.$.lastChild);}}
break;}
if(CKEDITOR.env.needsBrFiller){child=this.$.lastChild;if(child&&child.type==1&&child.nodeName.toLowerCase()=='br'){child.parentNode.removeChild(child);}}},isReadOnly:function(checkOnlyAttributes){var element=this;if(this.type!=CKEDITOR.NODE_ELEMENT)
element=this.getParent();if(CKEDITOR.env.edge&&element&&element.is('textarea')){checkOnlyAttributes=true;}
if(!checkOnlyAttributes&&element&&typeof element.$.isContentEditable!='undefined'){return!(element.$.isContentEditable||element.data('cke-editable'));}
else{while(element){if(element.data('cke-editable')){return false;}else if(element.hasAttribute('contenteditable')){return element.getAttribute('contenteditable')=='false';}
element=element.getParent();}
return true;}}});CKEDITOR.dom.window=function(domWindow){CKEDITOR.dom.domObject.call(this,domWindow);};CKEDITOR.dom.window.prototype=new CKEDITOR.dom.domObject();CKEDITOR.tools.extend(CKEDITOR.dom.window.prototype,{focus:function(){this.$.focus();},getViewPaneSize:function(){var doc=this.$.document,stdMode=doc.compatMode=='CSS1Compat';return{width:(stdMode?doc.documentElement.clientWidth:doc.body.clientWidth)||0,height:(stdMode?doc.documentElement.clientHeight:doc.body.clientHeight)||0};},getScrollPosition:function(){var $=this.$;if('pageXOffset'in $){return{x:$.pageXOffset||0,y:$.pageYOffset||0};}else{var doc=$.document;return{x:doc.documentElement.scrollLeft||doc.body.scrollLeft||0,y:doc.documentElement.scrollTop||doc.body.scrollTop||0};}},getFrame:function(){var iframe=this.$.frameElement;return iframe?new CKEDITOR.dom.element.get(iframe):null;}});CKEDITOR.dom.document=function(domDocument){CKEDITOR.dom.domObject.call(this,domDocument);};CKEDITOR.dom.document.prototype=new CKEDITOR.dom.domObject();CKEDITOR.tools.extend(CKEDITOR.dom.document.prototype,{type:CKEDITOR.NODE_DOCUMENT,appendStyleSheet:function(cssFileUrl){if(this.$.createStyleSheet)
this.$.createStyleSheet(cssFileUrl);else{var link=new CKEDITOR.dom.element('link');link.setAttributes({rel:'stylesheet',type:'text/css',href:cssFileUrl});this.getHead().append(link);}},appendStyleText:function(cssStyleText){if(this.$.createStyleSheet){var styleSheet=this.$.createStyleSheet('');styleSheet.cssText=cssStyleText;}else{var style=new CKEDITOR.dom.element('style',this);style.append(new CKEDITOR.dom.text(cssStyleText,this));this.getHead().append(style);}
return styleSheet||style.$.sheet;},createElement:function(name,attribsAndStyles){var element=new CKEDITOR.dom.element(name,this);if(attribsAndStyles){if(attribsAndStyles.attributes)
element.setAttributes(attribsAndStyles.attributes);if(attribsAndStyles.styles)
element.setStyles(attribsAndStyles.styles);}
return element;},createText:function(text){return new CKEDITOR.dom.text(text,this);},focus:function(){this.getWindow().focus();},getActive:function(){var $active;try{$active=this.$.activeElement;}catch(e){return null;}
return new CKEDITOR.dom.element($active);},getById:function(elementId){var $=this.$.getElementById(elementId);return $?new CKEDITOR.dom.element($):null;},getByAddress:function(address,normalized){var $=this.$.documentElement;for(var i=0;$&&i<address.length;i++){var target=address[i];if(!normalized){$=$.childNodes[target];continue;}
var currentIndex=-1;for(var j=0;j<$.childNodes.length;j++){var candidate=$.childNodes[j];if(normalized===true&&candidate.nodeType==3&&candidate.previousSibling&&candidate.previousSibling.nodeType==3)
continue;currentIndex++;if(currentIndex==target){$=candidate;break;}}}
return $?new CKEDITOR.dom.node($):null;},getElementsByTag:function(tagName,namespace){if(!(CKEDITOR.env.ie&&(document.documentMode<=8))&&namespace)
tagName=namespace+':'+tagName;return new CKEDITOR.dom.nodeList(this.$.getElementsByTagName(tagName));},getHead:function(){var head=this.$.getElementsByTagName('head')[0];if(!head)
head=this.getDocumentElement().append(new CKEDITOR.dom.element('head'),true);else
head=new CKEDITOR.dom.element(head);return head;},getBody:function(){return new CKEDITOR.dom.element(this.$.body);},getDocumentElement:function(){return new CKEDITOR.dom.element(this.$.documentElement);},getWindow:function(){return new CKEDITOR.dom.window(this.$.parentWindow||this.$.defaultView);},write:function(html){this.$.open('text/html','replace');if(CKEDITOR.env.ie)
html=html.replace(/(?:^\s*<!DOCTYPE[^>]*?>)|^/i,'$&\n<script data-cke-temp="1">('+CKEDITOR.tools.fixDomain+')();</script>');this.$.write(html);this.$.close();},find:function(selector){return new CKEDITOR.dom.nodeList(this.$.querySelectorAll(selector));},findOne:function(selector){var el=this.$.querySelector(selector);return el?new CKEDITOR.dom.element(el):null;},_getHtml5ShivFrag:function(){var $frag=this.getCustomData('html5ShivFrag');if(!$frag){$frag=this.$.createDocumentFragment();CKEDITOR.tools.enableHtml5Elements($frag,true);this.setCustomData('html5ShivFrag',$frag);}
return $frag;}});CKEDITOR.dom.nodeList=function(nativeList){this.$=nativeList;};CKEDITOR.dom.nodeList.prototype={count:function(){return this.$.length;},getItem:function(index){if(index<0||index>=this.$.length)
return null;var $node=this.$[index];return $node?new CKEDITOR.dom.node($node):null;}};CKEDITOR.dom.element=function(element,ownerDocument){if(typeof element=='string')
element=(ownerDocument?ownerDocument.$:document).createElement(element);CKEDITOR.dom.domObject.call(this,element);};CKEDITOR.dom.element.get=function(element){var el=typeof element=='string'?document.getElementById(element)||document.getElementsByName(element)[0]:element;return el&&(el.$?el:new CKEDITOR.dom.element(el));};CKEDITOR.dom.element.prototype=new CKEDITOR.dom.node();CKEDITOR.dom.element.createFromHtml=function(html,ownerDocument){var temp=new CKEDITOR.dom.element('div',ownerDocument);temp.setHtml(html);return temp.getFirst().remove();};CKEDITOR.dom.element.setMarker=function(database,element,name,value){var id=element.getCustomData('list_marker_id')||(element.setCustomData('list_marker_id',CKEDITOR.tools.getNextNumber()).getCustomData('list_marker_id')),markerNames=element.getCustomData('list_marker_names')||(element.setCustomData('list_marker_names',{}).getCustomData('list_marker_names'));database[id]=element;markerNames[name]=1;return element.setCustomData(name,value);};CKEDITOR.dom.element.clearAllMarkers=function(database){for(var i in database)
CKEDITOR.dom.element.clearMarkers(database,database[i],1);};CKEDITOR.dom.element.clearMarkers=function(database,element,removeFromDatabase){var names=element.getCustomData('list_marker_names'),id=element.getCustomData('list_marker_id');for(var i in names)
element.removeCustomData(i);element.removeCustomData('list_marker_names');if(removeFromDatabase){element.removeCustomData('list_marker_id');delete database[id];}};(function(){var testElement=document.createElement('span'),supportsClassLists=!!testElement.classList,rclass=/[\n\t\r]/g;function hasClass(classNames,className){return(' '+classNames+' ').replace(rclass,' ').indexOf(' '+className+' ')>-1;}
CKEDITOR.tools.extend(CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_ELEMENT,addClass:supportsClassLists?function(className){this.$.classList.add(className);return this;}:function(className){var c=this.$.className;if(c){if(!hasClass(c,className))
c+=' '+className;}
this.$.className=c||className;return this;},removeClass:supportsClassLists?function(className){var $=this.$;$.classList.remove(className);if(!$.className)
$.removeAttribute('class');return this;}:function(className){var c=this.getAttribute('class');if(c&&hasClass(c,className)){c=c.replace(new RegExp('(?:^|\\s+)'+className+'(?=\\s|$)'),'').replace(/^\s+/,'');if(c)
this.setAttribute('class',c);else
this.removeAttribute('class');}
return this;},hasClass:function(className){return hasClass(this.$.className,className);},append:function(node,toStart){if(typeof node=='string')
node=this.getDocument().createElement(node);if(toStart)
this.$.insertBefore(node.$,this.$.firstChild);else
this.$.appendChild(node.$);return node;},appendHtml:function(html){if(!this.$.childNodes.length)
this.setHtml(html);else{var temp=new CKEDITOR.dom.element('div',this.getDocument());temp.setHtml(html);temp.moveChildren(this);}},appendText:function(text){if(this.$.text!=null&&CKEDITOR.env.ie&&CKEDITOR.env.version<9)
this.$.text+=text;else
this.append(new CKEDITOR.dom.text(text));},appendBogus:function(force){if(!force&&!CKEDITOR.env.needsBrFiller)
return;var lastChild=this.getLast();while(lastChild&&lastChild.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.rtrim(lastChild.getText()))
lastChild=lastChild.getPrevious();if(!lastChild||!lastChild.is||!lastChild.is('br')){var bogus=this.getDocument().createElement('br');CKEDITOR.env.gecko&&bogus.setAttribute('type','_moz');this.append(bogus);}},breakParent:function(parent,cloneId){var range=new CKEDITOR.dom.range(this.getDocument());range.setStartAfter(this);range.setEndAfter(parent);var docFrag=range.extractContents(false,cloneId||false);range.insertNode(this.remove());docFrag.insertAfterNode(this);},contains:!document.compareDocumentPosition?function(node){var $=this.$;return node.type!=CKEDITOR.NODE_ELEMENT?$.contains(node.getParent().$):$!=node.$&&$.contains(node.$);}:function(node){return!!(this.$.compareDocumentPosition(node.$)&16);},focus:(function(){function exec(){try{this.$.focus();}catch(e){}}
return function(defer){if(defer)
CKEDITOR.tools.setTimeout(exec,100,this);else
exec.call(this);};})(),getHtml:function(){var retval=this.$.innerHTML;return CKEDITOR.env.ie?retval.replace(/<\?[^>]*>/g,''):retval;},getOuterHtml:function(){if(this.$.outerHTML){return this.$.outerHTML.replace(/<\?[^>]*>/,'');}
var tmpDiv=this.$.ownerDocument.createElement('div');tmpDiv.appendChild(this.$.cloneNode(true));return tmpDiv.innerHTML;},getClientRect:function(){var rect=CKEDITOR.tools.extend({},this.$.getBoundingClientRect());!rect.width&&(rect.width=rect.right-rect.left);!rect.height&&(rect.height=rect.bottom-rect.top);return rect;},setHtml:(CKEDITOR.env.ie&&CKEDITOR.env.version<9)?function(html){try{var $=this.$;if(this.getParent())
return($.innerHTML=html);else{var $frag=this.getDocument()._getHtml5ShivFrag();$frag.appendChild($);$.innerHTML=html;$frag.removeChild($);return html;}}
catch(e){this.$.innerHTML='';var temp=new CKEDITOR.dom.element('body',this.getDocument());temp.$.innerHTML=html;var children=temp.getChildren();while(children.count())
this.append(children.getItem(0));return html;}}:function(html){return(this.$.innerHTML=html);},setText:(function(){var supportsTextContent=document.createElement('p');supportsTextContent.innerHTML='x';supportsTextContent=supportsTextContent.textContent;return function(text){this.$[supportsTextContent?'textContent':'innerText']=text;};})(),getAttribute:(function(){var standard=function(name){return this.$.getAttribute(name,2);};if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)){return function(name){switch(name){case'class':name='className';break;case'http-equiv':name='httpEquiv';break;case'name':return this.$.name;case'tabindex':var tabIndex=standard.call(this,name);if(tabIndex!==0&&this.$.tabIndex===0)
tabIndex=null;return tabIndex;case'checked':var attr=this.$.attributes.getNamedItem(name),attrValue=attr.specified?attr.nodeValue:this.$.checked;return attrValue?'checked':null;case'hspace':case'value':return this.$[name];case'style':return this.$.style.cssText;case'contenteditable':case'contentEditable':return this.$.attributes.getNamedItem('contentEditable').specified?this.$.getAttribute('contentEditable'):null;}
return standard.call(this,name);};}else{return standard;}})(),getChildren:function(){return new CKEDITOR.dom.nodeList(this.$.childNodes);},getComputedStyle:(document.defaultView&&document.defaultView.getComputedStyle)?function(propertyName){var style=this.getWindow().$.getComputedStyle(this.$,null);return style?style.getPropertyValue(propertyName):'';}:function(propertyName){return this.$.currentStyle[CKEDITOR.tools.cssStyleToDomStyle(propertyName)];},getDtd:function(){var dtd=CKEDITOR.dtd[this.getName()];this.getDtd=function(){return dtd;};return dtd;},getElementsByTag:CKEDITOR.dom.document.prototype.getElementsByTag,getTabIndex:function(){var tabIndex=this.$.tabIndex;if(tabIndex===0&&!CKEDITOR.dtd.$tabIndex[this.getName()]&&parseInt(this.getAttribute('tabindex'),10)!==0)
return-1;return tabIndex;},getText:function(){return this.$.textContent||this.$.innerText||'';},getWindow:function(){return this.getDocument().getWindow();},getId:function(){return this.$.id||null;},getNameAtt:function(){return this.$.name||null;},getName:function(){var nodeName=this.$.nodeName.toLowerCase();if(CKEDITOR.env.ie&&(document.documentMode<=8)){var scopeName=this.$.scopeName;if(scopeName!='HTML')
nodeName=scopeName.toLowerCase()+':'+nodeName;}
this.getName=function(){return nodeName;};return this.getName();},getValue:function(){return this.$.value;},getFirst:function(evaluator){var first=this.$.firstChild,retval=first&&new CKEDITOR.dom.node(first);if(retval&&evaluator&&!evaluator(retval))
retval=retval.getNext(evaluator);return retval;},getLast:function(evaluator){var last=this.$.lastChild,retval=last&&new CKEDITOR.dom.node(last);if(retval&&evaluator&&!evaluator(retval))
retval=retval.getPrevious(evaluator);return retval;},getStyle:function(name){return this.$.style[CKEDITOR.tools.cssStyleToDomStyle(name)];},is:function(){var name=this.getName();if(typeof arguments[0]=='object')
return!!arguments[0][name];for(var i=0;i<arguments.length;i++){if(arguments[i]==name)
return true;}
return false;},isEditable:function(textCursor){var name=this.getName();if(this.isReadOnly()||this.getComputedStyle('display')=='none'||this.getComputedStyle('visibility')=='hidden'||CKEDITOR.dtd.$nonEditable[name]||CKEDITOR.dtd.$empty[name]||(this.is('a')&&(this.data('cke-saved-name')||this.hasAttribute('name'))&&!this.getChildCount())){return false;}
if(textCursor!==false){var dtd=CKEDITOR.dtd[name]||CKEDITOR.dtd.span;return!!(dtd&&dtd['#']);}
return true;},isIdentical:function(otherElement){var thisEl=this.clone(0,1),otherEl=otherElement.clone(0,1);thisEl.removeAttributes(['_moz_dirty','data-cke-expando','data-cke-saved-href','data-cke-saved-name']);otherEl.removeAttributes(['_moz_dirty','data-cke-expando','data-cke-saved-href','data-cke-saved-name']);if(thisEl.$.isEqualNode){thisEl.$.style.cssText=CKEDITOR.tools.normalizeCssText(thisEl.$.style.cssText);otherEl.$.style.cssText=CKEDITOR.tools.normalizeCssText(otherEl.$.style.cssText);return thisEl.$.isEqualNode(otherEl.$);}else{thisEl=thisEl.getOuterHtml();otherEl=otherEl.getOuterHtml();if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&this.is('a')){var parent=this.getParent();if(parent.type==CKEDITOR.NODE_ELEMENT){var el=parent.clone();el.setHtml(thisEl),thisEl=el.getHtml();el.setHtml(otherEl),otherEl=el.getHtml();}}
return thisEl==otherEl;}},isVisible:function(){var isVisible=(this.$.offsetHeight||this.$.offsetWidth)&&this.getComputedStyle('visibility')!='hidden',elementWindow,elementWindowFrame;if(isVisible&&CKEDITOR.env.webkit){elementWindow=this.getWindow();if(!elementWindow.equals(CKEDITOR.document.getWindow())&&(elementWindowFrame=elementWindow.$.frameElement))
isVisible=new CKEDITOR.dom.element(elementWindowFrame).isVisible();}
return!!isVisible;},isEmptyInlineRemoveable:function(){if(!CKEDITOR.dtd.$removeEmpty[this.getName()])
return false;var children=this.getChildren();for(var i=0,count=children.count();i<count;i++){var child=children.getItem(i);if(child.type==CKEDITOR.NODE_ELEMENT&&child.data('cke-bookmark'))
continue;if(child.type==CKEDITOR.NODE_ELEMENT&&!child.isEmptyInlineRemoveable()||child.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(child.getText()))
return false;}
return true;},hasAttributes:CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)?function(){var attributes=this.$.attributes;for(var i=0;i<attributes.length;i++){var attribute=attributes[i];switch(attribute.nodeName){case'class':if(this.getAttribute('class')){return true;}
case'data-cke-expando':continue;default:if(attribute.specified){return true;}}}
return false;}:function(){var attrs=this.$.attributes,attrsNum=attrs.length;var execludeAttrs={'data-cke-expando':1,_moz_dirty:1};return attrsNum>0&&(attrsNum>2||!execludeAttrs[attrs[0].nodeName]||(attrsNum==2&&!execludeAttrs[attrs[1].nodeName]));},hasAttribute:(function(){function ieHasAttribute(name){var $attr=this.$.attributes.getNamedItem(name);if(this.getName()=='input'){switch(name){case'class':return this.$.className.length>0;case'checked':return!!this.$.checked;case'value':var type=this.getAttribute('type');return type=='checkbox'||type=='radio'?this.$.value!='on':!!this.$.value;}}
if(!$attr)
return false;return $attr.specified;}
if(CKEDITOR.env.ie){if(CKEDITOR.env.version<8){return function(name){if(name=='name')
return!!this.$.name;return ieHasAttribute.call(this,name);};}else{return ieHasAttribute;}}else{return function(name){return!!this.$.attributes.getNamedItem(name);};}})(),hide:function(){this.setStyle('display','none');},moveChildren:function(target,toStart){var $=this.$;target=target.$;if($==target)
return;var child;if(toStart){while((child=$.lastChild))
target.insertBefore($.removeChild(child),target.firstChild);}else{while((child=$.firstChild))
target.appendChild($.removeChild(child));}},mergeSiblings:(function(){function mergeElements(element,sibling,isNext){if(sibling&&sibling.type==CKEDITOR.NODE_ELEMENT){var pendingNodes=[];while(sibling.data('cke-bookmark')||sibling.isEmptyInlineRemoveable()){pendingNodes.push(sibling);sibling=isNext?sibling.getNext():sibling.getPrevious();if(!sibling||sibling.type!=CKEDITOR.NODE_ELEMENT)
return;}
if(element.isIdentical(sibling)){var innerSibling=isNext?element.getLast():element.getFirst();while(pendingNodes.length)
pendingNodes.shift().move(element,!isNext);sibling.moveChildren(element,!isNext);sibling.remove();if(innerSibling&&innerSibling.type==CKEDITOR.NODE_ELEMENT)
innerSibling.mergeSiblings();}}}
return function(inlineOnly){if(!(inlineOnly===false||CKEDITOR.dtd.$removeEmpty[this.getName()]||this.is('a'))){return;}
mergeElements(this,this.getNext(),true);mergeElements(this,this.getPrevious());};})(),show:function(){this.setStyles({display:'',visibility:''});},setAttribute:(function(){var standard=function(name,value){this.$.setAttribute(name,value);return this;};if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)){return function(name,value){if(name=='class')
this.$.className=value;else if(name=='style')
this.$.style.cssText=value;else if(name=='tabindex')
this.$.tabIndex=value;else if(name=='checked')
this.$.checked=value;else if(name=='contenteditable')
standard.call(this,'contentEditable',value);else
standard.apply(this,arguments);return this;};}else if(CKEDITOR.env.ie8Compat&&CKEDITOR.env.secure){return function(name,value){if(name=='src'&&value.match(/^http:\/\//)){try{standard.apply(this,arguments);}catch(e){}}else{standard.apply(this,arguments);}
return this;};}else{return standard;}})(),setAttributes:function(attributesPairs){for(var name in attributesPairs)
this.setAttribute(name,attributesPairs[name]);return this;},setValue:function(value){this.$.value=value;return this;},removeAttribute:(function(){var standard=function(name){this.$.removeAttribute(name);};if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)){return function(name){if(name=='class')
name='className';else if(name=='tabindex')
name='tabIndex';else if(name=='contenteditable')
name='contentEditable';standard.call(this,name);};}else{return standard;}})(),removeAttributes:function(attributes){if(CKEDITOR.tools.isArray(attributes)){for(var i=0;i<attributes.length;i++)
this.removeAttribute(attributes[i]);}else{for(var attr in attributes)
attributes.hasOwnProperty(attr)&&this.removeAttribute(attr);}},removeStyle:function(name){var $=this.$.style;if(!$.removeProperty&&(name=='border'||name=='margin'||name=='padding')){var names=expandedRules(name);for(var i=0;i<names.length;i++)
this.removeStyle(names[i]);return;}
$.removeProperty?$.removeProperty(name):$.removeAttribute(CKEDITOR.tools.cssStyleToDomStyle(name));if(!this.$.style.cssText)
this.removeAttribute('style');},setStyle:function(name,value){this.$.style[CKEDITOR.tools.cssStyleToDomStyle(name)]=value;return this;},setStyles:function(stylesPairs){for(var name in stylesPairs)
this.setStyle(name,stylesPairs[name]);return this;},setOpacity:function(opacity){if(CKEDITOR.env.ie&&CKEDITOR.env.version<9){opacity=Math.round(opacity*100);this.setStyle('filter',opacity>=100?'':'progid:DXImageTransform.Microsoft.Alpha(opacity='+opacity+')');}else{this.setStyle('opacity',opacity);}},unselectable:function(){this.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select','none'));if(CKEDITOR.env.ie){this.setAttribute('unselectable','on');var element,elements=this.getElementsByTag('*');for(var i=0,count=elements.count();i<count;i++){element=elements.getItem(i);element.setAttribute('unselectable','on');}}},getPositionedAncestor:function(){var current=this;while(current.getName()!='html'){if(current.getComputedStyle('position')!='static')
return current;current=current.getParent();}
return null;},getDocumentPosition:function(refDocument){var x=0,y=0,doc=this.getDocument(),body=doc.getBody(),quirks=doc.$.compatMode=='BackCompat';if(document.documentElement.getBoundingClientRect){var box=this.$.getBoundingClientRect(),$doc=doc.$,$docElem=$doc.documentElement;var clientTop=$docElem.clientTop||body.$.clientTop||0,clientLeft=$docElem.clientLeft||body.$.clientLeft||0,needAdjustScrollAndBorders=true;if(CKEDITOR.env.ie){var inDocElem=doc.getDocumentElement().contains(this),inBody=doc.getBody().contains(this);needAdjustScrollAndBorders=(quirks&&inBody)||(!quirks&&inDocElem);}
if(needAdjustScrollAndBorders){var scrollRelativeLeft,scrollRelativeTop;if(CKEDITOR.env.webkit||(CKEDITOR.env.ie&&CKEDITOR.env.version>=12)){scrollRelativeLeft=body.$.scrollLeft||$docElem.scrollLeft;scrollRelativeTop=body.$.scrollTop||$docElem.scrollTop;}else{var scrollRelativeElement=quirks?body.$:$docElem;scrollRelativeLeft=scrollRelativeElement.scrollLeft;scrollRelativeTop=scrollRelativeElement.scrollTop;}
x=box.left+scrollRelativeLeft-clientLeft;y=box.top+scrollRelativeTop-clientTop;}}else{var current=this,previous=null,offsetParent;while(current&&!(current.getName()=='body'||current.getName()=='html')){x+=current.$.offsetLeft-current.$.scrollLeft;y+=current.$.offsetTop-current.$.scrollTop;if(!current.equals(this)){x+=(current.$.clientLeft||0);y+=(current.$.clientTop||0);}
var scrollElement=previous;while(scrollElement&&!scrollElement.equals(current)){x-=scrollElement.$.scrollLeft;y-=scrollElement.$.scrollTop;scrollElement=scrollElement.getParent();}
previous=current;current=(offsetParent=current.$.offsetParent)?new CKEDITOR.dom.element(offsetParent):null;}}
if(refDocument){var currentWindow=this.getWindow(),refWindow=refDocument.getWindow();if(!currentWindow.equals(refWindow)&&currentWindow.$.frameElement){var iframePosition=(new CKEDITOR.dom.element(currentWindow.$.frameElement)).getDocumentPosition(refDocument);x+=iframePosition.x;y+=iframePosition.y;}}
if(!document.documentElement.getBoundingClientRect){if(CKEDITOR.env.gecko&&!quirks){x+=this.$.clientLeft?1:0;y+=this.$.clientTop?1:0;}}
return{x:x,y:y};},scrollIntoView:function(alignToTop){var parent=this.getParent();if(!parent)
return;do{var overflowed=parent.$.clientWidth&&parent.$.clientWidth<parent.$.scrollWidth||parent.$.clientHeight&&parent.$.clientHeight<parent.$.scrollHeight;if(overflowed&&!parent.is('body'))
this.scrollIntoParent(parent,alignToTop,1);if(parent.is('html')){var win=parent.getWindow();try{var iframe=win.$.frameElement;iframe&&(parent=new CKEDITOR.dom.element(iframe));}catch(er){}}}
while((parent=parent.getParent()));},scrollIntoParent:function(parent,alignToTop,hscroll){!parent&&(parent=this.getWindow());var doc=parent.getDocument();var isQuirks=doc.$.compatMode=='BackCompat';if(parent instanceof CKEDITOR.dom.window)
parent=isQuirks?doc.getBody():doc.getDocumentElement();function scrollBy(x,y){if(/body|html/.test(parent.getName()))
parent.getWindow().$.scrollBy(x,y);else{parent.$.scrollLeft+=x;parent.$.scrollTop+=y;}}
function screenPos(element,refWin){var pos={x:0,y:0};if(!(element.is(isQuirks?'body':'html'))){var box=element.$.getBoundingClientRect();pos.x=box.left,pos.y=box.top;}
var win=element.getWindow();if(!win.equals(refWin)){var outerPos=screenPos(CKEDITOR.dom.element.get(win.$.frameElement),refWin);pos.x+=outerPos.x,pos.y+=outerPos.y;}
return pos;}
function margin(element,side){return parseInt(element.getComputedStyle('margin-'+side)||0,10)||0;}
var win=parent.getWindow();var thisPos=screenPos(this,win),parentPos=screenPos(parent,win),eh=this.$.offsetHeight,ew=this.$.offsetWidth,ch=parent.$.clientHeight,cw=parent.$.clientWidth,lt,br;lt={x:thisPos.x-margin(this,'left')-parentPos.x||0,y:thisPos.y-margin(this,'top')-parentPos.y||0};br={x:thisPos.x+ew+margin(this,'right')-((parentPos.x)+cw)||0,y:thisPos.y+eh+margin(this,'bottom')-((parentPos.y)+ch)||0};if(lt.y<0||br.y>0)
scrollBy(0,alignToTop===true?lt.y:alignToTop===false?br.y:lt.y<0?lt.y:br.y);if(hscroll&&(lt.x<0||br.x>0))
scrollBy(lt.x<0?lt.x:br.x,0);},setState:function(state,base,useAria){base=base||'cke';switch(state){case CKEDITOR.TRISTATE_ON:this.addClass(base+'_on');this.removeClass(base+'_off');this.removeClass(base+'_disabled');useAria&&this.setAttribute('aria-pressed',true);useAria&&this.removeAttribute('aria-disabled');break;case CKEDITOR.TRISTATE_DISABLED:this.addClass(base+'_disabled');this.removeClass(base+'_off');this.removeClass(base+'_on');useAria&&this.setAttribute('aria-disabled',true);useAria&&this.removeAttribute('aria-pressed');break;default:this.addClass(base+'_off');this.removeClass(base+'_on');this.removeClass(base+'_disabled');useAria&&this.removeAttribute('aria-pressed');useAria&&this.removeAttribute('aria-disabled');break;}},getFrameDocument:function(){var $=this.$;try{$.contentWindow.document;}catch(e){$.src=$.src;}
return $&&new CKEDITOR.dom.document($.contentWindow.document);},copyAttributes:function(dest,skipAttributes){var attributes=this.$.attributes;skipAttributes=skipAttributes||{};for(var n=0;n<attributes.length;n++){var attribute=attributes[n];var attrName=attribute.nodeName.toLowerCase(),attrValue;if(attrName in skipAttributes)
continue;if(attrName=='checked'&&(attrValue=this.getAttribute(attrName)))
dest.setAttribute(attrName,attrValue);else if(!CKEDITOR.env.ie||this.hasAttribute(attrName)){attrValue=this.getAttribute(attrName);if(attrValue===null)
attrValue=attribute.nodeValue;dest.setAttribute(attrName,attrValue);}}
if(this.$.style.cssText!=='')
dest.$.style.cssText=this.$.style.cssText;},renameNode:function(newTag){if(this.getName()==newTag)
return;var doc=this.getDocument();var newNode=new CKEDITOR.dom.element(newTag,doc);this.copyAttributes(newNode);this.moveChildren(newNode);this.getParent(true)&&this.$.parentNode.replaceChild(newNode.$,this.$);newNode.$['data-cke-expando']=this.$['data-cke-expando'];this.$=newNode.$;delete this.getName;},getChild:(function(){function getChild(rawNode,index){var childNodes=rawNode.childNodes;if(index>=0&&index<childNodes.length)
return childNodes[index];}
return function(indices){var rawNode=this.$;if(!indices.slice)
rawNode=getChild(rawNode,indices);else{indices=indices.slice();while(indices.length>0&&rawNode)
rawNode=getChild(rawNode,indices.shift());}
return rawNode?new CKEDITOR.dom.node(rawNode):null;};})(),getChildCount:function(){return this.$.childNodes.length;},disableContextMenu:function(){this.on('contextmenu',function(event){if(!event.data.getTarget().hasClass('cke_enable_context_menu'))
event.data.preventDefault();});},getDirection:function(useComputed){if(useComputed){return this.getComputedStyle('direction')||this.getDirection()||this.getParent()&&this.getParent().getDirection(1)||this.getDocument().$.dir||'ltr';}
else{return this.getStyle('direction')||this.getAttribute('dir');}},data:function(name,value){name='data-'+name;if(value===undefined)
return this.getAttribute(name);else if(value===false)
this.removeAttribute(name);else
this.setAttribute(name,value);return null;},getEditor:function(){var instances=CKEDITOR.instances,name,instance;for(name in instances){instance=instances[name];if(instance.element.equals(this)&&instance.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO)
return instance;}
return null;},find:function(selector){var removeTmpId=createTmpId(this),list=new CKEDITOR.dom.nodeList(this.$.querySelectorAll(getContextualizedSelector(this,selector)));removeTmpId();return list;},findOne:function(selector){var removeTmpId=createTmpId(this),found=this.$.querySelector(getContextualizedSelector(this,selector));removeTmpId();return found?new CKEDITOR.dom.element(found):null;},forEach:function(callback,type,skipRoot){if(!skipRoot&&(!type||this.type==type))
var ret=callback(this);if(ret===false)
return;var children=this.getChildren(),node,i=0;for(;i<children.count();i++){node=children.getItem(i);if(node.type==CKEDITOR.NODE_ELEMENT)
node.forEach(callback,type);else if(!type||node.type==type)
callback(node);}}});function createTmpId(element){var hadId=true;if(!element.$.id){element.$.id='cke_tmp_'+CKEDITOR.tools.getNextNumber();hadId=false;}
return function(){if(!hadId)
element.removeAttribute('id');};}
function getContextualizedSelector(element,selector){return'#'+element.$.id+' '+selector.split(/,\s*/).join(', #'+element.$.id+' ');}
var sides={width:['border-left-width','border-right-width','padding-left','padding-right'],height:['border-top-width','border-bottom-width','padding-top','padding-bottom']};function expandedRules(style){var sides=['top','left','right','bottom'],components;if(style=='border')
components=['color','style','width'];var styles=[];for(var i=0;i<sides.length;i++){if(components){for(var j=0;j<components.length;j++)
styles.push([style,sides[i],components[j]].join('-'));}else{styles.push([style,sides[i]].join('-'));}}
return styles;}
function marginAndPaddingSize(type){var adjustment=0;for(var i=0,len=sides[type].length;i<len;i++)
adjustment+=parseInt(this.getComputedStyle(sides[type][i])||0,10)||0;return adjustment;}
CKEDITOR.dom.element.prototype.setSize=function(type,size,isBorderBox){if(typeof size=='number'){if(isBorderBox&&!(CKEDITOR.env.ie&&CKEDITOR.env.quirks))
size-=marginAndPaddingSize.call(this,type);this.setStyle(type,size+'px');}};CKEDITOR.dom.element.prototype.getSize=function(type,isBorderBox){var size=Math.max(this.$['offset'+CKEDITOR.tools.capitalize(type)],this.$['client'+CKEDITOR.tools.capitalize(type)])||0;if(isBorderBox)
size-=marginAndPaddingSize.call(this,type);return size;};})();CKEDITOR.dom.documentFragment=function(nodeOrDoc){nodeOrDoc=nodeOrDoc||CKEDITOR.document;if(nodeOrDoc.type==CKEDITOR.NODE_DOCUMENT)
this.$=nodeOrDoc.$.createDocumentFragment();else
this.$=nodeOrDoc;};CKEDITOR.tools.extend(CKEDITOR.dom.documentFragment.prototype,CKEDITOR.dom.element.prototype,{type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,insertAfterNode:function(node){node=node.$;node.parentNode.insertBefore(this.$,node.nextSibling);},getHtml:function(){var container=new CKEDITOR.dom.element('div');this.clone(1,1).appendTo(container);return container.getHtml().replace(/\s*data-cke-expando=".*?"/g,'');}},true,{'append':1,'appendBogus':1,'clone':1,'getFirst':1,'getHtml':1,'getLast':1,'getParent':1,'getNext':1,'getPrevious':1,'appendTo':1,'moveChildren':1,'insertBefore':1,'insertAfterNode':1,'replace':1,'trim':1,'type':1,'ltrim':1,'rtrim':1,'getDocument':1,'getChildCount':1,'getChild':1,'getChildren':1});(function(){function iterate(rtl,breakOnFalse){var range=this.range;if(this._.end)
return null;if(!this._.start){this._.start=1;if(range.collapsed){this.end();return null;}
range.optimize();}
var node,startCt=range.startContainer,endCt=range.endContainer,startOffset=range.startOffset,endOffset=range.endOffset,guard,userGuard=this.guard,type=this.type,getSourceNodeFn=(rtl?'getPreviousSourceNode':'getNextSourceNode');if(!rtl&&!this._.guardLTR){var limitLTR=endCt.type==CKEDITOR.NODE_ELEMENT?endCt:endCt.getParent();var blockerLTR=endCt.type==CKEDITOR.NODE_ELEMENT?endCt.getChild(endOffset):endCt.getNext();this._.guardLTR=function(node,movingOut){return((!movingOut||!limitLTR.equals(node))&&(!blockerLTR||!node.equals(blockerLTR))&&(node.type!=CKEDITOR.NODE_ELEMENT||!movingOut||!node.equals(range.root)));};}
if(rtl&&!this._.guardRTL){var limitRTL=startCt.type==CKEDITOR.NODE_ELEMENT?startCt:startCt.getParent();var blockerRTL=startCt.type==CKEDITOR.NODE_ELEMENT?startOffset?startCt.getChild(startOffset-1):null:startCt.getPrevious();this._.guardRTL=function(node,movingOut){return((!movingOut||!limitRTL.equals(node))&&(!blockerRTL||!node.equals(blockerRTL))&&(node.type!=CKEDITOR.NODE_ELEMENT||!movingOut||!node.equals(range.root)));};}
var stopGuard=rtl?this._.guardRTL:this._.guardLTR;if(userGuard){guard=function(node,movingOut){if(stopGuard(node,movingOut)===false)
return false;return userGuard(node,movingOut);};}else{guard=stopGuard;}
if(this.current)
node=this.current[getSourceNodeFn](false,type,guard);else{if(rtl){node=endCt;if(node.type==CKEDITOR.NODE_ELEMENT){if(endOffset>0)
node=node.getChild(endOffset-1);else
node=(guard(node,true)===false)?null:node.getPreviousSourceNode(true,type,guard);}}else{node=startCt;if(node.type==CKEDITOR.NODE_ELEMENT){if(!(node=node.getChild(startOffset)))
node=(guard(startCt,true)===false)?null:startCt.getNextSourceNode(true,type,guard);}}
if(node&&guard(node)===false)
node=null;}
while(node&&!this._.end){this.current=node;if(!this.evaluator||this.evaluator(node)!==false){if(!breakOnFalse)
return node;}else if(breakOnFalse&&this.evaluator){return false;}
node=node[getSourceNodeFn](false,type,guard);}
this.end();return this.current=null;}
function iterateToLast(rtl){var node,last=null;while((node=iterate.call(this,rtl)))
last=node;return last;}
CKEDITOR.dom.walker=CKEDITOR.tools.createClass({$:function(range){this.range=range;this._={};},proto:{end:function(){this._.end=1;},next:function(){return iterate.call(this);},previous:function(){return iterate.call(this,1);},checkForward:function(){return iterate.call(this,0,1)!==false;},checkBackward:function(){return iterate.call(this,1,1)!==false;},lastForward:function(){return iterateToLast.call(this);},lastBackward:function(){return iterateToLast.call(this,1);},reset:function(){delete this.current;this._={};}}});var blockBoundaryDisplayMatch={block:1,'list-item':1,table:1,'table-row-group':1,'table-header-group':1,'table-footer-group':1,'table-row':1,'table-column-group':1,'table-column':1,'table-cell':1,'table-caption':1},outOfFlowPositions={absolute:1,fixed:1};CKEDITOR.dom.element.prototype.isBlockBoundary=function(customNodeNames){var inPageFlow=this.getComputedStyle('float')=='none'&&!(this.getComputedStyle('position')in outOfFlowPositions);if(inPageFlow&&blockBoundaryDisplayMatch[this.getComputedStyle('display')])
return true;return!!(this.is(CKEDITOR.dtd.$block)||customNodeNames&&this.is(customNodeNames));};CKEDITOR.dom.walker.blockBoundary=function(customNodeNames){return function(node){return!(node.type==CKEDITOR.NODE_ELEMENT&&node.isBlockBoundary(customNodeNames));};};CKEDITOR.dom.walker.listItemBoundary=function(){return this.blockBoundary({br:1});};CKEDITOR.dom.walker.bookmark=function(contentOnly,isReject){function isBookmarkNode(node){return(node&&node.getName&&node.getName()=='span'&&node.data('cke-bookmark'));}
return function(node){var isBookmark,parent;isBookmark=(node&&node.type!=CKEDITOR.NODE_ELEMENT&&(parent=node.getParent())&&isBookmarkNode(parent));isBookmark=contentOnly?isBookmark:isBookmark||isBookmarkNode(node);return!!(isReject^isBookmark);};};CKEDITOR.dom.walker.whitespaces=function(isReject){return function(node){var isWhitespace;if(node&&node.type==CKEDITOR.NODE_TEXT){isWhitespace=!CKEDITOR.tools.trim(node.getText())||CKEDITOR.env.webkit&&node.getText()=='\u200b';}
return!!(isReject^isWhitespace);};};CKEDITOR.dom.walker.invisible=function(isReject){var whitespace=CKEDITOR.dom.walker.whitespaces(),offsetWidth0=CKEDITOR.env.webkit?1:0;return function(node){var invisible;if(whitespace(node))
invisible=1;else{if(node.type==CKEDITOR.NODE_TEXT)
node=node.getParent();invisible=node.$.offsetWidth<=offsetWidth0;}
return!!(isReject^invisible);};};CKEDITOR.dom.walker.nodeType=function(type,isReject){return function(node){return!!(isReject^(node.type==type));};};CKEDITOR.dom.walker.bogus=function(isReject){function nonEmpty(node){return!isWhitespaces(node)&&!isBookmark(node);}
return function(node){var isBogus=CKEDITOR.env.needsBrFiller?node.is&&node.is('br'):node.getText&&tailNbspRegex.test(node.getText());if(isBogus){var parent=node.getParent(),next=node.getNext(nonEmpty);isBogus=parent.isBlockBoundary()&&(!next||next.type==CKEDITOR.NODE_ELEMENT&&next.isBlockBoundary());}
return!!(isReject^isBogus);};};CKEDITOR.dom.walker.temp=function(isReject){return function(node){if(node.type!=CKEDITOR.NODE_ELEMENT)
node=node.getParent();var isTemp=node&&node.hasAttribute('data-cke-temp');return!!(isReject^isTemp);};};var tailNbspRegex=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,isWhitespaces=CKEDITOR.dom.walker.whitespaces(),isBookmark=CKEDITOR.dom.walker.bookmark(),isTemp=CKEDITOR.dom.walker.temp(),toSkip=function(node){return isBookmark(node)||isWhitespaces(node)||node.type==CKEDITOR.NODE_ELEMENT&&node.is(CKEDITOR.dtd.$inline)&&!node.is(CKEDITOR.dtd.$empty);};CKEDITOR.dom.walker.ignored=function(isReject){return function(node){var isIgnored=isWhitespaces(node)||isBookmark(node)||isTemp(node);return!!(isReject^isIgnored);};};var isIgnored=CKEDITOR.dom.walker.ignored();CKEDITOR.dom.walker.empty=function(isReject){return function(node){var i=0,l=node.getChildCount();for(;i<l;++i){if(!isIgnored(node.getChild(i))){return!!isReject;}}
return!isReject;};};var isEmpty=CKEDITOR.dom.walker.empty();function filterTextContainers(dtd){var hash={},name;for(name in dtd){if(CKEDITOR.dtd[name]['#'])
hash[name]=1;}
return hash;}
var validEmptyBlocks=CKEDITOR.dom.walker.validEmptyBlockContainers=CKEDITOR.tools.extend(filterTextContainers(CKEDITOR.dtd.$block),{caption:1,td:1,th:1});function isEditable(node){if(isIgnored(node))
return false;if(node.type==CKEDITOR.NODE_TEXT)
return true;if(node.type==CKEDITOR.NODE_ELEMENT){if(node.is(CKEDITOR.dtd.$inline)||node.is('hr')||node.getAttribute('contenteditable')=='false')
return true;if(!CKEDITOR.env.needsBrFiller&&node.is(validEmptyBlocks)&&isEmpty(node))
return true;}
return false;}
CKEDITOR.dom.walker.editable=function(isReject){return function(node){return!!(isReject^isEditable(node));};};CKEDITOR.dom.element.prototype.getBogus=function(){var tail=this;do{tail=tail.getPreviousSourceNode();}
while(toSkip(tail));if(tail&&(CKEDITOR.env.needsBrFiller?tail.is&&tail.is('br'):tail.getText&&tailNbspRegex.test(tail.getText())))
return tail;return false;};})();CKEDITOR.dom.range=function(root){this.startContainer=null;this.startOffset=null;this.endContainer=null;this.endOffset=null;this.collapsed=true;var isDocRoot=root instanceof CKEDITOR.dom.document;this.document=isDocRoot?root:root.getDocument();this.root=isDocRoot?root.getBody():root;};(function(){function updateCollapsed(range){range.collapsed=(range.startContainer&&range.endContainer&&range.startContainer.equals(range.endContainer)&&range.startOffset==range.endOffset);}
function execContentsAction(range,action,docFrag,mergeThen,cloneId){'use strict';range.optimizeBookmark();var isDelete=action===0;var isExtract=action==1;var isClone=action==2;var doClone=isClone||isExtract;var startNode=range.startContainer;var endNode=range.endContainer;var startOffset=range.startOffset;var endOffset=range.endOffset;var cloneStartNode;var cloneEndNode;var doNotRemoveStartNode;var doNotRemoveEndNode;var cloneStartText;var cloneEndText;if(isClone&&endNode.type==CKEDITOR.NODE_TEXT&&startNode.equals(endNode)){startNode=range.document.createText(startNode.substring(startOffset,endOffset));docFrag.append(startNode);return;}
if(endNode.type==CKEDITOR.NODE_TEXT){if(!isClone){endNode=endNode.split(endOffset);}else{cloneEndText=true;}}else{if(endNode.getChildCount()>0){if(endOffset>=endNode.getChildCount()){endNode=endNode.getChild(endOffset-1);cloneEndNode=true;}else{endNode=endNode.getChild(endOffset);}}
else{cloneEndNode=true;doNotRemoveEndNode=true;}}
if(startNode.type==CKEDITOR.NODE_TEXT){if(!isClone){startNode.split(startOffset);}else{cloneStartText=true;}}else{if(startNode.getChildCount()>0){if(startOffset===0){startNode=startNode.getChild(startOffset);cloneStartNode=true;}else{startNode=startNode.getChild(startOffset-1);}}
else{cloneStartNode=true;doNotRemoveStartNode=true;}}
var startParents=startNode.getParents(),endParents=endNode.getParents(),minLevel=findMinLevel(),maxLevelLeft=startParents.length-1,maxLevelRight=endParents.length-1,levelParent=docFrag,nextLevelParent,leftNode,rightNode,nextSibling,lastConnectedLevel=-1;for(var level=minLevel;level<=maxLevelLeft;level++){leftNode=startParents[level];nextSibling=leftNode.getNext();if(level==maxLevelLeft&&!(leftNode.equals(endParents[level])&&maxLevelLeft<maxLevelRight)){if(cloneStartNode){consume(leftNode,levelParent,false,doNotRemoveStartNode);}else if(cloneStartText){levelParent.append(range.document.createText(leftNode.substring(startOffset)));}}else if(doClone){nextLevelParent=levelParent.append(leftNode.clone(0,cloneId));}
while(nextSibling){if(nextSibling.equals(endParents[level])){lastConnectedLevel=level;break;}
nextSibling=consume(nextSibling,levelParent);}
levelParent=nextLevelParent;}
levelParent=docFrag;for(level=minLevel;level<=maxLevelRight;level++){rightNode=endParents[level];nextSibling=rightNode.getPrevious();if(!rightNode.equals(startParents[level])){if(level==maxLevelRight&&!(rightNode.equals(startParents[level])&&maxLevelRight<maxLevelLeft)){if(cloneEndNode){consume(rightNode,levelParent,false,doNotRemoveEndNode);}else if(cloneEndText){levelParent.append(range.document.createText(rightNode.substring(0,endOffset)));}}else if(doClone){nextLevelParent=levelParent.append(rightNode.clone(0,cloneId));}
if(level>lastConnectedLevel){while(nextSibling){nextSibling=consume(nextSibling,levelParent,true);}}
levelParent=nextLevelParent;}else if(doClone){levelParent=levelParent.getChild(0);}}
if(!isClone){mergeAndUpdate();}
function consume(node,newParent,toStart,forceClone){var nextSibling=toStart?node.getPrevious():node.getNext();if(forceClone&&isDelete){return nextSibling;}
if(isClone||forceClone){newParent.append(node.clone(true,cloneId),toStart);}else{node.remove();if(isExtract){newParent.append(node);}}
return nextSibling;}
function findMinLevel(){var i,topStart,topEnd,maxLevel=Math.min(startParents.length,endParents.length);for(i=0;i<maxLevel;i++){topStart=startParents[i];topEnd=endParents[i];if(!topStart.equals(topEnd)){return i;}}
return i-1;}
function mergeAndUpdate(){var commonLevel=minLevel-1,boundariesInEmptyNode=doNotRemoveStartNode&&doNotRemoveEndNode&&!startNode.equals(endNode);if(commonLevel<(maxLevelLeft-1)||commonLevel<(maxLevelRight-1)||boundariesInEmptyNode){if(boundariesInEmptyNode){range.moveToPosition(endNode,CKEDITOR.POSITION_BEFORE_START);}else if((maxLevelRight==commonLevel+1)&&cloneEndNode){range.moveToPosition(endParents[commonLevel],CKEDITOR.POSITION_BEFORE_END);}else{range.moveToPosition(endParents[commonLevel+1],CKEDITOR.POSITION_BEFORE_START);}
if(mergeThen){var topLeft=startParents[commonLevel+1];if(topLeft&&topLeft.type==CKEDITOR.NODE_ELEMENT){var span=CKEDITOR.dom.element.createFromHtml('<span '+'data-cke-bookmark="1" style="display:none">&nbsp;</span>',range.document);span.insertAfter(topLeft);topLeft.mergeSiblings(false);range.moveToBookmark({startNode:span});}}}else{range.collapse(true);}}}
var inlineChildReqElements={abbr:1,acronym:1,b:1,bdo:1,big:1,cite:1,code:1,del:1,dfn:1,em:1,font:1,i:1,ins:1,label:1,kbd:1,q:1,samp:1,small:1,span:1,strike:1,strong:1,sub:1,sup:1,tt:1,u:1,'var':1};function getCheckStartEndBlockEvalFunction(){var skipBogus=false,whitespaces=CKEDITOR.dom.walker.whitespaces(),bookmarkEvaluator=CKEDITOR.dom.walker.bookmark(true),isBogus=CKEDITOR.dom.walker.bogus();return function(node){if(bookmarkEvaluator(node)||whitespaces(node))
return true;if(isBogus(node)&&!skipBogus){skipBogus=true;return true;}
if(node.type==CKEDITOR.NODE_TEXT&&(node.hasAscendant('pre')||CKEDITOR.tools.trim(node.getText()).length)){return false;}
if(node.type==CKEDITOR.NODE_ELEMENT&&!node.is(inlineChildReqElements))
return false;return true;};}
var isBogus=CKEDITOR.dom.walker.bogus(),nbspRegExp=/^[\t\r\n ]*(?:&nbsp;|\xa0)$/,editableEval=CKEDITOR.dom.walker.editable(),notIgnoredEval=CKEDITOR.dom.walker.ignored(true);function elementBoundaryEval(checkStart){var whitespaces=CKEDITOR.dom.walker.whitespaces(),bookmark=CKEDITOR.dom.walker.bookmark(1);return function(node){if(bookmark(node)||whitespaces(node))
return true;return!checkStart&&isBogus(node)||node.type==CKEDITOR.NODE_ELEMENT&&node.is(CKEDITOR.dtd.$removeEmpty);};}
function getNextEditableNode(isPrevious){return function(){var first;return this[isPrevious?'getPreviousNode':'getNextNode'](function(node){if(!first&&notIgnoredEval(node))
first=node;return editableEval(node)&&!(isBogus(node)&&node.equals(first));});};}
CKEDITOR.dom.range.prototype={clone:function(){var clone=new CKEDITOR.dom.range(this.root);clone._setStartContainer(this.startContainer);clone.startOffset=this.startOffset;clone._setEndContainer(this.endContainer);clone.endOffset=this.endOffset;clone.collapsed=this.collapsed;return clone;},collapse:function(toStart){if(toStart){this._setEndContainer(this.startContainer);this.endOffset=this.startOffset;}else{this._setStartContainer(this.endContainer);this.startOffset=this.endOffset;}
this.collapsed=true;},cloneContents:function(cloneId){var docFrag=new CKEDITOR.dom.documentFragment(this.document);cloneId=typeof cloneId=='undefined'?true:cloneId;if(!this.collapsed)
execContentsAction(this,2,docFrag,false,cloneId);return docFrag;},deleteContents:function(mergeThen){if(this.collapsed)
return;execContentsAction(this,0,null,mergeThen);},extractContents:function(mergeThen,cloneId){var docFrag=new CKEDITOR.dom.documentFragment(this.document);cloneId=typeof cloneId=='undefined'?true:cloneId;if(!this.collapsed)
execContentsAction(this,1,docFrag,mergeThen,cloneId);return docFrag;},createBookmark:function(serializable){var startNode,endNode;var baseId;var clone;var collapsed=this.collapsed;startNode=this.document.createElement('span');startNode.data('cke-bookmark',1);startNode.setStyle('display','none');startNode.setHtml('&nbsp;');if(serializable){baseId='cke_bm_'+CKEDITOR.tools.getNextNumber();startNode.setAttribute('id',baseId+(collapsed?'C':'S'));}
if(!collapsed){endNode=startNode.clone();endNode.setHtml('&nbsp;');if(serializable)
endNode.setAttribute('id',baseId+'E');clone=this.clone();clone.collapse();clone.insertNode(endNode);}
clone=this.clone();clone.collapse(true);clone.insertNode(startNode);if(endNode){this.setStartAfter(startNode);this.setEndBefore(endNode);}else{this.moveToPosition(startNode,CKEDITOR.POSITION_AFTER_END);}
return{startNode:serializable?baseId+(collapsed?'C':'S'):startNode,endNode:serializable?baseId+'E':endNode,serializable:serializable,collapsed:collapsed};},createBookmark2:(function(){var isNotText=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_TEXT,true);function betweenTextNodes(container,offset){if(container.type!=CKEDITOR.NODE_ELEMENT||offset===0||offset==container.getChildCount())
return 0;return container.getChild(offset-1).type==CKEDITOR.NODE_TEXT&&container.getChild(offset).type==CKEDITOR.NODE_TEXT;}
function getLengthOfPrecedingTextNodes(node){var sum=0;while((node=node.getPrevious())&&node.type==CKEDITOR.NODE_TEXT)
sum+=node.getLength();return sum;}
function normalize(limit){var container=limit.container,offset=limit.offset;if(betweenTextNodes(container,offset)){container=container.getChild(offset-1);offset=container.getLength();}
if(container.type==CKEDITOR.NODE_ELEMENT&&offset>1)
offset=container.getChild(offset-1).getIndex(true)+1;if(container.type==CKEDITOR.NODE_TEXT){var precedingLength=getLengthOfPrecedingTextNodes(container);if(container.getText()){offset+=precedingLength;}else{var precedingContainer=container.getPrevious(isNotText);if(precedingLength){offset=precedingLength;if(precedingContainer){container=precedingContainer.getNext();}else{container=container.getParent().getFirst();}}else{container=container.getParent();offset=precedingContainer?(precedingContainer.getIndex(true)+1):0;}}}
limit.container=container;limit.offset=offset;}
return function(normalized){var collapsed=this.collapsed,bmStart={container:this.startContainer,offset:this.startOffset},bmEnd={container:this.endContainer,offset:this.endOffset};if(normalized){normalize(bmStart);if(!collapsed)
normalize(bmEnd);}
return{start:bmStart.container.getAddress(normalized),end:collapsed?null:bmEnd.container.getAddress(normalized),startOffset:bmStart.offset,endOffset:bmEnd.offset,normalized:normalized,collapsed:collapsed,is2:true};};})(),moveToBookmark:function(bookmark){if(bookmark.is2){var startContainer=this.document.getByAddress(bookmark.start,bookmark.normalized),startOffset=bookmark.startOffset;var endContainer=bookmark.end&&this.document.getByAddress(bookmark.end,bookmark.normalized),endOffset=bookmark.endOffset;this.setStart(startContainer,startOffset);if(endContainer)
this.setEnd(endContainer,endOffset);else
this.collapse(true);}
else{var serializable=bookmark.serializable,startNode=serializable?this.document.getById(bookmark.startNode):bookmark.startNode,endNode=serializable?this.document.getById(bookmark.endNode):bookmark.endNode;this.setStartBefore(startNode);startNode.remove();if(endNode){this.setEndBefore(endNode);endNode.remove();}else{this.collapse(true);}}},getBoundaryNodes:function(){var startNode=this.startContainer,endNode=this.endContainer,startOffset=this.startOffset,endOffset=this.endOffset,childCount;if(startNode.type==CKEDITOR.NODE_ELEMENT){childCount=startNode.getChildCount();if(childCount>startOffset){startNode=startNode.getChild(startOffset);}else if(childCount<1){startNode=startNode.getPreviousSourceNode();}
else{startNode=startNode.$;while(startNode.lastChild)
startNode=startNode.lastChild;startNode=new CKEDITOR.dom.node(startNode);startNode=startNode.getNextSourceNode()||startNode;}}
if(endNode.type==CKEDITOR.NODE_ELEMENT){childCount=endNode.getChildCount();if(childCount>endOffset){endNode=endNode.getChild(endOffset).getPreviousSourceNode(true);}else if(childCount<1){endNode=endNode.getPreviousSourceNode();}
else{endNode=endNode.$;while(endNode.lastChild)
endNode=endNode.lastChild;endNode=new CKEDITOR.dom.node(endNode);}}
if(startNode.getPosition(endNode)&CKEDITOR.POSITION_FOLLOWING)
startNode=endNode;return{startNode:startNode,endNode:endNode};},getCommonAncestor:function(includeSelf,ignoreTextNode){var start=this.startContainer,end=this.endContainer,ancestor;if(start.equals(end)){if(includeSelf&&start.type==CKEDITOR.NODE_ELEMENT&&this.startOffset==this.endOffset-1)
ancestor=start.getChild(this.startOffset);else
ancestor=start;}else{ancestor=start.getCommonAncestor(end);}
return ignoreTextNode&&!ancestor.is?ancestor.getParent():ancestor;},optimize:function(){var container=this.startContainer;var offset=this.startOffset;if(container.type!=CKEDITOR.NODE_ELEMENT){if(!offset)
this.setStartBefore(container);else if(offset>=container.getLength())
this.setStartAfter(container);}
container=this.endContainer;offset=this.endOffset;if(container.type!=CKEDITOR.NODE_ELEMENT){if(!offset)
this.setEndBefore(container);else if(offset>=container.getLength())
this.setEndAfter(container);}},optimizeBookmark:function(){var startNode=this.startContainer,endNode=this.endContainer;if(startNode.is&&startNode.is('span')&&startNode.data('cke-bookmark'))
this.setStartAt(startNode,CKEDITOR.POSITION_BEFORE_START);if(endNode&&endNode.is&&endNode.is('span')&&endNode.data('cke-bookmark'))
this.setEndAt(endNode,CKEDITOR.POSITION_AFTER_END);},trim:function(ignoreStart,ignoreEnd){var startContainer=this.startContainer,startOffset=this.startOffset,collapsed=this.collapsed;if((!ignoreStart||collapsed)&&startContainer&&startContainer.type==CKEDITOR.NODE_TEXT){if(!startOffset){startOffset=startContainer.getIndex();startContainer=startContainer.getParent();}
else if(startOffset>=startContainer.getLength()){startOffset=startContainer.getIndex()+1;startContainer=startContainer.getParent();}
else{var nextText=startContainer.split(startOffset);startOffset=startContainer.getIndex()+1;startContainer=startContainer.getParent();if(this.startContainer.equals(this.endContainer))
this.setEnd(nextText,this.endOffset-this.startOffset);else if(startContainer.equals(this.endContainer))
this.endOffset+=1;}
this.setStart(startContainer,startOffset);if(collapsed){this.collapse(true);return;}}
var endContainer=this.endContainer;var endOffset=this.endOffset;if(!(ignoreEnd||collapsed)&&endContainer&&endContainer.type==CKEDITOR.NODE_TEXT){if(!endOffset){endOffset=endContainer.getIndex();endContainer=endContainer.getParent();}
else if(endOffset>=endContainer.getLength()){endOffset=endContainer.getIndex()+1;endContainer=endContainer.getParent();}
else{endContainer.split(endOffset);endOffset=endContainer.getIndex()+1;endContainer=endContainer.getParent();}
this.setEnd(endContainer,endOffset);}},enlarge:function(unit,excludeBrs){var leadingWhitespaceRegex=new RegExp(/[^\s\ufeff]/);switch(unit){case CKEDITOR.ENLARGE_INLINE:var enlargeInlineOnly=1;case CKEDITOR.ENLARGE_ELEMENT:if(this.collapsed)
return;var commonAncestor=this.getCommonAncestor();var boundary=this.root;var startTop,endTop;var enlargeable,sibling,commonReached;var needsWhiteSpace=false;var isWhiteSpace;var siblingText;var container=this.startContainer;var offset=this.startOffset;if(container.type==CKEDITOR.NODE_TEXT){if(offset){container=!CKEDITOR.tools.trim(container.substring(0,offset)).length&&container;needsWhiteSpace=!!container;}
if(container){if(!(sibling=container.getPrevious()))
enlargeable=container.getParent();}}else{if(offset)
sibling=container.getChild(offset-1)||container.getLast();if(!sibling)
enlargeable=container;}
enlargeable=getValidEnlargeable(enlargeable);while(enlargeable||sibling){if(enlargeable&&!sibling){if(!commonReached&&enlargeable.equals(commonAncestor))
commonReached=true;if(enlargeInlineOnly?enlargeable.isBlockBoundary():!boundary.contains(enlargeable))
break;if(!needsWhiteSpace||enlargeable.getComputedStyle('display')!='inline'){needsWhiteSpace=false;if(commonReached)
startTop=enlargeable;else
this.setStartBefore(enlargeable);}
sibling=enlargeable.getPrevious();}
while(sibling){isWhiteSpace=false;if(sibling.type==CKEDITOR.NODE_COMMENT){sibling=sibling.getPrevious();continue;}else if(sibling.type==CKEDITOR.NODE_TEXT){siblingText=sibling.getText();if(leadingWhitespaceRegex.test(siblingText))
sibling=null;isWhiteSpace=/[\s\ufeff]$/.test(siblingText);}else{var offsetWidth0=CKEDITOR.env.webkit?1:0;if((sibling.$.offsetWidth>offsetWidth0||excludeBrs&&sibling.is('br'))&&!sibling.data('cke-bookmark')){if(needsWhiteSpace&&CKEDITOR.dtd.$removeEmpty[sibling.getName()]){siblingText=sibling.getText();if(leadingWhitespaceRegex.test(siblingText))
sibling=null;else{var allChildren=sibling.$.getElementsByTagName('*');for(var i=0,child;child=allChildren[i++];){if(!CKEDITOR.dtd.$removeEmpty[child.nodeName.toLowerCase()]){sibling=null;break;}}}
if(sibling)
isWhiteSpace=!!siblingText.length;}else{sibling=null;}}}
if(isWhiteSpace){if(needsWhiteSpace){if(commonReached)
startTop=enlargeable;else if(enlargeable)
this.setStartBefore(enlargeable);}else{needsWhiteSpace=true;}}
if(sibling){var next=sibling.getPrevious();if(!enlargeable&&!next){enlargeable=sibling;sibling=null;break;}
sibling=next;}else{enlargeable=null;}}
if(enlargeable)
enlargeable=getValidEnlargeable(enlargeable.getParent());}
container=this.endContainer;offset=this.endOffset;enlargeable=sibling=null;commonReached=needsWhiteSpace=false;function onlyWhiteSpaces(startContainer,startOffset){var walkerRange=new CKEDITOR.dom.range(boundary);walkerRange.setStart(startContainer,startOffset);walkerRange.setEndAt(boundary,CKEDITOR.POSITION_BEFORE_END);var walker=new CKEDITOR.dom.walker(walkerRange),node;walker.guard=function(node){return!(node.type==CKEDITOR.NODE_ELEMENT&&node.isBlockBoundary());};while((node=walker.next())){if(node.type!=CKEDITOR.NODE_TEXT){return false;}else{if(node!=startContainer)
siblingText=node.getText();else
siblingText=node.substring(startOffset);if(leadingWhitespaceRegex.test(siblingText))
return false;}}
return true;}
if(container.type==CKEDITOR.NODE_TEXT){if(CKEDITOR.tools.trim(container.substring(offset)).length){needsWhiteSpace=true;}else{needsWhiteSpace=!container.getLength();if(offset==container.getLength()){if(!(sibling=container.getNext()))
enlargeable=container.getParent();}else{if(onlyWhiteSpaces(container,offset))
enlargeable=container.getParent();}}}else{sibling=container.getChild(offset);if(!sibling)
enlargeable=container;}
while(enlargeable||sibling){if(enlargeable&&!sibling){if(!commonReached&&enlargeable.equals(commonAncestor))
commonReached=true;if(enlargeInlineOnly?enlargeable.isBlockBoundary():!boundary.contains(enlargeable))
break;if(!needsWhiteSpace||enlargeable.getComputedStyle('display')!='inline'){needsWhiteSpace=false;if(commonReached)
endTop=enlargeable;else if(enlargeable)
this.setEndAfter(enlargeable);}
sibling=enlargeable.getNext();}
while(sibling){isWhiteSpace=false;if(sibling.type==CKEDITOR.NODE_TEXT){siblingText=sibling.getText();if(!onlyWhiteSpaces(sibling,0))
sibling=null;isWhiteSpace=/^[\s\ufeff]/.test(siblingText);}else if(sibling.type==CKEDITOR.NODE_ELEMENT){if((sibling.$.offsetWidth>0||excludeBrs&&sibling.is('br'))&&!sibling.data('cke-bookmark')){if(needsWhiteSpace&&CKEDITOR.dtd.$removeEmpty[sibling.getName()]){siblingText=sibling.getText();if(leadingWhitespaceRegex.test(siblingText))
sibling=null;else{allChildren=sibling.$.getElementsByTagName('*');for(i=0;child=allChildren[i++];){if(!CKEDITOR.dtd.$removeEmpty[child.nodeName.toLowerCase()]){sibling=null;break;}}}
if(sibling)
isWhiteSpace=!!siblingText.length;}else{sibling=null;}}}else{isWhiteSpace=1;}
if(isWhiteSpace){if(needsWhiteSpace){if(commonReached)
endTop=enlargeable;else
this.setEndAfter(enlargeable);}}
if(sibling){next=sibling.getNext();if(!enlargeable&&!next){enlargeable=sibling;sibling=null;break;}
sibling=next;}else{enlargeable=null;}}
if(enlargeable)
enlargeable=getValidEnlargeable(enlargeable.getParent());}
if(startTop&&endTop){commonAncestor=startTop.contains(endTop)?endTop:startTop;this.setStartBefore(commonAncestor);this.setEndAfter(commonAncestor);}
break;case CKEDITOR.ENLARGE_BLOCK_CONTENTS:case CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:var walkerRange=new CKEDITOR.dom.range(this.root);boundary=this.root;walkerRange.setStartAt(boundary,CKEDITOR.POSITION_AFTER_START);walkerRange.setEnd(this.startContainer,this.startOffset);var walker=new CKEDITOR.dom.walker(walkerRange),blockBoundary,tailBr,notBlockBoundary=CKEDITOR.dom.walker.blockBoundary((unit==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS)?{br:1}:null),inNonEditable=null,boundaryGuard=function(node){if(node.type==CKEDITOR.NODE_ELEMENT&&node.getAttribute('contenteditable')=='false'){if(inNonEditable){if(inNonEditable.equals(node)){inNonEditable=null;return;}}else{inNonEditable=node;}}else if(inNonEditable){return;}
var retval=notBlockBoundary(node);if(!retval)
blockBoundary=node;return retval;},tailBrGuard=function(node){var retval=boundaryGuard(node);if(!retval&&node.is&&node.is('br'))
tailBr=node;return retval;};walker.guard=boundaryGuard;enlargeable=walker.lastBackward();blockBoundary=blockBoundary||boundary;this.setStartAt(blockBoundary,!blockBoundary.is('br')&&(!enlargeable&&this.checkStartOfBlock()||enlargeable&&blockBoundary.contains(enlargeable))?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_AFTER_END);if(unit==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS){var theRange=this.clone();walker=new CKEDITOR.dom.walker(theRange);var whitespaces=CKEDITOR.dom.walker.whitespaces(),bookmark=CKEDITOR.dom.walker.bookmark();walker.evaluator=function(node){return!whitespaces(node)&&!bookmark(node);};var previous=walker.previous();if(previous&&previous.type==CKEDITOR.NODE_ELEMENT&&previous.is('br'))
return;}
walkerRange=this.clone();walkerRange.collapse();walkerRange.setEndAt(boundary,CKEDITOR.POSITION_BEFORE_END);walker=new CKEDITOR.dom.walker(walkerRange);walker.guard=(unit==CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS)?tailBrGuard:boundaryGuard;blockBoundary=inNonEditable=tailBr=null;enlargeable=walker.lastForward();blockBoundary=blockBoundary||boundary;this.setEndAt(blockBoundary,(!enlargeable&&this.checkEndOfBlock()||enlargeable&&blockBoundary.contains(enlargeable))?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_BEFORE_START);if(tailBr){this.setEndAfter(tailBr);}}
function getValidEnlargeable(enlargeable){return enlargeable&&enlargeable.type==CKEDITOR.NODE_ELEMENT&&enlargeable.hasAttribute('contenteditable')?null:enlargeable;}},shrink:function(mode,selectContents,shrinkOnBlockBoundary){if(!this.collapsed){mode=mode||CKEDITOR.SHRINK_TEXT;var walkerRange=this.clone();var startContainer=this.startContainer,endContainer=this.endContainer,startOffset=this.startOffset,endOffset=this.endOffset;var moveStart=1,moveEnd=1;if(startContainer&&startContainer.type==CKEDITOR.NODE_TEXT){if(!startOffset)
walkerRange.setStartBefore(startContainer);else if(startOffset>=startContainer.getLength())
walkerRange.setStartAfter(startContainer);else{walkerRange.setStartBefore(startContainer);moveStart=0;}}
if(endContainer&&endContainer.type==CKEDITOR.NODE_TEXT){if(!endOffset)
walkerRange.setEndBefore(endContainer);else if(endOffset>=endContainer.getLength())
walkerRange.setEndAfter(endContainer);else{walkerRange.setEndAfter(endContainer);moveEnd=0;}}
var walker=new CKEDITOR.dom.walker(walkerRange),isBookmark=CKEDITOR.dom.walker.bookmark();walker.evaluator=function(node){return node.type==(mode==CKEDITOR.SHRINK_ELEMENT?CKEDITOR.NODE_ELEMENT:CKEDITOR.NODE_TEXT);};var currentElement;walker.guard=function(node,movingOut){if(isBookmark(node))
return true;if(mode==CKEDITOR.SHRINK_ELEMENT&&node.type==CKEDITOR.NODE_TEXT)
return false;if(movingOut&&node.equals(currentElement))
return false;if(shrinkOnBlockBoundary===false&&node.type==CKEDITOR.NODE_ELEMENT&&node.isBlockBoundary())
return false;if(node.type==CKEDITOR.NODE_ELEMENT&&node.hasAttribute('contenteditable'))
return false;if(!movingOut&&node.type==CKEDITOR.NODE_ELEMENT)
currentElement=node;return true;};if(moveStart){var textStart=walker[mode==CKEDITOR.SHRINK_ELEMENT?'lastForward':'next']();textStart&&this.setStartAt(textStart,selectContents?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_START);}
if(moveEnd){walker.reset();var textEnd=walker[mode==CKEDITOR.SHRINK_ELEMENT?'lastBackward':'previous']();textEnd&&this.setEndAt(textEnd,selectContents?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_END);}
return!!(moveStart||moveEnd);}},insertNode:function(node){this.optimizeBookmark();this.trim(false,true);var startContainer=this.startContainer;var startOffset=this.startOffset;var nextNode=startContainer.getChild(startOffset);if(nextNode)
node.insertBefore(nextNode);else
startContainer.append(node);if(node.getParent()&&node.getParent().equals(this.endContainer))
this.endOffset++;this.setStartBefore(node);},moveToPosition:function(node,position){this.setStartAt(node,position);this.collapse(true);},moveToRange:function(range){this.setStart(range.startContainer,range.startOffset);this.setEnd(range.endContainer,range.endOffset);},selectNodeContents:function(node){this.setStart(node,0);this.setEnd(node,node.type==CKEDITOR.NODE_TEXT?node.getLength():node.getChildCount());},setStart:function(startNode,startOffset){if(startNode.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[startNode.getName()])
startOffset=startNode.getIndex(),startNode=startNode.getParent();this._setStartContainer(startNode);this.startOffset=startOffset;if(!this.endContainer){this._setEndContainer(startNode);this.endOffset=startOffset;}
updateCollapsed(this);},setEnd:function(endNode,endOffset){if(endNode.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$empty[endNode.getName()])
endOffset=endNode.getIndex()+1,endNode=endNode.getParent();this._setEndContainer(endNode);this.endOffset=endOffset;if(!this.startContainer){this._setStartContainer(endNode);this.startOffset=endOffset;}
updateCollapsed(this);},setStartAfter:function(node){this.setStart(node.getParent(),node.getIndex()+1);},setStartBefore:function(node){this.setStart(node.getParent(),node.getIndex());},setEndAfter:function(node){this.setEnd(node.getParent(),node.getIndex()+1);},setEndBefore:function(node){this.setEnd(node.getParent(),node.getIndex());},setStartAt:function(node,position){switch(position){case CKEDITOR.POSITION_AFTER_START:this.setStart(node,0);break;case CKEDITOR.POSITION_BEFORE_END:if(node.type==CKEDITOR.NODE_TEXT)
this.setStart(node,node.getLength());else
this.setStart(node,node.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setStartBefore(node);break;case CKEDITOR.POSITION_AFTER_END:this.setStartAfter(node);}
updateCollapsed(this);},setEndAt:function(node,position){switch(position){case CKEDITOR.POSITION_AFTER_START:this.setEnd(node,0);break;case CKEDITOR.POSITION_BEFORE_END:if(node.type==CKEDITOR.NODE_TEXT)
this.setEnd(node,node.getLength());else
this.setEnd(node,node.getChildCount());break;case CKEDITOR.POSITION_BEFORE_START:this.setEndBefore(node);break;case CKEDITOR.POSITION_AFTER_END:this.setEndAfter(node);}
updateCollapsed(this);},fixBlock:function(isStart,blockTag){var bookmark=this.createBookmark(),fixedBlock=this.document.createElement(blockTag);this.collapse(isStart);this.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);this.extractContents().appendTo(fixedBlock);fixedBlock.trim();this.insertNode(fixedBlock);var bogus=fixedBlock.getBogus();if(bogus){bogus.remove();}
fixedBlock.appendBogus();this.moveToBookmark(bookmark);return fixedBlock;},splitBlock:function(blockTag,cloneId){var startPath=new CKEDITOR.dom.elementPath(this.startContainer,this.root),endPath=new CKEDITOR.dom.elementPath(this.endContainer,this.root);var startBlockLimit=startPath.blockLimit,endBlockLimit=endPath.blockLimit;var startBlock=startPath.block,endBlock=endPath.block;var elementPath=null;if(!startBlockLimit.equals(endBlockLimit))
return null;if(blockTag!='br'){if(!startBlock){startBlock=this.fixBlock(true,blockTag);endBlock=new CKEDITOR.dom.elementPath(this.endContainer,this.root).block;}
if(!endBlock)
endBlock=this.fixBlock(false,blockTag);}
var isStartOfBlock=startBlock&&this.checkStartOfBlock(),isEndOfBlock=endBlock&&this.checkEndOfBlock();this.deleteContents();if(startBlock&&startBlock.equals(endBlock)){if(isEndOfBlock){elementPath=new CKEDITOR.dom.elementPath(this.startContainer,this.root);this.moveToPosition(endBlock,CKEDITOR.POSITION_AFTER_END);endBlock=null;}else if(isStartOfBlock){elementPath=new CKEDITOR.dom.elementPath(this.startContainer,this.root);this.moveToPosition(startBlock,CKEDITOR.POSITION_BEFORE_START);startBlock=null;}else{endBlock=this.splitElement(startBlock,cloneId||false);if(!startBlock.is('ul','ol'))
startBlock.appendBogus();}}
return{previousBlock:startBlock,nextBlock:endBlock,wasStartOfBlock:isStartOfBlock,wasEndOfBlock:isEndOfBlock,elementPath:elementPath};},splitElement:function(toSplit,cloneId){if(!this.collapsed)
return null;this.setEndAt(toSplit,CKEDITOR.POSITION_BEFORE_END);var documentFragment=this.extractContents(false,cloneId||false);var clone=toSplit.clone(false,cloneId||false);documentFragment.appendTo(clone);clone.insertAfter(toSplit);this.moveToPosition(toSplit,CKEDITOR.POSITION_AFTER_END);return clone;},removeEmptyBlocksAtEnd:(function(){var whitespace=CKEDITOR.dom.walker.whitespaces(),bookmark=CKEDITOR.dom.walker.bookmark(false);function childEval(parent){return function(node){if(whitespace(node)||bookmark(node)||node.type==CKEDITOR.NODE_ELEMENT&&node.isEmptyInlineRemoveable()){return false;}else if(parent.is('table')&&node.is('caption')){return false;}
return true;};}
return function(atEnd){var bm=this.createBookmark();var path=this[atEnd?'endPath':'startPath']();var block=path.block||path.blockLimit,parent;while(block&&!block.equals(path.root)&&!block.getFirst(childEval(block))){parent=block.getParent();this[atEnd?'setEndAt':'setStartAt'](block,CKEDITOR.POSITION_AFTER_END);block.remove(1);block=parent;}
this.moveToBookmark(bm);};})(),startPath:function(){return new CKEDITOR.dom.elementPath(this.startContainer,this.root);},endPath:function(){return new CKEDITOR.dom.elementPath(this.endContainer,this.root);},checkBoundaryOfElement:function(element,checkType){var checkStart=(checkType==CKEDITOR.START);var walkerRange=this.clone();walkerRange.collapse(checkStart);walkerRange[checkStart?'setStartAt':'setEndAt'](element,checkStart?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=elementBoundaryEval(checkStart);return walker[checkStart?'checkBackward':'checkForward']();},checkStartOfBlock:function(){var startContainer=this.startContainer,startOffset=this.startOffset;if(CKEDITOR.env.ie&&startOffset&&startContainer.type==CKEDITOR.NODE_TEXT){var textBefore=CKEDITOR.tools.ltrim(startContainer.substring(0,startOffset));if(nbspRegExp.test(textBefore))
this.trim(0,1);}
this.trim();var path=new CKEDITOR.dom.elementPath(this.startContainer,this.root);var walkerRange=this.clone();walkerRange.collapse(true);walkerRange.setStartAt(path.block||path.blockLimit,CKEDITOR.POSITION_AFTER_START);var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=getCheckStartEndBlockEvalFunction();return walker.checkBackward();},checkEndOfBlock:function(){var endContainer=this.endContainer,endOffset=this.endOffset;if(CKEDITOR.env.ie&&endContainer.type==CKEDITOR.NODE_TEXT){var textAfter=CKEDITOR.tools.rtrim(endContainer.substring(endOffset));if(nbspRegExp.test(textAfter))
this.trim(1,0);}
this.trim();var path=new CKEDITOR.dom.elementPath(this.endContainer,this.root);var walkerRange=this.clone();walkerRange.collapse(false);walkerRange.setEndAt(path.block||path.blockLimit,CKEDITOR.POSITION_BEFORE_END);var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=getCheckStartEndBlockEvalFunction();return walker.checkForward();},getPreviousNode:function(evaluator,guard,boundary){var walkerRange=this.clone();walkerRange.collapse(1);walkerRange.setStartAt(boundary||this.root,CKEDITOR.POSITION_AFTER_START);var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=evaluator;walker.guard=guard;return walker.previous();},getNextNode:function(evaluator,guard,boundary){var walkerRange=this.clone();walkerRange.collapse();walkerRange.setEndAt(boundary||this.root,CKEDITOR.POSITION_BEFORE_END);var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=evaluator;walker.guard=guard;return walker.next();},checkReadOnly:(function(){function checkNodesEditable(node,anotherEnd){while(node){if(node.type==CKEDITOR.NODE_ELEMENT){if(node.getAttribute('contentEditable')=='false'&&!node.data('cke-editable'))
return 0;else if(node.is('html')||node.getAttribute('contentEditable')=='true'&&(node.contains(anotherEnd)||node.equals(anotherEnd)))
break;}
node=node.getParent();}
return 1;}
return function(){var startNode=this.startContainer,endNode=this.endContainer;return!(checkNodesEditable(startNode,endNode)&&checkNodesEditable(endNode,startNode));};})(),moveToElementEditablePosition:function(el,isMoveToEnd){function nextDFS(node,childOnly){var next;if(node.type==CKEDITOR.NODE_ELEMENT&&node.isEditable(false))
next=node[isMoveToEnd?'getLast':'getFirst'](notIgnoredEval);if(!childOnly&&!next)
next=node[isMoveToEnd?'getPrevious':'getNext'](notIgnoredEval);return next;}
if(el.type==CKEDITOR.NODE_ELEMENT&&!el.isEditable(false)){this.moveToPosition(el,isMoveToEnd?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);return true;}
var found=0;while(el){if(el.type==CKEDITOR.NODE_TEXT){if(isMoveToEnd&&this.endContainer&&this.checkEndOfBlock()&&nbspRegExp.test(el.getText()))
this.moveToPosition(el,CKEDITOR.POSITION_BEFORE_START);else
this.moveToPosition(el,isMoveToEnd?CKEDITOR.POSITION_AFTER_END:CKEDITOR.POSITION_BEFORE_START);found=1;break;}
if(el.type==CKEDITOR.NODE_ELEMENT){if(el.isEditable()){this.moveToPosition(el,isMoveToEnd?CKEDITOR.POSITION_BEFORE_END:CKEDITOR.POSITION_AFTER_START);found=1;}
else if(isMoveToEnd&&el.is('br')&&this.endContainer&&this.checkEndOfBlock())
this.moveToPosition(el,CKEDITOR.POSITION_BEFORE_START);else if(el.getAttribute('contenteditable')=='false'&&el.is(CKEDITOR.dtd.$block)){this.setStartBefore(el);this.setEndAfter(el);return true;}}
el=nextDFS(el,found);}
return!!found;},moveToClosestEditablePosition:function(element,isMoveForward){var range,found=0,sibling,isElement,positions=[CKEDITOR.POSITION_AFTER_END,CKEDITOR.POSITION_BEFORE_START];if(element){range=new CKEDITOR.dom.range(this.root);range.moveToPosition(element,positions[isMoveForward?0:1]);}else{range=this.clone();}
if(element&&!element.is(CKEDITOR.dtd.$block))
found=1;else{sibling=range[isMoveForward?'getNextEditableNode':'getPreviousEditableNode']();if(sibling){found=1;isElement=sibling.type==CKEDITOR.NODE_ELEMENT;if(isElement&&sibling.is(CKEDITOR.dtd.$block)&&sibling.getAttribute('contenteditable')=='false'){range.setStartAt(sibling,CKEDITOR.POSITION_BEFORE_START);range.setEndAt(sibling,CKEDITOR.POSITION_AFTER_END);}
else if(!CKEDITOR.env.needsBrFiller&&isElement&&sibling.is(CKEDITOR.dom.walker.validEmptyBlockContainers)){range.setEnd(sibling,0);range.collapse();}else{range.moveToPosition(sibling,positions[isMoveForward?1:0]);}}}
if(found)
this.moveToRange(range);return!!found;},moveToElementEditStart:function(target){return this.moveToElementEditablePosition(target);},moveToElementEditEnd:function(target){return this.moveToElementEditablePosition(target,true);},getEnclosedNode:function(){var walkerRange=this.clone();walkerRange.optimize();if(walkerRange.startContainer.type!=CKEDITOR.NODE_ELEMENT||walkerRange.endContainer.type!=CKEDITOR.NODE_ELEMENT)
return null;var walker=new CKEDITOR.dom.walker(walkerRange),isNotBookmarks=CKEDITOR.dom.walker.bookmark(false,true),isNotWhitespaces=CKEDITOR.dom.walker.whitespaces(true);walker.evaluator=function(node){return isNotWhitespaces(node)&&isNotBookmarks(node);};var node=walker.next();walker.reset();return node&&node.equals(walker.previous())?node:null;},getTouchedStartNode:function(){var container=this.startContainer;if(this.collapsed||container.type!=CKEDITOR.NODE_ELEMENT)
return container;return container.getChild(this.startOffset)||container;},getTouchedEndNode:function(){var container=this.endContainer;if(this.collapsed||container.type!=CKEDITOR.NODE_ELEMENT)
return container;return container.getChild(this.endOffset-1)||container;},getNextEditableNode:getNextEditableNode(),getPreviousEditableNode:getNextEditableNode(1),scrollIntoView:function(){var reference=new CKEDITOR.dom.element.createFromHtml('<span>&nbsp;</span>',this.document),afterCaretNode,startContainerText,isStartText;var range=this.clone();range.optimize();if(isStartText=range.startContainer.type==CKEDITOR.NODE_TEXT){startContainerText=range.startContainer.getText();afterCaretNode=range.startContainer.split(range.startOffset);reference.insertAfter(range.startContainer);}
else{range.insertNode(reference);}
reference.scrollIntoView();if(isStartText){range.startContainer.setText(startContainerText);afterCaretNode.remove();}
reference.remove();},_setStartContainer:function(startContainer){this.startContainer=startContainer;},_setEndContainer:function(endContainer){this.endContainer=endContainer;}};})();CKEDITOR.POSITION_AFTER_START=1;CKEDITOR.POSITION_BEFORE_END=2;CKEDITOR.POSITION_BEFORE_START=3;CKEDITOR.POSITION_AFTER_END=4;CKEDITOR.ENLARGE_ELEMENT=1;CKEDITOR.ENLARGE_BLOCK_CONTENTS=2;CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS=3;CKEDITOR.ENLARGE_INLINE=4;CKEDITOR.START=1;CKEDITOR.END=2;CKEDITOR.SHRINK_ELEMENT=1;CKEDITOR.SHRINK_TEXT=2;'use strict';(function(){function iterator(range){if(arguments.length<1)
return;this.range=range;this.forceBrBreak=0;this.enlargeBr=1;this.enforceRealBlocks=0;this._||(this._={});}
var beginWhitespaceRegex=/^[\r\n\t ]+$/,bookmarkGuard=CKEDITOR.dom.walker.bookmark(false,true),whitespacesGuard=CKEDITOR.dom.walker.whitespaces(true),skipGuard=function(node){return bookmarkGuard(node)&&whitespacesGuard(node);},listItemNames={dd:1,dt:1,li:1};iterator.prototype={getNextParagraph:function(blockTag){var block;var range;var isLast;var removePreviousBr,removeLastBr;blockTag=blockTag||'p';if(this._.nestedEditable){block=this._.nestedEditable.iterator.getNextParagraph(blockTag);if(block){this.activeFilter=this._.nestedEditable.iterator.activeFilter;return block;}
this.activeFilter=this.filter;if(startNestedEditableIterator(this,blockTag,this._.nestedEditable.container,this._.nestedEditable.remaining)){this.activeFilter=this._.nestedEditable.iterator.activeFilter;return this._.nestedEditable.iterator.getNextParagraph(blockTag);}else{this._.nestedEditable=null;}}
if(!this.range.root.getDtd()[blockTag])
return null;if(!this._.started)
range=startIterator.call(this);var currentNode=this._.nextNode,lastNode=this._.lastNode;this._.nextNode=null;while(currentNode){var closeRange=0,parentPre=currentNode.hasAscendant('pre');var includeNode=(currentNode.type!=CKEDITOR.NODE_ELEMENT),continueFromSibling=0;if(!includeNode){var nodeName=currentNode.getName();if(CKEDITOR.dtd.$block[nodeName]&&currentNode.getAttribute('contenteditable')=='false'){block=currentNode;startNestedEditableIterator(this,blockTag,block);break;}else if(currentNode.isBlockBoundary(this.forceBrBreak&&!parentPre&&{br:1})){if(nodeName=='br')
includeNode=1;else if(!range&&!currentNode.getChildCount()&&nodeName!='hr'){block=currentNode;isLast=currentNode.equals(lastNode);break;}
if(range){range.setEndAt(currentNode,CKEDITOR.POSITION_BEFORE_START);if(nodeName!='br'){this._.nextNode=currentNode;}}
closeRange=1;}else{if(currentNode.getFirst()){if(!range){range=this.range.clone();range.setStartAt(currentNode,CKEDITOR.POSITION_BEFORE_START);}
currentNode=currentNode.getFirst();continue;}
includeNode=1;}}else if(currentNode.type==CKEDITOR.NODE_TEXT){if(beginWhitespaceRegex.test(currentNode.getText()))
includeNode=0;}
if(includeNode&&!range){range=this.range.clone();range.setStartAt(currentNode,CKEDITOR.POSITION_BEFORE_START);}
isLast=((!closeRange||includeNode)&&currentNode.equals(lastNode));if(range&&!closeRange){while(!currentNode.getNext(skipGuard)&&!isLast){var parentNode=currentNode.getParent();if(parentNode.isBlockBoundary(this.forceBrBreak&&!parentPre&&{br:1})){closeRange=1;includeNode=0;isLast=isLast||(parentNode.equals(lastNode));range.setEndAt(parentNode,CKEDITOR.POSITION_BEFORE_END);break;}
currentNode=parentNode;includeNode=1;isLast=(currentNode.equals(lastNode));continueFromSibling=1;}}
if(includeNode)
range.setEndAt(currentNode,CKEDITOR.POSITION_AFTER_END);currentNode=this._getNextSourceNode(currentNode,continueFromSibling,lastNode);isLast=!currentNode;if(isLast||(closeRange&&range))
break;}
if(!block){if(!range){this._.docEndMarker&&this._.docEndMarker.remove();this._.nextNode=null;return null;}
var startPath=new CKEDITOR.dom.elementPath(range.startContainer,range.root);var startBlockLimit=startPath.blockLimit,checkLimits={div:1,th:1,td:1};block=startPath.block;if(!block&&startBlockLimit&&!this.enforceRealBlocks&&checkLimits[startBlockLimit.getName()]&&range.checkStartOfBlock()&&range.checkEndOfBlock()&&!startBlockLimit.equals(range.root)){block=startBlockLimit;}else if(!block||(this.enforceRealBlocks&&block.is(listItemNames))){block=this.range.document.createElement(blockTag);range.extractContents().appendTo(block);block.trim();range.insertNode(block);removePreviousBr=removeLastBr=true;}else if(block.getName()!='li'){if(!range.checkStartOfBlock()||!range.checkEndOfBlock()){block=block.clone(false);range.extractContents().appendTo(block);block.trim();var splitInfo=range.splitBlock();removePreviousBr=!splitInfo.wasStartOfBlock;removeLastBr=!splitInfo.wasEndOfBlock;range.insertNode(block);}}else if(!isLast){this._.nextNode=(block.equals(lastNode)?null:this._getNextSourceNode(range.getBoundaryNodes().endNode,1,lastNode));}}
if(removePreviousBr){var previousSibling=block.getPrevious();if(previousSibling&&previousSibling.type==CKEDITOR.NODE_ELEMENT){if(previousSibling.getName()=='br')
previousSibling.remove();else if(previousSibling.getLast()&&previousSibling.getLast().$.nodeName.toLowerCase()=='br')
previousSibling.getLast().remove();}}
if(removeLastBr){var lastChild=block.getLast();if(lastChild&&lastChild.type==CKEDITOR.NODE_ELEMENT&&lastChild.getName()=='br'){if(!CKEDITOR.env.needsBrFiller||lastChild.getPrevious(bookmarkGuard)||lastChild.getNext(bookmarkGuard))
lastChild.remove();}}
if(!this._.nextNode){this._.nextNode=(isLast||block.equals(lastNode)||!lastNode)?null:this._getNextSourceNode(block,1,lastNode);}
return block;},_getNextSourceNode:function(node,startFromSibling,lastNode){var rootNode=this.range.root,next;function guardFunction(node){return!(node.equals(lastNode)||node.equals(rootNode));}
next=node.getNextSourceNode(startFromSibling,null,guardFunction);while(!bookmarkGuard(next)){next=next.getNextSourceNode(startFromSibling,null,guardFunction);}
return next;}};function startIterator(){var range=this.range.clone(),touchPre,startPath=range.startPath(),endPath=range.endPath(),startAtInnerBoundary=!range.collapsed&&rangeAtInnerBlockBoundary(range,startPath.block),endAtInnerBoundary=!range.collapsed&&rangeAtInnerBlockBoundary(range,endPath.block,1);range.shrink(CKEDITOR.SHRINK_ELEMENT,true);if(startAtInnerBoundary)
range.setStartAt(startPath.block,CKEDITOR.POSITION_BEFORE_END);if(endAtInnerBoundary)
range.setEndAt(endPath.block,CKEDITOR.POSITION_AFTER_START);touchPre=range.endContainer.hasAscendant('pre',true)||range.startContainer.hasAscendant('pre',true);range.enlarge(this.forceBrBreak&&!touchPre||!this.enlargeBr?CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS:CKEDITOR.ENLARGE_BLOCK_CONTENTS);if(!range.collapsed){var walker=new CKEDITOR.dom.walker(range.clone()),ignoreBookmarkTextEvaluator=CKEDITOR.dom.walker.bookmark(true,true);walker.evaluator=ignoreBookmarkTextEvaluator;this._.nextNode=walker.next();walker=new CKEDITOR.dom.walker(range.clone());walker.evaluator=ignoreBookmarkTextEvaluator;var lastNode=walker.previous();this._.lastNode=lastNode.getNextSourceNode(true,null,range.root);if(this._.lastNode&&this._.lastNode.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(this._.lastNode.getText())&&this._.lastNode.getParent().isBlockBoundary()){var testRange=this.range.clone();testRange.moveToPosition(this._.lastNode,CKEDITOR.POSITION_AFTER_END);if(testRange.checkEndOfBlock()){var path=new CKEDITOR.dom.elementPath(testRange.endContainer,testRange.root),lastBlock=path.block||path.blockLimit;this._.lastNode=lastBlock.getNextSourceNode(true);}}
if(!this._.lastNode||!range.root.contains(this._.lastNode)){this._.lastNode=this._.docEndMarker=range.document.createText('');this._.lastNode.insertAfter(lastNode);}
range=null;}
this._.started=1;return range;}
function getNestedEditableIn(editablesContainer,remainingEditables){if(remainingEditables==null)
remainingEditables=findNestedEditables(editablesContainer);var editable;while((editable=remainingEditables.shift())){if(isIterableEditable(editable))
return{element:editable,remaining:remainingEditables};}
return null;}
function isIterableEditable(editable){return editable.getDtd().p;}
function findNestedEditables(container){var editables=[];container.forEach(function(element){if(element.getAttribute('contenteditable')=='true'){editables.push(element);return false;}},CKEDITOR.NODE_ELEMENT,true);return editables;}
function startNestedEditableIterator(parentIterator,blockTag,editablesContainer,remainingEditables){var editable=getNestedEditableIn(editablesContainer,remainingEditables);if(!editable)
return 0;var filter=CKEDITOR.filter.instances[editable.element.data('cke-filter')];if(filter&&!filter.check(blockTag))
return startNestedEditableIterator(parentIterator,blockTag,editablesContainer,editable.remaining);var range=new CKEDITOR.dom.range(editable.element);range.selectNodeContents(editable.element);var iterator=range.createIterator();iterator.enlargeBr=parentIterator.enlargeBr;iterator.enforceRealBlocks=parentIterator.enforceRealBlocks;iterator.activeFilter=iterator.filter=filter;parentIterator._.nestedEditable={element:editable.element,container:editablesContainer,remaining:editable.remaining,iterator:iterator};return 1;}
function rangeAtInnerBlockBoundary(range,block,checkEnd){if(!block)
return false;var testRange=range.clone();testRange.collapse(!checkEnd);return testRange.checkBoundaryOfElement(block,checkEnd?CKEDITOR.START:CKEDITOR.END);}
CKEDITOR.dom.range.prototype.createIterator=function(){return new iterator(this);};})();CKEDITOR.command=function(editor,commandDefinition){this.uiItems=[];this.exec=function(data){if(this.state==CKEDITOR.TRISTATE_DISABLED||!this.checkAllowed())
return false;if(this.editorFocus)
editor.focus();if(this.fire('exec')===false)
return true;return(commandDefinition.exec.call(this,editor,data)!==false);};this.refresh=function(editor,path){if(!this.readOnly&&editor.readOnly)
return true;if(this.context&&!path.isContextFor(this.context)){this.disable();return true;}
if(!this.checkAllowed(true)){this.disable();return true;}
if(!this.startDisabled)
this.enable();if(this.modes&&!this.modes[editor.mode])
this.disable();if(this.fire('refresh',{editor:editor,path:path})===false)
return true;return(commandDefinition.refresh&&commandDefinition.refresh.apply(this,arguments)!==false);};var allowed;this.checkAllowed=function(noCache){if(!noCache&&typeof allowed=='boolean')
return allowed;return allowed=editor.activeFilter.checkFeature(this);};CKEDITOR.tools.extend(this,commandDefinition,{modes:{wysiwyg:1},editorFocus:1,contextSensitive:!!commandDefinition.context,state:CKEDITOR.TRISTATE_DISABLED});CKEDITOR.event.call(this);};CKEDITOR.command.prototype={enable:function(){if(this.state==CKEDITOR.TRISTATE_DISABLED&&this.checkAllowed())
this.setState((!this.preserveState||(typeof this.previousState=='undefined'))?CKEDITOR.TRISTATE_OFF:this.previousState);},disable:function(){this.setState(CKEDITOR.TRISTATE_DISABLED);},setState:function(newState){if(this.state==newState)
return false;if(newState!=CKEDITOR.TRISTATE_DISABLED&&!this.checkAllowed())
return false;this.previousState=this.state;this.state=newState;this.fire('state');return true;},toggleState:function(){if(this.state==CKEDITOR.TRISTATE_OFF)
this.setState(CKEDITOR.TRISTATE_ON);else if(this.state==CKEDITOR.TRISTATE_ON)
this.setState(CKEDITOR.TRISTATE_OFF);}};CKEDITOR.event.implementOn(CKEDITOR.command.prototype);CKEDITOR.ENTER_P=1;CKEDITOR.ENTER_BR=2;CKEDITOR.ENTER_DIV=3;CKEDITOR.config={customConfig:'config.js',autoUpdateElement:true,language:'',defaultLanguage:'en',contentsLangDirection:'',enterMode:CKEDITOR.ENTER_P,forceEnterMode:false,shiftEnterMode:CKEDITOR.ENTER_BR,docType:'<!DOCTYPE html>',bodyId:'',bodyClass:'',fullPage:false,height:200,extraPlugins:'',removePlugins:'',protectedSource:[],tabIndex:0,width:'',baseFloatZIndex:10000,dialogZIndex:10010,blockedKeystrokes:[CKEDITOR.CTRL+66,CKEDITOR.CTRL+73,CKEDITOR.CTRL+85]};(function(){'use strict';var DTD=CKEDITOR.dtd,FILTER_ELEMENT_MODIFIED=1,FILTER_SKIP_TREE=2,copy=CKEDITOR.tools.copy,trim=CKEDITOR.tools.trim,TEST_VALUE='cke-test',enterModeTags=['','p','br','div'];CKEDITOR.FILTER_SKIP_TREE=FILTER_SKIP_TREE;CKEDITOR.filter=function(editorOrRules){this.allowedContent=[];this.disallowedContent=[];this.elementCallbacks=null;this.disabled=false;this.editor=null;this.id=CKEDITOR.tools.getNextNumber();this._={allowedRules:{elements:{},generic:[]},disallowedRules:{elements:{},generic:[]},transformations:{},cachedTests:{}};CKEDITOR.filter.instances[this.id]=this;if(editorOrRules instanceof CKEDITOR.editor){var editor=this.editor=editorOrRules;this.customConfig=true;var allowedContent=editor.config.allowedContent;if(allowedContent===true){this.disabled=true;return;}
if(!allowedContent)
this.customConfig=false;this.allow(allowedContent,'config',1);this.allow(editor.config.extraAllowedContent,'extra',1);this.allow(enterModeTags[editor.enterMode]+' '+enterModeTags[editor.shiftEnterMode],'default',1);this.disallow(editor.config.disallowedContent);}
else{this.customConfig=false;this.allow(editorOrRules,'default',1);}};CKEDITOR.filter.instances={};CKEDITOR.filter.prototype={allow:function(newRules,featureName,overrideCustom){if(!beforeAddingRule(this,newRules,overrideCustom))
return false;var i,ret;if(typeof newRules=='string')
newRules=parseRulesString(newRules);else if(newRules instanceof CKEDITOR.style){if(newRules.toAllowedContentRules)
return this.allow(newRules.toAllowedContentRules(this.editor),featureName,overrideCustom);newRules=convertStyleToRules(newRules);}else if(CKEDITOR.tools.isArray(newRules)){for(i=0;i<newRules.length;++i)
ret=this.allow(newRules[i],featureName,overrideCustom);return ret;}
addAndOptimizeRules(this,newRules,featureName,this.allowedContent,this._.allowedRules);return true;},applyTo:function(fragment,toHtml,transformOnly,enterMode){if(this.disabled)
return false;var that=this,toBeRemoved=[],protectedRegexs=this.editor&&this.editor.config.protectedSource,processRetVal,isModified=false,filterOpts={doFilter:!transformOnly,doTransform:true,doCallbacks:true,toHtml:toHtml};fragment.forEach(function(el){if(el.type==CKEDITOR.NODE_ELEMENT){if(el.attributes['data-cke-filter']=='off')
return false;if(toHtml&&el.name=='span'&&~CKEDITOR.tools.objectKeys(el.attributes).join('|').indexOf('data-cke-'))
return;processRetVal=processElement(that,el,toBeRemoved,filterOpts);if(processRetVal&FILTER_ELEMENT_MODIFIED)
isModified=true;else if(processRetVal&FILTER_SKIP_TREE)
return false;}
else if(el.type==CKEDITOR.NODE_COMMENT&&el.value.match(/^\{cke_protected\}(?!\{C\})/)){if(!processProtectedElement(that,el,protectedRegexs,filterOpts))
toBeRemoved.push(el);}},null,true);if(toBeRemoved.length)
isModified=true;var node,element,check,toBeChecked=[],enterTag=enterModeTags[enterMode||(this.editor?this.editor.enterMode:CKEDITOR.ENTER_P)],parentDtd;while((node=toBeRemoved.pop())){if(node.type==CKEDITOR.NODE_ELEMENT)
removeElement(node,enterTag,toBeChecked);else
node.remove();}
while((check=toBeChecked.pop())){element=check.el;if(!element.parent)
continue;parentDtd=DTD[element.parent.name]||DTD.span;switch(check.check){case'it':if(DTD.$removeEmpty[element.name]&&!element.children.length)
removeElement(element,enterTag,toBeChecked);else if(!validateElement(element))
removeElement(element,enterTag,toBeChecked);break;case'el-up':if(element.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&!parentDtd[element.name])
removeElement(element,enterTag,toBeChecked);break;case'parent-down':if(element.parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&!parentDtd[element.name])
removeElement(element.parent,enterTag,toBeChecked);break;}}
return isModified;},checkFeature:function(feature){if(this.disabled)
return true;if(!feature)
return true;if(feature.toFeature)
feature=feature.toFeature(this.editor);return!feature.requiredContent||this.check(feature.requiredContent);},disable:function(){this.disabled=true;},disallow:function(newRules){if(!beforeAddingRule(this,newRules,true))
return false;if(typeof newRules=='string')
newRules=parseRulesString(newRules);addAndOptimizeRules(this,newRules,null,this.disallowedContent,this._.disallowedRules);return true;},addContentForms:function(forms){if(this.disabled)
return;if(!forms)
return;var i,form,transfGroups=[],preferredForm;for(i=0;i<forms.length&&!preferredForm;++i){form=forms[i];if((typeof form=='string'||form instanceof CKEDITOR.style)&&this.check(form))
preferredForm=form;}
if(!preferredForm)
return;for(i=0;i<forms.length;++i)
transfGroups.push(getContentFormTransformationGroup(forms[i],preferredForm));this.addTransformations(transfGroups);},addElementCallback:function(callback){if(!this.elementCallbacks)
this.elementCallbacks=[];this.elementCallbacks.push(callback);},addFeature:function(feature){if(this.disabled)
return true;if(!feature)
return true;if(feature.toFeature)
feature=feature.toFeature(this.editor);this.allow(feature.allowedContent,feature.name);this.addTransformations(feature.contentTransformations);this.addContentForms(feature.contentForms);if(feature.requiredContent&&(this.customConfig||this.disallowedContent.length))
return this.check(feature.requiredContent);return true;},addTransformations:function(transformations){if(this.disabled)
return;if(!transformations)
return;var optimized=this._.transformations,group,i;for(i=0;i<transformations.length;++i){group=optimizeTransformationsGroup(transformations[i]);if(!optimized[group.name])
optimized[group.name]=[];optimized[group.name].push(group.rules);}},check:function(test,applyTransformations,strictCheck){if(this.disabled)
return true;if(CKEDITOR.tools.isArray(test)){for(var i=test.length;i--;){if(this.check(test[i],applyTransformations,strictCheck))
return true;}
return false;}
var element,result,cacheKey;if(typeof test=='string'){cacheKey=test+'<'+(applyTransformations===false?'0':'1')+(strictCheck?'1':'0')+'>';if(cacheKey in this._.cachedChecks)
return this._.cachedChecks[cacheKey];element=mockElementFromString(test);}else{element=mockElementFromStyle(test);}
var clone=CKEDITOR.tools.clone(element),toBeRemoved=[],transformations;if(applyTransformations!==false&&(transformations=this._.transformations[element.name])){for(i=0;i<transformations.length;++i)
applyTransformationsGroup(this,element,transformations[i]);updateAttributes(element);}
processElement(this,clone,toBeRemoved,{doFilter:true,doTransform:applyTransformations!==false,skipRequired:!strictCheck,skipFinalValidation:!strictCheck});if(toBeRemoved.length>0){result=false;}else if(!CKEDITOR.tools.objectCompare(element.attributes,clone.attributes,true)){result=false;}else{result=true;}
if(typeof test=='string')
this._.cachedChecks[cacheKey]=result;return result;},getAllowedEnterMode:(function(){var tagsToCheck=['p','div','br'],enterModes={p:CKEDITOR.ENTER_P,div:CKEDITOR.ENTER_DIV,br:CKEDITOR.ENTER_BR};return function(defaultMode,reverse){var tags=tagsToCheck.slice(),tag;if(this.check(enterModeTags[defaultMode]))
return defaultMode;if(!reverse)
tags=tags.reverse();while((tag=tags.pop())){if(this.check(tag))
return enterModes[tag];}
return CKEDITOR.ENTER_BR;};})(),destroy:function(){delete CKEDITOR.filter.instances[this.id];delete this._;delete this.allowedContent;delete this.disallowedContent;}};function addAndOptimizeRules(that,newRules,featureName,standardizedRules,optimizedRules){var groupName,rule,rulesToOptimize=[];for(groupName in newRules){rule=newRules[groupName];if(typeof rule=='boolean')
rule={};else if(typeof rule=='function')
rule={match:rule};else
rule=copy(rule);if(groupName.charAt(0)!='$')
rule.elements=groupName;if(featureName)
rule.featureName=featureName.toLowerCase();standardizeRule(rule);standardizedRules.push(rule);rulesToOptimize.push(rule);}
optimizeRules(optimizedRules,rulesToOptimize);}
function applyAllowedRule(rule,element,status,skipRequired){if(rule.match&&!rule.match(element))
return;if(!skipRequired&&!hasAllRequired(rule,element))
return;if(!rule.propertiesOnly)
status.valid=true;if(!status.allAttributes)
status.allAttributes=applyAllowedRuleToHash(rule.attributes,element.attributes,status.validAttributes);if(!status.allStyles)
status.allStyles=applyAllowedRuleToHash(rule.styles,element.styles,status.validStyles);if(!status.allClasses)
status.allClasses=applyAllowedRuleToArray(rule.classes,element.classes,status.validClasses);}
function applyAllowedRuleToArray(itemsRule,items,validItems){if(!itemsRule)
return false;if(itemsRule===true)
return true;for(var i=0,l=items.length,item;i<l;++i){item=items[i];if(!validItems[item])
validItems[item]=itemsRule(item);}
return false;}
function applyAllowedRuleToHash(itemsRule,items,validItems){if(!itemsRule)
return false;if(itemsRule===true)
return true;for(var name in items){if(!validItems[name])
validItems[name]=itemsRule(name);}
return false;}
function applyDisallowedRule(rule,element,status){if(rule.match&&!rule.match(element))
return;if(rule.noProperties)
return false;status.hadInvalidAttribute=applyDisallowedRuleToHash(rule.attributes,element.attributes)||status.hadInvalidAttribute;status.hadInvalidStyle=applyDisallowedRuleToHash(rule.styles,element.styles)||status.hadInvalidStyle;status.hadInvalidClass=applyDisallowedRuleToArray(rule.classes,element.classes)||status.hadInvalidClass;}
function applyDisallowedRuleToArray(itemsRule,items){if(!itemsRule)
return false;var hadInvalid=false,allDisallowed=itemsRule===true;for(var i=items.length;i--;){if(allDisallowed||itemsRule(items[i])){items.splice(i,1);hadInvalid=true;}}
return hadInvalid;}
function applyDisallowedRuleToHash(itemsRule,items){if(!itemsRule)
return false;var hadInvalid=false,allDisallowed=itemsRule===true;for(var name in items){if(allDisallowed||itemsRule(name)){delete items[name];hadInvalid=true;}}
return hadInvalid;}
function beforeAddingRule(that,newRules,overrideCustom){if(that.disabled)
return false;if(that.customConfig&&!overrideCustom)
return false;if(!newRules)
return false;that._.cachedChecks={};return true;}
function convertStyleToRules(style){var styleDef=style.getDefinition(),rules={},rule,attrs=styleDef.attributes;rules[styleDef.element]=rule={styles:styleDef.styles,requiredStyles:styleDef.styles&&CKEDITOR.tools.objectKeys(styleDef.styles)};if(attrs){attrs=copy(attrs);rule.classes=attrs['class']?attrs['class'].split(/\s+/):null;rule.requiredClasses=rule.classes;delete attrs['class'];rule.attributes=attrs;rule.requiredAttributes=attrs&&CKEDITOR.tools.objectKeys(attrs);}
return rules;}
function convertValidatorToHash(validator,delimiter){if(!validator)
return false;if(validator===true)
return validator;if(typeof validator=='string'){validator=trim(validator);if(validator=='*')
return true;else
return CKEDITOR.tools.convertArrayToObject(validator.split(delimiter));}
else if(CKEDITOR.tools.isArray(validator)){if(validator.length)
return CKEDITOR.tools.convertArrayToObject(validator);else
return false;}
else{var obj={},len=0;for(var i in validator){obj[i]=validator[i];len++;}
return len?obj:false;}}
function executeElementCallbacks(element,callbacks){for(var i=0,l=callbacks.length,retVal;i<l;++i){if((retVal=callbacks[i](element)))
return retVal;}}
function extractRequired(required,all){var unbang=[],empty=true,i;if(required)
empty=false;else
required={};for(i in all){if(i.charAt(0)=='!'){i=i.slice(1);unbang.push(i);required[i]=true;empty=false;}}
while((i=unbang.pop())){all[i]=all['!'+i];delete all['!'+i];}
return empty?false:required;}
function filterElement(that,element,opts){var name=element.name,privObj=that._,allowedRules=privObj.allowedRules.elements[name],genericAllowedRules=privObj.allowedRules.generic,disallowedRules=privObj.disallowedRules.elements[name],genericDisallowedRules=privObj.disallowedRules.generic,skipRequired=opts.skipRequired,status={valid:false,validAttributes:{},validClasses:{},validStyles:{},allAttributes:false,allClasses:false,allStyles:false,hadInvalidAttribute:false,hadInvalidClass:false,hadInvalidStyle:false},i,l;if(!allowedRules&&!genericAllowedRules)
return null;populateProperties(element);if(disallowedRules){for(i=0,l=disallowedRules.length;i<l;++i){if(applyDisallowedRule(disallowedRules[i],element,status)===false)
return null;}}
if(genericDisallowedRules){for(i=0,l=genericDisallowedRules.length;i<l;++i)
applyDisallowedRule(genericDisallowedRules[i],element,status);}
if(allowedRules){for(i=0,l=allowedRules.length;i<l;++i)
applyAllowedRule(allowedRules[i],element,status,skipRequired);}
if(genericAllowedRules){for(i=0,l=genericAllowedRules.length;i<l;++i)
applyAllowedRule(genericAllowedRules[i],element,status,skipRequired);}
return status;}
function hasAllRequired(rule,element){if(rule.nothingRequired)
return true;var i,req,reqs,existing;if((reqs=rule.requiredClasses)){existing=element.classes;for(i=0;i<reqs.length;++i){req=reqs[i];if(typeof req=='string'){if(CKEDITOR.tools.indexOf(existing,req)==-1)
return false;}
else{if(!CKEDITOR.tools.checkIfAnyArrayItemMatches(existing,req))
return false;}}}
return hasAllRequiredInHash(element.styles,rule.requiredStyles)&&hasAllRequiredInHash(element.attributes,rule.requiredAttributes);}
function hasAllRequiredInHash(existing,required){if(!required)
return true;for(var i=0,req;i<required.length;++i){req=required[i];if(typeof req=='string'){if(!(req in existing))
return false;}
else{if(!CKEDITOR.tools.checkIfAnyObjectPropertyMatches(existing,req))
return false;}}
return true;}
function mockElementFromString(str){var element=parseRulesString(str).$1,styles=element.styles,classes=element.classes;element.name=element.elements;element.classes=classes=(classes?classes.split(/\s*,\s*/):[]);element.styles=mockHash(styles);element.attributes=mockHash(element.attributes);element.children=[];if(classes.length)
element.attributes['class']=classes.join(' ');if(styles)
element.attributes.style=CKEDITOR.tools.writeCssText(element.styles);return element;}
function mockElementFromStyle(style){var styleDef=style.getDefinition(),styles=styleDef.styles,attrs=styleDef.attributes||{};if(styles){styles=copy(styles);attrs.style=CKEDITOR.tools.writeCssText(styles,true);}else{styles={};}
var el={name:styleDef.element,attributes:attrs,classes:attrs['class']?attrs['class'].split(/\s+/):[],styles:styles,children:[]};return el;}
function mockHash(str){if(!str)
return{};var keys=str.split(/\s*,\s*/).sort(),obj={};while(keys.length)
obj[keys.shift()]=TEST_VALUE;return obj;}
function optimizeRequiredProperties(requiredProperties){var arr=[];for(var propertyName in requiredProperties){if(propertyName.indexOf('*')>-1)
arr.push(new RegExp('^'+propertyName.replace(/\*/g,'.*')+'$'));else
arr.push(propertyName);}
return arr;}
var validators={styles:1,attributes:1,classes:1},validatorsRequired={styles:'requiredStyles',attributes:'requiredAttributes',classes:'requiredClasses'};function optimizeRule(rule){var validatorName,requiredProperties,i;for(validatorName in validators)
rule[validatorName]=validatorFunction(rule[validatorName]);var nothingRequired=true;for(i in validatorsRequired){validatorName=validatorsRequired[i];requiredProperties=optimizeRequiredProperties(rule[validatorName]);if(requiredProperties.length){rule[validatorName]=requiredProperties;nothingRequired=false;}}
rule.nothingRequired=nothingRequired;rule.noProperties=!(rule.attributes||rule.classes||rule.styles);}
function optimizeRules(optimizedRules,rules){var elementsRules=optimizedRules.elements,genericRules=optimizedRules.generic,i,l,rule,element,priority;for(i=0,l=rules.length;i<l;++i){rule=copy(rules[i]);priority=rule.classes===true||rule.styles===true||rule.attributes===true;optimizeRule(rule);if(rule.elements===true||rule.elements===null){genericRules[priority?'unshift':'push'](rule);}
else{var elements=rule.elements;delete rule.elements;for(element in elements){if(!elementsRules[element])
elementsRules[element]=[rule];else
elementsRules[element][priority?'unshift':'push'](rule);}}}}
var rulePattern=/^([a-z0-9\-*\s]+)((?:\s*\{[!\w\-,\s\*]+\}\s*|\s*\[[!\w\-,\s\*]+\]\s*|\s*\([!\w\-,\s\*]+\)\s*){0,3})(?:;\s*|$)/i,groupsPatterns={styles:/{([^}]+)}/,attrs:/\[([^\]]+)\]/,classes:/\(([^\)]+)\)/};function parseRulesString(input){var match,props,styles,attrs,classes,rules={},groupNum=1;input=trim(input);while((match=input.match(rulePattern))){if((props=match[2])){styles=parseProperties(props,'styles');attrs=parseProperties(props,'attrs');classes=parseProperties(props,'classes');}else{styles=attrs=classes=null;}
rules['$'+groupNum++]={elements:match[1],classes:classes,styles:styles,attributes:attrs};input=input.slice(match[0].length);}
return rules;}
function parseProperties(properties,groupName){var group=properties.match(groupsPatterns[groupName]);return group?trim(group[1]):null;}
function populateProperties(element){var styles=element.styleBackup=element.attributes.style,classes=element.classBackup=element.attributes['class'];if(!element.styles)
element.styles=CKEDITOR.tools.parseCssText(styles||'',1);if(!element.classes)
element.classes=classes?classes.split(/\s+/):[];}
function processProtectedElement(that,comment,protectedRegexs,filterOpts){var source=decodeURIComponent(comment.value.replace(/^\{cke_protected\}/,'')),protectedFrag,toBeRemoved=[],node,i,match;if(protectedRegexs){for(i=0;i<protectedRegexs.length;++i){if((match=source.match(protectedRegexs[i]))&&match[0].length==source.length)
return true;}}
protectedFrag=CKEDITOR.htmlParser.fragment.fromHtml(source);if(protectedFrag.children.length==1&&(node=protectedFrag.children[0]).type==CKEDITOR.NODE_ELEMENT)
processElement(that,node,toBeRemoved,filterOpts);return!toBeRemoved.length;}
var unprotectElementsNamesRegexp=/^cke:(object|embed|param)$/,protectElementsNamesRegexp=/^(object|embed|param)$/;function processElement(that,element,toBeRemoved,opts){var status,retVal=0,callbacksRetVal;if(opts.toHtml)
element.name=element.name.replace(unprotectElementsNamesRegexp,'$1');if(opts.doCallbacks&&that.elementCallbacks){if((callbacksRetVal=executeElementCallbacks(element,that.elementCallbacks)))
return callbacksRetVal;}
if(opts.doTransform)
transformElement(that,element);if(opts.doFilter){status=filterElement(that,element,opts);if(!status){toBeRemoved.push(element);return FILTER_ELEMENT_MODIFIED;}
if(!status.valid){toBeRemoved.push(element);return FILTER_ELEMENT_MODIFIED;}
if(updateElement(element,status))
retVal=FILTER_ELEMENT_MODIFIED;if(!opts.skipFinalValidation&&!validateElement(element)){toBeRemoved.push(element);return FILTER_ELEMENT_MODIFIED;}}
if(opts.toHtml)
element.name=element.name.replace(protectElementsNamesRegexp,'cke:$1');return retVal;}
function regexifyPropertiesWithWildcards(validators){var patterns=[],i;for(i in validators){if(i.indexOf('*')>-1)
patterns.push(i.replace(/\*/g,'.*'));}
if(patterns.length)
return new RegExp('^(?:'+patterns.join('|')+')$');else
return null;}
function standardizeRule(rule){rule.elements=convertValidatorToHash(rule.elements,/\s+/)||null;rule.propertiesOnly=rule.propertiesOnly||(rule.elements===true);var delim=/\s*,\s*/,i;for(i in validators){rule[i]=convertValidatorToHash(rule[i],delim)||null;rule[validatorsRequired[i]]=extractRequired(convertValidatorToHash(rule[validatorsRequired[i]],delim),rule[i])||null;}
rule.match=rule.match||null;}
function transformElement(that,element){var transformations=that._.transformations[element.name],i;if(!transformations)
return;populateProperties(element);for(i=0;i<transformations.length;++i)
applyTransformationsGroup(that,element,transformations[i]);updateAttributes(element);}
function updateAttributes(element){var attrs=element.attributes,styles;delete attrs.style;delete attrs['class'];if((styles=CKEDITOR.tools.writeCssText(element.styles,true)))
attrs.style=styles;if(element.classes.length)
attrs['class']=element.classes.sort().join(' ');}
function updateElement(element,status){var validAttrs=status.validAttributes,validStyles=status.validStyles,validClasses=status.validClasses,attrs=element.attributes,styles=element.styles,classes=element.classes,origClasses=element.classBackup,origStyles=element.styleBackup,name,origName,i,stylesArr=[],classesArr=[],internalAttr=/^data-cke-/,isModified=false;delete attrs.style;delete attrs['class'];delete element.classBackup;delete element.styleBackup;if(!status.allAttributes){for(name in attrs){if(!validAttrs[name]){if(internalAttr.test(name)){if(name!=(origName=name.replace(/^data-cke-saved-/,''))&&!validAttrs[origName]){delete attrs[name];isModified=true;}}else{delete attrs[name];isModified=true;}}}}
if(!status.allStyles||status.hadInvalidStyle){for(name in styles){if(status.allStyles||validStyles[name])
stylesArr.push(name+':'+styles[name]);else
isModified=true;}
if(stylesArr.length)
attrs.style=stylesArr.sort().join('; ');}
else if(origStyles){attrs.style=origStyles;}
if(!status.allClasses||status.hadInvalidClass){for(i=0;i<classes.length;++i){if(status.allClasses||validClasses[classes[i]])
classesArr.push(classes[i]);}
if(classesArr.length)
attrs['class']=classesArr.sort().join(' ');if(origClasses&&classesArr.length<origClasses.split(/\s+/).length)
isModified=true;}
else if(origClasses){attrs['class']=origClasses;}
return isModified;}
function validateElement(element){switch(element.name){case'a':if(!(element.children.length||element.attributes.name))
return false;break;case'img':if(!element.attributes.src)
return false;break;}
return true;}
function validatorFunction(validator){if(!validator)
return false;if(validator===true)
return true;var regexp=regexifyPropertiesWithWildcards(validator);return function(value){return value in validator||(regexp&&value.match(regexp));};}
function checkChildren(children,newParentName){var allowed=DTD[newParentName];for(var i=0,l=children.length,child;i<l;++i){child=children[i];if(child.type==CKEDITOR.NODE_ELEMENT&&!allowed[child.name])
return false;}
return true;}
function createBr(){return new CKEDITOR.htmlParser.element('br');}
function inlineNode(node){return node.type==CKEDITOR.NODE_TEXT||node.type==CKEDITOR.NODE_ELEMENT&&DTD.$inline[node.name];}
function isBrOrBlock(node){return node.type==CKEDITOR.NODE_ELEMENT&&(node.name=='br'||DTD.$block[node.name]);}
function removeElement(element,enterTag,toBeChecked){var name=element.name;if(DTD.$empty[name]||!element.children.length){if(name=='hr'&&enterTag=='br')
element.replaceWith(createBr());else{if(element.parent)
toBeChecked.push({check:'it',el:element.parent});element.remove();}}else if(DTD.$block[name]||name=='tr'){if(enterTag=='br')
stripBlockBr(element,toBeChecked);else
stripBlock(element,enterTag,toBeChecked);}
else if(name in{style:1,script:1})
element.remove();else{if(element.parent)
toBeChecked.push({check:'it',el:element.parent});element.replaceWithChildren();}}
function stripBlock(element,enterTag,toBeChecked){var children=element.children;if(checkChildren(children,enterTag)){element.name=enterTag;element.attributes={};toBeChecked.push({check:'parent-down',el:element});return;}
var parent=element.parent,shouldAutoP=parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT||parent.name=='body',i,child,p,parentDtd;for(i=children.length;i>0;){child=children[--i];if(shouldAutoP&&inlineNode(child)){if(!p){p=new CKEDITOR.htmlParser.element(enterTag);p.insertAfter(element);toBeChecked.push({check:'parent-down',el:p});}
p.add(child,0);}
else{p=null;parentDtd=DTD[parent.name]||DTD.span;child.insertAfter(element);if(parent.type!=CKEDITOR.NODE_DOCUMENT_FRAGMENT&&child.type==CKEDITOR.NODE_ELEMENT&&!parentDtd[child.name])
toBeChecked.push({check:'el-up',el:child});}}
element.remove();}
function stripBlockBr(element){var br;if(element.previous&&!isBrOrBlock(element.previous)){br=createBr();br.insertBefore(element);}
if(element.next&&!isBrOrBlock(element.next)){br=createBr();br.insertAfter(element);}
element.replaceWithChildren();}
function applyTransformationsGroup(filter,element,group){var i,rule;for(i=0;i<group.length;++i){rule=group[i];if((!rule.check||filter.check(rule.check,false))&&(!rule.left||rule.left(element))){rule.right(element,transformationsTools);return;}}}
function elementMatchesStyle(element,style){var def=style.getDefinition(),defAttrs=def.attributes,defStyles=def.styles,attrName,styleName,classes,classPattern,cl;if(element.name!=def.element)
return false;for(attrName in defAttrs){if(attrName=='class'){classes=defAttrs[attrName].split(/\s+/);classPattern=element.classes.join('|');while((cl=classes.pop())){if(classPattern.indexOf(cl)==-1)
return false;}}else{if(element.attributes[attrName]!=defAttrs[attrName])
return false;}}
for(styleName in defStyles){if(element.styles[styleName]!=defStyles[styleName])
return false;}
return true;}
function getContentFormTransformationGroup(form,preferredForm){var element,left;if(typeof form=='string')
element=form;else if(form instanceof CKEDITOR.style)
left=form;else{element=form[0];left=form[1];}
return[{element:element,left:left,right:function(el,tools){tools.transform(el,preferredForm);}}];}
function getElementNameForTransformation(rule,check){if(rule.element)
return rule.element;if(check)
return check.match(/^([a-z0-9]+)/i)[0];return rule.left.getDefinition().element;}
function getMatchStyleFn(style){return function(el){return elementMatchesStyle(el,style);};}
function getTransformationFn(toolName){return function(el,tools){tools[toolName](el);};}
function optimizeTransformationsGroup(rules){var groupName,i,rule,check,left,right,optimizedRules=[];for(i=0;i<rules.length;++i){rule=rules[i];if(typeof rule=='string'){rule=rule.split(/\s*:\s*/);check=rule[0];left=null;right=rule[1];}else{check=rule.check;left=rule.left;right=rule.right;}
if(!groupName)
groupName=getElementNameForTransformation(rule,check);if(left instanceof CKEDITOR.style)
left=getMatchStyleFn(left);optimizedRules.push({check:check==groupName?null:check,left:left,right:typeof right=='string'?getTransformationFn(right):right});}
return{name:groupName,rules:optimizedRules};}
var transformationsTools=CKEDITOR.filter.transformationsTools={sizeToStyle:function(element){this.lengthToStyle(element,'width');this.lengthToStyle(element,'height');},sizeToAttribute:function(element){this.lengthToAttribute(element,'width');this.lengthToAttribute(element,'height');},lengthToStyle:function(element,attrName,styleName){styleName=styleName||attrName;if(!(styleName in element.styles)){var value=element.attributes[attrName];if(value){if((/^\d+$/).test(value))
value+='px';element.styles[styleName]=value;}}
delete element.attributes[attrName];},lengthToAttribute:function(element,styleName,attrName){attrName=attrName||styleName;if(!(attrName in element.attributes)){var value=element.styles[styleName],match=value&&value.match(/^(\d+)(?:\.\d*)?px$/);if(match)
element.attributes[attrName]=match[1];else if(value==TEST_VALUE)
element.attributes[attrName]=TEST_VALUE;}
delete element.styles[styleName];},alignmentToStyle:function(element){if(!('float'in element.styles)){var value=element.attributes.align;if(value=='left'||value=='right')
element.styles['float']=value;}
delete element.attributes.align;},alignmentToAttribute:function(element){if(!('align'in element.attributes)){var value=element.styles['float'];if(value=='left'||value=='right')
element.attributes.align=value;}
delete element.styles['float'];},matchesStyle:elementMatchesStyle,transform:function(el,form){if(typeof form=='string')
el.name=form;else{var def=form.getDefinition(),defStyles=def.styles,defAttrs=def.attributes,attrName,styleName,existingClassesPattern,defClasses,cl;el.name=def.element;for(attrName in defAttrs){if(attrName=='class'){existingClassesPattern=el.classes.join('|');defClasses=defAttrs[attrName].split(/\s+/);while((cl=defClasses.pop())){if(existingClassesPattern.indexOf(cl)==-1)
el.classes.push(cl);}}else{el.attributes[attrName]=defAttrs[attrName];}}
for(styleName in defStyles){el.styles[styleName]=defStyles[styleName];}}}};})();(function(){CKEDITOR.focusManager=function(editor){if(editor.focusManager)
return editor.focusManager;this.hasFocus=false;this.currentActive=null;this._={editor:editor};return this;};var SLOT_NAME='focusmanager',SLOT_NAME_LISTENERS='focusmanager_handlers';CKEDITOR.focusManager._={blurDelay:200};CKEDITOR.focusManager.prototype={focus:function(currentActive){if(this._.timer)
clearTimeout(this._.timer);if(currentActive)
this.currentActive=currentActive;if(!(this.hasFocus||this._.locked)){var current=CKEDITOR.currentInstance;current&&current.focusManager.blur(1);this.hasFocus=true;var ct=this._.editor.container;ct&&ct.addClass('cke_focus');this._.editor.fire('focus');}},lock:function(){this._.locked=1;},unlock:function(){delete this._.locked;},blur:function(noDelay){if(this._.locked)
return;function doBlur(){if(this.hasFocus){this.hasFocus=false;var ct=this._.editor.container;ct&&ct.removeClass('cke_focus');this._.editor.fire('blur');}}
if(this._.timer)
clearTimeout(this._.timer);var delay=CKEDITOR.focusManager._.blurDelay;if(noDelay||!delay)
doBlur.call(this);else{this._.timer=CKEDITOR.tools.setTimeout(function(){delete this._.timer;doBlur.call(this);},delay,this);}},add:function(element,isCapture){var fm=element.getCustomData(SLOT_NAME);if(!fm||fm!=this){fm&&fm.remove(element);var focusEvent='focus',blurEvent='blur';if(isCapture){if(CKEDITOR.env.ie){focusEvent='focusin';blurEvent='focusout';}else{CKEDITOR.event.useCapture=1;}}
var listeners={blur:function(){if(element.equals(this.currentActive))
this.blur();},focus:function(){this.focus(element);}};element.on(focusEvent,listeners.focus,this);element.on(blurEvent,listeners.blur,this);if(isCapture)
CKEDITOR.event.useCapture=0;element.setCustomData(SLOT_NAME,this);element.setCustomData(SLOT_NAME_LISTENERS,listeners);}},remove:function(element){element.removeCustomData(SLOT_NAME);var listeners=element.removeCustomData(SLOT_NAME_LISTENERS);element.removeListener('blur',listeners.blur);element.removeListener('focus',listeners.focus);}};})();CKEDITOR.keystrokeHandler=function(editor){if(editor.keystrokeHandler)
return editor.keystrokeHandler;this.keystrokes={};this.blockedKeystrokes={};this._={editor:editor};return this;};(function(){var cancel;var onKeyDown=function(event){event=event.data;var keyCombination=event.getKeystroke();var command=this.keystrokes[keyCombination];var editor=this._.editor;cancel=(editor.fire('key',{keyCode:keyCombination,domEvent:event})===false);if(!cancel){if(command){var data={from:'keystrokeHandler'};cancel=(editor.execCommand(command,data)!==false);}
if(!cancel)
cancel=!!this.blockedKeystrokes[keyCombination];}
if(cancel)
event.preventDefault(true);return!cancel;};var onKeyPress=function(event){if(cancel){cancel=false;event.data.preventDefault(true);}};CKEDITOR.keystrokeHandler.prototype={attach:function(domObject){domObject.on('keydown',onKeyDown,this);if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)
domObject.on('keypress',onKeyPress,this);}};})();(function(){CKEDITOR.lang={languages:{af:1,ar:1,bg:1,bn:1,bs:1,ca:1,cs:1,cy:1,da:1,de:1,el:1,'en-au':1,'en-ca':1,'en-gb':1,en:1,eo:1,es:1,et:1,eu:1,fa:1,fi:1,fo:1,'fr-ca':1,fr:1,gl:1,gu:1,he:1,hi:1,hr:1,hu:1,id:1,is:1,it:1,ja:1,ka:1,km:1,ko:1,ku:1,lt:1,lv:1,mk:1,mn:1,ms:1,nb:1,nl:1,no:1,pl:1,'pt-br':1,pt:1,ro:1,ru:1,si:1,sk:1,sl:1,sq:1,'sr-latn':1,sr:1,sv:1,th:1,tr:1,tt:1,ug:1,uk:1,vi:1,'zh-cn':1,zh:1},rtl:{ar:1,fa:1,he:1,ku:1,ug:1},load:function(languageCode,defaultLanguage,callback){if(!languageCode||!CKEDITOR.lang.languages[languageCode])
languageCode=this.detect(defaultLanguage,languageCode);var that=this,loadedCallback=function(){that[languageCode].dir=that.rtl[languageCode]?'rtl':'ltr';callback(languageCode,that[languageCode]);};if(!this[languageCode])
CKEDITOR.scriptLoader.load(CKEDITOR.getUrl('lang/'+languageCode+'.js'),loadedCallback,this);else
loadedCallback();},detect:function(defaultLanguage,probeLanguage){var languages=this.languages;probeLanguage=probeLanguage||navigator.userLanguage||navigator.language||defaultLanguage;var parts=probeLanguage.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/),lang=parts[1],locale=parts[2];if(languages[lang+'-'+locale])
lang=lang+'-'+locale;else if(!languages[lang])
lang=null;CKEDITOR.lang.detect=lang?function(){return lang;}:function(defaultLanguage){return defaultLanguage;};return lang||defaultLanguage;}};})();CKEDITOR.scriptLoader=(function(){var uniqueScripts={},waitingList={};return{load:function(scriptUrl,callback,scope,showBusy){var isString=(typeof scriptUrl=='string');if(isString)
scriptUrl=[scriptUrl];if(!scope)
scope=CKEDITOR;var scriptCount=scriptUrl.length,completed=[],failed=[];var doCallback=function(success){if(callback){if(isString)
callback.call(scope,success);else
callback.call(scope,completed,failed);}};if(scriptCount===0){doCallback(true);return;}
var checkLoaded=function(url,success){(success?completed:failed).push(url);if(--scriptCount<=0){showBusy&&CKEDITOR.document.getDocumentElement().removeStyle('cursor');doCallback(success);}};var onLoad=function(url,success){uniqueScripts[url]=1;var waitingInfo=waitingList[url];delete waitingList[url];for(var i=0;i<waitingInfo.length;i++)
waitingInfo[i](url,success);};var loadScript=function(url){if(uniqueScripts[url]){checkLoaded(url,true);return;}
var waitingInfo=waitingList[url]||(waitingList[url]=[]);waitingInfo.push(checkLoaded);if(waitingInfo.length>1)
return;var script=new CKEDITOR.dom.element('script');script.setAttributes({type:'text/javascript',src:url});if(callback){if(CKEDITOR.env.ie&&CKEDITOR.env.version<11){script.$.onreadystatechange=function(){if(script.$.readyState=='loaded'||script.$.readyState=='complete'){script.$.onreadystatechange=null;onLoad(url,true);}};}else{script.$.onload=function(){setTimeout(function(){onLoad(url,true);},0);};script.$.onerror=function(){onLoad(url,false);};}}
script.appendTo(CKEDITOR.document.getHead());};showBusy&&CKEDITOR.document.getDocumentElement().setStyle('cursor','wait');for(var i=0;i<scriptCount;i++){loadScript(scriptUrl[i]);}},queue:(function(){var pending=[];function loadNext(){var script;if((script=pending[0]))
this.load(script.scriptUrl,script.callback,CKEDITOR,0);}
return function(scriptUrl,callback){var that=this;function callbackWrapper(){callback&&callback.apply(this,arguments);pending.shift();loadNext.call(that);}
pending.push({scriptUrl:scriptUrl,callback:callbackWrapper});if(pending.length==1)
loadNext.call(this);};})()};})();CKEDITOR.resourceManager=function(basePath,fileName){this.basePath=basePath;this.fileName=fileName;this.registered={};this.loaded={};this.externals={};this._={waitingList:{}};};CKEDITOR.resourceManager.prototype={add:function(name,definition){if(this.registered[name])
throw'[CKEDITOR.resourceManager.add] The resource name "'+name+'" is already registered.';var resource=this.registered[name]=definition||{};resource.name=name;resource.path=this.getPath(name);CKEDITOR.fire(name+CKEDITOR.tools.capitalize(this.fileName)+'Ready',resource);return this.get(name);},get:function(name){return this.registered[name]||null;},getPath:function(name){var external=this.externals[name];return CKEDITOR.getUrl((external&&external.dir)||this.basePath+name+'/');},getFilePath:function(name){var external=this.externals[name];return CKEDITOR.getUrl(this.getPath(name)+(external?external.file:this.fileName+'.js'));},addExternal:function(names,path,fileName){names=names.split(',');for(var i=0;i<names.length;i++){var name=names[i];if(!fileName){path=path.replace(/[^\/]+$/,function(match){fileName=match;return'';});}
this.externals[name]={dir:path,file:fileName||(this.fileName+'.js')};}},load:function(names,callback,scope){if(!CKEDITOR.tools.isArray(names))
names=names?[names]:[];var loaded=this.loaded,registered=this.registered,urls=[],urlsNames={},resources={};for(var i=0;i<names.length;i++){var name=names[i];if(!name)
continue;if(!loaded[name]&&!registered[name]){var url=this.getFilePath(name);urls.push(url);if(!(url in urlsNames))
urlsNames[url]=[];urlsNames[url].push(name);}else{resources[name]=this.get(name);}}
CKEDITOR.scriptLoader.load(urls,function(completed,failed){if(failed.length){throw'[CKEDITOR.resourceManager.load] Resource name "'+urlsNames[failed[0]].join(',')+'" was not found at "'+failed[0]+'".';}
for(var i=0;i<completed.length;i++){var nameList=urlsNames[completed[i]];for(var j=0;j<nameList.length;j++){var name=nameList[j];resources[name]=this.get(name);loaded[name]=1;}}
callback.call(scope,resources);},this);}};CKEDITOR.plugins=new CKEDITOR.resourceManager('plugins/','plugin');CKEDITOR.plugins.load=CKEDITOR.tools.override(CKEDITOR.plugins.load,function(originalLoad){var initialized={};return function(name,callback,scope){var allPlugins={};var loadPlugins=function(names){originalLoad.call(this,names,function(plugins){CKEDITOR.tools.extend(allPlugins,plugins);var requiredPlugins=[];for(var pluginName in plugins){var plugin=plugins[pluginName],requires=plugin&&plugin.requires;if(!initialized[pluginName]){if(plugin.icons){var icons=plugin.icons.split(',');for(var ic=icons.length;ic--;){CKEDITOR.skin.addIcon(icons[ic],plugin.path+'icons/'+
(CKEDITOR.env.hidpi&&plugin.hidpi?'hidpi/':'')+
icons[ic]+'.png');}}
initialized[pluginName]=1;}
if(requires){if(requires.split)
requires=requires.split(',');for(var i=0;i<requires.length;i++){if(!allPlugins[requires[i]])
requiredPlugins.push(requires[i]);}}}
if(requiredPlugins.length)
loadPlugins.call(this,requiredPlugins);else{for(pluginName in allPlugins){plugin=allPlugins[pluginName];if(plugin.onLoad&&!plugin.onLoad._called){if(plugin.onLoad()===false)
delete allPlugins[pluginName];plugin.onLoad._called=1;}}
if(callback)
callback.call(scope||window,allPlugins);}},this);};loadPlugins.call(this,name);};});CKEDITOR.plugins.setLang=function(pluginName,languageCode,languageEntries){var plugin=this.get(pluginName),pluginLangEntries=plugin.langEntries||(plugin.langEntries={}),pluginLang=plugin.lang||(plugin.lang=[]);if(pluginLang.split)
pluginLang=pluginLang.split(',');if(CKEDITOR.tools.indexOf(pluginLang,languageCode)==-1)
pluginLang.push(languageCode);pluginLangEntries[languageCode]=languageEntries;};CKEDITOR.ui=function(editor){if(editor.ui)
return editor.ui;this.items={};this.instances={};this.editor=editor;this._={handlers:{}};return this;};CKEDITOR.ui.prototype={add:function(name,type,definition){definition.name=name.toLowerCase();var item=this.items[name]={type:type,command:definition.command||null,args:Array.prototype.slice.call(arguments,2)};CKEDITOR.tools.extend(item,definition);},get:function(name){return this.instances[name];},create:function(name){var item=this.items[name],handler=item&&this._.handlers[item.type],command=item&&item.command&&this.editor.getCommand(item.command);var result=handler&&handler.create.apply(this,item.args);this.instances[name]=result;if(command)
command.uiItems.push(result);if(result&&!result.type)
result.type=item.type;return result;},addHandler:function(type,handler){this._.handlers[type]=handler;},space:function(name){return CKEDITOR.document.getById(this.spaceId(name));},spaceId:function(name){return this.editor.id+'_'+name;}};CKEDITOR.event.implementOn(CKEDITOR.ui);(function(){Editor.prototype=CKEDITOR.editor.prototype;CKEDITOR.editor=Editor;function Editor(instanceConfig,element,mode){CKEDITOR.event.call(this);instanceConfig=instanceConfig&&CKEDITOR.tools.clone(instanceConfig);if(element!==undefined){if(!(element instanceof CKEDITOR.dom.element))
throw new Error('Expect element of type CKEDITOR.dom.element.');else if(!mode)
throw new Error('One of the element modes must be specified.');if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&mode==CKEDITOR.ELEMENT_MODE_INLINE)
throw new Error('Inline element mode is not supported on IE quirks.');if(!isSupportedElement(element,mode))
throw new Error('The specified element mode is not supported on element: "'+element.getName()+'".');this.element=element;this.elementMode=mode;this.name=(this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO)&&(element.getId()||element.getNameAtt());}else{this.elementMode=CKEDITOR.ELEMENT_MODE_NONE;}
this._={};this.commands={};this.templates={};this.name=this.name||genEditorName();this.id=CKEDITOR.tools.getNextId();this.status='unloaded';this.config=CKEDITOR.tools.prototypedCopy(CKEDITOR.config);this.ui=new CKEDITOR.ui(this);this.focusManager=new CKEDITOR.focusManager(this);this.keystrokeHandler=new CKEDITOR.keystrokeHandler(this);this.on('readOnly',updateCommands);this.on('selectionChange',function(evt){updateCommandsContext(this,evt.data.path);});this.on('activeFilterChange',function(){updateCommandsContext(this,this.elementPath(),true);});this.on('mode',updateCommands);this.on('instanceReady',function(){this.config.startupFocus&&this.focus();});CKEDITOR.fire('instanceCreated',null,this);CKEDITOR.add(this);CKEDITOR.tools.setTimeout(function(){initConfig(this,instanceConfig);},0,this);}
var nameCounter=0;function genEditorName(){do{var name='editor'+(++nameCounter);}
while(CKEDITOR.instances[name]);return name;}
function isSupportedElement(element,mode){if(mode==CKEDITOR.ELEMENT_MODE_INLINE)
return element.is(CKEDITOR.dtd.$editable)||element.is('textarea');else if(mode==CKEDITOR.ELEMENT_MODE_REPLACE)
return!element.is(CKEDITOR.dtd.$nonBodyContent);return 1;}
function updateCommands(){var commands=this.commands,name;for(name in commands)
updateCommand(this,commands[name]);}
function updateCommand(editor,cmd){cmd[cmd.startDisabled?'disable':editor.readOnly&&!cmd.readOnly?'disable':cmd.modes[editor.mode]?'enable':'disable']();}
function updateCommandsContext(editor,path,forceRefresh){if(!path)
return;var command,name,commands=editor.commands;for(name in commands){command=commands[name];if(forceRefresh||command.contextSensitive)
command.refresh(editor,path);}}
var loadConfigLoaded={};function loadConfig(editor){var customConfig=editor.config.customConfig;if(!customConfig)
return false;customConfig=CKEDITOR.getUrl(customConfig);var loadedConfig=loadConfigLoaded[customConfig]||(loadConfigLoaded[customConfig]={});if(loadedConfig.fn){loadedConfig.fn.call(editor,editor.config);if(CKEDITOR.getUrl(editor.config.customConfig)==customConfig||!loadConfig(editor))
editor.fireOnce('customConfigLoaded');}else{CKEDITOR.scriptLoader.queue(customConfig,function(){if(CKEDITOR.editorConfig)
loadedConfig.fn=CKEDITOR.editorConfig;else
loadedConfig.fn=function(){};loadConfig(editor);});}
return true;}
function initConfig(editor,instanceConfig){editor.on('customConfigLoaded',function(){if(instanceConfig){if(instanceConfig.on){for(var eventName in instanceConfig.on){editor.on(eventName,instanceConfig.on[eventName]);}}
CKEDITOR.tools.extend(editor.config,instanceConfig,true);delete editor.config.on;}
onConfigLoaded(editor);});if(instanceConfig&&instanceConfig.customConfig!=null)
editor.config.customConfig=instanceConfig.customConfig;if(!loadConfig(editor))
editor.fireOnce('customConfigLoaded');}
function onConfigLoaded(editor){var config=editor.config;editor.readOnly=isEditorReadOnly();function isEditorReadOnly(){if(config.readOnly){return true;}
if(editor.elementMode==CKEDITOR.ELEMENT_MODE_INLINE){if(editor.element.is('textarea')){return editor.element.hasAttribute('disabled')||editor.element.hasAttribute('readonly');}else{return editor.element.isReadOnly();}}else if(editor.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){return editor.element.hasAttribute('disabled')||editor.element.hasAttribute('readonly');}
return false;}
editor.blockless=editor.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?!(editor.element.is('textarea')||CKEDITOR.dtd[editor.element.getName()].p):false;editor.tabIndex=config.tabIndex||editor.element&&editor.element.getAttribute('tabindex')||0;editor.activeEnterMode=editor.enterMode=validateEnterMode(editor,config.enterMode);editor.activeShiftEnterMode=editor.shiftEnterMode=validateEnterMode(editor,config.shiftEnterMode);if(config.skin)
CKEDITOR.skinName=config.skin;editor.fireOnce('configLoaded');initComponents(editor);}
function initComponents(editor){editor.dataProcessor=new CKEDITOR.htmlDataProcessor(editor);editor.filter=editor.activeFilter=new CKEDITOR.filter(editor);loadSkin(editor);}
function loadSkin(editor){CKEDITOR.skin.loadPart('editor',function(){loadLang(editor);});}
function loadLang(editor){CKEDITOR.lang.load(editor.config.language,editor.config.defaultLanguage,function(languageCode,lang){var configTitle=editor.config.title;editor.langCode=languageCode;editor.lang=CKEDITOR.tools.prototypedCopy(lang);editor.title=typeof configTitle=='string'||configTitle===false?configTitle:[editor.lang.editor,editor.name].join(', ');if(!editor.config.contentsLangDirection){editor.config.contentsLangDirection=editor.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?editor.element.getDirection(1):editor.lang.dir;}
editor.fire('langLoaded');preloadStylesSet(editor);});}
function preloadStylesSet(editor){editor.getStylesSet(function(styles){editor.once('loaded',function(){editor.fire('stylesSet',{styles:styles});},null,null,1);loadPlugins(editor);});}
function loadPlugins(editor){var config=editor.config,plugins=config.plugins,extraPlugins=config.extraPlugins,removePlugins=config.removePlugins;if(extraPlugins){var extraRegex=new RegExp('(?:^|,)(?:'+extraPlugins.replace(/\s*,\s*/g,'|')+')(?=,|$)','g');plugins=plugins.replace(extraRegex,'');plugins+=','+extraPlugins;}
if(removePlugins){var removeRegex=new RegExp('(?:^|,)(?:'+removePlugins.replace(/\s*,\s*/g,'|')+')(?=,|$)','g');plugins=plugins.replace(removeRegex,'');}
CKEDITOR.env.air&&(plugins+=',adobeair');CKEDITOR.plugins.load(plugins.split(','),function(plugins){var pluginsArray=[];var languageCodes=[];var languageFiles=[];editor.plugins=plugins;for(var pluginName in plugins){var plugin=plugins[pluginName],pluginLangs=plugin.lang,lang=null,requires=plugin.requires,match,name;if(CKEDITOR.tools.isArray(requires))
requires=requires.join(',');if(requires&&(match=requires.match(removeRegex))){while((name=match.pop())){CKEDITOR.tools.setTimeout(function(name,pluginName){throw new Error('Plugin "'+name.replace(',','')+'" cannot be removed from the plugins list, because it\'s required by "'+pluginName+'" plugin.');},0,null,[name,pluginName]);}}
if(pluginLangs&&!editor.lang[pluginName]){if(pluginLangs.split)
pluginLangs=pluginLangs.split(',');if(CKEDITOR.tools.indexOf(pluginLangs,editor.langCode)>=0)
lang=editor.langCode;else{var langPart=editor.langCode.replace(/-.*/,'');if(langPart!=editor.langCode&&CKEDITOR.tools.indexOf(pluginLangs,langPart)>=0)
lang=langPart;else if(CKEDITOR.tools.indexOf(pluginLangs,'en')>=0)
lang='en';else
lang=pluginLangs[0];}
if(!plugin.langEntries||!plugin.langEntries[lang]){languageFiles.push(CKEDITOR.getUrl(plugin.path+'lang/'+lang+'.js'));}else{editor.lang[pluginName]=plugin.langEntries[lang];lang=null;}}
languageCodes.push(lang);pluginsArray.push(plugin);}
CKEDITOR.scriptLoader.load(languageFiles,function(){var methods=['beforeInit','init','afterInit'];for(var m=0;m<methods.length;m++){for(var i=0;i<pluginsArray.length;i++){var plugin=pluginsArray[i];if(m===0&&languageCodes[i]&&plugin.lang&&plugin.langEntries)
editor.lang[plugin.name]=plugin.langEntries[languageCodes[i]];if(plugin[methods[m]])
plugin[methods[m]](editor);}}
editor.fireOnce('pluginsLoaded');config.keystrokes&&editor.setKeystroke(editor.config.keystrokes);for(i=0;i<editor.config.blockedKeystrokes.length;i++)
editor.keystrokeHandler.blockedKeystrokes[editor.config.blockedKeystrokes[i]]=1;editor.status='loaded';editor.fireOnce('loaded');CKEDITOR.fire('instanceLoaded',null,editor);});});}
function updateEditorElement(){var element=this.element;if(element&&this.elementMode!=CKEDITOR.ELEMENT_MODE_APPENDTO){var data=this.getData();if(this.config.htmlEncodeOutput)
data=CKEDITOR.tools.htmlEncode(data);if(element.is('textarea'))
element.setValue(data);else
element.setHtml(data);return true;}
return false;}
function validateEnterMode(editor,enterMode){return editor.blockless?CKEDITOR.ENTER_BR:enterMode;}
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{addCommand:function(commandName,commandDefinition){commandDefinition.name=commandName.toLowerCase();var cmd=new CKEDITOR.command(this,commandDefinition);if(this.mode)
updateCommand(this,cmd);return this.commands[commandName]=cmd;},_attachToForm:function(){var editor=this,element=editor.element,form=new CKEDITOR.dom.element(element.$.form);if(element.is('textarea')){if(form){form.on('submit',onSubmit);if(isFunction(form.$.submit)){form.$.submit=CKEDITOR.tools.override(form.$.submit,function(originalSubmit){return function(){onSubmit();if(originalSubmit.apply)
originalSubmit.apply(this);else
originalSubmit();};});}
editor.on('destroy',function(){form.removeListener('submit',onSubmit);});}}
function onSubmit(evt){editor.updateElement();if(editor._.required&&!element.getValue()&&editor.fire('required')===false){evt.data.preventDefault();}}
function isFunction(f){return!!(f&&f.call&&f.apply);}},destroy:function(noUpdate){this.fire('beforeDestroy');!noUpdate&&updateEditorElement.call(this);this.editable(null);this.filter.destroy();delete this.filter;delete this.activeFilter;this.status='destroyed';this.fire('destroy');this.removeAllListeners();CKEDITOR.remove(this);CKEDITOR.fire('instanceDestroyed',null,this);},elementPath:function(startNode){if(!startNode){var sel=this.getSelection();if(!sel)
return null;startNode=sel.getStartElement();}
return startNode?new CKEDITOR.dom.elementPath(startNode,this.editable()):null;},createRange:function(){var editable=this.editable();return editable?new CKEDITOR.dom.range(editable):null;},execCommand:function(commandName,data){var command=this.getCommand(commandName);var eventData={name:commandName,commandData:data,command:command};if(command&&command.state!=CKEDITOR.TRISTATE_DISABLED){if(this.fire('beforeCommandExec',eventData)!==false){eventData.returnValue=command.exec(eventData.commandData);if(!command.async&&this.fire('afterCommandExec',eventData)!==false)
return eventData.returnValue;}}
return false;},getCommand:function(commandName){return this.commands[commandName];},getData:function(internal){!internal&&this.fire('beforeGetData');var eventData=this._.data;if(typeof eventData!='string'){var element=this.element;if(element&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE)
eventData=element.is('textarea')?element.getValue():element.getHtml();else
eventData='';}
eventData={dataValue:eventData};!internal&&this.fire('getData',eventData);return eventData.dataValue;},getSnapshot:function(){var data=this.fire('getSnapshot');if(typeof data!='string'){var element=this.element;if(element&&this.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){data=element.is('textarea')?element.getValue():element.getHtml();}
else{data='';}}
return data;},loadSnapshot:function(snapshot){this.fire('loadSnapshot',snapshot);},setData:function(data,options,internal){var fireSnapshot=true,callback=options,eventData;if(options&&typeof options=='object'){internal=options.internal;callback=options.callback;fireSnapshot=!options.noSnapshot;}
if(!internal&&fireSnapshot)
this.fire('saveSnapshot');if(callback||!internal){this.once('dataReady',function(evt){if(!internal&&fireSnapshot)
this.fire('saveSnapshot');if(callback)
callback.call(evt.editor);});}
eventData={dataValue:data};!internal&&this.fire('setData',eventData);this._.data=eventData.dataValue;!internal&&this.fire('afterSetData',eventData);},setReadOnly:function(isReadOnly){isReadOnly=(isReadOnly==null)||isReadOnly;if(this.readOnly!=isReadOnly){this.readOnly=isReadOnly;this.keystrokeHandler.blockedKeystrokes[8]=+isReadOnly;this.editable().setReadOnly(isReadOnly);this.fire('readOnly');}},insertHtml:function(html,mode,range){this.fire('insertHtml',{dataValue:html,mode:mode,range:range});},insertText:function(text){this.fire('insertText',text);},insertElement:function(element){this.fire('insertElement',element);},getSelectedHtml:function(toString){var editable=this.editable(),selection=this.getSelection(),ranges=selection&&selection.getRanges();if(!editable||!ranges||ranges.length===0){return null;}
var docFragment=editable.getHtmlFromRange(ranges[0]);return toString?docFragment.getHtml():docFragment;},extractSelectedHtml:function(toString,removeEmptyBlock){var editable=this.editable(),ranges=this.getSelection().getRanges();if(!editable||ranges.length===0){return null;}
var range=ranges[0],docFragment=editable.extractHtmlFromRange(range,removeEmptyBlock);if(!removeEmptyBlock){this.getSelection().selectRanges([range]);}
return toString?docFragment.getHtml():docFragment;},focus:function(){this.fire('beforeFocus');},checkDirty:function(){return this.status=='ready'&&this._.previousValue!==this.getSnapshot();},resetDirty:function(){this._.previousValue=this.getSnapshot();},updateElement:function(){return updateEditorElement.call(this);},setKeystroke:function(){var keystrokes=this.keystrokeHandler.keystrokes,newKeystrokes=CKEDITOR.tools.isArray(arguments[0])?arguments[0]:[[].slice.call(arguments,0)],keystroke,behavior;for(var i=newKeystrokes.length;i--;){keystroke=newKeystrokes[i];behavior=0;if(CKEDITOR.tools.isArray(keystroke)){behavior=keystroke[1];keystroke=keystroke[0];}
if(behavior)
keystrokes[keystroke]=behavior;else
delete keystrokes[keystroke];}},addFeature:function(feature){return this.filter.addFeature(feature);},setActiveFilter:function(filter){if(!filter)
filter=this.filter;if(this.activeFilter!==filter){this.activeFilter=filter;this.fire('activeFilterChange');if(filter===this.filter)
this.setActiveEnterMode(null,null);else
this.setActiveEnterMode(filter.getAllowedEnterMode(this.enterMode),filter.getAllowedEnterMode(this.shiftEnterMode,true));}},setActiveEnterMode:function(enterMode,shiftEnterMode){enterMode=enterMode?validateEnterMode(this,enterMode):this.enterMode;shiftEnterMode=shiftEnterMode?validateEnterMode(this,shiftEnterMode):this.shiftEnterMode;if(this.activeEnterMode!=enterMode||this.activeShiftEnterMode!=shiftEnterMode){this.activeEnterMode=enterMode;this.activeShiftEnterMode=shiftEnterMode;this.fire('activeEnterModeChange');}},showNotification:function(message){alert(message);}});})();CKEDITOR.ELEMENT_MODE_NONE=0;CKEDITOR.ELEMENT_MODE_REPLACE=1;CKEDITOR.ELEMENT_MODE_APPENDTO=2;CKEDITOR.ELEMENT_MODE_INLINE=3;CKEDITOR.htmlParser=function(){this._={htmlPartsRegex:/<(?:(?:\/([^>]+)>)|(?:!--([\S|\s]*?)-->)|(?:([^\/\s>]+)((?:\s+[\w\-:.]+(?:\s*=\s*?(?:(?:"[^"]*")|(?:'[^']*')|[^\s"'\/>]+))?)*)[\S\s]*?(\/?)>))/g};};(function(){var attribsRegex=/([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g,emptyAttribs={checked:1,compact:1,declare:1,defer:1,disabled:1,ismap:1,multiple:1,nohref:1,noresize:1,noshade:1,nowrap:1,readonly:1,selected:1};CKEDITOR.htmlParser.prototype={onTagOpen:function(){},onTagClose:function(){},onText:function(){},onCDATA:function(){},onComment:function(){},parse:function(html){var parts,tagName,nextIndex=0,cdata;while((parts=this._.htmlPartsRegex.exec(html))){var tagIndex=parts.index;if(tagIndex>nextIndex){var text=html.substring(nextIndex,tagIndex);if(cdata)
cdata.push(text);else
this.onText(text);}
nextIndex=this._.htmlPartsRegex.lastIndex;if((tagName=parts[1])){tagName=tagName.toLowerCase();if(cdata&&CKEDITOR.dtd.$cdata[tagName]){this.onCDATA(cdata.join(''));cdata=null;}
if(!cdata){this.onTagClose(tagName);continue;}}
if(cdata){cdata.push(parts[0]);continue;}
if((tagName=parts[3])){tagName=tagName.toLowerCase();if(/="/.test(tagName))
continue;var attribs={},attribMatch,attribsPart=parts[4],selfClosing=!!parts[5];if(attribsPart){while((attribMatch=attribsRegex.exec(attribsPart))){var attName=attribMatch[1].toLowerCase(),attValue=attribMatch[2]||attribMatch[3]||attribMatch[4]||'';if(!attValue&&emptyAttribs[attName])
attribs[attName]=attName;else
attribs[attName]=CKEDITOR.tools.htmlDecodeAttr(attValue);}}
this.onTagOpen(tagName,attribs,selfClosing);if(!cdata&&CKEDITOR.dtd.$cdata[tagName])
cdata=[];continue;}
if((tagName=parts[2]))
this.onComment(tagName);}
if(html.length>nextIndex)
this.onText(html.substring(nextIndex,html.length));}};})();CKEDITOR.htmlParser.basicWriter=CKEDITOR.tools.createClass({$:function(){this._={output:[]};},proto:{openTag:function(tagName){this._.output.push('<',tagName);},openTagClose:function(tagName,isSelfClose){if(isSelfClose)
this._.output.push(' />');else
this._.output.push('>');},attribute:function(attName,attValue){if(typeof attValue=='string')
attValue=CKEDITOR.tools.htmlEncodeAttr(attValue);this._.output.push(' ',attName,'="',attValue,'"');},closeTag:function(tagName){this._.output.push('</',tagName,'>');},text:function(text){this._.output.push(text);},comment:function(comment){this._.output.push('<!--',comment,'-->');},write:function(data){this._.output.push(data);},reset:function(){this._.output=[];this._.indent=false;},getHtml:function(reset){var html=this._.output.join('');if(reset)
this.reset();return html;}}});'use strict';(function(){CKEDITOR.htmlParser.node=function(){};CKEDITOR.htmlParser.node.prototype={remove:function(){var children=this.parent.children,index=CKEDITOR.tools.indexOf(children,this),previous=this.previous,next=this.next;previous&&(previous.next=next);next&&(next.previous=previous);children.splice(index,1);this.parent=null;},replaceWith:function(node){var children=this.parent.children,index=CKEDITOR.tools.indexOf(children,this),previous=node.previous=this.previous,next=node.next=this.next;previous&&(previous.next=node);next&&(next.previous=node);children[index]=node;node.parent=this.parent;this.parent=null;},insertAfter:function(node){var children=node.parent.children,index=CKEDITOR.tools.indexOf(children,node),next=node.next;children.splice(index+1,0,this);this.next=node.next;this.previous=node;node.next=this;next&&(next.previous=this);this.parent=node.parent;},insertBefore:function(node){var children=node.parent.children,index=CKEDITOR.tools.indexOf(children,node);children.splice(index,0,this);this.next=node;this.previous=node.previous;node.previous&&(node.previous.next=this);node.previous=this;this.parent=node.parent;},getAscendant:function(condition){var checkFn=typeof condition=='function'?condition:typeof condition=='string'?function(el){return el.name==condition;}:function(el){return el.name in condition;};var parent=this.parent;while(parent&&parent.type==CKEDITOR.NODE_ELEMENT){if(checkFn(parent))
return parent;parent=parent.parent;}
return null;},wrapWith:function(wrapper){this.replaceWith(wrapper);wrapper.add(this);return wrapper;},getIndex:function(){return CKEDITOR.tools.indexOf(this.parent.children,this);},getFilterContext:function(context){return context||{};}};})();'use strict';CKEDITOR.htmlParser.comment=function(value){this.value=value;this._={isBlockLike:false};};CKEDITOR.htmlParser.comment.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(),{type:CKEDITOR.NODE_COMMENT,filter:function(filter,context){var comment=this.value;if(!(comment=filter.onComment(context,comment,this))){this.remove();return false;}
if(typeof comment!='string'){this.replaceWith(comment);return false;}
this.value=comment;return true;},writeHtml:function(writer,filter){if(filter)
this.filter(filter);writer.comment(this.value);}});'use strict';(function(){CKEDITOR.htmlParser.text=function(value){this.value=value;this._={isBlockLike:false};};CKEDITOR.htmlParser.text.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(),{type:CKEDITOR.NODE_TEXT,filter:function(filter,context){if(!(this.value=filter.onText(context,this.value,this))){this.remove();return false;}},writeHtml:function(writer,filter){if(filter)
this.filter(filter);writer.text(this.value);}});})();'use strict';(function(){CKEDITOR.htmlParser.cdata=function(value){this.value=value;};CKEDITOR.htmlParser.cdata.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(),{type:CKEDITOR.NODE_TEXT,filter:function(){},writeHtml:function(writer){writer.write(this.value);}});})();'use strict';CKEDITOR.htmlParser.fragment=function(){this.children=[];this.parent=null;this._={isBlockLike:true,hasInlineStarted:false};};(function(){var nonBreakingBlocks=CKEDITOR.tools.extend({table:1,ul:1,ol:1,dl:1},CKEDITOR.dtd.table,CKEDITOR.dtd.ul,CKEDITOR.dtd.ol,CKEDITOR.dtd.dl);var listBlocks={ol:1,ul:1};var rootDtd=CKEDITOR.tools.extend({},{html:1},CKEDITOR.dtd.html,CKEDITOR.dtd.body,CKEDITOR.dtd.head,{style:1,script:1});var structureFixes={ul:'li',ol:'li',dl:'dd',table:'tbody',tbody:'tr',thead:'tr',tfoot:'tr',tr:'td'};function isRemoveEmpty(node){if(node.attributes['data-cke-survive'])
return false;return node.name=='a'&&node.attributes.href||CKEDITOR.dtd.$removeEmpty[node.name];}
CKEDITOR.htmlParser.fragment.fromHtml=function(fragmentHtml,parent,fixingBlock){var parser=new CKEDITOR.htmlParser();var root=parent instanceof CKEDITOR.htmlParser.element?parent:typeof parent=='string'?new CKEDITOR.htmlParser.element(parent):new CKEDITOR.htmlParser.fragment();var pendingInline=[],pendingBRs=[],currentNode=root,inTextarea=root.name=='textarea',inPre=root.name=='pre';function checkPending(newTagName){var pendingBRsSent;if(pendingInline.length>0){for(var i=0;i<pendingInline.length;i++){var pendingElement=pendingInline[i],pendingName=pendingElement.name,pendingDtd=CKEDITOR.dtd[pendingName],currentDtd=currentNode.name&&CKEDITOR.dtd[currentNode.name];if((!currentDtd||currentDtd[pendingName])&&(!newTagName||!pendingDtd||pendingDtd[newTagName]||!CKEDITOR.dtd[newTagName])){if(!pendingBRsSent){sendPendingBRs();pendingBRsSent=1;}
pendingElement=pendingElement.clone();pendingElement.parent=currentNode;currentNode=pendingElement;pendingInline.splice(i,1);i--;}else{if(pendingName==currentNode.name)
addElement(currentNode,currentNode.parent,1),i--;}}}}
function sendPendingBRs(){while(pendingBRs.length)
addElement(pendingBRs.shift(),currentNode);}
function removeTailWhitespace(element){if(element._.isBlockLike&&element.name!='pre'&&element.name!='textarea'){var length=element.children.length,lastChild=element.children[length-1],text;if(lastChild&&lastChild.type==CKEDITOR.NODE_TEXT){if(!(text=CKEDITOR.tools.rtrim(lastChild.value)))
element.children.length=length-1;else
lastChild.value=text;}}}
function addElement(element,target,moveCurrent){target=target||currentNode||root;var savedCurrent=currentNode;if(element.previous===undefined){if(checkAutoParagraphing(target,element)){currentNode=target;parser.onTagOpen(fixingBlock,{});element.returnPoint=target=currentNode;}
removeTailWhitespace(element);if(!(isRemoveEmpty(element)&&!element.children.length))
target.add(element);if(element.name=='pre')
inPre=false;if(element.name=='textarea')
inTextarea=false;}
if(element.returnPoint){currentNode=element.returnPoint;delete element.returnPoint;}else{currentNode=moveCurrent?target:savedCurrent;}}
function checkAutoParagraphing(parent,node){if((parent==root||parent.name=='body')&&fixingBlock&&(!parent.name||CKEDITOR.dtd[parent.name][fixingBlock])){var name,realName;if(node.attributes&&(realName=node.attributes['data-cke-real-element-type']))
name=realName;else
name=node.name;return name&&name in CKEDITOR.dtd.$inline&&!(name in CKEDITOR.dtd.head)&&!node.isOrphan||node.type==CKEDITOR.NODE_TEXT;}}
function possiblySibling(tag1,tag2){if(tag1 in CKEDITOR.dtd.$listItem||tag1 in CKEDITOR.dtd.$tableContent)
return tag1==tag2||tag1=='dt'&&tag2=='dd'||tag1=='dd'&&tag2=='dt';return false;}
parser.onTagOpen=function(tagName,attributes,selfClosing,optionalClose){var element=new CKEDITOR.htmlParser.element(tagName,attributes);if(element.isUnknown&&selfClosing)
element.isEmpty=true;element.isOptionalClose=optionalClose;if(isRemoveEmpty(element)){pendingInline.push(element);return;}else if(tagName=='pre')
inPre=true;else if(tagName=='br'&&inPre){currentNode.add(new CKEDITOR.htmlParser.text('\n'));return;}else if(tagName=='textarea'){inTextarea=true;}
if(tagName=='br'){pendingBRs.push(element);return;}
while(1){var currentName=currentNode.name;var currentDtd=currentName?(CKEDITOR.dtd[currentName]||(currentNode._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span)):rootDtd;if(!element.isUnknown&&!currentNode.isUnknown&&!currentDtd[tagName]){if(currentNode.isOptionalClose)
parser.onTagClose(currentName);else if(tagName in listBlocks&&currentName in listBlocks){var children=currentNode.children,lastChild=children[children.length-1];if(!(lastChild&&lastChild.name=='li'))
addElement((lastChild=new CKEDITOR.htmlParser.element('li')),currentNode);!element.returnPoint&&(element.returnPoint=currentNode);currentNode=lastChild;}
else if(tagName in CKEDITOR.dtd.$listItem&&!possiblySibling(tagName,currentName)){parser.onTagOpen(tagName=='li'?'ul':'dl',{},0,1);}
else if(currentName in nonBreakingBlocks&&!possiblySibling(tagName,currentName)){!element.returnPoint&&(element.returnPoint=currentNode);currentNode=currentNode.parent;}else{if(currentName in CKEDITOR.dtd.$inline)
pendingInline.unshift(currentNode);if(currentNode.parent)
addElement(currentNode,currentNode.parent,1);else{element.isOrphan=1;break;}}}else{break;}}
checkPending(tagName);sendPendingBRs();element.parent=currentNode;if(element.isEmpty)
addElement(element);else
currentNode=element;};parser.onTagClose=function(tagName){for(var i=pendingInline.length-1;i>=0;i--){if(tagName==pendingInline[i].name){pendingInline.splice(i,1);return;}}
var pendingAdd=[],newPendingInline=[],candidate=currentNode;while(candidate!=root&&candidate.name!=tagName){if(!candidate._.isBlockLike)
newPendingInline.unshift(candidate);pendingAdd.push(candidate);candidate=candidate.returnPoint||candidate.parent;}
if(candidate!=root){for(i=0;i<pendingAdd.length;i++){var node=pendingAdd[i];addElement(node,node.parent);}
currentNode=candidate;if(candidate._.isBlockLike)
sendPendingBRs();addElement(candidate,candidate.parent);if(candidate==currentNode)
currentNode=currentNode.parent;pendingInline=pendingInline.concat(newPendingInline);}
if(tagName=='body')
fixingBlock=false;};parser.onText=function(text){if((!currentNode._.hasInlineStarted||pendingBRs.length)&&!inPre&&!inTextarea){text=CKEDITOR.tools.ltrim(text);if(text.length===0)
return;}
var currentName=currentNode.name,currentDtd=currentName?(CKEDITOR.dtd[currentName]||(currentNode._.isBlockLike?CKEDITOR.dtd.div:CKEDITOR.dtd.span)):rootDtd;if(!inTextarea&&!currentDtd['#']&&currentName in nonBreakingBlocks){parser.onTagOpen(structureFixes[currentName]||'');parser.onText(text);return;}
sendPendingBRs();checkPending();if(!inPre&&!inTextarea)
text=text.replace(/[\t\r\n ]{2,}|[\t\r\n]/g,' ');text=new CKEDITOR.htmlParser.text(text);if(checkAutoParagraphing(currentNode,text))
this.onTagOpen(fixingBlock,{},0,1);currentNode.add(text);};parser.onCDATA=function(cdata){currentNode.add(new CKEDITOR.htmlParser.cdata(cdata));};parser.onComment=function(comment){sendPendingBRs();checkPending();currentNode.add(new CKEDITOR.htmlParser.comment(comment));};parser.parse(fragmentHtml);sendPendingBRs();while(currentNode!=root)
addElement(currentNode,currentNode.parent,1);removeTailWhitespace(root);return root;};CKEDITOR.htmlParser.fragment.prototype={type:CKEDITOR.NODE_DOCUMENT_FRAGMENT,add:function(node,index){isNaN(index)&&(index=this.children.length);var previous=index>0?this.children[index-1]:null;if(previous){if(node._.isBlockLike&&previous.type==CKEDITOR.NODE_TEXT){previous.value=CKEDITOR.tools.rtrim(previous.value);if(previous.value.length===0){this.children.pop();this.add(node);return;}}
previous.next=node;}
node.previous=previous;node.parent=this;this.children.splice(index,0,node);if(!this._.hasInlineStarted)
this._.hasInlineStarted=node.type==CKEDITOR.NODE_TEXT||(node.type==CKEDITOR.NODE_ELEMENT&&!node._.isBlockLike);},filter:function(filter,context){context=this.getFilterContext(context);filter.onRoot(context,this);this.filterChildren(filter,false,context);},filterChildren:function(filter,filterRoot,context){if(this.childrenFilteredBy==filter.id)
return;context=this.getFilterContext(context);if(filterRoot&&!this.parent)
filter.onRoot(context,this);this.childrenFilteredBy=filter.id;for(var i=0;i<this.children.length;i++){if(this.children[i].filter(filter,context)===false)
i--;}},writeHtml:function(writer,filter){if(filter)
this.filter(filter);this.writeChildrenHtml(writer);},writeChildrenHtml:function(writer,filter,filterRoot){var context=this.getFilterContext();if(filterRoot&&!this.parent&&filter)
filter.onRoot(context,this);if(filter)
this.filterChildren(filter,false,context);for(var i=0,children=this.children,l=children.length;i<l;i++)
children[i].writeHtml(writer);},forEach:function(callback,type,skipRoot){if(!skipRoot&&(!type||this.type==type))
var ret=callback(this);if(ret===false)
return;var children=this.children,node,i=0;for(;i<children.length;i++){node=children[i];if(node.type==CKEDITOR.NODE_ELEMENT)
node.forEach(callback,type);else if(!type||node.type==type)
callback(node);}},getFilterContext:function(context){return context||{};}};})();'use strict';(function(){CKEDITOR.htmlParser.filter=CKEDITOR.tools.createClass({$:function(rules){this.id=CKEDITOR.tools.getNextNumber();this.elementNameRules=new filterRulesGroup();this.attributeNameRules=new filterRulesGroup();this.elementsRules={};this.attributesRules={};this.textRules=new filterRulesGroup();this.commentRules=new filterRulesGroup();this.rootRules=new filterRulesGroup();if(rules)
this.addRules(rules,10);},proto:{addRules:function(rules,options){var priority;if(typeof options=='number')
priority=options;else if(options&&('priority'in options))
priority=options.priority;if(typeof priority!='number')
priority=10;if(typeof options!='object')
options={};if(rules.elementNames)
this.elementNameRules.addMany(rules.elementNames,priority,options);if(rules.attributeNames)
this.attributeNameRules.addMany(rules.attributeNames,priority,options);if(rules.elements)
addNamedRules(this.elementsRules,rules.elements,priority,options);if(rules.attributes)
addNamedRules(this.attributesRules,rules.attributes,priority,options);if(rules.text)
this.textRules.add(rules.text,priority,options);if(rules.comment)
this.commentRules.add(rules.comment,priority,options);if(rules.root)
this.rootRules.add(rules.root,priority,options);},applyTo:function(node){node.filter(this);},onElementName:function(context,name){return this.elementNameRules.execOnName(context,name);},onAttributeName:function(context,name){return this.attributeNameRules.execOnName(context,name);},onText:function(context,text,node){return this.textRules.exec(context,text,node);},onComment:function(context,commentText,comment){return this.commentRules.exec(context,commentText,comment);},onRoot:function(context,element){return this.rootRules.exec(context,element);},onElement:function(context,element){var rulesGroups=[this.elementsRules['^'],this.elementsRules[element.name],this.elementsRules.$],rulesGroup,ret;for(var i=0;i<3;i++){rulesGroup=rulesGroups[i];if(rulesGroup){ret=rulesGroup.exec(context,element,this);if(ret===false)
return null;if(ret&&ret!=element)
return this.onNode(context,ret);if(element.parent&&!element.name)
break;}}
return element;},onNode:function(context,node){var type=node.type;return type==CKEDITOR.NODE_ELEMENT?this.onElement(context,node):type==CKEDITOR.NODE_TEXT?new CKEDITOR.htmlParser.text(this.onText(context,node.value)):type==CKEDITOR.NODE_COMMENT?new CKEDITOR.htmlParser.comment(this.onComment(context,node.value)):null;},onAttribute:function(context,element,name,value){var rulesGroup=this.attributesRules[name];if(rulesGroup)
return rulesGroup.exec(context,value,element,this);return value;}}});function filterRulesGroup(){this.rules=[];}
CKEDITOR.htmlParser.filterRulesGroup=filterRulesGroup;filterRulesGroup.prototype={add:function(rule,priority,options){this.rules.splice(this.findIndex(priority),0,{value:rule,priority:priority,options:options});},addMany:function(rules,priority,options){var args=[this.findIndex(priority),0];for(var i=0,len=rules.length;i<len;i++){args.push({value:rules[i],priority:priority,options:options});}
this.rules.splice.apply(this.rules,args);},findIndex:function(priority){var rules=this.rules,len=rules.length,i=len-1;while(i>=0&&priority<rules[i].priority)
i--;return i+1;},exec:function(context,currentValue){var isNode=currentValue instanceof CKEDITOR.htmlParser.node||currentValue instanceof CKEDITOR.htmlParser.fragment,args=Array.prototype.slice.call(arguments,1),rules=this.rules,len=rules.length,orgType,orgName,ret,i,rule;for(i=0;i<len;i++){if(isNode){orgType=currentValue.type;orgName=currentValue.name;}
rule=rules[i];if(isRuleApplicable(context,rule)){ret=rule.value.apply(null,args);if(ret===false)
return ret;if(isNode&&ret&&(ret.name!=orgName||ret.type!=orgType))
return ret;if(ret!=null)
args[0]=currentValue=ret;}}
return currentValue;},execOnName:function(context,currentName){var i=0,rules=this.rules,len=rules.length,rule;for(;currentName&&i<len;i++){rule=rules[i];if(isRuleApplicable(context,rule))
currentName=currentName.replace(rule.value[0],rule.value[1]);}
return currentName;}};function addNamedRules(rulesGroups,newRules,priority,options){var ruleName,rulesGroup;for(ruleName in newRules){rulesGroup=rulesGroups[ruleName];if(!rulesGroup)
rulesGroup=rulesGroups[ruleName]=new filterRulesGroup();rulesGroup.add(newRules[ruleName],priority,options);}}
function isRuleApplicable(context,rule){if(context.nonEditable&&!rule.options.applyToAll)
return false;if(context.nestedEditable&&rule.options.excludeNestedEditable)
return false;return true;}})();(function(){CKEDITOR.htmlDataProcessor=function(editor){var dataFilter,htmlFilter,that=this;this.editor=editor;this.dataFilter=dataFilter=new CKEDITOR.htmlParser.filter();this.htmlFilter=htmlFilter=new CKEDITOR.htmlParser.filter();this.writer=new CKEDITOR.htmlParser.basicWriter();dataFilter.addRules(defaultDataFilterRulesEditableOnly);dataFilter.addRules(defaultDataFilterRulesForAll,{applyToAll:true});dataFilter.addRules(createBogusAndFillerRules(editor,'data'),{applyToAll:true});htmlFilter.addRules(defaultHtmlFilterRulesEditableOnly);htmlFilter.addRules(defaultHtmlFilterRulesForAll,{applyToAll:true});htmlFilter.addRules(createBogusAndFillerRules(editor,'html'),{applyToAll:true});editor.on('toHtml',function(evt){var evtData=evt.data,data=evtData.dataValue,fixBodyTag;data=protectSource(data,editor);data=protectElements(data,protectTextareaRegex);data=protectAttributes(data);data=protectElements(data,protectElementsRegex);data=protectElementsNames(data);data=protectSelfClosingElements(data);data=protectPreFormatted(data);data=protectInsecureAttributes(data);var fixBin=evtData.context||editor.editable().getName(),isPre;if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&fixBin=='pre'){fixBin='div';data='<pre>'+data+'</pre>';isPre=1;}
var el=editor.document.createElement(fixBin);el.setHtml('a'+data);data=el.getHtml().substr(1);data=data.replace(new RegExp('data-cke-'+CKEDITOR.rnd+'-','ig'),'');isPre&&(data=data.replace(/^<pre>|<\/pre>$/gi,''));data=unprotectElementNames(data);data=unprotectElements(data);data=unprotectRealComments(data);if(evtData.fixForBody===false){fixBodyTag=false;}else{fixBodyTag=getFixBodyTag(evtData.enterMode,editor.config.autoParagraph);}
data=CKEDITOR.htmlParser.fragment.fromHtml(data,evtData.context,fixBodyTag);if(fixBodyTag){fixEmptyRoot(data,fixBodyTag);}
evtData.dataValue=data;},null,null,5);editor.on('toHtml',function(evt){if(evt.data.filter.applyTo(evt.data.dataValue,true,evt.data.dontFilter,evt.data.enterMode))
editor.fire('dataFiltered');},null,null,6);editor.on('toHtml',function(evt){evt.data.dataValue.filterChildren(that.dataFilter,true);},null,null,10);editor.on('toHtml',function(evt){var evtData=evt.data,data=evtData.dataValue,writer=new CKEDITOR.htmlParser.basicWriter();data.writeChildrenHtml(writer);data=writer.getHtml(true);evtData.dataValue=protectRealComments(data);},null,null,15);editor.on('toDataFormat',function(evt){var data=evt.data.dataValue;if(evt.data.enterMode!=CKEDITOR.ENTER_BR)
data=data.replace(/^<br *\/?>/i,'');evt.data.dataValue=CKEDITOR.htmlParser.fragment.fromHtml(data,evt.data.context,getFixBodyTag(evt.data.enterMode,editor.config.autoParagraph));},null,null,5);editor.on('toDataFormat',function(evt){evt.data.dataValue.filterChildren(that.htmlFilter,true);},null,null,10);editor.on('toDataFormat',function(evt){evt.data.filter.applyTo(evt.data.dataValue,false,true);},null,null,11);editor.on('toDataFormat',function(evt){var data=evt.data.dataValue,writer=that.writer;writer.reset();data.writeChildrenHtml(writer);data=writer.getHtml(true);data=unprotectRealComments(data);data=unprotectSource(data,editor);evt.data.dataValue=data;},null,null,15);};CKEDITOR.htmlDataProcessor.prototype={toHtml:function(data,options,fixForBody,dontFilter){var editor=this.editor,context,filter,enterMode,protectedWhitespaces;if(options&&typeof options=='object'){context=options.context;fixForBody=options.fixForBody;dontFilter=options.dontFilter;filter=options.filter;enterMode=options.enterMode;protectedWhitespaces=options.protectedWhitespaces;}
else{context=options;}
if(!context&&context!==null)
context=editor.editable().getName();return editor.fire('toHtml',{dataValue:data,context:context,fixForBody:fixForBody,dontFilter:dontFilter,filter:filter||editor.filter,enterMode:enterMode||editor.enterMode,protectedWhitespaces:protectedWhitespaces}).dataValue;},toDataFormat:function(html,options){var context,filter,enterMode;if(options){context=options.context;filter=options.filter;enterMode=options.enterMode;}
if(!context&&context!==null)
context=this.editor.editable().getName();return this.editor.fire('toDataFormat',{dataValue:html,filter:filter||this.editor.filter,context:context,enterMode:enterMode||this.editor.enterMode}).dataValue;}};function createBogusAndFillerRules(editor,type){function createFiller(isOutput){return isOutput||CKEDITOR.env.needsNbspFiller?new CKEDITOR.htmlParser.text('\xa0'):new CKEDITOR.htmlParser.element('br',{'data-cke-bogus':1});}
function blockFilter(isOutput,fillEmptyBlock){return function(block){if(block.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)
return;cleanBogus(block);var shouldFillBlock=!isOutput||(typeof fillEmptyBlock=='function'?fillEmptyBlock(block):fillEmptyBlock)!==false;if(shouldFillBlock&&isEmptyBlockNeedFiller(block)){block.add(createFiller(isOutput));}};}
function brFilter(isOutput){return function(br){if(br.parent.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)
return;var attrs=br.attributes;if('data-cke-bogus'in attrs||'data-cke-eol'in attrs){delete attrs['data-cke-bogus'];return;}
var next=getNext(br),previous=getPrevious(br);if(!next&&isBlockBoundary(br.parent))
append(br.parent,createFiller(isOutput));else if(isBlockBoundary(next)&&previous&&!isBlockBoundary(previous))
createFiller(isOutput).insertBefore(next);};}
function maybeBogus(node,atBlockEnd){if(!(isOutput&&!CKEDITOR.env.needsBrFiller)&&node.type==CKEDITOR.NODE_ELEMENT&&node.name=='br'&&!node.attributes['data-cke-eol']){return true;}
var match;if(node.type==CKEDITOR.NODE_TEXT&&(match=node.value.match(tailNbspRegex))){if(match.index){(new CKEDITOR.htmlParser.text(node.value.substring(0,match.index))).insertBefore(node);node.value=match[0];}
if(!CKEDITOR.env.needsBrFiller&&isOutput&&(!atBlockEnd||node.parent.name in textBlockTags))
return true;if(!isOutput){var previous=node.previous;if(previous&&previous.name=='br')
return true;if(!previous||isBlockBoundary(previous))
return true;}}
return false;}
function cleanBogus(block){var bogus=[];var last=getLast(block),node,previous;if(last){maybeBogus(last,1)&&bogus.push(last);while(last){if(isBlockBoundary(last)&&(node=getPrevious(last))&&maybeBogus(node)){if((previous=getPrevious(node))&&!isBlockBoundary(previous))
bogus.push(node);else{createFiller(isOutput).insertAfter(node);node.remove();}}
last=last.previous;}}
for(var i=0;i<bogus.length;i++)
bogus[i].remove();}
function isEmptyBlockNeedFiller(block){if(!isOutput&&!CKEDITOR.env.needsBrFiller&&block.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT)
return false;if(!isOutput&&!CKEDITOR.env.needsBrFiller&&(document.documentMode>7||block.name in CKEDITOR.dtd.tr||block.name in CKEDITOR.dtd.$listItem)){return false;}
var last=getLast(block);return!last||block.name=='form'&&last.name=='input';}
var rules={elements:{}},isOutput=type=='html',textBlockTags=CKEDITOR.tools.extend({},blockLikeTags);for(var i in textBlockTags){if(!('#'in dtd[i]))
delete textBlockTags[i];}
for(i in textBlockTags)
rules.elements[i]=blockFilter(isOutput,editor.config.fillEmptyBlocks);rules.root=blockFilter(isOutput,false);rules.elements.br=brFilter(isOutput);return rules;}
function getFixBodyTag(enterMode,autoParagraph){return(enterMode!=CKEDITOR.ENTER_BR&&autoParagraph!==false)?enterMode==CKEDITOR.ENTER_DIV?'div':'p':false;}
var tailNbspRegex=/(?:&nbsp;|\xa0)$/;var protectedSourceMarker='{cke_protected}';function getLast(node){var last=node.children[node.children.length-1];while(last&&isEmpty(last))
last=last.previous;return last;}
function getNext(node){var next=node.next;while(next&&isEmpty(next))
next=next.next;return next;}
function getPrevious(node){var previous=node.previous;while(previous&&isEmpty(previous))
previous=previous.previous;return previous;}
function isEmpty(node){return node.type==CKEDITOR.NODE_TEXT&&!CKEDITOR.tools.trim(node.value)||node.type==CKEDITOR.NODE_ELEMENT&&node.attributes['data-cke-bookmark'];}
function isBlockBoundary(node){return node&&(node.type==CKEDITOR.NODE_ELEMENT&&node.name in blockLikeTags||node.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT);}
function append(parent,node){var last=parent.children[parent.children.length-1];parent.children.push(node);node.parent=parent;if(last){last.next=node;node.previous=last;}}
function getNodeIndex(node){return node.parent?node.getIndex():-1;}
var dtd=CKEDITOR.dtd,tableOrder=['caption','colgroup','col','thead','tfoot','tbody'],blockLikeTags=CKEDITOR.tools.extend({},dtd.$blockLimit,dtd.$block);var defaultDataFilterRulesEditableOnly={elements:{input:protectReadOnly,textarea:protectReadOnly}};var defaultDataFilterRulesForAll={attributeNames:[[(/^on/),'data-cke-pa-on'],[(/^data-cke-expando$/),'']]};function protectReadOnly(element){var attrs=element.attributes;if(attrs.contenteditable!='false')
attrs['data-cke-editable']=attrs.contenteditable?'true':1;attrs.contenteditable='false';}
var defaultHtmlFilterRulesEditableOnly={elements:{embed:function(element){var parent=element.parent;if(parent&&parent.name=='object'){var parentWidth=parent.attributes.width,parentHeight=parent.attributes.height;if(parentWidth)
element.attributes.width=parentWidth;if(parentHeight)
element.attributes.height=parentHeight;}},a:function(element){if(!(element.children.length||element.attributes.name||element.attributes['data-cke-saved-name']))
return false;}}};var defaultHtmlFilterRulesForAll={elementNames:[[(/^cke:/),''],[(/^\?xml:namespace$/),'']],attributeNames:[[(/^data-cke-(saved|pa)-/),''],[(/^data-cke-.*/),''],['hidefocus','']],elements:{$:function(element){var attribs=element.attributes;if(attribs){if(attribs['data-cke-temp'])
return false;var attributeNames=['name','href','src'],savedAttributeName;for(var i=0;i<attributeNames.length;i++){savedAttributeName='data-cke-saved-'+attributeNames[i];savedAttributeName in attribs&&(delete attribs[attributeNames[i]]);}}
return element;},table:function(element){var children=element.children.slice(0);children.sort(function(node1,node2){var index1,index2;if(node1.type==CKEDITOR.NODE_ELEMENT&&node2.type==node1.type){index1=CKEDITOR.tools.indexOf(tableOrder,node1.name);index2=CKEDITOR.tools.indexOf(tableOrder,node2.name);}
if(!(index1>-1&&index2>-1&&index1!=index2)){index1=getNodeIndex(node1);index2=getNodeIndex(node2);}
return index1>index2?1:-1;});},param:function(param){param.children=[];param.isEmpty=true;return param;},span:function(element){if(element.attributes['class']=='Apple-style-span')
delete element.name;},html:function(element){delete element.attributes.contenteditable;delete element.attributes['class'];},body:function(element){delete element.attributes.spellcheck;delete element.attributes.contenteditable;},style:function(element){var child=element.children[0];if(child&&child.value)
child.value=CKEDITOR.tools.trim(child.value);if(!element.attributes.type)
element.attributes.type='text/css';},title:function(element){var titleText=element.children[0];!titleText&&append(element,titleText=new CKEDITOR.htmlParser.text());titleText.value=element.attributes['data-cke-title']||'';},input:unprotectReadyOnly,textarea:unprotectReadyOnly},attributes:{'class':function(value){return CKEDITOR.tools.ltrim(value.replace(/(?:^|\s+)cke_[^\s]*/g,''))||false;}}};if(CKEDITOR.env.ie){defaultHtmlFilterRulesForAll.attributes.style=function(value){return value.replace(/(^|;)([^\:]+)/g,function(match){return match.toLowerCase();});};}
function unprotectReadyOnly(element){var attrs=element.attributes;switch(attrs['data-cke-editable']){case'true':attrs.contenteditable='true';break;case'1':delete attrs.contenteditable;break;}}
var protectElementRegex=/<(a|area|img|input|source)\b([^>]*)>/gi,protectAttributeRegex=/([\w-:]+)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi,protectAttributeNameRegex=/^(href|src|name)$/i;var protectElementsRegex=/(?:<style(?=[ >])[^>]*>[\s\S]*?<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi,protectTextareaRegex=/(<textarea(?=[ >])[^>]*>)([\s\S]*?)(?:<\/textarea>)/gi,encodedElementsRegex=/<cke:encoded>([^<]*)<\/cke:encoded>/gi;var protectElementNamesRegex=/(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi,unprotectElementNamesRegex=/(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi;var protectSelfClosingRegex=/<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;function protectAttributes(html){return html.replace(protectElementRegex,function(element,tag,attributes){return'<'+tag+attributes.replace(protectAttributeRegex,function(fullAttr,attrName){if(protectAttributeNameRegex.test(attrName)&&attributes.indexOf('data-cke-saved-'+attrName)==-1)
return' data-cke-saved-'+fullAttr+' data-cke-'+CKEDITOR.rnd+'-'+fullAttr;return fullAttr;})+'>';});}
function protectElements(html,regex){return html.replace(regex,function(match,tag,content){if(match.indexOf('<textarea')===0)
match=tag+unprotectRealComments(content).replace(/</g,'&lt;').replace(/>/g,'&gt;')+'</textarea>';return'<cke:encoded>'+encodeURIComponent(match)+'</cke:encoded>';});}
function unprotectElements(html){return html.replace(encodedElementsRegex,function(match,encoded){return decodeURIComponent(encoded);});}
function protectElementsNames(html){return html.replace(protectElementNamesRegex,'$1cke:$2');}
function unprotectElementNames(html){return html.replace(unprotectElementNamesRegex,'$1$2');}
function protectSelfClosingElements(html){return html.replace(protectSelfClosingRegex,'<cke:$1$2></cke:$1>');}
function protectPreFormatted(html){return html.replace(/(<pre\b[^>]*>)(\r\n|\n)/g,'$1$2$2');}
function protectRealComments(html){return html.replace(/<!--(?!{cke_protected})[\s\S]+?-->/g,function(match){return'<!--'+protectedSourceMarker+'{C}'+
encodeURIComponent(match).replace(/--/g,'%2D%2D')+'-->';});}
function protectInsecureAttributes(html){return html.replace(/([^a-z0-9<\-])(on\w{3,})(?!>)/gi,'$1data-cke-'+CKEDITOR.rnd+'-$2');}
function unprotectRealComments(html){return html.replace(/<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g,function(match,data){return decodeURIComponent(data);});}
function unprotectSource(html,editor){var store=editor._.dataStore;return html.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g,function(match,data){return decodeURIComponent(data);}).replace(/\{cke_protected_(\d+)\}/g,function(match,id){return store&&store[id]||'';});}
function protectSource(data,editor){var protectedHtml=[],protectRegexes=editor.config.protectedSource,store=editor._.dataStore||(editor._.dataStore={id:1}),tempRegex=/<\!--\{cke_temp(comment)?\}(\d*?)-->/g;var regexes=[(/<script[\s\S]*?(<\/script>|$)/gi),/<noscript[\s\S]*?<\/noscript>/gi,/<meta[\s\S]*?\/?>/gi].concat(protectRegexes);data=data.replace((/<!--[\s\S]*?-->/g),function(match){return'<!--{cke_tempcomment}'+(protectedHtml.push(match)-1)+'-->';});for(var i=0;i<regexes.length;i++){data=data.replace(regexes[i],function(match){match=match.replace(tempRegex,function($,isComment,id){return protectedHtml[id];});return(/cke_temp(comment)?/).test(match)?match:'<!--{cke_temp}'+(protectedHtml.push(match)-1)+'-->';});}
data=data.replace(tempRegex,function($,isComment,id){return'<!--'+protectedSourceMarker+
(isComment?'{C}':'')+
encodeURIComponent(protectedHtml[id]).replace(/--/g,'%2D%2D')+'-->';});data=data.replace(/<\w+(?:\s+(?:(?:[^\s=>]+\s*=\s*(?:[^'"\s>]+|'[^']*'|"[^"]*"))|[^\s=\/>]+))+\s*\/?>/g,function(match){return match.replace(/<!--\{cke_protected\}([^>]*)-->/g,function(match,data){store[store.id]=decodeURIComponent(data);return'{cke_protected_'+(store.id++)+'}';});});data=data.replace(/<(title|iframe|textarea)([^>]*)>([\s\S]*?)<\/\1>/g,function(match,tagName,tagAttributes,innerText){return'<'+tagName+tagAttributes+'>'+unprotectSource(unprotectRealComments(innerText),editor)+'</'+tagName+'>';});return data;}
function fixEmptyRoot(root,fixBodyTag){if(!root.children.length&&CKEDITOR.dtd[root.name][fixBodyTag]){var fixBodyElement=new CKEDITOR.htmlParser.element(fixBodyTag);root.add(fixBodyElement);}}})();'use strict';CKEDITOR.htmlParser.element=function(name,attributes){this.name=name;this.attributes=attributes||{};this.children=[];var realName=name||'',prefixed=realName.match(/^cke:(.*)/);prefixed&&(realName=prefixed[1]);var isBlockLike=!!(CKEDITOR.dtd.$nonBodyContent[realName]||CKEDITOR.dtd.$block[realName]||CKEDITOR.dtd.$listItem[realName]||CKEDITOR.dtd.$tableContent[realName]||CKEDITOR.dtd.$nonEditable[realName]||realName=='br');this.isEmpty=!!CKEDITOR.dtd.$empty[name];this.isUnknown=!CKEDITOR.dtd[name];this._={isBlockLike:isBlockLike,hasInlineStarted:this.isEmpty||!isBlockLike};};CKEDITOR.htmlParser.cssStyle=function(){var styleText,arg=arguments[0],rules={};styleText=arg instanceof CKEDITOR.htmlParser.element?arg.attributes.style:arg;(styleText||'').replace(/&quot;/g,'"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g,function(match,name,value){name=='font-family'&&(value=value.replace(/["']/g,''));rules[name.toLowerCase()]=value;});return{rules:rules,populate:function(obj){var style=this.toString();if(style)
obj instanceof CKEDITOR.dom.element?obj.setAttribute('style',style):obj instanceof CKEDITOR.htmlParser.element?obj.attributes.style=style:obj.style=style;},toString:function(){var output=[];for(var i in rules)
rules[i]&&output.push(i,':',rules[i],';');return output.join('');}};};(function(){var sortAttribs=function(a,b){a=a[0];b=b[0];return a<b?-1:a>b?1:0;},fragProto=CKEDITOR.htmlParser.fragment.prototype;CKEDITOR.htmlParser.element.prototype=CKEDITOR.tools.extend(new CKEDITOR.htmlParser.node(),{type:CKEDITOR.NODE_ELEMENT,add:fragProto.add,clone:function(){return new CKEDITOR.htmlParser.element(this.name,this.attributes);},filter:function(filter,context){var element=this,originalName,name;context=element.getFilterContext(context);if(context.off)
return true;if(!element.parent)
filter.onRoot(context,element);while(true){originalName=element.name;if(!(name=filter.onElementName(context,originalName))){this.remove();return false;}
element.name=name;if(!(element=filter.onElement(context,element))){this.remove();return false;}
if(element!==this){this.replaceWith(element);return false;}
if(element.name==originalName)
break;if(element.type!=CKEDITOR.NODE_ELEMENT){this.replaceWith(element);return false;}
if(!element.name){this.replaceWithChildren();return false;}}
var attributes=element.attributes,a,value,newAttrName;for(a in attributes){newAttrName=a;value=attributes[a];while(true){if(!(newAttrName=filter.onAttributeName(context,a))){delete attributes[a];break;}else if(newAttrName!=a){delete attributes[a];a=newAttrName;continue;}else{break;}}
if(newAttrName){if((value=filter.onAttribute(context,element,newAttrName,value))===false)
delete attributes[newAttrName];else
attributes[newAttrName]=value;}}
if(!element.isEmpty)
this.filterChildren(filter,false,context);return true;},filterChildren:fragProto.filterChildren,writeHtml:function(writer,filter){if(filter)
this.filter(filter);var name=this.name,attribsArray=[],attributes=this.attributes,attrName,attr,i,l;writer.openTag(name,attributes);for(attrName in attributes)
attribsArray.push([attrName,attributes[attrName]]);if(writer.sortAttributes)
attribsArray.sort(sortAttribs);for(i=0,l=attribsArray.length;i<l;i++){attr=attribsArray[i];writer.attribute(attr[0],attr[1]);}
writer.openTagClose(name,this.isEmpty);this.writeChildrenHtml(writer);if(!this.isEmpty)
writer.closeTag(name);},writeChildrenHtml:fragProto.writeChildrenHtml,replaceWithChildren:function(){var children=this.children;for(var i=children.length;i;)
children[--i].insertAfter(this);this.remove();},forEach:fragProto.forEach,getFirst:function(condition){if(!condition)
return this.children.length?this.children[0]:null;if(typeof condition!='function')
condition=nameCondition(condition);for(var i=0,l=this.children.length;i<l;++i){if(condition(this.children[i]))
return this.children[i];}
return null;},getHtml:function(){var writer=new CKEDITOR.htmlParser.basicWriter();this.writeChildrenHtml(writer);return writer.getHtml();},setHtml:function(html){var children=this.children=CKEDITOR.htmlParser.fragment.fromHtml(html).children;for(var i=0,l=children.length;i<l;++i)
children[i].parent=this;},getOuterHtml:function(){var writer=new CKEDITOR.htmlParser.basicWriter();this.writeHtml(writer);return writer.getHtml();},split:function(index){var cloneChildren=this.children.splice(index,this.children.length-index),clone=this.clone();for(var i=0;i<cloneChildren.length;++i)
cloneChildren[i].parent=clone;clone.children=cloneChildren;if(cloneChildren[0])
cloneChildren[0].previous=null;if(index>0)
this.children[index-1].next=null;this.parent.add(clone,this.getIndex()+1);return clone;},addClass:function(className){if(this.hasClass(className))
return;var c=this.attributes['class']||'';this.attributes['class']=c+(c?' ':'')+className;},removeClass:function(className){var classes=this.attributes['class'];if(!classes)
return;classes=CKEDITOR.tools.trim(classes.replace(new RegExp('(?:\\s+|^)'+className+'(?:\\s+|$)'),' '));if(classes)
this.attributes['class']=classes;else
delete this.attributes['class'];},hasClass:function(className){var classes=this.attributes['class'];if(!classes)
return false;return(new RegExp('(?:^|\\s)'+className+'(?=\\s|$)')).test(classes);},getFilterContext:function(ctx){var changes=[];if(!ctx){ctx={off:false,nonEditable:false,nestedEditable:false};}
if(!ctx.off&&this.attributes['data-cke-processor']=='off')
changes.push('off',true);if(!ctx.nonEditable&&this.attributes.contenteditable=='false')
changes.push('nonEditable',true);else if(ctx.nonEditable&&!ctx.nestedEditable&&this.attributes.contenteditable=='true')
changes.push('nestedEditable',true);if(changes.length){ctx=CKEDITOR.tools.copy(ctx);for(var i=0;i<changes.length;i+=2)
ctx[changes[i]]=changes[i+1];}
return ctx;}},true);function nameCondition(condition){return function(el){return el.type==CKEDITOR.NODE_ELEMENT&&(typeof condition=='string'?el.name==condition:el.name in condition);};}})();(function(){var cache={},rePlaceholder=/{([^}]+)}/g,reEscapableChars=/([\\'])/g,reNewLine=/\n/g,reCarriageReturn=/\r/g;CKEDITOR.template=function(source){if(cache[source])
this.output=cache[source];else{var fn=source.replace(reEscapableChars,'\\$1').replace(reNewLine,'\\n').replace(reCarriageReturn,'\\r').replace(rePlaceholder,function(m,key){return"',data['"+key+"']==undefined?'{"+key+"}':data['"+key+"'],'";});fn="return buffer?buffer.push('"+fn+"'):['"+fn+"'].join('');";this.output=cache[source]=Function('data','buffer',fn);}};})();delete CKEDITOR.loadFullCore;CKEDITOR.instances={};CKEDITOR.document=new CKEDITOR.dom.document(document);CKEDITOR.add=function(editor){CKEDITOR.instances[editor.name]=editor;editor.on('focus',function(){if(CKEDITOR.currentInstance!=editor){CKEDITOR.currentInstance=editor;CKEDITOR.fire('currentInstance');}});editor.on('blur',function(){if(CKEDITOR.currentInstance==editor){CKEDITOR.currentInstance=null;CKEDITOR.fire('currentInstance');}});CKEDITOR.fire('instance',null,editor);};CKEDITOR.remove=function(editor){delete CKEDITOR.instances[editor.name];};(function(){var tpls={};CKEDITOR.addTemplate=function(name,source){var tpl=tpls[name];if(tpl)
return tpl;var params={name:name,source:source};CKEDITOR.fire('template',params);return(tpls[name]=new CKEDITOR.template(params.source));};CKEDITOR.getTemplate=function(name){return tpls[name];};})();(function(){var styles=[];CKEDITOR.addCss=function(css){styles.push(css);};CKEDITOR.getCss=function(){return styles.join('\n');};})();CKEDITOR.on('instanceDestroyed',function(){if(CKEDITOR.tools.isEmpty(this.instances))
CKEDITOR.fire('reset');});CKEDITOR.TRISTATE_ON=1;CKEDITOR.TRISTATE_OFF=2;CKEDITOR.TRISTATE_DISABLED=0;(function(){CKEDITOR.inline=function(element,instanceConfig){if(!CKEDITOR.env.isCompatible)
return null;element=CKEDITOR.dom.element.get(element);if(element.getEditor())
throw'The editor instance "'+element.getEditor().name+'" is already attached to the provided element.';var editor=new CKEDITOR.editor(instanceConfig,element,CKEDITOR.ELEMENT_MODE_INLINE),textarea=element.is('textarea')?element:null;if(textarea){editor.setData(textarea.getValue(),null,true);element=CKEDITOR.dom.element.createFromHtml('<div contenteditable="'+!!editor.readOnly+'" class="cke_textarea_inline">'+
textarea.getValue()+'</div>',CKEDITOR.document);element.insertAfter(textarea);textarea.hide();if(textarea.$.form)
editor._attachToForm();}else{editor.setData(element.getHtml(),null,true);}
editor.on('loaded',function(){editor.fire('uiReady');editor.editable(element);editor.container=element;editor.ui.contentsElement=element;editor.setData(editor.getData(1));editor.resetDirty();editor.fire('contentDom');editor.mode='wysiwyg';editor.fire('mode');editor.status='ready';editor.fireOnce('instanceReady');CKEDITOR.fire('instanceReady',null,editor);},null,null,10000);editor.on('destroy',function(){if(textarea){editor.container.clearCustomData();editor.container.remove();textarea.show();}
editor.element.clearCustomData();delete editor.element;});return editor;};CKEDITOR.inlineAll=function(){var el,data;for(var name in CKEDITOR.dtd.$editable){var elements=CKEDITOR.document.getElementsByTag(name);for(var i=0,len=elements.count();i<len;i++){el=elements.getItem(i);if(el.getAttribute('contenteditable')=='true'){data={element:el,config:{}};if(CKEDITOR.fire('inline',data)!==false)
CKEDITOR.inline(el,data.config);}}}};CKEDITOR.domReady(function(){!CKEDITOR.disableAutoInline&&CKEDITOR.inlineAll();});})();CKEDITOR.replaceClass='ckeditor';(function(){CKEDITOR.replace=function(element,config){return createInstance(element,config,null,CKEDITOR.ELEMENT_MODE_REPLACE);};CKEDITOR.appendTo=function(element,config,data){return createInstance(element,config,data,CKEDITOR.ELEMENT_MODE_APPENDTO);};CKEDITOR.replaceAll=function(){var textareas=document.getElementsByTagName('textarea');for(var i=0;i<textareas.length;i++){var config=null,textarea=textareas[i];if(!textarea.name&&!textarea.id)
continue;if(typeof arguments[0]=='string'){var classRegex=new RegExp('(?:^|\\s)'+arguments[0]+'(?:$|\\s)');if(!classRegex.test(textarea.className))
continue;}else if(typeof arguments[0]=='function'){config={};if(arguments[0](textarea,config)===false)
continue;}
this.replace(textarea,config);}};CKEDITOR.editor.prototype.addMode=function(mode,exec){(this._.modes||(this._.modes={}))[mode]=exec;};CKEDITOR.editor.prototype.setMode=function(newMode,callback){var editor=this;var modes=this._.modes;if(newMode==editor.mode||!modes||!modes[newMode])
return;editor.fire('beforeSetMode',newMode);if(editor.mode){var isDirty=editor.checkDirty(),previousModeData=editor._.previousModeData,currentData,unlockSnapshot=0;editor.fire('beforeModeUnload');editor.editable(0);editor._.previousMode=editor.mode;editor._.previousModeData=currentData=editor.getData(1);if(editor.mode=='source'&&previousModeData==currentData){editor.fire('lockSnapshot',{forceUpdate:true});unlockSnapshot=1;}
editor.ui.space('contents').setHtml('');editor.mode='';}else{editor._.previousModeData=editor.getData(1);}
this._.modes[newMode](function(){editor.mode=newMode;if(isDirty!==undefined)
!isDirty&&editor.resetDirty();if(unlockSnapshot)
editor.fire('unlockSnapshot');else if(newMode=='wysiwyg')
editor.fire('saveSnapshot');setTimeout(function(){editor.fire('mode');callback&&callback.call(editor);},0);});};CKEDITOR.editor.prototype.resize=function(width,height,isContentHeight,resizeInner){var container=this.container,contents=this.ui.space('contents'),contentsFrame=CKEDITOR.env.webkit&&this.document&&this.document.getWindow().$.frameElement,outer;if(resizeInner){outer=this.container.getFirst(function(node){return node.type==CKEDITOR.NODE_ELEMENT&&node.hasClass('cke_inner');});}else{outer=container;}
outer.setSize('width',width,true);contentsFrame&&(contentsFrame.style.width='1%');var contentsOuterDelta=(outer.$.offsetHeight||0)-(contents.$.clientHeight||0),resultContentsHeight=Math.max(height-(isContentHeight?0:contentsOuterDelta),0),resultOuterHeight=(isContentHeight?height+contentsOuterDelta:height);contents.setStyle('height',resultContentsHeight+'px');contentsFrame&&(contentsFrame.style.width='100%');this.fire('resize',{outerHeight:resultOuterHeight,contentsHeight:resultContentsHeight,outerWidth:width||outer.getSize('width')});};CKEDITOR.editor.prototype.getResizable=function(forContents){return forContents?this.ui.space('contents'):this.container;};function createInstance(element,config,data,mode){if(!CKEDITOR.env.isCompatible)
return null;element=CKEDITOR.dom.element.get(element);if(element.getEditor())
throw'The editor instance "'+element.getEditor().name+'" is already attached to the provided element.';var editor=new CKEDITOR.editor(config,element,mode);if(mode==CKEDITOR.ELEMENT_MODE_REPLACE){element.setStyle('visibility','hidden');editor._.required=element.hasAttribute('required');element.removeAttribute('required');}
data&&editor.setData(data,null,true);editor.on('loaded',function(){loadTheme(editor);if(mode==CKEDITOR.ELEMENT_MODE_REPLACE&&editor.config.autoUpdateElement&&element.$.form)
editor._attachToForm();editor.setMode(editor.config.startupMode,function(){editor.resetDirty();editor.status='ready';editor.fireOnce('instanceReady');CKEDITOR.fire('instanceReady',null,editor);});});editor.on('destroy',destroy);return editor;}
function destroy(){var editor=this,container=editor.container,element=editor.element;if(container){container.clearCustomData();container.remove();}
if(element){element.clearCustomData();if(editor.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){element.show();if(editor._.required)
element.setAttribute('required','required');}
delete editor.element;}}
function loadTheme(editor){var name=editor.name,element=editor.element,elementMode=editor.elementMode;var topHtml=editor.fire('uiSpace',{space:'top',html:''}).html;var bottomHtml=editor.fire('uiSpace',{space:'bottom',html:''}).html;var themedTpl=new CKEDITOR.template('<{outerEl}'+' id="cke_{name}"'+' class="{id} cke cke_reset cke_chrome cke_editor_{name} cke_{langDir} '+CKEDITOR.env.cssClass+'" '+' dir="{langDir}"'+' lang="{langCode}"'+' role="application"'+
(editor.title?' aria-labelledby="cke_{name}_arialbl"':'')+'>'+
(editor.title?'<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>':'')+'<{outerEl} class="cke_inner cke_reset" role="presentation">'+'{topHtml}'+'<{outerEl} id="{contentId}" class="cke_contents cke_reset" role="presentation"></{outerEl}>'+'{bottomHtml}'+'</{outerEl}>'+'</{outerEl}>');var container=CKEDITOR.dom.element.createFromHtml(themedTpl.output({id:editor.id,name:name,langDir:editor.lang.dir,langCode:editor.langCode,voiceLabel:editor.title,topHtml:topHtml?'<span id="'+editor.ui.spaceId('top')+'" class="cke_top cke_reset_all" role="presentation" style="height:auto">'+topHtml+'</span>':'',contentId:editor.ui.spaceId('contents'),bottomHtml:bottomHtml?'<span id="'+editor.ui.spaceId('bottom')+'" class="cke_bottom cke_reset_all" role="presentation">'+bottomHtml+'</span>':'',outerEl:CKEDITOR.env.ie?'span':'div'}));if(elementMode==CKEDITOR.ELEMENT_MODE_REPLACE){element.hide();container.insertAfter(element);}else{element.append(container);}
editor.container=container;editor.ui.contentsElement=editor.ui.space('contents');topHtml&&editor.ui.space('top').unselectable();bottomHtml&&editor.ui.space('bottom').unselectable();var width=editor.config.width,height=editor.config.height;if(width)
container.setStyle('width',CKEDITOR.tools.cssLength(width));if(height)
editor.ui.space('contents').setStyle('height',CKEDITOR.tools.cssLength(height));container.disableContextMenu();CKEDITOR.env.webkit&&container.on('focus',function(){editor.focus();});editor.fireOnce('uiReady');}
CKEDITOR.domReady(function(){CKEDITOR.replaceClass&&CKEDITOR.replaceAll(CKEDITOR.replaceClass);});})();CKEDITOR.config.startupMode='wysiwyg';(function(){CKEDITOR.editable=CKEDITOR.tools.createClass({base:CKEDITOR.dom.element,$:function(editor,element){this.base(element.$||element);this.editor=editor;this.status='unloaded';this.hasFocus=false;this.setup();},proto:{focus:function(){var active;if(CKEDITOR.env.webkit&&!this.hasFocus){active=this.editor._.previousActive||this.getDocument().getActive();if(this.contains(active)){active.focus();return;}}
try{this.$[CKEDITOR.env.ie&&this.getDocument().equals(CKEDITOR.document)?'setActive':'focus']();}catch(e){if(!CKEDITOR.env.ie)
throw e;}
if(CKEDITOR.env.safari&&!this.isInline()){active=CKEDITOR.document.getActive();if(!active.equals(this.getWindow().getFrame()))
this.getWindow().focus();}},on:function(name,fn){var args=Array.prototype.slice.call(arguments,0);if(CKEDITOR.env.ie&&(/^focus|blur$/).exec(name)){name=name=='focus'?'focusin':'focusout';fn=isNotBubbling(fn,this);args[0]=name;args[1]=fn;}
return CKEDITOR.dom.element.prototype.on.apply(this,args);},attachListener:function(obj){!this._.listeners&&(this._.listeners=[]);var args=Array.prototype.slice.call(arguments,1),listener=obj.on.apply(obj,args);this._.listeners.push(listener);return listener;},clearListeners:function(){var listeners=this._.listeners;try{while(listeners.length)
listeners.pop().removeListener();}catch(e){}},restoreAttrs:function(){var changes=this._.attrChanges,orgVal;for(var attr in changes){if(changes.hasOwnProperty(attr)){orgVal=changes[attr];orgVal!==null?this.setAttribute(attr,orgVal):this.removeAttribute(attr);}}},attachClass:function(cls){var classes=this.getCustomData('classes');if(!this.hasClass(cls)){!classes&&(classes=[]),classes.push(cls);this.setCustomData('classes',classes);this.addClass(cls);}},changeAttr:function(attr,val){var orgVal=this.getAttribute(attr);if(val!==orgVal){!this._.attrChanges&&(this._.attrChanges={});if(!(attr in this._.attrChanges))
this._.attrChanges[attr]=orgVal;this.setAttribute(attr,val);}},insertText:function(text){this.editor.focus();this.insertHtml(this.transformPlainTextToHtml(text),'text');},transformPlainTextToHtml:function(text){var enterMode=this.editor.getSelection().getStartElement().hasAscendant('pre',true)?CKEDITOR.ENTER_BR:this.editor.activeEnterMode;return CKEDITOR.tools.transformPlainTextToHtml(text,enterMode);},insertHtml:function(data,mode,range){var editor=this.editor;editor.focus();editor.fire('saveSnapshot');if(!range){range=editor.getSelection().getRanges()[0];}
insert(this,mode||'html',data,range);range.select();afterInsert(this);this.editor.fire('afterInsertHtml',{});},insertHtmlIntoRange:function(data,range,mode){insert(this,mode||'html',data,range);this.editor.fire('afterInsertHtml',{intoRange:range});},insertElement:function(element,range){var editor=this.editor;editor.focus();editor.fire('saveSnapshot');var enterMode=editor.activeEnterMode,selection=editor.getSelection(),elementName=element.getName(),isBlock=CKEDITOR.dtd.$block[elementName];if(!range){range=selection.getRanges()[0];}
if(this.insertElementIntoRange(element,range)){range.moveToPosition(element,CKEDITOR.POSITION_AFTER_END);if(isBlock){var next=element.getNext(function(node){return isNotEmpty(node)&&!isBogus(node);});if(next&&next.type==CKEDITOR.NODE_ELEMENT&&next.is(CKEDITOR.dtd.$block)){if(next.getDtd()['#'])
range.moveToElementEditStart(next);else
range.moveToElementEditEnd(element);}
else if(!next&&enterMode!=CKEDITOR.ENTER_BR){next=range.fixBlock(true,enterMode==CKEDITOR.ENTER_DIV?'div':'p');range.moveToElementEditStart(next);}}}
selection.selectRanges([range]);afterInsert(this);},insertElementIntoSelection:function(element){this.insertElement(element);},insertElementIntoRange:function(element,range){var editor=this.editor,enterMode=editor.config.enterMode,elementName=element.getName(),isBlock=CKEDITOR.dtd.$block[elementName];if(range.checkReadOnly())
return false;range.deleteContents(1);if(range.startContainer.type==CKEDITOR.NODE_ELEMENT&&range.startContainer.is({tr:1,table:1,tbody:1,thead:1,tfoot:1}))
fixTableAfterContentsDeletion(range);var current,dtd;if(isBlock){while((current=range.getCommonAncestor(0,1))&&(dtd=CKEDITOR.dtd[current.getName()])&&!(dtd&&dtd[elementName])){if(current.getName()in CKEDITOR.dtd.span)
range.splitElement(current);else if(range.checkStartOfBlock()&&range.checkEndOfBlock()){range.setStartBefore(current);range.collapse(true);current.remove();}else{range.splitBlock(enterMode==CKEDITOR.ENTER_DIV?'div':'p',editor.editable());}}}
range.insertNode(element);return true;},setData:function(data,isSnapshot){if(!isSnapshot)
data=this.editor.dataProcessor.toHtml(data);this.setHtml(data);this.fixInitialSelection();if(this.status=='unloaded')
this.status='ready';this.editor.fire('dataReady');},getData:function(isSnapshot){var data=this.getHtml();if(!isSnapshot)
data=this.editor.dataProcessor.toDataFormat(data);return data;},setReadOnly:function(isReadOnly){this.setAttribute('contenteditable',!isReadOnly);},detach:function(){this.removeClass('cke_editable');this.status='detached';var editor=this.editor;this._.detach();delete editor.document;delete editor.window;},isInline:function(){return this.getDocument().equals(CKEDITOR.document);},fixInitialSelection:function(){var that=this;if(CKEDITOR.env.ie&&(CKEDITOR.env.version<9||CKEDITOR.env.quirks)){if(this.hasFocus){this.focus();fixMSSelection();}
return;}
if(!this.hasFocus){this.once('focus',function(){fixSelection();},null,null,-999);}else{this.focus();fixSelection();}
function fixSelection(){var $doc=that.getDocument().$,$sel=$doc.getSelection();if(requiresFix($sel)){var range=new CKEDITOR.dom.range(that);range.moveToElementEditStart(that);var $range=$doc.createRange();$range.setStart(range.startContainer.$,range.startOffset);$range.collapse(true);$sel.removeAllRanges();$sel.addRange($range);}}
function requiresFix($sel){if($sel.anchorNode&&$sel.anchorNode==that.$){return true;}
if(CKEDITOR.env.webkit){var active=that.getDocument().getActive();if(active&&active.equals(that)&&!$sel.anchorNode){return true;}}}
function fixMSSelection(){var $doc=that.getDocument().$,$sel=$doc.selection,active=that.getDocument().getActive();if($sel.type=='None'&&active.equals(that)){var range=new CKEDITOR.dom.range(that),parentElement,$range=$doc.body.createTextRange();range.moveToElementEditStart(that);parentElement=range.startContainer;if(parentElement.type!=CKEDITOR.NODE_ELEMENT){parentElement=parentElement.getParent();}
$range.moveToElementText(parentElement.$);$range.collapse(true);$range.select();}}},getHtmlFromRange:function(range){if(range.collapsed)
return new CKEDITOR.dom.documentFragment(range.document);var that={doc:this.getDocument(),range:range.clone()};getHtmlFromRangeHelpers.eol.detect(that,this);getHtmlFromRangeHelpers.bogus.exclude(that);getHtmlFromRangeHelpers.cell.shrink(that);that.fragment=that.range.cloneContents();getHtmlFromRangeHelpers.tree.rebuild(that,this);getHtmlFromRangeHelpers.eol.fix(that,this);return new CKEDITOR.dom.documentFragment(that.fragment.$);},extractHtmlFromRange:function(range,removeEmptyBlock){var helpers=extractHtmlFromRangeHelpers,that={range:range,doc:range.document},extractedFragment=this.getHtmlFromRange(range);if(range.collapsed){range.optimize();return extractedFragment;}
range.enlarge(CKEDITOR.ENLARGE_INLINE,1);helpers.table.detectPurge(that);that.bookmark=range.createBookmark();delete that.range;var targetRange=this.editor.createRange();targetRange.moveToPosition(that.bookmark.startNode,CKEDITOR.POSITION_BEFORE_START);that.targetBookmark=targetRange.createBookmark();helpers.list.detectMerge(that,this);helpers.table.detectRanges(that,this);helpers.block.detectMerge(that,this);if(that.tableContentsRanges){helpers.table.deleteRanges(that);range.moveToBookmark(that.bookmark);that.range=range;}else{range.moveToBookmark(that.bookmark);that.range=range;range.extractContents(helpers.detectExtractMerge(that));}
range.moveToBookmark(that.targetBookmark);range.optimize();helpers.fixUneditableRangePosition(range);helpers.list.merge(that,this);helpers.table.purge(that,this);helpers.block.merge(that,this);if(removeEmptyBlock){var path=range.startPath();if(range.checkStartOfBlock()&&range.checkEndOfBlock()&&path.block&&!range.root.equals(path.block)&&!hasBookmarks(path.block)){range.moveToPosition(path.block,CKEDITOR.POSITION_BEFORE_START);path.block.remove();}}else{helpers.autoParagraph(this.editor,range);if(isEmpty(range.startContainer))
range.startContainer.appendBogus();}
range.startContainer.mergeSiblings();return extractedFragment;},setup:function(){var editor=this.editor;this.attachListener(editor,'beforeGetData',function(){var data=this.getData();if(!this.is('textarea')){if(editor.config.ignoreEmptyParagraph!==false)
data=data.replace(emptyParagraphRegexp,function(match,lookback){return lookback;});}
editor.setData(data,null,1);},this);this.attachListener(editor,'getSnapshot',function(evt){evt.data=this.getData(1);},this);this.attachListener(editor,'afterSetData',function(){this.setData(editor.getData(1));},this);this.attachListener(editor,'loadSnapshot',function(evt){this.setData(evt.data,1);},this);this.attachListener(editor,'beforeFocus',function(){var sel=editor.getSelection(),ieSel=sel&&sel.getNative();if(ieSel&&ieSel.type=='Control')
return;this.focus();},this);this.attachListener(editor,'insertHtml',function(evt){this.insertHtml(evt.data.dataValue,evt.data.mode,evt.data.range);},this);this.attachListener(editor,'insertElement',function(evt){this.insertElement(evt.data);},this);this.attachListener(editor,'insertText',function(evt){this.insertText(evt.data);},this);this.setReadOnly(editor.readOnly);this.attachClass('cke_editable');if(editor.elementMode==CKEDITOR.ELEMENT_MODE_INLINE){this.attachClass('cke_editable_inline');}else if(editor.elementMode==CKEDITOR.ELEMENT_MODE_REPLACE||editor.elementMode==CKEDITOR.ELEMENT_MODE_APPENDTO){this.attachClass('cke_editable_themed');}
this.attachClass('cke_contents_'+editor.config.contentsLangDirection);var keystrokeHandler=editor.keystrokeHandler;keystrokeHandler.blockedKeystrokes[8]=+editor.readOnly;editor.keystrokeHandler.attach(this);this.on('blur',function(){this.hasFocus=false;},null,null,-1);this.on('focus',function(){this.hasFocus=true;},null,null,-1);editor.focusManager.add(this);if(this.equals(CKEDITOR.document.getActive())){this.hasFocus=true;editor.once('contentDom',function(){editor.focusManager.focus(this);},this);}
if(this.isInline()){this.changeAttr('tabindex',editor.tabIndex);}
if(this.is('textarea'))
return;editor.document=this.getDocument();editor.window=this.getWindow();var doc=editor.document;this.changeAttr('spellcheck',!editor.config.disableNativeSpellChecker);var dir=editor.config.contentsLangDirection;if(this.getDirection(1)!=dir)
this.changeAttr('dir',dir);var styles=CKEDITOR.getCss();if(styles){var head=doc.getHead();if(!head.getCustomData('stylesheet')){var sheet=doc.appendStyleText(styles);sheet=new CKEDITOR.dom.element(sheet.ownerNode||sheet.owningElement);head.setCustomData('stylesheet',sheet);sheet.data('cke-temp',1);}}
var ref=doc.getCustomData('stylesheet_ref')||0;doc.setCustomData('stylesheet_ref',ref+1);this.setCustomData('cke_includeReadonly',!editor.config.disableReadonlyStyling);this.attachListener(this,'click',function(evt){evt=evt.data;var link=new CKEDITOR.dom.elementPath(evt.getTarget(),this).contains('a');if(link&&evt.$.button!=2&&link.isReadOnly())
evt.preventDefault();});var backspaceOrDelete={8:1,46:1};this.attachListener(editor,'key',function(evt){if(editor.readOnly)
return true;var keyCode=evt.data.domEvent.getKey(),isHandled;if(keyCode in backspaceOrDelete){var sel=editor.getSelection(),selected,range=sel.getRanges()[0],path=range.startPath(),block,parent,next,rtl=keyCode==8;if((CKEDITOR.env.ie&&CKEDITOR.env.version<11&&(selected=sel.getSelectedElement()))||(selected=getSelectedTableList(sel))){editor.fire('saveSnapshot');range.moveToPosition(selected,CKEDITOR.POSITION_BEFORE_START);selected.remove();range.select();editor.fire('saveSnapshot');isHandled=1;}else if(range.collapsed){if((block=path.block)&&(next=block[rtl?'getPrevious':'getNext'](isNotWhitespace))&&(next.type==CKEDITOR.NODE_ELEMENT)&&next.is('table')&&range[rtl?'checkStartOfBlock':'checkEndOfBlock']()){editor.fire('saveSnapshot');if(range[rtl?'checkEndOfBlock':'checkStartOfBlock']())
block.remove();range['moveToElementEdit'+(rtl?'End':'Start')](next);range.select();editor.fire('saveSnapshot');isHandled=1;}
else if(path.blockLimit&&path.blockLimit.is('td')&&(parent=path.blockLimit.getAscendant('table'))&&range.checkBoundaryOfElement(parent,rtl?CKEDITOR.START:CKEDITOR.END)&&(next=parent[rtl?'getPrevious':'getNext'](isNotWhitespace))){editor.fire('saveSnapshot');range['moveToElementEdit'+(rtl?'End':'Start')](next);if(range.checkStartOfBlock()&&range.checkEndOfBlock())
next.remove();else
range.select();editor.fire('saveSnapshot');isHandled=1;}
else if((parent=path.contains(['td','th','caption']))&&range.checkBoundaryOfElement(parent,rtl?CKEDITOR.START:CKEDITOR.END)){isHandled=1;}}}
return!isHandled;});if(editor.blockless&&CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller){this.attachListener(this,'keyup',function(evt){if(evt.data.getKeystroke()in backspaceOrDelete&&!this.getFirst(isNotEmpty)){this.appendBogus();var range=editor.createRange();range.moveToPosition(this,CKEDITOR.POSITION_AFTER_START);range.select();}});}
this.attachListener(this,'dblclick',function(evt){if(editor.readOnly)
return false;var data={element:evt.data.getTarget()};editor.fire('doubleclick',data);});CKEDITOR.env.ie&&this.attachListener(this,'click',blockInputClick);if(!CKEDITOR.env.ie||CKEDITOR.env.edge){this.attachListener(this,'mousedown',function(ev){var control=ev.data.getTarget();if(control.is('img','hr','input','textarea','select')&&!control.isReadOnly()){editor.getSelection().selectElement(control);if(control.is('input','textarea','select'))
ev.data.preventDefault();}});}
if(CKEDITOR.env.edge){this.attachListener(this,'mouseup',function(ev){var selectedElement=ev.data.getTarget();if(selectedElement&&selectedElement.is('img')){editor.getSelection().selectElement(selectedElement);}});}
if(CKEDITOR.env.gecko){this.attachListener(this,'mouseup',function(ev){if(ev.data.$.button==2){var target=ev.data.getTarget();if(!target.getOuterHtml().replace(emptyParagraphRegexp,'')){var range=editor.createRange();range.moveToElementEditStart(target);range.select(true);}}});}
if(CKEDITOR.env.webkit){this.attachListener(this,'click',function(ev){if(ev.data.getTarget().is('input','select'))
ev.data.preventDefault();});this.attachListener(this,'mouseup',function(ev){if(ev.data.getTarget().is('input','textarea'))
ev.data.preventDefault();});}
if(CKEDITOR.env.webkit){this.attachListener(editor,'key',function(evt){if(editor.readOnly){return true;}
var key=evt.data.domEvent.getKey();if(!(key in backspaceOrDelete))
return;var backspace=key==8,range=editor.getSelection().getRanges()[0],startPath=range.startPath();if(range.collapsed){if(!mergeBlocksCollapsedSelection(editor,range,backspace,startPath))
return;}else{if(!mergeBlocksNonCollapsedSelection(editor,range,startPath))
return;}
editor.getSelection().scrollIntoView();editor.fire('saveSnapshot');return false;},this,null,100);}}},_:{detach:function(){this.editor.setData(this.editor.getData(),0,1);this.clearListeners();this.restoreAttrs();var classes;if((classes=this.removeCustomData('classes'))){while(classes.length)
this.removeClass(classes.pop());}
if(!this.is('textarea')){var doc=this.getDocument(),head=doc.getHead();if(head.getCustomData('stylesheet')){var refs=doc.getCustomData('stylesheet_ref');if(!(--refs)){doc.removeCustomData('stylesheet_ref');var sheet=head.removeCustomData('stylesheet');sheet.remove();}else{doc.setCustomData('stylesheet_ref',refs);}}}
this.editor.fire('contentDomUnload');delete this.editor;}}});CKEDITOR.editor.prototype.editable=function(element){var editable=this._.editable;if(editable&&element)
return 0;if(arguments.length){editable=this._.editable=element?(element instanceof CKEDITOR.editable?element:new CKEDITOR.editable(this,element)):(editable&&editable.detach(),null);}
return editable;};CKEDITOR.on('instanceLoaded',function(evt){var editor=evt.editor;editor.on('insertElement',function(evt){var element=evt.data;if(element.type==CKEDITOR.NODE_ELEMENT&&(element.is('input')||element.is('textarea'))){if(element.getAttribute('contentEditable')!='false')
element.data('cke-editable',element.hasAttribute('contenteditable')?'true':'1');element.setAttribute('contentEditable',false);}});editor.on('selectionChange',function(evt){if(editor.readOnly)
return;var sel=editor.getSelection();if(sel&&!sel.isLocked){var isDirty=editor.checkDirty();editor.fire('lockSnapshot');fixDom(evt);editor.fire('unlockSnapshot');!isDirty&&editor.resetDirty();}});});CKEDITOR.on('instanceCreated',function(evt){var editor=evt.editor;editor.on('mode',function(){var editable=editor.editable();if(editable&&editable.isInline()){var ariaLabel=editor.title;editable.changeAttr('role','textbox');editable.changeAttr('aria-label',ariaLabel);if(ariaLabel)
editable.changeAttr('title',ariaLabel);var helpLabel=editor.fire('ariaEditorHelpLabel',{}).label;if(helpLabel){var ct=this.ui.space(this.elementMode==CKEDITOR.ELEMENT_MODE_INLINE?'top':'contents');if(ct){var ariaDescId=CKEDITOR.tools.getNextId(),desc=CKEDITOR.dom.element.createFromHtml('<span id="'+ariaDescId+'" class="cke_voice_label">'+helpLabel+'</span>');ct.append(desc);editable.changeAttr('aria-describedby',ariaDescId);}}}});});CKEDITOR.addCss('.cke_editable{cursor:text}.cke_editable img,.cke_editable input,.cke_editable textarea{cursor:default}');var isNotWhitespace=CKEDITOR.dom.walker.whitespaces(true),isNotBookmark=CKEDITOR.dom.walker.bookmark(false,true),isEmpty=CKEDITOR.dom.walker.empty(),isBogus=CKEDITOR.dom.walker.bogus(),emptyParagraphRegexp=/(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi;function fixDom(evt){var editor=evt.editor,path=evt.data.path,blockLimit=path.blockLimit,selection=evt.data.selection,range=selection.getRanges()[0],selectionUpdateNeeded;if(CKEDITOR.env.gecko||(CKEDITOR.env.ie&&CKEDITOR.env.needsBrFiller)){var blockNeedsFiller=needsBrFiller(selection,path);if(blockNeedsFiller){blockNeedsFiller.appendBogus();selectionUpdateNeeded=CKEDITOR.env.ie;}}
if(shouldAutoParagraph(editor,path.block,blockLimit)&&range.collapsed&&!range.getCommonAncestor().isReadOnly()){var testRng=range.clone();testRng.enlarge(CKEDITOR.ENLARGE_BLOCK_CONTENTS);var walker=new CKEDITOR.dom.walker(testRng);walker.guard=function(node){return!isNotEmpty(node)||node.type==CKEDITOR.NODE_COMMENT||node.isReadOnly();};if(!walker.checkForward()||testRng.checkStartOfBlock()&&testRng.checkEndOfBlock()){var fixedBlock=range.fixBlock(true,editor.activeEnterMode==CKEDITOR.ENTER_DIV?'div':'p');if(!CKEDITOR.env.needsBrFiller){var first=fixedBlock.getFirst(isNotEmpty);if(first&&isNbsp(first))
first.remove();}
selectionUpdateNeeded=1;evt.cancel();}}
if(selectionUpdateNeeded)
range.select();}
function needsBrFiller(selection,path){if(selection.isFake)
return 0;var pathBlock=path.block||path.blockLimit,lastNode=pathBlock&&pathBlock.getLast(isNotEmpty);if(pathBlock&&pathBlock.isBlockBoundary()&&!(lastNode&&lastNode.type==CKEDITOR.NODE_ELEMENT&&lastNode.isBlockBoundary())&&!pathBlock.is('pre')&&!pathBlock.getBogus())
return pathBlock;}
function blockInputClick(evt){var element=evt.data.getTarget();if(element.is('input')){var type=element.getAttribute('type');if(type=='submit'||type=='reset')
evt.data.preventDefault();}}
function isNotEmpty(node){return isNotWhitespace(node)&&isNotBookmark(node);}
function isNbsp(node){return node.type==CKEDITOR.NODE_TEXT&&CKEDITOR.tools.trim(node.getText()).match(/^(?:&nbsp;|\xa0)$/);}
function isNotBubbling(fn,src){return function(evt){var other=evt.data.$.toElement||evt.data.$.fromElement||evt.data.$.relatedTarget;other=(other&&other.nodeType==CKEDITOR.NODE_ELEMENT)?new CKEDITOR.dom.element(other):null;if(!(other&&(src.equals(other)||src.contains(other))))
fn.call(this,evt);};}
function hasBookmarks(element){var potentialBookmarks=element.getElementsByTag('span'),i=0,child;if(potentialBookmarks){while((child=potentialBookmarks.getItem(i++))){if(!isNotBookmark(child)){return true;}}}
return false;}
function getSelectedTableList(sel){var selected,range=sel.getRanges()[0],editable=sel.root,path=range.startPath(),structural={table:1,ul:1,ol:1,dl:1};if(path.contains(structural)){var walkerRng=range.clone();walkerRng.collapse(1);walkerRng.setStartAt(editable,CKEDITOR.POSITION_AFTER_START);var walker=new CKEDITOR.dom.walker(walkerRng);walker.guard=guard();walker.checkBackward();if(selected){walkerRng=range.clone();walkerRng.collapse();walkerRng.setEndAt(selected,CKEDITOR.POSITION_AFTER_END);walker=new CKEDITOR.dom.walker(walkerRng);walker.guard=guard(true);selected=false;walker.checkForward();return selected;}}
return null;function guard(forwardGuard){return function(node,isWalkOut){if(isWalkOut&&node.type==CKEDITOR.NODE_ELEMENT&&node.is(structural))
selected=node;if(!isWalkOut&&isNotEmpty(node)&&!(forwardGuard&&isBogus(node)))
return false;};}}
function shouldAutoParagraph(editor,pathBlock,pathBlockLimit){return editor.config.autoParagraph!==false&&editor.activeEnterMode!=CKEDITOR.ENTER_BR&&((editor.editable().equals(pathBlockLimit)&&!pathBlock)||(pathBlock&&pathBlock.getAttribute('contenteditable')=='true'));}
function autoParagraphTag(editor){return(editor.activeEnterMode!=CKEDITOR.ENTER_BR&&editor.config.autoParagraph!==false)?editor.activeEnterMode==CKEDITOR.ENTER_DIV?'div':'p':false;}
var insert=(function(){'use strict';var DTD=CKEDITOR.dtd;function insert(editable,type,data,range){var editor=editable.editor,dontFilter=false;if(type=='unfiltered_html'){type='html';dontFilter=true;}
if(range.checkReadOnly())
return;var path=new CKEDITOR.dom.elementPath(range.startContainer,range.root),blockLimit=path.blockLimit||range.root,that={type:type,dontFilter:dontFilter,editable:editable,editor:editor,range:range,blockLimit:blockLimit,mergeCandidates:[],zombies:[]};prepareRangeToDataInsertion(that);if(data&&processDataForInsertion(that,data)){insertDataIntoRange(that);}
cleanupAfterInsertion(that);}
function prepareRangeToDataInsertion(that){var range=that.range,mergeCandidates=that.mergeCandidates,node,marker,path,startPath,endPath,previous,bm;if(that.type=='text'&&range.shrink(CKEDITOR.SHRINK_ELEMENT,true,false)){marker=CKEDITOR.dom.element.createFromHtml('<span>&nbsp;</span>',range.document);range.insertNode(marker);range.setStartAfter(marker);}
startPath=new CKEDITOR.dom.elementPath(range.startContainer);that.endPath=endPath=new CKEDITOR.dom.elementPath(range.endContainer);if(!range.collapsed){node=endPath.block||endPath.blockLimit;var ancestor=range.getCommonAncestor();if(node&&!(node.equals(ancestor)||node.contains(ancestor))&&range.checkEndOfBlock()){that.zombies.push(node);}
range.deleteContents();}
while((previous=getRangePrevious(range))&&checkIfElement(previous)&&previous.isBlockBoundary()&&startPath.contains(previous))
range.moveToPosition(previous,CKEDITOR.POSITION_BEFORE_END);mergeAncestorElementsOfSelectionEnds(range,that.blockLimit,startPath,endPath);if(marker){range.setEndBefore(marker);range.collapse();marker.remove();}
path=range.startPath();if((node=path.contains(isInline,false,1))){range.splitElement(node);that.inlineStylesRoot=node;that.inlineStylesPeak=path.lastElement;}
bm=range.createBookmark();node=bm.startNode.getPrevious(isNotEmpty);node&&checkIfElement(node)&&isInline(node)&&mergeCandidates.push(node);node=bm.startNode.getNext(isNotEmpty);node&&checkIfElement(node)&&isInline(node)&&mergeCandidates.push(node);node=bm.startNode;while((node=node.getParent())&&isInline(node))
mergeCandidates.push(node);range.moveToBookmark(bm);}
function processDataForInsertion(that,data){var range=that.range;if(that.type=='text'&&that.inlineStylesRoot)
data=wrapDataWithInlineStyles(data,that);var context=that.blockLimit.getName();if(/^\s+|\s+$/.test(data)&&'span'in CKEDITOR.dtd[context]){var protect='<span data-cke-marker="1">&nbsp;</span>';data=protect+data+protect;}
data=that.editor.dataProcessor.toHtml(data,{context:null,fixForBody:false,protectedWhitespaces:!!protect,dontFilter:that.dontFilter,filter:that.editor.activeFilter,enterMode:that.editor.activeEnterMode});var doc=range.document,wrapper=doc.createElement('body');wrapper.setHtml(data);if(protect){wrapper.getFirst().remove();wrapper.getLast().remove();}
var block=range.startPath().block;if(block&&!(block.getChildCount()==1&&block.getBogus())){stripBlockTagIfSingleLine(wrapper);}
that.dataWrapper=wrapper;return data;}
function insertDataIntoRange(that){var range=that.range,doc=range.document,path,blockLimit=that.blockLimit,nodesData,nodeData,node,nodeIndex=0,bogus,bogusNeededBlocks=[],pathBlock,fixBlock,splittingContainer=0,dontMoveCaret=0,insertionContainer,toSplit,newContainer,startContainer=range.startContainer,endContainer=that.endPath.elements[0],filteredNodes,pos=endContainer.getPosition(startContainer),separateEndContainer=!!endContainer.getCommonAncestor(startContainer)&&pos!=CKEDITOR.POSITION_IDENTICAL&&!(pos&CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED);nodesData=extractNodesData(that.dataWrapper,that);removeBrsAdjacentToPastedBlocks(nodesData,range);for(;nodeIndex<nodesData.length;nodeIndex++){nodeData=nodesData[nodeIndex];if(nodeData.isLineBreak&&splitOnLineBreak(range,blockLimit,nodeData)){dontMoveCaret=nodeIndex>0;continue;}
path=range.startPath();if(!nodeData.isBlock&&shouldAutoParagraph(that.editor,path.block,path.blockLimit)&&(fixBlock=autoParagraphTag(that.editor))){fixBlock=doc.createElement(fixBlock);fixBlock.appendBogus();range.insertNode(fixBlock);if(CKEDITOR.env.needsBrFiller&&(bogus=fixBlock.getBogus()))
bogus.remove();range.moveToPosition(fixBlock,CKEDITOR.POSITION_BEFORE_END);}
node=range.startPath().block;if(node&&!node.equals(pathBlock)){bogus=node.getBogus();if(bogus){bogus.remove();bogusNeededBlocks.push(node);}
pathBlock=node;}
if(nodeData.firstNotAllowed)
splittingContainer=1;if(splittingContainer&&nodeData.isElement){insertionContainer=range.startContainer;toSplit=null;while(insertionContainer&&!DTD[insertionContainer.getName()][nodeData.name]){if(insertionContainer.equals(blockLimit)){insertionContainer=null;break;}
toSplit=insertionContainer;insertionContainer=insertionContainer.getParent();}
if(insertionContainer){if(toSplit){newContainer=range.splitElement(toSplit);that.zombies.push(newContainer);that.zombies.push(toSplit);}}
else{filteredNodes=filterElement(nodeData.node,blockLimit.getName(),!nodeIndex,nodeIndex==nodesData.length-1);}}
if(filteredNodes){while((node=filteredNodes.pop()))
range.insertNode(node);filteredNodes=0;}else{range.insertNode(nodeData.node);}
if(nodeData.lastNotAllowed&&nodeIndex<nodesData.length-1){newContainer=separateEndContainer?endContainer:newContainer;newContainer&&range.setEndAt(newContainer,CKEDITOR.POSITION_AFTER_START);splittingContainer=0;}
range.collapse();}
if(isSingleNonEditableElement(nodesData)){dontMoveCaret=true;node=nodesData[0].node;range.setStartAt(node,CKEDITOR.POSITION_BEFORE_START);range.setEndAt(node,CKEDITOR.POSITION_AFTER_END);}
that.dontMoveCaret=dontMoveCaret;that.bogusNeededBlocks=bogusNeededBlocks;}
function cleanupAfterInsertion(that){var range=that.range,node,testRange,movedIntoInline,bogusNeededBlocks=that.bogusNeededBlocks,bm=range.createBookmark();while((node=that.zombies.pop())){if(!node.getParent())
continue;testRange=range.clone();testRange.moveToElementEditStart(node);testRange.removeEmptyBlocksAtEnd();}
if(bogusNeededBlocks){while((node=bogusNeededBlocks.pop())){if(CKEDITOR.env.needsBrFiller)
node.appendBogus();else
node.append(range.document.createText('\u00a0'));}}
while((node=that.mergeCandidates.pop()))
node.mergeSiblings();range.moveToBookmark(bm);if(!that.dontMoveCaret){node=getRangePrevious(range);while(node&&checkIfElement(node)&&!node.is(DTD.$empty)){if(node.isBlockBoundary())
range.moveToPosition(node,CKEDITOR.POSITION_BEFORE_END);else{if(isInline(node)&&node.getHtml().match(/(\s|&nbsp;)$/g)){movedIntoInline=null;break;}
movedIntoInline=range.clone();movedIntoInline.moveToPosition(node,CKEDITOR.POSITION_BEFORE_END);}
node=node.getLast(isNotEmpty);}
movedIntoInline&&range.moveToRange(movedIntoInline);}}
function checkIfElement(node){return node.type==CKEDITOR.NODE_ELEMENT;}
function extractNodesData(dataWrapper,that){var node,sibling,nodeName,allowed,nodesData=[],startContainer=that.range.startContainer,path=that.range.startPath(),allowedNames=DTD[startContainer.getName()],nodeIndex=0,nodesList=dataWrapper.getChildren(),nodesCount=nodesList.count(),firstNotAllowed=-1,lastNotAllowed=-1,lineBreak=0,blockSibling;var insideOfList=path.contains(DTD.$list);for(;nodeIndex<nodesCount;++nodeIndex){node=nodesList.getItem(nodeIndex);if(checkIfElement(node)){nodeName=node.getName();if(insideOfList&&nodeName in CKEDITOR.dtd.$list){nodesData=nodesData.concat(extractNodesData(node,that));continue;}
allowed=!!allowedNames[nodeName];if(nodeName=='br'&&node.data('cke-eol')&&(!nodeIndex||nodeIndex==nodesCount-1)){sibling=nodeIndex?nodesData[nodeIndex-1].node:nodesList.getItem(nodeIndex+1);lineBreak=sibling&&(!checkIfElement(sibling)||!sibling.is('br'));blockSibling=sibling&&checkIfElement(sibling)&&DTD.$block[sibling.getName()];}
if(firstNotAllowed==-1&&!allowed)
firstNotAllowed=nodeIndex;if(!allowed)
lastNotAllowed=nodeIndex;nodesData.push({isElement:1,isLineBreak:lineBreak,isBlock:node.isBlockBoundary(),hasBlockSibling:blockSibling,node:node,name:nodeName,allowed:allowed});lineBreak=0;blockSibling=0;}else{nodesData.push({isElement:0,node:node,allowed:1});}}
if(firstNotAllowed>-1)
nodesData[firstNotAllowed].firstNotAllowed=1;if(lastNotAllowed>-1)
nodesData[lastNotAllowed].lastNotAllowed=1;return nodesData;}
function filterElement(element,parentName,isFirst,isLast){var nodes=filterElementInner(element,parentName),nodes2=[],nodesCount=nodes.length,nodeIndex=0,node,afterSpace=0,lastSpaceIndex=-1;for(;nodeIndex<nodesCount;nodeIndex++){node=nodes[nodeIndex];if(node==' '){if(!afterSpace&&!(isFirst&&!nodeIndex)){nodes2.push(new CKEDITOR.dom.text(' '));lastSpaceIndex=nodes2.length;}
afterSpace=1;}else{nodes2.push(node);afterSpace=0;}}
if(isLast&&lastSpaceIndex==nodes2.length)
nodes2.pop();return nodes2;}
function filterElementInner(element,parentName){var nodes=[],children=element.getChildren(),childrenCount=children.count(),child,childIndex=0,allowedNames=DTD[parentName],surroundBySpaces=!element.is(DTD.$inline)||element.is('br');if(surroundBySpaces)
nodes.push(' ');for(;childIndex<childrenCount;childIndex++){child=children.getItem(childIndex);if(checkIfElement(child)&&!child.is(allowedNames))
nodes=nodes.concat(filterElementInner(child,parentName));else
nodes.push(child);}
if(surroundBySpaces)
nodes.push(' ');return nodes;}
function getRangePrevious(range){return checkIfElement(range.startContainer)&&range.startContainer.getChild(range.startOffset-1);}
function isInline(node){return node&&checkIfElement(node)&&(node.is(DTD.$removeEmpty)||node.is('a')&&!node.isBlockBoundary());}
function isSingleNonEditableElement(nodesData){if(nodesData.length!=1)
return false;var nodeData=nodesData[0];return nodeData.isElement&&(nodeData.node.getAttribute('contenteditable')=='false');}
var blockMergedTags={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,ul:1,ol:1,li:1,pre:1,dl:1,blockquote:1};function mergeAncestorElementsOfSelectionEnds(range,blockLimit,startPath,endPath){var walkerRange=range.clone(),walker,nextNode,previousNode;walkerRange.setEndAt(blockLimit,CKEDITOR.POSITION_BEFORE_END);walker=new CKEDITOR.dom.walker(walkerRange);if((nextNode=walker.next())&&checkIfElement(nextNode)&&blockMergedTags[nextNode.getName()]&&(previousNode=nextNode.getPrevious())&&checkIfElement(previousNode)&&!previousNode.getParent().equals(range.startContainer)&&startPath.contains(previousNode)&&endPath.contains(nextNode)&&nextNode.isIdentical(previousNode)){nextNode.moveChildren(previousNode);nextNode.remove();mergeAncestorElementsOfSelectionEnds(range,blockLimit,startPath,endPath);}}
function removeBrsAdjacentToPastedBlocks(nodesData,range){var succeedingNode=range.endContainer.getChild(range.endOffset),precedingNode=range.endContainer.getChild(range.endOffset-1);if(succeedingNode)
remove(succeedingNode,nodesData[nodesData.length-1]);if(precedingNode&&remove(precedingNode,nodesData[0])){range.setEnd(range.endContainer,range.endOffset-1);range.collapse();}
function remove(maybeBr,maybeBlockData){if(maybeBlockData.isBlock&&maybeBlockData.isElement&&!maybeBlockData.node.is('br')&&checkIfElement(maybeBr)&&maybeBr.is('br')){maybeBr.remove();return 1;}}}
function splitOnLineBreak(range,blockLimit,nodeData){var firstBlockAscendant,pos;if(nodeData.hasBlockSibling)
return 1;firstBlockAscendant=range.startContainer.getAscendant(DTD.$block,1);if(!firstBlockAscendant||!firstBlockAscendant.is({div:1,p:1}))
return 0;pos=firstBlockAscendant.getPosition(blockLimit);if(pos==CKEDITOR.POSITION_IDENTICAL||pos==CKEDITOR.POSITION_CONTAINS)
return 0;var newContainer=range.splitElement(firstBlockAscendant);range.moveToPosition(newContainer,CKEDITOR.POSITION_AFTER_START);return 1;}
var stripSingleBlockTags={p:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1},inlineButNotBr=CKEDITOR.tools.extend({},DTD.$inline);delete inlineButNotBr.br;function stripBlockTagIfSingleLine(dataWrapper){var block,children;if(dataWrapper.getChildCount()==1&&checkIfElement(block=dataWrapper.getFirst())&&block.is(stripSingleBlockTags)&&!block.hasAttribute('contenteditable')){children=block.getElementsByTag('*');for(var i=0,child,count=children.count();i<count;i++){child=children.getItem(i);if(!child.is(inlineButNotBr))
return;}
block.moveChildren(block.getParent(1));block.remove();}}
function wrapDataWithInlineStyles(data,that){var element=that.inlineStylesPeak,doc=element.getDocument(),wrapper=doc.createText('{cke-peak}'),limit=that.inlineStylesRoot.getParent();while(!element.equals(limit)){wrapper=wrapper.appendTo(element.clone());element=element.getParent();}
return wrapper.getOuterHtml().split('{cke-peak}').join(data);}
return insert;})();function afterInsert(editable){var editor=editable.editor;editor.getSelection().scrollIntoView();setTimeout(function(){editor.fire('saveSnapshot');},0);}
var fixTableAfterContentsDeletion=(function(){function getFixTableSelectionWalker(testRange){var walker=new CKEDITOR.dom.walker(testRange);walker.guard=function(node,isMovingOut){if(isMovingOut)
return false;if(node.type==CKEDITOR.NODE_ELEMENT)
return node.is(CKEDITOR.dtd.$tableContent);};walker.evaluator=function(node){return node.type==CKEDITOR.NODE_ELEMENT;};return walker;}
function fixTableStructure(element,newElementName,appendToStart){var temp=element.getDocument().createElement(newElementName);element.append(temp,appendToStart);return temp;}
function fixEmptyCells(cells){var i=cells.count(),cell;for(i;i-->0;){cell=cells.getItem(i);if(!CKEDITOR.tools.trim(cell.getHtml())){cell.appendBogus();if(CKEDITOR.env.ie&&CKEDITOR.env.version<9&&cell.getChildCount())
cell.getFirst().remove();}}}
return function(range){var container=range.startContainer,table=container.getAscendant('table',1),testRange,deeperSibling,appendToStart=false;fixEmptyCells(table.getElementsByTag('td'));fixEmptyCells(table.getElementsByTag('th'));testRange=range.clone();testRange.setStart(container,0);deeperSibling=getFixTableSelectionWalker(testRange).lastBackward();if(!deeperSibling){testRange=range.clone();testRange.setEndAt(container,CKEDITOR.POSITION_BEFORE_END);deeperSibling=getFixTableSelectionWalker(testRange).lastForward();appendToStart=true;}
if(!deeperSibling)
deeperSibling=container;if(deeperSibling.is('table')){range.setStartAt(deeperSibling,CKEDITOR.POSITION_BEFORE_START);range.collapse(true);deeperSibling.remove();return;}
if(deeperSibling.is({tbody:1,thead:1,tfoot:1}))
deeperSibling=fixTableStructure(deeperSibling,'tr',appendToStart);if(deeperSibling.is('tr'))
deeperSibling=fixTableStructure(deeperSibling,deeperSibling.getParent().is('thead')?'th':'td',appendToStart);var bogus=deeperSibling.getBogus();if(bogus)
bogus.remove();range.moveToPosition(deeperSibling,appendToStart?CKEDITOR.POSITION_AFTER_START:CKEDITOR.POSITION_BEFORE_END);};})();function mergeBlocksCollapsedSelection(editor,range,backspace,startPath){var startBlock=startPath.block;if(!startBlock)
return false;if(!range[backspace?'checkStartOfBlock':'checkEndOfBlock']())
return false;if(!range.moveToClosestEditablePosition(startBlock,!backspace)||!range.collapsed)
return false;if(range.startContainer.type==CKEDITOR.NODE_ELEMENT){var touched=range.startContainer.getChild(range.startOffset-(backspace?1:0));if(touched&&touched.type==CKEDITOR.NODE_ELEMENT&&touched.is('hr')){editor.fire('saveSnapshot');touched.remove();return true;}}
var siblingBlock=range.startPath().block;if(!siblingBlock||(siblingBlock&&siblingBlock.contains(startBlock)))
return;editor.fire('saveSnapshot');var bogus;if((bogus=(backspace?siblingBlock:startBlock).getBogus()))
bogus.remove();var selection=editor.getSelection(),bookmarks=selection.createBookmarks();(backspace?startBlock:siblingBlock).moveChildren(backspace?siblingBlock:startBlock,false);startPath.lastElement.mergeSiblings();pruneEmptyDisjointAncestors(startBlock,siblingBlock,!backspace);selection.selectBookmarks(bookmarks);return true;}
function mergeBlocksNonCollapsedSelection(editor,range,startPath){var startBlock=startPath.block,endPath=range.endPath(),endBlock=endPath.block;if(!startBlock||!endBlock||startBlock.equals(endBlock))
return false;editor.fire('saveSnapshot');var bogus;if((bogus=startBlock.getBogus()))
bogus.remove();range.enlarge(CKEDITOR.ENLARGE_INLINE);range.deleteContents();if(endBlock.getParent()){endBlock.moveChildren(startBlock,false);startPath.lastElement.mergeSiblings();pruneEmptyDisjointAncestors(startBlock,endBlock,true);}
range=editor.getSelection().getRanges()[0];range.collapse(1);range.optimize();if(range.startContainer.getHtml()===''){range.startContainer.appendBogus();}
range.select();return true;}
function pruneEmptyDisjointAncestors(first,second,isPruneToEnd){var commonParent=first.getCommonAncestor(second),node=isPruneToEnd?second:first,removableParent=node;while((node=node.getParent())&&!commonParent.equals(node)&&node.getChildCount()==1)
removableParent=node;removableParent.remove();}
var getHtmlFromRangeHelpers={eol:{detect:function(that,editable){var range=that.range,rangeStart=range.clone(),rangeEnd=range.clone(),startPath=new CKEDITOR.dom.elementPath(range.startContainer,editable),endPath=new CKEDITOR.dom.elementPath(range.endContainer,editable);rangeStart.collapse(1);rangeEnd.collapse();if(startPath.block&&rangeStart.checkBoundaryOfElement(startPath.block,CKEDITOR.END)){range.setStartAfter(startPath.block);that.prependEolBr=1;}
if(endPath.block&&rangeEnd.checkBoundaryOfElement(endPath.block,CKEDITOR.START)){range.setEndBefore(endPath.block);that.appendEolBr=1;}},fix:function(that,editable){var doc=editable.getDocument(),appended;if(that.appendEolBr){appended=this.createEolBr(doc);that.fragment.append(appended);}
if(that.prependEolBr&&(!appended||appended.getPrevious())){that.fragment.append(this.createEolBr(doc),1);}},createEolBr:function(doc){return doc.createElement('br',{attributes:{'data-cke-eol':1}});}},bogus:{exclude:function(that){var boundaryNodes=that.range.getBoundaryNodes(),startNode=boundaryNodes.startNode,endNode=boundaryNodes.endNode;if(endNode&&isBogus(endNode)&&(!startNode||!startNode.equals(endNode)))
that.range.setEndBefore(endNode);}},tree:{rebuild:function(that,editable){var range=that.range,node=range.getCommonAncestor(),commonPath=new CKEDITOR.dom.elementPath(node,editable),startPath=new CKEDITOR.dom.elementPath(range.startContainer,editable),endPath=new CKEDITOR.dom.elementPath(range.endContainer,editable),limit;if(node.type==CKEDITOR.NODE_TEXT)
node=node.getParent();if(commonPath.blockLimit.is({tr:1,table:1})){var tableParent=commonPath.contains('table').getParent();limit=function(node){return!node.equals(tableParent);};}
else if(commonPath.block&&commonPath.block.is(CKEDITOR.dtd.$listItem)){var startList=startPath.contains(CKEDITOR.dtd.$list),endList=endPath.contains(CKEDITOR.dtd.$list);if(!startList.equals(endList)){var listParent=commonPath.contains(CKEDITOR.dtd.$list).getParent();limit=function(node){return!node.equals(listParent);};}}
if(!limit){limit=function(node){return!node.equals(commonPath.block)&&!node.equals(commonPath.blockLimit);};}
this.rebuildFragment(that,editable,node,limit);},rebuildFragment:function(that,editable,node,checkLimit){var clone;while(node&&!node.equals(editable)&&checkLimit(node)){clone=node.clone(0,1);that.fragment.appendTo(clone);that.fragment=clone;node=node.getParent();}}},cell:{shrink:function(that){var range=that.range,startContainer=range.startContainer,endContainer=range.endContainer,startOffset=range.startOffset,endOffset=range.endOffset;if(startContainer.type==CKEDITOR.NODE_ELEMENT&&startContainer.equals(endContainer)&&startContainer.is('tr')&&++startOffset==endOffset){range.shrink(CKEDITOR.SHRINK_TEXT);}}}};var extractHtmlFromRangeHelpers=(function(){function optimizeBookmarkNode(node,toStart){var parent=node.getParent();if(parent.is(CKEDITOR.dtd.$inline))
node[toStart?'insertBefore':'insertAfter'](parent);}
function mergeElements(merged,startBookmark,endBookmark){optimizeBookmarkNode(startBookmark);optimizeBookmarkNode(endBookmark,1);var next;while((next=endBookmark.getNext())){next.insertAfter(startBookmark);startBookmark=next;}
if(isEmpty(merged))
merged.remove();}
function getPath(startElement,root){return new CKEDITOR.dom.elementPath(startElement,root);}
function createRangeFromBookmark(root,bookmark){var range=new CKEDITOR.dom.range(root);range.setStartAfter(bookmark.startNode);range.setEndBefore(bookmark.endNode);return range;}
var list={detectMerge:function(that,editable){var range=createRangeFromBookmark(editable,that.bookmark),startPath=range.startPath(),endPath=range.endPath(),startList=startPath.contains(CKEDITOR.dtd.$list),endList=endPath.contains(CKEDITOR.dtd.$list);that.mergeList=startList&&endList&&startList.getParent().equals(endList.getParent())&&!startList.equals(endList);that.mergeListItems=startPath.block&&endPath.block&&startPath.block.is(CKEDITOR.dtd.$listItem)&&endPath.block.is(CKEDITOR.dtd.$listItem);if(that.mergeList||that.mergeListItems){var rangeClone=range.clone();rangeClone.setStartBefore(that.bookmark.startNode);rangeClone.setEndAfter(that.bookmark.endNode);that.mergeListBookmark=rangeClone.createBookmark();}},merge:function(that,editable){if(!that.mergeListBookmark)
return;var startNode=that.mergeListBookmark.startNode,endNode=that.mergeListBookmark.endNode,startPath=getPath(startNode,editable),endPath=getPath(endNode,editable);if(that.mergeList){var firstList=startPath.contains(CKEDITOR.dtd.$list),secondList=endPath.contains(CKEDITOR.dtd.$list);if(!firstList.equals(secondList)){secondList.moveChildren(firstList);secondList.remove();}}
if(that.mergeListItems){var firstListItem=startPath.contains(CKEDITOR.dtd.$listItem),secondListItem=endPath.contains(CKEDITOR.dtd.$listItem);if(!firstListItem.equals(secondListItem)){mergeElements(secondListItem,startNode,endNode);}}
startNode.remove();endNode.remove();}};var block={detectMerge:function(that,editable){if(that.tableContentsRanges||that.mergeListBookmark)
return;var rangeClone=new CKEDITOR.dom.range(editable);rangeClone.setStartBefore(that.bookmark.startNode);rangeClone.setEndAfter(that.bookmark.endNode);that.mergeBlockBookmark=rangeClone.createBookmark();},merge:function(that,editable){if(!that.mergeBlockBookmark||that.purgeTableBookmark)
return;var startNode=that.mergeBlockBookmark.startNode,endNode=that.mergeBlockBookmark.endNode,startPath=getPath(startNode,editable),endPath=getPath(endNode,editable),firstBlock=startPath.block,secondBlock=endPath.block;if(firstBlock&&secondBlock&&!firstBlock.equals(secondBlock)){mergeElements(secondBlock,startNode,endNode);}
startNode.remove();endNode.remove();}};var table=(function(){var tableEditable={td:1,th:1,caption:1};function findTableContentsRanges(range){var contentsRanges=[],editableRange,walker=new CKEDITOR.dom.walker(range),startCell=range.startPath().contains(tableEditable),endCell=range.endPath().contains(tableEditable),database={};walker.guard=function(node,leaving){if(node.type==CKEDITOR.NODE_ELEMENT){var key='visited_'+(leaving?'out':'in');if(node.getCustomData(key)){return;}
CKEDITOR.dom.element.setMarker(database,node,key,1);}
if(leaving&&startCell&&node.equals(startCell)){editableRange=range.clone();editableRange.setEndAt(startCell,CKEDITOR.POSITION_BEFORE_END);contentsRanges.push(editableRange);return;}
if(!leaving&&endCell&&node.equals(endCell)){editableRange=range.clone();editableRange.setStartAt(endCell,CKEDITOR.POSITION_AFTER_START);contentsRanges.push(editableRange);return;}
if(!leaving&&checkRemoveCellContents(node)){editableRange=range.clone();editableRange.selectNodeContents(node);contentsRanges.push(editableRange);}};walker.lastForward();CKEDITOR.dom.element.clearAllMarkers(database);return contentsRanges;function checkRemoveCellContents(node){return(node.type==CKEDITOR.NODE_ELEMENT&&node.is(tableEditable)&&(!startCell||checkDisjointNodes(node,startCell))&&(!endCell||checkDisjointNodes(node,endCell)));}}
function getNormalizedAncestor(range){var common=range.getCommonAncestor();if(common.is(CKEDITOR.dtd.$tableContent)&&!common.is(tableEditable)){common=common.getAscendant('table',true);}
return common;}
function checkDisjointNodes(node1,node2){var disallowedPositions=CKEDITOR.POSITION_CONTAINS+CKEDITOR.POSITION_IS_CONTAINED,pos=node1.getPosition(node2);return pos===CKEDITOR.POSITION_IDENTICAL?false:((pos&disallowedPositions)===0);}
return{detectPurge:function(that){var range=that.range,walkerRange=range.clone();walkerRange.enlarge(CKEDITOR.ENLARGE_ELEMENT);var walker=new CKEDITOR.dom.walker(walkerRange),editablesCount=0;walker.evaluator=function(node){if(node.type==CKEDITOR.NODE_ELEMENT&&node.is(tableEditable)){++editablesCount;}};walker.checkForward();if(editablesCount>1){var startTable=range.startPath().contains('table'),endTable=range.endPath().contains('table');if(startTable&&endTable&&range.checkBoundaryOfElement(startTable,CKEDITOR.START)&&range.checkBoundaryOfElement(endTable,CKEDITOR.END)){var rangeClone=that.range.clone();rangeClone.setStartBefore(startTable);rangeClone.setEndAfter(endTable);that.purgeTableBookmark=rangeClone.createBookmark();}}},detectRanges:function(that,editable){var range=createRangeFromBookmark(editable,that.bookmark),surroundingRange=range.clone(),leftRange,rightRange,commonAncestor=getNormalizedAncestor(range),startPath=new CKEDITOR.dom.elementPath(range.startContainer,commonAncestor),endPath=new CKEDITOR.dom.elementPath(range.endContainer,commonAncestor),startTable=startPath.contains('table'),endTable=endPath.contains('table'),tableContentsRanges;if(!startTable&&!endTable){return;}
if(startTable&&endTable&&checkDisjointNodes(startTable,endTable)){that.tableSurroundingRange=surroundingRange;surroundingRange.setStartAt(startTable,CKEDITOR.POSITION_AFTER_END);surroundingRange.setEndAt(endTable,CKEDITOR.POSITION_BEFORE_START);leftRange=range.clone();leftRange.setEndAt(startTable,CKEDITOR.POSITION_AFTER_END);rightRange=range.clone();rightRange.setStartAt(endTable,CKEDITOR.POSITION_BEFORE_START);tableContentsRanges=findTableContentsRanges(leftRange).concat(findTableContentsRanges(rightRange));}
else if(!startTable){that.tableSurroundingRange=surroundingRange;surroundingRange.setEndAt(endTable,CKEDITOR.POSITION_BEFORE_START);range.setStartAt(endTable,CKEDITOR.POSITION_AFTER_START);}
else if(!endTable){that.tableSurroundingRange=surroundingRange;surroundingRange.setStartAt(startTable,CKEDITOR.POSITION_AFTER_END);range.setEndAt(startTable,CKEDITOR.POSITION_AFTER_END);}
that.tableContentsRanges=tableContentsRanges?tableContentsRanges:findTableContentsRanges(range);},deleteRanges:function(that){var range;while((range=that.tableContentsRanges.pop())){range.extractContents();if(isEmpty(range.startContainer))
range.startContainer.appendBogus();}
if(that.tableSurroundingRange){that.tableSurroundingRange.extractContents();}},purge:function(that){if(!that.purgeTableBookmark)
return;var doc=that.doc,range=that.range,rangeClone=range.clone(),block=doc.createElement('p');block.insertBefore(that.purgeTableBookmark.startNode);rangeClone.moveToBookmark(that.purgeTableBookmark);rangeClone.deleteContents();that.range.moveToPosition(block,CKEDITOR.POSITION_AFTER_START);}};})();return{list:list,block:block,table:table,detectExtractMerge:function(that){return!(that.range.startPath().contains(CKEDITOR.dtd.$listItem)&&that.range.endPath().contains(CKEDITOR.dtd.$listItem));},fixUneditableRangePosition:function(range){if(!range.startContainer.getDtd()['#']){range.moveToClosestEditablePosition(null,true);}},autoParagraph:function(editor,range){var path=range.startPath(),fixBlock;if(shouldAutoParagraph(editor,path.block,path.blockLimit)&&(fixBlock=autoParagraphTag(editor))){fixBlock=range.document.createElement(fixBlock);fixBlock.appendBogus();range.insertNode(fixBlock);range.moveToPosition(fixBlock,CKEDITOR.POSITION_AFTER_START);}}};})();})();(function(){function checkSelectionChange(){var sel=this._.fakeSelection,realSel;if(sel){realSel=this.getSelection(1);if(!realSel||!realSel.isHidden()){sel.reset();sel=0;}}
if(!sel){sel=realSel||this.getSelection(1);if(!sel||sel.getType()==CKEDITOR.SELECTION_NONE)
return;}
this.fire('selectionCheck',sel);var currentPath=this.elementPath();if(!currentPath.compare(this._.selectionPreviousPath)){if(CKEDITOR.env.webkit)
this._.previousActive=this.document.getActive();this._.selectionPreviousPath=currentPath;this.fire('selectionChange',{selection:sel,path:currentPath});}}
var checkSelectionChangeTimer,checkSelectionChangeTimeoutPending;function checkSelectionChangeTimeout(){checkSelectionChangeTimeoutPending=true;if(checkSelectionChangeTimer)
return;checkSelectionChangeTimeoutExec.call(this);checkSelectionChangeTimer=CKEDITOR.tools.setTimeout(checkSelectionChangeTimeoutExec,200,this);}
function checkSelectionChangeTimeoutExec(){checkSelectionChangeTimer=null;if(checkSelectionChangeTimeoutPending){CKEDITOR.tools.setTimeout(checkSelectionChange,0,this);checkSelectionChangeTimeoutPending=false;}}
var isVisible=CKEDITOR.dom.walker.invisible(1);function mayAbsorbCaret(node){if(isVisible(node))
return true;if(node.type==CKEDITOR.NODE_ELEMENT&&!node.is(CKEDITOR.dtd.$empty))
return true;return false;}
function rangeRequiresFix(range){function ctxRequiresFix(node,isAtEnd){if(!node||node.type==CKEDITOR.NODE_TEXT)
return false;var testRng=range.clone();return testRng['moveToElementEdit'+(isAtEnd?'End':'Start')](node);}
if(!(range.root instanceof CKEDITOR.editable))
return false;var ct=range.startContainer;var previous=range.getPreviousNode(mayAbsorbCaret,null,ct),next=range.getNextNode(mayAbsorbCaret,null,ct);if(ctxRequiresFix(previous)||ctxRequiresFix(next,1))
return true;if(!(previous||next)&&!(ct.type==CKEDITOR.NODE_ELEMENT&&ct.isBlockBoundary()&&ct.getBogus()))
return true;return false;}
function createFillingChar(element){removeFillingChar(element,false);var fillingChar=element.getDocument().createText('\u200B');element.setCustomData('cke-fillingChar',fillingChar);return fillingChar;}
function getFillingChar(element){return element.getCustomData('cke-fillingChar');}
function checkFillingChar(element){var fillingChar=getFillingChar(element);if(fillingChar){if(fillingChar.getCustomData('ready'))
removeFillingChar(element);else
fillingChar.setCustomData('ready',1);}}
function removeFillingChar(element,keepSelection){var fillingChar=element&&element.removeCustomData('cke-fillingChar');if(fillingChar){if(keepSelection!==false){var bm,sel=element.getDocument().getSelection().getNative(),range=sel&&sel.type!='None'&&sel.getRangeAt(0);if(fillingChar.getLength()>1&&range&&range.intersectsNode(fillingChar.$)){bm=createNativeSelectionBookmark(sel);var startAffected=sel.anchorNode==fillingChar.$&&sel.anchorOffset>0,endAffected=sel.focusNode==fillingChar.$&&sel.focusOffset>0;startAffected&&bm[0].offset--;endAffected&&bm[1].offset--;}}
fillingChar.setText(replaceFillingChar(fillingChar.getText()));if(bm){moveNativeSelectionToBookmark(element.getDocument().$,bm);}}}
function replaceFillingChar(html){return html.replace(/\u200B( )?/g,function(match){return match[1]?'\xa0':'';});}
function createNativeSelectionBookmark(sel){return[{node:sel.anchorNode,offset:sel.anchorOffset},{node:sel.focusNode,offset:sel.focusOffset}];}
function moveNativeSelectionToBookmark(document,bm){var sel=document.getSelection(),range=document.createRange();range.setStart(bm[0].node,bm[0].offset);range.collapse(true);sel.removeAllRanges();sel.addRange(range);sel.extend(bm[1].node,bm[1].offset);}
function hideSelection(editor){var style=CKEDITOR.env.ie?'display:none':'position:fixed;top:0;left:-1000px',hiddenEl=CKEDITOR.dom.element.createFromHtml('<div data-cke-hidden-sel="1" data-cke-temp="1" style="'+style+'">&nbsp;</div>',editor.document);editor.fire('lockSnapshot');editor.editable().append(hiddenEl);var sel=editor.getSelection(1),range=editor.createRange(),listener=sel.root.on('selectionchange',function(evt){evt.cancel();},null,null,0);range.setStartAt(hiddenEl,CKEDITOR.POSITION_AFTER_START);range.setEndAt(hiddenEl,CKEDITOR.POSITION_BEFORE_END);sel.selectRanges([range]);listener.removeListener();editor.fire('unlockSnapshot');editor._.hiddenSelectionContainer=hiddenEl;}
function removeHiddenSelectionContainer(editor){var hiddenEl=editor._.hiddenSelectionContainer;if(hiddenEl){var isDirty=editor.checkDirty();editor.fire('lockSnapshot');hiddenEl.remove();editor.fire('unlockSnapshot');!isDirty&&editor.resetDirty();}
delete editor._.hiddenSelectionContainer;}
var fakeSelectionDefaultKeystrokeHandlers=(function(){function leave(right){return function(evt){var range=evt.editor.createRange();if(range.moveToClosestEditablePosition(evt.selected,right))
evt.editor.getSelection().selectRanges([range]);return false;};}
function del(right){return function(evt){var editor=evt.editor,range=editor.createRange(),found;if(!(found=range.moveToClosestEditablePosition(evt.selected,right)))
found=range.moveToClosestEditablePosition(evt.selected,!right);if(found)
editor.getSelection().selectRanges([range]);editor.fire('saveSnapshot');evt.selected.remove();if(!found){range.moveToElementEditablePosition(editor.editable());editor.getSelection().selectRanges([range]);}
editor.fire('saveSnapshot');return false;};}
var leaveLeft=leave(),leaveRight=leave(1);return{37:leaveLeft,38:leaveLeft,39:leaveRight,40:leaveRight,8:del(),46:del(1)};})();function getOnKeyDownListener(editor){var keystrokes={37:1,39:1,8:1,46:1};return function(evt){var keystroke=evt.data.getKeystroke();if(!keystrokes[keystroke])
return;var sel=editor.getSelection(),ranges=sel.getRanges(),range=ranges[0];if(ranges.length!=1||!range.collapsed)
return;var next=range[keystroke<38?'getPreviousEditableNode':'getNextEditableNode']();if(next&&next.type==CKEDITOR.NODE_ELEMENT&&next.getAttribute('contenteditable')=='false'){editor.getSelection().fake(next);evt.data.preventDefault();evt.cancel();}};}
function getNonEditableFakeSelectionReceiver(ranges){var enclosedNode,shrinkedNode,clone,range;if(ranges.length==1&&!(range=ranges[0]).collapsed&&(enclosedNode=range.getEnclosedNode())&&enclosedNode.type==CKEDITOR.NODE_ELEMENT){clone=range.clone();clone.shrink(CKEDITOR.SHRINK_ELEMENT,true);if((shrinkedNode=clone.getEnclosedNode())&&shrinkedNode.type==CKEDITOR.NODE_ELEMENT)
enclosedNode=shrinkedNode;if(enclosedNode.getAttribute('contenteditable')=='false')
return enclosedNode;}}
function fixRangesAfterHiddenSelectionContainer(ranges,root){var range;for(var i=0;i<ranges.length;++i){range=ranges[i];if(range.endContainer.equals(root)){range.endOffset=Math.min(range.endOffset,root.getChildCount());}}}
function extractEditableRanges(ranges){for(var i=0;i<ranges.length;i++){var range=ranges[i];var parent=range.getCommonAncestor();if(parent.isReadOnly())
ranges.splice(i,1);if(range.collapsed)
continue;if(range.startContainer.isReadOnly()){var current=range.startContainer,isElement;while(current){isElement=current.type==CKEDITOR.NODE_ELEMENT;if((isElement&&current.is('body'))||!current.isReadOnly())
break;if(isElement&&current.getAttribute('contentEditable')=='false')
range.setStartAfter(current);current=current.getParent();}}
var startContainer=range.startContainer,endContainer=range.endContainer,startOffset=range.startOffset,endOffset=range.endOffset,walkerRange=range.clone();if(startContainer&&startContainer.type==CKEDITOR.NODE_TEXT){if(startOffset>=startContainer.getLength())
walkerRange.setStartAfter(startContainer);else
walkerRange.setStartBefore(startContainer);}
if(endContainer&&endContainer.type==CKEDITOR.NODE_TEXT){if(!endOffset)
walkerRange.setEndBefore(endContainer);else
walkerRange.setEndAfter(endContainer);}
var walker=new CKEDITOR.dom.walker(walkerRange);walker.evaluator=function(node){if(node.type==CKEDITOR.NODE_ELEMENT&&node.isReadOnly()){var newRange=range.clone();range.setEndBefore(node);if(range.collapsed)
ranges.splice(i--,1);if(!(node.getPosition(walkerRange.endContainer)&CKEDITOR.POSITION_CONTAINS)){newRange.setStartAfter(node);if(!newRange.collapsed)
ranges.splice(i+1,0,newRange);}
return true;}
return false;};walker.next();}
return ranges;}
CKEDITOR.on('instanceCreated',function(ev){var editor=ev.editor;editor.on('contentDom',function(){var doc=editor.document,outerDoc=CKEDITOR.document,editable=editor.editable(),body=doc.getBody(),html=doc.getDocumentElement();var isInline=editable.isInline();var restoreSel,lastSel;if(CKEDITOR.env.gecko){editable.attachListener(editable,'focus',function(evt){evt.removeListener();if(restoreSel!==0){var nativ=editor.getSelection().getNative();if(nativ&&nativ.isCollapsed&&nativ.anchorNode==editable.$){var rng=editor.createRange();rng.moveToElementEditStart(editable);rng.select();}}},null,null,-2);}
editable.attachListener(editable,CKEDITOR.env.webkit?'DOMFocusIn':'focus',function(){if(restoreSel&&CKEDITOR.env.webkit)
restoreSel=editor._.previousActive&&editor._.previousActive.equals(doc.getActive());editor.unlockSelection(restoreSel);restoreSel=0;},null,null,-1);editable.attachListener(editable,'mousedown',function(){restoreSel=0;});function saveSel(){lastSel=new CKEDITOR.dom.selection(editor.getSelection());lastSel.lock();}
if(CKEDITOR.env.ie||isInline){if(isMSSelection)
editable.attachListener(editable,'beforedeactivate',saveSel,null,null,-1);else
editable.attachListener(editor,'selectionCheck',saveSel,null,null,-1);editable.attachListener(editable,CKEDITOR.env.webkit?'DOMFocusOut':'blur',function(){editor.lockSelection(lastSel);restoreSel=1;},null,null,-1);editable.attachListener(editable,'mousedown',function(){restoreSel=0;});}
if(CKEDITOR.env.ie&&!isInline){var scroll;editable.attachListener(editable,'mousedown',function(evt){if(evt.data.$.button==2){var sel=editor.document.getSelection();if(!sel||sel.getType()==CKEDITOR.SELECTION_NONE)
scroll=editor.window.getScrollPosition();}});editable.attachListener(editable,'mouseup',function(evt){if(evt.data.$.button==2&&scroll){editor.document.$.documentElement.scrollLeft=scroll.x;editor.document.$.documentElement.scrollTop=scroll.y;}
scroll=null;});if(doc.$.compatMode!='BackCompat'){if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat){html.on('mousedown',function(evt){evt=evt.data;function onHover(evt){evt=evt.data.$;if(textRng){var rngEnd=body.$.createTextRange();moveRangeToPoint(rngEnd,evt.clientX,evt.clientY);textRng.setEndPoint(startRng.compareEndPoints('StartToStart',rngEnd)<0?'EndToEnd':'StartToStart',rngEnd);textRng.select();}}
function removeListeners(){outerDoc.removeListener('mouseup',onSelectEnd);html.removeListener('mouseup',onSelectEnd);}
function onSelectEnd(){html.removeListener('mousemove',onHover);removeListeners();textRng.select();}
if(evt.getTarget().is('html')&&evt.$.y<html.$.clientHeight&&evt.$.x<html.$.clientWidth){var textRng=body.$.createTextRange();moveRangeToPoint(textRng,evt.$.clientX,evt.$.clientY);var startRng=textRng.duplicate();html.on('mousemove',onHover);outerDoc.on('mouseup',onSelectEnd);html.on('mouseup',onSelectEnd);}});}
if(CKEDITOR.env.version>7&&CKEDITOR.env.version<11){html.on('mousedown',function(evt){if(evt.data.getTarget().is('html')){outerDoc.on('mouseup',onSelectEnd);html.on('mouseup',onSelectEnd);}});}}}
editable.attachListener(editable,'selectionchange',checkSelectionChange,editor);editable.attachListener(doc,'selectionchange',function(){if(document.activeElement!==editable.$)return;checkSelectionChange.apply(this,arguments);},editor);editable.attachListener(editable,'keyup',checkSelectionChangeTimeout,editor);editable.attachListener(editable,CKEDITOR.env.webkit?'DOMFocusIn':'focus',function(){editor.forceNextSelectionCheck();editor.selectionChange(1);});if(isInline&&(CKEDITOR.env.webkit||CKEDITOR.env.gecko)){var mouseDown;editable.attachListener(editable,'mousedown',function(){mouseDown=1;});editable.attachListener(doc.getDocumentElement(),'mouseup',function(){if(mouseDown)
checkSelectionChangeTimeout.call(editor);mouseDown=0;});}
else{editable.attachListener(CKEDITOR.env.ie?editable:doc.getDocumentElement(),'mouseup',checkSelectionChangeTimeout,editor);}
if(CKEDITOR.env.webkit){editable.attachListener(doc,'keydown',function(evt){var key=evt.data.getKey();switch(key){case 13:case 33:case 34:case 35:case 36:case 37:case 39:case 8:case 45:case 46:removeFillingChar(editable);}},null,null,-1);}
editable.attachListener(editable,'keydown',getOnKeyDownListener(editor),null,null,-1);function moveRangeToPoint(range,x,y){try{range.moveToPoint(x,y);}catch(e){}}
function removeListeners(){outerDoc.removeListener('mouseup',onSelectEnd);html.removeListener('mouseup',onSelectEnd);}
function onSelectEnd(){removeListeners();var sel=CKEDITOR.document.$.selection,range=sel.createRange();if(sel.type!='None'&&range.parentElement().ownerDocument==doc.$)
range.select();}});editor.on('setData',function(){editor.unlockSelection();if(CKEDITOR.env.webkit)
clearSelection();});editor.on('contentDomUnload',function(){editor.unlockSelection();});if(CKEDITOR.env.ie9Compat)
editor.on('beforeDestroy',clearSelection,null,null,9);editor.on('dataReady',function(){delete editor._.fakeSelection;delete editor._.hiddenSelectionContainer;editor.selectionChange(1);});editor.on('loadSnapshot',function(){var isElement=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT),last=editor.editable().getLast(isElement);if(last&&last.hasAttribute('data-cke-hidden-sel')){last.remove();if(CKEDITOR.env.gecko){var first=editor.editable().getFirst(isElement);if(first&&first.is('br')&&first.getAttribute('_moz_editor_bogus_node')){first.remove();}}}},null,null,100);editor.on('key',function(evt){if(editor.mode!='wysiwyg')
return;var sel=editor.getSelection();if(!sel.isFake)
return;var handler=fakeSelectionDefaultKeystrokeHandlers[evt.data.keyCode];if(handler)
return handler({editor:editor,selected:sel.getSelectedElement(),selection:sel,keyEvent:evt});});function clearSelection(){var sel=editor.getSelection();sel&&sel.removeAllRanges();}});CKEDITOR.on('instanceReady',function(evt){var editor=evt.editor,fillingCharBefore,selectionBookmark;if(CKEDITOR.env.webkit){editor.on('selectionChange',function(){checkFillingChar(editor.editable());},null,null,-1);editor.on('beforeSetMode',function(){removeFillingChar(editor.editable());},null,null,-1);editor.on('beforeUndoImage',beforeData);editor.on('afterUndoImage',afterData);editor.on('beforeGetData',beforeData,null,null,0);editor.on('getData',afterData);}
function beforeData(){var editable=editor.editable();if(!editable)
return;var fillingChar=getFillingChar(editable);if(fillingChar){var sel=editor.document.$.getSelection();if(sel.type!='None'&&(sel.anchorNode==fillingChar.$||sel.focusNode==fillingChar.$))
selectionBookmark=createNativeSelectionBookmark(sel);fillingCharBefore=fillingChar.getText();fillingChar.setText(replaceFillingChar(fillingCharBefore));}}
function afterData(){var editable=editor.editable();if(!editable)
return;var fillingChar=getFillingChar(editable);if(fillingChar){fillingChar.setText(fillingCharBefore);if(selectionBookmark){moveNativeSelectionToBookmark(editor.document.$,selectionBookmark);selectionBookmark=null;}}}});CKEDITOR.editor.prototype.selectionChange=function(checkNow){(checkNow?checkSelectionChange:checkSelectionChangeTimeout).call(this);};CKEDITOR.editor.prototype.getSelection=function(forceRealSelection){if((this._.savedSelection||this._.fakeSelection)&&!forceRealSelection)
return this._.savedSelection||this._.fakeSelection;var editable=this.editable();return editable&&this.mode=='wysiwyg'?new CKEDITOR.dom.selection(editable):null;};CKEDITOR.editor.prototype.lockSelection=function(sel){sel=sel||this.getSelection(1);if(sel.getType()!=CKEDITOR.SELECTION_NONE){!sel.isLocked&&sel.lock();this._.savedSelection=sel;return true;}
return false;};CKEDITOR.editor.prototype.unlockSelection=function(restore){var sel=this._.savedSelection;if(sel){sel.unlock(restore);delete this._.savedSelection;return true;}
return false;};CKEDITOR.editor.prototype.forceNextSelectionCheck=function(){delete this._.selectionPreviousPath;};CKEDITOR.dom.document.prototype.getSelection=function(){return new CKEDITOR.dom.selection(this);};CKEDITOR.dom.range.prototype.select=function(){var sel=this.root instanceof CKEDITOR.editable?this.root.editor.getSelection():new CKEDITOR.dom.selection(this.root);sel.selectRanges([this]);return sel;};CKEDITOR.SELECTION_NONE=1;CKEDITOR.SELECTION_TEXT=2;CKEDITOR.SELECTION_ELEMENT=3;var isMSSelection=typeof window.getSelection!='function',nextRev=1;CKEDITOR.dom.selection=function(target){if(target instanceof CKEDITOR.dom.selection){var selection=target;target=target.root;}
var isElement=target instanceof CKEDITOR.dom.element,root;this.rev=selection?selection.rev:nextRev++;this.document=target instanceof CKEDITOR.dom.document?target:target.getDocument();this.root=root=isElement?target:this.document.getBody();this.isLocked=0;this._={cache:{}};if(selection){CKEDITOR.tools.extend(this._.cache,selection._.cache);this.isFake=selection.isFake;this.isLocked=selection.isLocked;return this;}
var nativeSel=this.getNative(),rangeParent,range;if(nativeSel){if(nativeSel.getRangeAt){range=nativeSel.rangeCount&&nativeSel.getRangeAt(0);rangeParent=range&&new CKEDITOR.dom.node(range.commonAncestorContainer);}
else{try{range=nativeSel.createRange();}catch(err){}
rangeParent=range&&CKEDITOR.dom.element.get(range.item&&range.item(0)||range.parentElement());}}
if(!(rangeParent&&(rangeParent.type==CKEDITOR.NODE_ELEMENT||rangeParent.type==CKEDITOR.NODE_TEXT)&&(this.root.equals(rangeParent)||this.root.contains(rangeParent)))){this._.cache.type=CKEDITOR.SELECTION_NONE;this._.cache.startElement=null;this._.cache.selectedElement=null;this._.cache.selectedText='';this._.cache.ranges=new CKEDITOR.dom.rangeList();}
return this;};var styleObjectElements={img:1,hr:1,li:1,table:1,tr:1,td:1,th:1,embed:1,object:1,ol:1,ul:1,a:1,input:1,form:1,select:1,textarea:1,button:1,fieldset:1,thead:1,tfoot:1};CKEDITOR.dom.selection.prototype={getNative:function(){if(this._.cache.nativeSel!==undefined)
return this._.cache.nativeSel;return(this._.cache.nativeSel=isMSSelection?this.document.$.selection:this.document.getWindow().$.getSelection());},getType:isMSSelection?function(){var cache=this._.cache;if(cache.type)
return cache.type;var type=CKEDITOR.SELECTION_NONE;try{var sel=this.getNative(),ieType=sel.type;if(ieType=='Text')
type=CKEDITOR.SELECTION_TEXT;if(ieType=='Control')
type=CKEDITOR.SELECTION_ELEMENT;if(sel.createRange().parentElement())
type=CKEDITOR.SELECTION_TEXT;}catch(e){}
return(cache.type=type);}:function(){var cache=this._.cache;if(cache.type)
return cache.type;var type=CKEDITOR.SELECTION_TEXT;var sel=this.getNative();if(!(sel&&sel.rangeCount))
type=CKEDITOR.SELECTION_NONE;else if(sel.rangeCount==1){var range=sel.getRangeAt(0),startContainer=range.startContainer;if(startContainer==range.endContainer&&startContainer.nodeType==1&&(range.endOffset-range.startOffset)==1&&styleObjectElements[startContainer.childNodes[range.startOffset].nodeName.toLowerCase()]){type=CKEDITOR.SELECTION_ELEMENT;}}
return(cache.type=type);},getRanges:(function(){var func=isMSSelection?(function(){function getNodeIndex(node){return new CKEDITOR.dom.node(node).getIndex();}
var getBoundaryInformation=function(range,start){range=range.duplicate();range.collapse(start);var parent=range.parentElement();if(!parent.hasChildNodes())
return{container:parent,offset:0};var siblings=parent.children,child,sibling,testRange=range.duplicate(),startIndex=0,endIndex=siblings.length-1,index=-1,position,distance,container;while(startIndex<=endIndex){index=Math.floor((startIndex+endIndex)/2);child=siblings[index];testRange.moveToElementText(child);position=testRange.compareEndPoints('StartToStart',range);if(position>0)
endIndex=index-1;else if(position<0)
startIndex=index+1;else
return{container:parent,offset:getNodeIndex(child)};}
if(index==-1||index==siblings.length-1&&position<0){testRange.moveToElementText(parent);testRange.setEndPoint('StartToStart',range);distance=testRange.text.replace(/(\r\n|\r)/g,'\n').length;siblings=parent.childNodes;if(!distance){child=siblings[siblings.length-1];if(child.nodeType!=CKEDITOR.NODE_TEXT)
return{container:parent,offset:siblings.length};else
return{container:child,offset:child.nodeValue.length};}
var i=siblings.length;while(distance>0&&i>0){sibling=siblings[--i];if(sibling.nodeType==CKEDITOR.NODE_TEXT){container=sibling;distance-=sibling.nodeValue.length;}}
return{container:container,offset:-distance};}
else{testRange.collapse(position>0?true:false);testRange.setEndPoint(position>0?'StartToStart':'EndToStart',range);distance=testRange.text.replace(/(\r\n|\r)/g,'\n').length;if(!distance)
return{container:parent,offset:getNodeIndex(child)+(position>0?0:1)};while(distance>0){try{sibling=child[position>0?'previousSibling':'nextSibling'];if(sibling.nodeType==CKEDITOR.NODE_TEXT){distance-=sibling.nodeValue.length;container=sibling;}
child=sibling;}
catch(e){return{container:parent,offset:getNodeIndex(child)};}}
return{container:container,offset:position>0?-distance:container.nodeValue.length+distance};}};return function(){var sel=this.getNative(),nativeRange=sel&&sel.createRange(),type=this.getType(),range;if(!sel)
return[];if(type==CKEDITOR.SELECTION_TEXT){range=new CKEDITOR.dom.range(this.root);var boundaryInfo=getBoundaryInformation(nativeRange,true);range.setStart(new CKEDITOR.dom.node(boundaryInfo.container),boundaryInfo.offset);boundaryInfo=getBoundaryInformation(nativeRange);range.setEnd(new CKEDITOR.dom.node(boundaryInfo.container),boundaryInfo.offset);if(range.endContainer.getPosition(range.startContainer)&CKEDITOR.POSITION_PRECEDING&&range.endOffset<=range.startContainer.getIndex())
range.collapse();return[range];}else if(type==CKEDITOR.SELECTION_ELEMENT){var retval=[];for(var i=0;i<nativeRange.length;i++){var element=nativeRange.item(i),parentElement=element.parentNode,j=0;range=new CKEDITOR.dom.range(this.root);for(;j<parentElement.childNodes.length&&parentElement.childNodes[j]!=element;j++){}
range.setStart(new CKEDITOR.dom.node(parentElement),j);range.setEnd(new CKEDITOR.dom.node(parentElement),j+1);retval.push(range);}
return retval;}
return[];};})():function(){var ranges=[],range,sel=this.getNative();if(!sel)
return ranges;for(var i=0;i<sel.rangeCount;i++){var nativeRange=sel.getRangeAt(i);range=new CKEDITOR.dom.range(this.root);range.setStart(new CKEDITOR.dom.node(nativeRange.startContainer),nativeRange.startOffset);range.setEnd(new CKEDITOR.dom.node(nativeRange.endContainer),nativeRange.endOffset);ranges.push(range);}
return ranges;};return function(onlyEditables){var cache=this._.cache,ranges=cache.ranges;if(!ranges)
cache.ranges=ranges=new CKEDITOR.dom.rangeList(func.call(this));if(!onlyEditables)
return ranges;return extractEditableRanges(new CKEDITOR.dom.rangeList(ranges.slice()));};})(),getStartElement:function(){var cache=this._.cache;if(cache.startElement!==undefined)
return cache.startElement;var node;switch(this.getType()){case CKEDITOR.SELECTION_ELEMENT:return this.getSelectedElement();case CKEDITOR.SELECTION_TEXT:var range=this.getRanges()[0];if(range){if(!range.collapsed){range.optimize();while(1){var startContainer=range.startContainer,startOffset=range.startOffset;if(startOffset==(startContainer.getChildCount?startContainer.getChildCount():startContainer.getLength())&&!startContainer.isBlockBoundary())
range.setStartAfter(startContainer);else
break;}
node=range.startContainer;if(node.type!=CKEDITOR.NODE_ELEMENT)
return node.getParent();node=node.getChild(range.startOffset);if(!node||node.type!=CKEDITOR.NODE_ELEMENT)
node=range.startContainer;else{var child=node.getFirst();while(child&&child.type==CKEDITOR.NODE_ELEMENT){node=child;child=child.getFirst();}}}else{node=range.startContainer;if(node.type!=CKEDITOR.NODE_ELEMENT)
node=node.getParent();}
node=node.$;}}
return cache.startElement=(node?new CKEDITOR.dom.element(node):null);},getSelectedElement:function(){var cache=this._.cache;if(cache.selectedElement!==undefined)
return cache.selectedElement;var self=this;var node=CKEDITOR.tools.tryThese(function(){return self.getNative().createRange().item(0);},function(){var range=self.getRanges()[0].clone(),enclosed,selected;for(var i=2;i&&!((enclosed=range.getEnclosedNode())&&(enclosed.type==CKEDITOR.NODE_ELEMENT)&&styleObjectElements[enclosed.getName()]&&(selected=enclosed));i--){range.shrink(CKEDITOR.SHRINK_ELEMENT);}
return selected&&selected.$;});return cache.selectedElement=(node?new CKEDITOR.dom.element(node):null);},getSelectedText:function(){var cache=this._.cache;if(cache.selectedText!==undefined)
return cache.selectedText;var nativeSel=this.getNative(),text=isMSSelection?nativeSel.type=='Control'?'':nativeSel.createRange().text:nativeSel.toString();return(cache.selectedText=text);},lock:function(){this.getRanges();this.getStartElement();this.getSelectedElement();this.getSelectedText();this._.cache.nativeSel=null;this.isLocked=1;},unlock:function(restore){if(!this.isLocked)
return;if(restore){var selectedElement=this.getSelectedElement(),ranges=!selectedElement&&this.getRanges(),faked=this.isFake;}
this.isLocked=0;this.reset();if(restore){var common=selectedElement||ranges[0]&&ranges[0].getCommonAncestor();if(!(common&&common.getAscendant('body',1)))
return;if(faked)
this.fake(selectedElement);else if(selectedElement)
this.selectElement(selectedElement);else
this.selectRanges(ranges);}},reset:function(){this._.cache={};this.isFake=0;var editor=this.root.editor;if(editor&&editor._.fakeSelection){if(this.rev==editor._.fakeSelection.rev){delete editor._.fakeSelection;removeHiddenSelectionContainer(editor);}}
this.rev=nextRev++;},selectElement:function(element){var range=new CKEDITOR.dom.range(this.root);range.setStartBefore(element);range.setEndAfter(element);this.selectRanges([range]);},selectRanges:function(ranges){var editor=this.root.editor,hadHiddenSelectionContainer=editor&&editor._.hiddenSelectionContainer;this.reset();if(hadHiddenSelectionContainer)
fixRangesAfterHiddenSelectionContainer(ranges,this.root);if(!ranges.length)
return;if(this.isLocked){var focused=CKEDITOR.document.getActive();this.unlock();this.selectRanges(ranges);this.lock();focused&&!focused.equals(this.root)&&focused.focus();return;}
var receiver=getNonEditableFakeSelectionReceiver(ranges);if(receiver){this.fake(receiver);return;}
if(isMSSelection){var notWhitespaces=CKEDITOR.dom.walker.whitespaces(true),fillerTextRegex=/\ufeff|\u00a0/,nonCells={table:1,tbody:1,tr:1};if(ranges.length>1){var last=ranges[ranges.length-1];ranges[0].setEnd(last.endContainer,last.endOffset);}
var range=ranges[0];var collapsed=range.collapsed,isStartMarkerAlone,dummySpan,ieRange;var selected=range.getEnclosedNode();if(selected&&selected.type==CKEDITOR.NODE_ELEMENT&&selected.getName()in styleObjectElements&&!(selected.is('a')&&selected.getText())){try{ieRange=selected.$.createControlRange();ieRange.addElement(selected.$);ieRange.select();return;}catch(er){}}
if(range.startContainer.type==CKEDITOR.NODE_ELEMENT&&range.startContainer.getName()in nonCells||range.endContainer.type==CKEDITOR.NODE_ELEMENT&&range.endContainer.getName()in nonCells){range.shrink(CKEDITOR.NODE_ELEMENT,true);collapsed=range.collapsed;}
var bookmark=range.createBookmark();var startNode=bookmark.startNode;var endNode;if(!collapsed)
endNode=bookmark.endNode;ieRange=range.document.$.body.createTextRange();ieRange.moveToElementText(startNode.$);ieRange.moveStart('character',1);if(endNode){var ieRangeEnd=range.document.$.body.createTextRange();ieRangeEnd.moveToElementText(endNode.$);ieRange.setEndPoint('EndToEnd',ieRangeEnd);ieRange.moveEnd('character',-1);}else{var next=startNode.getNext(notWhitespaces);var inPre=startNode.hasAscendant('pre');isStartMarkerAlone=(!(next&&next.getText&&next.getText().match(fillerTextRegex))&&(inPre||!startNode.hasPrevious()||(startNode.getPrevious().is&&startNode.getPrevious().is('br'))));dummySpan=range.document.createElement('span');dummySpan.setHtml('&#65279;');dummySpan.insertBefore(startNode);if(isStartMarkerAlone){range.document.createText('\ufeff').insertBefore(startNode);}}
range.setStartBefore(startNode);startNode.remove();if(collapsed){if(isStartMarkerAlone){ieRange.moveStart('character',-1);ieRange.select();range.document.$.selection.clear();}else{ieRange.select();}
range.moveToPosition(dummySpan,CKEDITOR.POSITION_BEFORE_START);dummySpan.remove();}else{range.setEndBefore(endNode);endNode.remove();ieRange.select();}}else{var sel=this.getNative();if(!sel)
return;this.removeAllRanges();for(var i=0;i<ranges.length;i++){if(i<ranges.length-1){var left=ranges[i],right=ranges[i+1],between=left.clone();between.setStart(left.endContainer,left.endOffset);between.setEnd(right.startContainer,right.startOffset);if(!between.collapsed){between.shrink(CKEDITOR.NODE_ELEMENT,true);var ancestor=between.getCommonAncestor(),enclosed=between.getEnclosedNode();if(ancestor.isReadOnly()||enclosed&&enclosed.isReadOnly()){right.setStart(left.startContainer,left.startOffset);ranges.splice(i--,1);continue;}}}
range=ranges[i];var nativeRange=this.document.$.createRange();if(range.collapsed&&CKEDITOR.env.webkit&&rangeRequiresFix(range)){var fillingChar=createFillingChar(this.root);range.insertNode(fillingChar);next=fillingChar.getNext();if(next&&!fillingChar.getPrevious()&&next.type==CKEDITOR.NODE_ELEMENT&&next.getName()=='br'){removeFillingChar(this.root);range.moveToPosition(next,CKEDITOR.POSITION_BEFORE_START);}else{range.moveToPosition(fillingChar,CKEDITOR.POSITION_AFTER_END);}}
nativeRange.setStart(range.startContainer.$,range.startOffset);try{nativeRange.setEnd(range.endContainer.$,range.endOffset);}catch(e){if(e.toString().indexOf('NS_ERROR_ILLEGAL_VALUE')>=0){range.collapse(1);nativeRange.setEnd(range.endContainer.$,range.endOffset);}else{throw e;}}
sel.addRange(nativeRange);}}
this.reset();this.root.fire('selectionchange');},fake:function(element){var editor=this.root.editor;this.reset();hideSelection(editor);var cache=this._.cache;var range=new CKEDITOR.dom.range(this.root);range.setStartBefore(element);range.setEndAfter(element);cache.ranges=new CKEDITOR.dom.rangeList(range);cache.selectedElement=cache.startElement=element;cache.type=CKEDITOR.SELECTION_ELEMENT;cache.selectedText=cache.nativeSel=null;this.isFake=1;this.rev=nextRev++;editor._.fakeSelection=this;this.root.fire('selectionchange');},isHidden:function(){var el=this.getCommonAncestor();if(el&&el.type==CKEDITOR.NODE_TEXT)
el=el.getParent();return!!(el&&el.data('cke-hidden-sel'));},createBookmarks:function(serializable){var bookmark=this.getRanges().createBookmarks(serializable);this.isFake&&(bookmark.isFake=1);return bookmark;},createBookmarks2:function(normalized){var bookmark=this.getRanges().createBookmarks2(normalized);this.isFake&&(bookmark.isFake=1);return bookmark;},selectBookmarks:function(bookmarks){var ranges=[],node;for(var i=0;i<bookmarks.length;i++){var range=new CKEDITOR.dom.range(this.root);range.moveToBookmark(bookmarks[i]);ranges.push(range);}
if(bookmarks.isFake){node=ranges[0].getEnclosedNode();if(!node||node.type!=CKEDITOR.NODE_ELEMENT){bookmarks.isFake=0;}}
if(bookmarks.isFake)
this.fake(node);else
this.selectRanges(ranges);return this;},getCommonAncestor:function(){var ranges=this.getRanges();if(!ranges.length)
return null;var startNode=ranges[0].startContainer,endNode=ranges[ranges.length-1].endContainer;return startNode.getCommonAncestor(endNode);},scrollIntoView:function(){if(this.type!=CKEDITOR.SELECTION_NONE)
this.getRanges()[0].scrollIntoView();},removeAllRanges:function(){if(this.getType()==CKEDITOR.SELECTION_NONE)
return;var nativ=this.getNative();try{nativ&&nativ[isMSSelection?'empty':'removeAllRanges']();}catch(er){}
this.reset();}};})();'use strict';CKEDITOR.STYLE_BLOCK=1;CKEDITOR.STYLE_INLINE=2;CKEDITOR.STYLE_OBJECT=3;(function(){var blockElements={address:1,div:1,h1:1,h2:1,h3:1,h4:1,h5:1,h6:1,p:1,pre:1,section:1,header:1,footer:1,nav:1,article:1,aside:1,figure:1,dialog:1,hgroup:1,time:1,meter:1,menu:1,command:1,keygen:1,output:1,progress:1,details:1,datagrid:1,datalist:1},objectElements={a:1,blockquote:1,embed:1,hr:1,img:1,li:1,object:1,ol:1,table:1,td:1,tr:1,th:1,ul:1,dl:1,dt:1,dd:1,form:1,audio:1,video:1};var semicolonFixRegex=/\s*(?:;\s*|$)/,varRegex=/#\((.+?)\)/g;var notBookmark=CKEDITOR.dom.walker.bookmark(0,1),nonWhitespaces=CKEDITOR.dom.walker.whitespaces(1);CKEDITOR.style=function(styleDefinition,variablesValues){if(typeof styleDefinition.type=='string')
return new CKEDITOR.style.customHandlers[styleDefinition.type](styleDefinition);var attrs=styleDefinition.attributes;if(attrs&&attrs.style){styleDefinition.styles=CKEDITOR.tools.extend({},styleDefinition.styles,CKEDITOR.tools.parseCssText(attrs.style));delete attrs.style;}
if(variablesValues){styleDefinition=CKEDITOR.tools.clone(styleDefinition);replaceVariables(styleDefinition.attributes,variablesValues);replaceVariables(styleDefinition.styles,variablesValues);}
var element=this.element=styleDefinition.element?(typeof styleDefinition.element=='string'?styleDefinition.element.toLowerCase():styleDefinition.element):'*';this.type=styleDefinition.type||(blockElements[element]?CKEDITOR.STYLE_BLOCK:objectElements[element]?CKEDITOR.STYLE_OBJECT:CKEDITOR.STYLE_INLINE);if(typeof this.element=='object')
this.type=CKEDITOR.STYLE_OBJECT;this._={definition:styleDefinition};};CKEDITOR.style.prototype={apply:function(editor){if(editor instanceof CKEDITOR.dom.document)
return applyStyleOnSelection.call(this,editor.getSelection());if(this.checkApplicable(editor.elementPath(),editor)){var initialEnterMode=this._.enterMode;if(!initialEnterMode)
this._.enterMode=editor.activeEnterMode;applyStyleOnSelection.call(this,editor.getSelection(),0,editor);this._.enterMode=initialEnterMode;}},remove:function(editor){if(editor instanceof CKEDITOR.dom.document)
return applyStyleOnSelection.call(this,editor.getSelection(),1);if(this.checkApplicable(editor.elementPath(),editor)){var initialEnterMode=this._.enterMode;if(!initialEnterMode)
this._.enterMode=editor.activeEnterMode;applyStyleOnSelection.call(this,editor.getSelection(),1,editor);this._.enterMode=initialEnterMode;}},applyToRange:function(range){this.applyToRange=this.type==CKEDITOR.STYLE_INLINE?applyInlineStyle:this.type==CKEDITOR.STYLE_BLOCK?applyBlockStyle:this.type==CKEDITOR.STYLE_OBJECT?applyObjectStyle:null;return this.applyToRange(range);},removeFromRange:function(range){this.removeFromRange=this.type==CKEDITOR.STYLE_INLINE?removeInlineStyle:this.type==CKEDITOR.STYLE_BLOCK?removeBlockStyle:this.type==CKEDITOR.STYLE_OBJECT?removeObjectStyle:null;return this.removeFromRange(range);},applyToObject:function(element){setupElement(element,this);},checkActive:function(elementPath,editor){switch(this.type){case CKEDITOR.STYLE_BLOCK:return this.checkElementRemovable(elementPath.block||elementPath.blockLimit,true,editor);case CKEDITOR.STYLE_OBJECT:case CKEDITOR.STYLE_INLINE:var elements=elementPath.elements;for(var i=0,element;i<elements.length;i++){element=elements[i];if(this.type==CKEDITOR.STYLE_INLINE&&(element==elementPath.block||element==elementPath.blockLimit))
continue;if(this.type==CKEDITOR.STYLE_OBJECT){var name=element.getName();if(!(typeof this.element=='string'?name==this.element:name in this.element))
continue;}
if(this.checkElementRemovable(element,true,editor))
return true;}}
return false;},checkApplicable:function(elementPath,editor,filter){if(editor&&editor instanceof CKEDITOR.filter)
filter=editor;if(filter&&!filter.check(this))
return false;switch(this.type){case CKEDITOR.STYLE_OBJECT:return!!elementPath.contains(this.element);case CKEDITOR.STYLE_BLOCK:return!!elementPath.blockLimit.getDtd()[this.element];}
return true;},checkElementMatch:function(element,fullMatch){var def=this._.definition;if(!element||!def.ignoreReadonly&&element.isReadOnly())
return false;var attribs,name=element.getName();if(typeof this.element=='string'?name==this.element:name in this.element){if(!fullMatch&&!element.hasAttributes())
return true;attribs=getAttributesForComparison(def);if(attribs._length){for(var attName in attribs){if(attName=='_length')
continue;var elementAttr=element.getAttribute(attName)||'';if(attName=='style'?compareCssText(attribs[attName],elementAttr):attribs[attName]==elementAttr){if(!fullMatch)
return true;}else if(fullMatch){return false;}}
if(fullMatch)
return true;}else{return true;}}
return false;},checkElementRemovable:function(element,fullMatch,editor){if(this.checkElementMatch(element,fullMatch,editor))
return true;var override=getOverrides(this)[element.getName()];if(override){var attribs,attName;if(!(attribs=override.attributes))
return true;for(var i=0;i<attribs.length;i++){attName=attribs[i][0];var actualAttrValue=element.getAttribute(attName);if(actualAttrValue){var attValue=attribs[i][1];if(attValue===null)
return true;if(typeof attValue=='string'){if(actualAttrValue==attValue)
return true;}else if(attValue.test(actualAttrValue)){return true;}}}}
return false;},buildPreview:function(label){var styleDefinition=this._.definition,html=[],elementName=styleDefinition.element;if(elementName=='bdo')
elementName='span';html=['<',elementName];var attribs=styleDefinition.attributes;if(attribs){for(var att in attribs)
html.push(' ',att,'="',attribs[att],'"');}
var cssStyle=CKEDITOR.style.getStyleText(styleDefinition);if(cssStyle)
html.push(' style="',cssStyle,'"');html.push('>',(label||styleDefinition.name),'</',elementName,'>');return html.join('');},getDefinition:function(){return this._.definition;}};CKEDITOR.style.getStyleText=function(styleDefinition){var stylesDef=styleDefinition._ST;if(stylesDef)
return stylesDef;stylesDef=styleDefinition.styles;var stylesText=(styleDefinition.attributes&&styleDefinition.attributes.style)||'',specialStylesText='';if(stylesText.length)
stylesText=stylesText.replace(semicolonFixRegex,';');for(var style in stylesDef){var styleVal=stylesDef[style],text=(style+':'+styleVal).replace(semicolonFixRegex,';');if(styleVal=='inherit')
specialStylesText+=text;else
stylesText+=text;}
if(stylesText.length)
stylesText=CKEDITOR.tools.normalizeCssText(stylesText,true);stylesText+=specialStylesText;return(styleDefinition._ST=stylesText);};CKEDITOR.style.customHandlers={};CKEDITOR.style.addCustomHandler=function(definition){var styleClass=function(styleDefinition){this._={definition:styleDefinition};if(this.setup)
this.setup(styleDefinition);};styleClass.prototype=CKEDITOR.tools.extend(CKEDITOR.tools.prototypedCopy(CKEDITOR.style.prototype),{assignedTo:CKEDITOR.STYLE_OBJECT},definition,true);this.customHandlers[definition.type]=styleClass;return styleClass;};function getUnstylableParent(element,root){var unstylable,editable;while((element=element.getParent())){if(element.equals(root))
break;if(element.getAttribute('data-nostyle'))
unstylable=element;else if(!editable){var contentEditable=element.getAttribute('contentEditable');if(contentEditable=='false')
unstylable=element;else if(contentEditable=='true')
editable=1;}}
return unstylable;}
var posPrecedingIdenticalContained=CKEDITOR.POSITION_PRECEDING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED,posFollowingIdenticalContained=CKEDITOR.POSITION_FOLLOWING|CKEDITOR.POSITION_IDENTICAL|CKEDITOR.POSITION_IS_CONTAINED;function checkIfNodeCanBeChildOfStyle(def,currentNode,lastNode,nodeName,dtd,nodeIsNoStyle,nodeIsReadonly,includeReadonly){if(!nodeName)
return 1;if(!dtd[nodeName]||nodeIsNoStyle)
return 0;if(nodeIsReadonly&&!includeReadonly)
return 0;return checkPositionAndRule(currentNode,lastNode,def,posPrecedingIdenticalContained);}
function checkIfStyleCanBeChildOf(def,currentParent,elementName,isUnknownElement){return currentParent&&((currentParent.getDtd()||CKEDITOR.dtd.span)[elementName]||isUnknownElement)&&(!def.parentRule||def.parentRule(currentParent));}
function checkIfStartsRange(nodeName,currentNode,lastNode){return(!nodeName||!CKEDITOR.dtd.$removeEmpty[nodeName]||(currentNode.getPosition(lastNode)|posPrecedingIdenticalContained)==posPrecedingIdenticalContained);}
function checkIfTextOrReadonlyOrEmptyElement(currentNode,nodeIsReadonly){var nodeType=currentNode.type;return nodeType==CKEDITOR.NODE_TEXT||nodeIsReadonly||(nodeType==CKEDITOR.NODE_ELEMENT&&!currentNode.getChildCount());}
function checkPositionAndRule(nodeA,nodeB,def,posBitFlags){return(nodeA.getPosition(nodeB)|posBitFlags)==posBitFlags&&(!def.childRule||def.childRule(nodeA));}
function applyInlineStyle(range){var document=range.document;if(range.collapsed){var collapsedElement=getElement(this,document);range.insertNode(collapsedElement);range.moveToPosition(collapsedElement,CKEDITOR.POSITION_BEFORE_END);return;}
var elementName=this.element,def=this._.definition,isUnknownElement;var ignoreReadonly=def.ignoreReadonly,includeReadonly=ignoreReadonly||def.includeReadonly;if(includeReadonly==null)
includeReadonly=range.root.getCustomData('cke_includeReadonly');var dtd=CKEDITOR.dtd[elementName];if(!dtd){isUnknownElement=true;dtd=CKEDITOR.dtd.span;}
range.enlarge(CKEDITOR.ENLARGE_INLINE,1);range.trim();var boundaryNodes=range.createBookmark(),firstNode=boundaryNodes.startNode,lastNode=boundaryNodes.endNode,currentNode=firstNode,styleRange;if(!ignoreReadonly){var root=range.getCommonAncestor(),firstUnstylable=getUnstylableParent(firstNode,root),lastUnstylable=getUnstylableParent(lastNode,root);if(firstUnstylable)
currentNode=firstUnstylable.getNextSourceNode(true);if(lastUnstylable)
lastNode=lastUnstylable;}
if(currentNode.getPosition(lastNode)==CKEDITOR.POSITION_FOLLOWING)
currentNode=0;while(currentNode){var applyStyle=false;if(currentNode.equals(lastNode)){currentNode=null;applyStyle=true;}else{var nodeName=currentNode.type==CKEDITOR.NODE_ELEMENT?currentNode.getName():null,nodeIsReadonly=nodeName&&(currentNode.getAttribute('contentEditable')=='false'),nodeIsNoStyle=nodeName&&currentNode.getAttribute('data-nostyle');if(nodeName&&currentNode.data('cke-bookmark')){currentNode=currentNode.getNextSourceNode(true);continue;}
if(nodeIsReadonly&&includeReadonly&&CKEDITOR.dtd.$block[nodeName])
applyStyleOnNestedEditables.call(this,currentNode);if(checkIfNodeCanBeChildOfStyle(def,currentNode,lastNode,nodeName,dtd,nodeIsNoStyle,nodeIsReadonly,includeReadonly)){var currentParent=currentNode.getParent();if(checkIfStyleCanBeChildOf(def,currentParent,elementName,isUnknownElement)){if(!styleRange&&checkIfStartsRange(nodeName,currentNode,lastNode)){styleRange=range.clone();styleRange.setStartBefore(currentNode);}
if(checkIfTextOrReadonlyOrEmptyElement(currentNode,nodeIsReadonly)){var includedNode=currentNode;var parentNode;while((applyStyle=!includedNode.getNext(notBookmark))&&(parentNode=includedNode.getParent(),dtd[parentNode.getName()])&&checkPositionAndRule(parentNode,firstNode,def,posFollowingIdenticalContained)){includedNode=parentNode;}
styleRange.setEndAfter(includedNode);}}else{applyStyle=true;}}
else{applyStyle=true;}
currentNode=currentNode.getNextSourceNode(nodeIsNoStyle||nodeIsReadonly);}
if(applyStyle&&styleRange&&!styleRange.collapsed){var styleNode=getElement(this,document),styleHasAttrs=styleNode.hasAttributes();var parent=styleRange.getCommonAncestor();var removeList={styles:{},attrs:{},blockedStyles:{},blockedAttrs:{}};var attName,styleName,value;while(styleNode&&parent){if(parent.getName()==elementName){for(attName in def.attributes){if(removeList.blockedAttrs[attName]||!(value=parent.getAttribute(styleName)))
continue;if(styleNode.getAttribute(attName)==value)
removeList.attrs[attName]=1;else
removeList.blockedAttrs[attName]=1;}
for(styleName in def.styles){if(removeList.blockedStyles[styleName]||!(value=parent.getStyle(styleName)))
continue;if(styleNode.getStyle(styleName)==value)
removeList.styles[styleName]=1;else
removeList.blockedStyles[styleName]=1;}}
parent=parent.getParent();}
for(attName in removeList.attrs)
styleNode.removeAttribute(attName);for(styleName in removeList.styles)
styleNode.removeStyle(styleName);if(styleHasAttrs&&!styleNode.hasAttributes())
styleNode=null;if(styleNode){styleRange.extractContents().appendTo(styleNode);styleRange.insertNode(styleNode);removeFromInsideElement.call(this,styleNode);styleNode.mergeSiblings();if(!CKEDITOR.env.ie)
styleNode.$.normalize();}
else{styleNode=new CKEDITOR.dom.element('span');styleRange.extractContents().appendTo(styleNode);styleRange.insertNode(styleNode);removeFromInsideElement.call(this,styleNode);styleNode.remove(true);}
styleRange=null;}}
range.moveToBookmark(boundaryNodes);range.shrink(CKEDITOR.SHRINK_TEXT);range.shrink(CKEDITOR.NODE_ELEMENT,true);}
function removeInlineStyle(range){range.enlarge(CKEDITOR.ENLARGE_INLINE,1);var bookmark=range.createBookmark(),startNode=bookmark.startNode;if(range.collapsed){var startPath=new CKEDITOR.dom.elementPath(startNode.getParent(),range.root),boundaryElement;for(var i=0,element;i<startPath.elements.length&&(element=startPath.elements[i]);i++){if(element==startPath.block||element==startPath.blockLimit)
break;if(this.checkElementRemovable(element)){var isStart;if(range.collapsed&&(range.checkBoundaryOfElement(element,CKEDITOR.END)||(isStart=range.checkBoundaryOfElement(element,CKEDITOR.START)))){boundaryElement=element;boundaryElement.match=isStart?'start':'end';}else{element.mergeSiblings();if(element.is(this.element))
removeFromElement.call(this,element);else
removeOverrides(element,getOverrides(this)[element.getName()]);}}}
if(boundaryElement){var clonedElement=startNode;for(i=0;;i++){var newElement=startPath.elements[i];if(newElement.equals(boundaryElement))
break;else if(newElement.match)
continue;else
newElement=newElement.clone();newElement.append(clonedElement);clonedElement=newElement;}
clonedElement[boundaryElement.match=='start'?'insertBefore':'insertAfter'](boundaryElement);}}else{var endNode=bookmark.endNode,me=this;breakNodes();var currentNode=startNode;while(!currentNode.equals(endNode)){var nextNode=currentNode.getNextSourceNode();if(currentNode.type==CKEDITOR.NODE_ELEMENT&&this.checkElementRemovable(currentNode)){if(currentNode.getName()==this.element)
removeFromElement.call(this,currentNode);else
removeOverrides(currentNode,getOverrides(this)[currentNode.getName()]);if(nextNode.type==CKEDITOR.NODE_ELEMENT&&nextNode.contains(startNode)){breakNodes();nextNode=startNode.getNext();}}
currentNode=nextNode;}}
range.moveToBookmark(bookmark);range.shrink(CKEDITOR.NODE_ELEMENT,true);function breakNodes(){var startPath=new CKEDITOR.dom.elementPath(startNode.getParent()),endPath=new CKEDITOR.dom.elementPath(endNode.getParent()),breakStart=null,breakEnd=null;for(var i=0;i<startPath.elements.length;i++){var element=startPath.elements[i];if(element==startPath.block||element==startPath.blockLimit)
break;if(me.checkElementRemovable(element,true))
breakStart=element;}
for(i=0;i<endPath.elements.length;i++){element=endPath.elements[i];if(element==endPath.block||element==endPath.blockLimit)
break;if(me.checkElementRemovable(element,true))
breakEnd=element;}
if(breakEnd)
endNode.breakParent(breakEnd);if(breakStart)
startNode.breakParent(breakStart);}}
function applyStyleOnNestedEditables(editablesContainer){var editables=findNestedEditables(editablesContainer),editable,l=editables.length,i=0,range=l&&new CKEDITOR.dom.range(editablesContainer.getDocument());for(;i<l;++i){editable=editables[i];if(checkIfAllowedInEditable(editable,this)){range.selectNodeContents(editable);applyInlineStyle.call(this,range);}}}
function findNestedEditables(container){var editables=[];container.forEach(function(element){if(element.getAttribute('contenteditable')=='true'){editables.push(element);return false;}},CKEDITOR.NODE_ELEMENT,true);return editables;}
function checkIfAllowedInEditable(editable,style){var filter=CKEDITOR.filter.instances[editable.data('cke-filter')];return filter?filter.check(style):1;}
function checkIfAllowedByIterator(iterator,style){return iterator.activeFilter?iterator.activeFilter.check(style):1;}
function applyObjectStyle(range){var start=range.getEnclosedNode()||range.getCommonAncestor(false,true),element=new CKEDITOR.dom.elementPath(start,range.root).contains(this.element,1);element&&!element.isReadOnly()&&setupElement(element,this);}
function removeObjectStyle(range){var parent=range.getCommonAncestor(true,true),element=new CKEDITOR.dom.elementPath(parent,range.root).contains(this.element,1);if(!element)
return;var style=this,def=style._.definition,attributes=def.attributes;if(attributes){for(var att in attributes)
element.removeAttribute(att,attributes[att]);}
if(def.styles){for(var i in def.styles){if(def.styles.hasOwnProperty(i))
element.removeStyle(i);}}}
function applyBlockStyle(range){var bookmark=range.createBookmark(true);var iterator=range.createIterator();iterator.enforceRealBlocks=true;if(this._.enterMode)
iterator.enlargeBr=(this._.enterMode!=CKEDITOR.ENTER_BR);var block,doc=range.document,newBlock;while((block=iterator.getNextParagraph())){if(!block.isReadOnly()&&checkIfAllowedByIterator(iterator,this)){newBlock=getElement(this,doc,block);replaceBlock(block,newBlock);}}
range.moveToBookmark(bookmark);}
function removeBlockStyle(range){var bookmark=range.createBookmark(1);var iterator=range.createIterator();iterator.enforceRealBlocks=true;iterator.enlargeBr=this._.enterMode!=CKEDITOR.ENTER_BR;var block,newBlock;while((block=iterator.getNextParagraph())){if(this.checkElementRemovable(block)){if(block.is('pre')){newBlock=this._.enterMode==CKEDITOR.ENTER_BR?null:range.document.createElement(this._.enterMode==CKEDITOR.ENTER_P?'p':'div');newBlock&&block.copyAttributes(newBlock);replaceBlock(block,newBlock);}else{removeFromElement.call(this,block);}}}
range.moveToBookmark(bookmark);}
function replaceBlock(block,newBlock){var removeBlock=!newBlock;if(removeBlock){newBlock=block.getDocument().createElement('div');block.copyAttributes(newBlock);}
var newBlockIsPre=newBlock&&newBlock.is('pre'),blockIsPre=block.is('pre'),isToPre=newBlockIsPre&&!blockIsPre,isFromPre=!newBlockIsPre&&blockIsPre;if(isToPre)
newBlock=toPre(block,newBlock);else if(isFromPre)
newBlock=fromPres(removeBlock?[block.getHtml()]:splitIntoPres(block),newBlock);else
block.moveChildren(newBlock);newBlock.replace(block);if(newBlockIsPre){mergePre(newBlock);}else if(removeBlock){removeNoAttribsElement(newBlock);}}
function mergePre(preBlock){var previousBlock;if(!((previousBlock=preBlock.getPrevious(nonWhitespaces))&&previousBlock.type==CKEDITOR.NODE_ELEMENT&&previousBlock.is('pre')))
return;var mergedHtml=replace(previousBlock.getHtml(),/\n$/,'')+'\n\n'+
replace(preBlock.getHtml(),/^\n/,'');if(CKEDITOR.env.ie)
preBlock.$.outerHTML='<pre>'+mergedHtml+'</pre>';else
preBlock.setHtml(mergedHtml);previousBlock.remove();}
function splitIntoPres(preBlock){var duoBrRegex=/(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi,pres=[],splitedHtml=replace(preBlock.getOuterHtml(),duoBrRegex,function(match,charBefore,bookmark){return charBefore+'</pre>'+bookmark+'<pre>';});splitedHtml.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi,function(match,preContent){pres.push(preContent);});return pres;}
function replace(str,regexp,replacement){var headBookmark='',tailBookmark='';str=str.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi,function(str,m1,m2){m1&&(headBookmark=m1);m2&&(tailBookmark=m2);return'';});return headBookmark+str.replace(regexp,replacement)+tailBookmark;}
function fromPres(preHtmls,newBlock){var docFrag;if(preHtmls.length>1)
docFrag=new CKEDITOR.dom.documentFragment(newBlock.getDocument());for(var i=0;i<preHtmls.length;i++){var blockHtml=preHtmls[i];blockHtml=blockHtml.replace(/(\r\n|\r)/g,'\n');blockHtml=replace(blockHtml,/^[ \t]*\n/,'');blockHtml=replace(blockHtml,/\n$/,'');blockHtml=replace(blockHtml,/^[ \t]+|[ \t]+$/g,function(match,offset){if(match.length==1)
return'&nbsp;';else if(!offset)
return CKEDITOR.tools.repeat('&nbsp;',match.length-1)+' ';else
return' '+CKEDITOR.tools.repeat('&nbsp;',match.length-1);});blockHtml=blockHtml.replace(/\n/g,'<br>');blockHtml=blockHtml.replace(/[ \t]{2,}/g,function(match){return CKEDITOR.tools.repeat('&nbsp;',match.length-1)+' ';});if(docFrag){var newBlockClone=newBlock.clone();newBlockClone.setHtml(blockHtml);docFrag.append(newBlockClone);}else{newBlock.setHtml(blockHtml);}}
return docFrag||newBlock;}
function toPre(block,newBlock){var bogus=block.getBogus();bogus&&bogus.remove();var preHtml=block.getHtml();preHtml=replace(preHtml,/(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g,'');preHtml=preHtml.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi,'$1');preHtml=preHtml.replace(/([ \t\n\r]+|&nbsp;)/g,' ');preHtml=preHtml.replace(/<br\b[^>]*>/gi,'\n');if(CKEDITOR.env.ie){var temp=block.getDocument().createElement('div');temp.append(newBlock);newBlock.$.outerHTML='<pre>'+preHtml+'</pre>';newBlock.copyAttributes(temp.getFirst());newBlock=temp.getFirst().remove();}else{newBlock.setHtml(preHtml);}
return newBlock;}
function removeFromElement(element,keepDataAttrs){var def=this._.definition,attributes=def.attributes,styles=def.styles,overrides=getOverrides(this)[element.getName()],removeEmpty=CKEDITOR.tools.isEmpty(attributes)&&CKEDITOR.tools.isEmpty(styles);for(var attName in attributes){if((attName=='class'||this._.definition.fullMatch)&&element.getAttribute(attName)!=normalizeProperty(attName,attributes[attName]))
continue;if(keepDataAttrs&&attName.slice(0,5)=='data-')
continue;removeEmpty=element.hasAttribute(attName);element.removeAttribute(attName);}
for(var styleName in styles){if(this._.definition.fullMatch&&element.getStyle(styleName)!=normalizeProperty(styleName,styles[styleName],true))
continue;removeEmpty=removeEmpty||!!element.getStyle(styleName);element.removeStyle(styleName);}
removeOverrides(element,overrides,blockElements[element.getName()]);if(removeEmpty){if(this._.definition.alwaysRemoveElement)
removeNoAttribsElement(element,1);else{if(!CKEDITOR.dtd.$block[element.getName()]||this._.enterMode==CKEDITOR.ENTER_BR&&!element.hasAttributes())
removeNoAttribsElement(element);else
element.renameNode(this._.enterMode==CKEDITOR.ENTER_P?'p':'div');}}}
function removeFromInsideElement(element){var overrides=getOverrides(this),innerElements=element.getElementsByTag(this.element),innerElement;for(var i=innerElements.count();--i>=0;){innerElement=innerElements.getItem(i);if(!innerElement.isReadOnly())
removeFromElement.call(this,innerElement,true);}
for(var overrideElement in overrides){if(overrideElement!=this.element){innerElements=element.getElementsByTag(overrideElement);for(i=innerElements.count()-1;i>=0;i--){innerElement=innerElements.getItem(i);if(!innerElement.isReadOnly())
removeOverrides(innerElement,overrides[overrideElement]);}}}}
function removeOverrides(element,overrides,dontRemove){var attributes=overrides&&overrides.attributes;if(attributes){for(var i=0;i<attributes.length;i++){var attName=attributes[i][0],actualAttrValue;if((actualAttrValue=element.getAttribute(attName))){var attValue=attributes[i][1];if(attValue===null||(attValue.test&&attValue.test(actualAttrValue))||(typeof attValue=='string'&&actualAttrValue==attValue))
element.removeAttribute(attName);}}}
if(!dontRemove)
removeNoAttribsElement(element);}
function removeNoAttribsElement(element,forceRemove){if(!element.hasAttributes()||forceRemove){if(CKEDITOR.dtd.$block[element.getName()]){var previous=element.getPrevious(nonWhitespaces),next=element.getNext(nonWhitespaces);if(previous&&(previous.type==CKEDITOR.NODE_TEXT||!previous.isBlockBoundary({br:1})))
element.append('br',1);if(next&&(next.type==CKEDITOR.NODE_TEXT||!next.isBlockBoundary({br:1})))
element.append('br');element.remove(true);}else{var firstChild=element.getFirst();var lastChild=element.getLast();element.remove(true);if(firstChild){firstChild.type==CKEDITOR.NODE_ELEMENT&&firstChild.mergeSiblings();if(lastChild&&!firstChild.equals(lastChild)&&lastChild.type==CKEDITOR.NODE_ELEMENT)
lastChild.mergeSiblings();}}}}
function getElement(style,targetDocument,element){var el,elementName=style.element;if(elementName=='*')
elementName='span';el=new CKEDITOR.dom.element(elementName,targetDocument);if(element)
element.copyAttributes(el);el=setupElement(el,style);if(targetDocument.getCustomData('doc_processing_style')&&el.hasAttribute('id'))
el.removeAttribute('id');else
targetDocument.setCustomData('doc_processing_style',1);return el;}
function setupElement(el,style){var def=style._.definition,attributes=def.attributes,styles=CKEDITOR.style.getStyleText(def);if(attributes){for(var att in attributes)
el.setAttribute(att,attributes[att]);}
if(styles)
el.setAttribute('style',styles);return el;}
function replaceVariables(list,variablesValues){for(var item in list){list[item]=list[item].replace(varRegex,function(match,varName){return variablesValues[varName];});}}
function getAttributesForComparison(styleDefinition){var attribs=styleDefinition._AC;if(attribs)
return attribs;attribs={};var length=0;var styleAttribs=styleDefinition.attributes;if(styleAttribs){for(var styleAtt in styleAttribs){length++;attribs[styleAtt]=styleAttribs[styleAtt];}}
var styleText=CKEDITOR.style.getStyleText(styleDefinition);if(styleText){if(!attribs.style)
length++;attribs.style=styleText;}
attribs._length=length;return(styleDefinition._AC=attribs);}
function getOverrides(style){if(style._.overrides)
return style._.overrides;var overrides=(style._.overrides={}),definition=style._.definition.overrides;if(definition){if(!CKEDITOR.tools.isArray(definition))
definition=[definition];for(var i=0;i<definition.length;i++){var override=definition[i],elementName,overrideEl,attrs;if(typeof override=='string')
elementName=override.toLowerCase();else{elementName=override.element?override.element.toLowerCase():style.element;attrs=override.attributes;}
overrideEl=overrides[elementName]||(overrides[elementName]={});if(attrs){var overrideAttrs=(overrideEl.attributes=overrideEl.attributes||[]);for(var attName in attrs){overrideAttrs.push([attName.toLowerCase(),attrs[attName]]);}}}}
return overrides;}
function normalizeProperty(name,value,isStyle){var temp=new CKEDITOR.dom.element('span');temp[isStyle?'setStyle':'setAttribute'](name,value);return temp[isStyle?'getStyle':'getAttribute'](name);}
function compareCssText(source,target){if(typeof source=='string')
source=CKEDITOR.tools.parseCssText(source);if(typeof target=='string')
target=CKEDITOR.tools.parseCssText(target,true);for(var name in source){if(!(name in target&&(target[name]==source[name]||source[name]=='inherit'||target[name]=='inherit')))
return false;}
return true;}
function applyStyleOnSelection(selection,remove,editor){var doc=selection.document,ranges=selection.getRanges(),func=remove?this.removeFromRange:this.applyToRange,range;var iterator=ranges.createIterator();while((range=iterator.getNextRange()))
func.call(this,range,editor);selection.selectRanges(ranges);doc.removeCustomData('doc_processing_style');}})();CKEDITOR.styleCommand=function(style,ext){this.style=style;this.allowedContent=style;this.requiredContent=style;CKEDITOR.tools.extend(this,ext,true);};CKEDITOR.styleCommand.prototype.exec=function(editor){editor.focus();if(this.state==CKEDITOR.TRISTATE_OFF)
editor.applyStyle(this.style);else if(this.state==CKEDITOR.TRISTATE_ON)
editor.removeStyle(this.style);};CKEDITOR.stylesSet=new CKEDITOR.resourceManager('','stylesSet');CKEDITOR.addStylesSet=CKEDITOR.tools.bind(CKEDITOR.stylesSet.add,CKEDITOR.stylesSet);CKEDITOR.loadStylesSet=function(name,url,callback){CKEDITOR.stylesSet.addExternal(name,url,'');CKEDITOR.stylesSet.load(name,callback);};CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{attachStyleStateChange:function(style,callback){var styleStateChangeCallbacks=this._.styleStateChangeCallbacks;if(!styleStateChangeCallbacks){styleStateChangeCallbacks=this._.styleStateChangeCallbacks=[];this.on('selectionChange',function(ev){for(var i=0;i<styleStateChangeCallbacks.length;i++){var callback=styleStateChangeCallbacks[i];var currentState=callback.style.checkActive(ev.data.path,this)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;callback.fn.call(this,currentState);}});}
styleStateChangeCallbacks.push({style:style,fn:callback});},applyStyle:function(style){style.apply(this);},removeStyle:function(style){style.remove(this);},getStylesSet:function(callback){if(!this._.stylesDefinitions){var editor=this,configStyleSet=editor.config.stylesCombo_stylesSet||editor.config.stylesSet;if(configStyleSet===false){callback(null);return;}
if(configStyleSet instanceof Array){editor._.stylesDefinitions=configStyleSet;callback(configStyleSet);return;}
if(!configStyleSet)
configStyleSet='default';var partsStylesSet=configStyleSet.split(':'),styleSetName=partsStylesSet[0],externalPath=partsStylesSet[1];CKEDITOR.stylesSet.addExternal(styleSetName,externalPath?partsStylesSet.slice(1).join(':'):CKEDITOR.getUrl('styles.js'),'');CKEDITOR.stylesSet.load(styleSetName,function(stylesSet){editor._.stylesDefinitions=stylesSet[styleSetName];callback(editor._.stylesDefinitions);});}else{callback(this._.stylesDefinitions);}}});CKEDITOR.dom.comment=function(comment,ownerDocument){if(typeof comment=='string')
comment=(ownerDocument?ownerDocument.$:document).createComment(comment);CKEDITOR.dom.domObject.call(this,comment);};CKEDITOR.dom.comment.prototype=new CKEDITOR.dom.node();CKEDITOR.tools.extend(CKEDITOR.dom.comment.prototype,{type:CKEDITOR.NODE_COMMENT,getOuterHtml:function(){return'<!--'+this.$.nodeValue+'-->';}});'use strict';(function(){var pathBlockLimitElements={},pathBlockElements={},tag;for(tag in CKEDITOR.dtd.$blockLimit){if(!(tag in CKEDITOR.dtd.$list))
pathBlockLimitElements[tag]=1;}
for(tag in CKEDITOR.dtd.$block){if(!(tag in CKEDITOR.dtd.$blockLimit||tag in CKEDITOR.dtd.$empty))
pathBlockElements[tag]=1;}
function checkHasBlock(element){var childNodes=element.getChildren();for(var i=0,count=childNodes.count();i<count;i++){var child=childNodes.getItem(i);if(child.type==CKEDITOR.NODE_ELEMENT&&CKEDITOR.dtd.$block[child.getName()])
return true;}
return false;}
CKEDITOR.dom.elementPath=function(startNode,root){var block=null,blockLimit=null,elements=[],e=startNode,elementName;root=root||startNode.getDocument().getBody();do{if(e.type==CKEDITOR.NODE_ELEMENT){elements.push(e);if(!this.lastElement){this.lastElement=e;if(e.is(CKEDITOR.dtd.$object)||e.getAttribute('contenteditable')=='false')
continue;}
if(e.equals(root))
break;if(!blockLimit){elementName=e.getName();if(e.getAttribute('contenteditable')=='true')
blockLimit=e;else if(!block&&pathBlockElements[elementName])
block=e;if(pathBlockLimitElements[elementName]){if(!block&&elementName=='div'&&!checkHasBlock(e))
block=e;else
blockLimit=e;}}}}
while((e=e.getParent()));if(!blockLimit)
blockLimit=root;this.block=block;this.blockLimit=blockLimit;this.root=root;this.elements=elements;};})();CKEDITOR.dom.elementPath.prototype={compare:function(otherPath){var thisElements=this.elements;var otherElements=otherPath&&otherPath.elements;if(!otherElements||thisElements.length!=otherElements.length)
return false;for(var i=0;i<thisElements.length;i++){if(!thisElements[i].equals(otherElements[i]))
return false;}
return true;},contains:function(query,excludeRoot,fromTop){var evaluator;if(typeof query=='string')
evaluator=function(node){return node.getName()==query;};if(query instanceof CKEDITOR.dom.element)
evaluator=function(node){return node.equals(query);};else if(CKEDITOR.tools.isArray(query))
evaluator=function(node){return CKEDITOR.tools.indexOf(query,node.getName())>-1;};else if(typeof query=='function')
evaluator=query;else if(typeof query=='object')
evaluator=function(node){return node.getName()in query;};var elements=this.elements,length=elements.length;excludeRoot&&length--;if(fromTop){elements=Array.prototype.slice.call(elements,0);elements.reverse();}
for(var i=0;i<length;i++){if(evaluator(elements[i]))
return elements[i];}
return null;},isContextFor:function(tag){var holder;if(tag in CKEDITOR.dtd.$block){var inter=this.contains(CKEDITOR.dtd.$intermediate);holder=inter||(this.root.equals(this.block)&&this.block)||this.blockLimit;return!!holder.getDtd()[tag];}
return true;},direction:function(){var directionNode=this.block||this.blockLimit||this.root;return directionNode.getDirection(1);}};CKEDITOR.dom.text=function(text,ownerDocument){if(typeof text=='string')
text=(ownerDocument?ownerDocument.$:document).createTextNode(text);this.$=text;};CKEDITOR.dom.text.prototype=new CKEDITOR.dom.node();CKEDITOR.tools.extend(CKEDITOR.dom.text.prototype,{type:CKEDITOR.NODE_TEXT,getLength:function(){return this.$.nodeValue.length;},getText:function(){return this.$.nodeValue;},setText:function(text){this.$.nodeValue=text;},split:function(offset){var parent=this.$.parentNode,count=parent.childNodes.length,length=this.getLength();var doc=this.getDocument();var retval=new CKEDITOR.dom.text(this.$.splitText(offset),doc);if(parent.childNodes.length==count){if(offset>=length){retval=doc.createText('');retval.insertAfter(this);}else{var workaround=doc.createText('');workaround.insertAfter(retval);workaround.remove();}}
return retval;},substring:function(indexA,indexB){if(typeof indexB!='number')
return this.$.nodeValue.substr(indexA);else
return this.$.nodeValue.substring(indexA,indexB);}});(function(){CKEDITOR.dom.rangeList=function(ranges){if(ranges instanceof CKEDITOR.dom.rangeList)
return ranges;if(!ranges)
ranges=[];else if(ranges instanceof CKEDITOR.dom.range)
ranges=[ranges];return CKEDITOR.tools.extend(ranges,mixins);};var mixins={createIterator:function(){var rangeList=this,bookmark=CKEDITOR.dom.walker.bookmark(),bookmarks=[],current;return{getNextRange:function(mergeConsequent){current=current===undefined?0:current+1;var range=rangeList[current];if(range&&rangeList.length>1){if(!current){for(var i=rangeList.length-1;i>=0;i--)
bookmarks.unshift(rangeList[i].createBookmark(true));}
if(mergeConsequent){var mergeCount=0;while(rangeList[current+mergeCount+1]){var doc=range.document,found=0,left=doc.getById(bookmarks[mergeCount].endNode),right=doc.getById(bookmarks[mergeCount+1].startNode),next;while(1){next=left.getNextSourceNode(false);if(!right.equals(next)){if(bookmark(next)||(next.type==CKEDITOR.NODE_ELEMENT&&next.isBlockBoundary())){left=next;continue;}}else{found=1;}
break;}
if(!found)
break;mergeCount++;}}
range.moveToBookmark(bookmarks.shift());while(mergeCount--){next=rangeList[++current];next.moveToBookmark(bookmarks.shift());range.setEnd(next.endContainer,next.endOffset);}}
return range;}};},createBookmarks:function(serializable){var retval=[],bookmark;for(var i=0;i<this.length;i++){retval.push(bookmark=this[i].createBookmark(serializable,true));for(var j=i+1;j<this.length;j++){this[j]=updateDirtyRange(bookmark,this[j]);this[j]=updateDirtyRange(bookmark,this[j],true);}}
return retval;},createBookmarks2:function(normalized){var bookmarks=[];for(var i=0;i<this.length;i++)
bookmarks.push(this[i].createBookmark2(normalized));return bookmarks;},moveToBookmarks:function(bookmarks){for(var i=0;i<this.length;i++)
this[i].moveToBookmark(bookmarks[i]);}};function updateDirtyRange(bookmark,dirtyRange,checkEnd){var serializable=bookmark.serializable,container=dirtyRange[checkEnd?'endContainer':'startContainer'],offset=checkEnd?'endOffset':'startOffset';var bookmarkStart=serializable?dirtyRange.document.getById(bookmark.startNode):bookmark.startNode;var bookmarkEnd=serializable?dirtyRange.document.getById(bookmark.endNode):bookmark.endNode;if(container.equals(bookmarkStart.getPrevious())){dirtyRange.startOffset=dirtyRange.startOffset-container.getLength()-bookmarkEnd.getPrevious().getLength();container=bookmarkEnd.getNext();}else if(container.equals(bookmarkEnd.getPrevious())){dirtyRange.startOffset=dirtyRange.startOffset-container.getLength();container=bookmarkEnd.getNext();}
container.equals(bookmarkStart.getParent())&&dirtyRange[offset]++;container.equals(bookmarkEnd.getParent())&&dirtyRange[offset]++;dirtyRange[checkEnd?'endContainer':'startContainer']=container;return dirtyRange;}})();(function(){var cssLoaded={};function getName(){return CKEDITOR.skinName.split(',')[0];}
function getConfigPath(){return CKEDITOR.getUrl(CKEDITOR.skinName.split(',')[1]||('skins/'+getName()+'/'));}
CKEDITOR.skin={path:getConfigPath,loadPart:function(part,fn){if(CKEDITOR.skin.name!=getName()){CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(getConfigPath()+'skin.js'),function(){loadCss(part,fn);});}else{loadCss(part,fn);}},getPath:function(part){return CKEDITOR.getUrl(getCssPath(part));},icons:{},addIcon:function(name,path,offset,bgsize){name=name.toLowerCase();if(!this.icons[name]){this.icons[name]={path:path,offset:offset||0,bgsize:bgsize||'16px'};}},getIconStyle:function(name,rtl,overridePath,overrideOffset,overrideBgsize){var icon,path,offset,bgsize;if(name){name=name.toLowerCase();if(rtl)
icon=this.icons[name+'-rtl'];if(!icon)
icon=this.icons[name];}
path=overridePath||(icon&&icon.path)||'';offset=overrideOffset||(icon&&icon.offset);bgsize=overrideBgsize||(icon&&icon.bgsize)||'16px';return path&&('background-image:url('+CKEDITOR.getUrl(path)+');background-position:0 '+offset+'px;background-size:'+bgsize+';');}};function getCssPath(part){var uas=CKEDITOR.skin['ua_'+part],env=CKEDITOR.env;if(uas){uas=uas.split(',').sort(function(a,b){return a>b?-1:1;});for(var i=0,ua;i<uas.length;i++){ua=uas[i];if(env.ie){if((ua.replace(/^ie/,'')==env.version)||(env.quirks&&ua=='iequirks'))
ua='ie';}
if(env[ua]){part+='_'+uas[i];break;}}}
return CKEDITOR.getUrl(getConfigPath()+part+'.css');}
function loadCss(part,callback){if(!cssLoaded[part]){CKEDITOR.document.appendStyleSheet(getCssPath(part));cssLoaded[part]=1;}
callback&&callback();}
CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{getUiColor:function(){return this.uiColor;},setUiColor:function(color){var uiStyle=getStylesheet(CKEDITOR.document);return(this.setUiColor=function(color){this.uiColor=color;var chameleon=CKEDITOR.skin.chameleon,editorStyleContent='',panelStyleContent='';if(typeof chameleon=='function'){editorStyleContent=chameleon(this,'editor');panelStyleContent=chameleon(this,'panel');}
var replace=[[uiColorRegexp,color]];updateStylesheets([uiStyle],editorStyleContent,replace);updateStylesheets(uiColorMenus,panelStyleContent,replace);}).call(this,color);}});var uiColorStylesheetId='cke_ui_color',uiColorMenus=[],uiColorRegexp=/\$color/g;function getStylesheet(document){var node=document.getById(uiColorStylesheetId);if(!node){node=document.getHead().append('style');node.setAttribute('id',uiColorStylesheetId);node.setAttribute('type','text/css');}
return node;}
function updateStylesheets(styleNodes,styleContent,replace){var r,i,content;if(CKEDITOR.env.webkit){styleContent=styleContent.split('}').slice(0,-1);for(i=0;i<styleContent.length;i++)
styleContent[i]=styleContent[i].split('{');}
for(var id=0;id<styleNodes.length;id++){if(CKEDITOR.env.webkit){for(i=0;i<styleContent.length;i++){content=styleContent[i][1];for(r=0;r<replace.length;r++)
content=content.replace(replace[r][0],replace[r][1]);styleNodes[id].$.sheet.addRule(styleContent[i][0],content);}}else{content=styleContent;for(r=0;r<replace.length;r++)
content=content.replace(replace[r][0],replace[r][1]);if(CKEDITOR.env.ie&&CKEDITOR.env.version<11)
styleNodes[id].$.styleSheet.cssText+=content;else
styleNodes[id].$.innerHTML+=content;}}}
CKEDITOR.on('instanceLoaded',function(evt){if(CKEDITOR.env.ie&&CKEDITOR.env.quirks)
return;var editor=evt.editor,showCallback=function(event){var panel=event.data[0]||event.data;var iframe=panel.element.getElementsByTag('iframe').getItem(0).getFrameDocument();if(!iframe.getById('cke_ui_color')){var node=getStylesheet(iframe);uiColorMenus.push(node);var color=editor.getUiColor();if(color)
updateStylesheets([node],CKEDITOR.skin.chameleon(editor,'panel'),[[uiColorRegexp,color]]);}};editor.on('panelShow',showCallback);editor.on('menuShow',showCallback);if(editor.config.uiColor)
editor.setUiColor(editor.config.uiColor);});})();(function(){if(CKEDITOR.env.webkit)
CKEDITOR.env.hc=false;else{var hcDetect=CKEDITOR.dom.element.createFromHtml('<div style="width:0;height:0;position:absolute;left:-10000px;'+'border:1px solid;border-color:red blue"></div>',CKEDITOR.document);hcDetect.appendTo(CKEDITOR.document.getHead());try{var top=hcDetect.getComputedStyle('border-top-color'),right=hcDetect.getComputedStyle('border-right-color');CKEDITOR.env.hc=!!(top&&top==right);}catch(e){CKEDITOR.env.hc=false;}
hcDetect.remove();}
if(CKEDITOR.env.hc)
CKEDITOR.env.cssClass+=' cke_hc';CKEDITOR.document.appendStyleText('.cke{visibility:hidden;}');CKEDITOR.status='loaded';CKEDITOR.fireOnce('loaded');var pending=CKEDITOR._.pending;if(pending){delete CKEDITOR._.pending;for(var i=0;i<pending.length;i++){CKEDITOR.editor.prototype.constructor.apply(pending[i][0],pending[i][1]);CKEDITOR.add(pending[i][0]);}}})();CKEDITOR.skin.name='clean';CKEDITOR.skin.ua_editor='ie,iequirks,ie7,ie8,gecko';CKEDITOR.skin.ua_dialog='ie,iequirks,ie7,ie8';CKEDITOR.skin.chameleon=(function(){var colorBrightness=(function(){function channelBrightness(channel,ratio){var brighten=ratio<0?(0|channel*(1+ratio)):(0|channel+(255-channel)*ratio);return('0'+brighten.toString(16)).slice(-2);}
return function(hexColor,ratio){var channels=hexColor.match(/[^#]./g);for(var i=0;i<3;i++)
channels[i]=channelBrightness(parseInt(channels[i],16),ratio);return'#'+channels.join('');};})(),verticalGradient=(function(){var template=new CKEDITOR.template('background:#{to};'+'background-image:linear-gradient(to bottom,{from},{to});'+'filter:progid:DXImageTransform.Microsoft.gradient(gradientType=0,startColorstr=\'{from}\',endColorstr=\'{to}\');');return function(from,to){return template.output({from:from,to:to});};})(),templates={editor:new CKEDITOR.template('{id}.cke_chrome [border-color:{defaultBorder};] '+'{id} .cke_top [ '+'{defaultGradient}'+'border-bottom-color:{defaultBorder};'+'] '+'{id} .cke_bottom ['+'{defaultGradient}'+'border-top-color:{defaultBorder};'+'] '+'{id} .cke_resizer [border-right-color:{ckeResizer}] '+'{id} .cke_dialog_title ['+'{defaultGradient}'+'border-bottom-color:{defaultBorder};'+'] '+'{id} .cke_dialog_footer ['+'{defaultGradient}'+'outline-color:{defaultBorder};'+'border-top-color:{defaultBorder};'+'] '+'{id} .cke_dialog_tab ['+'{lightGradient}'+'border-color:{defaultBorder};'+'] '+'{id} .cke_dialog_tab:hover ['+'{mediumGradient}'+'] '+'{id} .cke_dialog_contents ['+'border-top-color:{defaultBorder};'+'] '+'{id} .cke_dialog_tab_selected, {id} .cke_dialog_tab_selected:hover ['+'background:{dialogTabSelected};'+'border-bottom-color:{dialogTabSelectedBorder};'+'] '+'{id} .cke_dialog_body ['+'background:{dialogBody};'+'border-color:{defaultBorder};'+'] '+'{id} .cke_toolgroup ['+'{lightGradient}'+'border-color:{defaultBorder};'+'] '+'{id} a.cke_button_off:hover, {id} a.cke_button_off:focus, {id} a.cke_button_off:active ['+'{mediumGradient}'+'] '+'{id} .cke_button_on ['+'{ckeButtonOn}'+'] '+'{id} .cke_toolbar_separator ['+'background-color: {ckeToolbarSeparator};'+'] '+'{id} .cke_combo_button ['+'border-color:{defaultBorder};'+'{lightGradient}'+'] '+'{id} a.cke_combo_button:hover, {id} a.cke_combo_button:focus, {id} .cke_combo_on a.cke_combo_button ['+'border-color:{defaultBorder};'+'{mediumGradient}'+'] '+'{id} .cke_path_item ['+'color:{elementsPathColor};'+'] '+'{id} a.cke_path_item:hover, {id} a.cke_path_item:focus, {id} a.cke_path_item:active ['+'background-color:{elementsPathBg};'+'] '+'{id}.cke_panel ['+'border-color:{defaultBorder};'+'] '),panel:new CKEDITOR.template('.cke_panel_grouptitle ['+'{lightGradient}'+'border-color:{defaultBorder};'+'] '+'.cke_menubutton_icon ['+'background-color:{menubuttonIcon};'+'] '+'.cke_menubutton:hover .cke_menubutton_icon, .cke_menubutton:focus .cke_menubutton_icon, .cke_menubutton:active .cke_menubutton_icon ['+'background-color:{menubuttonIconHover};'+'] '+'.cke_menuseparator ['+'background-color:{menubuttonIcon};'+'] '+'a:hover.cke_colorbox, a:focus.cke_colorbox, a:active.cke_colorbox ['+'border-color:{defaultBorder};'+'] '+'a:hover.cke_colorauto, a:hover.cke_colormore, a:focus.cke_colorauto, a:focus.cke_colormore, a:active.cke_colorauto, a:active.cke_colormore ['+'background-color:{ckeColorauto};'+'border-color:{defaultBorder};'+'] ')};return function(editor,part){var uiColor=editor.uiColor,templateStyles={id:'.'+editor.id,defaultBorder:colorBrightness(uiColor,-0.1),defaultGradient:verticalGradient(colorBrightness(uiColor,0.9),uiColor),lightGradient:verticalGradient(colorBrightness(uiColor,1),colorBrightness(uiColor,0.7)),mediumGradient:verticalGradient(colorBrightness(uiColor,0.8),colorBrightness(uiColor,0.5)),ckeButtonOn:verticalGradient(colorBrightness(uiColor,0.6),colorBrightness(uiColor,0.7)),ckeResizer:colorBrightness(uiColor,-0.4),ckeToolbarSeparator:colorBrightness(uiColor,0.5),ckeColorauto:colorBrightness(uiColor,0.8),dialogBody:colorBrightness(uiColor,0.7),dialogTabSelected:verticalGradient('#FFFFFF','#FFFFFF'),dialogTabSelectedBorder:'#FFF',elementsPathColor:colorBrightness(uiColor,-0.6),elementsPathBg:uiColor,menubuttonIcon:colorBrightness(uiColor,0.5),menubuttonIconHover:colorBrightness(uiColor,0.3)};return templates[part].output(templateStyles).replace(/\[/g,'{').replace(/\]/g,'}');};})();CKEDITOR.plugins.add('basicstyles',{init:function(editor){var order=0;var addButtonCommand=function(buttonName,buttonLabel,commandName,styleDefiniton){if(!styleDefiniton)
return;var style=new CKEDITOR.style(styleDefiniton),forms=contentForms[commandName];forms.unshift(style);editor.attachStyleStateChange(style,function(state){!editor.readOnly&&editor.getCommand(commandName).setState(state);});editor.addCommand(commandName,new CKEDITOR.styleCommand(style,{contentForms:forms}));if(editor.ui.addButton){editor.ui.addButton(buttonName,{label:buttonLabel,command:commandName,toolbar:'basicstyles,'+(order+=10)});}};var contentForms={bold:['strong','b',['span',function(el){var fw=el.styles['font-weight'];return fw=='bold'||+fw>=700;}]],italic:['em','i',['span',function(el){return el.styles['font-style']=='italic';}]],underline:['u',['span',function(el){return el.styles['text-decoration']=='underline';}]],strike:['s','strike',['span',function(el){return el.styles['text-decoration']=='line-through';}]],subscript:['sub'],superscript:['sup']},config=editor.config,lang=editor.lang.basicstyles;addButtonCommand('Bold',lang.bold,'bold',config.coreStyles_bold);addButtonCommand('Italic',lang.italic,'italic',config.coreStyles_italic);addButtonCommand('Underline',lang.underline,'underline',config.coreStyles_underline);addButtonCommand('Strike',lang.strike,'strike',config.coreStyles_strike);addButtonCommand('Subscript',lang.subscript,'subscript',config.coreStyles_subscript);addButtonCommand('Superscript',lang.superscript,'superscript',config.coreStyles_superscript);editor.setKeystroke([[CKEDITOR.CTRL+66,'bold'],[CKEDITOR.CTRL+73,'italic'],[CKEDITOR.CTRL+85,'underline']]);function renderScriptGroupBlock(){var editor=this;var reHtml='<table style="table-layout: fixed;overflow: hidden;">';var clickFn=CKEDITOR.tools.addFunction(function(type){switch(type){case'sub':editor.execCommand('subscript');break;case'sup':editor.execCommand('superscript');break;}})
var subStyle=CKEDITOR.skin.getIconStyle('subscript',false),supStyle=CKEDITOR.skin.getIconStyle('superscript',false);reHtml+='<tr><td><a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'sub\')" data-type="sub"><span class="cke_button_icon cke_button__subscript_icon" style="'+subStyle+'"></span></a>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'sup\')" data-type="sup"><span class="cke_button_icon cke_button__superscript_icon" style="'+supStyle+'"></span></a></td></tr></table>'
return reHtml}
function onSelectionChange(toobarName,blockEl){var editor=this;var el=editor.getSelection().getStartElement();var btn=editor.ui.get(toolbarName);var element=CKEDITOR.document.getById(btn._.id);var span=element.find('.cke_button_icon').getItem(0);var arrow=element.find('.cke_button_arrow').getItem(0);span.setText('...')
span.setStyles({'color':'white','text-align':'center'})
if(arrow){arrow.remove()}
var elType=el.getName()
if(blockEl.el){var btns=blockEl.el.find('a.cke_button')
for(var i=0,len=btns.count();i<len;i++){btns.getItem(i).removeClass('cke_button_on').addClass('cke_button_off')}
if(elType==='sub'||elType==='sup'){blockEl.el.findOne('a[data-type='+elType+']').addClass('cke_button_on')}}}
var toolbarName='ScriptGroup';var blockEl={};editor.on('selectionChange',onSelectionChange.bind(editor,toolbarName,blockEl));editor.ui.add(toolbarName,CKEDITOR.UI_PANELBUTTON,{label:'',modes:{wysiwyg:1},toolbar:'script,60',editorFocus:0,panel:{css:CKEDITOR.skin.getPath('editor'),attributes:{role:'scriptbox','aria-label':''}},onBlock:function(panel,block){blockEl.el=block.element;block.autoSize=true;block.element.addClass('cke_scriptgroupblock');block.element.setStyle('width','62px');block.element.setHtml(renderScriptGroupBlock.call(editor));block.element.getDocument().getBody().setStyle('overflow','hidden');CKEDITOR.ui.fire('ready',this);onSelectionChange.call(editor,toolbarName,blockEl);}})}});CKEDITOR.config.coreStyles_bold={element:'strong',overrides:'b'};CKEDITOR.config.coreStyles_italic={element:'em',overrides:'i'};CKEDITOR.config.coreStyles_underline={element:'u'};CKEDITOR.config.coreStyles_strike={element:'s',overrides:'strike'};CKEDITOR.config.coreStyles_subscript={element:'sub'};CKEDITOR.config.coreStyles_superscript={element:'sup'};CKEDITOR.plugins.add('dialogui',{onLoad:function(){var initPrivateObject=function(elementDefinition){this._||(this._={});this._['default']=this._.initValue=elementDefinition['default']||'';this._.required=elementDefinition.required||false;var args=[this._];for(var i=1;i<arguments.length;i++)
args.push(arguments[i]);args.push(true);CKEDITOR.tools.extend.apply(CKEDITOR.tools,args);return this._;},textBuilder={build:function(dialog,elementDefinition,output){return new CKEDITOR.ui.dialog.textInput(dialog,elementDefinition,output);}},commonBuilder={build:function(dialog,elementDefinition,output){return new CKEDITOR.ui.dialog[elementDefinition.type](dialog,elementDefinition,output);}},containerBuilder={build:function(dialog,elementDefinition,output){var children=elementDefinition.children,child,childHtmlList=[],childObjList=[];for(var i=0;(i<children.length&&(child=children[i]));i++){var childHtml=[];childHtmlList.push(childHtml);childObjList.push(CKEDITOR.dialog._.uiElementBuilders[child.type].build(dialog,child,childHtml));}
return new CKEDITOR.ui.dialog[elementDefinition.type](dialog,childObjList,childHtmlList,output,elementDefinition);}},commonPrototype={isChanged:function(){return this.getValue()!=this.getInitValue();},reset:function(noChangeEvent){this.setValue(this.getInitValue(),noChangeEvent);},setInitValue:function(){this._.initValue=this.getValue();},resetInitValue:function(){this._.initValue=this._['default'];},getInitValue:function(){return this._.initValue;}},commonEventProcessors=CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onChange:function(dialog,func){if(!this._.domOnChangeRegistered){dialog.on('load',function(){this.getInputElement().on('change',function(){if(!dialog.parts.dialog.isVisible())
return;this.fire('change',{value:this.getValue()});},this);},this);this._.domOnChangeRegistered=true;}
this.on('change',func);}},true),eventRegex=/^on([A-Z]\w+)/,cleanInnerDefinition=function(def){for(var i in def){if(eventRegex.test(i)||i=='title'||i=='type')
delete def[i];}
return def;},toggleBidiKeyUpHandler=function(evt){var keystroke=evt.data.getKeystroke();if(keystroke==CKEDITOR.SHIFT+CKEDITOR.ALT+36)
this.setDirectionMarker('ltr');else if(keystroke==CKEDITOR.SHIFT+CKEDITOR.ALT+35)
this.setDirectionMarker('rtl');};CKEDITOR.tools.extend(CKEDITOR.ui.dialog,{labeledElement:function(dialog,elementDefinition,htmlList,contentHtml){if(arguments.length<4)
return;var innerHTML=contentHtml;if(elementDefinition.label){var _=initPrivateObject.call(this,elementDefinition);_.labelId=CKEDITOR.tools.getNextId()+'_label';this._.children=[];innerHTML=function(){var html=[],requiredClass=elementDefinition.required?' cke_required':'';if(elementDefinition.labelLayout!='horizontal'){html.push('<label class="cke_dialog_ui_labeled_label'+requiredClass+'" ',' id="'+_.labelId+'"',(_.inputId?' for="'+_.inputId+'"':''),(elementDefinition.labelStyle?' style="'+elementDefinition.labelStyle+'"':'')+'>',elementDefinition.label,'</label>','<div class="cke_dialog_ui_labeled_content"',(elementDefinition.controlStyle?' style="'+elementDefinition.controlStyle+'"':''),' role="presentation">',contentHtml.call(this,dialog,elementDefinition),'</div>');}else{var hboxDefinition={type:'hbox',widths:elementDefinition.widths,padding:0,children:[{type:'html',html:'<label class="cke_dialog_ui_labeled_label'+requiredClass+'"'+' id="'+_.labelId+'"'+' for="'+_.inputId+'"'+
(elementDefinition.labelStyle?' style="'+elementDefinition.labelStyle+'"':'')+'>'+
CKEDITOR.tools.htmlEncode(elementDefinition.label)+'</label>'},{type:'html',html:'<span class="cke_dialog_ui_labeled_content"'+(elementDefinition.controlStyle?' style="'+elementDefinition.controlStyle+'"':'')+'>'+
contentHtml.call(this,dialog,elementDefinition)+'</span>'}]};CKEDITOR.dialog._.uiElementBuilders.hbox.build(dialog,hboxDefinition,html);}
return html.join('');};var attributes={role:elementDefinition.role||'presentation'};if(elementDefinition.includeLabel)
attributes['aria-labelledby']=_.labelId;}
CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition,htmlList,'div',null,attributes,innerHTML);},textInput:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;initPrivateObject.call(this,elementDefinition);var domId=this._.inputId=CKEDITOR.tools.getNextId()+'_textInput',attributes={'class':'cke_dialog_ui_input_'+elementDefinition.type,id:domId,type:elementDefinition.type};if(elementDefinition.validate)
this.validate=elementDefinition.validate;if(elementDefinition.maxLength)
attributes.maxlength=elementDefinition.maxLength;if(elementDefinition.size)
attributes.size=elementDefinition.size;if(elementDefinition.inputStyle)
attributes.style=elementDefinition.inputStyle;var me=this,keyPressedOnMe=false;dialog.on('load',function(){me.getInputElement().on('keydown',function(evt){if(evt.data.getKeystroke()==13)
keyPressedOnMe=true;});me.getInputElement().on('keyup',function(evt){if(evt.data.getKeystroke()==13&&keyPressedOnMe){dialog.getButton('ok')&&setTimeout(function(){dialog.getButton('ok').click();},0);keyPressedOnMe=false;}
if(me.bidi)
toggleBidiKeyUpHandler.call(me,evt);},null,null,1000);});var innerHTML=function(){var html=['<div class="cke_dialog_ui_input_',elementDefinition.type,'" role="presentation"'];if(elementDefinition.width)
html.push('style="width:'+elementDefinition.width+'" ');html.push('><input ');attributes['aria-labelledby']=this._.labelId;this._.required&&(attributes['aria-required']=this._.required);for(var i in attributes)
html.push(i+'="'+attributes[i]+'" ');html.push(' /></div>');return html.join('');};CKEDITOR.ui.dialog.labeledElement.call(this,dialog,elementDefinition,htmlList,innerHTML);},textarea:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;initPrivateObject.call(this,elementDefinition);var me=this,domId=this._.inputId=CKEDITOR.tools.getNextId()+'_textarea',attributes={};if(elementDefinition.validate)
this.validate=elementDefinition.validate;attributes.rows=elementDefinition.rows||5;attributes.cols=elementDefinition.cols||20;attributes['class']='cke_dialog_ui_input_textarea '+(elementDefinition['class']||'');if(typeof elementDefinition.inputStyle!='undefined')
attributes.style=elementDefinition.inputStyle;if(elementDefinition.dir)
attributes.dir=elementDefinition.dir;if(me.bidi){dialog.on('load',function(){me.getInputElement().on('keyup',toggleBidiKeyUpHandler);},me);}
var innerHTML=function(){attributes['aria-labelledby']=this._.labelId;this._.required&&(attributes['aria-required']=this._.required);var html=['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea id="',domId,'" '];for(var i in attributes)
html.push(i+'="'+CKEDITOR.tools.htmlEncode(attributes[i])+'" ');html.push('>',CKEDITOR.tools.htmlEncode(me._['default']),'</textarea></div>');return html.join('');};CKEDITOR.ui.dialog.labeledElement.call(this,dialog,elementDefinition,htmlList,innerHTML);},checkbox:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;var _=initPrivateObject.call(this,elementDefinition,{'default':!!elementDefinition['default']});if(elementDefinition.validate)
this.validate=elementDefinition.validate;var innerHTML=function(){var myDefinition=CKEDITOR.tools.extend({},elementDefinition,{id:elementDefinition.id?elementDefinition.id+'_checkbox':CKEDITOR.tools.getNextId()+'_checkbox'},true),html=[];var labelId=CKEDITOR.tools.getNextId()+'_label';var attributes={'class':'cke_dialog_ui_checkbox_input',type:'checkbox','aria-labelledby':labelId};cleanInnerDefinition(myDefinition);if(elementDefinition['default'])
attributes.checked='checked';if(typeof myDefinition.inputStyle!='undefined')
myDefinition.style=myDefinition.inputStyle;_.checkbox=new CKEDITOR.ui.dialog.uiElement(dialog,myDefinition,html,'input',null,attributes);html.push(' <label id="',labelId,'" for="',attributes.id,'"'+(elementDefinition.labelStyle?' style="'+elementDefinition.labelStyle+'"':'')+'>',CKEDITOR.tools.htmlEncode(elementDefinition.label),'</label>');return html.join('');};CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition,htmlList,'span',null,null,innerHTML);},radio:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;initPrivateObject.call(this,elementDefinition);if(!this._['default'])
this._['default']=this._.initValue=elementDefinition.items[0][1];if(elementDefinition.validate)
this.validate=elementDefinition.validate;var children=[],me=this;var innerHTML=function(){var inputHtmlList=[],html=[],commonName=(elementDefinition.id?elementDefinition.id:CKEDITOR.tools.getNextId())+'_radio';for(var i=0;i<elementDefinition.items.length;i++){var item=elementDefinition.items[i],title=item[2]!==undefined?item[2]:item[0],value=item[1]!==undefined?item[1]:item[0],inputId=CKEDITOR.tools.getNextId()+'_radio_input',labelId=inputId+'_label',inputDefinition=CKEDITOR.tools.extend({},elementDefinition,{id:inputId,title:null,type:null},true),labelDefinition=CKEDITOR.tools.extend({},inputDefinition,{title:title},true),inputAttributes={type:'radio','class':'cke_dialog_ui_radio_input',name:commonName,value:value,'aria-labelledby':labelId},inputHtml=[];if(me._['default']==value)
inputAttributes.checked='checked';cleanInnerDefinition(inputDefinition);cleanInnerDefinition(labelDefinition);if(typeof inputDefinition.inputStyle!='undefined')
inputDefinition.style=inputDefinition.inputStyle;inputDefinition.keyboardFocusable=true;children.push(new CKEDITOR.ui.dialog.uiElement(dialog,inputDefinition,inputHtml,'input',null,inputAttributes));inputHtml.push(' ');new CKEDITOR.ui.dialog.uiElement(dialog,labelDefinition,inputHtml,'label',null,{id:labelId,'for':inputAttributes.id},item[0]);inputHtmlList.push(inputHtml.join(''));}
new CKEDITOR.ui.dialog.hbox(dialog,children,inputHtmlList,html);return html.join('');};elementDefinition.role='radiogroup';elementDefinition.includeLabel=true;CKEDITOR.ui.dialog.labeledElement.call(this,dialog,elementDefinition,htmlList,innerHTML);this._.children=children;},button:function(dialog,elementDefinition,htmlList){if(!arguments.length)
return;if(typeof elementDefinition=='function')
elementDefinition=elementDefinition(dialog.getParentEditor());initPrivateObject.call(this,elementDefinition,{disabled:elementDefinition.disabled||false});CKEDITOR.event.implementOn(this);var me=this;dialog.on('load',function(){var element=this.getElement();(function(){element.on('click',function(evt){me.click();evt.data.preventDefault();});element.on('keydown',function(evt){if(evt.data.getKeystroke()in{32:1}){me.click();evt.data.preventDefault();}});})();element.unselectable();},this);var outerDefinition=CKEDITOR.tools.extend({},elementDefinition);delete outerDefinition.style;var labelId=CKEDITOR.tools.getNextId()+'_label';CKEDITOR.ui.dialog.uiElement.call(this,dialog,outerDefinition,htmlList,'a',null,{style:elementDefinition.style,href:'javascript:void(0)',title:elementDefinition.label,hidefocus:'true','class':elementDefinition['class'],role:'button','aria-labelledby':labelId},'<span id="'+labelId+'" class="cke_dialog_ui_button">'+
CKEDITOR.tools.htmlEncode(elementDefinition.label)+'</span>');},select:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;var _=initPrivateObject.call(this,elementDefinition);if(elementDefinition.validate)
this.validate=elementDefinition.validate;_.inputId=CKEDITOR.tools.getNextId()+'_select';var innerHTML=function(){var myDefinition=CKEDITOR.tools.extend({},elementDefinition,{id:(elementDefinition.id?elementDefinition.id+'_select':CKEDITOR.tools.getNextId()+'_select')},true),html=[],innerHTML=[],attributes={'id':_.inputId,'class':'cke_dialog_ui_input_select','aria-labelledby':this._.labelId};html.push('<div class="cke_dialog_ui_input_',elementDefinition.type,'" role="presentation"');if(elementDefinition.width)
html.push('style="width:'+elementDefinition.width+'" ');html.push('>');if(elementDefinition.size!==undefined)
attributes.size=elementDefinition.size;if(elementDefinition.multiple!==undefined)
attributes.multiple=elementDefinition.multiple;cleanInnerDefinition(myDefinition);for(var i=0,item;i<elementDefinition.items.length&&(item=elementDefinition.items[i]);i++){innerHTML.push('<option value="',CKEDITOR.tools.htmlEncode(item[1]!==undefined?item[1]:item[0]).replace(/"/g,'&quot;'),'" /> ',CKEDITOR.tools.htmlEncode(item[0]));}
if(typeof myDefinition.inputStyle!='undefined')
myDefinition.style=myDefinition.inputStyle;_.select=new CKEDITOR.ui.dialog.uiElement(dialog,myDefinition,html,'select',null,attributes,innerHTML.join(''));html.push('</div>');return html.join('');};CKEDITOR.ui.dialog.labeledElement.call(this,dialog,elementDefinition,htmlList,innerHTML);},file:function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;if(elementDefinition['default']===undefined)
elementDefinition['default']='';var _=CKEDITOR.tools.extend(initPrivateObject.call(this,elementDefinition),{definition:elementDefinition,buttons:[]});if(elementDefinition.validate)
this.validate=elementDefinition.validate;var innerHTML=function(){_.frameId=CKEDITOR.tools.getNextId()+'_fileInput';var html=['<iframe'+' frameborder="0"'+' allowtransparency="0"'+' class="cke_dialog_ui_input_file"'+' role="presentation"'+' id="',_.frameId,'"'+' title="',elementDefinition.label,'"'+' src="javascript:void('];html.push(CKEDITOR.env.ie?'(function(){'+encodeURIComponent('document.open();'+'('+CKEDITOR.tools.fixDomain+')();'+'document.close();')+'})()':'0');html.push(')"></iframe>');return html.join('');};dialog.on('load',function(){var iframe=CKEDITOR.document.getById(_.frameId),contentDiv=iframe.getParent();contentDiv.addClass('cke_dialog_ui_input_file');});CKEDITOR.ui.dialog.labeledElement.call(this,dialog,elementDefinition,htmlList,innerHTML);},fileButton:function(dialog,elementDefinition,htmlList){var me=this;if(arguments.length<3)
return;initPrivateObject.call(this,elementDefinition);if(elementDefinition.validate)
this.validate=elementDefinition.validate;var myDefinition=CKEDITOR.tools.extend({},elementDefinition);var onClick=myDefinition.onClick;myDefinition.className=(myDefinition.className?myDefinition.className+' ':'')+'cke_dialog_ui_button';myDefinition.onClick=function(evt){var target=elementDefinition['for'];if(!onClick||onClick.call(this,evt)!==false){dialog.getContentElement(target[0],target[1]).submit();this.disable();}};dialog.on('load',function(){dialog.getContentElement(elementDefinition['for'][0],elementDefinition['for'][1])._.buttons.push(me);});CKEDITOR.ui.dialog.button.call(this,dialog,myDefinition,htmlList);},html:(function(){var myHtmlRe=/^\s*<[\w:]+\s+([^>]*)?>/,theirHtmlRe=/^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/,emptyTagRe=/\/$/;return function(dialog,elementDefinition,htmlList){if(arguments.length<3)
return;var myHtmlList=[],myHtml,theirHtml=elementDefinition.html,myMatch,theirMatch;if(theirHtml.charAt(0)!='<')
theirHtml='<span>'+theirHtml+'</span>';var focus=elementDefinition.focus;if(focus){var oldFocus=this.focus;this.focus=function(){(typeof focus=='function'?focus:oldFocus).call(this);this.fire('focus');};if(elementDefinition.isFocusable){var oldIsFocusable=this.isFocusable;this.isFocusable=oldIsFocusable;}
this.keyboardFocusable=true;}
CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition,myHtmlList,'span',null,null,'');myHtml=myHtmlList.join('');myMatch=myHtml.match(myHtmlRe);theirMatch=theirHtml.match(theirHtmlRe)||['','',''];if(emptyTagRe.test(theirMatch[1])){theirMatch[1]=theirMatch[1].slice(0,-1);theirMatch[2]='/'+theirMatch[2];}
htmlList.push([theirMatch[1],' ',myMatch[1]||'',theirMatch[2]].join(''));};})(),fieldset:function(dialog,childObjList,childHtmlList,htmlList,elementDefinition){var legendLabel=elementDefinition.label;var innerHTML=function(){var html=[];legendLabel&&html.push('<legend'+
(elementDefinition.labelStyle?' style="'+elementDefinition.labelStyle+'"':'')+'>'+legendLabel+'</legend>');for(var i=0;i<childHtmlList.length;i++)
html.push(childHtmlList[i]);return html.join('');};this._={children:childObjList};CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition,htmlList,'fieldset',null,null,innerHTML);}},true);CKEDITOR.ui.dialog.html.prototype=new CKEDITOR.ui.dialog.uiElement();CKEDITOR.ui.dialog.labeledElement.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{setLabel:function(label){var node=CKEDITOR.document.getById(this._.labelId);if(node.getChildCount()<1)
(new CKEDITOR.dom.text(label,CKEDITOR.document)).appendTo(node);else
node.getChild(0).$.nodeValue=label;return this;},getLabel:function(){var node=CKEDITOR.document.getById(this._.labelId);if(!node||node.getChildCount()<1)
return'';else
return node.getChild(0).getText();},eventProcessors:commonEventProcessors},true);CKEDITOR.ui.dialog.button.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{click:function(){if(!this._.disabled)
return this.fire('click',{dialog:this._.dialog});return false;},enable:function(){this._.disabled=false;var element=this.getElement();element&&element.removeClass('cke_disabled');},disable:function(){this._.disabled=true;this.getElement().addClass('cke_disabled');},isVisible:function(){return this.getElement().getFirst().isVisible();},isEnabled:function(){return!this._.disabled;},eventProcessors:CKEDITOR.tools.extend({},CKEDITOR.ui.dialog.uiElement.prototype.eventProcessors,{onClick:function(dialog,func){this.on('click',function(){func.apply(this,arguments);});}},true),accessKeyUp:function(){this.click();},accessKeyDown:function(){this.focus();},keyboardFocusable:true},true);CKEDITOR.ui.dialog.textInput.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(),{getInputElement:function(){return CKEDITOR.document.getById(this._.inputId);},focus:function(){var me=this.selectParentTab();setTimeout(function(){var element=me.getInputElement();element&&element.$.focus();},0);},select:function(){var me=this.selectParentTab();setTimeout(function(){var e=me.getInputElement();if(e){e.$.focus();e.$.select();}},0);},accessKeyUp:function(){this.select();},setValue:function(value){if(this.bidi){var marker=value&&value.charAt(0),dir=(marker=='\u202A'?'ltr':marker=='\u202B'?'rtl':null);if(dir){value=value.slice(1);}
this.setDirectionMarker(dir);}
if(!value){value='';}
return CKEDITOR.ui.dialog.uiElement.prototype.setValue.apply(this,arguments);},getValue:function(){var value=CKEDITOR.ui.dialog.uiElement.prototype.getValue.call(this);if(this.bidi&&value){var dir=this.getDirectionMarker();if(dir){value=(dir=='ltr'?'\u202A':'\u202B')+value;}}
return value;},setDirectionMarker:function(dir){var inputElement=this.getInputElement();if(dir){inputElement.setAttributes({dir:dir,'data-cke-dir-marker':dir});}else if(this.getDirectionMarker()){inputElement.removeAttributes(['dir','data-cke-dir-marker']);}},getDirectionMarker:function(){return this.getInputElement().data('cke-dir-marker');},keyboardFocusable:true},commonPrototype,true);CKEDITOR.ui.dialog.textarea.prototype=new CKEDITOR.ui.dialog.textInput();CKEDITOR.ui.dialog.select.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(),{getInputElement:function(){return this._.select.getElement();},add:function(label,value,index){var option=new CKEDITOR.dom.element('option',this.getDialog().getParentEditor().document),selectElement=this.getInputElement().$;option.$.text=label;option.$.value=(value===undefined||value===null)?label:value;if(index===undefined||index===null){if(CKEDITOR.env.ie){selectElement.add(option.$);}else{selectElement.add(option.$,null);}}else{selectElement.add(option.$,index);}
return this;},remove:function(index){var selectElement=this.getInputElement().$;selectElement.remove(index);return this;},clear:function(){var selectElement=this.getInputElement().$;while(selectElement.length>0)
selectElement.remove(0);return this;},keyboardFocusable:true},commonPrototype,true);CKEDITOR.ui.dialog.checkbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{getInputElement:function(){return this._.checkbox.getElement();},setValue:function(checked,noChangeEvent){this.getInputElement().$.checked=checked;!noChangeEvent&&this.fire('change',{value:checked});},getValue:function(){return this.getInputElement().$.checked;},accessKeyUp:function(){this.setValue(!this.getValue());},eventProcessors:{onChange:function(dialog,func){if(!CKEDITOR.env.ie||(CKEDITOR.env.version>8))
return commonEventProcessors.onChange.apply(this,arguments);else{dialog.on('load',function(){var element=this._.checkbox.getElement();element.on('propertychange',function(evt){evt=evt.data.$;if(evt.propertyName=='checked')
this.fire('change',{value:element.$.checked});},this);},this);this.on('change',func);}
return null;}},keyboardFocusable:true},commonPrototype,true);CKEDITOR.ui.dialog.radio.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{setValue:function(value,noChangeEvent){var children=this._.children,item;for(var i=0;(i<children.length)&&(item=children[i]);i++)
item.getElement().$.checked=(item.getValue()==value);!noChangeEvent&&this.fire('change',{value:value});},getValue:function(){var children=this._.children;for(var i=0;i<children.length;i++){if(children[i].getElement().$.checked)
return children[i].getValue();}
return null;},accessKeyUp:function(){var children=this._.children,i;for(i=0;i<children.length;i++){if(children[i].getElement().$.checked){children[i].getElement().focus();return;}}
children[0].getElement().focus();},eventProcessors:{onChange:function(dialog,func){if(!CKEDITOR.env.ie||(CKEDITOR.env.version>8))
return commonEventProcessors.onChange.apply(this,arguments);else{dialog.on('load',function(){var children=this._.children,me=this;for(var i=0;i<children.length;i++){var element=children[i].getElement();element.on('propertychange',function(evt){evt=evt.data.$;if(evt.propertyName=='checked'&&this.$.checked)
me.fire('change',{value:this.getAttribute('value')});});}},this);this.on('change',func);}
return null;}}},commonPrototype,true);CKEDITOR.ui.dialog.file.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.labeledElement(),commonPrototype,{getInputElement:function(){var frameDocument=CKEDITOR.document.getById(this._.frameId).getFrameDocument();return frameDocument.$.forms.length>0?new CKEDITOR.dom.element(frameDocument.$.forms[0].elements[0]):this.getElement();},submit:function(){this.getInputElement().getParent().$.submit();return this;},getAction:function(){return this.getInputElement().getParent().$.action;},registerEvents:function(definition){var regex=/^on([A-Z]\w+)/,match;var registerDomEvent=function(uiElement,dialog,eventName,func){uiElement.on('formLoaded',function(){uiElement.getInputElement().on(eventName,func,uiElement);});};for(var i in definition){if(!(match=i.match(regex)))
continue;if(this.eventProcessors[i])
this.eventProcessors[i].call(this,this._.dialog,definition[i]);else
registerDomEvent(this,this._.dialog,match[1].toLowerCase(),definition[i]);}
return this;},reset:function(){var _=this._,frameElement=CKEDITOR.document.getById(_.frameId),frameDocument=frameElement.getFrameDocument(),elementDefinition=_.definition,buttons=_.buttons,callNumber=this.formLoadedNumber,unloadNumber=this.formUnloadNumber,langDir=_.dialog._.editor.lang.dir,langCode=_.dialog._.editor.langCode;if(!callNumber){callNumber=this.formLoadedNumber=CKEDITOR.tools.addFunction(function(){this.fire('formLoaded');},this);unloadNumber=this.formUnloadNumber=CKEDITOR.tools.addFunction(function(){this.getInputElement().clearCustomData();},this);this.getDialog()._.editor.on('destroy',function(){CKEDITOR.tools.removeFunction(callNumber);CKEDITOR.tools.removeFunction(unloadNumber);});}
function generateFormField(){frameDocument.$.open();var size='';if(elementDefinition.size)
size=elementDefinition.size-(CKEDITOR.env.ie?7:0);var inputId=_.frameId+'_input';frameDocument.$.write(['<html dir="'+langDir+'" lang="'+langCode+'"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">','<form enctype="multipart/form-data" method="POST" dir="'+langDir+'" lang="'+langCode+'" action="',CKEDITOR.tools.htmlEncode(elementDefinition.action),'">','<label id="',_.labelId,'" for="',inputId,'" style="display:none">',CKEDITOR.tools.htmlEncode(elementDefinition.label),'</label>','<input style="width:100%" id="',inputId,'" aria-labelledby="',_.labelId,'" type="file" name="',CKEDITOR.tools.htmlEncode(elementDefinition.id||'cke_upload'),'" size="',CKEDITOR.tools.htmlEncode(size>0?size:''),'" />','</form>','</body></html>','<script>',CKEDITOR.env.ie?'('+CKEDITOR.tools.fixDomain+')();':'','window.parent.CKEDITOR.tools.callFunction('+callNumber+');','window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction('+unloadNumber+')}','</script>'].join(''));frameDocument.$.close();for(var i=0;i<buttons.length;i++)
buttons[i].enable();}
if(CKEDITOR.env.gecko)
setTimeout(generateFormField,500);else
generateFormField();},getValue:function(){return this.getInputElement().$.value||'';},setInitValue:function(){this._.initValue='';},eventProcessors:{onChange:function(dialog,func){if(!this._.domOnChangeRegistered){this.on('formLoaded',function(){this.getInputElement().on('change',function(){this.fire('change',{value:this.getValue()});},this);},this);this._.domOnChangeRegistered=true;}
this.on('change',func);}},keyboardFocusable:true},true);CKEDITOR.ui.dialog.fileButton.prototype=new CKEDITOR.ui.dialog.button();CKEDITOR.ui.dialog.fieldset.prototype=CKEDITOR.tools.clone(CKEDITOR.ui.dialog.hbox.prototype);CKEDITOR.dialog.addUIElement('text',textBuilder);CKEDITOR.dialog.addUIElement('password',textBuilder);CKEDITOR.dialog.addUIElement('textarea',commonBuilder);CKEDITOR.dialog.addUIElement('checkbox',commonBuilder);CKEDITOR.dialog.addUIElement('radio',commonBuilder);CKEDITOR.dialog.addUIElement('button',commonBuilder);CKEDITOR.dialog.addUIElement('select',commonBuilder);CKEDITOR.dialog.addUIElement('file',commonBuilder);CKEDITOR.dialog.addUIElement('fileButton',commonBuilder);CKEDITOR.dialog.addUIElement('html',commonBuilder);CKEDITOR.dialog.addUIElement('fieldset',containerBuilder);}});CKEDITOR.DIALOG_RESIZE_NONE=0;CKEDITOR.DIALOG_RESIZE_WIDTH=1;CKEDITOR.DIALOG_RESIZE_HEIGHT=2;CKEDITOR.DIALOG_RESIZE_BOTH=3;CKEDITOR.DIALOG_STATE_IDLE=1;CKEDITOR.DIALOG_STATE_BUSY=2;(function(){var cssLength=CKEDITOR.tools.cssLength;function isTabVisible(tabId){return!!this._.tabs[tabId][0].$.offsetHeight;}
function getPreviousVisibleTab(){var tabId=this._.currentTabId,length=this._.tabIdList.length,tabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,tabId)+length;for(var i=tabIndex-1;i>tabIndex-length;i--){if(isTabVisible.call(this,this._.tabIdList[i%length]))
return this._.tabIdList[i%length];}
return null;}
function getNextVisibleTab(){var tabId=this._.currentTabId,length=this._.tabIdList.length,tabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,tabId);for(var i=tabIndex+1;i<tabIndex+length;i++){if(isTabVisible.call(this,this._.tabIdList[i%length]))
return this._.tabIdList[i%length];}
return null;}
function clearOrRecoverTextInputValue(container,isRecover){var inputs=container.$.getElementsByTagName('input');for(var i=0,length=inputs.length;i<length;i++){var item=new CKEDITOR.dom.element(inputs[i]);if(item.getAttribute('type').toLowerCase()=='text'){if(isRecover){item.setAttribute('value',item.getCustomData('fake_value')||'');item.removeCustomData('fake_value');}else{item.setCustomData('fake_value',item.getAttribute('value'));item.setAttribute('value','');}}}}
function handleFieldValidated(isValid,msg){var input=this.getInputElement();if(input)
isValid?input.removeAttribute('aria-invalid'):input.setAttribute('aria-invalid',true);if(!isValid){if(this.select)
this.select();else
this.focus();}
msg&&alert(msg);this.fire('validated',{valid:isValid,msg:msg});}
function resetField(){var input=this.getInputElement();input&&input.removeAttribute('aria-invalid');}
var templateSource='<div class="cke_reset_all {editorId} {editorDialogClass} {hidpi}'+'" dir="{langDir}"'+' lang="{langCode}"'+' role="dialog"'+' aria-labelledby="cke_dialog_title_{id}"'+'>'+'<table class="cke_dialog '+CKEDITOR.env.cssClass+' cke_{langDir}"'+' style="position:absolute" role="presentation">'+'<tr><td role="presentation">'+'<div class="cke_dialog_body" role="presentation">'+'<div id="cke_dialog_title_{id}" class="cke_dialog_title" role="presentation"></div>'+'<a id="cke_dialog_close_button_{id}" class="cke_dialog_close_button" href="javascript:void(0)" title="{closeTitle}" role="button"><span class="cke_label">X</span></a>'+'<div id="cke_dialog_tabs_{id}" class="cke_dialog_tabs" role="tablist"></div>'+'<table class="cke_dialog_contents" role="presentation">'+'<tr>'+'<td id="cke_dialog_contents_{id}" class="cke_dialog_contents_body" role="presentation"></td>'+'</tr>'+'<tr>'+'<td id="cke_dialog_footer_{id}" class="cke_dialog_footer" role="presentation"></td>'+'</tr>'+'</table>'+'</div>'+'</td></tr>'+'</table>'+'</div>';function buildDialog(editor){var element=CKEDITOR.dom.element.createFromHtml(CKEDITOR.addTemplate('dialog',templateSource).output({id:CKEDITOR.tools.getNextNumber(),editorId:editor.id,langDir:editor.lang.dir,langCode:editor.langCode,editorDialogClass:'cke_editor_'+editor.name.replace(/\./g,'\\.')+'_dialog',closeTitle:editor.lang.common.close,hidpi:CKEDITOR.env.hidpi?'cke_hidpi':''}));var body=element.getChild([0,0,0,0,0]),title=body.getChild(0),close=body.getChild(1);editor.plugins.clipboard&&CKEDITOR.plugins.clipboard.preventDefaultDropOnElement(body);if(CKEDITOR.env.ie&&!CKEDITOR.env.quirks&&!CKEDITOR.env.edge){var src='javascript:void(function(){'+encodeURIComponent('document.open();('+CKEDITOR.tools.fixDomain+')();document.close();')+'}())',iframe=CKEDITOR.dom.element.createFromHtml('<iframe'+' frameBorder="0"'+' class="cke_iframe_shim"'+' src="'+src+'"'+' tabIndex="-1"'+'></iframe>');iframe.appendTo(body.getParent());}
title.unselectable();close.unselectable();return{element:element,parts:{dialog:element.getChild(0),title:title,close:close,tabs:body.getChild(2),contents:body.getChild([3,0,0,0]),footer:body.getChild([3,0,1,0])}};}
CKEDITOR.dialog=function(editor,dialogName){var definition=CKEDITOR.dialog._.dialogDefinitions[dialogName],defaultDefinition=CKEDITOR.tools.clone(defaultDialogDefinition),buttonsOrder=editor.config.dialog_buttonsOrder||'OS',dir=editor.lang.dir,tabsToRemove={},i,processed,stopPropagation;if((buttonsOrder=='OS'&&CKEDITOR.env.mac)||(buttonsOrder=='rtl'&&dir=='ltr')||(buttonsOrder=='ltr'&&dir=='rtl'))
defaultDefinition.buttons.reverse();definition=CKEDITOR.tools.extend(definition(editor),defaultDefinition);definition=CKEDITOR.tools.clone(definition);definition=new definitionObject(this,definition);var themeBuilt=buildDialog(editor);this._={editor:editor,element:themeBuilt.element,name:dialogName,contentSize:{width:0,height:0},size:{width:0,height:0},contents:{},buttons:{},accessKeyMap:{},tabs:{},tabIdList:[],currentTabId:null,currentTabIndex:null,pageCount:0,lastTab:null,tabBarMode:false,focusList:[],currentFocusIndex:0,hasFocus:false};this.parts=themeBuilt.parts;CKEDITOR.tools.setTimeout(function(){editor.fire('ariaWidget',this.parts.contents);},0,this);var startStyles={position:CKEDITOR.env.ie6Compat?'absolute':'fixed',top:0,visibility:'hidden'};startStyles[dir=='rtl'?'right':'left']=0;this.parts.dialog.setStyles(startStyles);CKEDITOR.event.call(this);this.definition=definition=CKEDITOR.fire('dialogDefinition',{name:dialogName,definition:definition},editor).definition;if(!('removeDialogTabs'in editor._)&&editor.config.removeDialogTabs){var removeContents=editor.config.removeDialogTabs.split(';');for(i=0;i<removeContents.length;i++){var parts=removeContents[i].split(':');if(parts.length==2){var removeDialogName=parts[0];if(!tabsToRemove[removeDialogName])
tabsToRemove[removeDialogName]=[];tabsToRemove[removeDialogName].push(parts[1]);}}
editor._.removeDialogTabs=tabsToRemove;}
if(editor._.removeDialogTabs&&(tabsToRemove=editor._.removeDialogTabs[dialogName])){for(i=0;i<tabsToRemove.length;i++)
definition.removeContents(tabsToRemove[i]);}
if(definition.onLoad)
this.on('load',definition.onLoad);if(definition.onShow)
this.on('show',definition.onShow);if(definition.onHide)
this.on('hide',definition.onHide);if(definition.onOk){this.on('ok',function(evt){editor.fire('saveSnapshot');setTimeout(function(){editor.fire('saveSnapshot');},0);if(definition.onOk.call(this,evt)===false)
evt.data.hide=false;});}
this.state=CKEDITOR.DIALOG_STATE_IDLE;if(definition.onCancel){this.on('cancel',function(evt){if(definition.onCancel.call(this,evt)===false)
evt.data.hide=false;});}
if(definition.onRemove){this.on('remove',function(evt){if(definition.onRemove.call(this,evt)===false)
evt.data.hide=false;});}
var me=this;var iterContents=function(func){var contents=me._.contents,stop=false;for(var i in contents){for(var j in contents[i]){stop=func.call(this,contents[i][j]);if(stop)
return;}}};this.on('ok',function(evt){iterContents(function(item){if(item.validate){var retval=item.validate(this),invalid=(typeof retval=='string')||retval===false;if(invalid){evt.data.hide=false;evt.stop();}
handleFieldValidated.call(item,!invalid,typeof retval=='string'?retval:undefined);return invalid;}});},this,null,0);this.on('cancel',function(evt){iterContents(function(item){if(item.isChanged()){if(!editor.config.dialog_noConfirmCancel&&!confirm(editor.lang.common.confirmCancel))
evt.data.hide=false;return true;}});},this,null,0);this.parts.close.on('click',function(evt){if(this.fire('cancel',{hide:true}).hide!==false)
this.hide();evt.data.preventDefault();},this);function setupFocus(){var focusList=me._.focusList;focusList.sort(function(a,b){if(a.tabIndex!=b.tabIndex)
return b.tabIndex-a.tabIndex;else
return a.focusIndex-b.focusIndex;});var size=focusList.length;for(var i=0;i<size;i++)
focusList[i].focusIndex=i;}
function changeFocus(offset){var focusList=me._.focusList;offset=offset||0;if(focusList.length<1)
return;var startIndex=me._.currentFocusIndex;if(me._.tabBarMode&&offset<0){startIndex=0;}
try{focusList[startIndex].getInputElement().$.blur();}catch(e){}
var currentIndex=startIndex,hasTabs=me._.pageCount>1;do{currentIndex=currentIndex+offset;if(hasTabs&&!me._.tabBarMode&&(currentIndex==focusList.length||currentIndex==-1)){me._.tabBarMode=true;me._.tabs[me._.currentTabId][0].focus();me._.currentFocusIndex=-1;return;}
currentIndex=(currentIndex+focusList.length)%focusList.length;if(currentIndex==startIndex){break;}}while(offset&&!focusList[currentIndex].isFocusable());focusList[currentIndex].focus();if(focusList[currentIndex].type=='text')
focusList[currentIndex].select();}
this.changeFocus=changeFocus;function keydownHandler(evt){if(me!=CKEDITOR.dialog._.currentTop)
return;var keystroke=evt.data.getKeystroke(),rtl=editor.lang.dir=='rtl',arrowKeys=[37,38,39,40],button;processed=stopPropagation=0;if(keystroke==9||keystroke==CKEDITOR.SHIFT+9){var shiftPressed=(keystroke==CKEDITOR.SHIFT+9);changeFocus(shiftPressed?-1:1);processed=1;}else if(keystroke==CKEDITOR.ALT+121&&!me._.tabBarMode&&me.getPageCount()>1){me._.tabBarMode=true;me._.tabs[me._.currentTabId][0].focus();me._.currentFocusIndex=-1;processed=1;}else if(CKEDITOR.tools.indexOf(arrowKeys,keystroke)!=-1&&me._.tabBarMode){var prevKeyCodes=[rtl?39:37,38],nextId=CKEDITOR.tools.indexOf(prevKeyCodes,keystroke)!=-1?getPreviousVisibleTab.call(me):getNextVisibleTab.call(me);me.selectPage(nextId);me._.tabs[nextId][0].focus();processed=1;}else if((keystroke==13||keystroke==32)&&me._.tabBarMode){this.selectPage(this._.currentTabId);this._.tabBarMode=false;this._.currentFocusIndex=-1;changeFocus(1);processed=1;}
else if(keystroke==13){var target=evt.data.getTarget();if(!target.is('a','button','select','textarea')&&(!target.is('input')||target.$.type!='button')){button=this.getButton('ok');button&&CKEDITOR.tools.setTimeout(button.click,0,button);processed=1;}
stopPropagation=1;}else if(keystroke==27){button=this.getButton('cancel');if(button)
CKEDITOR.tools.setTimeout(button.click,0,button);else{if(this.fire('cancel',{hide:true}).hide!==false)
this.hide();}
stopPropagation=1;}else{return;}
keypressHandler(evt);}
function keypressHandler(evt){if(processed)
evt.data.preventDefault(1);else if(stopPropagation)
evt.data.stopPropagation();}
var dialogElement=this._.element;editor.focusManager.add(dialogElement,1);this.on('show',function(){dialogElement.on('keydown',keydownHandler,this);if(CKEDITOR.env.gecko)
dialogElement.on('keypress',keypressHandler,this);});this.on('hide',function(){dialogElement.removeListener('keydown',keydownHandler);if(CKEDITOR.env.gecko)
dialogElement.removeListener('keypress',keypressHandler);iterContents(function(item){resetField.apply(item);});});this.on('iframeAdded',function(evt){var doc=new CKEDITOR.dom.document(evt.data.iframe.$.contentWindow.document);doc.on('keydown',keydownHandler,this,null,0);});this.on('show',function(){setupFocus();var hasTabs=me._.pageCount>1;if(editor.config.dialog_startupFocusTab&&hasTabs){me._.tabBarMode=true;me._.tabs[me._.currentTabId][0].focus();me._.currentFocusIndex=-1;}else if(!this._.hasFocus){this._.currentFocusIndex=hasTabs?-1:this._.focusList.length-1;if(definition.onFocus){var initialFocus=definition.onFocus.call(this);initialFocus&&initialFocus.focus();}
else{changeFocus(1);}}},this,null,0xffffffff);if(CKEDITOR.env.ie6Compat){this.on('load',function(){var outer=this.getElement(),inner=outer.getFirst();inner.remove();inner.appendTo(outer);},this);}
initDragAndDrop(this);initResizeHandles(this);(new CKEDITOR.dom.text(definition.title,CKEDITOR.document)).appendTo(this.parts.title);for(i=0;i<definition.contents.length;i++){var page=definition.contents[i];page&&this.addPage(page);}
this.parts.tabs.on('click',function(evt){var target=evt.data.getTarget();if(target.hasClass('cke_dialog_tab')){var id=target.$.id;this.selectPage(id.substring(4,id.lastIndexOf('_')));if(this._.tabBarMode){this._.tabBarMode=false;this._.currentFocusIndex=-1;changeFocus(1);}
evt.data.preventDefault();}},this);var buttonsHtml=[],buttons=CKEDITOR.dialog._.uiElementBuilders.hbox.build(this,{type:'hbox',className:'cke_dialog_footer_buttons',widths:[],children:definition.buttons},buttonsHtml).getChild();this.parts.footer.setHtml(buttonsHtml.join(''));for(i=0;i<buttons.length;i++)
this._.buttons[buttons[i].id]=buttons[i];};function Focusable(dialog,element,index){this.element=element;this.focusIndex=index;this.tabIndex=0;this.isFocusable=function(){return!element.getAttribute('disabled')&&element.isVisible();};this.focus=function(){dialog._.currentFocusIndex=this.focusIndex;this.element.focus();};element.on('keydown',function(e){if(e.data.getKeystroke()in{32:1,13:1})
this.fire('click');});element.on('focus',function(){this.fire('mouseover');});element.on('blur',function(){this.fire('mouseout');});}
function resizeWithWindow(dialog){var win=CKEDITOR.document.getWindow();function resizeHandler(){dialog.layout();}
win.on('resize',resizeHandler);dialog.on('hide',function(){win.removeListener('resize',resizeHandler);});}
CKEDITOR.dialog.prototype={destroy:function(){this.hide();this._.element.remove();},resize:(function(){return function(width,height){if(this._.contentSize&&this._.contentSize.width==width&&this._.contentSize.height==height)
return;CKEDITOR.dialog.fire('resize',{dialog:this,width:width,height:height},this._.editor);this.fire('resize',{width:width,height:height},this._.editor);var contents=this.parts.contents;contents.setStyles({width:width+'px',height:height+'px'});if(this._.editor.lang.dir=='rtl'&&this._.position)
this._.position.x=CKEDITOR.document.getWindow().getViewPaneSize().width-this._.contentSize.width-parseInt(this._.element.getFirst().getStyle('right'),10);this._.contentSize={width:width,height:height};};})(),getSize:function(){var element=this._.element.getFirst();return{width:element.$.offsetWidth||0,height:element.$.offsetHeight||0};},move:function(x,y,save){var element=this._.element.getFirst(),rtl=this._.editor.lang.dir=='rtl';var isFixed=element.getComputedStyle('position')=='fixed';if(CKEDITOR.env.ie)
element.setStyle('zoom','100%');if(isFixed&&this._.position&&this._.position.x==x&&this._.position.y==y)
return;this._.position={x:x,y:y};if(!isFixed){var scrollPosition=CKEDITOR.document.getWindow().getScrollPosition();x+=scrollPosition.x;y+=scrollPosition.y;}
if(rtl){var dialogSize=this.getSize(),viewPaneSize=CKEDITOR.document.getWindow().getViewPaneSize();x=viewPaneSize.width-dialogSize.width-x;}
var styles={'top':(y>0?y:0)+'px'};styles[rtl?'right':'left']=(x>0?x:0)+'px';element.setStyles(styles);save&&(this._.moved=1);},getPosition:function(){return CKEDITOR.tools.extend({},this._.position);},show:function(){var element=this._.element;var definition=this.definition;if(!(element.getParent()&&element.getParent().equals(CKEDITOR.document.getBody())))
element.appendTo(CKEDITOR.document.getBody());else
element.setStyle('display','block');this.resize(this._.contentSize&&this._.contentSize.width||definition.width||definition.minWidth,this._.contentSize&&this._.contentSize.height||definition.height||definition.minHeight);this.reset();this.selectPage(this.definition.contents[0].id);if(CKEDITOR.dialog._.currentZIndex===null)
CKEDITOR.dialog._.currentZIndex=this._.editor.config.dialogZIndex;this._.element.getFirst().setStyle('z-index',CKEDITOR.dialog._.currentZIndex+=10);if(CKEDITOR.dialog._.currentTop===null){CKEDITOR.dialog._.currentTop=this;this._.parentDialog=null;showCover(this._.editor);}else{this._.parentDialog=CKEDITOR.dialog._.currentTop;var parentElement=this._.parentDialog.getElement().getFirst();parentElement.$.style.zIndex-=Math.floor(this._.editor.config.dialogZIndex/2);CKEDITOR.dialog._.currentTop=this;}
element.on('keydown',accessKeyDownHandler);element.on('keyup',accessKeyUpHandler);this._.hasFocus=false;for(var i in definition.contents){if(!definition.contents[i])
continue;var content=definition.contents[i],tab=this._.tabs[content.id],requiredContent=content.requiredContent,enableElements=0;if(!tab)
continue;for(var j in this._.contents[content.id]){var elem=this._.contents[content.id][j];if(elem.type=='hbox'||elem.type=='vbox'||!elem.getInputElement())
continue;if(elem.requiredContent&&!this._.editor.activeFilter.check(elem.requiredContent))
elem.disable();else{elem.enable();enableElements++;}}
if(!enableElements||(requiredContent&&!this._.editor.activeFilter.check(requiredContent)))
tab[0].addClass('cke_dialog_tab_disabled');else
tab[0].removeClass('cke_dialog_tab_disabled');}
CKEDITOR.tools.setTimeout(function(){this.layout();resizeWithWindow(this);this.parts.dialog.setStyle('visibility','');this.fireOnce('load',{});CKEDITOR.ui.fire('ready',this);this.fire('show',{});this._.editor.fire('dialogShow',this);if(!this._.parentDialog)
this._.editor.focusManager.lock();this.foreach(function(contentObj){contentObj.setInitValue&&contentObj.setInitValue();});},100,this);},layout:function(){var el=this.parts.dialog;var dialogSize=this.getSize();var win=CKEDITOR.document.getWindow(),viewSize=win.getViewPaneSize();var posX=(viewSize.width-dialogSize.width)/2,posY=(viewSize.height-dialogSize.height)/2;if(!CKEDITOR.env.ie6Compat){if(dialogSize.height+(posY>0?posY:0)>viewSize.height||dialogSize.width+(posX>0?posX:0)>viewSize.width){el.setStyle('position','absolute');}else{el.setStyle('position','fixed');}}
this.move(this._.moved?this._.position.x:posX,this._.moved?this._.position.y:posY);},foreach:function(fn){for(var i in this._.contents){for(var j in this._.contents[i]){fn.call(this,this._.contents[i][j]);}}
return this;},reset:(function(){var fn=function(widget){if(widget.reset)
widget.reset(1);};return function(){this.foreach(fn);return this;};})(),setupContent:function(){var args=arguments;this.foreach(function(widget){if(widget.setup)
widget.setup.apply(widget,args);});},commitContent:function(){var args=arguments;this.foreach(function(widget){if(CKEDITOR.env.ie&&this._.currentFocusIndex==widget.focusIndex)
widget.getInputElement().$.blur();if(widget.commit)
widget.commit.apply(widget,args);});},hide:function(){if(!this.parts.dialog.isVisible())
return;this.fire('hide',{});this._.editor.fire('dialogHide',this);this.selectPage(this._.tabIdList[0]);var element=this._.element;element.setStyle('display','none');this.parts.dialog.setStyle('visibility','hidden');unregisterAccessKey(this);while(CKEDITOR.dialog._.currentTop!=this)
CKEDITOR.dialog._.currentTop.hide();if(!this._.parentDialog)
hideCover(this._.editor);else{var parentElement=this._.parentDialog.getElement().getFirst();parentElement.setStyle('z-index',parseInt(parentElement.$.style.zIndex,10)+Math.floor(this._.editor.config.dialogZIndex/2));}
CKEDITOR.dialog._.currentTop=this._.parentDialog;if(!this._.parentDialog){CKEDITOR.dialog._.currentZIndex=null;element.removeListener('keydown',accessKeyDownHandler);element.removeListener('keyup',accessKeyUpHandler);var editor=this._.editor;editor.focus();setTimeout(function(){editor.focusManager.unlock();if(CKEDITOR.env.iOS){editor.window.focus();}},0);}else{CKEDITOR.dialog._.currentZIndex-=10;}
delete this._.parentDialog;this.foreach(function(contentObj){contentObj.resetInitValue&&contentObj.resetInitValue();});this.setState(CKEDITOR.DIALOG_STATE_IDLE);},addPage:function(contents){if(contents.requiredContent&&!this._.editor.filter.check(contents.requiredContent))
return;var pageHtml=[],titleHtml=contents.label?' title="'+CKEDITOR.tools.htmlEncode(contents.label)+'"':'',vbox=CKEDITOR.dialog._.uiElementBuilders.vbox.build(this,{type:'vbox',className:'cke_dialog_page_contents',children:contents.elements,expand:!!contents.expand,padding:contents.padding,style:contents.style||'width: 100%;'},pageHtml);var contentMap=this._.contents[contents.id]={},cursor,children=vbox.getChild(),enabledFields=0;while((cursor=children.shift())){if(!cursor.notAllowed&&cursor.type!='hbox'&&cursor.type!='vbox')
enabledFields++;contentMap[cursor.id]=cursor;if(typeof cursor.getChild=='function')
children.push.apply(children,cursor.getChild());}
if(!enabledFields)
contents.hidden=true;var page=CKEDITOR.dom.element.createFromHtml(pageHtml.join(''));page.setAttribute('role','tabpanel');var env=CKEDITOR.env;var tabId='cke_'+contents.id+'_'+CKEDITOR.tools.getNextNumber(),tab=CKEDITOR.dom.element.createFromHtml(['<a class="cke_dialog_tab"',(this._.pageCount>0?' cke_last':'cke_first'),titleHtml,(!!contents.hidden?' style="display:none"':''),' id="',tabId,'"',env.gecko&&!env.hc?'':' href="javascript:void(0)"',' tabIndex="-1"',' hidefocus="true"',' role="tab">',contents.label,'</a>'].join(''));page.setAttribute('aria-labelledby',tabId);this._.tabs[contents.id]=[tab,page];this._.tabIdList.push(contents.id);!contents.hidden&&this._.pageCount++;this._.lastTab=tab;this.updateStyle();page.setAttribute('name',contents.id);page.appendTo(this.parts.contents);tab.unselectable();this.parts.tabs.append(tab);if(contents.accessKey){registerAccessKey(this,this,'CTRL+'+contents.accessKey,tabAccessKeyDown,tabAccessKeyUp);this._.accessKeyMap['CTRL+'+contents.accessKey]=contents.id;}},selectPage:function(id){if(this._.currentTabId==id)
return;if(this._.tabs[id][0].hasClass('cke_dialog_tab_disabled'))
return;if(this.fire('selectPage',{page:id,currentPage:this._.currentTabId})===false)
return;for(var i in this._.tabs){var tab=this._.tabs[i][0],page=this._.tabs[i][1];if(i!=id){tab.removeClass('cke_dialog_tab_selected');page.hide();}
page.setAttribute('aria-hidden',i!=id);}
var selected=this._.tabs[id];selected[0].addClass('cke_dialog_tab_selected');if(CKEDITOR.env.ie6Compat||CKEDITOR.env.ie7Compat){clearOrRecoverTextInputValue(selected[1]);selected[1].show();setTimeout(function(){clearOrRecoverTextInputValue(selected[1],1);},0);}else{selected[1].show();}
this._.currentTabId=id;this._.currentTabIndex=CKEDITOR.tools.indexOf(this._.tabIdList,id);},updateStyle:function(){this.parts.dialog[(this._.pageCount===1?'add':'remove')+'Class']('cke_single_page');},hidePage:function(id){var tab=this._.tabs[id]&&this._.tabs[id][0];if(!tab||this._.pageCount==1||!tab.isVisible())
return;else if(id==this._.currentTabId)
this.selectPage(getPreviousVisibleTab.call(this));tab.hide();this._.pageCount--;this.updateStyle();},showPage:function(id){var tab=this._.tabs[id]&&this._.tabs[id][0];if(!tab)
return;tab.show();this._.pageCount++;this.updateStyle();},getElement:function(){return this._.element;},getName:function(){return this._.name;},getContentElement:function(pageId,elementId){var page=this._.contents[pageId];return page&&page[elementId];},getValueOf:function(pageId,elementId){return this.getContentElement(pageId,elementId).getValue();},setValueOf:function(pageId,elementId,value){return this.getContentElement(pageId,elementId).setValue(value);},getButton:function(id){return this._.buttons[id];},click:function(id){return this._.buttons[id].click();},disableButton:function(id){return this._.buttons[id].disable();},enableButton:function(id){return this._.buttons[id].enable();},getPageCount:function(){return this._.pageCount;},getParentEditor:function(){return this._.editor;},getSelectedElement:function(){return this.getParentEditor().getSelection().getSelectedElement();},addFocusable:function(element,index){if(typeof index=='undefined'){index=this._.focusList.length;this._.focusList.push(new Focusable(this,element,index));}else{this._.focusList.splice(index,0,new Focusable(this,element,index));for(var i=index+1;i<this._.focusList.length;i++)
this._.focusList[i].focusIndex++;}},setState:function(state){var oldState=this.state;if(oldState==state){return;}
this.state=state;if(state==CKEDITOR.DIALOG_STATE_BUSY){if(!this.parts.spinner){var dir=this.getParentEditor().lang.dir,spinnerDef={attributes:{'class':'cke_dialog_spinner'},styles:{'float':dir=='rtl'?'right':'left'}};spinnerDef.styles['margin-'+(dir=='rtl'?'left':'right')]='8px';this.parts.spinner=CKEDITOR.document.createElement('div',spinnerDef);this.parts.spinner.setHtml('&#8987;');this.parts.spinner.appendTo(this.parts.title,1);}
this.parts.spinner.show();this.getButton('ok').disable();}else if(state==CKEDITOR.DIALOG_STATE_IDLE){this.parts.spinner&&this.parts.spinner.hide();this.getButton('ok').enable();}
this.fire('state',state);}};CKEDITOR.tools.extend(CKEDITOR.dialog,{add:function(name,dialogDefinition){if(!this._.dialogDefinitions[name]||typeof dialogDefinition=='function')
this._.dialogDefinitions[name]=dialogDefinition;},exists:function(name){return!!this._.dialogDefinitions[name];},getCurrent:function(){return CKEDITOR.dialog._.currentTop;},isTabEnabled:function(editor,dialogName,tabName){var cfg=editor.config.removeDialogTabs;return!(cfg&&cfg.match(new RegExp('(?:^|;)'+dialogName+':'+tabName+'(?:$|;)','i')));},okButton:(function(){var retval=function(editor,override){override=override||{};return CKEDITOR.tools.extend({id:'ok',type:'button',label:editor.lang.common.ok,'class':'cke_dialog_ui_button_ok',onClick:function(evt){var dialog=evt.data.dialog;if(dialog.fire('ok',{hide:true}).hide!==false)
dialog.hide();}},override,true);};retval.type='button';retval.override=function(override){return CKEDITOR.tools.extend(function(editor){return retval(editor,override);},{type:'button'},true);};return retval;})(),cancelButton:(function(){var retval=function(editor,override){override=override||{};return CKEDITOR.tools.extend({id:'cancel',type:'button',label:editor.lang.common.cancel,'class':'cke_dialog_ui_button_cancel',onClick:function(evt){var dialog=evt.data.dialog;if(dialog.fire('cancel',{hide:true}).hide!==false)
dialog.hide();}},override,true);};retval.type='button';retval.override=function(override){return CKEDITOR.tools.extend(function(editor){return retval(editor,override);},{type:'button'},true);};return retval;})(),removeButton:(function(){var retval=function(editor,override){override=override||{};return CKEDITOR.tools.extend({id:'remove',type:'button',label:'Remove Link','class':'cke_dialog_ui_button_remove',onClick:function(evt){var dialog=evt.data.dialog;if(dialog.fire('remove',{hide:true}).hide!==false)
dialog.hide();}},override,true);};retval.type='button';retval.override=function(override){return CKEDITOR.tools.extend(function(editor){return retval(editor,override);},{type:'button'},true);};return retval;})(),addUIElement:function(typeName,builder){this._.uiElementBuilders[typeName]=builder;}});CKEDITOR.dialog._={uiElementBuilders:{},dialogDefinitions:{},currentTop:null,currentZIndex:null};CKEDITOR.event.implementOn(CKEDITOR.dialog);CKEDITOR.event.implementOn(CKEDITOR.dialog.prototype);var defaultDialogDefinition={resizable:CKEDITOR.DIALOG_RESIZE_BOTH,minWidth:600,minHeight:400,buttons:[CKEDITOR.dialog.okButton,CKEDITOR.dialog.cancelButton]};var getById=function(array,id,recurse){for(var i=0,item;(item=array[i]);i++){if(item.id==id)
return item;if(recurse&&item[recurse]){var retval=getById(item[recurse],id,recurse);if(retval)
return retval;}}
return null;};var addById=function(array,newItem,nextSiblingId,recurse,nullIfNotFound){if(nextSiblingId){for(var i=0,item;(item=array[i]);i++){if(item.id==nextSiblingId){array.splice(i,0,newItem);return newItem;}
if(recurse&&item[recurse]){var retval=addById(item[recurse],newItem,nextSiblingId,recurse,true);if(retval)
return retval;}}
if(nullIfNotFound)
return null;}
array.push(newItem);return newItem;};var removeById=function(array,id,recurse){for(var i=0,item;(item=array[i]);i++){if(item.id==id)
return array.splice(i,1);if(recurse&&item[recurse]){var retval=removeById(item[recurse],id,recurse);if(retval)
return retval;}}
return null;};var definitionObject=function(dialog,dialogDefinition){this.dialog=dialog;var contents=dialogDefinition.contents;for(var i=0,content;(content=contents[i]);i++)
contents[i]=content&&new contentObject(dialog,content);CKEDITOR.tools.extend(this,dialogDefinition);};definitionObject.prototype={getContents:function(id){return getById(this.contents,id);},getButton:function(id){return getById(this.buttons,id);},addContents:function(contentDefinition,nextSiblingId){return addById(this.contents,contentDefinition,nextSiblingId);},addButton:function(buttonDefinition,nextSiblingId){return addById(this.buttons,buttonDefinition,nextSiblingId);},removeContents:function(id){removeById(this.contents,id);},removeButton:function(id){removeById(this.buttons,id);}};function contentObject(dialog,contentDefinition){this._={dialog:dialog};CKEDITOR.tools.extend(this,contentDefinition);}
contentObject.prototype={get:function(id){return getById(this.elements,id,'children');},add:function(elementDefinition,nextSiblingId){return addById(this.elements,elementDefinition,nextSiblingId,'children');},remove:function(id){removeById(this.elements,id,'children');}};function initDragAndDrop(dialog){var lastCoords=null,abstractDialogCoords=null,editor=dialog.getParentEditor(),magnetDistance=editor.config.dialog_magnetDistance,margins=CKEDITOR.skin.margins||[0,0,0,0];if(typeof magnetDistance=='undefined')
magnetDistance=20;function mouseMoveHandler(evt){var dialogSize=dialog.getSize(),viewPaneSize=CKEDITOR.document.getWindow().getViewPaneSize(),x=evt.data.$.screenX,y=evt.data.$.screenY,dx=x-lastCoords.x,dy=y-lastCoords.y,realX,realY;lastCoords={x:x,y:y};abstractDialogCoords.x+=dx;abstractDialogCoords.y+=dy;if(abstractDialogCoords.x+margins[3]<magnetDistance)
realX=-margins[3];else if(abstractDialogCoords.x-margins[1]>viewPaneSize.width-dialogSize.width-magnetDistance)
realX=viewPaneSize.width-dialogSize.width+(editor.lang.dir=='rtl'?0:margins[1]);else
realX=abstractDialogCoords.x;if(abstractDialogCoords.y+margins[0]<magnetDistance)
realY=-margins[0];else if(abstractDialogCoords.y-margins[2]>viewPaneSize.height-dialogSize.height-magnetDistance)
realY=viewPaneSize.height-dialogSize.height+margins[2];else
realY=abstractDialogCoords.y;dialog.move(realX,realY,1);evt.data.preventDefault();}
function mouseUpHandler(){CKEDITOR.document.removeListener('mousemove',mouseMoveHandler);CKEDITOR.document.removeListener('mouseup',mouseUpHandler);if(CKEDITOR.env.ie6Compat){var coverDoc=currentCover.getChild(0).getFrameDocument();coverDoc.removeListener('mousemove',mouseMoveHandler);coverDoc.removeListener('mouseup',mouseUpHandler);}}
dialog.parts.title.on('mousedown',function(evt){lastCoords={x:evt.data.$.screenX,y:evt.data.$.screenY};CKEDITOR.document.on('mousemove',mouseMoveHandler);CKEDITOR.document.on('mouseup',mouseUpHandler);abstractDialogCoords=dialog.getPosition();if(CKEDITOR.env.ie6Compat){var coverDoc=currentCover.getChild(0).getFrameDocument();coverDoc.on('mousemove',mouseMoveHandler);coverDoc.on('mouseup',mouseUpHandler);}
evt.data.preventDefault();},dialog);}
function initResizeHandles(dialog){var def=dialog.definition,resizable=def.resizable;if(resizable==CKEDITOR.DIALOG_RESIZE_NONE)
return;var editor=dialog.getParentEditor();var wrapperWidth,wrapperHeight,viewSize,origin,startSize,dialogCover;var mouseDownFn=CKEDITOR.tools.addFunction(function($event){startSize=dialog.getSize();var content=dialog.parts.contents,iframeDialog=content.$.getElementsByTagName('iframe').length;if(iframeDialog){dialogCover=CKEDITOR.dom.element.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');content.append(dialogCover);}
wrapperHeight=startSize.height-dialog.parts.contents.getSize('height',!(CKEDITOR.env.gecko||CKEDITOR.env.ie&&CKEDITOR.env.quirks));wrapperWidth=startSize.width-dialog.parts.contents.getSize('width',1);origin={x:$event.screenX,y:$event.screenY};viewSize=CKEDITOR.document.getWindow().getViewPaneSize();CKEDITOR.document.on('mousemove',mouseMoveHandler);CKEDITOR.document.on('mouseup',mouseUpHandler);if(CKEDITOR.env.ie6Compat){var coverDoc=currentCover.getChild(0).getFrameDocument();coverDoc.on('mousemove',mouseMoveHandler);coverDoc.on('mouseup',mouseUpHandler);}
$event.preventDefault&&$event.preventDefault();});dialog.on('load',function(){var direction='';if(resizable==CKEDITOR.DIALOG_RESIZE_WIDTH)
direction=' cke_resizer_horizontal';else if(resizable==CKEDITOR.DIALOG_RESIZE_HEIGHT)
direction=' cke_resizer_vertical';var resizer=CKEDITOR.dom.element.createFromHtml('<div'+' class="cke_resizer'+direction+' cke_resizer_'+editor.lang.dir+'"'+' title="'+CKEDITOR.tools.htmlEncode(editor.lang.common.resize)+'"'+' onmousedown="CKEDITOR.tools.callFunction('+mouseDownFn+', event )">'+
(editor.lang.dir=='ltr'?'\u25E2':'\u25E3')+'</div>');dialog.parts.footer.append(resizer,1);});editor.on('destroy',function(){CKEDITOR.tools.removeFunction(mouseDownFn);});function mouseMoveHandler(evt){var rtl=editor.lang.dir=='rtl',dx=(evt.data.$.screenX-origin.x)*(rtl?-1:1),dy=evt.data.$.screenY-origin.y,width=startSize.width,height=startSize.height,internalWidth=width+dx*(dialog._.moved?1:2),internalHeight=height+dy*(dialog._.moved?1:2),element=dialog._.element.getFirst(),right=rtl&&element.getComputedStyle('right'),position=dialog.getPosition();if(position.y+internalHeight>viewSize.height)
internalHeight=viewSize.height-position.y;if((rtl?right:position.x)+internalWidth>viewSize.width)
internalWidth=viewSize.width-(rtl?right:position.x);if((resizable==CKEDITOR.DIALOG_RESIZE_WIDTH||resizable==CKEDITOR.DIALOG_RESIZE_BOTH))
width=Math.max(def.minWidth||0,internalWidth-wrapperWidth);if(resizable==CKEDITOR.DIALOG_RESIZE_HEIGHT||resizable==CKEDITOR.DIALOG_RESIZE_BOTH)
height=Math.max(def.minHeight||0,internalHeight-wrapperHeight);dialog.resize(width,height);if(!dialog._.moved)
dialog.layout();evt.data.preventDefault();}
function mouseUpHandler(){CKEDITOR.document.removeListener('mouseup',mouseUpHandler);CKEDITOR.document.removeListener('mousemove',mouseMoveHandler);if(dialogCover){dialogCover.remove();dialogCover=null;}
if(CKEDITOR.env.ie6Compat){var coverDoc=currentCover.getChild(0).getFrameDocument();coverDoc.removeListener('mouseup',mouseUpHandler);coverDoc.removeListener('mousemove',mouseMoveHandler);}}}
var resizeCover;var covers={},currentCover;function cancelEvent(ev){ev.data.preventDefault(1);}
function showCover(editor){var win=CKEDITOR.document.getWindow();var config=editor.config,backgroundColorStyle=config.dialog_backgroundCoverColor||'white',backgroundCoverOpacity=config.dialog_backgroundCoverOpacity,dialogZIndex=config.dialogZIndex,coverKey=CKEDITOR.tools.genKey(backgroundColorStyle,backgroundCoverOpacity,dialogZIndex),coverElement=covers[coverKey];if(!coverElement){var html=['<div tabIndex="-1" style="position: ',(CKEDITOR.env.ie6Compat?'absolute':'fixed'),'; z-index: ',dialogZIndex,'; top: 0px; left: 0px; ',(!CKEDITOR.env.ie6Compat?'background-color: '+backgroundColorStyle:''),'" class="cke_dialog_background_cover">'];if(CKEDITOR.env.ie6Compat){var iframeHtml='<html><body style=\\\'background-color:'+backgroundColorStyle+';\\\'></body></html>';html.push('<iframe'+' hidefocus="true"'+' frameborder="0"'+' id="cke_dialog_background_iframe"'+' src="javascript:');html.push('void((function(){'+encodeURIComponent('document.open();'+'('+CKEDITOR.tools.fixDomain+')();'+'document.write( \''+iframeHtml+'\' );'+'document.close();')+'})())');html.push('"'+' style="'+'position:absolute;'+'left:0;'+'top:0;'+'width:100%;'+'height: 100%;'+'filter: progid:DXImageTransform.Microsoft.Alpha(opacity=0)">'+'</iframe>');}
html.push('</div>');coverElement=CKEDITOR.dom.element.createFromHtml(html.join(''));coverElement.setOpacity(backgroundCoverOpacity!==undefined?backgroundCoverOpacity:0.5);coverElement.on('keydown',cancelEvent);coverElement.on('keypress',cancelEvent);coverElement.on('keyup',cancelEvent);coverElement.appendTo(CKEDITOR.document.getBody());covers[coverKey]=coverElement;}else{coverElement.show();}
editor.focusManager.add(coverElement);currentCover=coverElement;var resizeFunc=function(){var size=win.getViewPaneSize();coverElement.setStyles({width:size.width+'px',height:size.height+'px'});};var scrollFunc=function(){var pos=win.getScrollPosition(),cursor=CKEDITOR.dialog._.currentTop;coverElement.setStyles({left:pos.x+'px',top:pos.y+'px'});if(cursor){do{var dialogPos=cursor.getPosition();cursor.move(dialogPos.x,dialogPos.y);}while((cursor=cursor._.parentDialog));}};resizeCover=resizeFunc;win.on('resize',resizeFunc);resizeFunc();if(!(CKEDITOR.env.mac&&CKEDITOR.env.webkit))
coverElement.focus();if(CKEDITOR.env.ie6Compat){var myScrollHandler=function(){scrollFunc();arguments.callee.prevScrollHandler.apply(this,arguments);};win.$.setTimeout(function(){myScrollHandler.prevScrollHandler=window.onscroll||function(){};window.onscroll=myScrollHandler;},0);scrollFunc();}}
function hideCover(editor){if(!currentCover)
return;editor.focusManager.remove(currentCover);var win=CKEDITOR.document.getWindow();currentCover.hide();win.removeListener('resize',resizeCover);if(CKEDITOR.env.ie6Compat){win.$.setTimeout(function(){var prevScrollHandler=window.onscroll&&window.onscroll.prevScrollHandler;window.onscroll=prevScrollHandler||null;},0);}
resizeCover=null;}
function removeCovers(){for(var coverId in covers)
covers[coverId].remove();covers={};}
var accessKeyProcessors={};var accessKeyDownHandler=function(evt){var ctrl=evt.data.$.ctrlKey||evt.data.$.metaKey,alt=evt.data.$.altKey,shift=evt.data.$.shiftKey,key=String.fromCharCode(evt.data.$.keyCode),keyProcessor=accessKeyProcessors[(ctrl?'CTRL+':'')+(alt?'ALT+':'')+(shift?'SHIFT+':'')+key];if(!keyProcessor||!keyProcessor.length)
return;keyProcessor=keyProcessor[keyProcessor.length-1];keyProcessor.keydown&&keyProcessor.keydown.call(keyProcessor.uiElement,keyProcessor.dialog,keyProcessor.key);evt.data.preventDefault();};var accessKeyUpHandler=function(evt){var ctrl=evt.data.$.ctrlKey||evt.data.$.metaKey,alt=evt.data.$.altKey,shift=evt.data.$.shiftKey,key=String.fromCharCode(evt.data.$.keyCode),keyProcessor=accessKeyProcessors[(ctrl?'CTRL+':'')+(alt?'ALT+':'')+(shift?'SHIFT+':'')+key];if(!keyProcessor||!keyProcessor.length)
return;keyProcessor=keyProcessor[keyProcessor.length-1];if(keyProcessor.keyup){keyProcessor.keyup.call(keyProcessor.uiElement,keyProcessor.dialog,keyProcessor.key);evt.data.preventDefault();}};var registerAccessKey=function(uiElement,dialog,key,downFunc,upFunc){var procList=accessKeyProcessors[key]||(accessKeyProcessors[key]=[]);procList.push({uiElement:uiElement,dialog:dialog,key:key,keyup:upFunc||uiElement.accessKeyUp,keydown:downFunc||uiElement.accessKeyDown});};var unregisterAccessKey=function(obj){for(var i in accessKeyProcessors){var list=accessKeyProcessors[i];for(var j=list.length-1;j>=0;j--){if(list[j].dialog==obj||list[j].uiElement==obj)
list.splice(j,1);}
if(list.length===0)
delete accessKeyProcessors[i];}};var tabAccessKeyUp=function(dialog,key){if(dialog._.accessKeyMap[key])
dialog.selectPage(dialog._.accessKeyMap[key]);};var tabAccessKeyDown=function(){};(function(){CKEDITOR.ui.dialog={uiElement:function(dialog,elementDefinition,htmlList,nodeNameArg,stylesArg,attributesArg,contentsArg){if(arguments.length<4)
return;var nodeName=(nodeNameArg.call?nodeNameArg(elementDefinition):nodeNameArg)||'div',html=['<',nodeName,' '],styles=(stylesArg&&stylesArg.call?stylesArg(elementDefinition):stylesArg)||{},attributes=(attributesArg&&attributesArg.call?attributesArg(elementDefinition):attributesArg)||{},innerHTML=(contentsArg&&contentsArg.call?contentsArg.call(this,dialog,elementDefinition):contentsArg)||'',domId=this.domId=attributes.id||CKEDITOR.tools.getNextId()+'_uiElement',i;if(elementDefinition.requiredContent&&!dialog.getParentEditor().filter.check(elementDefinition.requiredContent)){styles.display='none';this.notAllowed=true;}
attributes.id=domId;var classes={};if(elementDefinition.type)
classes['cke_dialog_ui_'+elementDefinition.type]=1;if(elementDefinition.className)
classes[elementDefinition.className]=1;if(elementDefinition.disabled)
classes.cke_disabled=1;var attributeClasses=(attributes['class']&&attributes['class'].split)?attributes['class'].split(' '):[];for(i=0;i<attributeClasses.length;i++){if(attributeClasses[i])
classes[attributeClasses[i]]=1;}
var finalClasses=[];for(i in classes)
finalClasses.push(i);attributes['class']=finalClasses.join(' ');if(elementDefinition.title)
attributes.title=elementDefinition.title;var styleStr=(elementDefinition.style||'').split(';');if(elementDefinition.align){var align=elementDefinition.align;styles['margin-left']=align=='left'?0:'auto';styles['margin-right']=align=='right'?0:'auto';}
for(i in styles)
styleStr.push(i+':'+styles[i]);if(elementDefinition.hidden)
styleStr.push('display:none');for(i=styleStr.length-1;i>=0;i--){if(styleStr[i]==='')
styleStr.splice(i,1);}
if(styleStr.length>0)
attributes.style=(attributes.style?(attributes.style+'; '):'')+styleStr.join('; ');for(i in attributes)
html.push(i+'="'+CKEDITOR.tools.htmlEncode(attributes[i])+'" ');html.push('>',innerHTML,'</',nodeName,'>');htmlList.push(html.join(''));(this._||(this._={})).dialog=dialog;if(typeof elementDefinition.isChanged=='boolean')
this.isChanged=function(){return elementDefinition.isChanged;};if(typeof elementDefinition.isChanged=='function')
this.isChanged=elementDefinition.isChanged;if(typeof elementDefinition.setValue=='function'){this.setValue=CKEDITOR.tools.override(this.setValue,function(org){return function(val){org.call(this,elementDefinition.setValue.call(this,val));};});}
if(typeof elementDefinition.getValue=='function'){this.getValue=CKEDITOR.tools.override(this.getValue,function(org){return function(){return elementDefinition.getValue.call(this,org.call(this));};});}
CKEDITOR.event.implementOn(this);this.registerEvents(elementDefinition);if(this.accessKeyUp&&this.accessKeyDown&&elementDefinition.accessKey)
registerAccessKey(this,dialog,'CTRL+'+elementDefinition.accessKey);var me=this;dialog.on('load',function(){var input=me.getInputElement();if(input){var focusClass=me.type in{'checkbox':1,'ratio':1}&&CKEDITOR.env.ie&&CKEDITOR.env.version<8?'cke_dialog_ui_focused':'';input.on('focus',function(){dialog._.tabBarMode=false;dialog._.hasFocus=true;me.fire('focus');focusClass&&this.addClass(focusClass);});input.on('blur',function(){me.fire('blur');focusClass&&this.removeClass(focusClass);});}});CKEDITOR.tools.extend(this,elementDefinition);if(this.keyboardFocusable){this.tabIndex=elementDefinition.tabIndex||0;this.focusIndex=dialog._.focusList.push(this)-1;this.on('focus',function(){dialog._.currentFocusIndex=me.focusIndex;});}},hbox:function(dialog,childObjList,childHtmlList,htmlList,elementDefinition){if(arguments.length<4)
return;this._||(this._={});var children=this._.children=childObjList,widths=elementDefinition&&elementDefinition.widths||null,height=elementDefinition&&elementDefinition.height||null,styles={},i;var innerHTML=function(){var html=['<tbody><tr class="cke_dialog_ui_hbox">'];for(i=0;i<childHtmlList.length;i++){var className='cke_dialog_ui_hbox_child',styles=[];if(i===0){className='cke_dialog_ui_hbox_first';}
if(i==childHtmlList.length-1){className='cke_dialog_ui_hbox_last';}
html.push('<td class="',className,'" role="presentation" ');if(widths){if(widths[i]){styles.push('width:'+cssLength(widths[i]));}}else{styles.push('width:'+Math.floor(100/childHtmlList.length)+'%');}
if(height){styles.push('height:'+cssLength(height));}
if(elementDefinition&&elementDefinition.padding!==undefined){styles.push('padding:'+cssLength(elementDefinition.padding));}
if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&children[i].align){styles.push('text-align:'+children[i].align);}
if(styles.length>0){html.push('style="'+styles.join('; ')+'" ');}
html.push('>',childHtmlList[i],'</td>');}
html.push('</tr></tbody>');return html.join('');};var attribs={role:'presentation'};elementDefinition&&elementDefinition.align&&(attribs.align=elementDefinition.align);CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition||{type:'hbox'},htmlList,'table',styles,attribs,innerHTML);},vbox:function(dialog,childObjList,childHtmlList,htmlList,elementDefinition){if(arguments.length<3)
return;this._||(this._={});var children=this._.children=childObjList,width=elementDefinition&&elementDefinition.width||null,heights=elementDefinition&&elementDefinition.heights||null;var innerHTML=function(){var html=['<table role="presentation" cellspacing="0" border="0" '];html.push('style="');if(elementDefinition&&elementDefinition.expand)
html.push('height:100%;');html.push('width:'+cssLength(width||'100%'),';');if(CKEDITOR.env.webkit)
html.push('float:none;');html.push('"');html.push('align="',CKEDITOR.tools.htmlEncode((elementDefinition&&elementDefinition.align)||(dialog.getParentEditor().lang.dir=='ltr'?'left':'right')),'" ');html.push('><tbody>');for(var i=0;i<childHtmlList.length;i++){var styles=[];html.push('<tr><td role="presentation" ');if(width)
styles.push('width:'+cssLength(width||'100%'));if(heights)
styles.push('height:'+cssLength(heights[i]));else if(elementDefinition&&elementDefinition.expand)
styles.push('height:'+Math.floor(100/childHtmlList.length)+'%');if(elementDefinition&&elementDefinition.padding!==undefined)
styles.push('padding:'+cssLength(elementDefinition.padding));if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&children[i].align)
styles.push('text-align:'+children[i].align);if(styles.length>0)
html.push('style="',styles.join('; '),'" ');html.push(' class="cke_dialog_ui_vbox_child">',childHtmlList[i],'</td></tr>');}
html.push('</tbody></table>');return html.join('');};CKEDITOR.ui.dialog.uiElement.call(this,dialog,elementDefinition||{type:'vbox'},htmlList,'div',null,{role:'presentation'},innerHTML);}};})();CKEDITOR.ui.dialog.uiElement.prototype={getElement:function(){return CKEDITOR.document.getById(this.domId);},getInputElement:function(){return this.getElement();},getDialog:function(){return this._.dialog;},setValue:function(value,noChangeEvent){this.getInputElement().setValue(value);!noChangeEvent&&this.fire('change',{value:value});return this;},getValue:function(){return this.getInputElement().getValue();},isChanged:function(){return false;},selectParentTab:function(){var element=this.getInputElement(),cursor=element,tabId;while((cursor=cursor.getParent())&&cursor.$.className.search('cke_dialog_page_contents')==-1){}
if(!cursor)
return this;tabId=cursor.getAttribute('name');if(this._.dialog._.currentTabId!=tabId)
this._.dialog.selectPage(tabId);return this;},focus:function(){this.selectParentTab().getInputElement().focus();return this;},registerEvents:function(definition){var regex=/^on([A-Z]\w+)/,match;var registerDomEvent=function(uiElement,dialog,eventName,func){dialog.on('load',function(){uiElement.getInputElement().on(eventName,func,uiElement);});};for(var i in definition){if(!(match=i.match(regex)))
continue;if(this.eventProcessors[i])
this.eventProcessors[i].call(this,this._.dialog,definition[i]);else
registerDomEvent(this,this._.dialog,match[1].toLowerCase(),definition[i]);}
return this;},eventProcessors:{onLoad:function(dialog,func){dialog.on('load',func,this);},onShow:function(dialog,func){dialog.on('show',func,this);},onHide:function(dialog,func){dialog.on('hide',func,this);}},accessKeyDown:function(){this.focus();},accessKeyUp:function(){},disable:function(){var element=this.getElement(),input=this.getInputElement();input.setAttribute('disabled','true');element.addClass('cke_disabled');},enable:function(){var element=this.getElement(),input=this.getInputElement();input.removeAttribute('disabled');element.removeClass('cke_disabled');},isEnabled:function(){return!this.getElement().hasClass('cke_disabled');},isVisible:function(){return this.getInputElement().isVisible();},isFocusable:function(){if(!this.isEnabled()||!this.isVisible())
return false;return true;}};CKEDITOR.ui.dialog.hbox.prototype=CKEDITOR.tools.extend(new CKEDITOR.ui.dialog.uiElement(),{getChild:function(indices){if(arguments.length<1)
return this._.children.concat();if(!indices.splice)
indices=[indices];if(indices.length<2)
return this._.children[indices[0]];else
return(this._.children[indices[0]]&&this._.children[indices[0]].getChild)?this._.children[indices[0]].getChild(indices.slice(1,indices.length)):null;}},true);CKEDITOR.ui.dialog.vbox.prototype=new CKEDITOR.ui.dialog.hbox();(function(){var commonBuilder={build:function(dialog,elementDefinition,output){var children=elementDefinition.children,child,childHtmlList=[],childObjList=[];for(var i=0;(i<children.length&&(child=children[i]));i++){var childHtml=[];childHtmlList.push(childHtml);childObjList.push(CKEDITOR.dialog._.uiElementBuilders[child.type].build(dialog,child,childHtml));}
return new CKEDITOR.ui.dialog[elementDefinition.type](dialog,childObjList,childHtmlList,output,elementDefinition);}};CKEDITOR.dialog.addUIElement('hbox',commonBuilder);CKEDITOR.dialog.addUIElement('vbox',commonBuilder);})();CKEDITOR.dialogCommand=function(dialogName,ext){this.dialogName=dialogName;CKEDITOR.tools.extend(this,ext,true);};CKEDITOR.dialogCommand.prototype={exec:function(editor){editor.openDialog(this.dialogName);},canUndo:false,editorFocus:1};(function(){var notEmptyRegex=/^([a]|[^a])+$/,integerRegex=/^\d*$/,numberRegex=/^\d*(?:\.\d+)?$/,htmlLengthRegex=/^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/,cssLengthRegex=/^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i,inlineStyleRegex=/^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;CKEDITOR.VALIDATE_OR=1;CKEDITOR.VALIDATE_AND=2;CKEDITOR.dialog.validate={functions:function(){var args=arguments;return function(){var value=this&&this.getValue?this.getValue():args[0];var msg,relation=CKEDITOR.VALIDATE_AND,functions=[],i;for(i=0;i<args.length;i++){if(typeof args[i]=='function')
functions.push(args[i]);else
break;}
if(i<args.length&&typeof args[i]=='string'){msg=args[i];i++;}
if(i<args.length&&typeof args[i]=='number')
relation=args[i];var passed=(relation==CKEDITOR.VALIDATE_AND?true:false);for(i=0;i<functions.length;i++){if(relation==CKEDITOR.VALIDATE_AND)
passed=passed&&functions[i](value);else
passed=passed||functions[i](value);}
return!passed?msg:true;};},regex:function(regex,msg){return function(){var value=this&&this.getValue?this.getValue():arguments[0];return!regex.test(value)?msg:true;};},notEmpty:function(msg){return this.regex(notEmptyRegex,msg);},integer:function(msg){return this.regex(integerRegex,msg);},'number':function(msg){return this.regex(numberRegex,msg);},'cssLength':function(msg){return this.functions(function(val){return cssLengthRegex.test(CKEDITOR.tools.trim(val));},msg);},'htmlLength':function(msg){return this.functions(function(val){return htmlLengthRegex.test(CKEDITOR.tools.trim(val));},msg);},'inlineStyle':function(msg){return this.functions(function(val){return inlineStyleRegex.test(CKEDITOR.tools.trim(val));},msg);},equals:function(value,msg){return this.functions(function(val){return val==value;},msg);},notEqual:function(value,msg){return this.functions(function(val){return val!=value;},msg);}};CKEDITOR.on('instanceDestroyed',function(evt){if(CKEDITOR.tools.isEmpty(CKEDITOR.instances)){var currentTopDialog;while((currentTopDialog=CKEDITOR.dialog._.currentTop))
currentTopDialog.hide();removeCovers();}
var dialogs=evt.editor._.storedDialogs;for(var name in dialogs)
dialogs[name].destroy();});})();CKEDITOR.tools.extend(CKEDITOR.editor.prototype,{openDialog:function(dialogName,callback){var dialog=null,dialogDefinitions=CKEDITOR.dialog._.dialogDefinitions[dialogName];if(CKEDITOR.dialog._.currentTop===null)
showCover(this);if(typeof dialogDefinitions=='function'){var storedDialogs=this._.storedDialogs||(this._.storedDialogs={});dialog=storedDialogs[dialogName]||(storedDialogs[dialogName]=new CKEDITOR.dialog(this,dialogName));callback&&callback.call(dialog,dialog);dialog.show();}else if(dialogDefinitions=='failed'){hideCover(this);throw new Error('[CKEDITOR.dialog.openDialog] Dialog "'+dialogName+'" failed when loading definition.');}else if(typeof dialogDefinitions=='string'){CKEDITOR.scriptLoader.load(CKEDITOR.getUrl(dialogDefinitions),function(){var dialogDefinition=CKEDITOR.dialog._.dialogDefinitions[dialogName];if(typeof dialogDefinition!='function')
CKEDITOR.dialog._.dialogDefinitions[dialogName]='failed';this.openDialog(dialogName,callback);},this,0,1);}
CKEDITOR.skin.loadPart('dialog');return dialog;}});})();CKEDITOR.plugins.add('dialog',{requires:'dialogui',init:function(editor){editor.on('doubleclick',function(evt){if(evt.data.dialog)
editor.openDialog(evt.data.dialog);},null,null,999);}});'use strict';(function(){CKEDITOR.plugins.add('clipboard',{requires:'dialog',init:function(editor){var filterType,filtersFactory=filtersFactoryFactory();if(editor.config.forcePasteAsPlainText){filterType='plain-text';}else if(editor.config.pasteFilter){filterType=editor.config.pasteFilter;}
else if(CKEDITOR.env.webkit&&!('pasteFilter'in editor.config)){filterType='semantic-content';}
editor.pasteFilter=filtersFactory.get(filterType);initPasteClipboard(editor);initDragDrop(editor);CKEDITOR.dialog.add('paste',CKEDITOR.getUrl(this.path+'dialogs/paste.js'));editor.on('paste',function(evt){if(!evt.data.dataTransfer){evt.data.dataTransfer=new CKEDITOR.plugins.clipboard.dataTransfer();}
if(evt.data.dataValue){return;}
var dataTransfer=evt.data.dataTransfer,value=dataTransfer.getData('text/html');if(value){evt.data.dataValue=value;evt.data.type='html';}else{value=dataTransfer.getData('text/plain');if(value){evt.data.dataValue=editor.editable().transformPlainTextToHtml(value);evt.data.type='text';}}},null,null,1);editor.on('paste',function(evt){var data=evt.data.dataValue,blockElements=CKEDITOR.dtd.$block;if(data.indexOf('Apple-')>-1){data=data.replace(/<span class="Apple-converted-space">&nbsp;<\/span>/gi,' ');if(evt.data.type!='html'){data=data.replace(/<span class="Apple-tab-span"[^>]*>([^<]*)<\/span>/gi,function(all,spaces){return spaces.replace(/\t/g,'&nbsp;&nbsp; &nbsp;');});}
if(data.indexOf('<br class="Apple-interchange-newline">')>-1){evt.data.startsWithEOL=1;evt.data.preSniffing='html';data=data.replace(/<br class="Apple-interchange-newline">/,'');}
data=data.replace(/(<[^>]+) class="Apple-[^"]*"/gi,'$1');}
if(data.match(/^<[^<]+cke_(editable|contents)/i)){var tmp,editable_wrapper,wrapper=new CKEDITOR.dom.element('div');wrapper.setHtml(data);while(wrapper.getChildCount()==1&&(tmp=wrapper.getFirst())&&tmp.type==CKEDITOR.NODE_ELEMENT&&(tmp.hasClass('cke_editable')||tmp.hasClass('cke_contents'))){wrapper=editable_wrapper=tmp;}
if(editable_wrapper)
data=editable_wrapper.getHtml().replace(/<br>$/i,'');}
if(CKEDITOR.env.ie){data=data.replace(/^&nbsp;(?: |\r\n)?<(\w+)/g,function(match,elementName){if(elementName.toLowerCase()in blockElements){evt.data.preSniffing='html';return'<'+elementName;}
return match;});}else if(CKEDITOR.env.webkit){data=data.replace(/<\/(\w+)><div><br><\/div>$/,function(match,elementName){if(elementName in blockElements){evt.data.endsWithEOL=1;return'</'+elementName+'>';}
return match;});}else if(CKEDITOR.env.gecko){data=data.replace(/(\s)<br>$/,'$1');}
evt.data.dataValue=data;},null,null,3);editor.on('paste',function(evt){var dataObj=evt.data,type=dataObj.type,data=dataObj.dataValue,trueType,defaultType=editor.config.clipboard_defaultContentType||'html',transferType=dataObj.dataTransfer.getTransferType(editor);if(type=='html'||dataObj.preSniffing=='html'){trueType='html';}else{trueType=recogniseContentType(data);}
if(trueType=='htmlifiedtext'){data=htmlifiedTextHtmlification(editor.config,data);}
if(type=='text'&&trueType=='html'){data=filterContent(editor,data,filtersFactory.get('plain-text'));}
else if(transferType==CKEDITOR.DATA_TRANSFER_EXTERNAL&&editor.pasteFilter&&!dataObj.dontFilter){data=filterContent(editor,data,editor.pasteFilter);}
if(dataObj.startsWithEOL){data='<br data-cke-eol="1">'+data;}
if(dataObj.endsWithEOL){data+='<br data-cke-eol="1">';}
if(type=='auto'){type=(trueType=='html'||defaultType=='html')?'html':'text';}
dataObj.type=type;dataObj.dataValue=data;delete dataObj.preSniffing;delete dataObj.startsWithEOL;delete dataObj.endsWithEOL;},null,null,6);editor.on('paste',function(evt){var data=evt.data;if(data.dataValue){editor.insertHtml(data.dataValue,data.type,data.range);setTimeout(function(){editor.fire('afterPaste');},0);}},null,null,1000);editor.on('pasteDialog',function(evt){setTimeout(function(){editor.openDialog('paste',evt.data);},0);});}});function firePasteEvents(editor,data,withBeforePaste){if(!data.type){data.type='auto';}
if(withBeforePaste){if(editor.fire('beforePaste',data)===false)
return false;}
if(!data.dataValue&&data.dataTransfer.isEmpty()){return false;}
if(!data.dataValue){data.dataValue='';}
if(CKEDITOR.env.gecko&&data.method=='drop'&&editor.toolbox){editor.once('afterPaste',function(){editor.toolbox.focus();});}
return editor.fire('paste',data);}
function initPasteClipboard(editor){var clipboard=CKEDITOR.plugins.clipboard,preventBeforePasteEvent=0,preventPasteEvent=0,inReadOnly=0;addListeners();addButtonsCommands();editor.getClipboardData=function(options,callback){var beforePasteNotCanceled=false,dataType='auto',dialogCommited=false;if(!callback){callback=options;options=null;}
editor.on('paste',onPaste,null,null,0);editor.on('beforePaste',onBeforePaste,null,null,1000);if(getClipboardDataDirectly()===false){editor.removeListener('paste',onPaste);if(beforePasteNotCanceled&&editor.fire('pasteDialog',onDialogOpen)){editor.on('pasteDialogCommit',onDialogCommit);editor.on('dialogHide',function(evt){evt.removeListener();evt.data.removeListener('pasteDialogCommit',onDialogCommit);setTimeout(function(){if(!dialogCommited)
callback(null);},10);});}else{callback(null);}}
function onPaste(evt){evt.removeListener();evt.cancel();callback(evt.data);}
function onBeforePaste(evt){evt.removeListener();beforePasteNotCanceled=true;dataType=evt.data.type;}
function onDialogCommit(evt){evt.removeListener();evt.cancel();dialogCommited=true;callback({type:dataType,dataValue:evt.data,method:'paste'});}
function onDialogOpen(){this.customTitle=(options&&options.title);}};function addButtonsCommands(){addButtonCommand('Cut','cut',createCutCopyCmd('cut'),10,1);addButtonCommand('Copy','copy',createCutCopyCmd('copy'),20,4);addButtonCommand('Paste','paste',createPasteCmd(),30,8);function addButtonCommand(buttonName,commandName,command,toolbarOrder,ctxMenuOrder){var lang=editor.lang.clipboard[commandName];editor.addCommand(commandName,command);editor.ui.addButton&&editor.ui.addButton(buttonName,{label:lang,command:commandName,toolbar:'clipboard,'+toolbarOrder});if(editor.addMenuItems){editor.addMenuItem(commandName,{label:lang,command:commandName,group:'clipboard',order:ctxMenuOrder});}}}
function addListeners(){editor.on('key',onKey);editor.on('contentDom',addPasteListenersToEditable);editor.on('selectionChange',function(evt){inReadOnly=evt.data.selection.getRanges()[0].checkReadOnly();setToolbarStates();});if(editor.contextMenu){editor.contextMenu.addListener(function(element,selection){inReadOnly=selection.getRanges()[0].checkReadOnly();return{cut:stateFromNamedCommand('cut'),copy:stateFromNamedCommand('copy'),paste:stateFromNamedCommand('paste')};});}}
function addPasteListenersToEditable(){var editable=editor.editable();if(CKEDITOR.plugins.clipboard.isCustomCopyCutSupported){var initOnCopyCut=function(evt){clipboard.initPasteDataTransfer(evt,editor);evt.data.preventDefault();};editable.on('copy',initOnCopyCut);editable.on('cut',initOnCopyCut);editable.on('cut',function(){editor.extractSelectedHtml();},null,null,999);}
editable.on(clipboard.mainPasteEvent,function(evt){if(clipboard.mainPasteEvent=='beforepaste'&&preventBeforePasteEvent){return;}
pasteDataFromClipboard(evt);});if(clipboard.mainPasteEvent=='beforepaste'){editable.on('paste',function(evt){if(preventPasteEvent){return;}
preventPasteEventNow();evt.data.preventDefault();pasteDataFromClipboard(evt);if(!execIECommand('paste')){editor.openDialog('paste');}});editable.on('contextmenu',preventBeforePasteEventNow,null,null,0);editable.on('beforepaste',function(evt){if(evt.data&&!evt.data.$.ctrlKey&&!evt.data.$.shiftKey)
preventBeforePasteEventNow();},null,null,0);}
editable.on('beforecut',function(){!preventBeforePasteEvent&&fixCut(editor);});var mouseupTimeout;editable.attachListener(CKEDITOR.env.ie?editable:editor.document.getDocumentElement(),'mouseup',function(){mouseupTimeout=setTimeout(function(){setToolbarStates();},0);});editor.on('destroy',function(){clearTimeout(mouseupTimeout);});editable.on('keyup',setToolbarStates);}
function createCutCopyCmd(type){return{type:type,canUndo:type=='cut',startDisabled:true,exec:function(){function tryToCutCopy(type){if(CKEDITOR.env.ie)
return execIECommand(type);try{return editor.document.$.execCommand(type,false,null);}catch(e){return false;}}
this.type=='cut'&&fixCut();var success=tryToCutCopy(this.type);if(!success){editor.showNotification(editor.lang.clipboard[this.type+'Error']);}
return success;}};}
function createPasteCmd(){return{canUndo:false,async:true,exec:function(editor,data){var fire=function(data,withBeforePaste){data&&firePasteEvents(editor,data,!!withBeforePaste);editor.fire('afterCommandExec',{name:'paste',command:cmd,returnValue:!!data});},cmd=this;if(typeof data=='string')
fire({dataValue:data,method:'paste',dataTransfer:clipboard.initPasteDataTransfer()},1);else
editor.getClipboardData(fire);}};}
function preventPasteEventNow(){preventPasteEvent=1;setTimeout(function(){preventPasteEvent=0;},100);}
function preventBeforePasteEventNow(){preventBeforePasteEvent=1;setTimeout(function(){preventBeforePasteEvent=0;},10);}
function execIECommand(command){var doc=editor.document,body=doc.getBody(),enabled=false,onExec=function(){enabled=true;};body.on(command,onExec);if(CKEDITOR.env.version>7){doc.$.execCommand(command);}else{doc.$.selection.createRange().execCommand(command);}
body.removeListener(command,onExec);return enabled;}
function fixCut(){if(!CKEDITOR.env.ie||CKEDITOR.env.quirks)
return;var sel=editor.getSelection(),control,range,dummy;if((sel.getType()==CKEDITOR.SELECTION_ELEMENT)&&(control=sel.getSelectedElement())){range=sel.getRanges()[0];dummy=editor.document.createText('');dummy.insertBefore(control);range.setStartBefore(dummy);range.setEndAfter(control);sel.selectRanges([range]);setTimeout(function(){if(control.getParent()){dummy.remove();sel.selectElement(control);}},0);}}
function getClipboardDataByPastebin(evt,callback){var doc=editor.document,editable=editor.editable(),cancel=function(evt){evt.cancel();},blurListener;if(doc.getById('cke_pastebin'))
return;var sel=editor.getSelection();var bms=sel.createBookmarks();if(CKEDITOR.env.ie)
sel.root.fire('selectionchange');var pastebin=new CKEDITOR.dom.element((CKEDITOR.env.webkit||editable.is('body'))&&!CKEDITOR.env.ie?'body':'div',doc);pastebin.setAttributes({id:'cke_pastebin','data-cke-temp':'1'});var containerOffset=0,offsetParent,win=doc.getWindow();if(CKEDITOR.env.webkit){editable.append(pastebin);pastebin.addClass('cke_editable');if(!editable.is('body')){if(editable.getComputedStyle('position')!='static')
offsetParent=editable;else
offsetParent=CKEDITOR.dom.element.get(editable.$.offsetParent);containerOffset=offsetParent.getDocumentPosition().y;}}else{editable.getAscendant(CKEDITOR.env.ie?'body':'html',1).append(pastebin);}
pastebin.setStyles({position:'absolute',top:(win.getScrollPosition().y-containerOffset+10)+'px',width:'1px',height:Math.max(1,win.getViewPaneSize().height-20)+'px',overflow:'hidden',margin:0,padding:0});if(CKEDITOR.env.safari)
pastebin.setStyles(CKEDITOR.tools.cssVendorPrefix('user-select','text'));var isEditingHost=pastebin.getParent().isReadOnly();if(isEditingHost){pastebin.setOpacity(0);pastebin.setAttribute('contenteditable',true);}
else{pastebin.setStyle(editor.config.contentsLangDirection=='ltr'?'left':'right','-1000px');}
editor.on('selectionChange',cancel,null,null,0);if(CKEDITOR.env.webkit||CKEDITOR.env.gecko)
blurListener=editable.once('blur',cancel,null,null,-100);isEditingHost&&pastebin.focus();var range=new CKEDITOR.dom.range(pastebin);range.selectNodeContents(pastebin);var selPastebin=range.select();if(CKEDITOR.env.ie){blurListener=editable.once('blur',function(){editor.lockSelection(selPastebin);});}
var scrollTop=CKEDITOR.document.getWindow().getScrollPosition().y;setTimeout(function(){if(CKEDITOR.env.webkit)
CKEDITOR.document.getBody().$.scrollTop=scrollTop;blurListener&&blurListener.removeListener();if(CKEDITOR.env.ie)
editable.focus();sel.selectBookmarks(bms);pastebin.remove();var bogusSpan;if(CKEDITOR.env.webkit&&(bogusSpan=pastebin.getFirst())&&(bogusSpan.is&&bogusSpan.hasClass('Apple-style-span')))
pastebin=bogusSpan;editor.removeListener('selectionChange',cancel);callback(pastebin.getHtml());},0);}
function getClipboardDataDirectly(){if(clipboard.mainPasteEvent=='paste'){editor.fire('beforePaste',{type:'auto',method:'paste'});return false;}
editor.focus();preventPasteEventNow();var focusManager=editor.focusManager;focusManager.lock();if(editor.editable().fire(clipboard.mainPasteEvent)&&!execIECommand('paste')){focusManager.unlock();return false;}
focusManager.unlock();return true;}
function onKey(event){if(editor.mode!='wysiwyg')
return;switch(event.data.keyCode){case CKEDITOR.CTRL+86:case CKEDITOR.SHIFT+45:var editable=editor.editable();preventPasteEventNow();if(clipboard.mainPasteEvent=='paste'){editable.fire('beforepaste');}
return;case CKEDITOR.CTRL+88:case CKEDITOR.SHIFT+46:editor.fire('saveSnapshot');setTimeout(function(){editor.fire('saveSnapshot');},50);}}
function pasteDataFromClipboard(evt){var eventData={type:'auto',method:'paste',dataTransfer:clipboard.initPasteDataTransfer(evt)};eventData.dataTransfer.cacheData();var beforePasteNotCanceled=editor.fire('beforePaste',eventData)!==false;if(beforePasteNotCanceled&&clipboard.canClipboardApiBeTrusted(eventData.dataTransfer,editor)){evt.data.preventDefault();setTimeout(function(){firePasteEvents(editor,eventData);},0);}else{getClipboardDataByPastebin(evt,function(data){eventData.dataValue=data.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig,'');beforePasteNotCanceled&&firePasteEvents(editor,eventData);});}}
function setToolbarStates(){if(editor.mode!='wysiwyg')
return;var pasteState=stateFromNamedCommand('paste');editor.getCommand('cut').setState(stateFromNamedCommand('cut'));editor.getCommand('copy').setState(stateFromNamedCommand('copy'));editor.getCommand('paste').setState(pasteState);editor.fire('pasteState',pasteState);}
function stateFromNamedCommand(command){if(inReadOnly&&command in{paste:1,cut:1})
return CKEDITOR.TRISTATE_DISABLED;if(command=='paste')
return CKEDITOR.TRISTATE_OFF;var sel=editor.getSelection(),ranges=sel.getRanges(),selectionIsEmpty=sel.getType()==CKEDITOR.SELECTION_NONE||(ranges.length==1&&ranges[0].collapsed);return selectionIsEmpty?CKEDITOR.TRISTATE_DISABLED:CKEDITOR.TRISTATE_OFF;}}
function recogniseContentType(data){if(CKEDITOR.env.webkit){if(!data.match(/^[^<]*$/g)&&!data.match(/^(<div><br( ?\/)?><\/div>|<div>[^<]*<\/div>)*$/gi))
return'html';}else if(CKEDITOR.env.ie){if(!data.match(/^([^<]|<br( ?\/)?>)*$/gi)&&!data.match(/^(<p>([^<]|<br( ?\/)?>)*<\/p>|(\r\n))*$/gi))
return'html';}else if(CKEDITOR.env.gecko){if(!data.match(/^([^<]|<br( ?\/)?>)*$/gi))
return'html';}else{return'html';}
return'htmlifiedtext';}
function htmlifiedTextHtmlification(config,data){function repeatParagraphs(repeats){return CKEDITOR.tools.repeat('</p><p>',~~(repeats/2))+(repeats%2==1?'<br>':'');}
data=data.replace(/\s+/g,' ').replace(/> +</g,'><').replace(/<br ?\/>/gi,'<br>');data=data.replace(/<\/?[A-Z]+>/g,function(match){return match.toLowerCase();});if(data.match(/^[^<]$/))
return data;if(CKEDITOR.env.webkit&&data.indexOf('<div>')>-1){data=data.replace(/^(<div>(<br>|)<\/div>)(?!$|(<div>(<br>|)<\/div>))/g,'<br>').replace(/^(<div>(<br>|)<\/div>){2}(?!$)/g,'<div></div>');if(data.match(/<div>(<br>|)<\/div>/)){data='<p>'+data.replace(/(<div>(<br>|)<\/div>)+/g,function(match){return repeatParagraphs(match.split('</div><div>').length+1);})+'</p>';}
data=data.replace(/<\/div><div>/g,'<br>');data=data.replace(/<\/?div>/g,'');}
if(CKEDITOR.env.gecko&&config.enterMode!=CKEDITOR.ENTER_BR){if(CKEDITOR.env.gecko)
data=data.replace(/^<br><br>$/,'<br>');if(data.indexOf('<br><br>')>-1){data='<p>'+data.replace(/(<br>){2,}/g,function(match){return repeatParagraphs(match.length/4);})+'</p>';}}
return switchEnterMode(config,data);}
function filtersFactoryFactory(){var filters={};function setUpTags(){var tags={};for(var tag in CKEDITOR.dtd){if(tag.charAt(0)!='$'&&tag!='div'&&tag!='span'){tags[tag]=1;}}
return tags;}
function createSemanticContentFilter(){var filter=new CKEDITOR.filter();filter.allow({$1:{elements:setUpTags(),attributes:true,styles:false,classes:false}});return filter;}
return{get:function(type){if(type=='plain-text'){return filters.plainText||(filters.plainText=new CKEDITOR.filter('br'));}else if(type=='semantic-content'){return filters.semanticContent||(filters.semanticContent=createSemanticContentFilter());}else if(type){return new CKEDITOR.filter(type);}
return null;}};}
function filterContent(editor,data,filter){var fragment=CKEDITOR.htmlParser.fragment.fromHtml(data),writer=new CKEDITOR.htmlParser.basicWriter();filter.applyTo(fragment,true,false,editor.activeEnterMode);fragment.writeHtml(writer);return writer.getHtml();}
function switchEnterMode(config,data){if(config.enterMode==CKEDITOR.ENTER_BR){data=data.replace(/(<\/p><p>)+/g,function(match){return CKEDITOR.tools.repeat('<br>',match.length/7*2);}).replace(/<\/?p>/g,'');}else if(config.enterMode==CKEDITOR.ENTER_DIV){data=data.replace(/<(\/)?p>/g,'<$1div>');}
return data;}
function preventDefaultSetDropEffectToNone(evt){evt.data.preventDefault();evt.data.$.dataTransfer.dropEffect='none';}
function initDragDrop(editor){var clipboard=CKEDITOR.plugins.clipboard;editor.on('contentDom',function(){var editable=editor.editable(),dropTarget=CKEDITOR.plugins.clipboard.getDropTarget(editor),top=editor.ui.space('top'),bottom=editor.ui.space('bottom');clipboard.preventDefaultDropOnElement(top);clipboard.preventDefaultDropOnElement(bottom);editable.attachListener(dropTarget,'dragstart',fireDragEvent);editable.attachListener(editor,'dragstart',clipboard.resetDragDataTransfer,clipboard,null,1);editable.attachListener(editor,'dragstart',function(evt){clipboard.initDragDataTransfer(evt,editor);var dragRange=clipboard.dragRange=editor.getSelection().getRanges()[0];if(CKEDITOR.env.ie&&CKEDITOR.env.version<10){clipboard.dragStartContainerChildCount=dragRange?getContainerChildCount(dragRange.startContainer):null;clipboard.dragEndContainerChildCount=dragRange?getContainerChildCount(dragRange.endContainer):null;}},null,null,2);editable.attachListener(dropTarget,'dragend',fireDragEvent);editable.attachListener(editor,'dragend',clipboard.initDragDataTransfer,clipboard,null,1);editable.attachListener(editor,'dragend',clipboard.resetDragDataTransfer,clipboard,null,100);editable.attachListener(dropTarget,'dragover',function(evt){var target=evt.data.getTarget();if(target&&target.is&&target.is('html')){evt.data.preventDefault();return;}
if(CKEDITOR.env.ie&&CKEDITOR.plugins.clipboard.isFileApiSupported&&evt.data.$.dataTransfer.types.contains('Files')){evt.data.preventDefault();}});editable.attachListener(dropTarget,'drop',function(evt){evt.data.preventDefault();var target=evt.data.getTarget(),readOnly=target.isReadOnly();if(readOnly&&!(target.type==CKEDITOR.NODE_ELEMENT&&target.is('html'))){return;}
var dropRange=clipboard.getRangeAtDropPosition(evt,editor),dragRange=clipboard.dragRange;if(!dropRange){return;}
fireDragEvent(evt,dragRange,dropRange);});editable.attachListener(editor,'drop',clipboard.initDragDataTransfer,clipboard,null,1);editable.attachListener(editor,'drop',function(evt){var data=evt.data;if(!data){return;}
var dropRange=data.dropRange,dragRange=data.dragRange,dataTransfer=data.dataTransfer;if(dataTransfer.getTransferType(editor)==CKEDITOR.DATA_TRANSFER_INTERNAL){setTimeout(function(){clipboard.internalDrop(dragRange,dropRange,dataTransfer,editor);},0);}else if(dataTransfer.getTransferType(editor)==CKEDITOR.DATA_TRANSFER_CROSS_EDITORS){crossEditorDrop(dragRange,dropRange,dataTransfer);}else{externalDrop(dropRange,dataTransfer);}},null,null,9999);function crossEditorDrop(dragRange,dropRange,dataTransfer){dropRange.select();firePasteEvents(editor,{dataTransfer:dataTransfer,method:'drop'},1);dataTransfer.sourceEditor.fire('saveSnapshot');dataTransfer.sourceEditor.editable().extractHtmlFromRange(dragRange);dataTransfer.sourceEditor.getSelection().selectRanges([dragRange]);dataTransfer.sourceEditor.fire('saveSnapshot');}
function externalDrop(dropRange,dataTransfer){dropRange.select();firePasteEvents(editor,{dataTransfer:dataTransfer,method:'drop'},1);clipboard.resetDragDataTransfer();}
function fireDragEvent(evt,dragRange,dropRange){var eventData={$:evt.data.$,target:evt.data.getTarget()};if(dragRange){eventData.dragRange=dragRange;}
if(dropRange){eventData.dropRange=dropRange;}
if(editor.fire(evt.name,eventData)===false){evt.data.preventDefault();}}
function getContainerChildCount(container){if(container.type!=CKEDITOR.NODE_ELEMENT){container=container.getParent();}
return container.getChildCount();}});}
CKEDITOR.plugins.clipboard={isCustomCopyCutSupported:!CKEDITOR.env.ie&&!CKEDITOR.env.iOS,isCustomDataTypesSupported:!CKEDITOR.env.ie,isFileApiSupported:!CKEDITOR.env.ie||CKEDITOR.env.version>9,mainPasteEvent:(CKEDITOR.env.ie&&!CKEDITOR.env.edge)?'beforepaste':'paste',canClipboardApiBeTrusted:function(dataTransfer,editor){if(dataTransfer.getTransferType(editor)!=CKEDITOR.DATA_TRANSFER_EXTERNAL){return true;}
if(CKEDITOR.env.chrome&&!dataTransfer.isEmpty()){return true;}
if(CKEDITOR.env.gecko&&(dataTransfer.getData('text/html')||dataTransfer.getFilesCount())){return true;}
return false;},getDropTarget:function(editor){var editable=editor.editable();if((CKEDITOR.env.ie&&CKEDITOR.env.version<9)||editable.isInline()){return editable;}else{return editor.document;}},fixSplitNodesAfterDrop:function(dragRange,dropRange,preDragStartContainerChildCount,preDragEndContainerChildCount){var dropContainer=dropRange.startContainer;if(typeof preDragEndContainerChildCount!='number'||typeof preDragStartContainerChildCount!='number'){return;}
if(dropContainer.type!=CKEDITOR.NODE_ELEMENT){return;}
if(handleContainer(dragRange.startContainer,dropContainer,preDragStartContainerChildCount)){return;}
if(handleContainer(dragRange.endContainer,dropContainer,preDragEndContainerChildCount)){return;}
function handleContainer(dragContainer,dropContainer,preChildCount){var dragElement=dragContainer;if(dragElement.type==CKEDITOR.NODE_TEXT){dragElement=dragContainer.getParent();}
if(dragElement.equals(dropContainer)&&preChildCount!=dropContainer.getChildCount()){applyFix(dropRange);return true;}}
function applyFix(dropRange){var nodeBefore=dropRange.startContainer.getChild(dropRange.startOffset-1),nodeAfter=dropRange.startContainer.getChild(dropRange.startOffset);if(nodeBefore&&nodeBefore.type==CKEDITOR.NODE_TEXT&&nodeAfter&&nodeAfter.type==CKEDITOR.NODE_TEXT){var offset=nodeBefore.getLength();nodeBefore.setText(nodeBefore.getText()+nodeAfter.getText());nodeAfter.remove();dropRange.setStart(nodeBefore,offset);dropRange.collapse(true);}}},isDropRangeAffectedByDragRange:function(dragRange,dropRange){var dropContainer=dropRange.startContainer,dropOffset=dropRange.endOffset;if(dragRange.endContainer.equals(dropContainer)&&dragRange.endOffset<=dropOffset){return true;}
if(dragRange.startContainer.getParent().equals(dropContainer)&&dragRange.startContainer.getIndex()<dropOffset){return true;}
if(dragRange.endContainer.getParent().equals(dropContainer)&&dragRange.endContainer.getIndex()<dropOffset){return true;}
return false;},internalDrop:function(dragRange,dropRange,dataTransfer,editor){var clipboard=CKEDITOR.plugins.clipboard,editable=editor.editable(),dragBookmark,dropBookmark,isDropRangeAffected;editor.fire('saveSnapshot');editor.fire('lockSnapshot',{dontUpdate:1});if(CKEDITOR.env.ie&&CKEDITOR.env.version<10){this.fixSplitNodesAfterDrop(dragRange,dropRange,clipboard.dragStartContainerChildCount,clipboard.dragEndContainerChildCount);}
isDropRangeAffected=this.isDropRangeAffectedByDragRange(dragRange,dropRange);if(!isDropRangeAffected){dragBookmark=dragRange.createBookmark(false);}
dropBookmark=dropRange.clone().createBookmark(false);if(isDropRangeAffected){dragBookmark=dragRange.createBookmark(false);}
var startNode=dragBookmark.startNode,endNode=dragBookmark.endNode,dropNode=dropBookmark.startNode,dropInsideDragRange=endNode&&startNode.getPosition(dropNode)==CKEDITOR.POSITION_PRECEDING&&endNode.getPosition(dropNode)==CKEDITOR.POSITION_FOLLOWING;if(dropInsideDragRange){editor.getSelection().selectRanges([dropRange]);startNode.remove();endNode.remove();dropNode.remove();}
else{dragRange=editor.createRange();dragRange.moveToBookmark(dragBookmark);editable.extractHtmlFromRange(dragRange,1);dropRange=editor.createRange();dropRange.moveToBookmark(dropBookmark);firePasteEvents(editor,{dataTransfer:dataTransfer,method:'drop',range:dropRange},1);}
editor.fire('unlockSnapshot');},getRangeAtDropPosition:function(dropEvt,editor){var $evt=dropEvt.data.$,x=$evt.clientX,y=$evt.clientY,$range,defaultRange=editor.getSelection(true).getRanges()[0],range=editor.createRange();if(dropEvt.data.testRange)
return dropEvt.data.testRange;if(document.caretRangeFromPoint){$range=editor.document.$.caretRangeFromPoint(x,y);range.setStart(CKEDITOR.dom.node($range.startContainer),$range.startOffset);range.collapse(true);}
else if($evt.rangeParent){range.setStart(CKEDITOR.dom.node($evt.rangeParent),$evt.rangeOffset);range.collapse(true);}
else if(CKEDITOR.env.ie&&CKEDITOR.env.version>8&&defaultRange&&editor.editable().hasFocus){return defaultRange;}
else if(document.body.createTextRange){editor.focus();$range=editor.document.getBody().$.createTextRange();try{var sucess=false;for(var i=0;i<20&&!sucess;i++){if(!sucess){try{$range.moveToPoint(x,y-i);sucess=true;}catch(err){}}
if(!sucess){try{$range.moveToPoint(x,y+i);sucess=true;}catch(err){}}}
if(sucess){var id='cke-temp-'+(new Date()).getTime();$range.pasteHTML('<span id="'+id+'">\u200b</span>');var span=editor.document.getById(id);range.moveToPosition(span,CKEDITOR.POSITION_BEFORE_START);span.remove();}else{var $element=editor.document.$.elementFromPoint(x,y),element=new CKEDITOR.dom.element($element),rect;if(!element.equals(editor.editable())&&element.getName()!='html'){rect=element.getClientRect();if(x<rect.left){range.setStartAt(element,CKEDITOR.POSITION_AFTER_START);range.collapse(true);}else{range.setStartAt(element,CKEDITOR.POSITION_BEFORE_END);range.collapse(true);}}
else if(defaultRange&&defaultRange.startContainer&&!defaultRange.startContainer.equals(editor.editable())){return defaultRange;}else{return null;}}}catch(err){return null;}}else{return null;}
return range;},initDragDataTransfer:function(evt,sourceEditor){var nativeDataTransfer=evt.data.$?evt.data.$.dataTransfer:null,dataTransfer=new this.dataTransfer(nativeDataTransfer,sourceEditor);if(!nativeDataTransfer){if(this.dragData){dataTransfer=this.dragData;}else{this.dragData=dataTransfer;}}else{if(this.dragData&&dataTransfer.id==this.dragData.id){dataTransfer=this.dragData;}else{this.dragData=dataTransfer;}}
evt.data.dataTransfer=dataTransfer;},resetDragDataTransfer:function(){this.dragData=null;},initPasteDataTransfer:function(evt,sourceEditor){if(!this.isCustomCopyCutSupported){return new this.dataTransfer(null,sourceEditor);}else if(evt&&evt.data&&evt.data.$){var dataTransfer=new this.dataTransfer(evt.data.$.clipboardData,sourceEditor);if(this.copyCutData&&dataTransfer.id==this.copyCutData.id){dataTransfer=this.copyCutData;dataTransfer.$=evt.data.$.clipboardData;}else{this.copyCutData=dataTransfer;}
return dataTransfer;}else{return new this.dataTransfer(null,sourceEditor);}},preventDefaultDropOnElement:function(element){element&&element.on('dragover',preventDefaultSetDropEffectToNone);}};var clipboardIdDataType=CKEDITOR.plugins.clipboard.isCustomDataTypesSupported?'cke/id':'Text';CKEDITOR.plugins.clipboard.dataTransfer=function(nativeDataTransfer,editor){if(nativeDataTransfer){this.$=nativeDataTransfer;}
this._={metaRegExp:/^<meta.*?>/,bodyRegExp:/<body(?:[\s\S]*?)>([\s\S]*)<\/body>/,fragmentRegExp:/<!--(?:Start|End)Fragment-->/g,data:{},files:[],normalizeType:function(type){type=type.toLowerCase();if(type=='text'||type=='text/plain'){return'Text';}else if(type=='url'){return'URL';}else{return type;}}};this.id=this.getData(clipboardIdDataType);if(!this.id){if(clipboardIdDataType=='Text'){this.id='';}else{this.id='cke-'+CKEDITOR.tools.getUniqueId();}}
if(clipboardIdDataType!='Text'){try{this.$.setData(clipboardIdDataType,this.id);}catch(err){}}
if(editor){this.sourceEditor=editor;this.setData('text/html',editor.getSelectedHtml(1));if(clipboardIdDataType!='Text'&&!this.getData('text/plain')){this.setData('text/plain',editor.getSelection().getSelectedText());}}};CKEDITOR.DATA_TRANSFER_INTERNAL=1;CKEDITOR.DATA_TRANSFER_CROSS_EDITORS=2;CKEDITOR.DATA_TRANSFER_EXTERNAL=3;CKEDITOR.plugins.clipboard.dataTransfer.prototype={getData:function(type){function isEmpty(data){return data===undefined||data===null||data==='';}
type=this._.normalizeType(type);var data=this._.data[type],result;if(isEmpty(data)){try{data=this.$.getData(type);}catch(e){}}
if(isEmpty(data)){data='';}
if(type=='text/html'){data=data.replace(this._.metaRegExp,'');result=this._.bodyRegExp.exec(data);if(result&&result.length){data=result[1];data=data.replace(this._.fragmentRegExp,'');}}
else if(type=='Text'&&CKEDITOR.env.gecko&&this.getFilesCount()&&data.substring(0,7)=='file://'){data='';}
return data;},setData:function(type,value){type=this._.normalizeType(type);this._.data[type]=value;if(!CKEDITOR.plugins.clipboard.isCustomDataTypesSupported&&type!='URL'&&type!='Text'){return;}
if(clipboardIdDataType=='Text'&&type=='Text'){this.id=value;}
try{this.$.setData(type,value);}catch(e){}},getTransferType:function(targetEditor){if(!this.sourceEditor){return CKEDITOR.DATA_TRANSFER_EXTERNAL;}else if(this.sourceEditor==targetEditor){return CKEDITOR.DATA_TRANSFER_INTERNAL;}else{return CKEDITOR.DATA_TRANSFER_CROSS_EDITORS;}},cacheData:function(){if(!this.$){return;}
var that=this,i,file;function getAndSetData(type){type=that._.normalizeType(type);var data=that.getData(type);if(data){that._.data[type]=data;}}
if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types){for(i=0;i<this.$.types.length;i++){getAndSetData(this.$.types[i]);}}}else{getAndSetData('Text');getAndSetData('URL');}
file=this._getImageFromClipboard();if((this.$&&this.$.files)||file){this._.files=[];for(i=0;i<this.$.files.length;i++){this._.files.push(this.$.files[i]);}
if(this._.files.length===0&&file){this._.files.push(file);}}},getFilesCount:function(){if(this._.files.length){return this._.files.length;}
if(this.$&&this.$.files&&this.$.files.length){return this.$.files.length;}
return this._getImageFromClipboard()?1:0;},getFile:function(i){if(this._.files.length){return this._.files[i];}
if(this.$&&this.$.files&&this.$.files.length){return this.$.files[i];}
return i===0?this._getImageFromClipboard():undefined;},isEmpty:function(){var typesToCheck={},type;if(this.getFilesCount()){return false;}
for(type in this._.data){typesToCheck[type]=1;}
if(this.$){if(CKEDITOR.plugins.clipboard.isCustomDataTypesSupported){if(this.$.types){for(var i=0;i<this.$.types.length;i++){typesToCheck[this.$.types[i]]=1;}}}else{typesToCheck.Text=1;typesToCheck.URL=1;}}
if(clipboardIdDataType!='Text'){typesToCheck[clipboardIdDataType]=0;}
for(type in typesToCheck){if(typesToCheck[type]&&this.getData(type)!==''){return false;}}
return true;},_getImageFromClipboard:function(){var file;if(this.$&&this.$.items&&this.$.items[0]){try{file=this.$.items[0].getAsFile();if(file&&file.type){return file;}}catch(err){}}
return undefined;}};})();(function(){var template='<a id="{id}"'+' class="cke_button cke_button__{name} cke_button_{state} {cls}"'+' title="{title}"'+' tabindex="-1"'+' hidefocus="true"'+' role="button"'+' aria-labelledby="{id}_label"'+' aria-haspopup="{hasArrow}"'+' aria-disabled="{ariaDisabled}"';if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)
template+=' onkeypress="return false;"';if(CKEDITOR.env.gecko)
template+=' onblur="this.style.cssText = this.style.cssText;"';template+=' onkeydown="return CKEDITOR.tools.callFunction({keydownFn},event);"'+' onfocus="return CKEDITOR.tools.callFunction({focusFn},event);" '+
(CKEDITOR.env.ie?'onclick="return false;" onmouseup':'onclick')+'="CKEDITOR.tools.callFunction({clickFn},this);return false;">'+'<span class="cke_button_icon cke_button__{iconName}_icon" style="{style}"';template+='>&nbsp;</span>'+'<span id="{id}_label" class="cke_button_label cke_button__{name}_label" aria-hidden="false">{label}</span>'+'{arrowHtml}'+'</a>';var templateArrow='<span class="cke_button_arrow">'+
(CKEDITOR.env.hc?'&#9660;':'')+'</span>';var btnArrowTpl=CKEDITOR.addTemplate('buttonArrow',templateArrow),btnTpl=CKEDITOR.addTemplate('button',template);CKEDITOR.plugins.add('button',{beforeInit:function(editor){editor.ui.addHandler(CKEDITOR.UI_BUTTON,CKEDITOR.ui.button.handler);}});CKEDITOR.UI_BUTTON='button';CKEDITOR.ui.button=function(definition){CKEDITOR.tools.extend(this,definition,{title:definition.label,click:definition.click||function(editor){editor.execCommand(definition.command);}});this._={};};CKEDITOR.ui.button.handler={create:function(definition){return new CKEDITOR.ui.button(definition);}};CKEDITOR.ui.button.prototype={render:function(editor,output){function updateState(){var mode=editor.mode;if(mode){var state=this.modes[mode]?modeStates[mode]!==undefined?modeStates[mode]:CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED;state=editor.readOnly&&!this.readOnly?CKEDITOR.TRISTATE_DISABLED:state;this.setState(state);if(this.refresh)
this.refresh();}}
var env=CKEDITOR.env,id=this._.id=CKEDITOR.tools.getNextId(),stateName='',command=this.command,clickFn;this._.editor=editor;var instance={id:id,button:this,editor:editor,focus:function(){var element=CKEDITOR.document.getById(id);element.focus();},execute:function(){this.button.click(editor);},attach:function(editor){this.button.attach(editor);}};var keydownFn=CKEDITOR.tools.addFunction(function(ev){if(instance.onkey){ev=new CKEDITOR.dom.event(ev);return(instance.onkey(instance,ev.getKeystroke())!==false);}});var focusFn=CKEDITOR.tools.addFunction(function(ev){var retVal;if(instance.onfocus)
retVal=(instance.onfocus(instance,new CKEDITOR.dom.event(ev))!==false);return retVal;});var selLocked=0;instance.clickFn=clickFn=CKEDITOR.tools.addFunction(function(){if(selLocked){editor.unlockSelection(1);selLocked=0;}
instance.execute();if(env.iOS){editor.focus();}});if(this.modes){var modeStates={};editor.on('beforeModeUnload',function(){if(editor.mode&&this._.state!=CKEDITOR.TRISTATE_DISABLED)
modeStates[editor.mode]=this._.state;},this);editor.on('activeFilterChange',updateState,this);editor.on('mode',updateState,this);!this.readOnly&&editor.on('readOnly',updateState,this);}else if(command){command=editor.getCommand(command);if(command){command.on('state',function(){this.setState(command.state);},this);stateName+=(command.state==CKEDITOR.TRISTATE_ON?'on':command.state==CKEDITOR.TRISTATE_DISABLED?'disabled':'off');}}
if(this.directional){editor.on('contentDirChanged',function(evt){var el=CKEDITOR.document.getById(this._.id),icon=el.getFirst();var pathDir=evt.data;if(pathDir!=editor.lang.dir)
el.addClass('cke_'+pathDir);else
el.removeClass('cke_ltr').removeClass('cke_rtl');icon.setAttribute('style',CKEDITOR.skin.getIconStyle(iconName,pathDir=='rtl',this.icon,this.iconOffset));},this);}
if(!command)
stateName+='off';var name=this.name||this.command,iconName=name;if(this.icon&&!(/\./).test(this.icon)){iconName=this.icon;this.icon=null;}
var params={id:id,name:name,iconName:iconName,label:this.label,cls:this.className||'',state:stateName,ariaDisabled:stateName=='disabled'?'true':'false',title:this.title,titleJs:env.gecko&&!env.hc?'':(this.title||'').replace("'",''),hasArrow:this.hasArrow?'true':'false',keydownFn:keydownFn,focusFn:focusFn,clickFn:clickFn,style:CKEDITOR.skin.getIconStyle(iconName,(editor.lang.dir=='rtl'),this.icon,this.iconOffset),arrowHtml:this.hasArrow?btnArrowTpl.output():''};btnTpl.output(params,output);if(this.onRender)
this.onRender();return instance;},setState:function(state){if(this._.state==state)
return false;this._.state=state;var element=CKEDITOR.document.getById(this._.id);if(element){element.setState(state,'cke_button');state==CKEDITOR.TRISTATE_DISABLED?element.setAttribute('aria-disabled',true):element.removeAttribute('aria-disabled');if(!this.hasArrow){state==CKEDITOR.TRISTATE_ON?element.setAttribute('aria-pressed',true):element.removeAttribute('aria-pressed');}else{var newLabel=state==CKEDITOR.TRISTATE_ON?this._.editor.lang.button.selectedLabel.replace(/%1/g,this.label):this.label;CKEDITOR.document.getById(this._.id+'_label').setText(newLabel);}
return true;}else{return false;}},getState:function(){return this._.state;},toFeature:function(editor){if(this._.feature)
return this._.feature;var feature=this;if(!this.allowedContent&&!this.requiredContent&&this.command)
feature=editor.getCommand(this.command)||feature;return this._.feature=feature;}};CKEDITOR.ui.prototype.addButton=function(name,definition){this.add(name,CKEDITOR.UI_BUTTON,definition);};})();CKEDITOR.plugins.add('panelbutton',{requires:'button',onLoad:function(){function clickFn(editor){var _=this._;if(_.state==CKEDITOR.TRISTATE_DISABLED)
return;this.createPanel(editor);if(_.on){_.panel.hide();return;}
_.panel.showBlock(this._.id,this.document.getById(this._.id),4);}
CKEDITOR.ui.panelButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(definition){var panelDefinition=definition.panel||{};delete definition.panel;this.base(definition);this.document=(panelDefinition.parent&&panelDefinition.parent.getDocument())||CKEDITOR.document;panelDefinition.block={attributes:panelDefinition.attributes};panelDefinition.toolbarRelated=true;this.hasArrow=true;this.click=clickFn;this._={panelDefinition:panelDefinition};},statics:{handler:{create:function(definition){return new CKEDITOR.ui.panelButton(definition);}}},proto:{createPanel:function(editor){var _=this._;if(_.panel)
return;var panelDefinition=this._.panelDefinition,panelBlockDefinition=this._.panelDefinition.block,panelParentElement=panelDefinition.parent||CKEDITOR.document.getBody(),panel=this._.panel=new CKEDITOR.ui.floatPanel(editor,panelParentElement,panelDefinition),block=panel.addBlock(_.id,panelBlockDefinition),me=this;panel.onShow=function(){if(me.className)
this.element.addClass(me.className+'_panel');me.setState(CKEDITOR.TRISTATE_ON);_.on=1;me.editorFocus&&editor.focus();if(me.onOpen)
me.onOpen();};panel.onHide=function(preventOnClose){if(me.className)
this.element.getFirst().removeClass(me.className+'_panel');me.setState(me.modes&&me.modes[editor.mode]?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);_.on=0;if(!preventOnClose&&me.onClose)
me.onClose();};panel.onEscape=function(){panel.hide(1);me.document.getById(_.id).focus();};if(this.onBlock)
this.onBlock(panel,block);block.onHide=function(){_.on=0;me.setState(CKEDITOR.TRISTATE_OFF);};}}});},beforeInit:function(editor){editor.ui.addHandler(CKEDITOR.UI_PANELBUTTON,CKEDITOR.ui.panelButton.handler);}});CKEDITOR.UI_PANELBUTTON='panelbutton';(function(){CKEDITOR.plugins.add('panel',{beforeInit:function(editor){editor.ui.addHandler(CKEDITOR.UI_PANEL,CKEDITOR.ui.panel.handler);}});CKEDITOR.UI_PANEL='panel';CKEDITOR.ui.panel=function(document,definition){if(definition)
CKEDITOR.tools.extend(this,definition);CKEDITOR.tools.extend(this,{className:'',css:[]});this.id=CKEDITOR.tools.getNextId();this.document=document;this.isFramed=this.forceIFrame||this.css.length;this._={blocks:{}};};CKEDITOR.ui.panel.handler={create:function(definition){return new CKEDITOR.ui.panel(definition);}};var panelTpl=CKEDITOR.addTemplate('panel','<div lang="{langCode}" id="{id}" dir={dir}'+' class="cke cke_reset_all {editorId} cke_panel cke_panel {cls} cke_{dir}"'+' style="z-index:{z-index}" role="presentation">'+'{frame}'+'</div>');var frameTpl=CKEDITOR.addTemplate('panel-frame','<iframe id="{id}" class="cke_panel_frame" role="presentation" frameborder="0" src="{src}"></iframe>');var frameDocTpl=CKEDITOR.addTemplate('panel-frame-inner','<!DOCTYPE html>'+'<html class="cke_panel_container {env}" dir="{dir}" lang="{langCode}">'+'<head>{css}</head>'+'<body class="cke_{dir}"'+' style="margin:0;padding:0" onload="{onload}"></body>'+'<\/html>');CKEDITOR.ui.panel.prototype={render:function(editor,output){this.getHolderElement=function(){var holder=this._.holder;if(!holder){if(this.isFramed){var iframe=this.document.getById(this.id+'_frame'),parentDiv=iframe.getParent(),doc=iframe.getFrameDocument();CKEDITOR.env.iOS&&parentDiv.setStyles({'overflow':'scroll','-webkit-overflow-scrolling':'touch'});var onLoad=CKEDITOR.tools.addFunction(CKEDITOR.tools.bind(function(){this.isLoaded=true;if(this.onLoad)
this.onLoad();},this));doc.write(frameDocTpl.output(CKEDITOR.tools.extend({css:CKEDITOR.tools.buildStyleHtml(this.css),onload:'window.parent.CKEDITOR.tools.callFunction('+onLoad+');'},data)));var win=doc.getWindow();win.$.CKEDITOR=CKEDITOR;doc.on('keydown',function(evt){var keystroke=evt.data.getKeystroke(),dir=this.document.getById(this.id).getAttribute('dir');if(this._.onKeyDown&&this._.onKeyDown(keystroke)===false){evt.data.preventDefault();return;}
if(keystroke==27||keystroke==(dir=='rtl'?39:37)){if(this.onEscape&&this.onEscape(keystroke)===false)
evt.data.preventDefault();}},this);holder=doc.getBody();holder.unselectable();CKEDITOR.env.air&&CKEDITOR.tools.callFunction(onLoad);}else{holder=this.document.getById(this.id);}
this._.holder=holder;}
return holder;};var data={editorId:editor.id,id:this.id,langCode:editor.langCode,dir:editor.lang.dir,cls:this.className,frame:'',env:CKEDITOR.env.cssClass,'z-index':editor.config.baseFloatZIndex+1};if(this.isFramed){var src=CKEDITOR.env.air?'javascript:void(0)':CKEDITOR.env.ie?'javascript:void(function(){'+encodeURIComponent('document.open();'+'('+CKEDITOR.tools.fixDomain+')();'+'document.close();')+'}())':'';data.frame=frameTpl.output({id:this.id+'_frame',src:src});}
var html=panelTpl.output(data);if(output)
output.push(html);return html;},addBlock:function(name,block){block=this._.blocks[name]=block instanceof CKEDITOR.ui.panel.block?block:new CKEDITOR.ui.panel.block(this.getHolderElement(),block);if(!this._.currentBlock)
this.showBlock(name);return block;},getBlock:function(name){return this._.blocks[name];},showBlock:function(name){var blocks=this._.blocks,block=blocks[name],current=this._.currentBlock;var holder=!this.forceIFrame||CKEDITOR.env.ie?this._.holder:this.document.getById(this.id+'_frame');if(current)
current.hide();this._.currentBlock=block;CKEDITOR.fire('ariaWidget',holder);block._.focusIndex=-1;this._.onKeyDown=block.onKeyDown&&CKEDITOR.tools.bind(block.onKeyDown,block);block.show();return block;},destroy:function(){this.element&&this.element.remove();}};CKEDITOR.ui.panel.block=CKEDITOR.tools.createClass({$:function(blockHolder,blockDefinition){this.element=blockHolder.append(blockHolder.getDocument().createElement('div',{attributes:{'tabindex':-1,'class':'cke_panel_block'},styles:{display:'none'}}));if(blockDefinition)
CKEDITOR.tools.extend(this,blockDefinition);this.element.setAttributes({'role':this.attributes.role||'presentation','aria-label':this.attributes['aria-label'],'title':this.attributes.title||this.attributes['aria-label']});this.keys={};this._.focusIndex=-1;this.element.disableContextMenu();},_:{markItem:function(index){if(index==-1)
return;var links=this.element.getElementsByTag('a');var item=links.getItem(this._.focusIndex=index);if(CKEDITOR.env.webkit)
item.getDocument().getWindow().focus();item.focus();this.onMark&&this.onMark(item);}},proto:{show:function(){this.element.setStyle('display','');},hide:function(){if(!this.onHide||this.onHide.call(this)!==true)
this.element.setStyle('display','none');},onKeyDown:function(keystroke,noCycle){var keyAction=this.keys[keystroke];switch(keyAction){case'next':var index=this._.focusIndex,links=this.element.getElementsByTag('a'),link;while((link=links.getItem(++index))){if(link.getAttribute('_cke_focus')&&link.$.offsetWidth){this._.focusIndex=index;link.focus();break;}}
if(!link&&!noCycle){this._.focusIndex=-1;return this.onKeyDown(keystroke,1);}
return false;case'prev':index=this._.focusIndex;links=this.element.getElementsByTag('a');while(index>0&&(link=links.getItem(--index))){if(link.getAttribute('_cke_focus')&&link.$.offsetWidth){this._.focusIndex=index;link.focus();break;}
link=null;}
if(!link&&!noCycle){this._.focusIndex=links.count();return this.onKeyDown(keystroke,1);}
return false;case'click':case'mouseup':index=this._.focusIndex;link=index>=0&&this.element.getElementsByTag('a').getItem(index);if(link)
link.$[keyAction]?link.$[keyAction]():link.$['on'+keyAction]();return false;}
return true;}}});})();CKEDITOR.plugins.add('floatpanel',{requires:'panel'});(function(){var panels={};function getPanel(editor,doc,parentElement,definition,level){var key=CKEDITOR.tools.genKey(doc.getUniqueId(),parentElement.getUniqueId(),editor.lang.dir,editor.uiColor||'',definition.css||'',level||''),panel=panels[key];if(!panel){panel=panels[key]=new CKEDITOR.ui.panel(doc,definition);panel.element=parentElement.append(CKEDITOR.dom.element.createFromHtml(panel.render(editor),doc));panel.element.setStyles({display:'none',position:'absolute'});}
return panel;}
CKEDITOR.ui.floatPanel=CKEDITOR.tools.createClass({$:function(editor,parentElement,definition,level){definition.forceIFrame=1;if(definition.toolbarRelated&&editor.elementMode==CKEDITOR.ELEMENT_MODE_INLINE)
parentElement=CKEDITOR.document.getById('cke_'+editor.name);var doc=parentElement.getDocument(),panel=getPanel(editor,doc,parentElement,definition,level||0),element=panel.element,iframe=element.getFirst(),that=this;element.disableContextMenu();this.element=element;this._={editor:editor,panel:panel,parentElement:parentElement,definition:definition,document:doc,iframe:iframe,children:[],dir:editor.lang.dir};editor.on('mode',hide);editor.on('resize',hide);if(!CKEDITOR.env.iOS)
doc.getWindow().on('resize',hide);function hide(){that.hide();}},proto:{addBlock:function(name,block){return this._.panel.addBlock(name,block);},addListBlock:function(name,multiSelect){return this._.panel.addListBlock(name,multiSelect);},getBlock:function(name){return this._.panel.getBlock(name);},showBlock:function(name,offsetParent,corner,offsetX,offsetY,callback){var panel=this._.panel,block=panel.showBlock(name);this.allowBlur(false);var editable=this._.editor.editable();this._.returnFocus=editable.hasFocus?editable:new CKEDITOR.dom.element(CKEDITOR.document.$.activeElement);this._.hideTimeout=0;var element=this.element,iframe=this._.iframe,focused=CKEDITOR.env.ie&&!CKEDITOR.env.edge?iframe:new CKEDITOR.dom.window(iframe.$.contentWindow),doc=element.getDocument(),positionedAncestor=this._.parentElement.getPositionedAncestor(),position=offsetParent.getDocumentPosition(doc),positionedAncestorPosition=positionedAncestor?positionedAncestor.getDocumentPosition(doc):{x:0,y:0},rtl=this._.dir=='rtl',left=position.x+(offsetX||0)-positionedAncestorPosition.x,top=position.y+(offsetY||0)-positionedAncestorPosition.y;if(rtl&&(corner==1||corner==4))
left+=offsetParent.$.offsetWidth;else if(!rtl&&(corner==2||corner==3))
left+=offsetParent.$.offsetWidth-1;if(corner==3||corner==4)
top+=offsetParent.$.offsetHeight-1;this._.panel._.offsetParentId=offsetParent.getId();element.setStyles({top:top+'px',left:0,display:''});element.setOpacity(0);element.getFirst().removeStyle('width');this._.editor.focusManager.add(focused);if(!this._.blurSet){CKEDITOR.event.useCapture=true;focused.on('blur',function(ev){if(!this.allowBlur()||ev.data.getPhase()!=CKEDITOR.EVENT_PHASE_AT_TARGET)
return;if(this.visible&&!this._.activeChild){if(CKEDITOR.env.iOS){if(!this._.hideTimeout)
this._.hideTimeout=CKEDITOR.tools.setTimeout(doHide,0,this);}else{doHide.call(this);}}
function doHide(){delete this._.returnFocus;this.hide();}},this);focused.on('focus',function(){this._.focused=true;this.hideChild();this.allowBlur(true);},this);if(CKEDITOR.env.iOS){focused.on('touchstart',function(){clearTimeout(this._.hideTimeout);},this);focused.on('touchend',function(){this._.hideTimeout=0;this.focus();},this);}
CKEDITOR.event.useCapture=false;this._.blurSet=1;}
panel.onEscape=CKEDITOR.tools.bind(function(keystroke){if(this.onEscape&&this.onEscape(keystroke)===false)
return false;},this);CKEDITOR.tools.setTimeout(function(){var panelLoad=CKEDITOR.tools.bind(function(){var target=element;target.removeStyle('width');if(block.autoSize){var panelDoc=block.element.getDocument();var width=(CKEDITOR.env.webkit?block.element:panelDoc.getBody()).$.scrollWidth;if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&width>0)
width+=(target.$.offsetWidth||0)-(target.$.clientWidth||0)+3;target.setStyle('width',width+'px');var height=block.element.$.scrollHeight;if(CKEDITOR.env.ie&&CKEDITOR.env.quirks&&height>0)
height+=(target.$.offsetHeight||0)-(target.$.clientHeight||0)+3;target.setStyle('height',height+'px');panel._.currentBlock.element.setStyle('display','none').removeStyle('display');}else{target.removeStyle('height');}
if(rtl)
left-=element.$.offsetWidth;element.setStyle('left',left+'px');var panelElement=panel.element,panelWindow=panelElement.getWindow(),rect=element.$.getBoundingClientRect(),viewportSize=panelWindow.getViewPaneSize();var rectWidth=rect.width||rect.right-rect.left,rectHeight=rect.height||rect.bottom-rect.top;var spaceAfter=rtl?rect.right:viewportSize.width-rect.left,spaceBefore=rtl?viewportSize.width-rect.right:rect.left;if(rtl){if(spaceAfter<rectWidth){if(spaceBefore>rectWidth)
left+=rectWidth;else if(viewportSize.width>rectWidth)
left=left-rect.left;else
left=left-rect.right+viewportSize.width;}}else if(spaceAfter<rectWidth){if(spaceBefore>rectWidth)
left=left-rectWidth+offsetParent.$.offsetWidth;else if(viewportSize.width>rectWidth)
left=left-rect.right+viewportSize.width;else
left=left-rect.left;}
var spaceBelow=viewportSize.height-rect.top,spaceAbove=rect.top;if(spaceBelow<rectHeight){if(spaceAbove>rectHeight)
top=top-rectHeight-offsetParent.$.offsetHeight+1;else if(viewportSize.height>rectHeight)
top=top-rect.bottom+viewportSize.height;else
top=top-rect.top;}
if(CKEDITOR.env.ie){var offsetParentIE=new CKEDITOR.dom.element(element.$.offsetParent),scrollParent=offsetParentIE;if(scrollParent.getName()=='html')
scrollParent=scrollParent.getDocument().getBody();if(scrollParent.getComputedStyle('direction')=='rtl'){if(CKEDITOR.env.ie8Compat)
left-=element.getDocument().getDocumentElement().$.scrollLeft*2;else
left-=(offsetParentIE.$.scrollWidth-offsetParentIE.$.clientWidth);}}
var innerElement=element.getFirst(),activePanel;if((activePanel=innerElement.getCustomData('activePanel')))
activePanel.onHide&&activePanel.onHide.call(this,1);innerElement.setCustomData('activePanel',this);element.setStyles({top:top+'px',left:left+'px'});element.setOpacity(1);callback&&callback();},this);panel.isLoaded?panelLoad():panel.onLoad=panelLoad;CKEDITOR.tools.setTimeout(function(){var scrollTop=CKEDITOR.env.webkit&&CKEDITOR.document.getWindow().getScrollPosition().y;this.focus();block.element.focus();if(CKEDITOR.env.webkit)
CKEDITOR.document.getBody().$.scrollTop=scrollTop;this.allowBlur(true);this._.editor.fire('panelShow',this);},0,this);},CKEDITOR.env.air?200:0,this);this.visible=1;if(this.onShow)
this.onShow.call(this);},focus:function(){if(CKEDITOR.env.webkit){var active=CKEDITOR.document.getActive();active&&!active.equals(this._.iframe)&&active.$.blur();}
var focus=this._.lastFocused||this._.iframe.getFrameDocument().getWindow();focus.focus();},blur:function(){var doc=this._.iframe.getFrameDocument(),active=doc.getActive();active&&active.is('a')&&(this._.lastFocused=active);},hide:function(returnFocus){if(this.visible&&(!this.onHide||this.onHide.call(this)!==true)){this.hideChild();CKEDITOR.env.gecko&&this._.iframe.getFrameDocument().$.activeElement.blur();this.element.setStyle('display','none');this.visible=0;this.element.getFirst().removeCustomData('activePanel');var focusReturn=returnFocus&&this._.returnFocus;if(focusReturn){if(CKEDITOR.env.webkit&&focusReturn.type)
focusReturn.getWindow().$.focus();focusReturn.focus();}
delete this._.lastFocused;this._.editor.fire('panelHide',this);}},allowBlur:function(allow){var panel=this._.panel;if(allow!==undefined)
panel.allowBlur=allow;return panel.allowBlur;},showAsChild:function(panel,blockName,offsetParent,corner,offsetX,offsetY){if(this._.activeChild==panel&&panel._.panel._.offsetParentId==offsetParent.getId())
return;this.hideChild();panel.onHide=CKEDITOR.tools.bind(function(){CKEDITOR.tools.setTimeout(function(){if(!this._.focused)
this.hide();},0,this);},this);this._.activeChild=panel;this._.focused=false;panel.showBlock(blockName,offsetParent,corner,offsetX,offsetY);this.blur();if(CKEDITOR.env.ie7Compat||CKEDITOR.env.ie6Compat){setTimeout(function(){panel.element.getChild(0).$.style.cssText+='';},100);}},hideChild:function(restoreFocus){var activeChild=this._.activeChild;if(activeChild){delete activeChild.onHide;delete this._.activeChild;activeChild.hide();restoreFocus&&this.focus();}}}});CKEDITOR.on('instanceDestroyed',function(){var isLastInstance=CKEDITOR.tools.isEmpty(CKEDITOR.instances);for(var i in panels){var panel=panels[i];if(isLastInstance)
panel.destroy();else
panel.element.hide();}
isLastInstance&&(panels={});});})();CKEDITOR.plugins.add('colorbutton',{requires:'panelbutton,floatpanel',init:function(editor){var config=editor.config,lang=editor.lang.colorbutton;var colors=config.colorButton_colors.map(function(color){return color[0]});colors.push('custom1','custom2')
colors.unshift('default')
var iconColors=config.colorButton_colors.map(function(color){return color[1]});iconColors.unshift(null)
var classNames=colors.map(function(color){return config.colorButton_colorClassNamePattern.replace('%s',color)});if(!CKEDITOR.env.hc){addButton('TextColor','fore',lang.textColorTitle,10);}
var customColorRowId=CKEDITOR.tools.getNextId()+'_customColor';var customColorIds={custom1:CKEDITOR.tools.getNextId()+'_customColor',custom2:CKEDITOR.tools.getNextId()+'_customColor'};function addButton(name,type,title,order){if(type==='fore'){var style={'caption div h1 h2 h3 h4 h5 h6 p pre td th li':{propertiesOnly:true,classes:classNames.join(',')}}}else{var style=new CKEDITOR.style(config['colorButton_'+type+'Style'])}
var colorBoxId=CKEDITOR.tools.getNextId()+'_colorBox';editor.on('selectionChange',function(e){var btn=editor.ui.get(name)
var element=CKEDITOR.document.getById(btn._.id);var span=element.find('.cke_button_icon').getItem(0)
if(editor.config.advancedEditor){var computedColor=e.data.selection.getStartElement().getComputedStyle('color')}else{var path=editor.elementPath();var firstBlock=path.block||path.blockLimit;var computedColor=firstBlock.getComputedStyle('color');}
var iconStyles=config.colorButton_iconStyles(computedColor)
span.setStyles(iconStyles)})
editor.ui.add(name,CKEDITOR.UI_PANELBUTTON,{label:'',title:title,modes:{wysiwyg:1},editorFocus:0,toolbar:'colors,'+order,allowedContent:style,requiredContent:style,panel:{css:CKEDITOR.skin.getPath('editor'),attributes:{role:'listbox','aria-label':''}},onBlock:function(panel,block){block.autoSize=true;block.element.addClass('cke_colorblock');block.element.setStyle('width','94px');block.element.setHtml(renderColors(panel,type,colorBoxId));block.element.getDocument().getBody().setStyle('overflow','hidden');CKEDITOR.ui.fire('ready',this);var keys=block.keys;var rtl=editor.lang.dir=='rtl';keys[rtl?37:39]='next';keys[40]='next';keys[9]='next';keys[rtl?39:37]='prev';keys[38]='prev';keys[CKEDITOR.SHIFT+9]='prev';keys[32]='click';},onOpen:function(){var doc=this._.panel._.iframe.getFrameDocument()
var path=editor.elementPath();var firstBlock=path.block||path.blockLimit;var activeItem=doc.find('.cke_coloricon_active').getItem(0)
if(activeItem)activeItem.removeClass('cke_coloricon_active')
var defaultTr=doc.getById('cke_coloricon_default')
defaultTr.hide()
var colorNames=config.colorButton_colors.map(function(color){return color[0]})
colorNames.push('custom1','custom2')
colorNames.some(function(colorName){var colorClass=config.colorButton_colorClassNamePattern.replace('%s',colorName)
if(firstBlock.hasClass(colorClass)){defaultTr.show()
doc.find('.cke_coloricon_'+colorName).getItem(0).addClass('cke_coloricon_active')
return true}})
var customColors=config.colorButton_getCustomColors()
var row=doc.getById(customColorRowId)
if(!customColors){row.hide();return;}
row.show()
doc.getById(customColorIds.custom1).find('.cke_colorbox').getItem(0).setStyle('background-color',customColors[0]);var c2=doc.getById(customColorIds.custom2)
if(!customColors[1]){c2.hide()}else{c2.show()
c2.find('.cke_colorbox').getItem(0).setStyle('background-color',customColors[1]);}}});}
function renderColors(panel,type,colorBoxId){var output=[],classNamePattern=config.colorButton_colorClassNamePattern,moreColorsEnabled=editor.plugins.colordialog&&config.colorButton_enableMore!==false,total=colors.length+(moreColorsEnabled?2:1);var clickFn=CKEDITOR.tools.addFunction(function(color,className,type){if(config.colorButton_clickCustomColorCallback){config.colorButton_clickCustomColorCallback(color)}
var applyColorStyle=arguments.callee;function onColorDialogClose(evt){this.removeListener('ok',onColorDialogClose);this.removeListener('cancel',onColorDialogClose);evt.name=='ok'&&applyColorStyle(this.getContentElement('picker','selectedColor').getValue(),type);}
if(color=='?'){editor.openDialog('colordialog',function(){this.on('ok',onColorDialogClose);this.on('cancel',onColorDialogClose);});return;}
editor.focus();panel.hide();var selection=editor.getSelection();if(!selection){return;}
editor.fire('saveSnapshot');if(editor.config.advancedEditor){var colorStyle=config['colorButton_'+type+'Style'];classNames.map(function(className){editor.removeStyle(new CKEDITOR.style(colorStyle,{className:className}))});if(color){var colorClassName=config.colorButton_colorClassNamePattern.replace('%s',color);colorStyle.childRule=function(element){return!(element.is('a')||element.getElementsByTag('a').count())||isUnstylable(element);};editor.applyStyle(new CKEDITOR.style(colorStyle,{className:colorClassName}));}}else{var range=editor.createRange();range.selectNodeContents(editor.editable());var iterator=range.createIterator();iterator.enlargeBr=true;while(block=iterator.getNextParagraph('p')){if(block.isReadOnly())continue;classNames.forEach(function(name){block.removeClass(name);})
if(color!=="default"){block.addClass(className);}}
editor.forceNextSelectionCheck();}
editor.focus();editor.fire('saveSnapshot');});output.push('<table style="table-layout: fixed; padding: 3px;" role="presentation" cellspacing=0 cellpadding=0>');for(var i=0,len=colors.length;i<len;i++){var colorName=colors[i],textClassName=classNamePattern.replace('%s',colorName),iconClassName='cke_coloricon_'+colorName
if(colorName==='default'){output.push('</tr><tr id="cke_coloricon_default">');}else if(colorName==='custom1'){output.push('</tr><tr id="'+customColorRowId+'">');}else if(colorName!=='custom2'&&i>0&&(i-1)%4===0){output.push('</tr><tr>');}
var colorStyle='';var colorId=''
var td='<td>'
var text=''
switch(colorName){case'default':td='<td colspan="4">'
text='<span class="cke_coloricon_label">USE DEFAULT</span>'
break;case'custom1':var customClickFn=CKEDITOR.tools.addFunction(function(){if(config.colorButton_clickCustomColorLabelCallback){config.colorButton_clickCustomColorLabelCallback()}})
td='<td class="cke_customcolor_label" onclick="CKEDITOR.tools.callFunction('+customClickFn+');" colspan="2">'+editor.lang.colorbutton.custom+'</td><td>'
case'custom2':colorId=' id="'+customColorIds[colorName]+'"';break;default:colorStyle=' style="background: '+iconColors[i]+';"';break;}
output.push(td+'<a class="cke_colorbox" _cke_focus=1 hidefocus=true'+colorId+' onclick="CKEDITOR.tools.callFunction(',clickFn,',\'',colorName,'\',\'',textClassName,'\',\'',type,'\');"'+' role="option" aria-posinset="',(i+2),'" aria-setsize="',total,'">'+'<span class="cke_colorbox ',iconClassName,'"',colorStyle,'></span>'+text+'</a>'+'</td>');}
output.push('</tr></table>');return output.join('');}
function isUnstylable(ele){return(ele.getAttribute('contentEditable')=='false')||ele.getAttribute('data-nostyle');}}});CKEDITOR.config.colorButton_colors=[['white','#fff'],['black','#000']];CKEDITOR.config.colorButton_colorClassNamePattern='%s'
CKEDITOR.config.colorButton_foreStyle={element:'span',attributes:{class:'#(className)'},overrides:[{element:'font',attributes:{'class':null}}]}
CKEDITOR.config.colorButton_backStyle={element:'span',styles:{'background-color':'#(color)'}};CKEDITOR.plugins.add('defaultstyle',{init:function(editor){if(!editor.config.defaultStyle)return;var name=editor.config.defaultStyle;var elem=name==='bold'?'strong':'em';var style=new CKEDITOR.style({element:elem});var executingCmd=false;editor.on('beforeCommandExec',function(ev){if(ev.data.name!==name)return;executingCmd=true;});editor.on('afterCommandExec',function(ev){if(ev.data.name!==name)return;executingCmd=false;});editor.on('change',function(){if(executingCmd||editor.editable().getText().trim())return;editor.applyStyle(style);});editor.on('focus',function(){if(editor.editable().getText().trim())return;setTimeout(function(){editor.applyStyle(style);},0)});}});(function(){var htmlbase='nbsp,gt,lt,amp';var entities='quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,'+'not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,'+'cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,'+'fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,'+'alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,'+'forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,'+'radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,'+'equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,'+'rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,'+'circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,'+'rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,'+'euro';var latin='Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,'+'Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,'+'Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,'+'agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,'+'ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,'+'otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,'+'OElig,oelig,Scaron,scaron,Yuml';var greek='Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,'+'Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,'+'beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,'+'omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,'+'upsih,piv';function buildTable(entities,reverse){var table={},regex=[];var specialTable={nbsp:'\u00A0',shy:'\u00AD',gt:'\u003E',lt:'\u003C',amp:'\u0026',apos:'\u0027',quot:'\u0022'};entities=entities.replace(/\b(nbsp|shy|gt|lt|amp|apos|quot)(?:,|$)/g,function(match,entity){var org=reverse?'&'+entity+';':specialTable[entity],result=reverse?specialTable[entity]:'&'+entity+';';table[org]=result;regex.push(org);return'';});if(!reverse&&entities){entities=entities.split(',');var div=document.createElement('div'),chars;div.innerHTML='&'+entities.join(';&')+';';chars=div.innerHTML;div=null;for(var i=0;i<chars.length;i++){var charAt=chars.charAt(i);table[charAt]='&'+entities[i]+';';regex.push(charAt);}}
table.regex=regex.join(reverse?'|':'');return table;}
CKEDITOR.plugins.add('entities',{afterInit:function(editor){var config=editor.config;function getChar(character){return baseEntitiesTable[character];}
function getEntity(character){return config.entities_processNumerical=='force'||!entitiesTable[character]?'&#'+character.charCodeAt(0)+';':entitiesTable[character];}
var dataProcessor=editor.dataProcessor,htmlFilter=dataProcessor&&dataProcessor.htmlFilter;if(htmlFilter){var selectedEntities=[];if(config.basicEntities!==false)
selectedEntities.push(htmlbase);if(config.entities){if(selectedEntities.length)
selectedEntities.push(entities);if(config.entities_latin)
selectedEntities.push(latin);if(config.entities_greek)
selectedEntities.push(greek);if(config.entities_additional)
selectedEntities.push(config.entities_additional);}
var entitiesTable=buildTable(selectedEntities.join(','));var entitiesRegex=entitiesTable.regex?'['+entitiesTable.regex+']':'a^';delete entitiesTable.regex;if(config.entities&&config.entities_processNumerical)
entitiesRegex='[^ -~]|'+entitiesRegex;entitiesRegex=new RegExp(entitiesRegex,'g');var baseEntitiesTable=buildTable([htmlbase,'shy'].join(','),true),baseEntitiesRegex=new RegExp(baseEntitiesTable.regex,'g');htmlFilter.addRules({text:function(text){return text.replace(baseEntitiesRegex,getChar).replace(entitiesRegex,getEntity);}},{applyToAll:true,excludeNestedEditable:true});}}});})();CKEDITOR.config.basicEntities=true;CKEDITOR.config.entities=true;CKEDITOR.config.entities_latin=true;CKEDITOR.config.entities_greek=true;CKEDITOR.config.entities_additional='#39';(function(){var win=CKEDITOR.document.getWindow(),pixelate=CKEDITOR.tools.cssLength;CKEDITOR.plugins.add('floatingspace',{init:function(editor){editor.on('loaded',function(){attach(this);},null,null,20);}});function scrollOffset(side){var pageOffset=side=='left'?'pageXOffset':'pageYOffset',docScrollOffset=side=='left'?'scrollLeft':'scrollTop';return(pageOffset in win.$)?win.$[pageOffset]:CKEDITOR.document.$.documentElement[docScrollOffset];}
function attach(editor){var config=editor.config,topHtml=editor.fire('uiSpace',{space:'top',html:''}).html,layout=(function(){var mode,editable,spaceRect,editorRect,viewRect,spaceHeight,pageScrollX,dockedOffsetX=config.floatSpaceDockedOffsetX||0,dockedOffsetY=config.floatSpaceDockedOffsetY||0,pinnedOffsetX=config.floatSpacePinnedOffsetX||0,pinnedOffsetY=config.floatSpacePinnedOffsetY||0;function updatePos(pos,prop,val){floatSpace.setStyle(prop,pixelate(val));floatSpace.setStyle('position',pos);}
function changeMode(newMode){var editorPos=editable.getDocumentPosition();switch(newMode){case'top':updatePos('absolute','top',editorPos.y-spaceHeight-dockedOffsetY);break;case'pin':updatePos('fixed','top',pinnedOffsetY+pushedOffsetY);break;case'bottom':updatePos('absolute','top',editorPos.y+(editorRect.height||editorRect.bottom-editorRect.top)+dockedOffsetY);break;}
mode=newMode;}
return function(evt){if(!(editable=editor.editable()))
return;var show=(evt&&evt.name=='focus');if(show){floatSpace.show();}
editor.fire('floatingSpaceLayout',{show:show});floatSpace.removeStyle('left');floatSpace.removeStyle('right');spaceRect=floatSpace.getClientRect();editorRect=editable.getClientRect();viewRect=win.getViewPaneSize();spaceHeight=spaceRect.height;pageScrollX=scrollOffset('left');pushedOffsetY=config.floatSpacePushedOffsetY?config.floatSpacePushedOffsetY():0;if(!mode){mode='pin';changeMode('pin');layout(evt);return;}
if(spaceHeight+dockedOffsetY+pushedOffsetY<=editorRect.top)
changeMode('top');else if(spaceHeight+dockedOffsetY+pushedOffsetY>viewRect.height-editorRect.bottom)
changeMode('pin');else
changeMode('bottom');var alignSide,offset;if(config.floatSpacePreferRight){alignSide='right';}else if(editorRect.left>0&&editorRect.right<viewRect.width&&editorRect.width>spaceRect.width){alignSide=config.contentsLangDirection=='rtl'?'right':'left';}else{alignSide=viewRect.width>spaceRect.width&&editorRect.left+spaceRect.width>viewRect.width?'right':'left';}
if(spaceRect.width>viewRect.width){alignSide='left';offset=0;}
else{if(alignSide=='left'){if(editorRect.left>0)
offset=editorRect.left;else
offset=0;}
else{if(editorRect.right<viewRect.width)
offset=viewRect.width-editorRect.right;else
offset=0;}
if(offset+spaceRect.width>viewRect.width){alignSide=alignSide=='left'?'right':'left';offset=0;}}
var scroll=mode=='pin'?0:alignSide=='left'?pageScrollX:-pageScrollX;floatSpace.setStyle(alignSide,pixelate((mode=='pin'?pinnedOffsetX:dockedOffsetX)+offset+scroll));};})();if(topHtml){var floatSpaceTpl=new CKEDITOR.template('<div'+' id="cke_{name}"'+' class="cke {id} cke_reset_all cke_chrome cke_editor_{name} cke_float cke_{langDir} '+CKEDITOR.env.cssClass+'"'+' dir="{langDir}"'+' title="'+(CKEDITOR.env.gecko?' ':'')+'"'+' lang="{langCode}"'+' role="application"'+' style="{style}"'+
(editor.title?' aria-labelledby="cke_{name}_arialbl"':' ')+'>'+
(editor.title?'<span id="cke_{name}_arialbl" class="cke_voice_label">{voiceLabel}</span>':' ')+'<div class="cke_inner">'+'<div id="{topId}" class="cke_top" role="presentation">{content}</div>'+'</div>'+'</div>'),floatSpace=CKEDITOR.document.getBody().append(CKEDITOR.dom.element.createFromHtml(floatSpaceTpl.output({content:topHtml,id:editor.id,langDir:editor.lang.dir,langCode:editor.langCode,name:editor.name,style:'display:none;z-index:'+(config.baseFloatZIndex-1),topId:editor.ui.spaceId('top'),voiceLabel:editor.title}))),changeBuffer=CKEDITOR.tools.eventsBuffer(500,layout),uiBuffer=CKEDITOR.tools.eventsBuffer(100,layout);floatSpace.unselectable();floatSpace.on('mousedown',function(evt){evt=evt.data;if(!evt.getTarget().hasAscendant('a',1))
evt.preventDefault();});editor.on('focus',function(evt){layout(evt);editor.on('change',changeBuffer.input);win.on('scroll',uiBuffer.input);win.on('resize',uiBuffer.input);});editor.on('blur',function(){floatSpace.hide();editor.removeListener('change',changeBuffer.input);win.removeListener('scroll',uiBuffer.input);win.removeListener('resize',uiBuffer.input);});editor.on('destroy',function(){win.removeListener('scroll',uiBuffer.input);win.removeListener('resize',uiBuffer.input);floatSpace.clearCustomData();floatSpace.remove();});if(editor.focusManager.hasFocus)
floatSpace.show();editor.focusManager.add(floatSpace,1);}}})();CKEDITOR.plugins.add('fontfamily',{init:function(editor){var cmd=new CKEDITOR.command(editor,{exec:function(editor){editor.config.fontfamilyCallback();}});editor.addCommand('fontfamily',cmd);editor.ui.addButton('FontFamily',{label:editor.lang.fontfamily.label,command:'fontfamily',toolbar:'basicstyles'});}});CKEDITOR.plugins.add('menu',{requires:'floatpanel',beforeInit:function(editor){var groups=editor.config.menu_groups.split(','),groupsOrder=editor._.menuGroups={},menuItems=editor._.menuItems={};for(var i=0;i<groups.length;i++)
groupsOrder[groups[i]]=i+1;editor.addMenuGroup=function(name,order){groupsOrder[name]=order||100;};editor.addMenuItem=function(name,definition){if(groupsOrder[definition.group])
menuItems[name]=new CKEDITOR.menuItem(this,name,definition);};editor.addMenuItems=function(definitions){for(var itemName in definitions){this.addMenuItem(itemName,definitions[itemName]);}};editor.getMenuItem=function(name){return menuItems[name];};editor.removeMenuItem=function(name){delete menuItems[name];};}});(function(){var menuItemSource='<span class="cke_menuitem">'+'<a id="{id}"'+' class="cke_menubutton cke_menubutton__{name} cke_menubutton_{state} {cls}"'+' title="{title}"'+' tabindex="-1"'+'_cke_focus=1'+' hidefocus="true"'+' role="{role}"'+' aria-haspopup="{hasPopup}"'+' aria-disabled="{disabled}"'+' {ariaChecked}';if(CKEDITOR.env.gecko&&CKEDITOR.env.mac)
menuItemSource+=' onkeypress="return false;"';if(CKEDITOR.env.gecko)
menuItemSource+=' onblur="this.style.cssText = this.style.cssText;"';menuItemSource+=' onmouseover="CKEDITOR.tools.callFunction({hoverFn},{index});"'+' onmouseout="CKEDITOR.tools.callFunction({moveOutFn},{index});" '+
(CKEDITOR.env.ie?'onclick="return false;" onmouseup':'onclick')+'="CKEDITOR.tools.callFunction({clickFn},{index}); return false;"'+'>';menuItemSource+='<span class="cke_menubutton_inner">'+'<span class="cke_menubutton_icon">'+'<span class="cke_button_icon cke_button__{iconName}_icon" style="{iconStyle}"></span>'+'</span>'+'<span class="cke_menubutton_label">'+'{label}'+'</span>'+'{arrowHtml}'+'</span>'+'</a></span>';var menuArrowSource='<span class="cke_menuarrow">'+'<span>{label}</span>'+'</span>';var menuItemTpl=CKEDITOR.addTemplate('menuItem',menuItemSource),menuArrowTpl=CKEDITOR.addTemplate('menuArrow',menuArrowSource);CKEDITOR.menu=CKEDITOR.tools.createClass({$:function(editor,definition){definition=this._.definition=definition||{};this.id=CKEDITOR.tools.getNextId();this.editor=editor;this.items=[];this._.listeners=[];this._.level=definition.level||1;var panelDefinition=CKEDITOR.tools.extend({},definition.panel,{css:[CKEDITOR.skin.getPath('editor')],level:this._.level-1,block:{}});var attrs=panelDefinition.block.attributes=(panelDefinition.attributes||{});!attrs.role&&(attrs.role='menu');this._.panelDefinition=panelDefinition;},_:{onShow:function(){var selection=this.editor.getSelection(),start=selection&&selection.getStartElement(),path=this.editor.elementPath(),listeners=this._.listeners;this.removeAll();for(var i=0;i<listeners.length;i++){var listenerItems=listeners[i](start,selection,path);if(listenerItems){for(var itemName in listenerItems){var item=this.editor.getMenuItem(itemName);if(item&&(!item.command||this.editor.getCommand(item.command).state)){item.state=listenerItems[itemName];this.add(item);}}}}},onClick:function(item){this.hide();if(item.onClick)
item.onClick();else if(item.command)
this.editor.execCommand(item.command);},onEscape:function(keystroke){var parent=this.parent;if(parent)
parent._.panel.hideChild(1);else if(keystroke==27)
this.hide(1);return false;},onHide:function(){this.onHide&&this.onHide();},showSubMenu:function(index){var menu=this._.subMenu,item=this.items[index],subItemDefs=item.getItems&&item.getItems();if(!subItemDefs){this._.panel.hideChild(1);return;}
if(menu)
menu.removeAll();else{menu=this._.subMenu=new CKEDITOR.menu(this.editor,CKEDITOR.tools.extend({},this._.definition,{level:this._.level+1},true));menu.parent=this;menu._.onClick=CKEDITOR.tools.bind(this._.onClick,this);}
for(var subItemName in subItemDefs){var subItem=this.editor.getMenuItem(subItemName);if(subItem){subItem.state=subItemDefs[subItemName];menu.add(subItem);}}
var element=this._.panel.getBlock(this.id).element.getDocument().getById(this.id+String(index));setTimeout(function(){menu.show(element,2);},0);}},proto:{add:function(item){if(!item.order)
item.order=this.items.length;this.items.push(item);},removeAll:function(){this.items=[];},show:function(offsetParent,corner,offsetX,offsetY){if(!this.parent){this._.onShow();if(!this.items.length)
return;}
corner=corner||(this.editor.lang.dir=='rtl'?2:1);var items=this.items,editor=this.editor,panel=this._.panel,element=this._.element;if(!panel){panel=this._.panel=new CKEDITOR.ui.floatPanel(this.editor,CKEDITOR.document.getBody(),this._.panelDefinition,this._.level);panel.onEscape=CKEDITOR.tools.bind(function(keystroke){if(this._.onEscape(keystroke)===false)
return false;},this);panel.onShow=function(){var holder=panel._.panel.getHolderElement();holder.getParent().addClass('cke').addClass('cke_reset_all');};panel.onHide=CKEDITOR.tools.bind(function(){this._.onHide&&this._.onHide();},this);var block=panel.addBlock(this.id,this._.panelDefinition.block);block.autoSize=true;var keys=block.keys;keys[40]='next';keys[9]='next';keys[38]='prev';keys[CKEDITOR.SHIFT+9]='prev';keys[(editor.lang.dir=='rtl'?37:39)]=CKEDITOR.env.ie?'mouseup':'click';keys[32]=CKEDITOR.env.ie?'mouseup':'click';CKEDITOR.env.ie&&(keys[13]='mouseup');element=this._.element=block.element;var elementDoc=element.getDocument();elementDoc.getBody().setStyle('overflow','hidden');elementDoc.getElementsByTag('html').getItem(0).setStyle('overflow','hidden');this._.itemOverFn=CKEDITOR.tools.addFunction(function(index){clearTimeout(this._.showSubTimeout);this._.showSubTimeout=CKEDITOR.tools.setTimeout(this._.showSubMenu,editor.config.menu_subMenuDelay||400,this,[index]);},this);this._.itemOutFn=CKEDITOR.tools.addFunction(function(){clearTimeout(this._.showSubTimeout);},this);this._.itemClickFn=CKEDITOR.tools.addFunction(function(index){var item=this.items[index];if(item.state==CKEDITOR.TRISTATE_DISABLED){this.hide(1);return;}
if(item.getItems)
this._.showSubMenu(index);else
this._.onClick(item);},this);}
sortItems(items);var path=editor.elementPath(),mixedDirCls=(path&&path.direction()!=editor.lang.dir)?' cke_mixed_dir_content':'';var output=['<div class="cke_menu'+mixedDirCls+'" role="presentation">'];var length=items.length,lastGroup=length&&items[0].group;for(var i=0;i<length;i++){var item=items[i];if(lastGroup!=item.group){output.push('<div class="cke_menuseparator" role="separator"></div>');lastGroup=item.group;}
item.render(this,i,output);}
output.push('</div>');element.setHtml(output.join(''));CKEDITOR.ui.fire('ready',this);if(this.parent)
this.parent._.panel.showAsChild(panel,this.id,offsetParent,corner,offsetX,offsetY);else
panel.showBlock(this.id,offsetParent,corner,offsetX,offsetY);editor.fire('menuShow',[panel]);},addListener:function(listenerFn){this._.listeners.push(listenerFn);},hide:function(returnFocus){this._.onHide&&this._.onHide();this._.panel&&this._.panel.hide(returnFocus);}}});function sortItems(items){items.sort(function(itemA,itemB){if(itemA.group<itemB.group)
return-1;else if(itemA.group>itemB.group)
return 1;return itemA.order<itemB.order?-1:itemA.order>itemB.order?1:0;});}
CKEDITOR.menuItem=CKEDITOR.tools.createClass({$:function(editor,name,definition){CKEDITOR.tools.extend(this,definition,{order:0,className:'cke_menubutton__'+name});this.group=editor._.menuGroups[this.group];this.editor=editor;this.name=name;},proto:{render:function(menu,index,output){var id=menu.id+String(index),state=(typeof this.state=='undefined')?CKEDITOR.TRISTATE_OFF:this.state,ariaChecked='';var stateName=state==CKEDITOR.TRISTATE_ON?'on':state==CKEDITOR.TRISTATE_DISABLED?'disabled':'off';if(this.role in{menuitemcheckbox:1,menuitemradio:1})
ariaChecked=' aria-checked="'+(state==CKEDITOR.TRISTATE_ON?'true':'false')+'"';var hasSubMenu=this.getItems;var arrowLabel='&#'+(this.editor.lang.dir=='rtl'?'9668':'9658')+';';var iconName=this.name;if(this.icon&&!(/\./).test(this.icon))
iconName=this.icon;var params={id:id,name:this.name,iconName:iconName,label:this.label,cls:this.className||'',state:stateName,hasPopup:hasSubMenu?'true':'false',disabled:state==CKEDITOR.TRISTATE_DISABLED,title:this.label,hoverFn:menu._.itemOverFn,moveOutFn:menu._.itemOutFn,clickFn:menu._.itemClickFn,index:index,iconStyle:CKEDITOR.skin.getIconStyle(iconName,(this.editor.lang.dir=='rtl'),iconName==this.icon?null:this.icon,this.iconOffset),arrowHtml:hasSubMenu?menuArrowTpl.output({label:arrowLabel}):'',role:this.role?this.role:'menuitem',ariaChecked:ariaChecked};menuItemTpl.output(params,output);}}});})();CKEDITOR.config.menu_groups='clipboard,'+'form,'+'tablecell,tablecellproperties,tablerow,tablecolumn,table,'+'anchor,link,image,flash,'+'checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div';CKEDITOR.plugins.add('menubutton',{requires:'button,menu',onLoad:function(){var clickFn=function(editor){var _=this._,menu=_.menu;if(_.state===CKEDITOR.TRISTATE_DISABLED)
return;if(_.on&&menu){menu.hide();return;}
_.previousState=_.state;if(!menu){menu=_.menu=new CKEDITOR.menu(editor,{panel:{className:'cke_menu_panel',attributes:{'aria-label':editor.lang.common.options}}});menu.onHide=CKEDITOR.tools.bind(function(){var modes=this.command?editor.getCommand(this.command).modes:this.modes;this.setState(!modes||modes[editor.mode]?_.previousState:CKEDITOR.TRISTATE_DISABLED);_.on=0;},this);if(this.onMenu)
menu.addListener(this.onMenu);}
this.setState(CKEDITOR.TRISTATE_ON);_.on=1;setTimeout(function(){menu.show(CKEDITOR.document.getById(_.id),4);},0);};CKEDITOR.ui.menuButton=CKEDITOR.tools.createClass({base:CKEDITOR.ui.button,$:function(definition){delete definition.panel;this.base(definition);this.hasArrow=true;this.click=clickFn;},statics:{handler:{create:function(definition){return new CKEDITOR.ui.menuButton(definition);}}}});},beforeInit:function(editor){editor.ui.addHandler(CKEDITOR.UI_MENUBUTTON,CKEDITOR.ui.menuButton.handler);}});CKEDITOR.UI_MENUBUTTON='menubutton';CKEDITOR.plugins.add('fontsize',{requires:'menubutton',init:function(editor){function getSize(element){var size=element.getStyle('font-size');if(size.slice(-1)==='%'){return parseInt(size,10);}
return 100;}
function sizeCommand(editor,name,value){this.editor=editor;this.name=name;this.value=value;this.context='p';}
sizeCommand.prototype.exec=function(editor){var selection=editor.getSelection();if(!selection){return;}
var bookmarks=selection.createBookmarks();if(this.editor.config.advancedEditor){var ranges=selection.getRanges()||[];var _this=this;function getBlockContainer(element){var elName=element.getName();var parent=element.getParent(),pName=parent.getName(),isContainer=parent.getAttribute('contenteditable')&&pName==='div'
if(elName==='p'||elName==='li'||isContainer){return element;}else{return getBlockContainer(parent);}}
ranges.map(function(range){var walker=new CKEDITOR.dom.walker(range);var element=walker.next()||range.endPath().elements[0];while(element){if(element.type===CKEDITOR.NODE_TEXT){element=element.getParent();}
element=getBlockContainer(element);if(_this.value){element.setStyle('font-size',_this.value+'%')}
element=walker.next()}})}else{var range=editor.createRange();range.selectNodeContents(editor.editable());var iterator=range.createIterator();iterator.enlargeBr=true;while(block=iterator.getNextParagraph('p')){if(block.isReadOnly())continue;block.removeStyle('font-size');if(this.value!==100){block.setStyle('font-size',this.value+'%');}}}
editor.focus();editor.forceNextSelectionCheck();selection.selectBookmarks(bookmarks);}
var cmdDefs=[{label:editor.lang.fontsize.smaller,name:'fontsizeSmaller',size:60},{label:editor.lang.fontsize.small,name:'fontsizeSmall',size:80},{label:editor.lang.fontsize.normal,name:'fontsizeNormal',size:100},{label:editor.lang.fontsize.large,name:'fontsizeLarge',size:130},{label:editor.lang.fontsize.larger,name:'fontsizeLarger',size:160}];for(var i=0;i<cmdDefs.length;i++){var cmdDef=cmdDefs[i];var cmd=new sizeCommand(editor,cmdDef.name.toLowerCase(),cmdDef.size);editor.addCommand(cmdDef.name.toLowerCase(),cmd);}
var minFontSize=editor.config.minFontSize;editor.ui.add('FontSize',CKEDITOR.UI_MENUBUTTON,{label:editor.lang.fontsize.label,onMenu:function(){var size;var selection=editor.getSelection();if(!selection){size=100;}else{var range=selection.getRanges()[0];var iterator=range.createIterator();iterator.enlargeBr=true;block=iterator.getNextParagraph('p');size=getSize(block);}
var bodySize=parseInt(editor.element.getComputedStyle('font-size'),10);var minPerc=minFontSize/bodySize*100;var items={};for(var i=0;i<cmdDefs.length;i++){var cmdDef=cmdDefs[i];if(!minFontSize||cmdDef.size>=minPerc){items[cmdDef.name]=size===cmdDef.size?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;}}
return items;}});var menuGroup='fontsizeButton';editor.addMenuGroup(menuGroup);var items={};for(var i=0;i<cmdDefs.length;i++){var cmdDef=cmdDefs[i];items[cmdDef.name]={label:cmdDef.label,group:menuGroup,command:cmdDef.name.toLowerCase()};}
editor.addMenuItems(items);}});(function(){'use strict';var TRISTATE_DISABLED=CKEDITOR.TRISTATE_DISABLED,TRISTATE_OFF=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add('indent',{init:function(editor){var genericDefinition=CKEDITOR.plugins.indent.genericDefinition;setupGenericListeners(editor,editor.addCommand('indent',new genericDefinition(true)));setupGenericListeners(editor,editor.addCommand('outdent',new genericDefinition()));if(editor.ui.addButton){editor.ui.addButton('Indent',{label:editor.lang.indent.indent,command:'indent',directional:true,toolbar:'indent,20'});editor.ui.addButton('Outdent',{label:editor.lang.indent.outdent,command:'outdent',directional:true,toolbar:'indent,10'});}
editor.on('dirChanged',function(evt){var range=editor.createRange(),dataNode=evt.data.node;range.setStartBefore(dataNode);range.setEndAfter(dataNode);var walker=new CKEDITOR.dom.walker(range),node;while((node=walker.next())){if(node.type==CKEDITOR.NODE_ELEMENT){if(!node.equals(dataNode)&&node.getDirection()){range.setStartAfter(node);walker=new CKEDITOR.dom.walker(range);continue;}
var classes=editor.config.indentClasses;if(classes){var suffix=(evt.data.dir=='ltr')?['_rtl','']:['','_rtl'];for(var i=0;i<classes.length;i++){if(node.hasClass(classes[i]+suffix[0])){node.removeClass(classes[i]+suffix[0]);node.addClass(classes[i]+suffix[1]);}}}
var marginLeft=node.getStyle('margin-right'),marginRight=node.getStyle('margin-left');marginLeft?node.setStyle('margin-left',marginLeft):node.removeStyle('margin-left');marginRight?node.setStyle('margin-right',marginRight):node.removeStyle('margin-right');}}});}});CKEDITOR.plugins.indent={genericDefinition:function(isIndent){this.isIndent=!!isIndent;this.startDisabled=!this.isIndent;},specificDefinition:function(editor,name,isIndent){this.name=name;this.editor=editor;this.jobs={};this.enterBr=editor.config.enterMode==CKEDITOR.ENTER_BR;this.isIndent=!!isIndent;this.relatedGlobal=isIndent?'indent':'outdent';this.indentKey=isIndent?9:CKEDITOR.SHIFT+9;this.database={};},registerCommands:function(editor,commands){editor.on('pluginsLoaded',function(){for(var name in commands){(function(editor,command){var relatedGlobal=editor.getCommand(command.relatedGlobal);for(var priority in command.jobs){relatedGlobal.on('exec',function(evt){if(evt.data.done)
return;editor.fire('lockSnapshot');if(command.execJob(editor,priority))
evt.data.done=true;editor.fire('unlockSnapshot');CKEDITOR.dom.element.clearAllMarkers(command.database);},this,null,priority);relatedGlobal.on('refresh',function(evt){if(!evt.data.states)
evt.data.states={};evt.data.states[command.name+'@'+priority]=command.refreshJob(editor,priority,evt.data.path);},this,null,priority);}
editor.addFeature(command);})(this,commands[name]);}});}};CKEDITOR.plugins.indent.genericDefinition.prototype={context:'p',exec:function(){}};CKEDITOR.plugins.indent.specificDefinition.prototype={execJob:function(editor,priority){var job=this.jobs[priority];if(job.state!=TRISTATE_DISABLED)
return job.exec.call(this,editor);},refreshJob:function(editor,priority,path){var job=this.jobs[priority];if(!editor.activeFilter.checkFeature(this))
job.state=TRISTATE_DISABLED;else
job.state=job.refresh.call(this,editor,path);return job.state;},getContext:function(path){return path.contains(this.context);}};function setupGenericListeners(editor,command){var selection,bookmarks;command.on('refresh',function(evt){var states=[TRISTATE_DISABLED];for(var s in evt.data.states)
states.push(evt.data.states[s]);this.setState(CKEDITOR.tools.search(states,TRISTATE_OFF)?TRISTATE_OFF:TRISTATE_DISABLED);},command,null,100);command.on('exec',function(evt){selection=editor.getSelection();bookmarks=selection.createBookmarks(1);if(!evt.data)
evt.data={};evt.data.done=false;},command,null,0);command.on('exec',function(){editor.forceNextSelectionCheck();selection.selectBookmarks(bookmarks);},command,null,100);}})();(function(){'use strict';var isNotWhitespaces=CKEDITOR.dom.walker.whitespaces(true),isNotBookmark=CKEDITOR.dom.walker.bookmark(false,true),TRISTATE_DISABLED=CKEDITOR.TRISTATE_DISABLED,TRISTATE_OFF=CKEDITOR.TRISTATE_OFF;CKEDITOR.plugins.add('indentlist',{requires:'indent',init:function(editor){var globalHelpers=CKEDITOR.plugins.indent;globalHelpers.registerCommands(editor,{indentlist:new commandDefinition(editor,'indentlist',true),outdentlist:new commandDefinition(editor,'outdentlist')});function commandDefinition(editor){globalHelpers.specificDefinition.apply(this,arguments);this.requiredContent=['ul','ol'];editor.on('key',function(evt){if(editor.mode!='wysiwyg')
return;if(evt.data.keyCode==this.indentKey){var list=this.getContext(editor.elementPath());if(list){if(this.isIndent&&CKEDITOR.plugins.indentList.firstItemInPath(this.context,editor.elementPath(),list))
return;editor.execCommand(this.relatedGlobal);evt.cancel();}}},this);this.jobs[this.isIndent?10:30]={refresh:this.isIndent?function(editor,path){var list=this.getContext(path),inFirstListItem=CKEDITOR.plugins.indentList.firstItemInPath(this.context,path,list);if(!list||!this.isIndent||inFirstListItem)
return TRISTATE_DISABLED;return TRISTATE_OFF;}:function(editor,path){var list=this.getContext(path);if(!list||this.isIndent)
return TRISTATE_DISABLED;return TRISTATE_OFF;},exec:CKEDITOR.tools.bind(indentList,this)};}
CKEDITOR.tools.extend(commandDefinition.prototype,globalHelpers.specificDefinition.prototype,{context:{ol:1,ul:1}});}});function indentList(editor){var that=this,database=this.database,context=this.context;function indent(listNode){var startContainer=range.startContainer,endContainer=range.endContainer;while(startContainer&&!startContainer.getParent().equals(listNode))
startContainer=startContainer.getParent();while(endContainer&&!endContainer.getParent().equals(listNode))
endContainer=endContainer.getParent();if(!startContainer||!endContainer)
return false;var block=startContainer,itemsToMove=[],stopFlag=false;while(!stopFlag){if(block.equals(endContainer))
stopFlag=true;itemsToMove.push(block);block=block.getNext();}
if(itemsToMove.length<1)
return false;var listParents=listNode.getParents(true);for(var i=0;i<listParents.length;i++){if(listParents[i].getName&&context[listParents[i].getName()]){listNode=listParents[i];break;}}
var indentOffset=that.isIndent?1:-1,startItem=itemsToMove[0],lastItem=itemsToMove[itemsToMove.length-1],listArray=CKEDITOR.plugins.list.listToArray(listNode,database),baseIndent=listArray[lastItem.getCustomData('listarray_index')].indent;for(i=startItem.getCustomData('listarray_index');i<=lastItem.getCustomData('listarray_index');i++){listArray[i].indent+=indentOffset;if(indentOffset>0){var listRoot=listArray[i].parent;listArray[i].parent=new CKEDITOR.dom.element(listRoot.getName(),listRoot.getDocument());}}
for(i=lastItem.getCustomData('listarray_index')+1;i<listArray.length&&listArray[i].indent>baseIndent;i++)
listArray[i].indent+=indentOffset;var newList=CKEDITOR.plugins.list.arrayToList(listArray,database,null,editor.config.enterMode,listNode.getDirection());if(!that.isIndent){var parentLiElement;if((parentLiElement=listNode.getParent())&&parentLiElement.is('li')){var children=newList.listNode.getChildren(),pendingLis=[],count=children.count(),child;for(i=count-1;i>=0;i--){if((child=children.getItem(i))&&child.is&&child.is('li'))
pendingLis.push(child);}}}
if(newList)
newList.listNode.replace(listNode);if(pendingLis&&pendingLis.length){for(i=0;i<pendingLis.length;i++){var li=pendingLis[i],followingList=li;while((followingList=followingList.getNext())&&followingList.is&&followingList.getName()in context){if(CKEDITOR.env.needsNbspFiller&&!li.getFirst(neitherWhitespacesNorBookmark))
li.append(range.document.createText('\u00a0'));li.append(followingList);}
li.insertAfter(parentLiElement);}}
if(newList)
editor.fire('contentDomInvalidated');return true;}
var selection=editor.getSelection(),ranges=selection&&selection.getRanges(),iterator=ranges.createIterator(),range;while((range=iterator.getNextRange())){var nearestListBlock=range.getCommonAncestor();while(nearestListBlock&&!(nearestListBlock.type==CKEDITOR.NODE_ELEMENT&&context[nearestListBlock.getName()])){if(editor.editable().equals(nearestListBlock)){nearestListBlock=false;break;}
nearestListBlock=nearestListBlock.getParent();}
if(!nearestListBlock){if((nearestListBlock=range.startPath().contains(context)))
range.setEndAt(nearestListBlock,CKEDITOR.POSITION_BEFORE_END);}
if(!nearestListBlock){var selectedNode=range.getEnclosedNode();if(selectedNode&&selectedNode.type==CKEDITOR.NODE_ELEMENT&&selectedNode.getName()in context){range.setStartAt(selectedNode,CKEDITOR.POSITION_AFTER_START);range.setEndAt(selectedNode,CKEDITOR.POSITION_BEFORE_END);nearestListBlock=selectedNode;}}
if(nearestListBlock&&range.startContainer.type==CKEDITOR.NODE_ELEMENT&&range.startContainer.getName()in context){var walker=new CKEDITOR.dom.walker(range);walker.evaluator=listItem;range.startContainer=walker.next();}
if(nearestListBlock&&range.endContainer.type==CKEDITOR.NODE_ELEMENT&&range.endContainer.getName()in context){walker=new CKEDITOR.dom.walker(range);walker.evaluator=listItem;range.endContainer=walker.previous();}
if(nearestListBlock)
return indent(nearestListBlock);}
return 0;}
function listItem(node){return node.type==CKEDITOR.NODE_ELEMENT&&node.is('li');}
function neitherWhitespacesNorBookmark(node){return isNotWhitespaces(node)&&isNotBookmark(node);}
CKEDITOR.plugins.indentList={};CKEDITOR.plugins.indentList.firstItemInPath=function(query,path,list){var firstListItemInPath=path.contains(listItem);if(!list)
list=path.contains(query);return list&&firstListItemInPath&&firstListItemInPath.equals(list.getFirst(listItem));};})();(function(){function getAlignment(element,useComputedState){useComputedState=useComputedState===undefined||useComputedState;var align;if(useComputedState)
align=element.getComputedStyle('text-align');else{while(!element.hasAttribute||!(element.hasAttribute('align')||element.getStyle('text-align'))){var parent=element.getParent();if(!parent)
break;element=parent;}
align=element.getStyle('text-align')||element.getAttribute('align')||'';}
align&&(align=align.replace(/(?:-(?:moz|webkit)-)?(?:start|auto)/i,''));!align&&useComputedState&&(align=element.getComputedStyle('direction')=='rtl'?'right':'left');return align;}
function justifyCommand(editor,name,value){this.editor=editor;this.name=name;this.value=value;this.context='p';var classes=editor.config.justifyClasses,blockTag=editor.config.enterMode==CKEDITOR.ENTER_P?'p':'div';if(classes){switch(value){case'left':this.cssClassName=classes[0];break;case'center':this.cssClassName=classes[1];break;case'right':this.cssClassName=classes[2];break;case'justify':this.cssClassName=classes[3];break;}
this.cssClassRegex=new RegExp('(?:^|\\s+)(?:'+classes.join('|')+')(?=$|\\s)');this.requiredContent=blockTag+'('+this.cssClassName+')';}
else{this.requiredContent=blockTag+'{text-align}';}
this.allowedContent={'caption div h1 h2 h3 h4 h5 h6 p pre td th li':{propertiesOnly:true,styles:this.cssClassName?null:'text-align',classes:this.cssClassName||null}};if(editor.config.enterMode==CKEDITOR.ENTER_BR)
this.allowedContent.div=true;}
function onDirChanged(e){var editor=e.editor;var range=editor.createRange();range.setStartBefore(e.data.node);range.setEndAfter(e.data.node);var walker=new CKEDITOR.dom.walker(range),node;while((node=walker.next())){if(node.type==CKEDITOR.NODE_ELEMENT){if(!node.equals(e.data.node)&&node.getDirection()){range.setStartAfter(node);walker=new CKEDITOR.dom.walker(range);continue;}
var classes=editor.config.justifyClasses;if(classes){if(node.hasClass(classes[0])){node.removeClass(classes[0]);node.addClass(classes[2]);}
else if(node.hasClass(classes[2])){node.removeClass(classes[2]);node.addClass(classes[0]);}}
var style='text-align';var align=node.getStyle(style);if(align=='left')
node.setStyle(style,'right');else if(align=='right')
node.setStyle(style,'left');}}}
justifyCommand.prototype={exec:function(editor){var selection=editor.getSelection(),enterMode=editor.config.enterMode;if(!selection)
return;var bookmarks=selection.createBookmarks(),ranges=selection.getRanges();var cssClassName=this.cssClassName,iterator,block;var useComputedState=editor.config.useComputedState;useComputedState=useComputedState===undefined||useComputedState;for(var i=ranges.length-1;i>=0;i--){iterator=ranges[i].createIterator();iterator.enlargeBr=enterMode!=CKEDITOR.ENTER_BR;while((block=iterator.getNextParagraph(enterMode==CKEDITOR.ENTER_P?'p':'div'))){if(block.isReadOnly())
continue;block.removeAttribute('align');block.removeStyle('text-align');var className=cssClassName&&(block.$.className=CKEDITOR.tools.ltrim(block.$.className.replace(this.cssClassRegex,'')));var apply=(this.state==CKEDITOR.TRISTATE_OFF)&&(!useComputedState||(getAlignment(block,true)!=this.value));if(cssClassName){if(apply)
block.addClass(cssClassName);else if(!className)
block.removeAttribute('class');}else if(apply){block.setStyle('text-align',this.value);}}}
editor.focus();editor.forceNextSelectionCheck();selection.selectBookmarks(bookmarks);},refresh:function(editor,path){var firstBlock=path.block||path.blockLimit;this.setState(firstBlock.getName()!='body'&&getAlignment(firstBlock,this.editor.config.useComputedState)==this.value?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);}};function renderJustifyGroupBlock(){var editor=this;var reHtml='<table style="table-layout: fixed;overflow: hidden;">';var clickFn=CKEDITOR.tools.addFunction(function(type){switch(type){case'left':editor.execCommand('justifyleft');break;case'center':editor.execCommand('justifycenter');break;case'right':editor.execCommand('justifyright');break;case'justify':editor.execCommand('justifyblock');break;}})
var leftStyle=CKEDITOR.skin.getIconStyle('justifyleft',false),rightStyle=CKEDITOR.skin.getIconStyle('justifyright',false),centerStyle=CKEDITOR.skin.getIconStyle('justifycenter',false),justifyStyle=CKEDITOR.skin.getIconStyle('justifyblock',false);reHtml+='<tr><td><a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'left\')" data-align="left"><span class="cke_button_icon cke_button__justifyleft_icon" style="'+leftStyle+'"></span></a>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'center\')" data-align="center"><span class="cke_button_icon cke_button__justifycenter_icon" style="'+centerStyle+'"></span></a>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'right\')" data-align="right"><span class="cke_button_icon cke_button__justifyright_icon" style="'+rightStyle+'"></span></a>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'justify\')" data-align="justify"><span class="cke_button_icon cke_button__justifyblock_icon" style="'+justifyStyle+'"></span></a><td><tr></table>'
return reHtml}
function getElementAlignment(el){var alignment=el.getComputedStyle('text-align')
return alignment==='justify'?'block':alignment}
function onSelectionChange(toolbarName,blockEl){var editor=this;var el=editor.getSelection().getStartElement();var elAlignment=getElementAlignment(el);var btn=editor.ui.get(toolbarName);var element=CKEDITOR.document.getById(btn._.id);var span=element.find('.cke_button_icon').getItem(0);var cla='justify'+elAlignment,style=CKEDITOR.skin.getIconStyle('justify'+elAlignment,false);span.setAttributes({'style':style,'class':'cke_button_icon cke_button__'+cla+'_icon',})
if(blockEl.el){var btns=blockEl.el.find('a.cke_button')
for(var i=0,len=btns.count();i<len;i++){btns.getItem(i).removeClass('cke_button_on').addClass('cke_button_off')}
blockEl.el.findOne('a[data-align='+(elAlignment==='block'?'justify':elAlignment)+']').addClass('cke_button_on')}}
CKEDITOR.plugins.add('justify',{init:function(editor){if(editor.blockless)
return;var blockEl={};var toolbarName='JustifyGroup';var left=new justifyCommand(editor,'justifyleft','left'),center=new justifyCommand(editor,'justifycenter','center'),right=new justifyCommand(editor,'justifyright','right'),justify=new justifyCommand(editor,'justifyblock','justify');editor.addCommand('justifyleft',left);editor.addCommand('justifycenter',center);editor.addCommand('justifyright',right);editor.addCommand('justifyblock',justify);if(editor.config.redesignedTextEditor){editor.on('selectionChange',onSelectionChange.bind(editor,toolbarName,blockEl));}
if(editor.ui.addButton){if(editor.config.redesignedTextEditor){editor.ui.add(toolbarName,CKEDITOR.UI_PANELBUTTON,{label:'',modes:{wysiwyg:1},toolbar:'justify,50',editorFocus:0,panel:{css:CKEDITOR.skin.getPath('editor'),attributes:{role:'justifybox','aria-label':''}},onBlock:function(panel,block){blockEl.el=block.element;block.autoSize=true;block.element.addClass('cke_justifygroupblock');block.element.setStyle('width','122px');block.element.setHtml(renderJustifyGroupBlock.call(editor));block.element.getDocument().getBody().setStyle('overflow','hidden');CKEDITOR.ui.fire('ready',this);onSelectionChange.call(editor,toolbarName,blockEl);}})}
editor.ui.addButton('JustifyLeft',{label:editor.lang.justify.left,command:'justifyleft',toolbar:'align,10'});editor.ui.addButton('JustifyCenter',{label:editor.lang.justify.center,command:'justifycenter',toolbar:'align,20'});editor.ui.addButton('JustifyRight',{label:editor.lang.justify.right,command:'justifyright',toolbar:'align,30'});editor.ui.addButton('JustifyBlock',{label:editor.lang.justify.block,command:'justifyblock',toolbar:'align,40'});}
editor.on('dirChanged',onDirChanged);}});})();(function(){var cssStyle=CKEDITOR.htmlParser.cssStyle,cssLength=CKEDITOR.tools.cssLength;var cssLengthRegex=/^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i;function replaceCssLength(length1,length2){var parts1=cssLengthRegex.exec(length1),parts2=cssLengthRegex.exec(length2);if(parts1){if(!parts1[2]&&parts2[2]=='px')
return parts2[1];if(parts1[2]=='px'&&!parts2[2])
return parts2[1]+'px';}
return length2;}
var htmlFilterRules={elements:{$:function(element){var attributes=element.attributes,realHtml=attributes&&attributes['data-cke-realelement'],realFragment=realHtml&&new CKEDITOR.htmlParser.fragment.fromHtml(decodeURIComponent(realHtml)),realElement=realFragment&&realFragment.children[0];if(realElement&&element.attributes['data-cke-resizable']){var styles=new cssStyle(element).rules,realAttrs=realElement.attributes,width=styles.width,height=styles.height;width&&(realAttrs.width=replaceCssLength(realAttrs.width,width));height&&(realAttrs.height=replaceCssLength(realAttrs.height,height));}
return realElement;}}};CKEDITOR.plugins.add('fakeobjects',{init:function(editor){editor.filter.allow('img[!data-cke-realelement,src,alt,title](*){*}','fakeobjects');},afterInit:function(editor){var dataProcessor=editor.dataProcessor,htmlFilter=dataProcessor&&dataProcessor.htmlFilter;if(htmlFilter){htmlFilter.addRules(htmlFilterRules,{applyToAll:true});}}});CKEDITOR.editor.prototype.createFakeElement=function(realElement,className,realElementType,isResizable){var lang=this.lang.fakeobjects,label=lang[realElementType]||lang.unknown;var attributes={'class':className,'data-cke-realelement':encodeURIComponent(realElement.getOuterHtml()),'data-cke-real-node-type':realElement.type,alt:label,title:label,align:realElement.getAttribute('align')||''};if(!CKEDITOR.env.hc)
attributes.src=CKEDITOR.tools.transparentImageData;if(realElementType)
attributes['data-cke-real-element-type']=realElementType;if(isResizable){attributes['data-cke-resizable']=isResizable;var fakeStyle=new cssStyle();var width=realElement.getAttribute('width'),height=realElement.getAttribute('height');width&&(fakeStyle.rules.width=cssLength(width));height&&(fakeStyle.rules.height=cssLength(height));fakeStyle.populate(attributes);}
return this.document.createElement('img',{attributes:attributes});};CKEDITOR.editor.prototype.createFakeParserElement=function(realElement,className,realElementType,isResizable){var lang=this.lang.fakeobjects,label=lang[realElementType]||lang.unknown,html;var writer=new CKEDITOR.htmlParser.basicWriter();realElement.writeHtml(writer);html=writer.getHtml();var attributes={'class':className,'data-cke-realelement':encodeURIComponent(html),'data-cke-real-node-type':realElement.type,alt:label,title:label,align:realElement.attributes.align||''};if(!CKEDITOR.env.hc)
attributes.src=CKEDITOR.tools.transparentImageData;if(realElementType)
attributes['data-cke-real-element-type']=realElementType;if(isResizable){attributes['data-cke-resizable']=isResizable;var realAttrs=realElement.attributes,fakeStyle=new cssStyle();var width=realAttrs.width,height=realAttrs.height;width!==undefined&&(fakeStyle.rules.width=cssLength(width));height!==undefined&&(fakeStyle.rules.height=cssLength(height));fakeStyle.populate(attributes);}
return new CKEDITOR.htmlParser.element('img',attributes);};CKEDITOR.editor.prototype.restoreRealElement=function(fakeElement){if(fakeElement.data('cke-real-node-type')!=CKEDITOR.NODE_ELEMENT)
return null;var element=CKEDITOR.dom.element.createFromHtml(decodeURIComponent(fakeElement.data('cke-realelement')),this.document);if(fakeElement.data('cke-resizable')){var width=fakeElement.getStyle('width'),height=fakeElement.getStyle('height');width&&element.setAttribute('width',replaceCssLength(element.getAttribute('width'),width));height&&element.setAttribute('height',replaceCssLength(element.getAttribute('height'),height));}
return element;};})();'use strict';(function(){CKEDITOR.plugins.add('link',{requires:'dialog,fakeobjects',onLoad:function(){var iconPath=CKEDITOR.getUrl(this.path+'images'+(CKEDITOR.env.hidpi?'/hidpi':'')+'/anchor.png'),baseStyle='background:url('+iconPath+') no-repeat %1 center;border:1px dotted #00f;background-size:16px;';var template='.%2 a.cke_anchor,'+'.%2 a.cke_anchor_empty'+',.cke_editable.%2 a[name]'+',.cke_editable.%2 a[data-cke-saved-name]'+'{'+
baseStyle+'padding-%1:18px;'+'cursor:auto;'+'}'+'.%2 img.cke_anchor'+'{'+
baseStyle+'width:16px;'+'min-height:15px;'+'height:1.15em;'+'vertical-align:text-bottom;'+'}';function cssWithDir(dir){return template.replace(/%1/g,dir=='rtl'?'right':'left').replace(/%2/g,'cke_contents_'+dir);}
CKEDITOR.addCss(cssWithDir('ltr')+cssWithDir('rtl'));},init:function(editor){var allowed='a[!href]',required='a[href]';if(CKEDITOR.dialog.isTabEnabled(editor,'link','advanced'))
allowed=allowed.replace(']',',accesskey,charset,dir,id,lang,name,rel,tabindex,title,type]{*}(*)');if(CKEDITOR.dialog.isTabEnabled(editor,'link','target'))
allowed=allowed.replace(']',',target,onclick]');editor.addCommand('link',new CKEDITOR.dialogCommand('link',{allowedContent:allowed,requiredContent:required,contextSensitive:true,refresh:function(editor,path){var state=path.contains('a')?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF;this.setState(state);return true;}}));editor.addCommand('anchor',new CKEDITOR.dialogCommand('anchor',{allowedContent:'a[!name,id]',requiredContent:'a[name]'}));editor.addCommand('unlink',new CKEDITOR.unlinkCommand());editor.addCommand('removeAnchor',new CKEDITOR.removeAnchorCommand());editor.setKeystroke(CKEDITOR.CTRL+76,'link');if(editor.ui.addButton){editor.ui.addButton('Link',{label:editor.lang.link.toolbar,command:'link',toolbar:'links,10'});editor.ui.addButton('Unlink',{label:editor.lang.link.unlink,command:'unlink',toolbar:'links,20'});editor.ui.addButton('Anchor',{label:editor.lang.link.anchor.toolbar,command:'anchor',toolbar:'links,30'});}
CKEDITOR.dialog.add('link',this.path+'dialogs/link.js');CKEDITOR.dialog.add('anchor',this.path+'dialogs/anchor.js');editor.on('doubleclick',function(evt){var element=CKEDITOR.plugins.link.getSelectedLink(editor)||evt.data.element;if(!element.isReadOnly()){if(element.is('a')){evt.data.dialog=(element.getAttribute('name')&&(!element.getAttribute('href')||!element.getChildCount()))?'anchor':'link';evt.data.link=element;}else if(CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor,element)){evt.data.dialog='anchor';}}},null,null,0);editor.on('doubleclick',function(evt){if(evt.data.dialog in{link:1,anchor:1}&&evt.data.link)
editor.getSelection().selectElement(evt.data.link);},null,null,20);if(editor.addMenuItems){editor.addMenuItems({anchor:{label:editor.lang.link.anchor.menu,command:'anchor',group:'anchor',order:1},removeAnchor:{label:editor.lang.link.anchor.remove,command:'removeAnchor',group:'anchor',order:5},link:{label:editor.lang.link.menu,command:'link',group:'link',order:1},unlink:{label:editor.lang.link.unlink,command:'unlink',group:'link',order:5}});}
if(editor.contextMenu){editor.contextMenu.addListener(function(element){if(!element||element.isReadOnly())
return null;var anchor=CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor,element);if(!anchor&&!(anchor=CKEDITOR.plugins.link.getSelectedLink(editor)))
return null;var menu={};if(anchor.getAttribute('href')&&anchor.getChildCount())
menu={link:CKEDITOR.TRISTATE_OFF,unlink:CKEDITOR.TRISTATE_OFF};if(anchor&&anchor.hasAttribute('name'))
menu.anchor=menu.removeAnchor=CKEDITOR.TRISTATE_OFF;return menu;});}
this.compiledProtectionFunction=getCompiledProtectionFunction(editor);},afterInit:function(editor){editor.dataProcessor.dataFilter.addRules({elements:{a:function(element){if(!element.attributes.name)
return null;if(!element.children.length)
return editor.createFakeParserElement(element,'cke_anchor','anchor');return null;}}});var pathFilters=editor._.elementsPath&&editor._.elementsPath.filters;if(pathFilters){pathFilters.push(function(element,name){if(name=='a'){if(CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor,element)||(element.getAttribute('name')&&(!element.getAttribute('href')||!element.getChildCount())))
return'anchor';}});}}});var javascriptProtocolRegex=/^javascript:/,emailRegex=/^mailto:([^?]+)(?:\?(.+))?$/,emailSubjectRegex=/subject=([^;?:@&=$,\/]*)/,emailBodyRegex=/body=([^;?:@&=$,\/]*)/,anchorRegex=/^#(.*)$/,urlRegex=/^((?:http|https|ftp|news):\/\/)?(.*)$/,selectableTargets=/^(_(?:self|top|parent|blank))$/,encodedEmailLinkRegex=/^javascript:void\(location\.href='mailto:'\+String\.fromCharCode\(([^)]+)\)(?:\+'(.*)')?\)$/,functionCallProtectedEmailLinkRegex=/^javascript:([^(]+)\(([^)]+)\)$/,popupRegex=/\s*window.open\(\s*this\.href\s*,\s*(?:'([^']*)'|null)\s*,\s*'([^']*)'\s*\)\s*;\s*return\s*false;*\s*/,popupFeaturesRegex=/(?:^|,)([^=]+)=(\d+|yes|no)/gi;function unescapeSingleQuote(str){return str.replace(/\\'/g,'\'');}
function escapeSingleQuote(str){return str.replace(/'/g,'\\$&');}
function protectEmailAddressAsEncodedString(address){var charCode,length=address.length,encodedChars=[];for(var i=0;i<length;i++){charCode=address.charCodeAt(i);encodedChars.push(charCode);}
return'String.fromCharCode('+encodedChars.join(',')+')';}
function protectEmailLinkAsFunction(editor,email){var plugin=editor.plugins.link,name=plugin.compiledProtectionFunction.name,params=plugin.compiledProtectionFunction.params,paramName,paramValue,retval;retval=[name,'('];for(var i=0;i<params.length;i++){paramName=params[i].toLowerCase();paramValue=email[paramName];i>0&&retval.push(',');retval.push('\'',paramValue?escapeSingleQuote(encodeURIComponent(email[paramName])):'','\'');}
retval.push(')');return retval.join('');}
function getCompiledProtectionFunction(editor){var emailProtection=editor.config.emailProtection||'',compiledProtectionFunction;if(emailProtection&&emailProtection!='encode'){compiledProtectionFunction={};emailProtection.replace(/^([^(]+)\(([^)]+)\)$/,function(match,funcName,params){compiledProtectionFunction.name=funcName;compiledProtectionFunction.params=[];params.replace(/[^,\s]+/g,function(param){compiledProtectionFunction.params.push(param);});});}
return compiledProtectionFunction;}
CKEDITOR.plugins.link={getSelectedLink:function(editor){var selection=editor.getSelection();var selectedElement=selection.getSelectedElement();if(selectedElement&&selectedElement.is('a'))
return selectedElement;var range=selection.getRanges()[0];if(range){range.shrink(CKEDITOR.SHRINK_TEXT);return editor.elementPath(range.getCommonAncestor()).contains('a',1);}
return null;},getEditorAnchors:function(editor){var editable=editor.editable(),scope=(editable.isInline()&&!editor.plugins.divarea)?editor.document:editable,links=scope.getElementsByTag('a'),imgs=scope.getElementsByTag('img'),anchors=[],i=0,item;while((item=links.getItem(i++))){if(item.data('cke-saved-name')||item.hasAttribute('name')){anchors.push({name:item.data('cke-saved-name')||item.getAttribute('name'),id:item.getAttribute('id')});}}
i=0;while((item=imgs.getItem(i++))){if((item=this.tryRestoreFakeAnchor(editor,item))){anchors.push({name:item.getAttribute('name'),id:item.getAttribute('id')});}}
return anchors;},fakeAnchor:true,tryRestoreFakeAnchor:function(editor,element){if(element&&element.data('cke-real-element-type')&&element.data('cke-real-element-type')=='anchor'){var link=editor.restoreRealElement(element);if(link.data('cke-saved-name'))
return link;}},parseLinkAttributes:function(editor,element){var href=(element&&(element.data('cke-saved-href')||element.getAttribute('href')))||'',compiledProtectionFunction=editor.plugins.link.compiledProtectionFunction,emailProtection=editor.config.emailProtection,javascriptMatch,emailMatch,anchorMatch,urlMatch,retval={};if((javascriptMatch=href.match(javascriptProtocolRegex))){if(emailProtection=='encode'){href=href.replace(encodedEmailLinkRegex,function(match,protectedAddress,rest){return'mailto:'+
String.fromCharCode.apply(String,protectedAddress.split(','))+
(rest&&unescapeSingleQuote(rest));});}
else if(emailProtection){href.replace(functionCallProtectedEmailLinkRegex,function(match,funcName,funcArgs){if(funcName==compiledProtectionFunction.name){retval.type='email';var email=retval.email={};var paramRegex=/[^,\s]+/g,paramQuoteRegex=/(^')|('$)/g,paramsMatch=funcArgs.match(paramRegex),paramsMatchLength=paramsMatch.length,paramName,paramVal;for(var i=0;i<paramsMatchLength;i++){paramVal=decodeURIComponent(unescapeSingleQuote(paramsMatch[i].replace(paramQuoteRegex,'')));paramName=compiledProtectionFunction.params[i].toLowerCase();email[paramName]=paramVal;}
email.address=[email.name,email.domain].join('@');}});}}
var newTab=false;if(element){var target=element.getAttribute('target');newTab=target==='_blank';}
if(!retval.type){if((emailMatch=href.match(emailRegex))){var subjectMatch=href.match(emailSubjectRegex),bodyMatch=href.match(emailBodyRegex);retval.type='email';var email=(retval.email={});email.address=emailMatch[1];subjectMatch&&(email.subject=decodeURIComponent(subjectMatch[1]));bodyMatch&&(email.body=decodeURIComponent(bodyMatch[1]));}
else if(href){if(/^https?:\/\/[^.]+\.strikinglycdn\.com/.test(href)){retval.type='document';retval.document={};retval.document.url=href;retval.document.openInNewTab=newTab;}else{retval.type='url';retval.web={};retval.web.url=href;retval.web.openInNewTab=newTab;}}}
return retval;},getLinkAttributes:function(editor,data){var emailProtection=editor.config.emailProtection||'',set={};switch(data.type){case'url':var url=(data.web&&CKEDITOR.tools.trim(data.web.url))||'';if(!/^#|^(http|https|ftp|mailto|tel|fb|skype|itms-services|javascript|sms|irc):/i.test(url))url='http://'+url;set['data-cke-saved-href']=url;break;case'anchor':var name=(data.anchor&&data.anchor.name),id=(data.anchor&&data.anchor.id);set['data-cke-saved-href']='#'+(name||id||'');break;case'document':var url=(data.document&&CKEDITOR.tools.trim(data.document.url))||'';set['data-cke-saved-href']=url;break;case'email':var email=data.email,address=email.address,linkHref;switch(emailProtection){case'':case'encode':var subject=encodeURIComponent(email.subject||''),body=encodeURIComponent(email.body||''),argList=[];subject&&argList.push('subject='+subject);body&&argList.push('body='+body);argList=argList.length?'?'+argList.join('&'):'';if(emailProtection=='encode'){linkHref=['javascript:void(location.href=\'mailto:\'+',protectEmailAddressAsEncodedString(address)];argList&&linkHref.push('+\'',escapeSingleQuote(argList),'\'');linkHref.push(')');}else{linkHref=['mailto:',address,argList];}
break;default:var nameAndDomain=address.split('@',2);email.name=nameAndDomain[0];email.domain=nameAndDomain[1];linkHref=['javascript:',protectEmailLinkAsFunction(editor,email)];}
set['data-cke-saved-href']=linkHref.join('');break;}
var newTab=data.web.openInNewTab||data.document.openInNewTab
if(newTab){set.target='_blank';}
if(set['data-cke-saved-href'])
set.href=set['data-cke-saved-href'];var removed={target:1,onclick:1,'data-cke-pa-onclick':1,'data-cke-saved-name':1};for(var s in set)
delete removed[s];return{set:set,removed:CKEDITOR.tools.objectKeys(removed)};}};CKEDITOR.unlinkCommand=function(){};CKEDITOR.unlinkCommand.prototype={exec:function(editor){var style=new CKEDITOR.style({element:'a',type:CKEDITOR.STYLE_INLINE,alwaysRemoveElement:1});editor.removeStyle(style);},refresh:function(editor,path){var element=path.lastElement&&path.lastElement.getAscendant('a',true);if(element&&element.getName()=='a'&&element.getAttribute('href')&&element.getChildCount())
this.setState(CKEDITOR.TRISTATE_OFF);else
this.setState(CKEDITOR.TRISTATE_DISABLED);},contextSensitive:1,startDisabled:1,requiredContent:'a[href]'};CKEDITOR.removeAnchorCommand=function(){};CKEDITOR.removeAnchorCommand.prototype={exec:function(editor){var sel=editor.getSelection(),bms=sel.createBookmarks(),anchor;if(sel&&(anchor=sel.getSelectedElement())&&(!anchor.getChildCount()?CKEDITOR.plugins.link.tryRestoreFakeAnchor(editor,anchor):anchor.is('a')))
anchor.remove(1);else{if((anchor=CKEDITOR.plugins.link.getSelectedLink(editor))){if(anchor.hasAttribute('href')){anchor.removeAttributes({name:1,'data-cke-saved-name':1});anchor.removeClass('cke_anchor');}else{anchor.remove(1);}}}
sel.selectBookmarks(bms);},requiredContent:'a[name]'};CKEDITOR.tools.extend(CKEDITOR.config,{linkShowAdvancedTab:true,linkShowTargetTab:true});})();(function(){var listNodeNames={ol:1,ul:1};var whitespaces=CKEDITOR.dom.walker.whitespaces(),bookmarks=CKEDITOR.dom.walker.bookmark(),nonEmpty=function(node){return!(whitespaces(node)||bookmarks(node));},blockBogus=CKEDITOR.dom.walker.bogus();function cleanUpDirection(element){var dir,parent,parentDir;if((dir=element.getDirection())){parent=element.getParent();while(parent&&!(parentDir=parent.getDirection()))
parent=parent.getParent();if(dir==parentDir)
element.removeAttribute('dir');}}
function inheritInlineStyles(parent,el){var style=parent.getAttribute('style');style&&el.setAttribute('style',style.replace(/([^;])$/,'$1;')+(el.getAttribute('style')||''));}
CKEDITOR.plugins.list={listToArray:function(listNode,database,baseArray,baseIndentLevel,grandparentNode){if(!listNodeNames[listNode.getName()])
return[];if(!baseIndentLevel)
baseIndentLevel=0;if(!baseArray)
baseArray=[];for(var i=0,count=listNode.getChildCount();i<count;i++){var listItem=listNode.getChild(i);if(listItem.type==CKEDITOR.NODE_ELEMENT&&listItem.getName()in CKEDITOR.dtd.$list)
CKEDITOR.plugins.list.listToArray(listItem,database,baseArray,baseIndentLevel+1);if(listItem.$.nodeName.toLowerCase()!='li')
continue;var itemObj={'parent':listNode,indent:baseIndentLevel,element:listItem,contents:[]};if(!grandparentNode){itemObj.grandparent=listNode.getParent();if(itemObj.grandparent&&itemObj.grandparent.$.nodeName.toLowerCase()=='li')
itemObj.grandparent=itemObj.grandparent.getParent();}else{itemObj.grandparent=grandparentNode;}
if(database)
CKEDITOR.dom.element.setMarker(database,listItem,'listarray_index',baseArray.length);baseArray.push(itemObj);for(var j=0,itemChildCount=listItem.getChildCount(),child;j<itemChildCount;j++){child=listItem.getChild(j);if(child.type==CKEDITOR.NODE_ELEMENT&&listNodeNames[child.getName()])
CKEDITOR.plugins.list.listToArray(child,database,baseArray,baseIndentLevel+1,itemObj.grandparent);else
itemObj.contents.push(child);}}
return baseArray;},arrayToList:function(listArray,database,baseIndex,paragraphMode,dir){if(!baseIndex)
baseIndex=0;if(!listArray||listArray.length<baseIndex+1)
return null;var i,doc=listArray[baseIndex].parent.getDocument(),retval=new CKEDITOR.dom.documentFragment(doc),rootNode=null,currentIndex=baseIndex,indentLevel=Math.max(listArray[baseIndex].indent,0),currentListItem=null,orgDir,block,paragraphName=(paragraphMode==CKEDITOR.ENTER_P?'p':'div');while(1){var item=listArray[currentIndex],itemGrandParent=item.grandparent;orgDir=item.element.getDirection(1);if(item.indent==indentLevel){if(!rootNode||listArray[currentIndex].parent.getName()!=rootNode.getName()){rootNode=listArray[currentIndex].parent.clone(false,1);dir&&rootNode.setAttribute('dir',dir);retval.append(rootNode);}
currentListItem=rootNode.append(item.element.clone(0,1));if(orgDir!=rootNode.getDirection(1))
currentListItem.setAttribute('dir',orgDir);for(i=0;i<item.contents.length;i++)
currentListItem.append(item.contents[i].clone(1,1));currentIndex++;}else if(item.indent==Math.max(indentLevel,0)+1){var currDir=listArray[currentIndex-1].element.getDirection(1),listData=CKEDITOR.plugins.list.arrayToList(listArray,null,currentIndex,paragraphMode,currDir!=orgDir?orgDir:null);if(!currentListItem.getChildCount()&&CKEDITOR.env.needsNbspFiller&&doc.$.documentMode<=7)
currentListItem.append(doc.createText('\xa0'));currentListItem.append(listData.listNode);currentIndex=listData.nextIndex;}else if(item.indent==-1&&!baseIndex&&itemGrandParent){if(listNodeNames[itemGrandParent.getName()]){currentListItem=item.element.clone(false,true);if(orgDir!=itemGrandParent.getDirection(1))
currentListItem.setAttribute('dir',orgDir);}else{currentListItem=new CKEDITOR.dom.documentFragment(doc);}
var dirLoose=itemGrandParent.getDirection(1)!=orgDir,li=item.element,className=li.getAttribute('class'),style=li.getAttribute('style');var needsBlock=currentListItem.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&(paragraphMode!=CKEDITOR.ENTER_BR||dirLoose||style||className);var child,count=item.contents.length,cachedBookmark;for(i=0;i<count;i++){child=item.contents[i];if(bookmarks(child)&&count>1){if(!needsBlock)
currentListItem.append(child.clone(1,1));else
cachedBookmark=child.clone(1,1);}
else if(child.type==CKEDITOR.NODE_ELEMENT&&child.isBlockBoundary()){if(dirLoose&&!child.getDirection())
child.setAttribute('dir',orgDir);inheritInlineStyles(li,child);className&&child.addClass(className);block=null;if(cachedBookmark){currentListItem.append(cachedBookmark);cachedBookmark=null;}
currentListItem.append(child.clone(1,1));}
else if(needsBlock){if(!block){block=doc.createElement(paragraphName);currentListItem.append(block);dirLoose&&block.setAttribute('dir',orgDir);}
style&&block.setAttribute('style',style);className&&block.setAttribute('class',className);if(cachedBookmark){block.append(cachedBookmark);cachedBookmark=null;}
block.append(child.clone(1,1));}
else{currentListItem.append(child.clone(1,1));}}
if(cachedBookmark){(block||currentListItem).append(cachedBookmark);cachedBookmark=null;}
if(currentListItem.type==CKEDITOR.NODE_DOCUMENT_FRAGMENT&&currentIndex!=listArray.length-1){var last;if(CKEDITOR.env.needsBrFiller){last=currentListItem.getLast();if(last&&last.type==CKEDITOR.NODE_ELEMENT&&last.is('br'))
last.remove();}
last=currentListItem.getLast(nonEmpty);if(!(last&&last.type==CKEDITOR.NODE_ELEMENT&&last.is(CKEDITOR.dtd.$block)))
currentListItem.append(doc.createElement('br'));}
var currentListItemName=currentListItem.$.nodeName.toLowerCase();if(currentListItemName=='div'||currentListItemName=='p'){currentListItem.appendBogus();}
retval.append(currentListItem);rootNode=null;currentIndex++;}else{return null;}
block=null;if(listArray.length<=currentIndex||Math.max(listArray[currentIndex].indent,0)<indentLevel)
break;}
if(database){var currentNode=retval.getFirst();while(currentNode){if(currentNode.type==CKEDITOR.NODE_ELEMENT){CKEDITOR.dom.element.clearMarkers(database,currentNode);if(currentNode.getName()in CKEDITOR.dtd.$listItem)
cleanUpDirection(currentNode);}
currentNode=currentNode.getNextSourceNode();}}
return{listNode:retval,nextIndex:currentIndex};}};function changeListType(editor,groupObj,database,listsCreated){var listArray=CKEDITOR.plugins.list.listToArray(groupObj.root,database),selectedListItems=[];for(var i=0;i<groupObj.contents.length;i++){var itemNode=groupObj.contents[i];itemNode=itemNode.getAscendant('li',true);if(!itemNode||itemNode.getCustomData('list_item_processed'))
continue;selectedListItems.push(itemNode);CKEDITOR.dom.element.setMarker(database,itemNode,'list_item_processed',true);}
var root=groupObj.root,doc=root.getDocument(),listNode,newListNode;for(i=0;i<selectedListItems.length;i++){var listIndex=selectedListItems[i].getCustomData('listarray_index');listNode=listArray[listIndex].parent;if(!listNode.is(this.type)){newListNode=doc.createElement(this.type);listNode.copyAttributes(newListNode,{start:1,type:1});newListNode.removeStyle('list-style-type');listArray[listIndex].parent=newListNode;}}
var newList=CKEDITOR.plugins.list.arrayToList(listArray,database,null,editor.config.enterMode);var child,length=newList.listNode.getChildCount();for(i=0;i<length&&(child=newList.listNode.getChild(i));i++){if(child.getName()==this.type)
listsCreated.push(child);}
newList.listNode.replace(groupObj.root);editor.fire('contentDomInvalidated');}
function createList(editor,groupObj,listsCreated){var contents=groupObj.contents,doc=groupObj.root.getDocument(),listContents=[];if(contents.length==1&&contents[0].equals(groupObj.root)){var divBlock=doc.createElement('div');contents[0].moveChildren&&contents[0].moveChildren(divBlock);contents[0].append(divBlock);contents[0]=divBlock;}
var commonParent=groupObj.contents[0].getParent();for(var i=0;i<contents.length;i++)
commonParent=commonParent.getCommonAncestor(contents[i].getParent());var useComputedState=editor.config.useComputedState,listDir,explicitDirection;useComputedState=useComputedState===undefined||useComputedState;for(i=0;i<contents.length;i++){var contentNode=contents[i],parentNode;while((parentNode=contentNode.getParent())){if(parentNode.equals(commonParent)){listContents.push(contentNode);if(!explicitDirection&&contentNode.getDirection())
explicitDirection=1;var itemDir=contentNode.getDirection(useComputedState);if(listDir!==null){if(listDir&&listDir!=itemDir)
listDir=null;else
listDir=itemDir;}
break;}
contentNode=parentNode;}}
if(listContents.length<1)
return;var insertAnchor=listContents[listContents.length-1].getNext(),listNode=doc.createElement(this.type);listsCreated.push(listNode);var contentBlock,listItem;while(listContents.length){contentBlock=listContents.shift();listItem=doc.createElement('li');if(shouldPreserveBlock(contentBlock))
contentBlock.appendTo(listItem);else{contentBlock.copyAttributes(listItem);if(listDir&&contentBlock.getDirection()){listItem.removeStyle('direction');listItem.removeAttribute('dir');}
contentBlock.moveChildren(listItem);contentBlock.remove();}
listItem.appendTo(listNode);}
if(listDir&&explicitDirection)
listNode.setAttribute('dir',listDir);if(insertAnchor)
listNode.insertBefore(insertAnchor);else
listNode.appendTo(commonParent);}
function removeList(editor,groupObj,database){var listArray=CKEDITOR.plugins.list.listToArray(groupObj.root,database),selectedListItems=[];for(var i=0;i<groupObj.contents.length;i++){var itemNode=groupObj.contents[i];itemNode=itemNode.getAscendant('li',true);if(!itemNode||itemNode.getCustomData('list_item_processed'))
continue;selectedListItems.push(itemNode);CKEDITOR.dom.element.setMarker(database,itemNode,'list_item_processed',true);}
var lastListIndex=null;for(i=0;i<selectedListItems.length;i++){var listIndex=selectedListItems[i].getCustomData('listarray_index');listArray[listIndex].indent=-1;lastListIndex=listIndex;}
for(i=lastListIndex+1;i<listArray.length;i++){if(listArray[i].indent>listArray[i-1].indent+1){var indentOffset=listArray[i-1].indent+1-listArray[i].indent;var oldIndent=listArray[i].indent;while(listArray[i]&&listArray[i].indent>=oldIndent){listArray[i].indent+=indentOffset;i++;}
i--;}}
var newList=CKEDITOR.plugins.list.arrayToList(listArray,database,null,editor.config.enterMode,groupObj.root.getAttribute('dir'));var docFragment=newList.listNode,boundaryNode,siblingNode;function compensateBrs(isStart){if((boundaryNode=docFragment[isStart?'getFirst':'getLast']())&&!(boundaryNode.is&&boundaryNode.isBlockBoundary())&&(siblingNode=groupObj.root[isStart?'getPrevious':'getNext'](CKEDITOR.dom.walker.invisible(true)))&&!(siblingNode.is&&siblingNode.isBlockBoundary({br:1}))){editor.document.createElement('br')[isStart?'insertBefore':'insertAfter'](boundaryNode);}}
compensateBrs(true);compensateBrs();docFragment.replace(groupObj.root);editor.fire('contentDomInvalidated');}
var headerTagRegex=/^h[1-6]$/;function shouldPreserveBlock(block){return(block.is('pre')||headerTagRegex.test(block.getName())||block.getAttribute('contenteditable')=='false');}
function listCommand(name,type){this.name=name;this.type=type;this.context=type;this.allowedContent=type+' li';this.requiredContent=type;}
var elementType=CKEDITOR.dom.walker.nodeType(CKEDITOR.NODE_ELEMENT);function mergeChildren(from,into,refNode,forward){var child,itemDir;while((child=from[forward?'getLast':'getFirst'](elementType))){if((itemDir=child.getDirection(1))!==into.getDirection(1))
child.setAttribute('dir',itemDir);child.remove();refNode?child[forward?'insertBefore':'insertAfter'](refNode):into.append(child,forward);}}
listCommand.prototype={exec:function(editor){this.refresh(editor,editor.elementPath());var config=editor.config,selection=editor.getSelection(),ranges=selection&&selection.getRanges();if(this.state==CKEDITOR.TRISTATE_OFF){var editable=editor.editable();if(!editable.getFirst(nonEmpty)){config.enterMode==CKEDITOR.ENTER_BR?editable.appendBogus():ranges[0].fixBlock(1,config.enterMode==CKEDITOR.ENTER_P?'p':'div');selection.selectRanges(ranges);}
else{var range=ranges.length==1&&ranges[0],enclosedNode=range&&range.getEnclosedNode();if(enclosedNode&&enclosedNode.is&&this.type==enclosedNode.getName())
this.setState(CKEDITOR.TRISTATE_ON);}}
var bookmarks=selection.createBookmarks(true);var listGroups=[],database={},rangeIterator=ranges.createIterator(),index=0;while((range=rangeIterator.getNextRange())&&++index){var boundaryNodes=range.getBoundaryNodes(),startNode=boundaryNodes.startNode,endNode=boundaryNodes.endNode;if(startNode.type==CKEDITOR.NODE_ELEMENT&&startNode.getName()=='td')
range.setStartAt(boundaryNodes.startNode,CKEDITOR.POSITION_AFTER_START);if(endNode.type==CKEDITOR.NODE_ELEMENT&&endNode.getName()=='td')
range.setEndAt(boundaryNodes.endNode,CKEDITOR.POSITION_BEFORE_END);var iterator=range.createIterator(),block;iterator.forceBrBreak=(this.state==CKEDITOR.TRISTATE_OFF);while((block=iterator.getNextParagraph())){if(block.getCustomData('list_block'))
continue;else
CKEDITOR.dom.element.setMarker(database,block,'list_block',1);var path=editor.elementPath(block),pathElements=path.elements,pathElementsCount=pathElements.length,processedFlag=0,blockLimit=path.blockLimit,element;for(var i=pathElementsCount-1;i>=0&&(element=pathElements[i]);i--){if(listNodeNames[element.getName()]&&blockLimit.contains(element)){blockLimit.removeCustomData('list_group_object_'+index);var groupObj=element.getCustomData('list_group_object');if(groupObj)
groupObj.contents.push(block);else{groupObj={root:element,contents:[block]};listGroups.push(groupObj);CKEDITOR.dom.element.setMarker(database,element,'list_group_object',groupObj);}
processedFlag=1;break;}}
if(processedFlag)
continue;var root=blockLimit;if(root.getCustomData('list_group_object_'+index))
root.getCustomData('list_group_object_'+index).contents.push(block);else{groupObj={root:root,contents:[block]};CKEDITOR.dom.element.setMarker(database,root,'list_group_object_'+index,groupObj);listGroups.push(groupObj);}}}
var listsCreated=[];while(listGroups.length>0){groupObj=listGroups.shift();if(this.state==CKEDITOR.TRISTATE_OFF){if(listNodeNames[groupObj.root.getName()])
changeListType.call(this,editor,groupObj,database,listsCreated);else
createList.call(this,editor,groupObj,listsCreated);}else if(this.state==CKEDITOR.TRISTATE_ON&&listNodeNames[groupObj.root.getName()]){removeList.call(this,editor,groupObj,database);}}
for(i=0;i<listsCreated.length;i++)
mergeListSiblings(listsCreated[i]);CKEDITOR.dom.element.clearAllMarkers(database);selection.selectBookmarks(bookmarks);editor.focus();},refresh:function(editor,path){var list=path.contains(listNodeNames,1),limit=path.blockLimit||path.root;if(list&&limit.contains(list))
this.setState(list.is(this.type)?CKEDITOR.TRISTATE_ON:CKEDITOR.TRISTATE_OFF);else
this.setState(CKEDITOR.TRISTATE_OFF);}};function mergeListSiblings(listNode){function mergeSibling(rtl){var sibling=listNode[rtl?'getPrevious':'getNext'](nonEmpty);if(sibling&&sibling.type==CKEDITOR.NODE_ELEMENT&&sibling.is(listNode.getName())){mergeChildren(listNode,sibling,null,!rtl);listNode.remove();listNode=sibling;}}
mergeSibling();mergeSibling(1);}
function isTextBlock(node){return node.type==CKEDITOR.NODE_ELEMENT&&(node.getName()in CKEDITOR.dtd.$block||node.getName()in CKEDITOR.dtd.$listItem)&&CKEDITOR.dtd[node.getName()]['#'];}
function joinNextLineToCursor(editor,cursor,nextCursor){editor.fire('saveSnapshot');nextCursor.enlarge(CKEDITOR.ENLARGE_LIST_ITEM_CONTENTS);var frag=nextCursor.extractContents();cursor.trim(false,true);var bm=cursor.createBookmark();var currentPath=new CKEDITOR.dom.elementPath(cursor.startContainer),pathBlock=currentPath.block,currentBlock=currentPath.lastElement.getAscendant('li',1)||pathBlock,nextPath=new CKEDITOR.dom.elementPath(nextCursor.startContainer),nextLi=nextPath.contains(CKEDITOR.dtd.$listItem),nextList=nextPath.contains(CKEDITOR.dtd.$list),last;if(pathBlock){var bogus=pathBlock.getBogus();bogus&&bogus.remove();}
else if(nextList){last=nextList.getPrevious(nonEmpty);if(last&&blockBogus(last))
last.remove();}
last=frag.getLast();if(last&&last.type==CKEDITOR.NODE_ELEMENT&&last.is('br'))
last.remove();var nextNode=cursor.startContainer.getChild(cursor.startOffset);if(nextNode)
frag.insertBefore(nextNode);else
cursor.startContainer.append(frag);if(nextLi){var sublist=getSubList(nextLi);if(sublist){if(currentBlock.contains(nextLi)){mergeChildren(sublist,nextLi.getParent(),nextLi);sublist.remove();}
else{currentBlock.append(sublist);}}}
var nextBlock,parent;while(nextCursor.checkStartOfBlock()&&nextCursor.checkEndOfBlock()){nextPath=nextCursor.startPath();nextBlock=nextPath.block;if(!nextBlock)
break;if(nextBlock.is('li')){parent=nextBlock.getParent();if(nextBlock.equals(parent.getLast(nonEmpty))&&nextBlock.equals(parent.getFirst(nonEmpty)))
nextBlock=parent;}
nextCursor.moveToPosition(nextBlock,CKEDITOR.POSITION_BEFORE_START);nextBlock.remove();}
var walkerRng=nextCursor.clone(),editable=editor.editable();walkerRng.setEndAt(editable,CKEDITOR.POSITION_BEFORE_END);var walker=new CKEDITOR.dom.walker(walkerRng);walker.evaluator=function(node){return nonEmpty(node)&&!blockBogus(node);};var next=walker.next();if(next&&next.type==CKEDITOR.NODE_ELEMENT&&next.getName()in CKEDITOR.dtd.$list)
mergeListSiblings(next);cursor.moveToBookmark(bm);cursor.select();editor.fire('saveSnapshot');}
function getSubList(li){var last=li.getLast(nonEmpty);return last&&last.type==CKEDITOR.NODE_ELEMENT&&last.getName()in listNodeNames?last:null;}
function renderLineGroupBlock(){var editor=this;var ulstyle=CKEDITOR.skin.getIconStyle('bulletedlist',false),olstyle=CKEDITOR.skin.getIconStyle('numberedlist',false);var clickFn=CKEDITOR.tools.addFunction(function(type){switch(type){case'ul':editor.execCommand('bulletedlist');break;case'ol':editor.execCommand('numberedlist');break;}})
reHtml='<table style="table-layout: fixed;overflow: hidden;"><tr><td>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'ul\')" hidefocus=true data-l="ul"><span class="cke_button_icon cke_button__bulletedlist_icon" style="'+ulstyle+'"></span></a>'
reHtml+='<a class="cke_button" onclick="CKEDITOR.tools.callFunction('+clickFn+', \'ol\')" hidefocus=true data-l="ol"><span class="cke_button_icon cke_button__numberedlist_icon" style="'+olstyle+'"></span></a></td></tr></table>'
return reHtml}
function getContainerElementName(el){var elName=el.getName();if((/^(div|p|ol|ul)$/gi).test(elName)){return elName}else{return getContainerElementName(el.getParent());}}
function onSelectionChange(toolbarName,blockEl){var editor=this;var el=editor.getSelection().getStartElement();var elType=getContainerElementName(el);var btn=editor.ui.get(toolbarName);var element=CKEDITOR.document.getById(btn._.id);var span=element.find('.cke_button_icon').getItem(0);var style,cla,highlight=true;switch(elType){case'ul':cla='bulletedlist';style=CKEDITOR.skin.getIconStyle('bulletedlist',false);break;case'ol':cla='numberedlist';style=CKEDITOR.skin.getIconStyle('numberedlist',false);break;default:cla='bulletedlist';style=CKEDITOR.skin.getIconStyle('bulletedlist',false);highlight=false;break;}
span.setAttributes({'style':style,'class':'cke_button_icon cke_button__'+cla+'_icon',})
if(highlight){element.removeClass('cke_button_off').addClass('cke_button_on');}else{element.removeClass('cke_button_on').addClass('cke_button_off');}
if(blockEl.el){var btns=blockEl.el.find('a.cke_button')
for(var i=0,len=btns.count();i<len;i++){btns.getItem(i).removeClass('cke_button_on').addClass('cke_button_off')}
if(elType==='ul'||elType==='ol'){blockEl.el.findOne('a[data-l='+elType+']').addClass('cke_button_on')}}}
CKEDITOR.plugins.add('list',{requires:'indentlist',init:function(editor){if(editor.blockless)
return;var blockEl={}
var toolbarName='LineGroup';editor.addCommand('numberedlist',new listCommand('numberedlist','ol'));editor.addCommand('bulletedlist',new listCommand('bulletedlist','ul'));if(editor.config.redesignedTextEditor){editor.on('selectionChange',onSelectionChange.bind(editor,toolbarName,blockEl));}
if(editor.ui.addButton){if(editor.config.redesignedTextEditor){editor.ui.add(toolbarName,CKEDITOR.UI_PANELBUTTON,{modes:{wysiwyg:1},toolbar:'list,30',editorFocus:0,panel:{css:CKEDITOR.skin.getPath('editor'),attributes:{role:'listbox','aria-label':''}},onBlock:function(panel,block){blockEl.el=block.element;block.autoSize=true;block.element.addClass('cke_linegroupblock');block.element.setStyle('width','62px');block.element.setHtml(renderLineGroupBlock.apply(editor));block.element.getDocument().getBody().setStyle('overflow','hidden');CKEDITOR.ui.fire('ready',this);onSelectionChange.call(editor,toolbarName,blockEl);}})}
editor.ui.addButton('NumberedList',{label:editor.lang.list.numberedlist,command:'numberedlist',directional:true,toolbar:'list,10'});editor.ui.addButton('BulletedList',{label:editor.lang.list.bulletedlist,command:'bulletedlist',directional:true,toolbar:'list,20'});}
editor.on('key',function(evt){var key=evt.data.domEvent.getKey(),li;if(editor.mode=='wysiwyg'&&key in{8:1,46:1}){var sel=editor.getSelection(),range=sel.getRanges()[0],path=range&&range.startPath();if(!range||!range.collapsed)
return;var isBackspace=key==8;var editable=editor.editable();var walker=new CKEDITOR.dom.walker(range.clone());walker.evaluator=function(node){return nonEmpty(node)&&!blockBogus(node);};walker.guard=function(node,isOut){return!(isOut&&node.type==CKEDITOR.NODE_ELEMENT&&node.is('table'));};var cursor=range.clone();if(isBackspace){var previous,joinWith;if((previous=path.contains(listNodeNames))&&range.checkBoundaryOfElement(previous,CKEDITOR.START)&&(previous=previous.getParent())&&previous.is('li')&&(previous=getSubList(previous))){joinWith=previous;previous=previous.getPrevious(nonEmpty);cursor.moveToPosition(previous&&blockBogus(previous)?previous:joinWith,CKEDITOR.POSITION_BEFORE_START);}
else{walker.range.setStartAt(editable,CKEDITOR.POSITION_AFTER_START);walker.range.setEnd(range.startContainer,range.startOffset);previous=walker.previous();if(previous&&previous.type==CKEDITOR.NODE_ELEMENT&&(previous.getName()in listNodeNames||previous.is('li'))){if(!previous.is('li')){walker.range.selectNodeContents(previous);walker.reset();walker.evaluator=isTextBlock;previous=walker.previous();}
joinWith=previous;cursor.moveToElementEditEnd(joinWith);cursor.moveToPosition(cursor.endPath().block,CKEDITOR.POSITION_BEFORE_END);}}
if(joinWith){joinNextLineToCursor(editor,cursor,range);evt.cancel();}
else{var list=path.contains(listNodeNames);if(list&&range.checkBoundaryOfElement(list,CKEDITOR.START)){li=list.getFirst(nonEmpty);if(range.checkBoundaryOfElement(li,CKEDITOR.START)){previous=list.getPrevious(nonEmpty);if(getSubList(li)){if(previous){range.moveToElementEditEnd(previous);range.select();}
evt.cancel();}
else{editor.execCommand('outdent');evt.cancel();}}}}}else{var next,nextLine;li=path.contains('li');if(li){walker.range.setEndAt(editable,CKEDITOR.POSITION_BEFORE_END);var last=li.getLast(nonEmpty);var block=last&&isTextBlock(last)?last:li;var isAtEnd=0;next=walker.next();if(next&&next.type==CKEDITOR.NODE_ELEMENT&&next.getName()in listNodeNames&&next.equals(last)){isAtEnd=1;next=walker.next();}
else if(range.checkBoundaryOfElement(block,CKEDITOR.END)){isAtEnd=2;}
if(isAtEnd&&next){nextLine=range.clone();nextLine.moveToElementEditStart(next);if(isAtEnd==1){cursor.optimize();if(!cursor.startContainer.equals(li)){var node=cursor.startContainer,farthestInlineAscendant;while(node.is(CKEDITOR.dtd.$inline)){farthestInlineAscendant=node;node=node.getParent();}
if(farthestInlineAscendant){cursor.moveToPosition(farthestInlineAscendant,CKEDITOR.POSITION_AFTER_END);}}}
if(isAtEnd==2){cursor.moveToPosition(cursor.endPath().block,CKEDITOR.POSITION_BEFORE_END);if(nextLine.endPath().block){nextLine.moveToPosition(nextLine.endPath().block,CKEDITOR.POSITION_AFTER_START);}}
joinNextLineToCursor(editor,cursor,nextLine);evt.cancel();}}else{walker.range.setEndAt(editable,CKEDITOR.POSITION_BEFORE_END);next=walker.next();if(next&&next.type==CKEDITOR.NODE_ELEMENT&&next.is(listNodeNames)){next=next.getFirst(nonEmpty);if(path.block&&range.checkStartOfBlock()&&range.checkEndOfBlock()){path.block.remove();range.moveToElementEditStart(next);range.select();evt.cancel();}
else if(getSubList(next)){range.moveToElementEditStart(next);range.select();evt.cancel();}
else{nextLine=range.clone();nextLine.moveToElementEditStart(next);joinNextLineToCursor(editor,cursor,nextLine);evt.cancel();}}}}
setTimeout(function(){editor.selectionChange(1);});}});}});})();(function(){CKEDITOR.plugins.add('pastefromword',{requires:'clipboard',init:function(editor){var commandName='pastefromword',forceFromWord=0,path=this.path;editor.addCommand(commandName,{canUndo:false,async:true,exec:function(editor){var cmd=this;forceFromWord=1;editor.once('beforePaste',forceHtmlMode);editor.getClipboardData({title:editor.lang.pastefromword.title},function(data){data&&editor.fire('paste',{type:'html',dataValue:data.dataValue,method:'paste',dataTransfer:CKEDITOR.plugins.clipboard.initPasteDataTransfer()});editor.fire('afterCommandExec',{name:commandName,command:cmd,returnValue:!!data});});}});editor.ui.addButton&&editor.ui.addButton('PasteFromWord',{label:editor.lang.pastefromword.toolbar,command:commandName,toolbar:'clipboard,50'});editor.on('pasteState',function(evt){editor.getCommand(commandName).setState(evt.data);});editor.on('paste',function(evt){var data=evt.data,mswordHtml=data.dataValue;if(mswordHtml&&(forceFromWord||(/(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/).test(mswordHtml))){data.dontFilter=true;var isLazyLoad=loadFilterRules(editor,path,function(){if(isLazyLoad)
editor.fire('paste',data);else if(!editor.config.pasteFromWordPromptCleanup||(forceFromWord||confirm(editor.lang.pastefromword.confirmCleanup)))
data.dataValue=CKEDITOR.cleanWord(mswordHtml,editor);forceFromWord=0;});isLazyLoad&&evt.cancel();}},null,null,3);}});function loadFilterRules(editor,path,callback){var isLoaded=CKEDITOR.cleanWord;if(isLoaded)
callback();else{var filterFilePath=CKEDITOR.getUrl(editor.config.pasteFromWordCleanupFile||(path+'filter/default.js'));CKEDITOR.scriptLoader.load(filterFilePath,callback,null,true);}
return!isLoaded;}
function forceHtmlMode(evt){evt.data.type='html';}})();(function(){var toolbox=function(){this.toolbars=[];this.focusCommandExecuted=false;};toolbox.prototype.focus=function(){for(var t=0,toolbar;toolbar=this.toolbars[t++];){for(var i=0,item;item=toolbar.items[i++];){if(item.focus){item.focus();return;}}}};var commands={toolbarFocus:{modes:{wysiwyg:1,source:1},readOnly:1,exec:function(editor){if(editor.toolbox){editor.toolbox.focusCommandExecuted=true;if(CKEDITOR.env.ie||CKEDITOR.env.air){setTimeout(function(){editor.toolbox.focus();},100);}else{editor.toolbox.focus();}}}}};CKEDITOR.plugins.add('toolbar',{requires:'button',init:function(editor){var endFlag;var itemKeystroke=function(item,keystroke){var next,toolbar;var rtl=editor.lang.dir=='rtl',toolbarGroupCycling=editor.config.toolbarGroupCycling,rightKeyCode=rtl?37:39,leftKeyCode=rtl?39:37;toolbarGroupCycling=toolbarGroupCycling===undefined||toolbarGroupCycling;switch(keystroke){case 9:case CKEDITOR.SHIFT+9:while(!toolbar||!toolbar.items.length){if(keystroke==9){toolbar=((toolbar?toolbar.next:item.toolbar.next)||editor.toolbox.toolbars[0]);}else{toolbar=((toolbar?toolbar.previous:item.toolbar.previous)||editor.toolbox.toolbars[editor.toolbox.toolbars.length-1]);}
if(toolbar.items.length){item=toolbar.items[endFlag?(toolbar.items.length-1):0];while(item&&!item.focus){item=endFlag?item.previous:item.next;if(!item)
toolbar=0;}}}
if(item)
item.focus();return false;case rightKeyCode:next=item;do{next=next.next;if(!next&&toolbarGroupCycling)next=item.toolbar.items[0];}
while(next&&!next.focus);if(next)
next.focus();else
itemKeystroke(item,9);return false;case 40:if(item.button&&item.button.hasArrow){editor.once('panelShow',function(evt){evt.data._.panel._.currentBlock.onKeyDown(40);});item.execute();}else{itemKeystroke(item,keystroke==40?rightKeyCode:leftKeyCode);}
return false;case leftKeyCode:case 38:next=item;do{next=next.previous;if(!next&&toolbarGroupCycling)next=item.toolbar.items[item.toolbar.items.length-1];}
while(next&&!next.focus);if(next)
next.focus();else{endFlag=1;itemKeystroke(item,CKEDITOR.SHIFT+9);endFlag=0;}
return false;case 27:editor.focus();return false;case 13:case 32:item.execute();return false;}
return true;};editor.on('uiSpace',function(event){if(event.data.space!=editor.config.toolbarLocation)
return;event.removeListener();editor.toolbox=new toolbox();var labelId=CKEDITOR.tools.getNextId();var output=['<span id="',labelId,'" class="cke_voice_label">',editor.lang.toolbar.toolbars,'</span>','<span id="'+editor.ui.spaceId('toolbox')+'" class="cke_toolbox" role="group" aria-labelledby="',labelId,'" onmousedown="return false;">'];var expanded=editor.config.toolbarStartupExpanded!==false,groupStarted,pendingSeparator;if(editor.config.toolbarCanCollapse&&editor.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE)
output.push('<span class="cke_toolbox_main"'+(expanded?'>':' style="display:none">'));var toolbars=editor.toolbox.toolbars,toolbar=getToolbarConfig(editor);for(var r=0;r<toolbar.length;r++){var toolbarId,toolbarObj=0,toolbarName,row=toolbar[r],items;if(!row)
continue;if(groupStarted){output.push('</span>');groupStarted=0;pendingSeparator=0;}
if(row==='/'){output.push('<span class="cke_toolbar_break"></span>');continue;}
items=row.items||row;for(var i=0;i<items.length;i++){var item=items[i],canGroup;if(item){if(item.type==CKEDITOR.UI_SEPARATOR){pendingSeparator=groupStarted&&item;continue;}
canGroup=item.canGroup!==false;if(!toolbarObj){toolbarId=CKEDITOR.tools.getNextId();toolbarObj={id:toolbarId,items:[]};toolbarName=row.name&&(editor.lang.toolbar.toolbarGroups[row.name]||row.name);output.push('<span id="',toolbarId,'" class="cke_toolbar"',(toolbarName?' aria-labelledby="'+toolbarId+'_label"':''),' role="toolbar">');toolbarName&&output.push('<span id="',toolbarId,'_label" class="cke_voice_label">',toolbarName,'</span>');output.push('<span class="cke_toolbar_start"></span>');var index=toolbars.push(toolbarObj)-1;if(index>0){toolbarObj.previous=toolbars[index-1];toolbarObj.previous.next=toolbarObj;}}
if(canGroup){if(!groupStarted){output.push('<span class="cke_toolgroup" role="presentation">');groupStarted=1;}}else if(groupStarted){output.push('</span>');groupStarted=0;}
function addItem(item){var itemObj=item.render(editor,output);index=toolbarObj.items.push(itemObj)-1;if(index>0){itemObj.previous=toolbarObj.items[index-1];itemObj.previous.next=itemObj;}
itemObj.toolbar=toolbarObj;itemObj.onkey=itemKeystroke;itemObj.onfocus=function(){if(!editor.toolbox.focusCommandExecuted)
editor.focus();};}
if(pendingSeparator){addItem(pendingSeparator);pendingSeparator=0;}
addItem(item);}}
if(groupStarted){output.push('</span>');groupStarted=0;pendingSeparator=0;}
if(toolbarObj)
output.push('<span class="cke_toolbar_end"></span></span>');}
if(editor.config.toolbarCanCollapse)
output.push('</span>');if(editor.config.toolbarCanCollapse&&editor.elementMode!=CKEDITOR.ELEMENT_MODE_INLINE){var collapserFn=CKEDITOR.tools.addFunction(function(){editor.execCommand('toolbarCollapse');});editor.on('destroy',function(){CKEDITOR.tools.removeFunction(collapserFn);});editor.addCommand('toolbarCollapse',{readOnly:1,exec:function(editor){var collapser=editor.ui.space('toolbar_collapser'),toolbox=collapser.getPrevious(),contents=editor.ui.space('contents'),toolboxContainer=toolbox.getParent(),contentHeight=parseInt(contents.$.style.height,10),previousHeight=toolboxContainer.$.offsetHeight,minClass='cke_toolbox_collapser_min',collapsed=collapser.hasClass(minClass);if(!collapsed){toolbox.hide();collapser.addClass(minClass);collapser.setAttribute('title',editor.lang.toolbar.toolbarExpand);}else{toolbox.show();collapser.removeClass(minClass);collapser.setAttribute('title',editor.lang.toolbar.toolbarCollapse);}
collapser.getFirst().setText(collapsed?'\u25B2':'\u25C0');var dy=toolboxContainer.$.offsetHeight-previousHeight;contents.setStyle('height',(contentHeight-dy)+'px');editor.fire('resize',{outerHeight:editor.container.$.offsetHeight,contentsHeight:contents.$.offsetHeight,outerWidth:editor.container.$.offsetWidth});},modes:{wysiwyg:1,source:1}});editor.setKeystroke(CKEDITOR.ALT+(CKEDITOR.env.ie||CKEDITOR.env.webkit?189:109),'toolbarCollapse');output.push('<a title="'+(expanded?editor.lang.toolbar.toolbarCollapse:editor.lang.toolbar.toolbarExpand)+'" id="'+editor.ui.spaceId('toolbar_collapser')+'" tabIndex="-1" class="cke_toolbox_collapser');if(!expanded)
output.push(' cke_toolbox_collapser_min');output.push('" onclick="CKEDITOR.tools.callFunction('+collapserFn+')">','<span class="cke_arrow">&#9650;</span>','</a>');}
output.push('</span>');event.data.html+=output.join('');});editor.on('destroy',function(){if(this.toolbox){var toolbars,index=0,i,items,instance;toolbars=this.toolbox.toolbars;for(;index<toolbars.length;index++){items=toolbars[index].items;for(i=0;i<items.length;i++){instance=items[i];if(instance.clickFn)
CKEDITOR.tools.removeFunction(instance.clickFn);if(instance.keyDownFn)
CKEDITOR.tools.removeFunction(instance.keyDownFn);}}}});editor.on('uiReady',function(){var toolbox=editor.ui.space('toolbox');toolbox&&editor.focusManager.add(toolbox,1);});editor.addCommand('toolbarFocus',commands.toolbarFocus);editor.setKeystroke(CKEDITOR.ALT+121,'toolbarFocus');editor.ui.add('-',CKEDITOR.UI_SEPARATOR,{});editor.ui.addHandler(CKEDITOR.UI_SEPARATOR,{create:function(){return{render:function(editor,output){output.push('<span class="cke_toolbar_separator" role="separator"></span>');return{};}};}});}});function getToolbarConfig(editor){var removeButtons=editor.config.removeButtons;removeButtons=removeButtons&&removeButtons.split(',');function buildToolbarConfig(){var lookup=getItemDefinedGroups();var toolbar=CKEDITOR.tools.clone(editor.config.toolbarGroups)||getPrivateToolbarGroups(editor);for(var i=0;i<toolbar.length;i++){var toolbarGroup=toolbar[i];if(toolbarGroup=='/')
continue;else if(typeof toolbarGroup=='string')
toolbarGroup=toolbar[i]={name:toolbarGroup};var items,subGroups=toolbarGroup.groups;if(subGroups){for(var j=0,sub;j<subGroups.length;j++){sub=subGroups[j];items=lookup[sub];items&&fillGroup(toolbarGroup,items);}}
items=lookup[toolbarGroup.name];items&&fillGroup(toolbarGroup,items);}
return toolbar;}
function getItemDefinedGroups(){var groups={},itemName,item,itemToolbar,group,order;for(itemName in editor.ui.items){item=editor.ui.items[itemName];itemToolbar=item.toolbar||'others';if(itemToolbar){itemToolbar=itemToolbar.split(',');group=itemToolbar[0];order=parseInt(itemToolbar[1]||-1,10);groups[group]||(groups[group]=[]);groups[group].push({name:itemName,order:order});}}
for(group in groups){groups[group]=groups[group].sort(function(a,b){return a.order==b.order?0:b.order<0?-1:a.order<0?1:a.order<b.order?-1:1;});}
return groups;}
function fillGroup(toolbarGroup,uiItems){if(uiItems.length){if(toolbarGroup.items)
toolbarGroup.items.push(editor.ui.create('-'));else
toolbarGroup.items=[];var item,name;while((item=uiItems.shift())){name=typeof item=='string'?item:item.name;if(!removeButtons||CKEDITOR.tools.indexOf(removeButtons,name)==-1){item=editor.ui.create(name);if(!item)
continue;if(!editor.addFeature(item))
continue;toolbarGroup.items.push(item);}}}}
function populateToolbarConfig(config){var toolbar=[],i,group,newGroup;for(i=0;i<config.length;++i){group=config[i];newGroup={};if(group=='/')
toolbar.push(group);else if(CKEDITOR.tools.isArray(group)){fillGroup(newGroup,CKEDITOR.tools.clone(group));toolbar.push(newGroup);}
else if(group.items){fillGroup(newGroup,CKEDITOR.tools.clone(group.items));newGroup.name=group.name;toolbar.push(newGroup);}}
return toolbar;}
var toolbar=editor.config.toolbar;if(typeof toolbar=='string')
toolbar=editor.config['toolbar_'+toolbar];return(editor.toolbar=toolbar?populateToolbarConfig(toolbar):buildToolbarConfig());}
CKEDITOR.ui.prototype.addToolbarGroup=function(name,previous,subgroupOf){var toolbarGroups=getPrivateToolbarGroups(this.editor),atStart=previous===0,newGroup={name:name};if(subgroupOf){subgroupOf=CKEDITOR.tools.search(toolbarGroups,function(group){return group.name==subgroupOf;});if(subgroupOf){!subgroupOf.groups&&(subgroupOf.groups=[]);if(previous){previous=CKEDITOR.tools.indexOf(subgroupOf.groups,previous);if(previous>=0){subgroupOf.groups.splice(previous+1,0,name);return;}}
if(atStart)
subgroupOf.groups.splice(0,0,name);else
subgroupOf.groups.push(name);return;}else{previous=null;}}
if(previous){previous=CKEDITOR.tools.indexOf(toolbarGroups,function(group){return group.name==previous;});}
if(atStart)
toolbarGroups.splice(0,0,name);else if(typeof previous=='number')
toolbarGroups.splice(previous+1,0,newGroup);else
toolbarGroups.push(name);};function getPrivateToolbarGroups(editor){return editor._.toolbarGroups||(editor._.toolbarGroups=[{name:'document',groups:['mode','document','doctools']},{name:'clipboard',groups:['clipboard','undo']},{name:'editing',groups:['find','selection','spellchecker']},{name:'forms'},'/',{name:'basicstyles',groups:['basicstyles','cleanup']},{name:'paragraph',groups:['list','indent','blocks','align','bidi']},{name:'links'},{name:'insert'},'/',{name:'styles'},{name:'colors'},{name:'tools'},{name:'others'},{name:'about'}]);}})();CKEDITOR.UI_SEPARATOR='separator';CKEDITOR.config.toolbarLocation='top';'use strict';(function(){var keystrokes=[CKEDITOR.CTRL+90,CKEDITOR.CTRL+89,CKEDITOR.CTRL+CKEDITOR.SHIFT+90],backspaceOrDelete={8:1,46:1};CKEDITOR.plugins.add('undo',{init:function(editor){var undoManager=editor.undoManager=new UndoManager(editor),editingHandler=undoManager.editingHandler=new NativeEditingHandler(undoManager);var undoCommand=editor.addCommand('undo',{exec:function(){if(undoManager.undo()){editor.selectionChange();this.fire('afterUndo');}},startDisabled:true,canUndo:false});var redoCommand=editor.addCommand('redo',{exec:function(){if(undoManager.redo()){editor.selectionChange();this.fire('afterRedo');}},startDisabled:true,canUndo:false});editor.setKeystroke([[keystrokes[0],'undo'],[keystrokes[1],'redo'],[keystrokes[2],'redo']]);undoManager.onChange=function(){undoCommand.setState(undoManager.undoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);redoCommand.setState(undoManager.redoable()?CKEDITOR.TRISTATE_OFF:CKEDITOR.TRISTATE_DISABLED);};function recordCommand(event){if(undoManager.enabled&&event.data.command.canUndo!==false)
undoManager.save();}
editor.on('beforeCommandExec',recordCommand);editor.on('afterCommandExec',recordCommand);editor.on('saveSnapshot',function(evt){undoManager.save(evt.data&&evt.data.contentOnly);});editor.on('contentDom',editingHandler.attachListeners,editingHandler);editor.on('instanceReady',function(){editor.fire('saveSnapshot');});editor.on('beforeModeUnload',function(){editor.mode=='wysiwyg'&&undoManager.save(true);});function toggleUndoManager(){undoManager.enabled=editor.readOnly?false:editor.mode=='wysiwyg';undoManager.onChange();}
editor.on('mode',toggleUndoManager);editor.on('readOnly',toggleUndoManager);if(editor.ui.addButton){editor.ui.addButton('Undo',{label:editor.lang.undo.undo,command:'undo',toolbar:'undo,10'});editor.ui.addButton('Redo',{label:editor.lang.undo.redo,command:'redo',toolbar:'undo,20'});}
editor.resetUndo=function(){undoManager.reset();editor.fire('saveSnapshot');};editor.on('updateSnapshot',function(){if(undoManager.currentImage)
undoManager.update();});editor.on('lockSnapshot',function(evt){var data=evt.data;undoManager.lock(data&&data.dontUpdate,data&&data.forceUpdate);});editor.on('unlockSnapshot',undoManager.unlock,undoManager);}});CKEDITOR.plugins.undo={};var UndoManager=CKEDITOR.plugins.undo.UndoManager=function(editor){this.strokesRecorded=[0,0];this.locked=null;this.previousKeyGroup=-1;this.limit=editor.config.undoStackSize||20;this.strokesLimit=25;this.editor=editor;this.reset();};UndoManager.prototype={type:function(keyCode,strokesPerSnapshotExceeded){var keyGroup=UndoManager.getKeyGroup(keyCode),strokesRecorded=this.strokesRecorded[keyGroup]+1;strokesPerSnapshotExceeded=(strokesPerSnapshotExceeded||strokesRecorded>=this.strokesLimit);if(!this.typing)
onTypingStart(this);if(strokesPerSnapshotExceeded){strokesRecorded=0;this.editor.fire('saveSnapshot');}else{this.editor.fire('change');}
this.strokesRecorded[keyGroup]=strokesRecorded;this.previousKeyGroup=keyGroup;},keyGroupChanged:function(keyCode){return UndoManager.getKeyGroup(keyCode)!=this.previousKeyGroup;},reset:function(){this.snapshots=[];this.index=-1;this.currentImage=null;this.hasUndo=false;this.hasRedo=false;this.locked=null;this.resetType();},resetType:function(){this.strokesRecorded=[0,0];this.typing=false;this.previousKeyGroup=-1;},refreshState:function(){this.hasUndo=!!this.getNextImage(true);this.hasRedo=!!this.getNextImage(false);this.resetType();this.onChange();},save:function(onContentOnly,image,autoFireChange){var editor=this.editor;if(this.locked||editor.status!='ready'||editor.mode!='wysiwyg')
return false;var editable=editor.editable();if(!editable||editable.status!='ready')
return false;var snapshots=this.snapshots;if(!image)
image=new Image(editor);if(image.contents===false)
return false;if(this.currentImage){if(image.equalsContent(this.currentImage)){if(onContentOnly)
return false;if(image.equalsSelection(this.currentImage))
return false;}else if(autoFireChange!==false){editor.fire('change');}}
snapshots.splice(this.index+1,snapshots.length-this.index-1);if(snapshots.length==this.limit)
snapshots.shift();this.index=snapshots.push(image)-1;this.currentImage=image;if(autoFireChange!==false)
this.refreshState();return true;},restoreImage:function(image){var editor=this.editor,sel;if(image.bookmarks){editor.focus();sel=editor.getSelection();}
this.locked={level:999};this.editor.loadSnapshot(image.contents);if(image.bookmarks)
sel.selectBookmarks(image.bookmarks);else if(CKEDITOR.env.ie){var $range=this.editor.document.getBody().$.createTextRange();$range.collapse(true);$range.select();}
this.locked=null;this.index=image.index;this.currentImage=this.snapshots[this.index];this.update();this.refreshState();editor.fire('change');},getNextImage:function(isUndo){var snapshots=this.snapshots,currentImage=this.currentImage,image,i;if(currentImage){if(isUndo){for(i=this.index-1;i>=0;i--){image=snapshots[i];if(!currentImage.equalsContent(image)){image.index=i;return image;}}}else{for(i=this.index+1;i<snapshots.length;i++){image=snapshots[i];if(!currentImage.equalsContent(image)){image.index=i;return image;}}}}
return null;},redoable:function(){return this.enabled&&this.hasRedo;},undoable:function(){return this.enabled&&this.hasUndo;},undo:function(){if(this.undoable()){this.save(true);var image=this.getNextImage(true);if(image)
return this.restoreImage(image),true;}
return false;},redo:function(){if(this.redoable()){this.save(true);if(this.redoable()){var image=this.getNextImage(false);if(image)
return this.restoreImage(image),true;}}
return false;},update:function(newImage){if(this.locked)
return;if(!newImage)
newImage=new Image(this.editor);var i=this.index,snapshots=this.snapshots;while(i>0&&this.currentImage.equalsContent(snapshots[i-1]))
i-=1;snapshots.splice(i,this.index-i+1,newImage);this.index=i;this.currentImage=newImage;},updateSelection:function(newSnapshot){if(!this.snapshots.length)
return false;var snapshots=this.snapshots,lastImage=snapshots[snapshots.length-1];if(lastImage.equalsContent(newSnapshot)){if(!lastImage.equalsSelection(newSnapshot)){snapshots[snapshots.length-1]=newSnapshot;this.currentImage=newSnapshot;return true;}}
return false;},lock:function(dontUpdate,forceUpdate){if(!this.locked){if(dontUpdate)
this.locked={level:1};else{var update=null;if(forceUpdate)
update=true;else{var imageBefore=new Image(this.editor,true);if(this.currentImage&&this.currentImage.equalsContent(imageBefore))
update=imageBefore;}
this.locked={update:update,level:1};}}else{this.locked.level++;}},unlock:function(){if(this.locked){if(!--this.locked.level){var update=this.locked.update;this.locked=null;if(update===true)
this.update();else if(update){var newImage=new Image(this.editor,true);if(!update.equalsContent(newImage))
this.update();}}}}};UndoManager.navigationKeyCodes={37:1,38:1,39:1,40:1,36:1,35:1,33:1,34:1};UndoManager.keyGroups={PRINTABLE:0,FUNCTIONAL:1};UndoManager.isNavigationKey=function(keyCode){return!!UndoManager.navigationKeyCodes[keyCode];};UndoManager.getKeyGroup=function(keyCode){var keyGroups=UndoManager.keyGroups;return backspaceOrDelete[keyCode]?keyGroups.FUNCTIONAL:keyGroups.PRINTABLE;};UndoManager.getOppositeKeyGroup=function(keyGroup){var keyGroups=UndoManager.keyGroups;return(keyGroup==keyGroups.FUNCTIONAL?keyGroups.PRINTABLE:keyGroups.FUNCTIONAL);};UndoManager.ieFunctionalKeysBug=function(keyCode){return CKEDITOR.env.ie&&UndoManager.getKeyGroup(keyCode)==UndoManager.keyGroups.FUNCTIONAL;};function onTypingStart(undoManager){undoManager.typing=true;undoManager.hasUndo=true;undoManager.hasRedo=false;undoManager.onChange();}
var Image=CKEDITOR.plugins.undo.Image=function(editor,contentsOnly){this.editor=editor;editor.fire('beforeUndoImage');var contents=editor.getSnapshot();if(CKEDITOR.env.ie&&contents)
contents=contents.replace(/\s+data-cke-expando=".*?"/g,'');this.contents=contents;if(!contentsOnly){var selection=contents&&editor.getSelection();this.bookmarks=selection&&selection.createBookmarks2(true);}
editor.fire('afterUndoImage');};var protectedAttrs=/\b(?:href|src|name)="[^"]*?"/gi;Image.prototype={equalsContent:function(otherImage){var thisContents=this.contents,otherContents=otherImage.contents;if(CKEDITOR.env.ie&&(CKEDITOR.env.ie7Compat||CKEDITOR.env.quirks)){thisContents=thisContents.replace(protectedAttrs,'');otherContents=otherContents.replace(protectedAttrs,'');}
if(thisContents!=otherContents)
return false;return true;},equalsSelection:function(otherImage){var bookmarksA=this.bookmarks,bookmarksB=otherImage.bookmarks;if(bookmarksA||bookmarksB){if(!bookmarksA||!bookmarksB||bookmarksA.length!=bookmarksB.length)
return false;for(var i=0;i<bookmarksA.length;i++){var bookmarkA=bookmarksA[i],bookmarkB=bookmarksB[i];if(bookmarkA.startOffset!=bookmarkB.startOffset||bookmarkA.endOffset!=bookmarkB.endOffset||!CKEDITOR.tools.arrayCompare(bookmarkA.start,bookmarkB.start)||!CKEDITOR.tools.arrayCompare(bookmarkA.end,bookmarkB.end)){return false;}}}
return true;}};var NativeEditingHandler=CKEDITOR.plugins.undo.NativeEditingHandler=function(undoManager){this.undoManager=undoManager;this.ignoreInputEvent=false;this.keyEventsStack=new KeyEventsStack();this.lastKeydownImage=null;};NativeEditingHandler.prototype={onKeydown:function(evt){var keyCode=evt.data.getKey();if(keyCode===229){return;}
if(CKEDITOR.tools.indexOf(keystrokes,evt.data.getKeystroke())>-1){evt.data.preventDefault();return;}
this.keyEventsStack.cleanUp(evt);var undoManager=this.undoManager;var last=this.keyEventsStack.getLast(keyCode);if(!last){this.keyEventsStack.push(keyCode);}
this.lastKeydownImage=new Image(undoManager.editor);if(UndoManager.isNavigationKey(keyCode)||this.undoManager.keyGroupChanged(keyCode)){if(undoManager.strokesRecorded[0]||undoManager.strokesRecorded[1]){undoManager.save(false,this.lastKeydownImage,false);undoManager.resetType();}}},onInput:function(){if(this.ignoreInputEvent){this.ignoreInputEvent=false;return;}
var lastInput=this.keyEventsStack.getLast();if(!lastInput){lastInput=this.keyEventsStack.push(0);}
this.keyEventsStack.increment(lastInput.keyCode);if(this.keyEventsStack.getTotalInputs()>=this.undoManager.strokesLimit){this.undoManager.type(lastInput.keyCode,true);this.keyEventsStack.resetInputs();}},onKeyup:function(evt){var undoManager=this.undoManager,keyCode=evt.data.getKey(),totalInputs=this.keyEventsStack.getTotalInputs();this.keyEventsStack.remove(keyCode);if(UndoManager.ieFunctionalKeysBug(keyCode)&&this.lastKeydownImage&&this.lastKeydownImage.equalsContent(new Image(undoManager.editor,true))){return;}
if(totalInputs>0){undoManager.type(keyCode);}else if(UndoManager.isNavigationKey(keyCode)){this.onNavigationKey(true);}},onNavigationKey:function(skipContentCompare){var undoManager=this.undoManager;if(skipContentCompare||!undoManager.save(true,null,false))
undoManager.updateSelection(new Image(undoManager.editor));undoManager.resetType();},ignoreInputEventListener:function(){this.ignoreInputEvent=true;},attachListeners:function(){var editor=this.undoManager.editor,editable=editor.editable(),that=this;editable.attachListener(editable,'keydown',function(evt){that.onKeydown(evt);if(UndoManager.ieFunctionalKeysBug(evt.data.getKey())){that.onInput();}},null,null,999);editable.attachListener(editable,(CKEDITOR.env.ie?'keypress':'input'),that.onInput,that,null,999);editable.attachListener(editable,'keyup',that.onKeyup,that,null,999);editable.attachListener(editable,'paste',that.ignoreInputEventListener,that,null,999);editable.attachListener(editable,'drop',that.ignoreInputEventListener,that,null,999);editable.attachListener(editable.isInline()?editable:editor.document.getDocumentElement(),'click',function(){that.onNavigationKey();},null,null,999);editable.attachListener(this.undoManager.editor,'blur',function(){that.keyEventsStack.remove(9);},null,null,999);}};var KeyEventsStack=CKEDITOR.plugins.undo.KeyEventsStack=function(){this.stack=[];};KeyEventsStack.prototype={push:function(keyCode){var length=this.stack.push({keyCode:keyCode,inputs:0});return this.stack[length-1];},getLastIndex:function(keyCode){if(typeof keyCode!='number'){return this.stack.length-1;}else{var i=this.stack.length;while(i--){if(this.stack[i].keyCode==keyCode){return i;}}
return-1;}},getLast:function(keyCode){var index=this.getLastIndex(keyCode);if(index!=-1){return this.stack[index];}else{return null;}},increment:function(keyCode){var found=this.getLast(keyCode);found.inputs++;},remove:function(keyCode){var index=this.getLastIndex(keyCode);if(index!=-1){this.stack.splice(index,1);}},resetInputs:function(keyCode){if(typeof keyCode=='number'){var last=this.getLast(keyCode);last.inputs=0;}else{var i=this.stack.length;while(i--){this.stack[i].inputs=0;}}},getTotalInputs:function(){var i=this.stack.length,total=0;while(i--){total+=this.stack[i].inputs;}
return total;},cleanUp:function(event){var nativeEvent=event.data.$;if(!(nativeEvent.ctrlKey||nativeEvent.metaKey)){this.remove(17);}
if(!nativeEvent.shiftKey){this.remove(16);}
if(!nativeEvent.altKey){this.remove(18);}}};})();CKEDITOR.config.plugins='basicstyles,dialogui,dialog,clipboard,button,panelbutton,panel,floatpanel,colorbutton,defaultstyle,entities,floatingspace,fontfamily,menu,menubutton,fontsize,indent,indentlist,justify,fakeobjects,link,list,pastefromword,toolbar,undo';CKEDITOR.config.skin='clean';(function(){var setIcons=function(icons,strip){var path=CKEDITOR.getUrl('plugins/'+strip);icons=icons.split(',');for(var i=0;i<icons.length;i++)CKEDITOR.skin.icons[icons[i]]={path:path,offset:-icons[++i],bgsize:icons[++i]};};if(CKEDITOR.env.hidpi)setIcons('bold,0,,italic,24,,strike,48,,subscript,72,,superscript,96,,underline,120,,copy-rtl,144,,copy,168,,cut-rtl,192,,cut,216,,paste-rtl,240,,paste,264,,indent-rtl,288,,indent,312,,outdent-rtl,336,,outdent,360,,justifyblock,384,,justifycenter,408,,justifyleft,432,,justifyright,456,,anchor-rtl,480,,anchor,504,,link,528,,unlink,552,,bulletedlist-rtl,576,,bulletedlist,600,,numberedlist-rtl,624,,numberedlist,648,,pastefromword-rtl,672,,pastefromword,696,,redo-rtl,720,,redo,744,,undo-rtl,768,,undo,792,','icons_hidpi.png');else setIcons('bold,0,auto,italic,24,auto,strike,48,auto,subscript,72,auto,superscript,96,auto,underline,120,auto,copy-rtl,144,auto,copy,168,auto,cut-rtl,192,auto,cut,216,auto,paste-rtl,240,auto,paste,264,auto,indent-rtl,288,auto,indent,312,auto,outdent-rtl,336,auto,outdent,360,auto,justifyblock,384,auto,justifycenter,408,auto,justifyleft,432,auto,justifyright,456,auto,anchor-rtl,480,auto,anchor,504,auto,link,528,auto,unlink,552,auto,bulletedlist-rtl,576,auto,bulletedlist,600,auto,numberedlist-rtl,624,auto,numberedlist,648,auto,pastefromword-rtl,672,auto,pastefromword,696,auto,redo-rtl,720,auto,redo,744,auto,undo-rtl,768,auto,undo,792,auto','icons.png');})();}());