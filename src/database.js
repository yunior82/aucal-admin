import knex from 'knex';
import { Model as AbstractModel, snakeCaseMappers } from 'objection';

const registerService = (name, fn) => {
    if (process.env.NODE_ENV === 'development') {
        if (!(name in global)) {
            global[name] = fn();
        }
        return global[name];
    }
    return fn();
};

export const db = registerService('db', () => knex({
    client: 'mysql2',
    connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_DATABASE,
    }
}));

if (process.env.NODE_ENV === 'development') {
    db.on('query', (data) => {
        console.log(data);
    })
}

AbstractModel.knex(db);

export class Model extends AbstractModel {
    static get columnNameMappers() {
        return snakeCaseMappers();
    }
}