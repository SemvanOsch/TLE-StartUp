const leerlingen = ['Pietje', 'Bas', 'Mohammed']

function StudentOverview(){
    return (
        <div className={'bg-background min-h-screen p-8'}>
            <div className={'w-3/5 bg-white mx-auto p-4 rounded-lg'}>
                <h1 className={'text-black'}>Leerlingen</h1>
                <ul className={'flex-row'}>
                    {leerlingen.map((leerling, index) => (
                        <a href={`/student/${index}`}>
                            <li className={'text-black bg-gray-300 p-1 m-2 border-gray-50 rounded-md'} key={index}>{leerling}</li>
                        </a>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default StudentOverview