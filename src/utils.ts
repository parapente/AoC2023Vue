import router from './router'

export const currentDayFromRoute = () => {
  if (Array.isArray(router.currentRoute.value.params.day)) {
    return router.currentRoute.value.params.day[0]
  }

  return router.currentRoute.value.params.day
}
