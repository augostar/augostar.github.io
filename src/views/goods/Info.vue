<template>
  <a-table
    :data-source="dataSource"
    :columns="columns"
    :row-key="(record) => record.id"
    :row-class-name="
      (record, index) => (index % 2 === 0 ? 'table-striped' : null)
    "
    bordered
    size="small"
    :pagination="false"
    :expanded-row-keys="openkey"
    @expandedRowsChange="handExpandedRowsChange"
  >
    <template #name="{ text }">
      <a>{{ text }}</a>
    </template>

    <template #title>
      <a-row :gutter="[48, 8]">
        <a-col :span="3">
          <a-button
            type="primary"
            @click="setConditionPage = !setConditionPage"
          >
            设置查询条件
          </a-button>
          <SetCondition
            v-if="setConditionPage"
            :condit="setConditionPage"
            @conditChange="conditChange"
          />
        </a-col>
        <a-col :span="3">
          <a-button type="primary" @click="addpage = !addpage">
            添加商品
          </a-button>
        </a-col>
        <a-col :span="3">
          <a-button type="primary">
            分类设置
          </a-button>
        </a-col>
      </a-row>
    </template>

    <template #operation="{ record }">
      <a-row>
        <a-col :span="11">
          <a-popconfirm
            title="确定删除吗？"
            ok-type="error"
            cancel-text="取消"
            ok-text="确定"
            danger
            @confirm="onDelete(record)"
          >
            <template #icon>
              <Icon
                icon="jam:triangle-danger"
                style="display: inline-block; color: red; position: relative"
              />
            </template>

            <a-button v-if="dataSource.length" type="primary" danger>
              删除
            </a-button>
          </a-popconfirm>
        </a-col>
        <a-col :span="2" />
        <a-col :span="11">
          <a-button
            v-if="dataSource.length"
            type="primary"
            @click="updatedGoods(record)"
          >
            修改
          </a-button>
        </a-col>
      </a-row>
    </template>

    <template #expandedRowRender="{ record }">
      <a-descriptions
        v-if="infoImg.id === record.id"
        bordered
        title="商品详情"
        size="small"
        layout="vertical"
      >
        <a-descriptions-item label="副标题">
          {{ record.title2 }}
        </a-descriptions-item>
        <a-descriptions-item label="商家电话">
          {{ infoImg.phone }}
        </a-descriptions-item>
        <a-descriptions-item label="商家地址">
          {{ infoImg.address }}
        </a-descriptions-item>
        <a-descriptions-item label="商品简介">
          {{ infoImg.introduct }}
        </a-descriptions-item>
        <a-descriptions-item v-if="infoImg.goods_type" label="商品类型">
          {{ infoImg.goods_type.title }}
        </a-descriptions-item>
        <a-descriptions-item label="详细编号">
          <p>
            {{ infoImg.goods_info.id }}
          </p>
        </a-descriptions-item>
        <a-descriptions-item label="详细参数">
          <a-descriptions>
            <a-descriptions-item
              v-for="(item, index) in JSON.parse(infoImg.goods_info.specs)[0]"
              :key="index"
              :label="index"
            >
              {{ item }}
            </a-descriptions-item>
          </a-descriptions>
          <a-divider orientation="left">
            商品详情文件
          </a-divider>
          <a-image-preview-group>
            <a-row>
              <a-col
                v-for="(item, index) in infoImg.goods_info.infoimg"
                :key="index"
                :span="8"
              >
                <a-card hoverable style="width: 200px">
                  <template #cover>
                    <a-image
                      v-if="item.type === 'jpg'"
                      :width="200"
                      :src="item.url"
                      :alt="item.name"
                      :name="item.name"
                    />
                  </template>
                  <a-card-meta :title="item.name" />
                </a-card>
              </a-col>
            </a-row>
          </a-image-preview-group>
          <a-descriptions
            v-for="(item, index) in infoImg.goods_info.infoimg"
            :key="index"
          >
            <a-descriptions-item :span="2" label="文件编号">
              {{ item.id }}
            </a-descriptions-item>
            <a-descriptions-item :span="2" label="文件名称">
              {{ item.name }}
            </a-descriptions-item>
            <a-descriptions-item :span="2" label="文件大小">
              {{ item.size / 1000 }}KB
            </a-descriptions-item>
            <a-descriptions-item label="文件类型">
              {{ item.type }}
            </a-descriptions-item>
          </a-descriptions>
        </a-descriptions-item>
        <a-descriptions-item label="商品图片">
          <a-card hoverable style="width: 400px">
            <template #cover>
              <a-image :width="400" :src="infoImg.image" preview />
            </template>
            <a-card-meta
              v-if="infoImg.files_image"
              :title="'文件上传时间:' + infoImg.files_image.createdAt || ''"
            >
              <template #description>
                <p v-if="infoImg.files_image.size">
                  文件大小: {{ infoImg.files_image.size / 1000 }}KB
                </p>
                <p>
                  文件类型:
                  {{ infoImg.files_image ? infoImg.files_image.type : "" }}
                </p>
              </template>
            </a-card-meta>
          </a-card>
        </a-descriptions-item>
      </a-descriptions>
      <!-- <img :src="getImg(record)" alt="" srcset=""> -->
    </template>
    <template #expandIcon="props">
      <Icon
        class="icon"
        :icon="
          props.record.id === openkey[0]
            ? 'ant-design:arrow-down-outlined'
            : 'ant-design:arrow-right-outlined'
        "
        @click="getImg(props)"
      />
    </template>

    <template #state="{ record }">
      <a-switch
        v-model:checked="record.goods_state.ad"
        checked-children="广告"
        un-checked-children="商品"
        :checked-value="1"
        :un-checked-value="0"
        @change="handStateChange('ad', record.goods_state.id)"
      />
      <a-switch
        v-model:checked="record.goods_state.release"
        checked-children="已发布"
        un-checked-children="未发布"
        :checked-value="1"
        :un-checked-value="0"
        @change="handStateChange('release', record.goods_state.id)"
      />
      <a-switch
        v-model:checked="record.goods_state.lack"
        checked-children="已缺货"
        un-checked-children="可购买"
        :checked-value="1"
        :un-checked-value="0"
        :class="record.goods_state.lack === 1 ? 'switcherror1' : 'switcherror0'"
        @change="handStateChange('lack', record.goods_state.id)"
      />
    </template>

    <template #footer>
      <a-pagination
        v-model:current="current"
        :total="total"
        :page-size="pageSize"
        @change="handPaginationChange"
      >
        <template #itemRender="{ page, type, originalElement }">
          <a v-if="type === 'prev'" :key="page">上一页</a>
          <a v-else-if="type === 'next'">下一页</a>
          <renderVNode v-else :vnode="originalElement" />
        </template>
      </a-pagination>
    </template>
  </a-table>

  <AddGoods v-if="addpage" :addpage="addpage" @change="updateAddpage" />

  <a-drawer
    title="修改商品信息"
    :width="720"
    :closable="false"
    :visible="updatedState"
    @close="UpdatedOnClose"
  >
    <Updated :updated-data="updatedData" />
  </a-drawer>
