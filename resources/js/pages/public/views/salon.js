import {Button, Chip, Grid, List, ListItem, MenuItem, TextField} from '@material-ui/core'
import React from 'react';
import useSalon from '../huks/useSalon';
import priviewMaster from '../../../components/Public/MasterPreview/style';
import MasterPreview from '../../../components/Public/MasterPreview';
import ServicePreview from '../../../components/Public/ServicePreview';
import DiscountPreview from '../../../components/Public/DiscountPreview';
import Salon from '../../../components/Public/Salon';
import {SimpleTabs, TabPanel} from '../../../components/Tabs';
import Modal from '../../../components/Dialogs/Modal';
import ControlledAccordions from '../../../components/Public/ControlledAccordions';
import FormRecord from '../../../components/Dashboard/FormRecord';
import useRecord from '../huks/useRecord';
import styleSalon from '../styles/salon';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRecorClear } from '../../../store/times/thunks';
import date from 'date-and-time';



export default function Page(props) {
    const {
        value,
        salon,
        services,
        masters,
        actions,
        handleChange
    } = useSalon(props);
    const {
        open,
        cretendials,
        times,
        handleClose,
        handleRecord,
        handleEditRecordForm,
    } = useRecord();

    const classes = priviewMaster();
    const classesSalon = styleSalon();
    const dispatch = useDispatch();
    const user = useSelector(state => state.user);
    const handleTime = (time) => {
        
        const record = {
            user_id: user.id,
            service_id: cretendials.service_id,
            master_id: cretendials.master_id,
            start_datetime: date.format(new Date(time.start_datetime), 'YYYY-MM-DD HH') ,
            name: user.name,
            phone: '+79999999999',
            comment: 'sada',
        }
        
        dispatch(fetchRecorClear(time, record))
    }

    return (
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <Salon salon={salon}/>
                <SimpleTabs value={value} handleChange={handleChange}
                            tabs={[
                                {label: 'Услуги', index: 0},
                                {label: 'Мастера', index: 1},
                                {label: 'Акции', index: 2}
                            ]}>
                    <TabPanel value={value} index={0}>
                        {services.map(service => {
                            return <ListItem  className={classes.root} key={service.id} button>
                                    <ControlledAccordions
                                         heading={<ServicePreview  service={service}><Button onClick={(e) => handleRecord(e, '', service.id)}>Записаться</Button></ServicePreview>}
                                         
                                    />
                            </ListItem>
                        })}
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <List>
                            {masters.map(master => {
                                return <ListItem className={classes.root} key={master.id} button>
                                    
                                    <ControlledAccordions 
                                            heading={<MasterPreview master={master}>
                                                        <Button onClick={(e) => handleRecord(e, master.id, '')}>Записаться</Button>
                                                    </MasterPreview>}
                                            content={master.description}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <List>
                            {actions.map(action => {
                                return <ListItem className={classes.root} key={action.id} button>
                                    <ControlledAccordions
                                        heading={<DiscountPreview action={action}/>}
                                    />
                                </ListItem>
                            })}
                        </List>
                    </TabPanel>
                </SimpleTabs>
                <Modal className={classesSalon.modal} open={open} onClose={handleClose} closeButton={'Закрыть'}>
                    <FormRecord className={classesSalon.item} label='Мастер' name="master" value={cretendials.master_id}onChange={(e) =>  handleEditRecordForm(e)} selectes={masters} >
                        {masters.map(master => <MenuItem key={master.id} value={master.id}>
                                {master.name}
                            </MenuItem>
                        )}
                    </FormRecord>
                    <FormRecord className={classesSalon.item} label='Услуга' name='service' value={cretendials.service_id} onChange={(e) =>  handleEditRecordForm(e)}>
                        {services.map(service => <MenuItem key={service.id} value={service.id}>
                                {service.title}
                            </MenuItem> 
                        )}
                    </FormRecord>
                    <TextField
                        onChange={handleEditRecordForm}
                        name="date"
                        id="date"
                        label="Birthday"
                        type="date"
                        defaultValue={cretendials.date}
                        className={classesSalon.item}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />
                    {times.length !== 0
                        ?  <ul className={classesSalon.list}>
                                {times.map(time => <li className={classesSalon.listItem} key={time.id}>
                                <Chip
                                    onClick={() => handleTime(time)}
                                    label={time.start_datetime}
                                    className={time.record_id? '': classesSalon.active}
                                />
                                </li>)}
                            </ul>
                        : (cretendials.master_id == ''
                                    ? <p>Выберите мастера</p>
                                    : <p>Нет записи к этому мастеру на этот день</p>)
                    }
                </Modal>
            </Grid>
        </Grid>)
}