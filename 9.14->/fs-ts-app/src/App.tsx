// new types
interface CoursePartBase {
  name: string;
  exerciseCount: number;
  type: string;
}
interface CourseDescriptionPart extends CoursePartBase {
  description: string;
}
interface CourseNormalPart extends CourseDescriptionPart {
  type: "normal";
}
interface CourseProjectPart extends CoursePartBase {
  type: "groupProject";
  groupProjectCount: number;
}

interface CourseSubmissionPart extends CourseDescriptionPart {
  type: "submission";
  exerciseSubmissionLink: string;
}

type CoursePart = CourseNormalPart | CourseProjectPart | CourseSubmissionPart;

const Header = ({ name }: { name: string }) => {
  return  <h1>{name}</h1>

};

interface Parts {
  courseParts: {
    name: string;
    exerciseCount: number;
  }[];
}

const Content = ( { courseParts }: Parts ) => {
  return ( 
  <>
  {courseParts.map(part => 
    <div key={part.name}>
      <p>
      {part.name} {part.exerciseCount}
      </p>
    </div>)}
  </>);
};
const Total = ( { courseParts }: Parts ) => {
  return (
    <div>
        <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>

    </div>
  )
};
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is the leisured course part",
      type: "normal"
    },
    {
      name: "Advanced",
      exerciseCount: 7,
      description: "This is the harded course part",
      type: "normal"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3,
      type: "groupProject"
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev",
      type: "submission"
    }
  ];
  
  return (
    <div>
      <Header name={courseName}/>
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

export default App;
