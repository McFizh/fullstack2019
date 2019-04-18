import React from 'react';

export const NewEntry = ({newName, newNameChange, newNum, newNumChange, addNewClick }) => {
  return(
    <form>
    <h3>Lisää uusi:</h3>
    <div>
      nimi: <input value={newName} onChange={newNameChange}/><br/>
      numero: <input value={newNum} onChange={newNumChange}/>
    </div>
    <div>
      <button type="submit" onClick={addNewClick}>lisää</button>
    </div>
  </form>
);
};