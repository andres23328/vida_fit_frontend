import React, { useState } from 'react'
import { BarChart, Bar, LineChart, Line, PieChart, Pie, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

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
  { id: 1, name: 'Chest', value: 20 },
  { id: 2, name: 'Back', value: 20 },
  { id: 3, name: 'Legs', value: 25 },
  { id: 4, name: 'Shoulders', value: 15 },
  { id: 5, name: 'Arms', value: 20 },
]

const initialTrainingTime = [
  { id: 1, day: 'M', hours: 1 },
  { id: 2, day: 'T', hours: 1.5 },
  { id: 3, day: 'W', hours: 1 },
  { id: 4, day: 'T', hours: 2 },
  { id: 5, day: 'F', hours: 1 },
  { id: 6, day: 'S', hours: 1.5 },
]

export default function InteractiveDashboard() {
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

  return (
    <div className="min-h-screen bg-[#38B6FF] text-white">
      <header className="p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">VIDA FIT</h1>
        <nav>
          <ul className="flex space-x-4">
            <li>INICIO</li>
            <li>CALCULADORA</li>
            <li>GRÁFICAS</li>
            <li>NOSOTROS</li>
          </ul>
        </nav>
        <div className="w-8 h-8 bg-white rounded-full"></div>
      </header>

      <main className="p-8">
        <Card className="bg-white text-black">
          <CardHeader>
            <CardTitle>PANEL DE ESTADÍSTICAS</CardTitle>
            <CardDescription>
              <div className="flex justify-between mb-4">
                <p>MES: Julio</p>
                <Select onValueChange={handlePlanChange} value={plan}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Seleccionar plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="surplus">Superávit calórico</SelectItem>
                    <SelectItem value="deficit">Déficit calórico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <StatBox title="Calorías quemadas:" value={caloriesBurned.toString()} />
              <StatBox title="Calorías por quemar:" value={caloriesToBurn.toString()} />
              <StatBox title="IMC:" value="87.5" />
              <StatBox title="IMC deseado:" value="67.4" />
              <StatBox title="Horas en VidaFit:" value="33" />
              <StatBox title="Horas necesarias:" value="42" />
            </div>

            <h2 className="text-2xl font-bold mb-4">GRÁFICAS ESTADÍSTICAS</h2>
            <div className="grid grid-cols-2 gap-4">
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
                <div className="mt-4">
                  <Input
                    type="number"
                    placeholder="Nuevo peso"
                    value={newWeight}
                    onChange={(e) => setNewWeight(e.target.value)}
                    className="mb-2"
                  />
                  <Button onClick={addWeight}>Agregar Peso</Button>
                </div>
                <div className="mt-2">
                  {weightData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-1">
                      <span>{item.week}: {item.weight}kg</span>
                      <Button variant="destructive" size="sm" onClick={() => deleteWeight(item.id)}>Eliminar</Button>
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
                <div className="mt-4">
                  <Input
                    placeholder="Nombre del ejercicio"
                    value={newRecord.name}
                    onChange={(e) => setNewRecord({ ...newRecord, name: e.target.value })}
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    placeholder="Valor"
                    value={newRecord.value}
                    onChange={(e) => setNewRecord({ ...newRecord, value: e.target.value })}
                    className="mb-2"
                  />
                  <Button onClick={addRecord}>Agregar Récord</Button>
                </div>
                <div className="mt-2">
                  {recordsData.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-1">
                      <span>{item.name}: {item.value}</span>
                      <Button variant="destructive" size="sm" onClick={() => deleteRecord(item.id)}>Eliminar</Button>
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
                <div className="mt-4">
                  <Input
                    placeholder="Grupo muscular"
                    value={newDistribution.name}
                    onChange={(e) => setNewDistribution({ ...newDistribution, name: e.target.value })}
                    className="mb-2"
                  />
                  <Input
                    type="number"
                    placeholder="Porcentaje"
                    value={newDistribution.value}
                    onChange={(e) => setNewDistribution({ ...newDistribution, value: e.target.value })}
                    className="mb-2"
                  />
                  <Button onClick={addDistribution}>Agregar Distribución</Button>
                </div>
                <div className="mt-2">
                  {trainingDistribution.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-1">
                      <span>{item.name}: {item.value}%</span>
                      <Button variant="destructive" size="sm" onClick={() => deleteDistribution(item.id)}>Eliminar</Button>
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
                <div className="mt-4">
                  <Select onValueChange={(value) => setNewTrainingTime({ ...newTrainingTime, day: value })}>
                    <SelectTrigger className="mb-2">
                      <SelectValue placeholder="Seleccionar día" />
                    </SelectTrigger>
                    <SelectContent>
                      {['L', 'M', 'X', 'J', 'V', 'S', 'D'].map((day) => (
                        <SelectItem key={day} value={day}>{day}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    type="number"
                    placeholder="Horas"
                    value={newTrainingTime.hours}
                    onChange={(e) => setNewTrainingTime({ ...newTrainingTime, hours: e.target.value })}
                    className="mb-2"
                  />
                  <Button onClick={addTrainingTime}>Agregar Tiempo de Entrenamiento</Button>
                </div>
                <div className="mt-2">
                  {trainingTime.map((item) => (
                    <div key={item.id} className="flex justify-between items-center mb-1">
                      <span>{item.day}: {item.hours} hours</span>
                      <Button variant="destructive" size="sm" onClick={() => deleteTrainingTime(item.id)}>Eliminar</Button>
                    </div>
                  ))}
                </div>
              </ChartBox>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  )
}

function StatBox({ title, value }: { title: string; value: string }) {
  return (
    <div className="bg-[#F0E6EF] p-4 rounded-lg">
      <h3 className="font-bold">{title}</h3>
      <p className="text-xl">{value}</p>
    </div>
  )
}

function ChartBox({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#F0E6EF] p-4 rounded-lg">
      <h3 className="font-bold  mb-2">{title}</h3>
      {children}
    </div>
  )
}