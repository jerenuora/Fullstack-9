interface inputNumbers {
    height: number;
    weight: number;
}
const parseInputs = (args: Array<string>): inputNumbers => {

    if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
        return {
          height: Number(args[2]),
          weight: Number(args[3])
        };
      } else {
        throw new Error('Provided values were not numbers!');
      };
    };
    
const calculateBmi = (height: number, weight: number): string => {
    const BMI = weight/((height/100)**2);
    if (BMI < 16.0) {
        return "Underweight (Severe thinness)";
    } else if (BMI < 17.0) {
        return "Underweight (Moderate thinness) ";
    } else if (BMI < 18.5) {
        return "Underweight (Mild thinness) ";
    } else if (BMI < 25.0) {
        return "Normal range ";
    } else if (BMI < 30.0) {
        return "Overweight (Pre-obese) ";
    } else if (BMI < 35.0) {
        return "Obese (Class I) ";
    } else if (BMI < 40.0) {
        return "Obese (Class II) ";
    } else {
        return "Obese (Class III) ";
    };
};

try {
    const { height, weight } = parseInputs(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error' + error.message)
      }
    console.log('Something went wrong')
};