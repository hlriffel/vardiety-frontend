import React, { Component } from 'react';

import { CalendarDay } from './calendar-day';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import api from '../../../services/api';

import { Loader } from '../../../components/loader';

const colors = [
  { background: '#ffca28', text: '#fff8e1' },
  { background: '#81c784', text: '#e8f5e9' },
  { background: '#e64a19', text: '#fbe9e7' },
  { background: '#03a9f4', text: '#e1f5fe' },
  { background: '#f9a825', text: '#fffde7' },
  { background: '#795548', text: '#ffffff' }
];

export default class ViewCalendar extends Component {
  state = {
    events: [],
    calendarDays: [],
    toCalendarDay: {
      show: false,
      day: {
        date: null,
        meals: []
      }
    },
    loaderVisible: false
  };

  calendarOptions = {
    customButtons: {
      clearCalendar: {
        text: 'Limpar calendário',
        click: () => {
          this.handleCalendarClear();
        }
      }
    },
    header: {
      left: 'title',
      right: 'clearCalendar prev today next'
    },
    defaultView: 'dayGridMonth',
    plugins: [ dayGridPlugin, interactionPlugin ],
    locale: ptBrLocale,
    eventOrder: 'order'
  };

  loadEvents = () => {
    this.setState({
      loaderVisible: true
    }, () => {
      const { nutritionistId, patientId } = this.props.match.params;
  
      api.get(`/calendar/${nutritionistId}/${patientId}`).then(response => {
        const calendarData = response.data;
        const events = [];
  
        calendarData && calendarData.days.forEach(day => {
          day.meals.forEach((meal, index) => {
            events.push({
              id: meal.id,
              title: meal.ds_meal,
              start: this.dateToSimpleISO(new Date(day.dt_day)),
              borderColor: colors[index].background,
              backgroundColor: colors[index].background,
              textColor: colors[index].text,
              extendedProps: {
                mealItems: meal.components
              },
              order: index
            });
          });
        });
  
        this.setState({
          events,
          calendarDays: calendarData.days || [],
          loaderVisible: false
        });
      });
    });
  }

  componentDidMount() {
    this.loadEvents();
  }

  dateToSimpleISO = date => {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
  }

  handleCalendarClear = () => {
    const { nutritionistId, patientId } = this.props.match.params;

    this.setState({
      loaderVisible: true
    }, () => {
      api.delete(`/calendar/${nutritionistId}/${patientId}`).then(() => {
        this.loadEvents();

        this.setState({
          loaderVisible: false
        });
      });
    });
  }

  handleDateClick = event => {
    const clickedDate = event.dateStr;
    const calendarDay = this.state.calendarDays.find(day => {
      return this.dateToSimpleISO(new Date(day.dt_day)) === clickedDate; 
    });

    if (calendarDay) {
      const meals = calendarDay.meals.map(meal => {
        return {
          id: meal.id,
          name: meal.ds_meal,
          items: meal.components.map(item => {
            return {
              id: item.component.id,
              description: item.component.nm_component,
              amount: item.qt_grams.toFixed(0)
            }
          })
        }
      });

      this.setState({
        toCalendarDay: {
          show: true,
          day: {
            date: clickedDate,
            meals
          }
        }
      });
    }
  }

  handleCalendarDayClose = () => {
    this.setState({
      toCalendarDay: {
        show: false,
        day: {
          date: null,
          meals: []
        }
      }
    });
  }

  render() {
    return (
      <>
        <div id="view-calendar">
          <FullCalendar
            {...this.calendarOptions}
            events={this.state.events}
            dateClick={this.handleDateClick} />

          { this.state.toCalendarDay.show &&
            <CalendarDay
              show={this.state.toCalendarDay.show}
              onClose={this.handleCalendarDayClose}
              title={this.state.toCalendarDay.day.date}
              meals={this.state.toCalendarDay.day.meals} />}
        </div>

        { this.state.loaderVisible && <Loader /> }
      </>
    );
  }
}
