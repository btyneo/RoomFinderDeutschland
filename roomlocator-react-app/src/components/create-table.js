import React from 'react';
import { useTable } from 'react-table';


const ListingsTable = ({data}) => {
    //defining columns first
    const columns = React.useMemo( 
   () => [ 
    {Header: 'Poster Name' , accessor: 'apartment_poster'},
    {Header: 'Apartment Name' , accessor: 'apartment_name'},
    {Header: 'Address' , accessor: 'address'},
    {Header: 'Free From' , accessor: 'free_from'},
    {Header: 'Room Size' , accessor: 'room_size'},
    {Header: 'Rent' , accessor: 'apartment_rent'},
    {Header: 'Other Details' , accessor: 'other_details'},
    { Header: 'Listing URL',
        accessor: 'listing_url',
        Cell: ({ value }) => (
          <a href={value} target="_blank" rel="noopener noreferrer" style={{ color: '#1E90FF' }}>
            {value}
          </a>
        )
      },

   ],
   []
);
   

// Create the table instance
const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({ columns, data });

return (
  <table {...getTableProps()} style={{ width: '80%', borderCollapse: 'collapse' }}>
    <thead>
      {headerGroups.map(headerGroup => (
        <tr {...headerGroup.getHeaderGroupProps()}>
          {headerGroup.headers.map(column => (
            <th {...column.getHeaderProps()} style={{ border: '1px solid black', padding: '10px' }}>
              {column.render('Header')}
            </th>
          ))}
        </tr>
      ))}
    </thead>
    <tbody {...getTableBodyProps()}>
      {rows.map(row => {
        prepareRow(row);
        return (
          <tr {...row.getRowProps()}>
            {row.cells.map(cell => (
              <td {...cell.getCellProps()} style={{ border: '1px solid black', padding: '10px' }}>
                {cell.render('Cell')}
              </td>
            ))}
          </tr>
        );
      })}
    </tbody>
  </table>
);
};

export default ListingsTable;





// const apartment_rent = parseInt(ListingInfo.apartment_rent);
//  const address = ListingInfo.address;
//  const apartment_name = ListingInfo.apartment_name;
//  const apartment_poster = ListingInfo.apartment_poster;
//  const free_from = ListingInfo.free_from;
//  const listing_url = ListingInfo.listing_url;
//  const other_details = ListingInfo.other_details;
//  const room_size = ListingInfo.room_size;
//  let rent = apartment_rent
//  console.log(apartment_name, apartment_poster, apartment_rent, city)