/**
* v-clipboard 文字复制剪贴
* Copyright (c) 2021 kxiot
*/

import Clipboard from 'clipboard'
export default {
  // 绑定指令时调用
  bind(el, binding, vnode) {
    switch (binding.arg) {
      case 'success':
        // 存储成功回调函数
        el._vClipBoard_success = binding.value;
        break;
      case 'error':
        // 存储错误回调函数
        el._vClipBoard_error = binding.value;
        break;
      default: {
        // 创建 Clipboard 实例
        const clipboard = new Clipboard(el, {
          text: () => binding.value,
          action: () => binding.arg === 'cut' ? 'cut' : 'copy'
        });
        // 绑定成功事件
        clipboard.on('success', e => {
          const callback = el._vClipBoard_success;
          callback && callback(e);
        });
        // 绑定错误事件
        clipboard.on('error', e => {
          const callback = el._vClipBoard_error;
          callback && callback(e);
        });
        // 存储 Clipboard 实例
        el._vClipBoard = clipboard;
      }
    }
  },
  // 指令更新时调用
  update(el, binding) {
    if (binding.arg === 'success') {
      // 更新成功回调函数
      el._vClipBoard_success = binding.value;
    } else if (binding.arg === 'error') {
      // 更新错误回调函数
      el._vClipBoard_error = binding.value;
    } else {
      // 更新文本和动作
      el._vClipBoard.text = function () { return binding.value; };
      el._vClipBoard.action = () => binding.arg === 'cut' ? 'cut' : 'copy';
    }
  },
  // 指令解绑时调用
  unbind(el, binding) {
    if (!el._vClipboard) return
    if (binding.arg === 'success') {
      // 删除成功回调函数
      delete el._vClipBoard_success;
    } else if (binding.arg === 'error') {
      // 删除错误回调函数
      delete el._vClipBoard_error;
    } else {
      // 销毁 Clipboard 实例并删除
      el._vClipBoard.destroy();
      delete el._vClipBoard;
    }
  }
}
