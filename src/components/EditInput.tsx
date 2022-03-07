

import React, { Fragment, useState } from 'react'

import { AiOutlineEdit } from "react-icons/ai"

const EditInput = () => {

    const [toggle, setToggle] = useState<boolean>(true)
    const [name, setName] = useState<string>('Name me...')

    const handleTyping = (event) => {
        setName(event.target.value)
    }
    const handleExit = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setToggle(true)
            event.preventDefault()
            event.stopPropagation()
        }
    }
    return <Fragment>
        {
            toggle ? (
                <div
                    style={{ padding: '5px', display: 'flex', alignSelf: 'center' }}
                    onClick={() => { setToggle(false) }}
                >

                    <span><AiOutlineEdit /></span>
                    <span style={{ marginLeft: '10px' }}>{name}</span>

                </div>
            ) : (
                <input style={{  padding: '5px', margin: '5px', outline: 'none', borderColor: 'lightpink' }}
                    type="text"
                    value={name}
                    onChange={handleTyping}
                    onKeyDown={handleExit}
                />
            )
        }
    </Fragment>
}

export default EditInput