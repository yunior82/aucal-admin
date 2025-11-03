import { Model } from '../database.js';

export default class User extends Model {
    static get tableName() {
        return 'mv_users';
    }
}