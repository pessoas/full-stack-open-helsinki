import React from 'react';
export const ContactForm = ({ submit, name, hname, phone, hphone }) => {
    return (<form onSubmit={submit}>
        <div>
            name: <input value={name} onChange={hname} />
        </div>
        <div>
            number: <input value={phone} onChange={hphone} />
        </div>
        <div>
            <button type="submit">add</button>
        </div>
    </form>);
};
