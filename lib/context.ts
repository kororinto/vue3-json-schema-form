import { inject } from 'vue'
import { CommonFieldType } from './types'

export const SchemaFormContextKey = Symbol()

export const useVJSFContext = (): { SchemaItem: CommonFieldType } => {
  const context: { SchemaItem: CommonFieldType } | undefined =
    inject(SchemaFormContextKey)
  if (!context) {
    throw Error('should be used SchemaForm')
  }
  return context
}
