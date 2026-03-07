import { supabase } from './supabaseClient.js';

console.log("auth.js loaded");

const loginBtn = document.getElementById("login-btn");
const signupBtn = document.getElementById("signup-btn");
const logoutBtn = document.getElementById("logout-btn");

const authSection = document.getElementById("auth-section");
const appSection = document.getElementById("app-section");

loginBtn.addEventListener("click", login);
signupBtn.addEventListener("click", signup);
logoutBtn.addEventListener("click", logout);

checkSession();

async function checkSession() {

  const { data: { session } } = await supabase.auth.getSession();

  if (session) {
    showApp();
  } else {
    showLogin();
  }

}

async function login() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  showApp();
}

async function signup() {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const { error } = await supabase.auth.signUp({
    email,
    password
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("User created. You can now login.");

}

async function logout() {

  await supabase.auth.signOut();

  authSection.style.display = "block";
  appSection.style.display = "none";

  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";

}

function showApp() {

  authSection.style.display = "none";
  appSection.style.display = "block";

  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";

}

function showLogin() {

  authSection.style.display = "block";
  appSection.style.display = "none";

  loginBtn.style.display = "block";
  logoutBtn.style.display = "none";

}