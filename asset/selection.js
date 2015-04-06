/**
 * @author bh-lay
 * 
 * @github: https://github.com/bh-lay/Selection
 * 
 * @modified 2015-04-06 10:05
 *  
 */
window.util = window.util || {};
(function(global,doc,factoryFn){
	var factory = factoryFn(doc);
	//exports for jquery
	if(global.jQuery && global.jQuery.fn){
		jQuery.fn.Selection = function(){
			var tarea = this[0];
			if(tarea.tagName != 'TEXTAREA'){
				return this
			}else if(arguments['length'] > 0){
				factory.setPosition(tarea,arguments[0],arguments[1]);
				return this
			}else{
				return factory.getPosition(tarea);
			}
		};
		jQuery.fn.insertTxt = function(txt,start,end){
			factory.insertTxt(this[0],txt,start,end);
			return this
		};
	}
	
	//exports for commonJS
	global.define && define(function(require,exports){
		exports.insertTxt = factory.insertTxt;
		exports.Selection = factory.Selection;
	});
	
	global.insertTxt = factory.insertTxt;
	global.Selection = factory.Selection;
})(this,document,function(doc){
  //检测浏览器环境的临时dom
  var test_textarea = doc.createElement("textarea"),
      /**
       * 设置光标位置
       * 
       **/
      setPosition = test_textarea.setSelectionRange ? function(tarea,start, len) {
        var len = len || 0;
        setTimeout(function(){
          tarea.focus();
          tarea.setSelectionRange(start,start+len);
        });
      } : function(tarea,start, len) {
          var len = len || 0;
          tarea.focus();
          var strLen = tarea.value.length;
          var rng = tarea.createTextRange();
          rng.moveStart('character', start);
          rng.moveEnd('character', start + len - strLen);
          rng.select();
      },
      /**
       * 获取光标位置
       * 
       **/
      getPosition = typeof(test_textarea.selectionStart)=='number' ? function(tarea){
        return [tarea.selectionStart,tarea.selectionEnd,tarea.value.slice(tarea.selectionStart,tarea.selectionEnd)];
      } : function(tarea){
        var start = 0,
             end = 0;
        tarea.focus();
        var sTextRange = doc.selection.createRange();

        if (tarea.tagName == "TEXTAREA") {
          var oTextRange = doc.body.createTextRange();
          oTextRange.moveToElementText(tarea);
          for (start = 0; oTextRange.compareEndPoints("StartToStart", sTextRange) < 0; start++) {
            oTextRange.moveStart('character', 1);
          }
          for (var i = 0; i <= start; i++) {
            if (tarea.value.charAt(i) == '\n') {
              start++;
            }
          }
          oTextRange.moveToElementText(tarea);
          for (end = 0; oTextRange.compareEndPoints('StartToEnd', sTextRange) < 0; end++) {
            oTextRange.moveStart('character', 1);
          }
          for(var i = 0; i <= end; i++) {
            if(tarea.value.charAt(i) == '\n') {
              end++;
            }
          }
        }
        return [start,end,selectedTxt,tarea.value.slice(start,end)];
      };
  //注销临时dom
  test_textarea = null;
	
  //exports
  return {
    setPosition : setPosition,
    getPosition : getPosition,
    /**
     * @method 设置or获取光标位置
     * @param {Object} textarea jquery dom
     * @param {Number} [start]
     * @param {Number} [end]
     * 
     **/
    Selection : function Selection(){
      var tarea = arguments[0];
      if(tarea.tagName != 'TEXTAREA'){
        return
      }
      if(arguments['length'] > 1){
        setPosition(tarea,arguments[1],arguments[2]);
      }else{
        return getPosition(tarea);
      }
    },
    /**	 
     * @method 插入文本
     * @param {Object} dom jquery dom
     * @param {String} text
     * @param {Number} [start]
     * @param {Number} [end]
     * 
     **/
    insertTxt : function insertTxt(tarea,txt,start,end){
      if(tarea.tagName != 'TEXTAREA' || typeof(txt) == 'undefined'){
        return
      }
      var txt = txt.toString();
      var this_start,this_end;
      if(typeof(start) == 'undefined'){
        var pos = getPosition(tarea);

        this_start = pos[0];
        this_end = pos[1];
      }else{
        this_start = parseInt(start);
        this_end = end || this_start;
      }

      var allTxt = tarea.value,
          frontTxt = allTxt.slice(0,this_start),
          endTxt = allTxt.slice(this_end);
      tarea.value = frontTxt + txt + endTxt;
      setPosition(tarea ,frontTxt.length + txt.length,0);
    }
  };
});
