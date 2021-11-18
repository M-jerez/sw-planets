(function(e){function t(t){for(var r,i,o=t[0],c=t[1],l=t[2],d=0,p=[];d<o.length;d++)i=o[d],Object.prototype.hasOwnProperty.call(s,i)&&s[i]&&p.push(s[i][0]),s[i]=0;for(r in c)Object.prototype.hasOwnProperty.call(c,r)&&(e[r]=c[r]);u&&u(t);while(p.length)p.shift()();return a.push.apply(a,l||[]),n()}function n(){for(var e,t=0;t<a.length;t++){for(var n=a[t],r=!0,o=1;o<n.length;o++){var c=n[o];0!==s[c]&&(r=!1)}r&&(a.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},s={app:0},a=[];function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var l=0;l<o.length;l++)t(o[l]);var u=c;a.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},5250:function(e,t,n){},"5c0b":function(e,t,n){"use strict";n("9c0c")},"9b19":function(e,t,n){e.exports=n.p+"img/logo.e06d1296.svg"},"9c0c":function(e,t,n){},a79c:function(e,t,n){"use strict";n("c6da")},b032:function(e,t,n){"use strict";n("5250")},c6da:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"container"},[n("h1",[e._v("Star Wars Planets")]),n("div",{staticClass:"grid"},[n("div",[n("PeopleTable")],1)])]),n("notifications",{attrs:{group:"app",width:"400px",position:"top right"}})],1)},a=[],i=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("table",[r("thead",[r("tr",[r("th",{attrs:{colspan:"5"}},[r("input",{attrs:{type:"text",id:"filter",name:"filter",placeholder:"Find A Character"},on:{input:e.filterPersons}})]),r("th",[r("span",{staticClass:"reset",attrs:{"data-tooltip":"Reload Data"},on:{click:function(t){return e.reloadData()}}},[e._v("⟳")])])]),r("tr",e._l(e.columns,(function(e){return r("PeopleHeader",{key:e.orderBy,attrs:{column:e}})})),1)]),r("tbody",[e._l(e.persons,(function(t){return r("tr",{key:t.url},[r("th",{attrs:{scope:"row"}},[e._v(e._s(t.name))]),r("td",[e._v(e._s(t.height))]),r("td",[e._v(e._s(t.mass))]),r("td",[e._v(e._s(e._f("formatDate")(t.created)))]),r("td",[e._v(e._s(e._f("formatDate")(t.edited)))]),r("td",{staticClass:"planet-column",on:{click:function(n){return e.selectPlanet(t.planetId)}}},[e._v(" "+e._s(t.planetName)+" ")])])})),e.persons&&0!==e.persons.length?e._e():r("tr",[r("td",{staticClass:"no-results",attrs:{scope:"row",colspan:"6"}},[e.$store.state.filter?r("h3",[r("span",{staticClass:"missing-name"},[e._v(e._s(e.$store.state.filter))]),e._v(" is missing ")]):e._e(),e.$store.state.isLoading?r("h3",[r("p",{attrs:{"aria-busy":"true"}},[e._v(" ")])]):e._e(),r("img",{attrs:{src:n("9b19"),alt:"start wras",width:"300"}})])])],2)]),r("modal",{attrs:{name:"planet-modal"}},[e.selectedPlanet?r("table",{staticClass:"planet-info",attrs:{"data-theme":"light"}},[r("thead",[r("tr",[r("th",{staticClass:"planet-title",attrs:{colspan:"2"}},[e._v(" Star Wars Planet "),r("br"),r("span",{staticClass:"planet-name"},[e._v(e._s(e.selectedPlanet.name))])])])]),r("tbody",[r("tr",[r("td",[e._v("Diameter")]),r("td",[e._v(e._s(e.selectedPlanet.diameter)+"KM")])]),r("tr",[r("td",[e._v("Climate")]),r("td",[e._v(e._s(e.selectedPlanet.climate))])]),r("tr",[r("td",[e._v("Population")]),r("td",[e._v(e._s(e._f("formatNumber")(e.selectedPlanet.population)))])])])]):e._e()])],1)},o=[],c=n("5530"),l=(n("e9c4"),n("2f62")),u={ten:{size:10,displayText:"10"},twenty:{size:20,displayText:"20"},fifty:{size:50,displayText:"50"},all:{size:-1,displayText:"All"}},d={name:{text:"Character",orderBy:"name"},heigh:{text:"height",orderBy:"height"},mass:{text:"weight",orderBy:"mass"},created:{text:"created",orderBy:"created"},edited:{text:"edited",orderBy:"edited"},planetName:{text:"planet",orderBy:"planetName"}},p=n("5a0c"),f=n.n(p),g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("th",{staticClass:"peopleHeader",class:{isActive:e.isActive},attrs:{scope:"col"},on:{click:function(t){return e.toggleOrderBy()}}},[n("span",{staticClass:"title"},[e._v(e._s(e.column.text)+" ")]),e.isAscending?n("span",{staticClass:"direction"},[e._v("▲")]):e._e(),e.isDescending?n("span",{staticClass:"direction"},[e._v("▼")]):e._e(),e.isActive?e._e():n("span",{staticClass:"direction empty"},[e._v("⇕")])])},m=[],h=r["default"].extend({props:["column"],computed:Object(c["a"])({},Object(l["c"])({isActive:function(e){return e.orderBy===this.column.orderBy},isAscending:function(e){return this.isActive&&null!==e.isDescending&&!e.isDescending},isDescending:function(e){return this.isActive&&null!==e.isDescending&&e.isDescending}})),methods:{toggleOrderBy:function(){this.$store.dispatch("toggleOrderBy",this.column.orderBy)}}}),v=h,b=(n("a79c"),n("2877")),y=Object(b["a"])(v,g,m,!1,null,"6eed2aa8",null),P=y.exports,_=n("ade3"),O=(n("d81d"),n("b0c0"),n("ac1f"),n("5319"),n("d3b7"),n("99af"),n("1276"),n("5b81"),n("a9e3"),n("4de4"),n("caad"),n("2532"),n("b64b"),n("d4b9"));function w(e,t,n){if(!e||!e.length)return[];var r=n?"desc":"asc";return Object(O["a"])(e,t,r)}function j(e,t){return e&&e.length?e.map((function(e){var n=D("planets",e.homeworld),r=t[n],s=r?r.name:"",a=e.name.toLowerCase();return Object(c["a"])(Object(c["a"])({},e),{},{id:D("people",e.url),planetName:s,planetId:n,massNum:C(e.mass),heighNum:C(e.height),nameLowerCase:a,nameLowerNonAlpha:e.name.toLowerCase().replace(/\W/,"")})})):[]}function x(e,t){return e.map((function(e){return Object(c["a"])(Object(c["a"])({},e),{},{id:D(t,e.url)})}))}function B(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"id";return e&&e.length?e.reduce((function(e,n){var r=n[t];if("undefined"===typeof r)throw new Error("Invalid key ".concat(t,", is not defined in object ").concat(JSON.stringify(n)));return Object(c["a"])(Object(c["a"])({},e),{},Object(_["a"])({},r,n))}),{}):{}}function D(e,t){var n=t.replace("https://swapi.dev/api/".concat(e,"/"),""),r=n.split("/"),s=""===r[0]?r[1]:r[0];return parseInt(s,10)}function C(e){var t=e.replaceAll(",",""),n=Number(t);return isNaN(n)?-1:n}function M(e,t){return e.filter((function(e){return e.nameLowerCase.includes(t)||e.nameLowerNonAlpha.includes(t)||t.includes(e.nameLowerCase)||t.includes(e.nameLowerNonAlpha)}))}function k(e,t,n){var r=e.persons.length===t&&e.persons.length===Object.keys(e.personsMap).length,s=e.planets.length===n&&e.planets.length===Object.keys(e.planetsMap).length;return r&&s}var N=r["default"].extend({components:{PeopleHeader:P},data:function(){return{columns:JSON.parse(JSON.stringify(d))}},computed:Object(c["a"])(Object(c["a"])({},Object(l["b"])({persons:"getDisplayedPersons"})),{},{selectedPlanet:function(){return this.$store.state.selectedPlanet}}),filters:{formatDate:function(e){var t=f()(e),n=t.format("lll");return n},formatNumber:function(e){if("number"===typeof e)return(new Intl.NumberFormat).format(e);var t=C(e);return-1===t?e:(new Intl.NumberFormat).format(t)}},methods:{filterPersons:function(e){this.$store.dispatch("filterPersons",e.currentTarget.value||"")},reloadData:function(){this.$store.dispatch("reloadData")},selectPlanet:function(e){this.$store.dispatch("selectPlanet",e),this.$modal.show("planet-modal")}}}),L=N,S=(n("b032"),Object(b["a"])(L,i,o,!1,null,"5350cbd0",null)),A=S.exports,z={components:{PeopleTable:A}},$=z,T=(n("5c0b"),Object(b["a"])($,s,a,!1,null,null,null)),R=T.exports,I=n("3835"),E=n("1da1"),F=(n("96cf"),n("07ac"),n("3ca3"),n("ddb0"),n("fb6a"),n("2909"));function J(e){return H.apply(this,arguments)}function H(){return H=Object(E["a"])(regeneratorRuntime.mark((function e(t){return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.abrupt("return",fetch(t).then((function(e){return e.json()})));case 1:case"end":return e.stop()}}),e)}))),H.apply(this,arguments)}function W(e){return U.apply(this,arguments)}function U(){return U=Object(E["a"])(regeneratorRuntime.mark((function e(t){var n,r,s,a,i,o=arguments;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:n=o.length>1&&void 0!==o[1]?o[1]:50,r=[],s=t,a=0;case 4:if(!(a<n)){e.next=16;break}return e.next=7,fetch(t).then((function(e){return e.json()}));case 7:if(i=e.sent,r.push.apply(r,Object(F["a"])(i.results)),i.next){e.next=12;break}return i.results=r,e.abrupt("return",i);case 12:t=i.next;case 13:a++,e.next=4;break;case 16:throw{originalUrl:s,lastUrl:t,message:"Collection is too big, it is not possible to retrieve the full collection",totalRequests:a,totalItems:r.length};case 17:case"end":return e.stop()}}),e)}))),U.apply(this,arguments)}function q(e){return{entity:e,getAll:function(){return W("https://swapi.dev/api/".concat(e,"/?page=1"))},getPage:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:1;return J("https://swapi.dev/api/".concat(e,"/?page=").concat(t))},getById:function(t){return J("https://swapi.dev/api/".concat(e,"/").concat(t))}}}var K={persons:q("people"),planets:q("planets"),getResource:function(e){return J(e)}},G=n("0e44");r["default"].use(l["a"]);var Q=new l["a"].Store({plugins:[Object(G["a"])()],state:{persons:[],planets:[],personsMap:{},planetsMap:{},orderBy:"id",isDescending:!1,filterBy:"name",filter:"",pageSize:u.all,currentPage:1,filteredPersons:[],selectedPlanet:null,isLoading:!1},mutations:{setPersons:function(e,t){var n=j(t,e.planetsMap);e.personsMap=Object(c["a"])(Object(c["a"])({},e.personsMap),B(n)),e.persons=Object.values(e.personsMap)},setPlanets:function(e,t){var n=x(t,"planets");e.planetsMap=Object(c["a"])(Object(c["a"])({},e.planetsMap),B(n)),e.planets=Object.values(e.planetsMap)},orderBy:function(e,t){var n=t.orderBy,r=t.isDescending;e.orderBy=n,e.isDescending=r,e.persons=w(e.persons,n,r),e.filteredPersons=w(e.filteredPersons,n,r)},toggleOrderBy:function(e,t){e.orderBy!==t?(e.orderBy=t,e.isDescending=!0):!0===e.isDescending?e.isDescending=!1:!1===e.isDescending&&(e.isDescending=!1,e.orderBy="id"),e.persons=w(e.persons,e.orderBy,e.isDescending),e.filteredPersons=w(e.filteredPersons,e.orderBy,e.isDescending)},filterPersons:function(e,t){if(t=t.toLowerCase(),e.filter!==t){if(e.filter=t,!e.filter)return e.filter="",e.filteredPersons=[],void(e.currentPage=1);e.filteredPersons=M(e.persons,e.filter),e.currentPage=1}},resetFilter:function(e){e.filter="",e.filteredPersons=[],e.currentPage=1},reset:function(e){e.persons=[],e.planets=[],e.personsMap={},e.planetsMap={},e.orderBy="id",e.isDescending=!1,e.filterBy="name",e.filter="",e.pageSize=u.all,e.currentPage=1,e.filteredPersons=[],e.selectedPlanet=null,e.isLoading=!1},selectPlanet:function(e,t){e.selectedPlanet=e.planetsMap[t]},isLoading:function(e,t){e.isLoading=t}},actions:{init:function(e){var t=arguments;return Object(E["a"])(regeneratorRuntime.mark((function n(){var s,a,i,o,c,l,u,d,p,f;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(s=t.length>1&&void 0!==t[1]&&t[1],a=e.state,e.commit("resetFilter"),e.commit("isLoading",!0),n.prev=4,!(!s&&a.persons.length>0&&a.persons.length>0)){n.next=14;break}return n.next=8,Promise.all([K.planets.getPage(),K.persons.getPage()]);case 8:if(i=n.sent,o=Object(I["a"])(i,2),c=o[0],l=o[1],!k(a,l.count,c.count)){n.next=14;break}return n.abrupt("return",e.commit("isLoading",!1));case 14:return n.next=16,Promise.all([K.planets.getAll(),K.persons.getAll()]);case 16:u=n.sent,d=Object(I["a"])(u,2),p=d[0],f=d[1],e.commit("setPlanets",p.results),e.commit("setPersons",f.results),e.commit("orderBy",{orderBy:a.orderBy,isDescending:a.isDescending}),n.next=28;break;case 25:n.prev=25,n.t0=n["catch"](4),r["default"].notify({group:"app",type:"error",title:"Error Fetching Data",text:n.t0.message});case 28:e.commit("isLoading",!1);case 29:case"end":return n.stop()}}),n,null,[[4,25]])})))()},reloadData:function(e){e.commit("reset"),e.dispatch("init",!0)},orderBy:function(e,t){e.commit("orderBy",t)},toggleOrderBy:function(e,t){e.commit("toggleOrderBy",t)},resetOrder:function(e){e.commit("orderBy",{orderBy:"id",isDescending:!0})},filterPersons:function(e,t){e.commit("filterPersons",t)},selectPlanet:function(e,t){e.commit("selectPlanet",t)}},getters:{getDisplayedPersons:function(e){if(e.isLoading)return[];e.pageSize.size;var t=""!==e.filter?e.filteredPersons:e.persons;if(e.pageSize.size<=0)return t;var n=(e.currentPage-1)*e.pageSize.size,r=Math.min(t.length,n+e.pageSize.size);return t.slice(n,r+1)},isNextPageEnabled:function(e){var t=""!==e.filter?e.filteredPersons:e.persons,n=Math.ceil(t.length/e.pageSize.size);return e.currentPage<n},isPreviousPageEnabled:function(e){return e.currentPage>1}}}),V=n("ee98"),X=n.n(V),Y=n("1881"),Z=n.n(Y),ee=n("23ad"),te=n.n(ee);n("6d93"),n("c203");r["default"].config.productionTip=!1,r["default"].use(X.a),r["default"].use(Z.a),f.a.extend(te.a),new r["default"]({store:Q,render:function(e){return e(R)}}).$mount("#app"),Q.dispatch("init")}});
//# sourceMappingURL=app.857fbf9a.js.map