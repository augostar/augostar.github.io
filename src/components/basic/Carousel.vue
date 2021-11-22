<template>
  <div class="swipe">
    <a-typography-text type="secondary">
      可通过修改商品状态来显示 
    </a-typography-text>
    <a-carousel class="swipercont" arrows dots-class="slick-dots slick-thumb">
      <template #customPaging="props">
        <a>
          <img :src="getImgUrl(props.i,images)">
        </a>
      </template>
      <div v-for="(item) in images" :key="item.id">
        <img v-if="item.type=== 'jpg'" class="smallpicture" :src="item.image">
        <img v-if="item.type=== 'png'" class="smallpicture" :src="item.image">
        <video v-if="item.type=== 'mp4'" class="smallpicture" :src="item.image" />
      </div>
    </a-carousel>
  </div>
</template>
<script >
import { defineComponent, toRefs } from 'vue';

export default defineComponent({
  props: {
    images: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  setup(props) {
    const { images } = toRefs(props);
    const getImgUrl = (i) => {
      return images.value[i].image;
    };
    return {
      getImgUrl
    };
  }
});
</script>
<style scoped>
/* For demo */
.ant-carousel :deep(.slick-dots) {
  position: relative;
  height: auto;
}
.ant-carousel :deep(.slick-slide img) {
  border: 5px solid #fff;
  display: block;
  margin: auto;
  max-width: 80%;
}
.ant-carousel :deep(.slick-arrow) {
  display: none !important;
}
.ant-carousel :deep(.slick-thumb) {
  bottom: 0px;
}
.ant-carousel :deep(.slick-thumb li) {
  width: 60px;
  height: 45px;
}
.ant-carousel :deep(.slick-thumb li img) {
  width: 100%;
  height: 100%;
  filter: grayscale(100%);
}
.ant-carousel :deep .slick-thumb li.slick-active img {
  filter: grayscale(0%);
}

.smallpicture{
  max-height: 300px;
}
.swipe{
  height: 500px;
  padding: 20px 120px;
}
.swipercont{
  border: 5px solid #FFF ;
  height: 500px;
  width: 300px;
  margin: auto;
  border-radius: 15px;
  padding: 10px;
}

</style>

<style>
/* slick-dots slick-dots-bottom slick-dots slick-thumb */
ul.slick-dots.slick-dots-bottom.slick-dots.slick-thumb{
    height: 66px;
    overflow-y: hidden;
    white-space: nowrap;
    
}
  /* 定义滚动条样式 */
ul.slick-dots.slick-dots-bottom.slick-dots.slick-thumb::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: rgba(240, 240, 240, 1);
}
 
/*定义滚动条轨道 内阴影+圆角*/
ul.slick-dots.slick-dots-bottom.slick-dots.slick-thumb::-webkit-scrollbar-track {
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  border-radius: 10px;
  background-color: rgba(240, 240, 240, .5);
}
 
/*定义滑块 内阴影+圆角*/
ul.slick-dots.slick-dots-bottom.slick-dots.slick-thumb::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 0px rgba(240, 240, 240, .5);
  background-color: rgba(240, 240, 240, .5);
}
</style>