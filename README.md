Selection
=========
#一、简介

##1.1、Selection是什么
用来操作textarea的字符选择与获取选择状态的，对textarea插入字符操作的小类库。常用于社交类发布、评论类的操作。

##1.2、Selection目前有哪儿些内容？

* 获取字符选择状态
* 设置字符选择范围
* 指定位置插入字符
* 连续插入字符

---

---
#二、使用
加方框的为可选参数，如：[**end**]

##2.1、获取选择范围util.Selection
### 传入参数
 *  {*Object*} **dom** 原生textarea DOM对象

### 返回值
 *  {*Array*} **selection** 当前选择情况
 *  {*Number*} **selection[0]** 光标起点
 *  {*Number*} **selection[1]** 光标结束点
 *  {*String*} **selection[2]** 当前选中的字符

###dome
```javascript
    var selection = util.Selection(textarea);
```

##2.2、设置选择范围util.Selection
### 传入参数
 *  {*Object*} **dom** 原生textarea DOM对象
 *  {*Number*} **start** 选择的起始位置
 *  {*Number*} [**end**] 选择的结束位置

###dome
```javascript
    //设置光标点
    util.Selection(textarea,12);
    //选择字符
    util.Selection(textarea,12,23);
```

##2.3、插入字符util.insertTxt
### 传入参数
 *  {*Object*} **dom** 原生textarea DOM对象
 *  {*String*} **text** 需要插入的字符
 *  {*Number*} [**start**] 选择的起始位置
 *  {*Number*} [**end**] 选择的结束位置

###dome
```javascript
    //自动判断插入点
    util.insertTxt(textarea,'你好');
    //指定插入点
    util.insertTxt(textarea,'你好',12);
    //替换部分文字
    util.insertTxt(textarea,'你好',12,15);
```

##2.4、Jquery插件方式
插件定义时会检测环境中是否存在jquery，如有则为jquery增加此功能，接收参数如util定义，隐式接收第一个参数DOM，仅为jquery对象的第一个dom执行对应方法。
###字符操作
```javascript
//获取光标位置
var selection =  $('textarea.test').Selection();
//设置光标点
$('textarea.test').Selection(12);
//选择字符
$('textarea.test').Selection(12,24);

///插入字符
//自动判断插入点
$('textarea.test').insertTxt('你好');
//指定插入点
$('textarea.test').insertTxt('你好',12);
//替换部分文字
$('textarea.test').insertTxt('你好',12,15);
```
