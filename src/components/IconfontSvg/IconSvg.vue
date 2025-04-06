<template>
  <svg
    class="icon"
    aria-hidden="true"
    :style="{ width: fontSize, height: fontSize }"
    ref="iconSvg"
  >
    <use :xlink:href="uniqueIconId"></use>
  </svg>
</template>

<script>
export default {
  name: "AliIcon",
  props: {
    icon: {
      type: String,
      required: true,
    },
    fontSize: {
      type: String,
      default: "16px",
    },
    color: {
      type: String,
      default: "#333",
    },
  },
  data() {
    return {
      uniqueId: this.generateUniqueId(), // 每个实例生成唯一 ID
    };
  },
  computed: {
    uniqueIconId() {
      return `#${this.icon}-${this.uniqueId}`; // 为图标生成唯一引用路径
    },
  },
  mounted() {
    this.cloneAndColorIcon();
  },
  watch: {
    color(newColor) {
      this.updateIconColor(newColor);
    },
  },
  methods: {
    generateUniqueId() {
      return Math.random().toString(36).substr(2, 9); // 生成唯一 ID
    },
    cloneAndColorIcon() {
      const iconId = `#${this.icon}`;
      const svgElement = document.querySelector(iconId);

      if (svgElement) {
        const clonedSvg = svgElement.cloneNode(true); // 克隆图标
        clonedSvg.setAttribute("id", `${this.icon}-${this.uniqueId}`); // 为克隆的图标设置唯一 ID

        // 插入到 DOM 中，确保后续可用
        document.body.appendChild(clonedSvg);

        // 设置初始颜色
        this.updateIconColor(this.color);
      } else {
        console.warn(`SVG element with id ${iconId} not found`);
      }
    },
    updateIconColor(newColor) {
      const clonedSvg = document.querySelector(
        `#${this.icon}-${this.uniqueId}`
      );
      if (clonedSvg) {
        clonedSvg.querySelectorAll("*").forEach((element) => {
          element.setAttribute("fill", newColor);
        });
      } else {
        console.warn(
          `Cloned SVG element with id ${this.icon}-${this.uniqueId} not found`
        );
      }
    },
  },
};
</script>

<style scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
