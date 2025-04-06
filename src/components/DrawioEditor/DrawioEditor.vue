<template>
  <div class="drawio-container">
    <iframe
      ref="drawioIframe"
      :src="drawioUrl"
      style="width: 100%; height: 90vh; border: none"
      @load="onIframeLoad"
    ></iframe>
  </div>
</template>

<script>
export default {
  props: ["initialXml"],
  data() {
    return {
      drawioUrl: this.getDrawioUrl(),
      isEditorReady: false,
    };
  },
  watch: {
    initialXml(newVal) {
      if (newVal && this.isEditorReady) {
        this.loadXml(newVal);
      }
    },
  },
  mounted() {
    window.addEventListener("message", this.handleMessage);
  },
  beforeDestroy() {
    window.removeEventListener("message", this.handleMessage);
  },
  methods: {
    getDrawioUrl() {
      const params = new URLSearchParams({
        spin: "1",
        proto: "json",
        lang: "zh",
        noSaveBtn: "0",
        client: "1", // 启用客户端模式
        stealth: "1", // 禁用部分浏览器限制
        spin: "1", // 显示加载动画
        configure: "0", // 禁用配置面板
      });
      // return `https://embed.diagrams.net/?${params.toString()}`;
      return `/drawio/index.html?${params.toString()}`; // 本地demo
      // return `http://localhost:8080/drawio/index.html?${params.toString()}`;
    },
    onIframeLoad() {
      console.log("🔄 Draw.io iframe 加载完成");
    },
    handleMessage(event) {
      const iframeWindow = this.$refs.drawioIframe?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow) return;

      try {
        const data = JSON.parse(event.data);
        console.log("[Draw.io 消息]", data);

        if (data.event === "init") {
          console.log("✅ 初始化成功");
          this.isEditorReady = true;
          this.$nextTick(() => this.loadXml(this.initialXml));
        }

        // 新增：处理加载完成事件
        if (data.event === "load") {
          console.log("🗂️ 文件已加载，强制刷新视图");
          this.forceRefresh();
        }
      } catch (error) {
        console.log("[非 JSON 消息] 已过滤");
      }
    },

    forceRefresh() {
      const message = {
        action: "refresh",
        allPages: true,
      };
      this.$refs.drawioIframe.contentWindow.postMessage(
        JSON.stringify(message),
        "*"
      );
    },

    loadXml(xml) {
      if (!xml || !this.isEditorReady) return;

      // 延迟确保编辑器完全就绪
      setTimeout(() => {
        const wrappedXml = this.wrapXml(xml);
        const message = {
          action: "load",
          xml: wrappedXml,
          autosave: 0,
          // 强制指定页面索引
          currentPage: 0,
        };
        console.log("📤 发送加载消息:", message);
        this.$refs.drawioIframe.contentWindow.postMessage(
          JSON.stringify(message),
          "*"
        );
      }, 300); // 延迟
    },
    wrapXml(xml) {
      // 清理非法字符
      const cleanXml = xml.replace(/[\x00-\x1F\x7F]/g, "").trim();

      // 如果已经是完整结构则直接返回
      if (
        cleanXml.includes("<mxfile>") &&
        cleanXml.includes("<diagram>") &&
        cleanXml.includes("<mxGraphModel>")
      ) {
        return cleanXml;
      }

      // 修复添加缺失的顶层结构
      return `
    <mxfile>
      <diagram id="0" name="Page-1">
        ${
          cleanXml.includes("<mxGraphModel>")
            ? cleanXml
            : `<mxGraphModel>${cleanXml}</mxGraphModel>`
        }
      </diagram>
    </mxfile>
  `;
    },
  },
};
</script>
