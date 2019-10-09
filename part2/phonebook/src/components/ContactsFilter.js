import React from 'react'
export const ContactsFilter = ({ filter, hfilter }) => {
    return (
        <div>
            filter shown with: <input value={filter} onChange={hfilter} placeholder='enter search'/>
        </div>
    )
}
