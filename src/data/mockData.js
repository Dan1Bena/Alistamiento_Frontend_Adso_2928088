// src/data/mockData.js

export const FASES = ["Análisis", "Planeación", "Ejecución", "Evaluación"];

export const raps = [
  { id: 1, codigo: "RAP-001", fase: "Análisis", instructor_id: 1 },
  { id: 2, codigo: "RAP-002", fase: "Planeación", instructor_id: 2 },
  { id: 3, codigo: "RAP-003", fase: "Ejecución", instructor_id: 3 },
];

export const instructores = [
  { id: 1, nombre: "Laura Gómez" },
  { id: 2, nombre: "Carlos Ruiz" },
  { id: 3, nombre: "María Torres" },
];

export const mockProgramas = [
  {
    id: 1,
    nombre: "Análisis y Desarrollo de Software",
    codigo: "ADSO-2281067",
    fichasAsociadas: 5,
  },
  {
    id: 2,
    nombre: "Gestión de Proyectos Agroindustriales",
    codigo: "AGRO-2194560",
    fichasAsociadas: 3,
  },
  {
    id: 3,
    nombre: "Mecatrónica Industrial",
    codigo: "MECA-2231099",
    fichasAsociadas: 4,
  },
];
