import * as Koa from 'koa';
import * as Router from '@koa/router';
import * as Knex from 'knex';

const app = new Koa();
const router = new Router();

const options: object = {
    client: 'postgres',
    connection: {
    	user: 'postgres',
    	password: 'postgres',
        host: 'postgres',
    }
}
const knex = new (Knex as any)(options);

router.get('/*', async (ctx) => {
    ctx.body = 'Hello World!';
});

knex.schema.createTable('cars', (table: any) => {
    table.increments('id')
    table.string('name')
    table.integer('price')
}).then(() => console.log("table created"))
    .catch((err: any) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });


app.use(router.routes());

app.listen(3000);

console.log('Server running on port 3000');