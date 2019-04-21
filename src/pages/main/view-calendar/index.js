import React, { Component } from 'react';

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import ptBrLocale from '@fullcalendar/core/locales/pt-br';

import '@fullcalendar/core/main.css';
import '@fullcalendar/daygrid/main.css';

import api from '../../../services/api';

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
    events: []
  };

  componentDidMount() {
    const { nutritionistId, patientId } = this.props.match.params;

    api.get(`/calendar/${nutritionistId}/${patientId}`).then(response => {
      const calendarData = response.data;
      const events = [];

      calendarData.days.forEach(day => {
        let start = new Date(day.dt_day);
        start = start.getFullYear() + '-' + ('0' + (start.getMonth() + 1)).slice(-2) + '-' + ('0' + start.getDate()).slice(-2);

        day.meals.forEach((meal, index) => {
          events.push({
            id: meal.id,
            title: meal.ds_meal,
            start,
            borderColor: colors[index].background,
            backgroundColor: colors[index].background,
            textColor: colors[index].text,
            extendedProps: {
              mealItems: meal.components
            }
          });
        });
      });

      this.setState({
        events
      });
    });
  }

  render() {
    return (
      <div id="view-calendar">
        <FullCalendar
          defaultView="dayGridMonth"
          plugins={[dayGridPlugin]}
          locale={ptBrLocale}
          events={this.state.events}
          eventOrder="id" />
      </div>
    );
  }
}
