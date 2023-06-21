import { CalendarTable } from 'components/CalendarTable/CalendarTable';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchTasks } from 'redux/operations';
import { selectTasks } from 'redux/tasks/tasks.selectors';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// import styled from 'styled-components';
export const ChoosedMonth = () => {
    const { currentDate } = useParams();
    const currentYear = currentDate.slice(0, 4);
    const currentMonth = currentDate.slice(5, 7);

    const tasks = useSelector(selectTasks);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchTasks({ year: currentYear, month: currentMonth }));
    }, [currentMonth, currentYear, dispatch]);
    // console.log('currentDate', currentDate);
    // console.log('currentYear', currentYear);
    // console.log('currentMonth', currentMonth);
    // console.log('currentDate', currentDate);

    return (
        <>
            <CalendarTable tasks={tasks} startDay={currentDate} />
        </>
    );
};
