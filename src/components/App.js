import React, { useState, useEffect } from "react";
import Header from "./Header";
import PlantList from "./PlantList";
import NewPlantForm from "./NewPlantForm";
import Search from "./Search";

function App() {
  const [plants, setPlants] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  const displayedPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <Header />
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      <PlantList plants={displayedPlants} />
    </div>
  );
}

export default App;
