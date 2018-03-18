# 1. css编码规范

## 1. css选择器命名
* 全英文小写（不要用中文拼音命名）
* 使用中划线分割多单词的选择器名（.ui-element）
* 禁止使用下划线

## 2. 使用tab（4个空格）

## 3. 空格
* '{'前留一个空格
* ':'后留一个空格
* 句末不要留多余空格

## 4. 每个属性声明未尾都要添加分号
```css
    .element {
        width: 100px;
        height: 100px;
    }
```

## 5. 换行
* '{' 后和 '}'后换行
* 多个规则的选择器用','分隔并换行

```css
    // bad
    .item, .element {
        width: 100px;
        height: 100px;
    }

    // good
    .item,
    .element {
        width: 100px;
        height: 100px;
    }
```

## 6. 属性声明顺序
1. 定位：其中有的属性为：position z-index left right top bottom clip
2. 盒子模型：其中属性为：width height min-height max-height min-width max-width(）
3. 文字：其中属性有：color font-size letter-spacing, color- text-align等
4. 背景：其中属性有：background-image border等
5. 其他：一般有：animation, transition等

```css
    .element {
        position: relative;
        left: 10px;
        width: 20px;
        height: 100px;
        margin: 10px 20px;
        background: #ccc;
    }
```

## 7. 属性缩写
* 属性合并，包括有margin、padding、border、background等

```css
    // not good
    .element {
        padding-top: 5px;
        padding-right: 5px;
        padding-bottom: 5px;
        margin-top: 10px;
        margin-left: 20px;
    }

    // good
    .element {
        padding: 5px 0 5px 5px;
        margin: 10px 0 0 20px;
    }
```

* 0符号缩写

```css
    // not good
    .element {
        width: 0px;
        opacity: 0.5;
    }

    // good
    .element {
        width: 0;
        opacity: .5;
    }
```

## 8. 性能优化
* 禁止使用行内样式，也就是在dom节点中写入style=''. 规避这种写法的用意在于行内样式不易于维护、不可复用、扩大html容量。 `除非特殊情况（-webkit-box-origin stylus无法解析只能写在行内样式中等）`
* 禁止使用标签选择器. 规避这种写法的用意在于css解析是从右到左的，如果使用标签选择器，则css渲染会花费很多性能。另外会影响所有该标签选择器的元素样式，导致特殊情况需要样式重置，不利于维护。

```css
    // bad 标签选择器
    .box span {}
    .table ul li {}
```



## 9. 模块化命名
> 样式选择器命名以模块为单位，例如以下是一个box模块

```html
    <div class="box">
        <p class="title">
            title
        </p>
        <div class="content">
            <i class="icon"></i>
            <p class="text">content</p>
        </div>
    </div>
```

> css模块化命名

```css
    .box {}
    .box .title {}
    .box .content {}
    .box .icon {}
    .box .text {}
```

`这样命名的好处是，知道该模块的整体样式，益于维护模块迁移或者删除，并且每个样式块都有前缀，不会被覆盖。`

## 10. 模块样式跟其他模块之间要空一行，便于维护
```css
    <!-- 这是box模块 -->
    .box {}
    .box .title {}
    .box .content {}
    .box .icon {}
    .box .text {}

    <!-- 这是banner模块 -->
    .banner {}
    .banner .title {}
```
