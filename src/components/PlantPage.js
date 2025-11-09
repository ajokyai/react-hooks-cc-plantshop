import React, { useState, useEffect } from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  const [plants, setPlants] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Fetch plants from the backend
  useEffect(() => {
    fetch("http://localhost:6001/plants")
      .then((r) => r.json())
      .then((data) => setPlants(data));
  }, []);

  // Handle adding a new plant
  function handleAddPlant(newPlant) {
    setPlants([...plants, newPlant]);
  }

  // Handle toggling sold out
  function handleToggleSoldOut(id) {
    const updatedPlants = plants.map((plant) =>
      plant.id === id ? { ...plant, soldOut: !plant.soldOut } : plant
    );
    setPlants(updatedPlants);
  }

  // Filter plants based on search
  const filteredPlants = plants.filter((plant) =>
    plant.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <main>
      <NewPlantForm onAddPlant={handleAddPlant} />
      <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <PlantList
        plants={filteredPlants}
        onToggleSoldOut={handleToggleSoldOut}
      />
    </main>
  );
}

export default PlantPage;
