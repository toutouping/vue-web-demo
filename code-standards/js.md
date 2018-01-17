# 1.JS编码规范

## 1. 使用驼峰式变量命名、属性
```javascript
    var addTab = 1;
```

## 2. 常量采用全大写，用下划线“_”作为单词分割
```javascript
    var TABLE_WIDTH = 120;
```

## 3. 总是使用分号,句末习惯性加上分号

## 4. 使用2个空格缩进

## 5. 总是使用空格符
```javascript
    // bad
    var arr = {a:1,b:2,c:3};

    // good
    var arr = {a: 1, b: 2, c: 3};
```

```javascript
    // bad
    function foo(){
        return true;
    }

    // good
    function foo() {
        return true;
    }
```

```javascript
    // bad
    if (condition) {
        // TODO
    }
    else {
        // TODO
    }

    // good
    if (condition) {
        // TODO
    } else {
        // TODO
    }
```

## 6. 构造函数命名使用驼峰式且第一个字母大写
```javascript
    function BoxSize () {
        // TODO
    }

    var boxSize = new BoxSize();
```

## 7. 总是使用花括号
```javascript
    // bad
    if (true) return;

    // good
    if (true) {
        return;
    }
```

## 8. 使用空行将逻辑相对独立的两块代码隔开
```javascript
    let that = this,
        arr = [1, 3, 5],
        box = 'tostring';

    arr.forEach(function (item, index) {
        console.log(index)
    });

    return arr;
```

## 9. 比较变量强制使用‘===’替代‘==’
```javascript
    // bad
    if (a == b) {
        // TODO
    }

    // good
    if (a === b) {
        // TODO
    }
```

## 10. 条件种类超过3种时，使用switch代替if
```javascript
    // bad
    if (a === 1) {
        // TODO
    } else if (a === 2) {
        // TODO
    } else  if (a === 3) {
        // TODO
    } else if (a === 4) {
        // TODO
    }

    // good
    switch (a) {
        case 1:
            break;
        case 2:
            break;
        case 3:
            break;
        case 4:
            break;
    }
```

## 11. 使用forEach代替for循环

## 12. 函数作用域中的私有函数需要加上_
```javascript
    function fn () {

        function _cb () {}|

        return {
            getIndex: function () {
                _cb();
            }
        }
    }
```
