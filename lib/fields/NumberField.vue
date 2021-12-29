<template>
  <input type="number" :value="value" @input="handleChange" />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Schema } from '../types'
export default defineComponent({
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props) {
    const handleChange = (e: any): void => {
      const value = e.target.value
      const num = Number(value)
      if (isNaN(num)) {
        props.onChange(undefined)
      } else {
        props.onChange(num)
      }
    }
    return {
      handleChange
    }
  }
})
</script>
