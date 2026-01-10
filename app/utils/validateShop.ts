import type { ShopData } from "~/dts/shop.dts"

export type ValidationErrors = {
  name?: string
  category?: string
  subCategory?: string
  count?: string
}

const NAME_MAX_LENGTH = 50
const CATEGORY_MAX_LENGTH = 30
const ALLOWED_CHARACTERS =
  /^[ぁ-んァ-ヶー一-龯々a-zA-Z0-9_\s\-\(\)&\.]+$/

export function validateShop(input: Partial<ShopData>) {
  const errors: ValidationErrors = {}

  const name = input.name?.trim() || ""
  const category = input.category?.trim() || ""
  const subCategory = input.subCategory?.trim() || ""
  const count = input.count

  if (!name) {
    errors.name = "店名は必須です"
  } else if (name.length > NAME_MAX_LENGTH) {
    errors.name = `店名は最大${NAME_MAX_LENGTH}文字までです`
  } else if (!ALLOWED_CHARACTERS.test(name)) {
    errors.name = "店名に使用できない文字が含まれています"
  }

  if (!category) {
    errors.category = "カテゴリーは必須です"
  } else if (category.length > CATEGORY_MAX_LENGTH) {
    errors.category = `カテゴリーは最大${CATEGORY_MAX_LENGTH}文字までです`
  } else if (!ALLOWED_CHARACTERS.test(category)) {
    errors.category = "カテゴリーに使用できない文字が含まれています"
  }

  if (subCategory) {
    if (subCategory.length > CATEGORY_MAX_LENGTH) {
      errors.subCategory = `サブカテゴリーは最大${CATEGORY_MAX_LENGTH}文字までです`
    } else if (!ALLOWED_CHARACTERS.test(subCategory)) {
      errors.subCategory = "サブカテゴリーに使用できない文字が含まれています"
    }
  }

  if (count === undefined || count === null) {
    errors.count = "回数は必須です"
  } else if (!Number.isInteger(count)) {
    errors.count = "回数は整数で入力してください"
  } else if (count < 0) {
    errors.count = "回数は0以上で入力してください"
  } else if (count > 999) {
    errors.count = "回数は最大999までです"
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  }
}

export function sanitizeShop(input: Partial<ShopData>): Partial<ShopData> {
  return {
    ...input,
    name: input.name?.trim() || undefined,
    category: input.category?.trim() || undefined,
    subCategory: input.subCategory?.trim() || undefined,
    count: input.count, // count は必須のためそのまま返す
  }
}