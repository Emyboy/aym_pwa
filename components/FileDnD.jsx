import React, { useCallback } from 'react'
import { useDropzone } from 'react-dropzone'
import { BsFillImageFill } from 'react-icons/bs'

export default function MyDropzone({
    onChange
}) {
    const onDrop = useCallback(acceptedFiles => {
        // Do something with the files
        console.log('Selected Music', acceptedFiles);
        onChange(acceptedFiles)
    }, [])
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop })

    return (
        <div {...getRootProps()} style={{ textAlign: 'center' }} className='bg-white p-4'>
            <BsFillImageFill style={{ fontSize: '40px' }} />
            <input {...getInputProps()} />
            {
                isDragActive ?
                    <p>Drop the files here ...</p> :
                    <p>Drag 'n' drop some files here, or click to select files</p>
            }
        </div>
    )
}