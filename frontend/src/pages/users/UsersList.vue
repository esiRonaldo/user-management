<template>
  <div class="container">
    <h2>Users</h2>

    <div class="actions">
      <button @click="goToCreate">+ New User</button>
    </div>

    <p v-if="isLoading">Loading...</p>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

    <table v-if="!isLoading && users.length" class="table">
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
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.first_name }}</td>
          <td>{{ user.last_name }}</td>
          <td>{{ user.address }}</td>
          <td>{{ user.phone_number }}</td>
          <td>{{ user.username }}</td>
          <td>
            <button @click="editUser(user.id)">Edit</button>
            <button class="danger" @click="deleteUser(user.id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <p v-if="!isLoading && !users.length">No users found.</p>
  </div>
</template>

<script>
import userService from '../../Services/userService'

export default {
  name: 'UsersList',

  data() {
    return {
      users: [],
      isLoading: false,
      errorMessage: '',
    }
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
}

.actions {
  margin-bottom: 1rem;
}

button {
  padding: 0.5rem 0.8rem;
  margin-right: 0.4rem;
  border: none;
  background-color: #42b983;
  color: white;
  cursor: pointer;
  border-radius: 6px;
}

button.danger {
  background-color: #d9534f;
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
</style>Ì