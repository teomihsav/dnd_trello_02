

import React, { Fragment, useState, useEffect } from 'react'

import { AiOutlineEdit } from "react-icons/ai"

const EditInput = (props) => {

    const [toggle, setToggle] = useState<boolean>(true)
    const [name, setName] = React.useState(undefined)

    useEffect(() => {
        console.log('Render: ')
        console.log('Name: ', name)
        // if (name !== undefined) {
        //     props.handleEditCard(name)
        // }
    }, [toggle])

    const handleTyping = (event) => {
        setName(event.target.value)
    }
    const handleExit = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setToggle(true)
            if (props.bucketCard === 'card') {
                console.log('Bucket ID: ', props.bucketId);
                console.log('CARD BucketCard: ', props.bucketCard);
                props.handleEditCard(name, props.bucketId, props.bucketCard)
                event.preventDefault()
                event.stopPropagation()
            } else {
                console.log('BUCKET BucketCard: ', props.bucketCard);
                props.handleEdit(name, props.bucketCard)
                event.preventDefault()
                event.stopPropagation()
            }
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
                <input style={{ padding: '5px', margin: '5px', outline: 'none', borderColor: 'lightpink' }}
                    type="text"
                    placeholder='Name me...'
                    //  value={name}
                    onChange={handleTyping}
                    onKeyDown={handleExit}
                />
            )
        }
    </Fragment>
}

export default EditInput