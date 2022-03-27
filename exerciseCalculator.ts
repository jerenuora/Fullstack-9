interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
  }
interface InputVals {
    arrInput: Array<number>;
    targetInput: number;
}
const parseArgs = (args: Array<string>): InputVals => {
    const numberOfArgs = args.length;
    const arr = [];
    let target = 0;
    for (let i = 2; i < numberOfArgs; i++) {
        if (!isNaN(Number(args[i]))) {
            if (i === 2) {
                target = Number(args[i]);
            } else {
                arr.push(Number(args[i]));
            }
        } else {
            throw new Error('Provided values were not numbers!');
        }
    }
    return {
        arrInput: arr,
        targetInput: target
    };
  };
  
const calculateExercises = ( arr: Array<number>, target: number ): Result => {
    const avg = arr.reduce((number, sum) => number + sum, 0)/arr.length;

    const rating = (): number => {
        if (avg > target) {
            return 3;
        } else if (avg > target-1) {
            return 2;
        }
        return 1;
    };
    
    const ratingExplained = (): string => {
        switch (rating()) {
            case (3):
                return "good";
            case (2):
                return "ok";
            case (1):
                return "not good";
            default:
                return "";
        }
    };

    return {
        periodLength: arr.length,
        trainingDays: arr.filter((number) => number !== 0).length,
        success: avg > target,
        rating: rating(),
        ratingDescription: ratingExplained(),
        target: target,
        average: avg
        };
};

try {
    const {arrInput, targetInput} = parseArgs(process.argv);
    console.log(arrInput, targetInput);
    const outputs = calculateExercises(arrInput, targetInput);
    console.log(outputs);
} catch (error: unknown) {
    if (error instanceof Error) {
        console.log('Error' + error.message);
      }
    console.log('Something went wrong');
}