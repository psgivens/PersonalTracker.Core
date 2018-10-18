import { connect } from 'react-redux';
import * as redux from 'redux';
import { PomodoroCommand, PomodoroCommands } from 'src/core/actions/PomodoroSaga';
import { CrudlDomainValues } from 'src/core/data/CrudlDomains';
import { PomodoroIdb } from 'src/core/data/PomodoroModels';
import * as state from 'src/core/reducers/index';
import { createCrudlDomainSagaCommands, CrudlSagaCommand } from 'src/jscommon/actions/CrudlSaga';
import { CrudlEntity } from 'src/jscommon/data/CrudlDomainCommands';
import { CrudlState } from 'src/jscommon/reducers/CrudlReducers';

export type AttributeProps = {} & {
    name: string
}
  
export type StateProps<T extends CrudlEntity> = {} & {
    items: T[]
    item: T | void
}
  
export type ConnectedDispatch<T extends CrudlEntity> = {} & {
    selectItem?: (item: T) => void
    addItem?: (item: T) => void
    startPomodoro?: (item:PomodoroIdb) => void
    stopPomodoro?: (item:PomodoroIdb) => void
    deleteItem?: (id: number) => void
    loadItems?: () => void
}

export type SelectSubState = (s:state.All)=>CrudlState
export const connectContainer = <T extends CrudlEntity, U>(domain:CrudlDomainValues, component: any, select:SelectSubState) => {

    const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps <T> => {
        const ios = select(state1)        
        return {
            item: ios.selectedItem as T,
            items: ios.items as T[]
        } }
    
    const mapDispatchToProps = (dispatch: redux.Dispatch<CrudlSagaCommand | PomodoroCommand>): ConnectedDispatch<T> => {
        const commands = createCrudlDomainSagaCommands(domain)
        return {
            addItem: (item:T) => dispatch(commands.addItem(item)),
            deleteItem: (id: number) => dispatch(commands.deleteItem(id)),
            loadItems: () => dispatch(commands.loadItems()),
            selectItem: (item:T) => dispatch(commands.selectItem(item)),
            startPomodoro: (item:PomodoroIdb) => dispatch(PomodoroCommands.start(item)),
            stopPomodoro: (item:PomodoroIdb) => dispatch(PomodoroCommands.stop(item))
        }
    }    

    return connect<{}, {}, AttributeProps>( 
        (s: state.All,o:AttributeProps) => mapStateToProps(s,o), 
        (dispatch: redux.Dispatch<CrudlSagaCommand>) => mapDispatchToProps(dispatch)) 
        (component)
} 

