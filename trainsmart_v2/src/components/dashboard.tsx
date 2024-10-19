import React, { useState, useEffect } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';









const initialWeightData = [
  { id: 1, week: 'Sem 1', weight: 72 },
  { id: 2, week: 'Sem 2', weight: 72.5 },
  { id: 3, week: 'Sem 3', weight: 73 },
  { id: 4, week: 'Sem 4', weight: 73.5 },
  { id: 5, week: 'Sem 5', weight: 74 },
  { id: 6, week: 'Sem 6', weight: 74.5 },
]

const initialRecordsData = [
  { id: 1, name: 'Press', value: 80 },
  { id: 2, name: 'Squat', value: 70 },
  { id: 3, name: 'DL', value: 85 },
  { id: 4, name: 'OHP', value: 60 },
]

const initialTrainingDistribution = [
  { id: 1, name: 'Pecho', value: 20 },
  { id: 2, name: 'Espalda', value: 20 },
  { id: 3, name: 'Piernas', value: 25 },
  { id: 4, name: 'Hombros', value: 15 },
  { id: 5, name: 'Brazos', value: 20 },
]

const initialTrainingTime = [
  { id: 1, day: 'L', hours: 1 },
  { id: 2, day: 'M', hours: 1.5 },
  { id: 3, day: 'X', hours: 1 },
  { id: 4, day: 'J', hours: 2 },
  { id: 5, day: 'V', hours: 1 },
  { id: 6, day: 'S', hours: 1.5 },
]

