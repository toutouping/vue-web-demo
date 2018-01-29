<template>
  <div class="directiveInlay">
    <com-panel :show="false" title="v-model" type="fold">
      <div>
        <p class="m-desc">v-Model指令：(http://cn.vuejs.org/v2/guide/forms.html#%E6%96%87%E6%9C%AC) 虽然很像使用了双向数据绑定的 Angular 的 ng-model，但是 Vue 是单项数据流，
          v-model 只是语法糖而已：在给 &lt;input /&gt; 元素添加 v-model 属性时，默认会把 value 作为元素的属性，
          然后把 'input' 事件作为实时传递 value 的触发事件。代码如下：</p>
        <div class="m-code">
          <script id="codeModel" type="text/template">
            <form id="demo">
              <!-- text -->
                <input type="text" v-model="msg">
                { {msg} }
              <!-- checkbox -->
                <input type="checkbox" v-model="checked">
                { {checked ? "yes" : "no"} }
              <!-- radio buttons -->
                <input type="radio" name="picked" value="one" v-model="picked">
                <input type="radio" name="picked" value="two" v-model="picked">
                { {picked} }
              <!-- select -->
                <select v-model="selected">
                  <option>one</option>
                  <option>two</option>
                </select>
                { {selected} }
              <!-- multiple select -->
                <select v-model="multiSelect" multiple>
                  <option>one</option>
                  <option>two</option>
                  <option>three</option>
                </select>
                { {multiSelect} }
                <p><pre>data: { {$data | json 2} }</pre></p>
              </form>
              另外，v-model这个指令还有几个可选的参数：lazy,number,options,debounce
              1.使用lazy参数是将双向数据同步的时间节点从input触发改为了change触发，调用方式如下：
                <!-- 在“change”时而非“input”时更新 -->
                <input v-model.lazy="msg" >
              2.使用number参数是通知v-model绑定的dom元素把用户输入值默认当成数字来处理，调用如下：
                <input v-model.number="age" type="number">
              3.使用trim参数是自动过滤用户输入的首尾空白字符，调用如下：
                <input v-model.trim="msg">
              4.使用options参数是用于渲染一个select项的列表，调用方式如下：
                <select v-model="selected" options="myOptions"></select>
                其中options的参数名指向一个数组，该数组可以包括字符串或对象，对象可以是{text:'', value:''}的形式，指定了<option>的value属性与text内容，例如：
                  [
                    { text: 'A', value: 'a' },
                    { text: 'B', value: 'b' }
                  ]
                将渲染出：
                  <select>
                    <option value="a">A</option>
                    <option value="b">B</option>
                  </select>
                如果对象是{ label:'', options:[...] }的形式，则可以渲染出多个option组<optgroup>,如下例：
                  [
                    { label: 'A', options: ['a', 'b']},
                    { label: 'B', options: ['c', 'd']}
                  ]
                将渲染出：
                  <select>
                    <optgroup label="A">
                      <option value="a">a</option>
                      <option value="b">b</option>
                    </optgroup>
                    <optgroup label="B">
                      <option value="c">c</option>
                      <option value="d">d</option>
                    </optgroup>
                  </select>
              5.使用debounce参数是指定一个延迟时间，延迟从按键触发到数据更新同步之间的时间，当我们的更新操作比较耗时时这个属性十分有用，例如搜索引擎在我们键入字符时发送ajax请求完成自动补全提示，调用如下：
                <input v-model="msg" debounce="500">
          </script>
          <vue-markdown :source="codeModel" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-show" type="fold">
      <div>
        <p class="m-desc">v-show指令：v-show="true/false" 控制元素显示/隐藏,元素会始终渲染并保留在 DOM 中。代码如下：</p>
        <div class="m-code">
          <script id="codeShow" type="text/template">
            <div v-show="isShow" >显示</div>
          </script>
          <vue-markdown :source="codeShow" v-highlight></vue-markdown>
        </div>
        <div class="m-example">
          <button v-on:click="isShow = !isShow">toggle</button>&nbsp;&nbsp;{{'isShow = ' + isShow}} <br />
          <div v-show="isShow" style="width: 100px;height: 100px;background: red">显示</div>
        </div>
      </div>
    </com-panel>	

    <com-panel :show="false" title="v-if 、v-else-if 、v-else" type="fold">
      <div>
        <p class="m-desc">v-if指令：v-if="true/false" 是动态的向DOM树内添加或者删除DOM元素。代码如下：</p>
        <div class="m-code">
          <script id="codeIf" type="text/template">
            <p v-if="ifOk === 'first'">选中了第一项</p>
            <p v-else-if="ifOk === 'second'">选中了第二项</p>
            <p v-else>选中了第三项</p>
          </script>
          <vue-markdown :source="codeIf" v-highlight></vue-markdown>
        </div>
        <div class="m-example">
          <input type="radio" v-model="ifOk" value="first">&nbsp;first
          <input type="radio" v-model="ifOk" value="second" style="margin-left: 20px">&nbsp;second
          <input type="radio" v-model="ifOk" value="third" style="margin-left: 20px">&nbsp;third
          <p v-if="ifOk === 'first'">选中了第一项</p>
          <p v-else-if="ifOk === 'second'">选中了第二项</p>
          <p v-else>选中了第三项</p>
        </div>
      </div>
    </com-panel>
    
    <com-panel :show="false" title="v-text" type="fold">
      <div>
        <p class="m-desc" v-pre>v-text指令：v-text="string" 更新元素的textContent,更新部分的textContent，需要使用{{Mustache}}插值。代码如下：</p>
        <div class="m-code">
          <script id="codeText" type="text/template">
            <span v-text="textMsg"></span>
            <!-- 和下面的一样 -->
            <span >{ { textMsg } }</span>
          </script>
          <vue-markdown :source="codeText" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>	

    <com-panel :show="false" title="v-bind" type="fold">
      <div>
        <p class="m-desc" v-pre>v-bind指令：v-bind="string" 动态绑定,及时对页面的数据进行更改。代码如下：</p>
        <div class="m-code">
          <script id="codeText" type="text/template">
            <span v-text="textMsg"></span>
            <!-- 和下面的一样 -->
            <span >{ { textMsg } }</span>
          </script>
          <vue-markdown :source="codeText" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-html" type="fold">
      <div>
        <p class="m-desc" v-pre>v-html指令：v-html="string" 更新元素的 innerHTML。
          注意：1、网站动态渲染任意HTML，容易导致XXS攻击。2、内容按普通 HTML 插入 - 不会作为 Vue 模板进行编译。
          3、在单文件组件里，scoped 的样式不会应用在 v-html 内部，因为那部分 HTML 没有被 Vue 的模板编译器处理。代码如下：</p>
        <div class="m-code">
          <script id="codeHtml" type="text/template">
            <div v-html="html"></div>
          </script>
          <vue-markdown :source="codeHtml" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title=":class" type="fold">
      <div>
        <p class="m-desc" v-pre>:class指令：v-bind:class=“obj"，动态地切换 class。代码如下：</p>
        <div class="m-code">
          <script id="codeClass" type="text/template">
            <!--json格式-->
            <span class="box" :class="{'textColor':isColor, 'textSize':isSize}">我是字</span>
            <!--单个class-->
            <span class="box" :class="classObject">我是字</span>
            <!--多个class-->
            <span class="box" :class="[classA,classB]">我是字</span>
            <!--表达式-->
            <span class="box" :class="[isA?classA:'', classB]">我是字</span>
          </script>
          <vue-markdown :source="codeClass" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title=":style" type="fold">
      <div>
        <p class="m-desc" v-pre>:style指令：v-bind:style="value"，动态绑定内联style，如果style属性中带有中划线-，例如：font-size、background-color等等时，必须用驼峰写法或者是引号引起来，代码如下：</p>
        <div class="m-code">
          <script id="codeStyle" type="text/template">
          　<!--单个属性-->
          　<div v-bind: style="{ color: activeColor}">color:{ { activeColor } }</div>
          　<!--驼峰写法-->
          　<div v-bind: style="{'text-align':textAlign,fontSize: fontSize + 'px'}">text-align:{ {textAlign} },fontSize:{ {fontSize} }px</div>
          　<!--一个对象-->
          　<div v-bind: style="styleObject">{ {styleObject} }</div>
          　<!--前缀值(2.3以上版本)-->
          　<div v-bind: style='{display:["-webkit-box","-ms-flexbox","flex"]}'>{ {'{display:["-webkit-box","-ms-flexbox","flex"]}'} }</div>
          </script>
          <vue-markdown :source="codeStyle" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-cloak" type="fold">
      <div>
        <p class="m-desc" v-pre>v-cloak指令：保持在元素上直到关联实例结束编译。和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕。代码如下：</p>
        <div class="m-code">
          <script id="codeCloak" type="text/template">
            <div id="app" v-cloak>{ {msg} }</div>
            [v-cloak] {
              display: none;
            }
            <!-- 注意：在实际项目中，我们常通过 @import 来加载 css 文件
              @import "index.css" 而 @import 是在页面 DOM 完全载入后才会进行加载，如果我们将 [v-cloak] 写在 @import 加载的 css 文件中，就会导致页面仍旧闪烁。
              为了避免这种情况，我们可以将 [v-cloak] 写在 link 引入的 css 中，或者写一个内联 css 样式，这样就得到了解决。 -->
          </script>
          <vue-markdown :source="codeCloak" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-pre" type="fold">
      <div>
        <p class="m-desc" v-pre>v-pre指令：把标签内部的元素原位输出。代码如下：</p>
        <div class="m-code">
          <script id="codePre" type="text/template">
            <div v-pre>欢迎--{ {msg} }</div>
          </script>
          <vue-markdown :source="codePre" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-for" type="fold">
      <div>
        <p class="m-desc"  v-for> v-for指令：类似JS的遍历，根据一组数据的选项列表进行渲染。。代码如下：</p>
        <div class="m-code">
          <script id="codeFor" type="text/template">
           <!-- item为数组中的数组元素 -->
           <ul><li v-for="item in items">{ {item} }</li></ul>
           <!-- v-for还支持一个可选的第二个参数作为当前项的索引。 -->
           <ul><li v-for="(index,item) in items">{ {index} }:{ {item} }</li></ul>
          </script>
          <vue-markdown :source="codeFor" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-once" type="fold">
      <div>
        <p class="m-desc">v-once指令：只渲染元素和组件一次。随后的重新渲染,元素/组件及其所有的子节点将被视为静态内容并跳过。这可以用于优化更新性能。。代码如下：</p>
        <div class="m-code">
          <script id="codeOnce" type="text/template">
            <!-- 单个元素 -->  
            <span v-once>This will never change: { {msg} }</span>  
            <!-- 有子元素 -->  
            <div v-once>  <h1>comment</h1>  <p>{ {msg} }</p>   </div>  
            <!-- 组件 -->  
            <my-component v-once :comment="msg"></my-component>  
            <!-- v-for 指令-->  
            <ul>  <li v-for="i in list" v-once>{ {i} }</li></ul>  
          </script>
          <vue-markdown :source="codeOnce" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>

    <com-panel :show="false" title="v-on" type="fold">
      <div>
        <p class="m-desc">v-on指令也可以写为 @。监听 DOM 事件，并在触发时运行一些 JavaScript 代码。代码如下：</p>
        <div class="m-code">
          <script id="codeOn" type="text/template">
            <!-- 监听 DOM 事件：并在触发时运行一些 JavaScript 代码 -->
            <button v-on:click="counter += 1">Add 1</button>

            <!-- 事件处理方法：v-on 还可以接收一个需要调用的方法名称 -->
            <button v-on:click="greet">Greet</button>

            <!-- 内联处理器中的方法：除了直接绑定到一个方法，也可以在内联 JavaScript 语句中调用方法 -->
            <button v-on:click="say('hi')">Say hi</button>

            事件修饰符：使用修饰符时，顺序很重要；相应的代码会以同样的顺序产生。因此，用 @click.prevent.self 会阻止所有的点击，而 @click.self.prevent 只会阻止对元素自身的点击。
              <!-- 阻止单击事件继续传播 -->
              <a v-on:click.stop="doThis"></a>

              <!-- 提交事件不再重载页面 -->
              <form v-on:submit.prevent="onSubmit"></form>

              <!-- 修饰符可以串联 -->
              <a v-on:click.stop.prevent="doThat"></a>

              <!-- 只有修饰符 -->
              <form v-on:submit.prevent></form>

              <!-- 添加事件监听器时使用事件捕获模式 -->
              <!-- 即元素自身触发的事件先在此处处理，然后才交由内部元素进行处理 -->
              <div v-on:click.capture="doThis">...</div>

              <!-- 只当在 event.target 是当前元素自身时触发处理函数 -->
              <!-- 即事件不是从内部元素触发的 -->
              <div v-on:click.self="doThat">...</div>

              <!-- 2.1.4 新增 点击事件将只会触发一次 -->
              <a v-on:click.once="doThis"></a>

              <!-- 2.3.0 新增 滚动事件的默认行为 (即滚动行为) 将会立即触发, .passive 修饰符尤其能够提升移动端的性能。 -->
              <!-- 而不会等待 `onScroll` 完成  -->
              <!-- 这其中包含 `event.preventDefault()` 的情况 -->
              <!-- 不要把 .passive 和 .prevent 一起使用，因为 .prevent 将会被忽略，同时浏览器可能会向你展示一个警告。请记住，.passive 会告诉浏览器你不想阻止事件的默认行为。 -->
              <div v-on:scroll.passive="onScroll">...</div>

            <!-- 按键修饰符 -->
              <!-- 只有在 `keyCode` 是 13 时调用 `vm.submit()` -->
              <input v-on:keyup.13="submit">
              <!-- 同上 -->
              <input v-on:keyup.enter="submit">
              <!-- 缩写语法 -->
              <input @keyup.enter="submit">
              <!-- 全部的按键别名：.enter .tab .delete (捕获“删除”和“退格”键) .esc .space .up .down .left .right
              可以通过全局 config.keyCodes 对象自定义按键修饰符别名：可以使用 `v-on:keyup.f1`Vue.config.keyCodes.f1 = 112 -->

            <!-- 自动匹配按键修饰符 -->
              <!-- 2.5.0 新增 直接将 KeyboardEvent.key 暴露的任意有效按键名转换为 kebab-case 来作为修饰符： -->
              <!-- 有一些按键 (.esc 以及所有的方向键) 在 IE9 中有不同的 key 值, 如果你想支持 IE9，它们的内置别名应该是首选。 -->
              <input @keyup.page-down="onPageDown"> <!-- 处理函数仅在 $event.key === 'PageDown' 时被调用 -->

            系统修饰键
            <!--2.1.0 新增 可以用如下修饰符来实现仅在按下相应按键时才触发鼠标或键盘事件的监听器:.ctrl .alt .shift .meta-->
            <!-- 请注意修饰键与常规按键不同，在和 keyup 事件一起用时，事件触发时修饰键必须处于按下状态。换句话说，只有在按住 ctrl 的情况下释放其它按键，才能触发 keyup.ctrl。而单单释放 ctrl 也不会触发事件。 -->
            <!-- Alt + C -->
            <input @keyup.alt.67="clear">
            <!-- Ctrl + Click -->
            <div @click.ctrl="doSomething">Do something</div>

            <!-- 2.5.0 新增 .exact 修饰符 允许你控制由精确的系统修饰符组合触发的事件。 -->

            <!-- 即使 Alt 或 Shift 被一同按下时也会触发 -->
            <button @click.ctrl="onClick">A</button>

            <!-- 有且只有 Ctrl 被按下的时候才触发 -->
            <button @click.ctrl.exact="onCtrlClick">A</button>

            <!-- 没有任何系统修饰符被按下的时候才触发 -->
            <button @click.exact="onClick">A</button>

            <!-- 2.1.0 新增 鼠标按钮修饰符 .left .right .middle 这些修饰符会限制处理函数仅响应特定的鼠标按钮。-->

            为什么在 HTML 中监听事件?
              1、扫一眼 HTML 模板便能轻松定位在 JavaScript 代码里对应的方法。
              2、因为你无须在 JavaScript 里手动绑定事件，你的 ViewModel 代码可以是非常纯粹的逻辑，和 DOM 完全解耦，更易于测试。
              3、当一个 ViewModel 被销毁时，所有的事件处理器都会自动被删除。你无须担心如何自己清理它们。
          </script>
          <vue-markdown :source="codeOn" v-highlight></vue-markdown>
        </div>
      </div>
    </com-panel>
  </div>
</template>

<script type="text/ecmascript-6">
  import VueMarkdown from 'vue-markdown';
  import comPanel from 'component/com-panel/com-panel';

  export default {
    data () {
      return {
        ifOk: 'first',
        textMsg: 'v-text指令中的内容',
        isShow: false,
        codeIf: '',
        codeShow: '',
        codeText: '',
        codeClass: '',
        codeHtml: '',
        codeStyle: '',
        codeCloak: '',
        codePre: '',
        codeFor: '',
        codeOnce: '',
        codeOn: '',
        codeModel: ''
      };
    },
    created () {
      this.$Progress.start();
    },
    mounted () {
      this.codeIf = document.getElementById('codeIf').innerHTML;
      this.codeShow = document.getElementById('codeShow').innerHTML;
      this.codeText = document.getElementById('codeText').innerHTML;
      this.codeClass = document.getElementById('codeClass').innerHTML;
      this.codeHtml = document.getElementById('codeHtml').innerHTML;
      this.codeStyle = document.getElementById('codeStyle').innerHTML;
      this.codeCloak = document.getElementById('codeCloak').innerHTML;
      this.codePre = document.getElementById('codePre').innerHTML;
      this.codeFor = document.getElementById('codeFor').innerHTML;
      this.codeOnce = document.getElementById('codeOnce').innerHTML;
      this.codeOn = document.getElementById('codeOn').innerHTML;
      this.codeModel = document.getElementById('codeModel').innerHTML;
      this.$Progress.finish();
    },
    components: {
      'vue-markdown': VueMarkdown,
      comPanel
    }
  };
</script>

<style lang="stylus">
 .directiveInlay {
   padding: 0 20px 20px 20px;
   line-height: 20px;
   min-height: 500px;
   .m-desc {
      margin: 10px auto;
      text-indent: 0;
      font-size: 14px;
      word-wrap: break-word;
      text-align: justify;
    }
    .m-code {
      padding: 10px;
      font-size: 14px;
      pre {
        padding: 5px;
        border: solid 2px #EFEFEE  
      }
    }
    .m-example {
      line-height: 25px;
      padding-left: 30px;
    }
    .com-panel {
      margin-bottom: 20px;  
    }
 }
</style>


