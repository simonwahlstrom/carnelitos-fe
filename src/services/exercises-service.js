export async function handleExercise(id, method, exercise) {
  const data = await fetch(process.env.CARNE_API_URL + '/api/v2/exercises/' + id, {
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(exercise)
  })
  return await data.json()
}
