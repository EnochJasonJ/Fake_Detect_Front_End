import { defineStore } from 'pinia'
import { ref } from 'vue'
import axios from 'axios'

export const useUserStore = defineStore('user', () => {
  const token = ref(localStorage.getItem('token') || '')
  const user = ref(null)

  const SetToken = (newToken) => {
    token.value=newToken
    localStorage.setItem('token',newToken)
    fetchUser()
  }

  const fetchUser = async () => {
    if(!token.value) return
    try{
      const response = await axios.get('http://localhost:8000/api/user',{
        headers: {
          Authorization: `Token ${token.value}`
        },
      });
      user.value = response.data;
    }
    catch(err){
      console.log(err)
    }
  }
  const logout = () => {
    token.value = ''
    user.value=null
    localStorage.removeItem('token')
  }
  return { token , user , SetToken, fetchUser, logout}
})
