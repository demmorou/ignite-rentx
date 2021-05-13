import { ConnectionOptions, createConnection } from 'typeorm';

import * as connectionOptions from './ormconfig';

createConnection(connectionOptions as ConnectionOptions);
