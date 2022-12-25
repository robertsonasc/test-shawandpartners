import ListUsers from '../components/ListUsers.vue'
import DetailsUser from '../components/DetailsUser.vue'

export default [
  { 
    path: '/',
    component: ListUsers 
  },
  { 
    path: '/details/:username',
    component: DetailsUser,
    props: true,
  },
]