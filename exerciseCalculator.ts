interface Result {
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number
  };
  
const calculateExercises = ( arr: Array<number>, target: number ): Result => {
    const avg = arr.reduce((number, sum) => number + sum, 0)/arr.length;

    const rating = (): number => {
        if (avg > target) {
            return 3;
        } else if (avg > target-1) {
            return 2;
        };
        return 1;
    }
    
    const ratingExplained = (): string => {
        switch (rating()) {
            case (3):
                return "good";
            case (2):
                return "ok";
            case (1):
                return "not good";
        };
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


console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1],2));