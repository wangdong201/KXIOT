<template>
  <div class="page-help" :style="helpStyle">
    <!-- 帮助图标 -->
    <div
      class="help-icon"
      @click="showHelpDialog"
      :class="{ 'help-icon--active': helpDialogVisible }"
    >
      <i :class="iconClass"></i>
    </div>

    <!-- 帮助说明弹窗 -->
    <el-dialog
      :title="dialogTitle"
      :visible.sync="helpDialogVisible"
      :width="dialogWidth"
      class="help-dialog"
      :close-on-click-modal="false"
      :close-on-press-escape="true"
      :append-to-body="true"
      :modal-append-to-body="true"
      :destroy-on-close="true"
      :before-close="handleClose"
      top="8vh"
    >
      <div class="help-dialog-content">
        <div
          class="help-item"
          v-for="(item, index) in helpItems"
          :key="`help-${index}`"
          :class="`help-item--${item.type || 'default'}`"
        >
          <div class="help-item-header">
            <div class="help-item-icon-wrapper">
              <i :class="item.icon + ' help-item-icon'"></i>
            </div>
            <h3 class="help-item-title">{{ item.title }}</h3>
          </div>
          <div class="help-item-content">
            <ul v-if="Array.isArray(item.descriptions)">
              <li v-for="(desc, idx) in item.descriptions" :key="`desc-${idx}`">
                {{ desc }}
              </li>
            </ul>
            <p v-else-if="typeof item.descriptions === 'string'">
              {{ item.descriptions }}
            </p>
          </div>
        </div>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button
            type="primary"
            @click="handleClose"
            size="medium"
          >
            {{ confirmText }}
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "PageHelp",
  props: {
    // 弹窗标题
    dialogTitle: {
      type: String,
      default: "页面功能说明",
    },
    // 弹窗宽度
    dialogWidth: {
      type: String,
      default: "600px",
      validator: (value) => {
        return /^\d+(px|%|rem|em|vw)$/.test(value);
      }
    },
    // 帮助项目列表
    helpItems: {
      type: Array,
      required: true,
      validator: (items) => {
        return items.every(item =>
          item.title &&
          item.icon &&
          (item.descriptions || item.content)
        );
      }
    },
    // 图标类名
    iconClass: {
      type: String,
      default: "el-icon-question",
    },
    // 确认按钮文字
    confirmText: {
      type: String,
      default: "知道了",
    },
    // 组件位置
    position: {
      type: Object,
      default: () => ({
        top: "80px",
        right: "30px",
      }),
      validator: (pos) => {
        const validKeys = ['top', 'right', 'bottom', 'left'];
        return Object.keys(pos).some(key => validKeys.includes(key));
      }
    },
    // 主题色
    themeColor: {
      type: String,
      default: "#667eea"
    },
    // 是否显示动画
    animated: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      helpDialogVisible: false,
    };
  },
  computed: {
    helpStyle() {
      const style = {};
      Object.keys(this.position).forEach(key => {
        if (this.position[key]) {
          style[key] = this.position[key];
        }
      });
      return style;
    },
    iconStyle() {
      return {
        '--theme-color': this.themeColor,
        '--theme-color-light': this.lightenColor(this.themeColor, 20)
      };
    }
  },
  methods: {
    showHelpDialog() {
      this.helpDialogVisible = true;
      this.$emit("help-opened");
      // 添加键盘事件监听
      this.$nextTick(() => {
        document.addEventListener('keydown', this.handleKeydown);
      });
    },
    handleClose(done) {
      this.helpDialogVisible = false;
      this.$emit("help-closed");
      // 移除键盘事件监听
      document.removeEventListener('keydown', this.handleKeydown);
      if (typeof done === 'function') {
        done();
      }
    },
    handleKeydown(event) {
      // ESC键关闭弹窗
      if (event.key === 'Escape' && this.helpDialogVisible) {
        this.handleClose();
      }
    },
    // 颜色处理工具函数
    lightenColor(color, percent) {
      const num = parseInt(color.replace("#", ""), 16);
      const amt = Math.round(2.55 * percent);
      const R = (num >> 16) + amt;
      const G = (num >> 8 & 0x00FF) + amt;
      const B = (num & 0x0000FF) + amt;
      return "#" + (0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1);
    }
  },
  beforeDestroy() {
    // 组件销毁时清理事件监听
    document.removeEventListener('keydown', this.handleKeydown);
  }
};
</script>

<style lang="scss" scoped>
.page-help {
  position: fixed;
  z-index: 1000;
}

