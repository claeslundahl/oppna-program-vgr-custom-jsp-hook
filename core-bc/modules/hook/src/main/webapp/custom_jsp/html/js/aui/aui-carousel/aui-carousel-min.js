YUI.add("aui-carousel",function(e,t){var n=e.Lang,r=" ",i="carousel",s=e.ClassNameManager.getClassName,o=s(i,"item"),u=s(i,"item","active"),a=s(i,"item","transition"),f=s(i,"menu","active"),l=s(i,"menu","index"),c=s(i,"menu","item"),h=s(i,"menu","next"),p=s(i,"menu","play"),d=s(i,"menu","pause"),v=s(i,"menu","prev"),m=[c,l].join(r),g=[c,l,f].join(r),y=".",b=y+l,w=y+h,E=y+d,S=y+p,x=[S,E].join(),T=y+v,N='<li><a class="'+c+' {cssClasses}">{index}</a></li>',C='<menu><li><a class="'+c+" "+p+'"></a></li>'+'<li><a class="'+c+" "+v+'"></a></li>'+"{items}"+'<li><a class="'+c+" "+h+'"></a></li>'+"</menu>",k=e.Widget.UI_SRC,L={src:k},A=e.Component.create({NAME:i,ATTRS:{activeIndex:{value:0,setter:"_setActiveIndex"},animationTime:{value:.5},intervalTime:{value:2},itemSelector:{value:">*"},nodeMenu:{value:null,setter:"_setNodeMenu"},nodeMenuItemSelector:{value:y+c},playing:{value:!0}},prototype:{animation:null,nodeSelection:null,nodeMenu:null,initializer:function(){var t=this;t.animation=new e.Anim({duration:t.get("animationTime"),to:{opacity:1}})},renderUI:function(){var e=this;e._updateNodeSelection(),e.nodeMenu=e.get("nodeMenu"),e._updateMenuNodes()},bindUI:function(){var e=this;e.after({activeIndexChange:e._afterActiveIndexChange,animationTimeChange:e._afterAnimationTimeChange,itemSelectorChange:e._afterItemSelectorChange,intervalTimeChange:e._afterIntervalTimeChange,nodeMenuItemSelector:e._afterNodeMenuItemSelectorChange,playingChange:e._afterPlayingChange}),e._bindMenu(),e.get("playing")===!0&&e._afterPlayingChange({prevVal:!1,newVal:!0})},syncUI:function(){var e=this;e._uiSetActiveIndex(e.get("activeIndex"))},item:function(e){var t=this;t.set("activeIndex",e)},next:function(){var e=this;e._updateIndexNext()},pause:function(){var e=this;e.set("playing",!1)},play:function(){var e=this;e.set("playing",!0)},prev:function(){var e=this;e._updateIndexPrev()},_afterActiveIndexChange:function(e){var t=this;t._uiSetActiveIndex(e.newVal,{prevVal:e.prevVal,animate:t.get("playing"),src:e.src})},_afterAnimationTimeChange:function(e){var t=this;t.animation.set("duration",e.newVal)},_afterItemSelectorChange:function(e){var t=this;t._updateNodeSelection()},_afterNodeMenuItemSelectorChange:function(e){var t=this;t.nodeMenuItemSelector=e.newVal,t._updateMenuNodes()},_afterIntervalTimeChange:function(e){var t=this;t._clearIntervalRotationTask(),t._createIntervalRotationTask()},_afterPlayingChange:function(e){var t=this,n=t.nodeMenu.one(x),r=e.newVal,i=d,s=p,o="_clearIntervalRotationTask";r&&(i=p,s=d,o="_createIntervalRotationTask"),t[o](),n&&n.replaceClass(i,s)},_bindMenu:function(){var e=this,t=e.nodeMenu,n=e.get("nodeMenuItemSelector");t.delegate("click",e._onClickDelegate,n,e),e.nodeMenuItemSelector=n},_clearIntervalRotationTask:function(){var e=this;clearInterval(e._intervalRotationTask)},_createIndexRandom:function(){var e=this;return Math.ceil(Math.random()*e.nodeSelection.size())-1},_createIntervalRotationTask:function(){var e=this;e._clearIntervalRotationTask(),e._intervalRotationTask=setInterval(function(){e._updateIndexNext({animate:!0})},e.get("intervalTime")*1e3)},_onAnimationEnd:function(e,t,n,r,i){var s=this;n&&n.removeClass(a),t.setStyle("opacity","1")},_onAnimationStart:function(e,t,n,r,i){var s=this;t.addClass(u),r&&r.addClass(f),n&&n.replaceClass(u,a),i&&i.removeClass(f)},_onClickDelegate:function(e){var t=this;e.preventDefault();var n=e.currentTarget,r;n.hasClass(l)?r=t._onMenuItemClick:n.hasClass(v)?r=t._updateIndexPrev:n.hasClass(h)?r=t._updateIndexNext:n.test(x)&&(r=t._onMenuPlayClick),r&&r.apply(t,arguments)},_onMenuItemClick:function(e){var t=this;e.preventDefault();var n=t.menuNodes.indexOf(e.currentTarget);t.set("activeIndex",n,L)},_onMenuPlayClick:function(e){var t=this;this.set("playing",!this.get("playing"))},_renderMenu:function(){var t=this,i=t.get("activeIndex"),s=[],o,u=t.nodeSelection.size();for(o=0;o<u;o++)s.push(n.sub(N,{cssClasses:i===o?g:m,index:o}));var a=e.Node.create(n.sub(C,{items:s.join(r)}));return t.get("contentBox").appendChild(a),a},_setActiveIndex:function(e){var t=this;return e=="rand"?e=t._createIndexRandom():e=Math.max(Math.min(e,t.nodeSelection.size()),-1),e},_setNodeMenu:function(t){var n=this;return e.one(t)||n._renderMenu()},_uiSetActiveIndex:function(e,t){var r=this,i=null,s=null,o=null,f=null,l=r.nodeSelection.item(e),c=r.menuNodes,h=c.item(e);r.animation.set("node",l);if(t&&!n.isUndefined(t.prevVal)){var p=t.prevVal;l.setStyle("opacity","0"),s=c.item(p),i=r.nodeSelection.item(p),i.replaceClass(u,a),r.animation.stop()}else l.addClass(u),l.setStyle("opacity","1");o=r.animation.on("start",function(e){r._onAnimationStart(e,l,i,h,s),o.detach()}),f=r.animation.on("end",function(e){r._onAnimationEnd(e,l,i,h,s),f.detach()}),t&&(t.animate?r.animation.run():(r.animation.fire("start"),r.animation.fire("end")),t.src==k&&t.animate&&r._createIntervalRotationTask())},_updateIndexNext:function(e){var t=this,n=t.get("activeIndex"),r=t.nodeSelection.size(),i=n+1;i>r-1&&(i=0),e&&(e.src=k),t.set("activeIndex",i,e)},_updateIndexPrev:function(e){var t=this,n=t.get("activeIndex"),r=n-1;r<0&&(r=t.nodeSelection.size()-1),e&&(e.src=k),t.set("activeIndex",r,e)},_updateMenuNodes:function(){var e=this;e.menuNodes=e.nodeMenu.all(b)},_updateNodeSelection:function(){var e=this,t=e.get("itemSelector"),n=e.get("contentBox").all(t);n.addClass(o),e.nodeSelection=n},_intervalRotationTask:null}});e.Carousel=A},"2.0.0",{requires:["anim","node-event-delegate","aui-component"],skinnable:!0});
