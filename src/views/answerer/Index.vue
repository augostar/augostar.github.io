<template>
  <router-view v-slot="{ Component }">
    <keep-alive>
      <component :is="Component" />
    </keep-alive>
  </router-view>
</template>

<script setup >
import { provide } from 'vue-demi';
import $axios from '/@/http/model/answerer';

// provide
provide('$axios',$axios);

provide('columns',[
  {
    title: 'id',
    dataIndex: 'id',
    width: 50,
    ellipsis: true,
    align: 'center'
  },
  {
    title: '微信名称',
    dataIndex: 'wxName',
    width: 160,
    ellipsis: true,
    align: 'center',
    // 文字长度 排序
    sorter: (a, b) => a.name.length - b.name.length
  },
  {
    title: '积分',
    dataIndex: 'integral',
    width: 160,
    ellipsis: true,
    align: 'center',
    // 数据大小排序
    sorter: (a, b) => a.age - b.age
  },
  {
    title: '用户名称',
    dataIndex: 'name',
    width: 100,
    align: 'center',
    slots: { title: 'name', customRender: 'name' },


    ellipsis: true
  },

  {
    title: '创建时间',
    dataIndex: 'createdAt',
    width: 160,
    align: 'center'

  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    align: 'center',
    width: 260
  }
]);



</script>
