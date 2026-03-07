import { supabase } from './supabaseClient.js';

console.log("workouts.js loaded");

const addWorkoutBtn = document.getElementById("add-workout-btn");
const workoutList = document.getElementById("workout-list");

addWorkoutBtn.addEventListener("click", addWorkout);

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

  const { data, error } = await supabase
    .from("workouts")
    .select("*")
    .eq("user_id", user.id)
    .order("workout_date", { ascending: false });

  if (error) {
    console.error(error);
    return;
  }

  renderWorkouts(data);
}

function renderWorkouts(workouts) {

  workoutList.innerHTML = "";

  workouts.forEach(workout => {

    const li = document.createElement("li");
    li.textContent = workout.workout_date;

    workoutList.appendChild(li);

  });

}