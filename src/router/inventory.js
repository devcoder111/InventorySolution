const inventory = [
  {
    path: 'categories1',
    name: 'Categories1',
    component: () => import('../views/inventory/Categories')
  },
  {
    path: 'category',
    name: 'emptyCategory',
    redirect: 'categories'
  },
  {
    path: 'category/:id',
    name: 'Category',
    component: () => import('./../views/inventory/Inventory.vue')
  }
]
export default inventory
