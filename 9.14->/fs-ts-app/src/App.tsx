const Header = ({ name }: { name: string }) => {
  return  <h1>{name}</h1>

}
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
  </>)
}
const Total = ( { courseParts }: Parts ) => {
  return (
    <div>
        <p>
        Number of exercises{" "}
        {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>

    </div>
  )
}
const App = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
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
