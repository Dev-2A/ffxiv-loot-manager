import React from 'react';

const SaveButton = ({ onClick, label = '저장' }) => {
    return (
        <button
            onClick={onClick}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
            {label}
        </button>
    );
};

export default SaveButton;