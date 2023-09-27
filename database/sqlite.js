import { SQLite } from 'expo-sqlite';

const db = SQLite.openDatabase('codigo_azul.db');

export default db;
