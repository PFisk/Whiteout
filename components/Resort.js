import SmallMountain from '../public/mountain-small-grey.svg'
import MediumMountain from '../public/mountain-medium-grey.svg'
import BigMountain from '../public/mountain-big-grey.svg'
import Background from '../public/background.svg'


const Resort = ({ resort }) => {

    const getImage = () => {
        switch (true) {
            case resort.lifts < 15:
                return <SmallMountain width="100%" height="100%" viewBox="0 0 1500 900" />
            case resort.lifts < 40:
                return <MediumMountain width="100%" height="100%" viewBox="0 0 1500 900" />
            default:
                return <BigMountain width="100%" height="100%" viewBox="0 0 1500 900" />
        }
    }

    return (

        <div>
            {!resort ? (
                <div className='background-wrapper'>
                    <Background width="100%" height="100%" viewBox="0 0 1260 470" />
                </div>) : (
                <div className='all-content'>
                    <div className='resort-title'>
                        <h1>{resort.resortName}</h1>
                    </div>
                    <div className='resort-wrapper'>
                        <div className='img-wrapper'>
                            {getImage()}
                        </div>
                        <div className="snow-container">
                            <div className="bot-box item">
                                <label>Bottom</label>
                                <div className='box-sub-item'>
                                    <h3>{resort.snowBottom ? resort.snowBottom : 0} </h3>
                                    <span>cm</span>
                                </div>
                            </div>
                            <div className="top-box item">
                                <label>Top</label>
                                <div className='box-sub-item'>
                                    <h3>{resort.snowTop ? resort.snowTop : 0} </h3>
                                    <span>cm</span>
                                </div>
                            </div>
                            <div className="new-box item">
                                <label>Fresh snow</label>
                                <div className='box-sub-item'>
                                    <h3>{resort.newSnow ? resort.newSnow : 0} </h3>
                                    <span>cm</span>
                                </div>                            </div>
                            <div className="lift-box item">
                                <label>Lifts</label>
                                <h3>{resort.lifts ? resort.lifts : 0}</h3>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    )

}

export default Resort