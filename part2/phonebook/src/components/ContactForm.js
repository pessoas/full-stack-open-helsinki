import React from 'react';
export const ContactForm = ({ submit, name, hname, phone, hphone }) => {
    return (<form onSubmit={submit}>
        <div>
            name: <input type='text' value={name} onChange={hname} placeholder='Enter contact name' />
        </div>
        <div>
            number: <input type='number' value={phone} onChange={hphone} placeholder='Enter contact number' />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>);
};
