import HTTP from '../../utils/HTTP';
import {addError} from '../error/action';
import {addServicesAll} from './action';

/**
 * Получение всех услуг
 * @returns {function(...[*]=)}
 */
export const fetchServices = () => (dispatch, getState) => {
    HTTP.get('/api/services')
        .then(res => dispatch(addServicesAll(res.data.services)))
        .catch(err => {
            if (err.response) {
                dispatch(addError({code: status, message: err.response.data.message}))
            } else if (err.request) {
                dispatch(addError({code: status, message: 'Не удается соединится с сервером'}))
            } else {
                dispatch(addError({code: status, message: 'Что-то пошло не так'}))
            }
        })
}

/**
 * Получение услуг по id мастера
 * @param master_id
 * @returns {function(...[*]=)}
 */
export const fetchServicesByMasterId = (master_id) => (dispatch, getState) => {
    HTTP.get(`/api/services/${master_id}/masters`)
        .then(res => console.log(res))
        .catch(err => {
            if (err.response) {
                dispatch(addError({code: status, message: err.response.data.email}))
            } else if (err.request) {
                dispatch(addError({code: status, message: 'Не удается соединится с сервером'}))
            } else {
                dispatch(addError({code: status, message: 'Что-то пошло не так'}))
            }
        })
}

/**
 * Получение услуг по id салона
 * @param salon_id
 * @returns {function(...[*]=)}
 */
export const fetchServicesBySalonId = (salon_id) => (dispatch, getState) => {
    HTTP.get(`/api/salons/${salon_id}/services`)
        .then(res => dispatch(addServices(res.data.services)))
        .catch(err => {
            if (err.response) {
                dispatch(addError({code: status, message: err.response.data.message}))
            } else if (err.request) {
                dispatch(addError({code: status, message: 'Не удается соединится с сервером'}))
            } else {
                dispatch(addError({code: status, message: 'Что-то пошло не так'}))
            }
        })
}

/**
 * Получение услуг по id салона
 * @param salon_id
 * @returns {function(...[*]=)}
 */
export const fetchServicesOfSalon = (salon_id) => (dispatch, getState) => {
    HTTP.get(`/api/salons/${salon_id}/services`)
        .then(res => dispatch(addServices(res.data.services)))
        .catch(err => {
            if (err.response) {
                dispatch(addError({code: status, message: err.response.data.message}))
            } else if (err.request) {
                dispatch(addError({code: status, message: 'Не удается соединится с сервером'}))
            } else {
                dispatch(addError({code: status, message: 'Что-то пошло не так'}))
            }
        })

}