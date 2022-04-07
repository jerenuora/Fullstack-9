const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
  
};

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
  courseParts: CoursePart[];
}

const Part = (  {part}: {part: CoursePart} ) => {
  switch (part.type) {
    case "normal":
      return (
        <div key={part.name}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            <i>{part.description}</i>
          </p>
        </div>
      )
      case "groupProject":
        return (
          <div key={part.name}>
          <p>
            <b>
              {part.name} {part.exerciseCount}
            </b>
            <br />
            project exercises count {part.groupProjectCount}
          </p>
        </div>
      )
        case "submission":
          return (
            <div key={part.name}>
            <p>
              <b>
                {part.name} {part.exerciseCount}
              </b>
              <br />
              <i>{part.description}</i>
              <br />
              <a href={part.exerciseSubmissionLink}>
                {part.exerciseSubmissionLink}
              </a>
            </p>
          </div>
        )
      
    default:
      return assertNever(part)
}};

const Content = ( { courseParts }: Parts ) => {
  console.log(courseParts)
  return ( 
  <>
    {courseParts.map(part => 
        <div key={part.name}>
        <Part part={part} />
      </div>
      
  )}
  </>)
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
