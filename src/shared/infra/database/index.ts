import { Connection, createConnections } from 'typeorm';

export default async function connection(): Promise<Connection[]> {
  const connections = await createConnections();

  connections.forEach((connection) => {
    console.log(
      connection.isConnected && `🌱 ${connection.name} Database it's alive`
    );
  });

  return connections;
}
