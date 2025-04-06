<template>
  <div>
    <DrawioEditor :initial-xml="initialXml" />
  </div>
</template>

<script>
import DrawioEditor from "@/components/DrawioEditor/DrawioEditor.vue";

export default {
  components: {
    DrawioEditor,
  },
  data() {
    return {
      initialXml: `
<mxGraphModel>
  <root>
    <mxCell id="0" />
    <mxCell id="1" parent="0" />
    <mxCell id="2" value="Hello" parent="1" vertex="1">
      <mxGeometry x="100" y="100" width="80" height="30" as="geometry" />
    </mxCell>
  </root>
</mxGraphModel>
`,
    };
  },
  methods: {},
};
</script>

