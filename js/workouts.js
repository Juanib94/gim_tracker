import { supabase } from './supabaseClient.js';

let page = 0;
const limit = 10;

console.log("workouts.js loaded");

const addWorkoutBtn = document.getElementById("add-workout-btn");
const workoutList = document.getElementById("workout-list");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const pageIndicator = document.getElementById("page-indicator");

addWorkoutBtn.addEventListener("click", addWorkout);
nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", prevPage);

loadWorkouts();

async function addWorkout() {

  const dateInput = document.getElementById("workout-date");
  const date = dateInput.value;

  if (!date) {
    alert("Select a date");
    return;
  }

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    alert("User not logged in");
    return;
  }

  const { error } = await supabase
    .from("workouts")
    .insert([
      {
        workout_date: date,
        user_id: user.id
      }
    ]);

  if (error) {
    console.error(error);
    alert("Error saving workout");
    return;
  }

  loadWorkouts();
}

async function loadWorkouts() {

  const { data: { user } } = await supabase.auth.getUser();

  if (!user) return;

  const { data, error, count } = await supabase
    .from("workouts")
    .select("*", { count: "exact" })
    .eq("user_id", user.id)
    .order("workout_date", { ascending: false })
    .range(page * limit, page * limit + limit - 1);

  if (error) {
    console.error(error);
    return;
  }

  pageIndicator.textContent = "Page " + (page + 1);

  renderWorkouts(data);

  prevBtn.disabled = page === 0;
  nextBtn.disabled = data.length < limit;

  const totalPages = Math.ceil(count / limit);

  pageIndicator.textContent =
    "Page " + (page + 1) + " of " + totalPages;

  prevBtn.disabled = page === 0;
  nextBtn.disabled = page + 1 >= totalPages;

}

function renderWorkouts(workouts) {

  workoutList.innerHTML = "";

  workouts.forEach(workout => {

    const li = document.createElement("li");
    li.textContent = workout.workout_date;

    workoutList.appendChild(li);

  });

}

function nextPage() {

  page++;
  loadWorkouts();

}

function prevPage() {

  if (page === 0) return;

  page--;
  loadWorkouts();

}