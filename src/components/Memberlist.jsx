import React from "react";

export default function Memberlist(props) {

const shortenAddress = (str) => {
    return str.substring(0, 6) + "..." + str.substring(str.length - 4);
    }; // A fancy function to shorten someones wallet address
    
  return (
    <div>
      <h2>Member List</h2>
      <table className="card">
        <thead>
          <tr>
            <th>Address</th>
            <th>Token Amount</th>
          </tr>
        </thead>
        <tbody>
          {props.memberList.map((member) => {
            return (
              <tr key={member.address}>
                <td>{shortenAddress(member.address)}</td>
                <td>{member.tokenAmount}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
