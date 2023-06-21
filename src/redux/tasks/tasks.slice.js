import { createSlice } from '@reduxjs/toolkit';
import { tasksInitState } from './tasks.init-state';
import { fetchTasks, addTask, delTask, updateTask } from '../operations';
// import { createEntityAdapter } from '@reduxjs/toolkit';

const handlePending = state => {
    state.tasks.isLoading = true;
};

const handleRejected = (state, action) => {
    state.tasks.isLoading = false;
    state.tasks.error = action.payload;
};

const handleFulfilled = (state, action) => {
    state.tasks.isLoading = false;
    state.tasks.error = null;
    state.tasks.items = [...action.payload];
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState: tasksInitState,
    reducers: {},

    extraReducers: builder => {
        builder
            .addCase(fetchTasks.pending, handlePending)
            .addCase(fetchTasks.rejected, handleRejected)
            .addCase(fetchTasks.fulfilled, handleFulfilled)
            .addCase(addTask.pending, handlePending)
            .addCase(addTask.rejected, handleRejected)
            .addCase(addTask.fulfilled, (state, { payload }) => {
                console.log(payload);
                state.tasks.isLoading = false;
                state.tasks.error = null;
                state.tasks.items.push(payload);
            })
            .addCase(updateTask.pending, handlePending)
            .addCase(updateTask.rejected, handleRejected)
            .addCase(updateTask.fulfilled, (state, { payload }) => {
                state.tasks.isLoading = false;
                state.tasks.error = null;
                const index = state.tasks.items.findIndex(
                    task => task._id === payload._id
                );
                if (index !== -1) {
                    state.tasks.items[index] = payload;
                }
            })
            .addCase(delTask.pending, handlePending)
            .addCase(delTask.rejected, handleRejected)
            .addCase(delTask.fulfilled, (state, action) => {
                state.tasks.isLoading = false;
                state.tasks.error = null;
                // console.log('action', action);
                state.tasks.items = state.tasks.items.filter(
                    task => task._id !== action.payload
                );
            });
    },
});

export const taskReducer = taskSlice.reducer;

// const tasksAdapter = createEntityAdapter();

// const tasksSlice = createSlice({
//     name: 'tasks',
//     initialState: tasksInitState,
//     reducers: {},
//     extraReducers: builder => {
//         builder
//             .addCase(fetchTasks.fulfilled, (state, { payload }) => {
//                 tasksAdapter.addMany(state, payload);
//             })
//             .addCase(addTask.fulfilled, (state, { payload }) => {
//                 tasksAdapter.addOne(state, payload);
//             })
//             .addCase(updateTask.fulfilled, (state, { payload }) => {
//                 tasksAdapter.updateOne(state, {
//                     id: payload.id,
//                     changes: payload,
//                 });
//             })
//             .addCase(delTask.fulfilled, (state, { payload }) => {
//                 tasksAdapter.removeOne(state, payload);
//             });
//     },
// });
