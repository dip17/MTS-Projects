import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Button, Modal } from "react-bootstrap";
import { translate, t } from "react-multi-lang";
import { connect } from "react-redux";
const localizer = momentLocalizer(moment);

const NewFeedCalendarCard = ({showCalendarModal,setShowCalendarModal}) => {
    const [events, setEvents] = useState([]);
    const [showEventTitleModal, setShowEventTitleModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [selectedTitle, setSelectedTitle] = useState('');

    const handleSelect = ({ start, end }) => {
        setSelectedDate({ start, end });
        setShowEventTitleModal(true);
    };
    const handleEventTitleModalSubmit = () => {
        if (selectedTitle && selectedDate) {
            const newEvent = {
                start: selectedDate.start,
                end: selectedDate.end,
                title: selectedTitle,
            };
            setEvents([...events, newEvent]);
            setShowEventTitleModal(false);
            setSelectedTitle('');
            setSelectedDate(null);
        }
    };

   

    return (
        <div>
            <Modal animation={false} scrollable={true} centered size="lg" show={showCalendarModal} onHide={() =>setShowCalendarModal(false)} >
                <Modal.Header closeButton >
                    <Modal.Title>
                        {t("calendar")}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <Calendar
                        localizer={localizer}
                        defaultDate={new Date()}
                        defaultView="month"
                        events={events}
                        style={{ height: '100vh' }}
                        onSelectSlot={handleSelect}
                        selectable
                        components={{
                            agenda: {
                                event: (event) => (
                                    <div>
                                        <strong>{event.title}</strong>
                                        <div>{`Start: ${moment(event.start).format('LLL')}`}</div>
                                        <div>{`End: ${moment(event.end).format('LLL')}`}</div>
                                    </div>
                                ),
                            },
                        }}
                    />
                </Modal.Body>

            </Modal>



            <Modal

                show={showEventTitleModal}>
                <Modal.Header>
                    <Modal.Title>
                        {t("enter_event_title_for")}
                        {selectedDate && moment(selectedDate.start).format('LL')}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <input
                        type="text"
                        placeholder="Event Title"
                        className="floating-input"
                        value={selectedTitle}
                        onChange={(e) => setSelectedTitle(e.target.value)}
                    />
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className="btn btn-success"
                        onClick={handleEventTitleModalSubmit}>
                        {t("submit")}
                    </Button>
                    <Button
                        className="btn btn-danger"
                        onClick={() => setShowEventTitleModal(false)}>
                        {t("cancel")}
                    </Button>
                </Modal.Footer>
            </Modal>

        </div>
    );
};



  export default translate(NewFeedCalendarCard); 

