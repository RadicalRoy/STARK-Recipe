import Dexie from 'dexie'

export function reduxie({ getState }) {
    return (next) =>
        (action) => {

            // load db
            const db = new Dexie('Mikeys Dexie');
            db.version(1).stores({ todos: '++id' });


            next(action);

            // cache state to idb
            const state = getState();
            db.table('todos')
                .add({ ...state });
        };
};

export function getStateFromCache() {
    return db.todos.toCollection().last((rec) => {
        console.log(rec)
        return rec;
    })
}
