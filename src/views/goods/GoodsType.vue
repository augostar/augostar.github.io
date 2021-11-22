<template>
  <div>
    <Table ref="tableRef" :get-data="getTableData" :columns="columns"
           :expanded="false"
    >
      <!-- 定义表头 -->
      <template #header="slotProps">
        共 {{ slotProps.total }}条数据
      </template>
      <template #operation="{ record }">
        <div class="operation">
          <a-switch
            v-model:checked="record.state"
            checked-children="开启"
            un-checked-children="关闭"
            :checked-value="1"
            :un-checked-value="0"
            @change="handStateChange(record)"
          />
          <a-popconfirm
            title="确定删除吗？"
            ok-type="error"
            cancel-text="取消"
            ok-text="确定"
            danger
            @confirm="cancel(record)"
          >
            <a-button type="link" danger>
              删除
            </a-button>
          </a-popconfirm>

          <a-button type="link" @click="update(record)">
            修改
          </a-button>
        </div>
      </template>
    </Table>

    <a-drawer
      width="400"
      title="修改商品类型"
      placement="right"
      :closable="true"
      :visible="visible"
      @close="visible=!visible"
    >
      <a-form>
        <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
          <a-input v-model:value="title" type="text" />
        </a-form-item>
        <a-form-item :wrapper-col="{ span: 20, offset: 4 }">
          <a-button type="primary" block @click="submit">
            提交
          </a-button>
        </a-form-item>
      </a-form>
    </a-drawer>
  </div>
</template>

<script>
import { reactive, ref,toRefs } from 'vue';
import Table from '/@/components/basic/Table.vue';
import $axios from '/@/http/model/goods';
import { message ,notification } from 'ant-design-vue';

export default {
  components: {
    Table
  },
  setup() {
    //  ();
    const columns = ref([
      {
        title: 'id',
        dataIndex: 'id',
        width: 160,
        ellipsis: true,
        align: 'center'
      },
      {
        title: '类型名称',
        dataIndex: 'title',
        width: 160,
        ellipsis: true,
        align: 'center',
        // 文字长度 排序
        sorter: (a, b) => a.name.length - b.name.length
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        width: 160,
        ellipsis: true,
        align: 'center'
      },
      {
        title: '操作',
        dataIndex: 'operation',
        slots: { customRender: 'operation' },
        align: 'center',
        width: 160
      }
    ]);


    const tableRef = ref();
    const updateData = reactive({
      title: '',
      id:0,
      state:0
    });

    // 修改也
    const visible = ref(false);

    // 修改状态
    let handStateChange = (data) => {
      $axios.
        updateGoodsTypeState(data.id, { title: data.title, state: data.state }).
        then(() => {
          notification.success({
            message: ' 状态修改成功',
            description: `修改${data.id}状态成功`
          });


        }).
        catch(() => {
          message.error('网络异常');
        });
    };

    // 删除
    let cancel = (data) => {
      $axios.deleteGoodsType(data.id).then((d) => {
        if(d.code===2050){
          message.success(`id${d.data.id }${d.data.message}`);
          tableRef.value.getNewData();
        }
        if(d.code===3020){
          message.warning(d.msg+ d.data.title);
        }
      
      }).catch(()=>{
        message.error('网络异常');
      });
    };


    // 修改
    let update = (data)=>{
      visible.value =!visible.value;
      updateData.title = data.title;
      updateData.id = data.id;
      updateData.state = data.state;
    };
    // 提交修改内容

    let submit = ()=>{
      $axios.
        updateGoodsTypeState(updateData.id, { title: updateData.title, state: updateData.state }).
        then(() => {
          notification.success({
            message: ' 状态修改成功',
            description: `修改${updateData.id}状态成功`
          });
          tableRef.value.getNewData();
        }).
        catch(() => {
          message.error('网络异常');
        });

    }; 

    let getTableData = $axios.getGoodsType;

    return {
      ...toRefs(updateData),
      columns,
      getTableData,
      handStateChange,
      cancel,
      update,
      visible,
      submit,
      tableRef
    };
  }
};
</script>

<style lang="less" scoped>
.operation {
  display: flex;
  justify-content: space-evenly;
}
</style>