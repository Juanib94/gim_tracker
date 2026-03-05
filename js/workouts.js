import { supabase } from './supabaseClient.js'

export async function addWorkout(date) {

    const { data, error } = await supabase
        .from('workouts')
        .insert([
            { workout_date: date }
        ])

    if (error) {
        console.error("Error inserting workout:", error)
    } else {
        console.log("Workout inserted:", data)
    }
}