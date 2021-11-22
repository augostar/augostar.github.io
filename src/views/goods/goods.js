// 商品信息表格表头
export let goodsinfotablecolumns = [
  {
    title: 'id',
    dataIndex: 'id',
    key: 'id',
    sorter: (a, b) => a.id - b.id
  },
  {
    title: '产品名称',
    dataIndex: 'title',
    key: 'id',
    align: 'center',
    sorter: (a, b) => a.title.length - b.title.length
  },  {
    title: '商家名称',
    dataIndex: 'admin_user.nickName',
    align: 'center'

  },
  {
    title: '产品价格',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
    align: 'center'
  },
  {
    title: '商品类型',
    dataIndex: 'goods_type.title',
    align: 'center'
  },
  {
    title: '创建时间',
    dataIndex: 'createdAt',
    align: 'center'
  },
  {
    title: '状态',
    dataIndex: 'state',
    slots: { customRender: 'state' },
    align: 'center',
    width: 230
  },
  {
    title: '操作',
    dataIndex: 'operation',
    slots: { customRender: 'operation' },
    align: 'center',
    width: 160
  }

];

// 商品订单表格表头
export let goods_order =[
  // 
];


