<template>
  <button class="base-button" :class="variant" :type="type" :disabled="disabled" @click="$emit('click', $event)">
    <slot />
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
    type: {
      type: String,
      default: 'button',
    },
    variant: {
      type: String,
      default: 'primary',
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['click'],
}
</script>

<style scoped>
.base-button {
  padding: 0.5rem 0.8rem;
  margin-right: 0.4rem;
  border: none;
  border-radius: 6px;
  color: white;
  cursor: pointer;
}

.primary {
  background-color: #42b983;
}

.danger {
  background-color: #d9534f;
}

.secondary {
  background-color: gray;
}

.base-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
</style>
