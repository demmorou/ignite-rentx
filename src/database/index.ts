import { createConnections } from 'typeorm';

createConnections()
  .then((conn) =>
    console.log(conn[0].isConnected && `🌱 ${conn[0].name} Database it's alive`)
  )
  .catch((err) => console.log(err));
