import React from 'react'
import HashLoader from 'react-spinners/HashLoader';

const Loader = () => {

    return (

        <div style={{ marginTop: '150px' }}>
            <div className="sweet-loading" style={{ width: '100px', height: '100px', margin: 'auto' }}>
                <HashLoader
                    color='#000'
                    // loading={loading}
                    size={80}
                />
            </div>
        </div>

    )
}

export default Loader