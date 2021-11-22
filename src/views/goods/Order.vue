<template>
  <div>
    <Table :columns="columns" :get-data="orderData">
      <!-- 定义表头 -->
      <template #header>
        {{ "订单" }}
      </template>
      <!-- 定义展开内容 -->
      <template #expandedRowRender="slotProps">
        <a-descriptions
          bordered
          title="收货人详情"
          layout="vertical"
          :column="24"
        >
          <a-descriptions-item label="收货人姓名" :span="1">
            {{ slotProps.record["orders_info"].name }}
          </a-descriptions-item>
          <a-descriptions-item label="收货人地址" :span="1">
            {{ slotProps.record["orders_info"].address }}
          </a-descriptions-item>
          <a-descriptions-item label="收货人电话" :span="1">
            {{ slotProps.record["orders_info"].phone }}
          </a-descriptions-item>
          <a-descriptions-item label="收货人标识" :span="1">
            {{ slotProps.record.openId }}
          </a-descriptions-item>
        </a-descriptions>
        <a-descriptions
          bordered
          title="订单商品"
          size="middle"
          layout="vertical"
          :column="24"
        >
          <template
            v-for="item in slotProps.record.orders_info.orders_goods"
            :key="item.id"
          >
            <a-descriptions-item label="商品名称" :span="6">
              {{ item.good.title }}
            </a-descriptions-item>
            <a-descriptions-item label="商品价格" :span="6">
              {{ item.good.price }}
            </a-descriptions-item>
            <a-descriptions-item label="商品图片" :span="12">
              <a-image width="100px" :src="item.good.files_image.url" />
            </a-descriptions-item>
          </template>
        </a-descriptions>
      </template>

      <!-- 自定义样式 -->

      <!-- 自定义操作 -->
      <template #operation="slotProps">
        <a-row :gutter="[2, 2]">
          <a-col :span="12">
            <a-popconfirm
              title="确定删除吗？"
              ok-type="error"
              cancel-text="取消"
              ok-text="确定"
              danger
            >
              <a-button type="primary" danger>
                删除
              </a-button>
            </a-popconfirm>
          </a-col>
          <a-col :span="12">
            <a-popconfirm
              title="确定发货吗？"
              ok-type="error"
              cancel-text="取消"
              ok-text="确定"
              danger
            >
              <a-button type="primary" ghost>
                发货
              </a-button>
            </a-popconfirm>
          </a-col>
        </a-row>
      </template>
    </Table>
  </div>
</template>

<script >
import { defineComponent, ref } from 'vue';
import Table from '/@/components/basic/Table.vue';
import $axios from '/@/http/model/order';

export default defineComponent({
  components: {
    Table
  },
  setup() {
    // 定义表头
    const columns = ref([
      {
        title: 'id',
        dataIndex: 'id',
        width: 160,
        ellipsis: true,
        align: 'center'
      },
      {
        title: '订单号',
        dataIndex: 'nonceStr',
        width: 160,
        ellipsis: true,
        align: 'center'
      },
      {
        title: '订单金额',
        dataIndex: 'total',
        align: 'center',
        slots: { customRender: 'money' },
        moneySymbol:'￥'
      },
      {
        title: '订单状态',
        dataIndex: 'state',
        align: 'center',
        slots: { customRender: 'state' },
        stateValue: [
          { value: 0, title: '订单未支付', color: '#ff7875' },
          { value: 1, title: '订单已支付', color: '#1890ff' }
        ]
      },
      { title: '商品数量', dataIndex: 'number', align: 'center' },
      { title: '创建日期', dataIndex: 'createdAt', align: 'center' },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        align: 'center',
        width: 160
      }
    ]);
    // 定义请求方法    
    let orderData = $axios.getOrder;


    
    return {
      columns,
      orderData
    };
  }
});
</script>


<style lang="less" scoped>
</style>
