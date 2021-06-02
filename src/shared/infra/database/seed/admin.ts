import { hash } from 'bcrypt';
import { v4 as uuid } from 'uuid';

import databaseConnection from '~shared/infra/database';

async function create() {
  const connection = await (await databaseConnection()).find(
    ({ name }) => name === 'default'
  );

  const password = await hash('admin', 10);
  const id = uuid();

  await connection.query(
    `INSERT INTO users (id, created_at, updated_at, deleted_at, name, email, password, driver_license, is_admin) VALUES ('${id}', default, default, default, 'Admin', 'admin@rentx.com.br', '${password}', '----', true)`
  );

  await connection.close();
}

create().then(() => console.log('🌱 Seed Admin has been executed'));
