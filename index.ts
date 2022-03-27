import express = require('express');
import { calculateBmi } from './bmiCalculator';
const app = express();

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
  
  
const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
