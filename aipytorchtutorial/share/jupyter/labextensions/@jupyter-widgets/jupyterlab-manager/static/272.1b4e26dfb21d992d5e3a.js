(self.webpackChunk_jupyter_widgets_jupyterlab_manager=self.webpackChunk_jupyter_widgets_jupyterlab_manager||[]).push([[272],{2272:(e,t,s)=>{"use strict";s.r(t),s.d(t,{CONTROL_COMM_PROTOCOL_VERSION:()=>A,CONTROL_COMM_TARGET:()=>k,CONTROL_COMM_TIMEOUT:()=>P,DOMWidgetModel:()=>R,DOMWidgetView:()=>q,IJupyterWidgetRegistry:()=>te,JUPYTER_WIDGETS_VERSION:()=>O,JupyterPhosphorPanelWidget:()=>K,JupyterPhosphorWidget:()=>J,LayoutModel:()=>G,LayoutView:()=>H,ManagerBase:()=>D,PROTOCOL_VERSION:()=>C,StyleModel:()=>Q,StyleView:()=>X,ViewList:()=>ee,WidgetModel:()=>I,WidgetView:()=>$,WrappedError:()=>_,assign:()=>d,base64ToBuffer:()=>E,bufferToBase64:()=>b,bufferToHex:()=>w,difference:()=>h,hexToBuffer:()=>y,isEqual:()=>c,pack_models:()=>U,put_buffers:()=>f,reject:()=>g,remove_buffers:()=>p,resolvePromisesDict:()=>u,serialize_state:()=>M,shims:()=>Z,unpack_models:()=>W,uuid:()=>m});var i=s(4782),o=s(1526),l=s(6141),r=s.n(l),n=s(861),a=s.n(n);function h(e,t){return e.filter((e=>-1===t.indexOf(e)))}function c(e,t){return r()(e,t)}let d=Object.assign||function(e){for(let t=1;t<arguments.length;t++){let s=arguments[t];for(let t in s)Object.prototype.hasOwnProperty.call(s,t)&&(e[t]=s[t])}return e};function m(){return o.UUID.uuid4()}class _ extends Error{constructor(e,t){super(e),console.warn("WrappedError has been deprecated!"),this.error_stack=t instanceof _?t.error_stack:[t],this.error_stack.push(this)}}function u(e){let t=Object.keys(e),s=[];return t.forEach((function(t){s.push(e[t])})),Promise.all(s).then((e=>{let s={};for(let i=0;i<t.length;i++)s[t[i]]=e[i];return s}))}function g(e,t){return function(s){throw t&&console.error(new Error(e)),s}}function f(e,t,s){for(let i=0;i<t.length;i++){let o=t[i],l=e;for(let e=0;e<o.length-1;e++)l=l[o[e]];l[o[o.length-1]]=s[i]}}function p(e){let t=[],s=[];return{state:function e(i,o){if(i.toJSON&&(i=i.toJSON()),Array.isArray(i)){let l=!1;for(let r=0;r<i.length;r++){let n=i[r];if(n)if(n instanceof ArrayBuffer||ArrayBuffer.isView(n))l||(i=i.slice(),l=!0),t.push(ArrayBuffer.isView(n)?n.buffer:n),s.push(o.concat([r])),i[r]=null;else{let t=e(n,o.concat([r]));t!==n&&(l||(i=i.slice(),l=!0),i[r]=t)}}}else if(a()(i))for(let l in i){let r=!1;if(i.hasOwnProperty(l)){let n=i[l];if(n)if(n instanceof ArrayBuffer||ArrayBuffer.isView(n))r||(i=Object.assign({},i),r=!0),t.push(ArrayBuffer.isView(n)?n.buffer:n),s.push(o.concat([l])),delete i[l];else{let t=e(n,o.concat([l]));t!==n&&(r||(i=Object.assign({},i),r=!0),i[l]=t)}}}return i}(e,[]),buffers:t,buffer_paths:s}}let v=["00","01","02","03","04","05","06","07","08","09","0A","0B","0C","0D","0E","0F","10","11","12","13","14","15","16","17","18","19","1A","1B","1C","1D","1E","1F","20","21","22","23","24","25","26","27","28","29","2A","2B","2C","2D","2E","2F","30","31","32","33","34","35","36","37","38","39","3A","3B","3C","3D","3E","3F","40","41","42","43","44","45","46","47","48","49","4A","4B","4C","4D","4E","4F","50","51","52","53","54","55","56","57","58","59","5A","5B","5C","5D","5E","5F","60","61","62","63","64","65","66","67","68","69","6A","6B","6C","6D","6E","6F","70","71","72","73","74","75","76","77","78","79","7A","7B","7C","7D","7E","7F","80","81","82","83","84","85","86","87","88","89","8A","8B","8C","8D","8E","8F","90","91","92","93","94","95","96","97","98","99","9A","9B","9C","9D","9E","9F","A0","A1","A2","A3","A4","A5","A6","A7","A8","A9","AA","AB","AC","AD","AE","AF","B0","B1","B2","B3","B4","B5","B6","B7","B8","B9","BA","BB","BC","BD","BE","BF","C0","C1","C2","C3","C4","C5","C6","C7","C8","C9","CA","CB","CC","CD","CE","CF","D0","D1","D2","D3","D4","D5","D6","D7","D8","D9","DA","DB","DC","DD","DE","DF","E0","E1","E2","E3","E4","E5","E6","E7","E8","E9","EA","EB","EC","ED","EE","EF","F0","F1","F2","F3","F4","F5","F6","F7","F8","F9","FA","FB","FC","FD","FE","FF"];function w(e){let t=new Uint8Array(e),s=[];for(let e=0;e<t.length;e++)s.push(v[t[e]]);return s.join("")}function y(e){let t=new Uint8Array(e.length/2);for(let s=0;s<e.length;s+=2)t[s/2]=parseInt(e.slice(s,s+2),16);return t.buffer}function b(e){return(0,i.JQ)(new Uint8Array(e))}function E(e){return(0,i.b$)(e).buffer}const O="1.2.0",C="2.1.0",j=C.split(".",1)[0],k="jupyter.widget.control",A="1.0.0",P=4e3;class D{constructor(){this.comm_target_name="jupyter.widget",this._models=Object.create(null)}display_model(e,t,s={}){return this.create_view(t,s).then((t=>this.display_view(e,t,s))).catch(g("Could not create view",!0))}setViewOptions(e={}){return e}create_view(e,t={}){let s=e.state_change=e.state_change.then((()=>this.loadClass(e.get("_view_name"),e.get("_view_module"),e.get("_view_module_version")).then((s=>{let i=new s({model:e,options:this.setViewOptions(t)});return i.listenTo(e,"destroy",i.remove),Promise.resolve(i.render()).then((()=>i))})).catch(g("Could not create a view for model id "+e.model_id,!0)))),i=m();return e.views[i]=s,s.then((e=>{e.once("remove",(()=>{delete e.model.views[i]}),this)})),e.state_change}callbacks(e){return{}}get_model(e){return this._models[e]}has_model(e){return void 0!==this._models[e]}handle_comm_open(e,t){let s=(t.metadata||{}).version||"";if(s.split(".",1)[0]!==j){let e=`Wrong widget protocol version: received protocol version '${s}', but was expecting major version '${j}'`;return console.error(e),Promise.reject(e)}let i=t.content.data,o=i.buffer_paths||[],l=(t.buffers||[]).map((e=>e instanceof DataView?e:new DataView(e instanceof ArrayBuffer?e:e.buffer)));return f(i.state,o,l),this.new_model({model_name:i.state._model_name,model_module:i.state._model_module,model_module_version:i.state._model_module_version,comm:e},i.state).catch(g("Could not create a model.",!0))}new_widget(e,t={}){let s;if(void 0===e.view_name||void 0===e.view_module||void 0===e.view_module_version)return Promise.reject("new_widget(...) must be given view information in the options.");s=e.comm?Promise.resolve(e.comm):this._create_comm(this.comm_target_name,e.model_id,{state:{_model_module:e.model_module,_model_module_version:e.model_module_version,_model_name:e.model_name,_view_module:e.view_module,_view_module_version:e.view_module_version,_view_name:e.view_name}},{version:C});let i=Object.assign({},e);return s.then((e=>(i.comm=e,this.new_model(i,t).then((e=>(e.sync("create",e),e))))),(()=>(i.model_id||(i.model_id=m()),this.new_model(i,t))))}register_model(e,t){this._models[e]=t,t.then((t=>{t.once("comm:close",(()=>{delete this._models[e]}))}))}async new_model(e,t={}){let s;if(e.model_id)s=e.model_id;else{if(!e.comm)throw new Error("Neither comm nor model_id provided in options object. At least one must exist.");s=e.model_id=e.comm.comm_id}let i=this._make_model(e,t);return this.register_model(s,i),await i}async _make_model(e,t={}){let s,i=e.model_id,o=this.loadClass(e.model_name,e.model_module,e.model_module_version);try{s=await o}catch(e){throw console.error("Could not instantiate widget"),e}if(!s)throw new Error(`Cannot find model module ${e.model_module}@${e.model_module_version}, ${e.model_name}`);let l=await s._deserialize_state(t,this),r=new s(l,{widget_manager:this,model_id:i,comm:e.comm});return r.name=e.model_name,r.module=e.model_module,r}async _loadFromKernel(){let e,t;try{const s=await this._create_comm(k,m(),{},{version:A});await new Promise(((i,o)=>{s.on_msg((s=>{e=s.content.data,"update_states"===e.method?(t=(s.buffers||[]).map((e=>e instanceof DataView?e:new DataView(e instanceof ArrayBuffer?e:e.buffer))),i(null)):console.warn(`\n                        Unknown ${e.method} message on the Control channel\n                        `)})),s.on_close((()=>o("Control comm was closed too early"))),s.send({method:"request_states"},{}),setTimeout((()=>o("Control comm did not respond in time")),P)})),s.close()}catch(e){return console.warn('Failed to fetch ipywidgets through the "jupyter.widget.control" comm channel, fallback to fetching individual model state. Reason:',e),this._loadFromKernelModels()}const s=e.states,i={},o={};for(let s=0;s<e.buffer_paths.length;s++){const[l,...r]=e.buffer_paths[s],n=t[s];i[l]||(i[l]=[],o[l]=[]),i[l].push(r),o[l].push(n)}let l=await Promise.all(Object.keys(s).map((async e=>({widget_id:e,comm:this.has_model(e)?void 0:await this._create_comm("jupyter.widget",e)}))));await Promise.all(l.map((async({widget_id:e,comm:t})=>{const l=s[e];e in i&&f(l,i[e],o[e]);try{if(t)await this.new_model({model_name:l.model_name,model_module:l.model_module,model_module_version:l.model_module_version,model_id:e,comm:t},l.state);else{const t=await this.get_model(e),s=await t.constructor._deserialize_state(l.state,this);t.set_state(s)}}catch(e){console.error(e)}})))}async _loadFromKernelModels(){const e=await this._get_comm_info(),t=await Promise.all(Object.keys(e).map((async e=>{if(this.has_model(e))return;const t=await this._create_comm(this.comm_target_name,e);let s="";const i=new o.PromiseDelegate;return t.on_msg((e=>{if(e.parent_header.msg_id===s&&"comm_msg"===e.header.msg_type&&"update"===e.content.data.method){const s=e.content.data,o=s.buffer_paths||[],l=e.buffers||[];f(s.state,o,l),i.resolve({comm:t,msg:e})}})),s=t.send({method:"request_state"},this.callbacks(void 0)),i.promise})));await Promise.all(t.map((async e=>{if(!e)return;const t=e.msg.content;await this.new_model({model_name:t.data.state._model_name,model_module:t.data.state._model_module,model_module_version:t.data.state._model_module_version,comm:e.comm},t.data.state)})))}clear_state(){return u(this._models).then((e=>{Object.keys(e).forEach((t=>e[t].close())),this._models=Object.create(null)}))}get_state(e={}){const t=Object.keys(this._models).map((e=>this._models[e]));return Promise.all(t).then((t=>M(t,e)))}set_state(e){if(!(e.version_major&&e.version_major<=2))throw"Unsupported widget state format";let t=e.state;return this._get_comm_info().then((e=>Promise.all(Object.keys(t).map((s=>{let i={base64:E,hex:y},o=t[s],l=o.state;if(o.buffers){let e=o.buffers.map((e=>e.path)),t=o.buffers.map((e=>new DataView(i[e.encoding](e.data))));f(o.state,e,t)}if(this.has_model(s))return this.get_model(s).then((e=>e.constructor._deserialize_state(l||{},this).then((t=>(e.set_state(t),e)))));let r={model_id:s,model_name:o.model_name,model_module:o.model_module,model_module_version:o.model_module_version};return e.hasOwnProperty(s)?this._create_comm(this.comm_target_name,s).then((e=>(r.comm=e,this.new_model(r)))):this.new_model(r,l)})))))}disconnect(){Object.keys(this._models).forEach((e=>{this._models[e].then((e=>{e.comm_live=!1}))}))}resolveUrl(e){return Promise.resolve(e)}filterExistingModelState(e){let t=e.state;return t=Object.keys(t).filter((e=>!this.has_model(e))).reduce(((e,s)=>(e[s]=t[s],e)),{}),Object.assign(Object.assign({},e),{state:t})}}function M(e,t={}){const s={};return e.forEach((e=>{const i=e.model_id,o=p(e.serialize(e.get_state(t.drop_defaults))),l=o.buffers.map(((e,t)=>({data:b(e),path:o.buffer_paths[t],encoding:"base64"})));s[i]={model_name:e.name,model_module:e.module,model_module_version:e.get("_model_module_version"),state:o.state},l.length>0&&(s[i].buffers=l)})),{version_major:2,version_minor:0,state:s}}function S(e,t,s){if(null==e)return this;let i;if("object"==typeof e?(i=e,s=t):(i={})[e]=t,s||(s={}),!this._validate(i,s))return!1;let o=s.unset,l=s.silent,r=[],n=this._changing;this._changing=!0;try{n||(this._previousAttributes=Object.assign({},this.attributes),this.changed={});let e=this.attributes,a=this.changed,h=this._previousAttributes;for(let s in i)t=i[s],c(e[s],t)||r.push(s),c(h[s],t)?delete a[s]:a[s]=t,o?delete e[s]:e[s]=t;if(this.id=this.get(this.idAttribute),!l){r.length&&(this._pending=s);for(let t=0;t<r.length;t++)this.trigger("change:"+r[t],this,e[r[t]],s)}if(n)return this;if(!l)for(;this._pending;)s=this._pending,this._pending=!1,this.trigger("change",this,s)}finally{this._pending=!1,this._changing=!1}return this}var B=s(6083),x=s(1524),F=s.n(x);const z=Element.prototype;let T=z.matches||z.webkitMatchesSelector||z.mozMatchesSelector||z.msMatchesSelector||z.oMatchesSelector||function(e){let t=(this.document||this.ownerDocument).querySelectorAll(e),s=t.length;for(;--s>=0&&t.item(s)!==this;);return s>-1};class L extends B.View{_removeElement(){this.undelegateEvents(),this.el.parentNode&&this.el.parentNode.removeChild(this.el)}_setElement(e){this.el=e}_setAttributes(e){for(let t in e)t in this.el?this.el[t]=e[t]:this.el.setAttribute(t,e[t])}delegate(e,t,s){"string"!=typeof t&&(s=t,t=null),void 0===this._domEvents&&(this._domEvents=[]);let i=this.el,o=t?function(e){let o=e.target||e.srcElement;for(;o&&o!==i;o=o.parentNode)if(T.call(o,t))return e.delegateTarget=o,s.handleEvent?s.handleEvent(e):s(e)}:s;return this.el.addEventListener(e,o,!1),this._domEvents.push({eventName:e,handler:o,listener:s,selector:t}),o}undelegate(e,t,s){if("function"==typeof t&&(s=t,t=null),this.el&&this._domEvents){let i=this._domEvents.slice(),o=i.length;for(;o--;){let l=i[o];!(l.eventName!==e||s&&l.listener!==s||t&&l.selector!==t)&&(this.el.removeEventListener(l.eventName,l.handler,!1),this._domEvents.splice(o,1))}}return this}undelegateEvents(){if(this.el&&this._domEvents){let e=this._domEvents.length;for(let t=0;t<e;t++){let e=this._domEvents[t];this.el.removeEventListener(e.eventName,e.handler,!1)}this._domEvents.length=0}return this}}var N=s(3992),V=s(2720);function W(e,t){if(Array.isArray(e)){const s=[];return e.forEach(((e,i)=>{s.push(W(e,t))})),Promise.all(s)}if(e instanceof Object){const s={};return Object.keys(e).forEach((i=>{s[i]=W(e[i],t)})),u(s)}return"string"==typeof e&&"IPY_MODEL_"===e.slice(0,10)?t.get_model(e.slice(10,e.length)):Promise.resolve(e)}function U(e,t){if(Array.isArray(e)){const s=[];for(const i of e)s.push(U(i,t));return s}if(e instanceof I)return`IPY_MODEL_${e.model_id}`;if(!(e instanceof Object&&"string"!=typeof e))return e;{const s={};Object.keys(e).forEach((i=>{s[i]=U(e[i],t)}))}}class I extends B.Model{defaults(){return{_model_module:"@jupyter-widgets/base",_model_name:"WidgetModel",_model_module_version:O,_view_module:"@jupyter-widgets/base",_view_name:null,_view_module_version:O,_view_count:null}}isNew(){return!1}initialize(e,t){this._expectedEchoMsgIds={},this._attrsToUpdate={},super.initialize(e,t),this.widget_manager=t.widget_manager,this.model_id=t.model_id;let s=t.comm;this.views=Object.create(null),this.state_change=Promise.resolve(),this._closed=!1,this._state_lock=null,this._msg_buffer=null,this._msg_buffer_callbacks=null,this._pending_msgs=0,this._buffered_state_diff={},s?(this.comm=s,s.on_close(this._handle_comm_closed.bind(this)),s.on_msg(this._handle_comm_msg.bind(this)),this.comm_live=!0):this.comm_live=!1}get comm_live(){return this._comm_live}set comm_live(e){this._comm_live=e,this.trigger("comm_live_update")}send(e,t,s){if(void 0!==this.comm){let i={method:"custom",content:e};this.comm.send(i,t,{},s)}}close(e=!1){if(this._closed)return;this._closed=!0,this.comm&&!e&&this.comm.close(),this.stopListening(),this.trigger("destroy",this),this.comm&&delete this.comm;let t=Object.keys(this.views).map((e=>this.views[e].then((e=>e.remove()))));return delete this.views,Promise.all(t).then((()=>{}))}_handle_comm_closed(e){this.trigger("comm:close"),this.close(!0)}_handle_comm_msg(e){const t=e.content.data;let s=t.method;switch(s){case"update":case"echo_update":return this.state_change=this.state_change.then((()=>{var i,o,l;let r=t.state,n=null!=(i=t.buffer_paths)?i:[],a=(l=null===(o=e.buffers)||void 0===o?void 0:o.slice(0,n.length),null!=l?l:[]).map((e=>e instanceof DataView?e:new DataView(e instanceof ArrayBuffer?e:e.buffer)));if(f(r,n,a),e.parent_header&&"echo_update"===s){const t=e.parent_header.msg_id;Object.keys(r).filter((e=>this._expectedEchoMsgIds.hasOwnProperty(e))).forEach((e=>{this._expectedEchoMsgIds[e]!==t?delete r[e]:(delete this._expectedEchoMsgIds[e],null!==this._msg_buffer&&Object.prototype.hasOwnProperty.call(this._msg_buffer,e)&&delete r[e])}))}return this.constructor._deserialize_state(r,this.widget_manager)})).then((e=>{this.set_state(e)})).catch(g(`Could not process update msg for model id: ${this.model_id}`,!0)),this.state_change;case"custom":return this.trigger("msg:custom",t.content,e.buffers),Promise.resolve()}}set_state(e){this._state_lock=e;try{this.set(e)}catch(e){console.error(`Error setting state: ${e.message}`)}finally{this._state_lock=null}}get_state(e){let t=this.attributes;if(e){let e=this.defaults,s="function"==typeof e?e.call(this):e,i={};return Object.keys(t).forEach((e=>{c(t[e],s[e])||(i[e]=t[e])})),i}return Object.assign({},t)}_handle_status(e){if(void 0!==this.comm&&"idle"===e.content.execution_state&&(this._pending_msgs--,this._pending_msgs<0&&(console.error(`Jupyter Widgets message throttle: Pending messages < 0 (=${this._pending_msgs}), which is unexpected. Resetting to 0 to continue.`),this._pending_msgs=0),null!==this._msg_buffer&&this._pending_msgs<1)){const e=this.send_sync_message(this._msg_buffer,this._msg_buffer_callbacks);this.rememberLastUpdateFor(e),this._msg_buffer=null,this._msg_buffer_callbacks=null}}callbacks(e){return this.widget_manager.callbacks(e)}set(e,t,s){let i=S.call(this,e,t,s);if(void 0!==this._buffered_state_diff){let e=this.changedAttributes()||{};if(this._state_lock)for(const t of Object.keys(this._state_lock))e[t]===this._state_lock[t]&&delete e[t];this._buffered_state_diff=d(this._buffered_state_diff,e)}return i}sync(e,t,s={}){if(void 0===this.comm)throw"Syncing error: no comm channel defined";let i="patch"===e?s.attrs:t.get_state(s.drop_defaults);if(this._state_lock)for(const e of Object.keys(this._state_lock))i[e]===this._state_lock[e]&&delete i[e];Object.keys(i).forEach((e=>{this._attrsToUpdate[e]=!0}));let o=this.serialize(i);if(Object.keys(o).length>0){let t=s.callbacks||this.callbacks();if(this._pending_msgs>=1){switch(e){case"patch":this._msg_buffer=d(this._msg_buffer||{},o);break;case"update":case"create":this._msg_buffer=o;break;default:throw"unrecognized syncing method"}this._msg_buffer_callbacks=t}else{const e=this.send_sync_message(i,t);this.rememberLastUpdateFor(e)}}}rememberLastUpdateFor(e){Object.keys(this._attrsToUpdate).forEach((t=>{this._expectedEchoMsgIds[t]=e})),this._attrsToUpdate={}}serialize(e){const t=this.constructor.serializers||{};for(const s of Object.keys(e))try{t[s]&&t[s].serialize?e[s]=t[s].serialize(e[s],this):e[s]=JSON.parse(JSON.stringify(e[s])),e[s]&&e[s].toJSON&&(e[s]=e[s].toJSON())}catch(e){throw console.error("Error serializing widget state attribute: ",s),e}return e}send_sync_message(e,t={}){if(!this.comm)return"";try{const s=(t={shell:Object.assign({},t.shell),iopub:Object.assign({},t.iopub),input:t.input}).iopub.status;t.iopub.status=e=>{this._handle_status(e),s&&s(e)};let i=p(e);const o=this.comm.send({method:"update",state:i.state,buffer_paths:i.buffer_paths},t,{},i.buffers);return this._pending_msgs++,o}catch(e){console.error("Could not send widget sync message",e)}return""}save_changes(e){if(this.comm_live){let t={patch:!0};e&&(t.callbacks=e),this.save(this._buffered_state_diff,t),this._buffered_state_diff={}}}on_some_change(e,t,s){const i=this;this.on("change",(function(){e.some(i.hasChanged,i)&&t.apply(s,arguments)}),this)}toJSON(e){return`IPY_MODEL_${this.model_id}`}static _deserialize_state(e,t){let s,i=this.serializers;if(i){s={};for(let o in e)i[o]&&i[o].deserialize?s[o]=i[o].deserialize(e[o],t):s[o]=e[o]}else s=e;return u(s)}}class R extends I{defaults(){return d(super.defaults(),{_dom_classes:[]})}}R.serializers=Object.assign(Object.assign({},I.serializers),{layout:{deserialize:W},style:{deserialize:W}});class $ extends L{constructor(e){super(e)}initialize(e){this.listenTo(this.model,"change",(()=>{let e=Object.keys(this.model.changedAttributes()||{});"_view_count"===e[0]&&1===e.length||this.update()})),this.options=e.options,this.once("remove",(()=>{"number"==typeof this.model.get("_view_count")&&(this.model.set("_view_count",this.model.get("_view_count")-1),this.model.save_changes())})),this.once("displayed",(()=>{"number"==typeof this.model.get("_view_count")&&(this.model.set("_view_count",this.model.get("_view_count")+1),this.model.save_changes())})),this.displayed=new Promise(((e,t)=>{this.once("displayed",e)}))}update(e){}render(){}create_child_view(e,t={}){return t=Object.assign({parent:this},t),this.model.widget_manager.create_view(e,t).catch(g("Could not create child view",!0))}callbacks(){return this.model.callbacks(this)}send(e,t){this.model.send(e,this.callbacks(),t)}touch(){this.model.save_changes(this.callbacks())}remove(){return super.remove(),this.trigger("remove"),this}}class J extends N.Widget{constructor(e){let t=e.view;delete e.view,super(e),this._view=t}dispose(){this.isDisposed||(super.dispose(),this._view&&this._view.remove(),this._view=null)}processMessage(e){super.processMessage(e),this._view.processPhosphorMessage(e)}}class K extends N.Panel{constructor(e){let t=e.view;delete e.view,super(e),this._view=t}processMessage(e){super.processMessage(e),this._view.processPhosphorMessage(e)}dispose(){this.isDisposed||(super.dispose(),this._view&&this._view.remove(),this._view=null)}}class q extends ${initialize(e){super.initialize(e),this.listenTo(this.model,"change:_dom_classes",((e,t)=>{let s=e.previous("_dom_classes");this.update_classes(s,t)})),this.layoutPromise=Promise.resolve(),this.listenTo(this.model,"change:layout",((e,t)=>{this.setLayout(t,e.previous("layout"))})),this.stylePromise=Promise.resolve(),this.listenTo(this.model,"change:style",((e,t)=>{this.setStyle(t,e.previous("style"))})),this.displayed.then((()=>{this.update_classes([],this.model.get("_dom_classes")),this.setLayout(this.model.get("layout")),this.setStyle(this.model.get("style"))})),this._comm_live_update(),this.listenTo(this.model,"comm_live_update",(()=>{this._comm_live_update()}))}setLayout(e,t){e&&(this.layoutPromise=this.layoutPromise.then((t=>(t&&(t.unlayout(),this.stopListening(t.model),t.remove()),this.create_child_view(e).then((e=>this.displayed.then((()=>(e.trigger("displayed"),this.listenTo(e.model,"change",(()=>{V.MessageLoop.postMessage(this.pWidget,N.Widget.ResizeMessage.UnknownSize)})),V.MessageLoop.postMessage(this.pWidget,N.Widget.ResizeMessage.UnknownSize),e))))).catch(g("Could not add LayoutView to DOMWidgetView",!0))))))}setStyle(e,t){e&&(this.stylePromise=this.stylePromise.then((t=>(t&&(t.unstyle(),this.stopListening(t.model),t.remove()),this.create_child_view(e).then((e=>this.displayed.then((()=>(e.trigger("displayed"),e))))).catch(g("Could not add styleView to DOMWidgetView",!0))))))}update_classes(e,t,s){void 0===s&&(s=this.el),h(e,t).map((function(e){s.classList?s.classList.remove(e):s.setAttribute("class",s.getAttribute("class").replace(e,""))})),h(t,e).map((function(e){s.classList?s.classList.add(e):s.setAttribute("class",s.getAttribute("class").concat(" ",e))}))}update_mapped_classes(e,t,s){let i=this.model.previous(t),o=e[i]?e[i]:[];i=this.model.get(t);let l=e[i]?e[i]:[];this.update_classes(o,l,s||this.el)}set_mapped_classes(e,t,s){let i=this.model.get(t),o=e[i]?e[i]:[];this.update_classes([],o,s||this.el)}_setElement(e){this.pWidget&&this.pWidget.dispose(),this.$el=e instanceof F()?e:F()(e),this.el=this.$el[0],this.pWidget=new J({node:e,view:this})}remove(){return this.pWidget&&this.pWidget.dispose(),super.remove()}processPhosphorMessage(e){switch(e.type){case"after-attach":this.trigger("displayed")}}_comm_live_update(){this.model.comm_live?this.pWidget.removeClass("jupyter-widgets-disconnected"):this.pWidget.addClass("jupyter-widgets-disconnected")}}let Y={align_content:null,align_items:null,align_self:null,border:null,bottom:null,display:null,flex:null,flex_flow:null,height:null,justify_content:null,justify_items:null,left:null,margin:null,max_height:null,max_width:null,min_height:null,min_width:null,overflow:null,overflow_x:null,overflow_y:null,order:null,padding:null,right:null,top:null,visibility:null,width:null,object_fit:null,object_position:null,grid_auto_columns:null,grid_auto_flow:null,grid_auto_rows:null,grid_gap:null,grid_template_rows:null,grid_template_columns:null,grid_template_areas:null,grid_row:null,grid_column:null,grid_area:null};class G extends I{defaults(){return d(super.defaults(),{_model_name:"LayoutModel",_view_name:"LayoutView"},Y)}}class H extends ${initialize(e){this._traitNames=[],super.initialize(e);for(let e of Object.keys(Y))this.registerTrait(e)}registerTrait(e){if(this._traitNames.push(e),"overflow_x"===e||"overflow_y"===e)return this.listenTo(this.model,"change:"+e,((t,s)=>{this.handleOverflowChange(e,s)})),void this.handleOverflowChange(e,this.model.get(e));this.listenTo(this.model,"change:"+e,((t,s)=>{this.handleChange(e,s)})),this.handleChange(e,this.model.get(e))}css_name(e){return e.replace(/_/g,"-")}handleChange(e,t){let s=this.options.parent;s?null===t?s.el.style.removeProperty(this.css_name(e)):s.el.style[this.css_name(e)]=t:console.warn("Style not applied because a parent view does not exist")}handleOverflowChange(e,t){let s=this.options.parent;s?null===t?null===this.model.get("overflow")&&s.el.style.removeProperty(this.css_name(e)):s.el.style[this.css_name(e)]=t:console.warn("Style not applied because a parent view does not exist")}unlayout(){let e=this.options.parent;this._traitNames.forEach((t=>{e?e.el.style.removeProperty(this.css_name(t)):console.warn("Style not removed because a parent view does not exist")}),this)}}class Q extends I{defaults(){let e=this.constructor;return d(super.defaults(),{_model_name:"StyleModel",_view_name:"StyleView"},Object.keys(e.styleProperties).reduce(((t,s)=>(t[s]=e.styleProperties[s].default,t)),{}))}}Q.styleProperties={};class X extends ${initialize(e){this._traitNames=[],super.initialize(e);let t=this.model.constructor;for(let e of Object.keys(t.styleProperties))this.registerTrait(e);this.style()}registerTrait(e){this._traitNames.push(e),this.listenTo(this.model,"change:"+e,((t,s)=>{this.handleChange(e,s)}))}handleChange(e,t){let s=this.options.parent;if(s){let i=this.model.constructor.styleProperties,o=i[e].attribute,l=i[e].selector,r=l?s.el.querySelectorAll(l):[s.el];if(null===t)for(let e=0;e!==r.length;++e)r[e].style.removeProperty(o);else for(let e=0;e!==r.length;++e)r[e].style[o]=t}else console.warn("Style not applied because a parent view does not exist")}style(){for(let e of this._traitNames)this.handleChange(e,this.model.get(e))}unstyle(){let e=this.options.parent,t=this.model.constructor.styleProperties;this._traitNames.forEach((s=>{if(e){let i=t[s].attribute,o=t[s].selector,l=o?e.el.querySelectorAll(o):[e.el];for(let e=0;e!==l.length;++e)l[e].style.removeProperty(i)}else console.warn("Style not removed because a parent view does not exist")}),this)}}var Z;!function(e){let t;!function(e){e.CommManager=class{constructor(e){this.targets=Object.create(null),this.comms=Object.create(null),this.kernel=null,this.jsServicesKernel=null,this.init_kernel(e)}init_kernel(e){this.kernel=e,this.jsServicesKernel=e}async new_comm(e,s,i,o,l,r){let n=this.jsServicesKernel.createComm(e,l),a=new t(n);return this.register_comm(a),a.open(s,i,o,r),a}register_target(e,s){let i=this.jsServicesKernel.registerCommTarget(e,((e,i)=>{let o=new t(e);this.register_comm(o);try{return s(o,i)}catch(e){o.close(),console.error(e),console.error(new Error("Exception opening new comm"))}}));this.targets[e]=i}unregister_target(e,t){this.targets[e].dispose(),delete this.targets[e]}register_comm(e){return this.comms[e.comm_id]=Promise.resolve(e),e.kernel=this.kernel,e.comm_id}};class t{constructor(e){this.jsServicesComm=null,this.kernel=null,this.jsServicesComm=e}get comm_id(){return this.jsServicesComm.commId}get target_name(){return this.jsServicesComm.targetName}open(e,t,s,i){let o=this.jsServicesComm.open(e,s,i);return this._hookupCallbacks(o,t),o.msg.header.msg_id}send(e,t,s,i){let o=this.jsServicesComm.send(e,s,i);return this._hookupCallbacks(o,t),o.msg.header.msg_id}close(e,t,s,i){let o=this.jsServicesComm.close(e,s,i);return this._hookupCallbacks(o,t),o.msg.header.msg_id}on_msg(e){this.jsServicesComm.onMsg=e.bind(this)}on_close(e){this.jsServicesComm.onClose=e.bind(this)}_hookupCallbacks(e,t){t&&(e.onReply=function(e){t.shell&&t.shell.reply&&t.shell.reply(e)},e.onStdin=function(e){t.input&&t.input(e)},e.onIOPub=function(e){if(t.iopub)if(t.iopub.status&&"status"===e.header.msg_type)t.iopub.status(e);else if(t.iopub.clear_output&&"clear_output"===e.header.msg_type)t.iopub.clear_output(e);else if(t.iopub.output)switch(e.header.msg_type){case"display_data":case"execute_result":case"stream":case"error":t.iopub.output(e)}})}}e.Comm=t}(t=e.services||(e.services={}))}(Z||(Z={}));class ee{constructor(e,t,s){this.initialize(e,t,s)}initialize(e,t,s){this._handler_context=s||this,this._models=[],this.views=[],this._create_view=e,this._remove_view=t||function(e){e.remove()}}update(e,t,s,i){let o=s||this._remove_view,l=t||this._create_view;i=i||this._handler_context;let r=0;for(;r<e.length&&!(r>=this._models.length||e[r]!==this._models[r]);r++);let n=r,a=this.views.splice(n,this.views.length-n);for(let e=0;e<a.length;e++)a[e].then((function(e){o.call(i,e)}));for(;r<e.length;r++)this.views.push(Promise.resolve(l.call(i,e[r],r)));return this._models=e.slice(),Promise.all(this.views)}remove(){return Promise.all(this.views).then((e=>{e.forEach((e=>this._remove_view.call(this._handler_context,e))),this.views=[],this._models=[]}))}dispose(){this.views=null,this._models=null}}const te=new o.Token("jupyter.extensions.jupyterWidgetRegistry")}}]);