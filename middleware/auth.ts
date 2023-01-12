export default defineNuxtRouteMiddleware((to, from) => {
  fetch('/api/auth/test', {method: 'GET'})
    .then(response => response.json())
    .then(response => {if(parseInt(response.status) == 200) return navigateTo('/')})
    .catch(err => {return});
})