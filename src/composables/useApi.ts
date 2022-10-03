import { Ref } from 'vue'
import { UseFetchOptions } from 'nuxt/dist/app/composables'

export const useApi = async <T, U>(
  url: string,
  options?: UseFetchOptions<T>
): Promise<U> => {
  const config = useRuntimeConfig()
  const { data, error } = (await useAsyncData(
    url,
    () =>
      $fetch(url, {
        ...options,
        baseURL: config.apiBase
      }),
    {
      initialCache: false
    }
  )) as {
    data: Ref<unknown>
    error: Ref<Error | boolean>
  }

  if (error.value) {
    console.log(error.value)
    throw error
  }

  return data.value as U
}
