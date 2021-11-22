<template>
  <div class="title" :data-word="titles">
    <svg class="svg" viewBox="0 0 400 200">
      <text :class="black" x="-50%" y="90%">{{ titles }}</text>
    </svg>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    title: {
      type:String,
      default: ''
    },
    color:{
      type: String,
      default: 'black'
    }
  },
  setup(props) {
    return {
      titles: props.title,
      black:props.color
    };
  }
});
</script>

<style lang="less" spaced>
.svg {
  width: 300px;
  height: 50px;
  margin: auto;
  color: #CCC;
}

.black {
  text-transform: uppercase;
  animation: stroke 1.5s infinite alternate;
  // letter-spacing: 50px;
  font-size: 160px;
  text-align: center;
}
@keyframes stroke {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(0, 0, 0, 0.5);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 0.8;
  }
  50% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(0, 0, 0, 0.5);
    stroke-width: 1.2;
  }
  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(0, 0, 0, 0.5);
    stroke-width: 1.5;
  }
  90%,
  100% {
    fill: rgba(0, 0, 0, 0.5);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}

.white {
  text-transform: uppercase;
  animation: white 1.5s infinite alternate;
  // letter-spacing: 50px;
  font-size: 160px;
  text-align: center;
}
@keyframes white {
  0% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 0.5);
    stroke-dashoffset: 25%;
    stroke-dasharray: 0 50%;
    stroke-width: 0.8;
  }
  50% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 0.5);
    stroke-width: 1.2;
  }
  70% {
    fill: rgba(72, 138, 20, 0);
    stroke: rgba(255, 255, 255, 0.5);
    stroke-width: 1.5;
  }
  90%,
  100% {
    fill: rgba(255, 255, 255, 0.5);
    stroke: rgba(54, 95, 160, 0);
    stroke-dashoffset: -25%;
    stroke-dasharray: 50% 0;
    stroke-width: 0;
  }
}
</style>
