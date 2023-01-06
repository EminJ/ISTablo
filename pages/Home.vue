<template>
  <div
    ref="box"
    class="w-3/4 h-3/4 absolute bg-zinc-700 rounded-sm"
    :style="{ transform: `rotateX(${rotateX}deg) rotateY(${rotateY}deg)` }"
    @mousemove="handleMouseMove"
  ></div>
</template>

<script>
export default {
  data() {
    return {
      rotateX: 0,
      rotateY: 0
    };
  },
  methods: {
    handleMouseMove(event) {
      const { offsetX, offsetY } = event;
      const { offsetWidth: width, offsetHeight: height } = this.$refs.box;
      this.rotateX = -(offsetY - height / 2) / (height / 2) * 3.75;
      this.rotateY = (offsetX - width / 2) / (width / 2) * 3.75;
    }
  }
};
</script>