export default function Dashboard() {

  const [isAuth, setIsAuthenticated] = useState(false);
const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('googleToken') || localStorage.getItem('token');
      const storedUser = JSON.parse(localStorage.getItem('user') || 'null');
      const storedEmail = localStorage.getItem('email');

      console.log('Token:', token);
      console.log('Stored User:', storedUser);
      console.log('Stored Email:', storedEmail);

      // Establecer el correo si existe en 'user' o en 'email'
      const email = storedUser?.email || storedEmail;

      if (token || email) {
          setIsAuthenticated(true);
      } else {
          setIsAuthenticated(false);
          console.log('No autenticado, redirigiendo a login');
          navigate('/login');
      }
  }, [navigate]);











  const [weightData, setWeightData] = useState(initialWeightData)
  const [recordsData, setRecordsData] = useState(initialRecordsData)
  const [trainingDistribution, setTrainingDistribution] = useState(initialTrainingDistribution)
  const [trainingTime, setTrainingTime] = useState(initialTrainingTime)

  const [newWeight, setNewWeight] = useState('')
  const [newRecord, setNewRecord] = useState({ name: '', value: '' })
  const [newDistribution, setNewDistribution] = useState({ name: '', value: '' })
  const [newTrainingTime, setNewTrainingTime] = useState({ day: '', hours: '' })

  const [plan, setPlan] = useState('surplus')
  const [caloriesBurned, setCaloriesBurned] = useState(947)
  const [caloriesToBurn, setCaloriesToBurn] = useState(1900)

  const addWeight = () => {
    if (newWeight) {
      const newWeek = `Sem ${weightData.length + 1}`
      setWeightData([...weightData, { id: Date.now(), week: newWeek, weight: parseFloat(newWeight) }])
      setNewWeight('')
    }
  }

  const addRecord = () => {
    if (newRecord.name && newRecord.value) {
      setRecordsData([...recordsData, { id: Date.now(), ...newRecord, value: parseFloat(newRecord.value) }])
      setNewRecord({ name: '', value: '' })
    }
  }

  const addDistribution = () => {
    if (newDistribution.name && newDistribution.value) {
      setTrainingDistribution([...trainingDistribution, { id: Date.now(), ...newDistribution, value: parseFloat(newDistribution.value) }])
      setNewDistribution({ name: '', value: '' })
    }
  }

  const addTrainingTime = () => {
    if (newTrainingTime.day && newTrainingTime.hours) {
      setTrainingTime([...trainingTime, { id: Date.now(), ...newTrainingTime, hours: parseFloat(newTrainingTime.hours) }])
      setNewTrainingTime({ day: '', hours: '' })
    }
  }

  const deleteWeight = (id: number) => {
    setWeightData(weightData.filter(item => item.id !== id))
  }

  const deleteRecord = (id: number) => {
    setRecordsData(recordsData.filter(item => item.id !== id))
  }

  const deleteDistribution = (id: number) => {
    setTrainingDistribution(trainingDistribution.filter(item => item.id !== id))
  }

  const deleteTrainingTime = (id: number) => {
    setTrainingTime(trainingTime.filter(item => item.id !== id))
  }

  const handlePlanChange = (newPlan: string) => {
    setPlan(newPlan)
    if (newPlan === 'surplus') {
      setCaloriesToBurn(1900)
    } else {
      setCaloriesToBurn(2100)
    }
  }




  const [userData, setUserData] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const storedEmail = localStorage.getItem('email');
      if (!storedEmail) {
        setError('No hay correo almacenado');
        return;
      }

      try {
        const response = await axios.get(`http://localhost:5000/api/user?correo=${storedEmail}`);
        setUserData(response.data);
      } catch (err) {
        setError(err.response ? err.response.data.message : 'Error al obtener los datos');
      }
    };

    fetchData();
  }, []);





  








  if (!isAuth) return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#25d162', color: 'white', fontFamily: 'Arial, sans-serif' }}>
  {userData ? (
    <main style={{ padding: '2rem' }}>
      <div style={{ backgroundColor: 'white', color: 'black', borderRadius: '0.5rem', padding: '1rem' }}>
        <div style={{ marginBottom: '1rem' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>PANEL DE ESTADÍSTICAS</h2>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <p>MES: Julio</p>
            <select value={plan} onChange={(e) => handlePlanChange(e.target.value)}>
              <option value="surplus">Superávit calórico</option>
              <option value="deficit">Déficit calórico</option>
            </select>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem', marginBottom: '2rem' }}>
          <StatBox title="Calorías quemadas:" value={caloriesBurned.toString()} />
          <StatBox title="Calorías por quemar:" value={caloriesToBurn.toString()} />
          <StatBox title="IMC:" value="87.5" />
          <StatBox title="IMC deseado:" value="67.4" />
          <StatBox title="Horas en VidaFit:" value="33" />
          <StatBox title="Horas necesarias:" value="42" />
          <StatBox title="Nombre:" value={userData.nombre} />
          <StatBox title="Apellido:" value={userData.apellido} />
        </div>


          <h2 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem' }}>GRÁFICAS ESTADÍSTICAS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
            <ChartBox title="Progreso de Peso">
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={weightData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                  <Tooltip />
                  <Line type="monotone" dataKey="weight" stroke="#8884d8" />
                </LineChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  type="number"
                  placeholder="Nuevo peso"
                  value={newWeight}
                  onChange={(e) => setNewWeight(e.target.value)}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addWeight}>Agregar Peso</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {weightData.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.week}: {item.weight}kg</span>
                    <button onClick={() => deleteWeight(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Récords Personales">
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={recordsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="value" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  placeholder="Nombre del ejercicio"
                  value={newRecord.name}
                  onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <input
                  type="number"
                  placeholder="Valor"
                  value={newRecord.value}
                  onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addRecord}>Agregar Récord</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {recordsData.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.name}: {item.value}</span>
                    <button onClick={() => deleteRecord(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Distribución de Entrenamiento">
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie data={trainingDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <input
                  placeholder="Grupo muscular"
                  value={newDistribution.name}
                  onChange={(e) => setNewDistribution({ ...newDistribution, name: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <input
                  type="number"
                  placeholder="Porcentaje"
                  value={newDistribution.value}
                  onChange={(e) => setNewDistribution({ ...newDistribution, value: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addDistribution}>Agregar Distribución</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {trainingDistribution.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.25rem' }}>
                    <span>{item.name}: {item.value}%</span>
                    <button onClick={() => deleteDistribution(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
            <ChartBox title="Tiempo de Entrenamiento">
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={trainingTime}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="hours" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
              </ResponsiveContainer>
              <div style={{ marginTop: '1rem' }}>
                <select
                  value={newTrainingTime.day}
                  onChange={(e) => setNewTrainingTime({ ...newTrainingTime, day: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                >
                  <option value="">Seleccionar día</option>
                  {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Horas"
                  value={newTrainingTime.hours}
                  onChange={(e) => setNewTrainingTime({ ...newTrainingTime, hours: e.target.value })}
                  style={{ marginRight: '0.5rem' }}
                />
                <button onClick={addTrainingTime}>Agregar Tiempo de Entrenamiento</button>
              </div>
              <div style={{ marginTop: '0.5rem', maxHeight: '300px', overflowY: 'auto' }}>
                {trainingTime.map((item) => (
                  <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center',   marginBottom: '0.25rem' }}>
                    <span>{item.day}: {item.hours} horas</span>
                    <button onClick={() => deleteTrainingTime(item.id)}>Eliminar</button>
                  </div>
                ))}
              </div>
            </ChartBox>
          </div>
          </div>
    </main>
  ) : (
    <p>Cargando datos del usuario...</p>
  )}
</div>
  )
}

function StatBox({ title, value }: { title: string; value: string }) {
  return (
    <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem' }}>
      <h3 style={{ margin: 0, fontSize: '0.9rem' }}>{title}</h3>
      <p style={{ margin: 0, fontSize: '1.25rem', fontWeight: 'bold' }}>{value}</p>
    </div>
  )
}

function ChartBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ backgroundColor: '#F0E6EF', padding: '1rem', borderRadius: '0.5rem' }}>
      <h3 style={{ margin: '0 0 1rem 0', fontSize: '1rem' }}>{title}</h3>
      {children}
    </div>
  )
}

