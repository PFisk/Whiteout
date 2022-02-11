import Image from 'next/image'
import smallMountain from '../public/mountain-small-grey.svg'
import mediumMountain from '../public/mountain-medium-grey.svg'
import bigMountain from '../public/mountain-big-grey.svg'

const Resort = ({ resort }) => {


    const getImage = () => {
        switch (true) {
            case resort.lifts < 15:
                return smallMountain
            case resort.lifts < 40:
                return mediumMountain
            default:
                return bigMountain
        }
    }

    return (

        <div className='all-content'>
            <div className='resort-title'>
                <h1>{resort.resortName}</h1>
            </div>
            <div className='resort-wrapper'>
                <div className='img-wrapper'>
                    <Image
                        src={getImage()}
                        alt="Medium Mountain"
                        layout={'responsive'}
                    />
                </div>
                <div className="snow-container">
                    <div className="bot-box item">
                        <label>Bottom</label>
                        <h3>{resort.snowBottom ? resort.snowBottom : 0} <span>cm</span></h3>
                    </div>
                    <div className="top-box item">
                        <label>Top</label>
                        <h3>{resort.snowTop ? resort.snowTop : 0} <span>cm</span></h3>
                    </div>
                    <div className="new-box item">
                        <label>Fresh snow</label>
                        <h3>{resort.newSnow ? resort.newSnow : 0} <span>cm</span></h3>
                    </div>
                    <div className="lift-box item">
                        <label>Lifts</label>
                        <h3>{resort.lifts ? resort.lifts : 0}</h3>
                    </div>
                </div>
            </div>
        </div>

    )

}

export default Resort