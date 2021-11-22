<template>
  <h1>{{ msg }}</h1>

  <p>
    <a href="https://vitejs.dev/guide/features.html" target="_blank">
      Vite Documentation
    </a>
    |
    <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Documentation</a>
  </p>

  <a-button type="button" @click="state.count++">
    count is: {{ state.count }}
  </a-button>
  <p>
    <a-table :data-source="dataSource" :columns="columns" />

    <a-button type="">
      测试
    </a-button>
    <Icon icon="mdi-light:home">
      <span class="iconify" data-icon="cif:cn" />
      123
    </Icon>
    <Icon icon="cif:cn" />
    <Icon icon="mdi:home" style="color: red">
      12222222222
    </Icon>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<script setup>

import { reactive } from 'vue';
import { Icon } from '@iconify/vue';


const state = reactive({ count: 0 });

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号'
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号'
  }
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age'
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address'
  }
];
</script>

<style scoped>
a {
  color: #42b983;
}
</style>
