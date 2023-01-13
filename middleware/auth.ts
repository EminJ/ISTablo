export default defineNuxtRouteMiddleware(async (to, from) => {
  try {
    const res = await fetch('/api/auth/test', {method: 'GET'})
    const data = await res.json()
    if(parseInt(data.status) == 200) return navigateTo('/')
  } catch (err) {
    console.error(err);
  }
})

//definePageMeta({middleware: ["auth"]})