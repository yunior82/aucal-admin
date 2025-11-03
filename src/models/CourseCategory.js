import { Model } from '../database.js';

export default class Article extends Model {
    static get tableName() {
        return 'mv_courses_categories';
    }
}