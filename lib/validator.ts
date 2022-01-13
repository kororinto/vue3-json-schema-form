import Ajv from 'ajv'
import { Schema } from './types'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const i18n = require('ajv-i18n')
import toPath from 'lodash.topath'

interface TransformedErrorObject {
  name: string
  property: string
  message: string | undefined
  params: Ajv.ErrorParameters
  schemaPath: string
}
export type ErrorSchema = {
  [level: string]: ErrorSchema
} & {
  __errors?: string[]
}

function toErrorSchema(errors: TransformedErrorObject[]) {
  if (errors.length < 1) return {}

  return errors.reduce((errorSchema, error) => {
    const { property, message } = error
    const path = toPath(property)
    let parent = errorSchema
    if (path.length > 0 && path[0] === '') {
      path.splice(0, 1)
    }

    for (const segment of path.slice(0)) {
      if (!(segment in parent)) {
        parent[segment] = {}
      }
      parent = parent[segment]
    }

    if (Array.isArray(parent.__errors)) {
      parent.__errors = parent.__errors.concat(message || '')
    } else {
      if (message) {
        parent.__errors = [message]
      }
    }
    return errorSchema
  }, {} as ErrorSchema)
}

function transformErrors(
  errors: Ajv.ErrorObject[] | undefined | null
): TransformedErrorObject[] {
  if (errors === null || errors === undefined) return []
  return errors.map(({ message, dataPath, keyword, params, schemaPath }) => {
    return {
      name: keyword,
      property: `${dataPath}`,
      message,
      params,
      schemaPath
    }
  })
}

export function validateFormData(
  validator: Ajv.Ajv,
  formData: any,
  schema: Schema,
  locale = 'zh'
) {
  let validationError = null
  try {
    validator.validate(schema, formData)
  } catch (error) {
    validationError = error
  }

  i18n[locale](validator.errors)
  let errors = transformErrors(validator.errors)

  if (validationError) {
    errors = [
      ...errors,
      { message: (validationError as any).message }
    ] as TransformedErrorObject[]
  }

  const errorSchema = toErrorSchema(errors)

  return {
    errors,
    errorSchema,
    valid: errors.length === 0
  }
}
