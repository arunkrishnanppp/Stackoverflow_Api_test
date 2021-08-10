import React from "react";

const ListItem = ({ link, title }) => {
  return (
    <>
      <tr>
        <td>{link}</td>
        <td>{title}</td>
      </tr>
    </>
  );
};

export default ListItem;
