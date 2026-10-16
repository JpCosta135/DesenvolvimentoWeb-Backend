class Database {

    constructor() {
        this.tasks = [];
    }

    insert(newTask) {
        this.tasks.push(newTask);
    }

    update(id, {name, done}) {
        const index = this.tasks.findIndex(t => t.id === id);
        this.tasks[index] = {...this.tasks[index], name, done};
    }

    delete(id) {
        const index = this.tasks.findIndex(t => t.id === id);
        this.tasks.splice(index, 1);
    }

    getById(id) {
        return this.tasks.find(t => t.id === id);
    }

    getAll(){
        return this.tasks;
    }

}

export default Database;