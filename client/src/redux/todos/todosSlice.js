import { createSlice, nanoid } from "@reduxjs/toolkit";

export const todosSlice = createSlice({
  name: "todos",
  initialState: {
    items: [
      {
        id: "1",
        title: "Learn react",
        completed: false, // Başlangıç değeri boolean olarak ayarlandı
      },
      {
        id: "2",
        title: "Read a book",
        completed: false,
      },
    ],
    activeFilter: "all",
  },
  reducers: {
    addTodo: {
      reducer: (state, action) => {
        state.items.push(action.payload);
      },
      prepare: ({ title }) => {
        return {
          payload: {
            id: nanoid(),
            completed: false,
            title,
          },
        };
      },
    },
    toggle: (state, action) => {
      const { id } = action.payload;
      const item = state.items.find((item) => item.id === id);
      item.completed = !item.completed; // Boolean değeri tersine çevir
    },
    destroy: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
    },
    changeActiveFilter: (state, action) => {
      state.activeFilter = action.payload;
    },
    clearCompleted: (state) => {
      state.items = state.items.filter((item) => !item.completed);
    },
  },
});

export const selectTodos = (state) => state.todos.items; // Tek bir yerden itemleriı listelemek için
export const selectFilteredTodos = (state) => {
  // Filtreleme metodu
  if (state.todos.activeFilter === "all") {
    return state.todos.items;
  }
  return state.todos.items.filter((todo) =>
    state.todos.activeFilter === "active" ? !todo.completed : todo.completed
  );
};
export const ActiveFilter = (state) => state.todos.activeFilter;
export default todosSlice.reducer;
export const { addTodo, toggle, destroy, changeActiveFilter, clearCompleted } =
  todosSlice.actions;
