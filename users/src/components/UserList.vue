<template>
  <div>
    <div v-if="loading">Loading...</div>
    <div v-if="error">{{ error }}</div>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">{{ user.name }}</li>
    </ul>
  </div>
</template>
<script>
import axios from 'axios'
export default {
  data() {
    return {
      users: [],
      loading: false,
      error: null,
    }
  },
  async created() {
    this.fetchUsers()
  },
  methods: {
    async fetchUsers() {
      this.loading = true
      try {
        const response = await axios.get('https://api.moebius.com/users')
        this.users = response.data
      } catch (err) {
        this.error = 'Failed to fetch users'
      } finally {
        this.loading = false
      }
    },
  },
}
</script>
