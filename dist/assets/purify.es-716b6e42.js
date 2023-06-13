/*! @license DOMPurify 2.4.5 | (c) Cure53 and other contributors | Released under the Apache license 2.0 and Mozilla Public License 2.0 | github.com/cure53/DOMPurify/blob/2.4.5/LICENSE */function C(r){"@babel/helpers - typeof";return C=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(n){return typeof n}:function(n){return n&&typeof Symbol=="function"&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n},C(r)}function ke(r,n){return ke=Object.setPrototypeOf||function(s,f){return s.__proto__=f,s},ke(r,n)}function Ft(){if(typeof Reflect>"u"||!Reflect.construct||Reflect.construct.sham)return!1;if(typeof Proxy=="function")return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],function(){})),!0}catch(r){return!1}}function oe(r,n,o){return Ft()?oe=Reflect.construct:oe=function(f,O,D){var L=[null];L.push.apply(L,O);var B=Function.bind.apply(f,L),$=new B;return D&&ke($,D.prototype),$},oe.apply(null,arguments)}function S(r){return Ut(r)||Ht(r)||zt(r)||Gt()}function Ut(r){if(Array.isArray(r))return Pe(r)}function Ht(r){if(typeof Symbol<"u"&&r[Symbol.iterator]!=null||r["@@iterator"]!=null)return Array.from(r)}function zt(r,n){if(r){if(typeof r=="string")return Pe(r,n);var o=Object.prototype.toString.call(r).slice(8,-1);if(o==="Object"&&r.constructor&&(o=r.constructor.name),o==="Map"||o==="Set")return Array.from(r);if(o==="Arguments"||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(o))return Pe(r,n)}}function Pe(r,n){(n==null||n>r.length)&&(n=r.length);for(var o=0,s=new Array(n);o<n;o++)s[o]=r[o];return s}function Gt(){throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`)}var Wt=Object.hasOwnProperty,lt=Object.setPrototypeOf,Bt=Object.isFrozen,$t=Object.getPrototypeOf,jt=Object.getOwnPropertyDescriptor,A=Object.freeze,R=Object.seal,Yt=Object.create,pt=typeof Reflect<"u"&&Reflect,se=pt.apply,Fe=pt.construct;se||(se=function(n,o,s){return n.apply(o,s)});A||(A=function(n){return n});R||(R=function(n){return n});Fe||(Fe=function(n,o){return oe(n,S(o))});var Vt=y(Array.prototype.forEach),st=y(Array.prototype.pop),X=y(Array.prototype.push),le=y(String.prototype.toLowerCase),De=y(String.prototype.toString),Xt=y(String.prototype.match),b=y(String.prototype.replace),qt=y(String.prototype.indexOf),Kt=y(String.prototype.trim),_=y(RegExp.prototype.test),Me=Zt(TypeError);function y(r){return function(n){for(var o=arguments.length,s=new Array(o>1?o-1:0),f=1;f<o;f++)s[f-1]=arguments[f];return se(r,n,s)}}function Zt(r){return function(){for(var n=arguments.length,o=new Array(n),s=0;s<n;s++)o[s]=arguments[s];return Fe(r,o)}}function l(r,n,o){o=o||le,lt&&lt(r,null);for(var s=n.length;s--;){var f=n[s];if(typeof f=="string"){var O=o(f);O!==f&&(Bt(n)||(n[s]=O),f=O)}r[f]=!0}return r}function P(r){var n=Yt(null),o;for(o in r)se(Wt,r,[o])===!0&&(n[o]=r[o]);return n}function ne(r,n){for(;r!==null;){var o=jt(r,n);if(o){if(o.get)return y(o.get);if(typeof o.value=="function")return y(o.value)}r=$t(r)}function s(f){return console.warn("fallback value for",f),null}return s}var ut=A(["a","abbr","acronym","address","area","article","aside","audio","b","bdi","bdo","big","blink","blockquote","body","br","button","canvas","caption","center","cite","code","col","colgroup","content","data","datalist","dd","decorator","del","details","dfn","dialog","dir","div","dl","dt","element","em","fieldset","figcaption","figure","font","footer","form","h1","h2","h3","h4","h5","h6","head","header","hgroup","hr","html","i","img","input","ins","kbd","label","legend","li","main","map","mark","marquee","menu","menuitem","meter","nav","nobr","ol","optgroup","option","output","p","picture","pre","progress","q","rp","rt","ruby","s","samp","section","select","shadow","small","source","spacer","span","strike","strong","style","sub","summary","sup","table","tbody","td","template","textarea","tfoot","th","thead","time","tr","track","tt","u","ul","var","video","wbr"]),we=A(["svg","a","altglyph","altglyphdef","altglyphitem","animatecolor","animatemotion","animatetransform","circle","clippath","defs","desc","ellipse","filter","font","g","glyph","glyphref","hkern","image","line","lineargradient","marker","mask","metadata","mpath","path","pattern","polygon","polyline","radialgradient","rect","stop","style","switch","symbol","text","textpath","title","tref","tspan","view","vkern"]),Ie=A(["feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence"]),Jt=A(["animate","color-profile","cursor","discard","fedropshadow","font-face","font-face-format","font-face-name","font-face-src","font-face-uri","foreignobject","hatch","hatchpath","mesh","meshgradient","meshpatch","meshrow","missing-glyph","script","set","solidcolor","unknown","use"]),Ce=A(["math","menclose","merror","mfenced","mfrac","mglyph","mi","mlabeledtr","mmultiscripts","mn","mo","mover","mpadded","mphantom","mroot","mrow","ms","mspace","msqrt","mstyle","msub","msup","msubsup","mtable","mtd","mtext","mtr","munder","munderover"]),Qt=A(["maction","maligngroup","malignmark","mlongdiv","mscarries","mscarry","msgroup","mstack","msline","msrow","semantics","annotation","annotation-xml","mprescripts","none"]),ft=A(["#text"]),ct=A(["accept","action","align","alt","autocapitalize","autocomplete","autopictureinpicture","autoplay","background","bgcolor","border","capture","cellpadding","cellspacing","checked","cite","class","clear","color","cols","colspan","controls","controlslist","coords","crossorigin","datetime","decoding","default","dir","disabled","disablepictureinpicture","disableremoteplayback","download","draggable","enctype","enterkeyhint","face","for","headers","height","hidden","high","href","hreflang","id","inputmode","integrity","ismap","kind","label","lang","list","loading","loop","low","max","maxlength","media","method","min","minlength","multiple","muted","name","nonce","noshade","novalidate","nowrap","open","optimum","pattern","placeholder","playsinline","poster","preload","pubdate","radiogroup","readonly","rel","required","rev","reversed","role","rows","rowspan","spellcheck","scope","selected","shape","size","sizes","span","srclang","start","src","srcset","step","style","summary","tabindex","title","translate","type","usemap","valign","value","width","xmlns","slot"]),xe=A(["accent-height","accumulate","additive","alignment-baseline","ascent","attributename","attributetype","azimuth","basefrequency","baseline-shift","begin","bias","by","class","clip","clippathunits","clip-path","clip-rule","color","color-interpolation","color-interpolation-filters","color-profile","color-rendering","cx","cy","d","dx","dy","diffuseconstant","direction","display","divisor","dur","edgemode","elevation","end","fill","fill-opacity","fill-rule","filter","filterunits","flood-color","flood-opacity","font-family","font-size","font-size-adjust","font-stretch","font-style","font-variant","font-weight","fx","fy","g1","g2","glyph-name","glyphref","gradientunits","gradienttransform","height","href","id","image-rendering","in","in2","k","k1","k2","k3","k4","kerning","keypoints","keysplines","keytimes","lang","lengthadjust","letter-spacing","kernelmatrix","kernelunitlength","lighting-color","local","marker-end","marker-mid","marker-start","markerheight","markerunits","markerwidth","maskcontentunits","maskunits","max","mask","media","method","mode","min","name","numoctaves","offset","operator","opacity","order","orient","orientation","origin","overflow","paint-order","path","pathlength","patterncontentunits","patterntransform","patternunits","points","preservealpha","preserveaspectratio","primitiveunits","r","rx","ry","radius","refx","refy","repeatcount","repeatdur","restart","result","rotate","scale","seed","shape-rendering","specularconstant","specularexponent","spreadmethod","startoffset","stddeviation","stitchtiles","stop-color","stop-opacity","stroke-dasharray","stroke-dashoffset","stroke-linecap","stroke-linejoin","stroke-miterlimit","stroke-opacity","stroke","stroke-width","style","surfacescale","systemlanguage","tabindex","targetx","targety","transform","transform-origin","text-anchor","text-decoration","text-rendering","textlength","type","u1","u2","unicode","values","viewbox","visibility","version","vert-adv-y","vert-origin-x","vert-origin-y","width","word-spacing","wrap","writing-mode","xchannelselector","ychannelselector","x","x1","x2","xmlns","y","y1","y2","z","zoomandpan"]),mt=A(["accent","accentunder","align","bevelled","close","columnsalign","columnlines","columnspan","denomalign","depth","dir","display","displaystyle","encoding","fence","frame","height","href","id","largeop","length","linethickness","lspace","lquote","mathbackground","mathcolor","mathsize","mathvariant","maxsize","minsize","movablelimits","notation","numalign","open","rowalign","rowlines","rowspacing","rowspan","rspace","rquote","scriptlevel","scriptminsize","scriptsizemultiplier","selection","separator","separators","stretchy","subscriptshift","supscriptshift","symmetric","voffset","width","xmlns"]),ie=A(["xlink:href","xml:id","xlink:title","xml:space","xmlns:xlink"]),er=R(/\{\{[\w\W]*|[\w\W]*\}\}/gm),tr=R(/<%[\w\W]*|[\w\W]*%>/gm),rr=R(/\${[\w\W]*}/gm),ar=R(/^data-[\-\w.\u00B7-\uFFFF]/),nr=R(/^aria-[\-\w]+$/),ir=R(/^(?:(?:(?:f|ht)tps?|mailto|tel|callto|cid|xmpp):|[^a-z]|[a-z+.\-]+(?:[^a-z+.\-:]|$))/i),or=R(/^(?:\w+script|data):/i),lr=R(/[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g),sr=R(/^html$/i),ur=function(){return typeof window>"u"?null:window},fr=function(n,o){if(C(n)!=="object"||typeof n.createPolicy!="function")return null;var s=null,f="data-tt-policy-suffix";o.currentScript&&o.currentScript.hasAttribute(f)&&(s=o.currentScript.getAttribute(f));var O="dompurify"+(s?"#"+s:"");try{return n.createPolicy(O,{createHTML:function(L){return L},createScriptURL:function(L){return L}})}catch(D){return console.warn("TrustedTypes policy "+O+" could not be created."),null}};function dt(){var r=arguments.length>0&&arguments[0]!==void 0?arguments[0]:ur(),n=function(e){return dt(e)};if(n.version="2.4.5",n.removed=[],!r||!r.document||r.document.nodeType!==9)return n.isSupported=!1,n;var o=r.document,s=r.document,f=r.DocumentFragment,O=r.HTMLTemplateElement,D=r.Node,L=r.Element,B=r.NodeFilter,$=r.NamedNodeMap,Tt=$===void 0?r.NamedNodeMap||r.MozNamedAttrMap:$,vt=r.HTMLFormElement,ht=r.DOMParser,q=r.trustedTypes,K=L.prototype,_t=ne(K,"cloneNode"),At=ne(K,"nextSibling"),Et=ne(K,"childNodes"),ue=ne(K,"parentNode");if(typeof O=="function"){var fe=s.createElement("template");fe.content&&fe.content.ownerDocument&&(s=fe.content.ownerDocument)}var g=fr(q,o),ce=g?g.createHTML(""):"",Z=s,me=Z.implementation,yt=Z.createNodeIterator,gt=Z.createDocumentFragment,bt=Z.getElementsByTagName,St=o.importNode,Ue={};try{Ue=P(s).documentMode?s.documentMode:{}}catch(i){}var N={};n.isSupported=typeof ue=="function"&&me&&typeof me.createHTMLDocument<"u"&&Ue!==9;var pe=er,de=tr,Te=rr,Rt=ar,Ot=nr,Lt=or,He=lr,ve=ir,m=null,ze=l({},[].concat(S(ut),S(we),S(Ie),S(Ce),S(ft))),p=null,Ge=l({},[].concat(S(ct),S(xe),S(mt),S(ie))),c=Object.seal(Object.create(null,{tagNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},attributeNameCheck:{writable:!0,configurable:!1,enumerable:!0,value:null},allowCustomizedBuiltInElements:{writable:!0,configurable:!1,enumerable:!0,value:!1}})),j=null,he=null,We=!0,_e=!0,Be=!1,$e=!0,F=!1,x=!1,Ae=!1,Ee=!1,U=!1,J=!1,Q=!1,je=!0,Ye=!1,Nt="user-content-",ye=!0,Y=!1,H={},z=null,Ve=l({},["annotation-xml","audio","colgroup","desc","foreignobject","head","iframe","math","mi","mn","mo","ms","mtext","noembed","noframes","noscript","plaintext","script","style","svg","template","thead","title","video","xmp"]),Xe=null,qe=l({},["audio","video","img","source","image","track"]),ge=null,Ke=l({},["alt","class","for","id","label","name","pattern","placeholder","role","summary","title","value","style","xmlns"]),ee="http://www.w3.org/1998/Math/MathML",te="http://www.w3.org/2000/svg",M="http://www.w3.org/1999/xhtml",G=M,be=!1,Se=null,Dt=l({},[ee,te,M],De),k,Mt=["application/xhtml+xml","text/html"],wt="text/html",d,W=null,It=s.createElement("form"),Ze=function(e){return e instanceof RegExp||e instanceof Function},Re=function(e){W&&W===e||((!e||C(e)!=="object")&&(e={}),e=P(e),k=Mt.indexOf(e.PARSER_MEDIA_TYPE)===-1?k=wt:k=e.PARSER_MEDIA_TYPE,d=k==="application/xhtml+xml"?De:le,m="ALLOWED_TAGS"in e?l({},e.ALLOWED_TAGS,d):ze,p="ALLOWED_ATTR"in e?l({},e.ALLOWED_ATTR,d):Ge,Se="ALLOWED_NAMESPACES"in e?l({},e.ALLOWED_NAMESPACES,De):Dt,ge="ADD_URI_SAFE_ATTR"in e?l(P(Ke),e.ADD_URI_SAFE_ATTR,d):Ke,Xe="ADD_DATA_URI_TAGS"in e?l(P(qe),e.ADD_DATA_URI_TAGS,d):qe,z="FORBID_CONTENTS"in e?l({},e.FORBID_CONTENTS,d):Ve,j="FORBID_TAGS"in e?l({},e.FORBID_TAGS,d):{},he="FORBID_ATTR"in e?l({},e.FORBID_ATTR,d):{},H="USE_PROFILES"in e?e.USE_PROFILES:!1,We=e.ALLOW_ARIA_ATTR!==!1,_e=e.ALLOW_DATA_ATTR!==!1,Be=e.ALLOW_UNKNOWN_PROTOCOLS||!1,$e=e.ALLOW_SELF_CLOSE_IN_ATTR!==!1,F=e.SAFE_FOR_TEMPLATES||!1,x=e.WHOLE_DOCUMENT||!1,U=e.RETURN_DOM||!1,J=e.RETURN_DOM_FRAGMENT||!1,Q=e.RETURN_TRUSTED_TYPE||!1,Ee=e.FORCE_BODY||!1,je=e.SANITIZE_DOM!==!1,Ye=e.SANITIZE_NAMED_PROPS||!1,ye=e.KEEP_CONTENT!==!1,Y=e.IN_PLACE||!1,ve=e.ALLOWED_URI_REGEXP||ve,G=e.NAMESPACE||M,c=e.CUSTOM_ELEMENT_HANDLING||{},e.CUSTOM_ELEMENT_HANDLING&&Ze(e.CUSTOM_ELEMENT_HANDLING.tagNameCheck)&&(c.tagNameCheck=e.CUSTOM_ELEMENT_HANDLING.tagNameCheck),e.CUSTOM_ELEMENT_HANDLING&&Ze(e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck)&&(c.attributeNameCheck=e.CUSTOM_ELEMENT_HANDLING.attributeNameCheck),e.CUSTOM_ELEMENT_HANDLING&&typeof e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements=="boolean"&&(c.allowCustomizedBuiltInElements=e.CUSTOM_ELEMENT_HANDLING.allowCustomizedBuiltInElements),F&&(_e=!1),J&&(U=!0),H&&(m=l({},S(ft)),p=[],H.html===!0&&(l(m,ut),l(p,ct)),H.svg===!0&&(l(m,we),l(p,xe),l(p,ie)),H.svgFilters===!0&&(l(m,Ie),l(p,xe),l(p,ie)),H.mathMl===!0&&(l(m,Ce),l(p,mt),l(p,ie))),e.ADD_TAGS&&(m===ze&&(m=P(m)),l(m,e.ADD_TAGS,d)),e.ADD_ATTR&&(p===Ge&&(p=P(p)),l(p,e.ADD_ATTR,d)),e.ADD_URI_SAFE_ATTR&&l(ge,e.ADD_URI_SAFE_ATTR,d),e.FORBID_CONTENTS&&(z===Ve&&(z=P(z)),l(z,e.FORBID_CONTENTS,d)),ye&&(m["#text"]=!0),x&&l(m,["html","head","body"]),m.table&&(l(m,["tbody"]),delete j.tbody),A&&A(e),W=e)},Je=l({},["mi","mo","mn","ms","mtext"]),Qe=l({},["foreignobject","desc","title","annotation-xml"]),Ct=l({},["title","style","font","a","script"]),re=l({},we);l(re,Ie),l(re,Jt);var Oe=l({},Ce);l(Oe,Qt);var xt=function(e){var t=ue(e);(!t||!t.tagName)&&(t={namespaceURI:G,tagName:"template"});var a=le(e.tagName),u=le(t.tagName);return Se[e.namespaceURI]?e.namespaceURI===te?t.namespaceURI===M?a==="svg":t.namespaceURI===ee?a==="svg"&&(u==="annotation-xml"||Je[u]):!!re[a]:e.namespaceURI===ee?t.namespaceURI===M?a==="math":t.namespaceURI===te?a==="math"&&Qe[u]:!!Oe[a]:e.namespaceURI===M?t.namespaceURI===te&&!Qe[u]||t.namespaceURI===ee&&!Je[u]?!1:!Oe[a]&&(Ct[a]||!re[a]):!!(k==="application/xhtml+xml"&&Se[e.namespaceURI]):!1},w=function(e){X(n.removed,{element:e});try{e.parentNode.removeChild(e)}catch(t){try{e.outerHTML=ce}catch(a){e.remove()}}},Le=function(e,t){try{X(n.removed,{attribute:t.getAttributeNode(e),from:t})}catch(a){X(n.removed,{attribute:null,from:t})}if(t.removeAttribute(e),e==="is"&&!p[e])if(U||J)try{w(t)}catch(a){}else try{t.setAttribute(e,"")}catch(a){}},et=function(e){var t,a;if(Ee)e="<remove></remove>"+e;else{var u=Xt(e,/^[\r\n\t ]+/);a=u&&u[0]}k==="application/xhtml+xml"&&G===M&&(e='<html xmlns="http://www.w3.org/1999/xhtml"><head></head><body>'+e+"</body></html>");var E=g?g.createHTML(e):e;if(G===M)try{t=new ht().parseFromString(E,k)}catch(v){}if(!t||!t.documentElement){t=me.createDocument(G,"template",null);try{t.documentElement.innerHTML=be?ce:E}catch(v){}}var h=t.body||t.documentElement;return e&&a&&h.insertBefore(s.createTextNode(a),h.childNodes[0]||null),G===M?bt.call(t,x?"html":"body")[0]:x?t.documentElement:h},tt=function(e){return yt.call(e.ownerDocument||e,e,B.SHOW_ELEMENT|B.SHOW_COMMENT|B.SHOW_TEXT,null,!1)},kt=function(e){return e instanceof vt&&(typeof e.nodeName!="string"||typeof e.textContent!="string"||typeof e.removeChild!="function"||!(e.attributes instanceof Tt)||typeof e.removeAttribute!="function"||typeof e.setAttribute!="function"||typeof e.namespaceURI!="string"||typeof e.insertBefore!="function"||typeof e.hasChildNodes!="function")},V=function(e){return C(D)==="object"?e instanceof D:e&&C(e)==="object"&&typeof e.nodeType=="number"&&typeof e.nodeName=="string"},I=function(e,t,a){N[e]&&Vt(N[e],function(u){u.call(n,t,a,W)})},rt=function(e){var t;if(I("beforeSanitizeElements",e,null),kt(e)||_(/[\u0080-\uFFFF]/,e.nodeName))return w(e),!0;var a=d(e.nodeName);if(I("uponSanitizeElement",e,{tagName:a,allowedTags:m}),e.hasChildNodes()&&!V(e.firstElementChild)&&(!V(e.content)||!V(e.content.firstElementChild))&&_(/<[/\w]/g,e.innerHTML)&&_(/<[/\w]/g,e.textContent)||a==="select"&&_(/<template/i,e.innerHTML))return w(e),!0;if(!m[a]||j[a]){if(!j[a]&&nt(a)&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,a)||c.tagNameCheck instanceof Function&&c.tagNameCheck(a)))return!1;if(ye&&!z[a]){var u=ue(e)||e.parentNode,E=Et(e)||e.childNodes;if(E&&u)for(var h=E.length,v=h-1;v>=0;--v)u.insertBefore(_t(E[v],!0),At(e))}return w(e),!0}return e instanceof L&&!xt(e)||(a==="noscript"||a==="noembed")&&_(/<\/no(script|embed)/i,e.innerHTML)?(w(e),!0):(F&&e.nodeType===3&&(t=e.textContent,t=b(t,pe," "),t=b(t,de," "),t=b(t,Te," "),e.textContent!==t&&(X(n.removed,{element:e.cloneNode()}),e.textContent=t)),I("afterSanitizeElements",e,null),!1)},at=function(e,t,a){if(je&&(t==="id"||t==="name")&&(a in s||a in It))return!1;if(!(_e&&!he[t]&&_(Rt,t))){if(!(We&&_(Ot,t))){if(!p[t]||he[t]){if(!(nt(e)&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,e)||c.tagNameCheck instanceof Function&&c.tagNameCheck(e))&&(c.attributeNameCheck instanceof RegExp&&_(c.attributeNameCheck,t)||c.attributeNameCheck instanceof Function&&c.attributeNameCheck(t))||t==="is"&&c.allowCustomizedBuiltInElements&&(c.tagNameCheck instanceof RegExp&&_(c.tagNameCheck,a)||c.tagNameCheck instanceof Function&&c.tagNameCheck(a))))return!1}else if(!ge[t]){if(!_(ve,b(a,He,""))){if(!((t==="src"||t==="xlink:href"||t==="href")&&e!=="script"&&qt(a,"data:")===0&&Xe[e])){if(!(Be&&!_(Lt,b(a,He,"")))){if(a)return!1}}}}}}return!0},nt=function(e){return e.indexOf("-")>0},it=function(e){var t,a,u,E;I("beforeSanitizeAttributes",e,null);var h=e.attributes;if(h){var v={attrName:"",attrValue:"",keepAttr:!0,allowedAttributes:p};for(E=h.length;E--;){t=h[E];var ae=t,T=ae.name,Ne=ae.namespaceURI;if(a=T==="value"?t.value:Kt(t.value),u=d(T),v.attrName=u,v.attrValue=a,v.keepAttr=!0,v.forceKeepAttr=void 0,I("uponSanitizeAttribute",e,v),a=v.attrValue,!v.forceKeepAttr&&(Le(T,e),!!v.keepAttr)){if(!$e&&_(/\/>/i,a)){Le(T,e);continue}F&&(a=b(a,pe," "),a=b(a,de," "),a=b(a,Te," "));var ot=d(e.nodeName);if(at(ot,u,a)){if(Ye&&(u==="id"||u==="name")&&(Le(T,e),a=Nt+a),g&&C(q)==="object"&&typeof q.getAttributeType=="function"&&!Ne)switch(q.getAttributeType(ot,u)){case"TrustedHTML":a=g.createHTML(a);break;case"TrustedScriptURL":a=g.createScriptURL(a);break}try{Ne?e.setAttributeNS(Ne,T,a):e.setAttribute(T,a),st(n.removed)}catch(cr){}}}}I("afterSanitizeAttributes",e,null)}},Pt=function i(e){var t,a=tt(e);for(I("beforeSanitizeShadowDOM",e,null);t=a.nextNode();)I("uponSanitizeShadowNode",t,null),!rt(t)&&(t.content instanceof f&&i(t.content),it(t));I("afterSanitizeShadowDOM",e,null)};return n.sanitize=function(i){var e=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{},t,a,u,E,h;if(be=!i,be&&(i="<!-->"),typeof i!="string"&&!V(i)){if(typeof i.toString!="function")throw Me("toString is not a function");if(i=i.toString(),typeof i!="string")throw Me("dirty is not a string, aborting")}if(!n.isSupported){if(C(r.toStaticHTML)==="object"||typeof r.toStaticHTML=="function"){if(typeof i=="string")return r.toStaticHTML(i);if(V(i))return r.toStaticHTML(i.outerHTML)}return i}if(Ae||Re(e),n.removed=[],typeof i=="string"&&(Y=!1),Y){if(i.nodeName){var v=d(i.nodeName);if(!m[v]||j[v])throw Me("root node is forbidden and cannot be sanitized in-place")}}else if(i instanceof D)t=et("<!---->"),a=t.ownerDocument.importNode(i,!0),a.nodeType===1&&a.nodeName==="BODY"||a.nodeName==="HTML"?t=a:t.appendChild(a);else{if(!U&&!F&&!x&&i.indexOf("<")===-1)return g&&Q?g.createHTML(i):i;if(t=et(i),!t)return U?null:Q?ce:""}t&&Ee&&w(t.firstChild);for(var ae=tt(Y?i:t);u=ae.nextNode();)u.nodeType===3&&u===E||rt(u)||(u.content instanceof f&&Pt(u.content),it(u),E=u);if(E=null,Y)return i;if(U){if(J)for(h=gt.call(t.ownerDocument);t.firstChild;)h.appendChild(t.firstChild);else h=t;return(p.shadowroot||p.shadowrootmod)&&(h=St.call(o,h,!0)),h}var T=x?t.outerHTML:t.innerHTML;return x&&m["!doctype"]&&t.ownerDocument&&t.ownerDocument.doctype&&t.ownerDocument.doctype.name&&_(sr,t.ownerDocument.doctype.name)&&(T="<!DOCTYPE "+t.ownerDocument.doctype.name+`>
`+T),F&&(T=b(T,pe," "),T=b(T,de," "),T=b(T,Te," ")),g&&Q?g.createHTML(T):T},n.setConfig=function(i){Re(i),Ae=!0},n.clearConfig=function(){W=null,Ae=!1},n.isValidAttribute=function(i,e,t){W||Re({});var a=d(i),u=d(e);return at(a,u,t)},n.addHook=function(i,e){typeof e=="function"&&(N[i]=N[i]||[],X(N[i],e))},n.removeHook=function(i){if(N[i])return st(N[i])},n.removeHooks=function(i){N[i]&&(N[i]=[])},n.removeAllHooks=function(){N={}},n}var mr=dt();export{mr as default};
