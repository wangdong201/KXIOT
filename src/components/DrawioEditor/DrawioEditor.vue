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
import { postSvg } from "@/api/drawio";
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
        hide: "format;shapes", // 隐藏格式和形状面板
        // 其他参数...
        embed: "1", // 嵌入模式
      });
      // return `https://embed.diagrams.net/?${params.toString()}`; // 官方demo
      return `/drawio/index.html?${params.toString()}`; // 本地demo
    },
    onIframeLoad() {
      // console.log("🔄 Draw.io iframe 加载完成");
    },
    handleMessage(event) {
      const iframeWindow = this.$refs.drawioIframe?.contentWindow;
      if (!iframeWindow || event.source !== iframeWindow) return;

      try {
        const data = JSON.parse(event.data);
        // console.log("[Draw.io 消息]", data);

        if (data.event === "init") {
          this.isEditorReady = true;
          this.$nextTick(() => this.loadXml(this.initialXml));
        }

        // 新增：处理加载完成事件
        if (data.event === "load") {
          this.forceRefresh();
        }
        // 新增：处理保存事件
        if (data.event === "save") {
          const xml = data.xml;
          if (xml) {
            console.log("🔄 自动保存的XML数据:", xml);
            postSvg({ data: xml })
              .then(() => {
                console.log("✅ 保存成功");
                this.$message({
                  message: "图表保存成功",
                  type: "success",
                  showClose: true,
                  duration: 2000,
                });
              })
              .catch((e) => {
                console.error("❌ 保存失败:", e);
                this.$message.error({
                  message: `保存失败: ${e.message || "未知错误"}`,
                  showClose: true,
                  duration: 3000,
                });
              });
          }
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
        this.$refs.drawioIframe.contentWindow.postMessage(
          JSON.stringify(message),
          "*"
        );
      }, 300); // 延迟
    },
    wrapXml(xml) {
      // 清理非法字符
      const cleanXml = xml.replace(/[\x00-\x1F\x7F]/g, "").trim();

      // 使用正则检测完整结构（允许属性存在）
      const structureCheck =
        /<mxfile[^>]*>[\s\S]*<diagram[^>]*>[\s\S]*<mxGraphModel[^>]*>/i;

      if (structureCheck.test(cleanXml)) {
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
        </mxfile>`.trim();
    },
    // 修改后的获取当前绘图的 XML 并上传
    getDiagramXml() {
      const iframeWindow = this.$refs.drawioIframe?.contentWindow;
      if (!iframeWindow) return;

      // 发送保存指令（确保与handleMessage中的保存触发联动）
      iframeWindow.postMessage(
        JSON.stringify({
          action: "save",
          format: "xml",
        }),
        "*" // 使用通配符确保跨域
      );
    },
  },
};
</script>
