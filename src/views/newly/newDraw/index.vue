<template>
  <div>
    <DrawioEditor :initial-xml="initialXml" />
  </div>
</template>

<script>
import DrawioEditor from "@/components/DrawioEditor/DrawioEditor.vue";
import { getSvg } from "@/api/drawio";

export default {
  components: {
    DrawioEditor,
  },
  data() {
    return {
      initialXml: "",
    };
  },
  created() {
    this.getSvgData();
  },
  methods: {
    async getSvgData() {
      try {
        const res = await getSvg();
        this.initialXml = res.msg;
        // console.log("获取SVG成功:", this.initialXml);
      } catch (error) {
        console.error("获取SVG失败:", error);
      }
    },
  },
};
</script>
