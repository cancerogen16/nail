import HTTP from '../../utils/HTTP';
import { addRecord, clearRecord } from "./action";

export const fetchRecords = (master_id) => (dispach, getState) => {

    HTTP.get('/api/calendars')
    .then((res) => {
        dispach(clearRecord())
        res.data.data.forEach(record => {
            dispach(addRecord(record));
        })
    })
    .catch(err => { 
        if (err.response) { 
            dispatch(addError({code: status, message: err.response.data.email})) 
        } else if (err.request) { 
            dispatch(addError({code: status, message: 'Не удается соединится с сервером'}))
        } else { 
            dispatch(addError({code: status, message: 'Что-то пошло не так'})) 
        }})

}