// src/Table.js
import React from 'react';

// src/Table.js
function TableHeader() {
  return (
    <thead>
      <tr>
        <th>Id</th>
        <th>Name</th>
        <th>Job</th>
      </tr>
    </thead>
  );
}

function TableBody({ characterData, removeCharacter }) {
  const rows = characterData.map(({ _id, name, job }) => (
    <tr key={_id}>
      <td>{_id}</td>
      <td>{name}</td>
      <td>{job}</td>
      <td>
        <button type="button" onClick={() => removeCharacter(_id)}>Delete</button>
      </td>
    </tr>
  ));
  return <tbody>{rows}</tbody>;
}
// src/Table.js
function Table({ characterData, removeCharacter }) {
  return (
    <table>
      <TableHeader />
      <TableBody
        characterData={characterData}
        removeCharacter={removeCharacter}
      />
    </table>
  );
}

export default Table;
