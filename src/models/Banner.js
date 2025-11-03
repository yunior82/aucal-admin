import { Model } from '../database.js';

export default class Banner extends Model {
    static get tableName() {
        return 'mv_banner';
    }
}