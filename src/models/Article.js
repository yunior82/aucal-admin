import { Model } from '../database.js';

export default class Article extends Model {
    static get tableName() {
        return 'mv_articles';
    }

    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./Category').default,
                join: {
                    from: 'mv_articles.category_id',
                    to: 'mv_categories.id'
                }
            }
        }
    };
}