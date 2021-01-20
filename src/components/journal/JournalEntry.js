import React from 'react';
import moment from 'moment';
import { useDispatch } from 'react-redux';
import { activeNote } from '../../actions/notes';

export const JournalEntry = ({id, title, body, date, url}) => {
    //console.log(id, title, body, date, url);
    const dispatch = useDispatch();
    const noteDate = moment(date);
    //console.log(noteDate);

    const hanldeEntryClick = () => {
        dispatch(activeNote(id, {title, body, date, url}));
    };

    return (
        <div 
            className="journal__entry pointer"
            onClick={hanldeEntryClick}
        >
            {
                url &&
                <div 
                    className="journal__entry-picture"
                    style={{
                        backgroundSize: 'cover',
                        backgroundImage: `url(${url})`
                    }}
                ></div>
            }

            <div className="journal__entry-body">
                <p className="journal__entry-title">{title}</p>
                <p className="journal__entry-content">
                    {body}
                </p>
            </div>

            <div className="journal__entry-date-box">
                <span>{noteDate.format('dddd')}</span>
                <h4>{noteDate.format('d')}</h4>
            </div>
        </div>
    );
};
