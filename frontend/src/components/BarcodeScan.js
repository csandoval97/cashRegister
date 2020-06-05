import React from 'react';

// function BarcodeScan(){
//     return(
//         <form>
//             <label>barcode</label>
//             <input></input>
//         </form>
//     )
// }

// export default BarcodeScan;
const AddComponent = ({onAdd}) => {
    return (
      <div>
        <button onClick={() => {onAdd("item")}}>Add</button>
      </div>
    );
}
   
   class BarcodeScan extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        myObjects: []
      }
    }
   
    handleAdd = (newObject) => {
        this.setState((prevState) => (
          Object.assign(
            {}, 
            this.state, 
            { myObjects: [...prevState.myObjects, newObject] }
          )
        ));
      }
   
    render() {
      return (
        <div>
          <AddComponent onAdd={this.handleAdd} />
          {this.state.myObjects}
        </div>
      )
    }
   }

   export default BarcodeScan