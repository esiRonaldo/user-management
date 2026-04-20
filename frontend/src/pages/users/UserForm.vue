<template>
  <div class="container">
    <h2>{{ isEditMode ? 'Edit User' : 'Create User' }}</h2>

    <form @submit.prevent="submitForm">
      <div class="form-control">
        <label>First Name</label>
        <input v-model.trim="form.first_name" @input="suggestUsername" />
      </div>

      <div class="form-control">
        <label>Last Name</label>
        <input v-model.trim="form.last_name" @input="suggestUsername" />
      </div>

      <div class="form-control">
        <label>Address</label>
        <input
          v-model.trim="form.address"
          placeholder="e.g. 12 Main Street, Berlin"
        />
      </div>

      <div class="form-control">
        <label>Phone Number</label>
        <input
          v-model.trim="form.phone_number"
          placeholder="e.g. +49 151 23456789"
        />
      </div>

      <div class="form-control">
        <label>Username</label>
        <input
          v-model.trim="form.username"
          placeholder="e.g. maria.smith"
          @input="manualEdit = true"
        />
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="actions">
        <BaseButton type="submit" :disabled="!isFormComplete">
          {{ isEditMode ? 'Update' : 'Create' }}
        </BaseButton>
        <BaseButton variant="secondary" @click="goBack">Cancel</BaseButton>
      </div>
    </form>
  </div>
</template>

<script>
import BaseButton from '../../components/BaseButton.vue'
import userService from '../../Services/userService'

export default {
  name: 'UserForm',

  components: {
    BaseButton,
  },

  props: ['id'],

  data() {
    return {
      form: {
        first_name: '',
        last_name: '',
        address: '',
        phone_number: '',
        username: '',
      },
      errorMessage: '',
      manualEdit: false,
    }
  },

  computed: {
    isEditMode() {
      return !!this.id
    },

    isFormComplete() {
      const { first_name, last_name, address, phone_number, username } = this.form

      return [first_name, last_name, address, phone_number, username].every(
        (value) => value && value.trim()
      )
    },
  },

  methods: {
    async loadUser() {
      if (!this.id) return

      try {
        const user = await userService.getUserById(this.id)
        this.form = { ...user }
        this.manualEdit = true
      } catch (err) {
        this.errorMessage = err.message
      }
    },

    suggestUsername() {
      if (this.manualEdit) return

      const first = this.form.first_name.toLowerCase().replace(/\s+/g, '')
      const last = this.form.last_name.toLowerCase().replace(/\s+/g, '')

      if (!first && !last) {
        this.form.username = ''
        return
      }

      this.form.username = [first, last].filter(Boolean).join('.')
    },

    async submitForm() {
      this.errorMessage = ''

      const { first_name, last_name, address, phone_number, username } = this.form

      if (!first_name || !last_name || !address || !phone_number || !username) {
        this.errorMessage = 'Please fill all fields.'
        return
      }

      try {
        if (this.isEditMode) {
          await userService.updateUser(this.id, this.form)
        } else {
          await userService.createUser(this.form)
        }

        this.$router.push('/users')
      } catch (err) {
        this.errorMessage = err.message
      }
    },

    goBack() {
      this.$router.push('/users')
    },
  },

  mounted() {
    this.loadUser()
  },
}
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 0 1rem;
}

.form-control {
  margin-bottom: 1rem;
}

input {
  width: 100%;
  padding: 0.5rem;
}

.actions {
  margin-top: 1rem;
  gap: 0.75rem;
}

.error {
  color: red;
}
</style>
