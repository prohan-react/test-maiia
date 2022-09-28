import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
import List from '@material-ui/core/List';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { formatDateRange } from 'utils/date';

const getTimeSlotDatacy = (id: string) => `timeslot-${id}`;

const TimeSlots = (props) => {
  const { items } = props;

  return (
    <List className="timeSlots" datacy="timeslot-list">
      {items.map((item) => (
        <Card
          key={item.id}
          datacy={getTimeSlotDatacy(item.id)}
          className="timeSlot__item btn"
        >
          <CardHeader
            avatar={<CalendarTodayIcon />}
            title={
              <Typography datacy={`${getTimeSlotDatacy(item.id)}-range`}>
                {formatDateRange({
                  from: new Date(item.startDate),
                  to: new Date(item.endDate),
                })}
              </Typography>
            }
          />
          <CardContent>
            <pre>
              <code>{JSON.stringify(item, null, 2)}</code>
            </pre>
          </CardContent>
        </Card>
      ))}
    </List>
  );
};

export default TimeSlots;
