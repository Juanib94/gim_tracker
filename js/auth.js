// js/auth.js

import { supabase } from './supabaseClient.js'

const loginBtn = document.getElementById('login-btn')
const logoutBtn = document.getElementById('logout-btn')
const emailInput = document.getElementById('email')
const passwordInput = document.getElementById('password')

const authSection = document.getElementById('auth-section')
const appSection = document.getElementById('app-section')


// 🔹 Check if user is already logged in
document.addEventListener('DOMContentLoaded', async () => {
  const { data: { session } } = await supabase.auth.getSession()

  if (session) {
    showApp()
  }
})


// 🔹 Login
loginBtn.addEventListener('click', async () => {
  const email = emailInput.value
  const password = passwordInput.value

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  })

  if (error) {
    alert(error.message)
  } else {
    showApp()
  }
})


// 🔹 Logout
logoutBtn.addEventListener('click', async () => {
  await supabase.auth.signOut()
  showAuth()
})


// 🔹 UI helpers
function showApp() {
  authSection.style.display = 'block'
  appSection.style.display = 'block'
  logoutBtn.style.display = 'inline-block'
  loginBtn.style.display = 'none'
}

function showAuth() {
  appSection.style.display = 'none'
  logoutBtn.style.display = 'none'
  loginBtn.style.display = 'inline-block'
}