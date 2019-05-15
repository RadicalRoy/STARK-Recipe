import Dexie from 'dexie'

export default function createLogger({ getState }) {
    return (next) =>
        (action) => {
            const db = new Dexie('Mikeys Dexie');
            const prevState = getState();
            db.version(1).stores({ todos: '++id' });
            db.table('todos')
                .add({
                    ...prevState
                });
            // getTable(db);
            next(action);
        };
};

function getTable(db) {
    return db.todos.toCollection().last((rec) => {
        console.log(rec)
        return rec;
    })
}