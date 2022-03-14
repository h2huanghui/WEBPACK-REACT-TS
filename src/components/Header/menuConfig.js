
export default [
  {
    route: '/',
    title: '查价下单',
    key: '1'
  },
  {
    route: '/order',
    title: '物流订单',
    key: '2'
  },
  {
    route: '/fund',
    title: '资金',
    key: '3',
    withPopover: true,
    subMenus: [
      {
        route: '/bill',
        title: '账单管理',
        key: '3-1'
      },
      {
        route: '/fund',
        title: '物流专款',
        key: '3-2',
        withTag: true
      }
    ]
  },
  {
    route: '/setting',
    title: '设置',
    subMenus: [
      {
        route: '/setting/address',
        title: '地址管理',
        key: '4'
      },
      {
        route: '/setting/product',
        title: '商品管理',
        key: '5'
      },
      {
        route: '/setting/account',
        title: '账户信息',
        key: '6'
      }
    ]
  },
];
