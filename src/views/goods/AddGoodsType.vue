<template>
  <div>
    <a-form>
      <a-form-item label="商品类型名称">
        <a-input v-model:value="title" type="text" />
      </a-form-item>
    </a-form>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const title = ref('');
/* global defineEmits*/
const emit = defineEmits(['updata']);
watch(title, () => {
  emit('updata', title.value);
});
</script>

<style lang="less" scoped>
</style>


