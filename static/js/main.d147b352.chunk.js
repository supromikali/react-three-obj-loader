(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,n,t){e.exports=t(12)},12:function(e,n,t){"use strict";t.r(n);var o=t(2),a=t(3),i=t(5),r=t(4),c=t(6),s=t(1),d=t.n(s),l=t(8),u=t.n(l),m=t(0),h=t(9),p=t(10),w={height:500},f=function(e){function n(){var e,t;Object(o.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(t=Object(i.a)(this,(e=Object(r.a)(n)).call.apply(e,[this].concat(c)))).sceneSetup=function(){var e=t.mount.clientWidth,n=t.mount.clientHeight;t.scene=new m.s,t.camera=new m.n(75,e/n,.1,1e3),t.camera.position.z=500,t.controls=new h.a(t.camera,t.mount),t.renderer=new m.x,t.renderer.setSize(e,n),t.mount.appendChild(t.renderer.domElement)},t.loadTheModel=function(){(new p.a).load("eleph.obj",function(e){t.scene.add(e);var n=t.scene.getObjectByName("Elephant_4");n.position.set(0,-150,0),n.material.color.set(5294200),n.rotation.x=23.5,t.model=n},function(e){console.log(e.loaded/e.total*100+"% loaded")},function(e){console.log("An error happened:"+e)})},t.addLights=function(){var e=[];e[0]=new m.o(16777215,1,0),e[1]=new m.o(16777215,1,0),e[2]=new m.o(16777215,1,0),e[0].position.set(0,2e3,0),e[1].position.set(1e3,2e3,1e3),e[2].position.set(-1e3,-2e3,-1e3),t.scene.add(e[0]),t.scene.add(e[1]),t.scene.add(e[2])},t.startAnimationLoop=function(){t.model&&(t.model.rotation.z+=.005),t.renderer.render(t.scene,t.camera),t.requestID=window.requestAnimationFrame(t.startAnimationLoop)},t.handleWindowResize=function(){var e=t.mount.clientWidth,n=t.mount.clientHeight;t.renderer.setSize(e,n),t.camera.aspect=e/n,t.camera.updateProjectionMatrix()},t}return Object(c.a)(n,e),Object(a.a)(n,[{key:"componentDidMount",value:function(){this.sceneSetup(),this.addLights(),this.loadTheModel(),this.startAnimationLoop(),window.addEventListener("resize",this.handleWindowResize)}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handleWindowResize),window.cancelAnimationFrame(this.requestID),this.controls.dispose()}},{key:"render",value:function(){var e=this;return d.a.createElement("div",{style:w,ref:function(n){return e.mount=n}})}}]),n}(s.Component),v=function(e){function n(){var e,t;Object(o.a)(this,n);for(var a=arguments.length,c=new Array(a),s=0;s<a;s++)c[s]=arguments[s];return(t=Object(i.a)(this,(e=Object(r.a)(n)).call.apply(e,[this].concat(c)))).state={isMounted:!0},t}return Object(c.a)(n,e),Object(a.a)(n,[{key:"render",value:function(){var e=this,n=this.state.isMounted,t=void 0===n||n;return d.a.createElement(d.a.Fragment,null,d.a.createElement("button",{onClick:function(){return e.setState(function(e){return{isMounted:!e.isMounted}})}},t?"Unmount":"Mount"),t&&d.a.createElement(f,null),t&&d.a.createElement("div",null,"Scroll to zoom, drag to rotate"))}}]),n}(d.a.Component),b=document.getElementById("root");u.a.render(d.a.createElement(v,null),b)}},[[11,1,2]]]);
//# sourceMappingURL=main.d147b352.chunk.js.map