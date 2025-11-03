import { Model } from '../database.js';

export default class Course extends Model {
    static get tableName() {
        return 'mv_courses';
    }

    static get relationMappings() {
        return {
            category: {
                relation: Model.BelongsToOneRelation,
                modelClass: require('./CourseCategory').default,
                join: {
                    from: 'mv_courses.category_id',
                    to: 'mv_courses_categories.id'
                }
            }
        }
    };
}