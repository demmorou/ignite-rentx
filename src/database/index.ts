import { createConnections } from 'typeorm';

createConnections()
  .then((connections) =>
    connections.forEach((connection) => {
      console.log(
        connection.isConnected && `🌱 ${connection.name} Database it's alive`
      );
    })
  )
  .catch((err) => console.log(err));
