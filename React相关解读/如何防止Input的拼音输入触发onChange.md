# 如何防止Input的拼音输入触发onChange

需要使用到<Input />的两个厲性 compositionstart 和compositionEnd。下面来看看它们的MDN定义。
compositionstart：输入法编辑器开始新的输入法合成时触发的事件，例如，当用户使用拼音输入法开始输
入汉字时，这个事件就会被触发。
compositionstart：同理可得，这是输入法合成完成后触发的事件，例如，当用户使用拼音输入法输入完拼
音选中汉字时，这个事件就会被触发。
我们可以在输入法合成时设置一个锁 lock=true;在输入法合成结束时解除这个锁 lock=false，在锁生效期
间onChange事件都return掉不触发，在输入法合成结束时再setlnputValue即可。需要注意的是，这么做的话我
们的＜Input /＞组件必须设置为非受控，否则在拼音时，会因为此时锁生效不触发setlnputValue事件导致输入框
一直为空，无任何输入。

#### 示例代码

~~~js
//拼音输入时的锁
const isLock = useRef (false) ;

const onCompositionChange = useCallback((e) => {
  /** 拼音输入时上锁 */
  if (e.type === 'compositionstart') {
    isLock.current = true;
  } 
  /** 拼音输入完成后解锁，且将此时的内容手动设置入inputValue */
  else if (e.type === 'compositionend') {
    isLock.current = false;
    dispatch(e.target.value);
  }
}, []);

<Input
  onChange={(e) => {
    // 上锁时不改变inputValue
    if (isLock.current) return;
    setInputValue(e.target.value);
  }}
  onCompositionStart={onCompositionChange}
  onCompositionEnd={onCompositionChange}
/>;
~~~

