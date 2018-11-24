import { connect } from 'react-redux';
import * as redux from 'redux';
import { ValuesCommand, ValuesCommands } from 'src/core/actions/ValuesSaga';
import * as state from 'src/core/reducers/index';

export type AttributeProps = {} & {
}
  
export type StateProps = {} & {
    values: string[]
}
  
export type ConnectedDispatch = {} & {
    getValues?:() => void
}

const mapStateToProps = (state1: state.All, ownProps: AttributeProps): StateProps => {
    return {
        values: state1.values
    } }

const mapDispatchToProps = (dispatch: redux.Dispatch<ValuesCommand>): ConnectedDispatch => {
    return {
        getValues: () => dispatch(ValuesCommands.getValues())
    }
}    

export const connectContainer = 
    connect<{}, {}, AttributeProps>(mapStateToProps, mapDispatchToProps)
  
