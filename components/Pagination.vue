<template>
  <div v-if="!loading" class="mt-8 flex justify-center items-center space-x-2">
    <button
      v-for="page in totalPages"
      :key="page"
      @click="handlePageClick(page)"
      :disabled="currentPage === page"
      :class="[ 
        'px-4 py-2 border rounded-md bg-[black] text-[white] border-[solid] border-[#fcdf2b] hover:bg-[#fcdf2b] font-jediFont hover:text-black transition-all duration-200',
        currentPage === page ? '!bg-[#fcdf2b] text-black font-bold cursor-not-allowed' : 'bg-black'
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