.help-icon {
  width: 44px;
  height: 44px;
  background: linear-gradient(135deg, var(--theme-color, #667eea) 0%, var(--theme-color-light, #764ba2) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  user-select: none;

  &:hover {
    transform: translateY(-3px) scale(1.05);
    box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
  }

  &:active {
    transform: translateY(-1px) scale(0.98);
  }

  &--active {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(102, 126, 234, 0.5);
  }

  i {
    color: white;
    font-size: 20px;
    transition: transform 0.2s ease;
  }

  &:hover i {
    transform: rotate(15deg);
  }
}

/* 弹窗样式优化 */
.help-dialog {
  ::v-deep .el-dialog__wrapper {
    z-index: 3000 !important;
    backdrop-filter: blur(4px);
  }

  ::v-deep .el-dialog {
    z-index: 3001 !important;
    border-radius: 12px;
    overflow: hidden;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.15);
  }

  ::v-deep .el-dialog__header {
    padding: 24px 24px 16px;
    border-bottom: 1px solid #f0f2f5;
    background: linear-gradient(135deg, #f8f9fa 0%, #ffffff 100%);

    .el-dialog__title {
      font-size: 20px;
      font-weight: 600;
      color: #1f2937;
      display: flex;
      align-items: center;

      &::before {
        content: "📖";
        margin-right: 8px;
        font-size: 18px;
      }
    }

    .el-dialog__headerbtn {
      top: 20px;
      right: 20px;

      .el-dialog__close {
        font-size: 18px;
        color: #6b7280;

        &:hover {
          color: #374151;
        }
      }
    }
  }

  ::v-deep .el-dialog__body {
    padding: 24px;
    max-height: 65vh;
    overflow-y: auto;

    /* 自定义滚动条 */
    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #f1f5f9;
      border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cbd5e1;
      border-radius: 3px;

      &:hover {
        background: #94a3b8;
      }
    }
  }

  ::v-deep .el-dialog__footer {
    padding: 16px 24px 24px;
    text-align: center;
    border-top: 1px solid #f0f2f5;
    background: #fafbfc;
  }

  .help-dialog-content {
    .help-item {
      margin-bottom: 24px;
      padding: 20px;
      background: #ffffff;
      border-radius: 12px;
      border: 1px solid #e5e7eb;
      transition: all 0.2s ease;
      position: relative;
      overflow: hidden;

      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        width: 4px;
        height: 100%;
        background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
      }

      &:hover {
        transform: translateY(-2px);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.1);
        border-color: #d1d5db;
      }

      &--primary::before {
        background: linear-gradient(to bottom, #3b82f6, #1d4ed8);
      }

      &--success::before {
        background: linear-gradient(to bottom, #10b981, #047857);
      }

      &--warning::before {
        background: linear-gradient(to bottom, #f59e0b, #d97706);
      }

      &--danger::before {
        background: linear-gradient(to bottom, #ef4444, #dc2626);
      }

      .help-item-header {
        display: flex;
        align-items: center;
        margin-bottom: 16px;

        .help-item-icon-wrapper {
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #f3f4f6 0%, #e5e7eb 100%);
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-right: 12px;

          .help-item-icon {
            font-size: 18px;
            color: #3b82f6;
          }
        }

        .help-item-title {
          margin: 0;
          color: #1f2937;
          font-size: 18px;
          font-weight: 600;
          line-height: 1.4;
        }
      }

      .help-item-content {
        margin-left: 52px;

        ul {
          margin: 0;
          padding: 0;
          list-style: none;

          li {
            color: #4b5563;
            line-height: 1.6;
            margin-bottom: 8px;
            padding-left: 20px;
            position: relative;

            &::before {
              content: "•";
              position: absolute;
              left: 0;
              color: #3b82f6;
              font-weight: bold;
            }

            &:last-child {
              margin-bottom: 0;
            }
          }
        }

        p {
          margin: 0;
          color: #4b5563;
          line-height: 1.6;
        }
      }
    }
  }
}

.dialog-footer {
  .el-button {
    min-width: 100px;
    border-radius: 8px;
    font-weight: 500;
  }
}

/* 深色主题适配 */
.dark {
  .help-icon {
    background: linear-gradient(135deg, #4a5568 0%, #2d3748 100%);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

    &:hover {
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.4);
    }
  }

  .help-dialog {
    ::v-deep .el-dialog__header {
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      border-bottom-color: #374151;

      .el-dialog__title {
        color: #f9fafb;
      }
    }

    ::v-deep .el-dialog__footer {
      background: #1f2937;
      border-top-color: #374151;
    }

    .help-item {
      background: #1f2937 !important;
      border-color: #374151 !important;

      .help-item-header {
        .help-item-icon-wrapper {
          background: linear-gradient(135deg, #374151 0%, #4b5563 100%);

          .help-item-icon {
            color: #60a5fa;
          }
        }

        .help-item-title {
          color: #f9fafb;
        }
      }

      .help-item-content {
        ul li {
          color: #d1d5db;

          &::before {
            color: #60a5fa;
          }
        }

        p {
          color: #d1d5db;
        }
      }
    }
  }
}

/* 响应式适配 */
@media (max-width: 768px) {
  .help-dialog {
    ::v-deep .el-dialog {
      width: 95% !important;
      margin: 5vh auto !important;
    }

    ::v-deep .el-dialog__body {
      padding: 16px;
      max-height: 70vh;
    }

    .help-item {
      padding: 16px !important;
      margin-bottom: 16px !important;

      .help-item-header {
        .help-item-icon-wrapper {
          width: 36px;
          height: 36px;

          .help-item-icon {
            font-size: 16px;
          }
        }

        .help-item-title {
          font-size: 16px;
        }
      }

      .help-item-content {
        margin-left: 48px;

        ul li {
          font-size: 14px;
        }
      }
    }
  }

  .help-icon {
    width: 40px !important;
    height: 40px !important;

    i {
      font-size: 18px !important;
    }
  }
}

/* 动画效果 */
@keyframes helpIconPulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

.help-icon.animated {
  animation: helpIconPulse 2s infinite;
}
</style>
