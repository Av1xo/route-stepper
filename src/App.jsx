import {
  BrowserRouter as Router, 
  Routes, 
  Route, 
  useNavigate, 
  useLocation
} from "react-router-dom"

import './App.css'
import fishData from './fishes'

//===============================================
const steps = [
  {
    path:      "/", 
    name:      "Поверхня", 
    level:     0,
  },
  {
    path:      "/1", 
    name:      "0m-3m",
    level:     1,
  },
  {
    path:      "/2", 
    name:      "3m-10m",
    level:     2,
  },
  {
    path:      "/3", 
    name:      "10m-15m",
    level:     3,
  },
  {
    path:      "/4",
    level:     4,
    name:      "15m and deeper",
  },
]

const Stepper = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const currentIndex = steps.findIndex(
    step => step.path === location.pathname
  );

  const isCanDeeper = () => currentIndex < steps.length - 1;
  const isCanUpper = () => currentIndex > 0;

  const handleToDive = () => {
    if (isCanDeeper()) {
      navigate(steps[currentIndex + 1].path);
    }
  };

  const handleToSurface = () => {
    if (isCanUpper()) {
      navigate(steps[currentIndex - 1].path);
    }
  };

  return (
    <div className="container">
      <h1>{steps[currentIndex]?.name || "Рибалку за текстурами не продумав"}</h1>
      <div className="card-field">
        <Level level={steps[currentIndex]?.level} />
      </div>
      <div className="buttonBlock">
        {isCanUpper() && (
          <button onClick={handleToSurface}>Вище!</button>
        )}
        {isCanDeeper() && (
          <button onClick={handleToDive}>Пірнаємо!</button>
        )}
      </div>
    </div>
  );
};


const Level = ({ level }) => { 
  if (level === 0) {
    return <div>Тут є жабки, лихі створіння</div>
  } else {
    return (
      <div className="level">
        {
          fishData[level]?.map((fish, index) => (
            <div className="card" key={index}>
              <h3>{fish.name}</h3>
              <p><strong>Наживка:</strong> {fish.bait.join(", ")}</p>
              <p><strong>Снасті:</strong> {fish.gear.join(", ")}</p>
            </div>
          ))}
      </div>
    );
  }
}


function App() {
  return (
    <>
    <Router>
      <Routes>
      <Route path="/*" element={<Stepper />} />
      </Routes>
    </Router>
    </>
  )
}

export default App
