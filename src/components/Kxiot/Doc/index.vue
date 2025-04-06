<template>
  <div>
    <svg-icon icon-class="question" @click="goto" />
  </div>
</template>

<script>
export default {
  name: 'KxiotDoc',
  data() {
    return {
      url: 'http://doc.kxiot.vip/kxiot-vue'
    }
  },
  methods: {
    goto() {
      window.open(this.url)
    }
  }
}
</script>