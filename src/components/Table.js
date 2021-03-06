import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useExpanded, useGroupBy, useSortBy, useTable } from 'react-table';
import { COLUMNS } from './columns';
import './Table.css';


const Table = () => {
    const [data, setData] = useState([]);

    const loadUsers = async () => {
        const allData = await axios.get("https://s3-ap-southeast-1.amazonaws.com/he-public-data/reciped9d7b8c.json");
        setData(allData.data)
        //console.table(allData.data)
    }
    useEffect(() => {
        loadUsers()
    }, [])


    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({
        columns: COLUMNS,
        data: data,


    },
        useGroupBy, useSortBy, useExpanded);
    return (
        <div className='container'>
            <table {...getTableProps()}>
                <thead>
                    {
                        headerGroups.map((headerGroup) => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {
                                    headerGroup.headers.map(column => (
                                        <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                            {column.canGroupBy && column.id === 'category' ? (
                                                <span {...column.getGroupByToggleProps()}>
                                                    {' '}
                                                    {column.isGrouped ? '+ ' : '- '}
                                                </span>
                                            ) : null}

                                            {column.render('Header')}
                                            <span>
                                                {column.isSorted ? (column.isSortedDesc ? '↓' : '↑') : ''}
                                            </span>
                                        </th>
                                    ))
                                }

                            </tr>
                        ))
                    }
                </thead>
                <tbody {...getTableBodyProps()}>
                    {
                        rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (<td {...cell.getCellProps()}>
                                            {cell.isGrouped ? (
                                                // If it's a grouped cell, add an expander and row count
                                                <>
                                                    <span {...row.getToggleRowExpandedProps()}>
                                                        {row.isExpanded ? '-' : '+'}
                                                    </span>{' '}
                                                    {cell.render('Cell')} ({row.subRows.length})
                                                </>
                                            ) : cell.isAggregated ? (
                                                // If the cell is aggregated, use the Aggregated
                                                // renderer for cell
                                                cell.render('Aggregated')
                                            ) : cell.isPlaceholder ? null : ( // For cells with repeated values, render null
                                                // Otherwise, just render the regular cell
                                                cell.render('Cell')
                                            )}
                                        </td>)
                                    }
                                    )}
                                </tr>
                            )

                        })
                    }

                </tbody>
            </table>

        </div>
    )
}

export default Table
