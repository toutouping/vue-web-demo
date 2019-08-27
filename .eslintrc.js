// http://eslint.org/docs/user-guide/configuring

module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    env: {
        browser: true,
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: 'standard',
    // required to lint *.vue files
    plugins: [
        'html'
    ],
    // add your custom rules here
    'rules': {
        'array-bracket-spacing': ["error", "never"], // 禁止在数组括号内出现空格 ['a': 12]
        'arrow-spacing': ["error", {"before": true, "after": true}], // 箭头函数使用一致空格 a => b
        'block-spacing': ["error", "never"], // 禁止在单行代码块中使用空格 function foo() {return true;}
        'camelcase': 'off', // ["error", {"properties": "always"}], // 使用驼峰式命名，常量使用下划线
        'o-throw-literal': 'off',
        'new-cap': 'off',
        'comma-dangle': ["error", "never"], // 禁用拖尾逗号 ['a': 1, 'b': 3],3后面不能有逗号
        'comma-spacing': ["error", { "before": false, "after": true }], // 强制在逗号周围使用空格 a = 1, b = 3; 前面不要有空格，后面有空格
        'computed-property-spacing': ["error", "never"], // 禁止在计算属性中使用空格 a['key']
        'curly': "error", // 要求遵循大括号约定 if () {} 必须要有{}
        'eqeqeq': "error", // 要求使用 === 和 !==
        'indent': ["error", 2, {"SwitchCase": 1}],
        'key-spacing': ["error", {"beforeColon": false, "afterColon": true}],// 键值与冒号之间的空格一致性
        'keyword-spacing': ["error", {"before": true, "after": true}], // 强制关键字周围空格的一致性 } else { 'else'是关键字
        'lines-around-comment': ["error", {"beforeBlockComment": true, "allowBlockStart": true, "allowObjectStart": true, "allowArrayStart": true}], // 强制注释周围有空行
        'newline-after-var': ["error", "always"], // 要求变量声明语句后有一行空行
        'no-console': "off", // 允许使用console
        'no-empty': "warn", // 禁止空块语句
        'no-extra-semi': "warn", // 警告不必要的分号
        'no-extra-boolean-cast': 'warn', // 警告不必要的布尔类型转换
        'no-redeclare': "warn", // 警告重新声明变量
        'no-spaced-func': "error", // 函数调用时函数名与()之间不能有空格
        'no-undef': "warn", // 警告没定义
        'no-unused-vars': "off", // 关闭未使用过的变量
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'object-curly-spacing': ["error", "never"], // 强制在花括号中使用一致的空格 {'a': 1, 'b': 2}
        'semi': ["error", "always"], // 要求句末添加分号
        'semi-spacing': ["error", {"before": false, "after": true}], // 强制分号周围的空格
        'space-before-blocks': ["error", "always"], // 要求语句块之前的空格
        'space-before-function-paren': ["error", "always"], // 要求函数圆括号之前有一个空格
        'space-in-parens': ["error", "never"], // 强制圆括号内没有空格
        'space-infix-ops': ["error", {"int32Hint": false}], // 要求中缀操作符周围有空格
        'space-unary-ops': "error" // 要求在一元操作符之前或之后存在空格
    }
}
