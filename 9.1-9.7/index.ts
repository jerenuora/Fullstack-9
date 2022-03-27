import express = require('express');
import { calculateBmi } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();
app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    
    if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        res.send({
            weight: weight,
            height: height,
            bmi: calculateBmi(Number(height), Number(weight))
        });
    } else {
        res.send({
            error:'malformatted numbers'
        });
    }
  });
  
app.post('/exercise', (req, res) => {
  const { daily_exercises, target } = req.body;

  if ( !daily_exercises || !target ) {
    res.send({ error: "parameters missing"}).status(400);
 }
 if ( !Array.isArray(daily_exercises)|| daily_exercises.some(isNaN) || isNaN(Number(target)) ) {
  res.send({ error: "malformatted parameters"}).status(400);
}

  res.send(calculateExercises(daily_exercises, target));
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
