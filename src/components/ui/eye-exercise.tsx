import { useState } from 'react';

export default function EyeExercise() {
  // Stan przechowujący aktualny widok (1 = start, 2 = wybór, 3 = ćwiczenie)
  const [currentView, setCurrentView] = useState(1);
  
  // Stan zapamiętujący, które ćwiczenie wybraliśmy
  const [selectedExercise, setSelectedExercise] = useState('');

  // Funkcja obsługująca rozpoczęcie ćwiczenia
  const handleStartExercise = (exerciseName: string) => {
    setSelectedExercise(exerciseName);
    setCurrentView(3);
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      
      {/* WIDOK 1: Przycisk startowy */}
      {currentView === 1 && (
        <div>
          <button onClick={() => setCurrentView(2)}>
            Zrób ćwiczenie!
          </button>
        </div>
      )}

      {/*  WIDOK 2: Wybór ćwiczenia z instrukcjami  */}
      {currentView === 2 && (
        <div>
          <h2>Wybierz ćwiczenie:</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
            
            <button 
              title="Śledź wzrokiem animowaną kuleczkę, która robi ósemki na ekranie."
              onClick={() => handleStartExercise('osemka')}
            >
              Klasyczna Ósemka
            </button>

            <button 
              title="Spójrz w dal i obrysuj wzrokiem kontury drzewa."
              onClick={() => handleStartExercise('drzewo')}
            >
              Ruchy oczu do dali (Drzewo)
            </button>
            
          </div>
          <br />
          <button onClick={() => setCurrentView(1)}>Wróć</button>
        </div>
      )}

      {/*  WIDOK 3: Trwające ćwiczenie z opcją pauzy i zakończenia */}
      {currentView === 3 && (
        <div style={{
          position: 'fixed', 
          top: 0,            
          left: 0,           
          width: '100vw',    
          height: '100vh',   
          backgroundColor: '#1e2024', 
          color: 'white',    
          zIndex: 9999,      
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <h2>Trwa ćwiczenie: {selectedExercise === 'osemka' ? 'Ósemka' : 'Drzewo'}</h2>
          
          
          <div style={{ width: '80%', height: '60%', border: '2px dashed #555', margin: '20px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <p>Tutaj będzie latać kuleczka albo rysować się drzewo.</p>
          </div>

          <div style={{ display: 'flex', gap: '20px' }}>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }}>Pauza</button>
            <button style={{ padding: '10px 20px', cursor: 'pointer' }} onClick={() => setCurrentView(1)}>Zakończ i wyjdź</button>
          </div>
        </div>
      )}

    </div>
  );
}