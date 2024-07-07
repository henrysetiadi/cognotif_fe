import { reactive } from 'vue'

const store = reactive({
  posts: [
    {
      id: 1,
      title: 'Post',
      description: 'This is desc 1',
      date: new Date()
    },
    {
      id: 2,
      title: 'Post',
      description: 'This is desc 2',
      date: new Date()
    },
    {
      id: 3,
      title: 'Post',
      description: 'This is desc 3',
      date: new Date()
    }
  ]
})

export default store
