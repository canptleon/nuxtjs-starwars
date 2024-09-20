<template>
  <div v-if="!loading" class="mt-8 flex justify-center items-center space-x-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="handlePageClick(page)"
      :disabled="currentPage === page"
      :class="[ 
        'px-4 py-2 border rounded-md',
        currentPage === page ? 'bg-blue-500 text-white cursor-not-allowed' : 'bg-gray-200'
      ]"
    >
      {{ page }}
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  currentPage: {
    type: Number,
    required: true
  },
  totalPages: {
    type: Number,
    required: true
  },
  loading: {
    type: Boolean,
    required: false,
    default: false
  }
})

const emit = defineEmits(['pageClick'])

const handlePageClick = (page) => {
  emit('pageClick', page)
}
</script>
