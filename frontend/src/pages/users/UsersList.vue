<template>
  <div class="container">
    <h2>Users</h2>

    <div class="toolbar">
      <BaseButton @click="goToCreate">+ New User</BaseButton>

      <label for="sort-by" class="sort-label">Sort by</label>

      <select id="sort-by" v-model="sortBy" class="sort-select">
        <option value="first_name">First Name</option>
        <option value="last_name">Last Name</option>
      </select>

      <input
        v-model.trim="searchQuery"
        type="text"
        placeholder="Search users..."
        class="search-input"
      />
    </div>

    <p v-if="isLoading">Loading...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <div v-if="!isLoading && displayedUsers.length" class="table-wrapper">
      <table class="table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Address</th>
            <th>Phone</th>
            <th>Username</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="user in displayedUsers" :key="user.id">
            <td>{{ user.first_name }}</td>
            <td>{{ user.last_name }}</td>
            <td>{{ user.address }}</td>
            <td>{{ user.phone_number }}</td>
            <td>{{ user.username }}</td>
            <td class="actions-cell">
              <BaseButton @click="editUser(user.id)">Edit</BaseButton>
              <BaseButton variant="danger" @click="deleteUser(user.id)">
                Delete
              </BaseButton>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="!isLoading && !displayedUsers.length">No users found.</p>
  </div>
</template>

<script>
import BaseButton from '../../components/BaseButton.vue'
import userService from '../../Services/userService'

export default {
  name: 'UsersList',

  components: {
    BaseButton,
  },

  data() {
    return {
      users: [],
      searchQuery: '',
      sortBy: 'last_name',
      isLoading: false,
      errorMessage: '',
    }
  },

  computed: {
    displayedUsers() {
      const query = this.searchQuery.toLowerCase()
      let filteredUsers = this.users

      if (query) {
        filteredUsers = this.users.filter((user) =>
          user.first_name.toLowerCase().includes(query) ||
          user.last_name.toLowerCase().includes(query) ||
          user.username.toLowerCase().includes(query)
        )
      }

      if (!this.sortBy) {
        return filteredUsers
      }

      return [...filteredUsers].sort((a, b) =>
        a[this.sortBy].localeCompare(b[this.sortBy])
      )
    },
  },

  methods: {
    async loadUsers() {
      this.isLoading = true
      this.errorMessage = ''

      try {
        this.users = await userService.getAllUsers()
      } catch (err) {
        this.errorMessage = err.message
      } finally {
        this.isLoading = false
      }
    },

    goToCreate() {
      this.$router.push('/users/new')
    },

    editUser(id) {
      this.$router.push(`/users/${id}/edit`)
    },

    async deleteUser(id) {
      if (!confirm('Are you sure?')) return

      try {
        await userService.deleteUser(id)
        this.loadUsers()
      } catch (err) {
        this.errorMessage = err.message
      }
    },
  },

  mounted() {
    this.loadUsers()
  },
}
</script>

<style scoped>
.container {
  max-width: 900px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.toolbar {
  display: flex;
  gap: 0.75rem;
  align-items: center;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.search-input,
.sort-select {
  padding: 0.5rem 0.8rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.sort-label {
  font-weight: 600;
}

.search-input {
  flex: 1;
  min-width: 220px;

}

.table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #ddd;
  padding: 0.6rem;
  text-align: left;
}

.table th {
  background-color: #f2f2f2;
}

.error {
  color: red;
}

.actions-cell {
  white-space: nowrap;
}
</style>Ì
