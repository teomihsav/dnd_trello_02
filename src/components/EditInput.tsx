

import React, { Fragment, useState, useEffect } from 'react'

import { AiOutlineEdit } from "react-icons/ai"

const EditInput = (props) => {

    const [toggle, setToggle] = useState<boolean>(true)
    const [name, setName] = React.useState(props.text ? props.text : 'Name me...')
    const [placeholder, setPlaceholder] = React.useState(props.text ? props.text : 'Name me...')

    useEffect(() => {
        console.log('Render: ')
        console.log('Name From Input: ', name)
        return () => {
            // props.bucketId = undefined
        }
    }, [toggle])


    const handleTyping = (event) => {
        setName(event.target.value)
    }
    const handleExit = (event) => {
        if (event.key === 'Enter' || event.key === 'Escape') {
            setToggle(true)
            if (props.bucketCard === 'card') {
                console.log('CARD Bucket ID: ', props.bucketId)
                console.log('CARD BucketCard: ', props.bucketCard)
                props.handleEditCard(name, props.bucketId, props.bucketCard)
                event.preventDefault()
                event.stopPropagation()
            }
            if (props.bucketCard === 'bucket') {
                console.log('BUCKET BucketCard: ', props.bucketCard)
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

                    <span><AiOutlineEdit /> </span>
                    <span style={{ marginLeft: '10px' }}>{name}</span>

                </div>
            ) : (
                <input style={{ padding: '5px', margin: '5px', outline: 'none', borderColor: 'lightpink' }}
                    type="text"
                    placeholder={placeholder}
                    onChange={handleTyping}
                    onKeyDown={handleExit}
                    onFocus={() => setPlaceholder('')}
                />
            )
        }
    </Fragment>
}

export default EditInput