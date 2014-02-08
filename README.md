Selection
=========
#一、简介

##1.1、Selection是什么
用来操作textarea的字符选择与获取选择状态的，对textarea插入字符操作的小类库。

##1.2、Selection目前有哪儿些内容？

* 获取字符选择状态
* 设置字符选择范围
* 指定位置插入字符
* 连续插入字符

##1.3、问题反馈
在使用中有任何问题，欢迎反馈给我，可以用以下联系方式跟我交流

* 邮件：bh-lay#126.com, 把#换成@
* QQ：279708284
* weibo: [@剧中人](http://weibo.com/bhlay)

##1.4、关于作者

```javascript
  var ihubo = {
    nickName  : "剧中人",
    site : "http://bh-lay.com/"
  }
```
---

---
#二、使用
##2.1、获取选择范围util.Selection
### 传入参数
 * @param {Object} dom 原生textarea DOM对象

### 返回值
 * @returns {Array} selection 当前选择情况
 * @returns {Array} selection[0] 光标起点
 * @returns {Array} selection[0] 光标结束点

###dome
```javascript
    var selection = util.Selection(textarea);
```

##2.2、设置选择范围util.Selection
### 传入参数
 * @param {Object} dom 原生textarea DOM对象
 * @param {Number} start 选择的起始位置
 * @param {Number} [end] 选择的结束位置

###dome
```javascript
    //移动光标点
    util.Selection(textarea,12);
    //选择字符
    util.Selection(textarea,12，23);
```

##2.3、插入字符util.insertTxt
### 传入参数
 * @param {Object} dom 原生textarea DOM对象
 * @param {String} text 需要插入的字符
 * @param {Number} [start] 选择的起始位置
 * @param {Number} [end] 选择的结束位置

###dome
```javascript
    //自动判断插入点
    util.insertTxt(textarea,'你好');
    //指定插入点
    util.insertTxt(textarea,'你好',12);
    //部分替换文字
    util.insertTxt(textarea,'你好',12,15);
```

##2.4、Jquery插件方式
插件定义时会检测环境中是否存在jquery，如有则为jquery增加此功能。
###字符操作
```javascript
//获取光标位置
var selection =  $('textarea').eq(0).Selection();
//设置光标点
$('textarea').eq(0).Selection(12)
//选择字符
$('textarea').eq(0).Selection(12,24)
```
###插入字符
```javascript
//自动判断插入点
$('textarea').eq(0).insertTxt('你好');
//指定插入点
$('textarea').eq(0).insertTxt('你好',12);
//部分替换文字
$('textarea').eq(0).insertTxt('你好',12,15);
```