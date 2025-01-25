import { BaseRepository } from "../utils/BaseRepository";

const todoRepository = new BaseRepository('http://localhost:3030/todos');

export default todoRepository;