</template>
<script >
import { defineComponent, reactive, ref, toRefs } from 'vue';
import $axios from '/@/http/model/goods';
import { notification } from 'ant-design-vue';

import { Icon } from '@iconify/vue';

function renderVNode(_, { attrs: { vnode } }) {
  return vnode;
}

import { goodsinfotablecolumns } from './goods';

import AddGoods from './AddGoods.vue';
import SetCondition from '/@/views/goods/SetCondit.vue';
import Updated from '/@/views/goods/Updated.vue';

export default defineComponent({
  components: {
    Icon,
    renderVNode,
    AddGoods,
    SetCondition,
    Updated
  },
  setup() {
    let dataSource = ref([]);
    let infoImg = ref({});
    let openkey = ref([]);
    let addpage = ref(false);
    let updatedState = ref(false);
    let updatedData  =ref({});

    let pagination = reactive({
      total: 0,
      pageSize: 10,
      current: 1
    });

    let setConditionPage = ref(false);

    // 获取商品 数据
    let getGoods = () => {
      $axios.getGoods(pagination.current, pagination.pageSize).then((d) => {
        dataSource.value = d.rows;
        pagination.total = d.count;
      });
    };

    // todo 删除商品 更新商品
    let onDelete = (key) => {
      $axios.
        delete(key.id).
        then(() => {
          notification.success({
            message: ' 删除成功',
            description: `已删除删除${key.id}`
          });
          getGoods();
        }).
        catch(() => {
          notification.error({
            message: '删除失败',
            description: `删除${key.id}失败`
          });
        });
    };

    // 获取展开 内容的信息
    let getImg = (val) => {
      if (val.record.id === openkey.value[0]) {
        openkey.value = [];
        return;
      }
      openkey.value.push(val.record.id);
      $axios.idGetGoods(val.record.id).then((d) => {
        infoImg.value = d;
      });
    };

    //  表格展开页
    const handExpandedRowsChange = (expandedRows) => {
      openkey.value = [];
      openkey.value.push(expandedRows[expandedRows.length - 1]);
    };

    // 更新商品状态状态
    let handStateChange = (val, id) => {
      $axios.
        modifyGoodsState(id, val).
        // eslint-disable-next-line no-unused-vars
        then((d) => {
          notification.success({
            message: ' 状态修改成功',
            description: `修改${id}状态成功`
          });
          getGoods();
        }).
        catch(() => {
          notification.error({
            message: ' 状态修改失败',
            description: `修改${id}状态失败`
          });
        });
    };

    // 页码更新 更新数据
    const handPaginationChange = () => {
      getGoods();
    };

    // 获取商品信息
    getGoods();

    // 显示添加页
    const updateAddpage = (val) => {
      addpage.value = val;
      getGoods();
    };

    // 设置搜索条件
    const setCondition = (val) => {
      console.log(val);
    };

    const paginationRefs = toRefs(pagination);

    const conditChange = (val) => {
      setConditionPage.value = val;
    };

    // 修改页 显示
    const updatedGoods = (val) => {
      updatedState.value = true;
      updatedData.value = val;
    };

    const  UpdatedOnClose = ()=>{
      updatedState.value = false;
    };

    return {
      addpage,
      ...paginationRefs,
      openkey,
      dataSource,
      infoImg,
      columns: goodsinfotablecolumns,
      setConditionPage,
      updatedGoods,
      onDelete,
      handStateChange,
      getImg,
      handExpandedRowsChange,
      handPaginationChange,
      updateAddpage,
      setCondition,
      conditChange,
      updatedState,
      UpdatedOnClose,
      updatedData
    };
  }
});
</script>

<style lang="less" spaced >
.table-striped {
  background-color: #ccc !important;
}
.ant-switch {
  margin: 0 3px;
}
.switcherror1 {
  background: #ff7875;
}
.switcherror0 {
  background-color: #1890ff;
}

.ant-popover-message-title {
  display: inline-block;
}
button.ant-btn.ant-btn-error.ant-btn-sm {
  color: red;
}

.information-image {
  padding: 5px;
}
</style>