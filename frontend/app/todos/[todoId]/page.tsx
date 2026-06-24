import { getTodo } from "../../actions"
import EditTodoForm from "./EditTodoForm"

export default async function EditTodoPage(props: { params: Promise<{ todoId: string }> }) {
    const params = await props.params;
    const todo = await getTodo(params.todoId);
    
    return <EditTodoForm todo={todo} />
}
